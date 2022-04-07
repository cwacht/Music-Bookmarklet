# Music-Bookmarklet
A standalone bookmarklet that plays audio from a page in a full page player.

[Visit the gh-page](https://cwacht.github.io/Music-Bookmarklet/) to drag the bookmarklet into your browser.

<a href="javascript:var e,t,n=document.links,i=[],o=0;for(t in n){var a=n[t].toString().toUpperCase();0==a.indexOf(&quot;JAVASCRIPT:&quot;)||-1==a.indexOf(&quot;.MP3&quot;)&amp;&amp;-1==a.indexOf(&quot;.OGG&quot;)&amp;&amp;-1==a.indexOf(&quot;.WAV&quot;)||i.push(n[t])}if(0==i.length)w(prompt(&quot;No songs detected on the current page. What type of music would you like to hear?&quot;,&quot;okgo&quot;));else{var d=x(&quot;div&quot;,&quot;player&quot;,&quot;&quot;,&quot;&quot;,&quot;&quot;),r=x(&quot;div&quot;,&quot;playing&quot;,&quot;&quot;,&quot;&quot;,&quot;&quot;),p=x(&quot;div&quot;,&quot;progressbar&quot;,&quot;&quot;,&quot;&quot;,function(t){var n=t.clientX;n/=window.innerWidth,e.currentTime=e.duration*n}),l=x(&quot;div&quot;,&quot;progress&quot;,&quot;&quot;,&quot;&quot;,&quot;&quot;);p.appendChild(l),r.appendChild(p);var s=x(&quot;div&quot;,&quot;songname&quot;,&quot;&quot;,&quot;&quot;,&quot;&quot;);r.appendChild(s);var u=x(&quot;div&quot;,&quot;buttons&quot;,&quot;&quot;,&quot;&quot;,&quot;&quot;);u.appendChild(x(&quot;button&quot;,&quot;&quot;,&quot;|◀&quot;,&quot;&quot;,y)),u.appendChild(x(&quot;button&quot;,&quot;&quot;,&quot;||&quot;,&quot;&quot;,function(){e.paused?(e.play(),this.innerHTML=&quot;||&quot;):(e.pause(),this.innerHTML=&quot;▶&quot;)})),u.appendChild(x(&quot;button&quot;,&quot;&quot;,&quot;▶|&quot;,&quot;&quot;,C)),u.appendChild(x(&quot;button&quot;,&quot;&quot;,&quot;⤭&quot;,&quot;&quot;,function(){o=Math.floor(Math.random()*i.length),f()})),u.appendChild(x(&quot;button&quot;,&quot;&quot;,&quot;⌕&quot;,&quot;&quot;,function(){w(prompt(&quot;What type of music would you like to hear?&quot;,&quot;okgo&quot;))})),r.appendChild(u),d.appendChild(r);var c=x(&quot;ul&quot;,&quot;playlist&quot;,&quot;&quot;,&quot;&quot;,&quot;&quot;);for(songIndex in i){var h=decodeURIComponent(unescape(i[songIndex].href));c.appendChild(x(&quot;li&quot;,&quot;&quot;,h.substring(h.lastIndexOf(&quot;/&quot;)+1),songIndex,function(){o=parseInt(this.getAttribute(&quot;data&quot;)),f()}))}d.appendChild(c);var g=x(&quot;style&quot;,&quot;&quot;,&quot;&quot;,&quot;&quot;,&quot;&quot;);g.innerHTML=&quot;.player{position:absolute;bottom:0;left:0;right:0;background:grey;font-size:x-large;color:#87ceeb;text-shadow:0 1px 1px #000;font-family:courier;font-weight:700}.playing{width:100%;height:160px}.playlist{position:fixed;top:0;bottom:170px;width:100%;background:grey;box-sizing:border-box;margin:0;overflow:scroll}.progressbar{position:relative;height:40px;margin:10px;border-radius:20px;text-align:center;overflow:hidden;border:1px solid #555}.progress{position:relative;width:99%;height:40px;background:#87ceeb}.songname{height:40px;width:100%;text-align:center;white-space:nowrap}.buttons{height:60px;width:100%;text-align:center}.player button{background:0 0;border:none;font-size:40px;color:#87ceeb;text-shadow:0 1px 1px #000}&quot;,d.appendChild(g);var m=document.createElement(&quot;meta&quot;),b=document.createAttribute(&quot;name&quot;);b.value=&quot;viewport&quot;,m.setAttributeNode(b),(b=document.createAttribute(&quot;content&quot;)).value=&quot;width=device-width, initial-scale=1&quot;,m.setAttributeNode(b),document.head.appendChild(m),document.body.innerHTML=&quot;&quot;,document.body.appendChild(d),(e=new Audio).addEventListener(&quot;ended&quot;,C,!1),v(),f(),navigator.mediaSession.setActionHandler(&quot;previoustrack&quot;,y),navigator.mediaSession.setActionHandler(&quot;nexttrack&quot;,C)}function f(){e.src=i[o],e.play();var t=decodeURIComponent(i[o].href);s.innerHTML=t.substring(t.lastIndexOf(&quot;/&quot;)+1),navigator.mediaSession.metadata=new MediaMetadata({title:s.innerHTML})}function x(e,t,n,i,o){var a=document.createElement(e);&quot;&quot;!=t&amp;&amp;a.classList.add(t);var d=document.createAttribute(&quot;data&quot;);return d.value=i,a.setAttributeNode(d),a.appendChild(document.createTextNode(n)),a.onclick=o,a}function v(){l.style.width=e.currentTime/e.duration*100+&quot;%&quot;,requestAnimationFrame(v)}function w(e){e&amp;&amp;window.open(&quot;https://www.google.com/search?q=intitle:\&quot;index.of\&quot; (wma|mp3|midi) &quot;+e,&quot;_self&quot;)}function y(){o>0?o--:o=i.length-1,f()}function C(){o<i.length-1?o++:o=0,f()}">Play Audio</a>


## Basic use:
* Bookmark it
* Visit a page that links to audio files
* Click the bookmarklet

## Features:
* Play/pause
* Prev/Next
* Random song
* Click any song in the playlist to play it
* Click a point along the progressbar to skip ahead/back
* Search

* On Android devices:
  * Player controls are available via a Media Notification.
  * So the player can run in the background and be controled without returning to the browser tab.
  * As a result, the player can also be controlled via connected devices with media controls or notification sync (Headphones, smartwatches, etc...)


* If no audio files are detected when the bookmarklet is clicked:
  * A prompt will appear with an input.
  * Enter the type of audio you would like to find, and click 'ok'.
  * A custom Google search will return pages containing audio links and the search term.
  * Visit one of the pages from the Google search.
  * Click the bookmarklet


## If the bookmarklet doesn't work:
* Refresh the page (without using the bookmarklet) and test the links to audio files.
* Clicking one of these links should play it in the browser's default audio player.
* If it does something else (doesnt play, loads another webpage, initiates a download, etc...), then that page will not work.

* If the links do play in the browser, but the bookmarklet still doesnt work, it is probably my fault.


## Support:
I have tested in Chrome on Mac, Android, and Chromebook. That is all.
