const keyword = document.querySelector("#keyword");
const contentCounter = document.querySelector("#data-counter");
const windowLocationParams = new URLSearchParams(location.search)
const keywordIDParam = windowLocationParams.get("id");
const keywordIDParam2 = windowLocationParams.get("show");
const keywordIDParam3 = windowLocationParams.get("keyword");

let keywordDataObj = {};
let apiURL = [`https://api.themoviedb.org/3/discover/${keywordIDParam2}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&with_keywords=${keywordIDParam}`];

document.addEventListener("DOMContentLoaded", () => {
  getAllFromAPI(apiURL);
})

async function getAllFromAPI(apiURL) {
  let requests = apiURL.map(async (item) =>
    await fetch(item).then(async (response) => await response.json()));
  Promise.all(requests).then(async (datas) => {
    document.title = `${keywordIDParam3} - #2 IMDB`;
    keywordDataObj["keywordContent"] = await datas[0];
    header();
  })
}

function header() {
  let counter = String(keywordDataObj["keywordContent"].total_results).split("").reverse().join("").match(/.{1,3}/g).reverse().join(",");
  contentCounter.innerHTML = `${counter} ${keywordIDParam2}`
  keyword.innerHTML = `${keywordIDParam3}`
}