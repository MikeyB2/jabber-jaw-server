exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://demo:Password1@ds139334.mlab.com:39334/jabber-jaw';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-jabber-jaw';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret_string';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

exports.tokenUrl = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/2fc4afe9-9702-4b70-97b3-eb2c96b9ed53/token";
exports.instanceLocator = "v1:us1:2fc4afe9-9702-4b70-97b3-eb2c96b9ed53";

exports.securityKey = "f4e67ae4-25ae-4dcb-9f27-803df066ea08:5AajcotVkhQiUWF1/taPZFiGN4xE+laC7iZgMP33IDU=";

