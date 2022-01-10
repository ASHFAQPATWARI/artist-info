import { TOKEN_KEY } from "../config/constants";

class StorageClass {
  private _storage = window.localStorage;

  getToken = () => {
    try {
      const token = this._storage.getItem(TOKEN_KEY);
      if (token != null) {
        return token;
      }
      return null;
    } catch (error) {
      console.log("Storage get: Failed to get token from local storage", error);
      return null;
    }
  };

  setToken = (token: string) => {
    try {
      this._storage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.log("Storage get: Failed to set data in local storage", error);
    }
  };

  removeToken = () => {
    this._storage.removeItem(TOKEN_KEY);
  };
}

const Storage = new StorageClass();
Object.freeze(Storage);
export default Storage;
