$(function(){
  function buildHTML(message){
    if ( message.image ) {
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
        <img class="main-chat__message__text__image" src=${message.image} >
      </div>`
    return html; 
  } else {
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
      </div>`
      return html;
    };
  }

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
})