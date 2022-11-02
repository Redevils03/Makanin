/* eslint-disable no-undef */
Feature('Favoriting Restaurants');

const assert = require('assert');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited restaurants', ({ I }) => {
  I.seeElement('#query');
  I.waitForElement('.restaurant-item__not__found', 10);
  I.see('There is no restaurant to show', '.restaurant-item__not__found');
});

Scenario('favoriting one restaurant', async ({ I }) => {
  I.waitForElement('.restaurant-item__not__found', 10);
  I.see('There is no restaurant to show', '.restaurant-item__not__found');

  I.amOnPage('/');
  I.waitForElement('.detail a', 10);
  I.seeElement('.detail a');

  I.waitForElement('.restaurant__title', 10);
  const firstRestaurant = locate('.restaurant__title').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#favorite', 10);
  I.seeElement('#favorite');
  I.click('#favorite');

  I.amOnPage('/#/favorite');
  I.waitForElement('article', 10);
  I.seeElement('article');
  I.waitForElement('.restaurant__title', 10);
  const favoritedRestaurantTitle = await I.grabTextFrom('.restaurant__title');

  assert.strictEqual(firstRestaurantTitle, favoritedRestaurantTitle);
});

Scenario('cancel favoriting a restaurant', async ({ I }) => {
  I.waitForElement('.restaurant-item__not__found', 10);
  I.see('There is no restaurant to show', '.restaurant-item__not__found');
  I.amOnPage('/');
  I.waitForElement('.detail a', 10);
  I.seeElement('.detail a');

  I.waitForElement('.restaurant__title', 10);
  const firstRestaurant = locate('.restaurant__title').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#favorite', 10);
  I.seeElement('#favorite');
  I.click('#favorite');

  I.amOnPage('/#/favorite');
  I.waitForElement('article', 10);
  I.seeElement('article');

  I.waitForElement('.restaurant__title', 10);
  const favoritedRestaurantTitle = await I.grabTextFrom('.restaurant__title');
  assert.strictEqual(firstRestaurantTitle, favoritedRestaurantTitle);

  I.waitForElement('.detail a', 10);
  I.seeElement('.detail a');
  I.click(firstRestaurant);

  I.waitForElement('#favorite', 10);
  I.seeElement('#favorite');
  I.click('#favorite');
  I.amOnPage('/#/favorite');

  I.waitForElement('.restaurant-item__not__found', 10);
  I.see('There is no restaurant to show', '.restaurant-item__not__found');
});

Scenario('searching restaurants', async ({ I }) => {
  I.waitForElement('.restaurant-item__not__found', 10);
  I.see('There is no restaurant to show', '.restaurant-item__not__found');

  I.amOnPage('/');
  I.waitForElement('.detail a', 10);
  I.seeElement('.detail a');

  const titles = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 3; i++) {
    I.waitForElement('.restaurant__title', 10);
    I.click(locate('.restaurant__title').at(i));
    I.waitForElement('#favorite', 10);
    I.seeElement('#favorite');
    I.click('#favorite');

    I.waitForElement('.restaurant__title', 10);
    // eslint-disable-next-line no-await-in-loop
    titles.push(await I.grabTextFrom('.restaurant__title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const searchQuery = titles[1].substring(1, 3);
  const matchingRestaurants = titles.filter((title) => title.indexOf(searchQuery) !== -1);

  I.waitForElement('.restaurant__title', 10);

  I.fillField('#query', searchQuery);
  I.waitForElement('.restaurant__title', 10);
  I.pressKey('Enter');

  I.waitForElement('.restaurant__title', 10);

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('article');
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);

  matchingRestaurants.forEach(async (title, index) => {
    I.waitForElement('.restaurant__title', 10);
    const visibleTitle = await I.grabTextFrom(locate('.restaurant__title').at(index + 1));
    assert.strictEqual(title, visibleTitle);
  });
});
