// src/components/Strategies.jsx
import React, { useState } from "react";

const Strategies = () => {
  const [activeTab, setActiveTab] = useState("rules");

  const tabs = [
    { id: "rules", label: "Core Rules" },
    { id: "tips", label: "Pro Tips" },
    { id: "pitfalls", label: "Common Pitfalls" },
  ];

  const tabContent = {
    rules: {
      title: "The Must-Know Mechanics",
      items: [
        {
          bold: "The ₱1,000 Increment Rule:",
          text: "You only earn cashback on every full ₱1,000 of a single transaction. A ₱1,999 purchase only earns cashback on ₱1,000.",
        },
        {
          bold: "Annual Cap:",
          text: "You can earn a maximum of ₱15,000 in cashback per calendar year.",
        },
        {
          bold: "No Points:",
          text: "This is a pure cashback card. It does not earn BPI Rewards points.",
        },
        {
          bold: "Redemption:",
          text: "Cashback is not automatic. You need to redeem it in ₱500 increments via BPI channels.",
        },
      ],
    },
    tips: {
      title: "Tips from Cardholders",
      items: [
        {
          bold: "Focus on Groceries:",
          text: "With a 4% rebate, this card is one of the best for groceries.",
        },
        {
          bold: "Split Payment Strategy:",
          text: "For large purchases not in multiples of ₱1,000 (e.g., ₱5,700), ask the cashier to split the payment to maximize earnings.",
        },
        {
          bold: "Automate Utility Bills:",
          text: "Use the card for all your utility payments for easy, consistent 1% rebates.",
        },
        {
          bold: "Request Annual Fee Waiver:",
          text: "Call BPI's hotline to request a waiver for the ₱2,050 annual fee. It's often granted to good payers.",
        },
      ],
    },
    pitfalls: {
      title: "What to Avoid",
      items: [
        {
          bold: "Small Purchases:",
          text: "Any transaction under ₱1,000 earns zero cashback. Use a different card for these.",
        },
        {
          bold: "E-Wallet Top-Ups:",
          text: "Topping up e-wallets like GCash or PayMaya often does not qualify for cashback.",
        },
        {
          bold: "Carrying a Balance:",
          text: "Interest charges will quickly erase any cashback you've earned. Always pay in full.",
        },
        {
          bold: "Ignoring the Cap:",
          text: "Once you hit the ₱15,000 cap, the card stops being rewarding until the next year.",
        },
      ],
    },
  };

  return (
    <section id="strategies" className="mb-12 animate-on-scroll">
      <h2 className="text-2xl font-bold text-center mb-6">
        Strategies to Maximize Your Card
      </h2>

      <div className="border-b border-white/20 mb-6 flex justify-center space-x-2 md:space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button py-2 px-4 text-sm md:text-base font-semibold border-b-2 ${
              activeTab === tab.id ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div id="tab-content-wrapper" className="relative">
        {Object.entries(tabContent).map(([key, content]) => (
          <div
            key={key}
            className={`tab-content ${
              activeTab === key ? "active" : ""
            } bg-black/20 p-6 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm`}
          >
            <h3 className="font-bold text-lg mb-4 text-bpi-gold">
              {content.title}
            </h3>
            <ul className="space-y-3 list-disc list-inside text-gray-300">
              {content.items.map((item, index) => (
                <li key={index}>
                  <strong>{item.bold}</strong> {item.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Strategies;
