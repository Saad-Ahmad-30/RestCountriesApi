
let cardEL=document.querySelector(".countries-box");
const fetchText=async ()=> {
    try{
    var countryName=sessionStorage.getItem("countryName");
    let response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    let data = await response.json();

    data.forEach((element) => {
        let newCard=document.createElement("div");
        newCard.classList.add("text-grid");
        newCard.innerHTML=
        `<div class="details-flag">
        <img src=${element.flags.png} alt="flag image">
        </div>
        <div class="description2">
        <div >
            <h3>${element.name.common}</h3>
            <p > <span>Native Name:</span> ${
              Object.values(element.name.nativeName)[0].common ||
              element.name.nativeName
            }</p>
            <p><span>Population:</span> ${element.population}</p>
            <p><span>Region:</span> ${element.region}</p>
            <p><span>Sub Region:</span> ${element.subregion}</p>
            <p><span>Capital:</span> ${element.capital}</p>
       </div>
       <div>
            <p><span>Top Level Domain:</span> ${element.tld}</p>
            <p><span>Currencies:</span> ${Object.values(element.currencies)[0].name}</p>
            <p><span>Languages: </span> ${Object.values(element.languages)[0]}</p>
       </div>
       
       <div>
           <p class='border-countries-box'><span>Border Countries:</span> ${element.borders === undefined ? "No borders" : element.borders}
           </p>
       </div>
        </div>`;
        cardEL.appendChild(newCard);
    });
}
   catch(error){console.log(error)}
}

const toggleEl=document.querySelector(".theme-box");

toggleEl.addEventListener("click",()=> {
    
    var currentTheme = document.documentElement.getAttribute('data-theme');
    var text = document.getElementById('dark-mode-text');

    if (currentTheme === 'light') {
        targetTheme = 'dark';
        text.innerText = "Light Mode";
        document.getElementsByTagName('ion-icon')[0].setAttribute('name', 'sunny-outline');
    } else if (currentTheme === 'dark') {
        targetTheme = 'light';
        text.innerText = "Dark Mode";
        document.getElementsByTagName('ion-icon')[0].setAttribute('name', 'moon-outline');
    }

    document.documentElement.setAttribute('data-theme', targetTheme);

})


//Function calling

fetchText();










