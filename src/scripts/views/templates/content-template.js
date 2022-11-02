/* eslint-disable linebreak-style */
import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const detailTemplate = (restaurant) => `
  <h2 tabindex='0' class='restaurant__title' id='detailHeader'>${restaurant.name}</h2>
  <div class='restImage'>
    <picture>
      <source media='(max-width: 600px)' srcset='${CONFIG.SMALL_IMAGE_URL + restaurant.pictureId}'>
      <img class='detailImg' src='${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}' alt='Restaurant Interior Preview'>
    </picture>
    <div class='favoriteButton'></div>
  </div>
  <div class='ratingCity'>
      <p class='rating' tabindex='0'>Rating&nbsp: &nbsp${restaurant.rating}&nbsp<i class='fa fa-star'></i></p>
      <p class='city' tabindex='0'>${restaurant.address},&nbsp${restaurant.city}</p>
  </div>
  <p tabindex='0'>${restaurant.description}</p>
  <div class='menus'>
    <div>
      <h3>Foods</h3>
      <ol id='foods'></ol>
    </div>
    <div>
      <h3>Drinks</h3>
      <ol id='drinks'></ol>
    </div>
  </div>
  <div class='customerReview'>
    <h3 tabindex='0'>Customer Reviews</h3>
    <div id='reviews'></div>
  </div>
`;

const restaurantTemplate = (restaurant) => `
  <article>
    <picture>
      <source media='(max-width: 600px)' srcset='${CONFIG.SMALL_IMAGE_URL + restaurant.pictureId}'>
      <img class='restaurantImg lazyload' data-src='${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}' alt='Restaurant Interior Preview'>
    </picture>
    <div class='detail'>
        <div class='ratingCity'>
            <p class='rating' tabindex='0'>Rating&nbsp: &nbsp${restaurant.rating || '-'}&nbsp<i class='fa fa-star'></i></p>
            <p class='city' tabindex='0'>${restaurant.city || '-'}</p>
        </div>
        <a class='restaurant__title' id='restName' href='#/detail/${restaurant.id}'>${restaurant.name || '-'}</a>
        <p tabindex='0' id='desc'>${restaurant.description || '-'}</p>
    </div>
  </article>
`;

const skeletonDetailTemplate = () => `
  <div class='skeleton' id='skeleton-box-detail'>
    <div class='skeleton-text-title-detail' id='detailHeader'></div>
    <div class='restImage'>
      <div class='skeleton-img-detail'></div>
    </div>
    <div class='ratingCity'>
        <p class='skeleton-text-rating rating'></p>
        <p class='skeleton-text-city city'></p>
    </div>
    <p class='skeleton-text-desc'></p>
    <p class='skeleton-text-desc'></p>
    <p class='skeleton-text-desc'></p>
    <p class='skeleton-text-desc'></p>
    <p class='skeleton-text-desc'></p>
    <p class='skeleton-text-desc'></p>
    <div class='customerReview'>
      <h3 class='skeleton-text-title'></h3>
      <div id='reviews'>
        <div class='skeleton-review'></div>
        <div class='skeleton-review'></div>
        <div class='skeleton-review'></div>
        <div class='skeleton-review'></div>
      </div>
    </div>
  </div>
`;

const skeletonRestaurantTemplate = (view, restaurants) => {
  // eslint-disable-next-line quotes
  let skeleton = ``;
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 6; i++) {
    skeleton += `
    <article>
      <div class='skeleton' id='skeleton-box'>
        <div class='skeleton-img'></div>
        <div class='detail'>
            <div class='ratingCity'>
                <p class='skeleton-text-rating rating'></p>
                <p class='skeleton-text-city city'></p>
            </div>
            <a class='skeleton-text-title'></a>
            <p class='skeleton-text-desc'></p>
            <p class='skeleton-text-desc'></p>
            <p class='skeleton-text-desc'></p>
        </div>
      </div>
    </article>
  `;
  }
  document.getElementById('content').innerHTML = skeleton;

  setTimeout(() => {
    view.showFavoriteRestaurants(restaurants);
  }, 1000);
};

const menuTemplate = (menus) => {
  let template = '';
  menus.forEach((menu) => {
    template += `<li tabindex='0'>${menu.name}</li>`;
  });

  return template;
};

const reviewTemplate = (reviews) => {
  let template = '';
  reviews.forEach((review) => {
    template += `
    <div class='reviewBox'>
      <p class='reviewNameDate' tabindex='0'>${review.name} - ${review.date}</p>
      <p class='reviewText' tabindex='0'>'${review.review}'</p>
    </div>
      `;
  });

  return template;
};

const FavoriteRestaurantButton = () => `
  <button type='button' aria-label='Make Restaurant As Favorite' id='favorite'>
    <i class='fa fa-heart-o fa-2x'></i>
  </button>
`;

const NoLongerFavoriteRestaurantButton = () => `
  <button type='button' aria-label='Make Restaurant No Longer a Favorite' id='favorite'>
    <i class='fa fa-heart fa-2x'></i>
  </button>
`;

export {
  restaurantTemplate,
  skeletonRestaurantTemplate,
  detailTemplate,
  skeletonDetailTemplate,
  menuTemplate,
  reviewTemplate,
  FavoriteRestaurantButton,
  NoLongerFavoriteRestaurantButton,
};
