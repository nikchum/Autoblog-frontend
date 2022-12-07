export const getStatus = state => state.auth.status;
export const getToken = state => state.auth.token;
export const getUser = state => state.auth.user;
export const checkIsAuth = state => Boolean(state.auth.token);
