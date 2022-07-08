 export const createPhotoCards = photos => {
    return photos.hits.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => {
         return `<a href=${largeImageURL}><div class="photo-card">
        <img src=${webformatURL} alt=${tags} loading="lazy" />
        <div class="info">
          <p class="info-item">{webformatURL,largeImageURL, tags, likes, views, comments, downloads}
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item"><b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
      </div></a>`
      })
      .join('');
  };
