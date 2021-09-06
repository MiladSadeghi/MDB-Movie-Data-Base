const search = JSON.parse(sessionStorage.getItem("collection"));
      querySearch = search[search.length - 1]
      bgURL = "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces"
      posterURL = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2"
      posterPath = document.querySelector('.img-poster img')
      headerHead = document.querySelector('.header h1')
      detail = document.querySelector('.detail')
      overview = document.querySelector('.movie-stuff p')
      movieNumber = document.querySelector('.movie-number span')
      revenue = document.querySelector('.revenue span')
      formatToCurrency = amount => {
        return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      };


document.addEventListener('DOMContentLoaded', ()=> {
  const dataAll = getAPIAll()
  showHeader(dataAll)
})

async function getAPIAll() {
  const API = `https://api.themoviedb.org/3/collection/${querySearch}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`
  const response = await fetch(API)
  const result = await response.json()
  return result
}
async function getAPIkeywords() {
  const API = `https://api.themoviedb.org/3/genre/movie/list?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`
  const response = await fetch(API)
  const result = await response.json()
  return result
}
async function getAPIRevenue(id) {
  const API = `https://api.themoviedb.org/3/movie/${id}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`
  const response = await fetch(API)
  const result = await response.json()
  return result
}

function showKeywords(array) {
  let uniqueChars = array.filter((c, index) => {
    return array.indexOf(c) === index;
  });
  let genre = '';
  getAPIkeywords().then((e)=> {
    for (let i = 0; i < e.genres.length; i++) {
      for (let j = 0; j < uniqueChars.length; j++) {
        if(e.genres[i].id === uniqueChars[j]) {
          genre += `${e.genres[i].name}, `
        }
      }
    }
    genre = genre.slice(0,-2);
    detail.children[0].innerHTML = genre
  })
}

function showHeader(data) {
  let voteAverage = 0
  let genre = []
  let movie = []
  data.then((e)=> {
    e.parts.forEach((element) => {
      voteAverage += element.vote_average
      genre.push(...element.genre_ids)
      movie.push(element.id)
    });
    showKeywords(genre)
    showRevenue(movie)
    document.documentElement.style.setProperty('--banner', `linear-gradient(90deg, rgba(168, 2, 2, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url('${bgURL + e.backdrop_path}') no-repeat`)
    posterPath.src = posterURL + e.poster_path
    headerHead.innerText = e.name
    document.title = e.name + ' - Im Second IMDB!'
    detail.innerHTML += `<span class="genre"></span>  	&#9679;  <span class="vote">${voteAverage / e.parts.length}</span>`
    overview.innerText = e.overview
    movieNumber.innerHTML = `${e.parts.length}`
  })
}
function showRevenue(id) {
  let revenueMoney = 0
  for (const iterator of id) {
    getAPIRevenue(iterator).then((e)=> {
      revenueMoney += e.revenue
      revenue.innerHTML = `${formatToCurrency(revenueMoney)}`
    })
  }
}