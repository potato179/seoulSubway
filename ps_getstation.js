const stationlist = require("./public/js/stations.json")
const seoulmetro_exit = require("./public/js/seoulmetro_exit.json")

function getstationinfo(req, res, next){
    var stationcd = req.query.searchtext;
    if(stationcd !== "100C" && stationcd !== "101C" && stationcd !== "102C"){
        // 데이터에는 역코드가 정수형으로 저장되어 있기 때문에 입력받은 값을 정수로 변환함. 단, 경의중앙선의 용산, 회기역과 수인분당선의 왕십리역은 영문자가 있기 때문에 예외 처리.
        stationcd *= 1;
    }
    for(var i = 0; i < stationlist.length; i++){
        if(stationlist[i].station_cd === stationcd){
            var line_num = stationlist[i].line_num; // 호선명
            var station_nm = stationlist[i].station_nm; // 역명
            var fr_code = stationlist[i].fr_code; // 역 번호
            var operator = stationlist[i].operator; // 운영기관
            var transfer = stationlist[i].transfer; // 환승정보
            var doors = stationlist[i].doors; // 내리는 문
            var english = stationlist[i].english; // 영어 표기
            var japanese = stationlist[i].japanese; // 일본어 표기
            var chinese = stationlist[i].chinese; // 중국어 표기
            var restroom = stationlist[i].restroom; // 개찰구 내 화장실 여부
            var crossable = stationlist[i].crossable; // 승강장 반대편 횡단 가능 여부
            var wheelchair_charge = stationlist[i].wheelchair_charge; // 전동 휠케어 충전기 여부
            var lost_found = stationlist[i].lost_found; // 유실물센터 여부
            var parking = stationlist[i].parking; // 주차장 여부
            var bicycle = stationlist[i].bicycle; // 자전거 보관소 여부
            var atm = stationlist[i].atm; // ATM 여부
            var train_ticket = stationlist[i].train_ticket; // 기차표 예매 여부
            var lounge = stationlist[i].lounge; // 문화공간 여부
            var nursing_room = stationlist[i].nursing_room; // 수유실 여부
            var camera = stationlist[i].camera; // 즉석사진기 여부
            var phone_charge = stationlist[i].phone_charge; // 휴대폰 충전기 여부
            var locker = stationlist[i].locker; // 물품보관함 여부
            var address = stationlist[i].address; // 역 주소
            var cx = stationlist[i].cx; // 역 위치 위도
            var cy = stationlist[i].cy; // 역 위치 경도
            var telno = stationlist[i].telno; // 역 전화번호
            var origin = stationlist[i].origin; // 역명 유래

            // 이전역, 다음역 지정
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

            if(stationcd == 1812){
                next_code = ""; 
                next_name = "";
            }
            if(stationcd == 1702){
                prev_code = "1701"; 
                prev_name = "구로";
            }
            if(stationcd == 1703){
                next_code = 1704; 
                next_name = "석수";
            }
            if(stationcd == 1704){
                prev_code = 1703; 
                prev_name = "금천구청";
            }
            if(stationcd == 1750){
                next_code = ""; 
                next_name = "";
            }
            if(stationcd == 1716){
                next_code = 1717; 
                next_name = "세마";
            }
            if(stationcd == 1717){
                prev_code = 1716; 
                prev_name = "병점";
            }
            if(stationcd == 1749){
                next_code = ""; 
                next_name = "";
            }
            if(stationcd == 243){
                next_code = 201; 
                next_name = "시청";
            }
            if(stationcd == 201){
                prev_code = 243;
                prev_name = "충정로";
            }
            if(stationcd == 212){
                prev_code = 211;
                prev_name = "성수";
            }
            if(stationcd == 246){
                next_code = ""; 
                next_name = "";
            }
            if(stationcd == 244){
                prev_code = 211; 
                prev_name = "성수";
            }
            if(stationcd == 235){
                prev_code = 234;
                prev_name = "신도림";
            }
            if(stationcd == 247){
                prev_code = 234;
                prev_name = "신도림";
            }
            if(stationcd == 200){
                next_code = ""; 
                next_name = "";
            }
            if(stationcd == 2555){
                prev_code = 2549; 
                prev_name = "강동";
            }
            if(stationcd == 2554){
                next_code = 2562; 
                next_name = "강일";
            }
            if(stationcd == 2562){
                prev_code = 2554; 
                prev_name = "상일동";
            }
            if(stationcd == 2561){
                next_code = ""; 
                next_name = "";
            }
            if(stationcd == 2616){
                next_code = 2611; 
                next_name = "응암";
            }
            if(stationcd == 2611){
                prev_code = 2616; 
                prev_name = "구산";
                next_code = 2617; 
                next_name = "새절";
            }
            if(stationcd == 2617){
                prev_code = 2611; 
                prev_name = "응암";
            }
            if(stationcd == 1251){
                next_code = ""; 
                next_name = "";
            }
            if(stationcd == 1264){
                prev_code = 1265; 
                prev_name = "가좌";
            }
            if(stationcd == 1305){
                next_code = 1309; 
                next_name = "상봉";
            }
            if(stationcd == 1306){
                prev_code = ""; 
                prev_name = "";
            }
        }
    }
    console.log(line_num, station_nm, fr_code, prev_code, next_code, transfer, doors, restroom, crossable, address, cx, cy, telno, origin);
    // 출구 정보
    var exitinfo = "";
    for(var i = 0; i < seoulmetro_exit.length; i++){
        if(seoulmetro_exit[i].station_cd === stationcd){
            exitinfo += `${seoulmetro_exit[i].exit_no}번 출구: ${seoulmetro_exit[i].area_name}<br>`;
        }
    }

    // 데이터 전송
    res.send({
        station_cd: stationcd,
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
        english: english,
        japanese: japanese,
        chinese: chinese,
        restroom: restroom,
        crossable: crossable,
        wheelchair_charge: wheelchair_charge,
        lost_found: lost_found,
        parking: parking,
        bicycle: bicycle,
        atm: atm,
        train_ticket: train_ticket,
        lounge: lounge,
        nursing_room: nursing_room,
        camera: camera,
        phone_charge: phone_charge,
        locker: locker,
        address: address,
        cx: cx,
        cy: cy,
        telno: telno,
        origin: origin,
        exitinfo: exitinfo
    });
}

function getStations(req, res, next){
    // 역 목록 불러오기
    var lineno = req.query.lineno;
    var stations = [];
    for(var i = 0; i < stationlist.length; i++){
        if(stationlist[i].line_num === lineno){
            stations.push({"stationname": stationlist[i].station_nm, "stationcd": stationlist[i].station_cd});
        }
    }
    console.log(stations)
    // 데이터 전송
    res.send({stations});
}

function getStationByFrcode(req, res, next){
    var orgStinCd = req.query.orgStinCd;
    var tmnStinCd = req.query.tmnStinCd;
    for(var i = 0; i < stationlist.length; i++){
        if(stationlist[i].fr_code === orgStinCd){
            var orgStinCd_name = stationlist[i].station_nm; // 역명
        }
    }
    for(var i = 0; i < stationlist.length; i++){
        if(stationlist[i].fr_code === tmnStinCd){
            var tmnStinCd_name = stationlist[i].station_nm; // 역명
        }
    }
    // 데이터 전송
    res.send({
        orgStinCd_name: orgStinCd_name,
        tmnStinCd_name: tmnStinCd_name
    });
}

exports.getstationinfo = getstationinfo;
exports.getStations = getStations;
exports.getStationByFrcode = getStationByFrcode;