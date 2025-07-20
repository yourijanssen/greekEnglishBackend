const express = require("express");
const app = express();

// Enable JSON parsing for incoming requests
app.use(express.json());

// Sample data to display
const sampleData = {
  message: "Welcome to my Express app on Vercel!",
  data: [
    { id: 1, name: "John Doe", role: "Developer" },
    { id: 2, name: "Jane Smith", role: "Designer" },
  ],
};

// Route to display data
app.get(
  "/",
  (
    req: any,
    res: {
      json: (arg0: {
        message: string;
        data: { id: number; name: string; role: string }[];
      }) => void;
    }
  ) => {
    res.json(sampleData);
  }
);

// For testing static content if needed
app.get("/test", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("<h1>Test Page</h1><p>This is a test page running on Vercel.</p>");
});

module.exports = app;
