import ListsRepository from "./repositories/ListsRepository";

class ListsService {
  static createList(list) {
    return ListsRepository.createList(list);
  }

  static updateList(listId, listTitle, listDesc, listPrivacy) {
    return ListsRepository.updateList(listId, listTitle, listDesc, listPrivacy);
  }

  static getList(listId) {
    return ListsRepository.getList(listId);
  }

  static getListItems(listId, info = false) {
    return ListsRepository.getListItems(listId, info);
  }

  static getListPermissions(listId) {
    return ListsRepository.getListPermissions(listId);
  }

  static getListNotifications(listId) {
    return ListsRepository.getListNotifications(listId);
  }

  static getPublicLists() {
    return ListsRepository.getPublicLists();
  }

  static getOwnedLists() {
    return ListsRepository.getOwnedLists();
  }

  static getSharedLists() {
    return ListsRepository.getSharedLists();
  }

  static getFavoriteLists() {
    return ListsRepository.getFavoriteLists();
  }

  static setListAsFavorite(listId) {
    return ListsRepository.setListAsFavorite(listId);
  }

  static deleteFavorite(listId) {
    return ListsRepository.deleteFavorite(listId);
  }

  static getItemListStatus(listId, itemId) {
    return ListsRepository.getItemListStatus(listId, itemId);
  }

  static addItemToList(listId, itemId) {
    return ListsRepository.addItemToList(listId, itemId);
  }

  static setItemListStatus(listId, itemId, isCheck) {
    return ListsRepository.setItemListStatus(listId, itemId, isCheck);
  }

  static deleteItemFromList(listId, itemId) {
    return ListsRepository.deleteItemFromList(listId, itemId);
  }

  static getListColaborators(listId) {
    return ListsRepository.getListColaborators(listId);
  }

  static giveAccessToUsers(listId, request) {
    return ListsRepository.giveAccessToUsers(listId, request);
  } 

  static revokeAccessToUser(listId, userId) {
    return ListsRepository.revokeAccessToUser(listId, userId);
  }

  static getPendingUserInvites(listId) {
    return ListsRepository.getPendingUserInvites(listId);
  }
}

export default ListsService;
