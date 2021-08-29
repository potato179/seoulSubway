const stationlist = require("./public/js/stations.json")
const seoulmetro_exit = require("./public/js/seoulmetro_exit.json")

function station_html(req, res, next){
    res.sendFile('station.html', {root: __dirname});
}

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
            var restroom = stationlist[i].restroom; // 개찰구 내 화장실 여부
            var crossable = stationlist[i].crossable; // 승강장 반대편 횡단 가능 여부
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
                // 1호선 인천역 종점
                next_code = ""; 
                next_name = "";
            }
            if(stationcd == 1702){
                // 1호선 가산디지털단지역 이전역은 구로역
                prev_code = "1701"; 
                prev_name = "구로";
            }
            if(stationcd == 243){
                // 2호선 충정로역 다음역은 시청역
                next_code = 201; 
                next_name = "시청";
            }
            if(stationcd == 201){
                // 2호선 시청역 이전역은 충정로역
                prev_code = 243;
                prev_name = "충정로";
            }
            if(stationcd == 212){
                // 2호선(본선) 건대입구역 이전은역은 성수역
                prev_code = 211;
                prev_name = "성수";
            }
            if(stationcd == 246){
                // 2호선(성수지선) 신설동역 종점
                next_code = ""; 
                next_name = "";
            }
            if(stationcd == 235){
                // 2호선(본선) 문래역 이전역은 신도림역
                prev_code = 234;
                prev_name = "신도림";
            }
            if(stationcd == 200){
                // 2호선(신정지선) 까치산역 종점
                next_code = ""; 
                next_name = "";
            }

            // 지선 분리
            var branchName = "";
            var branch_next_code = "";
            var branch_next_name = "";
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