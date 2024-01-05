class UserRegister{
    constructor(formId,formIdedit,tableId){
        this.formEl = document.getElementById(formId);
        this.formEledi = document.getElementById(formIdedit);
        this.tableId = document.getElementById(tableId);
        this.onSubmit();
        this.onEdit();
        this.selectAll();
        
    }
 //=================FUNÇAO DO BOTAO COM O PROMISSE==================
 onEdit(){
  document.querySelector('#box-user-update .btn-cancel').addEventListener("click",e=>{

  this.showPanelCreate();

  });
 
  this.formEledi.addEventListener("submit", event => {

    event.preventDefault();

    let btn = this.formEledi.querySelector("[type=submit]")

    btn.disabled = true;

    let values = this.getValues(this.formEledi);

    let index = this.formEledi.dataset.trIndex;

    let tr = this.tableId.rows[index];

    let userOld = JSON.parse(tr.dataset.user);

    let result = Object.assign({}, userOld, values);

    this.getPhoto(this.formEledi).then(
        (content) => {

            if (!values.photo){ 
                result._photo = userOld._photo;
            } else {
                result._photo = content;
            }

            let user = new User();

            user.loadFromJSON(result);

            user.save().then(user=>{

              this.getTr(user, tr);

              this.updateCount();
  
              this.formEledi.reset();
      
              this.showPanelCreate();
  
              btn.disabled = false;

            });

        }, 
        (e) => {
            console.error(e)
        }
    );

});

}

onSubmit(){

this.formEl.addEventListener("submit", event => {

    event.preventDefault();

    let btn = this.formEl.querySelector("[type=submit]");

    btn.disabled = true;

    let values = this.getValues(this.formEl);

    if (!values) return false;

    this.getPhoto(this.formEl).then(
        (content) => {

            values.photo = content;

            values.save().then(user=>{
              console.log(user);

               this.addLine(user);

               this.formEl.reset();
               
               btn.disabled = false;

            });


        }, 
        (e) => {
            console.error(e)
        }
    );

});

}
    
  
  //================================ FOTO COM PROMISSE====================================
 // getPhoto(){
  getPhoto(formEl){ 
  return new Promise((resolve, reject)=>{

    let fileReader = new FileReader();

  
      let elements = [...formEl.elements].filter(item => {
     

      if (item.name === "photo"){
        return item;
      }
    });

    let file = elements[0].files[0];

    fileReader.onload = ()=>{

     resolve(fileReader.result);

     };
    fileReader.onerror = (e)=>{

         reject(e)

    };

    if(file){

      fileReader.readAsDataURL(file);

    }else{
      resolve("image/boxed-bg.jpg");
    }
   

  });
  
}

formatDate(date){
  return date.getDate()+'/'+(date.getMonth()+1)+"/"+date.getFullYear()+' '+date.getHours()+":"+date.getMinutes();

}


    //===========PEGANDO O VALOR============//
 getValues(formEl){
        
   let user = {};
   let isvalid = true;

    
   //[...formFl.elements].forEach(function (field,index){
    [...formEl.elements].forEach(function (field,index){
     
     // console.log(field.value);
      //console.log(['nome','gmail'].indexOf(field.name));

      if (['name', 'email'].indexOf(field.name) > -1 && !field.value) {
       
          field.parentElement.classList.add("has-error");
         
          isvalid = false;
        
        }

        if (field.name === "gender") {

            if (field.checked) {
                user[field.name] = field.value
            }

        } else if(field.name == "admin") {

            user[field.name] = field.checked;
           // console.log(user[field.name] = field.checked);

        } else {

            user[field.name] = field.value
           // console.log( user[field.name] = field.value);

        }
    
        

    });

     if (!isvalid)  {
       return false;
      }
   
        
     return  new User(
      user.name, 
      user.gender, 
      user.birth, 
      user.country, 
      user.email, 
      user.password, 
      user.photo, 
      user.admin
         );  
    }
    //======FECHANDO O METODO GETVALUES ===========//

  
    selectAll(){

        User.getUserStorage().then(data=>{
      // HttpRequest.get('/user').then(data=>{ 

         data.users.forEach(dataUser =>{

        let user = new User();
  
         user.loadFromJSON(dataUser);
      
  
          this.addLine(user);
  
        });

        });

      //==================AJAX PURO=====================
     // let ajax = new XMLHttpRequest();

    // ajax.open('Get', '/users');

     // ajax.onload = event =>{

     //   let obj = { users : []};

     //   try{

      //    obj = JSON.parse(ajax.responseText);

     //   } catch(e){
  
      //  console.error(e);

  // }
        // obj.users.forEach(dataUser=>{

       // let user = new User();
  
       //  user.loadFromJSON(dataUser);
  
         // this.addLine(user);
  
       // });

     // };
     // ajax.send()
//=================================================================
    }

    addLine(usuario){
       
       let tr =  this.getTr(usuario);

         
         this.tableId.appendChild(tr);
        
   
        this.updateCount();

    }

    getTr(usuario, tr = null){

    if(tr === null) tr = document.createElement('tr');

    tr.dataset.user = JSON.stringify(usuario);

      tr.innerHTML = ` 
     
         <td><img src="${usuario.photo}" class="img-cicle"/></td> 
         <td>${usuario.name}</td>  
         <td>${usuario.email}</td>  
         <td>${(usuario.admin) ? "SIM" : "NAO"}</td> 
         <td>${Utils.dateFormat(usuario.register)}</td>  
       
         
         <td>
         <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
         <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
          </td>
      
    `;
    this.addEventsTr(tr);

    return tr;

    }

    addEventsTr(tr){
      tr.querySelector(".btn-delete").addEventListener('click', (e)=>{

       if(confirm('Deseja realmente excluir?')){
        let user = new User();  

        user.loadFromJSON(JSON.parse(tr.dataset.user));

        user.remove().then(data=>{

         tr.remove();

         this.updateCount();

        })

   
       }
      
      })
      tr.querySelector(".btn-edit").addEventListener('click', (e)=>{
       
       let json = JSON.parse(tr.dataset.user);
     
       this.formEledi.dataset.trIndex = tr.sectionRowIndex;

         
            for (let name in json) {
            
           let field = this.formEledi.querySelector("[name=" + name.replace("_", "") + "]");
               

                if (field) {
                    switch (field.type) {
                        case 'file':
                            continue;
                            break;
                        case 'radio':
                            field = this.formEledi.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] + "]");
                            field.checked = true;
                        break;
                        case 'checkbox':
                            field.checked = json[name];
                        break;

                        default:
                            field.value = json[name];

                    }

                    field.value = json[name];
                }


            }
            this.formEledi.querySelector('.foto').src = json._photo;

        this.showPanelUpdate();
       });
    }

    showPanelCreate(){

      document.querySelector('#box-user-create').style.display = "block";
      document.getElementById('box-user-update').style.display = "none";

    }

    showPanelUpdate(){

      document.querySelector('#box-user-create').style.display = "none";
      document.getElementById('box-user-update').style.display = "block";

    }

    updateCount()  {

      let numberUser = 0;
      let numberAdmin = 0;

     [...this.tableId.children].forEach(tr =>{

      

       numberUser++;

       

       let user = JSON.parse(tr.dataset.user);

       if(user._admin) numberAdmin++;
     
    
     })
     document.getElementById('number-user').innerHTML =  numberUser;
     document.getElementById('number-user-admin').innerHTML =  numberAdmin;

    }
}



