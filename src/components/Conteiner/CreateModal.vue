<template>
  <div class="modal-container">
    <div class="ui modal tiny">
      <i class="close icon" @click="hideModal"></i>

      <div class="header">Cadastrar Conteiner</div>

      <div class="content">
        <div class="description">
          <p>Preencha com os dados do conteiner a ser cadastrado.</p>

          <div class="ui small message red" v-if="message">
            <p>Erro ao cadastrar o conteiner, verifique os dados e tente novamente</p>
          </div>

          <form class="ui form" id="form" @submit="createConteiner">
            <div class="field">
              <label>Cliente:</label>
              <input type="text" name="cliente" placeholder="Ex: Gustavo Silva" required>
            </div>

            <div class="field">
              <label>Número do Conteiner:</label>
              <input maxlength="11" type="text" name="numero" placeholder="XXXX0000000" required>
            </div>

            <div class="fields two">
              <div class="field">
                <label>Tipo:</label>
                <select name="tipo" class="ui dropdown" required>
                  <option value="">Selecione</option>
                  <option value="20">20</option>
                  <option value="40">40</option>
                </select>
              </div>

              <div class="field">
                <label>Status:</label>
                <select name="status" class="ui dropdown" required>
                  <option value="">Selecione</option>
                  <option value="0">Vazio</option>
                  <option value="1">Cheio</option>
                </select>
              </div>
            </div>

            <div class="field">
              <label>Categoria:</label>
              <select name="categoria" class="ui dropdown" required>
                <option value="">Selecione</option>
                <option value="Importação">Importação</option>
                <option value="Exportação">Exportação</option>
              </select>
            </div>
          </form>
        </div>
      </div>
      <div class="actions">
        <div class="ui button basic" @click="hideModal">Cancelar</div>

        <div class="ui button primary" @click="createConteiner">Cadastrar</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { api_url } from '../../main';

export default {
  name: 'CreateModal',
  components: {
    
  },

  data() {
    return {
      message: false
    }
  },

  mounted: function() {
    
  },

  methods: {
    hideModal: () => {
      document.getElementById("createModal").classList.remove('active');
    },

    createConteiner: function() {
      let inputs = document.getElementById("form").elements;

      let conteiner = {
        cliente: inputs.cliente.value,
        numeroConteiner: inputs.numero.value,
        tipo: inputs.tipo.value,
        status: inputs.status.value,
        categoria: inputs.categoria.value,
      };

      axios.post(
        `${api_url}/conteiner`,
        conteiner
      ).then((res) => {
        let code = res.data.statusCode;

        if(code == 400)
          this.message = true;

        else if(code == 200) {
          this.message = false;
          this.hideModal();
          this.$emit('successMessage',
            {
              message: "Conteiner cadastrado com sucesso!",
              type: "create",
              conteiner
            }
          )
        }
      });
    }
  }
}
</script>

<style>
.conteiners > .title {
  padding: 4rem 0 0rem;
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

.modal-container .modal > .close {
  right: 1rem;
  top: 1rem;
  color: #CCC;
}
</style>