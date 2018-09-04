import { combineReducers } from 'redux';
import ClientsReducer from './reducer_clients';
import { reducer as formReducer } from 'redux-form';
const rootReducer = combineReducers({
  clients: ClientsReducer,
  form: formReducer
});

export default rootReducer;
