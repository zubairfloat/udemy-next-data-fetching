import { MongoClient } from "mongodb";

export async function connnectDataBase() {
  const client = await MongoClient.connect(
    "mongodb+srv://zubair:11223344@cluster0.bwmkg.mongodb.net/?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  const document = await db.collection(collection).find().sort(sort).toArray();
  return document;
}
