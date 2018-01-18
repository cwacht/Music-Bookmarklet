

//Global Variables
var audio,
  linkIndex,
  listOfLinks = document.links,
  songs = [],
  currentSong = 0;

//Create an array of all the links to playable audio.
for (linkIndex in listOfLinks) {
  var h = listOfLinks[linkIndex].toString().toUpperCase();
  if( h.indexOf("JAVASCRIPT:")!=0 && //filter out any bookmarklets
    ( h.indexOf(".MP3")!=-1 || h.indexOf(".OGG")!=-1 || h.indexOf(".WAV")!=-1 ) ){
    songs.push(listOfLinks[linkIndex]);
  }
}

//If no audio is detected, inform the user and prompt for a query.
if(songs.length == 0){
  search(prompt("No songs detected on the current page. What type of music would you like to hear?", "okgo"));
}else{

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
    creationHelper("button", "", "|◀", "", prev )
  );

  //Play/Pause button
  buttons.appendChild(
    creationHelper("button", "", "||", "", function() {
      if(audio.paused){
        audio.play();
        this.innerHTML="||";
      }else{
        audio.pause();
        this.innerHTML="▶";
      }
    })
  );

  //Next button
  buttons.appendChild(
    creationHelper("button", "", "▶|", "", next )
  );

  //Random button
  buttons.appendChild(
    creationHelper("button", "", "⤭", "", function() {
      currentSong = Math.floor(Math.random() * songs.length);
      startSong();
    })
  );

  //Playlist button
  // buttons.appendChild(
  //   creationHelper("button", "", "☰", "", function() {
  //     player.classList.toggle("pl");
  //   })
  // );

  //Search button
  buttons.appendChild(
    creationHelper("button", "", "⌕", "", function() {
      search(prompt("What type of music would you like to hear?", "okgo"));
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
  style.innerHTML="/*inject:css*//*endinject*/";

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
  audio.addEventListener( "ended", next, !1 );
  
  //Start playing
  updateProgressBar();
  startSong();

  //provide next/prev controls within android notification
  navigator.mediaSession.setActionHandler("previoustrack", prev);
  navigator.mediaSession.setActionHandler("nexttrack", next);

}

/*
startSong begins playing a new song
It runs once at the start and anytime a song is changed
*/
function startSong() {
  audio.src = songs[currentSong];
  audio.play();
  var t = decodeURIComponent(songs[currentSong].href);
  songname.innerHTML = t.substring(t.lastIndexOf("/") + 1);
  navigator.mediaSession.metadata = new MediaMetadata({
    title: songname.innerHTML
  });
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

/*
search will load a custom google search for audio files with the search term in the current tab
https://www.wikihow.com/Get-Free-Music-Using-Google
*/
function search(search){
  if(search){
    window.open("https://www.google.com/search?q=intitle:\"index.of\" (wma|mp3|midi) "+search,"_self");
  }
}

function prev(){
  if(currentSong>0){
    currentSong--;
  }else{
    currentSong=songs.length-1
  }
  startSong();
}
function next(){
  if(currentSong<songs.length-1){
    currentSong++;
  }else{
    currentSong=0;
  }
  startSong();
}