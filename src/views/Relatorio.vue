<template>
  <div class="ui container conteiners">
    <div class="ui grid">
      <div class="two column row">
        <div class="column">
          <h2 class="ui header">Relatório</h2>
        </div>
      </div>

      <div class="two column row">
        <div class="column">
          <h3 class="ui header">Agrupado por clientes:</h3>

          <table class="table ui celled">
            <thead>
              <tr>
                <th>Cliente</th>
                <th style="width: 200px">Qtde. de Movimentações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente in clientes" :key="cliente[0]">
                <td>{{ cliente[0] }}</td>
                <td>{{ cliente[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="column">
          <h3 class="ui header">Agrupado por tipo:</h3>

          <table class="table ui celled">
            <thead>
              <tr>
                <th>Tipo</th>
                <th style="width: 200px">Qtde. de Movimentações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tipo in tipos" :key="tipo[0]">
                <td>{{ tipo[0] }}</td>
                <td>{{ tipo[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="two column row">
        <div class="column" v-for="item in data" :key="item[0]">
          <p class="ui header">Total de {{ item[0] }}: {{ item[1] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { api_url } from '../main.js';

export default {
  name: 'Relatorio',

  data() {
    return {
      clientes: [],
      tipos: [],
      data: [],
    }
  },

  mounted: function() {
    this.fill();
  },

  methods: {
    fill: function() {
      axios.get(`${api_url}/relatorio/cliente`)
        .then((res) => {
          let clientes = res.data;
          this.clientes = clientes;
      });

      axios.get(`${api_url}/relatorio/tipo`)
        .then((res) => {
          let tipos = res.data;
          this.tipos = tipos;
      });

      axios.get(`${api_url}/relatorio/importacao-exportacao`)
        .then((res) => {
          let importacao = res.data;

          this.data = importacao;
      });
    }
  }
}
</script>