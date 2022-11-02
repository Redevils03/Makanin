/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
import FavRestIdb from '../../data/favorite-resto-idb';
import FavoriteRestaurantSearchView from './favorited-restaurant/favorite-restaurant-search-view';
import { skeletonRestaurantTemplate } from '../templates/content-template';

const view = new FavoriteRestaurantSearchView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    try {
      const restaurants = await FavRestIdb.getAllRestaurants();
      const searchContainer = document.getElementById('query');

      if (restaurants < 1) {
        document.getElementById('content').style.display = 'block';
        document.getElementById('query').style.marginLeft = '0';
        view.showFavoriteRestaurants(restaurants);
      } else {
        document.getElementById('content').style.display = 'grid';
        document.getElementById('query').style.marginLeft = '15px';
        skeletonRestaurantTemplate(view, restaurants);
      }

      searchContainer.addEventListener('keyup', () => {
        console.log(searchContainer);
        // eslint-disable-next-line max-len
        const searchResult = restaurants.filter((restaurant) => (restaurant.name).includes(searchContainer.value));

        if (searchResult < 1) {
          document.getElementById('content').style.display = 'block';
          document.getElementById('query').style.marginLeft = '0';
          view.showFavoriteRestaurants(searchResult);
        } else {
          document.getElementById('content').style.display = 'grid';
          document.getElementById('query').style.marginLeft = '15px';
          skeletonRestaurantTemplate(view, searchResult);
        }
      });
    } catch (error) {
      document.getElementById('favoriteHeader').innerHTML = `
      <h2 tabindex='0' style='padding: 100px 0 270px 0;'>Restaurant Data Cannot be Displayed, Check Your Connection or Reload The Page</h2>`;
    }
  },
};

export default Favorite;
