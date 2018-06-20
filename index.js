function searchRepositories() {
    $(document).ready(function() {
        const q = $("#searchTerms").val();
        console.log(q);
        $.get(`https://api.github.com/search/repositories?q=${q}`, function(data) {
                $("#results").html(data.items.map(r => renderRepoData(r)));
            })
            .fail(displayError());
    });
}


function renderRepoData(repo) {
    return `
        <h4>Repository Info</h4>
        Name:${repo.name} </br>
        Description:${repo.description}</br>
        Url: <a href="#"> ${repo.html_url}</a>
        <h4>Owner Info</h4>
        Avatar: <img src="${repo.owner.avatar_url}"> </br>
        Name: ${repo.owner.login} </br>
        Url: <a href="#"> ${repo.owner.html_url}"</a> </br>
        <a href="#" data-owner="${repo.owner.login}" data-repo="${repo.name}" onclick="showCommits(this)">Show Commits</a>
        `
}

function showCommits(el) {
    const owner = el.dataset.owner;
    const repo = el.dataset.repo;
    $(document).ready(function() {
        $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function(data) {
                $("#details").html(data.map(c => renderCommitData(c)));
            })
            .fail(displayError());
    });
}

function renderCommitData(commits) {
    return `
    <p>SHA: ${commits.sha}</p>
    <p>Author: ${commits.author.login}</p>
    <p>Avatar: <img src="${commits.author.avatar_url}"></p>
    `
}

function displayError() {
    $("#errors").html("I'm sorry, there's been an error. Please try again.")
}