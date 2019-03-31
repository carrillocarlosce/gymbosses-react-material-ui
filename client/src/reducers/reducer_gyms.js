import _ from 'lodash';
import { FETCH_GYMS } from '../actions'

export default function gymsReducer(state = {}, action) {
    switch (action.type){
        case FETCH_GYMS:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }


}