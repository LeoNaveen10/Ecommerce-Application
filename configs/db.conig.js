/**
 * This will have the db related info
 */

module.exports = {
	HOST: 'localhost',
	USER: 'postgres',
	PASSWORD: '1234',
	dialect: 'postgres',
	DB: 'ecom_db',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000, //wait for 300000 ms then abort the request
		idle: 1000, // if a slient doesn't make a onother request in 1000ms then that connectioln thread will released
	},
};
