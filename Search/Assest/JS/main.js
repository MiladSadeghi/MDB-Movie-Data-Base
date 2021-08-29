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
  whatShouldBeShown(idOfResultCounter)
})

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
      return selected.id
    })
  });
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
      <div class="content-row-img">
        <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="">
      </div>
      <div class="content-row-text">
        <h2 class="nothing1"></h2>
        <p class="nothing2"></p>
        <span class="nothing3"></span>
      </div>
    </div>
    `;
  }
}

async function getFromAPI(searchForWhat) {
  const API = `https://api.themoviedb.org/3/search/${searchForWhat}?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&query=lucifer&page=1&include_adult=false`;

  const response = await fetch(API);
  const result = await response.json();

  return result;
}
