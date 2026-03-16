"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_EXPIRES_IN_SECONDS = exports.JWT_SECRET = void 0;
exports.JWT_SECRET = process.env.JWT_SECRET ?? 'evcil-dev-secret-change';
const expiresInSecondsFromEnv = Number(process.env.JWT_EXPIRES_IN_SECONDS);
exports.JWT_EXPIRES_IN_SECONDS = Number.isFinite(expiresInSecondsFromEnv) && expiresInSecondsFromEnv > 0
    ? expiresInSecondsFromEnv
    : 60 * 60 * 24 * 7;
//# sourceMappingURL=auth.constants.js.map