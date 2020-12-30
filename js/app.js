// init selects materialize
document.addEventListener('DOMContentLoaded',  e => {
    M.AutoInit();
});

class Service {
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

const newsService = new Service('85540e429d6746bcbafad77a05c7adff', 'https://newsapi.org/v2');

newsService.topHeadlines('ru', res => {
    console.log(res);
});


