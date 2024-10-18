/* eslint-disable react/prop-types */

import { useState } from "react";

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select an image or video file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", tags);

    // Call backend API to upload the file
    fetch("http://localhost:3001/file/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("File uploaded successfully");
        onUpload(data.file);
        setFile(null);
        setTags("");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error uploading file");
      });
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Upload File</h2>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <input
        type="text"
        placeholder="Enter tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Upload File
      </button>
    </div>
  );
};

export default FileUpload;
