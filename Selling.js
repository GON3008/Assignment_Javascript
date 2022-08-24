//define phương thức querySelector() = $
var $ = document.querySelector.bind(document);

//define phương thức querySelectorAll() = $
var $$ = document.querySelectorAll.bind(document);

//truy xuất các phần tử dom
var checkAll = $("#checkAll");
var checkBoxes = $$(".check");
var inputNumbers = $$('input[type="number"]');
var filter = $("#filter");
var rows = $$("tbody tr");
var totally = $("#tongtien");

/** chức năng chọn tất cả các checkbox **/
//[checkbox] checkAll bắt sự kiện onchange, đây là cú pháp Expression Function
checkAll.onchange = function() {
    //dùng loof forEach mảng checkBoxes để lấy ra từng checkbox
    checkBoxes.forEach((checkBox) => {
        //nếu [checkbox] checkAll được tích vào
        if (checkAll.checked == true) {
            //tất cả các checkbox sẽ được tích theo
            checkBox.checked = true;
        } else {
            //lần check tiếp theo vào [checkbox] checkAll tất cả các checkbox sẽ bỏ tích
            checkBox.checked = false;
        }
    });

    //undisabled
    //dùng loof forEach mảng inputNumbers để lấy ra từng inputNumber
    inputNumbers.forEach((input) => {
        /**
         * nếu [checkbox] checkAll chưa được tích vào
         * - thì thuộc tính disabled trong input sẽ có giá trị là true (input sẽ trong trạng thái "vô hiệu hóa")
         * ngược lại nếu [checkbox] checkAll được tích vào
         * - thì thuộc tính disabled trong input sẽ có giá trị là false (input sẽ trong trạng thái "hoạt động")
         * */
        input.disabled = !checkAll.checked ? true : false;
    });
};

//check từng ô
// dùng loof for mảng [checkBoxes] để lấy ra từng checkBox
for (var i = 0; i < checkBoxes.length; i++) {
    //mỗi một checkBox sẽ bắt sự kiện onchange, đây là cú pháp Expression Function
    checkBoxes[i].onchange = function() {
        // dùng loof for mảng [inputNumbers] để lấy ra từng inputNumber
        for (var i = 0; i < inputNumbers.length; i++)
        /**
         * nếu checkbox chưa được tích vào
         * - thì thuộc tính disabled trong input sẽ có giá trị là true (input sẽ trong trạng thái "vô hiệu hóa")
         * ngược lại nếu checkbox được tích vào
         * - thì thuộc tính disabled trong input sẽ có giá trị là false (input sẽ trong trạng thái "hoạt động")
         * */
            inputNumbers[i].disabled = !checkBoxes[i].checked ? true : false;
    };
}

/**lọc sản phẩm theo giá**/
//[selectBox] filter bắt sự kiện onchange, đây là cú pháp Expression Function
filter.onchange = function() {
    //dùng loof forEach mảng [rows] để lấy ra từng row
    rows.forEach((row) => {
        //lấy giá của ô thứ 3 trong 1 hàng
        var cell = row.children[3].innerHTML;

        //nếu value của [selectBox] filter == 0
        if (filter.value == 0) {
            //hiển thị tất cả sản phẩm
            row.style.display = Number(cell) ? "table-row" : "none";
        } else if (filter.value == 1) {
            /**
             * Nếu value của [selectBox] filter == 1
             * Nếu giá tiền < 100 thì row sẽ được gán properties display = "table-row"
             * - (hiển thị tất cả các sản phẩm có giá < 100)
             * Nếu các sản phẩm ko lọt vào điều kiện giá < 100 thì row sẽ được gán properties display = "none"
             * - (ẩn các sản phẩm có giá > 100)
             */
            row.style.display = Number(cell) < 100 ? "table-row" : "none";
        } else if (filter.value == 2) {
            row.style.display =
                Number(cell) >= 100 && Number(cell) <= 500 ? "table-row" : "none";
        } else {
            row.style.display = Number(cell) > 500 ? "table-row" : "none";
        }
    });
};

//tính thành tiền
//dùng loof forEach mảng [rows] để lấy ra từng row
rows.forEach((row) => {
    //truy xuất phần tử input nằm trong ô thứ 4 của mỗi row
    var input = row.children[4];
    //truy xuất giá nằm trong ô thứ 3 của mỗi row
    var price = row.children[3].innerHTML;
    //truy xuất ô cuối cùng của mỗi row để hiển thị thành tiền của mỗi sản phẩm
    var showIntoMoney = row.lastElementChild;

    //từng input bắt sự kiện onchange trả về 1 event, đây là cú pháp Expression Function
    input.onchange = function(e) {
        //lấy ra value của input khi người dùng nhập hoặc thay đổi giá trị trong input
        var quantity = e.target.value;
        //dùng phần tử đã truy xuất bên trên để hiển thị thành tiền của từng sản phẩm với công thức bên dưới
        showIntoMoney.innerHTML = price * quantity;

        //show tổng tiền
        //tạo biến sum = 0
        var sum = 0;
        //dùng loof for mảng [rows] để lấy ra từng row
        for (var i = 0; i < rows.length; i++) {
            //gán từng ô thành tiền của mỗi row = showTotal (variable)
            var showTotal = rows[i].lastElementChild.innerHTML;
            //gọi biến sum và cộng dồn
            sum = sum + Number(showTotal);
            //hiển thị tổng tiền
            totally.innerHTML = sum;
        }
    };
});