import axios from 'axios';

export   async function fetchPhotos(photoQuery) {
  axios.defaults.baseURL = `https://pixabay.com/api/`;
  const API_KEY = '28408201-ae115705a469d69343f5b3399';
  page = 1;
  per_page = 40;
  const searchParams = new URLSearchParams({
      key: API_KEY,
      q: photoQuery,
      image_type:  'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page,
  }); 
  page +=1;
  const response = await axios.get(`/?${searchParams}`); 
  return  response.data;
 }; 

