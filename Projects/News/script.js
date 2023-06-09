const API_KEY="e447b5d7091c42168253a26f070e9083";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));

// https://newsapi.org/v2/everything?q=  tesla&from=2023-05-09&sortBy=publishedAt 
                                    // &apiKey=e447b5d7091c42168253a26f070e9083
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data =  await res.json();
    bindData(data.articles);
}

function reload(){
    window.location.reload();
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCartTemplate = document.getElementById("template-news-card");

    // it clear all the cards
    cardsContainer.innerHTML="";

    articles.forEach((article) => {
        if(!article.urlToImage) return;

        const cardClone = newsCartTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}


let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);  
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton  = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click",() =>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);

    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})