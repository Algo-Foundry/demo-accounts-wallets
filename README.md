# demo-accounts-wallets
Accounts and wallets demo

## Setup instructions
1. Install library packages
```
npm install
```

2. Create .env.example and rename it to .env

3. Run command to use the .env file in this demo
```
source .env
```

4. Run scripts
```
node account_kmd_create.js
node account_kmd_export.js
node account_kmd_import.js
node account_kmd_recover.js
node account_multisig.js
node account_standalone.js
```

## Notes
Remember to save the wallet address and mnemonic generated from `account_kmd_create.js` and replace the `accountAddress` in `account_kmd_export.js` and `walletMnemonic` in `account_kmd_recover.js` respectively before running the scripts. 
