// YOUR CODE HERE:

  var message = {
    username: 'Vivian',
    text: 'Holaaa!!!',
    roomname: 'lobby'
  };

  const app = {};
  app.init = () => {

  };

  app.send = (messages) => {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(messages),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  };

  app.fetch = () => {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      // url: 'https://api.parse.com/1/classes/messages',
      type: 'GET',
      success: function (data) {
        console.log(data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get message', data);
      }
    });
  };

  app.clearMessages = () => {
    $('#chats').empty();
  };

  app.renderMessage = (message) => {
    var $message = '<div>' + message + '</div>';
    $('#chats').append($message);
  };


