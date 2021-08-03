// 所有按钮共有的功能函数
function common(item){
    item.className = 'item';
    form.appendChild(item);
    ++count;

    // 控制滚动条的滚动
    window.scrollTo(0,document.body.scrollHeight)

    // 点击按钮添加item 当前新添加的item该有的高亮样式
    // ----item
    const items = form.querySelectorAll('.item')
    for(let i=0;i<items.length;i++){
        items[i].className = 'item'
    }
    item.className += ' item-active';
    // ----title：大小标题
    const titles = form.querySelectorAll('.title')
    for(let i=0;i<titles.length;i++){
        titles[i].className = 'title'
    }
    const itemtitle = item.querySelector('.title');
    itemtitle.className += ' title-active';
    itemtitle.querySelector('input').select();
    // ----底部按钮
    const btn_boxs = form.querySelectorAll('.btn-box');
    for(let i=0;i<btn_boxs.length;i++){
        btn_boxs[i].style.display = 'none'
    }
    const btn_box = item.querySelector('.btn-box');
    if(btn_box) btn_box.style.display = 'block';

    // item的点击事件
    // addEventListener第三个参数为true，处于捕获状态
    item.addEventListener('click',function(){
        // ----item
        const items = form.querySelectorAll('.item')
        for(let i=0;i<items.length;i++){
            items[i].className = 'item'
        }
        item.className += ' item-active';
        // ----title
        const titles = form.querySelectorAll('.title')
        for(let i=0;i<titles.length;i++){
            titles[i].className = 'title';
        }
        // ----底部按钮
        const btn_boxs = form.querySelectorAll('.btn-box');
        for(let i=0;i<btn_boxs.length;i++){
            btn_boxs[i].style.display = 'none';
        }
        if(btn_box) btn_box.style.display = 'block';
    },true)

    // 删除item
    const deleteItem = item.querySelector('.delete');
    deleteItem.addEventListener('click',function(){
        form.removeChild(this.parentNode.parentNode);
        count = count-1;
        const countDiv = document.querySelectorAll('.count');
        for(let i=0;i<count-1;i++){
            countDiv[i].innerHTML = i+1;
        }
    })

    // itemtitle点击事件
    itemtitle.addEventListener('click',function(){
        titleBg(this);
        titleSelectAll(this);
    })

    // list的点击事件、悬浮事件
    // 【动态为未来元素添加事件】
    if(item.querySelector('ul')){
        let ul = item.querySelector('ul');
        ul.addEventListener('click',function(e){
            // 删除图标的点击删除事件
            if(e.target.className === 'delete2'){
                ul.removeChild(e.target.parentNode.parentNode);
            // 判断当前被点击的对象，动态赋予‘全选文字和文本框变色’事件
            }else if(e.target.className === 'title'){
                titleBg(e.target)
                titleSelectAll(e.target);
            }else if(e.target.parentNode.className === 'title'){
                titleBg(e.target.parentNode)
                titleSelectAll(e.target.parentNode);
            }
        })
        // 删除图标的悬浮事件
        ul.addEventListener('mouseover',function(e){
            if(e.target.className === 'delete2'){
                e.target.src = 'img/delete2-red.png';
            }
        })
        ul.addEventListener('mouseout',function(e){
            if(e.target.className === 'delete2'){
                e.target.src = 'img/delete2.png';
            }
        })
    }
}

// "添加单个选项"按钮的功能函数
function addBtn(item,html_template){
    const addBtn = item.querySelector('.add-option-list');
    // 各个item的list项目条数
    item.list_count = 2;
    addBtn.addEventListener('click',function(){
        const li = document.createElement('li');
        li.className = 'option-list';
        switch(html_template) {
            // 多项填空
            case 'multiBlank':
                li.innerHTML = `
                <div class="option-item">
                    <div class="title">
                        <input type="text"  class="textInput" value="填空${item.list_count+1}"/>
                    </div>
                    <img class="delete2" src='img/delete2.png' />
                </div>
                <div class="box"></div>`;
                break;
            // 单项选择
            case 'onlyChoose':
                li.innerHTML = `
                <div class="option-item">
                    <div class="title"><input type="radio" class="textdiv" name="only"><input type="text" class="textInput" value="选项${item.list_count+1}"></div>
                    <img class="delete2" src='img/delete2.png' />
                </div>`;
                break;
            // 多项选择
            case 'multiChoose':
                li.innerHTML = `
                <div class="option-item">
                    <div class="title"><input type="checkbox" class="textdiv"><input type="text" class="textInput" value="选项${item.list_count+1}"></div>
                    <img class="delete2" src='img/delete2.png' />
                </div>`;
                break;
            case 'onlySelect':
                li.innerHTML = `
                <div class="option-item">
                    <div class="title">
                        <img class="circle" src="img/down.png"/>
                        <input type="text"  class="textInput" value="选项${item.list_count+1}"/>
                    </div>
                    <img class="delete2" src='img/delete2.png' />
                </div>`;
                break;
        }
        // item中的项目数加1
        item.list_count++;
       
        const ul = item.querySelector('ul');
        ul.appendChild(li);

        // title
        const itemtitle = li.querySelector('.title');
        itemtitle.className += ' title-active';
        titleSelectAll(itemtitle)
    })
}


// [封装函数]title样式的功能函数：文本框变色 + 全选文字(两种情况input、div)
function titleBg(title){
    const titles = form.querySelectorAll('.title')
    for(let i=0;i<titles.length;i++){
        titles[i].className = 'title'
    }
    title.className += ' title-active';
}
function titleSelectAll(title){
    const textInput = title.querySelector('.textInput');
    if(textInput) textInput.select();
    // const textdiv = title.querySelector('.textdiv');
    // if(textdiv){
    //     var selection = window.getSelection();
    //     selection.removeAllRanges();
    //     var range = document.createRange();
    //     range.selectNodeContents(textdiv.nextSibling);
    //     selection.addRange(range);
    // }
}
