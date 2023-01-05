const loadPhone = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);

}

// !card daynamic
const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById("phone-contauner");
    phoneContainer.textContent = "";
    // slice
    // 
    const showAll = document.getElementById("show-all");
    if(dataLimit && phones.length > 9){
        phones = phones.slice(0, 9);
        showAll.classList.remove("d-none")
    }
    else{
        showAll.classList.add("d-none")
    }

    const noPhone = document.getElementById("no-found-massege");
    if(phones.length === 0){
        noPhone.classList.remove("d-none")
    }
    else{
        noPhone.classList.add("d-none")
    }

    // !display all phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement("div");
        phoneDiv.classList.add("col");
        phoneDiv.innerHTML =`
        <div class="card h-100 p-5">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModel">More Details</button>
        </div>
        </div>
        `
        phoneContainer.appendChild(phoneDiv);
    });
    // !stop spinner loader
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const serachInput = document.getElementById("search-input");
    const searchText = serachInput.value;
    
    loadPhone(searchText, dataLimit);
    
}

//! search iput field
document.getElementById("btn-search").addEventListener("click", function(){
    processSearch(9);
    
})

// !enter hit to search even handaler
document.getElementById("search-input").addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        processSearch(9);
    }
})

// !spinner loader
const toggleSpinner = (isLoading) => {
    const loadSpinner = document.getElementById("loder");
    if(isLoading){
        loadSpinner.classList.remove("d-none")
    }
    else{
        loadSpinner.classList.add("d-none")
    }
}

// !Show all button hanaler
document.getElementById("btn-show-all").addEventListener("click", function(){
    processSearch();
})

const loadPhoneDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data);

}

const displayPhoneDetail = (phone) => {
    // console.log(phone);

    const modelTitle= document.getElementById("phoneDetailModelTitle");
    modelTitle.innerText = phone.name;

    const phoneDetail = document.getElementById("phone-detail");
    phoneDetail.innerHTML =`
        <P>Relese Date: ${phone.releaseDate ? phone.releaseDate : "Relese Date Not Found"}</p>
        <P>Main Featur: ${phone.mainFeatures ? phone.mainFeatures.storage : "Main Featur Not Found"}</p>
        <P>Display Size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : "Display Size Not Found"}</p>
        <P>Chip Set: ${phone.mainFeatures ? phone.mainFeatures.chipSet : "Chip Set Not Found"}</p>
        <P>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : "Memory Not Found"}</p>
    `
}
