import { testDatabaseConnection, addData, fetchData } from "./actions";

// This component runs on the server, no need for React hooks
export default async function Home() {
  // Test the database connection
  const isConnected = await testDatabaseConnection();
  let message = isConnected ? "Database connected successfully" : "Failed to connect to database";

  // If connected, add some sample data and fetch it
  let data: any[] = [];
  if (isConnected) {
    const sampleData = { name: "Johns", age: 30 };
    await addData("next-js-db", sampleData);

    // Retrieve the added data
    data = await fetchData("next-js-db");
  }

  return (
    <div>
      <h1>Database Test</h1>
      <p>{message}</p>
      <h2>Retrieved Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
