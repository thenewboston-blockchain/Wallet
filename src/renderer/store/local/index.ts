import ElectronStore from 'electron-store';
import {LocalStore} from '@renderer/types';

const localStore = new ElectronStore<LocalStore>();

export default localStore;
