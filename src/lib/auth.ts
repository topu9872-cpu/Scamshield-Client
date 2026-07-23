import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db('Scamshield');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    }, 
    facebook: { 
      clientId: process.env.FACEBOOK_CLIENT_ID as string, 
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string, 
    }, 
  }, 
} as const);

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;