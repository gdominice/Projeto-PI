import { Injectable } from '@angular/core';

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  icon: string;
  unlocked: boolean;
}

export interface UserLevel {
  level: number;
  title: string;
  xpMin: number;
  xpMax: number;
}

const LEVELS: UserLevel[] = [
  { level: 1, title: 'INICIANTE', xpMin: 0, xpMax: 100 },
  { level: 2, title: 'JOGADOR', xpMin: 100, xpMax: 300 },
  { level: 3, title: 'GAMER', xpMin: 300, xpMax: 600 },
  { level: 4, title: 'VETERANO', xpMin: 600, xpMax: 1000 },
  { level: 5, title: 'LENDÁRIO', xpMin: 1000, xpMax: 2000 },
  { level: 6, title: 'MESTRE', xpMin: 2000, xpMax: 3500 },
  { level: 7, title: 'MITO', xpMin: 3500, xpMax: 99999 }
];

@Injectable({ providedIn: 'root' })
export class GamificationService {
  private totalXp = 0;

  achievements: Achievement[] = [
    { id: 'first_prod', name: 'PRIMEIRO ITEM', desc: 'Cadastre o primeiro produto', icon: '🎮', unlocked: false },
    { id: 'first_client', name: 'PRIMEIRO CLIENTE', desc: 'Cadastre o primeiro cliente', icon: '👤', unlocked: false },
    { id: 'five_prod', name: 'COLECIONADOR', desc: 'Cadastre 5 produtos no acervo', icon: '📚', unlocked: false },
    { id: 'five_client', name: 'REDE DE CONTATOS', desc: 'Cadastre 5 clientes', icon: '🤝', unlocked: false },
    { id: 'rent_first', name: 'PRIMEIRA LOCAÇÃO', desc: 'Registre a primeira locação', icon: '📦', unlocked: false },
    { id: 'vip_reach', name: 'MERO VIP', desc: 'Tenha um cliente VIP no sistema', icon: '⭐', unlocked: false },
    { id: 'level5', name: 'LENDÁRIO', desc: 'Atinga o nível 5', icon: '👑', unlocked: false },
  ];

  getTotalXp(): number { return this.totalXp; }

  addXp(amount: number) {
    this.totalXp += amount;
  }

  setXpFromClients(clientes: { pontosXP?: string }[]) {
    const xp = clientes.reduce((sum, c) => sum + (parseInt(c.pontosXP || '0')), 0);
    this.totalXp = Math.floor(xp * 0.1);
  }

  getLevel(): UserLevel {
    return LEVELS.find(l => this.totalXp >= l.xpMin && this.totalXp < l.xpMax) || LEVELS[0];
  }

  getXpInLevel(): number {
    const level = this.getLevel();
    return this.totalXp - level.xpMin;
  }

  getXpToNextLevel(): number {
    const level = this.getLevel();
    return level.xpMax - level.xpMin;
  }

  getXpPercent(): number {
    const level = this.getLevel();
    return ((this.totalXp - level.xpMin) / (level.xpMax - level.xpMin)) * 100;
  }

  getLevels(): UserLevel[] { return LEVELS; }

  getNextLevel(): UserLevel | null {
    const current = this.getLevel();
    const idx = LEVELS.indexOf(current);
    return idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null;
  }

  checkAchievements(prodCount: number, clientCount: number): Achievement[] {
    const updated: Achievement[] = [];
    const check = (id: string, condition: boolean) => {
      const a = this.achievements.find(x => x.id === id);
      if (a && !a.unlocked && condition) {
        a.unlocked = true;
        updated.push(a);
      }
    };
    check('first_prod', prodCount >= 1);
    check('first_client', clientCount >= 1);
    check('five_prod', prodCount >= 5);
    check('five_client', clientCount >= 5);
    check('vip_reach', clientCount > 0);
    check('level5', this.getLevel().level >= 5);
    return updated;
  }
}
