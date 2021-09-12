const search = JSON.parse(sessionStorage.getItem("collection"));
querySearch = search[search.length - 1];
bgURL = "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces";
posterURL = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2";
posterPath = document.querySelector(".img-poster img");
headerHead = document.querySelector(".header h1");
detail = document.querySelector(".detail");
overview = document.querySelector(".movie-stuff p");
movieNumber = document.querySelector(".movie-number span");
revenue = document.querySelector(".revenue span");
formatToCurrency = (amount) => {
  return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
featuredSectionContentImg = "https://www.themoviedb.org/t/p/w64_and_h64_face";
featuredCastContent = document.querySelector(".featured-cast-content");
featuredCrewContent = document.querySelector(".featured-crew-content");
movieHeader = document.querySelector('.movie-header')
moviesContent = document.querySelector('.movies-content')
moviesContentImg = 'https://www.themoviedb.org/t/p/w94_and_h141_bestv2'

document.addEventListener("DOMContentLoaded", () => {
  const dataAll = getAPIAll();
  showHeader(dataAll);
});

async function getAPIAll() {
  const API = `https://api.themoviedb.org/3/collection/${querySearch}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`;
        response = await fetch(API);
        result = await response.json();
  return result;
}
async function getAPIkeywords() {
  const API = `https://api.themoviedb.org/3/genre/movie/list?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`;
        response = await fetch(API);
        result = await response.json();
  return result;
}
async function getAPIRevenue(id) {
  const API = `https://api.themoviedb.org/3/movie/${id}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`;
        response = await fetch(API);
        result = await response.json();
  return result;
}
async function getAPICast(id) {
  const API = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`;
        response = await fetch(API);
        result = await response.json();
  return result;
}

function showKeywords(array) {
  let uniqueChars = array.filter((c, index) => {
    return array.indexOf(c) === index;
  });
  let genre = "";
  getAPIkeywords().then((e) => {
    for (let i = 0; i < e.genres.length; i++) {
      for (let j = 0; j < uniqueChars.length; j++) {
        if (e.genres[i].id === uniqueChars[j]) {
          genre += `${e.genres[i].name}, `;
        }
      }
    }
    genre = genre.slice(0, -2);
    detail.children[0].innerHTML = genre;
  });
}

function showHeader(data) {
  let voteAverage = 0;
      genre = [];
      movie = [];
  data.then((e) => {
    e.parts.forEach((element) => {
      voteAverage += element.vote_average;
      genre.push(...element.genre_ids);
      movie.push(element.id);
      moviesContent.innerHTML += `
      <a href="#" class="row move" data-id="${element.id}">
        <div data-id="${element.id}">
          <img data-id="${element.id}" src="${moviesContentImg + element.poster_path}">
          <div data-id="${element.id}" class="row-content">
            <span data-id="${element.id}">
              <h2 data-id="${element.id}">${element.title}</h2>
              <span data-id="${element.id}">${element.release_date.replaceAll('-','/')}</span>
            </span data-id="${element.id}">
              <p data-id="${element.id}">${element.overview}</p>
          </div>
        </div>
      </a>
      `
    });
    let cast = e.parts[e.parts.length - 1].id;
    showFeaturedSection(cast);
    showKeywords(genre);
    showRevenue(movie);
    document.documentElement.style.setProperty("--banner", `linear-gradient(90deg, rgba(168, 2, 2, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%), url('${bgURL + e.backdrop_path}') no-repeat`);
    posterPath.src = posterURL + e.poster_path;
    headerHead.innerText = e.name;
    document.title = e.name + " - Im Second IMDB!";
    detail.innerHTML += `<span class="genre"></span>  	&#9679;  <span class="vote">${(voteAverage / e.parts.length).toFixed(1)}</span>`;
    overview.innerText = e.overview;
    movieNumber.innerHTML = `${e.parts.length}`;
    movieHeader.innerHTML = `${e.parts.length} Movies`
    moveToPage('movie', 'Movie')
  });
}

function showRevenue(id) {
  let revenueMoney = 0;
  for (const iterator of id) {
    getAPIRevenue(iterator).then((e) => {
      revenueMoney += e.revenue;
      revenue.innerHTML = `${formatToCurrency(revenueMoney)}`;
    });
  }
}

function showFeaturedSection(cast) {
  getAPICast(cast).then((e) => {
    e.cast.forEach((element) => {
      if (element.order < 14) {
        featuredCastContent.innerHTML += `
        <a href="#" class="card move" data-id="${element.id}">
          <div data-id="${element.id}">
          <img src="${(element.profile_path)? featuredSectionContentImg + element.profile_path: 'Assest/Images/profile.png'}" data-id="${element.id}">
            <div class="card-content" data-id="${element.id}">
              <h5 data-id="${element.id}">${element.name}</h5 >
              <p data-id="${element.id}">${element.character}</p>
            </div>
          </div>
        </a>
      `;
      }
      moveToPage('person', 'Person')
    });
    let loopCounter = 0;
    e.crew.forEach((element) => {
      if (loopCounter <= 3) {
        if (element.department === "Directing" || element.department === "Writing") {
          if (featuredCrewContent.innerHTML.trim()) {
            if (element.name === featuredCrewContent.children[loopCounter - 1].children[0].children[1].children[0].textContent) {
              featuredCrewContent.children[loopCounter - 1].children[0].children[1].children[1].textContent += `, ${element.department}`;
            } else {
              featuredCrewContent.innerHTML += `
              <a href="#" class="card move" data-id="${element.id}">
                <div>
                  <img src="${(element.profile_path)? featuredSectionContentImg + element.profile_path: 'Assest/Images/profile.png'}" data-id="${element.id}">
                  <div class="card-content" data-id="${element.id}">
                    <h5 data-id="${element.id}">${element.name}</h5>
                    <p data-id="${element.id}">${element.department}</p>
                  </div>
                </div>
              </a>`;
                loopCounter++;
            }
          } else {
            featuredCrewContent.innerHTML += `
            <a href="#" class="card move" data-id="${element.id}">
              <div>
              <img data-id="${element.id}" src="${(element.profile_path)? featuredSectionContentImg + element.profile_path: 'Assest/Images/profile.png'}">
                <div class="card-content" data-id="${element.id}">
                  <h5 data-id="${element.id}">${element.name}</h5>
                  <p data-id="${element.id}">${element.department}</p>
                </div>
              </div>
            </a>`;
              loopCounter++;
          }
        }
      }
      moveToPage('person', 'Person')
    });
  });
}

function moveToPage(storage, path) {
  let lists = []
  const move = document.querySelectorAll('.move')
  move.forEach(element => {
    element.addEventListener('click',(e)=> {
      e.preventDefault()
      console.log(e.target);
      lists.push(e.target.getAttribute('data-id'))
      sessionStorage.setItem(storage, JSON.stringify(lists))
      window.open(`../${path}`, '_blank')
    })
  });
}