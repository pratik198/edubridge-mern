
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CertificateView = () => {
  const { courseId } = useParams();
  const token = localStorage.getItem("token");

  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let objectUrl;

    const fetchCertificate = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/certificate/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const data = await res.json();
          setError(data.message);
          setLoading(false);
          return;
        }

        const blob = await res.blob();
        objectUrl = window.URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
      } catch (err) {
        setError("Failed to load certificate");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();

    return () => {
      if (objectUrl) {
        window.URL.revokeObjectURL(objectUrl);
      }
    };
  }, [courseId, token]);

  const downloadCertificate = () => {
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "certificate.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading certificate...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 px-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-10 py-8">

        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8 text-center">
          Your Certificate
        </h1>

        {pdfUrl && (
          <>
            {/* PDF Container */}
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src={pdfUrl}
                title="Certificate Preview"
                className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px]"
              />
            </div>

            {/* Download Button */}
            <button
              onClick={downloadCertificate}
              className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-8 py-3 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
            >
              Download Certificate
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CertificateView;