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
              <tr>
                <td></td>
                <td></td>
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
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="two column row">
        <div class="column">
          <p class="ui header">Total de Importação: 0</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Relatorio',

  data() {
    return {
      
    }
  },

  mounted: function() {
    
  },

  methods: {
    fill: function() {
      
    }
  }
}
</script>