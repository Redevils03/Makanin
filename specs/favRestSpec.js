/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import FavRestIdb from '../src/scripts/data/favorite-resto-idb';
import * as TestFactories from './helpers/testFactories';

describe('Favorite The Restaurant', () => {
  const FavoriteButtonContainer = () => {
    document.body.innerHTML = '<div class="favoriteButton"></div>';
  };

  beforeEach(() => {
    FavoriteButtonContainer();
  });

  it('Should show favorite button when the restaurant has not been favorited before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="Make Restaurant As Favorite"]')).toBeTruthy();
  });

  it('Should not show unfavorite button when the restaurant has not been favorited before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="Make Restaurant No Longer a Favorite"]')).toBeFalsy();
  });

  it('should be able to favorite the restaurant', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('[aria-label="Make Restaurant As Favorite"]').dispatchEvent(new Event('click'));
    const restaurant = await FavRestIdb.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });
    FavRestIdb.deleteRestaurant(1);
  });

  it('should not favorite the restaurant when its already favorited', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    await FavRestIdb.putRestaurant({ id: 1 });
    document.querySelector('#favorite').dispatchEvent(new Event('click'));

    expect(await FavRestIdb.getAllRestaurants()).toEqual([{ id: 1 }]);
    FavRestIdb.deleteRestaurant(1);
  });

  it('should not favorite the restaurant when it has no id', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ });

    document.querySelector('#favorite').dispatchEvent(new Event('click'));
    expect(await FavRestIdb.getAllRestaurants()).toEqual([]);
  });
});
