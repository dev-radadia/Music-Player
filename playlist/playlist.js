var playlist_here = myplaylist;
var original_data = mydata;
original_data.forEach(function(song_data){
  song_data.playlists.forEach(function(cool){
    playlist_here[cool].push(song_data);
  })
})
var making_buttons = Object.keys(myplaylist);

var data = playlist_here["Favourites"];

function shuffle_arr(array) {
  var currentIndex = array.length,  randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

making_buttons.forEach(function(name){
  let tracks = document.getElementById("playlists");
  tracks.innerHTML += `<button class="playlist_name" name="${name}" onclick="change_playlist(this)" title="${name}">${name}</button>`;
});

function change_playlist(ok){
  let check = ok.name;
  data = playlist_here[check];
  reload_data();
  document.getElementById("here").play();
  let elements = document.getElementsByClassName("playlist_name");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.border="2px solid #ffff00";
  }
  ok.style.border = "3px solid #ff0000";
}

function reload_data(){
  shuffle_arr(data);
  for(i=0; i<=data.length-1; i++){
    data[i].number = i;
  }

  console.log(data);
  document.getElementById("list").innerHTML = ""

  data.forEach(function(song){
    document.getElementById("list").innerHTML += `<button class="tracks" onclick="play(this)" name="${song.src}" title="${song.name}" value="${song.number}">${song.name}</button><br>`
  })

  document.getElementById("here").load();
  document.getElementById("here").src = data[0].src;
  document.getElementById("name_done").innerText = data[0].name;
  document.getElementById("here").src = data[0].src;
  document.getElementById("here").load();
  current_track = 0;
}


loop_or_not = false;

document.getElementById("here").load();
current_track = 0;

function audio_ended(here){
  let me = document.getElementById("play_pause");

  if(loop_or_not == true){
    me.classList.remove('fa-pause');
    me.classList.add('fa-play');
    me.value = "▶️";
    if(current_track == data.length-1){
      current_track = 0;
    }
    else{
      current_track += 1;
    }
    here.src = data[current_track].src;
    document.getElementById("name_done").innerText = data[current_track].name;
    here.play();
  }

  else if(loop_or_not == false){
    me.classList.remove('fa-pause');
    me.classList.add('fa-play');
    me.value = "▶️";
    if(current_track == data.length-1){
      current_track = 0;
    }
    else{
      current_track += 1;
    }
    here.src = data[current_track].src;
    document.getElementById("name_done").innerText = data[current_track].name;
    if(current_track == 0){
      here.load();
    }
    else{
      here.play();
    }
  }

  else{
    here.play();
  }
}


function play_pause(me){
    if(me.value === "▶️"){
        let here = document.getElementById("here");
        me.classList.remove('fa-play');
        me.classList.add('fa-pause');
        me.value = "⏸️";
        here.play();
    }
    else{
        let here1 = document.getElementById("here");
        me.classList.remove('fa-pause');
        me.classList.add('fa-play');
        me.value = "▶️";
        here1.pause();
    }
}

function audio_paused(){
    let me = document.getElementById("play_pause");
    me.classList.remove('fa-pause');
    me.classList.add('fa-play');
    me.value = "▶️";
}

function audio_played(){
    let me = document.getElementById("play_pause");
    me.classList.remove('fa-play');
    me.classList.add('fa-pause');
    me.value = "⏸️";
}

function next(){
  let here = document.getElementById("here");
  let name = document.getElementById("name_done");
  if(current_track == data.length-1){
    current_track = 0;
  }
  else{
    current_track++;
  }
  here.src = data[current_track].src;
  name.innerText = data[current_track].name;
  here.load();
  here.play();
}

function previous(){
  let here = document.getElementById("here");
  let name = document.getElementById("name_done");
  if(current_track == 0){
    current_track = data.length-1;
  }
  else{
    current_track--;
  }
  here.src = data[current_track].src;
  name.innerText = data[current_track].name;
  here.load();
  here.play();
}

function loop(cool){
  if(loop_or_not == true){
    loop_or_not = "loop song";
    cool.style.color = "#00ffff";
    cool.innerText = "repeat_one"
  }
  else if(loop_or_not == false){
    loop_or_not = true;
    cool.style.color = "#00ffff";
  }
  else if(loop_or_not == "loop song"){
    loop_or_not = false;
    cool.style.color = "#ffffff";
    cool.innerText = "repeat"
  }
}

function shuffle(){
  reload_data();
  document.getElementById("here").play();
}

function forward(){
    let here = document.getElementById("here");
    let current = here.currentTime;
    let new_one = current+5;
    here.currentTime = new_one;
}

function backward(){
    let here = document.getElementById("here");
    let current = here.currentTime;
    let new_one = current-5;
    here.currentTime = new_one;
}

function volume_change(changed){
    let here = document.getElementById("here");
    let here_me = changed.value;
    here.volume = here_me;
    cool_volume();
}

setInterval(() => {
  let here = document.getElementById("here")
  let vol = document.getElementById("volume-control");
  here.volume = vol.value;
}, 50);

function volume(cool){
  let vol = document.getElementById("volume-control");
  if(cool.innerHTML == `<i class="material-icons"></i>`){
    cool.innerHTML = `<i class="material-icons">&#xe050;</i>`
    vol.value = 1;
  }
  else{
    cool.innerHTML = `<i class="material-icons">&#xe04f;</i>`
    vol.value = 0;
  }
}

function change_volume_button(){
  cool_volume();
}

function cool_volume(){
  let changed = document.getElementById("volume-control");
  let cool = document.getElementById("volume");
    if(changed.value < 0.5 && changed.value > 0){
      cool.innerHTML = `<i class="material-icons">&#xe04d;</i>`
    }
    else if(changed.value >= 0.5){
      cool.innerHTML = `<i class="material-icons">&#xe050;</i>`
    }
    else if(changed.value == 0){
      cool.innerHTML = `<i class="material-icons">&#xe04f;</i>`
    }
}


document.onkeydown = function(key_here){
    let key = key_here.keyCode;
    console.log(key);
    let play_pause = document.getElementById("play_pause");
    let loop = document.getElementById("loop");
    let shuffle = document.getElementById("shuffle");
    let forward = document.getElementById("forward");
    let backward = document.getElementById("backward");
    let here = document.getElementById("here");
    let vol = document.getElementById("volume-control");
    let next = document.getElementById("next");
    let previous = document.getElementById("previous");

    key_here.preventDefault();

    if(key === 32){
        play_pause.click();
    }

    else if(key === 80){
        play_pause.click();
    }

    else if(key === 76){
        loop.click();
    }

    else if(key_here.ctrlKey && key === 39){
        next.click();
    }

    else if(key === 39){
        forward.click();
    }

    else if(key_here.ctrlKey && key === 37){
        previous.click();
    }

    else if(key === 37){
        backward.click();
    }

    else if(key === 107){
        let here = document.getElementById("here")
        let current = here.volume
        let new_one = current+0.05
        let vol = document.getElementById("volume-control");
        vol.value = new_one;
        cool_volume();
    }

    else if(key === 38){
        let here = document.getElementById("here")
        let current = here.volume
        let new_one = current+0.05
        let vol = document.getElementById("volume-control");
        vol.value = new_one;
        cool_volume();
    }

    else if(key === 109){
        vol.value -= 0.05;
        cool_volume();
    }

    else if(key === 40){
        vol.value -= 0.05;
        cool_volume();
    }

    else if(key_here.ctrlKey && key === 16){
        vol.value = 0.1;
        cool_volume();
    }

    else if(key === 77){
        vol.value = 0;
        cool_volume();
    }

    else if(key === 85){
        vol.value = 1;
        cool_volume();
    }

    else if(key_here.shiftKey && key === 17){
        vol.value = 1;
        cool_volume();
    }

    else if(key_here.shiftKey && key === 83){
        let here = document.getElementById("here");
        here.load();
        let me = document.getElementById("play_pause");
        me.classList.remove('fa-pause');
        me.classList.add('fa-play');
        //me.innerHTML = "▶️"
        me.value = "▶️";
    }

    else if(key === 83){
        shuffle.click();
    }
}

function format(time) {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";
  if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }
  ret += "" + String(mins).padStart(2, '0') + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

setInterval(()=>{
  let audio = document.getElementById("here");
  let current_time_1 = audio.currentTime;
  let total_time_1 = audio.duration;
  let to_show = document.getElementById("timer");

  let current_time = format(current_time_1);
  let total_time = format(total_time_1);

  to_show.innerText = `${current_time} / ${total_time}`;
}, 50);



function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

let s_1ok1ok1 = document.createElement("style");
document.head.appendChild(s_1ok1ok1);

function changing_range_color(){
  s_1ok1ok1.textContent = `#duration::-webkit-slider-thumb{background-color: hsl(${document.getElementById("duration").value}, 100%, 50%);}`;

  var value_007 = (document.getElementById("duration").value-document.getElementById("duration").min)/(document.getElementById("duration").max-document.getElementById("duration").min)*100;

  let behind_thumb_color = `${hslToHex(document.getElementById("duration").value-190, 100, 50)}`;

  document.getElementById("duration").style.background = `linear-gradient(to right, ${behind_thumb_color} 0%, ${behind_thumb_color} ${value_007}%, #fff ${value_007}%, white 100%)`;

}


help_focus_duration = false;

function input_in_duration(){
  changing_range_color();
  help_focus_duration = true;
}

function input_done_in_duration(){
  help_focus_duration = false;
}

document.querySelector('#duration').onpointerup = (event) => {
  help_focus_duration = false;
};

function duration(changed){
  let here = document.getElementById("here");
  let total = here.duration;
  let here_me = changed.value;
  let to_be_changed = (here_me/100) * total;
  here.currentTime = to_be_changed;
  changing_range_color();
}

setInterval(() => {
    if(help_focus_duration == true){
      return;
    }
    else{
      let dur = document.getElementById("duration");
      let here = document.getElementById("here");
      let total = here.duration;
      let current = here.currentTime;
      let done = (current/total)*100;
      dur.value = done;
    }
    

    changing_range_color();

}, 500);


function play(nice){
  let number = parseInt(nice.value);
  current_track = number;
  let here = document.getElementById("here");
  let name = document.getElementById("name_done");
  here.src = data[current_track].src;
  name.innerText = data[current_track].name;
  here.load();
  here.play();
}

setInterval(()=>{
  let elements = document.getElementsByClassName("tracks");
  let here = document.getElementById("here");
  for (var i = 0; i < elements.length; i++) {
    if(here.src.replace("file:///", "") == elements[i].name){
      elements[i].style.border="3px solid #ff8000";
    }
    else{
      elements[i].style.border="2px solid #ffffff";
    }
  }
}, 50)


function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}