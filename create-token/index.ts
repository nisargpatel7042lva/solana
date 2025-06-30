import {createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer, getMint} from "@solana/spl-token";
import { Keypair, Transaction, sendAndConfirmTransaction, PublicKey, Connection, clusterApiUrl} from "@solana/web3.js";
import {airdrop} from "../airdrop";

// Define the maximum supply for the token (e.g., 1 billion tokens)
const MAX_SUPPLY = 1000000000; // 1 billion tokens

const createTokenMint = async(mintWallet: Keypair) => {
    const connection = new Connection("http://localhost:8899", "confirmed");
    const mint = await createMint(
        connection,
        mintWallet,
        mintWallet.publicKey,
        null,
        8
    );
    return mint;
}

const getCurrentSupply = async (tokenMint: PublicKey) => {
    const connection = new Connection("http://localhost:8899", "confirmed");
    const mintInfo = await getMint(connection, tokenMint);
    return Number(mintInfo.supply);
}

const mintTokensWithCap = async (tokenMint: PublicKey, mintWallet: Keypair, amount: number) => {
    const connection = new Connection("http://localhost:8899", "confirmed");
    
    // Get current supply
    const currentSupply = await getCurrentSupply(tokenMint);
    console.log(`Current supply: ${currentSupply}`);
    console.log(`Maximum supply: ${MAX_SUPPLY}`);
    
    // Check if minting would exceed the cap
    if (currentSupply + amount > MAX_SUPPLY) {
        const remainingSupply = MAX_SUPPLY - currentSupply;
        console.log(`Cannot mint ${amount} tokens. Only ${remainingSupply} tokens can be minted before reaching the cap.`);
        return false;
    }
    
    // Get or create token account for mint wallet
    const mintTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        mintWallet,
        tokenMint,
        mintWallet.publicKey
    );
    
    // Mint tokens to the mint wallet's account
    await mintTo(
        connection,
        mintWallet,
        tokenMint,
        mintTokenAccount.address,
        mintWallet,
        amount
    );
    
    console.log(`Successfully minted ${amount} tokens. New total supply: ${currentSupply + amount}`);
    return true;
}

const transferTokens = async (tokenMint: PublicKey, mintWallet: Keypair, receiver: PublicKey, amount: number) => {
    const connection = new Connection("http://localhost:8899", "confirmed");
    
    // Get or create token account for mint wallet
    const mintTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        mintWallet,
        tokenMint,
        mintWallet.publicKey
    );
    
    // Get or create token account for receiver
    const receiverTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        mintWallet,
        tokenMint,
        receiver
    );
    
    console.log(`ReceiverTokenAccount address: ${receiverTokenAccount.address}`);
    
    // Transfer tokens
    await transfer(
        connection,
        mintWallet,
        mintTokenAccount.address,
        receiverTokenAccount.address,
        mintWallet,
        amount
    );
    
    console.log(`Successfully transferred ${amount} tokens to receiver`);
}

(async () => {
    try {
        console.log("Starting capped supply token creation demo...");
        console.log(`Token will have a maximum supply of ${MAX_SUPPLY} tokens`);
        
        const mintWallet = Keypair.generate();
        console.log(`Mint wallet public key: ${mintWallet.publicKey.toString()}`);
        
        await airdrop(mintWallet.publicKey, 2);
        const creatorTokenMint = await createTokenMint(mintWallet);
        
        console.log(`\n=== Token Mint Created ===`);
        console.log(`Creator Token Mint Address: ${creatorTokenMint.toString()}`);
        console.log(`Mint wallet address: ${mintWallet.publicKey.toString()}`);
        
        // Mint initial supply (e.g., 500 million tokens)
        const initialMintAmount = 500000000;
        console.log(`\n=== Minting Initial Supply ===`);
        const mintSuccess = await mintTokensWithCap(creatorTokenMint, mintWallet, initialMintAmount);
        
        if (mintSuccess) {
            // Transfer some tokens to receiver
            const transferAmount = 100000000;
            console.log(`\n=== Transferring Tokens ===`);
            await transferTokens(creatorTokenMint, mintWallet, new PublicKey("FDt9T7etBHoytn43oumnyr2vVsjXnBRNpc3FxdAeRpVh"), transferAmount);
            
            // Try to mint more tokens (should fail if it would exceed cap)
            console.log(`\n=== Testing Supply Cap ===`);
            const additionalMintAmount = 600000000; // This should fail as it would exceed the cap
            await mintTokensWithCap(creatorTokenMint, mintWallet, additionalMintAmount);
            
            // Get final supply info
            const finalSupply = await getCurrentSupply(creatorTokenMint);
            console.log(`\n=== Final Token Info ===`);
            console.log(`Final total supply: ${finalSupply}`);
            console.log(`Remaining supply available: ${MAX_SUPPLY - finalSupply}`);
        }
        
        console.log("\nToken creation and transfer completed successfully!");
    } catch (error) {
        console.error("Error during token creation:", error);
    }
})()