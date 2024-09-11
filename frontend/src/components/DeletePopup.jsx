import React from "react";

function DeletePopup({ onCancel, onDeleteConfirm, loading }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-transparent bg-opacity-75 z-50">
      <div className="bg-black border border-slate-800 rounded-lg p-5 text-white text-center">
        <p className="text-xl font-medium mb-2">
          Are you sure you want to delete this video?
        </p>
        <div className="flex gap-4">
          <button
            className={`w-full py-2 px-4 font-bold text-lg rounded ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-red-500"
            }`}
            onClick={loading ? null : onDeleteConfirm}
            disabled={loading} // Disable button if loading
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
          <button
            className="bg-gray-500 text-color w-full py-2 px-4 font-bold text-lg rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
