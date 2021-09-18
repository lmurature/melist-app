import axios from "axios";
import store from "store";
import Cookies from "universal-cookie";
import RestUtils from "../../utils/RestUtils";

class UsersRepository {
  static async generateToken(code) {
    return axios
      .post(`${RestUtils.getApiUrl()}/api/users/auth/generate_token`, {
        authorization_code: code,
      })
      .then((res) => {
        const { access_token, refresh_token, user_id } = res.data;

        store.set("access-token", access_token);
        const cookies = new Cookies();
        cookies.set("refresh-token", refresh_token, {
          path: "/summary",
        });

        return res.data;
      })
      .catch((err) => {
        console.log("Error while trying to refresh token", err);
        throw err;
      });
  }

  static async getUser() {
    return axios
      .get(`${RestUtils.getApiUrl()}/api/users/me`, RestUtils.getHeaders())
      .then((response) => {
        const { first_name, last_name } = response.data;
        return [first_name, last_name];
      })
      .catch((err) => {
        console.log("Error while trying to get user data", err);
        throw err;
      });
  }
}

export default UsersRepository;
