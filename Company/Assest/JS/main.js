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
      <a href="#" class="move" data-id="${element.id}">
        <div class="row" data-id="${element.id}">
          <img class="${(element.poster_path)? '': 'bg'}" src="${(element.poster_path)? companyMovieImgURL + element.poster_path: 'Assest/Images/loadingImage.png'}" data-id="${element.id}">
          <div class="row-content" data-id="${element.id}">
            <div data-id="${element.id}">
              <h2 data-id="${element.id}">${element.original_title}</h2>
              <span data-id="${element.id}">${element.release_date.replaceAll('-','/')}</span>
            </div>
            <p data-id="${element.id}">${element.overview}</p>
          </div>
        </div>
      </a>
      `
    });
    moveToPage('movie', '/Movie') 
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

function moveToPage(storage, path) {
  let lists = []
  const move = document.querySelectorAll('.move')
  move.forEach(element => {
    element.addEventListener('click',(e)=> {
      e.preventDefault()
      console.log(e.target);
      lists.push(e.target.getAttribute('data-id'))
      sessionStorage.setItem(storage, JSON.stringify(lists))
      window.open(path, '_blank')
    })
  });
}