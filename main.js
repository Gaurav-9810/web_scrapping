let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const fs=require("fs");
const path=require("path");
const xlsx=require("xlsx");

const request=require("request");
const cheerio=require("cheerio");
const allMatchobj=require("./allmatch");
const iplPath=path.join(__dirname,"ipl");

dirCreator(iplPath);
request(url,cb);

function cb(err, res, html)
{
    if(err)
    {
        console.log("error",err);
    }
    else{
        extract(html);

    }
}

function extract(html){
    let $=cheerio.load(html);
    let anchorElem=$("a[data-hover = 'View All Results' ]");
    let link=anchorElem.attr("href");
    link="https://www.espncricinfo.com/"+link;
    //console.log(link);
    allMatchobj.gAllMatchLink(link);
}

function dirCreator(filePath)
{
    if(fs.existsSync(filePath)==false)
    {
        fs.mkdirSync(filePath);
    }
}