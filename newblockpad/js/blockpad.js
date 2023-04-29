// ui

let workspace = Blockly.inject('blocklyDiv', { toolbox: toolbox });
// let play_button = document.getElementById("play")
play_button.onclick = function(){
  let code =  Blockly.Python.workspaceToCode(workspace);
  console.log(code)
  sendcodetest(code)
  execute()
}

// injection of blockly
class CustomCategory extends Blockly.ToolboxCategory {
  /**
   * Constructor for a custom category.
   * @override
   */
  constructor(categoryDef, toolbox, opt_parent) {
    super(categoryDef, toolbox, opt_parent);
  }
  addColourBorder_(colour){
    this.rowDiv_.style.backgroundColor = colour;
  }
}

Blockly.registry.register(
  Blockly.registry.Type.TOOLBOX_ITEM,
  Blockly.ToolboxCategory.registrationName,
  CustomCategory, true);

  var toolbox = Blockly.common.getMainWorkspace().getToolbox();
  console.log(toolbox.getToolboxItems()[0]);



// checking how many times 