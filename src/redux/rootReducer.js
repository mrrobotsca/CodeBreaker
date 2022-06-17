import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import blocsReducer from './slices/blocs';

// ----------------------------------------------------------------------
const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const blocsPersistConfig = {
  key: 'blocs',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['guessedBlocs'],
};

const rootReducer = combineReducers({
  blocs: persistReducer(blocsPersistConfig, blocsReducer),
});

export { rootPersistConfig, rootReducer };
