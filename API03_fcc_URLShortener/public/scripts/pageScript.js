/* global $ */

$(document).ready(function(){
    $('button').click(function(){
        var URLString = $('#URLEntryBox').val().toString();
        if(URLString!=''){
            var APIurl = 'https://fcc-api3.herokuapp.com/API/' + URLString;
            $.ajax({
            //crossDomain: true,
                type:'GET',
                dateType:'jsonp',
                url: APIurl,
                success:function(data){
                    console.log(data);
               //     console.log(JSON.parse(data))
                    $('#responseHeader').css('display','block');
                    //$('#responseString').append(data);
                    $('#responseString').html(data);
                }
            })
        }
    });
});
