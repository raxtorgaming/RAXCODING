
let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    document.addEventListener('mousemove', (e) => {
      if(!this.rotating) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }
        
      const dirX = e.clientX - this.mouseTouchX;
      const dirY = e.clientY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if(this.rotating) {
        this.rotation = degrees;
      }

      if(this.holdingPaper) {
        if(!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    })

    paper.addEventListener('mousedown', (e) => {
      if(this.holdingPaper) return; 
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ;
      highestZ += 1;
      
      if(e.button === 0) {
        this.mouseTouchX = this.mouseX;
        this.mouseTouchY = this.mouseY;
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
      }
      if(e.button === 2) {
        this.rotating = true;
      }
    });
    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
document.addEventListener("DOMContentLoaded", function () {
  const lyrics = [
    " ",
    " ",
    " ",
    " ",
    " ",
     
      "KARENA AKU ",
      "MENCINTAIMU ",
      "DAN HATIKU",
      "HANYA UNTUKMU",
      "TAK AKAN MENYERAH",
      "DAN TAKAN BERHENTI",
      "MENCINTAIMU",
      " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
      
  ];

  const delay = 41; 
  const lyricsElement = document.getElementById("lyrics");

  async function displayLyrics() {
      for (const line of lyrics) {
          for (const char of line) {
              const charElement = document.createElement("span"); 
              charElement.textContent = char;
              charElement.style.animation = "glow 2s ease-in-out"; 
              charElement.style.fontSize = "30px";
              lyricsElement.appendChild(charElement); 

              await new Promise((resolve) => setTimeout(resolve, delay));

              
              charElement.style.animation = "";
          }

          lyricsElement.appendChild(document.createElement("br")); 

          await new Promise((resolve) => setTimeout(resolve, delay * 25));

          lyricsElement.textContent = "";

          await new Promise((resolve) => setTimeout(resolve, delay * 35));
      }

      setTimeout(function () {
          window.location.href = "yournexthtmlfile.html"; 
      }, 700);
  }
  
  displayLyrics();
});
