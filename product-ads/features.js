document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".feature-item");
  const mediaItems = document.querySelectorAll(".stack-media > [data-feature]");

  // Function to switch active media
  function switchMedia(featureKey) {
    mediaItems.forEach(media => {
      if (media.dataset.feature === featureKey) {
        media.classList.add("active");
        // Play video if it's a video element
        if (media.tagName === "VIDEO") {
          media.play();
        }
      } else {
        media.classList.remove("active");
        // Pause video if it's a video element
        if (media.tagName === "VIDEO") {
          media.pause();
        }
      }
    });
  }

  // Set initial active state for media (photography is default)
  switchMedia("photography");

  items.forEach(item => {
    item.addEventListener("mouseenter", () => {
      // Remove active from all items
      items.forEach(i => i.classList.remove("active"));
      // Set active on the hovered one
      item.classList.add("active");
      
      // Switch the media content
      const featureKey = item.dataset.feature;
      switchMedia(featureKey);
    });
  });
});

