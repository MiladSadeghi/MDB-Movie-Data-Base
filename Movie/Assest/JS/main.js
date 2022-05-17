const movieTitle = document.querySelector("#movie-title");
const certificationBadge = document.querySelector(".certification");
const releaseDate = document.querySelector(".release-date");
const country = document.querySelector(".country");
const genres = document.querySelector(".genres");
const runTime = document.querySelector(".runtime");
const tagLine = document.querySelector(".tagline");
const overview = document.querySelector(".overview");
const headerCrew = document.querySelector(".header-crew");
const socialIcon = document.querySelector(".social-icon");
const sideFact = document.querySelector(".facts");
const statusFact = document.querySelector(".status");
const languageFact = document.querySelector(".language");
const budgetFact = document.querySelector(".budget");
const revenueFact = document.querySelector(".revenue");
const keywordFact = document.querySelector(".keyword");
const topCast = document.querySelector(".cast");
const topCastNextSlide = document.querySelector("#next-cast");
const topCastPrevSlide = document.querySelector("#prev-cast");
const movieIDParam = new URLSearchParams(location.search).get("id");
const headerSection = document.querySelector(".header");
const poster = document.querySelector(".image-banner img")
const bannerImageURL = "https://image.tmdb.org/t/p/original"
const posterImageURL = "https://www.themoviedb.org/t/p/original"
const castImageURL = "https://www.themoviedb.org/t/p/original"

let apiURL = [`https://api.themoviedb.org/3/movie/${movieIDParam}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/movie/${movieIDParam}/release_dates?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/movie/${movieIDParam}/credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/movie/${movieIDParam}/external_ids?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/movie/${movieIDParam}/keywords?api_key=75c8aed355937ba0502f74d9a1aed11c`]
let movieDataObj = {}
let activePO = 1;

document.addEventListener('DOMContentLoaded', () => {
  getFromAPI(apiURL);

  topCastNextSlide.parentElement.addEventListener("click", () => {
    topCast.scrollLeft += 350;
  })
  topCastPrevSlide.parentElement.addEventListener("click", () => {

    topCast.scrollLeft -= 350;
  })

})

async function getFromAPI(apiURL) {
  let requests = apiURL.map(async (item) =>
    await fetch(item).then(async (response) => await response.json()));
  Promise.all(requests).then(datas => {
    movieDataObj["movieDetails"] = datas[0];
    movieDataObj["releaseDate"] = datas[1];
    movieDataObj["Cast&Crew"] = datas[2];
    movieDataObj["socialMedia"] = datas[3];
    movieDataObj["keywords"] = datas[4];
    header();
    aside();
    article();
    createToolTip();
  })
}

function getISO(iso) {
  let certificate = movieDataObj["releaseDate"].results.find((item, index) => {
    if (item.iso_3166_1 === iso.iso_3166_1) {
      return iso
    }
  })
  return certificate.release_dates[0].certification;
}

let arrangeGenresStyle = (element) => {
  let name = "";
  element.forEach(element => {
    name += `${element.name}, `
  });
  return name.slice(0, name.length - 2);
}

function timeConvert(n) {
  let hours = (n / 60);
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  if (rminutes === 0) {
    return `${rhours}h`
  } else if (rhours === 0) {
    return `${rminutes}m`
  }
  return `${rhours}h ${rminutes}m`;
}

function arrangeHeaderPeople() {
  let importantCrew = []
  movieDataObj["Cast&Crew"].crew.filter(item => {
    if (item.job === "Director" || item.job === "Screenplay" || item.job === "Author" || item.job === "Novel" || item.job === "Characters" || item.job === "Writer" || item.job === "Story" || item.job === "Teleplay") {
      importantCrew.push(`<div class="col"><h6>${item.name}</h6><p>${item.job}</p></div>`);
    }
  });
  return importantCrew
}

function createToolTip() {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })
}

function availableSocialMedia() {
  let social = [];
  if (movieDataObj["socialMedia"].facebook_id !== undefined) {
    social.push(`<a data-bs-toggle="tooltip" data-bs-html="true" title="Visit Facebook" href="https://www.facebook.com/${movieDataObj["socialMedia"].facebook_id}" target="_blank"><i class="bi bi-facebook"></i></a>`)
  }
  if (movieDataObj["socialMedia"].instagram_id !== undefined) {
    social.push(`<a data-bs-toggle="tooltip" data-bs-html="true" title="Visit Instagram" href="https://www.instagram.com/${movieDataObj["socialMedia"].instagram_id}" target="_blank"><i class="bi bi-instagram"></i></a>`)
  }
  if (movieDataObj["socialMedia"].twitter_id !== undefined) {
    social.push(`<a data-bs-toggle="tooltip" data-bs-html="true" title="Visit Twiter" href="https://www.twitter.com/${movieDataObj["socialMedia"].twitter_id}" target="_blank"><i class="bi bi-twitter"></i></a>`)
  }
  if (movieDataObj["movieDetails"].homepage !== undefined) {
    social.push(`<a data-bs-toggle="tooltip" data-bs-html="true" title="Visit Homepage" href="${movieDataObj["movieDetails"].homepage}" target="_blank"><i class="fs-4 bi bi-link"></i></a>`)
  }
  return social
}

function getMovieLanguage() {
  let language = movieDataObj["movieDetails"].spoken_languages.map((item) => {
    if (item.iso_639_1 === movieDataObj["movieDetails"].original_language) {
      return item.english_name;
    }
  })
  return language.join("");
}

function getKeywords() {
  let keywords = [];
  movieDataObj["keywords"].keywords.filter((item) => {
    keywords.push(`<a href="#" class="badge bg-secondary text-white me-2 my-1" target="_blank">${item.name}</a>`)
  })
  return keywords;
}

function numberToUSD(number) {
  return `$${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}

function arrangeTopCast() {
  let cast = [];
  movieDataObj['Cast&Crew'].cast.filter((item) => {
    if (item.order <= 8) {
      cast.push(`
      <div class="cast-card me-2 rounded">
      <img src="${castImageURL + item.profile_path}" class="card-img-top" alt="">
      <div class="cast-body">
        <h5 class="cast-title text-black">${item.name}</h5>
        <p class="cast-text text-black">${item.character}</p>
      </div>
    </div>
      `)
    }
  })
  return cast
}

function header() {
  poster.src = `${posterImageURL}${movieDataObj["movieDetails"].poster_path}`;
  headerSection.style.backgroundImage = `url(${bannerImageURL}${movieDataObj["movieDetails"].backdrop_path})`
  headerSection.style.backgroundPosition = "right -200px top";
  headerSection.style.backgroundRepeat = "no-repeat";
  headerSection.style.backgroundSize = "cover";
  movieTitle.innerHTML += `${movieDataObj["movieDetails"].title}`;
  certificationBadge.innerHTML = `${getISO(movieDataObj["movieDetails"].production_countries[0])}`
  releaseDate.innerHTML = `${movieDataObj["movieDetails"].release_date}`;
  country.innerHTML = `${movieDataObj["movieDetails"].production_countries[0].iso_3166_1}`
  genres.innerHTML = `${arrangeGenresStyle(movieDataObj["movieDetails"].genres)}`
  runTime.innerHTML = `${timeConvert(movieDataObj["movieDetails"].runtime)}`
  tagLine.innerHTML = `${movieDataObj["movieDetails"].tagline}`
  overview.innerHTML = `${movieDataObj["movieDetails"].overview}`
  headerCrew.insertAdjacentHTML("beforeend", arrangeHeaderPeople().join(""));
}

function aside() {
  socialIcon.insertAdjacentHTML("beforeend", availableSocialMedia().join(""));
  statusFact.innerHTML = movieDataObj["movieDetails"].status
  languageFact.innerHTML = getMovieLanguage()
  budgetFact.innerHTML = numberToUSD((movieDataObj["movieDetails"].budget))
  revenueFact.innerHTML = numberToUSD((movieDataObj["movieDetails"].revenue))
  keywordFact.innerHTML = getKeywords().join("")
  console.log(movieDataObj);
}

function article() {
  topCast.insertAdjacentHTML("beforeend", arrangeTopCast().join(""));
}