//init
const body=document.querySelector('body');
const main=document.querySelector('main');
const display=document.querySelector('#display');
const cover=document.querySelector('#cover');
const back=document.querySelector('#back');
const title=document.querySelector('#title');
const description=document.querySelector('#description');
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
        const name=createDiv('h2',container,data[i].name);

        //cover
        const img=createDiv('img',container);
        img.src=data[i].cover;
        img.alt="album cover";

        img.addEventListener("click", (event) => {
            cardClick(data[i]);
        });

        //year
        const year=createDiv('p',container,data[i].year);
    }
}

//card click
function cardClick(data) {
    display.style.display='flex';
    main.style.filter='blur(5px)';

    cover.style.backgroundImage='url('+data.cover+')';
    back.style.backgroundImage='url('+data.back+')';

    title.innerHTML=data.name;
    description.innerHTML=data.description;
}

//card close
close.addEventListener("click", (event) => {
    display.style.display='none';
    main.style.filter='blur(0)';;
});

//sort cards
function sortCards() {
    const order = document.querySelector('#sort').value;

    fetchJSON().then(data => {
        sorting(order, data);
    });
}

function sorting(order, data) {
    if (order === 'name') {
        data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === 'year') {
        data.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    }
    createCards(data);
}