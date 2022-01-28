<template>
  <div class="ui container">
    <div class="ui three big item menu">
      <router-link to="/" class="item">
        Conteiner
      </router-link>

      <router-link to="/movimentacao" class="item">
        Movimentação
      </router-link>

      <router-link to="/relatorio" class="item">
        Relatório
      </router-link>
    </div>
  </div>
  <router-view/>
</template>