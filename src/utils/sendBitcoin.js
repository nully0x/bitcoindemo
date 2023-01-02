"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var bitcoin = require("bitcoinjs-lib");
var ecc = require("tiny-secp256k1");
var ecpair_1 = require("ecpair");
var ECPair = (0, ecpair_1["default"])(ecc);
var network = bitcoin.networks.testnet;
//create a transaction with psbt with multiple outputs and a single input and sign it with the private key and return the transaction hex
var createTransaction = function () { return __awaiter(void 0, void 0, void 0, function () {
    var psbt, keyPair;
    return __generator(this, function (_a) {
        psbt = new bitcoin.Psbt({ network: network });
        psbt.addInput({
            hash: "b8f7e5e5d5e7c1f5b8d5b5f5b5f5b5f5b5f5b5f5b5f5b5f5b5f5b5f5b5f5b5f5",
            index: 0,
            witnessUtxo: {
                script: Buffer.from("0014f5b5f5b5f5b5f5b5f5b5f5b5f5b5f5b5f5b5f5b5", "hex"),
                value: 1000000
            }
        });
        psbt.addOutput({
            address: "tb1qtgm9mh3q293l875utx9a7sunewqf88esr0vss8",
            value: 100000
        });
        psbt.addOutput({
            address: "tb1qg9mh3q293l875utx9a7sunewqf88esr0vss8",
            value: 100000
        });
        psbt.addOutput({
            address: "tb1q9mh3q293l875utx9a7sunewqf88esr0vss8",
            value: 100000
        });
        keyPair = ECPair.fromPrivateKey(Buffer.from("b5f5b5f5b5f5b5f5b5f5b5f5b5f5b5f5b5f5b5f5b5f5b5f5b5f5b5f5b5f5b5f5", "hex"));
        psbt.signInput(0, keyPair);
        psbt.validateSignaturesOfInput(0);
        psbt.finalizeInput(0);
        return [2 /*return*/, psbt.extractTransaction().toHex()];
    });
}); };
console.log(createTransaction());
