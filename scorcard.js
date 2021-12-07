let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";
const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");
const path=require("path");
const xlsx=require("xlsx");

function processScorecard(url)
{
    request(url,cb);
}



function cb(err, res, html)
{
    if(err)
    {
        console.log("error",err);
    }
    else{
        extractMatchDetails(html);

    }
}

function extractMatchDetails(html)
{   //venue date opponent result run balls fours sixs sr
    //team
            // player
                        //runs balls fours sixs sr opponent date venue result 
// same -venue date wins
    let $=cheerio.load(html);
    let descEle=$(".match-header-container .description");
    let resultEle=$(".match-header-container .status-text");
    let StringArr=descEle.text().split(",");
    let venue=StringArr[1].trim();
    let date=StringArr[2].trim();
    let wins=resultEle.text();
    let innings=$(".card.content-block.match-scorecard-table>.Collapsible");
    //let Stringhtml="";
    for(let i=0;i<innings.length;i++)
    {
       // Stringhtml+=$(innings[i]).html();
        let teamName=$(innings[i]).find("h5").text();
        teamName=teamName.split("INNINGS")[0].trim();
        let opponentidx=i==0?1:0;

        let opponentName=$(innings[opponentidx]).find("h5").text();
        opponentName=opponentName.split("INNINGS")[0].trim();
        let cInnings=$(innings[i]);
         console.log(`${venue} |  ${date} | ${teamName} | ${opponentName} | ${wins}`);

        let allRows=cInnings.find(".table.batsman tbody tr");
        for(let j=0;j<allRows.length;j++)
        {
            let allCols=$(allRows[j]).find("td");
            let isWorthy=$(allCols[0]).hasClass("batsman-cell");
            if(isWorthy)
            {
                let playerName=$(allCols[0]).text().trim();
                let runs=$(allCols[2]).text().trim();
                let balls=$(allCols[3]).text().trim();
                let fours=$(allCols[5]).text().trim();
                let sixs=$(allCols[6]).text().trim();
                let sr=$(allCols[7]).text().trim();
                console.log(`${playerName} ${runs} ${balls} ${fours}  ${sixs} ${sr} `);

                processPlayer(teamName,playerName,runs,balls,fours,sixs,sr,opponentName,date,venue,wins);
            }
            
        }
    
    }
    //console.log(Stringhtml);
}
function   processPlayer(teamName,playerName,runs,balls,fours,sixs,sr,opponentName,date,venue,wins){
    let teampath=path.join(__dirname,"ipl",teamName);
    dirCreator(teampath);
    let filePath=path.join(teampath,playerName+".xlsx");
    let content=excelReader(filePath,playerName);
    let playerObj={
        teamName,
        playerName,
        runs,
        balls,
        fours,
        sixs,
        sr,
        opponentName,
        date,
        venue,
        wins
    }
    content.push(playerObj);
    excelWriter(filePath,content,playerName);
}

function dirCreator(filePath)
{
    if(fs.existsSync(filePath)==false)
    {
        fs.mkdirSync(filePath);
    }
}

function excelWriter(filePath,json,sheetname)
{
    let newWB =xlsx.utils.book_new();
//json data-> excel formar convert
let newWS=xlsx.utils.json_to_sheet(json);
//->newwb ,ws, sheetname
xlsx.utils.book_append_sheet(newWB,newWS,sheetname);
//->filepath
xlsx.writeFile(newWB,filePath);
}
// excelReader("abc.xlsx","sheet-1");
function excelReader(filePath,sheetname)
{
    if(fs.existsSync(filePath)==false)
    {
        return [];
    }
    let wb=xlsx.readFile(filePath);
    let exceldata=wb.Sheets[sheetname];
    let ans=xlsx.utils.sheet_to_json(exceldata);
    
    return ans;
}

module.exports={
    ps:processScorecard
}
