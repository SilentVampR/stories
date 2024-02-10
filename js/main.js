const allStories = [
  {
    id: 0,
    caption: "Luna Belle",
    imageUrl: "videos/thumbnails/thumb-1.png",
    videoUrl: "videos/video-1.mp4",
  },

  {
    id: 1,
    caption: "Willow Grace",
    imageUrl: "videos/thumbnails/thumb-2.png",
    videoUrl: "videos/video-2.mp4",
  },

  {
    id: 2,
    caption: "Emma Smith",
    imageUrl: "videos/thumbnails/thumb-3.png",
    videoUrl: "videos/video-3.mp4",
  },

  {
    id: 3,
    caption: "Ruby Skye",
    imageUrl: "videos/thumbnails/thumb-4.png",
    videoUrl: "videos/video-4.mp4",
  },

  {
    id: 4,
    caption: "Live Blogger",
    imageUrl: "videos/thumbnails/thumb-5.png",
    videoUrl: "videos/video-5.mp4",
  },

  {
    id: 5,
    caption: "Hazel Jade",
    imageUrl: "videos/thumbnails/thumb-6.png",
    videoUrl: "videos/video-6.mp4",
  },

  {
    id: 6,
    caption: "Eden Faith",
    imageUrl: "videos/thumbnails/thumb-7.png",
    videoUrl: "videos/video-7.mp4",
  },
];

const storiesModalView = document.querySelector(".stories-modal");
const progBar = storiesModalView.querySelector(".stories-modal__progress-bar");
const closeBtn = storiesModalView.querySelector(".stories-modal__close-btn");
const playBtn = storiesModalView.querySelector(".stories-modal__play-btn");
const storyVideoModal = document.querySelector(
  ".stories-modal__story video"
);
const storyThumbModal = document.querySelector(".stories-modal__story img");
const storyCaptionModal = storiesModalView.querySelector(
  ".stories-modal__caption"
);
const nextBtnModal = storiesModalView.querySelector(
  ".stories-modal__button_next"
);
const previousBtnModal = storiesModalView.querySelector(
  ".stories-modal__button_prev"
);

let isMuted = true;
const caption = false;
let currentActive = 0;

const createStoriesBar = () => {
  allStories.forEach((s, i) => {
    const bar = document.createElement("span");
    bar.classList.add("stories-modal__bar");
    barInner = document.createElement("span");
    barInner.classList.add("stories-modal__bar-inner");
    barInner.id = "bar-" + i;
    bar.appendChild(barInner);
    progBar.appendChild(bar);
  });
};

const showModalView = (e) => {
  if (e.target.classList.contains("my-stories__story")) {
    currentActive = e.target.dataset.id;
    updateModalView();
    storiesModalView.classList.add("active");
  }
};

const closeStory = (e) => {
  if (
    e == "close" ||
    e.target.classList.contains("stories-modal__close-btn") ||
    e.target.classList.contains("stories-modal")
  ) {
    storiesModalView.classList.remove("active");
    storyVideoModal.pause();
  }
};

closeBtn.addEventListener("click", closeStory);
storiesModalView.addEventListener("click", closeStory);

const updateBar = (e) => {
  if (!isNaN(e.target.duration)) {
    var percent_complete = Math.round(
      (e.target.currentTime / e.target.duration) * 100
    );
    const currentBar = storiesModalView.querySelector(`#bar-${currentActive}`);
    currentBar.setAttribute("style", "width: " + percent_complete + "%");
  }
};

const updateModalView = () => {
  isMuted ? (storyVideoModal.volume = 0) : (storyVideoModal.volume = 0.7);
  if (currentActive == 0) {
    previousBtnModal.classList.remove("active");
  } else {
    previousBtnModal.classList.add("active");
  }
  if (currentActive == allStories.length - 1) {
    nextBtnModal.classList.remove("active");
  } else {
    nextBtnModal.classList.add("active");
  }
  storyThumbModal.src = allStories[currentActive].imageUrl;
  storyVideoModal.src = allStories[currentActive].videoUrl;
  storyVideoModal.addEventListener("timeupdate", updateBar);
  if (caption) {
    storyCaptionModal.classList.add('active');
    storyCaptionModal.innerHTML = allStories[currentActive].caption;
  }
};

nextBtnModal.addEventListener("click", () => {
  if (currentActive >= allStories.length - 1) {
    return;
  }
  currentActive++;
  updateModalView();
});

previousBtnModal.addEventListener("click", () => {
  if (currentActive <= 0) {
    return;
  }
  currentActive--;
  updateModalView();
});

storyVideoModal.addEventListener("ended", () => {
  if (currentActive >= allStories.length - 1) {
    setTimeout(function() {
      closeStory('close')
    }, 150);
    return;
  }
  currentActive++;
  updateModalView();
});

const videoMute = (e) => {
  if (e.target.classList.contains("stories-modal__sound-btn")) {
    if (storyVideoModal.muted) {
      storyVideoModal.muted = !storyVideoModal.muted; //For iPhone
      storyVideoModal.volume = 0.7;
      e.target.classList.remove("stories-modal__sound-btn_muted");
      isMuted = false;
    } else {
      storyVideoModal.muted = !storyVideoModal.muted; //For iPhone
      storyVideoModal.volume = 0;
      e.target.classList.add("stories-modal__sound-btn_muted");
      isMuted = true;
    }
  }
};

const videoPlayPause = (e) => {
  if (e.target.classList.contains("stories-modal__video")) {
    if (e.target.paused) {
      e.target.play();
      playBtn.classList.remove("stories-modal__play-btn_paused");
    } else {
      e.target.pause();
      playBtn.classList.add("stories-modal__play-btn_paused");
    }
  }
  if (e.target.classList.contains("stories-modal__play-btn")) {
    if (storyVideoModal.paused) {
      storyVideoModal.play();
      e.target.classList.remove("stories-modal__play-btn_paused");
    } else {
      storyVideoModal.pause();
      e.target.classList.add("stories-modal__play-btn_paused");
    }
  }
};

createStoriesBar();

document.addEventListener("click", showModalView);
document.addEventListener("click", videoPlayPause);
document.addEventListener("click", videoMute);
