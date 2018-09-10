import { combineReducers } from 'redux';
import clientsReducer from './reducer_clients';
import checkinReducer from './reducer_checkin';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  clients: clientsReducer,
  checkin: checkinReducer,
  form: formReducer
});

export default rootReducer;
