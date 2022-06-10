const algosdk = require('algosdk');

(async () => {
    let account = algosdk.generateAccount();
    let passphrase = algosdk.secretKeyToMnemonic(account.sk);
    console.log( "My address: " + account.addr );
    console.log( "My passphrase: " + passphrase );
})().catch(e => {
    console.log(e);
});
