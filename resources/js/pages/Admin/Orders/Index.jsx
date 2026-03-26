import { router } from '@inertiajs/react';

export default function Index({ orders, deliveryPartners }) {
  return (
    <div>
      <h1>All Orders</h1>

      {orders.map(order => (
        <div key={order.id}>
          <p>
            Order #{order.id} |
            Status: {order.status} |
            Shop: {order.shop.name}
          </p>

          {!order.delivery_partner_id && (
            <select
              onChange={e =>
                router.post(
                  `/admin/orders/${order.id}/assign-delivery`,
                  { delivery_partner_id: e.target.value }
                )
              }
            >
              <option>Select Delivery Partner</option>
              {deliveryPartners.map(dp => (
                <option key={dp.id} value={dp.id}>
                  {dp.name}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
}

