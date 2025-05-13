const getAuthToken = (): string | null => {
    const keyLocalStorage = localStorage.getItem('jwt-key');
    return keyLocalStorage ? JSON.parse(keyLocalStorage) : null;
};

export default getAuthToken;
