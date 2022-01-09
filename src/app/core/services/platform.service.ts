import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable()
export class PlatformService {
  constructor(private platform: Platform) {}

  isMobile() {
    return this.platform.is('hybrid');
  }

  isWeb() {
    return !this.isMobile();
  }
}
