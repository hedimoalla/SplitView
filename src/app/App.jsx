import React from 'react';
import ImageComparisonSlider from './components/ImageComparisonSlider.jsx';

const App = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-200">
      <div className="flex flex-col h-full">
        <header className="bg-white shadow-sm p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">SplitView</h1>
          <p className="text-sm text-gray-600">Image Comparison Tool</p>
        </header>
        <main className="flex-1 overflow-auto">
          <ImageComparisonSlider />
        </main>
      </div>
    </div>
  );
};

export default App;
