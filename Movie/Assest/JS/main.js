// const search = JSON.parse(sessionStorage.getItem("movie"));
// document.title = search[search.length - 1] + "- Use Me As Second IMDB";
// document.querySelector("#search-bar").placeholder = search[search.length - 1];
// const querySearch = search[search.length - 1]

const bgURL = "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces"
const posterURL = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2"
const posterPath = document.querySelector('.img-poster img')
const headerHead = document.querySelector('.header h1')
const headerSpan = document.querySelector('.header span')
const tagLine = document.querySelector('.tagline')
const overview = document.querySelector('.movie-stuff p')
const cast = document.querySelector('#cast')
const profileURL = 'https://www.themoviedb.org/t/p/w138_and_h175_face'
const statusM = document.querySelector('.status')
const language = document.querySelector('.language')
const budget = document.querySelector('.budget')
const revenue = document.querySelector('.revenue')
const formatToCurrency = amount => {
  return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

document.addEventListener('DOMContentLoaded', ()=> {
  const dataHeader = getAPIHeader()
  showHeader(dataHeader)
  const dataCast = getAPICast()
  showCast(dataCast)
})
async function getAPIHeader() {
  const API = "https://api.themoviedb.org/3/movie/568620?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US"
  const response = await fetch(API)
  const result = await response.json()
  return result
}
async function getAPICast() {
  const API = "https://api.themoviedb.org/3/movie/568620/credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US"
  const response = await fetch(API)
  const result = await response.json()
  return result
}
async function getAPILanguage() {
  const API = "https://api.themoviedb.org/3/configuration/languages?api_key=75c8aed355937ba0502f74d9a1aed11c"
  const response = await fetch(API)
  const result = await response.json()
  return result
}

function showHeader(result) {
  let genres = '';
  result.then((e)=> {
    for (const iterator of e.genres) {
      genres += iterator.name + ','
    }
    genres = genres.slice(0, genres.length -1)
    document.documentElement.style.setProperty('--banner', `linear-gradient(90deg, rgba(168, 2, 2, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url('${bgURL + e.backdrop_path}') no-repeat`)
    posterPath.src = posterURL + e.poster_path
    headerHead.innerText = e.original_title
    headerSpan.innerHTML = `${e.release_date.replaceAll('-', '/')}  &#9679;  ${genres} &#9679; <span class="vote">${e.vote_average}</span>`
    tagLine.innerText = `"${e.tagline}"`
    overview.innerText = e.overview
    statusM.innerHTML = e.status
    languageName(e.original_language)
    budget.innerHTML = formatToCurrency(e.budget)
    revenue.innerHTML = formatToCurrency(e.revenue)
  })
}

function showCast(result) {
  result.then((e)=> {
    e.cast.forEach(element => {
      if(element.order <= 10) {
        cast.innerHTML += `
        <div class="item cast-card">
          <img src="${profileURL + element.profile_path}">
          <div class="cast-card-content">${element.name}</div>
        </div>
        `
      }
    });
    cast.innerHTML += `
      <div class="item last">view more ...</div>
    `
    Carousel()
  })
}

function languageName(lang) {
  getAPILanguage().then((e)=> {
    e.forEach(element => {
      if (element.iso_639_1 === lang) {
        language.innerHTML = element.english_name
      }
    });
  })
}

function Carousel() {
  $('.owl-carousel').owlCarousel({
    dots: true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:6
        }
    }
  })
}