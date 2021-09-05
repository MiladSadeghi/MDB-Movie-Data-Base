const search = JSON.parse(sessionStorage.getItem("tv"));
const querySearch = search[search.length - 1]

const bgURL = "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces"
posterURL = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2"
posterPath = document.querySelector('.img-poster img')
headerHead = document.querySelector('.header h1')
headerSpan = document.querySelector('.header span')
tagLine = document.querySelector('.tagline')
overview = document.querySelector('.movie-stuff p')
cast = document.querySelector('#cast')
seriesCastURL = 'https://www.themoviedb.org/t/p/w138_and_h175_face'
networkImgURL = 'https://www.themoviedb.org/t/p/h30'
statusM = document.querySelector('.status')
language = document.querySelector('.language')
network = document.querySelector('.network')
type = document.querySelector('.type')
homePage = document.querySelector('.fa-home').parentElement
facebook = document.querySelector('.fa-facebook-square').parentElement
twitter = document.querySelector('.fa-instagram').parentElement
instagram = document.querySelector('.fa-twitter-square').parentElement
justWatch = document.querySelector('.just-watch').parentElement
keyword = document.querySelector('.keywords-content')

document.addEventListener('DOMContentLoaded', ()=> {
  const dataHeader = getAPIHeader()
  const dataSocial = getAPISocial()
  showHeader(dataHeader)
  const dataKeywords = getAPIKeyword()
  showSide(dataHeader, dataSocial, dataKeywords)
  const dataSeriesCast = getAPISeriesCast()
  showMain(dataSeriesCast)
})

async function getAPIHeader() {
  const API = `https://api.themoviedb.org/3/tv/${querySearch}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`
  const response = await fetch(API)
  const result = await response.json()
  return result
}
async function getAPISeriesCast() {
  const API = `https://api.themoviedb.org/3/tv/${querySearch}/credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`
  const response = await fetch(API)
  const result = await response.json()
  return result
}
async function getAPILanguage() {
  const API = `https://api.themoviedb.org/3/configuration/languages?api_key=75c8aed355937ba0502f74d9a1aed11c`
  const response = await fetch(API)
  const result = await response.json()
  return result
}
async function getAPISocial() {
  const API = `https://api.themoviedb.org/3/tv/${querySearch}/external_ids?api_key=75c8aed355937ba0502f74d9a1aed11c`
  const response = await fetch(API)
  const result = await response.json()
  return result
}
async function getAPIKeyword() {
  const API = `https://api.themoviedb.org/3/movie/${querySearch}/keywords?api_key=75c8aed355937ba0502f74d9a1aed11c`
  const response = await fetch(API)
  const result = await response.json()
  return result
}

function showHeader(result) {
  let genres = '';
  result.then((e)=> {
    console.log(e);
    for (const iterator of e.genres) {
      genres += iterator.name + ', '
    }
    genres = genres.slice(0, genres.length -1)
    document.documentElement.style.setProperty('--banner', `linear-gradient(90deg, rgba(168, 2, 2, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url('${bgURL + e.backdrop_path}') no-repeat`)
    posterPath.src = posterURL + e.poster_path
    headerHead.innerText = e.name
    document.title = e.name + ' - Im Second IMDB!'
    headerSpan.innerHTML = `${e.first_air_date.replaceAll('-', '/')}  &#9679;  ${genres} &#9679; <span class="vote">${e.vote_average}</span>`
    tagLine.innerText = `"${e.tagline}"`
    overview.innerText = e.overview
  })
}

function showMain(data) {
  data.then((e)=> {
    e.cast.forEach(element => {
      if(element.order <= 10) {
        cast.innerHTML += `
        <div class="item cast-card">
          <img src="${seriesCastURL + element.profile_path}">
          <div class="cast-card-content">${element.name}</div>
        </div>
        `
      }
    });
    cast.innerHTML += `
      <div class="item last">view more ...</div>
    `
    Carousel('.owl',1,3,6)
  })
}

function showSide(data, data1, data2) {
  data.then(e => {
    e.networks.forEach(element => {
      network.innerHTML = `
      <img src="${networkImgURL + element.logo_path}">
      `
    });
    statusM.innerHTML = e.status
    languageName(e.original_language)
    type.innerHTML = e.type
    homePage.href = e.homepage
    justWatch.href = 'https://www.justwatch.com/us/tv-show/' + e.name.replaceAll(' ', '-')
  });

  data1.then((e)=> {
    console.log(e);
    facebook.href =  'https://www.facebook.com/' + e.facebook_id
    instagram.href =  'https://www.instagram.com/' + e.instagram_id
    twitter.href =  'https://www.twitter.com/' + e.twitter_id
  })

  data2.then((e)=> {
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

function Carousel(path,responsive1,responsive2,responsive3) {
  $(path).owlCarousel({
    dots: true,
    responsive:{
        0:{
            items:responsive1
        },
        600:{
            items:responsive2
        },
        1000:{
            items:responsive3
        }
    }
  })
}