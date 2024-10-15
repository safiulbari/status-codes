import { useEffect, useState } from "react";

function StatusCode() {
  const [statusCodes, setStatusCodes] = useState([]);
  const [filteredCodes, setFilteredCodes] = useState([]);
  const [search, setSearch] = useState(""); // For search by status code
  const [selectedCategory, setSelectedCategory] = useState("All"); // For dropdown filter

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://api.freeapi.app/api/v1/kitchen-sink/status-codes"
      );
      const data = await res.json();
      setStatusCodes(data.data);
      setFilteredCodes(data.data); // Set initially to all data
    }
    fetchData();
  }, []);

  // Update filtered data based on search and category filter
  useEffect(() => {
    let filtered = Object.values(statusCodes);

    // Filter by search input (status code)
    if (search) {
      filtered = filtered.filter((item) =>
        item.statusCode.toString().includes(search)
      );
    }

    // Filter by category if selected
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    setFilteredCodes(filtered);
  }, [search, selectedCategory, statusCodes]);

  return (
    <>
      <div className="flex flex-col items-center gap-6 p-4 bg-gray-100 min-h-screen font-suse">
        <div className="flex flex-row gap-2 justify-between">
          {/* Search Input */}
          <div className="w-[400px] max-w-lg">
            <input
              type="text"
              placeholder="Search by status code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Dropdown Filter */}
          <div className="w-[300px] max-w-[300px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="All">All Categories</option>
              <option value="Informational">Informational</option>
              <option value="Success">Success</option>
              <option value="Redirection">Redirection</option>
              <option value="Client Error">Client Error</option>
              <option value="Server Error">Server Error</option>
              <option value="Unofficial">Unofficial</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {filteredCodes.length > 0 ? (
            filteredCodes.map((item, index) => (
              <div
                key={index}
                className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Category */}
                <div
                  className={`px-4 py-2 ${getCategoryColor(
                    item.category
                  )} text-white font-medium text-sm uppercase tracking-wide`}
                >
                  {item.category}
                </div>

                {/* Body */}
                <div className="p-4">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Status Code: {item.statusCode}
                  </h2>
                  <h3 className="text-xl text-blue-600 font-medium mb-4">
                    {item.statusMessage}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No status codes found.</p>
          )}
        </div>
      </div>
    </>
  );
}

function getCategoryColor(category) {
  switch (category) {
    case "Informational":
      return "bg-blue-500";
    case "Success":
      return "bg-green-500";
    case "Redirection":
      return "bg-yellow-500";
    case "Client Error":
      return "bg-red-500";
    case "Server Error":
      return "bg-purple-500";
    case "Unofficial":
      return "bg-gray-500";
    default:
      return "bg-gray-400";
  }
}

export default StatusCode;
