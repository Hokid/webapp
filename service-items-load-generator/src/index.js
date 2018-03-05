const defaults = { fetchCount: 5, limitCached: 5 };

export default class ItemsLoadGenerator {
  constructor (Api, options) {
    this.options = Object.assign(defaults, options);
    this.Api = new Api();
  }

  async next () {
    let end = false, items = [];

    if (this.cached().length < this.options.limitCached) {
      items = await this.Api.fetchItems(this.options.fetchCount);

      if (!Array.isArray(items)) {
        throw new TypeError('result must by an array');
      }

      end = items.length < this.options.fetchCount;

      if (items.length > 0) {
        this.Api.cacheItems(items);
      }
    }

    return {
      items,
      end
    };
  }

  cached () {
    return this.Api.getCachedItems();
  }

  has() {
    return this.getCachedItems().length !== 0;
  }
}
