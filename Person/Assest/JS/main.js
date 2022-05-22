const personImage = document.querySelector('#person-image');
const socialIcons = document.querySelector('.social-icons');
const factContent = document.querySelector('.fact-content');
const personName = document.querySelector("#person-name")
const personBio = document.querySelector("#biography")
const knownFor = document.querySelector('.known-for');
const knownForNextSlide = document.querySelector('#next-known-for');
const knownForPrevSlide = document.querySelector('#prev-known-for');
const carrerContent = document.querySelector('.carrer-content');
const carrer = document.querySelector('.carrer');
const originalImageSize = "https://www.themoviedb.org/t/p/original";
const knownForImageSize = "https://www.themoviedb.org/t/p/w150_and_h225_bestv2";
const personIDParam = new URLSearchParams(location.search).get("id");

let personDataObj = {}
let apiURL = [`https://api.themoviedb.org/3/person/${personIDParam}?api_key=75c8aed355937ba0502f74d9a1aed11c`, `https://api.themoviedb.org/3/person/${personIDParam}/external_ids?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/person/${personIDParam}/movie_credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`, `https://api.themoviedb.org/3/person/${personIDParam}/tv_credits?api_key=75c8aed355937ba0502f74d9a1aed11c&language=en-US`]


document.addEventListener("DOMContentLoaded", () => {
  document.title = 
  getFromAPI(apiURL);
  knownForNextSlide.parentElement.addEventListener("click", () => {
    knownFor.scrollLeft += 350;
  })
  knownForPrevSlide.parentElement.addEventListener("click", () => {
    knownFor.scrollLeft -= 350;
  })
})

function getFromAPI(apiURL) {
  let requests = apiURL.map(async (item) =>
    await fetch(item).then(async (response) => await response.json()));
  Promise.all(requests).then(async (datas) => {
    personDataObj["personDetails"] = datas[0];
    personDataObj["socialMedia"] = datas[1];
    personDataObj["movieCredit"] = datas[2];
    personDataObj["tvCredit"] = datas[3];
    document.title = personDataObj["personDetails"].name + " - IMDB #2";
    aside();
    article();
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

function calcDate(birthDay) {
  let diffrent = new Date().getTime() - new Date(birthDay).getTime();
  let diffrentYear = Math.trunc(diffrent / (1000 * 3600 * 24 * 365));
  return diffrentYear;
}

function whatKnown(knowns) {
  let known = [];
  knowns.forEach(element => {
    known.push(`<li class="d-d-inline-flex w-100 mb-2 text-color">${element}</li>`)
  });
  if (known.length !== 0) {
    return known.join("")
  } else {
    return `<li class="d-d-inline-flex w-100 mb-2 text-color">-</li>`
  }
}

function knowFor() {
  let knownFor = [];
  let mergedCC = personDataObj["movieCredit"].cast.concat(personDataObj["tvCredit"].cast).concat(personDataObj["tvCredit"].crew).concat(personDataObj["movieCredit"].crew);
  mergedCC.sort((a, b) => {
    return b.vote_count - a.vote_count;
  })
  let setObj = new Set();
  let result = mergedCC.reduce((acc, item) => {
    if (!setObj.has(item.id)) {
      setObj.add(item.id, item)
      acc.push(item)
    }
    return acc;
  }, []);
  result.splice(0, 8).filter((item, index) => {
    knownFor.push(`<div class="known-for-card me-3">
    <img src="${knownForImageSize + item.poster_path}" class="known-for-img-top rounded" alt="">
    <div class="known-for-body text-center mt-2">
      <h6 class="known-title text-color fw-normal fs-6">${item.original_title}</h6>
    </div>
  </div>`);
  })

  return knownFor.join("");
}

function carrerShow() {
  let department = {};
  let content = [];
  let mergedCC = personDataObj["movieCredit"].cast.concat(personDataObj["tvCredit"].cast).concat(personDataObj["movieCredit"].crew.concat(personDataObj["tvCredit"].crew));
  mergedCC.filter((item, index) => {
    let departmentAvailable = (item.department) ? item.department : "Acting";
    if (Object.keys(department).includes(departmentAvailable)) {
      if (item.release_date === "" || item.first_air_date === "") {
        department[departmentAvailable].unshift(item);
      } else {
        department[departmentAvailable].push(item);
      }
    } else {
      department[departmentAvailable] = [item];
    }
  })
  Object.keys(department).filter((item, index1) => {
    department[item].sort((a, b) => {
      return new Date(b.release_date || b.first_air_date) - new Date(a.release_date || a.first_air_date);
    })
    content.push(`</div><h5 class="text-color">${item}</h5><div class="mb-2 bg-mygrey rounded">`)
    department[item].filter((item2, index2) => {
      let nowDate = (item2.release_date === "" || item2.first_air_date === "") ? "-" : Number((item2.release_date || item2.first_air_date).slice(0, 4));
      let oldDate = new Date((department[item][(index2 - 1 === -1) ? 0 : index2 - 1].release_date || department[item][(index2 - 1 === -1) ? 0 : index2 - 1].first_air_date)).getFullYear();
      if(isNaN(oldDate)){ oldDate = "-"};
      if (oldDate != nowDate) {
        content.push(`</div>`);
      }
      content.push(`
      ${((nowDate != oldDate) || index2 === 0)?`</div><div class="mb-2 bg-mygrey rounded">`:``}
      <div class="row mb-1 p-2">
      <div class="col-md-2 text-center black-text-color fs-6">${nowDate}</div>
      <div class="col-md-5"><strong class="text-known-for black-text-color">${item2.title || item2.original_name}<small class="text-known-for fw-light d-block ${(!item2.episode_count)?"d-none":""}">	&nbsp;${(item2.episode_count)? `(${item2.episode_count} episodes) `:""}</small></strong>
        
      </div>
      <div class="col-md text-known-for black-text-color ${(!item2.character)?"d-none":""}">as <p class=" fw-bold d-inline">${item2.character}</p></div>
      <div class="col-md text-known-for black-text-color ${(!item2.job)?"d-none":""}"><p class="fw-normal d-inline">${item2.job}</p></div>
      </div>
      `)
    })
  })
  return content.join("");
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

function article() {
  personName.innerHTML = personDataObj["personDetails"].name;
  personBio.innerText = personDataObj["personDetails"].biography;
  knownFor.insertAdjacentHTML("beforeend", knowFor());
  carrer.insertAdjacentHTML("beforeend", carrerShow());
}