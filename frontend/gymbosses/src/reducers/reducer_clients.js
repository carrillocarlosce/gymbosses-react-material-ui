import _ from 'lodash';
import { FETCH_CHECKIN_HISTORY } from '../actions'

export default function (state = {}, action) {
    switch (action.type){
        case FETCH_CHECKIN_HISTORY:
            return _.mapKeys(action.payload.data.checkin_history, 'client_id');
        default:
            return state;
    }


}