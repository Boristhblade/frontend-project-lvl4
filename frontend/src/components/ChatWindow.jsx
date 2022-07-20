import React from 'react';
import Channels from './channels/Channels.jsx';
import Messages from './messages/Messages.jsx';

export default function ChatWindow() {
  return (
    <div className="row h-100 bg-white flex-md-row">
      <Channels />
      <Messages />
    </div>
  );
}
