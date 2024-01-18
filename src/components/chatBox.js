import React, { useState } from 'react';
import styles from '../styles/chat.module.css';
import { FaArrowRight } from 'react-icons/fa'; // Import the FaArrowRight icon

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSend = () => {
    setMessages([...messages, input]);
    setInput('');
  };

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? styles.chatBox : styles.chatBoxClosed}>
      <div onClick={toggleChatBox} className={styles.header}>
        {isOpen ? 'X' : '^'}
      </div>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <div className={`${styles.send}`}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button onClick={handleSend} className={styles.button}><FaArrowRight /></button>
      </div>
    </div>
  );
}

export default ChatBox;
