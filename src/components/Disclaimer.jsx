// src/components/Disclaimer.jsx
import React from "react";

const Disclaimer = () => {
  return (
    <section id="disclaimer" className="mt-12 animate-on-scroll">
      <div className="disclaimer-box max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-4 text-bpi-gold">
          Disclaimer
        </h2>
        <p className="text-sm text-gray-300 mb-3">
          This project was created for educational and informational purposes.
          Please read the following carefully:
        </p>
        <ul className="space-y-2 text-sm text-gray-400 list-disc list-inside">
          <li>
            <strong>No Affiliation:</strong> I am not, in any capacity,
            affiliated with, employed by, or in a partnership with the Bank of
            the Philippine Islands (BPI). This project is an independent
            initiative.
          </li>
          <li>
            <strong>Educational & Informational Purposes Only:</strong> This
            website, including the calculator and all provided information, is
            designed strictly for educational and informational purposes to help
            users understand the BPI Amore Cashback card's mechanics.
          </li>
          <li>
            <strong>No Financial Advice:</strong> The content provided herein
            does not constitute financial, legal, or professional advice. The
            calculations are based on publicly available information and should
            be considered estimates.
          </li>
          <li>
            <strong>Verification Required:</strong> Always refer to the official
            BPI website and its official representatives for the most accurate,
            up-to-date terms, conditions, and information. Product details can
            change without prior notice.
          </li>
          <li>
            <strong>No Warranties & Limitation of Liability:</strong> This site
            is provided "as is," without any warranties, express or implied. I
            shall not be held liable for any decisions made or actions taken in
            reliance on the information presented.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Disclaimer;
