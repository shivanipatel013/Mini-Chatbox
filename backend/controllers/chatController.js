const Chat = require("../models/chat.js");

// INDEX
module.exports.index = async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
};

// NEW FORM
module.exports.renderNewForm = (req, res) => {
    res.render("new.ejs");
};

// CREATE
module.exports.createChat = async (req, res) => {
    let { from, to, message } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        message: message,
        created_at: new Date()
    });
    
    await newChat.save();
    res.redirect("/chats");
};

// EDIT FORM
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
};

// UPDATE
module.exports.updateChat = async (req, res) => {
    let { id } = req.params;
    let { message: newMsg } = req.body;
    await Chat.findByIdAndUpdate(id, 
        { message: newMsg },
        { runValidators: true, new: true }
    );
    res.redirect("/chats");
};

// DELETE
module.exports.destroyChat = async (req, res) => {
    let { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
};
