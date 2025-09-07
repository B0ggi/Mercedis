import React from 'react';

const Intro = () => {
  return (
    <article id="intro" className="py-12 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Intro</h2>
      <img
        src="/images/pic01.jpg"
        alt="Intro"
        className="w-full rounded shadow mb-6"
      />
      <p className="mb-4">
        Aenean ornare velit lacus, ac varius enim ullamcorper eu. Proin aliquam
        facilisis ante interdum congue. Integer mollis, nisl amet convallis,
        porttitor magna ullamcorper, amet egestas mauris. Ut magna finibus nisi
        nec lacinia. Nam maximus erat id euismod egestas. By the way, check out
        my <a href="#work" className="underline text-blue-400">awesome work</a>.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dapibus
        rutrum facilisis. Class aptent taciti sociosqu ad litora torquent per
        conubia nostra, per inceptos himenaeos. Etiam tristique libero eu nibh
        porttitor fermentum. Nullam venenatis erat id vehicula viverra. Nunc
        ultrices eros ut ultricies condimentum. Mauris risus lacus, blandit sit
        amet venenatis non, bibendum vitae dolor. Nunc lorem mauris, fringilla
        in aliquam at, euismod in lectus. Pellentesque habitant morbi tristique
        senectus et netus et malesuada fames ac turpis egestas. In non lorem sit
        amet elit placerat maximus. Pellentesque aliquam maximus risus, vel sed
        vehicula.
      </p>
    </article>
  );
};

export default Intro;
