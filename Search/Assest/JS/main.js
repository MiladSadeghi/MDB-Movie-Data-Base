const searchResult = document.querySelector("#search-content");
const posterURL = "https://image.tmdb.org/t/p/w220_and_h330_face";
const moviesCounter = document.querySelector("#movieCounter");
const tvCounter = document.querySelector("#tvCounter");
const collectionCounter = document.querySelector("#collectionCounter");
const personCounter = document.querySelector("#personCounter");
const companiesCounter = document.querySelector("#companyCounter");
const keywordCounter = document.querySelector("#keywordCounter");
let locationSearch = location.search;
let locationSearchParams = new URLSearchParams(locationSearch);
let userIDParam = locationSearchParams.get('search');
let movies = [];
let tv = [];
let collection = [];
let person = [];
let company = [];
let keyword = [];

document.title = userIDParam + " - Use Me As 2nd IMDB";

document.addEventListener("DOMContentLoaded", () => {
  startedPage();
})

function startedPage() {
  const API = `https://api.themoviedb.org/3/search/movie?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&query=${userIDParam}`;
  let searchResultArray = [];
  getFromAPI(API).then(data => {
    console.log(data);
    data.results.forEach(element => {
      console.log(element);
      let noImageAddClass = () => {
        return (element.poster_path == null) ? "no-image" : ""
      }
      let availablePosterPath = () => {
        return (element.poster_path == null) ? "/Search/Assest/Images/no-image.png" : (posterURL + element.poster_path);
      }
      let releaseDate = () => {
        return (element.release_date === "") ? "Unavailable Release Date" : element.release_date 
      }
      let searchResultCard = `
      <div class="card mb-3" style="max-width: auto;">
      <div class="row g-0">
        <div class="col-md-3 ${noImageAddClass()}">
          <img src="${availablePosterPath()}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">${element.original_title}</h5>
            <p class="card-text text">${element.overview}.</p>
            <p class="card-text"><small class="text-muted">${releaseDate()}</small></p>
          </div>
        </div>
      </div>
    </div>
      `
      searchResultArray.push(searchResultCard)
    })
    searchResult.insertAdjacentHTML('beforeend', searchResultArray.join(""))
  })
}

async function getFromAPI(API_LINK) {
  const response = await fetch(API_LINK);
  const result = response.json();
  return result;
}