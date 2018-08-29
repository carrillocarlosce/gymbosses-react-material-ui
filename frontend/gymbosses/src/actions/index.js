import axios from 'axios';

export const FETCH_CHECKIN_HISTORY='fetch_checkin_history';
export const CREATE_CLIENT='create_client';

const ROOT_URL="http://localhost:3000"

export function fetchCheckinHistory(gym_name) {
    const request = axios.get(`${ROOT_URL}/${gym_name}/checkin-history`)
   
    return {
        type: FETCH_CHECKIN_HISTORY,
        payload: request
    };
}

export function createClient(gym_name, values, callback) {
    const request = axios.post(`${ROOT_URL}/${gym_name}/client/new`, values)
    .then(() => callback());
    return {
        type: CREATE_CLIENT,
        payload: request
    };
}

