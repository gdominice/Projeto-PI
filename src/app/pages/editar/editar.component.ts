import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AcervoService } from '../../core/services/acervo.service';
import { CommonModule } from '@angular/common';
import { ItemAcervo } from '../../core/types/types';

@Component({
  selector: 'app-editar',
  standalone: true,
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class EditarComponent implements OnInit {
  form!: FormGroup;
  idItem!: string;
  idBusca: string = '';         // ID digitado pelo usuário
  etapa: 'buscar' | 'editar' = 'buscar';  // controla qual tela mostrar
  erroBusca: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: AcervoService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }],
      titulo: [''],
      plataforma: [''],
      tipoItem: [''],
      anoLancamento: [''],
      condicao: [''],
      status: ['']
    });

    // Se vier com ID na URL (botão Editar da listagem), já pula direto pro formulário
    const idDaUrl = this.route.snapshot.paramMap.get('id');
    if (idDaUrl) {
      this.idBusca = idDaUrl;
      this.buscarItem();
    }
  }

  buscarItem(): void {
    this.erroBusca = '';
    if (this.idBusca !== '') {
      this.service.buscarPorId(this.idBusca).subscribe({
        next: (dados) => {
          if (dados) {
            this.idItem = this.idBusca;
            this.form.patchValue(dados);
            this.etapa = 'editar';  // mostra o formulário
          } else {
            this.erroBusca = 'Item não encontrado.';
          }
        },
        error: () => {
          this.erroBusca = 'Item não encontrado. Verifique o ID.';
        }
      });
    }
  }

  onSubmit() {
    const ItemAtualizado: ItemAcervo = {
      ...this.form.getRawValue(),
      id: this.idItem
    };
    this.service.editar(ItemAtualizado).subscribe(() => {
      this.router.navigate(['/acervo']);
    });
  }
}
