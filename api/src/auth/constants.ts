export const jwtConstants = {
  secret: process.env.JWT_SECRET ?? 'minha-api-e-segura-top',
  expiresIn: process.env.JWT_EXPIRES_IN ?? '8h',
};
