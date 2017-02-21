var hammertime = Hammer(document.getElementById('pinchzoom'), {
        transform_always_block: true,
        transform_min_scale: 1,
        drag_block_horizontal: false,
        drag_block_vertical: false,
        drag_min_distance: 0
});

var rect = document.getElementById('rect');

var posX=0, posY=0,
    scale=1, last_scale,
    last_posX=0, last_posY=0;

hammertime.on('touch drag transform dragend', function(ev) {
    switch(ev.type) {
        case 'touch':
            last_scale = scale;
            break;

        case 'drag':
            posX = last_posX + ev.gesture.deltaX;
            posY = last_posY + ev.gesture.deltaY;
            break;

        case 'transform':
            scale = Math.max(1, Math.min(last_scale * ev.gesture.scale, 10));
            break;
        case 'dragend':
            last_posX = posX;
            last_posY = posY;
            break;
    }

    // transform!
    var transform = "";
    if(scale > 1){
        transform =
            "translate3d("+posX+"px,"+posY+"px, 0) " +
            "scale3d("+scale+","+scale+", 0) ";
    }else{
        transform =
            "translate3d(0, 0, 0) " +
            "scale3d(1, 1, 0) ";
        posX = 0;
        posY = 0;
        last_posX = 0;
        last_posY = 0;
    }

    rect.style.transform = transform;
    rect.style.oTransform = transform;
    rect.style.msTransform = transform;
    rect.style.mozTransform = transform;
    rect.style.webkitTransform = transform;
});
