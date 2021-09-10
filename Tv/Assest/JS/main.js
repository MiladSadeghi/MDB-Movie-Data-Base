const search = JSON.parse(sessionStorage.getItem("tv")),
  querySearch = search[search.length - 1],
  bgURL = "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces",
  posterURL = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2",
  posterPath = document.querySelector(".img-poster img"),
  headerHead = document.querySelector(".header h1"),
  headerSpan = document.querySelector(".header span"),
  tagLine = document.querySelector(".tagline"),
  overview = document.querySelector(".movie-stuff p"),
  cast = document.querySelector("#cast"),
  seriesCastURL = "https://www.themoviedb.org/t/p/w138_and_h175_face",
  networkImgURL = "https://www.themoviedb.org/t/p/h30",
  statusM = document.querySelector(".status"),
  language = document.querySelector(".language"),
  network = document.querySelector(".network"),
  type = document.querySelector(".type"),
  homePage = document.querySelector(".fa-home").parentElement,
  facebook = document.querySelector(".fa-facebook-square").parentElement,
  twitter = document.querySelector(".fa-instagram").parentElement,
  instagram = document.querySelector(".fa-twitter-square").parentElement,
  justWatch = document.querySelector(".just-watch").parentElement,
  keyword = document.querySelector(".keywords-content"),
  currentSeasonContentImg = document.querySelector(
    ".current-season-content img"
  ),
  seasons = document.querySelector(".current-season-text h4"),
  seasonsOverview = document.querySelector(".current-season-text p"),
  currentSeasonContentImgURL =
    "https://www.themoviedb.org/t/p/w130_and_h195_bestv2",
  recommendImgURL = "https://www.themoviedb.org/t/p/w250_and_h141_face",
  mediaPopular = document.querySelector("#popular"),
  mediaVideos = document.querySelector("#videos"),
  mediaBackdrops = document.querySelector("#backdrops"),
  mediaPosters = document.querySelector("#posters"),
  mediaURL = "https://www.themoviedb.org/t/p/w533_and_h300_bestv2",
  mediaPostersURL = "https://www.themoviedb.org/t/p/w220_and_h330_face";

document.addEventListener("DOMContentLoaded", () => {
  const dataHeader = getAPIHeader();
  const dataSocial = getAPISocial();
  showHeader(dataHeader);
  const dataKeywords = getAPIKeyword();
  showSide(dataHeader, dataSocial, dataKeywords);
  const dataSeriesCast = getAPISeriesCast();
  const dataRecommend = getAPIRecommendation();
  showMain(dataSeriesCast, dataHeader, dataRecommend);
  const dataImage = getAPIImages();
  showMedia("popular", dataImage, getAPIVideos());
  mediaPopular.addEventListener("click", () => {
    showMedia("popular", dataImage, getAPIVideos());
  });
  mediaVideos.addEventListener("click", () => {
    showMedia("videos", getAPIVideos());
  });
  mediaBackdrops.addEventListener("click", () => {
    showMedia("backdrops", dataImage);
  });
  mediaPosters.addEventListener("click", () => {
    showMedia("posters", dataImage);
  });
});

async function getAPIHeader() {
  const API = `https://api.themoviedb.org/3/tv/${querySearch}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`;
  const response = await fetch(API);
  const result = await response.json();
  return result;
}
async function getAPISeriesCast() {
  const API = `https://api.themoviedb.org/3/tv/${querySearch}/aggregate_credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`;
  const response = await fetch(API);
  const result = await response.json();
  return result;
}
async function getAPILanguage() {
  const API = `https://api.themoviedb.org/3/configuration/languages?api_key=75c8aed355937ba0502f74d9a1aed11c`;
  const response = await fetch(API);
  const result = await response.json();
  return result;
}
async function getAPISocial() {
  const API = `https://api.themoviedb.org/3/tv/${querySearch}/external_ids?api_key=75c8aed355937ba0502f74d9a1aed11c`;
  const response = await fetch(API);
  const result = await response.json();
  return result;
}
async function getAPIKeyword() {
  const API = `https://api.themoviedb.org/3/tv/${querySearch}/keywords?api_key=75c8aed355937ba0502f74d9a1aed11c`;
  const response = await fetch(API);
  const result = await response.json();
  return result;
}
async function getAPIRecommendation() {
  const API = `https://api.themoviedb.org/3/tv/${querySearch}/recommendations?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&page=1`;
  const response = await fetch(API);
  const result = await response.json();
  return result;
}
async function getAPIVideos() {
  const API = `https://api.themoviedb.org/3/tv/${querySearch}/videos?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`;
  const response = await fetch(API);
  const result = await response.json();
  return result;
}
async function getAPIImages() {
  const API = `https://api.themoviedb.org/3/tv/${querySearch}/images?api_key=75c8aed355937ba0502f74d9a1aed11c#`;
  const response = await fetch(API);
  const result = await response.json();
  return result;
}

function showHeader(result) {
  let genres = "";
  result.then((e) => {
    for (const iterator of e.genres) {
      genres += iterator.name + ",  ";
    }
    genres = genres.slice(0, genres.length - 1);
    document.documentElement.style.setProperty(
      "--banner",
      `linear-gradient(90deg, rgba(168, 2, 2, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url('${
        bgURL + e.backdrop_path
      }') no-repeat`
    );
    if(e.poster_path) {posterPath.src = posterURL + e.poster_path} else {posterPath.src = 'Assest/Images/loadingImage.png';posterPath.parentElement.classList.add('bg');}
    
    headerHead.innerText = e.name;
    document.title = e.name + " - Im Second IMDB!";
    headerSpan.innerHTML = `${e.first_air_date.replaceAll("-","/")}  &#9679;  ${genres.slice(0 ,genres.lastIndexOf(','))} ${(e.vote_average)? `&#9679; <span class="vote">${e.vote_average}</span>`: ''}`;
    overview.innerText = e.overview;
    e.tagline ? (tagLine.innerText = `"${e.tagline}"`) : tagLine.remove();
  });
}

function showMain(data, data1, data2) {
  data.then((e) => {
    e.cast.forEach((element) => {
      if (element.order <= 10) {
        cast.innerHTML += `
        <div class="item cast-card">
          <a href="#" class="move" data-id="${element.id}">
            <img src="${(element.profile_path)? seriesCastURL + element.profile_path: (element.gender === 1)? 'Assest/Images/profile.png':(element.gender === 2)? 'Assest/Images/profile2.png':'Assest/Images/non-binary.png'}" data-id="${element.id}">
            <div class="cast-card-content" data-id="${element.id}"> <h4 data-id="${element.id}">${element.name}</h4> <h5 data-id="${element.id}">${element.roles[0].episode_count} Episodes</h5></div>
          </a>
        </div>`;
      }
    });
    cast.innerHTML += `
      <div class="item last">view more ...</div>
    `;
    moveToPage("person", "/Person");
    Carousel(".owl", 1, 3, 6);
  });

  data1.then((e) => {
    let data = e.seasons[e.seasons.length - 1];
    currentSeasonContentImg.src = currentSeasonContentImgURL + data.poster_path;
    seasons.innerHTML = `${data.name} <span>${data.episode_count} Episode</span>`;
    seasonsOverview.innerText = data.overview;
  });

  data2.then((e) => {
    if (e.results.length === 0) {
      recommend.parentElement.parentElement.remove();
    } else {
      let round = function (number, precision) {
        precision = precision || 0;
        return parseFloat(parseFloat(number).toFixed(precision));
      };
      e.results.forEach((element) => {
        recommend.innerHTML += `
        <div class="recommend-card item ${(element.backdrop_path)? '': 'size'}" data-id="${element.id}">
          <a href="#" class="move ${(element.backdrop_path)? '': 'recommendImg'}" data-id="${element.id}">
            <img src="${(element.backdrop_path)? recommendImgURL +element.backdrop_path: 'Assest/Images/loadingImage.png'}" data-id="${element.id}">
            <div class="recommend-card-content" data-id="${element.id}">
              <h5 data-id="${element.id}">${element.original_name}</h5>
              <span class="vote-main" data-id="${element.id}">${round(element.vote_average, 1)}</span>
            </div>
            </a>
          </div>
        `;
      });
      moveToPage('tv','/Tv')
      Carousel(".owl1", 1, 2, 3);
    }
  });
}

function showSide(data, data1, data2) {
  data.then((e) => {
    e.networks.forEach((element) => {
      network.innerHTML = `
      <img src="${networkImgURL + element.logo_path}">
      `;
    });
    statusM.innerHTML = e.status;
    languageName(e.original_language);
    type.innerHTML = e.type;
    justWatch.href ="https://www.justwatch.com/us/tv-show/" +e.name.replaceAll(" ","-"),
    ((e.homepage) ? (homePage.href = e.homepage) : homePage.remove());
  });

  data1.then((e) => {
    e.facebook_id !== null? (facebook.href = "https://www.facebook.com/" + e.facebook_id): facebook.remove(),
    e.instagram_id !== null? (instagram.href = "https://www.instagram.com/" + e.instagram_id): instagram.remove(),
    e.twitter_id !== null? (twitter.href = "https://www.twitter.com/" + e.twitter_id): twitter.remove();
  });

  data2.then((e) => {
    if (e.results.length !== 0) {
      e.results.forEach((element) => {
        keyword.innerHTML += `<a href="#" class="move" data-id="${element.id}">${element.name}</a>`;
      });
      moveToPage("keyword", "/Keyword");
    } else {
      keyword.innerHTML = `<p class="not">No keywords have been added.</p>`;
    }
  });
}

function languageName(lang) {
  getAPILanguage().then((e) => {
    e.forEach((element) => {
      if (element.iso_639_1 === lang) {
        language.innerHTML = element.english_name;
      }
    });
  });
}

function showMedia(choice, data, data1) {
  clearForCarousel();
  const media = document.querySelector("#media");
  if (choice === "popular") {
    data1.then((e) => {
      if (e.results.length !== 0) {
        media.innerHTML += `
        <div class="item iframes">
          <iframe src="https://www.youtube.com/embed/${
            e.results[e.results.length - 1].key
          }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        `;
      }
      data.then((e) => {
        if (e.backdrops.length !== 0) {
          media.innerHTML += `
            <div class="item">
              <img src="${mediaURL + e.backdrops[0].file_path}">
            </div>`;
        }
        if (e.posters.length !== 0) {
          media.innerHTML += `
            <div class="item">
              <img src="${mediaURL + e.posters[0].file_path}">
            </div>`;
          Carousel(".owl2", 1, 2, 2);
        }
      });
    });
  }

  if (choice === "videos") {
    data.then((e) => {
      e.results.forEach((element) => {
        media.innerHTML += `
          <iframe class="item iframe-videos" src="https://www.youtube.com/embed/${element.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
      });
      Carousel(".owl2", 1, 2, 1);
    });
  }
  if (choice === "backdrops") {
    data.then((e) => {
      e.backdrops.forEach((e) => {
        media.innerHTML += `
          <img src="${mediaURL + e.file_path}">
        `;
      });
      Carousel(".owl2", 1, 2, 2);
    });
  }
  if (choice === "posters") {
    data.then((e) => {
      e.posters.forEach((e) => {
        media.innerHTML += `
          <img class="images" src="${mediaPostersURL + e.file_path}">
        `;
      });
      Carousel(".owl2", 1, 2, 5);
    });
  }
}

function clearForCarousel() {
  const mediaContent = document.querySelector(".media-S-content");
  mediaContent.innerHTML = "";
  const carousel = document.createElement("div");
  carousel.classList.add("owl-carousel", "owl-theme", "owl2");
  carousel.id = "media";
  mediaContent.appendChild(carousel);
}

function moveToPage(storage, path) {
  const classes = document.querySelectorAll(".move");
  let query = [];
  classes.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      query.push(e.target.getAttribute("data-id"));
      sessionStorage.setItem(storage, JSON.stringify(query));
      window.open(path, "_blank");
    });
  });
}

function Carousel(path, responsive1, responsive2, responsive3) {
  $(path).owlCarousel({
    dots: true,
    responsive: {
      0: {
        items: responsive1,
      },
      600: {
        items: responsive2,
      },
      1000: {
        items: responsive3,
      },
    },
  });
}
