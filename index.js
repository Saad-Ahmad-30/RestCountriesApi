let newCard=``;
let cardEL=document.querySelector(".countries-box");
const fetchText=async ()=> {
    try{
    let response = await fetch('https://restcountries.com/v3.1/all');
 let data =await response.json();

    data.forEach((element) => {
        // console.log(`Country Name:${element.name.common}`);
        // console.log(`Country population:${element.population}`);
        // console.log(`Country Capital:${element.capital}`);
        // console.log(`Country Region:${element.region}`);
        // console.log(`Country flag:${element.flags.png}`);
        newCard+=`
        <div class="country-item">
        <div class="flag"> 
        <img src="${element.flags.png}" alt="flag" width="270" height="160">
        </div>
        <div class="description">
        <h3><span>${element.name.common}</span></h3>
        <p id="pop"><span>Population: </span>${element.population}</p>
        <p><span>Region: </span>${element.region}</p>
        <p><span>Capital: </span>${element.capital}</p>
        </div>
        </div>`;
    });
    cardEL.innerHTML=`${newCard}`;
}
   catch(error){console.log(error)}
}


fetchText();
function toggleTheme() {
    
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

}