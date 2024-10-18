import { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import DragAndDrop from "../components/DragAndDrop";

const Dashboard = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = () => {
    fetch("http://139.59.143.230:3001/file/list", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setFiles(data))
      .catch((error) => console.error("Error fetching files:", error));
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileUpload = (newFile) => {
    setFiles((prevFiles) => [...prevFiles, newFile]);
  };

  const handleDrop = (updatedFiles) => {
    setFiles(updatedFiles);
  };

  return (
    <div className="container mx-auto p-4">
      <FileUpload onUpload={handleFileUpload} />
      <h3 className="py-4 text-orange-500">Drag and drop files to organize</h3>
      <DragAndDrop files={files} onDrop={handleDrop} />
      <FileList files={files} />
    </div>
  );
};

export default Dashboard;
