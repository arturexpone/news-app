class News {
    proxyURL = 'https://cors-anywhere.herokuapp.com/';

    constructor(key, url) {
        this.apiKey = key;
        this.apiUrl = url;
    }

    topHeadlines(country = 'ru', callback) {
        const result = http.get(
            `${this.proxyURL + this.apiUrl}/top-headlines?country=${country}&apiKey=${this.apiKey}`
        );
        result.then(callback);
    }

    everything(query = '', callback) {
        const result = http.get(
            `${this.proxyURL + this.apiUrl}/everything?q=${query}&apiKey=${this.apiKey}`
        );
        result.then(callback);
    }

    loadNews() {
        this.topHeadlines('ru', this.onGetResponse);
    }

    onGetResponse = (res) => {
        const articles = res.articles;
        console.log(this)
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
        const newsContainer = document.querySelector('.news-container .row');
        let fragment = '';

        news.forEach(newsItem => {
            const el = this.newsTemplate(newsItem);
            fragment += el;
        });

        newsContainer.insertAdjacentHTML('afterbegin', fragment);
    }
}

const http = {
    get: async (url, query) => {
        let result;
        try {
            const response = await fetch(`${url + (query ? `?${query}`: '')}`, {
                method: 'GET',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-Type, x-requested-with',
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
