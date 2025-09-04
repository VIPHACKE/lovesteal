// responsive.js

(function() {
    const width = window.innerWidth;
  
    if (width <= 600) {
      console.log("📱 Mobile view");
    } else if (width <= 900) {
      console.log("📲 Tablet view");
    } else {
      console.log("💻 Desktop view");
    }
  
    // Optional: tu yaha UI change bhi kar sakta hai based on screen size
  })();
  

  window.addEventListener('resize', () => {
    document.body.style.zoom = '1'; // Force refresh layout
  });