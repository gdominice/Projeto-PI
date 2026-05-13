import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientesService } from '../../../core/services/clientes.service';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../../core/types/types';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class EditarClienteComponent implements OnInit {
  form!: FormGroup;
  idCliente!: string;
  erroBusca: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: ClientesService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }],
      nomeCompleto: [''],
      telefone: [''],
      pontosXP: [''],
      ranking: [''],
      itemAlugado: [''],
      dataDevolucao: ['']
    });

    // Busca ID da URL
    const idDaUrl = this.route.snapshot.paramMap.get('id');
    if (idDaUrl) {
      this.idCliente = idDaUrl;
      this.buscarCliente();
    }
  }

  buscarCliente(): void {
    this.erroBusca = '';
    if (this.idCliente !== '') {
      this.service.buscarPorId(this.idCliente).subscribe({
        next: (dados: Cliente | undefined) => {
          if (dados) {
            this.form.patchValue(dados);
          } else {
            this.erroBusca = 'Cliente não encontrado.';
          }
        },
        error: () => {
          this.erroBusca = 'Cliente não encontrado. Verifique o ID.';
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/clientes']);
  }

  onSubmit() {
    const clienteAtualizado: Cliente = {
      ...this.form.getRawValue(),
      id: this.idCliente
    };
    this.service.editar(clienteAtualizado).subscribe(() => {
      this.router.navigate(['/clientes']);
    });
  }
}
