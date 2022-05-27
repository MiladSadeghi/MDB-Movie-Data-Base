const keyword = document.querySelector("#keyword");
const contentCounter = document.querySelector("#data-counter");
const bodyContent = document.querySelector(".body-content");
const pageNationUlist = document.querySelector("#ul-pagenation");
const windowLocationParams = new URLSearchParams(location.search)
const keywordIDParam = windowLocationParams.get("id");
const keywordIDParam2 = windowLocationParams.get("show");
const keywordIDParam3 = windowLocationParams.get("keyword");
const originalImageURL = "https://image.tmdb.org/t/p/original";
let keywordDataObj = { page: 1 };
let apiURL = [`https://api.themoviedb.org/3/discover/${keywordIDParam2}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&with_keywords=${keywordIDParam}`];

document.addEventListener("DOMContentLoaded", () => {
  getAllFromAPI(apiURL);
  pageNationUlist.addEventListener('click', async (e) => {
    e.stopImmediatePropagation();
    if (e.target.classList.contains("page-next")) {
      if (keywordDataObj["keywordContent"].page <= keywordDataObj["keywordContent"].total_results) {
        keywordDataObj["page"] += 1;
      }
      await pageNation(keywordDataObj["page"], keywordDataObj["keywordContent"].total_results);
      body();
    }
    if (e.target.classList.contains("page-prev")) {
      if (keywordDataObj["keywordContent"].page <= keywordDataObj["keywordContent"].total_results) {
        keywordDataObj["page"] -= 1;
      }
      await pageNation(keywordDataObj["page"], keywordDataObj["keywordContent"].total_results);
      body();
    }
  })
})

async function getAllFromAPI(apiURL) {
  let requests = apiURL.map(async (item) =>
    await fetch(item).then(async (response) => await response.json()));
  Promise.all(requests).then(async (datas) => {
    document.title = `${keywordIDParam3} - #2 IMDB`;
    keywordDataObj["keywordContent"] = await datas[0];
    header();
    body();
  })
}

async function getFromAPI(API_LINK) {
  const response = await fetch(API_LINK);
  const result = await response.json();
  return result;
}

async function pageNation(pageNow, totalPage) {
  let api = `https://api.themoviedb.org/3/discover/${keywordIDParam2}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&with_keywords=${keywordIDParam}&page=${pageNow}`;
  let result = await getFromAPI(api)
  keywordDataObj["keywordContent"] = await result;
  pageNationUlist.innerHTML = `
  <li class="page-item ${pageNow === 1 ? "disabled" : ""}"><a class="page-link page-prev" href="#">Previous</a></li>
  <li class="page-item ${pageNow === totalPage ? 'disabled' : ''} "><a class="page-link page-next" href="#">Next</a></li>
  `
}

function header() {
  let counter = String(keywordDataObj["keywordContent"].total_results).split("").reverse().join("").match(/.{1,3}/g).reverse().join(",");
  contentCounter.innerHTML = `${counter} ${keywordIDParam2}`
  keyword.innerHTML = `${keywordIDParam3}`
}

function body() {
  let content = [];
  let image = "";
  let movieDate = "";
  bodyContent.innerHTML = "";
  keywordDataObj["keywordContent"].results.forEach((item) => {
    movieDate = new Date(item.release_date || item.first_air_date);
    if (!isNaN(movieDate)) {
      movieDate = `${movieDate.toLocaleString([], { month: 'long' })} ${movieDate.getDay()}, ${movieDate.getFullYear()}`
    } else {
      movieDate = "Not Found";
    }
    image = (item.poster_path !== null) ? `${originalImageURL}${item.poster_path}` : "/Company/Assest/Images/loadingImage.png";
    content.push(`
    <div class="card mb-4">
    <a href="/${keywordIDParam2}/?id=${item.id}" target="_blank">
      <div class="row g-0">
        <div class="col-md-2">
          <img src="${image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-10">
          <div class="card-body">
            <h5 class="card-title text-color">${item.original_title || item.original_name}</h5>
            <p class="card-text fs-6 text-color">${movieDate}</p>
            <p class="card-text fs-6 text-color">${item.overview}</p>
          </div>
        </div>
      </div>
      </a>
    </div>
    `)
  })
  bodyContent.insertAdjacentHTML("beforeend", content.join(""));
  pageNation(keywordDataObj["keywordContent"].page, keywordDataObj["keywordContent"].total_pages)
}