import { apiCall } from "./apiCall";
import { LoginType } from "./apiTypes";

// The login function, which sends a POST request to the login endpoint
export const login = async (body: LoginType) => {
    return await apiCall("auth/login/", body, false);
};

// The productsSearch function, which sends a GET request to the products endpoint with a search parameter
export const productsSearch = async (search: string) => {
    return await apiCall("products/" + search);
};
