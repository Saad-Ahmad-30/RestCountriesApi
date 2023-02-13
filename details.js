
let cardEL = document.querySelector(".countries-box");
const toggleEl = document.querySelector(".theme-box");
const fetchText = async () => {
  try {
    var countryName = sessionStorage.getItem("countryName");
    let response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    );
    let data = await response.json();

    data.forEach((element) => {
      let newCard = document.createElement("div");
      newCard.classList.add("text-grid");
      newCard.innerHTML = `<div class="details-flag">
        <img src=${element.flags.png} alt="flag image">
        </div>
        <div class="description2">
            <h2><span>${element.name.common}</span></h2>
            <p > <span>Native Name:</span> ${
              Object.values(element.name.nativeName)[0].common ||
              element.name.nativeName
            }</p>
            <p><span>Population:</span> ${element.population.toLocaleString()}</p>
            <p><span>Region:</span> ${element.region}</p>
            <p><span>Sub Region:</span> ${element.subregion}</p>
            <p><span>Capital:</span> ${element.capital}</p>
            <p><span>Top Level Domain:</span> ${element.tld}</p>
            <p><span>Currencies:</span> ${
              Object.values(element.currencies)[0].name
            }</p>
            <p><span>Languages: </span> ${
              Object.values(element.languages)[0]
            }</p>
       
       <div class="neighboring-countries">
           <div class="border-countries-box">
           <p><span>Border Countries:</span> ${
             element.borders === undefined ? "No borders" : element.borders
           }
           </p>
           </div>
       </div>
       </div>
     `;
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
})



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

//Function calling

fetchText();
