/* eslint-disable linebreak-style */
import Main from '../views/pages/main';
import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';

const routes = {
  '/': Main,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
