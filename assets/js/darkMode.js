//dark mode

function darkMode() {
    const toggleSwitch=document.querySelector('.checkbox');
    const articles=document.querySelectorAll('article');
    const path=document.querySelector('path');

    if(toggleSwitch.checked) {
        //light
        document.body.style.color='black';
        document.body.style.backgroundColor='white';

        articles.forEach(article => {
            article.style.color='rgb(34, 29, 29)';
            article.style.backgroundColor='rgb(192, 192, 192)';
        });

        display.style.color='black';
        display.style.backgroundColor='white';

        path.fill="#ffffff";


    } else {
        //dark
        document.body.style.color='white';
        document.body.style.backgroundColor='black';

        articles.forEach(article => {
            article.style.color='rgb(192, 192, 192)';
            article.style.backgroundColor='rgb(34, 29, 29)';
        });

        display.style.color='white';
        display.style.backgroundColor='black';

        path.fill="#000000";
    }
}