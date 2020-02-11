import axios from 'axios'

class HttpRequest {
    constructor () {
      this.baseURL = 'https://day-off-backend.herokuapp';
      this.axiosInstance = axios.create({
        baseURL: this.baseURL,
        timeout: 120000,
        headers: {
          'Content-Type': "application/json",
          'Access-Control-Allow-Origin': '*',
      },
      })
    }

    create (methodName, data) {
      return this.axiosInstance.post(methodName, {data:data})
    }

    get (methodName, data) {
      return this.axiosInstance.get(methodName, {
        params: data
      })
    }

    update (methodName, data) {
      return this.axiosInstance.put(methodName, {data:data})
    }
  
    delete (methodName, data) {
      return this.axiosInstance.delete(methodName, {data: data})
    }
}
  
export default HttpRequest
