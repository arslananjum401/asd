export const SetLocalStorage = (name, key) => {
    localStorage.setItem(name, JSON.stringify(key));
}
export const GetLocalStorage = (name) => {
    return JSON.parse(localStorage.getItem(name))
}
export const DeleteLocalStorage = (name) => {
    localStorage.removeItem(name)
}