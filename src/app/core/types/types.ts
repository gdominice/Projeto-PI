// GRUPO 1 — ACERVO (Itens da Locadora)
export interface ItemAcervo {
  id: string;
  titulo: string;
  plataforma: string;
  tipoItem: string;
  anoLancamento: string;
  condicao: string;
  status: string;
}

// GRUPO 2 — GESTÃO DE CLIENTES
export interface Cliente {
  id: string;
  nomeCompleto: string;
  telefone: string;
  pontosXP: string;
  ranking: string;
  itemAlugado: string;
  dataDevolucao: string;
}

