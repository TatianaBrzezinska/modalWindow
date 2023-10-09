import logo from "./logo.svg";
import "./App.css";
import { Modal } from "./components/Modal/Modal";
import { useState } from "react";

const LS_MODAL_KEY = "modal_shown";

function App() {
  const [modalShown, setModalShown] = useState(
    !localStorage.getItem(LS_MODAL_KEY)
  );
  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {modalShown && (
        <Modal
          onClose={() => {
            setModalShown(false);
            localStorage.setItem(LS_MODAL_KEY, "true");
          }}
        />
      )}
    </div>
  );
}

export default App;
