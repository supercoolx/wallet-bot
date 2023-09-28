const { Web3 } = require('web3');
require('dotenv').config();

const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`);
const start = '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709';
const iterater = Array(10).fill(0);

const main = async () => {
    let i = 0, cond = true, keys, addresses, promises, balances;
    while (cond) {
        keys = iterater.map(() => web3.utils.randomHex(32));
        addresses = keys.map((key) => web3.eth.accounts.privateKeyToAccount(key).address);
        promises = addresses.map((add) => web3.eth.getBalance(add));
        balances = await Promise.all(promises);
        balances = balances.map((bal) => parseFloat(web3.utils.fromWei(bal, 'ether')));
        addresses.forEach((_, key) => console.log(++i, '\t', addresses[key], '\t', balances[key]));
        balances.forEach((_, key) => {
            if (balances[key] == 0) return;
            cond = false;
            console.log('------------------------------------------------');
            console.log(addresses[key], '\t', balances[key]);
        });
    }
}

main();