import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../core/types/types';
import { ClientesService } from '../../../core/services/clientes.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarClientesComponent implements OnInit {
  listaClientes: Cliente[] = [];

  constructor(private service: ClientesService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.service.listar().subscribe((dados) => {
      this.listaClientes = dados;
    }); 
  }

  excluir(id: string) {
    if (id) {
      this.service.excluir(id).subscribe(() => {
        this.listaClientes = this.listaClientes.filter(c => c.id !== id);
      });
    }
  }

  xpPercent(xp: string | undefined): number {
    const val = parseInt(xp || '0');
    return Math.min((val / 1000) * 100, 100);
  }
}
