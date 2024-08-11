import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance.get(this.endpoint, config).then((res) => res.data);
  };

  get = (registernumber: number) => {
    return axiosInstance
      .get<T>(this.endpoint + "/" + registernumber)
      .then((res) => res.data);
  };
}

export default APIClient;
