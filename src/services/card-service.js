import http from "../http-common";

class CardDataService {
  getAll() {
    return http.get("/card");
  }

  get(id) {
    return http.get(`/card/${id}`);
  }

  create(data) {
    return http.post("/card", data);
  }

  update(id, data) {
    return http.put(`/card/${id}`, data);
  }

  delete(id) {
    return http.delete(`/card/${id}`);
  }

  findByAlias(alias) {
    return http.get(`/card?alias=${alias}`);
  }
}

export default new CardDataService();