import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/chat.module.css';
import { FaArrowRight } from 'react-icons/fa';

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [whom, setWhom] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios.get('/com')
      .then(response => {
        setMessages(response.data.Messages);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleWhomChange = (event) => {
    setWhom(event.target.value);
  };

  const handleSend = () => {
    axios.post('/com', { message: input, whom })
      .then(response => {
        setMessages([...messages, input]);
        setInput('');
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? styles.chatBox : styles.chatBoxClosed}>
      <div onClick={toggleChatBox} className={styles.header}>
        {isOpen ? 'X' : '^'}
      </div>
      <select value={whom} onChange={handleWhomChange} className={styles.select}>
          <option value={0}>Shelf Sorter</option>
          <option value={1}>Warehouse Worker</option>
          <option value={2}>Admin</option>
        </select>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <p key={index}>{message.message}</p>
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
