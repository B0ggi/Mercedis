import React from 'react';

const About: React.FC = () => {
  return (
    <article id="about" className="py-12 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">About</h2>
      <p className="mb-4">
        Sed velit lacus, laoreet at venenatis convallis in lorem tincidunt.
        Nulla volutpat, arcu pharetra volutpat venenatis, arcu est eleifend
        dolor, sit amet lacinia est arcu nec, lorem ipsum dolor sit amet
        consecitur adipiscing elit.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-2">Skills</h3>
          <ul className="list-disc list-inside text-gray-400">
            <li>React</li>
            <li>JavaScript/TypeScript</li>
            <li>Tailwind CSS</li>
            <li>HTML5/CSS3</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Experience</h3>
          <p className="text-gray-400">
            Several years of experience in web development with a focus on modern
            technologies and responsive design.
          </p>
        </div>
      </div>
    </article>
  );
};

export default About;