// import {createStore} from 'redux';
import {legacy_createStore as createStore} from 'redux';
import {mainReducer} from './reducers';

export const store = createStore(mainReducer);
