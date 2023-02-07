let newCard='';
async function fetchText() {
    let response = await fetch('https://restcountries.com/v3.1/all');
    return await response.json();
}


fetchText().catch(console.error("Api Error")).
then((data)=>{
    data.forEach((element) => {
        // console.log(`Country Name:${element.name.common}`);
        // console.log(`Country population:${element.population}`);
        // console.log(`Country Capital:${element.capital}`);
        // console.log(`Country Region:${element.region}`);
        // console.log(`Country flag:${element.flags.png}`);
        newCard+=`<div class="card"><img src="${element.flags.png}" alt="flag">
        <h3><span>${element.name.common}</span></h3>
        <p><span>Population: </span>${element.population}</p>
        <p><span>Region: </span>${element.region}</p>
        <p><span>Capital: </span>${element.capital}</p></div>`;
    
    });
    var cardEL=document.querySelector("#cards")
    cardEL.innerHTML=`${newCard}`;
})
