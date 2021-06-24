document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/nba")
    .then(res => res.json())
    .then(nba => nba.forEach(renderLogo))
});

function renderLogo(nba) {
    let tab = document.querySelector('#tab')

    let logoBtn = document.createElement('img')
    logoBtn.src = nba.teamImage

    logoBtn.addEventListener('click', () => {
        renderOneTeam(nba)
    })

    tab.append(logoBtn)
}

function renderOneTeam(nba) {
    console.log('hi')
}