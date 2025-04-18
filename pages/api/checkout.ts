// pages/api/checkout.ts

import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, Db } from "mongodb";
import multer from "multer";

// ✅ Fix for the "is not a function" error with next-connect
// @ts-ignore
const nextConnect = require("next-connect");

// Multer configuration
const upload = multer({ storage: multer.memoryStorage() });

// MongoDB connection setup (singleton to avoid reconnecting)
const MONGODB_URI = process.env.MONGODB_URI!;
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function connectToDB(): Promise<Db> {
  if (!cachedClient || !cachedDb) {
    cachedClient = new MongoClient(MONGODB_URI);
    await cachedClient.connect();
    cachedDb = cachedClient.db("techfest");
    console.log("✅ Connected to MongoDB");
  }
  return cachedDb;
}

// Create Next.js API route using next-connect
const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    console.error("API error:", error);
    res.status(500).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// File upload middleware (expects field name "paymentScreenshot")
apiRoute.use(upload.single("paymentScreenshot"));

// POST handler
apiRoute.post(async (req: any, res) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("orders");

    const {
      name,
      email,
      phoneNumber,
      address,
      billingId,
      items,
      totalPrice,
    } = req.body;

    console.log("📦 Received data:", {
      name,
      email,
      phoneNumber,
      address,
      billingId,
      items,
      totalPrice,
    });

    console.log("🖼️ Uploaded file:", req.file);

    const order = {
      billingId,
      name,
      email,
      phoneNumber,
      address,
      items: JSON.parse(items),
      totalPrice: parseFloat(totalPrice),
      screenshot: req.file?.buffer,
      screenshotMimeType: req.file?.mimetype,
      createdAt: new Date(),
    };

    await collection.insertOne(order);
    console.log("✅ Order successfully inserted into DB");

    res.status(200).json({ success: true, billingId });
  } catch (error) {
    console.error("❌ Checkout API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Required for Next.js API routes using multer
export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
