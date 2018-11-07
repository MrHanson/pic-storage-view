class LocalStorage {
  constructor() {
    this.storage = window.localStorage;
  }

  setter(key, val) {
    this.storage.setItem(key, JSON.stringify(val));
  }

  getter(key) {
    return JSON.parse(this.storage.getItem(key));
  }
}

export default new LocalStorage();
