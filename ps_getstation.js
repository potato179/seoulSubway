const stationlist = require("./public/js/stationlist.json")
const seoulmetro_endtrain = require("./public/js/seoulmetro_endtrain.json")
const seoulmetro_exit = require("./public/js/seoulmetro_exit.json")
const seoulmetro_contact = require("./public/js/seoulmetro_contact.json")
const seoulmetro_origin = require("./public/js/seoulmetro_origin.json")

function station_html(req, res, next){
    res.sendFile('station.html', {root: __dirname});
}

function getstationinfo(req, res, next){
    var stationcd = req.query.searchtext;

    for(var i = 0; i < stationlist.length; i++){
        if(stationlist[i].station_cd === stationcd){
            var lineno = stationlist[i].line_num;
            var name = stationlist[i].station_nm;
            var foreign;
            var transfer;
            var doors;
            var crossable;
            var restroom;
            var stationno = stationlist[i].fr_code;
        }
    }
    
    var f_train = "";
    var l_train = "";
    for(var i = 0; i < seoulmetro_endtrain.DATA.length; i++){
        if(seoulmetro_endtrain.DATA[i].station_cd === stationcd){
            let day;
            if (seoulmetro_endtrain.DATA[i].week_tag === "1") day = "평일"
            else if (seoulmetro_endtrain.DATA[i].week_tag === "2") day = "토요일"
            else if (seoulmetro_endtrain.DATA[i].week_tag === "3") day = "공휴일"
            let inout;
            if (seoulmetro_endtrain.DATA[i].inout_tag === "1") inout = "상행"
            else if (seoulmetro_endtrain.DATA[i].inout_tag === "2") inout = "하행"
    
            f_train += `[첫차] ${day} ${inout} ${ seoulmetro_endtrain.DATA[i].first_time} ${seoulmetro_endtrain.DATA[i].f_subwaysname}발 ${seoulmetro_endtrain.DATA[i].f_subwayename}행\n`
        }
    }
    
    for(var i = 0; i < seoulmetro_endtrain.DATA.length; i++){
        if(seoulmetro_endtrain.DATA[i].station_cd === stationcd){
            let day;
            if (seoulmetro_endtrain.DATA[i].week_tag === "1") day = "평일"
            else if (seoulmetro_endtrain.DATA[i].week_tag === "2") day = "토요일"
            else if (seoulmetro_endtrain.DATA[i].week_tag === "3") day = "공휴일"
            let inout;
            if (seoulmetro_endtrain.DATA[i].inout_tag === "1") inout = "상행"
            else if (seoulmetro_endtrain.DATA[i].inout_tag === "2") inout = "하행"
    
            l_train += `[막차] ${day} ${inout} ${ seoulmetro_endtrain.DATA[i].last_time} ${seoulmetro_endtrain.DATA[i].l_subwaysname}발 ${seoulmetro_endtrain.DATA[i].l_subwayename}행\n`
        }
    }

    var exitinfo = "";
    for(var i = 0; i < seoulmetro_exit.DATA.length; i++){
        if(seoulmetro_exit.DATA[i].station_cd === stationcd){
            exitinfo += `${seoulmetro_exit.DATA[i].exit_no}번 출구: ${seoulmetro_exit.DATA[i].area_name}`;
        }
    }
    
    for(var i = 0; i < seoulmetro_contact.DATA.length; i++){
        if(seoulmetro_contact.DATA[i].statn_nm === stationcd){
            var address = seoulmetro_contact.DATA[i].rdnmadr;
            var callno = seoulmetro_contact.DATA[i].telno;
        }
    }
    
    for(var i = 0; i < seoulmetro_origin.length; i++){
        if(seoulmetro_origin[i].역명 === stationcd){
            var nameorigin = seoulmetro_origin[i].유래
        }
    }

    console.log("sdaf")
}

exports.station_html = station_html;
exports.getstationinfo = getstationinfo;