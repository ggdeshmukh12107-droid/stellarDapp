# Stellar Token Wallet (Testnet)

A sleek, modern decentralized application (dApp) built on the Stellar network. This lightweight application allows users to connect their Freighter wallet, check their native XLM testnet balance, and seamlessly send XLM to any valid address.

## 📸 Screenshots

> **Note:** Drop your screenshots below to complete the documentation!

### Wallet Connection
<img width="964" height="616" alt="Screenshot 2026-02-23 160052" src="https://github.com/user-attachments/assets/0f4dbdc6-f5ed-4746-9764-890c0d4384f1" />


### Dashboard & Transaction
<img width="867" height="993" alt="Screenshot 2026-02-23 160225" src="https://github.com/user-attachments/assets/df03d1ce-59a1-474d-9af7-99eaffda6c67" />


## ✨ Features

- **Freighter Interface:** Seamlessly connect and authenticate using the official Freighter browser extension.
- **Live Account Balance:** Instantly load and view your testnet XLM balance directly from the Horizon network.
- **Send Transactions:** Send XLM with real-time feedback, error handling, and direct links to the Stellar Expert Explorer.
- **Modern UI Design:** A beautiful, responsive, glassmorphic design system.
- **Testnet Ready:** Pre-configured and fully functional on the Stellar Testnet.

## 🛠️ Built With

- **[React 19](https://react.dev/)** - UI Library
- **[Vite](https://vitejs.dev/)** - Next Generation Frontend Tooling
- **[@stellar/freighter-api](https://docs.freighter.app/)** - Wallet Integration and Signing
- **[@stellar/stellar-sdk](https://developers.stellar.org/docs)** - Stellar Network Interaction

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [Freighter Wallet](https://www.freighter.app/) extension installed in your web browser.
- Make sure your Freighter wallet is explicitly set to use the **Testnet** network.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd stellar-level1
   ```

2. **Install dependencies:**
   Using npm:
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Launch the dApp:**
   Open your browser and navigate to `http://localhost:5173`.

## 🧪 How to Use

1. **Connect:** Open the application and click **Connect Freighter**. Approve the connection request in the Freighter popup.
2. **Fund:** If your Freighter wallet doesn't have any funds, use the [Stellar Laboratory Friendbot](https://laboratory.stellar.org/#account-creator?network=test) to fund your testnet account for free.
3. **Draft Transaction:** Enter a recipient testnet address (must start with a `G...`) and an XLM amount.
4. **Send & Sign:** Click **Send XLM →** and approve the transaction signature request in the Freighter popup.
5. **Verify:** Wait for the success message and click the provided link to view your transaction live on the Stellar Expert Explorer.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
