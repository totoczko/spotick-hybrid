import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import placesReducer from './reducers/places'
import uiReducer from './reducers/ui'
import authReducer from './reducers/auth'

const rootReducer = combineReducers({
  places: placesReducer,
  ui: uiReducer,
  auth: authReducer
});

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
};


let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, composeEnhancers(applyMiddleware(thunk)));
export default store;
export const persistor = persistStore(store);