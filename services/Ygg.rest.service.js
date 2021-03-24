const Axios = require('axios');

const AxiosService = {
  init() {
    this.axios = Axios.create({
      headers: { 'Content-Type': 'application/json' },
      baseURL: `${process.env.YGG_API_URL}`,
    });
  },

  /**
   * Sends a GET request with a json body to the API.
   * @param {String} path A relative path to the ressource.
   * @param {*} body The request's body.
   */
  async get(path) {
    return this.axios.get(path);
  },

  /**
   * Sends a POST request with a json body to the API.
   * @param {String} path A relative path to the ressource.
   * @param {*} body The request's body.
   */
  async post(path, body = {}) {
    return this.axios.post(path, body);
  },

  /**
   * Sends a PT request with a json body to the API.
   * @param {String} path A relative path to the ressource.
   * @param {*} body The request's body.
   */
  async put(path, body = {}) {
    return this.axios.put(path, body);
  },

  /**
   * Sends a DELETE request with a json body to the API.
   * @param {String} path A relative path to the ressource.
   * @param {*} body The request's body.
   */
  async delete(path) {
    return this.axios.delete(path);
  },
};

module.exports = AxiosService;
