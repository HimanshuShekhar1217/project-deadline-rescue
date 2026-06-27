import { apiClient } from './apiClient';

export const authApi = {
  async signup(email, password) {
    return apiClient.post('/auth/signup', { email, password });
  },

  async login(email, password) {
    // FastAPI's OAuth2PasswordRequestForm expects application/x-www-form-urlencoded.
    // apiClient({isFormData=true}) will URL-encode the payload and set the correct header.
    const data = await apiClient.post(
      '/auth/login',
      { username: email, password },
      true
    );

    if (data?.access_token) {
      localStorage.setItem('token', data.access_token);
    }
    return data;
  },

  logout() {
    localStorage.removeItem('token');
  }
};