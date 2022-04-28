const trendingContent = document.querySelector('#trending-content');
prevSlideButton = document.querySelector('.prev-slide');
nextSlideButton = document.querySelector('.next-slide');
  posterURL = "https://image.tmdb.org/t/p/w220_and_h330_face";

let trending = []
let cardIndexStart = 0;
let cardIndexEnd = 6;

document.addEventListener("DOMContentLoaded", () => {
  trendingCard();
  nextSlideButton.addEventListener("click", nextSlide)
  prevSlideButton.addEventListener("click", prevSlide)
})

async function getFromAPI(API_URL) {
  const response = await fetch(API_URL);
  const responseContent = await response.json();
  return responseContent;
}

function trendingCard() {
  const API = "https://api.themoviedb.org/3/trending/movie/week?api_key=75c8aed355937ba0502f74d9a1aed11c";
  let posterPathURL = "https://www.themoviedb.org/t/p/w220_and_h330_face";
  (async () => {
    let result = await getFromAPI(API);
    result.results.forEach((element, index) => {
      trending.push(element)
    });
    createCard(trendingContent, trending, cardIndexStart, cardIndexEnd);
  })();
}

function createCard(path, data, indexStart, indexEnd) {
  let pushToHTML = []
  let slideContent = data.filter((element, index) => {
    return index <= indexEnd && index >= indexStart
  })
  slideContent.forEach(element => {
    let card = `
    <div class="card p-0 position-relative">
    <div class="position-relative">
      <img src="${posterURL + element.backdrop_path}" class="card-img-top w-100">
      <div class="vote"><span class="badge bg-secondary">${element.vote_average}</span></h1></div>
    </div>
      <div class="card-body pb-0">
        <h5 class="card-title fs-6">${element.original_title}</h5></h5>
        <p class="card-text text-white-50">${element.release_date}</p>
      </div>
    </div>
    `
    pushToHTML.push(card)
  });
  path.insertAdjacentHTML("beforeend", pushToHTML.join(""));
  
}

function nextSlide() {
  (cardIndexEnd === trending.length - 1) ? (cardIndexEnd = cardIndexEnd, cardIndexStart = cardIndexStart) : (cardIndexEnd += 1, cardIndexStart += 1);
  trendingContent.innerHTML = "";
  createCard(trendingContent, trending, cardIndexStart, cardIndexEnd);
}

function prevSlide() {
  (cardIndexStart === 0) ? (cardIndexEnd = cardIndexEnd, cardIndexStart = cardIndexStart) : (cardIndexEnd -= 1, cardIndexStart -= 1);
  trendingContent.innerHTML = "";
  createCard(trendingContent, trending, cardIndexStart, cardIndexEnd);
}

