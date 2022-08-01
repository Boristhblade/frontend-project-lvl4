import { useContext } from 'react';

import { ChatAPIContext } from '../context/ChatAPIContext.jsx';

const useAPI = () => useContext(ChatAPIContext);

export default useAPI;
