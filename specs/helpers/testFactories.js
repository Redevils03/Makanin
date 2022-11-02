/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import FavBtnInit from '../../src/scripts/utils/fav-btn-init';
import FavRestIdb from '../../src/scripts/data/favorite-resto-idb';

const createFavoriteButtonPresenterWithRestaurant = async (restaurant) => {
  await FavBtnInit.init({
    favoriteContainer: document.querySelector('.favoriteButton'),
    favoriteRestaurants: FavRestIdb,
    restaurant,
  });
};

export { createFavoriteButtonPresenterWithRestaurant };
