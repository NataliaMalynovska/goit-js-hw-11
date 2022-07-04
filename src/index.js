import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';


// function fetc(name) {
//         return fetch(`https://pixabay.com/api/?key="+API_KEY+"&q="`) 
//         .then (response => {
//             if (!response.ok) {
//                 throw new Error(response.statusText);
//               }
//             return response.json();
//         })
//     };
const API_KEY = '28408201-ae115705a469d69343f5b3399';
const options = new URLSearchParams({
    key: API_KEY,
    q: 'cat',
    image_type:  'photo',
    orientation: 'horizontal',
    safesearch: true,
    // per_page: this.per_page,
    // page: this.page
});    

console.log(options.toString()); 

axios.get(`https://pixabay.com/api/${options}`).then(response => {console.log(response);
}).catch(error => Notify.failure("Sorry, there are no images matching your search query. Please try again."))

// const DEBOUNCE_DELAY = 300;
// const searchForm = document.querySelector('.search-form');
// const fotoList = document.querySelector('.gallery');
// searchForm.addEventListener('submit', debounce(onSearch, DEBOUNCE_DELAY));

// function onSearch(e) {
//     e.preventDefault();
//     let serchFormValue = e.target.value.trim();
// fetch(serchFormValue)
//     .then(name => {fotoList.innerHTML = renderResponse(name)})
//     .catch(error => {Notify.failure("Oops, there is no country with that name")     
//     })
// };
function renderResponse(name) {  
    if (name.length > 1 && name.length < 11  ) {
            return name.map(({ }) => `<li class="photo-card">
            <a href="images/image.jpg"><img src="" alt="" loading="lazy" /></a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
              </p>
              <p class="info-item">
                <b>Views</b>
              </p>
              <p class="info-item">
                <b>Comments</b>
              </p>
              <p class="info-item">
                <b>Downloads</b>
              </p>
            </div>
          </li>`)
        }
    else console.log(name.length)
        Notify.info("We're sorry, but you've reached the end of search results.");
        return " ";       
};

// export function fetc(name) {
//     return fetch(`https://pixabay.com/api/?key="+API_KEY+"&q="`) 
//     .then (response => {
//         if (!response.ok) {
//             throw new Error(response.statusText);
//           }
//         return response.json();
//     })
// };
// axios.get(`https://pixabay.com/api/`).then(response => {console.log(response);
// })

// const API_KEY = '28408201-ae115705a469d69343f5b3399';
// var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });
