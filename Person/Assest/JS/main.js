const personImage = document.querySelector('#person-image');
const socialIcons = document.querySelector('.social-icons');
const factContent = document.querySelector('.fact-content');
const originalImageSize = "https://www.themoviedb.org/t/p/original";
const personIDParam = new URLSearchParams(location.search).get("id");

let personDataObj = {}
let apiURL = [`https://api.themoviedb.org/3/person/${personIDParam}?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/person/${personIDParam}/external_ids?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/person/${personIDParam}/movie_credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/person/${personIDParam}/tv_credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`]


document.addEventListener("DOMContentLoaded", () => {
  getFromAPI(apiURL);
})

function getFromAPI(apiURL) {
  let requests = apiURL.map(async (item) =>
    await fetch(item).then(async (response) => await response.json()));
  Promise.all(requests).then(async (datas) => {
    personDataObj["personDetails"] = datas[0];
    personDataObj["socialMedia"] = datas[1];
    personDataObj["movieCredit"] = datas[2];
    personDataObj["tvCredit"] = datas[3];
    console.log(personDataObj);
    aside();
    createToolTip();
  })
}

function availableSocialMedia() {
  let social = [];
  if (personDataObj["socialMedia"].facebook_id !== null) {
    social.push(`<a data-bs-toggle="tooltip" data-bs-html="true" title="Visit Facebook" href="https://www.facebook.com/${personDataObj["socialMedia"].facebook_id}" target="_blank"><i class="bi bi-facebook text-color"></i></a>`)
  }
  if (personDataObj["socialMedia"].instagram_id !== null) {
    social.push(`<a data-bs-toggle="tooltip" data-bs-html="true" title="Visit Instagram" href="https://www.instagram.com/${personDataObj["socialMedia"].instagram_id}" target="_blank"><i class="bi bi-instagram text-color"></i></a>`)
  }
  if (personDataObj["socialMedia"].twitter_id !== null) {
    social.push(`<a data-bs-toggle="tooltip" data-bs-html="true" title="Visit Twiter" href="https://www.twitter.com/${personDataObj["socialMedia"].twitter_id}" target="_blank"><i class="bi bi-twitter text-color"></i></a>`)
  }
  console.log(social);
  return social.join("")
}

function createToolTip() {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })
}

function genderVerification(numb) {
  if (numb === 1) { return "Femail" }
  if (numb === 2) { return "Male" }
}

function calcDate(birthDay){
  let diffrent = new Date().getTime() - new Date(birthDay).getTime();
  let diffrentYear = Math.trunc(diffrent / (1000 * 3600 * 24 * 365));
  return diffrentYear;
}

function whatKnown(knowns) {
  let known = [];
  knowns.forEach(element => {
    known.push(`<li class="d-d-inline-flex w-100 mb-2 text-color">${element}</li>`)
  });
  if(known.length !== 0){
  return known.join("")
  } else {
    return `<li class="d-d-inline-flex w-100 mb-2 text-color">-</li>`
  }
}

function aside() {
  personImage.src = `${originalImageSize}${personDataObj["personDetails"].profile_path}`;
  socialIcons.insertAdjacentHTML("beforeend", availableSocialMedia());
  factContent.innerHTML = `
    <p class="mb-4 text-color">
    <strong class="d-block">Known For</strong>
    ${personDataObj["personDetails"].known_for_department}
    </p>
    <p class="mb-4 text-color">
    <strong class="d-block">Known Credits</strong>
    ${personDataObj["movieCredit"].cast.length + personDataObj["tvCredit"].cast.length}
    </p>
    <p class="mb-4 text-color">
    <strong class="d-block">Gender</strong>
    ${genderVerification(personDataObj["personDetails"].gender)}
    </p>
    <p class="mb-4 text-color">
    <strong class="d-block">Birthday</strong>
    ${personDataObj["personDetails"].birthday} (${calcDate(personDataObj["personDetails"].birthday)} Years Old)
    </p>
    <p class="mb-4 text-color">
    <strong class="d-block">Place of Birth</strong>
    ${personDataObj["personDetails"].place_of_birth}
    </p>
    <p class="mb-0"><strong class="d-block text-color">Also Known As</strong></p>
    <ul class="list-unstyled">
    ${whatKnown(personDataObj["personDetails"].also_known_as)}
    </ul>
    `
}