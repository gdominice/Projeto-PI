import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemAcervo } from '../../core/types/types'; // Original: Jogador
import { AcervoService } from '../../core/services/acervo.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adicionar-item',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './adicionarItem.component.html',
  styleUrl: './adicionarItem.component.css'
})
export class AdicionarItemComponent {
  titulo = 'Cadastrar Item'; // Original: Cadastro de Jogos
  
  // MUDAR: Inicialize assim para garantir que os campos existam
    item: ItemAcervo = {
    id: '',
    titulo: '',
    plataforma: '',
    tipoItem: '',
    anoLancamento: '',
    condicao: '',
    status: ''
  };

  constructor(
    private service: AcervoService,
    private router: Router
  ) { }

  submeter() {
    // IMPORTANTE: Sincroniza o ID com a Matrícula
    // this.jogo.titulo = this.jogo.id; 

    // LOG PARA TESTE: Aperte F12 no navegador e veja se os dados aparecem no console
    console.log('Dados sendo enviados:', this.item);

    this.service.incluir(this.item).subscribe({
      next: () => {
        this.router.navigate(['/acervo']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar:', err);
        alert('Erro! Verifique se esse ID já existe no banco.');
      }
    });
  }
}

