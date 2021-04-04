import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private duration = 3000;

  constructor(
    private matSnackBar: MatSnackBar,
    private translateService: TranslateService
  ) { }

  protected showMatSnackBar(message: string, panelClass: string, duration?: number, shouldTranslate?: boolean): void {
    if (shouldTranslate) {
      this.translateService.get(message).subscribe((translation) => {
        this.matSnackBar.open(translation, '', {panelClass: [panelClass], duration: duration || this.duration});
      });
    } else {
      this.matSnackBar.open(message, '', {panelClass: [panelClass], duration: duration || this.duration});
    }
  }
  error(message: string, duration?: number, shouldTranslate?: boolean): void {
    this.showMatSnackBar(message, 'error', duration, shouldTranslate);
  }
  warn(message: string, duration?: number, shouldTranslate?: boolean): void {
    this.showMatSnackBar(message, 'warn', duration, shouldTranslate);
  }
  success(message: string, duration?: number, shouldTranslate?: boolean): void {
    this.showMatSnackBar(message, 'success', duration, shouldTranslate);
  }
}
