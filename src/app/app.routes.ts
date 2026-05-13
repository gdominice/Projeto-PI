import { Routes } from '@angular/router'; 
import { AdicionarItemComponent } from './pages/adicionarItem/adicionarItem.component'; 
import { BuscarItemComponent } from './pages/buscarItem/buscarItem.component'; 
import { EditarComponent } from './pages/editar/editar.component'; 
import { RemoverItemComponent } from './pages/removerItem/removerItem.component'; 
import { AcervoComponent } from './pages/acervo/acervo.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ListarClientesComponent } from './pages/clientes/listar/listar.component';
import { BuscarClienteComponent } from './pages/clientes/buscar/buscar.component';
import { AdicionarClienteComponent } from './pages/clientes/adicionar/adicionar.component';
import { RemoverClienteComponent } from './pages/clientes/remover/remover.component';
import { EditarClienteComponent } from './pages/clientes/editar-cliente/editar-cliente.component';


export const routes: Routes = [
  { path: '', component: AcervoComponent },
  { path: 'adicionar-item', component: AdicionarItemComponent, title:'Adicionar Item' },
  { path: 'buscar-item', component: BuscarItemComponent },
  { path: 'alterar', component: EditarComponent },
  { path: 'alterar/:id', component: EditarComponent },
  { path: 'remover-item', component: RemoverItemComponent },
  { path: 'acervo', component: AcervoComponent },
  { path: 'clientes', component: ClientesComponent, children: [
    { path: '', redirectTo: 'listar', pathMatch: 'full' },
    { path: 'listar', component: ListarClientesComponent, title:'Listar Clientes' },
    { path: 'buscar', component: BuscarClienteComponent, title:'Buscar Cliente' },
    { path: 'adicionar', component: AdicionarClienteComponent, title:'Adicionar Cliente' },
    { path: 'editar/:id', component: EditarClienteComponent, title:'Editar Cliente' },
    { path: 'remover', component: RemoverClienteComponent, title:'Remover Cliente' }
  ]},
  { path: '**', redirectTo: 'buscar-item' }  // se clicar em link quebrado, abra o componente buscar
];
