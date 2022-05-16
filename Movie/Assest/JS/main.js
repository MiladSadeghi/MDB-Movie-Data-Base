const movieTitle = document.querySelector("#movie-title");
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

let apiURL = [`https://api.themoviedb.org/3/movie/${movieIDParam}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/movie/${movieIDParam}/release_dates?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/movie/${movieIDParam}/credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`]
let movieDataObj = {}


document.addEventListener('DOMContentLoaded', () => {
  getFromAPI(apiURL);
})

async function getFromAPI(apiURL) {
  let requests = apiURL.map(async (item) =>
    await fetch(item).then(async (response) => await response.json()));
  Promise.all(requests).then(datas => {
    movieDataObj["movieDetails"] = datas[0];
    movieDataObj["releaseDate"] = datas[1];
    movieDataObj["Cast&Crew"] = datas[2];
    header();
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
  console.log(arrangeHeaderPeople());
  headerCrew.insertAdjacentHTML("beforeend", arrangeHeaderPeople().join(""));
  console.log(movieDataObj);
}
