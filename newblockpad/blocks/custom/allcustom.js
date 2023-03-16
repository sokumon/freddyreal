let block_array = []
block_array.push(display_block)
block_array.push(motor_init_motors)
block_array.push(motor_move_block)
block_array.push(motor_halt_motor)

Blockly.defineBlocksWithJsonArray(block_array)