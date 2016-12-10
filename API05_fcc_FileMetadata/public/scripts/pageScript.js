/* global $ */

$(document).ready(function(){
    $('form').submit(function(ev){
        
        ev.preventDefault();
        
        var myForm = document.getElementById('myForm');
        
        if($('FileEntryBox').val()!=''){
            var ls = new FormData(myForm);
                $('progress').attr('value',0)
                $('#uploadStatus').css('display','block');
                $('#uploadStatus').html('Uploading...');
                $('progress').css('display','block');
                $('#responseHeader').css('display','none');
                $('#responseString').html('');
            $.ajax({
                
     // PROGRESS UPLOADED CODED SHAMELESSLY POACHED FROM https://stackoverflow.com/questions/19126994/what-is-the-cleanest-way-to-get-the-progress-of-jquery-ajax-request //
                    xhr: function() {
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener("progress", function(evt) {
            if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                    $('progress').attr('value',percentComplete*100)
                    if(percentComplete == 1){
                        $('#uploadStatus').html('Upload Complete');
                    }
                    
                //Do something with upload progress here
            }
       }, false);
/*
       xhr.addEventListener("progress", function(evt) {
           if (evt.lengthComputable) {
               var percentComplete = evt.loaded / evt.total;
               //Do something with download progress
           }
       }, false); */

       return xhr;
    },
                // END POACHED CODE //
                
                url:'/get-file-size',
                data:ls,
                contentType : false,
                processData : false,
                type:'POST',
                success: function(data){
                $('#responseHeader').css('display','block');
                $('#responseString').html(JSON.stringify(data));
            }, error: function(err){
                $('#responseHeader').css('display','block');
                $('#responseString').html('ERROR: ' + JSON.stringify(err));
            }
            });
        }
        
    });
});
            
            
            


        
            
            
        
        