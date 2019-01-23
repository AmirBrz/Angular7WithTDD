import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable()
export class StorageService {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    setStorage(name: string, value: string) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(name, value);
        }
    }

    getStorageValue(name: string): string {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(name);
        }
    }

    removeStorage(name: string) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(name);
        }
    }

    clearAllStorage() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.clear();
        }
    }

}
