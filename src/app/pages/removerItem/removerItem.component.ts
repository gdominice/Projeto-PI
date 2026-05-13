import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; 
// NOME ORIGINAL: ClientesService | MUDAR: FuncionariosService
import { AcervoService } from '../../core/services/acervo.service'; 

@Component({
  selector: 'app-remover-item',
  standalone: true,
  templateUrl: './removerItem.component.html',
  styleUrls: ['./removerItem.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class RemoverItemComponent {
  // ORIGINAL: idExcluir: number | null = null;
  // MUDAR: Deixe como string para bater com o novo padrão de matrícula
  idExcluir: string = ''; 
  mensagemSucesso: string = '';
  erroMensagem: string = '';

  constructor(
    private service: AcervoService, 
    private router: Router   
  ) { }

  excluirItem(): void {
    this.mensagemSucesso = '';
    this.erroMensagem = '';

    if (this.idExcluir !== '') {
      this.service.excluir(this.idExcluir).subscribe({
        next: () => {
          this.router.navigate(['/acervo']); 
        },
        error: () => {
          this.erroMensagem = `Erro ao excluir o item. Verifique se o ID está correto.`;
        }
      });
    }
  }
}
