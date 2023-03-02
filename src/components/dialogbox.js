import React, { useState, useCallback } from "react";
import '../style.css';
import Message from "./messageanim";

const DialogBox = ({messages, onDialogEnded = () =>{}}) => {
    const [currentMessage, setCurrentMessage] = useState(0);
    const [messageEnded, setMessageEnded] = useState(false);

    const handleClick = useCallback(() => {
        const bEvent = new CustomEvent('button');
        window.dispatchEvent(bEvent);
        if (messageEnded) {
            setMessageEnded(false);
            if (currentMessage < messages.length - 1) {
                setCurrentMessage(currentMessage + 1);
            } 
            else {
                setCurrentMessage(0);
                onDialogEnded();
            }
        }
        else{
            setMessageEnded(true);
        }
    }, [currentMessage, messageEnded, messages.length,  onDialogEnded]);

    return (
        <div className="DialogBox">
            <div className="dialogTitle">taskBot</div>
            <Message 
            action={messages[currentMessage].action}
            message={messages[currentMessage]} 
            key={currentMessage}
            onMessageEnded={() => {
                setMessageEnded(true);
            }}
            />
            <button onClick={handleClick}
            className="dialogFooter">
                {(currentMessage === messages.length - 1 && messageEnded) ? 'Ok' : 'Next'}
            </button>
        </div>
    );
};

export default DialogBox;