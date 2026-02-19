
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useRef, useState, useEffect } from "react";
// import Navbar from "../../../components/studentcomponents/Navbar";
// import Footer from "../../../components/studentcomponents/Footer";
// import {
//   Play,
//   Pause,
//   Volume2,
//   VolumeX,
//   FileText,
//   Settings,
//   Maximize,
//   Minimize,
// } from "lucide-react";

// const LessonPlayer = () => {
//   const { courseId, moduleId, lessonId } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const videoRef = useRef(null);
//   const containerRef = useRef(null);

//   const [course, setCourse] = useState(null);
//   const [playing, setPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [isMuted, setIsMuted] = useState(false);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);
//   const [showSpeedMenu, setShowSpeedMenu] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [completedLessons, setCompletedLessons] = useState([]);
//   const [markedComplete, setMarkedComplete] = useState(false);

//   // ================= FETCH COURSE =================
//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/courses/student/${courseId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const data = await res.json();

//         if (data.success) {
//           setCourse(data.course);
//           // Load completed lessons from response if available
//           if (data.completedLessons) {
//             setCompletedLessons(data.completedLessons);
//           }
//         } else {
//           navigate("/s-enrolled-courses");
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchCourse();
//   }, [courseId]);

//   // ================= FULLSCREEN LISTENER =================
//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };
//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
//   }, []);

//   // ================= RESET ON LESSON CHANGE =================
//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.load();
//       setPlaying(false);
//       setCurrentTime(0);
//       setProgress(0);
//       setMarkedComplete(false);
//     }
//   }, [lessonId]);

//   if (!course) return <div className="pt-24 px-10">Loading...</div>;

//   const moduleIndex = course.modules.findIndex((m) => m._id === moduleId);
//   const module = course.modules[moduleIndex];
//   if (!module) return <div className="pt-24 px-10">Module not found</div>;

//   // ✅ Merge lessons + quizzes properly
//   const combinedLessons = [
//     ...module.lessons.map((l) => ({ ...l, type: "video" })),
//     ...module.quizzes.map((q) => ({
//       ...q,
//       type: "quiz",
//       duration: "Quiz",
//     })),
//   ];

//   const lessonIndex = combinedLessons.findIndex((l) => l._id === lessonId);
//   const lesson = combinedLessons[lessonIndex];

//   if (!lesson) return <div className="pt-24 px-10">Lesson not found</div>;

//   // ================= NEXT / PREV =================
//   let nextLesson = null;
//   let nextModuleId = moduleId;
//   let prevLesson = null;
//   let prevModuleId = moduleId;

//   if (lessonIndex < combinedLessons.length - 1) {
//     nextLesson = combinedLessons[lessonIndex + 1];
//     nextModuleId = moduleId;
//   } else if (moduleIndex < course.modules.length - 1) {
//     const nextModule = course.modules[moduleIndex + 1];
//     nextLesson = nextModule.lessons[0] || nextModule.quizzes[0] || null;
//     nextModuleId = nextModule._id;
//   }

//   if (lessonIndex > 0) {
//     prevLesson = combinedLessons[lessonIndex - 1];
//     prevModuleId = moduleId;
//   } else if (moduleIndex > 0) {
//     const prevModule = course.modules[moduleIndex - 1];
//     const prevCombined = [
//       ...prevModule.lessons.map((l) => ({ ...l, type: "video" })),
//       ...prevModule.quizzes.map((q) => ({ ...q, type: "quiz" })),
//     ];
//     prevLesson = prevCombined[prevCombined.length - 1] || null;
//     prevModuleId = prevModule._id;
//   }

//   // ================= MARK LESSON COMPLETE =================
//   const markLessonComplete = async () => {
//     if (markedComplete) return;
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/courses/${courseId}/${moduleId}/${lessonId}/complete`,
//         {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const data = await res.json();
//       if (data.success) {
//         setMarkedComplete(true);
//         setCompletedLessons((prev) => [...prev, lessonId]);
//       }
//     } catch (err) {
//       console.error("Failed to mark lesson complete:", err);
//     }
//   };

//   // ================= VIDEO CONTROLS =================

//   const togglePlay = () => {
//     if (!videoRef.current) return;
//     playing ? videoRef.current.pause() : videoRef.current.play();
//     setPlaying(!playing);
//   };

//   const handleTimeUpdate = () => {
//     if (!videoRef.current) return;
//     const current = videoRef.current.currentTime;
//     const dur = videoRef.current.duration;
//     setCurrentTime(current);
//     setDuration(dur);
//     setProgress((current / dur) * 100);

//     // Auto-mark complete when 90% watched
//     if (dur > 0 && current / dur >= 0.9 && !markedComplete) {
//       markLessonComplete();
//     }
//   };

//   const handleVideoEnded = () => {
//     setPlaying(false);
//     markLessonComplete();

//     // Auto-navigate to next lesson after 2 seconds
//     if (nextLesson) {
//       setTimeout(() => {
//         const path =
//           nextLesson.type === "quiz"
//             ? `/student-course/${course._id}/${nextModuleId}/${nextLesson._id}/quiz`
//             : `/student-course/${course._id}/${nextModuleId}/${nextLesson._id}/learn`;
//         navigate(path);
//       }, 2000);
//     }
//   };

//   const handleProgressClick = (e) => {
//     if (!videoRef.current) return;
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const percentage = x / rect.width;
//     videoRef.current.currentTime = percentage * videoRef.current.duration;
//   };

//   const formatTime = (seconds) => {
//     if (!seconds || isNaN(seconds)) return "0:00";
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const toggleMute = () => {
//     if (!videoRef.current) return;
//     if (isMuted) {
//       videoRef.current.volume = volume;
//       setIsMuted(false);
//     } else {
//       videoRef.current.volume = 0;
//       setIsMuted(true);
//     }
//   };

//   const handleVolumeChange = (e) => {
//     const val = parseFloat(e.target.value);
//     setVolume(val);
//     if (videoRef.current) {
//       videoRef.current.volume = val;
//     }
//     setIsMuted(val === 0);
//   };

//   const handleSpeedChange = (speed) => {
//     setPlaybackSpeed(speed);
//     if (videoRef.current) {
//       videoRef.current.playbackRate = speed;
//     }
//     setShowSpeedMenu(false);
//   };

//   const toggleFullscreen = () => {
//     if (!containerRef.current) return;
//     if (!isFullscreen) {
//       containerRef.current.requestFullscreen();
//     } else {
//       document.exitFullscreen();
//     }
//   };

//   const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

//   const getLessonPath = (l, mId) =>
//     l.type === "quiz"
//       ? `/student-course/${course._id}/${mId}/${l._id}/quiz`
//       : `/student-course/${course._id}/${mId}/${l._id}/learn`;

//   const isCompleted = (id) => completedLessons.includes(id);

//   return (
//     <>
//       <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
//         <Navbar />
//       </div>

//       <div className="bg-white min-h-screen pt-24 flex flex-col">
//         <div className="flex flex-1 px-8 lg:px-16 py-10 gap-12">

//           {/* ================= SIDEBAR ================= */}
//           <div className="hidden md:block w-72">
//             <div className="bg-white border border-gray-200 rounded-xl p-5 max-h-[80vh] overflow-y-auto">
//               <h2 className="text-lg font-semibold mb-6">{course.title}</h2>

//               {/* All modules with their lessons */}
//               <div className="space-y-6">
//                 {course.modules.map((mod, modIdx) => {
//                   const modCombined = [
//                     ...mod.lessons.map((l) => ({ ...l, type: "video" })),
//                     ...mod.quizzes.map((q) => ({ ...q, type: "quiz", duration: "Quiz" })),
//                   ];
//                   return (
//                     <div key={mod._id}>
//                       <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
//                         Module {modIdx + 1}: {mod.title}
//                       </p>
//                       <div className="space-y-2">
//                         {modCombined.map((l) => {
//                           const isActive = l._id === lesson._id && mod._id === moduleId;
//                           const done = isCompleted(l._id);
//                           return (
//                             <Link
//                               key={l._id}
//                               to={getLessonPath(l, mod._id)}
//                               className={`block rounded-lg p-4 border transition-all ${
//                                 isActive
//                                   ? "bg-gray-200 border-gray-300"
//                                   : "bg-gray-50 border-gray-200 hover:bg-gray-100"
//                               }`}
//                             >
//                               <div className="flex items-start gap-3">
//                                 <div className="mt-1 flex-shrink-0">
//                                   {done ? (
//                                     <div className="w-6 h-6 flex items-center justify-center border rounded bg-green-100 text-green-600 text-xs font-bold">
//                                       ✓
//                                     </div>
//                                   ) : l.type === "video" ? (
//                                     <div className="w-6 h-6 flex items-center justify-center border rounded">
//                                       ▶
//                                     </div>
//                                   ) : (
//                                     <div className="w-6 h-6 flex items-center justify-center border rounded">
//                                       ≡
//                                     </div>
//                                   )}
//                                 </div>
//                                 <div>
//                                   <p className="text-sm font-medium">{l.title}</p>
//                                   <p className="text-xs text-gray-500 mt-1">{l.duration}</p>
//                                 </div>
//                               </div>
//                             </Link>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* ================= RIGHT SIDE ================= */}
//           <div className="flex-1">
//             <div className="mb-8 border-b border-gray-200 pb-4 flex justify-between">
//               <h1 className="text-2xl font-semibold">{lesson.title}</h1>

//               <div className="flex gap-6">
//                 {prevLesson && (
//                   <Link
//                     to={getLessonPath(prevLesson, prevModuleId)}
//                     className="text-gray-600 font-medium hover:text-black"
//                   >
//                     ← Previous
//                   </Link>
//                 )}

//                 {nextLesson && (
//                   <Link
//                     to={getLessonPath(nextLesson, nextModuleId)}
//                     className="text-yellow-500 font-medium"
//                   >
//                     Next →
//                   </Link>
//                 )}
//               </div>
//             </div>

//             {/* ================= CONTENT ================= */}

//             {lesson.type === "video" ? (
//               /* ================= VIDEO PLAYER ================= */
//               <div className="flex justify-center">
//                 <div className="w-full max-w-5xl">
//                   <div
//                     ref={containerRef}
//                     className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden"
//                   >
//                     <div className="relative bg-black aspect-video">
//                       <video
//                         ref={videoRef}
//                         onTimeUpdate={handleTimeUpdate}
//                         onLoadedMetadata={handleTimeUpdate}
//                         onEnded={handleVideoEnded}
//                         className="w-full h-full object-contain"
//                         onClick={togglePlay}
//                       >
//                         {lesson.videoUrl && (
//                           <source src={lesson.videoUrl} type="video/mp4" />
//                         )}
//                       </video>

//                       {!playing && (
//                         <button
//                           onClick={togglePlay}
//                           className="absolute inset-0 flex items-center justify-center bg-black/20"
//                         >
//                           <div className="bg-white rounded-full p-6 shadow-xl">
//                             <Play className="w-10 h-10 text-gray-900 fill-gray-900" />
//                           </div>
//                         </button>
//                       )}

//                       {/* Auto-play next overlay */}
//                       {!playing && markedComplete && nextLesson && currentTime > 0 && duration > 0 && currentTime >= duration - 0.5 && (
//                         <div className="absolute bottom-6 right-6 bg-black/70 text-white rounded-xl px-4 py-3 text-sm">
//                           Next lesson loading...
//                         </div>
//                       )}
//                     </div>

//                     {/* CONTROLS */}
//                     <div className="px-6 py-4 border-t bg-white">
//                       <div className="flex flex-wrap items-center gap-4">
//                         <button onClick={togglePlay}>
//                           {playing ? <Pause /> : <Play />}
//                         </button>

//                         <button onClick={toggleMute}>
//                           {isMuted ? <VolumeX /> : <Volume2 />}
//                         </button>

//                         {/* Volume slider */}
//                         <input
//                           type="range"
//                           min={0}
//                           max={1}
//                           step={0.05}
//                           value={isMuted ? 0 : volume}
//                           onChange={handleVolumeChange}
//                           className="w-20 accent-yellow-400"
//                         />

//                         <span className="text-sm">
//                           {formatTime(currentTime)} / {formatTime(duration)}
//                         </span>

//                         <div
//                           className="flex-1 bg-gray-200 h-1.5 rounded-full cursor-pointer"
//                           onClick={handleProgressClick}
//                         >
//                           <div
//                             className="bg-yellow-400 h-full rounded-full"
//                             style={{ width: `${progress}%` }}
//                           />
//                         </div>

//                         {/* Completed badge */}
//                         {(markedComplete || isCompleted(lessonId)) && (
//                           <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">
//                             ✓ Completed
//                           </span>
//                         )}

//                         <div className="relative">
//                           <button onClick={() => setShowSpeedMenu(!showSpeedMenu)}>
//                             <Settings />
//                           </button>

//                           {showSpeedMenu && (
//                             <div className="absolute bottom-full right-0 bg-white border rounded shadow p-2 z-10">
//                               <p className="text-xs text-gray-400 mb-1 px-1">Speed</p>
//                               {speedOptions.map((speed) => (
//                                 <button
//                                   key={speed}
//                                   onClick={() => handleSpeedChange(speed)}
//                                   className={`block text-sm py-1 px-2 w-full text-left rounded hover:bg-gray-100 ${
//                                     playbackSpeed === speed ? "font-bold text-yellow-500" : ""
//                                   }`}
//                                 >
//                                   {speed}x
//                                 </button>
//                               ))}
//                             </div>
//                           )}
//                         </div>

//                         <button onClick={toggleFullscreen}>
//                           {isFullscreen ? <Minimize /> : <Maximize />}
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Lesson description if available */}
//                   {lesson.description && (
//                     <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
//                       <h3 className="text-base font-semibold mb-2">About this lesson</h3>
//                       <p className="text-sm text-gray-600">{lesson.description}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               /* ================= QUIZ VIEW ================= */
//               <div className="bg-white border rounded-2xl shadow-md p-10 text-center">
//                 <FileText className="mx-auto mb-4 w-10 h-10 text-gray-700" />
//                 <h2 className="text-xl font-semibold mb-4">{lesson.title}</h2>

//                 <Link
//                   to={`/student-course/${course._id}/${module._id}/${lesson._id}/quiz`}
//                   className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-md font-medium"
//                 >
//                   Start Quiz
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default LessonPlayer;



import { useParams, Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Navbar from "../../../components/studentcomponents/Navbar";
import Footer from "../../../components/studentcomponents/Footer";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileText,
  Settings,
  Maximize,
  Minimize,
} from "lucide-react";

// ================= YOUTUBE HELPER =================
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/
  );
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}?enablejsapi=1&rel=0`;
  }
  return null;
};

const isYouTubeUrl = (url) => !!getYouTubeEmbedUrl(url);

const LessonPlayer = () => {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [course, setCourse] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [markedComplete, setMarkedComplete] = useState(false);

  // ================= FETCH COURSE =================
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/courses/student/${courseId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        if (data.success) {
          setCourse(data.course);
          if (data.completedLessons) {
            setCompletedLessons(data.completedLessons);
          }
        } else {
          navigate("/s-enrolled-courses");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourse();
  }, [courseId]);

  // ================= FULLSCREEN LISTENER =================
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // ================= RESET ON LESSON CHANGE =================
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setPlaying(false);
      setCurrentTime(0);
      setProgress(0);
      setMarkedComplete(false);
    }
    // Reset for YouTube too
    setPlaying(false);
    setCurrentTime(0);
    setProgress(0);
    setMarkedComplete(false);
  }, [lessonId]);

  if (!course) return <div className="pt-24 px-10">Loading...</div>;

  const moduleIndex = course.modules.findIndex((m) => m._id === moduleId);
  const module = course.modules[moduleIndex];
  if (!module) return <div className="pt-24 px-10">Module not found</div>;

  const combinedLessons = [
    ...module.lessons.map((l) => ({ ...l, type: "video" })),
    ...module.quizzes.map((q) => ({
      ...q,
      type: "quiz",
      duration: "Quiz",
    })),
  ];

  const lessonIndex = combinedLessons.findIndex((l) => l._id === lessonId);
  const lesson = combinedLessons[lessonIndex];

  if (!lesson) return <div className="pt-24 px-10">Lesson not found</div>;

  // ================= NEXT / PREV =================
  let nextLesson = null;
  let nextModuleId = moduleId;
  let prevLesson = null;
  let prevModuleId = moduleId;

  if (lessonIndex < combinedLessons.length - 1) {
    nextLesson = combinedLessons[lessonIndex + 1];
    nextModuleId = moduleId;
  } else if (moduleIndex < course.modules.length - 1) {
    const nextModule = course.modules[moduleIndex + 1];
    nextLesson = nextModule.lessons[0] || nextModule.quizzes[0] || null;
    nextModuleId = nextModule._id;
  }

  if (lessonIndex > 0) {
    prevLesson = combinedLessons[lessonIndex - 1];
    prevModuleId = moduleId;
  } else if (moduleIndex > 0) {
    const prevModule = course.modules[moduleIndex - 1];
    const prevCombined = [
      ...prevModule.lessons.map((l) => ({ ...l, type: "video" })),
      ...prevModule.quizzes.map((q) => ({ ...q, type: "quiz" })),
    ];
    prevLesson = prevCombined[prevCombined.length - 1] || null;
    prevModuleId = prevModule._id;
  }

  // ================= MARK LESSON COMPLETE =================
  const markLessonComplete = async () => {
    if (markedComplete) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/courses/${courseId}/${moduleId}/${lessonId}/complete`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data.success) {
        setMarkedComplete(true);
        setCompletedLessons((prev) => [...prev, lessonId]);
      }
    } catch (err) {
      console.error("Failed to mark lesson complete:", err);
    }
  };

  // ================= VIDEO CONTROLS (only for direct video) =================
  const togglePlay = () => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    setCurrentTime(current);
    setDuration(dur);
    setProgress((current / dur) * 100);

    if (dur > 0 && current / dur >= 0.9 && !markedComplete) {
      markLessonComplete();
    }
  };

  const handleVideoEnded = () => {
    setPlaying(false);
    markLessonComplete();

    if (nextLesson) {
      setTimeout(() => {
        const path =
          nextLesson.type === "quiz"
            ? `/student-course/${course._id}/${nextModuleId}/${nextLesson._id}/quiz`
            : `/student-course/${course._id}/${nextModuleId}/${nextLesson._id}/learn`;
        navigate(path);
      }, 2000);
    }
  };

  const handleProgressClick = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    videoRef.current.currentTime = percentage * videoRef.current.duration;
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.volume = volume;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
    }
    setIsMuted(val === 0);
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const getLessonPath = (l, mId) =>
    l.type === "quiz"
      ? `/student-course/${course._id}/${mId}/${l._id}/quiz`
      : `/student-course/${course._id}/${mId}/${l._id}/learn`;

  const isCompleted = (id) => completedLessons.includes(id);

  // ================= DETERMINE VIDEO TYPE =================
  const ytEmbedUrl = lesson.type === "video" ? getYouTubeEmbedUrl(lesson.videoUrl) : null;
  const isYT = !!ytEmbedUrl;

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <div className="bg-white min-h-screen pt-24 flex flex-col">
        <div className="flex flex-1 px-8 lg:px-16 py-10 gap-12">

          {/* ================= SIDEBAR ================= */}
          <div className="hidden md:block w-72">
            <div className="bg-white border border-gray-200 rounded-xl p-5 max-h-[80vh] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-6">{course.title}</h2>

              <div className="space-y-6">
                {course.modules.map((mod, modIdx) => {
                  const modCombined = [
                    ...mod.lessons.map((l) => ({ ...l, type: "video" })),
                    ...mod.quizzes.map((q) => ({ ...q, type: "quiz", duration: "Quiz" })),
                  ];
                  return (
                    <div key={mod._id}>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Module {modIdx + 1}: {mod.title}
                      </p>
                      <div className="space-y-2">
                        {modCombined.map((l) => {
                          const isActive = l._id === lesson._id && mod._id === moduleId;
                          const done = isCompleted(l._id);
                          return (
                            <Link
                              key={l._id}
                              to={getLessonPath(l, mod._id)}
                              className={`block rounded-lg p-4 border transition-all ${
                                isActive
                                  ? "bg-gray-200 border-gray-300"
                                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-1 flex-shrink-0">
                                  {done ? (
                                    <div className="w-6 h-6 flex items-center justify-center border rounded bg-green-100 text-green-600 text-xs font-bold">
                                      ✓
                                    </div>
                                  ) : l.type === "video" ? (
                                    <div className="w-6 h-6 flex items-center justify-center border rounded">
                                      ▶
                                    </div>
                                  ) : (
                                    <div className="w-6 h-6 flex items-center justify-center border rounded">
                                      ≡
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{l.title}</p>
                                  <p className="text-xs text-gray-500 mt-1">{l.duration}</p>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex-1">
            <div className="mb-8 border-b border-gray-200 pb-4 flex justify-between">
              <h1 className="text-2xl font-semibold">{lesson.title}</h1>

              <div className="flex gap-6">
                {prevLesson && (
                  <Link
                    to={getLessonPath(prevLesson, prevModuleId)}
                    className="text-gray-600 font-medium hover:text-black"
                  >
                    ← Previous
                  </Link>
                )}

                {nextLesson && (
                  <Link
                    to={getLessonPath(nextLesson, nextModuleId)}
                    className="text-yellow-500 font-medium"
                  >
                    Next →
                  </Link>
                )}
              </div>
            </div>

            {/* ================= CONTENT ================= */}

            {lesson.type === "video" ? (
              <div className="flex justify-center">
                <div className="w-full max-w-5xl">
                  <div
                    ref={containerRef}
                    className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden"
                  >
                    <div className="relative bg-black aspect-video">

                      {/* ===== YOUTUBE IFRAME ===== */}
                      {isYT ? (
                        <iframe
                          key={lessonId}
                          src={ytEmbedUrl}
                          title={lesson.title}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        /* ===== DIRECT VIDEO ===== */
                        <>
                          <video
                            ref={videoRef}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleTimeUpdate}
                            onEnded={handleVideoEnded}
                            className="w-full h-full object-contain"
                            onClick={togglePlay}
                          >
                            {lesson.videoUrl && (
                              <source src={lesson.videoUrl} type="video/mp4" />
                            )}
                          </video>

                          {!playing && (
                            <button
                              onClick={togglePlay}
                              className="absolute inset-0 flex items-center justify-center bg-black/20"
                            >
                              <div className="bg-white rounded-full p-6 shadow-xl">
                                <Play className="w-10 h-10 text-gray-900 fill-gray-900" />
                              </div>
                            </button>
                          )}

                          {!playing && markedComplete && nextLesson && currentTime > 0 && duration > 0 && currentTime >= duration - 0.5 && (
                            <div className="absolute bottom-6 right-6 bg-black/70 text-white rounded-xl px-4 py-3 text-sm">
                              Next lesson loading...
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* ===== CONTROLS ===== */}
                    {/* For YouTube: simplified controls (just fullscreen + mark complete) */}
                    {/* For direct video: full controls */}
                    <div className="px-6 py-4 border-t bg-white">
                      <div className="flex flex-wrap items-center gap-4">

                        {isYT ? (
                          /* YouTube controls — YouTube has its own player UI */
                          <>
                            <span className="text-sm text-gray-500">
                              YouTube video — use the player controls above
                            </span>

                            {/* Completed badge */}
                            {(markedComplete || isCompleted(lessonId)) ? (
                              <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">
                                ✓ Completed
                              </span>
                            ) : (
                              <button
                                onClick={markLessonComplete}
                                className="text-xs font-semibold bg-yellow-400 hover:bg-yellow-500 px-3 py-1.5 rounded"
                              >
                                Mark as Complete
                              </button>
                            )}

                            <button onClick={toggleFullscreen} className="ml-auto">
                              {isFullscreen ? <Minimize /> : <Maximize />}
                            </button>
                          </>
                        ) : (
                          /* Direct video full controls */
                          <>
                            <button onClick={togglePlay}>
                              {playing ? <Pause /> : <Play />}
                            </button>

                            <button onClick={toggleMute}>
                              {isMuted ? <VolumeX /> : <Volume2 />}
                            </button>

                            <input
                              type="range"
                              min={0}
                              max={1}
                              step={0.05}
                              value={isMuted ? 0 : volume}
                              onChange={handleVolumeChange}
                              className="w-20 accent-yellow-400"
                            />

                            <span className="text-sm">
                              {formatTime(currentTime)} / {formatTime(duration)}
                            </span>

                            <div
                              className="flex-1 bg-gray-200 h-1.5 rounded-full cursor-pointer"
                              onClick={handleProgressClick}
                            >
                              <div
                                className="bg-yellow-400 h-full rounded-full"
                                style={{ width: `${progress}%` }}
                              />
                            </div>

                            {(markedComplete || isCompleted(lessonId)) && (
                              <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">
                                ✓ Completed
                              </span>
                            )}

                            <div className="relative">
                              <button onClick={() => setShowSpeedMenu(!showSpeedMenu)}>
                                <Settings />
                              </button>

                              {showSpeedMenu && (
                                <div className="absolute bottom-full right-0 bg-white border rounded shadow p-2 z-10">
                                  <p className="text-xs text-gray-400 mb-1 px-1">Speed</p>
                                  {speedOptions.map((speed) => (
                                    <button
                                      key={speed}
                                      onClick={() => handleSpeedChange(speed)}
                                      className={`block text-sm py-1 px-2 w-full text-left rounded hover:bg-gray-100 ${
                                        playbackSpeed === speed ? "font-bold text-yellow-500" : ""
                                      }`}
                                    >
                                      {speed}x
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            <button onClick={toggleFullscreen}>
                              {isFullscreen ? <Minimize /> : <Maximize />}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {lesson.description && (
                    <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <h3 className="text-base font-semibold mb-2">About this lesson</h3>
                      <p className="text-sm text-gray-600">{lesson.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* ================= QUIZ VIEW ================= */
              <div className="bg-white border rounded-2xl shadow-md p-10 text-center">
                <FileText className="mx-auto mb-4 w-10 h-10 text-gray-700" />
                <h2 className="text-xl font-semibold mb-4">{lesson.title}</h2>

                <Link
                  to={`/student-course/${course._id}/${module._id}/${lesson._id}/quiz`}
                  className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-md font-medium"
                >
                  Start Quiz
                </Link>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default LessonPlayer;