import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { email, password });
      toast.success("Registered successfully!");
      const response = await API.post("/auth/login", { email, password });
localStorage.setItem("token", response.data.token);
setIsAuthenticated(true);
navigate("/items");

    
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-64">
        <input type="text" placeholder="Full Name" className="border p-2" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2" />
        <input type="text" placeholder="Other Field" className="border p-2" />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}

export default Register;
