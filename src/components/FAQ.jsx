// src/components/FAQ.jsx
import React, { useState } from "react";

const FAQ = () => {
  const [openIndices, setOpenIndices] = useState([]);

  const faqs = [
    {
      question: "What if my grocery bill is ₱950?",
      answer:
        "You will earn ₱0 cashback. A single transaction must be at least ₱1,000 to qualify.",
    },
    {
      question: "Is the cashback credited automatically?",
      answer:
        "No. You must accumulate at least ₱500 and then manually request redemption via the BPI app or hotline.",
    },
    {
      question: "Does the Amore Platinum card have the same rules?",
      answer:
        "Yes, the ₱1,000 increment rule and ₱15,000 cap also apply. However, its bonus categories are different: 4% on restaurants and 1% on supermarkets.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index]
    );
  };

  return (
    <section id="faq" className="animate-on-scroll">
      <h2 className="text-2xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-question ${
              openIndices.includes(index) ? "open" : ""
            }`}
          >
            <button
              className="w-full text-left flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-semibold text-gray-100">
                {faq.question}
              </span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="faq-answer-wrapper">
              <div className="faq-answer text-gray-300">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
