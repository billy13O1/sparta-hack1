'use server'
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.9oy4i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

await client.connect();
await client.db("admin").command({ ping: 1 });

async function saveCSV(facility: string, location: string, csvData: {[key: string]: string[][]}) {
    const database = client.db(facility);
    const document = database.collection(location);
    await document.insertOne(csvData);
    console.log("saved csv");
}

async function getMetrics(facility: string, location: string) {
    const database = client.db(facility);
    const document = database.collection(location);
    const options = {
        
    };
    const cursor = document.find(options);
    for await (const doc of cursor) {
        return {flow: doc.flow, waste: doc.waste, input: doc.input};
    }
}


export { saveCSV, getMetrics };