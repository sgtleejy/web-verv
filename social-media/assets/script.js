// FAQ Toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const toggle = item.querySelector('.faq-toggle');
    
    toggle.addEventListener('click', () => {
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('faq-item-open');
          otherItem.querySelector('.faq-toggle').classList.remove('faq-toggle-open');
        }
      });
      
      // Toggle current item
      item.classList.toggle('faq-item-open');
      toggle.classList.toggle('faq-toggle-open');
    });
  });
});

// Audio Toggle functionality for video cards
function toggleAudio(button) {
  // Get the video card container
  const videoCard = button.closest('.video-card');
  const video = videoCard.querySelector('video');
  
  // Get the icon elements
  const iconMuted = button.querySelector('.icon-muted');
  const iconUnmuted = button.querySelector('.icon-unmuted');
  
  // Mute all other videos first
  document.querySelectorAll('.video-card video').forEach(v => {
    if (v !== video) {
      v.muted = true;
      const otherCard = v.closest('.video-card');
      const otherBtn = otherCard.querySelector('.audio-btn');
      if (otherBtn) {
        const otherIconMuted = otherBtn.querySelector('.icon-muted');
        const otherIconUnmuted = otherBtn.querySelector('.icon-unmuted');
        if (otherIconMuted) otherIconMuted.style.display = 'block';
        if (otherIconUnmuted) otherIconUnmuted.style.display = 'none';
      }
    }
  });
  
  // Toggle mute state for clicked video
  if (video.muted) {
    video.muted = false;
    iconMuted.style.display = 'none';
    iconUnmuted.style.display = 'block';
  } else {
    video.muted = true;
    iconMuted.style.display = 'block';
    iconUnmuted.style.display = 'none';
  }
}
