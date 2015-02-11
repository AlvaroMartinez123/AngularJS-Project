module.exports = {
	server: {
		ip: process.env.IP || '0.0.0.0',
		port: process.env.PORT || 9001
	},
	db: {
		conn: 'mongodb://0.0.0.0:27017/rapidshot'
	},
	ids: {
		google: {
			client_id:'257464797313-7gst6f7ugj8bkggvo6p4769s998a0d9r.apps.googleusercontent.com',
			client_secret: 'ZGY6GWwhLubfZ8F7jmkq98_7',
			callback_url: 'http://localhost:9001/auth/oauth2callback',
			scopes: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email']
		}
	},
	jwtSecret: 'very insecure secret'
};