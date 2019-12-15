const puppeteer = require('puppeteer');
const url = require('url');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,// true为无头模式
        // devtools: true,
        ignoreHTTPSErrors: true,
        // 我本地环境需要挂代理才能上网，本地没有代理的情况可以注释掉
        args: ['--proxy-server=http://10.147.14.167:8080']
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 640,
        height: 480,
        isMobile: true,
    })

    // 定义核查链接
    const pipixia = 'https://h5.pipix.com/s/CJ85dj/';

    // 监听浏览器响应 
    page.on('response', async response => {
        if (response.url().match(/item\/detail/)) {
            // 获取响应
            const res = await response.json();
            // 获取无水印视频
            const video = res.data.item.origin_video_download
            console.log(video.url_list)
        }
    })

    // networkidle0 为页面没有网络请求认为加载完毕
    await page.goto(pipixia, { waitUntil: 'networkidle0' })

    // await page.waitFor(2000)
    await browser.close()
})();
