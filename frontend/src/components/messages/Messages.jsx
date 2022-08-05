import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Message from './Message.jsx';
import MessageForm from './MessageForm.jsx';
import MessagesHeader from './MessagesHeader.jsx';

export default function Messages() {
  const scrollRef = useRef(null);
  const messages = useSelector((state) => state.messages);
  const activeChannelId = useSelector((state) => state.currentChannel.currentChannel);
  const filteredMessages = messages.ids
    .filter((id) => messages.entities[id].channelId === activeChannelId);
  const channels = useSelector((state) => state.channels);
  const currentChannelName = channels.entities[activeChannelId]?.name;
  useEffect(() => {
    scrollRef.current.scrollIntoView();
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader name={currentChannelName} number={filteredMessages.length} />
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {filteredMessages
            .map((id) => (
              <Message
                key={id}
                body={messages.entities[id].body}
                username={messages.entities[id].username}
              />
            ))}
          <div ref={scrollRef} />
        </div>
        <MessageForm />
      </div>
    </div>
  );
}
