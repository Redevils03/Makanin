/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import { FavoriteRestaurantButton, NoLongerFavoriteRestaurantButton } from '../views/templates/content-template';

const FavBtnInit = {
  async init({ favoriteContainer, favoriteRestaurants, restaurant }) {
    this._favoriteContainer = favoriteContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurants = favoriteRestaurants;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderFavorited();
    } else {
      this._renderFavorite();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favoriteRestaurants.getRestaurant(id);
    return !!restaurant;
  },

  _renderFavorite() {
    this._favoriteContainer.innerHTML += FavoriteRestaurantButton();

    const favoriteButton = document.querySelector('#favorite');
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderFavorited() {
    this._favoriteContainer.innerHTML += NoLongerFavoriteRestaurantButton();

    const favoriteButton = document.querySelector('#favorite');
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default FavBtnInit;
