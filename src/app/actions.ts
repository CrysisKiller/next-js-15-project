"use server";

import client from "@/lib/mongodb";

export async function testDatabaseConnection() {
  let isConnected = false;
  try {
    const mongoClient = await client.connect();
    // Send a ping to confirm a successful connection
    await mongoClient.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    ); // because this is a server action, the console.log will be outputted to your terminal not in the browser
    return !isConnected;
  } catch (e) {
    console.error(e);
    return isConnected;
  }
}


export async function addData(collection: string, data: Record<string, any>): Promise<void> {
    try {
      const db = client.db();
      await db.collection(collection).insertOne(data);
      console.log("Data added successfully:", data);
    } catch (e) {
      console.error("Error adding data:", e);
    }
  }
  
  // Fetch data from the database
  export async function fetchData(collection: string): Promise<any[]> {
    try {
      const db = client.db();
      const data = await db.collection(collection).find({}).toArray();
      return data;
    } catch (e) {
      console.error("Error fetching data:", e);
      return [];
    }
}