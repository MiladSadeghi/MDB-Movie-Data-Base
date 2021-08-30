const search = sessionStorage.getItem("search");
document.title = search + "- Use Me As Second IMDB";
document.querySelector("#search-bar").placeholder = search;

const selectUl = document.querySelector(".filter-list");
const selectLi = document.querySelectorAll(".lists");
const idOfResultCounter = ['mCount', 'tCount', 'colCount', 'pCount', 'comCount', 'kCount']

let movie = getFromAPI("movie");
tv = getFromAPI("tv");
collection = getFromAPI("collection");
person = getFromAPI("person");
company = getFromAPI("company");
keyword = getFromAPI("keyword");

const searchQuery = [movie, tv, collection, person, company, keyword]

document.addEventListener('DOMContentLoaded', ()=> {
  countResult(idOfResultCounter, searchQuery)
  showContent('movies')
  whatShouldBeShown()
})

eventListener()
function eventListener() {
  selectUl.addEventListener("click", selectedBg);
}

function countResult(array, content) {
  array.forEach((element,index) => {
    content[index].then((result)=> {
      document.getElementById(element).textContent = result.total_results
    })
  });
}

function whatShouldBeShown() {
  ['movies', 'tvShows', 'collection', 'people', 'companies', 'keywords'].forEach(element => {
    const selected = document.getElementById(element)
    selected.addEventListener('click', ()=> {
      showContent(selected.id)
    })
  });
}

function showContent(ids) {
  const path = document.querySelector('#content')
  
  let posterPathURL = "https://www.themoviedb.org/t/p/w220_and_h330_face";
  let id;
  switch (ids) {
    case 'movies':
      id = movie
      break;
    case 'tvShows':
      id = tv
      break;
    case 'collection':
      id = collection
      break;
    case 'people':
      id = person
      break;
    case 'companies':
      id = company
      break;
    case 'keywords':
      id = keyword
      break;
  }
  
  id.then((e)=> {
    path.innerHTML = ''
    e.results.forEach(element => {
      let res = element.overview.split('.',3).join('.').length
      res = element.overview.slice(0,res)

      path.innerHTML += `
      <div class="content-row">
        <div class="${(element.poster_path === null || element.backdrop_path === null)? 'content-row-img skeletonStyle' : 'content-row-img'}">
          <img src="${(element.poster_path === null || element.backdrop_path === null)? 'Assest/Images/loadingImage.png' : posterPathURL+ element.poster_path}">
        </div>
        <div class="content-row-text">
          <h2 class="title">${(element.title)? element.title : element.original_name}</h2>
          <p class="overview">${(element.overview === '')? 'No Data': res}</p>
          <span class="vote">${(element.vote_average === 0)? 'no Vote': element.vote_average}</span>
        </div>
      </div>
      `
    });
  })
}

function selectedBg(e) {
  selectLi.forEach((element) => {
    element.classList.remove("bg-selected");
  });

  switch (e.target.tagName) {
    case "LI":
      e.target.classList.add("bg-selected");
      break;
    case "P":
    case "SPAN":
      e.target.parentElement.classList.add("bg-selected");
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

async function getFromAPI(searchForWhat) {
  const API = `https://api.themoviedb.org/3/search/${searchForWhat}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&query=avenger&page=1&include_adult=false`;

  const response = await fetch(API);
  const result = await response.json();
  console.log(result);
  return result;
}
