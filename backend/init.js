const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

async function main() {
    const dbUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/chatbox';
    await mongoose.connect(dbUrl);
    console.log("connection successful");
    
    // Clear existing chats to avoid duplicates if running multiple times
    await Chat.deleteMany({});
    
    let allChats = [
        {
            from: "Neha",
            to: "Priya",
            message: "send me your pictures",
            created_at: new Date(),
        },
        {
            from: "Deepika",
            to: "Alia",
            message: "You were looking so elegant",
            created_at: new Date(),
        },
        {
            from: "Rahul",
            to: "Prem",
            message: "The movie was quit interseting",
            created_at: new Date(),
        },
        {
            from: "Bantu",
            to: "Payal",
            message: "I saw you in the infinity mall last night",
            created_at: new Date(),
        },
        {
            from: "Shivam",
            to: "Piyush",
            message: "Tum ne padh liya kal exam ke liye",
            created_at: new Date(),
        },
    ];

    await Chat.insertMany(allChats);
    console.log("Data initialized successfully!");
}

main()
  .then(() => {
      mongoose.connection.close();
  })
  .catch((err) => {
      console.error("Seeding error:", err.message || err);
      if (err.name === "MongooseServerSelectionError") {
          console.error("\n=======================================================");
          console.error("💡 TROUBLESHOOTING TIP: Mongoose failed to connect to Atlas.");
          console.error("This usually means your IP address is not whitelisted.");
          console.error("To fix this:");
          console.error("1. Go to your MongoDB Atlas dashboard.");
          console.error("2. Navigate to 'Network Access' under the 'Security' section.");
          console.error("3. Click 'Add IP Address' and choose 'Allow Access From Anywhere' (0.0.0.0/0) or add your current IP.");
          console.error("4. Render requires '0.0.0.0/0' to be whitelisted because its outbound IPs are dynamic.");
          console.error("=======================================================\n");
      }
      mongoose.connection.close();
  });