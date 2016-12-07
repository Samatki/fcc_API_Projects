/* global $ */

$(document).ready(function(){
    $('button').click(function(){
        var dateBox = $('#dateEntryBox').val().toString();
        if(dateBox!=''){
            var APIurl = 'http://servertest1.samatki.c9users.io:8080/API/' + dateBox;
            $.ajax({
                     crossDomain: true,
                type:'GET',
                dateType:'jsonp',
                url: APIurl,
                success:function(data){
                    console.log(JSON.parse(data))
                    $('#responseHeader').css('display','block');
                    //$('#responseString').append(data);
                    $('#responseString').html(data);
                }
            })
        }
    });
});
