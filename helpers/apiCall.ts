import { env } from "next-runtime-env";
import { parseCookies } from "nookies";
import axios, { AxiosRequestConfig } from "axios";

// Define the apiCall function, which makes an API call using Axios
export async function apiCall(url: string, body: any = null, auth = true, method = null) {
    try {
        // Set the headers and request options for the API call
        let headers: any = {};

        // Add the authorization header if authentication is required
        if (auth) {
            const cookies = parseCookies();
            const token = cookies["access_token"];
            headers["Authorization"] = `Bearer ${token}`;
        }

        // Set the request options for the API call
        let requestOptions: AxiosRequestConfig = {
            method: method ? method : body ? "POST" : "GET",
            headers,
            url: env("NEXT_PUBLIC_API_URL") + url,
        };

        // Prepare the form data if the body includes a file
        if (body) {
            if (body.file) {
                requestOptions.data = prepareFormData(body);
            } else {
                headers["Content-Type"] = "application/json";
                requestOptions.headers = headers;
                requestOptions.data = body;
            }
        }

        // Make the API call using Axios
        const response = await axios(requestOptions);

        return { data: response.data, status: response.status };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return { data: error.response.data, status: error.response.status };
            } else if (error.request) {
                return { data: {}, status: 500 };
            } else {
                return { data: {}, status: 500 };
            }
        } else {
            return { data: {}, status: 500 };
        }
    }
}

// Prepares the form data for the API call
function prepareFormData(body: any): FormData {
    const formData = new FormData();
    for (const key in body) {
        formData.append(key, body[key]);
    }
    return formData;
}
