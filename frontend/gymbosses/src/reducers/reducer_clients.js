import _ from 'lodash';
import { FETCH_CHECKIN_HISTORY, FETCH_CLIENTS, FETCH_CLIENT } from '../actions'

export default function (state = {}, action) {
    switch (action.type){
        case FETCH_CLIENTS:
            return _.mapKeys(action.payload.data.clients, 'client_id');
        case FETCH_CLIENT:
            return action.payload.data;
        case FETCH_CHECKIN_HISTORY:
            return _.mapKeys(action.payload.data.checkin_history, 'client_id');
        default:
            return state;
    }


}