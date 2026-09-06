import { randomBytes, scrypt, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';
const derive = promisify(scrypt);
export async function hashPassword(password: string) {
 const salt = randomBytes(16).toString('hex');
 const hash = await derive(password, salt, 64) as Buffer;
 return `${salt}:${hash.toString('hex')}`;
}
export async function verifyPassword(password: string, stored: string) {
 const [salt,hex] = stored.split(':');
 if (!salt || !hex || hex.length !== 128) return false;
 const actual = await derive(password,salt,64) as Buffer;
 return timingSafeEqual(actual,Buffer.from(hex,'hex'));
}
export const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');
