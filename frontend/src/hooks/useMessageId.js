import { useState } from 'react';

export const useMessageId = () => {
  const [message, setMessage] = useState({});

  const showMessage = (text, error = false, id, timeout = 2000) => {
    setMessage(prev => ({
      ...prev,
      [id]: { text, error },
    }));

    setTimeout(() => {
      setMessage(prev => {
        const copy = { ...prev };
        delete copy[id]; 
        return copy;
      });
    }, timeout);
  };

  return { message, showMessage };
};
