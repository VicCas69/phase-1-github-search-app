//

window.addEventListener('DOMContentLoaded', ()=>{

    const formTrouble = document.querySelector('#github-form');
    formTrouble.addEventListener('submit', handleSubmit)
    //console.log('hi')
})

function handleSubmit(e){
    e.preventDefault()
    return fetch('https://api.github.com/users')
    .then(res=>res.json())
    .then(data => {
        const userList = document.querySelector('#user-list')
        const repo = document.querySelector('#repos-list')
        while (userList.firstChild) {
            userList.removeChild(userList.firstChild);
        }  
        while (repo.firstChild) {
            repo.removeChild(repo.firstChild);
        }  
        data.forEach(user=>renderUser(user))
        }
    )
}

function reposProfile(){
    const user = document.querySelector('input#search').value;
    //console.log(user)
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(resp => resp.json())
    .then(data=>data.forEach(u=>{
        const repName = document.createElement('li')
        const repUrl = document.createElement('li')
            repName.textContent = u.name
            //console.log(repName)
            //repUrl.textContent = u.url
            //.log(repUrl)
            document.querySelector('#repos-list').appendChild(repName)
            //document.querySelector('#repos-list').appendChild(repUrl)
    }))
}

function users(){
    return fetch('https://api.github.com/users')
    .then(res=>res.json())
    .then(data=>console.log(data))//data.forEach(user=>renderUser(user)))
}

function renderUser(user){
    const input = document.querySelector('input#search').value;
    const li_User = document.createElement('li');
    const image = document.createElement('img')
    const profileLink = document.createElement('a')

    li_User.innerText = user.login
    image.src = user.avatar_url
    profileLink.innerText = 'View Profile'
    //profileLink.href = `${user.url}/repos`
    profileLink.addEventListener('click', reposProfile)
    //repoLi.href = user.repos_url
    if(user.login === input){
    document.getElementById('user-list').appendChild(li_User)
    document.getElementById('user-list').appendChild(image)
    document.getElementById('user-list').appendChild(profileLink)
    //reposList(user)
    //repoLi.addEventListener('click', console.log('click'))
    }
}

//document.querySelector('form').addEventListener('submit', handleSubmit)


function reposList(user){
    return fetch(`https://api.github.com/users/${user.login}/repos`)
    .then(res=>res.json())
    .then(data=>data.forEach(repo=>{
        //console.log(repo.html_url)
        const li = document.createElement('li')
        li.innerText = repo.html_url
        document.getElementById('repos-list').appendChild(li)
    }))
}

