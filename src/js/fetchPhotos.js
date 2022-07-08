import axios from 'axios';
import { page, per_page }  from './index';

export async function fetchPhotos(photoQuery) {
 
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
    console.log( page);
    return  response.data;
  
 }; 




// import axios from 'axios';
// axios.defaults.baseURL = `https://pixabay.com/api/`;
//   const API_KEY = '28408201-ae115705a469d69343f5b3399';
// export   async function fetchPhotos(photoQuery, page, perPage) {
//    const response = await axios.get( `/?key=${API_KEY}&q=${photoQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`); 
//   return  response.data;
//  }; 

