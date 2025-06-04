import React, { useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MagneticCursor from './components/MagneticCursor';
import Home from './components/Home';

const HEADER_HEIGHT = 80; // px

const App = () => {
  const scrollRef = useRef(null);

  return (
    <div>
      <Header />
      <MagneticCursor />
      <div
        ref={scrollRef}
        className="px-4 overflow-x-hidden overflow-y-auto pb-16"
        style={{
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` ,
          marginTop: `${HEADER_HEIGHT}px`,
        }}
      >
        <main className="w-full">
          <section className="text-center mb-10 mt-10 ">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg">AI Image Enhancer</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Effortlessly enhance your images using state-of-the-art AI. Upload your photo and experience instant upscaling, clarity, and vibrance. Perfect for photographers, designers, and anyone who wants their images to shine.
            </p>
          </section>
          <Home />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
