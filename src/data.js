export function loginuser(userData) {
    let BaseURL = 'http://localhost/kapook-php/api/login.php';
    return new Promise((resolve, reject) => {

        fetch(BaseURL,
            {

                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then((response) => response.json()
                .then((res) => {
                    resolve(res);
                }))
            .catch((error) => {
                reject(error);
            });
            console.log("login");
    });
}
export function signupuser(userData) {
    let BaseURL = 'http://localhost/kapook-php/api/signup.php';
    return new Promise((resolve, reject) => {

        fetch(BaseURL,
            {

                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then((response) => response.json()
                .then((res) => {
                    resolve(res);
                }))
            .catch((error) => {
                reject(error);
            });
            console.log("regis");
    });
}

export function feed(userData) {
    let BaseURL = 'http://localhost/kapook-php/api/feedincome.php';
    return new Promise((resolve, reject) => {

        fetch(BaseURL,
            {

                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then((response) => response.json()
                .then((res) => {
                    resolve(res);
                }))
            .catch((error) => {
                reject(error);
            });
            console.log("feedin");
    });
}

export function feedex(userData) {
    let BaseURL = 'http://localhost/kapook-php/api/feedexpense.php';
    return new Promise((resolve, reject) => {

        fetch(BaseURL,
            {

                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then((response) => response.json()
                .then((res) => {
                    resolve(res);
                }))
            .catch((error) => {
                reject(error);
            });
            console.log("feedex");
    });
}

export function totalin(userData) {
    let BaseURL = 'http://localhost/kapook-php/api/totalin.php';
    return new Promise((resolve, reject) => {

        fetch(BaseURL,
            {

                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then((response) => response.json()
                .then((res) => {
                    resolve(res);
                }))
            .catch((error) => {
                reject(error);
            });
            console.log("totalin");
    });
}

export function totalex(userData) {
    let BaseURL = 'http://localhost/kapook-php/api/totalex.php';
    return new Promise((resolve, reject) => {

        fetch(BaseURL,
            {

                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then((response) => response.json()
                .then((res) => {
                    resolve(res);
                }))
            .catch((error) => {
                reject(error);
            });
            console.log("totalex");
    });
}

export function profile(userData) {
    let BaseURL = 'http://localhost/kapook-php/api/update.php';
    return new Promise((resolve, reject) => {

        fetch(BaseURL,
            {

                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then((response) => response.json()
                .then((res) => {
                    resolve(res);
                }))
            .catch((error) => {
                reject(error);
            });
            console.log("totalex");
    });
}

export function email(userData) {
    let BaseURL = 'http://localhost/kapook-php/api/email.php';
    return new Promise((resolve, reject) => {

        fetch(BaseURL,
            {

                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then((response) => response.json()
                .then((res) => {
                    resolve(res);
                }))
            .catch((error) => {
                reject(error);
            });
            console.log("totalex");
    });
}




