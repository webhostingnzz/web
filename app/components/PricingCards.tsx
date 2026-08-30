'use client';

import { useState } from 'react';
import type { PricingPageData } from '../data/pricingPlans';

export default function PricingCards({ data }: { data: PricingPageData }) {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="whnz-pricing-cards">
      <style>{`
        .whnz-pricing-cards {
          padding: 66px 20px;
          margin-top: -90px;
          background: #fff;
          text-align: center;
          position: relative;
        }
        .whnz-pc-inner {
          max-width: 1200px;
          margin: 0 auto;
          background: #fff;
          border-radius: 28px;
          padding: 48px 32px;
        }
        .whnz-pc-label {
          color: #0CC0DF;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 0.15em;
          margin-bottom: 10px;
        }
        .whnz-pc-heading {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: clamp(25px, 3.2vw, 36px);
          color: #0b1220;
          margin: 0 0 10px;
        }
        .whnz-pc-subtitle {
          color: #5b6472;
          font-size: 15.5px;
          max-width: 600px;
          margin: 0 auto 28px;
        }
        .whnz-pc-toggle-row {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 36px;
        }
        .whnz-pc-toggle-label {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: #0b1220;
        }
        .whnz-pc-toggle-wrap {
          position: relative;
          display: inline-flex;
        }
        .whnz-pc-wave {
          position: absolute;
          inset: -8px;
          border-radius: 100px;
          border: 2px solid #0CC0DF;
          opacity: 0;
          animation: whnz-pc-ripple 2.4s ease-out infinite;
          pointer-events: none;
        }
        .whnz-pc-wave:nth-child(2) { animation-delay: 0.8s; }
        @keyframes whnz-pc-ripple {
          0%   { transform: scale(0.85); opacity: 0.55; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        .whnz-pc-switch {
          position: relative;
          width: 50px;
          height: 27px;
          border-radius: 100px;
          background: #fff;
          border: 1.5px solid #d5e6ea;
          cursor: pointer;
          padding: 3px;
          display: flex;
          align-items: center;
          transition: background 0.25s ease, border-color 0.25s ease;
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }
        .whnz-pc-switch:focus,
        .whnz-pc-switch:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(12,192,223,0.25);
        }
        .whnz-pc-switch.is-yearly {
          background: #0CC0DF;
          border-color: #0CC0DF;
        }
        .whnz-pc-switch-knob {
          width: 21px;
          height: 21px;
          border-radius: 50%;
          background: #0CC0DF;
          border: 1.5px solid #0CC0DF;
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
        }
        .whnz-pc-switch.is-yearly .whnz-pc-switch-knob {
          background: #fff;
          border-color: #fff;
        }
        .whnz-pc-save-badge {
          background: rgba(12,192,223,0.1);
          color: #0CC0DF;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 12px;
          padding: 5px 12px;
          border-radius: 100px;
        }
        .whnz-pc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1120px;
          margin: 0 auto;
        }
        @media (max-width: 1100px) {
          .whnz-pc-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .whnz-pc-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 900px) {
          .whnz-pricing-cards {
            margin-top: 0;
            padding: 36px 14px;
          }
          .whnz-pc-inner {
            padding: 28px 16px;
            border-radius: 20px;
          }
          .whnz-pc-toggle-row {
            gap: 10px;
            margin-bottom: 28px;
          }
          .whnz-pc-save-badge {
            width: 100%;
            margin-top: 8px;
          }
        }
        .whnz-pc-card {
          background: #fff;
          border: 1px solid rgba(12,192,223,0.12);
          border-radius: 18px;
          padding: 26px 20px;
          display: flex;
          flex-direction: column;
          text-align: center;
          box-shadow: 0 10px 30px rgba(12,192,223,0.08), 0 2px 8px rgba(11,18,32,0.04);
        }
        .whnz-pc-card img {
          width: 88px;
          height: auto;
          margin: 0 auto 14px;
        }
        .whnz-pc-plan-name {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 19px;
          color: #0b1220;
          margin-bottom: 12px;
        }
        .whnz-pc-price-row {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 3px;
          margin-bottom: 2px;
        }
        .whnz-pc-currency {
          color: #0CC0DF;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 14px;
        }
        .whnz-pc-price {
          color: #0CC0DF;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 34px;
          line-height: 1;
        }
        .whnz-pc-price-decimal {
          color: #0CC0DF;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 14px;
        }
        .whnz-pc-period {
          color: #8a93a3;
          font-size: 13px;
          margin-bottom: 16px;
        }
        .whnz-pc-divider {
          border: none;
          border-top: 1px solid rgba(12,192,223,0.15);
          margin: 0 0 16px;
        }
        .whnz-pc-features {
          list-style: none;
          padding: 0;
          margin: 0 0 20px;
          text-align: left;
          flex-grow: 1;
        }
        .whnz-pc-features li {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 13.5px;
          color: #3a4250;
          margin-bottom: 10px;
        }
        .whnz-pc-check {
          width: 15px;
          height: 15px;
          flex-shrink: 0;
          color: #0CC0DF;
        }
        .whnz-pc-order-btn {
          display: block;
          background: #0CC0DF;
          color: #fff !important;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 14.5px;
          text-decoration: none;
          padding: 12.5px;
          border-radius: 9px;
          transition: opacity 0.2s ease;
        }
        .whnz-pc-order-btn:hover { opacity: 0.88; }
        .whnz-pc-guarantee {
          margin-top: 28px;
          color: #5b6472;
          font-size: 14.5px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
      `}</style>

      <div className="whnz-pc-inner">
      <div className="whnz-pc-label">{data.label}</div>
      <h2 className="whnz-pc-heading">{data.heading}</h2>
      <p className="whnz-pc-subtitle">{data.subtitle}</p>

      <div className="whnz-pc-toggle-row">
        <span className="whnz-pc-toggle-label">Monthly</span>
        <div className="whnz-pc-toggle-wrap">
          <span className="whnz-pc-wave" />
          <span className="whnz-pc-wave" />
          <button
            type="button"
            className={`whnz-pc-switch${yearly ? ' is-yearly' : ''}`}
            onClick={() => setYearly((y) => !y)}
            aria-label="Toggle monthly or yearly pricing"
          >
            <span
              className="whnz-pc-switch-knob"
              style={{ transform: yearly ? 'translateX(23px)' : 'translateX(0)' }}
            />
          </button>
        </div>
        <span className="whnz-pc-toggle-label">Yearly</span>
        <span className="whnz-pc-save-badge">Save up to 5%</span>
      </div>

      <div className="whnz-pc-grid">
        {data.plans.map((plan) => {
          const priceStr = yearly ? plan.annualPrice : plan.monthlyPrice;
          const [whole, decimal] = priceStr.split('.');
          const cycle = yearly ? 'annually' : 'monthly';
          return (
            <div className="whnz-pc-card" key={plan.name}>
              <img src={plan.image} alt={`${plan.name} plan`} />
              <div className="whnz-pc-plan-name">{plan.name}</div>
              <div className="whnz-pc-price-row">
                <span className="whnz-pc-currency">{plan.currency}</span>
                <span className="whnz-pc-price">{whole}</span>
                <span className="whnz-pc-price-decimal">.{decimal}</span>
              </div>
              <div className="whnz-pc-period">/{yearly ? 'year' : 'month'}</div>
              <hr className="whnz-pc-divider" />
              <ul className="whnz-pc-features">
                {plan.features.map((f) => (
                  <li key={f}>
                    <svg className="whnz-pc-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {f.trim()}
                  </li>
                ))}
              </ul>
              <a
                className="whnz-pc-order-btn"
                href={`${plan.orderUrl}?billingcycle=${cycle}`}
              >
                Order Now
              </a>
            </div>
          );
        })}
      </div>

      <div className="whnz-pc-guarantee">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0CC0DF" strokeWidth="2">
          <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
        </svg>
        All plans include 24/7 support and 30-day money-back guarantee.
      </div>
      </div>
    </section>
  );
}
