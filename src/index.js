// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
let searchForm = document.getElementById('search-form');
let ipText = document.getElementById('ipText');
let listRepo = document.getElementById('list-repo');
let loadMoreBtn = document.getElementById('load-more');
let ipTextValue;
let page = 1;

loadMoreBtn.addEventListener('click', () => {
    page++;
    ipTextValue = ipText.value;
    getData(page);
    appendData();
})
let getData = async (page) => {
    ipTextValue = ipText.value;
    let result = await fetch(`https://api.github.com/users/${ipTextValue}/repos?page=${page}`).then(data => data.json());
    
    return result;
}
let appendData = async () => {
    let result = await getData(page);
    for (let i = 0; i < result.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = result[i]['name'];
        listRepo.append(li);
    }
}
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    appendData();
    // ipText.value = '';
    loadMoreBtn.style.display = 'block';
})
