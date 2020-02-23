let BASE;
if (process.env.NODE_ENV === "development") {
  BASE = "http://localhost:3001/api";
} else {
  BASE = "/api";
}

class API {
  async request(method, route, args) {
    const resp = await fetch(`${BASE}${route}`, {method, ...args});

    try {
      return await resp.json();
    } catch {
      throw new Error("Received malformed JSON.");
    }
  }

  async get(route, args) {
    return await this.request("GET", route, args);
  }

  async post(route, args) {
    return await this.request("POST", route, args);
  }

  async delete(route, args) {
    return await this.request("DELETE", route, args);
  }
}

export default new API();
