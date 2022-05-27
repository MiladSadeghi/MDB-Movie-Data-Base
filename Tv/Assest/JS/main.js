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
const currentSession = document.querySelector(".current-session");
const currentSessionImg = document.querySelector(".cs");
const currentSessionBody = document.querySelector(".cs-body");
const recommend = document.querySelector(".recommend");
const mediaTitleBar = document.querySelector(".media-title-bar");
const mediaContent = document.querySelector(".media-content");
const mediaNextSlide = document.querySelector("#next-media");
const mediaPrevSlide = document.querySelector("#prev-media");
const tvIDParam = new URLSearchParams(location.search).get("id");
const headerSection = document.querySelector(".header");
const recommendNextSlide = document.querySelector("#next-recommend");
const recommendPrevSlide = document.querySelector("#prev-recommend");
const poster = document.querySelector(".image-banner img")
const bannerImageURL = "https://image.tmdb.org/t/p/original"
const posterImageURL = "https://www.themoviedb.org/t/p/original"
const castImageURL = "https://www.themoviedb.org/t/p/original"
const recommendImageURL = "https://www.themoviedb.org/t/p/original"
const networkImageURL = "https://www.themoviedb.org/t/p/h30"

let screenSize = window.screen.availWidth;
let tvDataObj = {}
let apiURL = [`https://api.themoviedb.org/3/tv/${tvIDParam}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/tv/${tvIDParam}/content_ratings?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/tv/${tvIDParam}/credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/tv/${tvIDParam}/external_ids?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/tv/${tvIDParam}/keywords?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/tv/${tvIDParam}/recommendations?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/tv/${tvIDParam}/videos?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/tv/${tvIDParam}/images?api_key=75c8aed355937ba0502f74d9a1aed11c`,`https://api.themoviedb.org/3/tv/${tvIDParam}/recommendations?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&page=1`]

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
  })
});

function getFromAPI(apiURL) {
  let requests = apiURL.map(async (item) =>
    await fetch(item).then(async (response) => await response.json()));
  Promise.all(requests).then(async (datas) => {
    tvDataObj["tvDetails"] = datas[0];
    tvDataObj["contentRating"] = datas[1];
    tvDataObj["Cast&Crew"] = datas[2];
    tvDataObj["socialMedia"] = datas[3];
    tvDataObj["keywords"] = datas[4];
    if(tvDataObj["tvDetails"].last_episode_to_air) {
      tvDataObj["currentSession"] = await fetch(`https://api.themoviedb.org/3/tv/${tvIDParam}/season/${tvDataObj["tvDetails"].last_episode_to_air.season_number}?api_key=75c8aed355937ba0502f74d9a1aed11c`).then(response => response.json());
    }
    tvDataObj["recommendation"] = datas[5];
    tvDataObj["videos"] = datas[6];
    tvDataObj["images"] = datas[7];
    tvDataObj["recommendation"] = datas[8];
    header();
    aside();
    article();
    mostPopularMedia(mediaTitleBar.children[1]);
    createToolTip()
  })
}

function ageRestriction(Country) {
  if(tvDataObj["contentRating"].results.length !== 0) {
    let certificate = tvDataObj["contentRating"].results.find((item) => {
      if (item.iso_3166_1 === Country) {
        return item.rating
      } else {
        return false
      }
    })
    return certificate.rating
  }
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
    importantCrew.push(`<div class="col"><a href="/Person/?id=${item.id}" target="_blank"><h6>${item.name}</h6></a><p>Creator</p></div>`);
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
    keywords.push(`<a href="/Keyword/?id=${item.id}&keyword=${item.name}&show=tv" class="badge bg-secondary text-white me-2 my-1" target="_blank">${item.name}</a>`)
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
      if(item.profile_path !== null) {
        var prof = castImageURL + item.profile_path;
      } else {
        if(item.gender === 2) {
          prof = '/Tv/Assest/Images/profile2.png'
        }
        if(item.gender === 1) {
          prof = '/Tv/Assest/Images/profile.png'
        }
        if(item.gender === 3) {
          prof = '/Tv/Assest/Images/non-binary.png'
        }
      }
      cast.push(`
      <div class="cast-card me-3 rounded">
      <a href="/person/?id=${item.id}" target="_blank" class="d-flex flex-column align-items-center">
      <img src="${prof}" class="card-img-top" alt="">
      <div class="cast-body">
        <h5 class="cast-title text-black">${item.name}</h5>
        <p class="cast-text text-black">${item.character}</p>
      </div>
      </a>
    </div>
      `)
    }
  })
  return cast.join("");
}

function arrangeRecommendations() {
  let recommendations = [];
  if (tvDataObj['recommendation'].results) {
    tvDataObj['recommendation'].results.filter((item) => {
      if(item.poster_path !== null) {
        var recommendImage = recommendImageURL + item.backdrop_path;
        var size = "100%";
      } else {
        recommendImage = '/Tv/Assest/Images/no-image.png'
        var size = "56%"
      }
      recommendations.push(`
    <div class="recommend-card me-3 rounded">
    <a href="/tv/?id=${item.id}" target="_blank" class="d-flex flex-column align-items-center">
    <img class="card-img-top" style="width: ${size}" src="${recommendImage}">
      <div class="recommend-body d-flex justify-content-between align-items-center text-color">
        <h5>${item.name}</h5>
        <span class="fw-bold">${item.vote_average.toFixed(1) * 10}%</span>
      </div>
      </a>
    </div>
    `)
    })
    return recommendations.join("");
  } else {
    return `<p>We don't have enough data to suggest any movies based on ${tvDataObj["movieDetails"].name}. You can help by rating movies you've seen.</p>`
  }
}

function resetMediaActiveClass(event) {
  document.querySelector(".media-active").classList.remove("media-active");
  event.classList.add("media-active");
}

function header() {
  document.title = tvDataObj["tvDetails"].original_name + ' - IMDB #2';
  if(tvDataObj["tvDetails"].poster_path !== null) {
    poster.src = `${posterImageURL}${tvDataObj["tvDetails"].poster_path}`;
  } else {
    poster.src = `/Tv/Assest/Images/no-image.png`
  }
  if(tvDataObj["tvDetails"].backdrop_path !== null) {
    headerSection.style.backgroundImage = `url(${bannerImageURL}${tvDataObj["tvDetails"].backdrop_path})`
  }
  headerSection.style.backgroundPosition = screenSize;
  headerSection.style.backgroundRepeat = "no-repeat";
  headerSection.style.backgroundSize = "cover";
  tvTitle.innerHTML += `${tvDataObj["tvDetails"].original_name}`;
  certificationBadge.innerHTML = `${ageRestriction(tvDataObj["tvDetails"].origin_country[0])}`;
  if(!ageRestriction(tvDataObj["tvDetails"].origin_country[0])) {
    certificationBadge.classList.add("d-none")
  }
  country.innerHTML = `${tvDataObj["tvDetails"].production_countries[0].iso_3166_1}`
  genres.innerHTML = `${multipleArrayInObj(tvDataObj["tvDetails"].genres, "name")}`
  if(tvDataObj["tvDetails"].episode_run_time.length !== 0) {
    runTime.innerHTML = `${timeConvert(tvDataObj["tvDetails"].episode_run_time[0])}`
  }
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
  if(tvDataObj["currentSession"]) {
    currentSessionImg.src = `${recommendImageURL}${tvDataObj["currentSession"].poster_path}`;
    currentSessionBody.innerHTML = `
    <h5 class="card-title">${tvDataObj["currentSession"].name}</h5>
    <h4 class="card-text fs-6 fw-bold mb-5 mt-2">${new Date(tvDataObj["currentSession"].air_date).getFullYear()}<span class="text-muted w-75 mx-2">|</span>${tvDataObj["currentSession"].episodes.length}</h4>
    <p>${tvDataObj["currentSession"].overview}</p>
    `
  } else {
    currentSession.classList.add("d-none");
  }
  if(tvDataObj['recommendation'].results.length === 0) {
    document.querySelector(".recommend-div").classList.add("d-none")
  } else {
    recommend.insertAdjacentHTML("beforeend", arrangeRecommendations());
  }
  mediaTitleBar.children[2].innerHTML += ` <div class="badge bg-secondary">${tvDataObj["videos"].results.length}</div>`;
  mediaTitleBar.children[3].innerHTML += ` <div class="badge bg-secondary">${tvDataObj["images"].backdrops.length}</div>`;
  mediaTitleBar.children[4].innerHTML += ` <div class="badge bg-secondary">${tvDataObj["images"].posters.length}</div>`;
}

function mostPopularMedia(event) {
  mediaContent.scrollLeft = 0;
  resetMediaActiveClass(event)
  mediaContent.innerHTML = `
  ${(tvDataObj["videos"].results.length !== 0)? `<div class="me-3"><iframe width="533" height="300" src="https://www.youtube.com/embed/${tvDataObj["videos"].results[0].key}"></iframe></div>`:``}
  ${(tvDataObj["images"].backdrops.length !== 0)? `<div class="me-3"><img class="rounded" src="${castImageURL + tvDataObj["images"].backdrops[0].file_path}" width="533" height="300"></div>`:``}
  ${(tvDataObj["images"].posters.length !== 0)? `<div class="me-3"><img class="rounded" src="${castImageURL + tvDataObj["images"].posters[0].file_path}" width="200" height="300"></div>`:``}
  `;
}

function videosMedia(event) {
  mediaContent.scrollLeft = 0;
  resetMediaActiveClass(event);
  let videos = [];
  mediaContent.innerHTML = "";
  tvDataObj["videos"].results.filter((item) => {
    videos.push(`<div class="me-3"><iframe width="533" height="300" src="https://www.youtube.com/embed/${item.key}"></iframe></div>`)
  })
  mediaContent.insertAdjacentHTML("beforeend", videos.join(""));
}

function backdropsMedia(event) {
  mediaContent.scrollLeft = 0;
  resetMediaActiveClass(event);
  let backdrops = [];
  mediaContent.innerHTML = "";
  tvDataObj["images"].backdrops.filter((item) => {
    backdrops.push(`<div class="me-3"><img class="rounded" src="${castImageURL + item.file_path}" width="533" height="295"></div>`)
  })
  mediaContent.insertAdjacentHTML("beforeend", backdrops.join(""));
}

function postersMedia(event) {
  mediaContent.scrollLeft = 0;
  resetMediaActiveClass(event);
  let posters = [];
  mediaContent.innerHTML = "";
  tvDataObj["images"].posters.filter((item) => {
    posters.push(`<div class="me-3"><img class="rounded" src="${castImageURL + item.file_path}" width="200" height="295"></div>`)
  })
  mediaContent.insertAdjacentHTML("beforeend", posters.join(""));
}