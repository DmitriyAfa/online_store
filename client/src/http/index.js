import axios from "axios";
/**
 * Axios это один из самых популярных HTTP клиентов для браузеров и node. js, основанный на промисах.
 * В Axios есть поддержка запросов, получение ответов от сервера, их трансформация и автоматическая конвертация в JSON.
 */

// do not require login
const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

/**
 * interceptor - перехватчик
 * You can intercept requests or responses before they are handled by then or catch.
 *  */

const authInterceptor = (config) => {
  // automatically substitutes a token for each request
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
