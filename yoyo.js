(function ($) {
  //$("#mainTitle").append('<img alt="" style="cursor: pointer;" onclick="fileDownLoad()" src="images/UserGuide.png">');

  var CME00001 = JS_PG_STRING_VALUE1; // 조회 중 오류가 발생하였습니다.
  var CMI00007 = JS_PG_STRING_VALUE4; // 데이터가 존재하지 않습니다.
  var CMI00003 = JS_PG_STRING_VALUE2; // 조회를 위한 정보가 존재하지 않습니다.
  var CMW00002 = JS_PG_STRING_VALUE3; // 선택된 데이터가 없습니다.
  var CMW00001 = JS_PG_STRING_VALUE5; // {t}는(은) 필수 입력사항입니다.
  var CME00002 = JS_PG_STRING_VALUE6; // 오류가 발생하였습니다.
  var CMW00019 = JS_PG_STRING_VALUE7; // {n}개 이내로 입력하세요.
  var CMW00002 = JS_PG_STRING_VALUE3; // 선택된 데이터가 없습니다.
  var CMW00010 = JS_PG_STRING_VALUE8; // 해당 자료가 이미 존재합니다.

  var ESB00001 = JS_PG_STRING_VALUE11; // Search
  var ESB00006 = JS_PG_STRING_VALUE12; // DownLoad
  var ESB00047 = JS_PG_STRING_VALUE13; // Add My Tracking
  var EST00061 = JS_PG_STRING_VALUE15; // Service Provider Information
  var ESB00009 = JS_PG_STRING_VALUE16; // Detail
  var ESB00042 = JS_PG_STRING_VALUE18; // B/L View
  var ESB00048 = JS_PG_STRING_VALUE19; // A/N View
  var ESW00034 = JS_PG_STRING_VALUE20;
  var ESW00179 = JS_PG_STRING_VALUE23;

  var selLang = JS_PG_STRING_VALUE9; //Search 조건 Lang
  var pdfUrl = JS_PG_STRING_VALUE21;
  var usrId = JS_PG_STRING_VALUE22;
  var trakNoTpCdParam = JS_PG_STRING_VALUE31;
  var trakNoParam = JS_PG_STRING_VALUE32;
  var bkgNoParam = JS_PG_STRING_VALUE33;
  var cntrNoParam = JS_PG_STRING_VALUE34;
  var copNoParam = JS_PG_STRING_VALUE35;
  var blNoParam = JS_PG_STRING_VALUE36;
  var pod = "";
  var lastsel = 0;

  if (trakNoTpCdParam == "V") {
    $("#searchType").val("C");
    $("#searchName").val(cntrNoParam);
    $("#bkgNo").val(bkgNoParam);
    $("#cntrNo").val(cntrNoParam);
    $("#copNo").val(copNoParam);
    $("#blNo").val(blNoParam);
  } else {
    if (trakNoTpCdParam == "P") {
      $("#searchName").css("width", 280);
    }
    $("#searchType").val(trakNoTpCdParam);
    if (trakNoParam != "")
      $("#searchName").val(trakNoParam.replace(/,/g, "\n"));
  }

  var searchType = "";
  var searchName = "";
  var orgSearhName = "";

  var btnOpt0 = {
    download: { id: "btnDownload0", name: ESB00006 },
  };
  $.dbHandleButton($("#main-control-btn"), btnOpt0);
  //	var btnOpt1 = {
  //		search:{ id:"btnSearch", name:ESB00001}
  //	};
  //	$.dbHandleButton( $("#main-control-btn2"), btnOpt1 );

  var btnOpt2 = {
    addmytracking: { id: "btnAddMyTracking", name: ESB00047 },
  };
  $.dbHandleButton($("#main-control-btn1"), btnOpt2);

  /*var btnOpt4 = {
               addmytracking2:{id:"btnAddMyTracking2",name:ESB00047},
               blview:{id:"btnBLView",name:ESB00042},
               anview:{id:"btnANView",name:ESB00048}
       };*/

  var btnOpt4 = {
    addmytracking2: { id: "btnAddMyTracking2", name: ESB00047 },
    //,blview:{id:"btnBLView",name:ESB00042}
    //,anview:{id:"btnANView",name:ESB00048}
  };

  $.dbHandleButton($("#main-control-btn3"), btnOpt4);

  var btnOpt5 = {
    download: { id: "btnDownload1", name: ESB00006 },
  };
  $.dbHandleButton($("#main-control-btn4"), btnOpt5);

  var btnOpt6 = {
    download: { id: "btnServiceProviderInfomation", name: EST00061 },
  };
  $.dbHandleButton($("#main-control-btn5"), btnOpt6);

  if ($("#sessLocale").val() == "ko") {
    railTrackDetailNm = "US Rail 상세정보";
  } else if ($("#sessLocale").val() == "zh") {
    railTrackDetailNm = "美国铁路明细";
  } else if ($("#sessLocale").val() == "jp" || $("#sessLocale").val() == "ja") {
    railTrackDetailNm = "USAレールの詳細";
  } else {
    railTrackDetailNm = "Detail for USA Rail";
  }
  var btnOpt7 = {
    download: { id: "btnDetail", name: railTrackDetailNm },
  };
  $.dbHandleButton($("#main-control-btn8"), btnOpt7);

  //[나의 화물추적으로 추가][B/L 미리보기][A/N 미리보기] 활성화 결정
  setButtonEnable = function (enable) {
    //cntrFlg = N 체크조건 삭제 SR0022999
    /*		if(enable){		//cntrFlg = N 체크조건 삭제 SR0022999
               $("#btnAddMyTracking").removeAttr("disabled");
               $("#btnAddMyTracking").removeClass("jui-button-dis");
           }else{
               $("#btnAddMyTracking").attr("disabled",true);
               $("#btnAddMyTracking").addClass("jui-button-dis");
           }*/
    $("#btnAddMyTracking").removeAttr("disabled");
    $("#btnAddMyTracking").removeClass("jui-button-dis");
  };

  setButtonEnable2 = function (enable) {
    if (enable) {
      $("#btnAddMyTracking2").removeAttr("disabled");
      $("#btnAddMyTracking2").removeClass("jui-button-dis");
      $("#btnBLView").removeAttr("disabled");
      $("#btnBLView").removeClass("jui-button-dis");
      $("#btnANView").removeAttr("disabled");
      $("#btnANView").removeClass("jui-button-dis");
    } else {
      /*			$("#btnAddMyTracking2").attr("disabled",true);
               $("#btnAddMyTracking2").addClass("jui-button-dis");*/
      $("#btnBLView").attr("disabled", true);
      $("#btnBLView").addClass("jui-button-dis");
      $("#btnANView").attr("disabled", true);
      $("#btnANView").addClass("jui-button-dis");
    }
  };

  setButtonEnable(!$.isEmpty(usrId));
  setButtonEnable2(!$.isEmpty(usrId));

  checkEnblFlag = function () {
    var enable = true;
    if ($.isEmpty(usrId)) {
      enable = false;
    } else {
      var ids = $("#main-grid").jqGrid("getGridParam", "selarrrow");
      var rowData = null;
      for (var i = 0; i < ids.length; i++) {
        rowData = $("#main-grid").getRowData(ids[i]);
        if (rowData.enblFlag == "N") {
          enable = false;
          break;
        }
      }
    }
    setButtonEnable(enable);
  };
  /**
   * #searchName 동적으로 TEXTAREA 처리한다. <br>
   * <br><b>Example : </b>
   * <pre>
   *     $(object).dynamicTextarea();
   * </pre>
   * @param 없음
   * @return 없음
   * @author LEEYISUK
   * @version 2011.12.08
   */
  $("#searchName").dynamicTextarea({
    maxLine: 10,
    errMsg: $.msgConvert(CMW00019, 11),
  });
  /**
   * #searchName 에 keyup Event를 처리한다. <br>
   *  검색데이타 소문자->대문자로 변환처리한다. <br>
   * <br><b>Example :</b>
   * <pre>
   *     $(object).keyup(function(event){
   *     	return false;
   *     });
   * </pre>
   * @param 없음
   * @return 없음
   * @author LEEYISUK
   * @version 2011.12.08
   */
  $("#searchName").keyup(function (event) {
    $("#searchName").val($("#searchName").val().toUpperCase());
  });
  /**
   * #searchType 에 Change Event를 처리한다. <br>
   * <br><b>Example :</b>
   * <pre>
   *     $(object).chagne(function(){
   *     	return false;
   *     });
   * </pre>
   * @param 없음
   * @return 없음
   * @author LEEYISUK
   * @version 2011.12.08
   */
  $("#searchType").change(function () {
    $("#searchName").val("");
    var searchType = $("#searchType").val();
    if (searchType == "P") {
      $("#searchName").dynamicTextarea({
        width: 300,
        maxLine: 10,
        errMsg: $.msgConvert(CMW00019, 11),
      });
    } else {
      $("#searchName").dynamicTextarea({
        width: 300,
        maxLine: 10,
        errMsg: $.msgConvert(CMW00019, 11),
      });
    }
  });
  /**
   * div 영역 hide 처리한다. <br>
   * <br><b>Example :</b>
   * <pre>
   *     load();
   * </pre>
   * @param 없음
   * @return 없음
   * @author LEEYISUK
   * @version 2011.12.08
   */
  load = function () {
    $("#trainInfo").hide();
    $("#boundInfo").hide();
    $("#EST00062").hide();
    $("#houtboundinbound").hide();
    $("#outboundinbound").hide();
    $("#hinbound").hide();
    $("#inbound").hide();
    $("#houtbound").hide();
    $("#outbound").hide();
    $("#btnDetail").hide();
    $("#detailInfo").hide();
    $("#sailingInfo").hide();
    $("#statusInfo").hide();
    $("#statusInfoLogin").hide();
    $("#releaseInfo").hide();
    $("#commentInfo").hide();
  };

  /**
   * Title 길이 조절
   */
  cutTitle = function (str, maxlength) {
    if (str == undefined) {
      return "";
    }
    return str.length > maxlength ? str.substring(0, maxlength) + "..." : str;
  };

  /**
   * 그리드 조회를 처리한다. <br>
   * <br><b>Example :</b>
   * <pre>
   *     searchSchedule( target, blNo );
   * </pre>
   * @param 없음
   * @return 없음
   * @author LEEYISUK
   * @version 2011.12.08
   */
  searchSchedule = function () {
    // search list
    load();
    searchType = $("#searchType").val();
    searchName = $("#searchName").val();

    $("#selectedType").val("");

    var tmpSrhName = searchName.split("\n");
    var sCnt = 0;
    if (searchName == null || $.isEmpty(searchName)) {
      var cmwMsgNm = "";
      if (searchType == "B") {
        cmwMsgNm = "BL No. or Booking No.";
      } else if (searchType == "C") {
        cmwMsgNm = "Container No.";
      } else if (searchType == "P") {
        cmwMsgNm = "Purchase Order No.";
      }
      $.alertDialog($.msgConvert(CMW00001, cmwMsgNm));
    } else {
      searchName = "";
      orgSearchName = "";
      var j = 0;
      for (var i = 0; i != tmpSrhName.length; ++i) {
        if (tmpSrhName[i] != null && !$.isEmpty(tmpSrhName[i])) {
          if (searchName != null && !$.isEmpty(searchName)) {
            searchName += ",";
            orgSearchName += ",";
          }
          searchName += tmpSrhName[i];
          orgSearchName += tmpSrhName[i];
          sCnt++;
        }
      }
      $("#progress-modal").openWait();
      var selectedType = $("#selectedType").val();
      var bkgNo = "";
      var copNo = "";
      var custCd = "";
      if (!$.isEmpty(custCntCd) && !$.isEmpty(custSeq)) {
        custCd = custCntCd + "," + custSeq;
        if (!$.isEmpty(usrAfil)) {
          custCd += "/" + usrAfil;
        }
      }

      if (sCnt == 1 && searchType == "C") {
        //Contailer No 1건 select or Contailer select
        $("#mainInfo").hide();
        $(".jui-total").hide();
        var cntrNo = searchName;
        $.ajax({
          url: "CUP_HOM_3301GS.do",
          dataType: "json",
          type: "POST",
          data: {
            f_cmd: SEARCHLIST02,
            cntr_no: cntrNo,
            cust_cd: custCd,
            search_type: searchType,
          },
          success: function (data) {
            if (data.TRANS_RESULT_KEY == "S") {
              if (data.count > 0) {
                bkgNo = data.list[0].bkgNo;
                copNo = data.list[0].copNo;

                selectStatusInfo(bkgNo, copNo, cntrNo); // Status
                selectContainerBarInfo(cntrNo, bkgNo, copNo); // Container bar
                selectSailingInfo(bkgNo); // Sailing
                selectCommentHistoryInfo(cntrNo, bkgNo, copNo); // Cargo Tracking Comments History
                selectDetailInfo(cntrNo, bkgNo, copNo); // Detail grid
                selectReleaseInfo(cntrNo, bkgNo); // Release
                selectRailTrackingInfo(copNo); //Rail Tracking Information

                $("#copNo").val(copNo);
                $("#bkgNo").val(bkgNo);
                $("#cntrNo").val(searchName);
                if (!$.isEmpty(usrId) && data.list[0].enblFlag == "Y") {
                  setButtonEnable2(true);
                } else {
                  setButtonEnable2(false);
                }
              } else {
                $.alertDialog(CMI00007);
              }
            } else {
              $.alertDialog(CME00001 + "<br>" + data.Message);
            }
          },
          error: function (e) {
            $.alertDialog(CME00001 + "<br>" + e.Message);
          },
        });
        $("#progress-modal").closeWait();
      } else {
        // 그외 조회(다건)

        $("#main-grid")
          .jqGrid("setGridParam", {
            datatype: "json",
            postData: {
              f_cmd: SEARCHLIST01,
              search_type: searchType,
              search_name: searchName,
              cust_cd: custCd,
            },
          })
          .trigger("reloadGrid");
        //load();
        $("#mainInfo").show();
        $(".jui-total").show();
      }
      var bkgNo = $("#bkgNo").val();
      var copNo = $("#copNo").val();
    }
  };

  /**
   * #detail <tbody> 영역을 그린다 <br>
   * <br><b>Example :</b>
   * <pre>
   *     setDetailTable(idx,data);
   * </pre>
   * @param { object } 필수 idx
   * @param { object } 필수 data
   * @return  Stirng HTML 태그
   * @author LEEYISUK
   * @version 2011.12.08
   */
  setDetailTable = function (idx, data) {
    var tr = "";
    if (data.actTpCd == "E") {
      tr += "<tr>";
      tr += "<td style='text-align:center;'>" + data.no + "</td>";
      if (data.vslCd != "") {
        tr +=
          "<td class='multi_row' style='line-height:15px;'>" +
          data.statusNm +
          "<br> ";
        var tmpVslCd = data.vslCd;
        var tmpVvdSkd = data.skdVoyNo;
        var tmpVvdDir = data.skdDirCd;
        var tmpVvdCd = tmpVslCd + "" + tmpVvdSkd + "" + tmpVvdDir;
        //					tr+="<a href ='JavaScript:void(0);' style='line-height:15px;' title='"+ data.vslEngNm +"' onClick=openVesselPopup('"+data.vslCd+"','"+data.skdVoyNo+"') >"+ data.vslCd +""+ data.skdVoyNo +""+ data.skdDirCd +"</a></td>";
        tr +=
          "<a href ='JavaScript:void(0);' style='line-height:15px;' title='" +
          data.vslEngNm +
          "' data-click='vesselPop' data-cd='" +
          tmpVvdCd +
          "' >" +
          data.vvd +
          "</a></td>"; //NBS Nagane201502
      } else {
        tr +=
          "<td class='multi_row' style='line-height:15px;'>" +
          data.statusNm +
          "</td>";
      }
      tr +=
        "<td class='multi_row' style='line-height:15px;'>" +
        data.placeNm +
        "<br> ";
      if (data.statusCd != "MITYAD")
        tr +=
          " <a href='JavaScript:void(0);' style='line-height:15px;' onClick=openLocationPopup('" +
          data.nodCd +
          "') title='" +
          data.yardNm +
          "'>" +
          data.yardNm +
          "</a></td>";
      tr +=
        "<td><span class='highlight_magenta'>Estimate</span> " +
        data.eventDt +
        "</td>";
      tr += "</tr>";
    } else {
      tr += "<tr>";
      tr += "<td style='text-align:center;'>" + data.no + "</td>";
      if (data.vslCd != "") {
        tr +=
          "<td class='multi_row' style='line-height:15px;'>" +
          data.statusNm +
          "<br> ";
        var tmpVslCd = data.vslCd;
        var tmpVvdSkd = data.skdVoyNo;
        var tmpVvdDir = data.skdDirCd;
        var tmpVvdCd = tmpVslCd + "" + tmpVvdSkd + "" + tmpVvdDir;
        //					tr+="<a href ='JavaScript:void(0);' style='line-height:15px;' title='"+ data.vslEngNm +"' onClick=openVesselPopup('"+data.vslCd+"','"+data.skdVoyNo+"') >"+ data.vslCd +""+ data.skdVoyNo +""+ data.skdDirCd +"</a></td>";
        tr +=
          "<a href ='JavaScript:void(0);' style='line-height:15px;' title='" +
          data.vslEngNm +
          "' data-click='vesselPop' data-cd='" +
          tmpVvdCd +
          "' >" +
          data.vvd +
          "</a></td>"; //NBS Nagane201502
      } else {
        tr +=
          "<td class='multi_row' style='line-height:15px;'>" +
          data.statusNm +
          "</td>";
      }
      tr +=
        "<td class='multi_row' style='line-height:15px;'>" +
        data.placeNm +
        "<br> ";
      if (data.statusCd != "MITYAD") {
        tr +=
          " <a href='JavaScript:void(0);' style='line-height:15px;' onClick=openLocationPopup('" +
          data.nodCd +
          "') title='" +
          data.yardNm +
          "'>" +
          data.yardNm +
          "</a></td>";
      }
      if (data.eventDt) {
        tr +=
          "<td><span class='highlight_black'>Actual</span> " +
          data.eventDt +
          "</td>";
      } else {
        tr += "<td></td>";
      }
      tr += "</tr>";
    }

    return tr;
  };
  /**
   * #sailing <tbody> 영역을 그린다 <br>
   * <br><b>Example :</b>
   * <pre>
   *     setSailingTable( data);
   * </pre>
   * @param { object } 필수 data
   * @return Stirng HTML 태그
   * @author LEEYISUK
   * @version 2011.12.08
   */
  setSailingTable = function (data) {
    var tr = "";
    tr = "<tr>";
    if (data.vslEngNm == "Feeder") {
      //"Feeder" 일경우
      //tr+="<td class='multi_row' style='line-height:15px;'>"+data.vslEngNm +" "+ data.skdVoyNo +" "+ data.skdDirCd +" </td>";
      tr +=
        "<td class='multi_row' style='line-height:15px;'>" +
        data.vvd +
        " </td>"; //201502NBSNagane
    } else {
      var tmpVslCd = data.vslCd;
      var tmpVvdSkd = data.skdVoyNo;
      var tmpVvdDir = data.skdDirCd;
      var tmpVvdCd = tmpVslCd + "" + tmpVvdSkd + "" + tmpVvdDir;
      //tr+="<td class='multi_row'><a href ='JavaScript:void(0);' style='line-height:15px;' title='"+ data.vslEngNm +"' onClick=openVesselPopup('"+data.vslCd+"','"+data.skdVoyNo+"') >";
      tr +=
        "<td class='multi_row'><a href ='JavaScript:void(0);' style='line-height:15px;' title='" +
        data.vslEngNm +
        "' data-click='vesselPop' data-cd='" +
        tmpVvdCd +
        "' >"; //201502NBSNagane
      //tr+=""+data.vvd +" "+ data.skdVoyNo +" "+ data.skdDirCd +" ("+data.vslCd+")</a></td>";
      if (data.vvd == "To Be Nominated") {
        //201502NBSNagane
        tr += "" + data.vvd + "</a></td>";
      } else {
        tr += "" + data.vvd + " (" + data.vslCd + ")</a></td>";
      }
    }

    tr +=
      "<td class='multi_row' style='line-height:15px;'>" +
      data.polNm +
      " </td>";
    if (data.vslEngNm == "Feeder" || data.vslEngNm == "") {
      tr += "<td>" + data.etd + "</td>";
    } else if (data.etdFlag == "A") {
      tr +=
        "<td><span class='highlight_black'>Actual</span> " + data.etd + "</td>";
    } else if (data.etdFlag == "C") {
      tr +=
        "<td><span class='highlight_magenta'>Coastal</span> " +
        data.etd +
        "</td>";
    }
    tr +=
      "<td class='multi_row' style='line-height:15px;'>" + data.podNm + "</td>";
    if (data.vslEngNm == "Feeder" || data.vslEngNm == "") {
      tr += "<td>" + data.eta + "</td>";
    } else if (data.etaFlag == "A") {
      tr +=
        "<td><span class='highlight_black'>Actual</span> " + data.eta + "</td>";
    } else if (data.etaFlag == "C") {
      tr +=
        "<td><span class='highlight_magenta'>Coastal</span> " +
        data.eta +
        "</td>";
    }
    tr += "</tr>";
    return tr;
  };
  /**
   * #trainInfo 영역을 조회한다. <br>
   * <br><b>Example :</b>
   * <pre>
   *     selectContainerBarInfo( cntrNo, bkgNo, copNo);
   * </pre>
   * @param { String } 필수 cntrNo
   * @param { String } 필수 bkgNo
   * @param { String } 필수 copNo
   * @return  없음
   * @author LEEYISUK
   * @version 2011.12.08
   */
  selectContainerBarInfo = function (cntrNo, bkgNo, copNo) {
    //$("#train").children().remove();
    $.ajax({
      url: "CUP_HOM_3301GS.do",
      dataType: "json",
      type: "POST",
      data: {
        f_cmd: SEARCHLIST08,
        cntr_no: cntrNo,
        bkg_no: bkgNo,
        cop_no: copNo,
      },
      success: function (data) {
        if (data.TRANS_RESULT_KEY == "S") {
          if (data.count > 0) {
            $("#trainInfo").show();
            var ctData = data.list[0];
            var ratio = ctData.ratio;
            var transMode = ctData.transMode;

            var train = "";
            $("#train div").remove();
            train = "<div class='jui-eservice-box'> ";
            train += "<div class='jui-div-mytracking'> ";
            train += "<div class='jui-tracking-portname'> ";
            train += "<div class='jui-position-tracking' > ";
            train +=
              "<span class='jui-trace-graph' style='width:" +
              ratio +
              "%'></span>";
            train +=
              "<p class='jui-tracking-current' style='left:" + ratio + "%'>";
            if (transMode == "T") {
              train +=
                "<img src='images/common/icon-tracking-current_truck.png' /><br /> ";
            } else if (transMode == "R") {
              train +=
                "<img src='images/common/icon-tracking-current_train.png' /><br /> ";
            } else if (transMode == "W") {
              train +=
                "<img src='images/common/icon-tracking-current_ship.png' /><br /> ";
            }
            train += "</p>";
            train += "</div>";
            train += "<div class='jui-tracking-portname'>";
            train +=
              "<span class='jui-loading' style='text-align:left'>Place of Receipt<br>" +
              ctData.firstNod +
              "</span>";
            train +=
              "<span>Place of Delivery<br>" +
              ctData.lastNod +
              "</span></div></div></div>";

            $("#train").append(train);
          }
        } else {
          $.alertDialog(CME00001 + "<br>" + data.Message);
        }
      },
    });
  };
  /**
   * Rail Tracking Information 조회한다. <br>
   * <br><b>Example :</b>
   * <pre>
   *     selectRailTrackingInfo( copNo);
   * </pre>
   * @param { String } 필수 copNo
   * @return 없음
   * @author LEEYISUK
   * @version 2011.12.08
   */
  selectRailTrackingInfo = function (copNo) {
    $.ajax({
      url: "CUP_HOM_3301GS.do",
      dataType: "json",
      type: "POST",
      data: { f_cmd: SEARCHLIST07, cop_no: copNo },
      success: function (data) {
        if (data.TRANS_RESULT_KEY == "S") {
          if (data.count > 0) {
            var display = data.list[0].ibflag; // display VALUE (M:INBOUND, OUTBOUND),(I:INBOUND)(O:OUNTBOUND),N:NOT SHOW
            var data = data.list[0];
            $("#boundInfo").show();
            if (display == "M") {
              $("#EST00062").show();
              $("#houtboundinbound").show();
              $("#outboundinbound").show();
              $("#m_outDepName").html(
                data.outDepName + "(" + data.outDepYardNm + ")"
              );
              $("#m_outDepNod").html(data.outDepNod);
              $("#m_outDepDate").html(data.outDepDate);
              $("#m_outArrNod").html(data.outArrNod);
              $("#m_outArrName").html(
                data.outArrName + "(" + data.outArrYardNm + ")"
              );
              $("#m_outArrDate").html(data.outArrDate);
              $("#m_inDepNod").html(data.inDepNod);
              $("#m_inDepDate").html(data.inDepDate);
              $("#m_inDepName").html(
                data.inDepName + "(" + data.inDepYardNm + ")"
              );
              $("#m_inArrName").html(
                data.inArrName + "(" + data.inArrYardNm + ")"
              );
              $("#m_inArrNod").html(data.inArrNod);
              $("#m_inArrDate").html(data.inArrDate);
              $("#m_lastStatus").html(data.lastStatus);
              $("#m_currLoc").html(data.currLoc);
              $("#m_eventDt").html(data.eventDt);
              $("#m_pickUpAvail").html(data.pickUpAvail);
              if (!$.isEmpty(custCntCd) && !$.isEmpty(custSeq)) {
                $("#m_pkupNo").html(data.pkupNo);
              } else {
                if (data.pickUpAvail == "Y") {
                  $("#m_pkupNo").html(
                    "<a onclick=\"document.getElementById('id01').style.display='block'\">Login Required</a>"
                  );
                }
              }
              $("#outArrName").val(data.inArrName);
            } else if (display == "I") {
              $("#EST00062").show();
              $("#hinbound").show();
              $("#inbound").show();
              $("#i_inDepNod").html(data.inDepNod);
              $("#i_inDepDate").html(data.inDepDate);
              $("#i_inDepName").html(
                data.inDepName + "(" + data.inDepYardNm + ")"
              );
              $("#i_inArrName").html(
                data.inArrName + "(" + data.inArrYardNm + ")"
              );
              $("#i_inArrNod").html(data.inArrNod);
              $("#i_inArrDate").html(data.inArrDate);
              $("#i_lastStatus").html(data.lastStatus);
              $("#i_currLoc").html(data.currLoc);
              $("#i_eventDt").html(data.eventDt);
              $("#i_pickUpAvail").html(data.pickUpAvail);
              if (!$.isEmpty(custCntCd) && !$.isEmpty(custSeq)) {
                $("#i_pkupNo").html(data.pkupNo);
              } else {
                if (data.pickUpAvail == "Y") {
                  $("#i_pkupNo").html(
                    "<a onclick=\"document.getElementById('id01').style.display='block'\">Login Required</a>"
                  );
                }
              }
              $("#outArrName").val(data.inArrName);
            } else if (display == "O") {
              $("#EST00062").show();
              $("#houtbound").show();
              $("#outbound").show();
              $("#o_outDepName").html(
                data.outDepName + "(" + data.outDepYardNm + ")"
              );
              $("#o_outDepNod").html(data.outDepNod);
              $("#o_outDepDate").html(data.outDepDate);
              $("#o_outArrNod").html(data.outArrNod);
              $("#o_outArrName").html(
                data.outArrName + "(" + data.outArrYardNm + ")"
              );
              $("#o_outArrDate").html(data.outArrDate);
              $("#o_lastStatus").html(data.lastStatus);
              $("#o_currLoc").html(data.currLoc);
              $("#o_eventDt").html(data.eventDt);
              $("#o_pickUpAvail").html(data.outArrYardResult);
              $("#outArrName").val(data.outArrName);
            }
            $("#btnDetail").show();
          }
        } else {
          $.alertDialog(CME00001 + "<br>" + data.Message);
        }
      },
    });
  };
  /**
   * Release Information 조회한다. <br>
   * <br><b>Example :</b>
   * <pre>
   *     selectReleaseInfo( cntrNo, bkgNo );
   * </pre>
   * @param { String } 필수 copNo
   * @param { String } 필수 bkgNo
   * @return 없음
   * @author LEEYISUK
   * @version 2011.12.08
   */
  selectReleaseInfo = function (cntrNo, bkgNo) {
    $.ajax({
      url: "CUP_HOM_3301GS.do",
      dataType: "json",
      type: "POST",
      data: { f_cmd: SEARCHLIST06, cntr_no: cntrNo, bkg_no: bkgNo },
      success: function (data) {
        //console.log(data);
        if (data.TRANS_RESULT_KEY == "S") {
          if (data.count > 0) {
            var rlData = data.list[0];

            if (
              $.trim(rlData.oblRcvDt) ||
              $.trim(rlData.ocnFrtColDt) ||
              $.trim(rlData.cstmsClrDt) ||
              $.trim(rlData.impFilDt) ||
              $.trim(rlData.ibdNo) ||
              $.trim(rlData.authDt) ||
              $.trim(rlData.podFirmsCode) ||
              $.trim(rlData.delFirmsCode) ||
              $.trim(rlData.lastFreeDt)
            ) {
              $("#releaseInfo").show();
              $("#rl_oblRcvDt").html(rlData.oblRcvDt);
              $("#rl_ocnFrtColDt").html(rlData.ocnFrtColDt);
              $("#rl_cstmsClrDt").html(rlData.cstmsClrDt);
              $("#rl_impFilDt").html(rlData.impFilDt);
              $("#rl_ibdNo").html(rlData.ibdNo);
              $("#rl_authDt").html(rlData.authDt);
              $("#rl_podFirmsCode").html(rlData.podFirmsCode);
              $("#rl_delFirmsCode").html(rlData.delFirmsCode);
              $("#rl_lastFreeDt").html(rlData.lastFreeDt);
            } else {
              $("#rl_oblRcvDt").html("");
              $("#rl_ocnFrtColDt").html("");
              $("#rl_cstmsClrDt").html("");
              $("#rl_impFilDt").html("");
              $("#rl_ibdNo").html("");
              $("#rl_authDt").html("");
              $("#rl_podFirmsCode").html("");
              $("#rl_delFirmsCode").html("");
              $("#rl_lastFreeDt").html("");
              $("#releaseInfo").hide();
            }
          }
        } else {
          $.alertDialog(CME00001 + "<br>" + data.Message);
        }
      },
    });
  };
  /**
   * Status 영역을 조회한다. <br>
   * <br><b>Example :</b>
   * <pre>
   *     selectStatusInfo( bkgNo, copNo, cntrNo );
   * </pre>
   * @param { String } 필수 bkgNo
   * @param { String } 필수 copNo
   * @param { String } 필수 cntrNo
   * @return 없음
   * @author LEEYISUK
   * @version 2011.12.08
   */
  selectStatusInfo = function (bkgNo, copNo, cntrNo) {
    $.ajax({
      url: "CUP_HOM_3301GS.do",
      dataType: "json",
      type: "POST",
      data: {
        f_cmd: SEARCHLIST03,
        cntr_no: cntrNo,
        bkg_no: bkgNo,
        cop_no: copNo,
      },
      success: function (data) {
        if (data.TRANS_RESULT_KEY == "S") {
          if (data.count > 0) {
            var statusData = data.list[0];

            var socFlg = statusData.socFlg;
            var mvmtStsCd = statusData.mvmtStsCd;
            if (socFlg == "Y" && mvmtStsCd == "XX") {
              $.alertDialog($.msgConvert(ESW00179, statusData.cntrNo + " is "));
            }

            if (usrId != "") {
              //							$("#stL_bkgNo").html(statusData.bkgNo);
              $("#stL_bkgNo").html(statusData.dspbkgNo);
              $("#stL_cntrNo").html(statusData.cntrNo);
              $("#stL_sealNo").html(statusData.sealNo);
              $("#stL_cntrTpszNm").html(
                statusData.cntrTpszCd + "<br>" + statusData.cntrTpszNm
              );
              $("#stL_eventDt").html(statusData.eventDt);
              $("#stL_statusNm").html(statusData.statusNm);
              $("#stL_placeNm").html(
                "<a href='JavaScript:void(0);' title='" +
                  statusData.placeNm +
                  "' onClick=openLocationPopup('" +
                  statusData.yardCd +
                  "') >" +
                  statusData.placeNm +
                  "</a>"
              );
              $("#stL_piece").html(statusData.piece);
              $("#stL_weight").html(statusData.weight);
              $("#stL_poNo").html(statusData.poNo);
              $("#stL_socFlg").html(statusData.socFlg == "Y" ? "YES" : "NO");
              $("#statusInfoLogin").show();
            } else {
              $("#st_cntrNo").html(statusData.cntrNo);
              $("#st_sealNo").html(statusData.sealNo);
              $("#st_cntrTpszNm").html(
                statusData.cntrTpszCd + "<br>" + statusData.cntrTpszNm
              );
              $("#st_eventDt").html(statusData.eventDt);
              $("#st_statusNm").html(statusData.statusNm);
              $("#st_placeNm").html(
                "<a href='JavaScript:void(0);' title='" +
                  statusData.placeNm +
                  "' onClick=openLocationPopup('" +
                  statusData.yardCd +
                  "') >" +
                  statusData.placeNm +
                  "</a>"
              );
              $("#st_piece").html(statusData.piece);
              $("#st_weight").html(statusData.weight);
              $("#st_poNo").html(statusData.poNo);
              $("#st_socFlg").html(statusData.socFlg == "Y" ? "YES" : "NO");
              $("#statusInfo").show();
            }

            var blNo = statusData.blNo;
            $("#blNo").val(blNo);
          }
        } else {
          $.alertDialog(CME00001 + "<br>" + data.Message);
        }
      },
    });
  };
  /**
   * Sailing 영역을 조회한다. <br>
   * <br><b>Example :</b>
   * <pre>
   *     selectSailingInfo( bkgNo );
   * </pre>
   * @param { String } 필수 bkgNo
   * @return 없음
   * @author LEEYISUK
   * @version 2011.12.08
   */
  selectSailingInfo = function (bkgNo) {
    $.ajax({
      url: "CUP_HOM_3301GS.do",
      dataType: "json",
      type: "POST",
      data: { f_cmd: SEARCHLIST04, bkg_no: bkgNo },
      success: function (data) {
        if (data.TRANS_RESULT_KEY == "S") {
          if (data.count > 0) {
            $("#sailingInfo").show();
            $("#sailing tbody").remove();
            var tbody = "<tbody>";
            $.each(data.list, function (idx, value) {
              tbody += setSailingTable(value);
              if (idx == data.count - 1) {
                pod = value.podCd;
              }
            });
            tbody += "</tbody>";
            $("#sailing").append(tbody);
          }
        }
      },
    });
  };
  /**
   * Detail 영역을 조회한다. <br>
   * <br><b>Example :</b>
   * <pre>
   *     selectDetailInfo( cntrNo, bkgNo, copNo  );
   * </pre>
   * @param { String } 필수 bkgNo
   * @param { String } 필수 bkgNo
   * @param { String } 필수 copNo
   * @return 없음
   * @author LEEYISUK
   * @version 2011.12.08
   */
  selectDetailInfo = function (cntrNo, bkgNo, copNo) {
    $.ajax({
      url: "CUP_HOM_3301GS.do",
      dataType: "json",
      type: "POST",
      data: {
        f_cmd: SEARCHLIST05,
        cntr_no: cntrNo,
        bkg_no: bkgNo,
        cop_no: copNo,
      },
      success: function (data) {
        if (data.TRANS_RESULT_KEY == "S") {
          if (data.count > 0) {
            $("#detailInfo").show();
            $("#detail tbody").remove();
            var tbody = "<tbody>";
            $.each(data.list, function (idx, value) {
              tbody += setDetailTable(idx, value);
            });
            tbody += "</tbody>";
            $("#detail").append(tbody);
          }
        }
      },
    });
  };
  /**
   * Cargo Tracking Comments History를 조회한다. <br>
   * <br><b>Example :</b>
   * <pre>
   *     selectCommentHistoryInfo( cntrNo, bkgNo, copNo );
   * </pre>
   * @param { String } 필수 cntrNo
   * @param { String } 필수 bkgNo
   * @param { String } 필수 copNo
   * @return 없음
   * @author Donghan Shin
   * @version 2020.06.04
   */
  selectCommentHistoryInfo = function (cntrNo, bkgNo, copNo) {
    $.ajax({
      url: "CUP_HOM_3301GS.do",
      dataType: "json",
      type: "POST",
      data: {
        f_cmd: SEARCHLIST09,
        cntr_no: cntrNo,
        bkg_no: bkgNo,
        cop_no: copNo,
      },
      success: function (data) {
        if (data.TRANS_RESULT_KEY == "S") {
          if (data.count > 0) {
            $("#commentInfo").show();
            //cutTitle
            $("#st_lstComment").html(
              cutTitle(data.list[data.count - 1].cmmnt, 70)
            );
            $("#st_lstComment").attr("title", data.list[data.count - 1].cmmnt);
            $("#st_rcntDate").html(data.list[data.count - 1].creDt);
            $("#st_rcntDate").attr("title", data.list[data.count - 1].creDt);
          }
        }
      },
    });
  };
  /**
   * CUP_HOM_3304 POPUP 호출 <br>
   * <br><b>Example :</b>
   * <pre>
   *     openLocationPopup( yardCd );
   * </pre>
   * @param { String } 필수 yardCd
   * @return boolean
   * @author LEEYISUK
   * @version 2011.12.08
   */
  openLocationPopup = function (yardCd) {
    $.popupWin("", "LocationPopup", { width: 800, height: 400, scrollbars: 1 });
    $("#frm").attr("action", "CUP_HOM_3304.do");
    $("#frm").attr("target", "LocationPopup");
    $("#sessLocale").val(CONFIGVALUE2);
    $("#ydCdParam").val(yardCd);
    $("#f_cmd").val("");
    $("#frm").submit();
    return false;
  };
  /**
   * CUP_HOM_3003 POPUP 호출 <br>
   * <br><b>Example :</b>
   * <pre>
   *     openVesselPopup( vslCd, skdVoyNo );
   * </pre>
   * @param { String } 필수 vslCd
   * @param { String } 필수 skdVoyNo
   * @return boolean
   * @author LEEYISUK
   * @version 2011.12.08
   */
  //	openVesselPopup=function(vslCd, skdVoyNo){
  //		$.popupWin("", "VesselPopup", {width:800, height:520, scrollbars:1});
  //		$("#frm").attr("action","CUP_HOM_3003.do");
  //		$("#frm").attr("target","VesselPopup");
  //		$("#sessLocale").val(CONFIGVALUE2);
  //		$("#vslCdParam").val(vslCd);
  //		$("#skdVoyNoParam").val(skdVoyNo);
  //		$("#f_cmd").val("");
  //		$("#frm").submit();
  //		return false;
  //	}
  /**
   * Magnifying glass button 에 Click Event를 처리한다.  <br>
   * <br><b>Example :</b>
   * <pre>
   *     $(object).click(
   *     	function(){
   *     	return false;
   *     });
   * </pre>
   * @param  없음
   * @return boolean
   * @author 신동한
   * @version 2020.06.17
   */
  $("#historySearch").click(function () {
    var cntrNo = $("#cntrNo").val();
    var bkgNo = $("#bkgNo").val();
    var copNo = $("#copNo").val();
    var sessLocale = CONFIGVALUE2;

    var params = {
      cntrNo: cntrNo,
      bkgNo: bkgNo,
      copNo: copNo,
      sessLocale: sessLocale,
    };

    var url = "CUP_HOM_3309.do";
    if (params != null) {
      url = url + "?" + jQuery.param(params);
    }
    $.popupWin(url, "Comment History", {
      width: 780,
      height: 610,
      scrollbars: 1,
    });
    return false;
  });
  $(document).delegate("a[data-click='vesselPop']", "click", function () {
    // --[OPUSECOM_NYK_CR_406] Masked,CSSM VVD_20150223 Nagane
    var vvd = $(this).attr("data-cd");
    var vvdNm = $(this).text();
    if (vvdNm.indexOf("To Be Nominated") == -1) {
      vvdNm = "";
    }

    //return false;
    var vslCd = vvd.substring(0, 4);
    var skdVoyNo = vvd.substring(4, 8);

    if ($("#vvdParam").length == 0) {
      $("#frm").append("<input type='hidden' name='vvdParam' id='vvdParam'/>");
    }
    if ($("#vvdNm").length == 0) {
      $("#frm").append("<input type='hidden' name='vvdNm' id='vvdNm'/>");
    }
    if ($("#vslCdParam").length == 0) {
      $("#frm").append(
        "<input type='hidden' name='vslCdParam' id='vslCdParam'/>"
      );
    }
    if ($("#skdVoyNoParam").length == 0) {
      $("#frm").append(
        "<input type='hidden' name='skdVoyNoParam' id='skdVoyNoParam'/>"
      );
    }

    $("#vvdNm").val(vvdNm);

    $.popupWin("", "VesselSchedulePopup", {
      width: 800,
      height: 750,
      scrollbars: 1,
    });
    $("#frm").attr("action", "CUP_HOM_3003.do");
    $("#frm").attr("target", "VesselSchedulePopup");
    //$("#sessLocale").val(CONFIGVALUE2);

    $("#vvdParam").val(vvd);

    $("#vslCdParam").val(vslCd);
    $("#skdVoyNoParam").val(skdVoyNo);

    $("#f_cmd").val("");
    $("#frm").submit();
    return false;
  });
  /**
   * MAIN GRID 에서 Container no 클릭시 해당 Container 화물 추척정보를 조회한다.  <br>
   * <br><b>Example :</b>
   * <pre>
   *     reloadPage( rowId, cntrNo, blNo, bkgNo, copNo, cntrFlg );
   * </pre>
   * @param { String } 필수 vslCd
   * @param { String } 필수 cntrNo
   * @param { String } 필수 blNo
   * @param { String } 필수 bkgNo
   * @param { String } 필수 copNo
   * @return boolean
   * @author LEEYISUK
   * @version 2011.12.08
   */
  reloadPage = function (rowId, cntrNo, blNo, bkgNo, copNo, cntrFlg) {
    $("#main-grid tr").css("background", "#FFFFFF");
    $("#main-grid tr[id=" + rowId + "]").css("background", "#faffd2"); // click line color --> yellow

    $("#blNo").val(blNo);
    $("#bkgNo").val(bkgNo);
    $("#cntrNo").val(cntrNo);
    $("#copNo").val(copNo);

    // main grid 를 제외한 모든 그리드 제거
    $("#trainInfo").hide();
    $("#boundInfo").hide();
    $("#houtboundinbound").hide();
    $("#outboundinbound").hide();
    $("#hinbound").hide();
    $("#inbound").hide();
    $("#houtbound").hide();
    $("#outbound").hide();
    $("#btnDetail").hide();
    $("#detailInfo").hide();
    $("#sailingInfo").hide();
    $("#statusInfo").hide();
    $("#statusInfoLogin").hide();
    $("#releaseInfo").hide();
    $("#commentInfo").hide();

    // CNTR NO 가 HJCU0000000 아닌 경우만 조회
    // CNTR FLG = 'N' 은 CNTR NO = 'HJCU0000000'
    //[나의 화물추적으로 추가][B/L 미리보기][A/N 미리보기] 로그인 상태에서만 활성화
    if (cntrFlg == "Y") {
      // 아래 버튼 모두 활성화

      if (!$.isEmpty(usrId)) {
        // 로그인 상태에서만 그래프하단 Add My Tracking 버튼 보여줌.
        if ($("#main-grid").getRowData(rowId).enblFlag == "N") {
          setButtonEnable2(false);
        } else {
          setButtonEnable2(true);
        }
      } else {
        setButtonEnable2(false);
      }

      selectContainerBarInfo(cntrNo, bkgNo, copNo); // Container bar
      selectSailingInfo(bkgNo); // Sailing
      selectCommentHistoryInfo(cntrNo, bkgNo, copNo); // Cargo Tracking Comments History
      selectDetailInfo(cntrNo, bkgNo, copNo); // Detail grid
      selectReleaseInfo(cntrNo, bkgNo); // Release
      selectRailTrackingInfo(copNo); //Rail Tracking Information
    } else if (cntrFlg == "N") {
      // CNTR FLG = 'N' (CNTR NO 가 HJCU0000000)
      // detail Add My Tracking 버튼 비활성화
      //	    	$("#btnAddMyTracking2").attr("disabled",true);
      //	    	$("#btnAddMyTracking2").addClass("jui-button-dis");
      selectSailingInfo(bkgNo); // Sailing
    }

    return false;
  };

  /**
   * 화물통지 리포트(CUP_HOM_3417)에서 호출된 해당 Container 화물 추척정보를 조회한다.  <br>
   * <br><b>Example :</b>
   * <pre>
   *     visibilityPage();
   * </pre>
   * @param  없음
   * @return boolean
   * @author LEEYISUK
   * @version 2011.12.08
   */
  visibilityPage = function () {
    var cntrNo = $("#cntrNo").val();
    var blNo = $("#blNo").val();
    var bkgNo = $("#bkgNo").val();
    var copNo = $("#copNo").val();

    selectStatusInfo(bkgNo, copNo, cntrNo); // Status
    selectContainerBarInfo(cntrNo, bkgNo, copNo); // Container bar
    selectSailingInfo(bkgNo); // Sailing
    selectDetailInfo(cntrNo, bkgNo, copNo); // Detail grid
    selectReleaseInfo(cntrNo, bkgNo); // Release
    selectRailTrackingInfo(copNo); //Rail Tracking Information
    return false;
  };

  /**
   * Main Grid Container No 항목 클릭시 reloadPage()로 링크처리한다.   <br>
   * <br><b>Example :</b>
   * <pre>
   *     cntrHtml(value, options, rowObject);
   * </pre>
   * @param { String } 필수 value
   * @param { optionObj } 필수 options
   * @param { Object } 필수 rowObject
   * @return { String }
   * @author LEEYISUK
   * @version 2011.12.08
   */
  cntrHtml = function (value, options, rowObject) {
    var rtn = "";

    if (value != null && !$.isEmpty(value)) {
      var rowData = $("#main-grid").jqGrid("getRowData", options.rowId);
      rtn =
        "<a href='JavaScript:void(0);' onClick=\"reloadPage(" +
        options.rowId +
        ",'" +
        rowObject.cntrNo +
        "','" +
        rowObject.blNo +
        "','" +
        rowObject.bkgNo +
        "','" +
        rowObject.copNo +
        "','" +
        rowObject.cntrFlg +
        "');\"  >" +
        value +
        "</a>";
    }
    return rtn;
  };

  socHtml = function (value, options, rowObject) {
    var rtn = "";

    if (rowObject.socFlg != null && !$.isEmpty(rowObject.socFlg)) {
      if (rowObject.socFlg == "Y") {
        rtn = "<input type='checkbox' checked disabled >";
      } else {
        rtn = "<input type='checkbox' disabled >";
      }
    }
    return rtn;
  };
  /**
   * Main Grid Place 항목 클릭시 openLocationPopup()로 링크처리한다.  <br>
   * <br><b>Example :</b>
   * <pre>
   *     placeHtml(value, options, rowObject);
   * </pre>
   * @param { String } 필수 value
   * @param { optionObj } 필수 options
   * @param { Object } 필수 rowObject
   * @return { String }
   * @author LEEYISUK
   * @version 2011.12.08
   */
  placeHtml = function (value, options, rowObject) {
    var rtn = "";
    if (value != null && !$.isEmpty(value)) {
      var rowData = $("#main-grid").jqGrid("getRowData", options.rowId);
      rtn =
        "<a href='JavaScript:void(0);' onClick=\"openLocationPopup('" +
        rowObject.yardCd +
        "');\"  >" +
        rowObject.yardNm +
        "</a>";
    }
    return rtn;
  };

  var grid = $("#main-grid");
  /**
   * (Main Grid) jqGrid 한다.  <br>
   * <br><b>Example :</b>
   * <pre>
   * </pre>
   * @param  없음
   * @return 없음
   * @author LEEYISUK
   * @version 2011.12.08
   */
  $("#main-grid").jqGrid({
    url: "CUP_HOM_3301GS.do",
    datatype: "data",
    width: 800,
    height: 230,
    loadui: "disable",
    colNames: [
      "",
      "Booking No.",
      "Container No.",
      "S.O.C",
      "Seal No.",
      "Size",
      "Event Date / Time ",
      "Status",
      "Place",
      "Weight",
      "Purchase Order No",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    colModel: [
      { name: "ibflg", index: "ibflg", hidden: true },
      //		{name:'bkgNo',		index:'bkgNo', 			width:80, 		align:"center", sorttype:"text"}, // chrome browser 의 사이즈를 위해 조정함(신용찬, 75-->80)
      //2013-03-28 added 김기택
      {
        name: "dspbkgNo",
        index: "dspbkgNo",
        width: 120,
        align: "center",
        sorttype: "text",
      }, // chrome browser 의 사이즈를 위해 조정함(신용찬, 75-->80)
      {
        name: "cntrNo",
        index: "cntrNo",
        width: 120,
        align: "center",
        sorttype: "text",
        formatter: cntrHtml,
      },
      {
        name: "socFlgV",
        index: "socFlgV",
        width: 60,
        align: "center",
        sorttype: "text",
        formatter: socHtml,
      },
      {
        name: "sealNo",
        index: "sealNo",
        width: 180,
        align: "center",
        sorttype: "text",
      },
      {
        name: "cntrTpszNm",
        index: "cntrTpszNm",
        width: 110,
        align: "center",
        sorttype: "text",
      },
      {
        name: "eventDt",
        index: "eventDt",
        width: 120,
        align: "center",
        sorttype: "text",
      },
      {
        name: "statusNm",
        index: "statusNm",
        width: 200,
        align: "center",
        sorttype: "text",
      },
      {
        name: "placeNm",
        index: "placeNm",
        width: 250,
        align: "left",
        sorttype: "text",
        formatter: placeHtml,
      },
      {
        name: "weight",
        index: "weight",
        width: 150,
        align: "right",
        sorttype: "text",
      },
      {
        name: "poNo",
        index: "poNo",
        width: 130,
        align: "center",
        sorttype: "text",
      },
      { name: "blNo", index: "blNo", hidden: true },
      { name: "copNo", index: "copNo", hidden: true },
      { name: "yardCd", index: "yardCd", hidden: true },
      { name: "cntrFlg", index: "cntrFlg", hidden: true },
      { name: "enblFlag", index: "enblFlag", hidden: true },
      { name: "mvmtStsCd", index: "mvmtStsCd", hidden: true },
      { name: "socFlg", index: "socFlg", hidden: true },
    ],
    multiselect: true,
    shrinkToFit: false,
    rowNum: ROWNUM,
    editurl: "CUP_HOM_3301.do",
    recordpos: "right",
    viewrecords: true,
    emptyrecords: "No Records",
    jsonReader: {
      remoteSort: true,
      repeatitems: false,
      root: "list",
      records: "count",
      id: "0",
    },
    loadError: function (error) {
      $("#progress-modal").closeWait();
      $.errorSessionDisconnected(error);
    },
    loadComplete: function (data) {
      if (data) {
        if ($.errorServerMessage(data)) {
          $("#progress-modal").closeWait();
          return;
        }

        $(".jui-total").show();
        $("#totCnt").text(data.count);

        if (data.count == "1") {
          var ids = $("#main-grid").jqGrid("getDataIDs");
          var rowData = null;
          $.each(ids, function (idx, obj) {
            rowData = $("#main-grid").jqGrid("getRowData", obj);
            var cntrNo = $(rowData.cntrNo).html();
            var bkgNo = rowData.dspbkgNo;
            var blNo = rowData.blNo;
            var copNo = rowData.copNo;
            var cntrFlg = rowData.cntrFlg;
            var socFlg = rowData.socFlg;
            var mvmtStsCd = rowData.mvmtStsCd;

            if (socFlg == "Y" && mvmtStsCd == "XX") {
              $.alertDialog($.msgConvert(ESW00179, cntrNo + " is "));
            }
            reloadPage(idx, cntrNo, blNo, bkgNo, copNo, cntrFlg);
          });
        } else {
          var alertCntrNo = "";
          var ids = $("#main-grid").jqGrid("getDataIDs");
          var rowData = null;
          $.each(ids, function (idx, obj) {
            rowData = $("#main-grid").jqGrid("getRowData", obj);
            var cntrNo = $(rowData.cntrNo).html();
            var socFlg = rowData.socFlg;
            var mvmtStsCd = rowData.mvmtStsCd;
            if (socFlg == "Y" && mvmtStsCd == "XX") {
              if (idx == 0) {
                alertCntrNo += cntrNo;
              } else {
                alertCntrNo += " ," + cntrNo;
              }
            }
          });
          if (alertCntrNo != "") {
            $.alertDialog($.msgConvert(ESW00179, alertCntrNo + " are "));
          }
        }

        $("#main-grid").jqGrid("setGridParam", {
          datatype: "local",
          data: data.list,
        });

        //				$( "#main-grid" ).jqGrid( "setGridParam", { datatype:"local", data:data.list } );
        // cntrFlg = N 이면 메인 체크박스 비활성화 로직 삭제 요청_SR0022999
        /*				for(i=0;i<data.count;i++){
                       //var cbs = $("tr.jqgrow > td > input.cbox", grid[0]);
                       if(data.list[i].cntrFlg=='N'){
                           $("#jqg_main-grid_"+(i+1)).attr("disabled",true);
                       }else{
                           $("#jqg_main-grid_"+(i+1)).attr("disabled",false);
                       }
                   }*/
        $.jqGridLoadComplete(this);
      }
      $("#progress-modal").closeWait();
    },
    onSelectRow: function (id) {
      if (id && id != lastsel) {
        if ($("#jqg_main-grid_" + id).attr("disabled") == "disabled") {
          $("#jqg_main-grid_" + id).attr("checked", false);
          $("#main-grid").jqGrid("resetSelection");
          id = 0;
          return false;
        }
        jQuery("#main-grid").jqGrid("saveRow", lastsel);
        lastsel = id;
      }
      checkEnblFlag();
    },
    beforeSelectRow: function (rowid, e) {
      var cbsdis = $(
        "tr#" + rowid + ".jqgrow > td > input.cbox:disabled",
        grid[0]
      );
      if (cbsdis.length === 0) {
        return true; // allow select the row
      } else {
        return false; // not allow select the row
      }
    },
    onSelectAll: function (aRowids, status) {
      if (status) {
        // uncheck "protected" rows
        var cbs = $("tr.jqgrow > td > input.cbox:disabled", grid[0]);
        cbs.removeAttr("checked");

        //modify the selarrrow parameter
        grid[0].p.selarrrow = grid
          .find("tr.jqgrow:has(td > input.cbox:checked)")
          .map(function () {
            return this.id;
          }) // convert to set of ids
          .get(); // convert to instance of Array
      }
      checkEnblFlag();
    },
  });

  /**
   * Main Grid 하단에 있는 AddMyTracking button에 Click EVENT를 처리한다.  <br>
   * <br><b>Example :</b>
   * <pre>
   *     $(object).click(
   *     	function(){
   *     	return false;
   *     });
   * </pre>
   * @param  없음
   * @return boolean
   * @author LEEYISUK
   * @version 2011.12.08
   */
  $("#btnAddMyTracking").click(function () {
    var ids = $("#main-grid").jqGrid("getGridParam", "selarrrow");
    if (ids.length > 0) {
      var rowData = "";
      var grid_ibflag = [];
      var grid_usrId = [];
      var grid_trakNo = [];
      var grid_trakNoTpCd = [];

      var isSelected = true; //2012.01.05 허철용 추가

      $.each(ids, function (idx, value) {
        //alert(value);
        if (value == "noDataBlankRow") {
          isSelected = false;
          return false;
        }

        rowData = $("#main-grid").jqGrid("getRowData", value);
        if (usrId == "") {
          alert("Please log in first in order to add my tracking.");
        }
        if (
          $(rowData.cntrNo).html() != null &&
          $(rowData.cntrNo).html() != "Not Assigned"
        ) {
          grid_ibflag.push("I");
          grid_usrId.push(usrId);
          grid_trakNo.push($(rowData.cntrNo).html());
          grid_trakNoTpCd.push("C");
        } else {
          grid_ibflag.push("I");
          grid_usrId.push(usrId);
          grid_trakNo.push(rowData.dspbkgNo);
          grid_trakNoTpCd.push("B");
        }
      });

      if (isSelected == false) {
        $.alertDialog(CMW00002);
        return false;
      }

      $.ajax({
        url: "CUP_HOM_3307GS.do",
        dataType: "json",
        type: "POST",
        data: {
          f_cmd: MULTI,
          list_usr_id: grid_usrId,
          list_ibflag: grid_ibflag,
          list_trak_no: grid_trakNo,
          list_trak_no_tp_cd: grid_trakNoTpCd,
        },
        success: function (data) {
          if (data.TRANS_RESULT_KEY == "S") {
            //2012.01.06 허철용 추가
            //페이지 중앙이 아닌 화면의 중앙에 팝업이 보이도록 수정
            var layerWidth = 600;
            var layerHeight = 260;
            var layerTop =
              $(window).scrollTop() + ($(window).height() - layerHeight) / 2;
            if (layerTop < 1) {
              layerTop = 10;
            }
            var layerLeft =
              $(window).scrollLeft() + ($(window).width() - layerWidth) / 2;
            if (layerLeft < 1) {
              layerLeft = 10;
            }

            $.popupLayer({
              type: "iframe",
              modal: true,
              draggable: true,
              left: layerLeft,
              top: layerTop,
              width: layerWidth,
              height: layerHeight,
              open: function (target, obj) {
                $("#sessLocale").val(CONFIGVALUE2);
                $("#frm").attr("target", obj.attr("id"));
                $("#frm").attr("action", "CUP_HOM_3246.do");
                $("#frm").attr("method", "post");
                $("#f_cmd").val("");
                $("#frm").submit();
              },
            });

            return false;
          }
        },
      });
    } else {
      $.alertDialog(CMW00002);
    }
    return false;
  });
  /**
   * AddMyTracking button에 Click EVENT를 처리한다.  <br>
   * <br><b>Example :</b>
   * <pre>
   *     $(object).click(
   *     	function(){
   *     	return false;
   *     });
   * </pre>
   * @param  없음
   * @return boolean
   * @author LEEYISUK
   * @version 2011.12.08
   */
  $("#btnAddMyTracking2").click(function () {
    if (usrId == "") {
      alert("Please log in first in order to add my tracking.");
    }
    var grid_ibflag = ["I"];
    var grid_usrId = [usrId];
    var grid_trakNo = [$("#cntrNo").val()];
    var grid_trakNoTpCd = ["C"];

    $.ajax({
      url: "CUP_HOM_3307GS.do",
      dataType: "json",
      type: "POST",
      data: {
        f_cmd: MULTI,
        list_usr_id: grid_usrId,
        list_ibflag: grid_ibflag,
        list_trak_no: grid_trakNo,
        list_trak_no_tp_cd: grid_trakNoTpCd,
      },
      success: function (data) {
        if (data.TRANS_RESULT_KEY == "S") {
          //2012.01.06 허철용 추가
          //페이지 중앙이 아닌 화면의 중앙에 팝업이 보이도록 수정
          var layerWidth = 600;
          var layerHeight = 260;
          var layerTop =
            $(window).scrollTop() + ($(window).height() - layerHeight) / 2;
          if (layerTop < 1) {
            layerTop = 10;
          }
          var layerLeft =
            $(window).scrollLeft() + ($(window).width() - layerWidth) / 2;
          if (layerLeft < 1) {
            layerLeft = 10;
          }

          $.popupLayer({
            type: "iframe",
            modal: true,
            draggable: true,
            left: layerLeft,
            top: layerTop,
            width: layerWidth,
            height: layerHeight,
            open: function (target, obj) {
              $("#sessLocale").val(CONFIGVALUE2);
              $("#frm").attr("target", obj.attr("id"));
              $("#frm").attr("action", "CUP_HOM_3246.do");
              $("#frm").attr("method", "post");
              $("#f_cmd").val("");
              $("#frm").submit();
            },
          });

          return false;
        }
      },
    });

    return false;
  });

  /**
   * Main Grid Download button에 Click EVENT를 처리한다.  <br>
   * <br><b>Example :</b>
   * <pre>
   *     $(object).click(
   *     	function(){
   *     	return false;
   *     });
   * </pre>
   * @param  없음
   * @return boolean
   * @author LEEYISUK
   * @version 2011.12.08
   */
  $("#btnDownload0").click(function () {
    var header = {
      titleColumn: [
        { columnName: "Booking No.", rowSpan: 0, colSpan: 0, line: "S" },
        { columnName: "Container No.", rowSpan: 0, colSpan: 0, line: "" },
        { columnName: "Seal No.", rowSpan: 0, colSpan: 0, line: "" },
        { columnName: "Size", rowSpan: 0, colSpan: 0, line: "" },
        { columnName: "Event Date / Time", rowSpan: 0, colSpan: 0, line: "" },
        { columnName: "Status", rowSpan: 0, colSpan: 0, line: "" },
        { columnName: "Place", rowSpan: 0, colSpan: 0, line: "" },
        { columnName: "Weight", rowSpan: 0, colSpan: 0, line: "" },
        { columnName: "Purchase Order No", rowSpan: 0, colSpan: 0, line: "E" },
      ],
    };

    var dataCol = new Array(9);
    dataCol[0] = "dspbkgNo";
    dataCol[1] = "cntrNo";
    dataCol[2] = "sealNo";
    dataCol[3] = "cntrTpszNm";
    dataCol[4] = "eventDt";
    dataCol[5] = "statusNm";
    dataCol[6] = "placeNm";
    dataCol[7] = "weight";
    dataCol[8] = "poNo";

    $(this).downloadJsonForExcel({
      dataType: "grid",
      target: "main-grid",
      excelColumn: header,
      dataColumn: dataCol,
      downloadName: "Track and Trace - Single Booking",
    });
    return false;
  });
  /**
   * Detail Download button에 Click EVENT를 처리한다.  <br>
   * <br><b>Example :</b>
   * <pre>
   *     $(object).click(
   *     	function(){
   *     	return false;
   *     });
   * </pre>
   * @param  없음
   * @return boolean
   * @author LEEYISUK
   * @version 2011.12.08
   */
  $("#btnDownload1").click(function () {
    var copNo = $("#copNo").val();
    var bkgNo = $("#bkgNo").val();
    var cntrNo = $("#cntrNo").val();
    var ibflag = "E"; //Excel
    $("#f_cmd").val(SEARCHLIST);

    var parm = {
      f_cmd: SEARCHLIST05,
      cop_no: copNo,
      bkg_no: bkgNo,
      cntr_no: cntrNo,
      ibflag: ibflag,
    };

    var header = {
      titleColumn: [
        { columnName: "No", rowSpan: 0, colSpan: 0, line: "S" },
        { columnName: "Status", rowSpan: 0, colSpan: 0, line: "" },
        { columnName: "Location", rowSpan: 0, colSpan: 0, line: "" },
        { columnName: "Event Date", rowSpan: 0, colSpan: 0, line: "E" },
      ],
    };

    var dataCol = new Array(4);
    var idx = "";
    dataCol[0] = "no";
    dataCol[1] = "statusNm";
    dataCol[2] = "placeNm";
    dataCol[3] = "eventDt";

    $(this).downloadJsonForExcelForCargoDetail({
      dataType: "db",
      target: "detail",
      url: "CUP_HOM_3301GS.do",
      paramData: parm,
      excelColumn: header,
      dataColumn: dataCol,
      downloadName: "Track and Trace - Single Booking Detail",
      combinedColumn: ["eventDt_actTpCd_[_]"],
      addTxtColorColumn: ["actTpCd_E_<font color='blue'>_</font>"],
      footerHtml:
        "<font color='blue'>[E] Estimated Schedule</font>, [A] Actual Schedule",
    });
    return false;
  });
  /**
   * B/L View button 에 Click Event를 처리한다.  <br>
   * <br><b>Example :</b>
   * <pre>
   *     $(object).click(
   *     	function(){
   *     	return false;
   *     });
   * </pre>
   * @param  없음
   * @return boolean
   * @author LEEYISUK
   * @version 2011.12.08
   */
  $("#btnANView").click(function () {
    fnAnPrint();
    return false;
  });
  /**
   * Arrival Notice Print button 에 Click Event를 처리한다.  <br>
   * <br><b>Example :</b>
   * <pre>
   *     $(object).click(
   *     	function(){
   *     	return false;
   *     });
   * </pre>
   * @param  없음
   * @return boolean
   * @author LEEYISUK
   * @version 2011.12.08
   */
  $("#btnBLView").click(function () {
    fnblPrint();
    return false;
  });
  /**
   * Arrival Notice Print Popup 을 호출한다.<br>
   * <br><b>Example :</b>
   * <pre>
   *     fnAnPrint();
   * </pre>
   * @param  없음
   * @return boolean
   * @author LEEYISUK
   * @version 2011.12.08
   */
  // Arrival Notice Print
  fnAnPrint = function () {
    $(".popup_mask").addClass("progress");
    var bkgNo = [$("#bkgNo").val()];
    var podCd = [pod];
    $.ajax({
      dataType: "json",
      type: "POST",
      url: "CUP_HOM_3230GS.do",
      data: {
        f_cmd: PRINT,
        sheet1_bkg_no: bkgNo,
        sheet1_pod_cd: podCd,
      },

      success: function (data) {
        $(".popup_mask").removeClass("progress");
        if (data.TRANS_RESULT_KEY == "S") {
          if (data.count != null) {
            var url = pdfUrl + data.list[0].fileNm;
            //$.popupWin( url , "pdfPopup", { width:"800", height:"600" });
            var popLeft = (screen.availWidth - 800) / 2;
            var popTop = (screen.availHeight - 600) / 2;
            var winPop1 = window.open(
              "",
              "pdfPopup",
              "width=800,height=600,left=" +
                popLeft +
                ",top=" +
                popTop +
                ",resizable=no"
            );
            //$.popupWin( url , "pdfPopup", { width:"800", height:"600" } );
            if (!$("#frm1") || $("#frm1").length <= 0) {
              var html = "<form method='post' name='frm1' id='frm1'>";
              html +=
                "<input type='hidden' name='pdfFileUrl' id='pdfFileUrl' value='" +
                url +
                "'/>";
              html += "</form>";
              $("body").append(html);

              $("#frm1").attr("action", "pdfPopView.jsp");
              $("#frm1").attr("target", "pdfPopup");
              $("#frm1").submit();
            } else {
              $("#frm1 #pdfFileUrl").val(url);
              //alert($("#pdfFileUrl").val());
              $("#frm1").attr("action", "pdfPopView.jsp");
              $("#frm1").attr("target", "pdfPopup");
              $("#frm1").submit();
            }

            winPop1.focus();
          }
        } else {
          $.alertDialog(CMI00003);
        }
      },
      error: function (x, e) {
        //에러화면
        $(".popup_mask").removeClass("progress");
        $.alertDialog(CMI00003, { zIndex: 3999, use: "warn" });
        //$( "#popCon [id='ibflg']" ).val( "I" );
      },
    });
    return false;
  };
  /**
   * B/L View Popup을 호출한다.  <br>
   * <br><b>Example :</b>
   * <pre>
   *     fnblPrint();
   * </pre>
   * @param  없음
   * @return boolean
   * @author LEEYISUK
   * @version 2011.12.08
   */
  // B/L View
  fnblPrint = function () {
    $(".popup_mask").addClass("progress");
    var blNo = [$("#blNo").val()];
    var bkgNo = [$("#bkgNo").val()];
    var blKind = ["D"]; //Draft는 D , Waybill W, OBL O
    var langOpt = [];
    //var chgType = [];  선택 Y/N

    var tmpLang = "en";
    if (selLang == "ko") {
      tmpLang = "kr";
    } else if (selLang == "zh") {
      tmpLang = "cn";
    }
    langOpt.push(tmpLang);

    $.ajax({
      url: "CUP_HOM_3230GS.do",
      dataType: "json",
      type: "POST",
      data: {
        f_cmd: SEARCH01,
        bkg_no: bkgNo,
        form_type: 7,
        view_number: 3218,
        bl_no: blNo,
        bl_kind: blKind,
        lang_opt: langOpt,
      },
      success: function (data) {
        $(".popup_mask").removeClass("progress");
        if (data.TRANS_RESULT_KEY == "S") {
          if (data.count > 0) {
            pdfOpen(data.list[0].rdFileKey);
          }
        } else {
          $.alertDialog(CMI00003);
        }
      },
      error: function (e) {
        $(".popup_mask").removeClass("progress");
        $.alertDialog(CME00001);
      },
    });
    return false;
  };
  /**
   * Detail button 에 Click Event를 처리한다.  <br>
   * <br><b>Example :</b>
   * <pre>
   *     $(object).click(
   *     	function(){
   *     	return false;
   *     });
   * </pre>
   * @param  없음
   * @return boolean
   * @author LEEYISUK
   * @version 2011.12.08
   */
  $("#btnDetail").click(function () {
    var copNo = $("#copNo").val();
    var cntrNo = $("#cntrNo").val();
    var outArrName = $("#outArrName").val();
    var sessLocale = CONFIGVALUE2;

    var params = {
      copNo: copNo,
      cntrNo: cntrNo,
      sessLocale: sessLocale,
      outArrName: outArrName,
    };

    var url = "CUP_HOM_3303.do";
    if (params != null) {
      url = url + "?" + jQuery.param(params);
    }
    $.popupWin(url, "detail", { width: 800, height: 440, scrollbars: 1 });
    return false;
  });
  /**
   * Service Provider Information button 에 Click Event를 처리한다.  <br>
   * <br><b>Example :</b>
   * <pre>
   *     $(object).click(
   *     	function(){
   *     	return false;
   *     });
   * </pre>
   * @param  없음
   * @return boolean
   * @author LEEYISUK
   * @version 2011.12.08
   */
  $("#btnServiceProviderInfomation").click(function () {
    var bkgNo = $("#bkgNo").val();
    var cntrNo = $("#cntrNo").val();
    var sessLocale = CONFIGVALUE2;

    var params = { bkgNo: bkgNo, cntrNo: cntrNo, sessLocale: sessLocale };

    var url = "CUP_HOM_3305.do";
    if (params != null) {
      url = url + "?" + jQuery.param(params);
    }
    $.popupWin(url, "serviceProviderInfomation", {
      width: 800,
      height: 420,
      scrollbars: 1,
    });
    return false;
  });

  // 20150123 BDH 추가 : main 에서 조회되는경우 select box 셋팅 end
  /* 30초에 5번 이상 실행 시 captcha 오픈 */
  captchaOption(60, 10, "btnSearch", searchSchedule, "CUP_HOM_3301.do");

  $(document).ready(function () {
    if (captchaParam != undefined && captchaParam != "") {
      captchaParamData(captchaParam);
      $("#searchType").val(captchaData["searchType"]);

      if (captchaData["searchName"] != undefined) {
        $("#searchName").val(captchaData["searchName"]);
      }

      if (captchaData["trakNoParam"] != undefined) {
        $("#searchName").val(captchaData["trakNoParam"]);
      }
      searchSchedule();
    }
  });

  if (isFromMyTrk == "Y") {
    $("#btnSearch").trigger("click");
  }

  if (
    ((trakNoTpCdParam == "B" ||
      trakNoTpCdParam == "C" ||
      trakNoTpCdParam == "P") &&
      trakNoParam != "") ||
    (trakNoTpCdParam == "V" && bkgNoParam != "") ||
    cntrNoParam != "" ||
    copNoParam != "" ||
    blNoParam != ""
  ) {
    var searchType = $("#searchType").val();
    var searchName = $("#searchName").val();
    if (searchType != "" && searchName != "") {
      if (trakNoTpCdParam == "V") {
        visibilityPage();
      } else {
        $("#btnSearch").trigger("click");
      }
    }
  }

  // 20150123 BDH 추가 : main 에서 조회되는경우 select box 셋팅 start
  if (trakNoTpCdParam == "") {
    srchName = $("#searchName").val();
    if (srchName != "") {
      var tmpSrhName = srchName.split("\n");
      var bCnt = 0;
      var cCnt = 0;
      /*for( var i = 0; i != tmpSrhName.length; ++i ) {
                   if(tmpSrhName[i].length > 11) bCnt++;
                   else cCnt++;
               }
               if(bCnt != 0 && cCnt != 0)
               {*/
      //				$("#searchType").append("<option value='A' selected>All</option>");
      /*}else if(bCnt != 0 && cCnt == 0)
               {
                   $("#searchType").find("option:eq(0)").attr("selected", true);
               }else {$("#searchType").find("option:eq(1)").attr("selected", true);}*/
      $("#searchType option").each(function (idx) {
        if ($(this).val() == "A") {
          $(this).attr("selected", "selected");
          return false;
        }
      });
      searchSchedule();
    }
  }

  $.fn.downloadJsonForExcelForCargoDetail = function (options) {
    var self = this,
      excelData = "<table border='1' cellpadding='0' cellspacing='0'>";
    var settings = {
      dataType: "db", //db or grid
      url: "",
      paramData: {},
      excelColumn: {},
      dataColumn: [],
      alignColumn: [],
      startIndex: 0,
      downloadName: "",
      combinedColumn: [], //형식 : 대상컬럼_병합컬럼_(생략가능 : 감쌀 괄호, 구분자 _, e.g : {_}, [_] )] example : ["a-b-[-]", "c-d-(-)"]
      addTxtColor: [], // 형식 : 대상컬럼_값_시작태그_종료태그 example : ["a_C_<font color='red'>_</font>","b_D_<font color='blue'>_</font>"]
      footerHtml: "",
    };
    settings = $.extend(settings, options);

    var title = settings.excelColumn,
      th = "",
      colspan = "",
      rowspan = "";

    var combinedColumn = settings.combinedColumn;

    $.each(title.titleColumn, function (index, item) {
      var f = "",
        r = "",
        c = "",
        e = "";
      if (item.colSpan > 0) {
        c = "colspan='" + item.colSpan + "'";
      }
      if (item.rowSpan > 0) {
        r = "rowspan='" + item.rowSpan + "'";
      }
      if (item.line) {
        if (item.line.indexOf("S") != -1) {
          f = "<tr>";
        }
        if (item.line.indexOf("E") != -1) {
          e = "</tr>";
        }
      }

      th = f + "<th " + c + " " + r + ">" + item.columnName + "</th>" + e;
      excelData += th;
    });
    $(".popup_mask").addClass("progress");
    setTimeout(function () {
      $.getJSON(settings.url, settings.paramData, function (data) {
        if (data.count > 0) {
          $.each(data.list, function (index, item) {
            var dataStr = "<tr>";
            for (var i = 0; i < settings.dataColumn.length; i++) {
              $.each(item, function (key, value) {
                if (settings.dataColumn[i] == key) {
                  var startTag = "";
                  var endTag = "";

                  var alignText = "";
                  if (
                    settings.alignColumn &&
                    settings.alignColumn[i] &&
                    settings.alignColumn[i] != ""
                  ) {
                    alignText = 'class="' + settings.alignColumn[i] + '"';
                  }
                  if (combinedColumn && combinedColumn.length > 0) {
                    for (var j = 0; j < combinedColumn.length; j++) {
                      if (combinedColumn[j]) {
                        var combinedCol = combinedColumn[j].split("_");
                        if (combinedCol[0] == key) {
                          var tgtCol = combinedCol[1];
                          var comVal = item[tgtCol];
                          if (!item["eventDt"] && tgtCol == "actTpCd") {
                            comVal = "";
                          } else {
                            var addTxtColorColumn = settings.addTxtColorColumn;
                            if (
                              addTxtColorColumn &&
                              addTxtColorColumn.length > 0
                            ) {
                              for (
                                var k = 0;
                                k < addTxtColorColumn.length;
                                k++
                              ) {
                                var splitVals = addTxtColorColumn[k].split("_");
                                if (splitVals[0] == tgtCol) {
                                  if (comVal == splitVals[1]) {
                                    startTag = splitVals[2];
                                    endTag = splitVals[3];
                                  } else {
                                    startTag = "";
                                    endTag = "";
                                  }
                                  break;
                                }
                              }
                            }
                            var tmpVal = "";
                            if (combinedCol[2] && combinedCol[3]) {
                              tmpVal =
                                combinedCol[2] +
                                comVal +
                                combinedCol[3] +
                                " " +
                                value;
                            } else {
                              tmpVal = comVal + " " + value;
                            }
                            value = tmpVal;
                            break;
                          }
                        }
                      } else {
                        continue;
                      }
                    }
                  } else {
                    var addTxtColorColumn = settings.addTxtColorColumn;
                    if (addTxtColorColumn && addTxtColorColumn.length > 0) {
                      for (var k = 0; k < addTxtColorColumn.length; k++) {
                        var splitVals = addTxtColorColumn[k].split("_");
                        if (splitVals[0] == key) {
                          if (value == splitVals[1]) {
                            startTag = splitVals[2];
                            endTag = splitVals[3];
                          } else {
                            startTag = "";
                            endTag = "";
                          }
                          break;
                        }
                      }
                    }
                  }
                  dataStr =
                    dataStr +
                    "<td " +
                    alignText +
                    " >" +
                    startTag +
                    value +
                    endTag +
                    "</td>";
                }
              });
            }
            dataStr = dataStr + "</tr>";
            excelData += dataStr;
          });
        } else {
        }
        excelData += "</table>";

        var footerHtml = settings.footerHtml;
        if (footerHtml) {
          excelData += "<table border='0' cellpadding='0' cellspacing='0'>";
          excelData +=
            "<tr><td colspan='" +
            (settings.dataColumn.length ? settings.dataColumn.length : 1) +
            "'>&nbsp;</td></tr>";
          excelData +=
            "<tr><td colspan='" +
            (settings.dataColumn.length ? settings.dataColumn.length : 1) +
            "'>" +
            footerHtml +
            "</td></tr>";
          excelData += "</table>";
        }
      }).complete(function () {
        if ($("div#fileDownIfm").length < 1) {
          $("body").append(
            "<div id='fileDownIfm' style='position:absolute;top:-1000px;left:-1000px;'/>"
          );
          var iframe = $(
            "<iframe name='tmpDownIfm' id='tmpDownIfm' src='about:none' />"
          );
          $("div#fileDownIfm").append(iframe);
        }
        var tmpFrm = $("<form />")
          .attr({
            id: "tempDownFrm",
            name: "tempDownFrm",
            action: "excelDownload.jsp",
            method: "POST",
            target: "tmpDownIfm",
          })
          .append("<input type='hidden' name='excelData' id='excelData' />")
          .append(
            "<input type='hidden' name='downLoadName' id='downLoadName' />"
          );
        $("body").append(tmpFrm);
        $("#excelData").val(excelData);
        $("#downLoadName").val(settings.downloadName);
        $("#tempDownFrm").submit();
        $.blockingClickClear();
        $(".popup_mask").removeClass("progress");
      });
    }, 1);
  };
})(jQuery);

function fileDownLoad() {
  ComDownLoad("captcha.do", "Request=fileDownload&fileName=Cargo Tracking.pdf");
}
