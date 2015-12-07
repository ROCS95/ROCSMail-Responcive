             var user= new Array();
             var usuarioActual = [];
             var usuarios= [];
             var guardar= new Array();
             var enviar= new Array();             
             var usuarioActual = [];

         var rocsmail= rocsmail ||{

         User: function(firstname,lastname, contraseña, correo){
            this.firstname = firstname;
            this.lastname = lastname;
            this.contraseña = contraseña;
            this.correo = correo;
        },

        Enviados: function(destinatario,asunt, cuerpo){
            this.destinatario = destinatario;
            this.asunt = asunt;
            this.cuerpo = cuerpo;
        },

        Guardados: function(destino,asunto, body){
            this.destino = destino;
            this.asunto = asunto;
            this.body = body;
        },

        

 /*-------------------------------------------------------User---------------------------------------------------*/
 guardarUsuarios: function(){
      debugger

      var firstName = document.getElementById('firstname').value,
        lastname = document.getElementById('lastname').value,
        contraseña = document.getElementById('pass').value,
        email = document.getElementById('email').value;
      debugger
      if (firstName == "" || lastname == "" || contraseña == "" || email == ""){
        alert("Por favor inserte todos los datos solicitados");
      }else{
        var usuario1 = new rocsmail.User(firstName, lastname, contraseña, email);
        if(JSON.parse(localStorage.getItem("usuarios")) == null){
          var usuarios = [];
        }else{
          usuarios = JSON.parse(localStorage.getItem("usuarios"));
        }
        usuarios.push(usuario1);
        var cl = JSON.stringify(usuarios);
        location.href = "Index.html";
        localStorage.setItem("usuarios", cl);

        document.getElementById("firstname").value = "";
        document.getElementById("lastname").value = "";
        document.getElementById("pass").value = "";
        document.getElementById("email").value = "";
        alert("USUARIO AGREGADO")
      };
    },

 iniciarsesion: function(){
    var user = document.getElementById('mail').value,
        contra = document.getElementById('cont').value;
   var incorrect =false;
   debugger
   var usuarios = JSON.parse(localStorage.getItem("usuarios"));
   if (user == 'admin' && contra == '123') {
    console.log(user, contra);
    usuarioActual = new rocsmail.User("admin", "admin", "admin","123");
    localStorage.removeItem("usuarioActual");
    var d = JSON.stringify(usuarioActual);
    localStorage.setItem("usuarioActual", d);
    location.href = "salida.html";
    incorrect = true;
  }
  for (i in usuarios) {
    debugger
    console.log(usuarios[i].correo);
    console.log(usuarios[i].firstname);
    console.log(usuarios[i].lastname);
    console.log(usuarios[i].contraseña);
    if (usuarios[i].correo == user && usuarios[i].contraseña == contra) {
      location.href = "salida.html";
      localStorage.removeItem("usuarioActual");
      usuarioActual = usuarios[i];
      var d = JSON.stringify(usuarioActual);
      localStorage.setItem("usuarioActual", d);
      incorrect = true;
    };
  };
  if (incorrect == false){ alert("Usuario o contraseña incorrect, por favor intentelo de nuevo");};
},

UsuarioLabel: function(){
  debugger
      console.log(usuarioActual.lastname);

  usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
  document.getElementById("UserLogin").innerHTML = usuarioActual.firstname;
},

 /*------------------------------------------enviar/guardar correos---------------------------------------------------*/

  guardarCorreo: function(){
      debugger

      var correo = document.getElementById('correo').value,
        asinto = document.getElementById('asinto').value,
        body = document.getElementById('body').value;
        debugger
      if (correo == "" || asinto == ""){
        alert("No se puede guardar el correo sin asunto o destinatario");
      }else{
        var correo1 = new rocsmail.Guardados(correo, asinto, body);
        if(JSON.parse(localStorage.getItem("guardar")) == null){
          var guardar = [];
        }else{
          guardar = JSON.parse(localStorage.getItem("guardar"));
        }
        guardar.push(correo1);
        var cl = JSON.stringify(guardar);
        location.href = "salida.html";
        localStorage.setItem("guardar", cl);
        document.getElementById("correo").value = "";
        document.getElementById("asinto").value = "";
        document.getElementById("body").value = "";
        alert("Correo guardado con exito")
      };
    },

     enviarCorreo: function(){
      debugger

      var correo = document.getElementById('correo').value,
        asinto = document.getElementById('asinto').value,
        body = document.getElementById('body').value;
      debugger
      if (correo == "" || asinto == ""){
        alert("No se puede guardar el correo sin asunto o destinatario");
      }else{
        var correo1 = new rocsmail.Enviados(correo, asinto, body);
        if(JSON.parse(localStorage.getItem("enviar")) == null){
          var enviar = [];
        }else{
          enviar = JSON.parse(localStorage.getItem("enviar"));
        }
        enviar.push(correo1);
        var cl = JSON.stringify(enviar);
        location.href = "enviados.html";
        localStorage.setItem("enviar", cl);
        debugger
        document.getElementById("correo").value = "";
        document.getElementById("asinto").value = "";
        document.getElementById("body").value = "";
        alert("Correo enviado con exito")
      };
    },

 /*------------------------------------------Enviados---------------------------------------------------*/


MostrarEnviados: function(){ 
      enviar = JSON.parse(localStorage.getItem("enviar"));
      var table = document.getElementById("tblTablaEnviados");
      var i;
      var id = 0;
      for (i in enviar) {
       var row = table.insertRow(1);
       var cell1 = row.insertCell(0);
       var cell2 = row.insertCell(1);
       var cell3 = row.insertCell(2);
       cell1.innerHTML = enviar[i].destinatario;
       cell2.innerHTML = enviar[i].asunt;

           // crea un elemento "a" que va a ser el q encapsule a la imagen
    var link = document.createElement("A");
    link.setAttribute("onClick", "rocsmail.MostrarContenido(this)");
    link.setAttribute("id", id);
         // crea el elemento imagen
  var x = document.createElement("i");
  x.setAttribute("class","fa fa-file-text");

    // se lo agrega al elemento link que creo antes
    link.appendChild(x);

    // crea un elemento "a" que va a ser el q encapsule a la imagen
    var link2 = document.createElement("A");
    link2.setAttribute("onClick", "rocsmail.eliminarEnviados(this)");
    link2.setAttribute("id", id);
  // crea el elemento imagen
  var x2 = document.createElement("i");
  x2.setAttribute("class","fa fa-trash");
    // se lo agrega al elemento link que creo antes
    link2.appendChild(x2);
    // agrega el elmento al body o a quién sea donde se va a agregar, podria ser un div
    cell3.appendChild(document.body.appendChild(link));
    cell3.appendChild(document.body.appendChild(link2));
    id++;
  }
},
eliminarEnviados: function (obj){
  debugger;
  var i;
  enviar= JSON.parse(localStorage.getItem("enviar"));
  for (i in enviar)
    if (i == obj.id){
      var r = confirm("Esta seguro de que desea eliminar ?");
      if (r == true) {
        enviar.splice(i, 1);
        var cl = JSON.stringify(enviar);
        localStorage.setItem("enviar", cl);
        jQuery("#tblTablaEnviados").find("tr:gt(0)").remove();
        rocsmail.MostrarEnviados();
      } 
    }
  },

  MostrarContenido: function(obj){
    var i;
    enviar = JSON.parse(localStorage.getItem("enviar"));
    for (i in enviar)
      if (i == obj.id){
        modif = enviar[i];
        var tr = JSON.stringify(modif);
        localStorage.setItem("modif", tr);
        localStorage.setItem("ubicacion", obj.id);
        location.href="leer.html";
      };
    },

        CargarCorreo: function(){
      modif = JSON.parse(localStorage.getItem("modif"));
      debugger
      document.getElementById("correo").value = modif.destinatario;
      document.getElementById("asunto").value = modif.asunt;
      document.getElementById("body").value = modif.cuerpo;
    },


 /*------------------------------------------Guardados---------------------------------------------------*/

    MostrarGuardados: function(){ 
      guardar = JSON.parse(localStorage.getItem("guardar"));
      var table = document.getElementById("tblTablaSalida");
      var i;
      var id = 0;
      for (i in guardar) {
       var row = table.insertRow(1);
       var cell1 = row.insertCell(0);
       var cell2 = row.insertCell(1);
       var cell3 = row.insertCell(2);
       cell1.innerHTML = guardar[i].destino;
       cell2.innerHTML = guardar[i].asunto;

           // crea un elemento "a" que va a ser el q encapsule a la imagen
    var link = document.createElement("A");
    link.setAttribute("onClick", "rocsmail.editarCorreo(this)");
    link.setAttribute("id", id);
         // crea el elemento imagen
  var x = document.createElement("i");
  x.setAttribute("class","fa fa-pencil");

    // se lo agrega al elemento link que creo antes
    link.appendChild(x);

    // crea un elemento "a" que va a ser el q encapsule a la imagen
    var link2 = document.createElement("A");
    link2.setAttribute("onClick", "rocsmail.eliminarEnviados(this)");
    link2.setAttribute("id", id);
  // crea el elemento imagen
  var x2 = document.createElement("i");
  x2.setAttribute("class","fa fa-trash");
    // se lo agrega al elemento link que creo antes
    link2.appendChild(x2);
    // agrega el elmento al body o a quién sea donde se va a agregar, podria ser un div
    cell3.appendChild(document.body.appendChild(link));
    cell3.appendChild(document.body.appendChild(link2));
    id++;
  }
},
eliminarEnviados: function (obj){
  debugger;
  var i;
  guardar= JSON.parse(localStorage.getItem("guardar"));
  for (i in guardar)
    if (i == obj.id){
      var r = confirm("Esta seguro de que desea eliminar ?");
      if (r == true) {
        guardar.splice(i, 1);
        var cl = JSON.stringify(guardar);
        localStorage.setItem("guardar", cl);
        jQuery("#tblTablaSalida").find("tr:gt(0)").remove();
        rocsmail.MostrarEnviados();
      } 
    }
  },

  editarCorreo: function(obj){
    var i;
    guardar = JSON.parse(localStorage.getItem("guardar"));
    for (i in guardar)
      if (i == obj.id){
        modif = guardar[i];
        var tr = JSON.stringify(modif);
        localStorage.setItem("modif", tr);
        localStorage.setItem("ubicacion", obj.id);
        location.href="editarCorreo.html";
      };
    },

        CargarCorreoEdicion: function(){
      modif = JSON.parse(localStorage.getItem("modif"));
      debugger
      document.getElementById("correo").value = modif.destino;
      document.getElementById("asinto").value = modif.asunto;
      document.getElementById("body").value = modif.body;
    },

    GuardarCambiosCorreo: function(){
      debugger
      var location = localStorage.getItem("ubicacion");
      var correo = document.getElementById('correo').value,
        asinto = document.getElementById('asinto').value,
        body = document.getElementById('body').value;
      if (correo == "" || asinto == ""){
        alert("No se puede guardar sin asunto o destinatario");
        var si = false;
      }else{
        var Correo1 = new rocsmail.Guardados(correo, asinto, body);
        guardar = JSON.parse(localStorage.getItem("guardar"));
        guardar[location] = Correo1;
        var fc = JSON.stringify(guardar);
        localStorage.setItem("guardar", fc);
        alert("Correo guardado con exito. PD: elija salida o envidados, por alguna razon no se redirecciona solo.");
        var si = true;
      };
      if (si === true) {

        location.href = "salida.html";

      };
    },




  }