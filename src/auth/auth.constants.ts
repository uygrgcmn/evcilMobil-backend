export const JWT_SECRET = process.env.JWT_SECRET ?? 'evcil-dev-secret-change';

const expiresInSecondsFromEnv = Number(process.env.JWT_EXPIRES_IN_SECONDS);

export const JWT_EXPIRES_IN_SECONDS =
  Number.isFinite(expiresInSecondsFromEnv) && expiresInSecondsFromEnv > 0
    ? expiresInSecondsFromEnv
    : 60 * 60 * 24 * 7;
