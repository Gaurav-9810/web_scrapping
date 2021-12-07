const request=require("request");
const cheerio=require("cheerio");
const scorecardObj=require("./scorcard");

function getAllMatchesLinks(url)
{
    request(url,function(err,res,html){
        if(err)
        {
            console.log("error",err);
        }
        else{
            extractAllLinks(html);
        }
    })
}

function extractAllLinks(html)
{
    let $=cheerio.load(html);
    let alllinks=$("a[data-hover='Scorecard']");
    for(let i=0;i<alllinks.length;i++)
    {
        let link=$(alllinks[i]).attr("href");
        let fulllink="https://www.espncricinfo.com"+link;
        console.log(fulllink);
        scorecardObj.ps(fulllink);
    }
}

module.exports={
    gAllMatchLink:getAllMatchesLinks
}