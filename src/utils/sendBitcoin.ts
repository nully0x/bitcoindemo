import { payments, networks, Psbt } from 'bitcoinjs-lib';
import * as ecc from "tiny-secp256k1";
import ECPairFactory from "ecpair";

const ECPair = ECPairFactory(ecc);

const network = bitcoin.networks.testnet;

