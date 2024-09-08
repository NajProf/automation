const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.goto('https://twitter.com/login');

    // Replace with your Twitter login credentials
    await page.type('input[name="session[username_or_email]"]', 'your-username');
    await page.type('input[name="session[password]"]', 'your-password');
    
    await page.click('div[role="button"][data-testid="LoginForm_Login_Button"]');
    await page.waitForNavigation();

    // Replace with the target user's handle (without the @ symbol)
    const targetUser = 'target-user-handle';

    // Go to the user's following list
    await page.goto(`https://twitter.com/${targetUser}/following`);
    await page.waitForSelector('div[data-testid="UserCell"]'); // Wait for the following list to load

    let accountsFollowed = 0;

    while (true) {
        // Select all follow buttons visible on the page
        const followButtons = await page.$$(
            'div[data-testid="UserCell"] div[data-testid="placementTracking"]'
        );

        // Iterate over each follow button and click it
        for (const followButton of followButtons) {
            const buttonText = await page.evaluate(button => button.innerText, followButton);
            
            // Click the button only if it says 'Follow'
            if (buttonText.includes('Follow')) {
                await followButton.click();
                console.log(`Followed account: ${accountsFollowed + 1}`);
                accountsFollowed++;
                await page.waitForTimeout(2000); // Wait for 2 seconds after each follow
            }
        }

        // Scroll down to load more accounts
        await page.evaluate(() => window.scrollBy(0, window.innerHeight));
        await page.waitForTimeout(3000); // Wait for 3 seconds to load more content

        // Check if there are any more follow buttons or if the end of the list is reached
        const moreAccounts = await page.$('div[data-testid="UserCell"]');
        if (!moreAccounts) break; // Break the loop if no more accounts are found
    }

    console.log(`Total accounts followed: ${accountsFollowed}`);
    await browser.close();
})();
