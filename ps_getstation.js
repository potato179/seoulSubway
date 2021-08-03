const stationlist = require("./public/js/stations.json")
const seoulmetro_endtrain = require("./public/js/seoulmetro_endtrain.json")
const seoulmetro_exit = require("./public/js/seoulmetro_exit.json")

function station_html(req, res, next){
    res.sendFile('station.html', {root: __dirname});
}

function getstationinfo(req, res, next){
    var stationcd = req.query.searchtext;
    //var stationcd = 240;
    for(var i = 0; i < stationlist.length; i++){
        if(stationlist[i].station_cd === stationcd){
            var line_num = stationlist[i].line_num;
            var station_nm = stationlist[i].station_nm;
            var fr_code = stationlist[i].fr_code;
            var prev_code = stationlist[i].prev_code;
            var next_code = stationlist[i].next_code;
            var transfer = stationlist[i].transfer;
            var doors = stationlist[i].doors;
            var restroom = stationlist[i].restroom;
            var crossable = stationlist[i].crossable;
            var address = stationlist[i].address;
            var cx = stationlist[i].cx;
            var cy = stationlist[i].cy;
            var telno = stationlist[i].telno;
            var origin = stationlist[i].origin;
        }
    }
    console.log(line_num, station_nm, fr_code, prev_code, next_code, transfer, doors, restroom, crossable, address, cx, cy, telno, origin);

    var exitinfo = "";
    for(var i = 0; i < seoulmetro_exit.length; i++){
        if(seoulmetro_exit[i].station_cd === stationcd){
            exitinfo += `${seoulmetro_exit[i].exit_no}번 출구: ${seoulmetro_exit[i].area_name}\n`;
        }
    }
    console.log(exitinfo);
}

exports.station_html = station_html;
exports.getstationinfo = getstationinfo;