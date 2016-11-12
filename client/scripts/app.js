// YOUR CODE HERE:


  const app = {};
  app.init = () => {
    app.server = 'https://api.parse.com/1/classes/messages';
    app.fetch();
  };

  app.send = (messages) => {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
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
    app.fetch();
  };

  app.fetch = () => {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      date: 'order=-createdAt',
      contentType: 'application/json',
      success: function (data) {
        data.results.forEach(app.renderMessage);
        console.log('chatterbox: Message received');
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

  app.createMessage = () => {
    return {
      username: window.location.search.slice(10),
      text: $('.inputMessage').val()
    };
  };

  app.renderMessage = (result) => {
    $('#chats').append(`<div><p><a href='#'>${result.username}:</a><br>${result.text}</p></div>`);
  };

  app.renderRoom = (newRoom) => {
    $('#roomSelect').append(`<option> + ${newRoom} + </option>`);
  };

  $('#main').on('click', '.submitBtn', () => {
    app.send();
  });

  // app.createMessage = () => {
  //   return message = {
  //     username: 'Vivian',
  //     text: 'Holaaa!!!',
  //     roomname: 'lobby'
  //   };
  // }; 

  app.init();




