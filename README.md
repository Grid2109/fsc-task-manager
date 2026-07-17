# FSC Task Manager

Aplicação web de gerenciamento de tarefas criada com React, Vite e React Query.

> Projeto desenvolvido no curso FSC; novas funcionalidades serão adicionadas conforme as aulas.

## Acesso online

**Deploy:** [https://fsc-task-manager-nine.vercel.app](https://fsc-task-manager-nine.vercel.app)

Este projeto consome a [API do Task Manager](https://github.com/Grid2109/fsc-task-manager-api), desenvolvida separadamente e disponível em produção em [https://fsc-task-manager-api-nine.vercel.app](https://fsc-task-manager-api-nine.vercel.app).

## Pré-visualização

A aplicação está disponível online no link acima. Abaixo estão capturas de tela da aplicação.

### Dashboard

Página inicial com cards de resumo, lista de tarefas e mensagem motivacional.

### Lista de tarefas

<img width="1898" height="916" alt="page-tasks-status-not_started" src="https://github.com/user-attachments/assets/52e1fa2c-3d49-4575-9014-33e84ed7773b" />
<img width="1873" height="904" alt="page-tasks-status-in_progress" src="https://github.com/user-attachments/assets/34692a38-0893-4d85-80a0-4cabd6e822b4" />
<img width="1887" height="883" alt="page-tsks-done" src="https://github.com/user-attachments/assets/08d08230-ba5c-4937-879f-ad5884642c25" />
<img width="1902" height="880" alt="add-task" src="https://github.com/user-attachments/assets/58fccfc4-8fcf-4825-becd-407b62c4cd21" />

### Detalhes da tarefa

<img width="1895" height="769" alt="task-details-page" src="https://github.com/user-attachments/assets/0945f19a-f7bd-488e-a6fb-387edc21de7c" />

## Funcionalidades atuais

- Dashboard com cards de resumo (total, não iniciadas, em andamento e concluídas)
- Resumo de tarefas na página inicial com atualização de status direto na lista
- Página dedicada de tarefas com separação por status
- Criação de tarefas
- Edição de tarefa por página de detalhes
- Exclusão de tarefa
- Atualização de status da tarefa via API
- Navegação com sidebar e destaque da rota ativa
- Atualização de cache com React Query para feedback mais rápido na UI
- Validação de formulário com React Hook Form

## Tecnologias

- React
- Vite
- React Router DOM
- React Query (`@tanstack/react-query`)
- React Hook Form
- Axios
- Tailwind CSS
- Sonner (toasts)
- JSON Server (API fake)
- Vercel (deploy)

## Qualidade de código

- **ESLint** — padronização e detecção de erros no código
- **Prettier** — formatação automática
- **Husky** — hooks de Git (ex: rodar lint antes de commit)
- **lint-staged** — roda lint apenas nos arquivos alterados no commit
- **commitlint** — valida se as mensagens de commit seguem o padrão Conventional Commits

## Como rodar o projeto

### 1) Instalar dependências

```bash
npm install
```

### 2) Configurar variáveis de ambiente

O projeto usa a variável `VITE_API_URL` para apontar para a API. Em desenvolvimento, o arquivo `.env.development` já vem configurado:

```
VITE_API_URL=http://localhost:3000
```

### 3) Rodar a API fake (JSON Server)

Em um terminal separado:

```bash
npx json-server db.json --port 3000
```

### 4) Rodar o frontend

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
- `src/pages`: páginas da aplicação (Dashboard, Tarefas, Detalhes)
- `src/hooks/data`: hooks de React Query para operações com tarefas
- `src/lib`: configuração do Axios
- `src/keys`: chaves de queries e mutations do React Query
- `src/assets`: ícones e recursos estáticos
- `db.json`: base de dados local usada pelo JSON Server
