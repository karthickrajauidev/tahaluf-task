// api.js

export const fetchUniversities = async () => {
  try {
    const response = await fetch(
      "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
