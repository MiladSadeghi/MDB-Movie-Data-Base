const search = sessionStorage.getItem("search");
document.title = search + "- Use Me As Second IMDB";
document.querySelector("#search-bar").placeholder = search;

const UL = document.querySelector(".filter-list");
const LI = document.querySelectorAll(".lists");

document.addEventListener("DOMContentLoaded", () => {
  UL.addEventListener("click", selectedBg);
  resultCounterAndPageMaker()
});

function selectedBg(e) {
  LI.forEach((element) => {
    element.classList.remove("bg-selected");
  });

  switch (e.target.tagName) {
    case "LI":
      e.target.classList.add("bg-selected");
      resultCounterAndPageMaker(e.target.id)
      break;
    case "P":
    case "SPAN":
      e.target.parentElement.classList.add("bg-selected");
      resultCounterAndPageMaker(e.target.parentElement.id)
      break;
  }
}
createSkelton(3);
function createSkelton(Number) {
  const path = document.getElementById("content");
  for (let i = 1; i <= Number; i++) {
    path.innerHTML += `
    <div class="content-row">
      <div class="content-row-img skeletonStyle">
        <img src="Assest/Images/loadingImage.png">
      </div>
      <div class="content-row-text">
        <h2 class="nothing1 skeletonStyle"></h2>
        <p class="nothing2 skeletonStyle"></p>
        <span class="nothing3 skeletonStyle"></span>
      </div>
    </div>
    `;
  }
}

function resultCounterAndPageMaker(query = "movie") {
  const counter = document.querySelectorAll(".counter");
  const pageNation = document.querySelector("#pagenation");
  pageNation.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("pages");
  const querySearch = document.querySelectorAll(".lists");
  querySearch.forEach((element, index) => {
    getCounterAndPage(element.id).then((e) => {
      counter[index].innerHTML = e.total_results;
    });
  });

  getCounterAndPage(query).then((e) => {
    for (let i = 1; i <= e.total_pages; i++) {
      div.innerHTML += `
        <span class="page" data="${i}">${i}</span>
      `;
    }
    pageNation.appendChild(div);
  });
}

async function getCounterAndPage(searchForWhat) {
  const API = `https://api.themoviedb.org/3/search/${searchForWhat}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&query=avenger`;

  const response = await fetch(API);
  const result = await response.json();
  return result;
}