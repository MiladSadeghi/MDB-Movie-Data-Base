const search = sessionStorage.getItem('search')
document.title = search + '- Use Me As Second IMDB'
document.querySelector('#search-bar').placeholder = search

const selectUl = document.querySelector('.filter-list')
const selectLi = document.querySelectorAll('.lists')

eventListener()
function eventListener() {
  selectUl.addEventListener('click', selectedBg)
}


function selectedBg(e) {
  selectLi.forEach(element => {
    element.classList.remove('bg-selected')
  });

  switch (e.target.tagName) {
    case 'LI':
      e.target.classList.add('bg-selected')
      break;
    case 'P':
      e.target.parentElement.classList.add('bg-selected')
      break;
    case 'SPAN':
      e.target.parentElement.classList.add('bg-selected')
      break;

  }
}
