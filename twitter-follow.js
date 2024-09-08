const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://twitter.com/login');
    
    // Replace with your Twitter login credentials
    await page.type('input[name="session[username_or_email]"]', 'm_najmus84732');
    await page.type('input[name="session[password]"]', 'twitterandtwitter');
    
    await page.click('div[role="button"][data-testid="LoginForm_Login_Button"]');
    await page.waitForNavigation();

    // List of Twitter account handles
    const accounts = [
        '@4evaBehindSOTA', '@cto_junior', '@filterpapi', '@unironictechbro', '@thepushkarp', '@shxf0072', '@vikhyatk', 
        '@akbirthko', '@twofifteenam', '@fuckpoasting', '@shrihacker', '@adarshxs', '@dejavucoder', '@samlakig', 
        '@avaitopiper', '@deedydas', '@growing_daniel', '@AmoghGulati', '@sahir2k', '@nahrzf', '@gragtah', '@_VatsaDev_', 
        '@tzzchelmm', '@shauseth', '@_adi18_', '@reachtarunhere', '@krznun', '@0xkarmatic', '@ctjlewis', '@the_jasonsamuel', 
        '@that_anokha_boy', '@wateriscoding', '@diptanu', '@0interestrates', '@yifever', '@formrpessimist', '@blunderfestlol', 
        '@_Mira___Mira_', '@helscom', '@arpitingle', '@tszzl', '@NirantK', '@btbytes', '@ponnappa', '@vin_acct', '@JustineTunney', 
        '@cneuralnetwork', '@qtnx_', '@yeswondwerr', '@airkatakana', '@kaiokendev1', '@nearcyan', '@EsotericCofe', '@cloud11665', 
        '@Teknium1', '@nisten', '@Cixelyn', '@vcfyami', '@rishimunii', '@levelsio', '@teodor_io', '@mynamebedan', '@0xluffyb', 
        '@lelouchdaily', '@naklecha', '@novasarc01', '@BhavnickMinhas', '@riemannianmani', '@BonesaiDev', '@hitorilabs', '@fofrAI', 
        '@tunahorse21', '@Aizkmusic', '@morew4rd', '@elonmusk', '@sama', '@ClementDelangue'
    ];

    for (let account of accounts) {
        await page.goto(`https://twitter.com/${account}`);
        await page.waitForSelector('div[data-testid="placementTracking"]'); // Wait for the follow button to be available

        // Click the follow button
        const followButton = await page.$('div[data-testid="placementTracking"]');
        if (followButton) {
            await followButton.click();
        } else {
            console.log(`Follow button not found for ${account}`);
        }

        await page.waitForTimeout(2000); // Wait for 2 seconds before navigating back
    }

    await browser.close();
})();

