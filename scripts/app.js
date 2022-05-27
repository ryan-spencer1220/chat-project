// Dom Queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");

// Add New Chat
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChatForm.requestFullscreen())
    .catch((err) => console.log(err));
});

// Update Username
newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  newNameForm.reset();
  updateMssg.innerText = `Your new name was updated to ${newName}`;
  setTimeout(() => {
    updateMssg.innerText = "";
  }, 3000);
});

// Update Chatrooms
rooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats((chat) => chatUI.render(chat));
  }
});

// Check Local Storage For Name
const username = localStorage.username ? localStorage.username : "Anon";

// Class Instance
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);

// Get Chats & Render
chatroom.getChats((data) => chatUI.render(data));
