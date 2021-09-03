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
const homePage = document.querySelector('.fa-home').parentElement
const facebook = document.querySelector('.fa-facebook-square').parentElement
const twitter = document.querySelector('.fa-instagram').parentElement
const instagram = document.querySelector('.fa-twitter-square').parentElement
const keyword = document.querySelector('.keywords-content')
const backdroupURL = 'https://www.themoviedb.org/t/p/w1440_and_h320_multi_faces'
const collectionContent = document.querySelector('.collection-content')

document.addEventListener('DOMContentLoaded', ()=> {
  const dataHeader = getAPIHeader()
  const dataSocial = getAPISocial()
  const dataKeywords = getAPIKeyword()
  showHeader(dataHeader)
  showSide(dataHeader, dataSocial, dataKeywords)
  const dataCast = getAPICast()
  showMain(dataCast, dataHeader)
})

async function getAPIHeader() {
  const API = "https://api.themoviedb.org/3/movie/593910?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US"
  const response = await fetch(API)
  const result = await response.json()
  return result
}
async function getAPICast() {
  const API = "https://api.themoviedb.org/3/movie/593910/credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US"
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
async function getAPISocial() {
  const API = "https://api.themoviedb.org/3/movie/593910/external_ids?api_key=75c8aed355937ba0502f74d9a1aed11c"
  const response = await fetch(API)
  const result = await response.json()
  return result
}
async function getAPIKeyword() {
  const API = "https://api.themoviedb.org/3/movie/593910/keywords?api_key=75c8aed355937ba0502f74d9a1aed11c"
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
  })
}

function showMain(result, result1) {
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

  result1.then((e)=> {
    if(e.belongs_to_collection !== null) {
      document.documentElement.style.setProperty('--collection-image', `url(${backdroupURL + e.belongs_to_collection.backdrop_path})`)
      collectionContent.children[0].innerHTML = `Part Of The ${e.belongs_to_collection.name}`
      collectionContent.children[1].innerHTML = `VIEW THE COLLECTION`
    }
    else {
      collectionContent.parentElement.style.display = 'none'
    }
  })
}

function showSide(result, result1, result2) {
  result.then(e => {
    statusM.innerHTML = e.status
    languageName(e.original_language)
    budget.innerHTML = ((e.budget === 0)? '-': formatToCurrency(e.budget))
    revenue.innerHTML = ((e.budget === 0)? '-': formatToCurrency(e.revenue))
    homePage.href = e.homepage
  });

  result1.then((e)=> {
    facebook.href =  'https://www.facebook.com/' + e.facebook_id
    instagram.href =  'https://www.instagram.com/' + e.instagram_id
    twitter.href =  'https://www.twitter.com/' + e.twitter_id
  })

  result2.then((e)=> {
    if(e.keywords.length !== 0) {
      e.keywords.forEach(element => {
        keyword.innerHTML += `
        <a href="#" data-id="${element.id}">${element.name}</a>
        `
      });
    } else {
      keyword.innerHTML = `
        <p class="not">No keywords have been added.</p>
        `
    }
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