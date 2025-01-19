import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

function AnalyzeComponent({ results, setResults, resetCamera, dataUri }) {
  // Calculate total calories from components
  const totalCalories = results.components.reduce(
    (sum, component) => sum + component.calories,
    0
  );

  return (
    <div className="p-6 bg-[#FDF8F5] text-black">
      <div className="flex items-center gap-2">
        <h1 className="text-4xl font-bold">{results.food}</h1>
        <button className="text-2xl">✎</button>
      </div>

      <div className="mb-8">
        <img
          src={dataUri}
          alt="Analyzed meal"
          className="w-full rounded-3xl shadow-lg mb-4"
        />
        <div className="text-2xl font-semibold">~ {totalCalories} kcal</div>
      </div>

      {/* Components List */}
      <div className="mt-4">
        <h2 className="text-xl mb-4">Components:</h2>
        <div className="space-y-2">
          {results.components.map((component, index) => (
            <div
              key={index}
              className={`flex justify-between items-center rounded-lg p-2 ${
                index % 2 === 0 ? "bg-orange-100" : "bg-orange-200"
              }`}
            >
              <span className="text-lg">{component.name}</span>
              <span className="text-lg text-orange-600">
                {component.calories} kcal
              </span>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          resetCamera();
        }}
        className="w-full rounded-full border-[1px] border-orange-300 py-3 mt-6 bg-[#FDF8F5] text-black text-lg font-semibold"
      >
        Take Another Photo
      </button>
    </div>
  );
}

export default function Photo() {
  const router = useRouter();
  const [streaming, setStreaming] = useState(false);
  const [dataUri, setDataUri] = useState("");
  const [dimensions, setDimensions] = useState({ width: 320, height: 240 });
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const photoRef = useRef(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Set dimensions after component mounts (client-side only)
    setDimensions({
      width: window.innerWidth,
      height: window.innerWidth * (16 / 9),
    });
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      // Cleanup: stop all video streams when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error(`An error occurred: ${err}`);
    }
  };

  const handleCanPlay = (ev) => {
    if (!streaming) {
      setStreaming(true);
    }
  };

  const clearPhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, dimensions.width, dimensions.height);

    const data = canvasRef.current.toDataURL("image/png");
    setDataUri(data);
  };

  const takePicture = () => {
    const context = canvasRef.current.getContext("2d");
    if (dimensions.width && dimensions.height) {
      canvasRef.current.width = dimensions.width;
      canvasRef.current.height = dimensions.height;
      context.drawImage(
        videoRef.current,
        0,
        0,
        dimensions.width,
        dimensions.height
      );

      const data = canvasRef.current.toDataURL("image/png");
      setDataUri(data);
    } else {
      clearPhoto();
    }
  };

  const retakePhoto = () => {
    setDataUri("");
    startCamera();
    setResults(null);
  };

  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);
      const base64Image = dataUri.split(",")[1];

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error analyzing image:", error);
      // Handle error appropriately
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen max-h-screen bg-black text-white flex flex-col">
      {dataUri ? (
        // Confirmation/Analysis Screen
        <div className="flex flex-col h-screen">
          {!analyzing && (
            <div className={`p-6 ${analyzing ? "hidden" : "p-0"}`}>
              <h1 className="text-2xl font-bold text-center">
                {analyzing
                  ? "Analyzing Image..."
                  : results
                    ? null
                    : "Confirm Picture Selection"}
              </h1>
            </div>
          )}

          {!results && (
            <div className="flex-1 flex items-center justify-center">
              <img
                src={dataUri}
                alt="Captured"
                className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
              />
            </div>
          )}

          {results ? (
            // Show results
            <AnalyzeComponent
              results={results}
              setResults={setResults}
              resetCamera={retakePhoto}
              dataUri={dataUri}
            />
          ) : (
            // Show action buttons
            <div className="flex justify-between p-6">
              <button
                onClick={retakePhoto}
                className="text-white text-lg font-semibold"
                disabled={analyzing}
              >
                Retake
              </button>
              <button
                onClick={handleAnalyze}
                className="text-white text-lg font-semibold"
                disabled={analyzing}
              >
                {analyzing ? "Analyzing..." : "Analyze"}
              </button>
            </div>
          )}
        </div>
      ) : (
        // Camera Screen
        <div className="flex flex-col h-screen">
          <div className="p-6 flex items-center gap-2">
            <h1 className="text-2xl font-bold">
              Quick Scan / Upload your Meal
            </h1>
            <span className="text-2xl">⚡</span>
          </div>

          <div className="flex-1 bg-neutral-900 relative">
            <video
              ref={videoRef}
              onCanPlay={handleCanPlay}
              className="w-full h-full object-cover"
            >
              Video stream not available.
            </video>
          </div>

          <div className="p-6 flex border-2 items-center">
            <button
              onClick={() => setDataUri("")}
              className="text-white text-lg border-2 max-w-32"
            >
              Cancel
            </button>

            <button
              onClick={takePicture}
              className="w-16 h-16 rounded-full mx-auto border-4 border-white p-1"
            >
              <div className="w-full h-full rounded-full bg-white"></div>
            </button>

            <label className="text-white text-lg max-w-32 border-2">
              Upload from Camera Roll
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setDataUri(event.target.result);
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="hidden"
      />
    </div>
  );
}
