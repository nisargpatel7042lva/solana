# Solana Airdrop Script

This project provides a simple TypeScript script to request SOL airdrops on a local Solana test validator using the `@solana/web3.js` library.

## How It Works
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
- You can change the address or the amount by editing this line in `airdrop/index.ts`.

## Features
- Requests SOL airdrops to any public key on a local Solana node
- Written in TypeScript for type safety
- Easily configurable and extendable

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

1. Make sure your local Solana validator is running:
   ```bash
   solana-test-validator
   ```
2. Run the airdrop script:
   ```bash
   node dist/airdrop/index.js
   ```
   By default, the script in `airdrop/index.ts` requests 1 SOL to a hardcoded address. You can modify the address and amount in the script as needed.

   **Note:** Every time you run the script (not just build it), 1 SOL will be deposited to the wallet address written in the `airdrop(...)` function call.

## Project Structure
```
├── airdrop/
│   └── index.ts         # Main airdrop script
├── dist/                # Compiled JavaScript output (ignored by git)
├── package.json         # Project metadata and dependencies
├── tsconfig.json        # TypeScript configuration
├── .gitignore           # Files and folders to ignore in git
```

## Customization
- Edit `airdrop/index.ts` to change the address or amount for the airdrop.
- Use this script as a starting point for more advanced Solana scripting.

## License
ISC 