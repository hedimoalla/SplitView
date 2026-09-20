import React, { useState, useRef, useEffect } from 'react';
import { Upload, ZoomIn, ZoomOut, RotateCcw, X, ArrowLeftRight, Download } from 'lucide-react';

const ImageComparisonSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [containerHeight, setContainerHeight] = useState('100vh');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [beforeInfo, setBeforeInfo] = useState(null);
  const [afterInfo, setAfterInfo] = useState(null);
  const [swapped, setSwapped] = useState(false);
  const [dragOverBefore, setDragOverBefore] = useState(false);
  const [dragOverAfter, setDragOverAfter] = useState(false);
  const containerRef = useRef(null);
  const beforeImgRef = useRef(null);
  const afterImgRef = useRef(null);
  const comparisonRef = useRef(null);
  const beforeFileInputRef = useRef(null);
  const afterFileInputRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const position = (x / rect.width) * 100;
      setSliderPosition(Math.min(Math.max(position, 0), 100));
    }
  };

  const handleFileUpload = (type, e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const info = {
            width: img.naturalWidth,
            height: img.naturalHeight,
            size: (file.size / 1024).toFixed(2)
          };
          if (type === 'before') {
            setBeforeImage(event.target.result);
            setBeforeInfo(info);
          } else {
            setAfterImage(event.target.result);
            setAfterInfo(info);
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (type, e) => {
    e.preventDefault();
    if (type === 'before') setDragOverBefore(true);
    else setDragOverAfter(true);
  };

  const handleDragLeave = (type, e) => {
    e.preventDefault();
    if (type === 'before') setDragOverBefore(false);
    else setDragOverAfter(false);
  };

  const handleDrop = (type, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'before') setDragOverBefore(false);
    else setDragOverAfter(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleFileUpload(type, { target: { files: [file] } });
      }
    }
  };

  const clearImage = (type) => {
    if (type === 'before') {
      setBeforeImage(null);
      setBeforeInfo(null);
    } else {
      setAfterImage(null);
      setAfterInfo(null);
    }
  };

  const clearAll = () => {
    setBeforeImage(null);
    setAfterImage(null);
    setBeforeInfo(null);
    setAfterInfo(null);
    setSliderPosition(50);
    setZoomLevel(1);
  };

  const swapImages = () => {
    const temp = beforeImage;
    const tempInfo = beforeInfo;
    setBeforeImage(afterImage);
    setBeforeInfo(afterInfo);
    setAfterImage(temp);
    setAfterInfo(tempInfo);
    setSwapped(!swapped);
  };

  const exportComparison = () => {
    if (comparisonRef.current) {
      const canvas = document.createElement('canvas');
      const rect = comparisonRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#e5e7eb';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'splitview-comparison.png';
      link.click();
    }
  };

  const handleZoom = (direction) => {
    setZoomLevel((prev) => {
      const newLevel = direction === 'in' ? prev + 0.1 : Math.max(0.5, prev - 0.1);
      return Math.round(newLevel * 10) / 10;
    });
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
  };

  useEffect(() => {
    const updateContainerHeight = () => {
      if (beforeImgRef.current || afterImgRef.current) {
        const img = beforeImgRef.current || afterImgRef.current;
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        const windowWidth = window.innerWidth;
        const newHeight = windowWidth * aspectRatio;
        setContainerHeight(`${newHeight * zoomLevel}px`);
      }
    };

    window.addEventListener('resize', updateContainerHeight);
    return () => window.removeEventListener('resize', updateContainerHeight);
  }, [beforeImage, afterImage, zoomLevel]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          handleZoom('in');
        } else if (e.key === '-') {
          e.preventDefault();
          handleZoom('out');
        } else if (e.key === '0') {
          e.preventDefault();
          handleZoomReset();
        } else if (e.key === 'r' || e.key === 'R') {
          e.preventDefault();
          clearAll();
        } else if (e.key === 's' || e.key === 'S') {
          e.preventDefault();
          swapImages();
        } else if (e.key === 'e' || e.key === 'E') {
          e.preventDefault();
          exportComparison();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [swapped]);

  return (
    <div className="w-full bg-gray-200">
      {/* Upload Section */}
      <div className="flex gap-4 p-4 bg-gray-200">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Before Image</label>
            {beforeImage && (
              <button
                onClick={() => clearImage('before')}
                className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
          <div className="flex items-center justify-center w-full">
            <div
              onClick={() => beforeFileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                dragOverBefore
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter('before', e)}
              onDragLeave={(e) => handleDragLeave('before', e)}
              onDrop={(e) => handleDrop('before', e)}
            >
              {beforeImage ? (
                <div className="text-center py-5">
                  <p className="text-xs text-gray-600">
                    {beforeInfo?.width} × {beforeInfo?.height}px
                  </p>
                  <p className="text-xs text-gray-500">{beforeInfo?.size} KB</p>
                  <p className="text-xs text-green-600 mt-2">✓ Loaded</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-600" />
                  <p className="text-sm text-gray-600">Click or drag to upload</p>
                </div>
              )}
            </div>
            <input
              ref={beforeFileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileUpload('before', e)}
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">After Image</label>
            {afterImage && (
              <button
                onClick={() => clearImage('after')}
                className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
          <div className="flex items-center justify-center w-full">
            <div
              onClick={() => afterFileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                dragOverAfter
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter('after', e)}
              onDragLeave={(e) => handleDragLeave('after', e)}
              onDrop={(e) => handleDrop('after', e)}
            >
              {afterImage ? (
                <div className="text-center py-5">
                  <p className="text-xs text-gray-600">
                    {afterInfo?.width} × {afterInfo?.height}px
                  </p>
                  <p className="text-xs text-gray-500">{afterInfo?.size} KB</p>
                  <p className="text-xs text-green-600 mt-2">✓ Loaded</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-600" />
                  <p className="text-sm text-gray-600">Click or drag to upload</p>
                </div>
              )}
            </div>
            <input
              ref={afterFileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileUpload('after', e)}
            />
          </div>
        </div>
      </div>

      {/* Zoom Controls */}
      {(beforeImage || afterImage) && (
        <div className="flex gap-2 p-4 bg-white border-b justify-center flex-wrap">
          <button
            onClick={() => handleZoom('out')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition-colors"
            title="Ctrl/Cmd+- to zoom out"
          >
            <ZoomOut className="w-4 h-4" />
            Zoom Out
          </button>
          <span className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium">
            {(zoomLevel * 100).toFixed(0)}%
          </span>
          <button
            onClick={() => handleZoom('in')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition-colors"
            title="Ctrl/Cmd++ to zoom in"
          >
            <ZoomIn className="w-4 h-4" />
            Zoom In
          </button>
          <button
            onClick={handleZoomReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition-colors"
            title="Ctrl/Cmd+0 to reset zoom"
          >
            <RotateCcw className="w-4 h-4" />
            Zoom Reset
          </button>
          <div className="border-l border-gray-300"></div>
          <button
            onClick={swapImages}
            className="flex items-center gap-2 px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded-lg text-blue-700 font-medium transition-colors"
            title="Ctrl/Cmd+S to swap images"
          >
            <ArrowLeftRight className="w-4 h-4" />
            Swap
          </button>
          <button
            onClick={exportComparison}
            className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 rounded-lg text-green-700 font-medium transition-colors"
            title="Ctrl/Cmd+E to export"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-4 py-2 bg-red-200 hover:bg-red-300 rounded-lg text-red-700 font-medium transition-colors"
            title="Ctrl/Cmd+R to clear all"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        </div>
      )}

      {/* Comparison Slider */}
      {(beforeImage || afterImage) && (
        <div
          ref={comparisonRef}
          className="relative w-full overflow-hidden cursor-col-resize bg-gray-200"
          style={{ height: containerHeight }}
          onMouseDown={handleMouseDown}
        >
          <div
            ref={containerRef}
            className="absolute inset-0"
          >
            {/* After Image (Full) */}
            <div className="absolute inset-0">
              <img
                ref={afterImgRef}
                src={afterImage}
                alt="After"
                className="absolute top-0 left-0"
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%',
                  transform: `scale(${zoomLevel})`
                }}
              />
            </div>

            {/* Before Image (Masked) */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
              }}
            >
              <img
                ref={beforeImgRef}
                src={beforeImage}
                alt="Before"
                className="absolute top-0 left-0"
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%',
                  transform: `scale(${zoomLevel})`
                }}
              />
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="w-1 h-4 bg-gray-400 rounded-full mx-0.5" />
                <div className="w-1 h-4 bg-gray-400 rounded-full mx-0.5" />
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
              {swapped ? 'After' : 'Before'}
            </div>
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
              {swapped ? 'Before' : 'After'}
            </div>
          </div>
        </div>
      )}

      {/* Instructions when no images are uploaded */}
      {!beforeImage && !afterImage && (
        <div className="text-center text-gray-600 mt-8 p-6">
          <p className="text-lg mb-4">Upload both images to start comparing</p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>💡 Keyboard Shortcuts:</p>
            <p>Ctrl/Cmd++ = Zoom In | Ctrl/Cmd+- = Zoom Out | Ctrl/Cmd+0 = Reset Zoom</p>
            <p>Ctrl/Cmd+S = Swap Images | Ctrl/Cmd+R = Clear All | Ctrl/Cmd+E = Export</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageComparisonSlider;
