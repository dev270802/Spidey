process.argv
const {crawler} =require( './crawl.js')
const {report}=require('./report.js')

async function main(){
    if(process.argv.length<3){
        console.log('Provide website name')
        process.exit(1);
    }
    else if(process.argv.length>3){
        console.log('Provide only one website name')
        process.exit(1);
    }
    const url=process.argv[2]
    console.log("starting crawling : "+url)
    const pages=await crawler(url,url,{})

    report(pages)
    
}

main()