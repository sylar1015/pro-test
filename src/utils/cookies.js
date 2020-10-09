import cookies from 'react-cookies'

export function setToken(value) {
    cookies.save('Token', value);
}

export function getToken() {
    return cookies.load('Token')
}