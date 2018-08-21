import { combineReducers } from 'redux';
import ClientsReducer from './reducer_clients';

const rootReducer = combineReducers({
  checkin_history: ClientsReducer
});

export default rootReducer;
