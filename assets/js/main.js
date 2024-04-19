//init
const body=document.querySelector('body');
const main=document.querySelector('main');
const display=document.querySelector('#display');
const cover=document.querySelector('#cover');
const back=document.querySelector('#back');
const title=document.querySelector('#title');
const description=document.querySelector('#description');
const musicians=document.querySelector('#musicians');
const close=document.querySelector('#close');

//data
async function fetchJSON() {
    const response = await fetch("../data.json");
    const data = await response.json();
    return data;
}

fetchJSON().then(data => {
    createCards(data);
});

//create cards
function createCards(data) {
    main.innerHTML='';

    for(let i=0; i<data.length; i++) {
        const container=createDiv('article',main);
        //name
        createDiv('h2',container,data[i].name);

        //cover
        const img=createDiv('img',container);
        img.src=data[i].cover;
        img.alt="album cover";

        img.addEventListener("click", (event) => {
            cardClick(data[i]);
        });

        //year
        createDiv('p',container,data[i].year);
    }
}

//card click
function cardClick(data) {
    display.style.display='flex';
    display.classList.remove('fadeOut');
    display.classList.add('fadeIn');

    main.classList.remove('blurOut');
    main.classList.add('blurIn');

    cover.style.backgroundImage='url('+data.cover+')';
    back.style.backgroundImage='url('+data.back+')';

    title.innerHTML=data.name+' ('+data.year+')';
    description.innerHTML=data.description;
    musicians.innerHTML='Artists: '+data.artists;
}

//card close
close.addEventListener("click", (event) => {
    display.classList.remove('fadeIn');
    display.classList.add('fadeOut');

    main.classList.remove('blurIn');
    main.classList.add('blurOut');

    closeCard();
});

async function closeCard() {
    await sleep(300);
    display.style.display='none';
}

//sort cards
function sortCards() {
    const order = document.querySelector('#sort').value;

    fetchJSON().then(data => {
        if (order === 'name') {
            data.sort((a, b) => a.name.localeCompare(b.name));
        } else if (order === 'year') {
            data.sort((a, b) => parseInt(a.year) - parseInt(b.year));
        }
        createCards(data);
    });
}


//preload back cover

let imagesToPreload = [];

fetchJSON().then(data => {
    data.forEach(element => {
        imagesToPreload.push(element.back);
    });
    preloadImages(imagesToPreload);
});

function preloadImages(urls) {
    let imagePromises = [];
    for (var i = 0; i < urls.length; i++) {
        const img = new Image();
        img.src = urls[i];
        const promise = new Promise(function(resolve, reject) {
            img.onload = function() {
                resolve();
            };
            img.onerror = function() {
                reject();
            };
        });
        imagePromises.push(promise);
    }
    return Promise.all(imagePromises);
}
