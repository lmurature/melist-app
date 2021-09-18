import axios from "axios";
import RestUtils from "../../utils/RestUtils";

class ItemsRepository {
  static async getItem(itemId) {
    return axios
      .get(
        `${RestUtils.getApiUrl()}/api/items/${itemId}`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const item = response.data;
        return item;
      })
      .catch((err) => {
        console.log("Error while trying to get item", err);
        throw err;
      });
  }

  static async getItemsHistory(itemId) {
    return axios
      .get(
        `${RestUtils.getApiUrl()}/api/items/${itemId}/history`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const history = response.data;
        return history;
      })
      .catch((err) => {
        console.log("Error while trying to get item history", err);
        throw err;
      });
  }

  static async getCategoryTrends(categoryId) {
    return axios
      .get(
        `${RestUtils.getApiUrl()}/api/items/trends/${categoryId}`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const trends = response.data;
        return trends;
      })
      .catch((err) => {
        console.log("Error while trying to get category trends", err);
        throw err;
      });
  }
}

export default ItemsRepository;
