let oTools,
    nrReady,
    sModeLabel = "Show HTML",
    aEditors = [];
    rId = /\d+$/,
    oToolsReq = new XMLHttpRequest(),
    customCommands = {
        "printDoc": function (oDoc) {
            if (!validateMode(oDoc)) { return; }
            var oPrntWin = window.open("","_blank","width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
            oPrntWin.document.open();
            oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + oDoc.innerHTML + "<\/body><\/html>");
            oPrntWin.document.close();
        },
        "cleanDoc": function (oDoc) {
            if (validateMode(oDoc) && confirm("Are you sure?")) { oDoc.innerHTML = ""; };
        },
        "createLink": function (oDoc) {
            var sLnk = prompt("Write the URL here", "http:\/\/");
            if (sLnk && sLnk !== "http://"){ formatDoc(oDoc, "createlink", sLnk); }
        }
    };

oToolsReq.onload = toolsReady;
oToolsReq.open("GET", "rich-text-tools.json", true);
oToolsReq.send(null);
window.addEventListener ? addEventListener("load", documentReady, false) : window.attachEvent ? attachEvent("onload", documentReady) : window.onload = documentReady;
