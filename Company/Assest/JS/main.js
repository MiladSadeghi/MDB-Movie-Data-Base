const companyLogo = document.querySelector("#company-logo");
const contentCounter = document.querySelector("#data-counter");
const informationBar = document.querySelector(".information");
const bodyContent = document.querySelector(".body-content");
const pageNationUlist = document.querySelector("#ul-pagenation");
const companyIDParam = new URLSearchParams(location.search).get("id");
let companyIDParam2 = new URLSearchParams(location.search).get("show");
if(companyIDParam2 === null) {
  companyIDParam2 = "movie"
}
const originalImageURL = "https://image.tmdb.org/t/p/original";
let apiURL = [`https://api.themoviedb.org/3/company/${companyIDParam}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/discover/${companyIDParam2}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&with_companies=${companyIDParam}`];
let companyDataObj = { page: 1 };
document.addEventListener("DOMContentLoaded", () => {
  getAllFromAPI(apiURL);
  pageNationUlist.addEventListener('click', async (e) => {
    e.stopImmediatePropagation();
    if (e.target.classList.contains("page-next")) {
      if (companyDataObj["companyMovie"].page <= companyDataObj["companyMovie"].total_results) {
        companyDataObj["page"] += 1;
      }
      await pageNation(companyDataObj["page"], companyDataObj["companyMovie"].total_results);
      body();
    }
    if (e.target.classList.contains("page-prev")) {
      if (companyDataObj["companyMovie"].page <= companyDataObj["companyMovie"].total_results) {
        companyDataObj["page"] -= 1;
      }
      await pageNation(companyDataObj["page"], companyDataObj["companyMovie"].total_results);
      body();
    }
  })
  informationBar.addEventListener('click', (e) => {
    if(e.target.tagName === "A") {
      let params = new URLSearchParams(location.search);
      params.set('show', e.target.innerText);
      location.search = params.toString();
    }
  })
})

async function getAllFromAPI(apiURL) {
  let requests = apiURL.map(async (item) =>
    await fetch(item).then(async (response) => await response.json()));
  Promise.all(requests).then(async (datas) => {
    companyDataObj["company"] = await datas[0];
    document.title = `${companyDataObj["company"].name} - #2 IMDB`;
    companyDataObj["companyMovie"] = await datas[1];
    body();
    header();
  })
}
async function getFromAPI(API_LINK) {
  const response = await fetch(API_LINK);
  const result = await response.json();
  return result;
}

async function pageNation(pageNow, totalPage) {
  let api = `https://api.themoviedb.org/3/discover/${companyIDParam2}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&with_companies=${companyIDParam}&page=${pageNow}`;
  let result = await getFromAPI(api)
  companyDataObj["companyMovie"] = await result;
  pageNationUlist.innerHTML = `
  <li class="page-item ${pageNow === 1 ? "disabled" : ""}"><a class="page-link page-prev" href="#">Previous</a></li>
  <li class="page-item ${pageNow === totalPage ? 'disabled' : ''} "><a class="page-link page-next" href="#">Next</a></li>
  `
}

function header() {
  let counter = String(companyDataObj["companyMovie"].total_results).split("").reverse().join("").match(/.{1,3}/g).reverse().join(",");
  if(companyDataObj["company"].logo_path !== null) {
    companyLogo.src = `${originalImageURL}${companyDataObj["company"].logo_path}`;
  } else {
    companyLogo.src = "/Company/Assest/Images/no-image.png";
  }
  contentCounter.innerHTML = `${counter} ${companyIDParam2}`
  if(companyDataObj["company"].name !== (null || "")) {
    informationBar.innerHTML += `<div class="d-flex align-items-center justify-content-center"><i class="bi bi-building fs-5"></i> ${companyDataObj["company"].name}</div>`
  }
  if(companyDataObj["company"].headquarters !== (null || "")) {
    console.log(companyDataObj["company"].headquarters);
    informationBar.innerHTML += `<div class="d-flex align-items-center justify-content-center"><i class="bi bi-geo-alt-fill fs-5"></i> ${companyDataObj["company"].headquarters}</div>`
  }
  if(companyDataObj["company"].origin_country !== null) {
    console.log(companyDataObj["company"].origin_country);
    informationBar.innerHTML += `<div class="d-flex align-items-center justify-content-center"><i class="bi bi-globe2 fs-5"></i> ${companyDataObj["company"].origin_country}</div>`
  }
  if(companyDataObj["company"].homepage !== (null || "")) {
    informationBar.innerHTML += `<div class="d-flex align-items-center justify-content-center"><i class="bi bi-link fs-5"></i> <a href="${companyDataObj["company"].homepage}" class="text-color">Homepage</a></div>`
  }
  const dropDownBTN = document.querySelector("#dropdownMenuButton2");
  dropDownBTN.innerHTML = `${companyIDParam2}`
  const dropDownUL = document.querySelector("#ul-content");
  dropDownUL.innerHTML = `<li><a class="dropdown-item ${(companyIDParam2 === "movie")?"active":""}" href="#">movie</a></li><li><a class="dropdown-item ${(companyIDParam2 === "tv")?"active":""}" href="#">tv</a></li>`
}

function body() {
  let content = [];
  let image = "";
  let movieDate = "";
  bodyContent.innerHTML = "";
  companyDataObj["companyMovie"].results.forEach((item) => {
    movieDate = new Date(item.release_date || item.first_air_date);
    if (!isNaN(movieDate)) {
      movieDate = `${movieDate.toLocaleString([], { month: 'long' })} ${movieDate.getDay()}, ${movieDate.getFullYear()}`
    } else {
      movieDate = "Not Found";
    }
    image = (item.poster_path !== null) ? `${originalImageURL}${item.poster_path}` : "/Company/Assest/Images/loadingImage.png";
    content.push(`
    <div class="card mb-4">
    <a href="/${companyIDParam2}/?id=${item.id}">
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
  pageNation(companyDataObj["companyMovie"].page, companyDataObj["companyMovie"].total_pages);
}