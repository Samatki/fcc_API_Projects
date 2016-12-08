/* global $ */

$(document).ready(function(){
    $('button').click(function(){
        var dateBox = $('#dateEntryBox').val().toString();
        if(dateBox!=''){
            var APIurl = 'https://fcc-api1.herokuapp.com/API/' + dateBox;
            $.ajax({
                     crossDomain: true,
                type:'GET',
                dateType:'jsonp',
                url: APIurl,
                success:function(data){
               //     console.log(JSON.parse(data))
                    $('#responseHeader').css('display','block');
                    //$('#responseString').append(data);
                    $('#responseString').html(data);
                }
            })
        }
    });
});
