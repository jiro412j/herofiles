import { environment } from '../../environments/environment';

// const BASE_URL = environment.apiURL;
const BASE_URL = 'http://192.168.100.235:8000';

export const API_URL = {
  login: BASE_URL + '/api-token-auth/',
  table: BASE_URL + '/api/document_setting/',
  field: BASE_URL + '/api/document_field/',
  refresh_token: BASE_URL + '/api-token-refresh/',
  import_document: BASE_URL + '/api/import_document/',
  document_setting: BASE_URL + '/api/document_setting/'
};
