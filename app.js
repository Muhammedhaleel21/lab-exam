document.addEventListener('DOMContentLoaded', () => {
  let currentIndex = 1;

  // DOM Elements
  const iframe = document.getElementById('content-frame');
  const buttons = document.querySelectorAll('.nav-button');

  // Dynamically resize the iframe height or fall back gracefully if blocked by local file:// security rules
  function resizeIframe() {
    try {
      if (iframe && iframe.contentWindow && iframe.contentWindow.document.body) {
        // Set temporarily to small height so scrollHeight can shrink if new content is shorter
        iframe.style.height = '10px';
        
        const docBody = iframe.contentWindow.document.body;
        const docEl = iframe.contentWindow.document.documentElement;
        
        const scrollHeight = Math.max(
          docBody.scrollHeight,
          docBody.offsetHeight,
          docEl.clientHeight,
          docEl.scrollHeight,
          docEl.offsetHeight
        );
        
        iframe.style.height = scrollHeight + 'px';
      }
    } catch (error) {
      // Fallback to safe viewport height in case of browser local file origin policies
      iframe.style.height = '80vh';
    }
  }

  // Load selected topic file inside the iframe
  function loadTopic(index) {
    currentIndex = index;
    iframe.src = `topics/topic${currentIndex}.html`;
    updateActiveButtonState();
  }

  // Update active state class on buttons
  function updateActiveButtonState() {
    buttons.forEach(btn => {
      const btnIndex = parseInt(btn.dataset.index, 10);
      if (btnIndex === currentIndex) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Add click events to the 15 buttons
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetIndex = parseInt(btn.dataset.index, 10);
      loadTopic(targetIndex);
    });
  });

  // Adjust iframe height when loaded
  iframe.addEventListener('load', resizeIframe);
  
  // Adjust iframe height when browser window resizes
  window.addEventListener('resize', resizeIframe);

  // Trigger initial visual states and measurements
  updateActiveButtonState();
  
  // Set a tiny timeout to ensure rendering is complete before initial sizing
  setTimeout(resizeIframe, 100);
});
