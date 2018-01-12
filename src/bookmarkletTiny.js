

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
var player = creationHelper("div", "position:fixed;bottom:0;left:0;height:50px;width:100%", "", "", "");
document.body.appendChild(player);

//Prev button
player.appendChild(
  creationHelper("button", "", "|<", "", function() {
    currentSong--;
    startSong();
  })
);

//Play/Pause button
player.appendChild(
  creationHelper("button", "", ">", "", function() {
    if(audio.paused){
      audio.play();
    }else{
      audio.pause();
    }
  })
);

//Next button
player.appendChild(
  creationHelper("button", "", ">|", "", function() {
    currentSong++;
    startSong();
  })
);

//Random button
player.appendChild(
  creationHelper("button", "", "><", "", function() {
    currentSong = Math.floor(Math.random() * songs.length);
    startSong();
  })
);

//Add playlist
var playList = creationHelper("ul", "width:300px;background:grey;position:absolute;bottom:50%;right:0;margin:0;max-height:500px;overflow:scroll;", "", "", "");
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

//Add progressbar
var progressBar = creationHelper("div", "position:absolute;bottom:0;white-space:nowrap;height:50%;background:skyblue;border-right:9999px solid grey;", "", "", function(e) {
  var x = e.clientX;
  x /= window.innerWidth;
  audio.currentTime = audio.duration * x;
});
player.appendChild(progressBar);

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
  progressBar.innerHTML = t.substring(t.lastIndexOf("/") + 1);
}

/*
creationHelper creates DOM elements with varoius properties
*/
function creationHelper(elementType, style, text, data, onclick) {
  var e = document.createElement(elementType);
  e.style.cssText = style;
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
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  requestAnimationFrame(updateProgressBar);
}