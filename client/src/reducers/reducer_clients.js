import _ from 'lodash';
import { FETCH_CLIENTS, FETCH_CLIENT } from '../actions'

export default function clientsReducer(state = {}, action) {
    switch (action.type){
        case FETCH_CLIENTS:
            return _.mapKeys(action.payload.data.clients, 'client_id');
        case FETCH_CLIENT:
            return action.payload.data;
        default:
            return state;
    }


}