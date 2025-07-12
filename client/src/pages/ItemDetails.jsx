import { useParams } from "react-router-dom";

function ItemDetails() {
  const { id } = useParams();
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Product Details (ID: {id})</h1>
      <div className="flex gap-4">
        <div className="bg-gray-300 w-1/2 h-64 flex items-center justify-center">Product Image</div>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2">Product Name</h2>
          <p className="mb-4">Product Description goes here...</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded">Available / Swap</button>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Previous Listings</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-200 p-4">Listing 1</div>
          <div className="bg-gray-200 p-4">Listing 2</div>
          <div className="bg-gray-200 p-4">Listing 3</div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
