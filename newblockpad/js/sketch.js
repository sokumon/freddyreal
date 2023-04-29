const OLED_WIDTH = 128;
const OLED_HEIGHT = 64;
const SCALE_FACTOR = 5;
const CANVAS_WIDTH = OLED_WIDTH * SCALE_FACTOR;
const CANVAS_HEIGHT = OLED_HEIGHT * SCALE_FACTOR;
let eightarray = [];
let transArray = [];

function create2DArray(a, b) {
  let arr = [];
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      arr[i] = [];
    }
  }
  return arr;
}

let oled_screen = create2DArray(OLED_WIDTH, OLED_HEIGHT);

class OledPixel {

  constructor(x, y, pixel_width, pixel_height) {
    this.x = x;
    this.y = y;
    this.col = color('blue');
    this.pixel_width = pixel_width;
    this.pixel_height = pixel_height;
  }

  display() {
    fill(this.col)
    rect(this.x, this.y, this.pixel_width, this.pixel_height);
  }

  left_clicked() {
    if ((mouseX > this.x) && (mouseX < this.x + this.pixel_width) && (mouseY > this.y) && (mouseY < this.y + this.pixel_height)) {
      this.col = color('red');
    }
  }

  other_clicked() {
    if ((mouseX > this.x) && (mouseX < this.x + this.pixel_width) && (mouseY > this.y) && (mouseY < this.y + this.pixel_height)) {
      this.col = color('blue');
    }
  }

}

function generate_pixels() {
  var rec_width_size = (CANVAS_WIDTH / OLED_WIDTH);
  var rec_height_size = (CANVAS_HEIGHT / OLED_HEIGHT);
  for (let k = 0, l = 0; k < CANVAS_HEIGHT; k += rec_height_size, l++) {
    for (let i = 0, m = 0; i < CANVAS_WIDTH; i += rec_width_size, m++) {
      oled_screen[m][l] = new OledPixel(i, k, rec_width_size, rec_height_size);
    }
  }
}

function draw_pixels() {
  for (let i = 0; i < OLED_WIDTH; i++) {
    for (let j = 0; j < OLED_HEIGHT; j++) {
      oled_screen[i][j].display();
    }
  }

}

function mouseDragged() {
  if (mouseButton === LEFT) {
    for (let i = 0; i < OLED_WIDTH; i++) {
      for (let j = 0; j < OLED_HEIGHT; j++) {
        oled_screen[i][j].left_clicked();
      }
    }
  }
}

function mousePressed() {

  if (mouseButton === LEFT) {
    for (let i = 0; i < OLED_WIDTH; i++) {
      for (let j = 0; j < OLED_HEIGHT; j++) {
        oled_screen[i][j].left_clicked();
      }
    }
  }
}

function keyPressed() {
  if (keyCode === 65) {
    clearPixel();
  }
}

function clearPixel() {
  for (let i = 0; i < OLED_WIDTH; i++) {
    for (let j = 0; j < OLED_HEIGHT; j++) {
      oled_screen[i][j].other_clicked();
    }
  }
}

function setup() {
  const cnv = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  cnv.parent('oled_scrn');
  // var x = (windowWidth - width) / 2;
  // var y = (windowHeight - height) / 2;
  // cnv.position(x, y);
  generate_pixels();
}

function draw() {
  background(0);
  draw_pixels();
}
function drawandsend() {
for (let i = 0; i < OLED_WIDTH; i++) {
  for (let j = 0,k=1; j < OLED_HEIGHT; j++,k++) {
    
    if(oled_screen[i][j].col.levels[0] == 255){
      eightarray.push(1)
    }else{
      eightarray.push(0)
    }
    if(k%8==0){
        // console.log(k)
        // console.log(eightarray)
        
        let x = calculate_value();
        transArray.push(x);
        eightarray = [];
    }
  }
}
  let transval = []
  let transpos = []
  for(let f =0;f<transArray.length;f++){
    if(transArray[f]!=0){
      transpos.push(f)
      transval.push(transArray[f])
    }
  }
  console.log(transval,transpos)
  let code = `from display import *\ntransval=[${transval}]\ntranspos=[${transpos}]\ndrawonme(transval,transpos)`
  console.log(code)
  sendcodetest(code)
  execute()
}
function calculate_value(){
    console.log(eightarray)
   let sum =0;
   if(eightarray[0] == 1){
    sum = sum + 128;
   }
   if(eightarray[1] == 1){
    sum = sum + 64;
   }
   if(eightarray[2] == 1){
    sum = sum + 32;
   }
   if(eightarray[3] == 1){
    sum = sum + 16;
   }
   if(eightarray[4] == 1){
    sum = sum + 8;
   }
   if(eightarray[5] == 1){
    sum = sum + 4;
   }
   if(eightarray[6] == 1){
    sum = sum + 2;
   }
   if(eightarray[7] == 1){
    sum = sum + 1;
   }
   return sum;
}
