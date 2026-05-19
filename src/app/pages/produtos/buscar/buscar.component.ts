import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AcervoService } from '../../../core/services/acervo.service';
import { ItemAcervo } from '../../../core/types/types';

@Component({
  selector: 'app-buscar-produto',
  standalone: true,
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
  imports: [CommonModule, FormsModule],
})
export class BuscarProdutoComponent {
  idBusca: string = '';
  ItemEncontrado: ItemAcervo | null = null;
  erroBusca: string = '';

  constructor(private service: AcervoService) { }

  buscarItem(): void {
    this.erroBusca = '';
    this.ItemEncontrado = null;

    if (this.idBusca !== '') {
      this.service.buscarPorId(this.idBusca).subscribe({
        next: (res) => {
          if (res) {
            this.ItemEncontrado = res;
          } else {
            this.erroBusca = 'Produto não encontrado.';
          }
        },
        error: () => {
          this.erroBusca = 'Erro ao buscar produto. Verifique a conexão com o banco.';
        }
      });
    }
  }
}
