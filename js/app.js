//variables

const generalBtn = document.getElementById('general');
const businessBtn = document.getElementById('business');
const sportsBtn = document.getElementById('sport');
const technologyBtn = document.getElementById('technology');
const entertainmentBtn = document.getElementById('entertainment');
const searchBtn = document.getElementById('search');

const newsQuery = document.getElementById('news-query');
const newsType = document.getElementById('news-type');
const newsDetails = document.getElementById('news-details');

//Array

var newsDataArray = [];

//apis
const API_KEY = "681f7aa45634404b916d4f6d50b9a1fa";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=us&apiKey=";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=8&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload = function () {
    newsType.innerHTML = "<h4>Headlines</h4>";
    fetchHeadlines();
};

//for each btn will check event listener
generalBtn.addEventListener('click', function () {
    newsType.innerHTML = "<h4>General News</h4>";
    fetchGeneralNews();
})
businessBtn.addEventListener('click', function () {
    newsType.innerHTML = "<h4>Business</h4>";
    fetchBusinessNews();
})
sportsBtn.addEventListener('click', function () {
    newsType.innerHTML = "<h4>Sports</h4>";
    fetchSportsNews();
})
technologyBtn.addEventListener('click', function () {
    newsType.innerHTML = "<h4>Technology</h4>";
    fetchTechnologyNews();
})
entertainmentBtn.addEventListener('click', function () {
    newsType.innerHTML = "<h4>Entertainment</h4>";
    fetchEntertainmentNews();
})

searchBtn.addEventListener('click', function () {
    newsType.innerHTML = "<h4>Search : " + newsQuery.value + "</h4>";
    fetchQueryNews();
})

const fetchHeadlines = async () => {
    const response = await fetch(HEADLINES_NEWS + API_KEY)
    newsDataArray = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        console.log(myJson);
        newsDataArray = myJson.articles;
    }
    else {
        console.log(response.status, response.statusText)
    }

    displayNews();
}
const fetchGeneralNews = async () => {
    const response = await fetch(GENERAL_NEWS + API_KEY)
    newsDataArray = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        console.log(myJson);
        newsDataArray = myJson.articles;
    }
    else {
        console.log(response.status, response.statusText)
    }

    displayNews();
}

const fetchBusinessNews = async () => {
    const response = await fetch(BUSINESS_NEWS + API_KEY)
    newsDataArray = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArray = myJson.articles
    }
    else {
        console.log(response.status, response.statusText)
    }

    displayNews();
}

const fetchSportsNews = async () => {
    const response = await fetch(SPORTS_NEWS + API_KEY)
    newsDataArray = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArray = myJson.articles
    }
    else {
        console.log(response.status, response.statusText)
    }

    displayNews();
}

const fetchTechnologyNews = async () => {
    const response = await fetch(TECHNOLOGY_NEWS + API_KEY)
    newsDataArray = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArray = myJson.articles;
    }
    else {
        console.log(response.status, response.statusText)
    }

    displayNews();
}

const fetchEntertainmentNews = async () => {
    const response = await fetch(ENTERTAINMENT_NEWS + API_KEY)
    newsDataArray = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArray = myJson.articles;
    }
    else {
        console.log(response.status, response.statusText)
    }

    displayNews();
}

const fetchQueryNews = async () => {

    if (newsQuery.value === null) {
        return;
    }
    const response = await fetch(SEARCH_NEWS + encodeURIComponent(newsQuery.value) + "&apiKeys=" + API_KEY)
    newsDataArray = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArray = myJson.articles;
    }
    else {
        console.log(response.status, response.statusText)
    }

    displayNews()
}

function displayNews() {
    newsDetails.innerHTML = '';
    // if (newsDataArray.length === 0) {
    //     newsDetails.innerHTML = "<h5>No data was found</h5>"
    //     return;
    // }

    newsDataArray.forEach(news => {

        const date = news.publishedAt.split('T')
        const col = document.createElement('div');
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

        const card = document.createElement('div')
        card.className = "p-2";

        const img = document.createElement('img');
        img.setAttribute("height", "matchparnt");
        img.setAttribute("width", "100%");
        img.src = news.urlToImage;

        const cardBody = document.createElement('div');

        const newsHeading = document.createElement('h5');
        newsHeading.className = 'card-title';
        newsHeading.innerHTML = news.title;

        const dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        const description = document.createElement('p');
        description.className = 'text-muted';
        description.innerHTML = news.description;

        const link = document.createElement('a');
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url
        link.innerHTML = "Read more"

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link)

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsDetails.appendChild(col)
    });
}