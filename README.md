# Solana Transfer Demo

A simple demonstration of SOL transfers on the Solana blockchain using TypeScript and the Solana Web3.js library.

## Features

- SOL transfer between wallets
- Balance checking
- Airdrop functionality for testing
- Local validator support

## Prerequisites

- Node.js (v16 or higher)
- Solana CLI tools
- TypeScript

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd solana
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Usage

### Starting the Local Validator

Before running the transfer demo, start a local Solana validator:

```bash
solana-test-validator
```

### Running the Transfer Demo

```bash
node ./dist/transfer-sol/index.js
```

The demo will:
1. Generate a new keypair for testing
2. Request an airdrop of 4 SOL
3. Transfer 2 SOL to a destination wallet
4. Display balance changes

## Project Structure

```
├── airdrop/
│   └── index.ts          # Airdrop functionality
├── showbalance/
│   └── index.ts          # Balance checking
├── transfer-sol/
│   └── index.ts          # SOL transfer demo
├── package.json
├── tsconfig.json
└── README.md
```

## Security Notes

- This demo generates new keypairs for each run
- No private keys are hardcoded in the source code
- For production use, implement proper key management
- The local validator is for testing only

## Development

To modify the code:

1. Edit the TypeScript files in the source directories
2. Rebuild with `npm run build`
3. Run the updated code

## License

MIT 