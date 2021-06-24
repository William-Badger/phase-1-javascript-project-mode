document.addEventListener('DOMContentLoaded', () => {
    getEast()
    getWest()
})

function getEast() {
    fetch('http://localhost:3000/easternConference')
    .then(res => res.json())
    .then(east => east.forEach(renderEastMenu))
}

function getWest() {
    fetch('http://localhost:3000/westernConference')
    .then(res => res.json())
    .then(west => west.forEach(renderWestMenu))
}



function renderEastMenu(east) {
    const eastName = document.createElement('a')
    const nameList = document.querySelector('#list-items')
    
    eastName.textContent = east.teamName
    nameList.append(eastName)

    eastName.addEventListener('click', () => {
        document.querySelector('#list-items').style.display = 'none'
        document.querySelector('#list-items2').style.display = 'none'
        renderEastTeam(east)
        
    })
}
function renderWestMenu(west) {
    const westName = document.createElement('a')
    const nameList = document.querySelector('#list-items2')

    westName.textContent = west.teamName
    nameList.append(westName)

    westName.addEventListener('click', () => {
        document.querySelector('#list-items').style.display = 'none'
        document.querySelector('#list-items2').style.display = 'none'
        renderWestTeam(west)
    })
}

    
    
    
function renderEastTeam(east) {
    const playerList = document.querySelector('.player-list')
    playerList.textContent = ''
    
    
    east.players.forEach(player => {
        const playerCard = document.createElement('ul')
        const infoCard = document.createElement('ul')
        const playerName = document.createElement('h2')
        const playerImages = document.createElement('img')
        const playerPosition = document.createElement('h3')
        const playerTeam = document.createElement('h4')
        const br = document.createElement('br')
        const draftButton = document.createElement('button')
        const teamLogo = document.createElement('img')

        playerName.textContent = player.name
        playerTeam.textContent = player.team
        playerImages.src = player.playerImage
        playerPosition.textContent = player.position
        draftButton.textContent = 'DRAFT'
        draftButton.className = 'draft-button'
        teamLogo.src = east.teamImage
        teamLogo.className = 'team-logo'
        infoCard.className = 'info-card'
        playerCard.className = 'player-card'
        
        infoCard.append(playerName,playerTeam, playerPosition)
        playerCard.append(teamLogo, infoCard, playerImages, br, draftButton)
        playerList.append(playerCard)

        const myTeamCard = {
            name: player.name,
            team: player.team,
            playerImage: player.playerImage,
            position: player.position
        }

        draftButton.addEventListener('click', () => {
            fetch('http://localhost:3000/myTeam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(myTeamCard)
            })
            .then(res => res.json())
            .then(player => buildMyTeam(player))
        })
    })
}

function renderWestTeam(west) {
    const playerList = document.querySelector('.player-list')
    playerList.textContent = ''
    west.players.forEach(player => {
        const playerCard = document.createElement('ul')
        const infoCard = document.createElement('ul')
        const playerName = document.createElement('h2')
        const playerImages = document.createElement('img')
        const playerPosition = document.createElement('h3')
        const playerTeam = document.createElement('h4')
        const draftButton = document.createElement('button')
        draftButton.className = 'draft-button'
        const br = document.createElement('br')
        const teamLogo = document.createElement('img')

        playerName.textContent = player.name
        playerTeam.textContent = player.team
        playerImages.src = player.playerImage
        playerPosition.textContent = player.position
        draftButton.textContent = 'DRAFT'
        teamLogo.src = west.teamImage
        teamLogo.className = 'team-logo'
        infoCard.className = 'info-card'
        playerCard.className = 'player-card'

        infoCard.append(playerName,playerTeam, playerPosition)
        playerCard.append(teamLogo, infoCard, playerImages, br, draftButton)
        playerList.append(playerCard)

        const myTeamCard = {
            name: player.name,
            team: player.team,
            playerImage: player.playerImage,
            position: player.position
        }

        draftButton.addEventListener('click', () => {
            
            fetch('http://localhost:3000/myTeam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(myTeamCard)
            })
            .then(res => res.json())
            .then(player => buildMyTeam(player))
        })
    })
}

const myTeamBtn = document.querySelector('#my-team')

myTeamBtn.addEventListener('click', () => {
    const playerList = document.querySelector('.player-list')
            playerList.textContent = ''
        fetch('http://localhost:3000/myTeam')
        .then(res => res.json())
        .then(data => data.forEach(myTeam => {
            const playerCard = document.createElement('ul')
            const playerName = document.createElement('h2')
            const playerImages = document.createElement('img')
            const playerPosition = document.createElement('h3')
            const playerTeam = document.createElement('h4')
            const deleteBtn = document.createElement('button')
            deleteBtn.className = 'draft-button'
            const br = document.createElement('br')

            playerName.textContent = myTeam.name
            playerTeam.textContent = myTeam.team
            playerImages.src = myTeam.playerImage
            playerPosition.textContent = myTeam.position
            deleteBtn.textContent = 'REMOVE'
            playerCard.className = 'player-card'
    
            playerCard.append(playerName,playerTeam, playerPosition, playerImages, br, deleteBtn)
            playerList.append(playerCard)

            deleteBtn.addEventListener('click', (e) => {
                fetch(`http://localhost:3000/myTeam/${myTeam.id}`, {
                    method: "DELETE"
                })
                .then(res => res.json())
                .then(_ => {
                    e.target.parentElement.remove()
                })
            })
        }))
})
