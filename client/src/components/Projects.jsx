/* eslint-disable no-unused-vars */
import React from "react";

const projects = [
  {
    id: 1,
    title: "Mindcaretest",
    image: "assets/mindcare.jpg",
    description:
      "A mental health web app that allows users to assess their mental wellbeing, view their scores, identify potential mental health issues, and receive personalized recommendations. Integrated with secure payment gateways including PayPal and M-Pesa. Built using Flask and React.",
    link: "https://mindcaretest.health",
  },
  {
    id: 2,
    title: "Portfolio Website",
    image: "assets/mywebsite (1).jpg",
    description:
      "A modern personal portfolio showcasing projects, skills, and contact options. Built with ReactJS and Tailwind.",
    link: "https://samuel-gitau.vercel.app/",
  },
  {
    id: 3,
    title: "Weather App",
    image: "assets/weather.jpg",
    description:
      "Real-time weather updates using OpenWeatherMap API with a beautiful UI. Built with ReactTS, Tailwindcss, and Flask.",
    link: "https://weather-app-ten-kohl-42.vercel.app/",
  },
];

function Projects() {
  return (
    <div className="px-4 py-8 md:px-16 bg-indigo-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-5">
        My Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-transform transform hover:scale-[1.02] "
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                {project.description}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition"
              >
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
