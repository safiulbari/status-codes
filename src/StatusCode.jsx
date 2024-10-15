import { useEffect, useState } from "react";

function StatusCode() {
  const [statusCodes, setStatusCodes] = useState([]);
  const [filteredCodes, setFilteredCodes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://api.freeapi.app/api/v1/kitchen-sink/status-codes"
      );
      const data = await res.json();
      setStatusCodes(data.data);
      setFilteredCodes(data.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = Object.values(statusCodes);

    if (search) {
      filtered = filtered.filter((item) =>
        item.statusCode.toString().includes(search)
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    setFilteredCodes(filtered);
  }, [search, selectedCategory, statusCodes]);

  useEffect(() => {
    var d = new Date();
    if (d.getHours() > 16 || d.getHours < 6) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    console.log(d.getHours);
  }, [darkMode]);

  return (
    <>
      <div className="flex flex-col items-center gap-6 p-4 bg-gray-100 dark:bg-gray-900 min-h-screen font-suse">
        <div className="flex flex-row gap-2 ">
          <input
            type="text"
            placeholder="Search by status code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"

          />
        
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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

        <div className="flex flex-wrap justify-center gap-6">
          {filteredCodes.length > 0 ? (
            filteredCodes.map((item, index) => (
              <div
                key={index}
                className="max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div
                  className={`px-4 py-2 ${getCategoryColor(
                    item.category
                  )} text-white font-medium text-sm uppercase tracking-wide`}
                >
                  {item.category}
                </div>

                <div className="p-4">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                    Status Code: {item.statusCode}
                  </h2>
                  <h3 className="text-xl text-blue-600 font-medium mb-4">
                    {item.statusMessage}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              No status codes found.
            </p>
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
