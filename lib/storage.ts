import { promises as fs } from "fs";
import path from "path";

/**
 * File storage for customer uploads. Right now files are saved on local disk under `.uploads/`.
 * Everything goes through these three functions, so moving to Vercel Blob later means
 * rewriting this file only.
 */
const ROOT = path.join(process.cwd(), ".uploads");

function resolveKey(key: string) {
  const full = path.join(ROOT, key);
  // Never let a key climb out of the uploads folder.
  if (!full.startsWith(ROOT + path.sep)) throw new Error("Bad storage key");
  return full;
}

export async function putFile(key: string, data: Buffer) {
  const full = resolveKey(key);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full, data);
}

export async function getFile(key: string) {
  return fs.readFile(resolveKey(key));
}

export async function deleteFile(key: string) {
  await fs.rm(resolveKey(key), { force: true });
}
