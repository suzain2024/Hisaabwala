//this is the component which generates the url i.e connects our frontend with the backend
export const host = "http://localhost:5000";

//host is the basic or source of backend
// const host = "http://localhost:5000";
export const setAvatarAPI = `${host}/api/auth/setAvatar`;//set the avatar form of the profile
export const loginAPI = `${host}/api/auth/login`;//for login of available user
export const addTransaction = `${host}/api/v1/addTransaction`;//add new transaction of the user
export const getTransactions = `${host}/api/v1/getTransaction`;//get the transaction detail of the user
export const editTransactions = `${host}/api/v1/updateTransaction`;//update the detail of the user
export const deleteTransactions = `${host}/api/v1/deleteTransaction`;//delete the transaction detail of the user
export const registerAPI = "http://localhost:5000/api/auth/register";
