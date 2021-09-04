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
const recommendImgURL = 'https://www.themoviedb.org/t/p/w250_and_h141_face'
const recommend = document.querySelector('#recommend')
const mediaPopular = document.querySelector('#popular')
const mediaVideos = document.querySelector('#videos')
const mediaBackdrops = document.querySelector('#backdrops')
const mediaPosters = document.querySelector('#posters')
const mediaURL = 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2'
const mediaPostersURL = 'https://www.themoviedb.org/t/p/w220_and_h330_face'

document.addEventListener('DOMContentLoaded', ()=> {
  const dataHeader = getAPIHeader()
  const dataSocial = getAPISocial()
  const dataKeywords = getAPIKeyword()
  showHeader(dataHeader)
  showSide(dataHeader, dataSocial, dataKeywords)
  const dataCast = getAPICast()
  const dataRecommend = getAPIRecommendation()
  showMain(dataCast, dataHeader, dataRecommend)
  const dataImage = getAPIImages()
  const dataVideo = getAPIVideos()
  showMedia('popular', dataImage, getAPIVideos())
  mediaPopular.addEventListener('click', ()=> {showMedia('popular', dataImage, getAPIVideos())})
  mediaVideos.addEventListener('click', ()=> {showMedia('videos' ,getAPIVideos())})
  mediaBackdrops.addEventListener('click', ()=> {showMedia('backdrops', dataImage)})
  mediaPosters.addEventListener('click', ()=> {showMedia('posters', dataImage)})
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
async function getAPISocial() {
  const API = "https://api.themoviedb.org/3/movie/568620/external_ids?api_key=75c8aed355937ba0502f74d9a1aed11c"
  const response = await fetch(API)
  const result = await response.json()
  return result
}
async function getAPIKeyword() {
  const API = "https://api.themoviedb.org/3/movie/568620/keywords?api_key=75c8aed355937ba0502f74d9a1aed11c"
  const response = await fetch(API)
  const result = await response.json()
  return result
}
async function getAPIRecommendation() {
  const API = "https://api.themoviedb.org/3/movie/568620/recommendations?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&page=1"
  const response = await fetch(API)
  const result = await response.json()
  return result
}
async function getAPIVideos() {
  const API = "https://api.themoviedb.org/3/movie/568620/videos?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US"
  const response = await fetch(API)
  const result = await response.json()
  return result
}
async function getAPIImages() {
  const API = "https://api.themoviedb.org/3/movie/568620/images?api_key=75c8aed355937ba0502f74d9a1aed11c#"
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

function showMain(result, result1, result2, result3) {
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
    Carousel('.owl',1,3,6)
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

  result2.then((e)=> {
    let round = function ( number, precision ){
    precision = precision || 0;
    return parseFloat( parseFloat( number ).toFixed( precision ) );
    }
    e.results.forEach(element => {
      recommend.innerHTML += `
        <div class="item recommend-card">
          <img src="${recommendImgURL +element.backdrop_path}">
          <div class="recommend-card-content">
            <h5>${element.title}</h5>
            <span class="vote-main">${round(element.vote_average, 1)}</span>
          </div>
        </div>
      `
    });
    Carousel('.owl1',1,2,3)
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

function showMedia(choice ,data, data1) {
  clearForCarousel()
  const media = document.querySelector('#media')
  if(choice === 'popular'){
    data1.then((e)=> {
      media.innerHTML += `
      <div class="item iframes">
        <iframe src="https://www.youtube.com/embed/${e.results[e.results.length -1].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      `
      data.then((e)=> {
        media.innerHTML += `
        <div class="item">
          <img src="${mediaURL + e.backdrops[0].file_path}">
        </div>
        <div class="item">
          <img src="${mediaURL + e.posters[0].file_path}">
        </div>
        `
        Carousel('.owl2',1,2,2)
      })
    })
  }
  if(choice === 'videos') {
    data.then((e)=> {
      e.results.forEach(element => {
        media.innerHTML += `
          <iframe class="item iframe-videos" src="https://www.youtube.com/embed/${element.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `
      });
      Carousel('.owl2',1,2,1)
    })
  }
  if(choice === 'backdrops') {
    data.then((e)=> {
      e.backdrops.forEach((e)=> {
        media.innerHTML += `
          <img src="${mediaURL + e.file_path}">
        `
      })
      Carousel('.owl2',1,2,2)
    })
  }
  if(choice === 'posters') {
    data.then((e)=> {
      e.posters.forEach((e)=> {
        media.innerHTML += `
          <img class="images" src="${mediaPostersURL + e.file_path}">
        `
      })
      Carousel('.owl2',1,2,5)
    })
  }
}


function clearForCarousel() {
  const mediaContent = document.querySelector('.media-S-content')
  mediaContent.innerHTML = ''
  const carousel = document.createElement('div')
  carousel.classList.add('owl-carousel' ,'owl-theme', 'owl2')
  carousel.id = "media"
  mediaContent.appendChild(carousel)
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