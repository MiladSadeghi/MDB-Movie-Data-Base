const collectionTitle = document.querySelector("#collection-title");
const poster = document.querySelector(".image-banner img");
const headerSection = document.querySelector(".header");
const headerContent = document.querySelector(".header-content");
const orginalImageURL = "https://image.tmdb.org/t/p/original";
const collectionIDParam = new URLSearchParams(location.search).get("id");

let collectionDataObj = {};
let genresObject = [
  [28, "Action"],
  [12, "Adventure"],
  [16, "Animation"],
  [35, "Comedy"],
  [80, "Crime"],
  [99, "Documentary"],
  [18, "Drama"],
  [10751, "Family"],
  [14, "Fantasy"],
  [36, "History"],
  [27, "Horror"],
  [10402, "Music"],
  [9648, "Mystery"],
  [10749, "Romance"],
  [878, "Science Fiction"],
  [10770, "TV Movie"],
  [53, "Thriller"],
  [10752, "War"],
  [37, "Western"],
]
let apiURL = [`https://api.themoviedb.org/3/collection/${collectionIDParam}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`]

document.addEventListener("DOMContentLoaded", () => {
  getFromAPI(apiURL);
})

async function getFromAPI(apiURL) {
  let requests = apiURL.map(async (item) =>
    await fetch(item).then(async (response) => await response.json()));
  Promise.all(requests).then(async (datas) => {
    collectionDataObj["collectionDetails"] = datas[0];
    header();
  })
}

function numberToUSD(number) {
  return `$${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}

async function header() {
  document.title = collectionDataObj["collectionDetails"].name + ' - IMDB #2';
  poster.src = `${orginalImageURL}${collectionDataObj["collectionDetails"].poster_path}`;
  headerSection.style.backgroundImage = `url(${orginalImageURL}${collectionDataObj["collectionDetails"].backdrop_path})`
  headerSection.style.backgroundPosition = "right -200px top -120px";
  headerSection.style.backgroundRepeat = "no-repeat";
  headerSection.style.backgroundSize = "cover";
  collectionTitle.innerHTML = collectionDataObj["collectionDetails"].name;
  let setObj = new Set();
  let genre = [];
  let revenue = 0;
  for (item of collectionDataObj["collectionDetails"].parts) {
    await fetch(`https://api.themoviedb.org/3/movie/${item.id}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`).then(async (response) => (await response.json())).then(async (data) => {
      revenue += Number(data.revenue);
    })
    genresObject.forEach(item1 => {
      if (item.genre_ids.includes(item1[0])) {
        if (!setObj.has(item1[1])) {
          setObj.add(item1[1]);
          genre.push(item1[1])
        }
      }
    })
  };
  console.log(revenue);
  headerContent.innerHTML = `
    <p class="text-color mb-4">${genre.join(", ")}</p>
    <h6 class="text-color fs-5">Overview</h6>
    <p class="text-color mb-5">${collectionDataObj["collectionDetails"].overview}</p>
    <div class="d-block mb-2">
      <h6 class="text-color d-inline">Revenue:</h6>
      <span class="text-color" text-color fs-6 fw-light">${numberToUSD(revenue)}</span>
    </div>
    <div class="d-block">
      <h6 class="text-color d-inline">Number Of Movies: </h6>
      <span class="text-color fs-6 fw-light">${collectionDataObj["collectionDetails"].parts.length}</span>
    </div>
  `
  console.log(collectionDataObj);
}