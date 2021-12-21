<template>
  <div>test web worker</div>
</template>

<script>

export default {
  name: 'App',
  created () {
    try {
      const wallet = require("@swtc/wallet").Factory({guomi: true})
      console.log(wallet.generate())

      console.log(wallet.isValidSecret("snWmmCRCnAckD9D5sJApvBnpPskh3"))
      console.log(wallet.isValidAddress("jwsn4igtyMik5Me78tJ67LXkPAgd5eifxU"))
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
