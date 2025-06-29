# Solana Airdrop and Balance Checker

This project provides TypeScript scripts for interacting with a local Solana test validator using the `@solana/web3.js` library. It includes both an airdrop script and a balance checker script.

## Features
- **Airdrop Script**: Requests SOL airdrops to any public key on a local Solana node
- **Balance Checker**: Shows the balance of a wallet before and after an airdrop
- Written in TypeScript for type safety
- Easily configurable and extendable

## How It Works

### Airdrop Script (`airdrop/index.ts`)
- The main logic is in `airdrop/index.ts`.
- When you build the project (using `npm run build`), TypeScript compiles the code but does **not** execute it.
- To actually send 1 SOL to the wallet address, you need to run the compiled script with Node.js:
  ```bash
  node dist/airdrop/index.js
  ```
- The script contains this line:
  ```ts
  airdrop("3fTVWVBgm8yYh8XXd7qTBCBuLNP4nMKsCAgesHHCBnA5", 1);
  ```
  Every time you run the script, it will request an airdrop of 1 SOL to the specified wallet address on your local Solana validator.

### Balance Checker Script (`showbalance/index.ts`)
- Shows the current balance of a wallet
- Requests an airdrop of 1 SOL
- Shows the balance after the airdrop
- Demonstrates how to use both scripts together

## Prerequisites
- Node.js (v16 or later recommended)
- Yarn or npm
- A local Solana test validator running (e.g., via `solana-test-validator`)

## Setup
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <repo-directory>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Build the project:**
   ```bash
   npm run build
   # or
   yarn build
   ```

## Usage

### Running the Airdrop Script
1. Make sure your local Solana validator is running:
   ```bash
   solana-test-validator
   ```
2. Run the airdrop script:
   ```bash
   node dist/airdrop/index.js
   ```
   This will request 1 SOL to the hardcoded address in the script.

### Running the Balance Checker Script
1. Make sure your local Solana validator is running:
   ```bash
   solana-test-validator
   ```
2. Run the balance checker script:
   ```bash
   node dist/showbalance/index.js
   ```
   This will:
   - Show the current balance of the wallet
   - Request an airdrop of 1 SOL
   - Show the balance after the airdrop

**Note:** Every time you run either script (not just build it), 1 SOL will be deposited to the wallet address written in the script.

## Project Structure
```
├── airdrop/
│   └── index.ts         # Airdrop script
├── showbalance/
│   └── index.ts         # Balance checker script (uses airdrop function)
├── dist/                # Compiled JavaScript output (ignored by git)
├── package.json         # Project metadata and dependencies
├── tsconfig.json        # TypeScript configuration
├── .gitignore           # Files and folders to ignore in git
└── README.md            # This file
```

## Script Details

### Airdrop Function
```typescript
export const airdrop = async (address: string, amount: number) => {
    const publicKey = new PublicKey(address);
    const conn = new Connection("http://localhost:8899", "confirmed");
    const signature = await conn.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
    await conn.confirmTransaction(signature);
}
```

### Balance Checker Function
```typescript
export const showBalance = async (publicKey: PublicKey) => {
    const connection = new Connection("http://localhost:8899", "confirmed");
    const response = await connection.getAccountInfo(publicKey);
    if (!response) {
        return 0;
    }
    return response.lamports / LAMPORTS_PER_SOL;
}
```

## Customization
- Edit `airdrop/index.ts` to change the address or amount for the airdrop.
- Edit `showbalance/index.ts` to change the wallet address or modify the balance checking logic.
- Use these scripts as a starting point for more advanced Solana scripting.

## Example Output
When you run the balance checker script, you'll see output like:
```
Balance: 55 SOL
Balance after airdrop: 56 SOL
```

## License
ISC 