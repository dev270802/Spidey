const {normalizeUrl,getUrlFromHtml}=require('./crawl')
const {test,expect}=require('@jest/globals')

test('normalizeUrl strip protocol',()=>{
    const input='https://blog.boot.dev/path'
    const actual=normalizeUrl(input)
    const excepted='blog.boot.dev/path'

    expect(actual).toEqual(excepted)
})
test('normalizeUrl strip trailing /',()=>{
    const input='https://blog.boot.dev/path/'
    const actual=normalizeUrl(input)
    const excepted='blog.boot.dev/path'

    expect(actual).toEqual(excepted)
})

test('getUrlFromHtml relative',()=>{
    const inputHTMLBody=`
    <html>
        <body>
            <a href="https://blog.boot.dev/">
                Boot.dev.Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL='https://blog.boot.dev'
    const actual=getUrlFromHtml(inputHTMLBody,inputBaseURL)
    const excepted=['https://blog.boot.dev/']

    expect(actual).toEqual(excepted)
})

test('getUrlFromHtml both',()=>{
    const inputHTMLBody=`
    <html>
        <body>
            <a href="https://blog.boot.dev/">
                Boot.dev.Blog
            </a>
            <a href="/path1">
            Boot.dev.Blog Path One
        </a>
        </body>
    </html>
    `
    const inputBaseURL='https://blog.boot.dev'
    const actual=getUrlFromHtml(inputHTMLBody,inputBaseURL)
    const excepted=['https://blog.boot.dev/','https://blog.boot.dev/path1']
    console.log(actual)

    expect(actual).toEqual(excepted)
})

test('getUrlFromHtml invalid',()=>{
    const inputHTMLBody=`
    <html>
        <body>
            <a href="invalid">
                Invalid Url
            </a>
        </body>
    </html>
    `
    const inputBaseURL='https://blog.boot.dev'
    const actual=getUrlFromHtml(inputHTMLBody,inputBaseURL)
    const excepted=[]

    expect(actual).toEqual(excepted)
})



