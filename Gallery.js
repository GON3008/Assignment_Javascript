//truy xuất các phần tử con(class="item") trong class="slide-show"
var slideItem = document.querySelector(".slide-show").children;
//lấy độ dài của các phần tử con(class="item")
var slideLength = slideItem.length;
//truy xuất button (id="next")
var nextBtn = document.querySelector("#next");
//truy xuất button (id="prev")
var prevBtn = document.querySelector("#prev");
//truy xuất thẻ span (id="number")
var number = document.querySelector("#number");
//init variable set value = 0
var index = 0;

//nextBtn bắt sự kiện onClick, đây là cú pháp Expression Function
nextBtn.onclick = function() {
    //gọi method handleChangeImage() với arguments truyền vào là "next"
    handleChangeImage("next");
};

//prevBtn bắt sự kiện onClick, đây là cú pháp Expression Function
prevBtn.onclick = function() {
    //gọi method handleChangeImage() với argument truyền vào là "prev"
    handleChangeImage("prev");
};

//set up medthod handleChangeImage with parameter "direction"
function handleChangeImage(direction) {
    //nếu direction == "next"
    if (direction == "next") {
        //index variable tăng 1 (chuyển ảnh kế tiếp)
        index++;
        /**
         * nếu value của index == slideLength
         * - bằng với tổng số lượng ảnh ("lúc này chúng ta đang chuyển đến ảnh cuối cùng")
         * thì value của index sẽ được gán lại = 0 (nghĩa là quay về ảnh đầu tiên)
         */
        if (index == slideLength) {
            index = 0;
        }
        //hiển thứ tự của bức ảnh
        number.innerHTML = index + 1;
    } else {
        //nếu direction không phải là "next"
        //thì index sẻ giảm 1 (tức là chúng ta đang quay về ảnh trước)
        index--;

        /**
         * nếu index < 0 (chúng ta đang ở ảnh đầu tiên khi click lùi ảnh trước index sẽ < 0)
         * nên sẽ gán index = slideLength - 1
         * (tức là tổng số các bức ảnh "đếm từ 0" sẽ - 1, chúng ta sẽ quay về ảnh cuối cùng)
         */
        if (index < 0) {
            index = slideLength - 1;
        }
        //hiển thứ tự của bức ảnh
        number.innerHTML = index + 1;
    }

    // mặc định tất cả các bức ảnh sẽ bị ẩn đi với properties display: "none"
    //dùng loof for ra các bức ảnh
    for (var i = 0; i < slideLength; i++) {
        //và sẽ xóa đi class="active" của ảnh khi chuyển sang ảnh khác
        slideItem[i].classList.remove("active");
    }
    //khi click đến bức ảnh nào thì sẽ thêm class="active" đã được css với properties display: "block"
    slideItem[index].classList.add("active");
}