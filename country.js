const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')
const themeChanger = document.querySelector('.theme-changer')
const body = document.body;

themeChanger.addEventListener('click',toggle);



fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    flagImage.src = country.flags.png
    flagImage.style.width = "288";
    flagImage.style.height = "170";
    countryNameH1.innerText = country.name.common
    population.innerText = country.population.toLocaleString('en-IN')
    region.innerText = country.region
    topLevelDomain.innerText = country.tld.join(', ')

    if (country.capital) {
      capital.innerText = country.capital?.[0]
    }

    if (country.subregion) {
      subRegion.innerText = country.subregion
    }

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common
    } else {
      nativeName.innerText = country.name.common
    }

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ')
    }

    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(', ')
    }

    console.log(country);
    if (country.borders) {
      
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            // console.log(borderCountry)
            const borderCountryTag = document.createElement('a')
            borderCountryTag.innerText = borderCountry.name.common
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
            borderCountries.append(borderCountryTag)
          })
      })
    }
  })



  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark');
  
    themeChanger.innerHTML = '<i class="fa-solid fa-moon"></i>&nbsp;&nbsp;Light Mode';
  
  }


function toggle (){
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