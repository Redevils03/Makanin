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

function generateFingerprint() {
    // Use a Promise to handle the asynchronous loading of the library
    return new Promise((resolve, reject) => {
      // Create a script element
      const script = document.createElement('script');

      // Set the source to the FingerprintJS library
      script.src = 'https://openfpcdn.io/fingerprintjs/v4';

      // Set the onload event to resolve the Promise
      script.onload = () => {
        // Load the library and resolve the Promise with the FingerprintJS object
        resolve(window.FingerprintJS.load());
      };

      // Set the onerror event to reject the Promise if the script fails to load
      script.onerror = () => {
        reject(new Error('Failed to load FingerprintJS'));
      };

      // Append the script to the document body
      document.body.appendChild(script);
    });
}
window.addEventListener('hashchange', () => {
  // generateFingerprint()
  //   .then(fp => fp.get())
  //   .then(result => alert(result.visitorId))
  //   .catch(error => alert(error))
  app.renderPage();
});



window.addEventListener('load', () => {
  // console.log('in');
  // generateFingerprint()
  //   .then(fp => fp.get())
  //   .then(result => alert(result.visitorId))
  app.renderPage();
  swRegister();
});

const skipLink = document.getElementById('skipLink');
skipLink.addEventListener('click', (event) => {
  event.preventDefault();
  document.getElementById('mainContent').focus();
});
