import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Lưu dữ liệu vào Local Storage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Lấy dữ liệu từ Local Storage
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Xóa dữ liệu từ Local Storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Xóa tất cả dữ liệu từ Local Storage
  clear(): void {
    localStorage.clear();
  }
}
