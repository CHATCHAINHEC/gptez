import { TempleWallet } from '@temple-wallet/dapp';
TempleWallet.isAvailable()
  .then(() => {
    const mywallet = new TempleWallet('MyAwesomeDapp');
    mywallet
      .connect('ghostnet')
      .then(() => {
        Tezos.setWalletProvider(mywallet);
        return mywallet.getPKH();
      })
      .then((pkh) => {
        println(`Your address: ${pkh}`);
      });
  })
  .catch((err) => console.log(err));