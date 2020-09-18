const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoServer = process.env.MONGO_SERVER;
const mongoDb = process.env.MONGO_DB;

module.exports = {
	mongoServer: `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoServer}/${mongoDb}?retryWrites=true&w=majority`
};
