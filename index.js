var data = mydata;

function shuffle(array) {
  var currentIndex = array.length,  randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

shuffle(data);

function arrang_song(){
  document.getElementById('all_songs').innerHTML = "";

    console.log(data)
    
    data.forEach(function(ok) {
      if (ok.type === ""){
        document.getElementById('all_songs').innerHTML += `<button class="song nonfav" value="${ok.src}" onclick="play_song(this)" title="${ok.name}" style="border: 2px solid #ffffff;"><b>${ok.name}</b></button>`;
      }
      else if(ok.type === "Favourite"){
        document.getElementById('all_songs').innerHTML += `<button class="song favourite" value="${ok.src}" onclick="play_song(this)" title="${ok.name}" style="border: 2px solid #00ff00;"><b>${ok.name}</b></button>`;
      }
      else if(ok.type === "Excellent"){
        document.getElementById('all_songs').innerHTML += `<button class="song favourite" value="${ok.src}" onclick="play_song(this)" title="${ok.name}" style="border: 2px solid #00ffff;"><b>${ok.name}</b></button>`;
      }
      else if(ok.type === "Good"){
        document.getElementById('all_songs').innerHTML += `<button class="song favourite" value="${ok.src}" onclick="play_song(this)" title="${ok.name}" style="border: 2px solid #ffff00;"><b>${ok.name}</b></button>`;
      }
    })
}


setTimeout(()=>{
  arrang_song()
}, 1000);

/*/function page_loaded(){
    arrang_song()
}/*/

function search() {
    let input = document.getElementById("search");
    let filter = input.value.toUpperCase();
    let div = document.getElementById("all_songs");
    let button = div.getElementsByTagName("button");

    for (i = 0; i < button.length; i++) {
      let a = button[i].getElementsByTagName("b")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        button[i].style.display = "";
      } else {
        button[i].style.display = "none";
      }
    }
}

function filter_fav(op){

  let checking_is_always_needed = window.getComputedStyle(op, null).getPropertyValue("color")
  if(checking_is_always_needed === "rgb(0, 255, 0)"){

    arrang_song()

    document.getElementById("favourites").style.color = "#ffffff"
  }

  else{
    arrang_song()
    document.getElementById("favourites").style.color = "#ffffff"
    document.getElementById("excellent").style.color = "#ffffff"
    document.getElementById("good").style.color = "#ffffff"

    document.getElementById('all_songs').innerHTML = "";
    let fav_song_arr = []

    for (var i = 0; i < data.length; i++) {
      if (data[i].type === 'Favourite') {
        fav_song_arr.push(data[i]);
      }
    }

    fav_song_arr.forEach(function(ok) {
        document.getElementById('all_songs').innerHTML += `<button class="song favourite" value="${ok.src}" onclick="play_song(this)" title="${ok.name}" style="border: 2px solid #00ff00;"><b>${ok.name}</b></button>`;
    })

    document.getElementById("favourites").style.color = "#00ff00"
  }
}

function filter_excellent(op1){

  let checking_is_always_needed = window.getComputedStyle(op1, null).getPropertyValue("color")
  if(checking_is_always_needed === "rgb(0, 255, 255)"){

    arrang_song()

    document.getElementById("excellent").style.color = "#ffffff"
  }

  else{
    arrang_song()
    document.getElementById("favourites").style.color = "#ffffff"
    document.getElementById("excellent").style.color = "#ffffff"
    document.getElementById("good").style.color = "#ffffff"

    document.getElementById('all_songs').innerHTML = "";
    let fav_song_arr = []

    for (var i = 0; i < data.length; i++) {
      if (data[i].type === 'Excellent') {
        fav_song_arr.push(data[i]);
      }
    }

    fav_song_arr.forEach(function(ok) {
        document.getElementById('all_songs').innerHTML += `<button class="song favourite" value="${ok.src}" onclick="play_song(this)" title="${ok.name}" style="border: 2px solid #00ffff;"><b>${ok.name}</b></button>`;
    })

    document.getElementById("excellent").style.color = "#00ffff"
  }
}

function filter_good(op2){

  let checking_is_always_needed = window.getComputedStyle(op2, null).getPropertyValue("color")
  if(checking_is_always_needed === "rgb(255, 255, 0)"){

    arrang_song()

    document.getElementById("good").style.color = "#ffffff"
  }

  else{
    arrang_song()
    document.getElementById("favourites").style.color = "#ffffff"
    document.getElementById("excellent").style.color = "#ffffff"
    document.getElementById("good").style.color = "#ffffff"

    document.getElementById('all_songs').innerHTML = "";
    let fav_song_arr = []

    for (var i = 0; i < data.length; i++) {
      if (data[i].type === 'Good') {
        fav_song_arr.push(data[i]);
      }
    }

    fav_song_arr.forEach(function(ok) {
        document.getElementById('all_songs').innerHTML += `<button class="song favourite" value="${ok.src}" onclick="play_song(this)" title="${ok.name}" style="border: 2px solid #ffff00;"><b>${ok.name}</b></button>`;
    })

    document.getElementById("good").style.color = "#ffff00"
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
  let audio = document.getElementById("here")
  let current_time_1 = audio.currentTime
  let total_time_1 = audio.duration
  let to_show = document.getElementById("timer")

  let current_time = format(current_time_1)
  let total_time = format(total_time_1)

  to_show.innerText = `${current_time} / ${total_time}`
}, 500)


function play_pause(me){
    if(me.value === "▶️"){
        let here = document.getElementById("here")
        me.classList.remove('fa-play');
        me.classList.add('fa-pause');
        //me.innerHTML = "⏸️"
        me.value = "⏸️"
        here.play()
    }
    else{
        let here1 = document.getElementById("here")
        me.classList.remove('fa-pause');
        me.classList.add('fa-play');
        //me.innerHTML = "▶️"
        me.value = "▶️"
        here1.pause()
    }
}

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
  s_1ok1ok1.textContent = `#duration::-webkit-slider-thumb{background-color: hsl(${document.getElementById("duration").value}, 100%, 50%);}`

  var value_007 = (document.getElementById("duration").value-document.getElementById("duration").min)/(document.getElementById("duration").max-document.getElementById("duration").min)*100

  let behind_thumb_color = `${hslToHex(document.getElementById("duration").value-190, 100, 50)}`

  document.getElementById("duration").style.background = `linear-gradient(to right, ${behind_thumb_color} 0%, ${behind_thumb_color} ${value_007}%, #fff ${value_007}%, white 100%)`


}

function stop(){
    let here = document.getElementById("here");
    here.load();
    let me = document.getElementById("play_pause");
    me.classList.remove('fa-pause');
    me.classList.add('fa-play');
    //me.innerHTML = "▶️"
    me.value = "▶️"
}

function loop(omg){
    let give_me = window.getComputedStyle(omg, null).getPropertyValue("background")
    let here = document.getElementById("here")
    if(here.loop === false){
        let got = document.getElementById("loop");
        
        got.style.borderColor = "#00ffff";
        let here = document.getElementById("here");
        here.loop = true;
    }
    else{
        let got = document.getElementById("loop");
        
        got.style.borderColor = "#ffffff";
        let here = document.getElementById("here");
        here.loop = false;
    }
}

function audio_ended(){
    let me = document.getElementById("play_pause")
    me.classList.remove('fa-pause');
    me.classList.add('fa-play');
    //me.innerHTML = "▶️"
    me.value = "▶️"
}

function audio_paused(){
    let me = document.getElementById("play_pause")
    me.classList.remove('fa-pause');
    me.classList.add('fa-play');
    //me.innerHTML = "▶️"
    me.value = "▶️"
}

function audio_played(){
    let me = document.getElementById("play_pause")
    me.classList.remove('fa-play');
    me.classList.add('fa-pause');
    //me.innerHTML = "⏸️"
    me.value = "⏸️"
}


function forward(){
    let here = document.getElementById("here")
    let current = here.currentTime
    let new_one = current+5
    here.currentTime = new_one
}

function backward(){
    let here = document.getElementById("here")
    let current = here.currentTime
    let new_one = current-5
    here.currentTime = new_one
}

function volume_plus(){
    let here = document.getElementById("here")
    let current = here.volume
    let new_one = current+0.05
    here.volume = new_one
    let vol = document.getElementById("volume-control");
    vol.value = new_one;
}

function volume_minus(){
    let here = document.getElementById("here")
    let current = here.volume
    let new_one = current-0.05
    here.volume = new_one
    let vol = document.getElementById("volume-control");
    vol.value = new_one;
}

function done_ok(e123){
    var sound = document.getElementById('here');
    const file = document.querySelector('#input').files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        sound.src = reader.result;
        sound.load()
        console.log(reader.result)

        let me = document.getElementById("play_pause")
        me.classList.remove('fa-pause');
        me.classList.add('fa-play');
        //me.innerHTML = "▶️"
        me.value = "▶️"

        let fake_path = e123.value
        let file_name = fake_path.split("\\").pop()
        let name = document.getElementById("name_done")
        name.innerText = file_name
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}

function play_song(songs){
    let audio = document.getElementById("here")
    let done_songs = songs.value
    audio.src = `${done_songs}`

    audio.load()
    audio.play()
    let me = document.getElementById("play_pause")
    me.classList.remove('fa-play');
    me.classList.add('fa-pause');
    me.value = "⏸️"
    //me.innerHTML = "⏸️"

    let name = document.getElementById("name_done")
    name.innerText = songs.innerText
}

document.onkeydown = function(key_here){
    let key = key_here.keyCode
    console.log(key)
    let play_pause = document.getElementById("play_pause")
    let stop = document.getElementById("stop")
    let loop = document.getElementById("loop")
    let forward = document.getElementById("forward")
    let backward = document.getElementById("backward")
    let volume_plus = document.getElementById("volume_plus")
    let volume_minus = document.getElementById("volume_minus")
    let here = document.getElementById("here")

    let search1111111111 = document.getElementById("search")
    let check_if_true_or_not = window.getComputedStyle(search1111111111, null).getPropertyValue("border")

    if(check_if_true_or_not === "1px solid rgb(0, 255, 0)"){
      return
    }

    else{
      key_here.preventDefault()

        if(key === 32){
            play_pause.click()
        }

        else if(key === 80){
            play_pause.click()
        }

        else if(key === 76){
            loop.click()
        }

        else if(key === 39){
            forward.click()
        }

        else if(key === 37){
            backward.click()
        }

        else if(key === 107){
            volume_plus.click()
        }

        else if(key === 38){
            volume_plus.click()
        }

        else if(key === 109){
            volume_minus.click()
        }

        else if(key === 40){
            volume_minus.click()
        }

        else if(key_here.ctrlKey && key === 16){
            here.volume = 0.1
            let vol = document.getElementById("volume-control");
            vol.value = 0.1;
        }

        else if(key === 77){
            here.volume = 0
            let vol = document.getElementById("volume-control");
            vol.value = 0;
        }

        else if(key === 85){
            here.volume = 1
            let vol = document.getElementById("volume-control");
            vol.value = 1;
        }

        else if(key_here.shiftKey && key === 17){
            here.volume = 1
            let vol = document.getElementById("volume-control");
            vol.value = 1;
        }

        else if(key === 83){
            stop.click()
        }
    }
}

help_focus_duration = false;

function input_in_duration(){
  changing_range_color()
  help_focus_duration = true;
}

function input_done_in_duration(){
  help_focus_duration = false;
}

function duration(changed){
    let here = document.getElementById("here")
    let total = here.duration
    let here_me = changed.value
    let to_be_changed = (here_me/100) * total
    here.currentTime = to_be_changed

    changing_range_color()
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

}, 1000);

function volume_change(changed){
    let here = document.getElementById("here")
    let here_me = changed.value
    here.volume = here_me
}

setInterval(() => {
  let here = document.getElementById("here")
  let vol = document.getElementById("volume-control");
  here.volume = vol.value;
}, 50)

setInterval(() => {
  if(screen.width < 700){
    document.getElementById("play_pause").style.fontSize = "x-large";
    document.getElementById("stop").style.fontSize = "x-large";
  }

  else if(screen.width >= 700){
    document.getElementById("play_pause").style.fontSize = "xx-large";
    document.getElementById("stop").style.fontSize = "xx-large";
  }

  else{
    return;
  }

  if(screen.width < 550){
    document.getElementById("loop").style.fontSize = "12px";
    document.getElementById("loop").style.borderWidth = "2px";
  }
  else if(screen.width >= 550){
    document.getElementById("loop").style.fontSize = "medium";
    document.getElementById("loop").style.borderWidth = "3px";
  }

  else{
    return;
  }

  if(screen.width < 450){
    document.getElementById("volume_minus").style.fontSize = "12px";
    document.getElementById("volume_minus").style.borderWidth = "2px";
    document.getElementById("volume_plus").style.fontSize = "12px";
    document.getElementById("volume_plus").style.borderWidth = "2px";

    document.getElementById("play_pause").style.fontSize = "large";
    document.getElementById("stop").style.fontSize = "large";

  }
  else if(screen.width >= 450){
    document.getElementById("volume_minus").style.fontSize = "medium";
    document.getElementById("volume_minus").style.borderWidth = "3px";
    document.getElementById("volume_plus").style.fontSize = "medium";
    document.getElementById("volume_plus").style.borderWidth = "3px";

    document.getElementById("play_pause").style.fontSize = "x-large";
    document.getElementById("stop").style.fontSize = "x-large";

  }

  else{
    return;
  }

  if(screen.width < 399){
    document.getElementById("play_pause").style.borderWidth = "2px";
    document.getElementById("stop").style.borderWidth = "2px";
  }
  else if(screen.width >= 399){
    document.getElementById("play_pause").style.borderWidth = "3px";
    document.getElementById("stop").style.borderWidth = "3px";
  }

  else{
    return;
  }

}, 50);

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}