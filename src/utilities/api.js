import axios from "axios";

import makeStorage from "../utilities/storage"

export default function makeRequest() {

  const API_URL = process.env.REACT_APP_API_URL;

  const headers = {
    Authorization: `Bearer ${makeStorage().getToken()}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const login = (endpoint, data) => axios.post(API_URL + endpoint, data);
  const get = (endpoint, isPrivate = true) => axios.get(API_URL + endpoint, isPrivate ? { headers } : null)
  const post = (endpoint, data) => axios.post(API_URL + endpoint, data, { headers })
  const update = (endpoint, data) => axios.put(API_URL + endpoint, data, { headers })
  const drop = (endpoint) => axios.delete(API_URL + endpoint, { headers })

  return {
    login,
    get,
    post,
    update,
    drop
  }
}