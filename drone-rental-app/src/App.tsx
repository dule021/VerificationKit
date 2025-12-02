import { useEffect, useState } from "react";
import "./App.css";
import {
  mountUserVerifySdk,
  addVerificationMessageListener,
  type VerificationResponse,
} from "user-verify-sdk";
import { ModalContent } from "./ModalContent";

type Drone = {
  id: string;
  name: string;
  short: string;
  price: string;
  img: string;
  specs: {
    long: string;
    flight: string;
    features: string;
  };
};

const drones: Drone[] = [
  {
    id: "mini4pro",
    name: "DJI Mini 4 Pro",
    short: "Ultra-light 4K HDR",
    price: "$89/day",
    img: "https://se-cdn.djiits.com/tpc/uploads/carousel/image/d59de42ffe5da19dc2573d0cadeed38d@origin.jpg?format=webp",
    specs: {
      long: 'Under 249g with 48MP 1/1.3" CMOS sensor, 4K/60fps True Vertical Shooting, omnidirectional obstacle sensing.',
      flight:
        "34-min max flight time, 20km transmission range, ideal for travel vloggers and beginners.",
      features:
        "FocusTrack, waypoint flight, ActiveTrack 360°, true vertical shooting for social media.",
    },
  },
  {
    id: "mavic3pro",
    name: "DJI Mavic 3 Pro",
    short: "Pro Triple-Camera",
    price: "$199/day",
    img: "https://se-cdn.djiits.com/tpc/uploads/carousel/image/5ee2e8f595784dadb848ea2f413219b5@ultra.webp",
    specs: {
      long: "Hasselblad 20MP 4/3 CMOS wide + 48MP medium tele + 12MP 7x telephoto, 5.1K/50fps video.",
      flight:
        "43-min flight time, 15km O3+ transmission, advanced APAS 5.0 obstacle avoidance.",
      features:
        "10-bit D-Log M, adjustable aperture f/2.8-f/11, mastershots, hyperlapse, omnidirectional sensing.",
    },
  },
  {
    id: "air3",
    name: "DJI Air 3",
    short: "Dual-Camera Powerhouse",
    price: "$129/day",
    img: "https://images.squarespace-cdn.com/content/v1/58fd838a9f7456e0b92a446a/1712636953585-2JKY8QEFRLIGJGFIPN73/%E4%B8%80%E9%94%AE%E8%8A%B1%E9%A3%9E.jpg?format=2500w",
    specs: {
      long: 'Dual 48MP 1/1.3" CMOS cameras (wide + 3x mid-tele), 4K/100fps, 10-bit D-Log M color.',
      flight:
        "46-min flight time, 20km O4 transmission, omnidirectional obstacle sensing.",
      features:
        "FocusTrack, ActiveTrack 6.0, waypoint flight 2.0, night omnidirectional sensing.",
    },
  },
];

function App() {
  const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null);
  const [showMicroApp, setShowMicroApp] = useState(false);
  const [verificationInfo, setVerificationInfo] = useState<
    Record<string, VerificationResponse> | undefined
  >(undefined);

  useEffect(() => {
    if (customElements.get("user-verify")) {
      return;
    }

    mountUserVerifySdk();
    addVerificationMessageListener((messageEvent: CustomEvent) =>
      setVerificationInfo(messageEvent.detail)
    );
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const openModal = (drone: Drone) => setSelectedDrone(drone);

  const closeModal = () => setSelectedDrone(null);

  const startRentalFlow = () => {
    setShowMicroApp(true);
    closeModal();
  };

  return (
    <div className="app">
      <header>
        <div className="logo">🚁 DroneRentPro</div>
        <nav>
          <button onClick={() => scrollTo("drones")}>Drones</button>
          <button onClick={() => scrollTo("about")}>About</button>
          <button onClick={() => scrollTo("contact")}>Contact</button>
        </nav>
      </header>

      <main>
        <section id="drones" className="drones-grid">
          <h1>Premium Drones for Rent</h1>
          <div className="grid">
            {drones.map((drone) => (
              <div key={drone.id} className="drone-card">
                <div
                  className="drone-image"
                  style={{ backgroundImage: `url(${drone.img})` }}
                ></div>
                <h3>{drone.name}</h3>
                <p>{drone.short}</p>
                <button onClick={() => openModal(drone)}>Rent Now</button>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="about">
          <h2>About Us</h2>
          <p>
            DroneRentPro started in 2020 when two aviation enthusiasts in Serbia
            saw the need for accessible pro drone rentals. From filming weddings
            to industrial inspections, we provide top DJI models with full
            insurance and training.
          </p>
          <div className="about-images">
            <div
              className="about-image"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&fit=crop)",
              }}
            ></div>
            <div
              className="about-image"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&fit=crop)",
              }}
            ></div>
          </div>
        </section>

        <section id="contact" className="contact">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <p>📧 rent@dronepro.rs</p>
            <p>📞 +381 11 123 4567</p>
            <p>📍 Belgrade, Serbia</p>
            <p>🕒 Mon-Fri 9-18h</p>
          </div>
        </section>
      </main>

      {selectedDrone && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={closeModal}>
              ×
            </button>

            <div
              className="modal-drone-image"
              style={{ backgroundImage: `url(${selectedDrone.img})` }}
            ></div>

            <div className="modal-header">
              <h2>{selectedDrone.name}</h2>
              <p className="price">{selectedDrone.price}</p>
            </div>

            <div className="modal-section">
              <h4>📋 Technical Specs</h4>
              <p>{selectedDrone.specs.long}</p>
            </div>

            <div className="modal-section">
              <h4>✈️ Flight Performance</h4>
              <p>{selectedDrone.specs.flight}</p>
            </div>

            <button onClick={startRentalFlow} className="rent-button">
              Start Rental Flow
            </button>
          </div>
        </div>
      )}

      {showMicroApp && (
        <div className="micro-app-placeholder">
          <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <h3>User Validation</h3>
            {!verificationInfo ? (
              <p>Please complete the verification steps.</p>
            ) : (
              <ModalContent
                addressDetails={verificationInfo.addressDetails}
                phone={verificationInfo.phone}
                photo={verificationInfo.photo}
                score={verificationInfo.score}
                status={verificationInfo.status}
              />
            )}
            {verificationInfo?.status === "verified" ? (
              <button onClick={() => {}} className="checkout-button">
                Checkout
              </button>
            ) : (
              <p>
                <b>Checkout is disabled for non-verified users.</b>
              </p>
            )}

            <button
              onClick={() => {
                setVerificationInfo(undefined);
                setShowMicroApp(false);
              }}
            >
              X
            </button>
          </div>
          <div
            style={{
              flex: "2",
              maxWidth: "65%",
              marginLeft: "2rem",
            }}
          >
            <user-verify />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
