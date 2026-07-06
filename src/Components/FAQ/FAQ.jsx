const FAQ = () => {
  const faqs = [
    {
      question: "What is ScamShield?",
      answer:
        "ScamShield is an AI-powered platform that helps detect phishing links, scam websites, suspicious messages, and other online threats before they can harm you.",
    },
    {
      question: "How does the scam detection work?",
      answer:
        "Our AI analyzes URLs, content, and threat patterns to determine whether something appears safe or potentially malicious.",
    },
    {
      question: "Is my data stored?",
      answer:
        "No. We prioritize your privacy. Submitted data is processed securely and is not permanently stored unless required for your account history.",
    },
    {
      question: "Is ScamShield free to use?",
      answer:
        "Yes! You can use the core scam detection features for free. Premium features may be added in the future.",
    },
  ];

  return (
    <section className="py-20 bg-black text-zinc-100">
      <div className="max-w-4xl mx-auto px-5">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Everything you need to know about ScamShield.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-plus rounded-xl border border-zinc-700 bg-zinc-950/40 transition-all duration-300 hover:border-zinc-800"
            >
              <input type="radio" name="faq-accordion" className="peer" /> 
              
              <div className="collapse-title text-lg font-bold text-zinc-200 peer-checked:text-white transition-colors">
                {faq.question}
              </div>
              
              <div className="collapse-content text-zinc-400 leading-relaxed text-sm sm:text-base">
                <p className="pb-4 pt-1">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;