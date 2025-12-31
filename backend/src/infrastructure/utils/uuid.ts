// import { v4 as uuidv4 } from "uuid";

// function generateUUID(): string {
//   return uuidv4();
// }

// export default generateUUID;

import { randomUUID } from "crypto";

export default function generateUUID(): string {
  return randomUUID();
}
