/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";

function About() {
  return (
    <div className="">
      <div className="max-w-4xl bg-white shadow-lg rounded-3xl p-10 md:p-12 text-gray-800">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          About Me
        </h2>
        <p className="text-lg leading-relaxed text-gray-600 text-center">
          👋 Hi, I'm <span className="font-semibold">Samuel Gitau</span>, a
          passionate full-stack developer with a love for building intuitive and
          scalable applications. I specialize in{" "}
          <span className="text-indigo-500">React, Flask, and SQLite</span>,
          creating seamless user experiences from frontend to backend.
        </p>

        <h3 className="text-2xl font-semibold text-indigo-600 mt-8">
          💡 What I Do
        </h3>
        <ul className="list-disc pl-5 text-gray-700 leading-relaxed">
          <li>Full-Stack Development: Building dynamic web applications.</li>
          <li>API Development: Creating and integrating RESTful APIs.</li>
          <li>Authentication & Security: Implementing JWT & bcrypt.</li>
          <li>Database Management: Designing databases with SQLAlchemy.</li>
          <li>Real-Time Features: WebSockets.</li>
        </ul>

        {/* <h3 className="text-2xl font-semibold text-indigo-600 mt-8">
          🚀 Notable Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-indigo-50 rounded-lg shadow-md">
            <h4 className="font-bold text-indigo-700">Usichizi</h4>
            <p className="text-sm text-gray-600">
              Usichizi is a mental health self-assessment web app designed to
              help users understand their emotional well-being.
            </p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg shadow-md">
            <h4 className="font-bold text-indigo-700">Movie List App</h4>
            <p className="text-sm text-gray-600">
              Browse, search, and book movie tickets.
            </p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg shadow-md">
            <h4 className="font-bold text-indigo-700">Bot Army Manager</h4>
            <p className="text-sm text-gray-600">
              Manage a collection of interactive bots.
            </p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg shadow-md">
            <h4 className="font-bold text-indigo-700">Library Management</h4>
            <p className="text-sm text-gray-600">
              A system for handling books and users.
            </p>
          </div>
        </div> */}

        <h3 className="text-2xl font-semibold text-indigo-600 mt-8">
          🛠 Tech Stack
        </h3>
        <p className="text-gray-700">
          <span className="font-semibold">Frontend:</span> React, JavaScript,
          TailwindCSS, Bootstrap, MUI,
          <br />
          <span className="font-semibold">Backend:</span> Flask, Python,
          FastAPI, Django(DFR)
          <br />
          <span className="font-semibold">Databases:</span> SQLite, PostgreSQL,
          MySQL
          <br />
          <span className="font-semibold">Tools & DevOps:</span> Git, Postman
        </p>

        <h3 className="text-2xl font-semibold text-indigo-600 mt-8">
          📊 Skills & Proficiency
        </h3>
        <div className="space-y-4 mt-4">
          {[
            { name: "React", percent: 90 },
            { name: "Flask", percent: 85 },
            { name: "SQLite", percent: 80 },
            { name: "Tailwind CSS", percent: 88 },
            { name: "Django", percent: 75 },
            { name: "JavaScript", percent: 92 },
            { name: "PostgreSQL", percent: 70 },
          ].map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-1">
                <span className="text-gray-800 font-medium">{skill.name}</span>
                <span className="text-sm text-gray-500">{skill.percent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                <div
                  className="bg-indigo-500 h-3 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${skill.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-indigo-600 mt-8">
          📚 Continuous Learning
        </h3>
        <p className="text-lg leading-relaxed text-gray-600">
          I enjoy taking on new challenges and keeping up with the latest in web
          development. Whether it's implementing real-time interactions or
          diving deeper into AI-driven applications, I always seek opportunities
          to grow.
        </p>

        <h3 className="text-2xl font-semibold text-indigo-600 mt-8">
          🎮 Outside of Code
        </h3>
        <p className="text-lg leading-relaxed text-gray-600">
          When I’m not coding, you’ll find me playing games, exploring AI
          technologies, or experimenting with new frameworks. I love
          problem-solving and building tools that make life easier.
        </p>
      </div>
    </div>
  );
}

export default About;
