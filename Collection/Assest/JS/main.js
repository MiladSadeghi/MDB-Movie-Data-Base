const collectionTitle = document.querySelector("#collection-title");
const poster = document.querySelector(".image-banner img");
const headerSection = document.querySelector(".header");
const headerContent = document.querySelector(".header-content");
const featuredCastSection = document.querySelector(".featured-cast");
const featuredCrewSection = document.querySelector(".featured-crew");
const orginalImageURL = "https://image.tmdb.org/t/p/original";
const collectionIDParam = new URLSearchParams(location.search).get("id");

let collectionDataObj = { movies: [], credit: [] };
let genresObject = [
  [28, "Action"],
  [12, "Adventure"],
  [16, "Animation"],
  [35, "Comedy"],
  [80, "Crime"],
  [99, "Documentary"],
  [18, "Drama"],
  [10751, "Family"],
  [14, "Fantasy"],
  [36, "History"],
  [27, "Horror"],
  [10402, "Music"],
  [9648, "Mystery"],
  [10749, "Romance"],
  [878, "Science Fiction"],
  [10770, "TV Movie"],
  [53, "Thriller"],
  [10752, "War"],
  [37, "Western"],
]
let apiURL = [`https://api.themoviedb.org/3/collection/${collectionIDParam}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`]

document.addEventListener("DOMContentLoaded", () => {
  getFromAPI(apiURL);
})

async function getFromAPI(apiURL) {
  let requests = apiURL.map(async (item) =>
    await fetch(item).then(async (response) => await response.json()));
  Promise.all(requests).then(async (datas) => {
    collectionDataObj["collectionDetails"] = await datas[0];
    await header();
    featuredCast();
    featuredCrew();
  })
}

function numberToUSD(number) {
  return `$${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}

async function header() {
  document.title = collectionDataObj["collectionDetails"].name + ' - IMDB #2';
  poster.src = `${orginalImageURL}${collectionDataObj["collectionDetails"].poster_path}`;
  headerSection.style.backgroundImage = `url(${orginalImageURL}${collectionDataObj["collectionDetails"].backdrop_path})`
  headerSection.style.backgroundPosition = "right -200px top -120px";
  headerSection.style.backgroundRepeat = "no-repeat";
  headerSection.style.backgroundSize = "cover";
  collectionTitle.innerHTML = collectionDataObj["collectionDetails"].name;
  let setObj = new Set();
  let genre = [];
  let revenue = 0;
  for (item of collectionDataObj["collectionDetails"].parts) {
    await fetch(`https://api.themoviedb.org/3/movie/${item.id}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&append_to_response=credits`).then(async (response) => (await response.json())).then(async (data) => {
      collectionDataObj["movies"].push(data);
      collectionDataObj["credit"].push(data.credits);
      revenue += Number(data.revenue);
    })
    genresObject.forEach(item1 => {
      if (item.genre_ids.includes(item1[0])) {
        if (!setObj.has(item1[1])) {
          setObj.add(item1[1]);
          genre.push(item1[1])
        }
      }
    })
  };
  headerContent.innerHTML = `
    <p class="text-color mb-4">${genre.join(", ")}</p>
    <h6 class="text-color fs-5">Overview</h6>
    <p class="text-color mb-5">${collectionDataObj["collectionDetails"].overview}</p>
    <div class="d-block mb-2">
      <h6 class="text-color d-inline">Revenue:</h6>
      <span class="text-color" text-color fs-6 fw-light">${numberToUSD(revenue)}</span>
    </div>
    <div class="d-block">
      <h6 class="text-color d-inline">Number Of Movies: </h6>
      <span class="text-color fs-6 fw-light">${collectionDataObj["collectionDetails"].parts.length}</span>
    </div>
  `
  console.log(collectionDataObj);
}

function featuredCast() {
  let setObj = new Set();
  let castArray = [];
  let featured = [];
  collectionDataObj["credit"].filter((item, index) => {
    castArray = castArray.concat(item.cast)
  });
  castArray = castArray.reduce((cast, item, index) => {
    if(!cast[item.id]) cast[item.id] = [];
    if(!setObj.has(item.id) && item.character !== "") {
      setObj.add(item.id, item);
      cast[item.id] = [item.name ,item.character, item.id, item.profile_path, item.order, item.popularity, item.cast_id];
    } else if(cast[item.id] && item.character !== "") {
      cast[item.id][1] += item.character;
    }
    return cast
  }, []);
  castArray.sort((a,b) => a[4] - b[4])
  castArray.slice(0,14).forEach(item => {
    featured.push(`
      <div class="d-flex col-auto bg1 p-0 mb-3 cast">
        <img class="rounded-start" style="${(!item[3]) ? `object-fit: contain;` : ``}" src="${(!item[3]) ? `Assest/Images/profile.png` : orginalImageURL + item[3]}">
        <div class="cast-body bg2 rounded-end ps-2 py-3">
          <h6 class="text-color">${item[0]}</h6>
          <p class="text-color">${item[1]}</p>
        </div>
      </div>
    `)
  })
  featuredCastSection.insertAdjacentHTML("beforeend", featured.join(""));
}

function featuredCrew() {
  let setObj1 = new Set();
  let crewArray = [];
  let crewArray1 = [];
  let featured = [];
  collectionDataObj["credit"].filter((item, index) => {
    crewArray = crewArray.concat(item.crew)
  });
  crewArray1 = crewArray.reduce((crew, item, index) => {
    if ((!setObj1.has(item.id)) && ((item.job === "Director" && item.department === "Directing") || ((item.job === "Writer" || item.job === "Screenplay") && item.department === "Writing"))) {
      if (!crew[item.id]) crew[item.id] = [];
      setObj1.add(item.id, item);
      crew[item.id] = [item.name, item.department, item.id, item.profile_path, item.popularity];
    }
      return crew
    }, []);
  crewArray1.forEach(item => {
    featured.push(`
      <div class="d-flex col-auto bg1 p-0 mb-3 crew">
        <img class="rounded-start bg1" style="${(!item[3]) ? `object-fit: contain;` : ``}" src="${(!item[3]) ? `Assest/Images/profile.png` : orginalImageURL + item[3]}">
        <div class="crew-body bg2 rounded-end ps-2 py-3">
          <h6 style="font-size: 0.9rem;" class="text-color">${item[0]}</h6>
          <p class="text-color">${item[1]}</p>
        </div>
      </div>
    `)
  })
  featuredCrewSection.insertAdjacentHTML("beforeend", featured.join(""));
}