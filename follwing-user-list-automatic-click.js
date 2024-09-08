const followEveryone = (async () => {
    // Modify these variables to your liking
    const FOLLOW_LIMIT = 800;
    const BREAK_DURATION = 5 * 60 * 1000; // 5 minutes break
  
    const TOTAL_DURATION = 10 * 60 * 1000; // 10 minutes duration - Timeout after 10 minutes
  
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // Find target button
    const findButton = (txt) =>
      [...document.querySelectorAll("button").entries()]
        .map(([pos, btn]) => btn)
        .filter((btn) => btn.innerText === txt)[0];
  
    console.log("Start following script...");
  
    let startTime = new Date().getTime();
  
    while (new Date().getTime() - startTime < TOTAL_DURATION) {
      for (let i = 0; i < FOLLOW_LIMIT; i++) {
        const followButton = findButton("Follow");
        if (!followButton) {
          continue;
        }
        followButton.scrollIntoViewIfNeeded();
        followButton.click();
        await delay(100);
        const confirmFollowButton = findButton("follow");
        if (confirmFollowButton) {
          await confirmFollowButton.click(); // Wait for the follow to complete
        }
  
        // Increase FOLLOW_INTERVAL if you are getting rate limited
        // Set this to 0 follow as quickly as possible - not recommended
        // Random follow interval for each follow to avoid rate limiting
        const FOLLOW_INTERVAL = Math.floor(Math.random() * 10 + 1) * 1000; 
  
        console.log(`Wait ${FOLLOW_INTERVAL} milliseconds`);
        await delay(FOLLOW_INTERVAL);
        console.log(`Followed #${i + 1}`);
      }
  
      console.log(`Taking a break for ${BREAK_DURATION / 1000} seconds...`);
      await delay(BREAK_DURATION); // Take a break to avoid rate limiting
      startTime = new Date().getTime(); // Reset start time for the next cycle
    }
  
    console.log("Follow script complete!");
  })();
  