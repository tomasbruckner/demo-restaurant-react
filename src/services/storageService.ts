export const USER_TOKEN_STORAGE_KEY = 'PORTAL_TOKEN';

class StorageService {
  static getStorage() {
    return localStorage;
  }

  static get(name: string) {
    return this.getStorage()[name] || null;
  }

  static getToken(): string | null {
    return StorageService.get(USER_TOKEN_STORAGE_KEY);
  }

  static setToken(token: string) {
    return StorageService.set(USER_TOKEN_STORAGE_KEY, token);
  }

  static set(name: string, item: string) {
    this.getStorage()[name] = item;
  }
}

export default StorageService;
