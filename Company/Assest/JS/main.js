const companyLogo = document.querySelector("#company-logo");
const contentCounter = document.querySelector("#data-counter");
const informationBar = document.querySelector(".information")
const bodyContent = document.querySelector(".body-content")
const companyIDParam = new URLSearchParams(location.search).get("id");
const companyIDParam2 = new URLSearchParams(location.search).get("show");
const originalImageURL = "https://image.tmdb.org/t/p/original";
let apiURL = [`https://api.themoviedb.org/3/company/${companyIDParam}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/discover/${companyIDParam2}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&with_companies=${companyIDParam}`];
let companyDataObj = {};
document.addEventListener("DOMContentLoaded", () => {
  getFromAPI(apiURL);
})

async function getFromAPI(apiURL) {
  let requests = apiURL.map(async (item) =>
    await fetch(item).then(async (response) => await response.json()));
  Promise.all(requests).then(async (datas) => {
    companyDataObj["company"] = await datas[0];
    companyDataObj["companyMovie"] = await datas[1];
    header();
    body();
    console.log(companyDataObj);
  })
}

function header() {
  let counter = String(companyDataObj["companyMovie"].total_results).split("").reverse().join("").match(/.{1,3}/g).reverse().join(",");
  companyLogo.src = `${originalImageURL}${companyDataObj["company"].logo_path}`
  contentCounter.innerHTML = `${counter} ${companyIDParam2}`
  informationBar.innerHTML = `<div><i class="bi bi-building fs-5"></i> ${companyDataObj["company"].name}</div><div><i class="bi bi-geo-alt-fill fs-5"></i> ${companyDataObj["company"].headquarters}</div><div><i class="bi bi-globe2 fs-5"></i> ${companyDataObj["company"].origin_country}</div><div><i class="bi bi-link fs-5"></i> <a href="${companyDataObj["company"].homepage}" class="text-color">Homepage</a></div>`
}

function body() {
  let content = [];
  
  companyDataObj["companyMovie"].results.forEach((item) => {
    let movieDate = new Date(item.release_date);
    movieDate = `${movieDate.toLocaleString([], {month: 'long'})} ${movieDate.getDay()}, ${movieDate.getFullYear()}`
    content.push(`
    <div class="card mb-4">
  <div class="row g-0">
    <div class="col-md-2">
      <img src="${originalImageURL}${item.poster_path}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-10">
      <div class="card-body">
        <h5 class="card-title text-color">${item.original_title}</h5>
        <p class="card-text fs-6 text-color">${movieDate}</p>
        <p class="card-text fs-6 text-color">${item.overview}</p>
      </div>
    </div>
  </div>
</div>
    `)
  })
  bodyContent.insertAdjacentHTML("beforeend", content.join(""));
}