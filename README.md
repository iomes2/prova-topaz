# To-Do List - Prova de Validação de Conhecimento

## Descrição

Aplicação web de lista de tarefas (To-Do List) com backend em Java (Spring Boot) e frontend em React. Permite criar, visualizar, buscar, atualizar o status e excluir tarefas.

---

## Tecnologias Utilizadas

- **Backend:** Java 17, Spring Boot, Maven, PostgreSQL
- **Frontend:** React, Axios, TailwindCSS (opcional)
- **Containerização:** Docker e Docker Compose

---

## Como Executar

### Pré-requisitos

- [Docker](https://www.docker.com/products/docker-desktop) instalado

### Passos

1. Clone o repositório:
   ```sh
   git clone https://github.com/iomes2/prova-topaz
   cd prova-topaz
   ```

2. Suba os containers:
   ```sh
   docker-compose up --build
   ```

3. Acesse:
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend (API):** [http://localhost:8080/api/tasks](http://localhost:8080/api/tasks)

---

## Endpoints da API

| Método | Rota                        | Descrição                        | Corpo/Requisição                |
|--------|-----------------------------|----------------------------------|---------------------------------|
| POST   | `/api/tasks`                | Criar nova tarefa                | `{ "title": "...", "description": "...", "status": "NOT_STARTED" }` |
| GET    | `/api/tasks`                | Listar todas as tarefas          | -                               |
| GET    | `/api/tasks/{id}`           | Buscar tarefa por ID             | -                               |
| PUT    | `/api/tasks/{id}/status`    | Atualizar status da tarefa       | `{ "status": "IN_PROGRESS" }`   |
| DELETE | `/api/tasks/{id}`           | Excluir tarefa                   | -                               |

**Status possíveis:**  
- `NOT_STARTED` (Não Iniciada)
- `IN_PROGRESS` (Em Andamento)
- `COMPLETED` (Concluída)

---

## Exemplo de Requisição

**Criar tarefa**
```json
POST /api/tasks
{
  "title": "Estudar Spring Boot",
  "description": "Ler documentação oficial",
  "status": "NOT_STARTED"
}
```

**Atualizar status**
```json
PUT /api/tasks/1/status
{
  "status": "COMPLETED"
}
```

---

## Observações

- O projeto utiliza Docker Compose para orquestrar backend, frontend e banco de dados.
- O frontend consome a API REST do backend.
- O código está comentado e organizado por camadas.

---
