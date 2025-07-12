function AdminDashboard() {
    return (
      <div className="p-4">
        <h1 className="text-2xl mb-4">Admin Panel</h1>
        <section>
          <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between bg-gray-100 p-2">
              <div>User 1</div>
              <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-2 rounded">Action 1</button>
                <button className="bg-red-500 text-white px-2 rounded">Action 2</button>
              </div>
            </div>
            <div className="flex justify-between bg-gray-100 p-2">
              <div>User 2</div>
              <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-2 rounded">Action 1</button>
                <button className="bg-red-500 text-white px-2 rounded">Action 2</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  export default AdminDashboard;
  