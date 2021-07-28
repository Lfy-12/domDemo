// 把表单数据添加到页面中
function writedata(){
    if(data.length == 0){
        form_data.innerHTML = '[]';
        return;
    }
    form_data.innerHTML = '';
    for(obj of data){
      form_data.innerHTML += `<p>${JSON.stringify(obj)}</p><br/>`;
      // form_data.scrollTo(0,form_data.scrollWidth)
    }
  }
  
// 初始化data,并添加增删改功能 同步data数据
function setData(item){
    // item中查找ul节点中的文本输入框,往temp中添加value值
    if(item.querySelector('ul')){
        const v_item = item.querySelector('ul').querySelectorAll('.textInput');
        for(let i=0;i<v_item.length;i++){
            v_item[i].id = randomString();
            temp.value.push({id:v_item[i].id,title:v_item[i].value})
        }
    }
    data.push(temp);
    writedata();

    // 修改item中的标题
    const input = item.querySelector('input');
    input.addEventListener('blur',function(){
        if(this.value !== getObj(data,item.id).title){
            getObj(data,item.id).title = this.value;
            writedata();
        }
    })

    // 修改list中的标题
    if(item.querySelector('ul')){
        const v_item = item.querySelector('ul').querySelectorAll('.textInput');
        let valueArr = getObj(data,item.id).value
        for(let i=0;i<v_item.length;i++){
            v_item[i].addEventListener('blur',function(){
                if(this.value !== getObj( valueArr ,v_item[i].id).title){
                    getObj( valueArr ,v_item[i].id).title = this.value;
                    writedata();
                }
            })
        }
    }

    // 删除item
    const deleteItem = item.querySelector('.delete');
    deleteItem.addEventListener('click',function(){
    // 必须在里面获取item的索引值，因为数组中的删除操作会影响索引值
    let index = data.indexOf(getObj(data,item.id));
    data.splice(index,1);
    writedata();
    })

    // 删除list
    const delete2 = item.querySelectorAll('.delete2');
    for(let i=0;i<delete2.length;i++){
    delete2[i].addEventListener('click',function(){
        const input = this.previousElementSibling.querySelector('.textInput');
        let valueArr = getObj(data,item.id).value
        let index = valueArr.indexOf(getObj(valueArr,input.id));
        getObj(data,item.id).value.splice(index,1);
        writedata();
    })
    }

    // 增加item中的小list
    if(item.querySelector('.add-option-list')){
    const addBtn = item.querySelector('.add-option-list');
    addBtn.addEventListener('click',function(){
        // 获取最新添加的节点中的input节点
        let input  = item.querySelector('ul').lastElementChild.querySelector('.textInput');
        input.id = randomString();
        let valueArr = getObj(data,item.id).value
        valueArr.push({id:input.id,title:input.value});
        writedata();

        // 给新添加的list绑定编辑和删除事件
        input.addEventListener('blur',function(){
            if(this.value !== getObj( valueArr ,input.id).title){
                getObj( valueArr ,input.id).title = this.value;
                writedata();
            }
        })

        let delete2  = item.querySelector('ul').lastElementChild.querySelector('.delete2');
        delete2.addEventListener('click',function(){
            let valueArr = getObj(data,item.id).value
            let index = valueArr.indexOf(getObj(valueArr,input.id));
            getObj(data,item.id).value.splice(index,1);
            writedata();
        })
    })
    }
    


}