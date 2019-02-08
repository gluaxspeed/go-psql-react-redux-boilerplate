import axios from 'axios';

const boilerplate = axios.create({
  baseURL: 'http://localhost:5000/api/v1/',
});

export async function get(url, config = {}) {
  try {
    const res = await boilerplate.get(
      url,
      {
        ...config,
        withCredentials: true,
      }, 
    );
    return res;
  } catch (err) {
    throw err;
  }
}

export async function post(url, config = {}) {
  console.log('here');
  try {
    const res = await boilerplate.post(
      url,
      {
        ...config,
      },
      {
        withCredentials: true, 
      }
    );
    return res;
  } catch (err) {
    throw err;
  }
} 
  