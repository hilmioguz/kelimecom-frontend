$(document).ready(function () {
  $("#login-form").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
      },
    },
    messages: {
      email: {
        required: siteLang === 'en' ? "This field is required!":"Bu alan zorunlu!",
        email: "Geçersiz e-posta!",
      },
      password: {
        required: siteLang === 'en' ? "This field is required!":"Bu alan zorunlu!",
      },
    },
  });

  $("#login-button").on("click", function () {
    if ($("#login-form").valid()) {
      const self = this;
      $(this).prop("disabled", true);
      $(this).html('<i class="fa fa-spinner fa-spin fa-lg fa-fw"></i>');
      setTimeout(() => {
        $(this).html("Giriş");
      }, 1000);
      $.ajax({
        url: "/login",
        method: "post",
        data: $("form#login-form").serialize(),
        success: function (response) {
          if (response == "success") {
            window.location = "/";
          } else {
            Swal.fire({
              title: "Hata!",
              text: "Yanlış giriş yaptınız!",
              icon: "error",
              confirmButtonText: "ok",
              heightAuto: false,
            });
            $(self).prop("disabled", false);
          }
        },
        error: function (err) {
          Swal.fire({
            title: "Hata!",
            text: err.responseText,
            icon: "error",
            confirmButtonText: "ok",
            heightAuto: false,
          });
          $(self).prop("disabled", false);
        },
      });
    }
  });

  $.validator.addMethod(
    "regex",
    function (value, element, regexp) {
      if (regexp.constructor != RegExp) regexp = new RegExp(regexp);
      else if (regexp.global) regexp.lastIndex = 0;
      return this.optional(element) || regexp.test(value);
    },
    "En az 1 harf ve 1 rakamdan oluşmak zorunda"
  );

  $.validator.addMethod(
    "validEmail",
    function (value, element) {
      if (value.length > 1) {
        if (
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
            value
          )
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    "Geçerli bir eposta adresi giriniz"
  );

  $("#register-form").validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      email: {
        required: true,
        email: true,
        validEmail: true,
      },
      password: {
        required: true,
        minlength: 8,
        regex: "[^wd]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))",
      },
      password2: {
        required: true,
        minlength: 8,
        equalTo: "#password",
        regex: "[^wd]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))",
      },
    },
    messages: {
      name: {
        required: siteLang === 'en' ? "This field is required!":"Bu alan zorunlu!",
        minlength: "minimum 3 karakter",
      },
      email: {
        required: siteLang === 'en' ? "This field is required!":"Bu alan zorunlu!",
        email: "Geçersiz e-posta!",
      },
      password: {
        required: siteLang === 'en' ? "This field is required!":"Bu alan zorunlu!",
        minlength: "minimum 8 karakter",
        atleastone: "en az 1 harf ve 1 rakam içermeli",
      },
      password2: {
        required: siteLang === 'en' ? "This field is required!":"Bu alan zorunlu!",
        minlength: "minimum 8 karakter",
        equalTo: "şifreler uyuşmuyor!",
        atleastone: "en az 1 harf ve 1 rakam içermeli",
      },
    },
  });

  $("button#register-button").on("click", function () {
    if ($("#register-form").valid()) {
      $(this).prop("disabled", true);
      $(this).html('<i class="fa fa-spinner fa-spin fa-lg fa-fw"></i>');
      const that = this;
      $.ajax({
        url: "/register",
        method: "post",
        data: $("#register-form").serialize(),
        success: function (result) {
          if (typeof result.errors == "undefined") {
            Swal.fire({
              title: "Başarılı!",
              text: "Kaydınızın tamamlanabilmesi için lütfen e-posta adresinize gönderilen onay linkini tıklayınız!",
              type: "success",
              heightAuto: false,
            }).then(() => {
              window.location = "/";
            });
          } else {
            let err = "";
            $(that).prop("disabled", false);
            $(that).html("ÜYE OL");
            result.errors.forEach(function (e) {
              // console.log(e.text);
              err += e.text + "\n";
              Swal.fire({
                title: "HATA!",
                text: err.message,
                type: "warning",
                heightAuto: false,
              });
            });
          }
        },
        error: function (errors) {
          $(that).prop("disabled", false);
          $(that).html("ÜYE OL");
          Swal.fire({
            title: "HATA!",
            text: errors.responseJSON.message,
            type: "warning",
            heightAuto: false,
          });
        },
      });
    }
  });

  $("#forgot-form").validate({
    rules: {
      email: {
        required: true,
        email: true,
        validEmail: true,
      },
    },
    messages: {
      email: {
        required: siteLang === 'en' ? "This field is required!":"Bu alan zorunlu!",
        email: "Geçersiz e-posta!",
      },
      password: {
        required: siteLang === 'en' ? "This field is required!":"Bu alan zorunlu!",
      },
    },
  });

  $("button#forgot-button").on("click", function () {
    if ($("#forgot-form").valid()) {
      $(this).prop("disabled", true);
      $(this).html('<i class="fa fa-spinner fa-spin fa-lg fa-fw"></i>');
      const that = this;
      $.ajax({
        url: "/forgot-password",
        method: "post",
        data: $("form#forgot-form").serialize(),
        success: function (result) {
          Swal.fire({
            title: "Başarılı işlem!",
            text: result,
            type: "success",
            heightAuto: false,
          }).then(() => {
            window.location = "/";
          });
        },
        error: function (err) {
          $(that).html("Gönder");
          $(that).prop("disabled", false);
          Swal.fire({
            title: "HATA:",
            text: err.responseJSON.message,
            type: "warning",
            heightAuto: false,
          });
        },
      });
    }
  });

  $("#reset-form").validate({
    rules: {
      password: {
        required: true,
        minlength: 8,
        regex: "[^wd]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))",
      },
      password2: {
        required: true,
        minlength: 8,
        equalTo: "#password",
        regex: "[^wd]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))",
      },
    },
    messages: {
      password: {
        required: siteLang === 'en' ? "This field is required!":"Bu alan zorunlu!",
        minlength: "minimum 8 karakter",
        atleastone: "en az 1 harf ve 1 rakam içermeli",
      },
      password2: {
        required: siteLang === 'en' ? "This field is required!":"Bu alan zorunlu!",
        minlength: "minimum 8 karakter",
        equalTo: "şifreler uyuşmuyor!",
        atleastone: "en az 1 harf ve 1 rakam içermeli",
      },
    },
  });

  $("button#reset-button").on("click", function () {
    if ($("#reset-form").valid()) {
      $(this).prop("disabled", true);
      $(this).html('<i class="fa fa-spinner fa-spin fa-lg fa-fw"></i>');
      const that = this;
      $.ajax({
        url: "/reset-password",
        method: "post",
        data: $("form#reset-form").serialize(),
        success: function (result) {
          Swal.fire({
            title: "Başarılı işlem!",
            text: result,
            type: "success",
            heightAuto: false,
          }).then(() => {
            window.location = "/";
          });
        },
        error: function (err) {
          $(that).html("Gönder");
          $(that).prop("disabled", false);
          Swal.fire({
            title: "HATA:",
            text: err.responseJSON.message,
            type: "warning",
            heightAuto: false,
          });
        },
      });
    }
  });
});
