// api
const API = 'https://randomuser.me/api/?results=9'

// For leader
const overlay = document.getElementById('overlay')

//Toggle loader

const loaderToggle = (toggle) => {
    if (toggle) {
        overlay.classList.remove("hidden");
    } else {
        overlay.classList.add("hidden");
    }
}

//Request promise

const getDate = (resource) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener("readystatechange", () => {
            if (request.readyState < 4) {
                loaderToggle(true)
            } else if (request.readyState === 4 && request.status == 200) {
                const data = JSON.parse(request.responseText);
                resolve(data.results);
                loaderToggle(false);
            } else if (request.request == 4) {
                reject("Error !!!");
                loaderToggle(false);
            }
        })

        request.open("GET", resource);
        request.send();
    })
}

getDate(API);

//Load

const reload = () => {
    getDate(API)
        .then((data) => {
            updateUI(data);
        }).catch((error) => {
            console.log(error);
        })
}

document.addEventListener("DOMContentLoaded",reload);