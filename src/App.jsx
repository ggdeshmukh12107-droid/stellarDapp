import { useState } from "react";
import {
  isConnected,
  requestAccess,
  signTransaction,
} from "@stellar/freighter-api";
import {
  Horizon,
  Networks,
  TransactionBuilder,
  BASE_FEE,
  Operation,
  Asset,
} from "@stellar/stellar-sdk";

const server = new Horizon.Server("https://horizon-testnet.stellar.org");

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txStatus, setTxStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Connect Wallet
  const connectWallet = async () => {
    try {
      // Check if Freighter is installed
      const connectionResult = await isConnected();
      if (!connectionResult.isConnected) {
        alert("Please install the Freighter wallet extension!");
        return;
      }

      // requestAccess replaces getPublicKey in v3+
      // This will prompt the user to allow your app in Freighter
      const accessResult = await requestAccess();
      if (accessResult.error) {
        alert("Access denied: " + accessResult.error);
        return;
      }

      const pubKey = accessResult.address;
      setWalletAddress(pubKey);
      fetchBalance(pubKey);
    } catch (err) {
      console.error(err);
      alert("Failed to connect wallet: " + err.message);
    }
  };

  // Disconnect Wallet
  const disconnectWallet = () => {
    setWalletAddress(null);
    setBalance(null);
    setTxStatus(null);
  };

  // Fetch Balance
  const fetchBalance = async (pubKey) => {
    try {
      const account = await server.loadAccount(pubKey);
      const xlmBalance = account.balances.find(
        (b) => b.asset_type === "native"
      );
      setBalance(xlmBalance ? xlmBalance.balance : "0");
    } catch (err) {
      console.error(err);
      setBalance("Error fetching balance");
    }
  };

  // Send Transaction
  const sendTransaction = async () => {
    if (!recipient || !amount) {
      alert("Please enter recipient and amount");
      return;
    }
    setLoading(true);
    setTxStatus(null);
    try {
      const sourceAccount = await server.loadAccount(walletAddress);

      const transaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(
          Operation.payment({
            destination: recipient,
            asset: Asset.native(),
            amount: amount.toString(),
          })
        )
        .setTimeout(30)
        .build();

      // Sign with Freighter v3+
const signResult = await signTransaction(transaction.toXDR(), {
  networkPassphrase: Networks.TESTNET,
});
      if (signResult.error) {
        throw new Error(signResult.error);
      }

      // Submit to network
      const signedTx = TransactionBuilder.fromXDR(
        signResult.signedTxXdr,
        Networks.TESTNET
      );
      const result = await server.submitTransaction(signedTx);

      setTxStatus({
        success: true,
        hash: result.hash,
      });
      fetchBalance(walletAddress);
    } catch (err) {
      console.error(err);
      setTxStatus({
        success: false,
        message: err.message || "Transaction failed",
      });
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <div className="orb orb1" />
      <div className="orb orb2" />

      <div className="container">
        <div className="header">
          <div className="logo">✦</div>
          <h1 className="title">Stellar Wallet</h1>
          <p className="subtitle">Testnet · XLM</p>
        </div>

        {/* Wallet Connection */}
        {!walletAddress ? (
          <div className="card center-card">
            <p className="card-hint">Connect your Freighter wallet to get started</p>
            <button className="btn-primary" onClick={connectWallet}>
              Connect Freighter
            </button>
          </div>
        ) : (
          <div className="card">
            <div className="wallet-info">
              <span className="dot" />
              <span className="address-label">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-6)}
              </span>
            </div>
            <div className="balance-display">
              <span className="balance-amount">{balance ?? "—"}</span>
              <span className="balance-unit">XLM</span>
            </div>
            <div className="btn-row">
              <button
                className="btn-ghost"
                onClick={() => fetchBalance(walletAddress)}
              >
                ↻ Refresh
              </button>
              <button className="btn-danger" onClick={disconnectWallet}>
                Disconnect
              </button>
            </div>
          </div>
        )}

        {/* Send Transaction */}
        {walletAddress && (
          <div className="card">
            <h2 className="card-title">Send XLM</h2>
            <div className="field">
              <label className="field-label">Recipient Address</label>
              <input
                className="field-input"
                placeholder="G..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="field">
              <label className="field-label">Amount</label>
              <input
                className="field-input"
                placeholder="0.00"
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button
              className="btn-primary"
              onClick={sendTransaction}
              disabled={loading}
            >
              {loading ? <span className="spinner" /> : "Send XLM →"}
            </button>

            {/* Transaction Feedback */}
            {txStatus && (
              <div className={txStatus.success ? "feedback success" : "feedback error"}>
                {txStatus.success ? (
                  <>
                    <p className="feedback-title">✅ Transaction Sent!</p>
                    <p className="feedback-hash">Hash: {txStatus.hash}</p>
                    <a
                      className="feedback-link"
                      href={`https://stellar.expert/explorer/testnet/tx/${txStatus.hash}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on Explorer →
                    </a>
                  </>
                ) : (
                  <p className="feedback-title">❌ {txStatus.message}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
