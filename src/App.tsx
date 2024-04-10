import { useMemo } from "react";
import styles from "./App.module.scss";
import { Message } from "./components";
import useConversation from "./hooks/useConversation";
import RobotIcon from "public/assets/robot.svg?react";

const App = () => {
  const { messages, setUserInput } = useConversation();

  const orderedMessages = useMemo(
    () => messages.slice().sort((a, b) => a.timestamp - b.timestamp),
    [messages]
  );

  return (
    <div className={styles.App}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <RobotIcon />
        </div>
        <h1>LSEG Chatbot</h1>
      </div>
      <div className={styles.conversation}>
        <div className={styles.messages}>
          {orderedMessages.map((message) => (
            <Message
              key={message.timestamp}
              {...message}
              setUserInput={setUserInput}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
