import { Injectable } from '@angular/core';

export interface ActivityLog {
  timestamp: Date;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'system';
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private logs: ActivityLog[] = [];
  private maxLogs = 100;

  getLogs(): ActivityLog[] {
    return [...this.logs];
  }

  getRecentLogs(count = 15): ActivityLog[] {
    return this.logs.slice(-count).reverse();
  }

  log(message: string, type: ActivityLog['type'] = 'info', icon = '•') {
    this.logs.push({ timestamp: new Date(), message, type, icon });
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  info(msg: string) { this.log(msg, 'info', 'ℹ'); }
  success(msg: string) { this.log(msg, 'success', '✔'); }
  warning(msg: string) { this.log(msg, 'warning', '⚠'); }
  error(msg: string) { this.log(msg, 'error', '✖'); }
  system(msg: string) { this.log(msg, 'system', '⚙'); }

  fakeSystemBoot() {
    this.system('Sistema inicializado...');
    this.system('Carregando módulo de gerenciamento...');
    this.system('Conectando ao banco de dados...');
    this.success('Banco de dados conectado');
    this.system('Sincronizando acervo...');
    this.success('Sistema pronto — modo operacional');
  }
}
