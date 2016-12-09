/* global $ */

$(document).ready(function(){
    $('button').click(function(){
        
        if($(this).attr('id') == 'ImageSearchButton' ){
            var apiStr = 'iSearch/'
            var URLString = $('#ImageSearchEntryBox').val().toString();
                if(URLString==''){return;}
        } else {
            var apiStr = 'hSearch/'
            var URLString = '';
        }
        
            var APIurl = 'https://fcc-api4.herokuapp.com/API/' + apiStr + URLString;
            console.log(APIurl);
            $.ajax({
            //crossDomain: true,
                type:'GET',
                dateType:'jsonp',
                url: APIurl,
                success:function(data){
                    console.log(data);
               //     console.log(JSON.parse(data))
                    $('#responseHeader').css('display','block');
                    $('#responseString').html('<a href="'+APIurl+'" >'+APIurl+'</a>');
                }
            })
        
    });
});
