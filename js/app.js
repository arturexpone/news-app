//DOM elements
const newsContainer = document.querySelector('.news-container .row');

class News {
    proxyURL = 'https://cors-anywhere.herokuapp.com/';

    constructor(key, url) {
        this.apiKey = key;
        this.apiUrl = url;
    }

    topHeadlines(country = 'ru', callback, query) {
        const result = http.get(
            `${this.proxyURL + this.apiUrl}/top-headlines?country=${country}${query ? '&category=' + query : ''}&apiKey=${this.apiKey}`
        );
        result.then(callback);
    }

    everything(query = '', callback) {
        const result = http.get(
            `${this.proxyURL + this.apiUrl}/everything?q=${query}&apiKey=${this.apiKey}`
        );
        result.then(callback);
    }

    loadNews(query = '') {
        this.topHeadlines('ru', this.onGetResponse, query);
    }

    onGetResponse = (res) => {
        const articles = res.articles;
        this.renderNews(articles);
    }

    newsTemplate(news) {
        const {urlToImage, title, url, description} = news;
        return `
        <div class="col s12">
            <div class="card">
                <div class="card-image">
                    <img src=${urlToImage} alt=${title}>
                    <span class="card-title">${title || ''}</span>
                </div>
                <div class="card-content">
                    <p>${description || ''}</p>
                </div>
                <div class="card-action">
                    <a href=${url}>Read more</a>
                </div>
            </div>
        </div>
        `;
    }

    renderNews(news) {
        let fragment = '';

        news.forEach(newsItem => {
            const el = this.newsTemplate(newsItem);
            fragment += el;
        });

        newsContainer.classList.add('b-show');

        newsContainer.innerHTML = fragment;

    }
}

const http = {
    get: async (url) => {
        let result;
        try {
            const response = await fetch(url);
            if (response.ok) {
                result = await response.json();
            } else {
                throw new Error(`Response error: ${response.status}`);
            }
        } catch (e) {
            console.log(e);
        }
        return await result;
    },
    post: async (url, body) => {
        let result;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                result = await response.json();
            } else {
                throw new Error(`Response error: ${response.status}`);
            }
        } catch (e) {
            console.log(e);
        }
        return await result;
    }
}

const newsService = new News('85540e429d6746bcbafad77a05c7adff', 'https://newsapi.org/v2');

// init selects materialize
document.addEventListener('DOMContentLoaded',  e => {
    M.AutoInit();
    newsService.loadNews();
});

document.getElementById('category').addEventListener('change', e => {
    const value = e.target.value;
    newsContainer.innerHTML = `<h1>Load...</h1>`;
    newsContainer.classList.remove('b-show');
    newsService.loadNews(value);
});
