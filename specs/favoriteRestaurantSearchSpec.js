/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-undef */
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/favorited-restaurant/favorite-restaurant-search-presenter';
import FavRestIdb from '../src/scripts/data/favorite-resto-idb';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/favorited-restaurant/favorite-restaurant-search-view';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavRestIdb);
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('when query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('Restoran X');

      expect(presenter.latestQuery).toEqual('Restoran X');
    });

    it('should ask the model to search for liked restaurants', () => {
      searchRestaurants('Restoran X');

      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('Restoran X');
    });

    it('should show the found restaurants', () => {
      presenter._showFoundRestaurants([{ id: 1 }]);
      expect(document.querySelectorAll('article').length).toEqual(1);

      presenter._showFoundRestaurants([{
        id: 1,
        name: 'Satu',
      }, {
        id: 2,
        name: 'Dua',
      }]);
      expect(document.querySelectorAll('article').length).toEqual(2);
    });

    it('should show the title of the found restaurants', () => {
      presenter._showFoundRestaurants([{
        id: 1,
        name: 'Satu',
      }]);

      expect(document.querySelectorAll('.restaurant__title').item(0).textContent).toEqual('Satu');
    });

    it('should show - when the restaurant returned does not contain a title', (done) => {
      document.getElementById('content').addEventListener('content:updated', () => {
        const restaurantTitles = document.querySelectorAll('.restaurant__title');
        expect(restaurantTitles.item(0).textContent).toEqual('-');

        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('Restoran X').and.returnValues([
        { id: 444 },
      ]);

      searchRestaurants('Restoran X');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      searchRestaurants('    ');
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });

    it('should show the empty message', (done) => {
      document.getElementById('content').addEventListener('content:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);

        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('Restoran X').and.returnValues([]);

      searchRestaurants('Restoran X');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('content').addEventListener('content:updated', () => {
        expect(document.querySelectorAll('article').length).toEqual(0);

        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('Restoran X').and.returnValues([]);
      searchRestaurants('Restoran X');
    });
  });
});
