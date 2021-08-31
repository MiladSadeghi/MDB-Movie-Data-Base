const search = sessionStorage.getItem("search");
document.title = search + "- Use Me As Second IMDB";
document.querySelector("#search-bar").placeholder = search;

const UL = document.querySelector(".filter-list");
const LI = document.querySelectorAll(".lists");

document.addEventListener("DOMContentLoaded", () => {
  UL.addEventListener("click", selectedBg);
});

function selectedBg(e) {
  LI.forEach((element) => {
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