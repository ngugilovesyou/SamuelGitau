/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const plans = [
  {
    title: "Basic",
    price: "KSh 15,000",
    features: ["Single Page Web App", "Responsive Design", "Email Support"],
    highlight: false,
  },
  {
    title: "Standard",
    price: "KSh 40,000",
    features: [
      "Multi-page Website",
      "Animations & Effects",
      "Domain + Hosting Setup",
      "Support for 1 Month",
    ],
    highlight: true,
  },
  {
    title: "Premium",
    price: "KSh 80,000+",
    features: [
      "Custom Web App",
      "Payment Gateway Integration",
      "Database Setup",
      "Admin Dashboard",
      "3 Months Support",
    ],
    highlight: false,
  },
];

function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", details: "" });
  const [formStatus, setFormStatus] = useState("");

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setFormStatus("");
    setForm({ name: "", email: "", details: "" });
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.details) {
      setFormStatus("Please fill in all fields.");
      return;
    }
    setFormStatus("Sending...");
     const formData = new FormData(event.target);
    formData.append("access_key", "a6caf6de-a3b9-463d-9cd7-2706db0c3951");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setTimeout(() => {
      setFormStatus("Request sent! I will get back to you soon.");
      setForm({ name: "", email: "", details: "" });
    }, 1500);
  };

  return (
    <div className="px-6 py-16 bg-indigo-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-indigo-600 dark:text-white mb-12">
        Pricing Plans
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative border rounded-3xl p-8 shadow-lg transition-transform transform hover:scale-[1.02] bg-white dark:bg-gray-800 ${
              plan.highlight
                ? "border-indigo-600 ring-2 ring-indigo-500"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            {plan.highlight && (
              <span className="absolute top-0 right-0 px-4 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-tr-3xl rounded-bl-3xl">
                Most Popular
              </span>
            )}

            <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
              {plan.title}
            </h3>
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
              {plan.price}
            </p>
            <ul className="mb-6 space-y-3 text-gray-700 dark:text-gray-300">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <i className="fa-solid fa-check text-indigo-500"></i>{" "}
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 px-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition">
              Choose Plan
            </button>
          </div>
        ))}

        {/* Custom Quote Card */}
        <div
          className="border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-lg bg-white dark:bg-gray-800 flex flex-col justify-between transition-transform transform hover:scale-[1.02] cursor-pointer"
          onClick={openModal}
          aria-label="Request Custom Quote"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") openModal();
          }}
        >
          <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
            Custom Quote
          </h3>
          <p className="text-gray-700 dark:text-gray-300 flex-grow mb-6">
            Have a unique project? Get in touch to receive a personalized quote
            tailored to your needs.
          </p>
          <button className="w-full py-3 px-6 bg-indigo-400 hover:bg-indigo-500 text-white rounded-xl font-semibold transition">
            Request Quote
          </button>
        </div>
      </div>

      {/* Modal */}
      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full p-8 relative shadow-lg pointer-events-auto"
            // pointer-events-auto enables interaction with modal content
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition text-2xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
              Request a Custom Quote
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <textarea
                name="details"
                rows="5"
                placeholder="Project details / requirements"
                value={form.details}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              ></textarea>

              {formStatus && (
                <p
                  className={`text-sm ${
                    formStatus.includes("sent")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formStatus}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pricing;
