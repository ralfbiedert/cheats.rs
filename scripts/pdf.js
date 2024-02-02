const { chromium } = require('playwright');
const path = require('path');

function opts(pdf, format) {
    return {
        path: pdf,
        margin: {
            top: '0.5cm',
            bottom: '1cm',
            left: '0.5cm',
            right: '0.5cm'
        },
        format: format,
        displayHeaderFooter: true,
        headerTemplate: "&nbsp;",
        footerTemplate: "<div class='pageNumber' style='font-size: 8pt; text-align: center; width: 100%; opacity: 0.5;'></div>",
        printBackground: true
    };
}


(async () => {
    const browser = await chromium.launch()
    const page = await browser.newPage()

    await page.goto(`file:${path.join(__dirname, '../public.clean/index.html#_print')}`)
    await page.pdf(opts('public.clean/dl/rust_cheat_sheet_a4.pdf', "A4"))
    await page.pdf(opts('public.clean/dl/rust_cheat_sheet_letter.pdf', "Letter"))

    // await page.goto(`file:${path.join(__dirname, '../public.clean/index.html')}`)
    // await page.pdf(opts('rust_cheat_sheet_compact_a4.pdf', "A4"))
    // await page.pdf(opts('rust_cheat_sheet_compact_letter.pdf', "Letter"))

    await browser.close()
})()
