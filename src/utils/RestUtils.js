import store from "store";

const env = process.env.APP_ENV || "development";

class RestUtils {
  static getApiUrl() {
    return env === "development"
      ? "http://localhost:8080"
      : "https://melist-api.herokuapp.com";
  }

  static getHeaders() {
    return {
      headers: {
        Authorization: "Bearer " + store.get("access-token").access_token,
      },
    };
  }

  static getAuthUrl() {
    return env === "development"
      ? "https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=5112680121711673&redirect_uri=http://localhost:3000/auth/authorized"
      : "https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=5112680121711673&redirect_uri=https://melist-app.herokuapp.com/auth/authorized";
  }
}

export default RestUtils;
