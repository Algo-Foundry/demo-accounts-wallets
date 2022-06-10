const algosdk = require("algosdk");

const kmdtoken = process.env.KMD_TOKEN;
const kmdserver = process.env.KMD_SERVER;
const kmdport = process.env.KMD_PORT;

const kmdclient = new algosdk.Kmd(kmdtoken, kmdserver, kmdport);

const recoverAccount = async (wallet_mnemonic, new_wallet_name, new_wallet_pw) => {
    console.log("Recovering account from wallet mnemonic...");

    // use master derivation key to regenerate wallet
    const masterDerivationKey = await algosdk.mnemonicToMasterDerivationKey(wallet_mnemonic);

    const walletid = (await kmdclient.createWallet(new_wallet_name, new_wallet_pw, masterDerivationKey)).wallet.id;
    const wallethandle = (await kmdclient.initWalletHandle(walletid, new_wallet_pw)).wallet_handle_token;
    const account = (await kmdclient.generateKey(wallethandle)).address;
    console.log("Recovered account: ", account);

    return account;
};

(async () => {
    // replace wallet mnemonic from kmd create
    const walletMnemonic = "cement either turtle globe advice vivid bomb bottom salon embark century fluid cream expose trap casino bracket usage ostrich keen auction author rather absent print";
    
    // you can't have 2 wallets of the same name in the sandbox
    const newWalletName = process.env.KMD_WALLET_NAME + "-rec0";
    const newWalletPassword = process.env.KMD_WALLET_PASSWORD;

    // this should print the address of the wallet account created in kmd create
    await recoverAccount(walletMnemonic, newWalletName, newWalletPassword);
})();
