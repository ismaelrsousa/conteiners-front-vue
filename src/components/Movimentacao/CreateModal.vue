<template>
  <div class="modal-container">
    <div class="ui modal tiny">
      <i class="close icon" @click="hideModal"></i>
      <div class="header">Cadastrar Movimentação</div>

      <div class="content">
        <div class="description">
          <p>Preencha com os dados da movimentação a ser cadastrada.</p>

          <div class="ui small message red" v-if="message">
            <p>Erro ao cadastrar a movimentação, verifique os dados e tente novamente</p>
          </div>

          <form class="ui form" id="form" @submit="createMovimentacao">
            <div class="field">
              <div class="field">
                <label>Número do Conteiner:</label>
                <select name="conteinerId" class="ui dropdown">
                  <option value="">Selecione</option>
                  <option v-for="conteiner in conteiners" :value="conteiner.id" :key="conteiner.id">{{ conteiner.numeroConteiner }}</option>
                </select>
              </div>

              <label>Tipo:</label>
              <select name="tipo" class="ui dropdown" required>
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

            <div class="fields two">
              <div class="field">
                <label>Data inicio:</label>
                <input name="inicio" type="datetime-local">
              </div>

              <div class="field">
                <label>Data Fim:</label>
                <input name="fim" type="datetime-local">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="actions">
        <div class="ui button basic" @click="hideModal">Cancelar</div>

        <div class="ui button primary" @click="createMovimentacao">Cadastrar</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { api_url } from '../../main.js';

export default {
  name: 'CreateModal',
  props: [
    'conteiners'
  ],

  data() {
    return {
      message: false,
      required: false,
    }
  },

  methods: {
    hideModal: () => {
      document.getElementById("createModal").classList.remove('active');
    },

    createMovimentacao: function() {
      let inputs = document.getElementById("form").elements;

      let conteiner = this.conteiners.filter((c) => {
        return c['id'].toString().includes(inputs.conteinerId.value);
      });

      let movimentacao = {
        tipo: inputs.tipo.value,
        conteinerId: inputs.conteinerId.value,
        inicio: inputs.inicio.value,
        fim: inputs.fim.value,
      }

      axios.post(
        `${api_url}/movimentacao`,
        movimentacao
      ).then((res) => {
        let code = res.data.statusCode;

        movimentacao.conteiner = conteiner[0];

        if(code == 400) {
          this.message = true;
        }

        else if(code == 200) {
          this.message = false;
          this.hideModal();
          this.$emit('successMessage',
            {
              message: "Movimentação cadastrada com sucesso",
              type: 'create',
              movimentacao,
          });
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