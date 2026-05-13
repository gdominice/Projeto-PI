import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from '../../../core/types/types';
import { ClientesService } from '../../../core/services/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adicionar-cliente',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './adicionar.component.html',
  styleUrl: './adicionar.component.css'
})
export class AdicionarClienteComponent {
  titulo = 'Cadastrar Cliente';
  
  cliente: Cliente = {
    id: '',
    nomeCompleto: '',
    telefone: '',
    pontosXP: '',
    ranking: '',
    itemAlugado: '',
    dataDevolucao: ''
  };

  constructor(
    private service: ClientesService,
    public router: Router
  ) { }

  submeter() {
    console.log('Dados sendo enviados:', this.cliente);

    this.service.incluir(this.cliente).subscribe({
      next: () => {
        this.router.navigate(['../listar']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar:', err);
        alert('Erro! Verifique se esse ID já existe no banco.');
      }
    });
  }
}
