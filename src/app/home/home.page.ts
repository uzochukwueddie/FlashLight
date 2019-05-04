import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  isLightOn = false;

  constructor(
    private flashLight: Flashlight,
    private platform: Platform,
    private alertController: AlertController
  ) { }

  lightOn() {
    this.isLightOn = !this.isLightOn;
    this.platform.ready().then(() => {
      if (this.flashLight.available()) {
        this.flashLight.switchOn();
      } else {
        this.showAlert();
      }
    });
  }

  lightOff() {
    this.isLightOn = !this.isLightOn;
    this.flashLight.switchOff();
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Flash light is not available',
      buttons: ['OK']
    });

    await alert.present();
  }

}
