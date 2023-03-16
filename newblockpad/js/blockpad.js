// ui
let play_button = document.getElementById("play")
play_button.onclick = function(){
  sendstufftorobot("\xffe3")
}

// injection of blockly
var workspace = Blockly.inject('blocklyDiv', { toolbox: toolbox });

// checking how many times 
let nooftimes = localStorage.getItem("noofvisted")