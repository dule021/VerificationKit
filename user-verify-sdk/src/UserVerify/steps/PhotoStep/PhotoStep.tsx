import { Fragment, h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { StepProps } from "../types";
import { Spinner } from "../../../components/Spinner";

const PhotoStep = ({ formData, errors, updateField }: StepProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraState, setCameraState] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [imageCapture, setImageCapture] = useState<ImageCapture | null>(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoDataUrl, setPhotoDataUrl] = useState<string>("");

  const startCamera = async () => {
    setCameraState("loading");

    try {
      const constraints = {
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      const mediaStream =
        await navigator.mediaDevices.getUserMedia(constraints);

      if (mediaStream) {
        setCameraState("ready");
      }

      setStream(mediaStream);
      const track = mediaStream.getVideoTracks()[0];
      setImageCapture(new ImageCapture(track));
      setCameraState("ready");
    } catch (err: any) {
      console.error("Camera error:", err.name, err.message);
      setCameraState("error");
    }
  };

  useEffect(() => {
    if (cameraState === "ready" && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [cameraState, stream]);

  useEffect(() => {
    if (formData.photo && formData.photo.length) {
      try {
        setHasPhoto(true);
        setPhotoDataUrl(formData.photo);
        setCameraState("ready");
      } catch (_e) {
        setHasPhoto(false);
        setPhotoDataUrl("");
        setCameraState("ready");
      }
    }
  }, [formData]);

  useEffect(() => {
    if ("mediaDevices" in navigator) {
      startCamera();
    } else {
      setCameraState("error");
    }

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const takePhoto = async () => {
    if (!imageCapture) return;

    try {
      setCameraState("loading");
      const photoBlob = await imageCapture.takePhoto();
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setPhotoDataUrl(base64);
        updateField("photo", base64);
        setHasPhoto(true);
      };
      reader.readAsDataURL(photoBlob);
      setCameraState("ready");
    } catch (err) {
      setCameraState("ready");
      console.error("Photo capture failed:", err);
    }
  };

  const tryAgain = () => {
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);
    setImageCapture(null);
    setHasPhoto(false);
    setPhotoDataUrl("");
    updateField("photo", undefined);
    startCamera();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "260px",
        padding: "1rem 0",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <div
          part="step-icon"
          style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}
        >
          📷
        </div>
        <div
          part="step-title"
          style={{ fontSize: "1.1rem", fontWeight: "600" }}
        >
          Take Selfie Photo
        </div>
      </div>

      <div
        style={{
          width: "280px",
          height: "220px",
          position: "relative",
          borderRadius: "12px",
        }}
      >
        {cameraState === "loading" ? (
          <div
            part="camera-loading"
            style={{
              background: "#f5f5f5",
              border: "2px dashed #ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              fontSize: "3rem",
              color: "#999",
            }}
          >
            <Spinner />
          </div>
        ) : cameraState === "error" ? (
          <div
            part="camera-denied"
            style={{
              background: "#fef2f2",
              border: "2px solid #f87171",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              textAlign: "center",
              padding: "1.5rem",
              fontSize: "0.9rem",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>📷</div>
            <div style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
              Camera Access Needed
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "#666",
                marginBottom: "1rem",
              }}
            >
              Enable camera in browser/site settings
            </div>
            <button
              part="retry-permission"
              onClick={startCamera}
              style={{
                padding: "10px 20px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Enable Camera
            </button>
          </div>
        ) : !hasPhoto ? (
          <Fragment>
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <video
                ref={videoRef}
                part="camera-preview"
                autoPlay
                playsInline
                muted
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              <div
                part="selfie-frame"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  borderRadius: "12px",
                }}
              >
                <svg
                  viewBox="0 0 300 220"
                  style={{ width: "100%", height: "100%" }}
                >
                  {/* Face oval guide */}
                  <ellipse
                    cx="160"
                    cy="90"
                    rx="65"
                    ry="75"
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="3"
                    strokeDasharray="8,4"
                    opacity="0.8"
                  />

                  {/* Head boundary */}
                  <circle
                    cx="160"
                    cy="80"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    strokeDasharray="6,3"
                    opacity="0.6"
                  />

                  {/* Shoulder line */}
                  <line
                    x1="80"
                    y1="175"
                    x2="230"
                    y2="175"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />

                  {/* Center dot */}
                  <circle cx="160" cy="90" r="3" fill="rgba(255,255,255,0.9)" />
                </svg>
              </div>
            </div>

            <button
              part="capture-button"
              onClick={takePhoto}
              style={{
                position: "absolute",
                bottom: "-100px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.95)",
                border: "4px solid rgb(0, 123, 255)",
                cursor: "pointer",
                fontSize: "1.5rem",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                borderColor: "rgb(0, 123, 255)",
              }}
            >
              <span
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgb(0, 123, 255)",
                  display: "block",
                }}
              ></span>
            </button>
          </Fragment>
        ) : (
          <img
            part="photo-preview"
            src={photoDataUrl}
            alt="Captured selfie"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>

      {!hasPhoto && errors.photo && (
        <div style={{ margin: "1rem" }}>{errors.photo}</div>
      )}

      {hasPhoto && (
        <button
          part="try-again-button"
          onClick={tryAgain}
          style={{
            marginTop: "1rem",
            padding: "12px 24px",
            background: "transparent",
            color: "#007bff",
            border: "1px solid #007bff",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            width: "280px",
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default PhotoStep;
