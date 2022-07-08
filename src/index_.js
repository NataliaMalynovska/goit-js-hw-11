
searchForm.addEventListener('submit', onSearch);
let photoQuery = '';
searchForm.addEventListener('submit', onSearch);
function onSearch(e) {
    e.preventDefault();
     photoQuery = searchForm.elements.searchQuery.value; 
    if (photoQuery === '') {
      return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    fetchPhotos(photoQuery)
        .then (response=> {photoList.innerHTML = renderResponse(response)})
        .catch (error => console.log(error))       
  }; 
let page = 1;
const per_page = 40;
function fetchPhotos(photoQuery) {
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
    return axios.get(`/?${searchParams}`).then(response => {
      if (response.ok) {
        page +=1;
        response.data.hits
      }}
      );
  };

function renderResponse(response) {   
    return response.map(() => `<div class="photo-card">
            <a href=${largeImageURL}><img src=${webformatURL} alt=${tags} loading="lazy" />
            <div class="info">
              <p class="info-item">{webformatURL,largeImageURL, tags, likes, views, comments, downloads}
                <b>Likes: ${likes}</b>
              </p>
              <p class="info-item">
                <b>Views: ${views}</b>
              </p>
              <p class="info-item">
                <b>Comments: ${comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads: ${downloads}</b>
              </p>
            </div>
          </div></a>`).join("")
    
  };
   let lightbox= new SimpleLightbox('.photo-card a', {captionsData: 'alt',  captionDelay: "250"}); 
  lightbox.refresh()  

