//cookie
var expire = new Date();
expire.setHours(expire.getHours() + 4);
    

$('.login form').change(function (e){
    let $e = $(e.target); 
if($e.val().length >= 4 && $e.val().length <= 14) {
        if($e.is('.input_ic--user')) {
            let login = $e.val();
            $('.profile_info h4 a').html(login);    
            document.cookie = "login="+login+";expires="+expire.toUTCString()+";";   
        }
     }
        if($e.is('.input_ic--pass')) {
            let pass = $e.val();
            $('.navbar-form input').val(pass);    
            document.cookie = "pass="+pass+";expires="+expire.toUTCString()+";";    
        }    

});   
    
    $('.btn.login__btn').click(function (){
    let pass = $('.input_ic--pass').val();
        if( pass.length >= 1 && pass.length <= 24) {
          $('.navbar-form input').attr('value', pass);        
          document.cookie = "pass="+pass+";expires="+expire.toUTCString()+";";   
        }
        
        
    let login = $('.input_ic--user').val();
        if( login.length >= 4 && login.length <= 14) {
          $('.profile_info h4 a').html(login);    
          document.cookie = "login="+login+";expires="+expire.toUTCString()+";"; 
        }
});  
     
       
    let cookies = document.cookie.split(";");
    for(var i=0; i<cookies.length; i++){
    let key_cook = cookies[i].replace(/\s*(\w+)(?=\=).*/, '$1');
    let name_cook = cookies[i].replace(/.*\=(.*).*/, '$1');
   
    if(key_cook == 'login') {
        $('.profile_info h4 a').html(name_cook); 
    }
     if(key_cook == 'pass') {
        $('.navbar-form input').attr('value', name_cook); 
    }
};
//input#chkk
$('#chkk').click(function (){ console.log(1);
    $('input#chkk ').parent().toggleClass('ch_bg');
});
   

