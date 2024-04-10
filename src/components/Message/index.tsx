import classNames from "classnames";
import styles from "./index.module.scss";
import RobotIcon from "public/assets/robot.svg?react";

import type { Dispatch, SetStateAction } from "react";
import type { Message as MessageType, PanelItem } from "@/types";

type Props = MessageType & {
  setUserInput: Dispatch<SetStateAction<boolean>>;
};

const Message = ({ content, isMe, panel, setUserInput }: Props) => {
  const handleActionClick = (action: () => void) => {
    action();
    setUserInput(true);
  };

  return (
    <div
      className={classNames([
        styles["message-container"],
        {
          [styles.me]: isMe,
        },
      ])}>
      {!isMe && (
        <div className={styles.avatar}>
          <RobotIcon />
        </div>
      )}
      <div className={styles.message}>
        <p className={styles.content}>{content}</p>
        {panel && (
          <div className={styles.panel}>
            {panel.map(({ action, title, disabled }: PanelItem) => (
              <button
                key={title}
                className={classNames([
                  styles["panel-item"],
                  {
                    [styles.disabled]: disabled,
                  },
                ])}
                onClick={() => handleActionClick(action)}
                disabled={disabled}>
                {title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
