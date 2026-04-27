import React, { useState } from 'react';
import {
  ArrowLeft, ChevronDown, Download, Share2, 
  ChevronRight, SlidersHorizontal, ChevronUp
} from 'lucide-react';
import transactionsData from './data.json';
import './index.css';

const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);

const SparkleIcon = () => (
  <div style={{ color: '#91bfff' }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.5 9H22L16 14L18.5 21L12 17L5.5 21L8 14L2 9H9.5L12 2Z" />
    </svg>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('Order History');

  return (
    <div className="iphone-container">
      {/* Header */}
      <header className="trade-header">
        <div className="back-btn">
          <ArrowLeft size={24} />
        </div>
        <div className="header-title-group">
          <div className="header-main-title">
            My Trades <ChevronDown size={16} strokeWidth={3} />
          </div>
          <span className="header-sub-title">Spot</span>
        </div>
        <div className="download-btn" style={{ padding: '8px' }}>
          <Download size={24} />
        </div>
      </header>

      {/* Tabs */}
      <div className="trade-tabs-row">
        {['Open Orders', 'Order History', 'Trade History'].map((tab) => (
          <div
            key={tab}
            className={`trade-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="filters-container">
        {['Pair', 'Order Type', 'Direction', 'Status'].map((filter) => (
          <div key={filter} className="filter-pill">
            {filter} <ChevronDown size={12} strokeWidth={3} color="#707a8a" />
          </div>
        ))}
        <div className="filter-icon-right">
          <FilterIcon />
        </div>
      </div>

      {/* Order List */}
      <div className="order-list">
        {transactionsData.map((order) => (
          <div key={order.id} className="order-item">
            <div className="order-row-top">
              <div className="order-pair-group">
                <span className="pair-name">{order.pair}</span>
                <Share2 size={16} color="#707a8a" strokeWidth={1.5} />
              </div>
              <div className="order-date-row">
                {order.date}
                <ChevronRight size={16} color="#b7bdc6" />
              </div>
            </div>
            
            <div className={`order-type-dir ${order.direction.toLowerCase()}`}>
              {order.type} / {order.direction}
            </div>

            <div className="order-grid-details">
              <span className="grid-label">Amount</span>
              <span className="grid-value">{order.amount_filled} / {order.amount_total}</span>
              
              <span className="grid-label">Price</span>
              <span className="grid-value">{order.price_filled} / {order.price_total}</span>
              
              <span className="grid-label">Status</span>
              <span className={`grid-value status-value ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
        
        <div className="no-more-data">
          No more data
        </div>
      </div>

      {/* Floating Sparkle Icon */}
      <div className="floating-action-icon">
         <SparkleIcon />
      </div>
    </div>
  );
}

export default App;
