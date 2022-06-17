export const decodeJwt = (token: string) => {
    if (!token) {
        return;
    }

    return JSON.parse(window.atob(token.split('.')[1]));
};
