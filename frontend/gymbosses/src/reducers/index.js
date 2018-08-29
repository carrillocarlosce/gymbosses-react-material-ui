import { combineReducers } from 'redux';
import ClientsReducer from './reducer_clients';
import { reducer as formReducer } from 'redux-form';
const rootReducer = combineReducers({
  checkin_history: ClientsReducer,
  form: formReducer
});

export default rootReducer;
