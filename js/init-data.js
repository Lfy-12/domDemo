let url = "https://www.fastmock.site/mock/2b5e214c0ef5ab4d7bb6b18c797380e1/form/form-data";
let init_data = [];
$.get(url,function(res){
    // 获取数据
    console.log(res.data);
    init_data = res.data;

    // 把获取到的数据渲染到页面中
    for(let i=0;i<init_data.length;i++){
        switch(init_data[i].type){
            case 'onlyBlank':
                onlyBlank();
                form.lastElementChild.querySelector('.textInput').value = init_data[i].title;
                break;
            case 'multiBlank':
                // 相当于调用一次 多项填空 的点击事件
                multiBlank();
                initItem(form.lastElementChild,'multiBlank',i)
                break;
            case 'onlyChoose':
                onlyChoose();
                initItem(form.lastElementChild,'onlyChoose',i)
                break;
            case 'multiChoose':
                multiChoose();
                initItem(form.lastElementChild,'multiChoose',i)
                break;
            case 'onlySelect':
                onlySelect();
                initItem(form.lastElementChild,'onlySelect',i)
                break;
        }
    }

    // 此时页面处于最底部，需要回到最顶端
    // 消除最后一个渲染的item中的各种样式
    window.scroll(0,0);
    let lastItem = form.lastElementChild;
    let input = lastItem.querySelectorAll('.title');
    for(let i=0;i<input.length;i++){
        input[i].className = 'title';
    }
    input[input.length-1].querySelector('.textInput').blur();
    lastItem.className = 'item';
    if(lastItem.querySelector('.btn-box')) lastItem.querySelector('.btn-box').style.display = 'none';
    
})

function initItem(item,html_template,i){
    // 渲染标题
    item.querySelector('.textInput').value = init_data[i].title;
    // 清空item中默认的子选项 渲染为初始数据中的选项
    item.querySelector('ul').innerHTML = '';
    getObj(data,item.id).value = [];
    for(let j=0;j<init_data[i].value.length;j++){
        // 相当于调用 添加单个选项 按钮的点击事件
        addList(item,html_template)
        item.querySelector('ul').lastElementChild.querySelector('.textInput').value = init_data[i].value[j].title
    }
}

function addList(item,html_template){

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
    item.list_count = 0;
    
    const ul = item.querySelector('ul');
    ul.appendChild(li);

    // title
    const itemtitle = li.querySelector('.title');
    itemtitle.className += ' title-active';
    titleSelectAll(itemtitle)
    
    // 数据data
    // 获取最新添加的节点中的input节点
    let input  = item.querySelector('ul').lastElementChild.querySelector('.textInput');
    input.id = randomString();
    let valueArr = getObj(data,item.id).value;
    valueArr.push({id:input.id,title:input.value});
    writedata();
}

