import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllRecords = () => {
  return apiClient.get('/records');
};

export const getRecordById = (id) => {
  return apiClient.get(`/records/${id}`);
};

export const createRecord = (record) => {
  const payload = {
    artist: record.artist,
    album_title: record.album,
    label: record.label,
    date: record.releaseDate,
    vinyls_number: record.recordNumber,
    category: record.category,
    state: record.recordState,
  };

  return apiClient.post('/records', payload);
};

export const updateRecord = (id, record) => {
  const payload = {
    artist: record.artist,
    album_title: record.albumTitle,
    label: record.label,
    date: record.date,
    vinyls_number: record.vinylsNumber,
    category: record.category,
    state: record.state,
  };

  return apiClient.put(`/records/${id}`, payload);
};

export const deleteRecord = (id) => {
  return apiClient.delete(`/records/${id}`);
};

export const getRecordsByCategory = (category) => {
  const params = category !== "All" ? { category } : {};
  return apiClient.get('/records', { params });
};

export const getUsers = () => {
  return apiClient.get('/users');
};

export const getUserById = (id) => {
  return apiClient.get(`/users/${id}`);
};

export const createUser = (user) => {
  return apiClient.post('/users', user);
};

export const updateUser = (id, user) => {
  return apiClient.put(`/users/${id}`, user);
};

export const deleteUser = (id) => {
  return apiClient.delete(`/users/${id}`);
};

export const registerUser = (userData) => {
  return apiClient.post('/users/register', userData);
};

export const loginUser = (credentials) => {
  return apiClient.post('/login', credentials);
};

export const getUserProfile = () => {
  return apiClient.get('/users/profile');
};

export const updateUserProfile = (formData) => {
  return apiClient.put('/users/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
