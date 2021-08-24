const imagesURL = ['https://s4.uupload.ir/files/breaking_bad_science-wallpaper-1920x1080_4e76.jpg', 'https://s4.uupload.ir/files/mulan_2020_film-wallpaper-1920x1080_1omx.jpg', 'https://s4.uupload.ir/files/pirates_of_the_caribbean_5_dead_men_tell_no_tales-wallpaper-1920x1080_i680.jpg', 'https://s4.uupload.ir/files/kylo_ren_star_wars_the_force_awaken-wallpaper-1920x1080_l8w.jpg', 'https://s4.uupload.ir/files/fast_and_furious_6_movie_2013-wallpaper-1920x1080_jnyf.jpg', 'https://s4.uupload.ir/files/captain_marvel_4k_5k-wallpaper-1920x1080_rpgb.jpg', 'https://s4.uupload.ir/files/breaking_bad_science-wallpaper-1920x1080_(1)_ly8v.jpg', 'https://s4.uupload.ir/files/the_vampire_diaries_2-wallpaper-1920x1080_vpjv.jpg', 'https://s4.uupload.ir/files/the_expendables_3_2014_movie-wallpaper-1920x1080_qstm.jpg', 'https://s4.uupload.ir/files/fury_brad_pitt-wallpaper-1920x1080_8bz2.jpg', 'https://s4.uupload.ir/files/teen_wolf_cast-wallpaper-1920x1080_vva1.jpg']

const searchSection = document.querySelector('.search')
const randomImage = imagesURL[Math.floor(Math.random() * imagesURL.length)]

searchSection.style.background = ` linear-gradient(90deg, rgba(187, 10, 13, 0.65) 0%, rgba(187, 10, 13, 0.65) 100%), url('${randomImage}') top no-repeat`

searchSection.style.backgroundPosition = '50% 10%'