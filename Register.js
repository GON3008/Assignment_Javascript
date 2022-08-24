//define phương thức querySelector() = $
var $ = document.querySelector.bind(document);

//define phương thức querySelectorAll() = $
var $$ = document.querySelectorAll.bind(document);

//truy xuất các phần tử dom
var form = $("#form");
var mssv = $("#msv");
var fullName = $("#name");
var email = $("#email");
var genders = $$('input[name="gender"]');
var interests = $$('input[name="checkbox"]');
var nationality = $("#nationality");
var note = $("#note");

form.addEventListener("submit", (e) => {
    //hủy bỏ sự kiện onSubmit khi người dùng click button "đăng ký"
    e.preventDefault();

    //gọi hàm validator()
    validator();
});

function validator() {
    //Không để trống: mã, họ tên và email
    if (mssv.value === "") {
        errorMessage(mssv, "Không để trống mã");
    } else {
        successMessage(mssv);
    }

    //Không để trống họ tên
    if (fullName.value === "") {
        errorMessage(fullName, "Không để trống họ tên ");
    } else {
        successMessage(fullName);
    }

    //Không để trống email
    if (email.value === "") {
        errorMessage(email, "Không để trống email ");
    } else {
        successMessage(email);
    }

    //Phải chọn giới tính
    if (!genders[0].checked && !genders[1].checked) {
        $(".gender").innerText = "Phải chọn giới tính";
        $("#frames").style.background = "yellow";
    } else {
        $(".gender").innerText = "";
        $("#frames").style.background = "none";
        $("#frames").style.borderColor = "green";
    }

    //Phải chọn sở thích
    var check = 0;
    //dùng loof for mảng [interests] lấy ra từng interest
    for (var i = 0; i < interests.length; i++) {
        //nếu 1 sở thích được tích vào
        if (interests[i].checked == true) {
            //thì check variable + thêm 1
            check++;
        }
    }
    // nếu check variable vẫn = 0 thì hiển thị lỗi
    if (check == 0) {
        $(".hobby").innerText = "Phải chọn sở thích";
        $("#frames2").style.background = "yellow";
    } else {
        $(".hobby").innerText = "";
        $("#frames2").style.background = "none";
        $("#frames2").style.borderColor = "green";
    }

    //Phải chọn quốc tịch
    if (nationality.value == 0) {
        $(".nationality").innerText = "Phải chọn quốc tịch";
        $("select").style.background = "yellow";
    } else {
        $(".nationality").innerText = "";
        $("select").style.background = "none";
        $("select").style.borderColor = "green";
    }

    //Ít hơn 200 ký tự: ghi chú
    if (note.value.length > 200) {
        errorMessage(note, "Ít hơn 200 ký tự");
    } else {
        successMessage(note);
    }
}

//set lỗi
function errorMessage(input, message) {
    //lấy ra "<div class=form-group>" dựa vào phần tử input truyền vào trong hàm errorMessage()
    var formGroup = input.parentElement;
    //lấy ra thẻ <span> dựa vào formGroup sử dụng method querySelector() truy xuất đến thẻ <span>
    var span = formGroup.querySelector("span");
    //add class error đã được css sẵn
    formGroup.className = "form-group error";
    //hiển thị lỗi vào thẻ span
    span.innerText = message;
}

//set thành công
function successMessage(input) {
    //lấy ra "<div class=form-group>" dựa vào phần tử input truyền vào trong hàm successMessage()
    var formGroup = input.parentElement;
    //add class success đã được css sẵn
    formGroup.className = "form-group success";
}