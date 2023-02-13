

const cardEL = document.querySelector(".countries-box");
const backButton = document.getElementById("back-btn");
const filter = document.getElementById("regions");
const form = document.getElementById("input-form");
const searchInput = document.getElementById("search");
const toggleEl = document.querySelector(".theme-box");
const showData = () => {
  let url = "https://restcountries.com/v3.1/all";
  fetchText(url);
};

const fetchText = async (url) => {
  try {
    let response = await fetch(url);
    let data = await response.json();

    data.forEach((element) => {
      let newCard = document.createElement("div");
      newCard.classList.add("card");
      newCard.innerHTML = `<div class="country-item">
        <div class="flag"> 
        <img src="${element.flags.png}" alt="flag" width="288" height="170">
        </div>
        <div class="description">
        <h3><span>${element.name.common}</span></h3>
        <p><span>Population: </span>${element.population.toLocaleString()}</p>
        <p><span>Region: </span>${element.region}</p>
        <p><span>Capital: </span>${element.capital}</p>
        </div>
        </div>
        `;

      newCard.addEventListener("click", () => {
        window.location.assign(
          "./details.html"
        );
        sessionStorage.setItem("countryName", element.name.common);
      });
      cardEL.appendChild(newCard);
    });
  } catch (error) {
    console.log(error);
  }
};



toggleEl.addEventListener("click", () => {
  let currentTheme = document.documentElement.getAttribute("data-theme");
  let targetTheme = "";
  let text = document.getElementById("dark-mode-text");

  if (currentTheme === "light") {
    targetTheme = "dark";
    text.innerText = "Light Mode";
    document
      .getElementsByTagName("ion-icon")[0]
      .setAttribute("name", "sunny-outline");
  } else if (currentTheme === "dark") {
    targetTheme = "light";
    text.innerText = "Dark Mode";
    document
      .getElementsByTagName("ion-icon")[0]
      .setAttribute("name", "moon-outline");
  }

  document.documentElement.setAttribute("data-theme", targetTheme);
  localStorage.setItem("theme", targetTheme);
});

window.addEventListener("load", () => {
  let theme = localStorage.getItem("theme");
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
    let text = document.getElementById("dark-mode-text");
    if (theme === "light") {
      text.innerText = "Dark Mode";
      document
        .getElementsByTagName("ion-icon")[0]
        .setAttribute("name", "moon-outline");
    } else {
      text.innerText = "Light Mode";
      document
        .getElementsByTagName("ion-icon")[0]
        .setAttribute("name", "sunny-outline");
    }
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let searchTerm = searchInput.value;
  console.log(searchTerm);
  if(!searchTerm)
  {
    showData();
  } 
else {
  const response = await fetch(
    `https://restcountries.com/v2/name/${searchTerm}`
  );
  const data = await response.json();

  cardEL.innerHTML = "";
  for (const country of data) {
    const countryElement = document.createElement("div");
    countryElement.classList.add("country-item");

    const flagElement = document.createElement("img");
    flagElement.classList.add("flag");
    flagElement.src = country.flag;
    
    const titleElement = document.createElement("h3");
    titleElement.classList.add("headingEl");
    titleElement.textContent = country.name;
    const listElement = document.createElement("ul");

    listElement.innerHTML = `
     <div class="search-card"> <li><span>Population: </span>${country.population.toLocaleString()}</li>
      <li><span>Region: </span>${country.region}</li>
      <li><span>Capital: </span>${country.capital}</li>
   </div> `;

    countryElement.appendChild(flagElement);
    countryElement.appendChild(titleElement);
    countryElement.appendChild(listElement);
    cardEL.appendChild(countryElement);

  }

  cardEL.addEventListener("click", () => {
    console.log(searchTerm);
    window.location.assign("./details.html");
    sessionStorage.setItem("countryName",searchTerm);
    
  });

}});






const filterByRegion = async () => {
  let Url = "https://restcountries.com/v3.1/all";

  let response = await fetch(Url);
  let data = await response.json();
  let uniqueRegions = [...new Set(data.map((element) => element.region))];
  uniqueRegions.forEach((region) => {
    if (!filter.innerHTML.includes(region)) {
      const option = document.createElement("option");
      option.innerText = region;
      filter.appendChild(option);
    }
  });
};






filter.addEventListener("change", (e) => {
  let SearchName = e.target.value;
  if (SearchName === "") return;
  cardEL.innerHTML = "";
  const Url = `https://restcountries.com/v3.1/region/${SearchName}?fullText=true`;
  fetchText(Url);
});

const homePage=document.getElementById("home-page");
homePage.addEventListener("click",() => {
  window.location.assign(
    "./index.html"
  )});





showData();
filterByRegion();

