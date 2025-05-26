/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";

function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);
    formData.append("access_key", "a6caf6de-a3b9-463d-9cd7-2706db0c3951");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully ✅");
      event.target.reset();
    } else {
      setResult(data.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center px-4 py-8 gap-8 h-full rounded-3xl shadow-lg outline outline-black/5 bg-white dark:bg-gray-900">
      {/* Contact Info */}
      <div className="p-6 md:p-8 text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Looking to collaborate or have a project idea? I'm only a message
          away. Let's work together to create something amazing!
        </p>

        <div className="flex flex-col gap-4 text-sm">
          <a
            href="https://www.google.com/maps/@-1.2827549,36.8943952,16z?entry=ttu"
            className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-indigo-500 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-solid fa-location-dot text-indigo-500"></i>
            Nairobi, Kenya
          </a>
          <a
            href="mailto:amsamgitau@gmail.com"
            className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-indigo-500 transition"
          >
            <i className="fa-solid fa-envelope text-indigo-500"></i>
            amsamgitau@gmail.com
          </a>
          <span className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <i className="fa-solid fa-phone text-indigo-500"></i> +254 758 750
            963
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 mt-6 justify-center md:justify-start">
          <a
            href="https://github.com/ngugilovesyou"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition text-xl"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.instagram.com/ngugilovesyou_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600 transition text-xl"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/samuel-gitau-361350261/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-800 transition text-xl"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-lg mx-auto md:mx-0 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            name="name"
            required
            placeholder="Your Name"
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="email"
            name="email"
            required
            placeholder="Your Email"
          />
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Your Message"
            name="message"
            required
            rows="5"
          ></textarea>
          <input type="checkbox" name="botcheck" className="hidden" />

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Send Message
          </button>
        </form>
        {result && (
          <p className="mt-4 text-sm text-green-600 dark:text-green-400 text-center">
            {result}
          </p>
        )}
      </div>
    </div>
  );
}

export default Contact;
