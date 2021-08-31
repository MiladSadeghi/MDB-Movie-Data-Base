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