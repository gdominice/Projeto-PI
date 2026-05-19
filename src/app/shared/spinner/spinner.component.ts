import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: '<div class="retro-spinner"><div class="spinner-block"></div></div>',
  styles: [`
    .retro-spinner {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px;
    }
    .spinner-block {
      width: 24px;
      height: 24px;
      background: var(--neon-blue);
      box-shadow: 0 0 20px var(--neon-blue);
      animation: spin-block 0.8s steps(4) infinite;
    }
    @keyframes spin-block {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class SpinnerComponent {}
