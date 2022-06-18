export const decodeJwt = (token: string) => {
    if (!token) {
        return;
    }

    return JSON.parse(window.atob(token.split('.')[1]));
};

export const isTokenExists = (token: string) => {
    return decodeJwt(token).exp > Date.now() / 1000;
};
