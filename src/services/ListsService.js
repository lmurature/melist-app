import ListsRepository from "./repositories/ListsRepository";

class ListsService {
  static createList(list) {
    return ListsRepository.createList(list);
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
}

export default ListsService;
