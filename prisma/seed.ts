import "dotenv/config";
import { connectionString, prisma } from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { Pool } from "pg";
import { mockUsers } from "./mock/users";

const pool = new Pool({ connectionString });

async function main() {

  for (const u of mockUsers) {
    const user = await prisma.user.create({
      data: {
        email:    u.email,
        password: await bcrypt.hash(u.password, 12),
        role:     u.role,
      },
    });

    console.log('Created user:', user);
  }

}

main()
  .then((
    async () => {
      await prisma.$disconnect();
      await pool.end();
    }
  ))
  .catch((async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  }));
