import axios from 'axios';

export const FETCH_CHECKIN_HISTORY = 'fetch_checkin_history';
export const FETCH_CLIENTS = 'fetch_clients';
export const FETCH_CLIENT = 'fetch_client';
export const CREATE_CLIENT = 'create_client';
export const CREATE_ACCOUNT = 'create_account';
export const FETCH_GYMS = 'fetch_gyms';

const ROOT_URL = process.env.HOST_URL + "/api/v1"
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('idToken')}`;

export function fetchCheckinHistory(gym_name, client_id) {
    const request = axios.get(`${ROOT_URL}/${gym_name}/checkin-history?id=${client_id}`);

    return {
        type: FETCH_CHECKIN_HISTORY,
        payload: request
    };
}

export function fetchClients(gym_name, client_name) {
    const request = axios.get(`${ROOT_URL}/${gym_name}/clients?name=${client_name}`);

    return {
        type: FETCH_CLIENTS,
        payload: request
    };
}

export function fetchClient(gym_name, client_id) {
    const request = axios.get(`${ROOT_URL}/${gym_name}/clients/${client_id}`);

    return {
        type: FETCH_CLIENT,
        payload: request
    };
}

export function createClient(gym_name, values, callback) {
    const request = axios.post(`${ROOT_URL}/${gym_name}/clients/new`, values)
        .then(() => callback());
    return {
        type: CREATE_CLIENT,
        payload: request
    };
}

export function createAccount(gym_name, values, callback) {
    const request = axios.post(`${ROOT_URL}/account/new`, values)
        .then(() => callback());
    return {
        type: CREATE_ACCOUNT,
        payload: request
    };
}

export function fetchGyms() {
    const request = axios.get(`${ROOT_URL}/list-gyms`)

    return {
        type: FETCH_GYMS,
        payload: request
    };
};

