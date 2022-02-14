(function(){
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    // 我们这里把原点定位在256，256的位置上
    context.translate(256, 256)
    // 关键步骤： 将canvasY轴方向翻转
    context.scale(1, -1)
    context.fillRect(0, 0, 100, 100);
})();