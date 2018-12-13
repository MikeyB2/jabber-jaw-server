exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/jwt-auth-demo';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/jwt-auth-demo';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';


// const tokenUrl = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/2fc4afe9-9702-4b70-97b3-eb2c96b9ed53/token";
// const instanceLocator = "v1:us1:2fc4afe9-9702-4b70-97b3-eb2c96b9ed53";

// export { tokenUrl, instanceLocator }

// security key ChatKit f4e67ae4-25ae-4dcb-9f27-803df066ea08:5AajcotVkhQiUWF1/taPZFiGN4xE+laC7iZgMP33IDU=