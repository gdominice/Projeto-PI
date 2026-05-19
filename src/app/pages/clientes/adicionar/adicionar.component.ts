import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from '../../../core/types/types';
import { ClientesService } from '../../../core/services/clientes.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-adicionar-cliente',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './adicionar.component.html',
  styleUrl: './adicionar.component.css'
})
export class AdicionarClienteComponent {
  titulo = 'Cadastrar Cliente';
  private toastService = inject(ToastService);

  cliente: Cliente = {
    id: '', nomeCompleto: '', telefone: '',
    pontosXP: '', ranking: '', itemAlugado: '', dataDevolucao: ''
  };

  constructor(
    private service: ClientesService,
    public router: Router
  ) { }

  submeter() {
    this.service.incluir(this.cliente).subscribe({
      next: () => {
        this.toastService.success('Cliente cadastrado com sucesso!');
        this.router.navigate(['../listar']);
      },
      error: () => {
        this.toastService.error('Erro ao cadastrar. Verifique se o ID já existe.');
      }
    });
  }
}
