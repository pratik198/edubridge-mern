// import { useParams, Link } from "react-router-dom";
// import { useRef, useState, useEffect } from "react";
// import Navbar from "../../../components/studentcomponents/Navbar";
// import Footer from "../../../components/studentcomponents/Footer";
// import { courses } from "../../../data/courses";
// import {
//   Play,
//   Pause,
//   Volume2,
//   VolumeX,
//   Download,
//   FileText,
//   Settings,
//   Maximize,
//   Minimize,
// } from "lucide-react";

// const LessonPlayer = () => {
//   const { courseId, moduleId, lessonId } = useParams();

//   const course = courses.find((c) => c._id === courseId);
//   const moduleIndex = course?.modules.findIndex((m) => m._id === moduleId);
//   const module = course?.modules[moduleIndex];

//   const lessonIndex = module?.lessons.findIndex((l) => l._id === lessonId);
//   const lesson = module?.lessons[lessonIndex];

//   const videoRef = useRef(null);
//   const containerRef = useRef(null);

//   const [playing, setPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [isMuted, setIsMuted] = useState(false);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);
//   const [showSpeedMenu, setShowSpeedMenu] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   if (!course || !module || !lesson)
//     return <div className="pt-24 px-10">Not found</div>;

//   /* ================= NEXT LESSON LOGIC ================= */

//   let nextLesson = null;
//   let prevLesson = null;

//   // NEXT
//   if (lessonIndex < module.lessons.length - 1) {
//     nextLesson = module.lessons[lessonIndex + 1];
//   } else if (moduleIndex < course.modules.length - 1) {
//     const nextModule = course.modules[moduleIndex + 1];
//     nextLesson = nextModule.lessons[0];
//   }

//   // PREVIOUS
//   if (lessonIndex > 0) {
//     prevLesson = module.lessons[lessonIndex - 1];
//   } else if (moduleIndex > 0) {
//     const prevModule = course.modules[moduleIndex - 1];
//     prevLesson = prevModule.lessons[prevModule.lessons.length - 1];
//   }

//   /* ================= VIDEO CONTROLS ================= */

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
//   };

//   const formatTime = (seconds) => {
//     if (!seconds || isNaN(seconds)) return "0:00";
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.load();
//       setPlaying(false);
//       setCurrentTime(0);
//       setProgress(0);
//     }
//   }, [lessonId]);

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
//               <h2 className="text-lg font-semibold text-gray-900 mb-6">
//                 {course.title}
//               </h2>

//               {module.lessons.map((l) => (
//                 <Link
//                   key={l._id}
//                   to={
//                     l.type === "quiz"
//                       ? `/student-course/${course._id}/${module._id}/${l._id}/quiz`
//                       : `/student-course/${course._id}/${module._id}/${l._id}/learn`
//                   }
//                   className={`block rounded-lg p-4 border mb-2 ${
//                     l._id === lesson._id
//                       ? "bg-gray-200"
//                       : "bg-gray-50 hover:bg-gray-100"
//                   }`}
//                 >
//                   {l.title}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* ================= RIGHT SIDE ================= */}
//           <div className="flex-1">
//             <div className="mb-8 border-b border-gray-200 pb-4 flex justify-between items-center">
//               <h1 className="text-2xl font-semibold">{lesson.title}</h1>

//               <div className="flex gap-6">
//                 {/* PREVIOUS BUTTON */}
//                 {prevLesson && (
//                   <Link
//                     to={
//                       prevLesson.type === "quiz"
//                         ? `/student-course/${course._id}/${module._id}/${prevLesson._id}/quiz`
//                         : `/student-course/${course._id}/${module._id}/${prevLesson._id}/learn`
//                     }
//                     className="text-gray-600 hover:text-black font-medium"
//                   >
//                     ← Previous
//                   </Link>
//                 )}

//                 {/* NEXT BUTTON */}
//                 {nextLesson && (
//                   <Link
//                     to={
//                       nextLesson.type === "quiz"
//                         ? `/student-course/${course._id}/${module._id}/${nextLesson._id}/quiz`
//                         : `/student-course/${course._id}/${module._id}/${nextLesson._id}/learn`
//                     }
//                     className="text-yellow-500 font-medium"
//                   >
//                     Next →
//                   </Link>
//                 )}
//               </div>
//             </div>

//             {/* VIDEO */}
//             {lesson.type === "video" && (
//               <div className="max-w-4xl">
//                 <video
//                   ref={videoRef}
//                   onTimeUpdate={handleTimeUpdate}
//                   onLoadedMetadata={handleTimeUpdate}
//                   className="w-full rounded-xl"
//                   controls
//                 >
//                   <source src={lesson.videoUrl} type="video/mp4" />
//                 </video>

//                 <div className="mt-4 text-sm text-gray-500">
//                   {formatTime(currentTime)} / {formatTime(duration)}
//                 </div>
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

import { useParams, Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Navbar from "../../../components/studentcomponents/Navbar";
import Footer from "../../../components/studentcomponents/Footer";
import { courses } from "../../../data/courses";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  FileText,
  Settings,
  Maximize,
  Minimize,
} from "lucide-react";

const LessonPlayer = () => {
  const { courseId, moduleId, lessonId } = useParams();

  const course = courses.find((c) => c._id === courseId);
  const module = course?.modules.find((m) => m._id === moduleId);
  const lesson = module?.lessons.find((l) => l._id === lessonId);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!course || !module || !lesson)
    return <div className="pt-24 px-10">Not found</div>;

  // Toggle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    playing ? videoRef.current.pause() : videoRef.current.play();
    setPlaying(!playing);
  };

  // Handle video time updates
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    setCurrentTime(current);
    setDuration(dur);
    setProgress((current / dur) * 100);
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    videoRef.current.currentTime = percentage * videoRef.current.duration;
  };

  // Format time in MM:SS
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Toggle mute
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

  // Change volume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // Change playback speed
  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      // Enter fullscreen
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) {
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement,
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange,
      );
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!videoRef.current) return;

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "arrowleft":
          e.preventDefault();
          videoRef.current.currentTime = Math.max(
            0,
            videoRef.current.currentTime - 5,
          );
          break;
        case "arrowright":
          e.preventDefault();
          videoRef.current.currentTime = Math.min(
            videoRef.current.duration,
            videoRef.current.currentTime + 5,
          );
          break;
        case "arrowup":
          e.preventDefault();
          const newVolumeUp = Math.min(1, volume + 0.1);
          setVolume(newVolumeUp);
          videoRef.current.volume = newVolumeUp;
          setIsMuted(false);
          break;
        case "arrowdown":
          e.preventDefault();
          const newVolumeDown = Math.max(0, volume - 0.1);
          setVolume(newVolumeDown);
          videoRef.current.volume = newVolumeDown;
          if (newVolumeDown === 0) setIsMuted(true);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [playing, volume, isFullscreen]);

  // Close speed menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showSpeedMenu && !e.target.closest(".speed-menu-container")) {
        setShowSpeedMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSpeedMenu]);

  const currentLessonIndex = module.lessons.findIndex(
    (l) => l._id === lesson._id,
  );

  let nextLesson = null;
  let prevLesson = null;

  // NEXT lesson (same module only — keeping your original logic style)
  if (currentLessonIndex < module.lessons.length - 1) {
    nextLesson = module.lessons[currentLessonIndex + 1];
  }

  // PREVIOUS lesson
  if (currentLessonIndex > 0) {
    prevLesson = module.lessons[currentLessonIndex - 1];
  }

  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setPlaying(false);
      setCurrentTime(0);
      setProgress(0);
    }
  }, [lessonId]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <div className="bg-white min-h-screen pt-24 flex flex-col">
        <div className="flex flex-1 px-8 lg:px-16 py-10 gap-12">
          {/* SIDEBAR */}
          {/* SIDEBAR */}
          <div className="hidden md:block w-72">
            <div className="bg-white border border-gray-200 rounded-xl p-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {/* Course Title */}
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                {course.title}
              </h2>

              {/* Module Info */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Module {module.id}</p>
                <h3 className="text-sm font-medium text-gray-800">
                  {module.title}
                </h3>
              </div>

              {/* Lessons List */}
              <div className="mt-4 space-y-3">
                {module.lessons.map((l) => (
                  <Link
                    key={l._id}
                    to={
                      l.type === "quiz"
                        ? `/student-course/${course._id}/${module._id}/${l._id}/quiz`
                        : `/student-course/${course._id}/${module._id}/${l._id}/learn`
                    }
                    className={`block rounded-lg p-4 border transition-all ${
                      l._id === lesson._id
                        ? "bg-gray-200 border-gray-300"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="mt-1">
                        {l.type === "video" ? (
                          <div className="w-6 h-6 flex items-center justify-center border border-gray-400 rounded">
                            ▶
                          </div>
                        ) : (
                          <div className="w-6 h-6 flex items-center justify-center border border-gray-400 rounded">
                            ≡
                          </div>
                        )}
                      </div>

                      {/* Title + Duration */}
                      <div>
                        <p
                          className={`text-sm ${
                            l.id === lesson.id
                              ? "font-medium text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {l.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {l.duration} min
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Grades Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">Grades</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1">
            <div className="mb-8 border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">{lesson.title}</h1>

                <div className="flex gap-6">
                  {/* PREVIOUS BUTTON */}
                  {prevLesson && (
                    <Link
                      to={
                        prevLesson.type === "quiz"
                          ? `/student-course/${course._id}/${module._id}/${prevLesson._id}/quiz`
                          : `/student-course/${course._id}/${module._id}/${prevLesson._id}/learn`
                      }
                      className="text-gray-600 font-medium hover:text-black"
                    >
                      ← Previous
                    </Link>
                  )}

                  {/* NEXT BUTTON */}
                  {nextLesson && (
                    <Link
                      to={
                        nextLesson.type === "quiz"
                          ? `/student-course/${course._id}/${module._id}/${nextLesson._id}/quiz`
                          : `/student-course/${course._id}/${module._id}/${nextLesson._id}/learn`
                      }
                      className="text-yellow-500 font-medium"
                    >
                      Next →
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* VIDEO */}
            <div className="flex justify-center">
              <div className="w-full max-w-5xl">
                <div
                  ref={containerRef}
                  className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden"
                >
                  {/* Proper 16:9 Ratio */}
                  <div className="relative bg-black aspect-video">
                    <video
                      ref={videoRef}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleTimeUpdate}
                      className="w-full h-full object-contain"
                      onClick={togglePlay}
                    >
                      {/* <source
                        src="https://www.w3schools.com/html/mov_bbb.mp4"
                        type="video/mp4"
                      /> */}
                      {lesson.type === "video" && (
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
                  </div>

                  {/* CONTROLS */}
                  <div className="px-6 py-4 border-t border-gray-100 bg-white">
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Play/Pause */}
                      <button
                        onClick={togglePlay}
                        className="text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        {playing ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 fill-gray-700" />
                        )}
                      </button>

                      {/* Volume Control */}
                      <div className="flex items-center gap-2 group">
                        <button
                          onClick={toggleMute}
                          className="text-gray-700 hover:text-gray-900 transition-colors"
                        >
                          {isMuted || volume === 0 ? (
                            <VolumeX className="w-5 h-5" />
                          ) : (
                            <Volume2 className="w-5 h-5" />
                          )}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-0 group-hover:w-20 transition-all duration-200 accent-yellow-400"
                        />
                      </div>

                      {/* Current Time */}
                      <span className="text-sm text-gray-600 min-w-[60px]">
                        {formatTime(currentTime)}
                      </span>

                      {/* Progress Bar */}
                      <div
                        className="flex-1 bg-gray-200 h-1.5 rounded-full overflow-hidden cursor-pointer group"
                        onClick={handleProgressClick}
                      >
                        <div
                          className="bg-yellow-400 h-full transition-all relative group-hover:h-2"
                          style={{ width: `${progress}%` }}
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      </div>

                      {/* Duration */}
                      <span className="text-sm text-gray-600 min-w-[60px] text-right">
                        {formatTime(duration)}
                      </span>

                      {/* Right Controls */}
                      <div className="flex items-center gap-3">
                        <button className="text-gray-700 hover:text-gray-900 transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                        <button className="text-gray-700 hover:text-gray-900 transition-colors">
                          <FileText className="w-5 h-5" />
                        </button>

                        {/* Speed Settings */}
                        <div className="relative speed-menu-container">
                          <button
                            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                            className="text-gray-700 hover:text-gray-900 transition-colors"
                          >
                            <Settings className="w-5 h-5" />
                          </button>

                          {showSpeedMenu && (
                            <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[120px]">
                              <div className="px-3 py-1 text-xs font-semibold text-gray-500 border-b border-gray-100 mb-1">
                                Playback Speed
                              </div>
                              {speedOptions.map((speed) => (
                                <button
                                  key={speed}
                                  onClick={() => handleSpeedChange(speed)}
                                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                    playbackSpeed === speed
                                      ? "text-yellow-500 font-medium"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {speed === 1 ? "Normal" : `${speed}x`}
                                  {playbackSpeed === speed && (
                                    <span className="float-right">✓</span>
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Fullscreen */}
                        <button
                          onClick={toggleFullscreen}
                          className="text-gray-700 hover:text-gray-900 transition-colors"
                        >
                          {isFullscreen ? (
                            <Minimize className="w-5 h-5" />
                          ) : (
                            <Maximize className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default LessonPlayer;
