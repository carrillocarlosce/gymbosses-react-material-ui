import { combineReducers } from 'redux';
import clientsReducer from './reducer_clients';
import checkinReducer from './reducer_checkin';
import gymsReducer from './reducer_gyms';
import gymIdReducer from './reducer_gym_id';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  clients: clientsReducer,
  checkin: checkinReducer,
  gyms: gymsReducer,
  gym_id: gymIdReducer,
  form: formReducer
});

export default rootReducer;
