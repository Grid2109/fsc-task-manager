# FSC Task Manager

Aplicação web de gerenciamento de tarefas criada com React, Vite e React Query.

> Projeto em desenvolvimento no curso FSC; novas funcionalidades serão adicionadas conforme as aulas.

## Pré-visualização

Como o projeto ainda não está em deploy, abaixo estão capturas de tela da aplicação rodando localmente.

| Lista de tarefas | Detalhes da tarefa |
| --- | --- |
| ![Lista de tarefas](./docs/screenshots/lista.png) | ![Detalhes da tarefa](./docs/screenshots/detalhes.png) |

Salve as imagens em `docs/screenshots/` com os nomes `lista.png` e `detalhes.png`.

## Funcionalidades atuais

- Listagem de tarefas
- Criação de tarefas
- Edição de tarefa por página de detalhes
- Exclusão de tarefa
- Atualização de cache com React Query para feedback mais rápido na UI
- Validação de formulário com React Hook Form

## Tecnologias

- React
- Vite
- React Router DOM
- React Query (`@tanstack/react-query`)
- React Hook Form
- Tailwind CSS
- Sonner (toasts)
- JSON Server (API fake)

## Como rodar o projeto

### 1) Instalar dependências

```bash
npm install
```

### 2) Rodar a API fake (JSON Server)

Em um terminal separado:

```bash
npx json-server db.json --port 3000
```

### 3) Rodar o frontend

Em outro terminal:

```bash
npm run dev
```

Abra no navegador o endereço mostrado pelo Vite (geralmente `http://localhost:5173`).

## Scripts disponíveis

- `npm run dev`: inicia o ambiente de desenvolvimento
- `npm run build`: gera o build de produção
- `npm run preview`: visualiza localmente o build de produção
- `npm run lint`: executa o ESLint

## Estrutura base do projeto

- `src/components`: componentes reutilizáveis
- `src/pages`: páginas da aplicação
- `src/assets`: ícones e recursos estáticos
- `docs/screenshots`: capturas de tela para o README
- `db.json`: base de dados local usada pelo JSON Server
