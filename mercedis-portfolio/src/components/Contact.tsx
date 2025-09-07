import React from 'react';

const Contact = () => {
  return (
    <article id="contact" className="py-12 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Contact</h2>

      <form className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600"
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
          <textarea
            id="message"
            rows={4}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Send Message
          </button>
          <button
            type="reset"
            className="border border-gray-400 text-white px-6 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Social Icons (replace # with real links) */}
      <div className="mt-8 flex justify-center gap-6 text-xl">
        <a href="#" aria-label="Twitter">🐦</a>
        <a href="#" aria-label="Facebook">📘</a>
        <a href="#" aria-label="Instagram">📸</a>
        <a href="#" aria-label="GitHub">💻</a>
      </div>
    </article>
  );
};

export default Contact;
