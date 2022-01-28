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
          <th>Número do Conteiner</th>
          <th>Cliente</th>
          <th>Categoria</th>
          <th>Tipo</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <button class="ui icon basic button" @click="showEditModal">
              <i class="icon pencil alternate"></i>
            </button>

            <button class="ui icon basic button" @click="showDelete">
              <i class="icon trash red"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <CreateModal id="createModal"/>
    <EditModal id="editModal"/>
    
  </div>
</template>

<script>

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

      message: false,
      messageText: ""
    }
  },

  mounted: function() {
    this.fillList();
  },

  methods: {
    fillList: function() {
      
    },

    showCreateModal: function() {
      document.getElementById("createModal").classList.add("active");
    },

    showEditModal: function() {
      document.getElementById("editModal").classList.add("active");
    },

    showDelete: function() {
      confirm("Tem certeza que deseja deletar esse registro?");
    },

    showMessage: function(data) {
      this.message = true;
      this.messageText = data.message;
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