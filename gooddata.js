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
