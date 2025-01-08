import { apiCall } from "./apiCall";
import { LoginType } from "./apiTypes";

export const login = async (body: LoginType) => {
    return await apiCall("auth/login/", body, false);
};

export const productsSearch = async (search: string) => {
    return await apiCall("products/" + search);
};
