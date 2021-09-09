const personImg = document.querySelector('.person-img'),
      personName = document.querySelector('.person-name'),
      personBiography = document.querySelector('.biography'),
      personImgURL = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2',
      viewMoreBtn = document.querySelector('#view-more'),
      knownFor = document.querySelector('#known'),
      knownForImageURL = 'https://www.themoviedb.org/t/p/w150_and_h225_bestv2',
      activeContent = document.querySelector('.active-content'),
      productionContent = document.querySelector('.production-content'),
      crewContent = document.querySelector('.crew-content'),
      knownForDepartment = document.querySelector('#known-for-department'),
      knownCredits = document.querySelector('#known-credits'),
      gender = document.querySelector('#gender'),
      birthDay = document.querySelector('#birth-day'),
      placeOfBirth = document.querySelector('#place-of-birth'),
      nowTime = new Date().getFullYear(),
      knownAsContent = document.querySelector('.known-as-content'),
      socialContent = document.querySelector('.social-content')

document.addEventListener('DOMContentLoaded', ()=> {
  const dataHeader = getAPIHeader()
  showHeader(dataHeader)
  const dataKnownFor = getAPIKnownFor()
  showMain(dataKnownFor)
  const dataSocial = getAPISocial()
  showSocial(dataSocial)

  viewMoreBtn.addEventListener('click', (e)=> {
    e.preventDefault()
    personBiography.style.height = 'auto'
    e.target.parentElement.classList.remove('bg');
    e.target.remove()
  })
})

async function getAPIHeader() {
  const API = 'https://api.themoviedb.org/3/person/192?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US'
  response = await fetch(API)
  result = await response.json()
  return result
}
async function getAPIKnownFor() {
  const API = 'https://api.themoviedb.org/3/person/192/movie_credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US'
  response = await fetch(API)
  result = await response.json()
  return result
}
async function getAPISocial() {
  const API = 'https://api.themoviedb.org/3/person/192/external_ids?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US'
  response = await fetch(API)
  result = await response.json()
  return result
}

function showHeader(result) {
  result.then(e => {
    e.also_known_as.forEach(element => {
      knownAsContent.innerHTML += `
      <div class="known">${element}</div>
    `
    });
    personImg.src = personImgURL + e.profile_path
    personName.textContent = e.name
    document.title = e.name + ' - Im Second IMDB!'
    personBiography.textContent = e.biography
    knownForDepartment.innerHTML += e.known_for_department
    gender.innerHTML += (e.gender === 2)? 'Male': (e.gender === 1)? 'Female':'Non Binary' 
    birthDay.innerHTML += `${e.birthday.replaceAll('-','/')} (${nowTime - e.birthday.slice(0,4)} Years Old)`
    placeOfBirth.innerHTML += e.place_of_birth
    
  })
}

function showMain(result) {
  let knownForMovie = []
  let acting = []
  let production = []
  let border = ''
  result.then(e => {
    knownCredits.innerHTML += e.cast.length + e.crew.length
    e.cast.forEach((element, index) => {
      acting.push(element.release_date)
      if(element.character !== 'Himself' && element.character.indexOf('/') === -1 && element.character.indexOf('(') === -1 && element.character !== 'Self' && element.vote_average >= 5 && element.popularity >= 30 && element.character.indexOf("\n") === -1) {
        knownForMovie.push(element.release_date)
      }
    })
    knownForMovie.sort().forEach(element => {
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
    for (let i = 0; i < e.cast.length; i++) {
      if(e.cast[i].release_date === "") {
        activeContent.innerHTML += `
          <div class="acting-row">
            <h6 class="year"> — </h6>
            <span> <span class="acting-row-movie">${e.cast[i].title}</span> <span class="acting-row-character">
              ${(e.cast[i].character)? `<as>as</as> ${e.cast[i].character}`: ''}</span></span>
          </div>
        `
      }
    }

    acting.sort().reverse().forEach((element) => {
      for (let i = 0; i < e.cast.length; i++) {
        if(element !== "" && element === e.cast[i].release_date) {
          activeContent.innerHTML += `
            <div class="acting-row ${(element.slice(0,4) === border)? '': 'border'}">
              <h6 class="year">${element.slice(0,4)}</h6>
              <span> <span class="acting-row-movie">${e.cast[i].title}</span> <span class="acting-row-character">
              ${(e.cast[i].character)? `<as>as</as> ${e.cast[i].character}`: ''}</span></span>
            </div>
          `
        }
      }
      border = element.slice(0,4)
    })

    e.crew.forEach((element) => {
      production.push(element.release_date)
    })
    for (let i = 0; i < e.crew.length; i++) {
      if(e.crew[i].release_date === "" && e.crew[i].department === "Production") {
        productionContent.innerHTML += `
          <div class="product-row">
            <h6 class="year"> — </h6>
            <span> <span class="product-row-movie">${e.crew[i].title}</span> <span class="product-row-job">
              ${(e.crew[i].job)? `<as>as</as> ${e.crew[i].job}`: ''}</span></span>
          </div>
        `
      }
    }

    production.sort().reverse().forEach((element) => {
      for (let i = 0; i < e.crew.length; i++) {
        if(element !== "" && element === e.crew[i].release_date && e.crew[i].department === "Production") {
          productionContent.innerHTML += `
            <div class="product-row ${(element.slice(0,4) === border)? '': 'border'}">
              <h6 class="year">${element.slice(0,4)}</h6>
              <span> <span class="product-row-movie">${e.crew[i].title}</span> <span class="product-row-job">
              ${(e.crew[i].job)? `<as>as</as> ${e.crew[i].job}`: ''}</span></span>
            </div>
          `
        } else if (element !== "" && element === e.crew[i].release_date && e.crew[i].department === "Crew") {
          crewContent.innerHTML += `
            <div class="product-row ${(element.slice(0,4) === border)? '': 'border'}">
              <h6 class="year">${element.slice(0,4)}</h6>
              <span> <span class="product-row-movie">${e.crew[i].title}</span> <span class="product-row-job">
              ${(e.crew[i].job)? `<as>as</as> ${e.crew[i].job}`: ''}</span></span>
            </div>
          `
        }
      }
      border = element.slice(0,4)
    })
    Carousel('.owl1',1,4,5)
  })
}

function showSocial(result) {
  result.then(e => {
    if((e.facebook_id && e.instagram_id && e.twitter_id) !== null) {
      socialContent.innerHTML += `${(e.facebook_id)? `<a href="https://www.facebook.com/${e.facebook_id}"" target="_blank""><i class="fab fa-facebook-square"></i></a>`: ''}`
      socialContent.innerHTML += `${(e.instagram_id)? `<a href="https://www.instagram.com/${e.instagram_id}"" target="_blank""><i class="fab fa-instagram"></i></a>`: ''}`
      socialContent.innerHTML += `${(e.instagram_id)? `<a href="https://www.twitter.com/${e.twitter_id}"" target="_blank""><i class="fab fa-twitter-square"></i></a>`: ''}`
    } else {
      socialContent.parentElement.remove()
    }
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