const tvTitle = document.querySelector("#tv-title");
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
const networkFact = document.querySelector(".network");
const typeFact = document.querySelector(".type");
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
const recommendImageURL = "https://www.themoviedb.org/t/p/original"
const networkImageURL = "https://www.themoviedb.org/t/p/h30"

let tvDataObj = {}
let apiURL = [`https://api.themoviedb.org/3/tv/${movieIDParam}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/tv/${movieIDParam}/content_ratings?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/tv/${movieIDParam}/credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/tv/${movieIDParam}/external_ids?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/tv/${movieIDParam}/keywords?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/tv/${movieIDParam}/recommendations?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/tv/${movieIDParam}/videos?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/tv/${movieIDParam}/images?api_key=75c8aed355937ba0502f74d9a1aed11c`]

document.addEventListener('DOMContentLoaded', () => {
  getFromAPI(apiURL);
  topCastNextSlide.parentElement.addEventListener("click", () => {
    topCast.scrollLeft += 350;
  })
  topCastPrevSlide.parentElement.addEventListener("click", () => {
    topCast.scrollLeft -= 350;
  })
});

function getFromAPI(apiURL) {
  let requests = apiURL.map(async (item) =>
    await fetch(item).then(async (response) => await response.json()));
  Promise.all(requests).then(async (datas) => {
    console.log(datas);
    tvDataObj["tvDetails"] = datas[0];
    tvDataObj["contentRating"] = datas[1];
    tvDataObj["Cast&Crew"] = datas[2];
    tvDataObj["socialMedia"] = datas[3];
    tvDataObj["keywords"] = datas[4];
    header();
    aside();
    article();
    createToolTip()
  })
}

function ageRestriction(Country) {
  let certificate = tvDataObj["contentRating"].results.find((item) => {
    if (item.iso_3166_1 === Country) {
      return item.rating
    }
  })
  return certificate.rating
}

function multipleArrayInObj(element, value) {
  let name = "";
  element.forEach(element => {
    name += `${element[value]}, `
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
  tvDataObj["tvDetails"].created_by.filter(item => {
    importantCrew.push(`<div class="col"><h6>${item.name}</h6><p>Creator</p></div>`);
  });
  return importantCrew
}

function availableSocialMedia() {
  let social = [];
  if (tvDataObj["socialMedia"].facebook_id !== undefined) {
    social.push(`<a data-bs-toggle="tooltip" data-bs-html="true" title="Visit Facebook" href="https://www.facebook.com/${tvDataObj["socialMedia"].facebook_id}" target="_blank"><i class="bi bi-facebook"></i></a>`)
  }
  if (tvDataObj["socialMedia"].instagram_id !== undefined) {
    social.push(`<a data-bs-toggle="tooltip" data-bs-html="true" title="Visit Instagram" href="https://www.instagram.com/${tvDataObj["socialMedia"].instagram_id}" target="_blank"><i class="bi bi-instagram"></i></a>`)
  }
  if (tvDataObj["socialMedia"].twitter_id !== undefined) {
    social.push(`<a data-bs-toggle="tooltip" data-bs-html="true" title="Visit Twiter" href="https://www.twitter.com/${tvDataObj["socialMedia"].twitter_id}" target="_blank"><i class="bi bi-twitter"></i></a>`)
  }
  if (tvDataObj["tvDetails"].homepage !== undefined) {
    social.push(`<a data-bs-toggle="tooltip" data-bs-html="true" title="Visit Homepage" href="${tvDataObj["tvDetails"].homepage}" target="_blank"><i class="fs-4 bi bi-link"></i></a>`)
  }
  return social
}

function getTvLanguage() {
  let language = tvDataObj["tvDetails"].spoken_languages.map((item) => {
    if (item.iso_639_1 === tvDataObj["tvDetails"].original_language) {
      return item.english_name;
    }
  })
  return language.join("");
}

function getKeywords() {
  let keywords = [];
  tvDataObj["keywords"].results.filter((item) => {
    keywords.push(`<a href="#" class="badge bg-secondary text-white me-2 my-1" target="_blank">${item.name}</a>`)
  })
  return keywords.join("");
}

function getNetwork() {
  let network = [];
  tvDataObj["tvDetails"].networks.filter((item) => {
    network.push(`<div><img data-bs-toggle="tooltip" data-bs-html="true" title="${item.name}" data-bs-placement="right" src="${networkImageURL + item.logo_path}"></div>`)
  })
  return network.join("");
}

function createToolTip() {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })
}

function arrangeTopCast() {
  let cast = [];
  tvDataObj['Cast&Crew'].cast.filter((item) => {
    if (item.order <= 8) {
      cast.push(`
      <div class="cast-card me-3 rounded">
      <img src="${castImageURL + item.profile_path}" class="card-img-top" alt="">
      <div class="cast-body">
        <h5 class="cast-title text-black">${item.name}</h5>
        <p class="cast-text text-black">${item.character}</p>
      </div>
    </div>
      `)
    }
  })
  return cast.join("");
}

function header() {
  document.title = tvDataObj["tvDetails"].original_name + ' - IMDB #2';
  poster.src = `${posterImageURL}${tvDataObj["tvDetails"].poster_path}`;
  headerSection.style.backgroundImage = `url(${bannerImageURL}${tvDataObj["tvDetails"].backdrop_path})`
  headerSection.style.backgroundPosition = "right -200px top";
  headerSection.style.backgroundRepeat = "no-repeat";
  headerSection.style.backgroundSize = "cover";
  tvTitle.innerHTML += `${tvDataObj["tvDetails"].original_name}`;
  certificationBadge.innerHTML = `${ageRestriction(tvDataObj["tvDetails"].origin_country[0])}`;
  country.innerHTML = `${tvDataObj["tvDetails"].production_countries[0].iso_3166_1}`
  genres.innerHTML = `${multipleArrayInObj(tvDataObj["tvDetails"].genres, "name")}`
  runTime.innerHTML = `${timeConvert(tvDataObj["tvDetails"].episode_run_time[0])}`
  tagLine.innerHTML = `${tvDataObj["tvDetails"].tagline}`
  overview.innerHTML = `${tvDataObj["tvDetails"].overview}`
  headerCrew.insertAdjacentHTML("beforeend", arrangeHeaderPeople().join(""));
}

function aside() {
  socialIcon.insertAdjacentHTML("beforeend", availableSocialMedia().join(""));
  statusFact.innerHTML = tvDataObj["tvDetails"].status;
  languageFact.innerHTML = getTvLanguage();
  networkFact.innerHTML = getNetwork();
  typeFact.innerHTML = tvDataObj["tvDetails"].type;
  keywordFact.innerHTML = getKeywords();
}

function article() {
  topCast.insertAdjacentHTML("beforeend", arrangeTopCast());
}