import axios, { AxiosRequestConfig } from 'axios';

/**
 * Reusable HTTP GET request function using axios.
 * @param url - The URL to send the GET request to.
 * @param config - Optional Axios request configuration.
 */
export async function httpGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await axios.get<T>(url, config);
  return response.data;
}

/**
 * Reusable HTTP POST request function using axios.
 * @param url - The URL to send the POST request to.
 * @param data - The data to send in the POST request body.
 * @param config - Optional Axios request configuration.
 */
export async function httpPost<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  const response = await axios.post<T>(url, data, config);
  return response.data;
} 