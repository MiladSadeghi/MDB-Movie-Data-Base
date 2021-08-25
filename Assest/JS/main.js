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

function createTrendCard(divNumber) {
  const cardDiv = document.querySelector("#cards");

  for (let i = 0; i <= divNumber; i++) {
    cardDiv.innerHTML += `
    <div class="trend-card item">
      <div class="image">
        <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="">
      </div>

      <h1 class="movie-name"></h1>
      <p class="release-date"></p>
    </div>
    `;
  }
}

const searchSection = document.querySelector(".search");
const randomImage = imagesURL[Math.floor(Math.random() * imagesURL.length)];

searchSection.style.background = `linear-gradient(90deg, rgba(168, 2, 2, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%) 50% 10%, url('${randomImage}') no-repeat`;
searchSection.style.backgroundPosition = "50% 10%";

createTrendCard(20);

let owl = $(".owl-carousel");

$(".next-btn").click(function () {
  owl.trigger("next.owl.carousel");
});

$(".prev-btn").click(function () {
  owl.trigger("prev.owl.carousel");
});

$(".owl-carousel").owlCarousel({
  dots: false,
  nav: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 6,
    },
  },
});
