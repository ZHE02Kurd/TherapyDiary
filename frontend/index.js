// Polyfill for libraries that reference 'window' in React Native
if (typeof window === 'undefined') {
  global.window = global;
  global.window.navigator = {};
}

import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
