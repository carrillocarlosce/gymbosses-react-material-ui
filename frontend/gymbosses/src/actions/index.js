import axios from 'axios';

export const FETCH_CHECKIN_HISTORY='fetch_checkin_history';

const ROOT_URL="http://localhost:3000"

export function fetchCheckinHistory(gym_name) {
    const request = axios.get(`${ROOT_URL}/${gym_name}/checkin-history`)
   
    return {
        type: FETCH_CHECKIN_HISTORY,
        payload: request
    };
}

