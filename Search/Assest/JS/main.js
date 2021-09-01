// const search = JSON.parse(sessionStorage.getItem("search"));
// document.title = search[search.length - 1] + "- Use Me As Second IMDB";
// document.querySelector("#search-bar").placeholder = search[search.length - 1];
// const querySearch = search[search.length - 1]

const UL = document.querySelector(".filter-list");
const LI = document.querySelectorAll(".lists");
const searchIcon = document.querySelector('#search')

let query;

document.addEventListener("DOMContentLoaded", () => {
  UL.addEventListener("click", selectedBg);
  resultCounterAndPageMaker();
  showDataFromAPI();
  searchIcon.addEventListener('click', searchInSearchPage)
});

function selectedBg(e) {
  LI.forEach((element) => {
    element.classList.remove("bg-selected");
  });

  switch (e.target.tagName) {
    case "LI":
      e.target.classList.add("bg-selected");
      resultCounterAndPageMaker(e.target.id);
      query = e.target.id
      showDataFromAPI(e.target.id);
      break;
    case "P":
    case "SPAN":
      e.target.parentElement.classList.add("bg-selected");
      resultCounterAndPageMaker(e.target.parentElement.id);
      query = e.target.parentElement.id
      showDataFromAPI(e.target.parentElement.id);
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
    pageSelector();
  });
}

async function getCounterAndPage(searchForWhat) {
  const API = `https://api.themoviedb.org/3/search/${searchForWhat}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&query=avenger`;

  const response = await fetch(API);
  const result = await response.json();
  return result;
}

function showDataFromAPI(query = "movie", page = 1) {
  const path = document.querySelector("#content");
  const data = getFromAPI(query, page);
  let posterPathURL = "https://www.themoviedb.org/t/p/w220_and_h330_face";
  let test1 = 'https://www.themoviedb.org/t/p/w90_and_h90_face/'
  let test = '';
  if(query === 'person') {
    data.then((e) => {
      path.innerHTML = "";
      e.results.forEach(element => {
        for (const iterator of element.known_for) {
          console.log(iterator);
          if(iterator.title) {
            test += ` ${iterator.title},`
          } else {
            test += ` ${iterator.name},`
          }
          
        }
        path.innerHTML += `
        <div class="person-row">
          <div class="${(element.profile_path === null) ? "person-row-img skeletonStyle" : "person-row-img"}">
            <img src="${(element.profile_path === null) ? "Assest/Images/profile.png" : test1 +element.profile_path}">
          </div>
          <div class="person-row-text">
            <h2>${element.name} - <span>${element.known_for_department}</span></h2>
            <p><span>${test}</span></p>
          </div>
        </div>
        `
        test = ''
      })
    })
    return true
  }

  data.then((e) => {
    path.innerHTML = "";
    e.results.forEach((element) => {
      let res = element.overview.split(".", 2).join(".").length;
      res = element.overview.slice(0, res);
      path.innerHTML += `
      <div class="content-row">
        <div class="${
          (element.poster_path === null || element.backdrop_path === null)
            ? "content-row-img skeletonStyle"
            : "content-row-img"
        }">
          <img src="${
            (element.poster_path === null || element.backdrop_path === null)
              ? "Assest/Images/loadingImage.png"
              : posterPathURL + element.poster_path
          }">
        </div>
        <div class="content-row-text">
          ${(query === 'collection')? `<h2 class="title">${element.title ? element.title : element.original_name}</h2>` : 
          `<h2 class="title">${element.title ? element.title : element.original_name} - <span class="vote">${element.vote_average === 0 ? "no Vote" : element.vote_average}</span></h2>`}
          
          <p class="overview">${element.overview === "" ? "No Data" : res}..</p>
        </div>
      </div>
      `;
    });
  });
}

async function getFromAPI(searchForWhat, page) {
  const API = `https://api.themoviedb.org/3/search/${searchForWhat}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&query=avenger&page=${page}&include_adult=false`;

  const response = await fetch(API);
  const result = await response.json();
  return result;
}

function pageSelector() {
  const test = document.querySelectorAll(".page");
  test.forEach((element) => {
    element.addEventListener("click", (e) => {
      showDataFromAPI(query, e.target.getAttribute("data"));
    });
  });
}

function searchInSearchPage() {
  const inputField = document.getElementById('search-bar')
  const search = JSON.parse(sessionStorage.getItem("search"));
  if (inputField.value !== '') {
    search.push(inputField.value)
    console.log(search, inputField.value);
    sessionStorage.setItem('search', JSON.stringify(search))
    window.open('/Search', '_blank')
  }
}