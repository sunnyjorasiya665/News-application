const API_KEY = "9d6006fa130840a09098bea861c72464";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load" , () => fetchNews("India"));

async function fetchNews(query) {
    const response = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    console.log(data);

    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage)  return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US");
    timeZone : "Asia/Kolkata";  //Time Zone for India is Asia/Kolkata

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click" ,() =>{
        window.open(article.url, " ")
    })
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

function onNavItemClick(id){
    fetchNews(id);
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query =searchText.value;
    if(!query)
        return;


    fetchNews(query);
    
});

function reload(){
    window.location.reload();
}

