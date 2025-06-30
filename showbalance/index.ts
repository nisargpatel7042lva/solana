import {Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
// import {airdrop} from "../airdrop";

export const showBalance = async (publicKey: PublicKey) => {
    const connection = new Connection("http://localhost:8899", "confirmed");
    const response = await connection.getAccountInfo(publicKey);
    if (!response) {
        return 0;
    }
    return response.lamports / LAMPORTS_PER_SOL;
}

// const main = async () => {
//     const publicKey = new PublicKey("3fTVWVBgm8yYh8XXd7qTBCBuLNP4nMKsCAgesHHCBnA5");
//     const balance = await showBalance(publicKey);
//     console.log(`Balance: ${balance} SOL`);
//     await airdrop(publicKey.toString(), 1);
//     const balance2 = await showBalance(publicKey);
//     console.log(`Balance after airdrop: ${balance2} SOL`);
// }

// main().catch(console.error);

