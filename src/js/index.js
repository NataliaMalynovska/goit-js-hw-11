import '../css/styles.css';
import { createPhotoCards } from './createPhotoCards';
// import { fetchPhotos } from './fetchPhotos';
// export let page = 1;
// export const per_page = 40;

import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const photoGallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
let lightbox= new SimpleLightbox('.gallery a', { captionDelay: "250"}); 

let photoQuery = '';
let page = 1;
const per_page = 40;

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn );

async function fetchPhotos(photoQuery) {
 
  axios.defaults.baseURL = `https://pixabay.com/api/`;
  const API_KEY = '28408201-ae115705a469d69343f5b3399';
  const searchParams = new URLSearchParams({
      key: API_KEY,
      q: photoQuery,
      image_type:  'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page,
  });
  const response = await axios.get(`/?${searchParams}`, ); 
  page +=1;
    return  response.data;
  
 };
function onSearchForm (event) {
    event.preventDefault();
    photoQuery = searchForm.elements.searchQuery.value;
    resetPage (); 
    
    if (photoQuery === '') {
      notQuery();
      notVisibleBtn();
      return
    }
    
  fetchPhotos(photoQuery)
    .then( photos => {
    if (photos.totalHits === 0) {
      notFound();
      notVisibleBtn();
      return
    } 
    else {
      visibleBtn();
      photoGallery.innerHTML = createPhotoCards(photos);
      lightbox.refresh();
      Notify.info(`Hooray! We found ${photos.totalHits} images.`);
    }
    if (photos.totalHits < per_page) {
      notVisibleBtn(); 
    }
  })
    .catch(error => console.log(error))
    .finally(() => {
      searchForm.reset();
  })
  };

  function onLoadMoreBtn () {
      fetchPhotos(photoQuery)
        .then(( photos ) => {   
          photoGallery.insertAdjacentHTML('beforeend', createPhotoCards(photos));
        lightbox.refresh();      
        const totalPages = Math.ceil(photos.totalHits / per_page);
      if (page > totalPages) {
        notVisibleBtn();
    }})
        .catch(error => console.log(error));   
    }

    const resetPage = () => {
      photoGallery.innerHTML = "";
      page = 1; 
    };
    const notQuery = () => {
      Notify.failure("Please, enter a query");
    };
    const notFound = () => {
      Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    };
    const visibleBtn = () => {
      loadMoreBtn.classList.add('is-visible'); 
    };
    const notVisibleBtn = () => {
      loadMoreBtn.classList.remove('is-visible');
    };
   
  
    