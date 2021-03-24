const AxiosService = require('./Ygg.rest.service');

const ApiService = {
  async downloadTorrent(torrentId) {
    return AxiosService.get(`/download?id=${torrentId}`);
  },
}

module.exports = ApiService;
