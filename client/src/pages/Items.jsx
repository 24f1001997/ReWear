function Items() {
    return (
      <div className="p-4">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Welcome to Our Store</h1>
          <p className="mt-2 text-gray-600">Discover, Swap, and Buy Items</p>
        </header>
  
        <div className="mb-6">
          <div className="bg-gray-300 h-48 flex items-center justify-center">[Carousel: Featured Items]</div>
        </div>
  
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-200 p-4">Category 1</div>
            <div className="bg-gray-200 p-4">Category 2</div>
            <div className="bg-gray-200 p-4">Category 3</div>
          </div>
        </section>
  
        <section>
          <h2 className="text-xl font-semibold mb-2">Product Listings</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-100 p-4">Product 1</div>
            <div className="bg-gray-100 p-4">Product 2</div>
            <div className="bg-gray-100 p-4">Product 3</div>
            <div className="bg-gray-100 p-4">Product 4</div>
          </div>
        </section>
      </div>
    );
  }
  
  export default Items;
  