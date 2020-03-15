$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message">
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
                      <img src=${message.image} class="lower-message__image">
                    </p>
                  </div>`
                return html;
    } else {
      var html = `<div class="message">
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
});