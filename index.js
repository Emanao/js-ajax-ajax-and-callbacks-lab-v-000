function searchRepositories() {
    $(document).ready(function() {
        const q = $('#searchTerms').val();
        console.log(q);
        $.get(`https://api.github.com/search/repositories?q=${q}`)
        .done(showRepositories)
        .fail(error => { displayError() });
    });
}

function showRepositories(data){
  const src = $('#repository-template').text();
  const template = Handlebars.compile(src);
  const repoList = template(data.items);
  $("#results").html(repoList);
}

function getCommits(el) {
    const owner = el.dataset.owner;
    const repo = el.dataset.repository;
    console.log(`owner:${owner} repo:${repo}`)
    $(document).ready(function() {
      $.get(`https://api.github.com/repos/${owner}/${repo}/commits`)
      .done(showCommits)
      .fail(error => { displayError() });
    });
}

function showCommits(data){
  const src = $('#commit-template').text();
  const template = Handlebars.compile(src);
  const repoList = template(data);
  $("#details").html(repoList);
}

function displayError() {
    $("#errors").html("I'm sorry, there's been an error. Please try again.")
}
