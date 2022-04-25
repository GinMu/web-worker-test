<template>
  <div>test web worker</div>
</template>

<script>
import { NFTDao } from "@jccdex/ethereum-contract";
import {Token721} from "@jccdex/ethereum-contract/lib/@uniswap/sdk"
export default {
  name: "App",
  async created() {
    try {
      // ropsten测试网络
      const nftDaoContract = "0x514a7dF3c3e2971287F6e25057E75EBA46f456cb";
      const nft721 = "0x3bF035eB9F89bF70BB9E42f980407Cf0BD76f732";

      const account = "0x8550784f95c48890564Ed5c2505A266Ee10c4388";

      // @ignore
      const options = {
        account,
        chainId: 3,
        web3: window.web3,
        nftDaoContract,
        multicallAddress: "0x53c43764255c17bd724f74c4ef150724ac50a3ed"
      };
      const nftDao = new NFTDao(options);
      console.log(nftDao)
       
      const erc721 = nftDao.initERC721(new Token721(3, nft721))
      console.log(erc721)


      const symbol = await erc721.symbol()

      console.log("721 symbol: ", symbol)

      const total = await erc721.totalSupply();
      console.log("721发行总量:", total)


      const allTokens = await erc721.allTokens( total
      );

      console.log("所有721 token: ", allTokens)

      const balance = await erc721.balanceOf(account);

      console.log( "0x8550784f95c48890564Ed5c2505A266Ee10c4388拥有721数量:", balance)

      const allMyTokens = await erc721.allTokensOfOwner(account, balance);

      console.log("0x8550784f95c48890564Ed5c2505A266Ee10c4388 拥有的721:", allMyTokens)

      const approved = await erc721.isApprovedForAll(account, nftDaoContract);

      console.log("是否全部授权给nft dao合约:", approved)
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
