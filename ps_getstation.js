const stationlist = require("./public/js/stations.json")
const seoulmetro_exit = require("./public/js/seoulmetro_exit.json")

function station_html(req, res, next){
    res.sendFile('station.html', {root: __dirname});
}

function getstationinfo(req, res, next){
    var stationcd = req.query.searchtext;
    if(stationcd !== "100C" && stationcd !== "101C" && stationcd !== "102C"){
        stationcd *= 1;
    }
    for(var i = 0; i < stationlist.length; i++){
        if(stationlist[i].station_cd === stationcd){
            var line_num = stationlist[i].line_num;
            var station_nm = stationlist[i].station_nm;
            var fr_code = stationlist[i].fr_code;
            var operator = stationlist[i].operator;
            var transfer = stationlist[i].transfer;
            var doors = stationlist[i].doors;
            var restroom = stationlist[i].restroom;
            var crossable = stationlist[i].crossable;
            var address = stationlist[i].address;
            var cx = stationlist[i].cx;
            var cy = stationlist[i].cy;
            var telno = stationlist[i].telno;
            var origin = stationlist[i].origin;

            var prev_code = "";
            var prev_name = "";
            var next_code = "";
            var next_name = "";
            if(stationlist[i-1].line_num === line_num){
                prev_code = stationlist[i-1].station_cd;
                prev_name = stationlist[i-1].station_nm;
            }
            if(stationlist[i+1].line_num === line_num){
                next_code = stationlist[i+1].station_cd;
                next_name = stationlist[i+1].station_nm;
            }
            if(stationcd === 243){
                next_code = 201; //2호선 충정로역 다음역은 시청역
            }
            if(stationcd === 201){
                prev_code = 243; //2호선 시청역 이전역은 충정로역
            }
        }
    }
    console.log(line_num, station_nm, fr_code, prev_code, next_code, transfer, doors, restroom, crossable, address, cx, cy, telno, origin);

    var exitinfo = "";
    for(var i = 0; i < seoulmetro_exit.length; i++){
        if(seoulmetro_exit[i].station_cd === stationcd){
            exitinfo += `${seoulmetro_exit[i].exit_no}번 출구: ${seoulmetro_exit[i].area_name}<br>`;
        }
    }
    console.log(exitinfo);

    res.send({
        line_num: line_num,
        station_nm: station_nm,
        fr_code: fr_code,
        operator: operator,
        prev_code: prev_code,
        prev_name: prev_name,
        next_code: next_code,
        next_name: next_name,
        transfer: transfer,
        doors: doors,
        restroom: restroom,
        crossable: crossable,
        address: address,
        cx: cx,
        cy: cy,
        telno: telno,
        origin: origin,
        exitinfo: exitinfo
    });
}

exports.station_html = station_html;
exports.getstationinfo = getstationinfo;