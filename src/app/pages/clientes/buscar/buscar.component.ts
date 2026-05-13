import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../../core/types/types';
import { ClientesService } from '../../../core/services/clientes.service';

@Component({
  selector: 'app-buscar-cliente',
  standalone: true,
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
  imports: [CommonModule, FormsModule],
})
export class BuscarClienteComponent {
  idBusca: string = '';
  clienteEncontrado: Cliente | null = null;
  erroBusca: string = '';

  constructor(private service: ClientesService) {}

  buscarCliente(): void {
    this.erroBusca = '';
    this.clienteEncontrado = null;

    if (this.idBusca !== '') {
      this.service.buscarPorId(this.idBusca).subscribe({
        next: (res: Cliente | undefined) => {
          if (res) {
            this.clienteEncontrado = res;
          } else {
            this.erroBusca = 'Cliente não encontrado.';
          }
        },
        error: () => {
          this.erroBusca = 'Erro ao buscar cliente. Verifique a conexão com o banco.';
        }
      });
    }
  }
}
