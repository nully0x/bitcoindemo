"use strict";
exports.__esModule = true;
var bitcoin = require("bitcoinjs-lib");
var bip32_1 = require("bip32");
var ecc = require("tiny-secp256k1");
var bip39 = require("bip39");
var ecpair_1 = require("ecpair");
var ECPair = (0, ecpair_1["default"])(ecc);
var bip32 = (0, bip32_1["default"])(ecc);
//create a new wallet to store the private key, address, mnemonic, password, wif and support for bech32 using network mainnet
var createWallet = function () {
    var network = bitcoin.networks.testnet;
    var mnemonic = bip39.generateMnemonic();
    var seed = bip39.mnemonicToSeedSync(mnemonic);
    var root = bip32.fromSeed(seed, network);
    var child = root.derivePath("m/44'/0'/0'/0/0");
    var keyPair = ECPair.fromPrivateKey(child.privateKey);
    var address = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: network }).address;
    var wif = keyPair.toWIF();
    return {
        mnemonic: mnemonic,
        address: address,
        wif: wif,
        privateKey: child.privateKey.toString('hex')
    };
};
console.log(createWallet());
