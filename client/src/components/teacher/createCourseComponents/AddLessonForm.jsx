import { useState } from "react";
import { FiUpload, FiExternalLink } from "react-icons/fi";

export default function AddLessonForm({ onClose }) {
  const [contentType, setContentType] = useState("");
  const [link, setLink] = useState("");

  return (
    <div className="space-y-6">
      {/* Lesson Title */}
      <input
        type="text"
        placeholder="Lesson Title"
        className="
          w-full border border-gray-200 rounded-xl
          px-5 py-3 text-sm bg-white
          focus:outline-none focus:ring-2 focus:ring-yellow-400
        "
      />

      {/* Description */}
      <input
        type="text"
        placeholder="Description"
        className="
          w-full border border-gray-200 rounded-xl
          px-5 py-3 text-sm bg-white
          focus:outline-none focus:ring-2 focus:ring-yellow-400
        "
      />

      {/* Duration */}
      <input
        type="text"
        placeholder="Duration (e.g. 10 mins)"
        className="
          w-full border border-gray-200 rounded-xl
          px-5 py-3 text-sm bg-white
          focus:outline-none focus:ring-2 focus:ring-yellow-400
        "
      />

      {/* Content Type Dropdown */}
      <select
        value={contentType}
        onChange={(e) => {
          setContentType(e.target.value);
          setLink("");
        }}
        className="
          w-full border border-gray-200 rounded-xl
          px-5 py-3 text-sm bg-white text-gray-600
          focus:outline-none focus:ring-2 focus:ring-yellow-400
        "
      >
        <option value="">Upload Content Type</option>
        <option value="video">Video Lesson</option>
        <option value="pdf">PDF / Document</option>
        <option value="link">External Resource / Link</option>
      </select>

      {/* ===== CONDITIONAL CONTENT FIELD ===== */}

      {/* Upload Box for Video / PDF */}
      {(contentType === "video" || contentType === "pdf") && (
        <label
          className="
            border border-dashed border-gray-300 rounded-xl
            p-10 flex flex-col items-center justify-center
            text-sm text-gray-500 bg-white
            cursor-pointer hover:border-yellow-400 transition
          "
        >
          <FiUpload className="text-xl mb-2" />
          Upload {contentType === "video" ? "Video" : "PDF"}
          <input
            type="file"
            accept={contentType === "video" ? "video/*" : "application/pdf"}
            className="hidden"
          />
        </label>
      )}

      {/* Link Input */}
      {contentType === "link" && (
        <div className="space-y-3">
          <input
            type="url"
            placeholder="Paste resource link (https://...)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="
              w-full border border-gray-200 rounded-xl
              px-5 py-3 text-sm bg-white
              focus:outline-none focus:ring-2 focus:ring-yellow-400
            "
          />

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                text-sm text-blue-600 hover:underline
              "
            >
              <FiExternalLink />
              Open Link
            </a>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-6">
        <button
          onClick={onClose}
          className="
            px-8 py-3 border border-gray-300
            rounded-xl text-sm bg-white
          "
        >
          Cancel
        </button>

        <button
          className="
            px-8 py-3 bg-yellow-400
            rounded-xl text-sm font-medium
          "
        >
          Done
        </button>
      </div>
    </div>
  );
}

// export default function AddLessonForm({ onClose }) {
//   return (
//     <div className="space-y-4">
//       <input
//         type="text"
//         placeholder="Lesson Title"
//         className="w-full border rounded-lg px-4 py-2 text-sm"
//       />

//       <input
//         type="text"
//         placeholder="Description"
//         className="w-full border rounded-lg px-4 py-2 text-sm"
//       />

//       <input
//         type="text"
//         placeholder="Duration"
//         className="w-full border rounded-lg px-4 py-2 text-sm"
//       />

//       <select className="w-full border rounded-lg px-4 py-2 text-sm">
//         <option>Upload Content Type</option>
//         <option>Video</option>
//         <option>PDF</option>
//       </select>

//       {/* Upload box */}
//       <div className="border border-dashed rounded-lg p-6 text-center text-sm text-gray-500">
//         Upload Content
//       </div>

//       {/* Actions */}
//       <div className="flex justify-end gap-3 pt-4">
//         <button
//           onClick={onClose}
//           className="px-6 py-2 border rounded-lg text-sm"
//         >
//           Cancel
//         </button>
//         <button className="px-6 py-2 bg-yellow-400 rounded-lg text-sm font-medium">
//           Done
//         </button>
//       </div>
//     </div>
//   );
// }
