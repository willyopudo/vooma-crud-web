import http from "../http-common";

class AccountDataService {
  getAll() {
    return http.get("/accounts");
  }

  get(id) {
    return http.get(`/accounts/${id}`);
  }

  create(data) {
    return http.post("/accounts", data);
  }

  update(id, data) {
    return http.put(`/accounts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/accounts/${id}`);
  }

  findByIban(iban) {
    return http.get(`/accounts?iban=${iban}`);
  }
}

export default new AccountDataService();