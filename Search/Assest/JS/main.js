let locationSearch = location.search
let locationSearchParams = new URLSearchParams(locationSearch)
let userIDParam = locationSearchParams.get('search')
document.title = userIDParam + " - Use Me As 2nd IMDB"