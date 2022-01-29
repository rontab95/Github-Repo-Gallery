//variables used in this project
const overView = document.querySelector(".overview");
const info = document.querySelector(".user-info");
const username = "rontab95";
const repoList = document.querySelector(".repo-list"); //<==repos list 
// where all the repo information appears 
const reposSection = document.querySelector(".repos");
// where the individual repo data will appear
const repoData = document.querySelector(".repo-data");
viewRepoButton = document.querySelector(".view-repos")
//filter-repos class
filterRepos = document.querySelector(".filter-repos");

//API function to fetch API JSON Data
const getRepos = async function () {
    const userRequest = await fetch(`https://api.github.com/users/${username}`);
    const jsonData = await userRequest.json();
    userInfo(jsonData);
};
// Callback to function 
getRepos();
//Function to append data to the html 
const userInfo = function (jsonData) {

    let div = document.createElement("div");
    div.classList.add("user-info"); //<==add user-info class
    div.innerHTML = //<==5 placeholders
        `<figure>
      <img alt="user avatar" src=${jsonData.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${jsonData.name}</p>
      <p><strong>Bio:</strong> ${jsonData.bio}</p>
      <p><strong>Location:</strong> ${jsonData.location}</p>
      <p><strong>Number of public repos:</strong> ${jsonData.public_repos}</p>
    </div>`;
    //Append the data 
    overView.append(div);
    // console.log(jsonData);
};

//Function to fetch user the repo data for the UL li
const fetchRepos = async function () {
    const userRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await userRequest.json();
    // console.log(repoData);
    //Function callback to disp the repo list
    dispRepoInfo(repoData);
    filterRepos.classList.remove("hide");
};
//Callback to function to fetch the repo data
fetchRepos();
//Display list items of the UL
const dispRepoInfo = function (repoData) {
    repoList.classList.remove("hide");
    for (let title of repoData) {
        let repoLists = document.createElement("li"); //<==create list item
        repoLists.classList.add("filter-repos");
        repoLists.innerHTML = `<h3>${title.name}</h3>`
        repoList.append(repoLists);
    }
};

// Event listener for the unordered list
repoList.addEventListener("click", function (e) {
    e.preventDefault();
    // check if the h3 was clicked
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        // console.log(repoName); //<==test log the clicked li
        getSpecificRepo(repoName); //<==callback to get repo info
    }
});
//  function to get specific repo information
const getSpecificRepo = async function (repoName) {
    const repoRequest = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repoRequest.json();
    //fetch data from language_url property
    const fetchLanguages = await fetch(
        repoInfo.languages_url //<==fetch from the repo the language info
    );
    // save the JSON response
    const languageData = await fetchLanguages.json();
    // console.log(repoInfo); //<==test log

    //Declare an empty array that will push the data from 
    //languageData into the array
    const repoLanguages = [];
    for (let elements in languageData) {
        repoLanguages.push(elements);
        // console.log(repoLanguages); //<<==test log the array
    }
    // console.log(languageData);
    dispSpecificRepoInfo(repoInfo, repoLanguages);
};
// function to get specific repo information
const dispSpecificRepoInfo = function (repoInfo, languages) {
    // empty the HTML of the section with a class of “repo-data”
    repoData.innerHTML = "";
    //create a div to append the innerHTML
    const infoRepodiv = document.createElement("div");
    repoData.innerHTML =
        `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    
    repoData.append(infoRepodiv);
    // console.log(repoData.innerHTML);

     repoList.classList.add("hide");
     repoData.classList.remove("hide");
     filterRepos.classList.add("hide");
     viewRepoButton.classList.remove("hide");
};

viewRepoButton.addEventListener("click",function(){

    repoList.classList.remove("hide");
    repoData.classList.add("hide");
    filterRepos.classList.remove("hide");
    viewRepoButton.classList.add("hide");



});