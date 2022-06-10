const algosdk = require("algosdk");

const kmdtoken = process.env.KMD_TOKEN;
const kmdserver = process.env.KMD_SERVER;
const kmdport = process.env.KMD_PORT;

const kmdclient = new algosdk.Kmd(kmdtoken, kmdserver, kmdport);

const getWalletHandle = async (wallet_name, wallet_password) => {
    let wallets = (await kmdclient.listWallets()).wallets;
    const wallet = wallets.find((item) => {
        return item.name === wallet_name;
    });

    const wallethandle = (await kmdclient.initWalletHandle(wallet.id, wallet_password)).wallet_handle_token;

    return wallethandle;
};

const importAccount = async (wallet_handle, account_mnemonic) => {
    const account = algosdk.mnemonicToSecretKey(account_mnemonic);
    let importedAccount = await kmdclient.importKey(wallet_handle, account.sk);
    console.log("Account successfully imported: ", importedAccount.address);

    return importedAccount;
};

(async () => {
    const walletName = process.env.KMD_WALLET_NAME;
    const walletPassword = process.env.KMD_WALLET_PASSWORD;
    const walletHandle = await getWalletHandle(walletName, walletPassword);

    /**
     * Keep in mind that an imported account can not be recovered/derived from the wallet-level mnemonic.
     * You must always keep track of the account-level mnemonics that you import into kmd wallets.
     */

    // create a standalone account
    let account = algosdk.generateAccount();
    let accountMnemonic = algosdk.secretKeyToMnemonic(account.sk);
    console.log("Importing account: ", account.addr);
    console.log("Account mnemonic: ", accountMnemonic);

    await importAccount(walletHandle, accountMnemonic);
})();
