/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
import restaurantSource from '../../data/restaurant-source';
import FavoriteRestaurantSearchView from './favorited-restaurant/favorite-restaurant-search-view';
import { skeletonRestaurantTemplate } from '../templates/content-template';

const Main = {
  async render() {
    return `    
      <h2 tabindex='0'>Explore Restaurant</h2>
      <div id='content'></div>
      <footer id="footer">
        <p>Copyright © 2022 - Makanin</p>
      </footer>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await restaurantSource.main();
      const view = new FavoriteRestaurantSearchView();

      skeletonRestaurantTemplate(view, restaurants);
    } catch (error) {
      document.getElementById('content').innerText = 'Restaurant Data Cannot be Displayed, Check Your Connection or Reload The Page';
    }
  },
};

export default Main;
