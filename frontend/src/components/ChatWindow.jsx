import React from 'react';
import { useSelector } from 'react-redux';
import Channels from './channels/Channels.jsx';
import Messages from './messages/Messages.jsx';

export default function ChatWindow() {
  const { currentChannel: activeChannelId } = useSelector((state) => state.currentChannel);
  return (
    <div className="row h-100 bg-white flex-md-row">
      <Channels />
      {activeChannelId && <Messages />}
    </div>
  );
}
