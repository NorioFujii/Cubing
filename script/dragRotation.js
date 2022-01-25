function mousedragRotate(element){
    let target; // Moving target
    let e = element ;
    if (typeof window.touchEvent === "undefined") {
        $(e).mousedown(function (event) {
            event.preventDefault();
            target = $(e); // Moving target
            $(target).data({
                "down": true,
                "move": false,
                "x": event.pageX,
                "y": event.pageY,
                "nx": event.pageX,
                "ny": event.pageY
            });
            return false
        });
        // link disable after move action
        $(e).click(function (event) {
            if ($(target).data("move")) {
               return false
            }
        });
        $(document).mouseup(function (event) {
            $(target).data("down", false);
            return false;
        });
        // event of global area
        $(document).mousemove(function (event) {
          if ($(target).data("down")) {
            event.preventDefault();
            $(target).data("nx", event.pageX);
            $(target).data("ny", event.pageY);
            return emove(1);
          }
        });
    }
    const Area1 = document.getElementsByClassName(e.slice(1))[0];
    if (typeof window.touchEvent !== undefined) { 
        Area1.addEventListener("touchstart", () => {
            event.preventDefault();
            target = $(e); // Moving target
            $(target).data({
                "down": true,
                "move": false,
                "x": event.changedTouches[0].pageX,
                "y": event.changedTouches[0].pageY,
                "nx": event.changedTouches[0].pageX,
                "ny": event.changedTouches[0].pageY
            });
            return false
        });
        Area1.addEventListener("touchmove", () => {
            if ($(target).data("down")) {
                event.preventDefault();  // Suppless scroll
                $(target).data("nx", event.changedTouches[0].pageX);
                $(target).data("ny", event.changedTouches[0].pageY);
            }
        });
        Area1.addEventListener("touchend", () => {
            emove(5);
            $(target).data("down", false);
            return false;
        });
    }
    function emove(dev) {
        let diff_x = parseInt($(target).data("x") - $(target).data("nx"));
        let diff_y = parseInt($(target).data("y") - $(target).data("ny")); 
        $("#comment").html(diff_x + "," + diff_y);
        if ((!$(target).data("move")) && (diff_x+diff_y!=0)) {
            $(target).data("move", true);
            $(target).data("x", $(target).data("nx"));
            $(target).data("y", $(target).data("ny"));
            cubex += diff_y / dev;
            if ((FaceF!="")&&(cubex<-85))  cubex = -85;
            if ((FaceF!="")&&(cubex> -5))  cubex =  -5;
            cubey -= diff_x / dev;
            if ((FaceF!="")&&(cubey<290))  cubey = 290;
            if ((FaceF!="")&&(cubey>420))  cubey = 420; 
            rotCubeXY();
            $(target).data("move", false);
        }
        return false;
    }
}
