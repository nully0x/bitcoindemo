const bitcoin = require("bitcoinjs-lib");
import BIP32Factory from 'bip32';
import * as ecc from "tiny-secp256k1";
import * as bip39 from 'bip39';
import ECPairFactory from "ecpair";

const ECPair = ECPairFactory(ecc);
const bip32 = BIP32Factory(ecc);

//create a new wallet to store the private key, address, mnemonic, password, wif and support for bech32 using network mainnet
const createWallet = () => {
    const network = bitcoin.networks.testnet;
    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed, network);
    const child = root.derivePath("m/44'/0'/0'/0/0");
    const keyPair = ECPair.fromPrivateKey(child.privateKey);
    const { address } = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network });
    const wif = keyPair.toWIF();
    return {
        mnemonic,
        address,
        wif,
        privateKey: child.privateKey.toString('hex'),
        }
};

console.log(createWallet());

//nex



