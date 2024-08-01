export async function searchAttractions() {
  const country = document.getElementById("country").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

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
    const response = await axios(options);
    const travelData = response.data.data;

    const attractions = travelData.filter(
      (elt) => elt.result_type === "things_to_do"
    );

    if (attractions.length > 0) {
      const attractionHeader = document.createElement("h2");
      attractionHeader.textContent = "Attractions";
      resultsDiv.appendChild(attractionHeader);

      const carousel = document.createElement("div");
      carousel.id = "carouselExampleIndicators";
      carousel.className = "carousel slide";
      carousel.setAttribute("data-ride", "carousel");

      const carouselIndicators = document.createElement("ol");
      carouselIndicators.className = "carousel-indicators";

      const carouselInner = document.createElement("div");
      carouselInner.className = "carousel-inner";

      attractions.forEach((attraction, index) => {
        const carouselItem = document.createElement("div");
        carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;
        carouselItem.innerHTML = `
          <img src="${
            attraction.result_object.photo?.images?.small?.url ||
            "https://via.placeholder.com/100"
          }" class="d-block w-100" alt="${attraction.result_object.name}">
          <div class="carousel-caption d-none d-md-block">
            <h5>${attraction.result_object.name}</h5>
            <p>${attraction.result_object.location_string}</p>
          </div>
        `;
        carouselInner.appendChild(carouselItem);

        const indicator = document.createElement("li");
        indicator.setAttribute("data-target", "#carouselExampleIndicators");
        indicator.setAttribute("data-slide-to", index);
        if (index === 0) indicator.className = "active";
        carouselIndicators.appendChild(indicator);
      });

      carousel.appendChild(carouselIndicators);
      carousel.appendChild(carouselInner);

      const carouselControlPrev = document.createElement("a");
      carouselControlPrev.className = "carousel-control-prev";
      carouselControlPrev.href = "#carouselExampleIndicators";
      carouselControlPrev.setAttribute("role", "button");
      carouselControlPrev.setAttribute("data-slide", "prev");
      carouselControlPrev.innerHTML = `
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      `;

      const carouselControlNext = document.createElement("a");
      carouselControlNext.className = "carousel-control-next";
      carouselControlNext.href = "#carouselExampleIndicators";
      carouselControlNext.setAttribute("role", "button");
      carouselControlNext.setAttribute("data-slide", "next");
      carouselControlNext.innerHTML = `
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      `;

      carousel.appendChild(carouselControlPrev);
      carousel.appendChild(carouselControlNext);

      resultsDiv.appendChild(carousel);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document
  .getElementById("search-button")
  .addEventListener("click", searchAttractions);
