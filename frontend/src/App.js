// Importações principais do React e Axios para requisições HTTP
import React, { useState, useEffect } from "react";
import axios from "axios";

// Componente principal da aplicação de lista de tarefas
function App() {
  // Estados para manipulação dos dados das tarefas e formulários
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("NOT_STARTED");
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editStatus, setEditStatus] = useState("NOT_STARTED");
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  // Carrega as tarefas ao iniciar a aplicação
  useEffect(() => {
    fetchTasks();
  }, []);

  // Função para buscar todas as tarefas no backend
  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:8080/api/tasks");
    setTasks(response.data);
  };

  // Busca tarefa específica pelo ID digitado
  const handleSearch = async () => {
    if (!searchId) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/tasks/${searchId}`
      );
      setSearchResult(response.data);
    } catch (error) {
      setSearchResult(null);
      alert("Tarefa não encontrada!");
    }
  };

  // Envia nova tarefa para o backend e limpa o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/tasks", {
      title,
      description,
      status,
    });
    fetchTasks();
    setTitle("");
    setDescription("");
    setStatus("NOT_STARTED");
  };

  // Seleciona tarefa para mostrar detalhes
  const handleView = (task) => {
    setSelectedTask(task);
  };

  // Exclui tarefa pelo ID
  const handleDelete = async (taskId) => {
    await axios.delete(`http://localhost:8080/api/tasks/${taskId}`);
    fetchTasks();
  };

  // Atualiza status da tarefa selecionada
  const handleUpdateStatus = async (taskId) => {
    await axios.put(
      `http://localhost:8080/api/tasks/${taskId}/status`,
      { status: editStatus },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    fetchTasks();
    setEditTaskId(null);
    setEditStatus("NOT_STARTED");
  };

  // Renderização da interface
  return (
    <div className="container mx-auto p-4">
      {/* Título principal */}
      <h1 className="text-2xl font-bold mb-4">Lista de Tarefas</h1>

      {/* Seção de busca por ID */}
      <div className="mb-4">
        <h1>
          <strong>Buscar Tarefa por ID</strong>
        </h1>
        <input
          type="number"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Buscar por ID"
          className="border p-2 mr-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
          Buscar
        </button>
      </div>

      {/* Exibe resultado da busca em formato de card */}
      {searchResult && (
        <div className="mb-6 flex justify-center">
          <div className="bg-white border-l-4 border-purple-500 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-purple-700 mb-4 text-center">
              Resultado da Busca
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-gray-700">ID:</span> {searchResult.id}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Título:</span> {searchResult.title}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Descrição:</span> {searchResult.description}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Status:</span>{" "}
                {searchResult.status === "NOT_STARTED"
                  ? "NÃO INICIADO"
                  : searchResult.status === "IN_PROGRESS"
                  ? "EM ANDAMENTO"
                  : "CONCLUÍDO"}
              </p>
            </div>
            <button
              onClick={() => setSearchResult(null)}
              className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Formulário para criar nova tarefa */}
      <h1>
        <strong>Criar tarefa</strong>
      </h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          className="border p-2 mr-2"
        />
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="NOT_STARTED">Não Iniciada</option>
          <option value="IN_PROGRESS">Em Andamento</option>
          <option value="COMPLETED">Concluída</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Adicionar Tarefa
        </button>
      </form>

      {/* Tabela de tarefas cadastradas */}
      <table className="min-w-full bg-white rounded-lg shadow mb-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">Título</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
            <th className="py-2 px-4 border-b text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <React.Fragment key={task.id}>
              <tr className="hover:bg-black-50 transition">
                <td className="py-2 px-4 border-b">{task.id}</td>
                <td className="py-2 px-4 border-b">{task.title}</td>
                <td className="py-2 px-4 border-b">
                  {task.status === "NOT_STARTED"
                    ? "NÃO INICIADO"
                    : task.status === "IN_PROGRESS"
                    ? "EM ANDAMENTO"
                    : "CONCLUÍDO"}
                </td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button
                    onClick={() =>
                      setSelectedTask(
                        selectedTask && selectedTask.id === task.id
                          ? null
                          : task
                      )
                    }
                    style={{ minWidth: "130px" }}
                    className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded"
                  >
                    {selectedTask && selectedTask.id === task.id
                      ? "Fechar Detalhes"
                      : "Ver Detalhes"}
                  </button>
                  <button
                    onClick={() => {
                      setEditTaskId(task.id);
                      setEditStatus(task.status);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded"
                  >
                    Editar Status
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
              {/* Detalhes da tarefa em formato de acordeon */}
              {selectedTask && selectedTask.id === task.id && (
                <tr>
                  <td colSpan={4} className="p-0 bg-purple-50 border-b">
                    <div className="w-full p-4 rounded-b-lg shadow-inner">
                      <h3 className="font-bold text-purple-700 mb-2">Detalhes da Tarefa</h3>
                      <p>
                        <strong>ID:</strong> {selectedTask.id}
                      </p>
                      <p>
                        <strong>Título:</strong> {selectedTask.title}
                      </p>
                      <p>
                        <strong>Descrição:</strong> {selectedTask.description}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        {selectedTask.status === "NOT_STARTED"
                          ? "NÃO INICIADO"
                          : selectedTask.status === "IN_PROGRESS"
                          ? "EM ANDAMENTO"
                          : "CONCLUÍDO"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Seção para atualizar status da tarefa */}
      {editTaskId && (
        <div className="pt-4 ">
          <h2>Atualizar Status</h2>
          <select
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
            className="border p-2 mr-2"
          >
            <option value="NOT_STARTED">Não Iniciada</option>
            <option value="IN_PROGRESS">Em Andamento</option>
            <option value="COMPLETED">Concluída</option>
          </select>
          <button
            onClick={() => handleUpdateStatus(editTaskId)}
            className="bg-blue-500 text-white p-2"
          >
            Salvar Status
          </button>
          <button
            onClick={() => {
              setEditTaskId(null);
              setEditStatus("NOT_STARTED");
            }}
            className="ml-2 bg-red-500 text-white p-1"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

export default App;