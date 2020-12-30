// init selects materialize
document.addEventListener('DOMContentLoaded',  e => {
    M.AutoInit();
});

const http = {
    get: async (url, query) => {
        let result;
        try {
            const response = await fetch(`${url + (query ? `?${query}`: '')}`);
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

const newsService = (function () {
    const apikey = '85540e429d6746bcbafad77a05c7adff';
    const apiUrl = 'http://newsapi.org/v2';

    return {
        topHeadlines(country = 'ru', callback) {
            const result = http.get(`${apiUrl}`, 'country=ru&language=ru');
            result.then(callback);
        },
        everything(query = '', callback) {},
    }
})();

newsService.topHeadlines('', res => {
    console.log(res);
});


