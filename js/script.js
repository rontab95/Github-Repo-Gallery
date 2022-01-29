//variables used in this project
const divOverview = document.querySelector(".overview");
const info = document.querySelector(".user-info");
const username = "rontab95";
const dispRepoList = document.querySelector(".repo-list"); //<==repos list 
const reposSection = document.querySelector("repos");
const repoData = document.querySelector("repo-data");

//API function to fetch my GitHub data
const getGit = async function () {
    const userRequest = await fetch(`https://api.github.com/users/${username}`);
    const data = await userRequest.json();
    userInfo(data);
};
// Callback to function 
getGit();
//Function to append data to the html 
const userInfo = function (json) {

    let div = document.createElement("div");
    div.classList.add("user-info");

    div.innerHTML =
        `<figure>
      <img alt="user avatar" src=${json.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${json.name}</p>
      <p><strong>Bio:</strong> ${json.bio}</p>
      <p><strong>Location:</strong> ${json.location}</p>
      <p><strong>Number of public repos:</strong> ${json.public_repos}</p>
    </div>`;
    //Append the data 
    divOverview.append(div);
    console.log(json);
};

//Function to fetch user repo data
const fetchRepos = async function () {
    const userRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await userRequest.json();

    console.log(repoData);
    //Function callback to disp the repo list
    dispRepoData(repoData);
};
//Callback to function to fetch the repo data
fetchRepos();

const dispRepoData = function (repo) {
    dispRepoList.classList.remove("hide");
    for (let title of repo) {
        let repoLists = document.createElement("li");
        repoLists.classList.add("filter-repos");
        repoLists.innerHTML = `<h3>${title.name}</h3>`
        dispRepoList.append(repoLists);
    }

};

// Event listener for unordered list

dispRepoList.addEventListener("click", function (e) {
    e.preventDefault();
    // 
    if (e.target.matches("h3")) {

        //   console.log(e.target.innerText);
        const repo = e.target.innerText;
        getSpecificRepo(repo);

    }
});

const getSpecificRepo = async function (repo) {

    const userRequest = await fetch(`https://api.github.com/repos/${username}/${repo}`);
    const repoInfo = await userRequest.json();

    const fetchLanguages = await fetch(

        repoInfo.languages_url//<==fetch from the repo the language info
    );

    //Test log
    console.log(fetchLanguages.url);

    const languageData = await fetchLanguages.json();

//Declare an empty array push the data from languageData into it
    const repoLanguages = [];
    for (let elements in languageData){
        repoLanguages.push(elements);
        console.log(repoLanguages);
        
    }

    // console.log(languageData);
    dispSpecificRepoInfo(repoInfo, fetchLanguages);

    
};





const dispSpecificRepoInfo = function (repoData, languages) {

    repoData.innerHTML = "";
    const div = document.createElement("div");
   
    
};

