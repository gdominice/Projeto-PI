import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ListarProdutosComponent } from './pages/produtos/listar/listar.component';
import { AdicionarProdutoComponent } from './pages/produtos/adicionar/adicionar.component';
import { BuscarProdutoComponent } from './pages/produtos/buscar/buscar.component';
import { EditarProdutoComponent } from './pages/produtos/editar/editar.component';
import { RemoverProdutoComponent } from './pages/produtos/remover/remover.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ListarClientesComponent } from './pages/clientes/listar/listar.component';
import { BuscarClienteComponent } from './pages/clientes/buscar/buscar.component';
import { AdicionarClienteComponent } from './pages/clientes/adicionar/adicionar.component';
import { RemoverClienteComponent } from './pages/clientes/remover/remover.component';
import { EditarClienteComponent } from './pages/clientes/editar-cliente/editar-cliente.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard - Retro Game Store' },
  { path: 'produtos', component: ProdutosComponent, title: 'Produtos - Retro Game Store', children: [
    { path: '', redirectTo: 'listar', pathMatch: 'full' },
    { path: 'listar', component: ListarProdutosComponent, title: 'Listar Produtos' },
    { path: 'buscar', component: BuscarProdutoComponent, title: 'Buscar Produto' },
    { path: 'adicionar', component: AdicionarProdutoComponent, title: 'Adicionar Produto' },
    { path: 'editar/:id', component: EditarProdutoComponent, title: 'Editar Produto' },
    { path: 'remover', component: RemoverProdutoComponent, title: 'Remover Produto' }
  ]},
  { path: 'clientes', component: ClientesComponent, title: 'Clientes - Retro Game Store', children: [
    { path: '', redirectTo: 'listar', pathMatch: 'full' },
    { path: 'listar', component: ListarClientesComponent, title: 'Listar Clientes' },
    { path: 'buscar', component: BuscarClienteComponent, title: 'Buscar Cliente' },
    { path: 'adicionar', component: AdicionarClienteComponent, title: 'Adicionar Cliente' },
    { path: 'editar/:id', component: EditarClienteComponent, title: 'Editar Cliente' },
    { path: 'remover', component: RemoverClienteComponent, title: 'Remover Cliente' }
  ]},
  { path: '**', redirectTo: 'dashboard' }
];
