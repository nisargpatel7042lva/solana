# Solana Transfer Demo

A simple demonstration of SOL transfers and SPL token creation on the Solana blockchain using TypeScript and the Solana Web3.js library.

## Features

- SOL transfer between wallets
- SPL token creation with capped supply
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

Before running the demos, start a local Solana validator:

```bash
solana-test-validator
```

### Running the SOL Transfer Demo

```bash
node ./dist/transfer-sol/index.js
```

The demo will:
1. Generate a new keypair for testing
2. Request an airdrop of 4 SOL
3. Transfer 2 SOL to a destination wallet
4. Display balance changes

### Running the Token Creation Demo

```bash
node ./dist/create-token/index.js
```

The token creation demo will:
1. Generate a new keypair for the mint authority
2. Create a new SPL token with a maximum supply of 1 billion tokens
3. Mint an initial supply of 500 million tokens
4. Transfer 100 million tokens to a receiver
5. Demonstrate the supply cap by attempting to mint more tokens than allowed
6. Display final supply information

## Project Structure

```
├── airdrop/
│   └── index.ts          # Airdrop functionality
├── showbalance/
│   └── index.ts          # Balance checking
├── transfer-sol/
│   └── index.ts          # SOL transfer demo
├── create-token/
│   └── index.ts          # SPL token creation with capped supply
├── package.json
├── tsconfig.json
└── README.md
```

## Token Features

### Capped Supply
- Maximum supply: 1 billion tokens
- Supply tracking and validation
- Prevents minting beyond the cap
- Real-time supply monitoring

### Token Operations
- Create new SPL tokens
- Mint tokens with supply cap enforcement
- Transfer tokens between accounts
- Get current supply information

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