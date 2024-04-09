import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public gameLoopId!: number;

  public cancelGame(): void {
    cancelAnimationFrame(this.gameLoopId);
  }
}
