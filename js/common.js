let multi_blank_count = 2;
let only_choose_count = 2;
let multi_choose_count = 2;
let only_down_count = 2;

// 所有按钮共有的功能函数
function common(item){
    item.className = 'item';
    form.appendChild(item);
    ++count;

    // 控制滚动条的滚动
    window.scrollTo(0,document.body.scrollHeight)

    // 添加item时相应的样式
    const items = form.querySelectorAll('.item')
    for(let i=0;i<items.length;i++){
        items[i].className = 'item'
    }
    item.className += ' item-active';
    // 清除title的title-active样式
    const titles = form.querySelectorAll('.title')
    for(let i=0;i<titles.length;i++){
        titles[i].className = 'title'
    }
    const itemtitle = item.querySelectorAll('.title');
    itemtitle[0].className += ' title-active';
    itemtitle[0].querySelector('input').select();
    // 清除底部按钮的样式，并显示当前item的底部按钮
    const btn_boxs = form.querySelectorAll('.btn-box');
    for(let i=0;i<btn_boxs.length;i++){
        btn_boxs[i].style.display = 'none'
    }
    const btn_box = item.querySelector('.btn-box');
    if(btn_box) btn_box.style.display = 'block';

    // 添加监听器：激活item样式
    // addEventListener第三个参数为true，处于捕获状态
    item.addEventListener('click',function(){
        const items = form.querySelectorAll('.item')
        for(let i=0;i<items.length;i++){
            items[i].className = 'item'
        }
        item.className += ' item-active';
        // 清除title的title-active样式
        const titles = form.querySelectorAll('.title')
        for(let i=0;i<titles.length;i++){
            titles[i].className = 'title';
        }
    },true)

    // 添加监听器：删除item
    const deleteItem = item.querySelector('.delete');
    deleteItem.addEventListener('click',function(){
        form.removeChild(this.parentNode.parentNode);
        count = count-1;
        const countDiv = document.querySelectorAll('.count');
        for(let i=0;i<count-1;i++){
            countDiv[i].innerHTML = i+1;
        }
    })
    
    // 添加监听器：激活title样式
    for(let i=0;i<itemtitle.length;i++){
        itemtitle[i].addEventListener('click',function(){
            titleBg(itemtitle[i]);
            titleSelectAll(itemtitle[i]);
        },true)
    }
    
    item.addEventListener('click',function(){
        const btn_boxs = form.querySelectorAll('.btn-box');
        for(let i=0;i<btn_boxs.length;i++){
            btn_boxs[i].style.display = 'none';
        }
        if(btn_box) btn_box.style.display = 'block';
    })
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

        // 添加的li具有的样式及事件函数
        // delete2小图标
        let optionItem = li.querySelector('.option-item');
        let delete2 = li.querySelector('.delete2');
        delete2.addEventListener('mouseover',function(){
            delete2.src = 'img/delete2-red.png';
        })
        delete2.addEventListener('mouseout',function(){
            delete2.src = 'img/delete2.png';
        })
        delete2.addEventListener('click',function(){
            ul.removeChild(this.parentNode.parentNode);
        })
        // title
        const itemtitle = li.querySelector('.title');
        itemtitle.className += ' title-active';
        titleSelectAll(itemtitle)
        itemtitle.addEventListener('click',function(){
            titleBg(itemtitle)
            titleSelectAll(itemtitle);
        })
    })
}



// 图标delete2(减号)的功能函数
function delete2Func(item){
    let optionItem = item.querySelectorAll('.option-item');
    let delete2 = item.querySelectorAll('.delete2');
    const ul = item.querySelector('ul');
    for(let i=0;i<optionItem.length;i++){
        delete2[i].addEventListener('mouseover',function(){
            delete2[i].src = 'img/delete2-red.png';
        })
        delete2[i].addEventListener('mouseout',function(){
            delete2[i].src = 'img/delete2.png';
        })
        delete2[i].addEventListener('click',function(){
            ul.removeChild(this.parentNode.parentNode);
        })
    }
}

// title样式的功能函数：文本框变色 + 全选文字(两种情况input、div)
function titleBg(itemTitle){
    const titles = form.querySelectorAll('.title')
    for(let i=0;i<titles.length;i++){
        titles[i].className = 'title'
    }
    itemTitle.className += ' title-active';
}
function titleSelectAll(itemTitle){
    const textInput = itemTitle.querySelector('.textInput');
    if(textInput) textInput.select();
    // const textdiv = itemTitle.querySelector('.textdiv');
    // if(textdiv){
    //     var selection = window.getSelection();
    //     selection.removeAllRanges();
    //     var range = document.createRange();
    //     range.selectNodeContents(textdiv.nextSibling);
    //     selection.addRange(range);
    // }
}
