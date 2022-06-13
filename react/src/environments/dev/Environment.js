var os = require("os");

class Environment {
}

Environment.api_base_url = 'https://localhost:3001';
Environment.website_base_url = 'https://mylocal.fundscraper.com';
Environment.b2cScopes = ["https://fundscraperdev.onmicrosoft.com/admin/main"];
Environment.webApi = "https://fundscraperdev.onmicrosoft.com/api";
Environment.clientId = "0fcc593e-696e-4ef7-ac75-bff3916e1df9";
Environment.authority = "https://fundscraperdev.b2clogin.com/fundscraperdev.onmicrosoft.com/B2C_1_signin_issuer";
Environment.reset_authority = "https://fundscraperdev.b2clogin.com/fundscraperdev.onmicrosoft.com/B2C_1_reset_issuer";

export default Environment;
