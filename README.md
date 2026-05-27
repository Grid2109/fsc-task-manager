# FSC Task Manager

Aplicação web de gerenciamento de tarefas criada com React, Vite e React Query.

> Projeto em desenvolvimento no curso FSC; novas funcionalidades serão adicionadas conforme as aulas.

## Pré-visualização

Como o projeto ainda não está em deploy, abaixo estão capturas de tela da aplicação rodando localmente.

Lista de tarefas  
<img width="1898" height="916" alt="page-tasks-status-not_started" src="https://github.com/user-attachments/assets/52e1fa2c-3d49-4575-9014-33e84ed7773b" />
<img width="1873" height="904" alt="page-tasks-status-in_progress" src="https://github.com/user-attachments/assets/34692a38-0893-4d85-80a0-4cabd6e822b4" />
<img width="1887" height="883" alt="page-tsks-done" src="https://github.com/user-attachments/assets/08d08230-ba5c-4937-879f-ad5884642c25" />
<img width="1902" height="880" alt="add-task" src="https://github.com/user-attachments/assets/58fccfc4-8fcf-4825-becd-407b62c4cd21" />





Detalhes da tarefa 
<img width="1895" height="769" alt="task-details-page" src="https://github.com/user-attachments/assets/0945f19a-f7bd-488e-a6fb-387edc21de7c" />



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
