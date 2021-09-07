const personImg = document.querySelector('.person-img')
      personName = document.querySelector('.person-name')
      personBiography = document.querySelector('.biography')
      personImgURL = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2'
      viewMoreBtn = document.querySelector('#view-more')


document.addEventListener('DOMContentLoaded', ()=> {
  const dataHeader = getAPIHeader()
  showHeader(dataHeader)
  
  viewMoreBtn.addEventListener('click', (e)=> {
    personBiography.style.height = 'auto'
    e.target.parentElement.classList.remove('bg');
    e.target.remove()
  })
})


async function getAPIHeader() {
  const API = 'https://api.themoviedb.org/3/person/287?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US'
  response = await fetch(API)
  result = await response.json()
  return result
}

function showHeader(result) {
  result.then(e => {
    personImg.src = personImgURL + e.profile_path
    personName.textContent = e.name
    personBiography.textContent = e.biography
  })
}