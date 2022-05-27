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
const recommend = document.querySelector(".recommend");
const topCastNextSlide = document.querySelector("#next-cast");
const topCastPrevSlide = document.querySelector("#prev-cast");
const collection = document.querySelector(".collection");
const collectionImage = document.querySelector(".collection-image");
const collectionCard = document.querySelector(".collection .card-img-overlay");
const recommendNextSlide = document.querySelector("#next-recommend");
const recommendPrevSlide = document.querySelector("#prev-recommend");
const mediaTitleBar = document.querySelector(".media-title-bar");
const mediaContent = document.querySelector(".media-content");
const mediaNextSlide = document.querySelector("#next-media");
const mediaPrevSlide = document.querySelector("#prev-media");
const movieIDParam = new URLSearchParams(location.search).get("id");
const headerSection = document.querySelector(".header");
const poster = document.querySelector(".image-banner img")
const bannerImageURL = "https://image.tmdb.org/t/p/original"
const posterImageURL = "https://www.themoviedb.org/t/p/original"
const castImageURL = "https://www.themoviedb.org/t/p/original"
const recommendImageURL = "https://www.themoviedb.org/t/p/original"

let screenSize = window.screen.availWidth;
let movieDataObj = {}
let apiURL = [`https://api.themoviedb.org/3/movie/${movieIDParam}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/movie/${movieIDParam}/release_dates?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/movie/${movieIDParam}/credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/movie/${movieIDParam}/external_ids?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/movie/${movieIDParam}/keywords?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/movie/${movieIDParam}/recommendations?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/movie/${movieIDParam}/videos?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/movie/${movieIDParam}/images?api_key=75c8aed355937ba0502f74d9a1aed11c`]

document.addEventListener('DOMContentLoaded', () => {
  getFromAPI(apiURL);
  if(screenSize <= 991) {
    screenSize = "none"
  } else {
    screenSize = "right -200px top";
  }
  topCastNextSlide.parentElement.addEventListener("click", () => {
    topCast.scrollLeft += 350;
  })
  topCastPrevSlide.parentElement.addEventListener("click", () => {
    topCast.scrollLeft -= 350;
  })

  recommendNextSlide.parentElement.addEventListener("click", () => {
    recommend.scrollLeft += 350;
  })
  recommendPrevSlide.parentElement.addEventListener("click", () => {
    recommend.scrollLeft -= 350;
  })

  mediaNextSlide.parentElement.addEventListener("click", () => {
    mediaContent.scrollLeft += 350;
  })
  mediaPrevSlide.parentElement.addEventListener("click", () => {
    mediaContent.scrollLeft -= 350;
  })

  mediaTitleBar.addEventListener("click", (event) => {
    if (event.target.tagName === "SPAN") {
      switch (event.target.getAttribute("data-id")) {
        case "1024":
          mostPopularMedia(event.target);
          break;
        case "1156":
          videosMedia(event.target);
          break;
        case "6722":
          backdropsMedia(event.target);
          break;
        case "6026":
          postersMedia(event.target);
          break;
      }
    }
  }, true)
})

function getFromAPI(apiURL) {
  let requests = apiURL.map(async (item) =>
    await fetch(item).then(async (response) => await response.json()));
  Promise.all(requests).then(async (datas) => {
    movieDataObj["movieDetails"] = datas[0];
    movieDataObj["releaseDate"] = datas[1];
    movieDataObj["Cast&Crew"] = datas[2];
    movieDataObj["socialMedia"] = datas[3];
    movieDataObj["keywords"] = datas[4];
    if(movieDataObj["movieDetails"].belongs_to_collection) {
      movieDataObj["collection"] = await fetch(`https://api.themoviedb.org/3/collection/${movieDataObj["movieDetails"].belongs_to_collection.id}?api_key=75c8aed355937ba0502f74d9a1aed11c`).then(response => response.json());
    }
    movieDataObj["recommendation"] = datas[5];
    movieDataObj["videos"] = datas[6];
    movieDataObj["images"] = datas[7];
    header();
    aside();
    article();
    mostPopularMedia(mediaTitleBar.children[1]);
    createToolTip();
  })
}

function getISO(iso) {
  
  let certificate = movieDataObj["releaseDate"].results.find((item, index) => {
    if (item.iso_3166_1 === iso.iso_3166_1) {
      return iso
    }
  })
  console.log(certificate);
  return certificate.release_dates[0].certification;
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
  movieDataObj["Cast&Crew"].crew.filter(item => {
    if (item.job === "Director" || item.job === "Screenplay" || item.job === "Author" || item.job === "Novel" || item.job === "Characters" || item.job === "Writer" || item.job === "Story" || item.job === "Teleplay") {
      importantCrew.push(`<div class="col"><a href="/person/?id=${item.id}" target="_blank"><h6>${item.name}</h6></a><p>${item.job}</p></div>`);
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
    keywords.push(`<a href="/keyword/?id=${item.id}&keyword=${item.name}&show=movie" class="badge bg-secondary text-white me-2 my-1" target="_blank">${item.name}</a>`)
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
      <a href="/person/?id=${item.id}" target="_blank">
      <div class="cast-card me-3 rounded h-100">
      <img src="${castImageURL + item.profile_path}" class="card-img-top" alt="">
      <div class="cast-body">
        <h5 class="cast-title text-color">${item.name}</h5>
        <p class="cast-text text-color">${item.character}</p>
      </div>
    </div></a>
      `)
    }
  })
  return cast
}

function arrangeRecommendations() {
  let recommendations = [];
  if (movieDataObj['recommendation'].results) {
    movieDataObj['recommendation'].results.filter((item) => {
      recommendations.push(`
      <a href="/movie/?id=${item.id}" target="_blank">
    <div class="recommend-card me-3 rounded">
    <img class="card-img-top" src="${recommendImageURL + item.backdrop_path}">
      <div class="recommend-body d-flex justify-content-between align-items-center">
        <h5 class="text-color">${item.title}</h5>
        <span class="fw-bold text-color">${item.vote_average.toFixed(1) * 10}%</span>
      </div>
    </div></a>
    `)
    })
    return recommendations.join("");
  } else {
    return `<p>We don't have enough data to suggest any movies based on ${movieDataObj["movieDetails"].title}. You can help by rating movies you've seen.</p>`
  }
}

function resetMediaActiveClass(event) {
  document.querySelector(".media-active").classList.remove("media-active");
  event.classList.add("media-active");
}

function header() {
  document.title = movieDataObj["movieDetails"].title + ' - IMDB #2';
  poster.src = `${posterImageURL}${movieDataObj["movieDetails"].poster_path}`;
  headerSection.style.backgroundImage = `url(${bannerImageURL}${movieDataObj["movieDetails"].backdrop_path})`
  headerSection.style.backgroundPosition = screenSize;
  headerSection.style.backgroundRepeat = "no-repeat";
  headerSection.style.backgroundSize = "cover";
  movieTitle.innerHTML += `${movieDataObj["movieDetails"].title}`;
  certificationBadge.innerHTML = `${getISO(movieDataObj["movieDetails"].production_countries[0])}`
  releaseDate.innerHTML = `${movieDataObj["movieDetails"].release_date}`;
  country.innerHTML = `${movieDataObj["movieDetails"].production_countries[0].iso_3166_1}`
  genres.innerHTML = `${multipleArrayInObj(movieDataObj["movieDetails"].genres, "name")}`
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
}

function article() {
  topCast.insertAdjacentHTML("beforeend", arrangeTopCast().join(""));
  if(movieDataObj["movieDetails"].belongs_to_collection) {
    collectionImage.src = `${posterImageURL}${movieDataObj["movieDetails"].belongs_to_collection.backdrop_path}`;
    collectionCard.innerHTML = `
    <h5 class="card-title">Part of the ${movieDataObj["movieDetails"].belongs_to_collection.name}</h5>
    <p class="card-text">Inlude ${multipleArrayInObj(movieDataObj["collection"].parts, "original_title")}</p>
    <a href="/collection/?id=${movieDataObj["movieDetails"].belongs_to_collection.id}" target="_blank" class="px-3 fs-6 py-3 badge bg-secondary text-white">VIEW THE COLLECTION</a>
    `
  } else {
    collection.classList.add("d-none");
    document.querySelector(".top-collection").classList.add("d-none");
  }
  recommend.insertAdjacentHTML("beforeend", arrangeRecommendations());
  mediaTitleBar.children[2].innerHTML += ` <div class="badge bg-secondary">${movieDataObj["videos"].results.length}</div>`;
  mediaTitleBar.children[3].innerHTML += ` <div class="badge bg-secondary">${movieDataObj["images"].backdrops.length}</div>`;
  mediaTitleBar.children[4].innerHTML += ` <div class="badge bg-secondary">${movieDataObj["images"].posters.length}</div>`;
}

function mostPopularMedia(event) {
  mediaContent.scrollLeft = 0;
  resetMediaActiveClass(event)
  mediaContent.innerHTML = `
  <div class="me-3"><iframe width="533" height="300" src="https://www.youtube.com/embed/${movieDataObj["videos"].results[0].key}"></iframe></div>
  <div class="me-3"><img class="rounded" src="${castImageURL + movieDataObj["images"].backdrops[0].file_path}" width="533" height="300"></div>
  <div class="me-3"><img class="rounded" src="${castImageURL + movieDataObj["images"].posters[0].file_path}" width="200" height="300"></div>
  `;
}

function videosMedia(event) {
  mediaContent.scrollLeft = 0;
  resetMediaActiveClass(event);
  let videos = [];
  mediaContent.innerHTML = "";
  movieDataObj["videos"].results.filter((item) => {
    videos.push(`<div class="me-3"><iframe width="533" height="300" src="https://www.youtube.com/embed/${item.key}"></iframe></div>`)
  })
  mediaContent.insertAdjacentHTML("beforeend", videos.join(""));
}

function backdropsMedia(event) {
  mediaContent.scrollLeft = 0;
  resetMediaActiveClass(event);
  let backdrops = [];
  mediaContent.innerHTML = "";
  movieDataObj["images"].backdrops.filter((item) => {
    backdrops.push(`<div class="me-3"><img class="rounded" src="${castImageURL + item.file_path}" width="533" height="295"></div>`)
  })
  mediaContent.insertAdjacentHTML("beforeend", backdrops.join(""));
}

function postersMedia(event) {
  mediaContent.scrollLeft = 0;
  resetMediaActiveClass(event);
  let posters = [];
  mediaContent.innerHTML = "";
  movieDataObj["images"].posters.filter((item) => {
    posters.push(`<div class="me-3"><img class="rounded" src="${castImageURL + item.file_path}" width="200" height="295"></div>`)
  })
  mediaContent.insertAdjacentHTML("beforeend", posters.join(""));
}