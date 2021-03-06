/* eslint no-undef: 0 */
/* eslint no-underscore-dangle: 0 */
import { toJS } from 'mobx';
import serialize from 'serialize-json';
import $store from './store';
/**
 Dehydrate (on server)
*/
export function dehydrate() {
  // convert store to json
  return serialize.encode(toJS($store.get(), true));
}

/**
  Rehydrate (on client)
*/
export function rehydrate() {
  // inject initial state into stores
  return $store.set(window.__STATE);
}

/**
  HRM Rehydrate (on 'module.hot.accept')
*/
export function hotRehydrate() {
  if (window.__STORE) {
    window.__STORE = $store.set(serialize.decode(dehydrate(window.__STORE)));
  }
  if (!window.store) {
    window.__STORE = $store.get();
  }
  return window.__STORE;
}
