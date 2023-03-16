Blockly.Python["init_motors"] = function(block){
    var code = `from motor import *
  initialize_motors()
  `
    
    return code;
  }
  Blockly.Python['halt_motors'] = function(block){
    var code =`halt()
  `
  return code
  }
  Blockly.Python["move_motors"] = function(block){
    var code = "\n";
    var direction = block.getFieldValue("direction");
    code = `${direction}()
  `
    return code
  }