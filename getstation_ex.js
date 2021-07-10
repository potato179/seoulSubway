const stationlist = require("./public/js/stationlist.json")
const seoulmetro_endtrain = require("./public/js/seoulmetro_endtrain.json")
const seoulmetro_exit = require("./public/js/seoulmetro_exit.json")
const seoulmetro_contact = require("./public/js/seoulmetro_contact.json")
const seoulmetro_origin = require("./public/js/seoulmetro_origin.json")

var stationcd = "0240"

for(var i = 0; i < stationlist.length; i++){
    if(stationlist[i].station_cd === stationcd){
        console.log(`${stationlist[i].station_nm}(${stationlist[i].station_cd})역 정보`);
        var stationname = stationlist[i].station_nm
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

        console.log(`[첫차] ${day} ${inout} ${ seoulmetro_endtrain.DATA[i].first_time} ${seoulmetro_endtrain.DATA[i].f_subwaysname}역(${seoulmetro_endtrain.DATA[i].f_originstation}) 출발 ${seoulmetro_endtrain.DATA[i].f_subwayename}(${seoulmetro_endtrain.DATA[i].f_deststation})행`)
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

        console.log(`[막차] ${day} ${inout} ${ seoulmetro_endtrain.DATA[i].last_time} ${seoulmetro_endtrain.DATA[i].l_subwaysname}역(${seoulmetro_endtrain.DATA[i].l_originstation}) 출발 ${seoulmetro_endtrain.DATA[i].l_subwayename}(${seoulmetro_endtrain.DATA[i].l_deststation})행`)
    }
}

for(var i = 0; i < seoulmetro_exit.DATA.length; i++){
    if(seoulmetro_exit.DATA[i].station_cd === stationcd){
        console.log(`${seoulmetro_exit.DATA[i].exit_no}번 출구: ${seoulmetro_exit.DATA[i].area_name}`)
    }
}

for(var i = 0; i < seoulmetro_contact.DATA.length; i++){
    if(seoulmetro_contact.DATA[i].statn_nm === stationname){
        console.log(`역 주소: ${seoulmetro_contact.DATA[i].rdnmadr}\n역 전화번호: ${seoulmetro_contact.DATA[i].telno}`)
    }
}

for(var i = 0; i < seoulmetro_origin.length; i++){
    if(seoulmetro_origin[i].역명 === stationname){
        console.log(`역 이름 유래: ${seoulmetro_origin[i].유래}`)
    }
}