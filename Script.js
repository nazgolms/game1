const player = document.getElementById("player");

let x = 100;
let y = 100;
let speed = 5;

let money = 0;
let hp = 100;
let wanted = 0;

const keys = {};

document.addEventListener("keydown",(e)=>{
  keys[e.key.toLowerCase()] = true;

  // attack
  if(e.key === " "){
    attack();
  }
});

document.addEventListener("keyup",(e)=>{
  keys[e.key.toLowerCase()] = false;
});

function update(){

  if(keys["w"]) y -= speed;
  if(keys["s"]) y += speed;
  if(keys["a"]) x -= speed;
  if(keys["d"]) x += speed;

  player.style.left = x + "px";
  player.style.top = y + "px";

  camera();

  requestAnimationFrame(update);
}

function camera(){
  window.scrollTo(
    x - window.innerWidth/2 + 20,
    y - window.innerHeight/2 + 20
  );
}

function attack(){

  const npcs = document.querySelectorAll(".npc");

  npcs.forEach(npc=>{

    const nx = npc.offsetLeft;
    const ny = npc.offsetTop;

    const dist = Math.hypot(x - nx, y - ny);

    if(dist < 80){

      npc.remove();

      money += 100;
      wanted += 1;

      updateHUD();

      spawnPolice();
    }

  });

}

function spawnPolice(){

  const police = document.createElement("div");

  police.classList.add("npc");

  police.style.background = "#00aaff";

  police.style.left = (x + Math.random()*300) + "px";
  police.style.top = (y + Math.random()*300) + "px";

  document.getElementById("game").appendChild(police);

}

function updateHUD(){

  document.getElementById("money").innerText = money;
  document.getElementById("hp").innerText = hp;
  document.getElementById("wanted").innerText = wanted;

}

update();
