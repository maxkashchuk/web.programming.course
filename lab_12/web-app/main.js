/* Fetch users from GitHub API */
async function getUsers() {
    const USERS_URL = 'https://api.github.com/users'; // REST API

    try {
        let res = await fetch(USERS_URL);

        return res.json();
    } catch(error) {
        console.error(error);
    }
}
/* Fetch user by login field from GitHub API */
async function getUserById(login) {
    const USER_URL = `https://api.github.com/users/${login}`; // REST API

    try {
        let res = await fetch(USER_URL);

        return res.json();
    } catch(error) {
        console.error(error);
    }
}

async function getUserRepos(url) {
    const USER_URL = url; // REST API

    try {
        let res = await fetch(USER_URL);

        return res.json();
    } catch(error) {
        console.error(error);
    }
}

async function findUser() {
    const input = document.getElementById('serachUsers');
    // console.log(input.value);
    let users = await getUsers();
    users = users.filter(user => {return user.login.includes(input.value)});
    let html = '';

    users.forEach(user => {
        let htmlSegment = `
            <div class="user" data-login="${user.login}">
                <img src="${user.avatar_url}" data-login="${user.login}">
                <h2>${user.login}</h2>
            </div>
        `;

        html += htmlSegment;
    });

    const list = document.getElementById('users-list');
    list.innerHTML = html;
}

/* async opearation - element rendering */
async function renderUsers() {
    let users = await getUsers();
    let html = '';

    users.forEach(user => {
        let htmlSegment = `
            <div class="user" data-login="${user.login}">
                <img src="${user.avatar_url}" data-login="${user.login}">
                <h2>${user.login}</h2>
            </div>
        `;

        html += htmlSegment;
    });

    const list = document.getElementById('users-list');
    list.innerHTML = html;
}

async function showPopup() {
    const list = document.getElementById('users-list');
    const popup = document.getElementById('popup-wrapper');
    const popupCloseBtn = document.querySelector('#popup-close');
    const popupContent = document.querySelector('#popup-content');

    list.onclick = async ({ target }) => {
        if (target.dataset.login == undefined) {
            return;
        }

        const user = await getUserById(target.dataset.login);

        const html = `
            <img src="${user.avatar_url}">
            <div>
                <h2>${user.login}</h2>
                <p>name: <b>${user.name}</b></p>
                <p>company: <b>${user.company ? user.company : '-'}</b></p>
                <p>location: <b>${user.location ? user.location : '-'}</b></p>
                <p>blog: <a href="${user.blog}" target="_blank">${user.blog}</a></p>
                <p>repository: <a href="${user.html_url}" target="_blank">${user.html_url}</a></p>
                <button onclick="renderMoreDatails('${user.repos_url}')">View details</button>
                <div id="renderDetails"></div>
            </div>        
        `;

        popupContent.innerHTML = html;

        // make popup visible
        popup.style.top = 0;

        popupCloseBtn.addEventListener('click', () => {
            popup.style.top = '-100%';
        });
    }
}

async function renderMoreDatails(user_url)
{
    const repos = await getUserRepos(user_url);
    const renderDetails = document.querySelector('#renderDetails');
    let html = '';
    repos.forEach(repo => {
        let htmlSegment = `
            <div class="repo">
                <a style="display: inline-block" href="${repo.html_url}">${repo.name}</a>
                <p style="display: inline-block"> / </p>
            </div>
        `;

        html += htmlSegment;
    });
    renderDetails.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
    renderUsers();
    showPopup();
}, false);
