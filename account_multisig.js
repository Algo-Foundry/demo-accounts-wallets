const algosdk = require("algosdk");

generateStandaloneAccount = () => {
  let account = algosdk.generateAccount();
  let passphrase = algosdk.secretKeyToMnemonic(account.sk);
  console.log("My address: " + account.addr);
  console.log("My passphrase: " + passphrase);

  return account;
};

main = async () => {
  let account1 = generateStandaloneAccount();
  let account2 = generateStandaloneAccount();
  let account3 = generateStandaloneAccount();

  //Setup the parameters for the multisig account
  const mparams = {
    version: 1,
    threshold: 2,
    addrs: [account1.addr, account2.addr, account3.addr],
  };

  let multsigaddr = algosdk.multisigAddress(mparams);
  console.log("Multisig Address: " + multsigaddr);
};

main();
