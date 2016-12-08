/* global $ */

$(document).ready(function(){
    $('button').click(function(){

            var APIurl = 'https://fcc-api2.herokuapp.com/API/';
            $.ajax({
        //     crossDomain: true,
                type:'GET',
                dateType:'json',
                url: APIurl,
                success:function(data){
                    $('#responseHeader').css('display','block');
                    $('#responseString').html(JSON.stringify(data));
                }
            })
        
    });
});
