const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-changer')
let allCountriesData;
const body = document.body;


// Get the stored theme from local storage, or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  body.classList.add('dark');
  themeChanger.innerHTML = '<i class="fa-solid fa-moon"></i>&nbsp;&nbsp;Light Mode';
}

themeChanger.addEventListener('click',toggle);

fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
  })

filterByRegion.addEventListener('change', (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)
})

function renderCountries(data) {
  countriesContainer.innerHTML = ''
  data.forEach((country) => {
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')
    countryCard.href = `./country.html?name=${country.name.common}`
    countryCard.innerHTML = `
          <img src="${country.flags.png}" alt="${country.name.common} flag"  width="288" height="170"/>
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                'en-IN'
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `
    countriesContainer.append(countryCard)
  })
}


searchInput.addEventListener('input',  (e) => {
  const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  renderCountries(filteredCountries)

})


// themeChanger.addEventListener('click', () => {
//   document.body.classList.toggle('dark')
// })



function toggle() {
  // Toggle the body class
  body.classList.toggle('dark');
  // Update the theme preference in local storage
  const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);

  // Update the button text
  const buttonHtml = body.classList.contains('dark')
    ? '<i class="fa-solid fa-moon"></i>&nbsp;&nbsp;Light Mode'
    : '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode';
  themeChanger.innerHTML = buttonHtml;
}
window.addEventListener('pageshow', (e) => {
  // Check if the current page is the main page
  if (e.persisted || (window.performance && window.performance.navigation.type === 2)) {
    // Clear the value of the search input field
    searchInput.value = '';
  }
f});
