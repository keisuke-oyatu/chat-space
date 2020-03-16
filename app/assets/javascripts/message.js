$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="message__box">
                      <p class="message__box__name">
                        ${message.user_name}
                      </p>
                      <p class="message__box__date">
                        ${message.created_at}
                      </p>
                    </div>
                    <p class="message__text">
                      ${message.text}
                      <div>
                        <img src=${message.image} class="lower-message__image">
                      </div>
                    </p>
                  </div>`
                return html;
    } else {
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="message__box">
                      <p class="message__box__name">
                        ${message.user_name}
                      </p>
                      <p class="message__box__date">
                        ${message.created_at}
                      </p>
                    </div>
                    <p class="message__text">
                      ${message.text}
                    </p>
                  </div>`
                return html;
    };
  }
  
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0){
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main__wrapper').append(insertHTML);
        $('.main__wrapper').animate({ scrollTop: $('.main__wrapper')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  
  $(".main__footer__text").on("submit",function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data)
      $(".main__wrapper").append(html);
      $(".main__wrapper").animate({ scrollTop: $(".main__wrapper")[0].scrollHeight});
      $(".main__footer__text")[0].reset();
      $(".main__footer__submit.btn").prop("disabled", false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});