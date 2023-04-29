// localStorage.getItem("connection")
const url="ws://192.168.4.1:8266"
const socket = new WebSocket(url)
socket.binaryType = 'arraybuffer';
console.log(socket.bufferedAmount)
let count = 0 ;
let raw_repl_trigger = "\x1B\x61"
socket.addEventListener('close',function(){
  console.log("closing")
})
socket.addEventListener('message', (event) => {
    if(count==0){
      console.log('Message from server ', event.data);
      socket.send("anton\x0D")
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
var start_but = document.getElementById("start")
let linesofcode = []
function sendold(code){
    linesofcode = code.split("\n")
    var enter_val="\x0D"
    for (let i = 0; i < linesofcode.length; i++) {
      linesofcode[i] = linesofcode[i].trim()
      linesofcode[i]= linesofcode[i].concat(enter_val);
    }
    for (let i = 0; i < linesofcode.length ; i++) {
      socket.send(linesofcode[i])
    }
}
function execute(){
  console.log("executing")
  socket.send("\x04")
}