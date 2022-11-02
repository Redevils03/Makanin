/* eslint-disable linebreak-style */
import API_ENDPOINT from '../globals/api-endpoint';

class restaurantSource {
  static async main() {
    const response = await fetch(API_ENDPOINT.MAIN);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }
}

export default restaurantSource;
