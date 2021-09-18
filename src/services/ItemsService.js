import ItemsRepository from "./repositories/ItemsRepository";

class ItemsService {
  static getItem(itemId) {
    return ItemsRepository.getItem(itemId);
  }

  static getItemsHistory(itemId) {
    return ItemsRepository.getItemsHistory(itemId);
  }

  static getCategoryTrends(categoryId) {
    return ItemsRepository.getCategoryTrends(categoryId);
  }
}

export default ItemsService;
