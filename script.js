const API_KEY = "9d6006fa130840a09098bea861c72464";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => {
    fetchNews("India");
});

async function fetchNews(query) {
    // Fetch news data from API
    try {
        const response = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        bindData(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const cardClone = document.importNode(newsCardTemplate.content, true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;

    fetchNews(query);
});

function reload() {
    window.location.reload();
}
