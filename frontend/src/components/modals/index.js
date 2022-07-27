import AddChannel from './AddChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import DeleteChannel from './DeleteChannel.jsx';

const modals = {
  addChannel: AddChannel,
  renameChannel: RenameChannel,
  deleteChannel: DeleteChannel,
};

export default (modalName) => modals[modalName];
