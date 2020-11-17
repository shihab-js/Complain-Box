const c_name = document.getElementById("name");
const c_complain = document.getElementById("complain");
const c_complainTo = document.getElementById("complainTo");
const addComplain = document.getElementById("addComplain");

addComplain.addEventListener('click',fatchData);

function fatchData(e){
    e.preventDefault();
    var name = c_name.value;
    var compalin = c_complain.value;
    var compalinTo = c_complainTo.value;


    var id = name.slice(-1) + Math.floor(Math.random() * 10000);
    

    var compalin = {
        id : id,
        name : name,
        compalin : compalin,
        compalinTo : compalinTo

    }

   /*
    localStorage.setItem('test','google');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

    if(localStorage.getItem('bookmarks') === null){
        //init array
        var compalins = [];
        //add to array
        compalins.push(compalin);
        //set the local storage
        localStorage.setItem('bookmarks', JSON.stringify(compalins));
        
    }else{
        //Get bookmarks from localstorage
        var compalins = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmarks to array
        compalins.push(compalin);
        //Re-set back to localstorage
        localStorage.setItem('bookmarks',JSON.stringify(compalins));
        
    }

    document.getElementById("inputForm").reset();
    showComplains();
    
}

//retrive and show all book marks
function showComplains() {
    //Get the bookmarks from local storage
    var compalins = JSON.parse(localStorage.getItem('bookmarks'));
    var complainList = document.getElementById("complainList");

    complainList.innerHTML = "";

    //make output
    for (let i = 0; i < compalins.length; i++) {
        var id = compalins[i].id;
        var name = compalins[i].name;
        var compalin = compalins[i].compalin;
        var compalinTo = compalins[i].compalinTo;
    
        
        complainList.innerHTML +=`<div class="well">
                                    <h3>Complain id: ${id}</h3>
                                    <h4><i class="glyphicon glyphicon-user"></i>${name}</h4>
                                    <p><i class="glyphicon glyphicon-envelope"></i> Complain is: ${compalin}</p>
                                    <p><i class="glyphicon glyphicon-user"></i> Complain to: ${compalinTo}</p>
                                    <a onclick="deleteComplain('${id}')" class="btn btn-danger" href="#"><i class="fa fa-trash"> Delete complain</i></a>
                                    </div> `;

    }

}
function deleteComplain(id){
    var complains = JSON.parse(localStorage.getItem('bookmarks'));

    for (var i=0; i<complains.length; i++){
        if(complains[i].id == id){
            complains.splice(i,1);
        }
    }
    //reset the local storage
    localStorage.setItem('bookmarks', JSON.stringify(complains));
    // agin call showBookmark to update
    showComplains()
}