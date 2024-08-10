import React from "react";

function Videocard({ video }) {
  return (
    <div className="w-full max-w-xs bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      {/* Video Thumbnail */}
      <div className="relative w-full pt-[56.25%]">
        <img
          src="https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Video Thumbnail"
          className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
        <span className="absolute bottom-2 right-2 inline-block bg-black bg-opacity-75 text-white text-xs rounded px-2 py-1">
          20:45
        </span>
      </div>
      
      {/* Video Info */}
      <div className="p-3 flex items-start space-x-3">
        <div className="flex-shrink-0">
          <img
            src="https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Author"
            className="h-12 w-12 rounded-full border-2 border-gray-800"
          />
        </div>
        <div className="flex-1">
          <h6 className="text-sm font-semibold text-white mb-1">
            JavaScript Fundamentals: Variables and Data Types
          </h6>
          <p className="text-xs text-gray-400 mb-1">
            10.3k Views · 44 minutes ago
          </p>
          <p className="text-xs text-gray-300">Code Master</p>
        </div>
      </div>
    </div>
  );
}

export default Videocard;
