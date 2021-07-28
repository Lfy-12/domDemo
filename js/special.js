// 个人信息按钮
function infoFunc(event){
    let info_html = `<span class='count'>${count}</span>
        <span class='right-icon'>
        <img class="delete" src='img/delete.png'/>
        <img class="move" src='img/move.png'/>
    </span>
    <div class="title">
        <input type="text" class="textInput" value="${event.target.innerText}"/>
    </div>
    <div class="box"></div>`;
    const item = document.createElement('div');
    item.innerHTML = info_html;
    common(item);

    // 给item添加一个id属性,方便增删改查
    item.id = randomString();
    // 
    temp = {id:item.id,type:'onlyBlank',title:event.target.innerText};
    setData(item);

    
}

// 性别
const sex_template = `
<span class='right-icon'>
    <img class="delete" src='img/delete.png'/>
    <img class="move" src='img/move.png'/>
</span>
<div class="title">
    <input type="text" class="textInput" value="性别"/>
</div>
<ul>
    <div class="title"><input type="radio" class="textdiv" name="sex"><input type="text" class="textInput" value="男"></div><br/>
    <div class="title"><input type="radio" class="textdiv" name="sex"><input type="text" class="textInput" value="女"></div><br/>
</ul>
`
function sexFunc(){
    let countSpan = `<span class='count'>${count}</span>`;
    let sex_html = countSpan + sex_template;
    const item = document.createElement('div');
    item.innerHTML = sex_html;
    common(item);

    item.id = randomString();
    temp = {id:item.id,type:'onlyChoose',title:'性别',value:[]};
    setData(item);
}

// 单项填空
const onlyBlank_template = `
    <span class='right-icon'>
        <img class="delete" src='img/delete.png'/>
        <img class="move" src='img/move.png'/>
    </span>
    <div class="title">
        <input type="text"  class="textInput" value="请填写本项内容"/>
    </div>
    <div class="box"></div>`;
function onlyBlank(){
    const item = document.createElement('div');
    let countSpan = `<span class='count'>${count}</span>`;
    let onlyBlank_html = countSpan + onlyBlank_template;
    item.innerHTML = onlyBlank_html;
    common(item);

    item.id = randomString();
    temp = {id:item.id,type:'onlyBlank',title:'请填写本项内容'};
    setData(item);
}

// 多项填空
const multiBlank_template = `
    <span class='right-icon'>
        <img class="delete" src='img/delete.png'/>
        <img class="move" src='img/move.png'/>
    </span>
    <div class="title">
        <input type="text" class="textInput" value="请填写以下内容"/>
    </div>
    <ul>
        <li class="option-list">
            <div class="option-item">
                <div class="title">
                    <input type="text" class="textInput" value="填空1"/>
                </div>
                <img class="delete2" src='img/delete2.png' />
            </div>
            <div class="box"></div>
        </li>
        <li class="option-list">
            <div class="option-item">
                <div class="title">
                    <input type="text" class="textInput" value="填空2"/>
                </div>
                <img class="delete2" src='img/delete2.png' />
            </div>
            <div class="box"></div>
        </li>
    </ul>
    <div class="btn-box">
        <button class="add-option-list">添加单个选项</button>
        <button>批量添加选项</button>
    </div>`;
function multiBlank(){
    let countSpan = `<span class='count'>${count}</span>`;
    let multiBlank_html = countSpan + multiBlank_template;
    const item = document.createElement('div');
    item.innerHTML = multiBlank_html;
    common(item);
    delete2Func(item);
    addBtn(item,'multiBlank');

    item.id = randomString();
    temp = {id:item.id,type:'multiBlank',title:'请填写以下内容',value:[]};
    setData(item);
}

// 单项选择
const onlyChoose_template = `
    <span class='right-icon'>
        <img class="delete" src='img/delete.png'/>
        <img class="move" src='img/move.png'/>
    </span>
    <div class="title">
        <input type="text" class="textInput" value="请选择一个选项"/>
    </div>
    <ul>
        <li class="option-list">
            <div class="option-item">
                <div class="title"><input type="radio" class="textdiv" name="only"><input type="text" class="textInput" value="选项1"></div>
                <img class="delete2" src='img/delete2.png' />
            </div>
        </li>
        <li class="option-list">
            <div class="option-item">
                <div class="title"><input type="radio" class="textdiv" name="only"><input type="text" class="textInput" value="选项2"></div>
                <img class="delete2" src='img/delete2.png' />
            </div>
        </li>
    </ul>
    <div class="btn-box">
        <button class="add-option-list">添加单个选项</button>
        <button>批量添加选项</button>
    </div>`;
function onlyChoose(){
    let countSpan = `<span class='count'>${count}</span>`;
    let onlyChoose_html = countSpan + onlyChoose_template;
    const item = document.createElement('div');
    item.innerHTML = onlyChoose_html;
    common(item);
    delete2Func(item);
    addBtn(item,'onlyChoose');

    item.id = randomString();
    temp = {id:item.id,type:'onlyChoose',title:'请选择一个选项',value:[]};
    setData(item);
}

// 多项选择
const multiChoose_template = `
    <span class='right-icon'>
        <img class="delete" src='img/delete.png'/>
        <img class="move" src='img/move.png'/>
    </span>
    <div class="title">
        <input type="text" class="textInput" value="请选择以下选项（多选）"/>
    </div>
    <ul>
        <li class="option-list">
            <div class="option-item">
                <div class="title"><input type="checkbox" class="textdiv"><input type="text" class="textInput" value="选项1"></div>
                <img class="delete2" src='img/delete2.png' />
            </div>
        </li>
        <li class="option-list">
            <div class="option-item">
                <div class="title"><input type="checkbox" class="textdiv"><input type="text" class="textInput" value="选项2"></div>
                <img class="delete2" src='img/delete2.png' />
            </div>
        </li>
    </ul>
    <div class="btn-box">
        <button class="add-option-list">添加单个选项</button>
        <button>批量添加选项</button>
    </div>`;
function multiChoose(){
    let countSpan = `<span class='count'>${count}</span>`;
    let multiChoose_html = countSpan + multiChoose_template;
    const item = document.createElement('div');
    item.innerHTML = multiChoose_html;
    common(item);
    delete2Func(item);
    addBtn(item,'multiChoose');

    item.id = randomString();
    temp = {id:item.id,type:'multiChoose',title:'请选择以下选项（多选）',value:[]};
    setData(item);
}

// 下拉选择
const onlySelect_template = `
    <span class='right-icon'>
            <img class="delete" src='img/delete.png'/>
            <img class="move" src='img/move.png'/>
    </span>
    <div class="title">
        <input type="text" class="textInput" value="请选择一个选项"/>
    </div>
    <ul>
        <li class="option-list">
            <div class="option-item">
                <div class="title">
                    <img class="circle" src="img/down.png"/>
                    <input type="text"  class="textInput" value="选项1"/>
                </div>
                <img class="delete2" src='img/delete2.png' />
            </div>
        </li>
        <li class="option-list">
            <div class="option-item">
                <div class="title">
                    <img class="circle" src="img/down.png"/>
                    <input type="text"  class="textInput" value="选项2"/>
                </div>
                <img class="delete2" src='img/delete2.png' />
            </div>
        </li>
    </ul>
    <div class="btn-box">
        <button class="add-option-list">添加单个选项</button>
        <button>批量添加选项</button>
    </div>
    `
function onlySelect(){
    let countSpan = `<span class='count'>${count}</span>`;
    let onlySelect_html = countSpan + onlySelect_template;
    const item = document.createElement('div');
    item.innerHTML = onlySelect_html;
    common(item);
    delete2Func(item);
    addBtn(item,'onlySelect');

    item.id = randomString();
    temp = {id:item.id,type:'onlySelect',title:'请选择一个选项',value:[]};
    setData(item);
}