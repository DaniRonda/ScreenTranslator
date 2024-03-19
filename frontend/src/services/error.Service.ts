import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  constructor(private snackBar: MatSnackBar) {
  }
  showInvalidFormError(): void {
    this.snackBar.open('Invalid form. Please check your input.', 'Error', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: 'error-snackbar',

    });
  }

  showValidationError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: 'error-snackbar',
    });
  }

  public showSnackBar(message: string, panelClass: string, position?: SnackBarPosition): void {
    this.snackBar.open(message, panelClass, {
      duration: 5000,
      horizontalPosition: position?.horizontal || 'center',
      verticalPosition: position?.vertical || 'top',
    });
  }

}

interface SnackBarPosition {
  horizontal?: MatSnackBarHorizontalPosition;
  vertical?: MatSnackBarVerticalPosition;
}
