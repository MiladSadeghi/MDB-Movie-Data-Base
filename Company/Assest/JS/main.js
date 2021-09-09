const companyContent = document.querySelector('.company-content'),
companyMovieImgURL = 'https://www.themoviedb.org/t/p/w94_and_h141_bestv2'


document.addEventListener('DOMContentLoaded', () => {
  const dataMain = getAPICompany()
  showContent(dataMain)
})

async function getAPICompany() {
  const API = 'https://api.themoviedb.org/3/discover/movie?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&with_companies=15935',
  response = await fetch(API),
  result = await response.json()
  return result
}

function showContent(result) {
  result.then(e => {
    e.results.forEach(element => {
      companyContent.innerHTML += `
      <div class="row">
        <img class="${(element.poster_path)? '': 'bg'}" src="${(element.poster_path)? companyMovieImgURL + element.poster_path: 'Assest/Images/loadingImage.png'}">
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