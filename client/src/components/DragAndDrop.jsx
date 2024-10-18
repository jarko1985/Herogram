/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "FILE";

const DragAndDrop = ({ files, onDrop }) => {
  const moveFile = (dragIndex, hoverIndex) => {
    const updatedFiles = [...files];
    const [draggedFile] = updatedFiles.splice(dragIndex, 1);
    updatedFiles.splice(hoverIndex, 0, draggedFile);
    onDrop(updatedFiles);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file, index) => (
          <FileItem
            key={file._id}
            file={file}
            index={index}
            moveFile={moveFile}
          />
        ))}
      </div>
    </DndProvider>
  );
};

const FileItem = ({ file, index, moveFile }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveFile(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <>
      <div
        ref={(node) => ref(drop(node))}
        className="p-4 bg-gray-100 shadow rounded-lg"
      >
        <strong>{file.originalName}</strong>
      </div>
    </>
  );
};

export default DragAndDrop;
