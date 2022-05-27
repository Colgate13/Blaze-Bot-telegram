import puppeteer, { Page } from 'puppeteer';
import * as cheerio from 'cheerio';

export class Scraping {
    static async scraping(url: string = 'https://blaze.com/pt/games/double'): Promise<any[]> {

        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        await browser.newPage();
        const page = await browser.newPage();
        await page.goto(url);

        const html = await page.content();
        const $ = cheerio.load(html);

        const games = $('#roulette-recent > div > div.entries.main');

        let list = $(games).find('div.entry > div.roulette-tile').map((i, el) => $(el).text()).get();

        await browser.close();

        return list;
    }

    static async scrapingSocket(): Promise<Page> {

        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        await browser.newPage();
        const page = await browser.newPage();
        await page.goto('https://blaze.com/pt/games/double');

        const html = await page.content();
        const $ = cheerio.load(html);

        return page;
    }

    static async getTilesSocket(Page: Page): Promise<any[]> {

        const html = await Page.content();
        const $ = cheerio.load(html);

        const games = $('#roulette-recent > div > div.entries.main');

        let BlazeTiles = $(games).find('div.entry > div.roulette-tile').map((i, el) => $(el).text()).get();

        return BlazeTiles;
    }
}