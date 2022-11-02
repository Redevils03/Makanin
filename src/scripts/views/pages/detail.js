/* eslint-disable linebreak-style */
import restaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';
// eslint-disable-next-line object-curly-newline
import { skeletonDetailTemplate, detailTemplate, menuTemplate, reviewTemplate } from '../templates/content-template';
import FavBtnInit from '../../utils/fav-btn-init';
import FavRestIdb from '../../data/favorite-resto-idb';

const Detail = {
  async render() {
    return `
      <div id='contentDetail'></div>
      <footer id="footer">
        <p>Copyright © 2022 - Makanin</p>
      </footer>
      `;
  },

  async afterRender() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await restaurantSource.detail(url.id);
      const restaurantContainer = document.getElementById('contentDetail');

      restaurantContainer.innerHTML = skeletonDetailTemplate();

      setTimeout(() => {
        document.getElementById('skeleton-box-detail').style.display = 'none';
        restaurantContainer.innerHTML = detailTemplate(restaurant.restaurant);

        const foodsContainer = document.getElementById('foods');
        foodsContainer.innerHTML = menuTemplate(restaurant.restaurant.menus.foods);

        const drinksContainer = document.getElementById('drinks');
        drinksContainer.innerHTML = menuTemplate(restaurant.restaurant.menus.drinks);

        const reviewsContainer = document.getElementById('reviews');
        reviewsContainer.innerHTML = reviewTemplate(restaurant.restaurant.customerReviews);

        FavBtnInit.init({
          favoriteContainer: document.querySelector('.favoriteButton'),
          favoriteRestaurants: FavRestIdb,
          restaurant: {
            id: restaurant.restaurant.id,
            name: restaurant.restaurant.name,
            pictureId: restaurant.restaurant.pictureId,
            rating: restaurant.restaurant.rating,
            address: restaurant.restaurant.address,
            city: restaurant.restaurant.city,
            description: restaurant.restaurant.description,
          },
        });
      }, 1000);
    } catch (error) {
      document.getElementById('contentDetail').innerHTML = `
      <h2 tabindex='0' style='padding: 100px 0 270px 0;'>Restaurant Data Cannot be Displayed, Check Your Connection or Reload The Page</h2>`;
    }
  },
};

export default Detail;
