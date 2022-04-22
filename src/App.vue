<template>
  <div>test web worker</div>
</template>

<script>
// import { NFTDao } from "@jccdex/ethereum-contract";
// import Web3 from "web3";
import  NFTTransaction from "@jccdex/nft-cross-chain-protocol";

export default {
  name: "App",
  mounted() {
    console.log(NFTTransaction)
  },
  created() {
    try {
      // const options = {
      //   account: "0xb5e35844189B30B766f6CB0A2Fa5b146225B9B1D",
      //   chainId: 256,
      //   web3: new Web3(new Web3.providers.HttpProvider("http://localhost:8545")),
      //   nftDaoContract: "0xd5F63547b8DF32C33e9be230911b9Ada78D33616",
      //   multicallAddress: "0x2aB24613Ddc1F33C82E97a86C1D48bF515cCB650"
      // };
      // const nftDao = new NFTDao(options);
      // console.log(nftDao)


      const nftTransaction = new NFTTransaction("jsAhWLCakwvxxKw1Fn2KewnQyKxmZDT6Jj", [""]);

      console.log(nftTransaction)
    } catch (error) {
      console.log(error);
    }
  }
};
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
