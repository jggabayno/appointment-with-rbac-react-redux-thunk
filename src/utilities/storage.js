
export default function makeStorage() {

    const storage = localStorage;

    const setToken = (token) => storage.setItem('SESSION_TOKEN', token)
    const getToken = () => storage.getItem('SESSION_TOKEN')
    const removeToken = () => storage.removeItem('SESSION_TOKEN')

    const getUser = () => storage.getItem('USER')
    const setUser = (value) => storage.setItem('USER', JSON.stringify(value))

    const isStorageEmpty = () => storage.getItem("SESSION_TOKEN") === null;

    const clearSession = () => storage.clear();

    return {
        getToken,
        setToken,
        removeToken,
        getUser,
        setUser,
        clearSession,
        isStorageEmpty
    }

}
