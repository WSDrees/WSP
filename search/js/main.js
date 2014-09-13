var html="";
var q;
var courses;
var resultsContainer;
var noMatch = function(){
        var html = ''+
                '<p>No Results found.</p>'+
                '<p style="font-size:10px;">Try searching for "Pine Hills".  Just an idea.</p>'
            ;
        resultsContainer.html(html);
};
 var validate = function(query){

        // Trim whitespace from start and end of search query
        while(query.charAt(0) == ""){
            query = query.substring(1, query.length);
        }
        while(query.charAt(query.length-1) == ""){
            query = query.substring(0, query.length-1);
        }
        // Check search length, must have 3 characters
        if(query.length < 2){
            alert("Your search query is too small, try again.");
            // (DO NOT FIX THE LINE DIRECTLY BELOW)
            searchInput.focus();
            return;
        }else{
            search(query);
        }
};
    // Finds search matches
var search = function(query){

        // split the user's search query string into an array
        queryArray = query.split(" ");
        // array to store matched results from data.json
        var results = [];
        // loop through each index of courses array
        for(var i = 0, j= courses.length; i < j; i ++){

            // each course[i] is a single course item
            // save a lowercase variable of the courseName
            var dbitem = courses[i].courseName.toLowerCase();

            // loop through the user's search query words
            // save a lowercase variable of the search keyword
            for(var ii = 0; ii < queryArray.length; ii++){
                var qitem = queryArray[ii].toLowerCase();
                // is the keyword anywhere in the course name?
                // If a match is found, push full courses[i] into results array
                var compare = dbitem.indexOf(qitem);

                if(compare !== -1){
                    results.push(courses[i]);
                }
            }
            results.sort();
            // Check that matches were found, and run output functions
            if(results.length === 0){
                noMatch();
            }else{
                showMatches(results);
            }
        }
 };
var getdata=function(){

    $.ajax({
        url: "js/data.json",
        dataType: 'json',
        success: function(response){
           courses = response.courses;
            $.each(response.courses, function(i,item){
                courses[i] = response.courses[i];
            });
        }
    });

};
var showMatches = function(results){
    var html='';
    $.each(results, function( index, course ) {
        html += '<h2 class="cname">'+'Name: '+course.courseName +'</h2> ' +
            '<p class="cloc">'+'Location: '+course.courseLocation +'</p>' +
            '<p class="cpar">'+'Par: '+course.par +'</p>' +
            '<p class="cdistance">'+'Distance: '+course.distance +'</p>' +
            '<p class="cdesc">'+'Description: '+course.description +'</p>' +
            '<p class="hrow">'+'<hr>'+'</p>';
    });
    resultsContainer.html(html);
};
$( document ).ready(function() {
    //gets data from json file
    getdata();
    resultsContainer = $('#results');

    //on search
    $('#searchForm').on('submit', function(){
       q =  $('#search').val();
        validate(q);
        return false;
    });
});