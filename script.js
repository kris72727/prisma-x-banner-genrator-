const upload = document.getElementById("upload");
const preview = document.getElementById("pfpPreview");
const frame = document.getElementById("pfpFrame");

let scale = 1;
let posX = 0;
let posY = 0;
let isDragging = false;
let startX, startY;

upload.addEventListener("change", function(e){
  const file = e.target.files[0];
  if(!file) return;

  const reader = new FileReader();
  reader.onload = function(event){
    preview.src = event.target.result;
    scale = 1;
    posX = 0;
    posY = 0;
    updateTransform();
  }
  reader.readAsDataURL(file);
});

function zoomIn(){
  scale += 0.1;
  updateTransform();
}

function zoomOut(){
  scale -= 0.1;
  if(scale < 0.5) scale = 0.5;
  updateTransform();
}

function updateTransform(){
  preview.style.transform =
    `scale(${scale}) translate(${posX}px, ${posY}px)`;
}

frame.addEventListener("mousedown", function(e){
  isDragging = true;
  startX = e.clientX - posX;
  startY = e.clientY - posY;
});

document.addEventListener("mousemove", function(e){
  if(!isDragging) return;
  posX = e.clientX - startX;
  posY = e.clientY - startY;
  updateTransform();
});

document.addEventListener("mouseup", function(){
  isDragging = false;
});

function downloadBanner(){
  html2canvas(document.getElementById("banner")).then(canvas=>{
    const link=document.createElement("a");
    link.download="prisma-x-banner.png";
    link.href=canvas.toDataURL("image/png");
    link.click();
  });
}
