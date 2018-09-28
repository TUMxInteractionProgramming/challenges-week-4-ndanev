/* #6 start the #external #action and say hello */
console.log("App is alive");

/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 */

//#7 global variable currentChannel
var currentChannel;

//#7 global object currentLocation
var currentLocation = {
    longitude: 20.4489216,
    latitude: 44.786568,
    what3words: 'hinders.reading.slate'
}

function switchChannel(channelName) {
    //Log the channel switch
    console.log("Tuning in to channel", channelName);

    //#7 stored selected channel’s object in the currentChannel variable
    currentChannel = sevenContinents;

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = channelName.name;

    //#6 change the #channel #location
    //#7 used object properties for location
    document.getElementById('channel-location').innerHTML = 'by <a href="http://w3w.co/' + channelName.createdBy + '" target="_blank"><strong>' + channelName.createdBy + '</strong></a>';


    //#7 check if the starred property of the channel object is true and return the respective star
    var channelStar = document.getElementById("channel-star");
    channelName.starred == Boolean(true) ? channelStar.className = "fas" + " " + " fa-star" : channelStar.className = "far" + " " + " fa-star";


    /* #6 #liking channels on #click */
    $('#channel-star').attr('src', 'http://ip.lfe.mw.tum.de/sections/star-o.png');


    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelName + ')').addClass('selected');

}

/* #6 #liking a channel on #click */
function star() {
    //$('#channel-star').attr('src', 'http://ip.lfe.mw.tum.de/sections/star.png');
    $('#channel-star').toggleClass('fas far');

}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}



//#8 write constructor message function
function message(text) {
    this.createdBy = currentLocation.what3words;
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.longitude;
    this.createdOn = new Date();
    this.exipresOn = new Date(Date.now() + 15 * 60 * 1000);
    this.text = text;
    this.own = true;
}

//#8 create a send message function
function sendMessage() {

    var message = $('#message').val();

    $('#message').append(createMessageElement(message));

    //#8 scroll the #messages div to the bottom.
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    $('#message').val('');


}

//#8 create message element function
function createMessageElement(messageObject) {

    //calculate expireIn 
    var expireIn = Math.round((messageObject.expiredOn - Date.now()) / 60000);

    var messageContent = '<div class="message">' +
        '<h3><a href=' + messageObject.createdBy + 'target=' + '><strong>' + messageObject.createdBy +
        '</strong></a>' + messageObject.createdOn + '<em>:expiresIn: min. left</em></h3>' +
        '<p>' + messageObject.text + '</p>' +
        '<button>+5 min.</button>' +
        '</div>';

    return messageContent;

}

//#8 init listChannels function
function listChannels() {
    $('#channels ul').append(createChannelElement(yummy));
    $('#channels ul').append(createChannelElement(sevenContinents));
    $('#channels ul').append(createChannelElement(killerApp));
    $('#channels ul').append(createChannelElement(firstPersonOnMars));
    $('#channels ul').append(createChannelElement(octoberFest));

}

//#8 created createChannelElement function
function createChannelElement(channelObject) {

    var channel= $("<li></li>").text(channelObject.name);

    var meta = $("<span class='channel-meta'> </span>").appendTo(channel);

    $('<i>').addClass(channelObject.starred ? 'fas fa-star':'far fa-star').appendTo(meta);

    $("<span></span>").text(channelObject.expiresIn+' min').appendTo(meta);
    $("<span></span>").text(channelObject.messageCount+' new').appendTo(meta);


    $('<i>').addClass('fa fa-chevron-right').appendTo(meta);

    return channel;

}
