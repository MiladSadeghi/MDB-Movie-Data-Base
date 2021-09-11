const imagesURL = [
  "https://s4.uupload.ir/files/breaking_bad_science-wallpaper-1920x1080_4e76.jpg",
  "https://s4.uupload.ir/files/mulan_2020_film-wallpaper-1920x1080_1omx.jpg",
  "https://s4.uupload.ir/files/pirates_of_the_caribbean_5_dead_men_tell_no_tales-wallpaper-1920x1080_i680.jpg",
  "https://s4.uupload.ir/files/kylo_ren_star_wars_the_force_awaken-wallpaper-1920x1080_l8w.jpg",
  "https://s4.uupload.ir/files/fast_and_furious_6_movie_2013-wallpaper-1920x1080_jnyf.jpg",
  "https://s4.uupload.ir/files/captain_marvel_4k_5k-wallpaper-1920x1080_rpgb.jpg",
  "https://s4.uupload.ir/files/breaking_bad_science-wallpaper-1920x1080_(1)_ly8v.jpg",
  "https://s4.uupload.ir/files/the_vampire_diaries_2-wallpaper-1920x1080_vpjv.jpg",
  "https://s4.uupload.ir/files/the_expendables_3_2014_movie-wallpaper-1920x1080_qstm.jpg",
  "https://s4.uupload.ir/files/fury_brad_pitt-wallpaper-1920x1080_8bz2.jpg",
  "https://s4.uupload.ir/files/teen_wolf_cast-wallpaper-1920x1080_vva1.jpg",
];

let serches = []
let movies = []

function createCards(path, divNumber, classContent) {
  for (let i = 0; i <= divNumber; i++) {
    path.innerHTML += `
    <a href="Movie" target="_blank" data-id="" class="movie-show-detail">
      <div data-id="" class="card item ${classContent}">
        <div data-id="" class="image skeletonStyle">
          <div data-id="" class="vote"></div>
          <img data-id="" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="">
        </div>
        <h1 data-id="" class="movie-name skeletonStyle"></h1>
        <p data-id="" class="release-date skeletonStyle"></p>
      </div>
    </a>
    `;
  }
}

function changeCardCantent(path, result) {
  let posterPathURL = "https://www.themoviedb.org/t/p/w220_and_h330_face";

  Array.from(document.querySelectorAll(".movie-name", ".release-date"), (e) => {
    e.style.width = "80%";
    e.style.height = "100%";
  });

  path.forEach((element, res) => {
    element.children[0].classList.remove("skeletonStyle");
    element.children[1].classList.remove("skeletonStyle");
    element.children[2].classList.remove("skeletonStyle");
    element.children[0].children[1].style.width = "100%";

    element.children[0].children[0].textContent = result[res].vote_average;
    element.children[0].children[1].src = `${posterPathURL}${result[res].poster_path}`;
    element.children[1].textContent = result[res].title;
    element.children[2].textContent = result[res].release_date;
    element.parentElement.setAttribute('data-id', result[res].id)
    element.setAttribute('data-id', result[res].id)
    element.children[0].setAttribute('data-id', result[res].id)
    element.children[0].children[0].setAttribute('data-id', result[res].id)
    element.children[0].children[1].setAttribute('data-id', result[res].id)
    element.children[1].setAttribute('data-id', result[res].id)
    element.children[2].setAttribute('data-id', result[res].id)
  });
}

async function trending() {
  const API_URL =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=75c8aed355937ba0502f74d9a1aed11c";

  const response = await fetch(API_URL);
  const responseContent = await response.json();

  return responseContent;
}

async function popular() {
  const API_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US&page=1";

  const response = await fetch(API_URL);
  const responseContent = await response.json();

  return responseContent;
}

function search(e) {
  e.preventDefault()
  const inputField = document.querySelector('#searchBox')
  const errorDiv = document.querySelector('#error')
  const errorContent = document.createElement('div')
  errorContent.classList.add('error-content')

  if(inputField.value === '' || inputField.value === null || inputField.value === undefined) {
    errorContent.innerHTML = `
      <p>You Shoud Enter Something</p>
    `
    errorDiv.append(errorContent)
    
    errorContent.addEventListener('click', ()=> {
      errorContent.remove()
    }) 
    
    setTimeout(() => {
      errorContent.remove()
    }, 5000);
  } else {
    serches.push(inputField.value)
    sessionStorage.setItem('search', JSON.stringify(serches))
    window.open('Search', '_blank')
  }
}

function moveToMovieDir() {
  let movieShowDetail = document.querySelectorAll('.movie-show-detail')
  movieShowDetail.forEach(element => {
    element.addEventListener('click', (e)=> {
      movies.push(e.target.getAttribute('data-id'))
      sessionStorage.setItem('movie', JSON.stringify(movies))
      window.open('Movie', '_blank')
    })
    element.addEventListener('contextmenu', (e) => {
      movies.push(e.target.getAttribute('data-id'))
      sessionStorage.setItem('movie', JSON.stringify(movies))
      window.open('Movie', '_blank')
    });
  });
}

const searchSection = document.querySelector(".search");
const randomImage = imagesURL[Math.floor(Math.random() * imagesURL.length)];
searchSection.style.background = `linear-gradient(90deg, rgba(168, 2, 2, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%) 50% 10%, url('${randomImage}') no-repeat`;
searchSection.style.backgroundPosition = "50% 10%";

const cardTrendDiv = document.querySelector("#trend-cards");
createCards(cardTrendDiv, 19, "trend-card");
const cardPopularDiv = document.querySelector("#popular-cards");
createCards(cardPopularDiv, 19, "popular-card");

const fromSubmit = document.querySelector('#search')

document.addEventListener("DOMContentLoaded", () => {
  trending().then((result) => {
    const trendCard = document.querySelectorAll(".trend-card");
    changeCardCantent(trendCard, result.results);
  });

  popular().then((result) => {
    const popularCard = document.querySelectorAll(".popular-card");
    changeCardCantent(popularCard, result.results);
  });

  fromSubmit.addEventListener('submit', search)
  moveToMovieDir()
});

let owl = $(".owl-carousel");
$(".owl-next").click(function () {
  owl.trigger("next.owl.carousel");
});

$(".owl-prev").click(function () {
  owl.trigger("prev.owl.carousel");
});

$(".owl1, .owl2").owlCarousel({
  dots: false,
  nav: true,
  navText: [
    "<i class='fas fa-chevron-left'></i>",
    "<i class='fas fa-chevron-right'></i>",
  ],
  responsive: {
    0: {
      items: 1,
    },
    500: {
      items: 2,
    },
    700: {
      items: 3,
    },
    800: {
      items: 4,
    },
    1000: {
      items: 5,
    },
  },
});
