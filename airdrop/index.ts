import {PublicKey, Connection, LAMPORTS_PER_SOL} from "@solana/web3.js";

export const airdrop = async (addresss : string, amount : number) => {
    const publicKey = new PublicKey(addresss);
    const conn = new Connection("http://localhost:8899", "confirmed");
    const signature = await conn.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
    await conn.confirmTransaction(signature);
}

airdrop("3fTVWVBgm8yYh8XXd7qTBCBuLNP4nMKsCAgesHHCBnA5", 1);