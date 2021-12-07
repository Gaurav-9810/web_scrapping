let fs=require("fs");
let data=require('./exapmle.json');
let xlsx=require("xlsx");
// console.log(data);

// data.push({
//     "name":"gaurav",
//     "lastname" : "gangola",
//     "college":"adgitm",
//     "friends":[
//         "vinayak",
//         "ankit",
//         "prayas"
//     ],
//     "address":{
//         "city":"delhi",
//         "area":"burari"
//     }
// });
// let Stringdata=JSON.stringify(data);
// fs.writeFileSync("exapmle.json",Stringdata);

//new worksheet
// let newWB =xlsx.utils.book_new();
// //json data-> excel formar convert
// let newWS=xlsx.utils.json_to_sheet(data);
// //->newwb ,ws, sheetname
// xlsx.utils.book_append_sheet(newWB,newWS,"sheet-1");
// //->filepath
// xlsx.writeFile(newWB,"abc.xlsx");

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
    
    return;
}