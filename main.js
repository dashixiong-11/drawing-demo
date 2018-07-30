   
    var yyy = document.getElementById('xxx');
    var context = yyy.getContext('2d');
    var lineWidth = 2
    autoSetCanvasSize(yyy)
    listenToMouse(yyy)

    save.onclick = function(){
        var url = yyy.toDataURL('image/png')
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url 
        a.download = 'my drawing'
        a.click()
    }
    thin.onclick = function(){
        lineWidth = 2
    }
    thick.onclick = function(){
        lineWidth = 5
    }
    clear.onclick = function(){
        context.clearRect(0,0,yyy.width,yyy.height)
    }
    red.onclick = function(){
        context.fillStyle = 'red'
        context.strokeStyle = 'red'
        red.classList.add('active')
        green.classList.remove('active')
        blue.classList.remove('active')
    }
    green.onclick = function(){
        context.fillStyle = 'green'
        context.strokeStyle = 'green'
        green.classList.add('active')
        red.classList.remove('active')
        blue.classList.remove('active')
       
    
    }
    blue.onclick = function(){
        context.fillStyle = 'blue'
        context.strokeStyle = 'blue'
        blue.classList.add('active')
        green.classList.remove('active')
        red.classList.remove('active')
    }


    function drawLine(x1, y1, x2, y2) {
        context.beginPath()
        context.moveTo(x1, y1) //起点
        context.lineWidth = lineWidth
        context.lineTo(x2, y2)//终点
        context.stroke()
    }
    function drawCircle(x, y, radius) {
        context.beginPath();//开始
        //arc(x,y ,半径，startAngle,endAngle,anticlockwise)
        //arc()函数中的角度单位是弧度不是度数。角度与弧度的JS表达式 rading =       (Math.PI/180)*degrees
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = 'red'
        context.fill()
        //context.stroke()
    }
    var eraserEnabled = false
    eraser.onclick = function () {
        eraserEnabled = true
        eraser.classList.add('x')
        brush.classList.remove('x')
    }
    brush.onclick = function () {
        eraserEnabled = false
        brush.classList.add('x')
        eraser.classList.remove('x')
    }
    
    function autoSetCanvasSize(canvas) {
        widthheight()

        window.oresize = function () {
            widthheight()
        }
        function widthheight() {
            var pageWidth = document.documentElement.clientWidth;
            var pageHeight = document.documentElement.clientHeight;
            canvas.width = pageWidth;
            canvas.height = pageHeight;
        }
    }
    function listenToMouse(canvas) {
        var context = canvas.getContext('2d');
        var using = false
        var lastPoint = {
            x: undefined,
            y: undefined
        }
        if (document.body.ontouchstart !== undefined) {
            //触屏设备
            canvas.ontouchstart = function (aaa) {
                var x = aaa.touches[0].clientX
                var y = aaa.touches[0].clientY
                using = true
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    //这里获取的鼠标XY坐标是相对于视口位置的 而生成圆的位置是相对于 canvas 的位置的            
                    lastPoint = {
                        x: x,
                        y: y
                    }
                }
            }
            canvas.ontouchmove = function (aaa) {
                var x = aaa.touches[0].clientX
                var y = aaa.touches[0].clientY
                if (!using) { return }
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    var newPoint = {
                        x: x,
                        y: y
                    }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }
            canvas.ontouchend = function () {
                using = false;
            }
        } else {
            //鼠标设备
            canvas.onmousedown = function (aaa) {
                var x = aaa.clientX
                var y = aaa.clientY
                using = true
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    //这里获取的鼠标XY坐标是相对于视口位置的 而生成圆的位置是相对于 canvas 的位置的            
                    lastPoint = {
                        x: x,
                        y: y
                    }
                }

            }
            canvas.onmousemove = function (aaa) {
                var x = aaa.clientX
                var y = aaa.clientY
                if (!using) { return }
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    var newPoint = {
                        x: x,
                        y: y
                    }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }
            canvas.onmouseup = function (aaa) {
                using = false;
            }
        }

    }