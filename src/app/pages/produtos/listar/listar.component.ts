import { Component, OnInit } from '@angular/core';
import { ItemAcervo } from '../../../core/types/types';
import { AcervoService } from '../../../core/services/acervo.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-produtos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarProdutosComponent implements OnInit {
  listaItens: ItemAcervo[] = [];

  constructor(private service: AcervoService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.service.listar().subscribe((dados) => {
      this.listaItens = dados;
    });
  }

  excluir(id: string) {
    if (id) {
      this.service.excluir(id).subscribe(() => {
        this.listaItens = this.listaItens.filter(f => f.id !== id);
      });
    }
  }
}
