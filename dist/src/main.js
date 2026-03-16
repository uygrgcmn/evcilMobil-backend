"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = require("express");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_1.json)({ limit: '20mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '20mb' }));
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: true,
    });
    await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}
void bootstrap();
//# sourceMappingURL=main.js.map