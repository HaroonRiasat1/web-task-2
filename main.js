
document.querySelector("#bgInput").onchange =function(){
    bgColor();


};

document.querySelector("#search-form").onsubmit = function(event) {
    event.preventDefault();

    // Get the user's input
    let searchInput = document.querySelector("#search-id").value.trim();
    let limitInput = document.querySelector("#limit-id").value;

    // Encode the search input
    //let searchInput = encodeURIComponent(searchInput);

    // Prepare the endpoint to make a request to
    let endpoint = "https://itunes.apple.com/search?term=" + searchInput + "&limit=" + limitInput;

    console.log(endpoint);

    // alternate way to write string
    //let endpoint = `https://itunes.apple.com/search?term=${searchInput}&limit=${limitInput}`;

    // Make a HTTP request via AJAX to iTunes 
    let httpRequest = new XMLHttpRequest();
    // .open() - create a new request
    // 1st arg: the method
    // 2nd arg: the endpoint URL
    httpRequest.open("GET", endpoint);
    httpRequest.send();
    // Eventually iTunes will send us back a response. When it does, it will trigger the function below
    httpRequest.onreadystatechange = function() {
        console.log(httpRequest.readyState);
        if(httpRequest.readyState == 4) {
            if(httpRequest.status == 200) {
                // status 200 means success! we have a succesful response back from iTunes
                console.log(httpRequest.responseText);
                displayResults(httpRequest.responseText);
            }
            else {
                alert("AJAX error!!!");
                console.log(httpRequest.status);
            }
        }
    }
    console.log("moving on....");

}





function displayResults(resultsString) {
    // This function will actually display the results

    // Convert the JSON string into JS objects
    let resultsJS = JSON.parse(resultsString);
    console.log(resultsJS);

    // Display the result count
    document.querySelector("#num-results").innerHTML = resultsJS.resultCount; 

    // Clear the previous results
    document.querySelector("tbody").replaceChildren();

    // For every result that itunes gave us, we will create a table row
    for(let i = 0; i < resultsJS.results.length; i++) {

        let htmlString = `
        <tr id= ${resultsJS.results[i].trackName}>
            <td>
                <img src="${resultsJS.results[i].artworkUrl100}">
            </td>
            <td>
                ${resultsJS.results[i].artistName}
            </td>
            <td>
                ${resultsJS.results[i].trackName}
            </td>
            <td>
                ${resultsJS.results[i].collectionName}
            </td>
            <td>
                <audio src="${resultsJS.results[i].previewUrl}" controls></audio>
            </td>
            <td > <button id= ${resultsJS.results[i].trackName} onclick="remove()">Remove</button> <td/>
        </tr>
        `;

        // Add this <tr> to the <table>
        document.querySelector("tbody").innerHTML += htmlString;
    }
}
function bgColor()
{
    var color = document.getElementById("bgInput").value;
    document.body.style.background = color;
    console.log("hell")
}
function remove(){
    //remove the row with id of button

    var row = document.getElementById(this.id);
    row.parentNode.removeChild(row);

}

function remove1() {
    var row = document.getElementById("1");
    row.parentNode.removeChild(row);
}