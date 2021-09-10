const keywordName = document.querySelector('#keyword-name'),
keywordContent = document.querySelector('.keyword-content'),
keywordMovieImgURL = 'https://www.themoviedb.org/t/p/w94_and_h141_bestv2'


document.addEventListener('DOMContentLoaded', ()=> {
  const dataKeyword = getAPIKeyword()
  showMain(dataKeyword)
})


async function getAPIKeyword() {
  const API = 'https://api.themoviedb.org/3/discover/movie?api_key=75c8aed355937ba0502f74d9a1aed11c&with_keywords=262443',
  response = await fetch(API),
  result = await response.json()
  return result
}

function showMain(result) {
  result.then(e => {
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