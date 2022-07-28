const searchResult = document.querySelector("#search-content");
const posterURL = "https://image.tmdb.org/t/p/original/";
const resultCounter = document.querySelectorAll(".search-result .badge");
const searchResultType = document.querySelectorAll(".search-result p");
const resultType = document.querySelector(".search-result");
const pageNationUlist = document.querySelector("#ul-pagenation")
const locationSearch = location.search;
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector(".search-btn");
const navBar = document.querySelector("nav")
const locationSearchParams = new URLSearchParams(locationSearch);
const userIDParam = locationSearchParams.get('search');

let movieResult = [];
let tv = [];
let collection = [];
let person = [];
let company = [];
let keyword = [];
let classResult = [];
let now = [];

document.title = userIDParam + " - Use Me As 2nd IMDB";

let noImageAddClass = (element) => {
  return (element.poster_path == null) ? "no-image" : ""
}
let availablePosterPath = (element) => {
  return ((element.poster_path || element.profile_path || element.logo_path) == null) ? "/Search/Assest/Images/no-image.png" : (posterURL + (element.poster_path || element.profile_path || element.logo_path));
}
let genderPhoto = (element) => {
  if(element.gender === 1) {
    return `/Search/Assest/Images/profile.png`
  } else if(element.gender === 2) {
    return `/Search/Assest/Images/profile2.png`
  } else if(element.gender === 3) {
    return `/Search/Assest/Images/non-binary.png`
  }
}
let releaseDate = (element) => {
  return (element.release_date === "" || element.first_air_date === "") ? "Unavailable Release Date" : (element.release_date || element.first_air_date)
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
    }
  })
  pageNationUlist.addEventListener('click', async (e) => {
    e.stopImmediatePropagation();
    if (e.target.classList.contains("page-next")) {
      let nowObject = now[1];
      if (nowObject[2] <= nowObject[1]) {
        nowObject[2]++;
      }
      await pageNation(nowObject[2], nowObject[1], nowObject[3], nowObject)
      now[0]();
    }
    if (e.target.classList.contains("page-prev")) {
      let nowObject = now[1];
      if (nowObject[2] <= nowObject[1]) {
        nowObject[2]--;
      }
      now[0]();
    }
  })
  searchButton.addEventListener('click', () => {
    if (searchInput.value != "") {
      location.href = `/search/?search=${searchInput.value}`
    } else {
      navBar.animate([
        { boxShadow: 'none' },
        { boxShadow: 'inset 0px 7px 20px rgb(255 0 0 / 51%), inset 0px -7px 20px rgb(255 0 0 / 51%)' },
        { boxShadow: 'none' }
      ], {
        duration: 1400,
        iterations: 2
      });
    }
  })
})

function movie() {
  now[0] = movie;
  now[1] = movieResult;
  let searchResultArray = [];
  searchResult.innerHTML = "";
  pageNationUlist.innerHTML = "";
  movieResult[0].results.forEach(element => {
    let searchResultCard = `
    <a href="/movie/?id=${element.id}" target="_blank">
        <div class="card mb-3" style="max-width: auto;">
        <div class="row g-0">
          <div class="col-md-3 ${noImageAddClass(element)}">
            <img src="${availablePosterPath(element)}" class="img-fluid rounded-start w-100" alt="...">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h5 class="card-title">${element.original_title}</h5>
              <p class="card-text text-color fw-normal">${element.overview}.</p>
              <p class="card-text"><small class="text-muted">${releaseDate(element)}</small></p>
            </div>
          </div>
        </div>
        </div>
        </a>
        `
    searchResultArray.push(searchResultCard)
  })
  searchResult.insertAdjacentHTML('beforeend', searchResultArray.join(""))
  pageNation(Number(movieResult[2]), Number(movieResult[1]), "movie", movieResult, movie);
}

async function getFromAPI(API_LINK) {
  const response = await fetch(API_LINK);
  const result = await response.json();
  return result;
}

async function startedPage() {
  for await (let [index, element] of typesArray.entries()) {
    let api = `https://api.themoviedb.org/3/search/${typesSeach[index]}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&query=${userIDParam}`
    let result = await getFromAPI(api);
    resultCounter[index].innerHTML = result.total_results;
    element.push(result);
    element.push(result.total_pages);
    element.push(result.page);
    element.push(typesSeach[index]);
  };
  movie();
}

function tvShow() {
  now[0] = tvShow;
  now[1] = tv;
  let searchResultArray = [];
  searchResult.innerHTML = "";
  tv[0].results.forEach(element => {
    let searchResultCard = `
    <a href="/tv/?id=${element.id}" target="_blank">
      <div class="card mb-3" style="max-width: auto;">
      <div class="row g-0">
        <div class="col-md-3 ${noImageAddClass(element)}">
          <img src="${availablePosterPath(element)}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">${element.original_name}</h5>
            <p class="card-text text-color">${element.overview}.</p>
            <p class="card-text"><small class="text-muted">${releaseDate(element)}</small></p>
          </div>
        </div>
      </div>
    </div>
    </a>
      `
    searchResultArray.push(searchResultCard)
  })
  searchResult.insertAdjacentHTML('beforeend', searchResultArray.join(""))
  pageNation(Number(tv[2]), Number(tv[1]), "tv", tv, tvShow);
}

function collectionShow() {
  now[0] = collectionShow;
  now[1] = collection;
  let searchResultArray = [];
  searchResult.innerHTML = "";
  collection[0].results.forEach(element => {
    let searchResultCard = `
    <a href="/collection/?id=${element.id}" target="_blank">
      <div class="card mb-3" style="max-width: auto;">
      <div class="row g-0">
        <div class="col-md-3 ${noImageAddClass(element)}">
          <img src="${availablePosterPath(element)}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">${element.original_name}</h5>
            <p class="card-text text-color">${element.overview}.</p>
          </div>
        </div>
      </div>
    </div>
    </a>
      `
    searchResultArray.push(searchResultCard)
  })
  searchResult.insertAdjacentHTML('beforeend', searchResultArray.join(""))
  pageNation(Number(collection[2]), Number(collection[1]), "collection", collection, collectionShow);
}

function personShow() {
  now[0] = personShow;
  now[1] = person;
  let searchResultArray = [];
  searchResult.innerHTML = "";
  person[0].results.forEach(element => {
    let searchResultCard = `
    <a href="/person/?id=${element.id}" target="_blank">
      <div class="card mb-3" style="max-width: auto;">
      <div class="row g-0">
        <div class="col-md-3 ${noImageAddClass(element)}">
          <img src="${genderPhoto(element)}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">${element.name} - ${element.known_for_department}</h5>
            <p class="card-text text-color">${collaboratedProducts(element.known_for)}.</p>
          </div>
        </div>
      </div>
    </div>
    </a>
      `
    searchResultArray.push(searchResultCard)
  })
  searchResult.insertAdjacentHTML('beforeend', searchResultArray.join(""))
  pageNation(Number(person[2]), Number(person[1]), "person", person, personShow);
}

function companyShow() {
  now[0] = companyShow;
  now[1] = company;
  let searchResultArray = [];
  searchResult.innerHTML = "";
  company[0].results.forEach(element => {
    let searchResultCard = `
    <a href="/company/?id=${element.id}" target="_blank">
      <div class="card mb-3" style="max-width: auto;">
      <div class="row g-0">
        <div class="col-md-3 ${noImageAddClass(element)}">
          <img src="${availablePosterPath(element)}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text text-color">${availableEstablishment(element.origin_country)}</p>
          </div>
        </div>
      </div>
    </div>
    </a>
      `
    searchResultArray.push(searchResultCard)
  })
  searchResult.insertAdjacentHTML('beforeend', searchResultArray.join(""))
  pageNation(Number(company[2]), Number(company[1]), "company", company, companyShow);
}

function keywordShow() {
  now[0] = keywordShow;
  now[1] = keyword;
  let searchResultArray = [];
  searchResult.innerHTML = "";
  keyword[0].results.forEach(element => {
    let searchResultCard = `
    <a href="/keyword/?id=${element.id}&keyword=${element.name}&show=tv" target="_blank">
    <span class="badge bg-secondary me-2 mb-2 fs-6 fw-normal">${element.name}</span></a>
      `
    searchResultArray.push(searchResultCard)
  })
  searchResult.insertAdjacentHTML('beforeend', searchResultArray.join(""))
  pageNation(Number(keyword[2]), Number(keyword[1]), "keyword", keyword, keywordShow);
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

async function pageNation(pageNow, totalPage, searchType, searchArray) {
  let api = `https://api.themoviedb.org/3/search/${searchType}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&query=${userIDParam}&page=${pageNow}`;
  let result = await getFromAPI(api)

  searchArray[2] = pageNow;
  searchArray[0] = result;
  pageNationUlist.innerHTML = `
  <li class="page-item ${pageNow === 1 ? "disabled" : ""}"><a class="page-link page-prev" href="#">Previous</a></li>
  <li class="page-item ${pageNow === totalPage ? 'disabled' : ''} "><a class="page-link page-next" href="#">Next</a></li>
  `
}