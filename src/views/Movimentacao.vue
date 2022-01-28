<template>
  <div class="ui container">
    <div class="ui grid">
      <div class="two column row">
        <div class="column">
          <h2 class="title">Movimentações</h2>
        </div>

        <div class="column">
          <button class="button right floated primary ui" @click="showCreateModal">Cadastrar Movimentação</button>
        </div>
      </div>
    </div>

    <div class="ui small message info" v-if="message">
      <div><p>{{ messageText }}</p></div>
      <i class="close icon"></i>
    </div>

    <form action="" class="ui form" @submit="filter">
      <div class="ui grid">
        <div class="five column row">
          <div class="column">
            <div class="field">
              <label>Tipo:</label>
              <select class="ui dropdown">
                <option value="">Selecione</option>
                <option value="Embarque">Embarque</option>
                <option value="Descarga">Descarga</option>
                <option value="Gate in">Gate in</option>
                <option value="Gate out">Gate out</option>
                <option value="Reposicionamento">Reposicionamento</option>
                <option value="Pesagem">Pesagem</option>
                <option value="Scanner">Scanner</option>
              </select>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label>Data início:</label>
              <input type="datetime-local">
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label>Data Fim:</label>
              <input type="datetime-local">
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label>Conteiner:</label>
              <select class="ui dropdown">
                <option value="">Selecione</option>
                <option v-for="conteiner in conteiners" :value="conteiner.id" :key="conteiner.id">{{ conteiner.numeroConteiner }}</option>
              </select>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label>Cliente:</label>
              <input type="text">
            </div>
          </div>
        </div>

        <div class="one column row">
          <div class="column">
            <button class="button ui right floated green">Buscar</button>
          </div>
        </div>
      </div>
    </form>

    <table class="table striped ui celled">
      <thead>
        <tr>
          <th>Número do Conteiner</th>
          <th>Tipo</th>
          <th>Data inicio</th>
          <th>Data fim</th>
          <th>Cliente</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="movimentacao in movimentacoes" :key="movimentacao.id">
          <td>{{ movimentacao.conteiner.numeroConteiner }}</td>
          <td>{{ movimentacao.tipo }}</td>
          <td>{{ movimentacao.inicio }}</td>
          <td>{{ movimentacao.fim }}</td>
          <td>{{ movimentacao.conteiner.cliente }}</td>
          <td>
            <button class="ui icon basic button" @click="showEditModal(movimentacao.id)">
              <i class="icon pencil alternate"></i>
            </button>

            <button class="ui icon basic button" @click="showDelete(movimentacao.id)">
              <i class="icon trash red"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <CreateModal @successMessage="showMessage" id="createModal"/>
    <EditModal @successMessage="showMessage" :PropMovimentacao="editMovimentacao" :conteiners="conteiners" id="editModal"/>
    
  </div>
</template>

<script>
import axios from 'axios';
import { api_url } from "../main";

import CreateModal from '../components/Movimentacao/CreateModal';
import EditModal from '../components/Movimentacao/EditModal';

export default {
  name: 'Home',
  components: {
    CreateModal,
    EditModal
  },

  data() {
    return {
      movimentacoes: [],
      conteiners: [],
      filteredMovimentacoes: [],

      ordered: null,
      filtered: false,
      asc: false,

      editMovimentacao: {
        conteiner: {
          id: 0
        }
      },

      message: false,
      messageText: "",

      searchMovimentacao: {
        numeroConteiner: "",
        cliente: "",
        categoria: "",
        tipo: "",
        status: "",
      }
    }
  },

  mounted: function() {
    this.fillList();
  },

  methods: {
    fillList: function() {
      axios.get(`${api_url}/movimentacao`)
        .then((res) => {
          this.movimentacoes = res.data;
        })

      axios.get(`${api_url}/conteiner`)
        .then((res) => {
          this.conteiners = res.data;
        })
    },

    showCreateModal: function() {
      document.getElementById("createModal").classList.add("active");
    },

    showEditModal: function(id) {
      document.getElementById("editModal").classList.add("active");
      this.message = false;

      this.editMovimentacao = this.movimentacoes.filter((data) => { return data.id == id; })[0];
    },

    showDelete: function(id) {
      let result = confirm("Tem certeza que deseja deletar esse registro?");
      this.message = false;

      if(result) {
        axios.delete(
          `${api_url}/movimentacao/${id}`,
        ).then((res) => {
          let code = res.data.statusCode;

          if(code == 400)
            alert("Não foi possível deletear esse registro, tente novamente")

          else if(code == 200) {
            this.message = true;
            this.messageText = "Registro deletado com sucesso!";

            let index = this.movimentacoes.findIndex((find) => { return find.id == id; });
            this.movimentacoes.splice(index, 1);
          }
        });
      }
    },

    showMessage: function (data) {
      this.message = true;
      this.messageText = data.message;

      if(data.type == "create") this.movimentacoes.unshift(data.movimentacao);

      else if(data.type == "edit") {
        let index = this.movimentacoes.findIndex((find) => { return find.id == data.movimentacao.id; });
        this.movimentacoes[index] = data.movimentacao;
      }
    },
  }
}
</script>

<style>
.table th {
  cursor: pointer !important;
}

.container {
  padding-bottom: 4rem;
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .3);
  display: none;
}

.modal-container.active {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container.active .modal {
  display: block;
}
</style>