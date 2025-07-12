import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Items from "./pages/Items";
import ItemDetails from "./pages/ItemDetails";
import MyItems from "./pages/MyItems";
import Swaps from "./pages/Swaps";
import AdminDashboard from "./pages/AdminDashboard";
import PendingItems from "./pages/PendingItems";
import AddItem from "./pages/AddItem";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorage = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Navigate to="/items" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />

        {isAuthenticated ? (
          <>
            <Route path="/items" element={<Items />} />
            <Route path="/items/:id" element={<ItemDetails />} />
            <Route path="/myitems" element={<MyItems />} />
            <Route path="/swaps" element={<Swaps />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/pending" element={<PendingItems />} />
            <Route path="*" element={<Navigate to="/items" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
