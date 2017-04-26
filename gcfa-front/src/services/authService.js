import axios from 'axios';

export function setToken(token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  localStorage.setItem('token', token);
}

export function isLoggedIn() {
  return !!localStorage.getItem('token')
}

export function login(user, password, cb) {
  axios.post('/login', {
    username: user,
    password: password
  }).then(res => {
    localStorage.removeItem('user');
    setToken(res.data);
    cb(null);
  }).catch(err => {
    cb(err.message);
  })
}

export function hasRole(roles) {
  const userRaw = localStorage.getItem('user');
  if (userRaw) {
    const user = JSON.parse(userRaw);
    return roles.includes(user.role.name);
  }
  return false;
}

export function logout() {
  localStorage.removeItem('token');
}
