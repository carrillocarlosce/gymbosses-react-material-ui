import _ from 'lodash';
import { FETCH_CHECKIN_HISTORY } from '../actions'

export default function checkinReducer(state = {}, action) {
    switch (action.type){
        case FETCH_CHECKIN_HISTORY:
            return action.payload.data.checkin_history;
        default:
            return state;
    }


}