// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { MessageCircle } from "lucide-react";

// const FeedbackTeacher = () => {
//   const { courseId, moduleId, lessonId } = useParams();

//   const token = localStorage.getItem("token");
//   const isLoggedIn = !!token;

//   const [comments, setComments] = useState([]);
//   const [replyTo, setReplyTo] = useState(null);
//   const [replyMessage, setReplyMessage] = useState("");
//   const [userId, setUserId] = useState(null);
//   const [role, setRole] = useState(null);

//   // ===== GET USER FROM TOKEN =====
//   useEffect(() => {
//     if (!token) return;

//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       setUserId(payload.id);
//       setRole(payload.role);
//     } catch (err) {
//       console.error("Invalid token");
//     }
//   }, [token]);

//   // ===== FETCH COMMENTS =====
//   const fetchComments = async () => {
//     const res = await fetch(
//       `http://localhost:5000/api/comments/${courseId}/${moduleId}/${lessonId}`
//     );

//     const data = await res.json();
//     if (data.success) setComments(data.comments);
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [lessonId]);

//   // ===== TEACHER REPLY =====
//   const postReply = async (parentId) => {
//     if (!isLoggedIn || role !== "educator") return;
//     if (!replyMessage.trim()) return;

//     await fetch("http://localhost:5000/api/comments", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         courseId,
//         moduleId,
//         lessonId,
//         message: replyMessage,
//         parentComment: parentId,
//       }),
//     });

//     setReplyMessage("");
//     setReplyTo(null);
//     fetchComments();
//   };

//   const mainComments = comments.filter((c) => !c.parentComment);
//   const replies = comments.filter((c) => c.parentComment);

//   const timeAgo = (date) => {
//     const seconds = Math.floor((new Date() - new Date(date)) / 1000);
//     if (seconds < 60) return "Just now";
//     if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
//     if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
//     return `${Math.floor(seconds / 86400)}d ago`;
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-14 px-4">
//       <h2 className="text-xl font-semibold mb-8 text-gray-800">
//         Student Discussion
//       </h2>

//       <div className="space-y-8">
//         {mainComments.map((comment) => (
//           <div key={comment._id} className="flex gap-4">

//             {/* Avatar */}
//             <div className="h-9 w-9 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 text-xs font-semibold shadow-sm">
//               {comment.userId?.fullName?.charAt(0)}
//             </div>

//             <div className="flex-1 bg-white rounded-2xl shadow-md p-5">

//               <div className="flex items-center gap-3">
//                 <p className="text-sm font-semibold">
//                   {comment.userId?.fullName}
//                 </p>

//                 <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
//                   {comment.role}
//                 </span>

//                 <span className="text-xs text-gray-400">
//                   {timeAgo(comment.createdAt)}
//                 </span>
//               </div>

//               <p className="mt-2 text-sm text-gray-700">
//                 {comment.message}
//               </p>

//               {/* Reply button (Teacher only) */}
//               {isLoggedIn && role === "educator" && (
//                 <button
//                   onClick={() => setReplyTo(comment._id)}
//                   className="flex items-center text-xs text-yellow-600 mt-4"
//                 >
//                   <MessageCircle size={14} className="mr-1" />
//                   Reply
//                 </button>
//               )}

//               {/* Reply box */}
//               {replyTo === comment._id && (
//                 <div className="mt-4 ml-4">
//                   <textarea
//                     className="w-full bg-gray-50 rounded-lg p-2 text-sm"
//                     rows="2"
//                     value={replyMessage}
//                     onChange={(e) => setReplyMessage(e.target.value)}
//                   />
//                   <button
//                     onClick={() => postReply(comment._id)}
//                     className="mt-2 bg-yellow-400 text-white px-4 py-1 rounded-lg text-xs"
//                   >
//                     Send Reply
//                   </button>
//                 </div>
//               )}

//               {/* Replies */}
//               <div className="mt-5 space-y-4">
//                 {replies
//                   .filter((r) => r.parentComment === comment._id)
//                   .map((reply) => (
//                     <div key={reply._id} className="flex gap-3 ml-6">

//                       <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-semibold shadow-sm">
//                         {reply.userId?.fullName?.charAt(0)}
//                       </div>

//                       <div
//                         className={`rounded-xl p-3 flex-1 shadow-sm ${
//                           reply.role === "educator"
//                             ? "bg-yellow-50 border border-yellow-200"
//                             : "bg-gray-50"
//                         }`}
//                       >
//                         <div className="flex items-center gap-2">
//                           <p className="text-xs font-medium">
//                             {reply.userId?.fullName}
//                           </p>

//                           {reply.role === "educator" && (
//                             <span className="text-[10px] bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
//                               Teacher
//                             </span>
//                           )}

//                           <span className="text-[10px] text-gray-400">
//                             {timeAgo(reply.createdAt)}
//                           </span>
//                         </div>

//                         <p className="text-xs mt-1 text-gray-700">
//                           {reply.message}
//                         </p>
//                       </div>

//                     </div>
//                   ))}
//               </div>

//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeedbackTeacher;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const FeedbackTeacher = () => {
  const { courseId, moduleId, lessonId } = useParams();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const [comments, setComments] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [userId, setUserId] = useState(null);

  // ===== GET USER FROM TOKEN =====
  useEffect(() => {
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    } catch (err) {
      console.error("Invalid token");
    }
  }, [token]);

  // ===== FETCH COMMENTS =====
  const fetchComments = async () => {
    const res = await fetch(
      `http://localhost:5000/api/comments/${courseId}/${moduleId}/${lessonId}`,
      {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {},
      }
    );

    const data = await res.json();
    if (data.success) setComments(data.comments);
  };

  useEffect(() => {
    fetchComments();
  }, [lessonId]);

  // ===== POST REPLY =====
  const postReply = async (parentId) => {
    if (!isLoggedIn || !replyMessage.trim()) return;

    const res = await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        courseId,
        moduleId,
        lessonId,
        message: replyMessage,
        parentComment: parentId,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setComments((prev) => [data.comment, ...prev]);
    }

    setReplyMessage("");
    setReplyTo(null);
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  // ===== RECURSIVE THREAD RENDER =====
  const renderReplies = (parentId, level = 1) => {
    return comments
      .filter((c) => c.parentComment === parentId)
      .map((reply) => (
        <div key={reply._id} className={`flex gap-3 ml-${level * 6}`}>
          <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-semibold shadow-sm">
            {reply.userId?.fullName?.charAt(0)}
          </div>

          <div className="bg-gray-50 rounded-xl p-3 flex-1 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <p className="text-xs font-medium">
                  {reply.userId?.fullName}
                </p>
                <span className="text-[10px] text-gray-400">
                  {timeAgo(reply.createdAt)}
                </span>
              </div>

              {isLoggedIn && userId !== reply.userId?._id && (
                <button
                  onClick={() => setReplyTo(reply._id)}
                  className="flex items-center text-[11px] text-yellow-600"
                >
                  <MessageCircle size={12} className="mr-1" />
                  Reply
                </button>
              )}
            </div>

            <p className="text-xs mt-1 text-gray-700">
              {reply.message}
            </p>

            {replyTo === reply._id && (
              <div className="mt-3">
                <textarea
                  className="w-full bg-white border rounded-lg p-2 text-sm"
                  rows="2"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                />
                <button
                  onClick={() => postReply(reply._id)}
                  className="mt-2 bg-yellow-400 text-white px-4 py-1 rounded-lg text-xs"
                >
                  Send
                </button>
              </div>
            )}

            {renderReplies(reply._id, level + 1)}
          </div>
        </div>
      ));
  };

  const mainComments = comments.filter((c) => !c.parentComment);

  return (
    <div className="max-w-3xl mx-auto mt-14 px-4">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Student Discussion
      </h2>

      <div className="space-y-8">
        {mainComments.map((comment) => (
          <div key={comment._id} className="flex gap-4">

            <div className="h-9 w-9 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 text-xs font-semibold shadow-sm">
              {comment.userId?.fullName?.charAt(0)}
            </div>

            <div className="flex-1 bg-white rounded-2xl shadow-md p-5">

              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold">
                  {comment.userId?.fullName}
                </p>

                <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                  {comment.role}
                </span>

                <span className="text-xs text-gray-400">
                  {timeAgo(comment.createdAt)}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-700">
                {comment.message}
              </p>

              {isLoggedIn && userId !== comment.userId?._id && (
                <button
                  onClick={() => setReplyTo(comment._id)}
                  className="flex items-center text-xs text-yellow-600 mt-4"
                >
                  <MessageCircle size={14} className="mr-1" />
                  Reply
                </button>
              )}

              {replyTo === comment._id && (
                <div className="mt-4 ml-4">
                  <textarea
                    className="w-full bg-gray-50 rounded-lg p-2 text-sm"
                    rows="2"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                  />
                  <button
                    onClick={() => postReply(comment._id)}
                    className="mt-2 bg-yellow-400 text-white px-4 py-1 rounded-lg text-xs"
                  >
                    Send
                  </button>
                </div>
              )}

              {renderReplies(comment._id)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackTeacher;
