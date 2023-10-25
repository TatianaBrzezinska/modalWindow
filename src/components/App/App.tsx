import { useState } from 'react';
import { Button, Modal } from '../index';
import logo from '../../images/logo.svg';

import './App.css';

const LS_MODAL_KEY = 'modal_shown';

export const App = () => {
  const [modalShown, setModalShown] = useState(!localStorage.getItem(LS_MODAL_KEY));
  return (
    <div className="app">
      <Button className="app__button" onClick={() => setModalShown(true)}>
        Open Modal
      </Button>
      <header className="app__header">
        <img src={logo} className="app__logo" alt="logo" />
      </header>
      <Modal
        shown={modalShown}
        onClose={() => {
          localStorage.setItem(LS_MODAL_KEY, 'true');
          setModalShown(false);
        }}
      />
    </div>
  );
};
