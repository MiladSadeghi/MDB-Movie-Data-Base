const search = JSON.parse(sessionStorage.getItem("company"));
querySearch = search[search.length - 1]

const companyContent = document.querySelector('.company-content'),
companyMovieImgURL = 'https://www.themoviedb.org/t/p/w94_and_h141_bestv2',
companyName = document.querySelector('#company-name'),
headQuarters = document.querySelector('#headquarters'),
country = document.querySelector('#country'),
movieCounter = document.querySelector('#movie-counter')


document.addEventListener('DOMContentLoaded', () => {
  const dataMainContent = getAPICompanyContent()
  showContent(dataMainContent)
  const dataMainCompany = getAPICompany()
  showCompany(dataMainCompany)
})

async function getAPICompany() {
  const API = `https://api.themoviedb.org/3/company/${querySearch}?api_key=75c8aed355937ba0502f74d9a1aed11c`,
  response = await fetch(API),
  result = await response.json()
  return result
}
async function getAPICompanyContent() {
  const API = `https://api.themoviedb.org/3/discover/movie?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&with_companies=${querySearch}`,
  response = await fetch(API),
  result = await response.json()
  return result
}

function showContent(result) {
  result.then(e => {
    movieCounter.innerHTML = e.results.length + ' Movie'
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

function showCompany(result) {
  result.then(e => {
    document.title = e.name + ' - Use Me As Second IMDB!'
    companyName.innerHTML += e.name
    headQuarters.innerHTML += e.headquarters
    country.innerHTML += e.origin_country
  })
}