const dev = {
	API_ENDPOINT_URL: 'http://localhost:3000',
	IMAGE_PATH : 'http://localhost:3000/uploads/store/images/',
	FILE_PATH : 'http://localhost:3000/uploads/store/docs/',
	
};

const prod = {
	API_ENDPOINT_URL: 'http://localhost:3000',
	IMAGE_PATH : 'http://localhost:3000/uploads/store/images/',
	FILE_PATH : 'http://localhost:3000/uploads/store/docs/',
	
};

const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return dev
		case 'production':
			return prod
		default:
			throw new Error('Invalid NODE_ENV value.');
	}
};
export const env = getEnv()