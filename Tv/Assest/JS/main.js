const tvTitle = document.querySelector("#tv-title");
const certificationBadge = document.querySelector(".certification");
const releaseDate = document.querySelector(".release-date");
const country = document.querySelector(".country");
const genres = document.querySelector(".genres");
const runTime = document.querySelector(".runtime");
const tagLine = document.querySelector(".tagline");
const overview = document.querySelector(".overview");
const headerCrew = document.querySelector(".header-crew");
const movieIDParam = new URLSearchParams(location.search).get("id");
const headerSection = document.querySelector(".header");
const poster = document.querySelector(".image-banner img")
const bannerImageURL = "https://image.tmdb.org/t/p/original"
const posterImageURL = "https://www.themoviedb.org/t/p/original"
const castImageURL = "https://www.themoviedb.org/t/p/original"
const recommendImageURL = "https://www.themoviedb.org/t/p/original"

let tvDataObj = {}
let apiURL = [`https://api.themoviedb.org/3/tv/${movieIDParam}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/tv/${movieIDParam}/content_ratings?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/tv/${movieIDParam}/credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/tv/${movieIDParam}/external_ids?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/tv/${movieIDParam}/keywords?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/tv/${movieIDParam}/recommendations?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/tv/${movieIDParam}/videos?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/tv/${movieIDParam}/images?api_key=75c8aed355937ba0502f74d9a1aed11c`]

document.addEventListener('DOMContentLoaded', () => {
  getFromAPI(apiURL);

});

function getFromAPI(apiURL) {
  let requests = apiURL.map(async (item) =>
    await fetch(item).then(async (response) => await response.json()));
  Promise.all(requests).then(async (datas) => {
    console.log(datas);
    tvDataObj["tvDetails"] = datas[0];
    tvDataObj["contentRating"] = datas[1];
    tvDataObj["Cast&Crew"] = datas[2];
    header();
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