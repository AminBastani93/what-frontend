import { env } from "next-runtime-env";
import { parseCookies } from "nookies";
import axios, { AxiosRequestConfig } from "axios";

export async function apiCall(url: string, body: any = null, auth = true, method = null) {
    try {
        let headers: any = {};

        if (auth) {
            const cookies = parseCookies();
            const token = cookies["access_token"];
            headers["Authorization"] = `Bearer ${token}`;
        }

        let requestOptions: AxiosRequestConfig = {
            method: method ? method : body ? "POST" : "GET",
            headers,
            url: env("NEXT_PUBLIC_API_URL") + url,
        };

        if (body) {
            if (body.file) {
                requestOptions.data = prepareFormData(body);
            } else {
                headers["Content-Type"] = "application/json";
                requestOptions.headers = headers;
                requestOptions.data = body;
            }
        }

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

function prepareFormData(body: any): FormData {
    const formData = new FormData();
    for (const key in body) {
        formData.append(key, body[key]);
    }
    return formData;
}
