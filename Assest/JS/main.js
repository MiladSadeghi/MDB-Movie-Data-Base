const trendingContent = document.querySelector('#trending-content');
const popluarContent = document.querySelector('#popluar-content');
const trendingNextSlide = document.querySelector("#next-trending");
const trendingPrevSlide = document.querySelector("#prev-trending");
const trendingCards = document.querySelector(".trending-cards");
const popluarNextSlide = document.querySelector("#next-popluar");
const popluarPrevSlide = document.querySelector("#prev-popluar");
const popluarCards = document.querySelector(".popluar-cards");
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector("#search")
const posterURL = "https://image.tmdb.org/t/p/original";

let trending = []
let popluar = []

document.addEventListener("DOMContentLoaded", () => {
  trendingCard();
  popluarCard();
  trendingNextSlide.parentElement.addEventListener("click", () => {
    trendingCards.scrollLeft += 350;
  })
  trendingPrevSlide.parentElement.addEventListener("click", () => {
    trendingCards.scrollLeft -= 350;
  })
  popluarNextSlide.parentElement.addEventListener("click", () => {
    popluarCards.scrollLeft += 350;
  })
  popluarPrevSlide.parentElement.addEventListener("click", () => {
    popluarCards.scrollLeft -= 350;
  })
  searchBtn.addEventListener("click", handleSearch)
})

async function getFromAPI(API_URL) {
  const response = await fetch(API_URL);
  const responseContent = await response.json();
  return responseContent;
}

function trendingCard() {
  const API = "https://api.themoviedb.org/3/trending/movie/week?api_key=75c8aed355937ba0502f74d9a1aed11c";
  (async () => {
    let result = await getFromAPI(API);
    result.results.forEach((element, index) => {
      trending.push(element)
    });
    console.log(trending);
    createCard(trending, trendingCards);
  })();
}

function createCard(array, path) {
  let pushToHTML = []
  array.forEach(element => {
    console.log(element.id);
    let card = `
    <div class="col me-4">
    <a href="/movie/?id=${element.id}" target="_blank">
      <div class="card h-100 w-100 p-0">
        <div class="position-relative">
          <img src="${posterURL + element.backdrop_path}" class="card-img-top">
          <div class="vote"><span class="badge bg-secondary">${element.vote_average}</span></h1></div>
        </div>
        <div class="card-body pb-0">
          <h5 class="card-title fs-6">${element.original_title}</h5></h5>
          <p class="card-text text-white-50">${element.release_date}</p>
        </div>
      </div>
      </a>
    </div>
    `
    pushToHTML.push(card)
  });
  path.insertAdjacentHTML("beforeend", pushToHTML.join(""));
}

function popluarCard() {
  const API = "https://api.themoviedb.org/3/movie/popular?api_key=75c8aed355937ba0502f74d9a1aed11c";
  (async () => {
    let result = await getFromAPI(API);
    result.results.forEach((element, index) => {
      popluar.push(element)
    });
    createCard(popluar, popluarCards);
  })();
}

function handleSearch() {
  if (searchInput.value === "") {
    let toastClass = document.querySelector("#liveToast")
    var toast = new bootstrap.Toast(toastClass)
    toast.show()
  } else {
    window.location.href = `./search/?search=${searchInput.value}`
  }
}