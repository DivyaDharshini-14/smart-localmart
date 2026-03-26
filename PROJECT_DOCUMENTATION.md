# Smart LocalMart - Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [How It Works](#how-it-works)
5. [Key Concepts](#key-concepts)
6. [File Organization](#file-organization)
7. [Development Workflow](#development-workflow)
8. [Common Tasks](#common-tasks)

---

## Project Overview

**Smart LocalMart** is an e-commerce web application built with:
- **Backend**: Laravel (PHP framework)
- **Frontend**: React (JavaScript library) with TypeScript
- **Bridge**: Inertia.js (connects Laravel and React seamlessly)

This is a **single-page application (SPA)** that feels like a traditional multi-page website but uses modern web technologies for better performance and user experience.

---

## Technology Stack

### Backend (Laravel)
- **Laravel**: PHP framework for backend logic, routing, and database
- **Laravel Fortify**: Authentication system (login, register, password reset)
- **Inertia.js Server**: Sends data to React components

### Frontend (React)
- **React 19**: JavaScript library for building user interfaces
- **TypeScript**: Adds type safety to JavaScript
- **Inertia.js Client**: Receives data from Laravel and renders React components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Build tool that compiles and bundles your code

### Key Libraries
- **@inertiajs/react**: Connects React to Laravel
- **Radix UI**: Accessible component library
- **Lucide React**: Icon library
- **Owl Carousel**: Image carousel/slider

---

## Project Structure

```
smart-localmart/
├── app/                    # Laravel backend (PHP)
│   ├── Http/Controllers/  # Backend logic
│   ├── Models/            # Database models
│   └── ...
│
├── resources/
│   ├── js/                # React frontend (TypeScript/TSX)
│   │   ├── app.tsx        # Main entry point
│   │   ├── pages/         # Page components (like views)
│   │   ├── components/    # Reusable UI components
│   │   ├── layouts/       # Page layouts
│   │   ├── hooks/         # Custom React hooks
│   │   └── routes/        # Type-safe route helpers
│   │
│   ├── css/
│   │   └── app.css        # Global styles
│   │
│   └── views/
│       └── app.blade.php  # Main HTML template
│
├── routes/
│   └── web.php            # Laravel routes (URLs)
│
├── public/                # Public assets (images, CSS, JS)
│   ├── images/           # Product images, backgrounds
│   ├── css/              # Compiled CSS files
│   └── js/               # Compiled JavaScript files
│
└── vegefoods-master/      # Original HTML template reference
```

---

## How It Works

### The Request Flow

1. **User visits a URL** (e.g., `/about`)
   ```
   Browser → Laravel Route → Inertia::render()
   ```

2. **Laravel processes the request**
   - Checks `routes/web.php` for the route
   - Finds: `Route::get('about', ...)`
   - Executes: `Inertia::render('about')`

3. **Inertia sends data to React**
   - Laravel doesn't return HTML
   - Instead, it sends JSON data with the component name
   - Example: `{ component: 'about', props: {...} }`

4. **React renders the component**
   - Inertia.js receives the data
   - Looks for `resources/js/pages/about.tsx`
   - Renders that component in the browser
   - **No page reload!** (This is why it's fast)

### Example: Visiting `/about`

**Step 1: Route Definition** (`routes/web.php`)
```php
Route::get('about', function () {
    return Inertia::render('about');  // Tells Inertia to render 'about' component
})->name('about');
```

**Step 2: React Component** (`resources/js/pages/about.tsx`)
```tsx
export default function About() {
    return (
        <VegefoodsLayout title="About Us" activePage="about">
            <section>About page content...</section>
        </VegefoodsLayout>
    );
}
```

**Step 3: What Happens**
- User clicks "About" link
- Browser requests `/about`
- Laravel returns JSON (not HTML)
- React component renders
- Page updates without full reload

---

## Key Concepts

### 1. Inertia.js - The Bridge

**Traditional Web App:**
```
Laravel → Returns HTML → Browser displays
```

**This App (Inertia.js):**
```
Laravel → Returns JSON → React renders → Browser displays
```

**Benefits:**
- No page reloads (faster)
- Shared layouts and components
- Better user experience
- Still uses Laravel routing

### 2. Components vs Pages

**Pages** (`resources/js/pages/`)
- Full page components
- One per route
- Examples: `landing.tsx`, `about.tsx`, `contact.tsx`

**Components** (`resources/js/components/`)
- Reusable pieces
- Used in multiple pages
- Examples: `vegefoods-layout.tsx`, `vegefoods-navigation.tsx`

**Example:**
```tsx
// Page: about.tsx
import VegefoodsLayout from '@/components/vegefoods-layout';

export default function About() {
    return (
        <VegefoodsLayout title="About">
            {/* Page content */}
        </VegefoodsLayout>
    );
}
```

### 3. Layouts

Layouts wrap pages to provide consistent structure:

**VegefoodsLayout** (`components/vegefoods-layout.tsx`)
- Used for: Shop, About, Contact, Blog pages
- Includes: Navigation, Footer, Breadcrumbs

**AppLayout** (`layouts/app-layout.tsx`)
- Used for: Dashboard, Settings pages
- Includes: Sidebar, Header

### 4. Routing

**Laravel Routes** (`routes/web.php`)
```php
Route::get('shop', function () {
    return Inertia::render('shop');
})->name('shop');
```

**TypeScript Route Helpers** (`resources/js/routes/`)
```tsx
import { shop } from '@/routes';

// Generate URL
<Link href={shop()}>Shop</Link>
```

### 5. Props (Data Passing)

**From Laravel to React:**
```php
// routes/web.php
Route::get('shop', function () {
    return Inertia::render('shop', [
        'products' => Product::all(),  // Pass data
    ]);
});
```

**In React Component:**
```tsx
// pages/shop.tsx
import { usePage } from '@inertiajs/react';

export default function Shop() {
    const { products } = usePage().props;  // Receive data
    return <div>{/* Use products */}</div>;
}
```

---

## File Organization

### Backend Files (Laravel/PHP)

**`routes/web.php`**
- Defines all URLs
- Maps URLs to React components
- Example: `/about` → `about.tsx`

**`app/Http/Controllers/`**
- Business logic
- Database operations
- API endpoints

**`app/Models/`**
- Database models (User, Product, etc.)

### Frontend Files (React/TypeScript)

**`resources/js/app.tsx`**
- Entry point
- Sets up Inertia.js
- Initializes React app

**`resources/js/pages/`**
- Page components
- One file = one route
- Examples:
  - `landing.tsx` → `/`
  - `about.tsx` → `/about`
  - `contact.tsx` → `/contact`

**`resources/js/components/`**
- Reusable components
- Examples:
  - `vegefoods-layout.tsx` - Wrapper for shop pages
  - `vegefoods-navigation.tsx` - Navigation menu
  - `ui/button.tsx` - Button component

**`resources/js/layouts/`**
- Page layouts
- Wrappers for different page types

**`resources/js/hooks/`**
- Custom React hooks
- Reusable logic
- Example: `use-appearance.tsx` - Theme switching

**`resources/js/routes/`**
- Type-safe route helpers
- Generate URLs in TypeScript

### Styling

**`resources/css/app.css`**
- Global styles
- Custom CSS rules
- Theme overrides

**`public/css/`**
- External CSS libraries
- Bootstrap, Owl Carousel styles

---

## Development Workflow

### Starting the Development Server

**Terminal 1: Laravel (Backend)**
```bash
php artisan serve
# Server runs on http://localhost:8000
```

**Terminal 2: Vite (Frontend)**
```bash
npm run dev
# Watches for changes and compiles React/TypeScript
```

### Making Changes

**1. Add a New Page**

**Step 1:** Create component (`resources/js/pages/new-page.tsx`)
```tsx
export default function NewPage() {
    return <div>New Page Content</div>;
}
```

**Step 2:** Add route (`routes/web.php`)
```php
Route::get('new-page', function () {
    return Inertia::render('new-page');
})->name('new-page');
```

**Step 3:** Access at `http://localhost:8000/new-page`

**2. Modify Existing Page**

1. Open file in `resources/js/pages/`
2. Make changes
3. Save file
4. Browser auto-refreshes (thanks to Vite)

**3. Add a Component**

1. Create file in `resources/js/components/`
2. Export component
3. Import and use in pages

**Example:**
```tsx
// components/my-button.tsx
export function MyButton({ text }) {
    return <button>{text}</button>;
}

// pages/shop.tsx
import { MyButton } from '@/components/my-button';

export default function Shop() {
    return <MyButton text="Click Me" />;
}
```

### Building for Production

```bash
npm run build
# Compiles and minifies all files
# Output goes to public/build/
```

---

## Common Tasks

### Task 1: Add a New Route

**File:** `routes/web.php`
```php
Route::get('products', function () {
    return Inertia::render('products');
})->name('products');
```

**File:** `resources/js/pages/products.tsx`
```tsx
export default function Products() {
    return <div>Products Page</div>;
}
```

### Task 2: Pass Data from Laravel to React

**Laravel:**
```php
Route::get('shop', function () {
    return Inertia::render('shop', [
        'products' => [
            ['id' => 1, 'name' => 'Apple', 'price' => 10],
            ['id' => 2, 'name' => 'Banana', 'price' => 5],
        ],
    ]);
});
```

**React:**
```tsx
import { usePage } from '@inertiajs/react';

export default function Shop() {
    const { products } = usePage().props as { products: any[] };
    
    return (
        <div>
            {products.map(product => (
                <div key={product.id}>
                    {product.name} - ${product.price}
                </div>
            ))}
        </div>
    );
}
```

### Task 3: Create a Link Between Pages

**Using Inertia Link:**
```tsx
import { Link } from '@inertiajs/react';

<Link href="/about">About Us</Link>
```

**Using Route Helper:**
```tsx
import { about } from '@/routes';

<Link href={about()}>About Us</Link>
```

### Task 4: Submit a Form

```tsx
import { useForm } from '@inertiajs/react';

export default function Contact() {
    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/contact');  // Sends to Laravel route
    };

    return (
        <form onSubmit={submit}>
            <input
                value={data.name}
                onChange={e => setData('name', e.target.value)}
            />
            <button type="submit" disabled={processing}>
                Send
            </button>
        </form>
    );
}
```

### Task 5: Use a Layout

```tsx
import VegefoodsLayout from '@/components/vegefoods-layout';

export default function MyPage() {
    return (
        <VegefoodsLayout title="My Page" activePage="home">
            <div>Page content here</div>
        </VegefoodsLayout>
    );
}
```

---

## Understanding the Code Flow

### Example: User Clicks "About" Link

1. **HTML/React:**
   ```tsx
   <Link href="/about">About</Link>
   ```

2. **Browser:** Requests `/about`

3. **Laravel** (`routes/web.php`):
   ```php
   Route::get('about', function () {
       return Inertia::render('about');
   });
   ```

4. **Inertia.js:** Sends JSON response
   ```json
   {
     "component": "about",
     "props": {},
     "url": "/about"
   }
   ```

5. **React** (`app.tsx`):
   - Receives JSON
   - Loads `pages/about.tsx`
   - Renders component
   - Updates page (no reload!)

6. **User sees:** About page content

---

## Key Differences from Traditional Websites

| Traditional | This Project |
|------------|--------------|
| Laravel returns HTML | Laravel returns JSON |
| Full page reloads | No page reloads |
| Separate HTML files | React components |
| Server-side rendering | Client-side rendering |
| Slower navigation | Faster navigation |

---

## Tips for Beginners

1. **Start with pages:** Modify existing pages first
2. **Use components:** Don't repeat code, create components
3. **Check routes:** Always check `routes/web.php` to understand URLs
4. **Read errors:** TypeScript errors are helpful - read them!
5. **Use browser console:** Press F12 to see errors and debug

---

## Next Steps

1. Read the React Guide (`REACT_GUIDE.md`)
2. Explore existing pages in `resources/js/pages/`
3. Try modifying a simple page
4. Create a new component
5. Practice passing data from Laravel to React

---

## Resources

- **Laravel Docs:** https://laravel.com/docs
- **Inertia.js Docs:** https://inertiajs.com
- **React Docs:** https://react.dev
- **TypeScript Docs:** https://www.typescriptlang.org/docs

---

## Questions?

If you're stuck:
1. Check the browser console (F12)
2. Check Laravel logs: `storage/logs/laravel.log`
3. Check if both servers are running (Laravel + Vite)
4. Clear cache: `php artisan cache:clear`



