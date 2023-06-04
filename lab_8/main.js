/* Fetch users from GitHub API */
async function getRepos() {
    const REPOS_URL = 'https://api.github.com/users/mojombo/repos'; // REST API

    try {
        let res = await fetch(REPOS_URL);

        return res.json();
    } catch(error) {
        console.error(error);
    }
}

/* async opearation - element rendering */
async function renderRepos() {
    let repos = await getRepos();
    let html = '';

    repos.forEach(repo => {
        let htmlSegment = `
            <div onclick="goToRepo('${repo.html_url}')" class="user">
                <img src="${repo.owner.avatar_url}">
                <h2>${repo.owner.login}</h2>
                <h2>Repository name: ${repo.name}</h2>
            </div>
        `;

        html += htmlSegment;
    });

    const list = document.getElementById('users-list');
    list.innerHTML = html;
}

function goToRepo(url)
{
    window.location.href = url;
}

document.addEventListener('DOMContentLoaded', function() {
    renderRepos();
}, false);