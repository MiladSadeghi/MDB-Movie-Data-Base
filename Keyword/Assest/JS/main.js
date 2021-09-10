const search = JSON.parse(sessionStorage.getItem("keyword"));
querySearch = search[search.length - 1]

const keywordName = document.querySelector('#keyword-name'),
keywordContent = document.querySelector('.keyword-content'),
keywordMovieImgURL = 'https://www.themoviedb.org/t/p/w94_and_h141_bestv2'

document.addEventListener('DOMContentLoaded', ()=> {
  const dataKeyword = getAPIKeyword()
  showMain(dataKeyword)
  const dataKeywordName = getAPIKeywordName()
  showKeywordName(dataKeywordName)
})

async function getAPIKeyword() {
  const API = `https://api.themoviedb.org/3/discover/movie?api_key=75c8aed355937ba0502f74d9a1aed11c&with_keywords=${querySearch}`,
  response = await fetch(API),
  result = await response.json()
  return result
}
async function getAPIKeywordName() {
  const API = `https://api.themoviedb.org/3/keyword/${querySearch}?api_key=75c8aed355937ba0502f74d9a1aed11c`,
  response = await fetch(API),
  result = await response.json()
  return result
}

function showMain(result) {
  result.then(e => {
    if(e.results.length === 0) {
      keywordContent.innerHTML = `<h3>Nothing Found</h3>`
      return true
    }
    e.results.forEach(element => {
      keywordContent.innerHTML += `
      <div class="row">
      <img class="${(element.poster_path)? '': 'bg'}" src="${(element.poster_path)? keywordMovieImgURL + element.poster_path: 'Assest/Images/loadingImage.png'}">
      <div class="row-content">
        <div>
          <h2>${element.original_title}</h2>
          <span>${element.release_date.replaceAll('-','/')}</span>
        </div>
        <p>${element.overview}</p>
      </div>
    </div>
    `
    });
  })
}

function showKeywordName(result) {
  result.then(e => {
    document.title = e.name + ' - Use Me As Second IMDB!'
    keywordName.innerHTML = e.name
  })
}