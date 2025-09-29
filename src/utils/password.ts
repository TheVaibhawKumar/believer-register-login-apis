import argon2 from 'argon2';

export const hashPassword = async (plain: string) => {
  return argon2.hash(plain, { type: argon2.argon2id });
};

export const verifyPassword = async (hash: string, plain: string) => {
  return argon2.verify(hash, plain);
};
