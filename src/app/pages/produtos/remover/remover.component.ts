import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AcervoService } from '../../../core/services/acervo.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-remover-produto',
  standalone: true,
  templateUrl: './remover.component.html',
  styleUrls: ['./remover.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class RemoverProdutoComponent {
  idExcluir: string = '';
  erroMensagem: string = '';
  private toastService = inject(ToastService);

  constructor(
    private service: AcervoService,
    private router: Router
  ) { }

  removerItem(): void {
    this.erroMensagem = '';
    if (this.idExcluir) {
      this.service.excluir(this.idExcluir).subscribe({
        next: () => {
          this.toastService.success('Produto removido com sucesso!');
          this.router.navigate(['../listar']);
        },
        error: () => this.erroMensagem = 'Erro ao excluir. Verifique se o ID está correto.'
      });
    }
  }
}
