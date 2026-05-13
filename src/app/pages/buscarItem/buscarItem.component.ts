import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
// NOME ORIGINAL: ClientesService | MUDAR: FuncionariosService
import { AcervoService } from '../../core/services/acervo.service'; 
// NOME ORIGINAL: Cliente | MUDAR: Funcionario
import { ItemAcervo } from '../../core/types/types'; // Original: Jogador 

@Component({
  selector: 'app-buscar-item',
  standalone: true,
  templateUrl: './buscarItem.component.html',
  styleUrls: ['./buscarItem.component.css'],
  imports: [CommonModule, FormsModule],
})
export class BuscarItemComponent {
  // MUDAR: de 'number | null' para 'string'. 
  // Assim você pode buscar IDs que tenham letras (ex: A001).
  idBusca: string = ''; 
  
  // NOME ORIGINAL: clienteEncontrado | MUDAR: funcionarioEncontrado
  ItemEncontrado: ItemAcervo | null = null; 
  erroBusca: string = ''; 

  constructor(
    // NOME ORIGINAL: clientesService | MUDAR: acervoService
    private service: AcervoService 
  ) { }

  buscarItem(): void {
    this.erroBusca = '';
    this.ItemEncontrado = null;

    if (this.idBusca !== '') {
      this.service.buscarPorId(this.idBusca).subscribe({
        next: (res) => {
          if (res) {
            this.ItemEncontrado = res;
          } else {
            this.erroBusca = 'Item não encontrado.';
          }
        },
        error: () => {
          this.erroBusca = 'Erro ao buscar item. Verifique a conexão com o banco.';
        }
      });
    }
  }
}
