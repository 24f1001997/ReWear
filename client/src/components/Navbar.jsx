import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/items" className="hover:text-gray-300">Items</Link>
        <Link to="/my-items" className="hover:text-gray-300">My Items</Link>
        <Link to="/swaps" className="hover:text-gray-300">Swaps</Link>
        <Link to="/profile" className="hover:text-gray-300">Profile</Link>
        <Link to="/add-item" className="hover:text-gray-300">Add Item</Link>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
