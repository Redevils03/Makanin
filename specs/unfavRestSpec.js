/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import FavRestIdb from '../src/scripts/data/favorite-resto-idb';
import * as TestFactories from './helpers/testFactories';

describe('Unfavorite The Restaurant', () => {
  const FavoriteButtonContainer = () => {
    document.body.innerHTML = '<div class="favoriteButton"></div>';
  };

  beforeEach(async () => {
    FavoriteButtonContainer();
    await FavRestIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavRestIdb.deleteRestaurant(1);
  });

  it('Should show unfavorite button when the restaurant has been favorited', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="Make Restaurant No Longer a Favorite"]')).toBeTruthy();
  });

  it('Should not show unfavorite button when the restaurant has been favorited', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="Make Restaurant As Favorite"]')).toBeFalsy();
  });

  it('should be able to remove favorited restaurant from the list', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('[aria-label="Make Restaurant No Longer a Favorite"]').dispatchEvent(new Event('click'));
    expect(await FavRestIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unfavorited restaurant is not in the list', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    await FavRestIdb.deleteRestaurant(1);

    document.querySelector('[aria-label="Make Restaurant No Longer a Favorite"]').dispatchEvent(new Event('click'));
    expect(await FavRestIdb.getAllRestaurants()).toEqual([]);
  });
});
