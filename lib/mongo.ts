'use server'
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.9oy4i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

// Connect the client to the server	(optional starting in v4.7)
await client.connect();
// Send a ping to confirm a successful connection
await client.db("admin").command({ ping: 1 });

console.log("here");

async function addLocation(facility: string, location: string) {
    const database = client.db(facility);
    const document = database.collection(location);
    // Create a document to insert
    const doc = {
        address: "123 Road",
        content: "here",
    }
    const result = await document.insertOne(doc);
    console.log(result);
}

function getLocation(facility: string, location: string) {
    const database = client.db(facility);
    const document = database.collection(location);
    const options = {

    };
    const cursor = document.find(options);
    return cursor;
    // for await (const doc of cursor) {
    //     console.dir(doc);
    // }
}

export { addLocation, getLocation };