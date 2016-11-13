// YOUR CODE HERE:
  const app = {};
  app.rooms = [];
  // default room, always lobby
  app.room = 'lobby';
  app.friendList = {};
  app.init = () => {
    app.server = 'https://api.parse.com/1/classes/messages';
    app.fetch();
  };
  app.send = (newNessage) => {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(newNessage),
      contentType: 'application/json',
      success: (data) => {
        console.log('chatterbox: Message sent');
      },
      error: (data) => {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
    app.clearMessages();
    app.fetch();
  };

  app.fetch = () => {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      data: 'order=-createdAt',
      contentType: 'application/json',
      success: (data) => {
        data.results.forEach(result => {
          if (result.roomname === app.room) {
            app.renderMessage(result);
          }
          if (!app.rooms.includes(result.roomname)) {
            app.rooms.push(result.roomname);
            app.renderRoom(result.roomname);
          }
        });
        console.log('chatterbox: Message received');
      },
      error: (data) => {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get message', data);
      }
    });
  };

  app.clearMessages = () => {
    $('#chats').html('');
  };

  app.createMessage = () => {
    var newMessage = {
      username: window.location.search.slice(10),
      text: $('.inputMessage').val().replace(/[&<>"'`!@$%()=+{}[\]]/g, replaceTag),
      roomname: $('#roomSelect').val() // current rooms name
    };
    app.send(newMessage);
  };

  app.renderMessage = (result) => {
    $('#chats').append(`<div id='#message'><p><a href='#' class='username'>${result.username}</a>:<br>${result.text}</p></div>`);
  };

  app.renderRoom = (roomname) => {
    if (roomname !== undefined && roomname !== null) {
      $('#roomSelect').append(`<option value=${roomname}>${roomname}</option>`);
    }
  };

  app.addFriends = (username) => {
    var friend = username.text();
    // if the user is not a friend, add friend, if already a friend, remove from friend list/unfriend
    if (!app.friendList.hasOwnProperty(friend)) {
      app.friendList[friend] = friend;
    } else {
      delete app.friendList[friend];
    }
  };

  // the username to bold
  app.handleUsernameClick = (username) => {
    $('.username').removeClass('friend');
    var clickedUser = username.text();
    // if the clicked username is a friend, add friend class to it
    if (app.friendList.hasOwnProperty(clickedUser)) {
      $('.username').each((index, user) => {
        if (user.text === clickedUser) {
          $(user).addClass('friend');
        }
      });
    }
  };

  var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '`': '&#96; ',
    '!': '&#33;',
    '@': '&#64;',
    '$': '&#36;',
    '%': '&#37;',
    '(': '&#40;',
    ')': '&#41;',
    '=': '&#61;',
    '+': '&#43;',
    '{': '&#123;',
    '}': '&#125;',
    '[': '&#91;',
    ']': '&#93;'
  };

  var replaceTag = (tag) => {
    return tagsToReplace[tag] || tag;
  };

  $(() => {
    $('#main').on('click', '.submit', () => {
      app.createMessage();
    });

    $('#roomSelect').on('change', (event) => {
      app.clearMessages();
      // for es6, this is bound to window instead of the current scope
      // use event.currentTarget to select the element of the selector
      // $(event.currentTarget) is the same as $(this) in es5 regular function
      app.room = $(event.currentTarget).val();
      app.fetch();
    });

    $('#chats').on('click', '.username', (event) => {
      app.addFriends($(event.currentTarget));
      app.handleUsernameClick($(event.currentTarget));
    });
  })

  app.init();





