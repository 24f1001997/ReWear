import { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";

function MyItems() {
  const [myItems, setMyItems] = useState([]);

  const fetchMyItems = async () => {
    try {
      const response = await API.get("/items/my-items");
      setMyItems(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load your items");
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Listings</h1>
      {myItems.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {myItems.map((item) => (
            <div key={item._id} className="border p-2 rounded shadow">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-40 w-full object-cover mb-2 rounded"
                />
              )}
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyItems;
