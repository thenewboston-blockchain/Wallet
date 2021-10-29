import ElectronStore from 'electron-store';
import {LocalStore} from 'shared/types';

class Store {
  private static instance = new ElectronStore<LocalStore>();

  public static set<K extends keyof LocalStore>(key: K, value: LocalStore[K]): void {
    Store.instance.set(key, value);
  }

  public static setStore(state: LocalStore): void {
    Store.instance.set(state);
  }

  public static get<K extends keyof LocalStore>(key: K): LocalStore[K] {
    return Store.instance.get(key);
  }

  public static getStore(): LocalStore {
    return Store.instance.store;
  }

  public static clear(): void {
    Store.instance.clear();
  }
}

export default Store;
