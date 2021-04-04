import {Injectable} from '@angular/core';

@Injectable()
export class ServerValidationFormService {
  private serverValidationErrors: object = {};
  private duration = 2000;
  private error: object = {serverValidationError: true};

  isServerValidationError(formControlName: string): boolean {
    return this.serverValidationErrors.hasOwnProperty(formControlName);
  }
  getServerValidationError(formControlName: string): string {
    return this.serverValidationErrors[formControlName][0];
  }
  setServerValidationErrors(error: object): void {
    this.serverValidationErrors = error;
  }
  setValidationErrorsToForm(formGroupControls, error: object | null): void {
    for (const key in formGroupControls) {
      if (this.serverValidationErrors.hasOwnProperty(key)) {
        formGroupControls[key].setErrors(error);
      }
    }
  }
  removeServerValidationErrors(formGroupControls): void {
    this.setValidationErrorsToForm(formGroupControls, null);
    this.serverValidationErrors = {};
  }
  showErrors(error: object, formGroupControls, duration?: number): void {
    this.setServerValidationErrors(error);
    this.setValidationErrorsToForm(formGroupControls, this.error);
    setTimeout(() =>
      this.removeServerValidationErrors(formGroupControls),
    duration || this.duration
    );
  }
}
