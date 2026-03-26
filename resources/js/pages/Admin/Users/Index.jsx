export default function Index({ users }) {
  return (
    <div>
      <h1>Users</h1>

      {users.map(user => (
        <p key={user.id}>
          {user.name} | {user.role}
        </p>
      ))}
    </div>
  );
}

