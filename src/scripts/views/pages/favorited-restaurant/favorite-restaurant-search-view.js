/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { restaurantTemplate } from '../../templates/content-template';

class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
      <div id='restaurant-search-container'>
        <div id='favoriteHeader'>
          <h2 tabindex='0'>Favorite Restaurant</h2>
        </div>
        <input id='query' type='text' placeholder='Search Your Favorite Restaurants...'>
        <div id='content' class='restaurants'></div>
      </div>
      <footer id="footer">
        <p>Copyright © 2022 - Makanin</p>
      </footer>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants = []) {
    let html;

    if (restaurants.length) {
      html = restaurants.reduce((carry, Restaurant) => carry.concat(restaurantTemplate(Restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById('content').innerHTML = html;

    document.getElementById('content').dispatchEvent(new Event('content:updated'));
  }

  showRestaurants(restaurants) {
    this.showFavoriteRestaurants(restaurants);
  }

  _getEmptyRestaurantTemplate() {
    return '<div class="restaurant-item__not__found">There is no restaurant to show</div>';
  }
}

export default FavoriteRestaurantSearchView;
