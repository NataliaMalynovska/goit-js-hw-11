import '../css/styles.css';
import { createPhotoCards } from './createPhotoCards';
import { fetchPhotos } from './fetchPhotos';

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

function onSearchForm (event) {
    event.preventDefault();
    photoQuery = searchForm.elements.searchQuery.value;
    console.log(photoQuery);
    resetPage (); 
    
    if (photoQuery === '') {
      Notify.failure("Please, enter a query");
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
    if (photos.totalHits < 40) {
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
        .then(( photos ) => {   page +=1;console.log(page);
        photoGallery.insertAdjacentHTML('beforeend', createPhotoCards(photos));
        lightbox.refresh();      
        const totalPages = Math.ceil(photos.totalHits / per_page);
      if (page === totalPages) {
        notVisibleBtn();
    }})
        .catch(error => console.log(error));   
    }

    const resetPage = () => {
      photoGallery.innerHTML = "";
      page = 1; 
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
   
  
    