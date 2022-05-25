// Adding New chat Documents
// Setting Up Real time Listeners For New Chats
// Updating Username
// Updating Room

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
  }
  async addChat(message) {
    // Format Chat Object
    const now = new Date();
    const chat = {
      message: message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };
    // Save Chat Document
    const response = await this.chats.add(chat);
    return response;
  }
  getChats(callback) {
    this.chats.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // Update The UI
          callback(change.doc.data());
        }
      });
    });
  }
}

const chatroom = new Chatroom("gaming", "Ryan");

chatroom.getChats((data) => {
  console.log(data);
});
