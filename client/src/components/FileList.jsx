/* eslint-disable react/prop-types */
const FileList = ({ files }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <div key={file._id} className="p-4 bg-white shadow rounded-lg">
            <div>
              <strong>File:</strong> {file.originalName}
            </div>
            <div>
              <strong>Tags:</strong> {file.tags.join(", ")}
            </div>
            <div>
              <strong>Views:</strong> {file.viewCount}
            </div>
            <div className="mt-2">
              <a
                href={file.shareableLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Shareable Link
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
