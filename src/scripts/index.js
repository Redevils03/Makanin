/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
import 'regenerator-runtime';
import '../styles/main.scss';
import DrawerInitiator from './utils/drawer-initiator';
import UrlParser from './routes/url-parser';
import routes from './routes/routes';
import swRegister from './utils/sw-register';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

const app = new App({
  button: document.getElementById('sidebar'),
  drawer: document.getElementById('menu-sidebar'),
  content: document.querySelector('main'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

const skipLink = document.getElementById('skipLink');
skipLink.addEventListener('click', (event) => {
  event.preventDefault();
  document.getElementById('mainContent').focus();
});
