 export const createPhotoCards = photos => {
    return photos.hits.map( photo =>  `<div class="photo-card">
        <a href=${photo.largeImageURL}><img src=${photo.webformatURL} alt=${photo.tags} loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${photo.likes}</b>
          </p>
          <p class="info-item"><b>Views: ${photo.views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${photo.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${photo.downloads}</b>
          </p>
        </div>
      </div></a>`
      )
      .join('');
  };
