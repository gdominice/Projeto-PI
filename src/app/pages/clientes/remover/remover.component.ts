import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ClientesService } from '../../../core/services/clientes.service';

@Component({
  selector: 'app-remover-cliente',
  standalone: true,
  templateUrl: './remover.component.html',
  styleUrls: ['./remover.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class RemoverClienteComponent {
  idExcluir: string = '';
  mensagemSucesso: string = '';
  erroMensagem: string = '';

  constructor(
    private service: ClientesService,
    private router: Router
  ) { }

  removerCliente(): void {
    this.mensagemSucesso = '';
    this.erroMensagem = '';

    if (this.idExcluir !== '') {
      this.service.excluir(this.idExcluir).subscribe({
        next: () => {
          this.router.navigate(['../listar']);
        },
        error: () => {
          this.erroMensagem = `Erro ao excluir o cliente. Verifique se o ID está correto.`;
        }
      });
    }
  }
}
