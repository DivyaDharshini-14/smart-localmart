export default function Dashboard({ stats }) {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Total Users: {stats.users}</p>
      <p>Total Shops: {stats.shops}</p>
      <p>Total Orders: {stats.orders}</p>
    </div>
  );
}

