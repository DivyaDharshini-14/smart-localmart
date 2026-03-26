import { router } from '@inertiajs/react';

export default function Index({ shops }) {
  return (
    <div>
      <h1>Shops</h1>

      {shops.map(shop => (
        <div key={shop.id}>
          <p>
            {shop.name} | {shop.vendor.name} |
            {shop.is_approved ? 'Approved' : 'Pending'}
          </p>

          {!shop.is_approved && (
            <button
              onClick={() =>
                router.post(`/admin/shops/${shop.id}/approve`)
              }
            >
              Approve
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

