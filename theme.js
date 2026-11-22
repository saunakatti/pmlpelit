/* set some variables */
let darkmode = localStorage.getItem("darkmode")
const themeSwitch = document.getElementById("theme-switch")


/* theme changing */

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')

    themeSwitch.innerHTML = "☀️"
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)

    themeSwitch.innerHTML = "🌕"
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("content loaded")
    if(darkmode === "active") enableDarkmode()
});

/* event listener for element "theme-switch" */
themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode() 
})