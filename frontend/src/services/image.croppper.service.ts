import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageCroppperService {
  private croppedImageSource = new BehaviorSubject<string>('');
  croppedImage$ = this.croppedImageSource.asObservable();

  constructor() { }

  sendCroppedImage(image: string) {
    this.croppedImageSource.next(image);
  }
}
