$(function(){
  function buildHTML(message){
    var showImage = (message.image) ? `<img class="main-chat__message__text__image" src=${message.image}>` : '' ;
    var html = 
      `<div class="main-chat__message" data-message-id=${message.id}>
        <div class="main-chat__message__upper-info">
          <div class="main-chat__message__upper-info__talker">
            ${message.user_name}
          </div>
          <div class="main-chat__message__upper-info__date">
            ${message.date}
          </div>
        </div>
        <div class="main-chat__message__text">
          ${message.content}
        </div>
        ${showImage}
      </div>`
      return html;
  };

  $("#new_message").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".main-chat__messages").append(html);
      $(".main-chat__messages").animate({ scrollTop: $(".main-chat__messages")[0].scrollHeight}, 'fast');
      $("#new_message")[0].reset();
      $(".main-chat__form__new__message__submit-btn").prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  });
  var reloadMessages = function() {
    if(window.location.href.match(/\/groups\/\d+\/messages/)) {
      var href = 'api/messages'  
      last_message_id = $(".main-chat__message:last").data("message-id");
      $.ajax({
        url: href,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = ``;
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__messages').append(insertHTML);
        $(".main-chat__messages").animate({ scrollTop: $(".main-chat__messages")[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert("メッセージ更新に失敗しました");
      });
    };
  }
  setInterval(reloadMessages, 7000);
});