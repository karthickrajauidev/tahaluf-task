// Listing.js

import React, { useState, useEffect } from "react";
import { getUniversities } from "../controllers/universityController";
import { saveToLocalStorage } from "../utils/localStorage";
import "../styles.css";

const Listing = ({ setDetails }) => {
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUniversities();
        setUniversities(data);
      } catch (error) {
        alert("Failed to fetch data from API and no cached data found");
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (name) => {
    const filteredUniversities = universities.filter(
      (uni) => uni.name !== name
    );
    setUniversities(filteredUniversities);
    saveToLocalStorage(filteredUniversities);
  };

  const sortedUniversities = [...universities].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredUniversities = sortedUniversities.filter((uni) =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>University Name</th>
            <th onClick={() => handleSort("country")}>Country</th>
            <th onClick={() => handleSort("web_pages")}>Domains</th>
            <th onClick={() => handleSort("alpha_two_code")}>Code</th>
            <th>Pages</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUniversities.map((uni) => (
            <tr key={uni.name}>
              <td onClick={() => setDetails(uni)}>{uni.name}</td>
              <td>{uni.country}</td>
              <td>{uni.web_pages.join(", ")}</td>
              <td>{uni.alpha_two_code}</td>
              <td>
                <a
                  href={uni.web_pages[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit
                </a>
              </td>
              <td>
                <button onClick={() => handleDelete(uni.name)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listing;
