var person_col= 0;
var person_row = 0;
var person_col_form = 0;
var person_row_form = 0;
var init = 0;
var Tmap = [];
var score = 0;

const initMap = (size, count, score,person_c,person_r) =>{
    person_c = person_col;
    person_r = person_row;
    const map = []; //声明map为一个数组

    //接下里要为map生成随机的内容，有的为空，有的上面有得数
     for(let col = 0; col < size;col++)
        {
            var row = [];
            for(let i = 0; i < size; i++)
            {
                if(Math.random() < 0.1 && count)
                {
                    count--;
                    row[i] = 10;
                }
                else
                    row[i] = 0;
            }
            map[col] = row;
        }
    
        while(count)
        {
            var col = Math.floor(Math.random()*size);
            var row = Math.floor(Math.random()*size);
            if(!map[col][row])
            {
                map[col][row] = 10;
                count--;
            }else
                continue;
        }    
    map[person_c][person_r] = 100;
    return map;
}

const modify = (map,person_c,person_r) =>
{
    if(map[person_c][person_r] == 10) {
        score+=10;
    }
    map[person_col_form][person_row_form] = 0;
    map[person_c][person_r] = 100;
    person_col_form = person_c;
    person_row_form = person_r;
    return map;
}

const drawMap =  (map) =>{
    var col = 0;
    var row = 0;
    for(let item of map)
    {
        for(let single of item)
        {
            if(single == 0)
            {
               var y = document.createElement('div');
               y.setAttribute("class","noprize");
               document.body.append(y);
            }else if(single == 100){
                var h = document.createElement('div');
                h.setAttribute("id","head_div");
                h.setAttribute("class","start");
                document.body.append(h);
                var person = document.createElement('div');
                person.setAttribute("id","xiaoren");
                person.innerHTML="人";
                document.getElementById("head_div").append(person);
            }
            else{
                var x = document.createElement('div');
                x.setAttribute("class","prize");
                var prize = document.createElement('img')
                prize.src = "./image/prize.svg";
                prize.width = 18;
                prize.height = 18;
                x.append(prize);
                document.body.append(x);
            }       
        }
        var tmp = document.createElement('br');
        document.body.append(tmp);
    }
    return;
}
document.onkeydown = keyDown;
Tmap = initMap(20,20,25,person_col,person_row);
var S = document.createElement('h1');
drawMap(Tmap);
S.innerHTML = "分数： "+score;
document.body.append(S);
    //在Document对象中注册keyDown事件处理函数
    function keyDown(event){  // 方向键控制元素移动函数
        var event = event || window.event;  // 标准化事件对象
        switch(event.keyCode){  // 获取当前按下键盘键的编码
            case 37 :  // 按下左箭头键，向左移动5个像素
                document.body.innerHTML='';
                drawMap(modify(Tmap,person_col,--person_row));
                S.innerHTML = "分数： "+score;
                document.body.append(S);
                break;
            case 39 :  // 按下右箭头键，向右移动5个像素
                document.body.innerHTML='';
                drawMap(modify(Tmap,person_col,++person_row));
                S.innerHTML = "分数： "+score;
                document.body.append(S);
                break;
            case 38 :  // 按下上箭头键，向上移动5个像素
                document.body.innerHTML='';
                drawMap(modify(Tmap,--person_col,person_row));
                S.innerHTML = "分数： "+score;
                document.body.append(S);
                break;
            case 40 :  // 按下下箭头键，向下移动5个像素
                document.body.innerHTML='';
                drawMap(modify(Tmap,++person_col,person_row));
                S.innerHTML = "分数： "+score;
                document.body.append(S);
                break;
    }
        return false
    }



