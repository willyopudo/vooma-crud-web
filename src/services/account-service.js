import http from "../http-common";

class AccountDataService {
  getAll() {
    return http.get("/account");
  }

  get(id) {
    return http.get(`/account/${id}`);
  }

  create(data) {
    return http.post("/account", data);
  }

  update(id, data) {
    return http.put(`/account/${id}`, data);
  }

  delete(id) {
    return http.delete(`/account/${id}`);
  }

  findByIban(iban) {
    return http.get(`/account?iban=${iban}`);
  }
}

export default new AccountDataService();