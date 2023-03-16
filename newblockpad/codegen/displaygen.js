Blockly.Python['print_text'] = function(block) {
    var text_text_string = block.getFieldValue('Text String');
    // TODO: Assemble JavaScript into code variable.
    var code = `from sh1106 import *
    from machine import SoftI2C,Pin
    sda=Pin(21)
    scl=Pin(22)
    i2c=SoftI2C(sda=sda,scl=scl,freq=400000)
    display = SH1106_I2C(128, 64, i2c, Pin(16), 0x3c)
    display.sleep(False)
    display.fill(0)
    display.text('${text_text_string}', 0, 0, 1)
    display.show();`
    
    return code;
  };