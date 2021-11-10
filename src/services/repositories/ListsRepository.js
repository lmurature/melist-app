import axios from 'axios';
import RestUtils from '../../utils/RestUtils';

class ListsRepository {
  static async createList(list) {
    return axios
      .post(
        `${RestUtils.getApiUrl()}/api/lists/create`,
        list,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const list = response.data;
        return list;
      })
      .catch((err) => {
        throw err;
      });
  }

  static async updateList(listId, listTitle, listDesc, listPrivacy) {
    return axios
      .put(
        `${RestUtils.getApiUrl()}/api/lists/update/${listId}`,
        { title: listTitle, description: listDesc, privacy: listPrivacy },
        RestUtils.getHeaders()
      )
      .then((response) => {
        const result = response.data;
        return result;
      })
      .catch((err) => {
        console.log('Error while trying to update list', err);
        throw err;
      });
  }

  static async getList(listId) {
    return axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/get/${listId}`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const list = response.data;
        return list;
      })
      .catch((err) => {
        console.log('Error while trying to get list', err);
        throw err;
      });
  }

  static async getListItems(listId, info) {
    return axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/${listId}/items?info=${info}`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const listItems = response.data;
        return listItems;
      })
      .catch((err) => {
        console.log('Error while trying to get list items', err);
        throw err;
      });
  }

  static async getListPermissions(listId) {
    return axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/get/${listId}/permissions`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const listPermissions = response.data;
        return listPermissions;
      })
      .catch((err) => {
        console.log('Error while trying to get user list permissions', err);
        throw err;
      });
  }

  static async getListNotifications(listId) {
    return axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/get/${listId}/notifications`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const notifications = response.data;
        return notifications;
      })
      .catch((err) => {
        console.log('Error while trying to get list notifications', err);
        throw err;
      });
  }

  static async getPublicLists() {
    return axios
      .get(`${RestUtils.getApiUrl()}/api/lists/search`, RestUtils.getHeaders())
      .then((response) => {
        const publicLists = response.data;
        return publicLists;
      })
      .catch((err) => {
        console.log('Error while trying to get public lists', err);
        throw err;
      });
  }

  static async getOwnedLists() {
    return axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/get/all_owned`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const ownedLists = response.data;
        return ownedLists;
      })
      .catch((err) => {
        console.log('Error while trying to get user owned lists', err);
        throw err;
      });
  }

  static async getSharedLists() {
    return axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/get/all_shared`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const sharedLists = response.data;
        return sharedLists;
      })
      .catch((err) => {
        console.log('Error while trying to get user shared lists', err);
        throw err;
      });
  }

  static async getFavoriteLists() {
    return axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/get/favorites`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const favoriteLists = response.data;
        return favoriteLists;
      })
      .catch((err) => {
        console.log('Error while trying to get user favorite lists', err);
        throw err;
      });
  }

  static async setListAsFavorite(listId) {
    return axios
      .put(
        `${RestUtils.getApiUrl()}/api/lists/favorite/${listId}`,
        null,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((err) => {
        console.log('Error while trying to add list to favorites', err);
        throw err;
      });
  }

  static async deleteFavorite(listId) {
    return axios
      .delete(
        `${RestUtils.getApiUrl()}/api/lists/favorite/${listId}`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((err) => {
        console.log('Error while trying to delete list to favorites', err);
        throw err;
      });
  }

  static async getItemListStatus(listId, itemId) {
    return axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/${listId}/status/${itemId}`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const listStatus = response.data;
        return listStatus;
      })
      .catch((err) => {
        console.log('Error while trying to get list status', err);
        throw err;
      });
  }

  static async addItemToList(listId, itemId) {
    return axios
      .post(
        `${RestUtils.getApiUrl()}/api/lists/${listId}/items/${itemId}`,
        {},
        RestUtils.getHeaders()
      )
      .then((response) => {
        const result = response.data;
        return result;
      })
      .catch((err) => {
        console.log('Error while trying to add item to list', err);
        throw err;
      });
  }

  static async setItemListStatus(listId, itemId, isCheck) {
    return axios
      .put(
        `${RestUtils.getApiUrl()}/api/lists/${listId}/${
          isCheck ? 'check' : 'uncheck'
        }/${itemId}`,
        null,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const listItems = response.data;
        return listItems;
      })
      .catch((err) => {
        console.log('Error while trying to change item list status', err);
        throw err;
      });
  }

  static async deleteItemFromList(listId, itemId) {
    return axios
      .delete(
        `${RestUtils.getApiUrl()}/api/lists/${listId}/items/${itemId}`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const listResult = response.data;
        return listResult;
      })
      .catch((err) => {
        console.log('Error while trying to delete item from list', err);
        throw err;
      });
  }

  static async getListColaborators(listId) {
    return axios
      .get(
        `${RestUtils.getApiUrl()}/api/lists/get/${listId}/shares`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const colabs = response.data;
        return colabs;
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          return [];
        } else {
          console.log('Error while trying to get list colaborators', err);
          throw err;
        }
      });
  }

  static async giveAccessToUsers(listId, request) {
    return axios
      .put(
        `${RestUtils.getApiUrl()}/api/lists/access/${listId}`,
        request,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((err) => {
        console.log('Error while trying to give access to users', err);
        throw err;
      });
  }

  static async revokeAccessToUser(listId, userId) {
    return axios
      .delete(
        `${RestUtils.getApiUrl()}/api/lists/access/${listId}?user_id=${userId}`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const colabs = response.data;
        return colabs;
      })
      .catch((err) => {
        console.log('Error while trying to revoke access to user', err);
        throw err;
      });
  }

  static async getPendingUserInvites(listId) {
    return axios
      .get(
        `${RestUtils.getApiUrl()}/api/users/invite/pending?list_id=${listId}`,
        RestUtils.getHeaders()
      )
      .then((response) => {
        const pendings = response.data;
        return pendings;
      })
      .catch((err) => {
        console.log('Error while trying to get pending users of list', err);
        throw err;
      });
  }

  static async inviteUsersByEmail(email, listId, shareType) {
    return axios
      .post(
        `${RestUtils.getApiUrl()}/api/users/invite?email=${email}&share_type=${shareType}&list_id=${listId}`,
        {},
        RestUtils.getHeaders()
      )
      .then((response) => {
        const result = response.data;
        return result;
      })
      .catch((err) => {
        console.log('Error while trying to invite user by mail to list', err);
        throw err;
      });
  }
}

export default ListsRepository;
