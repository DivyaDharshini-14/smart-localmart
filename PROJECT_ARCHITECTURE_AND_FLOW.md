# Smart LocalMart - Architecture & Codebase Flow Documentation

This document provides a deep dive into the **Smart LocalMart** codebase. It explains the logic, module connections, and detailed code flows from **Route** to **View** for each major user role.

---

## 1. High-Level Architecture

The project follows the **Model-View-Controller (MVC)** pattern, adapted for a modern **Inertia.js** Single Page Application (SPA).

*   **Routes (`routes/web.php`)**: The entry point. Maps URLs to Controllers.
*   **Controllers (`app/Http/Controllers`)**: The brain. Handles logic, talks to the database, and returns data.
*   **Models (`app/Models`)**: The data layer. Represents database tables.
*   **Views (`resources/js/pages`)**: The frontend. React components that receive data and render the UI.

---

## 2. Module Breakdown & Code Flow

### A. Admin Module
**Responsibility**: System oversight, Shop Approval, User Management.

#### **Deep Dive: Shop Approval Process**
This process allows an Admin to approve a new vendor's shop so they can start selling.

**1. The Route (`routes/web.php`)**
This defines the URL the admin visits and the action to approve.
```php
// Grouped under 'admin' prefix and middleware
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    
    // 1. View Pending Shops
    Route::get('/shops', [AdminShopController::class, 'index'])->name('admin.shops.index');

    // 2. Approve a specific shop (POST request)
    Route::post('/shops/{shop}/approve', [AdminShopController::class, 'approve'])->name('admin.shops.approve');
});
```

**2. The Controller (`app/Http/Controllers/Admin/ShopApprovalController.php`)**
Handles the logic for fetching and updating data.
```php
class ShopApprovalController extends Controller
{
    // Logic for Route 1: Show the list
    public function index()
    {
        // Eloquent Query: Get shops where 'is_approved' is false
        $shops = Shop::where('is_approved', false)->with('vendor')->get();

        // Return Inertia View with data
        return Inertia::render('Admin/Shops/Index', [
            'shops' => $shops
        ]);
    }

    // Logic for Route 2: Approve the shop
    public function approve(Shop $shop)
    {
        // Update Database
        $shop->update(['is_approved' => true]);

        // Redirect back (Inertia reloads the list automatically)
        return back()->with('success', 'Shop approved!');
    }
}
```

**3. The View (`resources/js/pages/Admin/Shops/Index.tsx`)**
Displays the pending shops and provides the "Approve" button.
```tsx
import { router } from '@inertiajs/react';

export default function ShopList({ shops }) {
    
    // Function triggered when "Approve" is clicked
    const handleApprove = (shopId) => {
        // Sends POST request to Laravel route
        router.post(`/admin/shops/${shopId}/approve`);
    }

    return (
        <div>
            {shops.map(shop => (
                <div key={shop.id}>
                    <h3>{shop.name}</h3>
                    <button onClick={() => handleApprove(shop.id)}>
                        Approve Shop
                    </button>
                </div>
            ))}
        </div>
    );
}
```

---

### B. Vendor Module
**Responsibility**: Manage Shop, Products, and Orders.

#### **Deep Dive: Adding a Product**
The core activity for a vendor.

**1. The Route**
```php
Route::middleware(['auth'])->prefix('vendor')->group(function () {
    // Save new product
    Route::post('/products', [ProductController::class, 'store'])->name('vendor.products.store');
});
```

**2. The Controller (`app/Http/Controllers/Vendor/ProductController.php`)**
```php
public function store(Request $request)
{
    // 1. Validation
    $request->validate([
        'name' => 'required',
        'price' => 'required|numeric',
        'stock' => 'integer'
    ]);

    // 2. Create in Database
    // auth()->user()->shop gets the logged-in vendor's shop
    Product::create([
        'shop_id' => auth()->user()->shop->id,
        'name' => $request->name,
        'price' => $request->price,
        'stock' => $request->stock
    ]);

    // 3. Redirect to list
    return redirect()->route('vendor.products.index');
}
```

**3. The View (`resources/js/pages/Vendor/Products/Create.tsx`)**
```tsx
import { useForm } from '@inertiajs/react';

export default function CreateProduct() {
    // Inertia form helper handles state and submission
    const { data, setData, post } = useForm({
        name: '',
        price: '',
        stock: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post('/vendor/products'); // Submit to backend
    };

    return (
        <form onSubmit={submit}>
            <input value={data.name} onChange={e => setData('name', e.target.value)} />
            <button type="submit">Save Product</button>
        </form>
    );
}
```

---

### C. User (Customer) Module
**Responsibility**: Browse, Add to Cart, Checkout.

#### **Deep Dive: Adding to Cart**
This involves checking stock and updating the session/database cart.

**1. The Route**
```php
Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
```

**2. The Controller (`app/Http/Controllers/User/CartController.php`)**
```php
public function add(Request $request)
{
    // 1. Find Product
    $product = Product::findOrFail($request->product_id);

    // 2. Logic: Check Inventory
    if ($product->stock < $request->quantity) {
        return back()->with('error', 'Not enough stock!');
    }

    // 3. Logic: Get or Create Cart
    $cart = Cart::firstOrCreate(['user_id' => auth()->id()]);

    // 4. Update/Create Cart Item
    CartItem::updateOrCreate(
        ['cart_id' => $cart->id, 'product_id' => $product->id],
        ['quantity' => $request->quantity] // Simplified logic
    );

    return back()->with('success', 'Added to cart!');
}
```

**3. The View (`resources/js/pages/shop.tsx` or `product-single.tsx`)**
```tsx
const addToCart = (product) => {
    router.post('/cart/add', {
        product_id: product.id,
        quantity: 1
    });
};
```

---

### D. Delivery Module
**Responsibility**: Pick up orders and mark them as delivered.

#### **Deep Dive: Picking an Order**
Delivery partners see "Packed" orders and "Pick" them to assign them to themselves.

**1. The Route**
```php
Route::post('/delivery/orders/{order}/pick', [OrderController::class, 'pick']);
```

**2. The Controller (`app/Http/Controllers/Delivery/OrderController.php`)**
```php
public function pick(Order $order)
{
    // Logic: Ensure order is ready
    if ($order->status !== 'packed') {
        return back()->with('error', 'Not ready yet');
    }

    // Logic: Assign to current user (delivery partner)
    $order->update([
        'status' => 'picked',
        'delivery_partner_id' => auth()->id() // CRITICAL connection
    ]);

    return back()->with('success', 'You picked this order!');
}
```

---

## 3. How It All Connects (The "Golden Thread")

Here is how a single order flows through all modules:

1.  **User Module**: Customer buys an Apple.
    *   *Action*: CheckoutController creates `Order` with `status = 'pending'`.
2.  **Vendor Module**: Vendor sees the order.
    *   *Action*: Vendor clicks "Accept". `Order` status becomes `accepted`.
    *   *Action*: Vendor packs it. `Order` status becomes `packed`.
3.  **Delivery Module**: Delivery Partner sees "Packed" orders.
    *   *Action*: Partner clicks "Pick". `Order` status becomes `picked`.
    *   *Action*: Partner delivers it. `Order` status becomes `delivered`.
4.  **Admin Module**: Admin watches everything.
    *   *View*: Admin dashboard shows `Order::count()` and status charts.

## 4. Key Directory Structure for Reference

*   **Logic**: `app/Http/Controllers/{Module}/ControllerName.php`
*   **Database**: `app/Models/ModelName.php` (e.g., `Product.php`, `Order.php`)
*   **Frontend Pages**: `resources/js/pages/{Module}/PageName.tsx`
*   **API/URL Definitions**: `routes/web.php`
