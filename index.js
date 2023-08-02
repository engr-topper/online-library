function addUserDataToLocalStorage(userObj) {

    //already has data in localstorage then update it other create new one
    var users = JSON.parse(localStorage.getItem('userData'));
    if (users != null) {
        users.push(userObj);
       
        localStorage.setItem('userData', JSON.stringify(users));
    }
    else {
        var userData = new Array();
        userData.push(userObj);
        localStorage.setItem('userData', JSON.stringify(userData));

    }
}

function updateDataToLocalStorage(userObj) {

    var users = JSON.parse(localStorage.getItem('userData'));
    if (users != null) {
        var user = users.filter((x) => x.id == userObj.id).pop();
        if (user != null) {
            user.name = userObj.name;
            user.email = userObj.email;
            user.bookname = userObj.bookname;
            user.dateborrowed = userObj.dateborrowed;
            user.datereturned = userObj.datereturned;
        }
        localStorage.setItem('userData', JSON.stringify(users));
    }
}

function deletedataFromLocalStorage(UserId) {

    var users = JSON.parse(localStorage.getItem('userData'));
    if (users != null) {
        users.splice(users.findIndex(a => a.id === UserId), 1)
        localStorage.setItem('userData', JSON.stringify(users));
    }
}


function bindUserData() {
    var users = JSON.parse(localStorage.getItem('userData'));
    if (users != null) {
        document.getElementById('tblbody').innerHTML = "";
        users.forEach(function (item, index) {
            debugger;
            var btnEditId = "btnedit" + item.id;
            var btnDeleteId = "btndelete" + item.id;
            var tableRow = "<tr Id='" + item.id + "'   data-ReferenceID='" + item.id + "'   data-name='" + item.name + "' data-email='" + item.email + "' data-bookName='" + item.bookname + "' data-dateBorrowed='" + item.dateborrowed + "' data-dateReturned='" + item.datereturned + "'>"
                + "<td class='td-data'>" + item.id + "</td>"
                + "<td class='td-data'>" + item.name + "</td>"
                + "<td class='td-data'>" + item.email + "</td>"
                + "<td class='td-data'>" + item.bookname + "</td>"
                + "<td class='td-data'>" + item.dateborrowed + "</td>"
                + "<td class='td-data'>" + item.datereturned + "</td>"
                + "<td class='td-data'>" +
                "<button id='" + btnEditId + "' class='btn btn-info btn-xs btn-editcustomer' onclick='showEditRow(" + item.id + ")'><i class='fa fa-pencil' aria-hidden='true'></i>Edit</button>" +
                "<button id='" + btnDeleteId + "' class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteRow(" + item.id + ")'><i class='fa fa-trash' aria-hidden='true'>Delete</button>"
                + "</td>"
                + "</tr>";
            document.getElementById('tblbody').innerHTML += tableRow;
        })
    }
    var AddRow = "<tr>"
        + "<td class='td-data'></td>"
        + "<td class='td-data'><input type='text' id='txtname' placeholder='name..'></td>"
        + "<td class='td-data'><input type='email' id='txtemail' placeholder='email..'></td>"
        + "<td class='td-data'><input type='text' id='bookname' placeholder='book id and name'></td>"
        + "<td class='td-data'><input type='date' id='dateborrowed'></td>"
        + "<td class='td-data'><input type='date' id='datereturned'></td>"
        + "<td class='td-data'>" + "<button id= 'btnaddCustomer' onclick='addUser()' class='btn btn-success'> <i class='fa fa-plus-circle' aria-hidden='true'></i>Add</button>" + "</td>"
        + "</tr>";
    document.getElementById('tblbody').innerHTML += AddRow;
}

function GetUserID() {
    const ID = Date.now();
    return ID;
}

function addUser() {
    var userId = GetUserID();
    var txtname = document.getElementById("txtname").value;
    if (!txtname) {
        alert('Please enter name!')
        return false;
    }
    var email = document.getElementById("txtemail").value;
    if (!email) {
        alert('Please enter email!')
        return false;
    }
    var emailfilter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailfilter.test(email)) {
        alert('Please enter a valid email address!');
        return false;
    }

    var bookName = document.getElementById("bookname").value;
    var dateBorrowed = document.getElementById("dateborrowed").value;
    var dateReturned = document.getElementById("datereturned").value;
    var userObj = {
        "id": userId,
        "name": txtname,
        "email": email,
        "bookname": bookName,
        "dateborrowed": dateBorrowed,
        "datereturned": dateReturned

    };
    addUserDataToLocalStorage(userObj);
    document.getElementById('txtname').value = "";
    document.getElementById('txtemail').value = "";
    document.getElementById('bookname').value = "";
    document.getElementById('dateborrowed').value = "";
    document.getElementById('datereturned').value = "";
    bindUserData();
};

function showEditRow(UserID) {
    var userRow = document.getElementById(UserID); //this gives tr of  whose button was clicked
    var trdata = userRow.querySelectorAll(".td-data");
    /*returns array of all elements with
    "row-data" class within the row with given id*/
    var userID = trdata[0].innerHTML;
    var userName = trdata[1].innerHTML;
    var useremail = trdata[2].innerHTML;
    var userBookName = trdata[3].innerHTML;
    var userDateBorrowed = trdata[4].innerHTML;
    var userDateReturned = trdata[5].innerHTML;

    trdata[0].innerHTML = '<input name="txtuserid"  disabled id="txtuserid" value="' + userID + '"/>';
    trdata[1].innerHTML = '<input name="txtname" id="txtname" value="' + userName + '"/>';
    trdata[2].innerHTML = '<input name="txtemail" id="txtemail" value="' + useremail + '"/>';
    trdata[3].innerHTML = '<input name="bookname" id="bookname" value="' + userBookName + '"/>';
    trdata[4].innerHTML = '<input name="dateborrowed" id="dateborrowed" value="' + userDateBorrowed + '"/>';
    trdata[5].innerHTML = '<input name="datereturned" id="datereturned" value="' + userDateReturned + '"/>';
    trdata[6].innerHTML =
        "<button class='btn btn-primary btn-xs btn-updateCustomer' onclick='updateUser(" + userID + ")'>" +
        "<i class='fa fa-pencil' aria-hidden='true'></i>Update</button>"
        + "<button class='btn btn-warning btn-xs btn-cancelupdate' onclick='cancel(" + userID + ")'><i class='fa fa-times' aria-hidden='true'></i>Cancel</button>"
        + "<button class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteUser(" + userID + ")'>"
        + "<i class='fa fa-trash' aria-hidden='true'></i>Delete</button>"
}
function cancel(UserID) {
    debugger;
    var btneditId = "btnedit" + UserID;
    var btndeleteId = "btndelete" + UserID;

    var CustomerRow = document.getElementById(UserID); //this gives tr of  whose button was clicked
    var data = CustomerRow.querySelectorAll(".td-data");

    var name = CustomerRow.getAttribute("data-name");
    var email = CustomerRow.getAttribute("data-email");
    var bookName = CustomerRow.getAttribute("data-bookname");
    var dateBorrowed = CustomerRow.getAttribute("data-dateborrowed");
    var dateReturned = CustomerRow.getAttribute("data-datereturned");

    data[0].innerHTML = UserID;
    data[1].innerHTML = name;
    data[2].innerHTML = email;
    data[3].innerHTML = bookName;
    data[4].innerHTML = dateBorrowed;
    data[5].innerHTML = dateReturned;
    var actionbtn = "<button id='" + btneditId + "' class='btn btn-info btn-xs btn-editcustomer' onclick='showEditRow(" + UserID + ")'><i class='fa fa-pencil' aria-hidden='true'></i>Edit</button>" +
        "<button id='" + btndeleteId + "' class='btn btn-danger btn-xs btn-deleteCustomer' onclick='deleteRow(" + UserID + ")'><i class='fa fa-trash' aria-hidden='true'>Delete</button>"
    data[6].innerHTML = actionbtn;
}
function updateUser(UserID) {
    var userRow = document.getElementById(UserID); //this gives tr of  whose button was clicked
    var data = userRow.querySelectorAll(".td-data");
    var name = data[1].querySelector("#txtname").value;
    var email = data[2].querySelector("#txtemail").value;
    var bookName = data[3].querySelector("#bookname").value;
    var dateBorrowed = data[4].querySelector("#dateborrowed").value;
    var dateReturned = data[5].querySelector("#datereturned").value;
    var userObj = {
        "id": UserID,
        "name": name,
        "email": email,
        "bookname": bookName,
        "dateborrowed": dateBorrowed,
        "datereturned": dateReturned
    };
    updateDataToLocalStorage(userObj);
    bindUserData();
}
function deleteRow(UserID) {
    deletedataFromLocalStorage(UserID);
    bindUserData();
}
