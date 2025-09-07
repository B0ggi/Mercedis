import './App.css';
import Intro from './components/Intro';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <div id="wrapper" className="text-white bg-black min-h-screen">
      {/* Header */}
      <header id="header" className="text-center p-8">
        <div className="logo text-5xl mb-4">
          <span className="icon fa-gem">💎</span>
        </div>
        <div className="content">
          <div className="inner">
            <h1 className="text-4xl font-bold">Dimension</h1>
            <p className="mt-2 text-sm">
              A fully responsive site template by{' '}
              <a href="https://html5up.net" className="underline text-blue-400">HTML5 UP</a> released for free under the{' '}
              <a href="https://html5up.net/license" className="underline text-blue-400">Creative Commons</a> license.
            </p>
          </div>
        </div>
        <nav className="mt-6">
          <ul className="flex justify-center gap-6 text-lg font-semibold">
            <li><a href="#intro" className="hover:text-blue-400">Intro</a></li>
            <li><a href="#work" className="hover:text-blue-400">Work</a></li>
            <li><a href="#about" className="hover:text-blue-400">About</a></li>
            <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Sections */}
      <main id="main" className="px-6">
        <Intro />
        <Work />
        <About />
        <Contact />
      </main>

      {/* Footer */}
      <footer id="footer" className="text-center p-4 text-sm">
        <p>&copy; Untitled. Design by <a href="https://html5up.net" className="underline">HTML5 UP</a>.</p>
      </footer>

      {/* Background */}
      <div id="bg" className="fixed inset-0 -z-10 bg-gray-900"></div>
    </div>
  );
}

export default App;
