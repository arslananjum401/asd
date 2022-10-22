import Cookie from 'js-cookie';

export const GetCookie = (name) => {
    return Cookie.get(name)
}

export const DeleteCookie = (name) => {
    Cookie.remove(name);
}