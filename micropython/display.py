from sh1106 import *
from machine import SoftI2C,Pin
import framebuf
def displaytext(text):
    sda=Pin(21)
    scl=Pin(22)
    i2c=SoftI2C(sda=sda,scl=scl,freq=400000)
    display = SH1106_I2C(132, 64, i2c, Pin(16), 0x3c)
    display.sleep(False)
    display.fill(0)
    display.text(text, 0, 0, 1)
    display.show()
    
def drawonme(transval,transpos):
    sda=Pin(21)
    scl=Pin(22)
    i2c=SoftI2C(sda=sda,scl=scl,freq=400000)
    print("In here")
    display = SH1106_I2C(128, 64, i2c, Pin(16), 0x3c)
    print(transval)
    buffer = bytearray(1024)
    for i in range(0,1024):
        if i in transpos:
            buffer[i] = transval[transpos.index(i)]
    # Create a byte array representing the image
    # Create a frame buffer from the byte array
    fb = framebuf.FrameBuffer(buffer, 128,64, framebuf.MONO_VLSB)
    
    # Display the image on the OLED display
    display.fill(0)
    display.blit(fb, 0, 0)
    display.show()


    
