const imagesURL = ['https://s4.uupload.ir/files/2501_d007_00152r_ey35.png', 'https://s4.uupload.ir/files/captain-marvel-movie-poster-4k_1555208721_m5zo.jpg', 'https://s4.uupload.ir/files/wp2751429-wallpapers-movies-hd_rjc2.jpg', 'https://s4.uupload.ir/files/wp1926880-the-revenant-wallpapers_c5ph.jpg', 'https://s4.uupload.ir/files/the_dark_knight_characters-wallpaper-1920x1080_pvz4.jpg', 'https://s4.uupload.ir/files/mulan_2020_film-wallpaper-1920x1200_kb12.jpg', 'https://s4.uupload.ir/files/teahub.io-sith-wallpaper-657742_bl70.png', 'https://s4.uupload.ir/files/breaking_bad_science-wallpaper-1920x1080_q5tg.jpg', 'https://s4.uupload.ir/files/the_expendables-wallpaper-1920x1080_mbwt.jpg', 'https://s4.uupload.ir/files/wallpapertip_hd-movie-wallpapers-1080p_301131_69jz.jpg']


const backgroundChange = document.querySelector('.background')

let randomURL = Math.floor(Math.random() * imagesURL.length) 

function randomBackground() {
  if(randomURL >= imagesURL.length) {
    randomURL = 0
  }
  backgroundChange.style.backgroundImage = `url('${imagesURL[randomURL]}'`
  randomURL++
  }

setInterval(randomBackground, 5000)

