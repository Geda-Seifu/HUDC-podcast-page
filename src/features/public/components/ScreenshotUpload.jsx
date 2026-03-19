// components/ScreenshotUpload.jsx
import React, { useState } from 'react';
import { Image, X, Plus } from 'lucide-react';

export default function ScreenshotUpload({ selectedFiles, setSelectedFiles,isRequired }) {
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Limit to 3 files as requested
    if (selectedFiles.length + files.length > 3) {
      alert("Max 3 screenshots allowed");
      return;
    }
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 md:col-span-2">
      <label className="font-mono text-[10px] font-bold text-hudc-blue uppercase tracking-widest flex items-center gap-2">
        <Image className="w-3.5 h-3.5 opacity-60" />
        Project_Screenshots (Max 3)
        {isRequired && (
            <span className="relative flex h-1.5 w-1.5 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
            </span>
          )}
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Previews */}
        {selectedFiles.map((file, index) => (
          <div key={index} className="relative aspect-video bg-hudc-bg border border-hudc-light/20 rounded-sm overflow-hidden group">
            <img 
              src={URL.createObjectURL(file)} 
              alt="preview" 
              className="w-full h-full object-cover"
            />

            <button 
              type="button"
              onClick={() => removeFile(index)}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Upload Button */}
        {selectedFiles.length < 3 && (
          <label className="aspect-video border-2 border-dashed border-hudc-light/20 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-hudc-blue hover:bg-hudc-blue/5 transition-all">
            <Plus className="w-6 h-6 text-hudc-dark/20" />
            <span className="text-[9px] font-mono text-hudc-dark/40 uppercase mt-2">Add_Image</span>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange} 
              required={isRequired && selectedFiles.length === 0} // Make required if no files selected
            />
          </label>
        )}
      </div>
    </div>
  );
}