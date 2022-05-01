const searchResult = document.querySelector("#search-content");
const posterURL = "https://image.tmdb.org/t/p/original/";
const resultCounter = document.querySelectorAll(".search-result .badge");
const searchResultType = document.querySelectorAll(".search-result p");
const resultType = document.querySelector(".search-result");


let locationSearch = location.search;
let locationSearchParams = new URLSearchParams(locationSearch);
let userIDParam = locationSearchParams.get('search');
let movieResult = [];
let tv = [];
let collection = [];
let person = [];
let company = [];
let keyword = [];

let noImageAddClass = (element) => {
  return (element.poster_path == null) ? "no-image" : ""
}
let availablePosterPath = (element) => {
  return ((element.poster_path || element.profile_path || element.logo_path) == null) ? "/Search/Assest/Images/no-image.png" : (posterURL + (element.poster_path || element.profile_path || element.logo_path));
}
let releaseDate = (element) => {
  return (element.release_date === "") ? "Unavailable Release Date" : element.release_date
}

let collaboratedProducts = (element) => {
  let name = "";
  element.forEach(element => {
    name += `${element.original_title || element.original_name} - `
  });
  return name.slice(0, name.length - 3);
}

let availableEstablishment = (element) => {
  return (element == "") ? "Establishment Not Available." : `Establishment In ${element}.`
}

let typesSeach = ["movie", "tv", "collection", "person", "company", "keyword"];
let typesArray = [movieResult, tv, collection, person, company, keyword];
document.title = userIDParam + " - Use Me As 2nd IMDB";

document.addEventListener("DOMContentLoaded", () => {
  searchResultElBG();
  startedPage();
  resultType.addEventListener("click", (event) => {
    switch (event.target.getAttribute("type")) {
      case "movie":
        movie();
        break;
      case "tv":
        tvShow();
        break;
      case "collection":
        collectionShow();
        break;
      case "person":
        personShow();
        break;
      case "company":
        companyShow();
        break;
      case "keyword":
        keywordShow(); 
        break;
    
      default: movie();
        break;
    }
  })
})

function movie() {
  let searchResultArray = [];
  searchResult.innerHTML = "";
  
    movieResult[0].results.forEach(element => {
      let searchResultCard = `
        <div class="card mb-3" style="max-width: auto;">
        <div class="row g-0">
          <div class="col-md-3 ${noImageAddClass(element)}">
            <img src="${availablePosterPath(element)}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h5 class="card-title">${element.original_title}</h5>
              <p class="card-text text">${element.overview}.</p>
              <p class="card-text"><small class="text-muted">${releaseDate(element)}</small></p>
            </div>
          </div>
        </div>
      </div>
        `
      searchResultArray.push(searchResultCard)
    })
    searchResult.insertAdjacentHTML('beforeend', searchResultArray.join(""))
}

async function getFromAPI(API_LINK) {
  const response = await fetch(API_LINK);
  const result = await response.json();
  return result;
}

async function startedPage() {
  for await (let [index,element] of typesArray.entries()) {
    let api = `https://api.themoviedb.org/3/search/${typesSeach[index]}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&query=${userIDParam}`
    let result =  await getFromAPI(api);
    resultCounter[index].innerHTML = result.total_results;
    element.push(result)
};
  movie();
}

function tvShow() {
  let searchResultArray = [];
  searchResult.innerHTML = "";
  tv[0].results.forEach(element => {
    let searchResultCard = `
      <div class="card mb-3" style="max-width: auto;">
      <div class="row g-0">
        <div class="col-md-3 ${noImageAddClass(element)}">
          <img src="${availablePosterPath(element)}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">${element.original_name}</h5>
            <p class="card-text text">${element.overview}.</p>
            <p class="card-text"><small class="text-muted">${releaseDate(element)}</small></p>
          </div>
        </div>
      </div>
    </div>
      `
    searchResultArray.push(searchResultCard)
  })
  searchResult.insertAdjacentHTML('beforeend', searchResultArray.join(""))
}

function collectionShow() {
  let searchResultArray = [];
  searchResult.innerHTML = "";
  collection[0].results.forEach(element => {
    let searchResultCard = `
      <div class="card mb-3" style="max-width: auto;">
      <div class="row g-0">
        <div class="col-md-3 ${noImageAddClass(element)}">
          <img src="${availablePosterPath(element)}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">${element.original_name}</h5>
            <p class="card-text text">${element.overview}.</p>
          </div>
        </div>
      </div>
    </div>
      `
    searchResultArray.push(searchResultCard)
  })
  searchResult.insertAdjacentHTML('beforeend', searchResultArray.join(""))
}

function personShow() {
  let searchResultArray = [];
  searchResult.innerHTML = "";
  person[0].results.forEach(element => {
    let searchResultCard = `
      <div class="card mb-3" style="max-width: auto;">
      <div class="row g-0">
        <div class="col-md-3 ${noImageAddClass(element)}">
          <img src="${availablePosterPath(element)}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">${element.name} - ${element.known_for_department}</h5>
            <p class="card-text text">${collaboratedProducts(element.known_for)}.</p>
          </div>
        </div>
      </div>
    </div>
      `
    searchResultArray.push(searchResultCard)
  })
  searchResult.insertAdjacentHTML('beforeend', searchResultArray.join(""))
}

function companyShow() {
  let searchResultArray = [];
  searchResult.innerHTML = "";
  company[0].results.forEach(element => {
    let searchResultCard = `
      <div class="card mb-3" style="max-width: auto;">
      <div class="row g-0">
        <div class="col-md-3 ${noImageAddClass(element)}">
          <img src="${availablePosterPath(element)}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text text">${availableEstablishment(element.origin_country)}</p>
          </div>
        </div>
      </div>
    </div>
      `
    searchResultArray.push(searchResultCard)
  })
  searchResult.insertAdjacentHTML('beforeend', searchResultArray.join(""))
}

function keywordShow() {
  let searchResultArray = [];
  searchResult.innerHTML = "";
  company[0].results.forEach(element => {
    let searchResultCard = `
    <span class="badge bg-secondary me-2 mb-2 fs-6 fw-normal">${element.name}</span>
      `
    searchResultArray.push(searchResultCard)
  })
  searchResult.insertAdjacentHTML('beforeend', searchResultArray.join(""))
}

function searchResultElBG() {
  searchResultType.forEach(element => {
    element.addEventListener('click', () => {
      searchResultType.forEach(element => {
        element.classList.remove('active')
      })
      element.classList.add('active')
    })
  })
}