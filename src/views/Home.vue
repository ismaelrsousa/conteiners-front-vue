<template>
  <div class="ui container">
    <div class="ui grid">
      <div class="two column row">
        <div class="column">
          <h2 class="title">Conteiners</h2>
        </div>

        <div class="column">
          <button class="button right floated primary ui" @click="showCreateModal">Cadastrar Conteiner</button>
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
              <label>Número do Conteiner:</label>
              <input type="text" name="numeroConteiner" maxlength="11" placeholder="XXXX0000000">
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label>Cliente:</label>
              <input type="text" name="cliente" placeholder="Ex: Gustavo Silva">
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label>Categoria:</label>
              <select name="categoria" class="ui dropdown">
                <option value="">Selecione</option>
                <option value="Importação">Importação</option>
                <option value="Exportação">Exportação</option>
              </select>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label>Tipo:</label>
              <select name="tipo" class="ui dropdown">
                <option value="">Selecione</option>
                <option value="20">20</option>
                <option value="40">40</option>
              </select>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label>Status:</label>
              <select name="status" class="ui dropdown">
                <option value="">Selecione</option>
                <option value="0">Vazio</option>
                <option value="1">Cheio</option>
              </select>
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
          <th @click="order('numeroConteiner')">
            Número do Conteiner
            <i v-show="ordered == 'numeroConteiner' && asc" class="sort down icon"></i>
            <i v-show="ordered == 'numeroConteiner' && !asc" class="sort up icon"></i>
          </th>

          <th @click="order('cliente')">
            Cliente
            <i v-show="ordered == 'cliente' && asc" class="sort down icon"></i>
            <i v-show="ordered == 'cliente' && !asc" class="sort up icon"></i>
          </th>

          <th @click="order('categoria')">
            Categoria
            <i v-show="ordered == 'categoria' && asc" class="sort down icon"></i>
            <i v-show="ordered == 'categoria' && !asc" class="sort up icon"></i>
          </th>

          <th @click="order('tipo')">
            Tipo
            <i v-show="ordered == 'tipo' && asc" class="sort down icon"></i>
            <i v-show="ordered == 'tipo' && !asc" class="sort up icon"></i>
          </th>

          <th @click="order('status')">
            Status
            <i v-show="ordered == 'status' && asc" class="sort down icon"></i>
            <i v-show="ordered == 'status' && !asc" class="sort up icon"></i>
          </th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="conteiner in (filtered? filteredConteiners : conteiners)" :key="conteiner.id">
          <td>{{ conteiner.numeroConteiner }}</td>
          <td>{{ conteiner.cliente }}</td>
          <td>{{ conteiner.categoria }}</td>
          <td>{{ conteiner.tipo }}</td>
          <td>{{ conteiner.status == 1 ? 'Cheio' : 'Vazio' }}</td>
          <td>
            <button class="ui icon basic button" @click="showEditModal(conteiner.id)">
              <i class="icon pencil alternate"></i>
            </button>

            <button class="ui icon basic button" @click="showDelete(conteiner.id)">
              <i class="icon trash red"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <CreateModal @successMessage="showMessage" id="createModal"/>
    <EditModal @successMessage="showMessage" :PropConteiner="editConteiner" id="editModal"/>
    
  </div>
</template>

<script>
import axios from 'axios';
import { api_url } from "../main";

import CreateModal from '../components/Conteiner/CreateModal';
import EditModal from '../components/Conteiner/EditModal';

export default {
  name: 'Home',
  components: {
    CreateModal,
    EditModal
  },

  data() {
    return {
      conteiners: [],
      filteredConteiners: [],

      ordered: null,
      asc: false,

      editConteiner: {},

      message: false,
      messageText: ""
    }
  },

  mounted: function() {
    this.fillList();
  },

  methods: {
    fillList: function() {
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

      this.editConteiner = this.conteiners.filter((data) => { return data.id == id; })[0];
    },

    showDelete: function(id) {
      let result = confirm("Tem certeza que deseja deletar esse registro?");

      this.message = false;

      if(result) {
        axios.delete(
          `${api_url}/conteiner/${id}`,
        ).then((res) => {
          let code = res.data.statusCode;

          if(code == 400)
            alert("Não foi possível deletear esse registro, tente novamente")

          else if(code == 200) {
            this.message = true;
            this.messageText = "Registro deletado com sucesso!";

            let index = this.conteiners.findIndex((find) => { return find.id == id; });
            this.conteiners.splice(index, 1);
          }
        });
      }
    },

    showMessage: function(data) {
      this.message = true;
      this.messageText = data.message;

      if(data.type == "create") this.conteiners.unshift(data.conteiner);

      else if(data.type == "edit") {
        let index = this.conteiners.findIndex((find) => { return find.id == data.conteiner.id; })
        this.conteiners[index] = data.conteiner;
      }
    },

    order: function(slug) {
      if(this.ordered == slug && this.asc) {
        this.conteiners.sort(function(a, b) {
          return b[slug].toString().localeCompare(a[slug]);
        });

        this.filteredConteiners.sort(function(a, b) {
          return b[slug].toString().localeCompare(a[slug]);
        });

        this.asc = false;
      }
      else {
        this.conteiners.sort(function(a, b) {
          return a[slug].toString().localeCompare(b[slug]);
        });

        this.filteredConteiners.sort(function(a, b) {
          return a[slug].toString().localeCompare(b[slug]);
        });
        
        this.asc = true;
      }

      this.ordered = slug;
    }
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