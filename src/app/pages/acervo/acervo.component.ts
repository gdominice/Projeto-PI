import { Component, OnInit } from '@angular/core';
import { ItemAcervo } from '../../core/types/types'; // ORIGINAL: Jogador
import { AcervoService } from '../../core/services/acervo.service'; // ORIGINAL: ClientesService
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-acervo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './acervo.component.html',
  styleUrl: './acervo.component.css'
})
export class AcervoComponent implements OnInit {
  listaItens: ItemAcervo[] = []; // ORIGINAL: listaJogadores

  constructor(private service: AcervoService) {} // ORIGINAL: ClientesService

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.service.listar().subscribe((dados) => {
      this.listaItens = dados; // MUDAR: nome da variável
    }); 
  }

 excluir(id: string) { // MUDAR: Garanta que aqui é string
  if (id) {
    this.service.excluir(id).subscribe(() => {
      // O filtro também precisa comparar string com string
      this.listaItens = this.listaItens.filter(f => f.id !== id);
    });
  }
}
}
