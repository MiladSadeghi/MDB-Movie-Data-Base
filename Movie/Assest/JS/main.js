// const search = JSON.parse(sessionStorage.getItem("movie"));
// document.title = search[search.length - 1] + "- Use Me As Second IMDB";
// document.querySelector("#search-bar").placeholder = search[search.length - 1];
// const querySearch = search[search.length - 1]

const bgURL = "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces"
const posterURL = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2"
const posterPath = document.querySelector('.img-poster img')

document.addEventListener('DOMContentLoaded', ()=> {
  const data = getAPIHeader()
  showHeader(data)
  
})

async function getAPIHeader() {
  const API = "https://api.themoviedb.org/3/movie/568620?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US"

  const response = await fetch(API)
  const result = await response.json()

  return result
}

function showHeader(result) {
  result.then((e)=> {
    document.documentElement.style.setProperty('--banner', `linear-gradient(90deg, rgba(168, 2, 2, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url('${bgURL + e.backdrop_path}') no-repeat`)
    posterPath.src = posterURL + e.poster_path
  })
}