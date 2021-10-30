import ItemsRepository from './repositories/ItemsRepository';

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

  static searchItems(query, offset) {
    return ItemsRepository.searchItems(query, offset);
  }

  static getItemReviews(itemId, catalogProductId) {
    return ItemsRepository.getItemReviews(itemId, catalogProductId);
  }
}

export default ItemsService;
