import ElectronStore from 'electron-store';
import {LocalStore} from '@shared/types';

const localStore = new ElectronStore<LocalStore>();

export default localStore;
