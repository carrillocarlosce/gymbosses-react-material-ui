import _ from 'lodash';
import { SET_GYM_ID } from '../actions'

export default function gymIdReducer(state = {}, action) {
    switch (action.type){
        case SET_GYM_ID:
            return action.payload;
        default:
            return state;
    }


}