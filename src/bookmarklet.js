

//Global Variables
var audio,
  linkIndex,
  listOfLinks = document.links,
  songs = [],
  currentSong = 0;

//Create an array of all the links to playable audio.
for (linkIndex in listOfLinks) {
  var h = listOfLinks[linkIndex].toString().toUpperCase();
  if( h.indexOf(".MP3")!=-1 || h.indexOf(".OGG")!=-1 || h.indexOf(".WAV")!=-1 ){
    songs.push(listOfLinks[linkIndex]);
  }
}

//Create the player container
var player = creationHelper("div", "player", "", "", "");


var playing = creationHelper("div", "playing", "", "", "");

//Add progressbar
var progressBar = creationHelper("div", "progressbar", "", "", function(e) {
  var x = e.clientX;
  x /= window.innerWidth;
  audio.currentTime = audio.duration * x;
});
//Progress
var progress = creationHelper("div", "progress", "", "", "");

progressBar.appendChild(progress);
playing.appendChild(progressBar);

//Add songname
var songname = creationHelper("div", "songname", "", "", "");
playing.appendChild(songname);

//Add button container
var buttons = creationHelper("div", "buttons", "", "", "");

//Prev button
buttons.appendChild(
  creationHelper("button", "", "|<", "", function() {
    currentSong--;
    startSong();
  })
);

//Play/Pause button
buttons.appendChild(
  creationHelper("button", "", ">", "", function() {
    if(audio.paused){
      audio.play();
    }else{
      audio.pause();
    }
  })
);

//Next button
buttons.appendChild(
  creationHelper("button", "", ">|", "", function() {
    currentSong++;
    startSong();
  })
);

//Random button
buttons.appendChild(
  creationHelper("button", "", "><", "", function() {
    currentSong = Math.floor(Math.random() * songs.length);
    startSong();
  })
);

//Playlist button
buttons.appendChild(
  creationHelper("button", "", "V", "", function() {
    player.classList.toggle("pl");
  })
);
playing.appendChild(buttons);

player.appendChild(playing);

//Add playlist
var playList = creationHelper("ul", "playlist", "", "", "");
for (songIndex in songs) {
  var url = decodeURIComponent(unescape(songs[songIndex].href));
  playList.appendChild(
    creationHelper("li", "", url.substring(url.lastIndexOf("/") + 1), songIndex, function() {
      currentSong = parseInt(this.getAttribute("data"));
      startSong();
    })
  );
}
player.appendChild(playList);

var style = creationHelper("style", "", "", "", "");
style.innerHTML=".player{position:absolute;top:0;bottom:0;left:0;right:0;background:#87ceeb;font-size:x-large}.playing,.playlist,.progressbar{position:relative}.playing{height:100%;width:100%}.pl .playing{height:20%}.playlist{height:0%;width:100%;box-sizing:border-box;max-width:800px;margin:auto;overflow:scroll}.pl .playlist{height:80%}.progressbar{height:100%;width:100%;text-align:center}.progress{height:100%;background:orange;text-align:center}.buttons,.songname{position:absolute;width:100%;text-align:center}.songname{top:33%}.buttons{top:66%}.player button{background:0 0;border:none;font-size:x-large}";

player.appendChild(style);

var meta = document.createElement("meta");
var o = document.createAttribute("name");
o.value = "viewport";
meta.setAttributeNode(o);
o = document.createAttribute("content");
o.value = "width=device-width, initial-scale=1";
meta.setAttributeNode(o);
document.head.appendChild(meta);

document.body.innerHTML="";
document.body.appendChild(player);

//Create the HTML Audio instance
audio = new Audio;
audio.addEventListener(
  "ended", function() {
    currentSong++;
    startSong();
  }, !1
);
//Start playing
startSong();
requestAnimationFrame(updateProgressBar);

/*
startSong begins playing a new song
It runs once at the start and anytime a song is changed
*/
function startSong() {
  audio.src = songs[currentSong];
  audio.play();
  var t = decodeURIComponent(songs[currentSong].href);
  songname.innerHTML = t.substring(t.lastIndexOf("/") + 1);
}

/*
creationHelper creates DOM elements with varoius properties
*/
function creationHelper(elementType, classes, text, data, onclick) {
  var e = document.createElement(elementType);
  if(classes!="")e.classList.add(classes);
  var o = document.createAttribute("data");
  o.value = data;
  e.setAttributeNode(o);
  e.appendChild(document.createTextNode(text));
  e.onclick = onclick;
  return e;
}

/*
updateProgressBar sets the width of the progress bar once per frame
*/
function updateProgressBar() {
  progress.style.width = audio.currentTime / audio.duration * 100 + "%";
  requestAnimationFrame(updateProgressBar);
}