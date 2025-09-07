import React from 'react';

const Work: React.FC = () => {
  return (
    <article id="work" className="py-12 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Work</h2>
      <p className="mb-4">
        Sed velit lacus, laoreet at venenatis convallis in lorem tincidunt.
        Nulla volutpat, arcu pharetra volutpat venenatis, arcu est eleifend
        dolor, sit amet lacinia est arcu nec, lorem ipsum dolor sit amet
        consecitur adipiscing elit. Sed vel orci arcu. Aliquam sed
        consequat lectus.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-xl font-bold mb-2">Project 1</h3>
          <p className="text-gray-400">Description of project 1</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-xl font-bold mb-2">Project 2</h3>
          <p className="text-gray-400">Description of project 2</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-xl font-bold mb-2">Project 3</h3>
          <p className="text-gray-400">Description of project 3</p>
        </div>
      </div>
    </article>
  );
};

export default Work;