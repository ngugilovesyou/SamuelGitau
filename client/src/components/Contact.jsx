/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";

function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "a6caf6de-a3b9-463d-9cd7-2706db0c3951");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center px-2 gap-8 h-full rounded-3xl shadow-lg  outline outline-black/5 ">
      <div className="text-center md:text-left p-8">
        <h2 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Looking to collaborate or have a project idea? I'm only a message
          away. Let's work together to create something amazing!
        </p>

        <div className="flex flex-col gap-4">
          <a
            href="https://www.google.com/maps/@-1.2827549,36.8943952,16z?entry=ttu&g_ep=EgoyMDI1MDEyOS4xIKXMDSoASAFQAw%3D%3D"
            className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-indigo-500 transition"
          >
            <i className="fa-solid fa-location-dot fa-lg text-indigo-500"></i>
            Nairobi, Kenya
          </a>
          <a
            href="mailto:amsamgitau@gmail.com"
            className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-indigo-500 transition"
          >
            <i className="fa-solid fa-envelope fa-lg text-indigo-500"></i>
            amsamgitau@gmail.com
          </a>
          <span className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <i className="fa-solid fa-phone fa-lg text-indigo-500"></i> +254
            758750963
          </span>
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto md:mx-0 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <input
            type="hidden"
            name="access_key"
            value="a6caf6de-a3b9-463d-9cd7-2706db0c3951"
          ></input>
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
            name=" message"
            required
            rows="5"
          ></textarea>
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: "none" }}
          ></input>
          <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
