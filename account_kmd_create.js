const algosdk = require("algosdk");

const kmdtoken = process.env.KMD_TOKEN;
const kmdserver = process.env.KMD_SERVER;
const kmdport = process.env.KMD_PORT;

const kmdclient = new algosdk.Kmd(kmdtoken, kmdserver, kmdport);

const createWallet = async (wallet_name, wallet_password) => {
    console.log("Creating wallet...");

    // create wallet
    const walletid = (await kmdclient.createWallet(wallet_name, wallet_password, "", "sqlite")).wallet.id;
    const walletHandle = (await kmdclient.initWalletHandle(walletid, wallet_password)).wallet_handle_token;
    console.log("Wallet handle: ", walletHandle);

    return walletHandle;
};

const getWalletMnemonic = async (walletHandle, walletPassword) => {
    // export master derivation key
    masterDerivationKey = (await kmdclient.exportMasterDerivationKey(walletHandle, walletPassword)).master_derivation_key;

    walletMnemomic = algosdk.masterDerivationKeyToMnemonic(masterDerivationKey);
    console.log("Wallet mnmeomic:", walletMnemomic);

    return walletMnemomic;
};

const createAccount = async (walletHandle) => {
    console.log("Creating account...");

    const account = (await kmdclient.generateKey(walletHandle)).address;
    console.log("New account:", account);

    return account;
};

(async () => {
    const walletName = process.env.KMD_WALLET_NAME;
    const walletPassword = process.env.KMD_WALLET_PASSWORD;

    const walletHandle = await createWallet(walletName, walletPassword);
    const accountAddress = await createAccount(walletHandle);
    const walletMnemomic = await getWalletMnemonic(walletHandle, walletPassword);

    console.log("Save account address to export this account =)");
    console.log("Save wallet mnemonic to recover its accounts =)");
})();
