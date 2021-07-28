// 多级下拉
const multiSelect_template = `
    <span class='right-icon'>
    <img class="delete" src='img/delete.png'/>
    <img class="move" src='img/move.png'/>
    </span>
    <div class="title">
    <input type="text" class="textInput" value="请选择以下选项"/>
    </div>
    <div class="cascader_box">
    <select class="cascader_item first">
        <option>请选择</option>
    </select>
    <select class="cascader_item second">
        <option>请选择</option>
    </select>
    <select class="cascader_item third">
        <option>请选择</option>
    </select>
    <select class="cascader_item forth">
        <option>请选择</option>
    </select>
    </div>
    <div class="btn-box">
    <button class="edit-option-list">编辑选项</button>
    <button>导入选项</button>
    </div>
    <div class="add-cascader-choose">
        <div class="add-header">
        <span>编辑选项</sp>
        <img class="close" src="img/close.png" alt="" srcset="">
        </div>
        <div class="add-content">
            <div class="cascader first">
                <div class="cascader-header">
                    一级选项
                </div>
                <div class="cascader-list">
                    
                </div>
                <button class="add-cascader">+添加按钮</button>
            </div>
            <div class="cascader second">
                <div class="cascader-header">
                    二级选项
                </div>
                <div class="cascader-list">
                    <div class="input-box">
                        <input type="text" value="请选择" class="">
                    </div>
                </div>
                <button class="add-cascader">+添加按钮</button>
            </div>
            <div class="cascader third">
                <div class="cascader-header">
                    三级选项
                </div>
                <div class="cascader-list">
                    <div class="input-box">
                        <input type="text" value="请选择" class="">
                    </div>
                </div>
                <button class="add-cascader">+添加按钮</button>
            </div>
            <div class="cascader forth">
                <div class="cascader-header">
                    四级选项
                </div>
                <div class="cascader-list">
                    <div class="input-box">
                        <input type="text" value="请选择" class="">
                    </div>
                </div>
                <button class="add-cascader">+添加按钮</button>
            </div>
        </div>
        <div class="cascader_btn">
            <button>取消</button>
            <button>保存</button>
        </div>
    
    </div>`
function multiSelect(){

    let countSpan = `<span class='count'>${count}</span>`;
    let multiSelect_html = countSpan + multiSelect_template;
    const item = document.createElement('div');
    item.innerHTML = multiSelect_html;
    common(item);


    let cascader_data = [
        {
        name:"厂商1", 
        son:[ 
            { 
            name:"品牌一", 
            son:[{name:"型号1-1-1",son:[{name:"aaa"},{name:"1"}]},{name:"型号1-1-2",son:[{name:"sss"},{name:"2"}]}] 
            }, 
            { 
            name:"品牌二", 
            son:[{name:"型号1-2-1",son:[{name:"ddd"},{name:"3"}]},{name:"型号1-2-2",son:[{name:"fff"},{name:"4"}]}] 
            } 
            ] 
        },
        { 
        name:"厂商2", 
        son:[ 
            { 
            name:"2品牌一", 
            son:[{name:"型号2-1-1",son:[{name:"1"},{name:"11"}]},{name:"型号2-1-2",son:[{name:"2"},{name:"22"}]}] 
            }, 
            { 
            name:"2品牌二", 
            son:[{name:"型号2-2-1",son:[{name:"3"},{name:"33"}]},{name:"型号2-2-2",son:[{name:"4"},{name:"44"}]}] 
            } 
            ] 
        },
    ];
    let temp_cascader_data = [];
    let firstCount = 1;


    const btn = item.querySelector('.edit-option-list');
    const addBox = item.querySelector('.add-cascader-choose');
    const bg = document.querySelector('.bg');
    const close = item.querySelector('.close');
    // 编辑选项按钮
    btn.addEventListener('click',function(){
        addBox.style.display = 'block';
        bg.style.display = 'block';
        // 重置
        temp_cascader_data = deepCopy(cascader_data);
        showEditData();
    })
    // 关闭按钮(X小图标)
    close.addEventListener('click',function(){
        addBox.style.display = 'none';
        bg.style.display = 'none';
    })

    showIndexData(item,cascader_data)


    const cascader_btn = item.querySelector('.cascader_btn').querySelectorAll('button')
    // 取消按钮
    cascader_btn[0].addEventListener('click',function(){
        addBox.style.display = 'none';
        bg.style.display = 'none';
    })
    // 保存按钮--保存编辑好的数据，并重新渲染级联选择框
    cascader_btn[1].addEventListener('click',function(){
        cascader_data = temp_cascader_data;
        console.log(cascader_data);
        showIndexData(item,cascader_data)
        addBox.style.display = 'none';
        bg.style.display = 'none';
    })


    const first = addBox.querySelector('.first');
    const second = addBox.querySelector('.second');
    const third = addBox.querySelector('.third');
    const forth = addBox.querySelector('.forth');

    const cascaderList01 = first.querySelector('.cascader-list');
    const cascaderList02 = second.querySelector('.cascader-list');
    const cascaderList03 = third.querySelector('.cascader-list');
    const cascaderList04 = forth.querySelector('.cascader-list');

    // 添加按钮(四个)
    const firstBtn = first.querySelector('button');
    firstBtn.addEventListener('click',function(){
        const div = document.createElement('div');
        div.innerHTML = `
            <input type="text" value="选项${++firstCount}" index="${randomString()}">
            <img src="img/delete3-red.png" class="delete3"/>`;
        div.className = 'input-box';
        cascaderList01.appendChild(div);
        temp_cascader_data.push({id:div.querySelector('input').getAttribute('index'),name:div.querySelector('input').value});

        // const input = first.querySelectorAll('.input-box')
        // for(let i=0;i<input.length;i++){
        //     input[i].addEventListener('click',function(){
        //         for(let i=0;i<input.length;i++) input[i].className = 'input-box'
        //         this.className += ' add-cascader-active'
        //     })
        // }


    })




    function showEditData(){
        // 通过cascader_data数据 初始化编辑页面
        const templateHtml = `
        <div class="fake-input-box">
            <input type="text" value="请选择" class="" disabled>
        </div>`;
        
        cascaderList01.innerHTML = templateHtml;
        cascaderList02.innerHTML = templateHtml;
        cascaderList03.innerHTML = templateHtml;
        cascaderList04.innerHTML = templateHtml;
        
        cascader_data.forEach((v,k)=>{
            cascaderList01.innerHTML += `
            <div class="input-box">
                <input type="text" value="${v.name}" index="${k+1}">
                <img src="img/delete3-red.png" class="delete3"/>
            </div>`;
        })
        // cascader_data[0].son.forEach((v,k)=>{
        //     cascaderList02.innerHTML += `
        //     <div class="input-box">
        //         <input type="text" value="${v.name}" index="${k+1}">
        //         <img src="img/delete3-red.png" class="delete3"/>
        //     </div>`;
        // })
        // cascader_data[0].son[0].son.forEach((v,k)=>{
        //     cascaderList03.innerHTML += `
        //     <div class="input-box">
        //         <input type="text" value="${v.name}" index="${k+1}">
        //         <img src="img/delete3-red.png" class="delete3"/>
        //     </div>`;
        // })
        // cascader_data[0].son[0].son[0].son.forEach((v,k)=>{
        //     cascaderList04.innerHTML += `
        //     <div class="input-box">
        //         <input type="text" value="${v.name}" index="${k+1}">
        //         <img src="img/delete3-red.png" class="delete3"/>
        //     </div>`;
        // })

        const input01 = first.querySelectorAll('.input-box');
        first.querySelector('.fake-input-box').style.display = 'block';
        first.querySelector('.add-cascader').style.display = 'block';

        const deleteBtn01 = first.querySelectorAll('.delete3');
        // 给级联选择赋予点击事件
        for(let i=0;i<input01.length;i++){
            input01[i].addEventListener('click',function(){
                for(let t=0;t<input01.length;t++){
                    input01[t].className = 'input-box'
                }
                this.className += ' add-cascader-active'

                cascaderList02.innerHTML = templateHtml;
                cascaderList03.innerHTML = templateHtml;
                cascaderList04.innerHTML = templateHtml;
                if(cascader_data[i].son){
                    cascader_data[i].son.forEach((v,k)=>{
                        cascaderList02.innerHTML += `
                        <div class="input-box">
                            <input type="text" value="${v.name}" index="${k+1}">
                            <img src="img/delete3-red.png" class="delete3"/>
                        </div>`;
                    })
                }

                // 删除按钮
                for(let btn of deleteBtn01)  btn.style.display = 'none';
                deleteBtn01[i].style.display = 'block';

                deleteBtn01[i].addEventListener('click',function(){
                    // temp_cascader_data.splice(i,1);
                    console.log(temp_cascader_data[i]);
                    cascader_data = temp_cascader_data;
                    showEditData();
                    // const deleteBtn = first.querySelectorAll('.delete3');
                    // for(let btn of deleteBtn)  btn.style.display = 'none';
                })
                
                const btn02 = second.querySelector('.add-cascader');
                const btn03 = third.querySelector('.add-cascader');
                const btn04 = forth.querySelector('.add-cascader');

                btn02.style.display = 'block';
                btn03.style.display = 'none';
                btn04.style.display = 'none';

                const fake_input02 = second.querySelector('.fake-input-box');
                fake_input02.style.display = 'block';

                const input02 = second.querySelectorAll('.input-box');
                if(input02==0){
                    fake_input02.style.display = 'none';
                }

                for(let j=0;j<input02.length;j++){
                    input02[j].addEventListener('click',function(){
                        for(let j=0;j<input02.length;j++) input02[j].className = 'input-box'
                        this.className += ' add-cascader-active'
                        cascaderList03.innerHTML = templateHtml;
                        cascaderList04.innerHTML = templateHtml;
                        if(cascader_data[i].son[j].son){
                            cascader_data[i].son[j].son.forEach((v,k)=>{
                                cascaderList03.innerHTML += `
                                <div class="input-box">
                                    <input type="text" value="${v.name}" index="${k+1}">
                                    <img src="img/delete3-red.png" class="delete3"/>
                                </div>`;
                            })
                        }

                        btn03.style.display = 'block';
                        btn04.style.display = 'none';

                        const fake_input03 = third.querySelector('.fake-input-box');
                        fake_input03.style.display = 'block';

                        const input03 = third.querySelectorAll('.input-box');
                        if(input03==0){
                            fake_input03.style.display = 'none';
                        }

                        for(let q=0;q<input03.length;q++){
                            input03[q].addEventListener('click',function(){
                                for(let q=0;q<input03.length;q++) input03[q].className = 'input-box'
                                this.className += ' add-cascader-active'

                                cascaderList04.innerHTML = templateHtml;
                                if(cascader_data[i].son[j].son[q].son){
                                    cascader_data[i].son[j].son[q].son.forEach((v,k)=>{
                                        cascaderList04.innerHTML += `
                                        <div class="input-box">
                                            <input type="text" value="${v.name}" index="${k+1}">
                                            <img src="img/delete3-red.png" class="delete3"/>
                                        </div>`;
                                    })
                                }

                                btn04.style.display = 'block';

                                const fake_input04 = forth.querySelector('.fake-input-box');
                                fake_input04.style.display = 'block';

                                const input04 = forth.querySelectorAll('.input-box');
                                if(input04==0){
                                    fake_input04.style.display = 'none';
                                }

                            })
                        }
                    })
                }

            })
        }



    }   
}




// 封装的函数
    // 首页渲染级联选择框及其功能
function showIndexData(item,data){
    const first = item.querySelector('.first');
    const second = item.querySelector('.second');
    const third = item.querySelector('.third');
    const forth = item.querySelector('.forth');

    // 初始化一级级联菜单
    objInit(first);
    data.forEach((v,k)=>{
        first.innerHTML += `<option value="${k+1}">${v.name}</option>`  
    })

    // 一级菜单的change事件,改变二级菜单的数据
    first.addEventListener('change',function(){
        objInit(second)
        objInit(third)
        objInit(forth)

        data.forEach((v,k)=>{
            if(first.selectedIndex == k+1){
                v.son.forEach((sv,sk)=>{
                    second.innerHTML += `<option value="${sk+1}">${sv.name}</option>`
                })

                // 二级
                second.addEventListener('change',function(){
                    objInit(third)
                    objInit(forth)

                    v.son.forEach((sv,sk)=>{
                        if(second.selectedIndex == sk+1){
                            sv.son.forEach((tv,tk)=>{
                                third.innerHTML += `<option value="${tk+1}">${tv.name}</option>`
                            })

                            // 三级
                            third.addEventListener('change',function(){
                                objInit(forth)
                                
                                sv.son.forEach((tv,tk)=>{
                                    if(third.selectedIndex == tk+1){
                                        tv.son.forEach((fv,fk)=>{
                                            forth.innerHTML += `<option value="${fk+1}">${fv.name}</option>`
                                        })
                                    }
                                })
                            })
                        }
                    })
                })
            }
        })      
    })

    
}
function objInit(obj){ 
obj.innerHTML = '<option>请选择</option>'; 
}




