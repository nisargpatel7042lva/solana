import {PublicKey, Connection, Transaction, SystemProgram, LAMPORTS_PER_SOL, Keypair} from "@solana/web3.js";
import { showBalance } from "../showbalance";
import { airdrop } from "../airdrop";

export const transferSol = async (from: Keypair, to: PublicKey, amount: number) => {
    const connection = new Connection("http://localhost:8899", "confirmed")
    const transaction = new Transaction();

    const instruction = SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: LAMPORTS_PER_SOL * amount
    });
    
    transaction.add(instruction);
    const signature = await connection.sendTransaction(transaction, [from]);
    await connection.confirmTransaction(signature);
    console.log("Transfer completed successfully!");
    console.log(`Transaction signature: ${signature}`);
}

// Generate a new keypair for testing (DO NOT use in production)
const fromKeyPair = Keypair.generate();
const toPublicKey = new PublicKey("3fTVWVBgm8yYh8XXd7qTBCBuLNP4nMKsCAgesHHCBnA5");

(async() => {
    try {
        console.log("Starting SOL transfer demo...");
        console.log(`From wallet public key: ${fromKeyPair.publicKey.toString()}`);
        console.log(`To wallet public key: ${toPublicKey.toString()}`);
        
        // Airdrop some SOL to the sender wallet
        console.log("Requesting airdrop...");
        await airdrop(fromKeyPair.publicKey, 4);
        
        const initBalance = await showBalance(fromKeyPair.publicKey);
        console.log(`Initial Balance of from wallet: ${initBalance} SOL`);
        const initBalanceTo = await showBalance(toPublicKey);
        console.log(`Initial Balance of to wallet: ${initBalanceTo} SOL`);

        // Perform the transfer
        console.log("Performing transfer...");
        await transferSol(fromKeyPair, toPublicKey, 2);
        
        const finalBalance = await showBalance(fromKeyPair.publicKey);
        console.log(`Final Balance of from wallet: ${finalBalance} SOL`);
        const finalBalanceTo = await showBalance(toPublicKey);
        console.log(`Final Balance of to wallet: ${finalBalanceTo} SOL`);
        
        console.log("Demo completed successfully!");
    } catch (error) {
        console.error("Error during transfer:", error);
    }
})()    