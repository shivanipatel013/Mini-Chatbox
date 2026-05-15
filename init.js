const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("connection successful");
})
  .catch((err) => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/chatbox');
}

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
]


Chat.insertMany(allChats);