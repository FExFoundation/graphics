import { Vector2D } from './vector2d.js';
(function(){
    //向量知识
    dot()
    //绘图的demo
    draw()
    //绘制正多边形
    regularShape()
})();

function dot(){
    const v = new Vector2D(2,1)
    const len = Math.hypot(v.x, v.y)
    const dir = Math.atan2(v.y, v.x)

    let a = new Vector2D(2,1)
    let b = new Vector2D(4,2)
    let dotP = a.x*b.x+a.y*b.y
    let aLen = a.length
    let bLen = b.length
    console.log(dotP-bLen*aLen<Number.EPSILON);//平行时相等
    let c = new Vector2D(0,1)
    let d = new Vector2D(1.0)
    let dotP2 = c.x*d.x+c.y*d.y
    console.log(dotP2===0);//垂直时为0
}

function draw(){
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.translate(0, canvas.height)
    // 关键步骤： 将canvasY轴方向翻转
    context.scale(1, -1)
    context.lineCap = 'round';
    const v0 = new Vector2D(256, 0);
    drawBranch(context, v0, 50, 10, 1, 3);
}
/*
 *context 是我们的 Canvas2D 上下文
 *v0是起始向量
 *length 是当前树枝的长度
 *thickness 是当前树枝的粗细
 *dir 是当前树枝的方向，用与 x 轴的夹角表示，单位是弧度。
 *bias 是一个随机偏向因子，用来让树枝的朝向有一定的随机性
*/
function drawBranch(context, v0, length, thickness, dir, bias) {
    const v = new Vector2D().rotate(dir).scale(length);//默认为(1,0)的向量
    const v1 = v0.copy().add(v); //我们得到v向量，我们希望v0可以以v0为起点，沿着v的方向继续画，我们使用向量加法来实现
    context.lineWidth = thickness;
    context.beginPath();
    context.moveTo(...v0);
    context.lineTo(...v1);
    context.stroke();

    if(thickness > 2) {
        const left = Math.PI / 4 + 0.5 * (dir + 0.2) + bias * (Math.random() - 0.5);
        drawBranch(context, v1, length * 0.9, thickness * 0.8, left, bias * 0.9);
        const right = Math.PI / 4 + 0.5 * (dir - 0.2) + bias * (Math.random() - 0.5);
        drawBranch(context, v1, length * 0.9, thickness * 0.8, right, bias * 0.9);
    }

    if(thickness < 5 && Math.random() < 0.3) {
        context.save();
        context.strokeStyle = '#c72c35';
        const th = Math.random() * 6 + 3;
        context.lineWidth = th;
        context.beginPath();
        context.moveTo(...v1);
        context.lineTo(v1.x, v1.y - 2);
        context.stroke();
        context.restore();
    }
}

//正多边形
function regularShape(edges = 3, x, y, step) {
    const ret = [];
    const delta = Math.PI * (1 - (edges - 2) / edges);
    let p = new Vector2D(x, y);
    const dir = new Vector2D(step, 0);
    ret.push(p);
    for(let i = 0; i < edges; i++) {
      p = p.copy().add(dir.rotate(delta));
      ret.push(p);
    }
    return ret;
  }