const API_BASE_URL = 'http://localhost:8000/api';

export const apiClient = {
  async post(endpoint, data, isFormData = false) {
    const headers = {};
    let body;

    if (isFormData) {
      // FastAPI's OAuth2PasswordRequestForm expects URL-encoded parameters
      body = new URLSearchParams();
      for (const key in data) {
        body.append(key, data[key]);
      }
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    } else {
      body = JSON.stringify(data);
      headers['Content-Type'] = 'application/json';
    }

    // Automatically append access token if it exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Network request failed');
    }

    return response.json();
  }
};