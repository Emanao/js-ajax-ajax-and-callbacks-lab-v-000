function searchRepositories() {
    $(document).ready(function() {
        const q = $('#searchTerms').val();
        console.log(q);
        $.get(`https://api.github.com/search/repositories?q=${q}`)
        .done(showRepositories)
        .fail(error => { displayError() });;
        /*$.get(`https://api.github.com/search/repositories?q=${q}`, function(data) {
                $("#results").html(data.items.map(r => renderRepoData(r)));
            })
            .fail(error => { displayError() });*/
    });
}
function showRepositories(data){
  const src = $('#repository-template').text();
  const template = Handlebars.compile(src);
  const repoList = template(data.items);
  $("#results").html(repoList);
   //$("#results").html(data.items.map(r => renderRepoData(r)));
}
/*
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
        <a href="#" data-owner="${repo.owner.login}" data-repository="${repo.name}" onclick="showCommits(this)">Show Commits</a>
        `
}
*/
function showCommits(el) {
    const owner = el.dataset.owner;
    const repo = el.dataset.repository;
    $(document).ready(function() {
        $.get(`https://api.github.com/repos/${owner}/${repo}/commits`, function(data) {
                $("#details").html(data.map(c => renderCommitData(c)));
            })
            .fail(error => { displayError() });
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
