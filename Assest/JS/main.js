const trendingContent = document.querySelector('#trending-content');
const popluarContent = document.querySelector('#popluar-content');
const trendPrevBtnSlide = document.querySelector('.trending .prev-slide');
const trendNextBtnSlide = document.querySelector('.trending .next-slide');
const popluarPrevBtnSlide = document.querySelector('.popluar .prev-slide');
const popluarNextBtnSlide = document.querySelector('.popluar .next-slide');
const posterURL = "https://image.tmdb.org/t/p/w220_and_h330_face";

let trending = []
let popluar = []
let trendCardIndexStart = 0;
let trendCardIndexEnd = 5;
let popluarCardIndexStart = 0;
let popluarCardIndexEnd = 5;

document.addEventListener("DOMContentLoaded", () => {
  trendingCard();
  popluarCard();
  trendNextBtnSlide.addEventListener("click", nextSlide)
  trendPrevBtnSlide.addEventListener("click", prevSlide)
  popluarNextBtnSlide.addEventListener("click", nextSlide)
  popluarPrevBtnSlide.addEventListener("click", prevSlide)
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
    createCard(trendingContent, trending, trendCardIndexStart, trendCardIndexEnd);
  })();
}

function createCard(path, data, indexStart, indexEnd) {
  let pushToHTML = []
  let slideContent = data.filter((element, index) => {
    return index <= indexEnd && index >= indexStart
  })
  slideContent.forEach(element => {
    let card = `
    <div class="col">
      <div class="card h-100 p-0 position-relative">
        <div class="position-relative">
          <img src="${posterURL + element.backdrop_path}" class="card-img-top w-100">
          <div class="vote"><span class="badge bg-secondary">${element.vote_average}</span></h1></div>
        </div>
        <div class="card-body pb-0">
          <h5 class="card-title fs-6">${element.original_title}</h5></h5>
          <p class="card-text text-white-50">${element.release_date}</p>
        </div>
      </div>
    </div>
    `
    pushToHTML.push(card)
  });
  path.insertAdjacentHTML("beforeend", pushToHTML.join(""));

}

function nextSlide(event) {
  if (event.target.getAttribute("section") === "trending") {
    (trendCardIndexEnd === trending.length - 1) ? (trendCardIndexEnd = trendCardIndexEnd, trendCardIndexStart = trendCardIndexStart) : (trendCardIndexEnd += 1, trendCardIndexStart += 1);
    trendingContent.innerHTML = "";
    createCard(trendingContent, trending, trendCardIndexStart, trendCardIndexEnd);
  }
  if (event.target.getAttribute("section") === "popluar") {
    (popluarCardIndexEnd === trending.length - 1) ? (popluarCardIndexEnd = popluarCardIndexEnd, popluarCardIndexStart = popluarCardIndexStart) : (popluarCardIndexEnd += 1, popluarCardIndexStart += 1);
    popluarContent.innerHTML = "";
    createCard(popluarContent, popluar, popluarCardIndexStart, popluarCardIndexEnd);
  }
}

function prevSlide(event) {
  if (event.target.getAttribute("section") === "trending") {
    (trendCardIndexStart === 0) ? (trendCardIndexEnd = trendCardIndexEnd, trendCardIndexStart = trendCardIndexStart) : (trendCardIndexEnd -= 1, trendCardIndexStart -= 1);
    trendingContent.innerHTML = "";
    createCard(trendingContent, trending, trendCardIndexStart, trendCardIndexEnd);
  }
  if (event.target.getAttribute("section") === "popluar") {
    (popluarCardIndexEnd === 0) ? (popluarCardIndexEnd = popluarCardIndexEnd, popluarCardIndexStart = popluarCardIndexStart) : (popluarCardIndexEnd -= 1, popluarCardIndexStart -= 1);
    popluarContent.innerHTML = "";
    createCard(popluarContent, popluar, popluarCardIndexStart, popluarCardIndexEnd);
  }
}

function popluarCard() {
  const API = "https://api.themoviedb.org/3/movie/popular?api_key=75c8aed355937ba0502f74d9a1aed11c";
  (async () => {
    let result = await getFromAPI(API);
    result.results.forEach((element, index) => {
      popluar.push(element)
    });
    createCard(popluarContent, popluar, popluarCardIndexStart, popluarCardIndexEnd);
  })();
}
