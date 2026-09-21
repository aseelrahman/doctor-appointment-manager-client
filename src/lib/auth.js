import { betterAuth } from "better-auth";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("doctimedb");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
