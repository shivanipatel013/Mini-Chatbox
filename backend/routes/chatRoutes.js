const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController.js");

// INDEX and CREATE
router.route("/")
    .get(chatController.index)
    .post(chatController.createChat);

// NEW FORM
router.get("/new", chatController.renderNewForm);

// EDIT FORM, UPDATE, and DELETE
router.route("/:id")
    .get(chatController.renderEditForm)
    .put(chatController.updateChat)
    .delete(chatController.destroyChat);

// Separate Edit route if needed (though index.js had it as /chats/:id/edit)
router.get("/:id/edit", chatController.renderEditForm);

module.exports = router;
