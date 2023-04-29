// localStorage.getItem("connection")
const url="ws://192.168.4.1:8266"
const socket = new WebSocket(url)
socket.binaryType = 'arraybuffer';
let count = 0 ;
let raw_repl_trigger = "\x1B\x61"
let play_button = document.getElementById("play")
let mode 
if(play_button === null){
  mode = "dom"
}else{
  mode = "blockpad"
  play_button.style.color= "red";
}
socket.addEventListener('close',function(){
  console.log("closing")
})
socket.addEventListener('message', (event) => {
    if(count==0){
      console.log('Message from server ', event.data);
      socket.send("anton\x0D")
      if(mode=== "dom"){
        console.log("Draw On me")
      }else{
        play_button.style.color= "green";
      }
      count++;
    }
    else if(count==1){
      console.log('Init Raw REPL')
      socket.send("\x01");
      count++;
    }
    else{
      console.log('Message from server ', event.data);
      lastmes = event.data;
      count++;
    }
});

function sendcodetorobot(code){

}
function sendcodetest(code){
  socket.send(code)
}
function execute(){
  console.log("executing")
  socket.send("\x04")
}