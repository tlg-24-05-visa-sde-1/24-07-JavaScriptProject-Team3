async function getWikipediaSummary(location) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${encodeURIComponent(
    location
  )}&exintro=1&origin=*`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    const summary = pages[pageId].extract;

    return summary;
  } catch (error) {
    console.error("Error fetching data from Wikipedia API:", error);
    return null;
  }
}

// Example usage:
getWikipediaSummary("Egypt").then((summary) => {
  console.log(summary);
});
