import React, { useState } from 'react';
import {
  ArrowLeft, Download, Filter, ChevronRight,
  Headphones, CheckCircle2, Copy, AlertCircle
} from 'lucide-react';
import transactionsData from './data.json';
import './index.css';

// Custom icons for perfect match
const ChevronDownSolid = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
    <path d="M5 6L0 0H10L5 6Z" />
  </svg>
);

const DownloadBox = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="3" width="14" height="18" rx="2" ry="2" />
    <path d="M12 15V9" />
    <path d="M9 12L12 15L15 12" />
  </svg>
);

const ScamReportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 9l6 6M15 9l-6 6" />
  </svg>
);

function WithdrawalDetail({ tx, onBack }) {
  const amountWithoutSign = tx.amount.replace('-', '');

  return (
    <div className="detail-container">
      <header className="header">
        <ArrowLeft size={24} strokeWidth={2} onClick={onBack} style={{ cursor: 'pointer' }} />
        <span className="header-title" style={{ fontSize: '18px' }}>Withdrawal Details</span>
        <Headphones size={24} strokeWidth={1.5} />
      </header>

      <div className="detail-content">
        <div className="detail-top">
          <h1 className="detail-main-amount">{tx.amount} {tx.asset}</h1>
          <div className="status-badge">
            <CheckCircle2 size={16} color="#03a66d" fill="#03a66d" stroke="#ffffff" />
            <span className="status-text">Completed</span>
          </div>
          <p className="detail-info">
            Crypto transferred out of Binance. Please contact the recipient platform for your transaction receipt.
          </p>
          <a href="#" className="detail-support-link">Why hasn't my withdrawal arrived?</a>
        </div>

        <div className="detail-list">
          <div className="detail-row">
            <span className="detail-label">Network</span>
            <span className="detail-value">{tx.asset}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Address</span>
            <div className="detail-value-container">
              <span className="detail-value">146902064</span>
              <Copy size={14} color="#707a8a" />
              <a href="#" className="save-address-link">Save Address</a>
            </div>
          </div>
          <div className="detail-row">
            <span className="detail-label">Txid</span>
            <div className="detail-value-container" style={{ width: '60%', textAlign: 'right' }}>
              <span className="detail-value txid-text" style={{ wordBreak: 'break-all' }}>
                {tx.txid}
              </span>
              <Copy size={14} color="#707a8a" />
            </div>
          </div>
          <div className="detail-row">
            <span className="detail-label">Amount</span>
            <span className="detail-value">{amountWithoutSign} {tx.asset}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Network fee</span>
            <span className="detail-value">0.0001 {tx.asset}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Wallet</span>
            <span className="detail-value">Spot Wallet</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date</span>
            <span className="detail-value">{tx.date}</span>
          </div>
        </div>

        <div className="scam-report">
          <ScamReportIcon />
          <span>Scam Report</span>
        </div>
      </div>

      <div className="detail-footer">
        <button className="withdraw-again-btn">Withdraw Again</button>
      </div>
      <div className="footer-indicator" style={{ height: '5px', width: '134px', background: '#e1e1e1', borderRadius: '5px', margin: '10px auto' }}></div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('Crypto address');
  const [selectedTx, setSelectedTx] = useState(null);

  if (selectedTx) {
    return <WithdrawalDetail tx={selectedTx} onBack={() => setSelectedTx(null)} />;
  }

  return (
    <div className="iphone-container">
      {/* Header */}
      <header className="header">
        <ArrowLeft size={24} strokeWidth={2} />
        <div className="header-center" style={{ marginLeft: '12px' }}>
          <div className="header-title-container">
            <span className="header-title" style={{ marginRight: '4px' }}>Assets</span>
            <ChevronDownSolid />
          </div>
          <span className="header-subtitle">Withdraw</span>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <DownloadBox />
        </div>
      </header>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          {['Crypto address', 'Binance account', 'Cash'].map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="filter-icon">
          <Filter size={24} strokeWidth={1.5} />
        </div>
      </div>

      {/* Support Section */}
      <a href="#" className="support-link" style={{ paddingTop: '24px', paddingBottom: '24px' }}>
        <span style={{ color: '#707a8a' }}>Why hasn't my withdrawal arrived?</span>
        <ChevronRight size={18} color="#707a8a" strokeWidth={1.5} />
      </a>

      {/* List */}
      <div className="transaction-list">
        {transactionsData.map((tx) => (
          <div key={tx.id} className="transaction-item" style={{ paddingBottom: '20px' }} onClick={() => setSelectedTx(tx)}>
            <div className="tx-left">
              <span className="tx-asset" style={{ fontSize: '18px', fontWeight: '600' }}>{tx.asset}</span>
              <span className="tx-date" style={{ color: '#707a8a', fontSize: '13px', marginTop: '4px' }}>{tx.date}</span>
            </div>
            <div className="tx-right">
              <span className="tx-amount" style={{ fontSize: '18px', color: '#f6465d', fontWeight: '400' }}>{tx.amount}</span>
              <span className="tx-status" style={{ color: '#b7bdc6', fontSize: '13px', marginTop: '4px' }}>{tx.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Home Indicator */}
      <div className="footer-indicator" style={{ height: '5px', width: '134px', background: '#e1e1e1', borderRadius: '5px', margin: '20px auto' }}></div>
    </div>
  );
}

export default App;
