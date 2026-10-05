```javascript
let outpassID = "";
let parentApproved = false;
let wardenApproved = false;

let outTime = "";
let inTime = "";


// Go to Student Section

function showStudent() {

    document.getElementById("student")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// Submit Request

function submitRequest() {

    let name =
        document.getElementById("studentName").value;

    let regNo =
        document.getElementById("registerNo").value;

    let type =
        document.getElementById("leaveType").value;

    let date =
        document.getElementById("leaveDate").value;

    let returnDate =
        document.getElementById("returnDate").value;

    let reason =
        document.getElementById("reason").value;


    if (
        name === "" ||
        regNo === "" ||
        date === "" ||
        returnDate === "" ||
        reason === ""
    ) {

        alert("Please fill all details.");

        return;
    }


    // Generate unique outpass ID

    outpassID =
        "OUT" +
        Date.now().toString().slice(-6);


    alert(
        "Outpass request submitted!\n\n" +
        "Outpass ID: " + outpassID
    );


    document.getElementById("parentStatus")
        .innerText =
        "Waiting for Parent Approval";


    // Automatically generate demo OTP

    document.getElementById("otp")
        .value = "123456";

}


// Parent OTP Verification

function verifyOTP() {

    let otp =
        document.getElementById("otp").value;


    if (otp === "123456") {

        parentApproved = true;

        document.getElementById("otpStatus")
            .innerText =
            "✓ Parent approved successfully.";

        document.getElementById("parentStatus")
            .innerText =
            "✓ Parent Approved";

    }

    else {

        document.getElementById("otpStatus")
            .innerText =
            "❌ Invalid OTP";

    }

}


// Warden Approval

function approveRequest() {

    if (!parentApproved) {

        alert(
            "Parent approval is required first."
        );

        return;
    }


    wardenApproved = true;


    document.getElementById("wardenStatus")
        .innerText =
        "✓ Outpass approved by Warden";


    generateQR();

}


// Generate QR Code

function generateQR() {

    document.getElementById("qrcode")
        .innerHTML = "";


    new QRCode(
        document.getElementById("qrcode"),
        {
            text: outpassID,
            width: 180,
            height: 180
        }
    );


    let name =
        document.getElementById("studentName").value;

    let type =
        document.getElementById("leaveType").value;


    document.getElementById("qrStudent")
        .innerText =
        name;


    document.getElementById("qrDetails")
        .innerText =
        type +
        " | Outpass ID: " +
        outpassID;


    document.getElementById("scanQR")
        .value = outpassID;


    document.getElementById("qrSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// Security Scan

function scanOutpass() {

    let scannedID =
        document.getElementById("scanQR").value;


    if (
        scannedID === outpassID &&
        wardenApproved
    ) {

        let currentTime =
            new Date().toLocaleString();


        if (outTime === "") {

            outTime = currentTime;


            document.getElementById("gateResult")
                .innerHTML =
                "<h3>✓ OUT recorded</h3>" +
                "<p>Time: " +
                currentTime +
                "</p>";

        }

        else {

            inTime = currentTime;


            document.getElementById("gateResult")
                .innerHTML =
                "<h3>✓ IN recorded</h3>" +
                "<p>Time: " +
                currentTime +
                "</p>";


            addHistory();

        }

    }

    else {

        document.getElementById("gateResult")
            .innerHTML =
            "<h3>❌ Invalid Outpass</h3>";

    }

}


// Add history

function addHistory() {

    let name =
        document.getElementById("studentName").value;

    let type =
        document.getElementById("leaveType").value;


    let table =
        document.getElementById("history");


    let row =
        table.insertRow();


    row.innerHTML =

        "<td>" + name + "</td>" +

        "<td>" + type + "</td>" +

        "<td>Completed</td>" +

        "<td>" + outTime + "</td>" +

        "<td>" + inTime + "</td>";

}
```
