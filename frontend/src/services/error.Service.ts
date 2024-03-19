import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  private errorMessageSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public errorMessage$: Observable<string | null> = this.errorMessageSubject.asObservable();

  constructor() { }

  public displayError(errorMessage: string): void {
    this.errorMessageSubject.next(errorMessage);

    setTimeout(() => {
      this.clearError();
    }, 5000);
  }

  public clearError(): void {
    this.errorMessageSubject.next(null);
  }

  public base64Validator(control: FormControl): string | null {
    if (!control.value) {
      return 'Image data is required.';
    }

    if (!control.value.startsWith('data:image')) {
      return 'Invalid image format. Please provide a valid image.';
    }

    const maxLength = 5000000;
    if (control.value.length > maxLength) {
      return 'Maximum file size exceeded. Please upload a smaller image.';
    }

    return null;
  }

  public languageValidator(control: FormControl): string | null {
    const validLanguages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Danish', 'Polish'];
    const selectedLanguage = control.value;

    if (!validLanguages.includes(selectedLanguage)) {
      return 'Please select a valid language.';
    }

    return null;
  }

  public getErrorMessage(controlName: string, errorName: string): string | null {
    switch (errorName) {
      case 'required':
        return 'Image is required. Please provide a image.';
      case 'invalidImageFormat':
        return 'Invalid image format. Please provide a valid image.';
      case 'maxLengthExceeded':
        return 'Maximum file size exceeded. Please upload a smaller image.';
      case 'invalidLanguage':
        return 'Please select a valid language.';
      default:
        return null;
    }
  }
}
