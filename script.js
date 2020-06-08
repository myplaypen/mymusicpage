const load = (function makeLoad() {
   "use strict";

   function _load(tag) {
      return function (url) {
         return new Promise(function (resolve) {
            const element = document.createElement(tag);
            const parent = "body";
            const attr = "src";
            element.onload = function () {
               resolve(url);
            };
            element[attr] = url;
            document[parent].appendChild(element);
         });
      };
   }
   return {
      js: _load("script")
   };
}());

(function iife() {
   "use strict";

   function show(el) {
      el.classList.remove("hide");
   }

   function hide(el) {
      el.classList.add("hide");
   }

   function coverClickHandler(evt) {
      const cover = evt.currentTarget;
      const thewrap = cover.parentNode.querySelector(".container");
      hide(cover);
      show(thewrap);
   }
   const cover = document.querySelector(".jacketa");
   cover.addEventListener("click", coverClickHandler);
}());

(function manageCover() {
   "use strict";

   function hide(el) {
      el.classList.add("hide");
   }

   function coverClickHandler(evt) {
      const cover = evt.currentTarget;
      hide(cover);
   }
   const cover = document.querySelector(".jacket-left");
   cover.addEventListener("click", coverClickHandler);
}());

(function manageCover() {
   "use strict";

   function hide(el) {
      el.classList.add("hide");
   }

   function coverClickHandler(evt) {
      const cover = evt.currentTarget;
      hide(cover);
   }
   const cover = document.querySelector(".jacket-middle");
   cover.addEventListener("click", coverClickHandler);
}());

(function manageCover() {
   "use strict";

   function hide(el) {
      el.classList.add("hide");
   }

   function coverClickHandler(evt) {
      const cover = evt.currentTarget;
      hide(cover);
   }
   const cover = document.querySelector(".jacket-right");
   cover.addEventListener("click", coverClickHandler);
}());

(function iife() {
   "use strict";

   function show(el) {
      el.classList.remove("hide");
   }

   function hide(el) {
      el.classList.add("hide");
   }

   function getButtonContainer(el) {
      while (el.classList.contains("playButton") === false) {
         el = el.parentNode;
      }
      return el;
   }

   function hideAllButtons(button) {
      const buttons = button.querySelectorAll(".play, .pause, .speaker");
      for (let i = 0; i < buttons.length; i++) {
         hide(buttons[i]);
      }
   }

   function getPlay(button) {
      return button.querySelector(".play");
   }

   function getPause(button) {
      return button.querySelector(".pause");
   }

   function showPlayButton(button) {
      const play = getPlay(button);
      hideAllButtons(button);
      show(play);
      button.classList.remove("active");
   }

   function isPlaying(button) {
      const play = getPlay(button);
      return play.classList.contains("hide");
   }

   function pauseAllButtons() {
      let buttons = document.querySelectorAll(".playButton");
      for (let i = 0; i < buttons.length; i++) {
         if (isPlaying(buttons[i])) {
            showPlayButton(buttons[i]);
         }
      }
   }

   function showPauseButton(button) {
      const pause = getPause(button);
      pauseAllButtons();
      hideAllButtons(button);
      show(pause);
      button.classList.add("active");
   }

   function getAudio() {
      return document.querySelector("audio");
   }

   function playAudio(player, src) {
      player.volume = 1.0;
      if (player.getAttribute("src") !== src) {
         player.setAttribute("src", src);
      }
      player.play();
   }

   function showButton(button, opts) {
      if (opts.playing) {
         showPlayButton(button);
      } else {
         showPauseButton(button);
      }
   }

   function pauseAudio(player) {
      player.pause();
   }

   function manageAudio(player, opts) {
      if (opts.playing) {
         pauseAudio(player);
      } else {
         playAudio(player, opts.src);
      }
   }

   function togglePlayButton(button) {
      const player = getAudio();
      const playing = isPlaying(button);
      showButton(button, {
         playing
      });
      manageAudio(player, {
         src: button.getAttribute("data-audio"),
         playing
      });
   }

   function playButtonClickHandler(evt) {
      const button = getButtonContainer(evt.target);
      togglePlayButton(button);
   }

   function initButton(selector) {
      const wrapper = document.querySelector(selector);
      wrapper.addEventListener("click", playButtonClickHandler);
   }
   initButton(".wrapa");
}());

(function manageCover() {
   "use strict";

   function hide(el) {
      el.classList.add("hide");
   }

   function coverClickHandler(evt) {
      const cover = evt.currentTarget;
      hide(cover);
   }
   const cover = document.querySelector(".jacketc");
   cover.addEventListener("click", coverClickHandler);
}());

(function manageCover() {
   "use strict";

   function show(el) {
      el.classList.remove("hide");
   }

   function hide(el) {
      el.classList.add("hide");
   }

   function coverClickHandler(evt) {
      const cover = evt.currentTarget;
      const thewrap = cover.parentNode.querySelector(".wraph");
      hide(cover);
      show(thewrap);
   }
   const cover = document.querySelector(".jacketd");
   cover.addEventListener("click", coverClickHandler);
}());
const videoPlayer = (function makeVideoPlayer() {
   "use strict";
   const players = [];
   let playerVars = {};

   function onPlayerReady(event) {
      const player = event.target;
      player.setVolume(100); // percent
   }

   let hasShuffled = false;

   function onPlayerStateChange(event) {
      const player = event.target;
      if (!hasShuffled) {
         player.setShuffle(true);
         player.playVideoAt(0);
         hasShuffled = true;
      }
      if (event.data === YT.PlayerState.PLAYING) {
         for (let i = 0; i < players.length; i++) {
            if (players[i] !== event.target) players[i].pauseVideo();
         }
      }

      if (playerVars.loop && event.data === YT.PlayerState.ENDED) {
         player.seekTo(playerVars.start);
      }
   }

   function addVideo(video, settings) {
      playerVars = Object.assign({
         videoId: video.dataset.id,
         host: "https://www.youtube-nocookie.com",
         events: {
            "onReady": onPlayerReady,
            "onStateChange": onPlayerStateChange
         }
      }, settings);
      players.push(new YT.Player(video, playerVars));
   }

   function init(video, settings) {
      load.js("https://www.youtube.com/player_api").then(function () {
         YT.ready(function () {
            addVideo(video, settings);
         });
      });
   }
   return {
      init
   };
}());

function loadPlayer(opts) {
   "use strict";

   function show(el) {
      el.classList.remove("hide");
   }

   function initPlayer(wrapper) {
      const video = wrapper.querySelector(".video");
      opts.width = opts.width || 198;
      opts.height = opts.height || 198;
      opts.autoplay = 1;
      opts.controls = 1;
      opts.rel = 0;
      opts.enablejsapi = 1;
      opts.iv_load_policy = 3;
      opts.fs = 0;
      opts.disablekb = 1;

      function paramInOpts(settings, param) {
         if (opts[param] !== undefined) {
            settings[param] = opts[param];
         }
         return settings;
      }
      const settingsParams = ["width", "height", "videoid", "host"];
      const settings = settingsParams.reduce(paramInOpts, {});
      const playerVarsParams = ["autoplay", "cc_load_policy",
         "controls", "disablekb", "end", "fs", "iv_load_policy",
         "list", "listType", "loop", "playlist", "rel", "start"
      ];
      settings.playerVars = playerVarsParams.reduce(paramInOpts, {});
      videoPlayer.init(video, settings);
   }

   function coverClickHandler(evt) {
      const wrapper = evt.currentTarget.nextElementSibling;
      show(wrapper);
      initPlayer(wrapper);
   }
   const cover = document.querySelector(opts.target);
   cover.addEventListener("click", coverClickHandler);
}
const playlist = "0dgNc5S8cLI,mnfmQe8Mv1g,-Xgi_way56U,CHahce95B1g";

loadPlayer({
   target: ".jacket-left",
   width: 277,
   height: 207
});

loadPlayer({
   target: ".jacket-middle",
   width: 277,
   height: 207,
   start: 4
});
loadPlayer({
   target: ".jacket-right",
   width: 277,
   height: 207
});

loadPlayer({
   target: ".jacketc",
   width: 600,
   height: 338,
   loop: true,
   playlist
});
loadPlayer({
   target: ".alpha",
   start: 0,
   end: 280,
   loop: true
});
loadPlayer({
   target: ".beta",
   start: 0,
   end: 240,
   loop: true
});
loadPlayer({
   target: ".gamma",
   start: 0,
   end: 265,
   loop: true
});
loadPlayer({
   target: ".delta",
   start: 4,
   end: 254,
   loop: true
});
loadPlayer({
   target: ".epsilon",
   start: 0,
   end: 242,
   loop: true
});
loadPlayer({
   target: ".zeta",
   start: 0,
   end: 285,
   loop: true
});
loadPlayer({
   target: ".eta",
   start: 23,
   end: 312,
   loop: true
});
loadPlayer({
   target: ".theta",
   start: 2
});
loadPlayer({
   target: ".iota"
});
(function iife() {
   "use strict";

   function show(el) {
      el.classList.remove("hide");
   }

   function hide(el) {
      el.classList.add("hide");
   }

   function getButtonContainer(el) {
      while (el.classList.contains("playButton") === false) {
         el = el.parentNode;
      }
      return el;
   }

   function hideAllButtons(button) {
      const buttons = button.querySelectorAll(".play, .pause, .speaker");
      for (let i = 0; i < buttons.length; i++) {
         hide(buttons[i]);
      }
   }

   function getPlay(button) {
      return button.querySelector(".play");
   }

   function getPause(button) {
      return button.querySelector(".pause");
   }

   function getSpeaker(button) {
      return button.querySelector(".speaker");
   }

   function showPlayButton(button) {
      const play = getPlay(button);
      hideAllButtons(button);
      show(play);
      button.classList.remove("active");
   }

   function isPlaying(button) {
      const play = getPlay(button);
      return play.classList.contains("hide");
   }

   function pauseAllButtons() {
      const buttons = document.querySelectorAll(".playButton");
      for (let i = 0; i < buttons.length; i++) {
         if (isPlaying(buttons[i])) {
            showPlayButton(buttons[i]);
         }
      }
   }

   function showPauseButton(button) {
      const pause = getPause(button);
      pauseAllButtons();
      hideAllButtons(button);
      show(pause);
      button.classList.add("activated");
   }

   function showSpeakerButton(button) {
      const speaker = getSpeaker(button);
      hideAllButtons(button);
      show(speaker);
   }

   function getAudio() {
      return document.querySelector("audio");
   }

   function playAudio(player, src) {
      player.volume = 1.0;
      if (player.getAttribute("src") !== src) {
         player.setAttribute("src", src);
      }
      player.play();
   }

   function showButton(button, opts) {
      if (opts.playing) {
         showPlayButton(button);
      } else {
         showPauseButton(button);
      }
   }

   function pauseAudio(player) {
      player.pause();
   }

   function manageAudio(player, opts) {
      if (opts.playing) {
         pauseAudio(player);
      } else {
         playAudio(player, opts.src);
      }
   }

   function playButton(button) {
      const player = getAudio();
      const playing = isPlaying(button);
      showButton(button, {
         playing
      });
      manageAudio(player, {
         src: button.getAttribute("data-audio"),
         playing
      });
   }

   function showPause(button) {
      if (isPlaying(button)) {
         showPauseButton(button);
      }
   }

   function showSpeaker(button) {
      if (isPlaying(button)) {
         showSpeakerButton(button);
      }
   }

   function playButtonClickHandler(evt) {
      const button = getButtonContainer(evt.target);
      playButton(button);
   }

   function playButtonMouseoverHandler(evt) {
      const button = getButtonContainer(evt.target);
      showPause(button);
   }

   function playButtonMouseoutHandler(evt) {
      const button = getButtonContainer(evt.target);
      showSpeaker(button);
   }

   function initButton(selector) {
      const wrapper = document.querySelector(selector);
      wrapper.addEventListener("click", playButtonClickHandler);
      wrapper.addEventListener("mouseover", playButtonMouseoverHandler);
      wrapper.addEventListener("mouseout", playButtonMouseoutHandler);
   }
   initButton(".wrapb");
}());
(function iife() {
   "use strict";

   function show(el) {
      el.classList.remove("hide");
   }

   function hide(el) {
      el.classList.add("hide");
   }

   function getButtonContainer(el) {
      while (el.classList.contains("playButton") === false) {
         el = el.parentNode;
      }
      return el;
   }

   function hideAllButtons(button) {
      const buttons = button.querySelectorAll(".play, .pause, .speaker");
      for (let i = 0; i < buttons.length; i++) {
         hide(buttons[i]);
      }
   }

   function getPlay(button) {
      return button.querySelector(".play");
   }

   function getPause(button) {
      return button.querySelector(".pause");
   }

   function showPlayButton(button) {
      const play = getPlay(button);
      hideAllButtons(button);
      show(play);
      button.classList.remove("active");
   }

   function isPlaying(button) {
      const play = getPlay(button);
      return play.classList.contains("hide");
   }

   function pauseAllButtons() {
      let buttons = document.querySelectorAll(".playButton");
      for (let i = 0; i < buttons.length; i++) {
         if (isPlaying(buttons[i])) {
            showPlayButton(buttons[i]);
         }
      }
   }

   function showPauseButton(button) {
      const pause = getPause(button);
      pauseAllButtons();
      hideAllButtons(button);
      show(pause);
   }

   function getAudio() {
      return document.querySelector("audio");
   }

   function playAudio(player, src) {
      player.volume = 1.0;
      if (player.getAttribute("src") !== src) {
         player.setAttribute("src", src);
      }
      player.play();
   }

   function showButton(button, opts) {
      if (opts.playing) {
         showPlayButton(button);
      } else {
         showPauseButton(button);
      }
   }

   function pauseAudio(player) {
      player.pause();
   }

   function manageAudio(player, opts) {
      if (opts.playing) {
         pauseAudio(player);
      } else {
         playAudio(player, opts.src);
      }
   }

   function playButton(button) {
      const player = getAudio();
      const playing = isPlaying(button);
      showButton(button, {
         playing
      });
      manageAudio(player, {
         src: button.getAttribute("data-audio"),
         playing
      });
   }

   function playButtonClickHandler(evt) {
      const button = getButtonContainer(evt.target);
      playButton(button);
   }

   function initButton(selector) {
      const wrapper = document.querySelector(selector);
      wrapper.addEventListener("click", playButtonClickHandler);
   }
   initButton(".wrapc");
}());
(function iife() {
   "use strict";

   function show(el) {
      el.classList.remove("hide");
   }

   function hide(el) {
      el.classList.add("hide");
   }

   function getButtonContainer(el) {
      while (el.classList.contains("playButton") === false) {
         el = el.parentNode;
      }
      return el;
   }

   function hideAllButtons(button) {
      const buttons = button.querySelectorAll(".play, .pause, .speaker");
      for (let i = 0; i < buttons.length; i += 1) {
         hide(buttons[i]);
      }
   }

   function getPlay(button) {
      return button.querySelector(".play");
   }

   function getPause(button) {
      return button.querySelector(".pause");
   }

   function showPlayButton(button) {
      const play = getPlay(button);
      hideAllButtons(button);
      show(play);
      button.classList.remove("active");
   }

   function isPlaying(button) {
      const play = getPlay(button);
      return play.classList.contains("hide");
   }

   function pauseAllButtons() {
      let buttons = document.querySelectorAll(".playButton");
      for (let i = 0; i < buttons.length; i++) {
         if (isPlaying(buttons[i])) {
            showPlayButton(buttons[i]);
         }
      }
   }

   function showPauseButton(button) {
      const pause = getPause(button);
      pauseAllButtons();
      hideAllButtons(button);
      show(pause);
   }

   function getAudio() {
      return document.querySelector("audio");
   }

   function playAudio(player, src) {
      player.volume = 1.0;
      if (player.getAttribute("src") !== src) {
         player.setAttribute("src", src);
      }
      player.play();
   }

   function showButton(button, opts) {
      if (opts.playing) {
         showPlayButton(button);
      } else {
         showPauseButton(button);
      }
   }

   function pauseAudio(player) {
      player.pause();
   }

   function manageAudio(player, opts) {
      if (opts.playing) {
         pauseAudio(player);
      } else {
         playAudio(player, opts.src);
      }
   }

   function togglePlayButton(button) {
      const player = getAudio();
      const playing = isPlaying(button);
      showButton(button, {
         playing
      });
      manageAudio(player, {
         src: button.getAttribute("data-audio"),
         playing
      });
   }

   function playButtonClickHandler(evt) {
      const button = getButtonContainer(evt.target);
      togglePlayButton(button);
   }

   function initButton(selector) {
      const wrapper = document.querySelector(selector);
      wrapper.addEventListener("click", playButtonClickHandler);
   }
   initButton(".wrapd");
}());
(function iife() {
   "use strict";

   function show(el) {
      el.classList.remove("hide");
   }

   function hide(el) {
      el.classList.add("hide");
   }

   function coverClickHandler(evt) {
      const cover = evt.currentTarget;
      const thewrap = cover.parentNode.querySelector(".wrape");
      hide(cover);
      show(thewrap);
   }
   const cover = document.querySelector(".jacketb ");
   cover.addEventListener("click", coverClickHandler);
}());
(function iife() {
   "use strict";

   function show(el) {
      el.classList.remove("hide");
   }

   function hide(el) {
      el.classList.add("hide");
   }

   function getButtonContainer(el) {
      while (el.classList.contains("playButton") === false) {
         el = el.parentNode;
      }
      return el;
   }

   function hideAllButtons(button) {
      const buttons = button.querySelectorAll(".play, .pause, .speaker");
      for (let i = 0; i < buttons.length; i++) {
         hide(buttons[i]);
      }
   }

   function getPlay(button) {
      return button.querySelector(".play");
   }

   function getPause(button) {
      return button.querySelector(".pause");
   }

   function showPlayButton(button) {
      const play = getPlay(button);
      hideAllButtons(button);
      show(play);
      button.classList.remove("active");
   }

   function isPlaying(button) {
      const play = getPlay(button);
      return play.classList.contains("hide");
   }

   function pauseAllButtons() {
      let buttons = document.querySelectorAll(".playButton");
      for (let i = 0; i < buttons.length; i++) {
         if (isPlaying(buttons[i])) {
            showPlayButton(buttons[i]);
         }
      }
   }

   function showPauseButton(button) {
      const pause = getPause(button);
      pauseAllButtons();
      hideAllButtons(button);
      show(pause);
   }

   function getAudio() {
      return document.querySelector("audio");
   }

   function playAudio(player, src) {
      player.volume = 1.0;
      if (player.getAttribute("src") !== src) {
         player.setAttribute("src", src);
      }
      player.play();
   }

   function showButton(button, opts) {
      if (opts.playing) {
         showPlayButton(button);
      } else {
         showPauseButton(button);
      }
   }

   function pauseAudio(player) {
      player.pause();
   }

   function manageAudio(player, opts) {
      if (opts.playing) {
         pauseAudio(player);
      } else {
         playAudio(player, opts.src);
      }
   }

   function togglePlayButton(button) {
      const player = getAudio();
      const playing = isPlaying(button);
      showButton(button, {
         playing
      });
      manageAudio(player, {
         src: button.getAttribute("data-audio"),
         playing
      });
   }

   function playButtonClickHandler(evt) {
      const button = getButtonContainer(evt.target);
      togglePlayButton(button);
   }

   function initButton(selector) {
      const wrapper = document.querySelector(selector);
      wrapper.addEventListener("click", playButtonClickHandler);
   }
   initButton(".wrape");
}());
(function iife() {
   "use strict";

   function show(el) {
      el.classList.remove("hide");
   }

   function hide(el) {
      el.classList.add("hide");
   }

   function getButtonContainer(el) {
      while (el.classList.contains("playButton") === false) {
         el = el.parentNode;
      }
      return el;
   }

   function hideAllButtons(button) {
      const buttons = button.querySelectorAll(".play, .pause, .speaker");
      for (let i = 0; i < buttons.length; i++) {
         hide(buttons[i]);
      }
   }

   function getPlay(button) {
      return button.querySelector(".play");
   }

   function getPause(button) {
      return button.querySelector(".pause");
   }

   function showPlayButton(button) {
      const play = getPlay(button);
      hideAllButtons(button);
      show(play);
      button.classList.remove("active");
   }

   function isPlaying(button) {
      const play = getPlay(button);
      return play.classList.contains("hide");
   }

   function pauseAllButtons() {
      let buttons = document.querySelectorAll(".playButton");
      for (let i = 0; i < buttons.length; i++) {
         if (isPlaying(buttons[i])) {
            showPlayButton(buttons[i]);
         }
      }
   }

   function showPauseButton(button) {
      const pause = getPause(button);
      pauseAllButtons();
      hideAllButtons(button);
      show(pause);
   }

   function getAudio() {
      return document.querySelector("audio");
   }

   function playAudio(player, src) {
      player.volume = 1.0;
      if (player.getAttribute("src") !== src) {
         player.setAttribute("src", src);
      }
      player.play();
   }

   function showButton(button, opts) {
      if (opts.playing) {
         showPlayButton(button);
      } else {
         showPauseButton(button);
      }
   }

   function pauseAudio(player) {
      player.pause();
   }

   function manageAudio(player, opts) {
      if (opts.playing) {
         pauseAudio(player);
      } else {
         playAudio(player, opts.src);
      }
   }

   function togglePlayButton(button) {
      const player = getAudio();
      const playing = isPlaying(button);
      showButton(button, {
         playing
      });
      manageAudio(player, {
         src: button.getAttribute("data-audio"),
         playing
      });
   }

   function playButtonClickHandler(evt) {
      const button = getButtonContainer(evt.target);
      togglePlayButton(button);
   }

   function initButton(selector) {
      const wrapper = document.querySelector(selector);
      wrapper.addEventListener("click", playButtonClickHandler);
   }
   initButton(".wrapf");
}());
