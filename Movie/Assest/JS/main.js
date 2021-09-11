const search = JSON.parse(sessionStorage.getItem("movie")),
querySearch = search[search.length - 1],
collection = [],
person = [],
movie = [],
keywordMove = [],
bgURL = "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces",
posterURL = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2",
posterPath = document.querySelector('.img-poster img'),
headerHead = document.querySelector('.header h1'),
headerSpan = document.querySelector('.header span'),
tagLine = document.querySelector('.tagline'),
overview = document.querySelector('.movie-stuff p'),
cast = document.querySelector('#cast'),
profileURL = 'https://www.themoviedb.org/t/p/w138_and_h175_face',
statusM = document.querySelector('.status'),
language = document.querySelector('.language'),
budget = document.querySelector('.budget'),
revenue = document.querySelector('.revenue'),
formatToCurrency = amount => {
  return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
},
homePage = document.querySelector('.fa-home').parentElement,
facebook = document.querySelector('.fa-facebook-square').parentElement,
twitter = document.querySelector('.fa-instagram').parentElement,
instagram = document.querySelector('.fa-twitter-square').parentElement,
keyword = document.querySelector('.keywords-content'),
backdroupURL = 'https://www.themoviedb.org/t/p/w1440_and_h320_multi_faces',
collectionContent = document.querySelector('.collection-content'),
recommendImgURL = 'https://www.themoviedb.org/t/p/w250_and_h141_face',
recommend = document.querySelector('#recommend'),
mediaPopular = document.querySelector('#popular'),
mediaVideos = document.querySelector('#videos'),
mediaBackdrops = document.querySelector('#backdrops'),
mediaPosters = document.querySelector('#posters'),
mediaURL = 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2',
mediaPostersURL = 'https://www.themoviedb.org/t/p/w220_and_h330_face'

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
  const API = `https://api.themoviedb.org/3/movie/${querySearch}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`
  const response = await fetch(API)
  const result = await response.json()
  return result
}
async function getAPICast() {
  const API = `https://api.themoviedb.org/3/movie/${querySearch}/credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`
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
  const API = `https://api.themoviedb.org/3/movie/${querySearch}/external_ids?api_key=75c8aed355937ba0502f74d9a1aed11c`
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
async function getAPIRecommendation() {
  const API = `https://api.themoviedb.org/3/movie/${querySearch}/recommendations?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&page=1`
  const response = await fetch(API)
  const result = await response.json()
  return result
}
async function getAPIVideos() {
  const API = `https://api.themoviedb.org/3/movie/${querySearch}/videos?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`
  const response = await fetch(API)
  const result = await response.json()
  return result
}
async function getAPIImages() {
  const API = `https://api.themoviedb.org/3/movie/${querySearch}/images?api_key=75c8aed355937ba0502f74d9a1aed11c#`
  const response = await fetch(API)
  const result = await response.json()
  return result
}

function showHeader(result) {
  let genres = '';
  result.then((e)=> {
    for (const iterator of e.genres) {
      genres += iterator.name + ', '
    }
    genres = genres.slice(0, genres.length -1)
    document.documentElement.style.setProperty('--banner', `linear-gradient(90deg, rgba(168, 2, 2, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url('${bgURL + e.backdrop_path}') no-repeat`)
    if(e.poster_path) {posterPath.src = posterURL + e.poster_path} else {posterPath.src = 'Assest/Images/loadingImage.png';posterPath.parentElement.classList.add('bg');}
    headerHead.innerText = e.original_title
    document.title = e.original_title + ' - Im Second IMDB!'
    headerSpan.innerHTML = `${e.release_date.replaceAll('-', '/')}  &#9679;  ${genres.slice(0, genres.lastIndexOf(','))} &#9679; <span class="vote">${e.vote_average}</span>`
    tagLine.innerText = (e.tagLine)? `"${e.tagline}"`: ''
    overview.innerText = e.overview
  })
}

function showMain(result, result1, result2) {
  result.then((e)=> {
    e.cast.forEach(element => {
      if(element.order <= 10) {
        cast.innerHTML += `
        <a href="#" class="item move" data-id="${element.id}">
          <div class="item cast-card" data-id="${element.id}">
          <img src="${(element.profile_path)? profileURL + element.profile_path: (element.gender === 1)? 'Assest/Images/profile.png':(element.gender === 2)? 'Assest/Images/profile2.png':'Assest/Images/non-binary.png'}" data-id="${element.id}">
            <div class="cast-card-content" data-id="${element.id}">${element.name}</div>
          </div>
        </a>
        `
      }
    });
    cast.innerHTML += `
      <div class="item last">view more ...</div>
    `
    moveToPage('move',person,'person','/Person')
    Carousel('.owl',1,3,6)
  })

  result1.then((e)=> {
    if(e.belongs_to_collection !== null) {
      document.documentElement.style.setProperty('--collection-image', `url(${backdroupURL + e.belongs_to_collection.backdrop_path})`)
      collectionContent.children[0].innerHTML = `Part Of The ${e.belongs_to_collection.name}`
      collectionContent.innerHTML += `<a class="view-more" target="_blank" data-id="${e.belongs_to_collection.id}">VIEW THE COLLECTION</a>`
      moveToPage('view-more' , collection, 'collection', '/Collection')
    }
    else {
      collectionContent.parentElement.style.display = 'none'
    }
  })

  result2.then((e)=> {
    if(e.results.length === 0) {
      recommend.parentElement.parentElement.remove()
    } else {
      let round = function ( number, precision ){
      precision = precision || 0;
      return parseFloat( parseFloat( number ).toFixed( precision ) );
      }
      e.results.forEach(element => {
        recommend.innerHTML += `
        <div class="recommend-card item" data-id="${element.id}">
          <a href="#" class="move ${(element.backdrop_path)? '': 'recommendImg'}" data-id="${element.id}">
            <img src="${(element.backdrop_path)? recommendImgURL +element.backdrop_path: 'Assest/Images/loadingImage.png'}" data-id="${element.id}">
            <div class="recommend-card-content" data-id="${element.id}">
              <h5 data-id="${element.id}">${element.title}</h5>
              <span class="vote-main" data-id="${element.id}">${round(element.vote_average, 1)}</span>
            </div>
            </a>
          </div>
        `
      });
      moveToPage('move', movie, 'movie', '/Movie')
      Carousel('.owl1',1,2,3)
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
    ((e.facebook_id !== null)? facebook.href =  'https://www.facebook.com/' + e.facebook_id : facebook.remove()),
    ((e.instagram_id !== null)? instagram.href =  'https://www.instagram.com/' + e.instagram_id : instagram.remove()),
    ((e.twitter_id !== null)? twitter.href =  'https://www.twitter.com/' + e.twitter_id : twitter.remove())
  })

  result2.then((e)=> {
    if(e.keywords.length !== 0) {
      e.keywords.forEach(element => {
        keyword.innerHTML += `
        <a href="#" class="move" data-id="${element.id}">${element.name}</a>
        `
      });
      moveToPage('move', keywordMove, 'keyword', '/Keyword')
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
      if(e.results.length !== 0) {
        media.innerHTML += `
        <div class="item iframes">
          <iframe src="https://www.youtube.com/embed/${e.results[e.results.length -1].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        `
      }
      data.then((e)=> {
        if(e.backdrops.length !== 0) {
          media.innerHTML += `
            <div class="item">
              <img src="${mediaURL + e.backdrops[0].file_path}">
            </div>`
          }
        if(e.posters.length !== 0) {
          media.innerHTML += `
            <div class="item">
              <img src="${mediaURL + e.posters[0].file_path}">
            </div>`
          Carousel('.owl2',1,2,2)
        } 
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

function moveToPage(whichClass, query, storage, path) {
  const classes = document.querySelectorAll(`.${whichClass}`)
  classes.forEach(element => {
    element.addEventListener('click',(e)=> {
      e.preventDefault()
      query.push(e.target.getAttribute('data-id'))
      sessionStorage.setItem(storage, JSON.stringify(query))
      window.open(path, '_blank')
    })
  });
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
            items:5
        }
    }
  })
}