var Consultar = Consultar || {

    Init:()=>{
        Consultar.btnEnviarMensajeFormulario();
        Consultar.RenderizarMapa();        
    },
    RenderizarMapa: ()=>{
        //Calle 5 de mayo numero 14 , 92708 Alahualtitla, Chicontepec.
        let markerDescription = "<div style='text-align:center'><b >Tienda iban</b> </br> Calle 5 de mayo numero 14.</div>";
		let positionMarker = {            
			latitud: 20.926667529611432,
			longitud: -98.16680373051902
        };
        
		Consultar.ShowMap( 'showMap', markerDescription, positionMarker );
    },

    

    

    /**
    * target: string | Id div seccion mapa
    * htmlDescriptionContent: string | texto o html descripcion del marcador
    * positionMarker: object {latitud:float,longitud:float} | Posision del marcador a mostrar
    */
    ShowMap: function (target, htmlDescriptionContent, positionMarker) {
        // position we will use later
        var lat = positionMarker.latitud;
        var lon = positionMarker.longitud;

        // initialize map
        map = L.map(target).setView([lat, lon], 13);

        // set map tiles source
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',//'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 50,
        }).addTo(map);

        // add marker to the map
        marker = L.marker([lat, lon]).addTo(map);

        // add popup to the marker
        marker.bindPopup(htmlDescriptionContent).openPopup();
    },
    btnEnviarMensajeFormulario:()=>{
         $("#contactForm").validator().on('submit',function(e) {
            
             if(e.isDefaultPrevented()){
                formError();
                submitMSG(false, "Debe completar todos los campos requeridos");
             }else{                
                e.preventDefault();

                    var name = $("#name").val();
                    var email = $("#email").val();                    
                    var message = $("#message").val();
                var data  = {
                    name,
                    email,
                    message
                }
                Utils.post(base+'/php/send_email.php', data)
                .then((res)=>{                    
                    if(res.success){
                        $("#contactForm")[0].reset();
                        submitMSG(true,'Su consulta se ha enviado con éxito en breve el administrador se pondrá en contacto con usted al correo proporcionado.');

                    }else{
                        formError();
                        submitMSG(false,res.messageError);
                    }
                }).fail((err)=>{                    
                    formError();
                    submitMSG(false,res.messageError);
                });
             }
         });
    }
};