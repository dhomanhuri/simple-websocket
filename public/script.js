const btn_kirim = document.querySelector("#kirim");
const input = document.querySelector("#input");
const div_display = document.querySelector(".container-pesan");
var uname = "";
const socket = io();
socket.on("connect", () => {
  uname = Math.floor(Math.random() * 10000) + 1;
  console.log("socket conne2cted " + uname);
})

const createBubbleChat = chat => {
  const div_pesan = document.createElement("div");
  div_pesan.classList.add("pesan");
  div_pesan.innerHTML = chat;
  return div_pesan;
}

btn_kirim.addEventListener("click", () => {
  const bubbleChat = createBubbleChat(input.value);
  console.log(input.value);
  div_display.appendChild(bubbleChat);
  socket.emit("kirim-pesan", input.value + " : " + "#anonymous" + uname)
  input.value = "";
})

socket.on("pesan-baru", pesan => {
  const bubbleChat = createBubbleChat(pesan);
  bubbleChat.classList.add("pesan-r");
  div_display.appendChild(bubbleChat);
})