import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  private _count: number = 0;
  private _msg: string;

  constructor() { }

  showBusy(msg: string): void {
    this._count++;
    this._msg = msg;
  }

  hideBusy(): void {
    if (this._count > 0)
      this._count--;
  }

  isVisible(): boolean {
    return this._count > 0;
  }

  getMsg(): string {
    return this._msg;
  }
}
