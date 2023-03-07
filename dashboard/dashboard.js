const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".search-container input");
const themeChanger = document.querySelector(".theme-changer");
const API = "https://restcountries.com/v3.1";
let allCountriesData;
const body = document.body;

const fetchApiData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

/*Async function that fetches data from an API, renders it on a web page, and stores 
  it in a variable for later use.*/

const fetchAndRenderData = async (url) => {
  try {
    const data = await fetchApiData(url);
    renderCards(data);
    allCountriesData = data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

//Renders Cards Using API Data
const renderCards = (data) => {
  countriesContainer.innerHTML = "";
  data.map((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `../cardDetail/cardDetail.html?name=${country.name.common}`;
    countryCard.innerHTML = `
          <img src="${country.flags.png}" alt="${
      country.name.common
    } flag" width="288" height="170"/>
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                "en-IN"
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `;
    countriesContainer.append(countryCard);
  });
};

//Search by Country Full Name or Partial Name
searchInput.addEventListener("change", (e) => {
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toString().toLowerCase().includes(e.target.value.toLowerCase()),
    console.log(e.target.value.toLowerCase())
  );
  renderCards(filteredCountries);
});

// filterByRegion.addEventListener("change", async (e) => {
//   try {
//     const data = await fetchApiData(`${API}/region/${filterByRegion.value}`);
//     renderCards(data);
//   } catch (error) {
//     console.log(error);
//   }
// });
// Check if the user is coming from a different page
if (performance.getEntriesByType("navigation")[0].type==="reload") {
  localStorage.removeItem("regionFilter");
}

window.addEventListener("load", () => {
  const regionFilter = localStorage.getItem("regionFilter");
  if (regionFilter) {
    filterByRegion.value = regionFilter;
    filterByRegion.dispatchEvent(new Event("change"));
  }
});

filterByRegion.addEventListener("change", async (e) => {
  try {
    localStorage.setItem("regionFilter", filterByRegion.value);
    console.log(`Region value ${filterByRegion.value}`);
    const data = await fetchApiData(`${API}/region/${filterByRegion.value}`);
    renderCards(data);
  } catch (error) {
    console.log(error);
  }
});

// Get the stored theme from local storage, or default to light
const themeGetter = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    body.classList.add("dark");
    themeChanger.innerHTML =
      '<i class="fa-solid fa-moon"></i>&nbsp;&nbsp;Light Mode';
  }
};

const toggleTheme = () => {
  // Toggle the body class
  body.classList.toggle("dark");
  // Update the theme preference in local storage
  const currentTheme = body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", currentTheme);

  // Update the button text from Light to Dark Or vice versa
  const buttonHtml = body.classList.contains("dark")
    ? '<i class="fa-solid fa-moon"></i>&nbsp;&nbsp;Light Mode'
    : '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode';
  themeChanger.innerHTML = buttonHtml;
};

/* JavaScript code that clears the value of a search input field when the main page 
is loaded or navigated back to using the back button.*/
window.addEventListener("pageshow", (e) => {
  // Check if the current page is the main page
  if (
    e.persisted ||
    (performance &&
      performance.getEntriesByType("navigation").length &&
      performance.getEntriesByType("navigation")[0].type === "back_forward")
  ) {
    // Clear the value of the search input field
    searchInput.value = "";
  }
});

themeGetter();
themeChanger.addEventListener("click", toggleTheme);
fetchAndRenderData(`${API}/all`);
