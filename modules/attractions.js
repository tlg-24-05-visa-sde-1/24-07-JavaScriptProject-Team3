async function searchAttractions() {
  const country = document.getElementById("country").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  // Fetch attractions based on country
  const url = `https://travel-advisor.p.rapidapi.com/locations/search`;
  const options = {
    method: "GET",
    url: url,
    headers: {
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      "X-RapidAPI-Key": "9386a1afa4msh6bce386f20905e5p13113bjsnd76776fd7f39",
      "Content-Type": "application/json",
    },
    params: {
      query: country,
      limit: "10",
      offset: "0",
      units: "km",
    },
  };

  try {
    // const response = await fetch(url, options);
    // const data = await response.text();

    //const response = await axios(options); //sending get Request

    const response = await axios(options); //sending get Request
    const travelData = response.data.data; //to be able to reference the arrays

    const attractions = travelData.filter(
      (elt) => elt.result_type === "things_to_do"
    );
    const restaurants = travelData.filter(
      (elt) => elt.result_type === "restaurants"
    );
    const hotels = travelData.filter((elt) => elt.result_type === "lodging");
    console.log(attractions);
    console.log(restaurants);
    console.log(hotels);

    if (attractions.length > 0) {
      const attractionHeader = document.createElement("h2");
      attractionHeader.textContent = "Attractions";
      resultsDiv.appendChild(attractionHeader);

      attractions.forEach((attraction) => {
        const div = document.createElement("div");
        div.className = "attraction";
        div.innerHTML = `
                          <h3>${attraction.result_object.name}</h3>
                          <p>${attraction.result_object.location_string}</p>
                          <img src="${
                            attraction.result_object.photo?.images?.small
                              ?.url || "https://via.placeholder.com/100"
                          }" alt="${attraction.result_object.name}">
                      `;
        resultsDiv.appendChild(div);
      });
    }

    // if (restaurants.length > 0) {
    //   const restaurantHeader = document.createElement("h2");
    //   restaurantHeader.textContent = "Restaurants ";
    //   resultsDiv.appendChild(restaurantHeader);

    //   restaurants.forEach((restaurant) => {
    //     const div = document.createElement("div");
    //     div.className = "Restaurants";
    //     div.innerHTML = `
    //                       <h3>${restaurants.result_object.name}</h3>
    //                       <p>${restaurants.result_object.location_string}</p>
    //                       <img src="${
    //                         restaurants.result_object.photo?.images?.small
    //                           ?.url || "https://via.placeholder.com/100"
    //                       }" alt="${attraction.result_object.name}">
    //                   `;
    //     resultsDiv.appendChild(div);
    //   });
    // }

    if (hotels.length > 0) {
      const hotelHeader = document.createElement("h2");
      hotelHeader.textContent = "Hotels";
      resultsDiv.appendChild(hotelHeader);

      hotels.forEach((hotel) => {
        const div = document.createElement("div");
        div.className = "Hotel";
        div.innerHTML = `
                          <h3>${hotels.result_object.names}</h3>
                          <p>${hotels.result_object.location_string}</p>
                          <img src="${
                            hotels.result_object.photo?.images?.small?.url ||
                            "https://via.placeholder.com/100"
                          }" alt="${attraction.result_object.name}">
                      `;
        resultsDiv.appendChild(div);
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document
  .getElementById("search-button")
  .addEventListener("click", searchAttractions);
