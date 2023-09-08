const {JSDOM}=require('jsdom')

async function crawler(baseURL,currentURL,pages){
    

    const baseURLObj=new URL(baseURL)
    const currentURLObj=new URL(currentURL)

    if(baseURLObj.hostname!=currentURLObj.hostname){
        return pages
    }
    const normalizeCurrentURL=normalizeUrl(currentURL)

    if(pages[normalizeCurrentURL]>0){
        pages[normalizeCurrentURL]++
        return pages
    }

    pages[normalizeCurrentURL]=1

    try{
        const resp=await fetch(currentURL);
        if(resp.status>399){
            console.log("error in fetch with status code :"+resp.status+" on page "+currentURL)
            return pages
        }

        const contentType=resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log("non html response ,content type: "+contentType+" on page "+currentURL)
            return pages
        }
        console.log("actively crawling: "+currentURL)
        const htmlBody=await resp.text()
        const nextURLs=getUrlFromHtml(htmlBody,baseURL)

        for (const nextURL of nextURLs){
            pages=await crawler(baseURL,nextURL,pages)
        }
    }catch(err){
        console.log(("Error in fetching pag: "+err.message+" on page "+currentURL))
    }

    return pages

    

    
}

function getUrlFromHtml(htmlBody,baseURL){
    const urls=[]
    const dom=new JSDOM(htmlBody)
    const linkElements=dom.window.document.querySelectorAll('a')
    for(const linkElement of linkElements){
            
            if(linkElement.href.slice(0,1)=='/'){
                try {
                    const urlObj=new URL(baseURL+linkElement.href)
                    urls.push(urlObj.href)
                }catch(err){
                    console.log(err.message);
                }
            }
            else{
                try {
                    const urlObj=new URL(linkElement.href)
                    urls.push(urlObj.href)
                }catch(err){
                    console.log(err.message);
                }
            }
        
    }
    return urls
}

function normalizeUrl(urlString){
    const urlObj=new URL(urlString)
    const hostpath=`${urlObj.hostname}${urlObj.pathname}`
    if(hostpath.length>0&&hostpath.slice(-1)==='/'){
        return hostpath.slice(0,-1);
    }
    else{
        return hostpath
    }
}
module.exports={
    normalizeUrl,
    getUrlFromHtml,
    crawler
}