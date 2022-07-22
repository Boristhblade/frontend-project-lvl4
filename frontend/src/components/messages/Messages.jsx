import React from 'react';
import { useSelector } from 'react-redux';
import Message from './Message.jsx';
import MessageForm from './MessageForm.jsx';
import MessagesHeader from './MessagesHeader.jsx';

export default function Messages() {
  const messages = useSelector((state) => state.messages);
  const activeChannelId = useSelector((state) => {
    console.log(state);
    return state.currentChannel;
  });
  console.log(activeChannelId);
  const filteredMessages = messages.ids
    .filter((id) => messages.entities[id].channelId === activeChannelId);
  const channels = useSelector((state) => state.channels);
  const currentChannel = channels.entities[activeChannelId];
  console.log(currentChannel);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        {/* <MessagesHeader name={currentChannel.name} number={filteredMessages.length} /> */}
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {filteredMessages
            .map((id) => (
              <Message
                key={id}
                body={messages.entities[id].body}
                username={messages.entities[id].username}
              />
            ))}
        </div>
        <MessageForm />
      </div>
    </div>
  );
}
