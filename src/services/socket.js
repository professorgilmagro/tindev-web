import dotenv from 'dotenv';
import io from 'socket.io-client';

dotenv.config();
function socket(params) {
	return io(process.env.REACT_APP_IO_BASE_URL, { query: params });
}

export default socket;
