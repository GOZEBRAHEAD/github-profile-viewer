// =========================== //// =========================== //
const API_URL = "https://api.github.com/users";

const card = document.getElementById("content-card");
const userInput = document.getElementById("user-input");
const btnSearch = document.getElementById("btn-search");

const COLOR_COMBINATIONS = [
    ["#c31432", "#240b36"],
    ["#DA4453", "#89216B"],
    ["#2193b0", "#6dd5ed"],
    ["#000046", "#1CB5E0"],
    ["#f46b45", "#eea849"],
    ["#C04848", "#480048"]
];

let firstSearch = true;

// =========================== //// =========================== //
const getRandomNum = () => Math.floor(Math.random() * (6 - 1)) + 1;

const loadAPI = () => {

    let textFromInput = userInput.value;

    userInput.value = "";

    if (textFromInput.length === 0) {
        alert("Please, write a valid GitHub user.");
        return;
    }

    fetch(`${API_URL}/${textFromInput}`)
        .then(response => response.json())
        .then(createCard);
};

const createCard = (dataFromAPI) => {

    if (dataFromAPI["message"] !== undefined) {
        alert("User not found, try again.");
        return;
    }

    if (!firstSearch) {
        card.innerHTML = "";
    }
    else {
        firstSearch = false;
    }

    const newCard = document.createElement("section");

    newCard.classList.add("index__layout__content__card");

    newCard.innerHTML = `
        <div class="card__background__form"></div>

        <div class="index__layout__content__card__avatar">
            <img src="${dataFromAPI.avatar_url}" alt="GitHub avatar picture" />
        </div>

        <div class="index__layout__content__card__user">${dataFromAPI.login}</div>

        <div class="index__layout__content__card__subtitle">
            <div class="index__layout__content__card__subtitle__bio">${dataFromAPI.bio}</div>

            <div class="index__layout__content__card__subtitle__location"><i class="fas fa-map-marker-alt"></i>${dataFromAPI.location}</div>
        </div>

        <div class="index__layout__content__card__socials">
            <p><span>${dataFromAPI.followers}</span> followers</p>
            <p><span>${dataFromAPI.following}</span> following</p>
        </div>

        <div class="index__layout__content__card__repos">Public repositories: <span>${dataFromAPI.public_repos}</span></div>

        <a class="index__layout__content__card__profile" href="${dataFromAPI.html_url}" target="_blank">View GitHub profile</a>
    `;

    card.appendChild(newCard);

    let randomNum = getRandomNum();

    newCard.style.background = 
            `linear-gradient(180deg, 
                ${COLOR_COMBINATIONS[randomNum][0]} 0%, 
                ${COLOR_COMBINATIONS[randomNum][1]} 17%, 
                #172144 20%)`;
};

window.onload = () => {

    btnSearch.addEventListener("click", loadAPI);

    userInput.addEventListener("keyup", event => {
        
        if (event.key !== "Enter") {
            return;
        }
            
        event.preventDefault();
        btnSearch.click();
    });
};