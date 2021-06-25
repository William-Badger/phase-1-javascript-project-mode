document.addEventListener('DOMContentLoaded', () => {
    getTeamNames()
})

function getTeamNames() {
    fetch("https://free-nba.p.rapidapi.com/teams?page=1", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "fd94332bd2msh0a1e5a407ebb708p117d4djsndfb1dc2ad06b",
		"x-rapidapi-host": "free-nba.p.rapidapi.com"
    }})
    .then((resp) => resp.json())
    .then(teams => teams.data.forEach(teams => {

    const teamsName = document.createElement('a')
    const nameList = document.querySelector('#list-items')
    
    teamsName.textContent = teams.full_name
    nameList.append(teamsName)
    
        
    teamsName.addEventListener('click', () => {
        document.querySelector('#list-items').style.display = 'none'

        const id = teams.id
            fetch(`http://localhost:3000/teams/${id}`)
            .then(res => res.json())
            .then(nba => renderTeams(nba))
        
            function renderTeams(nba) {
            const playerList = document.querySelector('.player-list')
            playerList.textContent = ''
            
            nba.players.forEach(player => {
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
                teamLogo.src = nba.teamImage
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
                    .then(player => player)
                })
            })
        }
        }
        
    )})
    )}






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
