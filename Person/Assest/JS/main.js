const personImg = document.querySelector('.person-img')
      personName = document.querySelector('.person-name')
      personBiography = document.querySelector('.biography')
      personImgURL = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2'
      viewMoreBtn = document.querySelector('#view-more')
      knownFor = document.querySelector('#known')
      knownForImageURL = 'https://www.themoviedb.org/t/p/w150_and_h225_bestv2'


document.addEventListener('DOMContentLoaded', ()=> {
  const dataHeader = getAPIHeader()
  showHeader(dataHeader)
  const dataKnownFor = getAPIKnownFor()
  showMain(dataKnownFor)

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
async function getAPIKnownFor() {
  const API = 'https://api.themoviedb.org/3/person/287/movie_credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US'
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

function showMain(result) {
  result.then(e => {
    let test = []
    e.cast.forEach((element) => {
      if(element.character !== 'Himself' && element.character.indexOf('/') === -1 && element.character.indexOf('(') === -1 && element.character !== 'Self' && element.vote_average >= 5 && element.popularity >= 30 && element.character.indexOf("\n") === -1) {
        test.push(element.release_date)
      }
    })
    test.sort().reverse().forEach(element => {
      for (let i = 0; i < e.cast.length; i++) {
        if(element === e.cast[i].release_date) {
          knownFor.innerHTML += `
          <div class="card item">
            <img src="${knownForImageURL + e.cast[i].poster_path}">
            <span>${e.cast[i].original_title}</span>
          </div>
          `
        }
      }
    });
    Carousel('.owl1',1,4,5)
  })
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