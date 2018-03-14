import {environment} from '../../environments/environment';

const BASE_URL = environment.apiURL;

export const API_URL = {
    login: BASE_URL + '/api-token-auth/',
    table: BASE_URL + '/api/document_setting/',
    field: BASE_URL + '/api/document_field/',
    refresh_token: BASE_URL + '/api-token-refresh/',

};