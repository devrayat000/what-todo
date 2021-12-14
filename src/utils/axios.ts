import axios from 'axios'
import { addAxiosInterceptors } from 'supertokens-auth-react/recipe/session'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  // timeoutErrorMessage: 'Request timed out!',
  // timeout: 1500,
})
addAxiosInterceptors(api)
export { api }
// export function fetcher<Return>(resource: AxiosRequestConfig) {
//   return api.request<Return>(resource).then(res => res.data)
// }
