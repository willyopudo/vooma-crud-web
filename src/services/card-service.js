import http from "../http-common";

class CardDataService {
  getAll() {
    return http.get("/cards");
  }

  get(id) {
    return http.get(`/cards/${id}`);
  }

  create(data) {
    return http.post("/cards", data);
  }

  update(id, data) {
    return http.put(`/cards/${id}`, data);
  }

  delete(id) {
    return http.delete(`/cards/${id}`);
  }

  findByAlias(alias) {
    return http.get(`/cards?alias=${alias}`);
  }
}

export default new CardDataService();