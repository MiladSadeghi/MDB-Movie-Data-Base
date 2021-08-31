const search = sessionStorage.getItem("search");
document.title = search + "- Use Me As Second IMDB";
document.querySelector("#search-bar").placeholder = search;
