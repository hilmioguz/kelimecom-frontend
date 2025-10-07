
var navigation = new Navigation(document.getElementById("navigation"), {
  breakpoint: 992,
});

// Alt Sayfa Menü gösterimi
var navigation_hidden = new Navigation(
  document.getElementById("navigation-hidden"),
  {
    autoSubmenuIndicator: false,
    breakpoint: 999999,
  }
);

if ($("#btn-show").length > 0) {
  document
    .getElementById("btn-show")
    .addEventListener("click", navigation_hidden.toggleOffcanvas);
}

// Profil Menü
$("[data-sidenav]").sidenav();

var keywords = [
  "Bütün sözlüklerde arama yap",
  "Search all libraries",
  "Durchsuchen Sie alle Wörterbücher",
  "ابحث في جميع القواميس",
  "Bütün lüğətləri axtarın",
  "Rechercher dans tous les dictionnaires",
  "Поиск по всем словарям",
  "Որոնեք բոլոր բառարանները",
  "Vyhľadajte všetky slovníky",
];

!(function t() {
  var e = keywords.shift();
  if ($(".ana-arama-kutusu").val() === "") {
    $(".ana-arama-kutusu").addClass("fade"),
      setTimeout(function () {
        $(".ana-arama-kutusu").attr("placeholder", e).removeClass("fade");
      }, 500),
      keywords.push(e),
      setTimeout(t, 3000);
  }
})();

$(".sehirler-slider").slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 10,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 300,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
});

$(".kx-card__etimolojik-slider").slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 6,
  slidesToScroll: 1,
  variableWidth: true,
  nextArrow:
    '<span class="slider-arrow"><i class="fas fa-arrow-circle-right"></i></span>',
  prevArrow:
    '<span class="slider-arrow"><i class="fas fa-arrow-circle-left"></i></span>',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 300,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
});

$(".toggle").click(function (e) {
  e.preventDefault();

  var $this = $(this);

  if ($this.next().hasClass("show")) {
    $this.next().removeClass("show");
    $this.next().slideUp(350);
  } else {
    $this.parent().parent().find("li .inner").removeClass("show");
    $this.parent().parent().find("li .inner").slideUp(350);
    $this.next().toggleClass("show");
    $this.next().slideToggle(350);
  }
});

function loopNext(el) {
  $(`.sliderWrapper${el}`)
    .stop()
    .animate({ scrollLeft: "+=150" }, "fast", "linear", function (el) { loopNext(el); });
}

function loopPrev(el) {
  $(`.sliderWrapper${el}`)
    .stop()
    .animate({ scrollLeft: "-=150" }, "fast", "linear", function (el) { loopPrev(el); });
}

function stop(el) {
  $(`.sliderWrapper${el}`).stop();
}

$(document).on("click", "#nextEnCok", function () {
  loopNext('.enCok');
});
$(document).on("click", "#prevEnCok", function () {
  loopPrev('.enCok');
});

$(document).on("click", "#nextEnSon", function () {
  loopNext('.enSon');
});
$(document).on("click", "#prevEnSon", function () {
  loopPrev('.enSon');
});

$(document).on("click", "#next", function () {
  loopNext('.eAranan');
});
$(document).on("click", "#prev", function () {
  loopPrev('.eAranan');
});

$(document).ready(function () {
  const randompaketHeaderText = $("#randompaketHeaderText");
  if (randompaketHeaderText) {
    let depo = new Array(
      '<h3 class="koyu-turuncu">Akademisyen ve Öğrencilere Ücretsiz Arama İmkânı Sağlıyoruz.</h3><h5 class="weight-thin">Abone olan üniversitelerin personel ve öğrencileri ücretsiz kullanıyor. Detaylı Bilgi için Abone Kurumlara göz atın.</h5>',
      '<h3 class="koyu-turuncu">Ücretsiz Kayıt Olarak 15 Gün Sınırsız Kullanım Fırsatı Yakalayın</h3><h5 class="weight-thin">Daha fazla özelliğe mi ihtiyacınız var? Aşağıdaki tekliflere göz atın.</h5>'
    );
    if (siteLang === "en") {
      depo = new Array(
        '<h3 class="koyu-turuncu">We provide free search for academicians and students.</h3><h5 class="weight-thin">The staff and students of the subscribing universities use free of charge. For more information, check out the subscribers\' list.</h5>',
        '<h3 class="koyu-turuncu">15 days of unlimited use by registering free of charge</h3><h5 class="weight-thin">Do you need more features? Check out the following offers.</h5>'
      );
    }
    const randnotex = depo[Math.floor(Math.random() * depo.length)];
    randompaketHeaderText.html(randnotex);
  }
  var maxLength = 300;

  $(".show-read-more").each(function () {
    var myStr = $(this).text();
    if (!$(this).attr("data-formatted")) {
      $(this).attr("data-formatted", true);
      if ($.trim(myStr).length > maxLength) {
        var newStr = myStr.substring(0, maxLength);
        var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
        $(this).empty().html(newStr);
        $(this).append(
          ' <a href="javascript:void(0);" class="read-more devami-link">...devamı</a>'
        );
        $(this).append('<span class="more-text">' + removedStr + "</span>");
      }
    }
  });
  $(".read-more").click(function () {
    $(this).siblings(".more-text").contents().unwrap();
    $(this).remove();
  });
  //}
});

$(document).ready(function () {
  var btnOrnekGosterGizle = $(".btn-ornek-goster-gizle");

  btnOrnekGosterGizle.on("click", function () {
    //alert('Hobaa');
    $(this).nextAll(".ornekleri-goster").first().toggle();
    $(this).text(function (i, v) {
      return v === "~ örnekleri gör" ? "~ örnekleri gizle" : "~ örnekleri gör";
    });
    //$(this).text() === '~ örnekleri gör' ? '~ örnekleri gizle' : '~ örnekleri gör';
    //alert($(this).text());
  });
});

$(document).ready(function () {
  if ($(window).width() > 571) {
    var gosterGizle = $(".blok-goster-gizle");
    gosterGizle.addClass("gizle");
    gosterGizle.after('<a href="#" class="devami-link">... devamı</a>');

    gosterGizle.next("a.devami-link").on("click", function () {
      $(this).prev(gosterGizle).addClass("goster");
      $(this).hide();
    });
  }
});

$(document).ready(function () {
  var li = $("ol.body-text li");
  var btnDevam = '<a href="#" class="devami-link">... (devamı)</a>';

  li.filter(function () {
    return $(this).width() < $(this).children("span").width();
  }).after(btnDevam);

  $("body").on("click", ".devami-link", function (e) {
    e.preventDefault();
    $(this).prev("li").addClass("inline-goster");
    $(this).hide();
  });
});

// dil menu layout and click func starts
var contentDilBar = $("#autoDilNav"),
  dropdownDil = $("#autoDilNavMoreList"),
  more = $("#autoDilNavMore"),
  morea = $("#autoDilNavMore a");

more.click(function (e) {
  e.stopPropagation();
  dropdownDil.slideToggle(200);
});

$(document).click(function () {
  if (dropdownDil) {
    dropdownDil.slideUp(200);
  }
});

contentDilBar.on("click", "a.context-bar-link", function () {
  linkClick.call(this);
});

dropdownDil.on("click", "a.context-bar-link", function () {
  linkClick.call(this);
});

function linkClick() {
  contentDilBar.children().removeClass("active");
  dropdownDil.children().removeClass("active");
  this.classList.add("active");
  update();
  secilenDil = $(this).attr("data-keyword");
  if (secilenDil) {
    // console.log("secilen dil:", secilenDil);
    sessionStorage.setItem("secilenDil", secilenDil);
    sessionStorage.setItem("cozumleyiciSecilenDil", secilenDil);
  }
  const dilBySelect = document.querySelector("select.kelime-keyboard-selector");
  if (dilBySelect) {
    let langchosed = "osk";
    if (secilenDil !== "tumu") {
      langchosed = secilenDil;
    }
    dilBySelect.value = langchosed;
    dilBySelect.dispatchEvent(new Event("change"));
  }
}

function update() {
  let isinside = false;
  let selected = "";
  if (contentDilBar.children().hasClass("active")) {
    isinside = false;
  } else if (dropdownDil.children().hasClass("active")) {
    isinside = true;
    selected = $("#autoDilNavMoreList a.active").text();
  }
  if (isinside) {
    morea
      .html(selected + ' <i class="fas fa-ellipsis-h"></i>')
      .addClass("active");
  } else {
    morea
      .html('<i class="fas fa-ellipsis-h menu-goster"></i>')
      .removeClass("active");
  }
}

function autoNavMore() {
  const $mainMenu = $("#mainDilMenu");
  const $autoNav = $("#autoDilNav");
  const $autoNavMore = $("#autoDilNavMore");
  const $autoNavMoreList = $("#autoDilNavMoreList");

  if ($(window).width() >= 320) {
    // GET MENU AND NAV WIDTH
    const $menuWidth = $mainMenu.width();
    const $autoNavWidth = $autoNav.width();
    const $autoNavWidthD =
      $autoNav.width() > 0 ? $autoNav.width() + 110 : $autoNav.width();

    if ($autoNavWidthD > $menuWidth) {
      $autoNav.children(`a:last-child`).prependTo($autoNavMoreList);
      autoNavMore();
    } else {
      const $autoNavMoreFirst = $autoNavMoreList
        .children("a:first-child")
        .width();

      if ($autoNavWidth + Math.abs($autoNavMoreFirst) < $menuWidth) {
        $autoNavMoreList.children("a:first-child").appendTo($autoNav);
      }
    }
    if ($autoNavMoreList.children().length > 0) {
      $autoNavMore.show();
    } else {
      $autoNavMore.hide();
    }
  }
  update();
}
autoNavMore();
$(window).resize(autoNavMore);
// dil menu layout and click func ends

// dil menu layout and click func starts
var contentDilBar2 = $("#autoDilNav2"),
  dropdownDil2 = $("#autoDilNavMoreList2"),
  more2 = $("#autoDilNavMore2"),
  morea2 = $("#autoDilNavMore2 a");

more2.click(function (e) {
  e.stopPropagation();
  dropdownDil2.slideToggle(200);
});

$(document).click(function () {
  if (dropdownDil2) {
    dropdownDil2.slideUp(200);
  }
});

contentDilBar2.on("click", "a.context-bar-link", function () {
  linkClick2.call(this);
});

dropdownDil2.on("click", "a.context-bar-link", function () {
  linkClick2.call(this);
});

function linkClick2() {
  contentDilBar2.children().removeClass("active");
  dropdownDil2.children().removeClass("active");
  this.classList.add("active");
  update2();
  secilenDil = $(this).attr("data-keyword");
  if (secilenDil) {
    sessionStorage.setItem("cozumleyiciSecilenDil", secilenDil);
  }
  const cozumleyiciBlock = $("#cozumleyici-arama");
  const aranan = cozumleyiciBlock.attr("data-madde");
  const searchOptions = { secilenDil };
  if (aranan) {
    $("#cozumleyici-arama-sonucu").empty();
    const sonuckutusu = $("#cozumleyici-arama-sonucu");
    const skelotontemplate = `
    <a class="oneri-kelime cozumleyici-skelotontemplate skeleton-effect-wave">
    <div class="oneri-kelime__title"><p style="width: 50px;" class="skeleton-block"></p></div>
    <div class="oneri-kelime__okunusu"><p style="width: 70px;" class="skeleton-block"></p></div></a>
    <a class="oneri-kelime cozumleyici-skelotontemplate skeleton-effect-wave">
    <div class="oneri-kelime__title"><p style="width: 50px;" class="skeleton-block"></p></div>
    <div class="oneri-kelime__okunusu"><p style="width: 70px;" class="skeleton-block"></p></div></a>
    <a class="oneri-kelime cozumleyici-skelotontemplate skeleton-effect-wave">
    <div class="oneri-kelime__title"><p style="width: 50px;" class="skeleton-block"></p></div>
    <div class="oneri-kelime__okunusu"><p style="width: 70px;" class="skeleton-block"></p></div></a>
    `;
    sonuckutusu.append(skelotontemplate);
    cozumleyiciSearch(aranan, searchOptions, true, 1, 100);
  }
}

function update2() {
  let isinside = false;
  let selected = "";
  if (contentDilBar2.children().hasClass("active")) {
    isinside = false;
  } else if (dropdownDil2.children().hasClass("active")) {
    isinside = true;
    selected = $("#autoDilNavMoreList2 a.active").text();
  }
  if (isinside) {
    morea2
      .html(selected + ' <i class="ml-1 fas fa-ellipsis-h"></i>')
      .addClass("active");
  } else {
    morea2
      .html('<i class="fas fa-ellipsis-h menu-goster"></i>')
      .removeClass("active");
  }
}

function autoNavMore2() {
  const $mainMenu = $("#mainDilMenu2");
  const $autoNav = $("#autoDilNav2");
  const $autoNavMore = $("#autoDilNavMore2");
  const $autoNavMoreList = $("#autoDilNavMoreList2");

  if ($(window).width() >= 320) {
    // GET MENU AND NAV WIDTH
    const $menuWidth = $mainMenu.width();
    const $autoNavWidth = $autoNav.width();
    const $autoNavWidthD =
      $autoNav.width() > 0 ? $autoNav.width() + 130 : $autoNav.width();

    if ($autoNavWidthD > $menuWidth) {
      $autoNav.children(`a:last-child`).prependTo($autoNavMoreList);
      autoNavMore2();
    } else {
      const $autoNavMoreFirst = $autoNavMoreList
        .children("a:first-child")
        .width();

      if ($autoNavWidth + Math.abs($autoNavMoreFirst) < $menuWidth) {
        $autoNavMoreList.children("a:first-child").appendTo($autoNav);
      }
    }
    if ($autoNavMoreList.children().length > 0) {
      $autoNavMore.show();
    } else {
      $autoNavMore.hide();
    }
  }
  update2();
}
autoNavMore2();
$(window).resize(autoNavMore2);
// dil menu layout2 and click func ends



$(function () {
  $('[data-toggle="popover"]').popover();
});

function getMyDomain() {
  var myorigin = $(location).attr("origin");
  var mydomain = "";
  if (myorigin) {
    mydomain = myorigin;
  }
  return mydomain;
}

var timeout = null;

var searchOptions = {};
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function searchFormatter({ aranan, data, error }) {
  var sonuckutusu = $("#arama-onerileri");
  var sanalKlavyeBtnIcon = $("#smart-keyboard-toggle i.fa-keyboard");
  let temp = "";

  temp = '<ul class="card show shadow">';

  let q = "";
  if (secilenDil && secilenDil !== "tumu" && !secilenTip) {
    q += `/${secilenDil}`;
  } else if (!secilenDil && secilenTip) {
    q += `/tumu/${secilenTip}`;
  } else if (secilenDil && secilenTip) {
    q += `/${secilenDil}/${secilenTip}`;
  } else {
    q += ``;
  }
  const ara = encodeURIComponent(aranan) + q;
  temp +=
    '<li><a href="/arama/' +
    ara +
    '"><div class="dil-kutu dil-en">tüm</div><div class="arama-onerisi"><span>' +
    aranan +
    '</span></div><div class="sonuc-turu">[tüm sonuçlar]</div></a></li>';

  if (data) {
    data.forEach((item) => {
      let langs = "";
      let tipler = "";
      let anlam = "";

      const link = item.madde;
      
      // whichDict içinden dil ve tip bilgisi al
      const firstDict = item.whichDict && item.whichDict[0] ? item.whichDict[0] : {};
      // Compute language: only accept 2-letter codes; otherwise default to 'tr'
      const rawLang = String(item.lang || firstDict.lang || 'tr').toLowerCase();
      const displayLang = /^[a-z]{2}$/.test(rawLang) ? rawLang : 'tr';
      const tip = firstDict.tip && firstDict.tip[0] ? firstDict.tip[0] : (item.tip || '');
      const anlamText = firstDict.anlam || '';
      
      temp += `<li><a href="/kelime/${encodeURIComponent(link)}/${item.maddeId || item._id}/${displayLang}">`;
      // Badge text is hidden via CSS; icon shown by background image
      langs = `<div class="dil-kutu dil-${displayLang}"></div>`;
      temp += langs + `<div class="arama-onerisi">`;
      const word = item.madde.replaceAll(aranan, `<span>${aranan}</span>`);
      temp += word;
      
      // Kısa anlam ekle (ilk 80 karakter)
      if (anlamText && anlamText.length > 0) {
        const shortAnlam = anlamText.length > 80 ? anlamText.substring(0, 80) + '...' : anlamText;
        temp += `<div class="anlam-ozet" style="font-size: 0.85em; color: #666; margin-top: 2px;">${shortAnlam}</div>`;
      }
      
      temp += `</div><div class="sonuc-turu">`;
      tipler = tip ? `[${tip}]` : "";
      temp += tipler + `</div></a></li>`;
    });
    temp += "</ul>";

    sonuckutusu.empty().append(temp);
  }
  if (error) {
    temp += "</ul>";
    sonuckutusu.empty().append(temp);
  }
}

async function cozumleyiciSearchFormatter({ aranan, data, meta, error }) {
  $("#enlerSection").hide();
  if (meta && meta.page === 1) {
    setLangSonucCozumleyiciLayouts(meta.lang);
  }
  const cozumleyiciBlock = $("#cozumleyici-arama");
  if (cozumleyiciBlock) {
    cozumleyiciBlock.attr("data-madde", aranan);
    cozumleyiciBlock.attr("data-page", meta && meta.page ? meta.page : 1);
  }
  let temp = "";
  const dahafazlaButton = $("#cozumleyici-arama-dahafazla");

  if (data) {
    data.forEach((item) => {
      temp += `<a href="/arama/${encodeURIComponent(
        item.madde
      )}/${item.lang.toLowerCase()}" class="oneri-kelime">
            <div class="oneri-kelime__title">${item.madde}</div>
            <div class="oneri-kelime__okunusu">${item.karsimadde && item.karsimadde.length > 0 ? item.karsimadde.map(x => x.madde).join(', ') : ""
        } (${item.lang})</div></a>
            `;
    });
  }
  $("#cozumleyici-arama-sonucu").append(temp);
  $(".cozumleyici-skelotontemplate").remove();

  if (meta && meta.page * meta.perpage > meta.total) {
    dahafazlaButton.remove();
  } else {
    if (dahafazlaButton.length === 0) {
      let showmore = 'Daha fazla sonuç göster';
      if (siteLang == "en") {
        showmore = 'Show more results';
      }
      cozumleyiciBlock.append(
        '<div class="yukleniyor" id="cozumleyici-arama-dahafazla"><span>' + showmore + '</span></div>'
      );
    }
  }
  let totalfound100 = `En iyi sonuç ve tahminler <strong>toplam ${meta.total}</strong> kelime bulundu. Not: Gösterilen <strong>sonuç sayısı 100'le sınırlı</strong> olduğu için lütfen aramanızı daraltınız.`;
  let totalfound = `En iyi sonuç ve tahminler <strong>toplam ${meta.total}</strong> kelime bulundu.`;

  if (siteLang == "en") {
    totalfound100 = `The best results and estimates found a total of <strong>${meta.total}</strong> words. Note: Since the number of results is limited to 100, please narrow your search.`;
    totalfound = `The best results and estimates found a total of <strong>${meta.total}</strong> words.`;
  }
  if (meta.total > 100) {
    $("#sonucMeta").html(totalfound100);
  } else {
    $("#sonucMeta").html(totalfound);
  }

  if (meta.page === 1) {
    $("#cozumleyiciSonuc").show();
    autoNavMore2();
    $("html, body").animate(
      {
        scrollTop: $("#cozumleyiciSonuc").offset().top,
      },
      800,
      "easeOutExpo"
    );
  }
}

function generalSearch(
  aranan,
  searchOptions,
  advanced = false,
  page = 1,
  perpage = 7
) {
  const payload = {};
  payload.limit = perpage;
  payload.page = Number(page) || 1;
  payload.searchFilter = {};

  if (advanced) {
    payload.searchTerm = aranan;
    payload.searchType = "advanced";
  } else {
    payload.searchTerm = aranan;
    payload.searchType = "ilksorgu";
  }
  if (searchOptions) {
    if (searchOptions.secilenDil) {
      payload.searchFilter.dil = searchOptions.secilenDil;
    }
    if (searchOptions.secilenTip) {
      payload.searchFilter.tip = searchOptions.secilenTip;
    }
    if (searchOptions.secilenSozluk) {
      payload.searchFilter.sozluk = searchOptions.secilenSozluk;
    }
  }
  payload.searchFilter.filterOrders = siteDilleriComma;
  $.ajax({
    url: "/ajaxCall",
    accepts: "application/json; charset=utf-8",
    method: "post",
    data: payload,
    data: { json: JSON.stringify(payload) },
    dataType: "json",
    timeout: 30000, // 30 saniye timeout
    success: function ({ data, meta }) {
      searchFormatter({ aranan, data, error: null });
    },
    error: function (xhr, status, error) {
      if (xhr.status === 429) {
        // Rate limiting hatası
        const response = xhr.responseJSON;
        let message = response.error || 'Arama limiti aşıldı.';
        
        if (response.userType === 'guest') {
          message += ' Daha fazla arama yapmak için <a href="/register">kayıt olun</a>.';
        }
        
        // Kullanıcıya bilgi ver
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: 'Arama Limiti',
            html: message,
            icon: 'warning',
            confirmButtonText: 'Tamam'
          });
        } else {
          alert(message);
        }
        
        searchFormatter({ aranan, data: null, error: { message: message } });
      } else if (xhr.status === 408 || status === 'timeout') {
        // Timeout hatası
        let message = 'Arama işlemi zaman aşımına uğradı. Lütfen tekrar deneyin.';
        
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: 'Zaman Aşımı',
            text: message,
            icon: 'warning',
            confirmButtonText: 'Tamam'
          });
        } else {
          alert(message);
        }
        
        searchFormatter({ aranan, data: null, error: { message: message } });
      } else {
        searchFormatter({ aranan, data: null, error });
      }
    },
  });
}

function cozumleyiciSearch(
  aranan,
  searchOptions,
  advanced = true,
  page = 1,
  perpage = 10
) {
  const searchicon = $(".arama-buyutec");
  if (searchicon) {
    searchicon.attr("src", "/assets/img/download.gif");
  }
  const payload = {};
  payload.searchFilter = {};
  if (advanced) {
    payload.searchTerm = aranan;
    payload.searchType = "advanced";
    payload.limit = perpage;
    payload.page = Number(page) || 1;
  } else {
    payload.searchTerm = aranan;
  }
  if (searchOptions) {
    if (searchOptions.secilenDil) {
      payload.searchFilter.dil = searchOptions.secilenDil;
    }
    if (searchOptions.secilenTip) {
      payload.searchFilter.tip = searchOptions.secilenTip;
    }
    if (searchOptions.secilenSozluk) {
      payload.searchFilter.sozluk = searchOptions.secilenSozluk;
    }
  }
  payload.searchFilter.filterOrders = siteDilleriComma;

  console.log('🔍 cozumleyiciSearch ajax call starting...', payload);
  $.ajax({
    url: "/ajaxCall",
    method: "post",
    accepts: "application/json; charset=utf-8",
    data: { json: JSON.stringify(payload) },
    dataType: "json",
    timeout: 30000, // 15 saniye timeout
    success: function ({ data, meta }) {
      console.log('✅ cozumleyiciSearch success:', { data, meta });
      cozumleyiciSearchFormatter({ aranan, data, meta, error: null });
      if (searchicon) {
        searchicon.attr("src", "/assets/img/search.svg");
      }
    },
    error: function (xhr, status, error) {
      console.error('❌ cozumleyiciSearch error:', { xhr, status, error });
      if (xhr.status === 429) {
        // Rate limiting hatası
        const response = xhr.responseJSON;
        let message = response.error || 'Arama limiti aşıldı.';
        
        if (response.userType === 'guest') {
          message += ' Daha fazla arama yapmak için <a href="/register">kayıt olun</a>.';
        }
        
        // Kullanıcıya bilgi ver
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: 'Arama Limiti',
            html: message,
            icon: 'warning',
            confirmButtonText: 'Tamam'
          });
        } else {
          alert(message);
        }
      } else if (xhr.status === 408 || status === 'timeout') {
        // Timeout hatası
        let message = 'Arama işlemi zaman aşımına uğradı. Lütfen tekrar deneyin.';
        
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: 'Zaman Aşımı',
            text: message,
            icon: 'warning',
            confirmButtonText: 'Tamam'
          });
        } else {
          alert(message);
        }
      }
      
      cozumleyiciSearchFormatter({ aranan, data: null, meta: null, error });
      if (searchicon) {
        searchicon.attr("src", "/assets/img/search.svg");
      }
    },
  });
}
$("[data-toggle=tooltip").tooltip();


// Diller
function setLangFilterLayouts() {
  //dilleri filtrele modalı
  let aktifLanguages = sessionStorage.getItem("sessionLanguages")
  if (aktifLanguages) {
    aktifLanguages = JSON.parse(aktifLanguages)
    if (aktifLanguages && aktifLanguages.length) {
        let temp = "";
        aktifLanguages.forEach(function (dil) {
          console.log('dil value:', dil.value)
          temp += `<div class="custom-control custom-checkbox" id="_${dil.value}">
          <input type="checkbox" class="custom-control-input" id="id_${dil.value}" ${dil.isActive ? 'checked' : ''} >
          <label class="custom-control-label" for="id_${dil.value}">
          <div class="title mr-3">${getLang(dil.value)}</div>
          <div class="adet"></div>
          <span class="sort-handle"></span>
          </label></div>`;
        });
        if ($(".dil-siralama")) {
          $(".dil-siralama").html(temp);
        }
    }
  }
}

async function setLangFrontLayouts() {
  let aktifDiller = await getAktifDiller('array');
  let meta = $("#metaHolder").attr("data-meta");
  if (meta) {
    meta = JSON.parse(meta);
    if (meta.sonucFiltreTip) {
      secilenTip = meta.sonucFiltreTip;
    }
    if (meta.sonucFiltreDil) {
      secilenDil = meta.sonucFiltreDil;
    }
  }
  if ($("#autoDilNav") && meta.sonucPath == "arama") {
    if (aktifDiller) {
      let temp = "";
      if (
        meta.sonucFiltreTip === "tumu" ||
        meta.sonucFiltreTip === "undefined" ||
        !meta.sonucFiltreTip
      ) {
        temp = `<a href="${meta && meta.sonucPath === "arama"
          ? "/arama/" + encodeURIComponent(meta.sonucKelime)
          : "#"
          }" class="context-bar-link ${!secilenDil || secilenDil == "tumu" ? "active" : ""
          }" data-keyword="tumu">${getLang('tumu')}</a>`;
      } else {
        temp = `<a href="${meta && meta.sonucPath === "arama"
          ? "/arama/" + encodeURIComponent(meta.sonucKelime) + "/tumu/" + meta.sonucFiltreTip
          : "#"
          }" class="context-bar-link ${!secilenDil || secilenDil == "tumu" ? "active" : ""
          }" data-keyword="tumu">${getLang('tumu')}</a>`;
      }
      aktifDiller.forEach(function (dil) {
        temp += `<a href="${meta && meta.sonucPath === "arama"
          ? "/arama/" +
          encodeURIComponent(meta.sonucKelime) +
          "/" +
          dil +
          "/" +
          meta.sonucFiltreTip
          : "#"
          }" class="context-bar-link ${secilenDil == dil ? "active" : ""
          }" data-keyword="${dil}">${getLang(dil)}</a>`;
      });

      $("#autoDilNav").html(temp);
    }
  }
}

async function setLangTopLayouts() {
  let aktifDiller = await getAktifDiller('array');
  let meta = $("#metaHolder").attr("data-meta");
  if (meta) {
    meta = JSON.parse(meta);
    if (meta.sonucFiltreTip) {
      secilenTip = meta.sonucFiltreTip;
    }
    if (meta.sonucFiltreDil) {
      secilenDil = meta.sonucFiltreDil;
    }
  }

  if (aktifDiller) {
    let temp = "";

    temp = `<a href="#" class="dropdown-item" data-keyword="tumu">${getLang('tumu')}</a>`;
    aktifDiller.forEach(function (dil) {
      temp += `<a href="#" class="dropdown-item" data-keyword="${dil}">${getLang(
        dil
      )}</a>`;
    });
    if ($("#dilsectop")) {
      $("#dilsectop").html(temp);
    }
  }
}

async function setLangSearcBarLayouts() {
  let meta = $("#metaHolder").attr("data-meta");
  if (meta) {
    meta = JSON.parse(meta);
  }
  if ($("#autoDilNav") && meta.sonucPath != "arama") {
    let temp = "";

    let aktifDiller = await getAktifDiller('array');

    if (aktifDiller) {
      if (secilenDil == "tumu" || !secilenDil) {
        temp = `<a class="context-bar-link active" data-keyword="tumu">${getLang('tumu')}</a>`;
      } else {
        temp = `<a class="context-bar-link" data-keyword="tumu">${getLang('tumu')}</a>`;
      }
      aktifDiller.forEach(function (dil) {
        temp += `<a class="context-bar-link ${secilenDil == dil ? "active" : ""
          }" data-keyword="${dil}">${getLang(dil)}</a>`;
      });
      $("#autoDilNav").html(temp);
    }
  }
}

async function setLangSonucCozumleyiciLayouts(enabled = null) {
  if ($("#autoDilNav2")) {
    let temp = "";

    let aktifDiller = await getAktifDiller('array');

    if (!secilenDil) {
      secilenDil = sessionStorage.getItem("secilenDil");
    }

    if (aktifDiller) {
      if (secilenDil === "tumu") {
        temp = `<a class="context-bar-link active" data-keyword="tumu">${getLang('tumu')}</a>`;
      } else {
        temp = `<a class="context-bar-link" data-keyword="tumu">${getLang('tumu')}</a>`;
      }
      aktifDiller.forEach(function (dil) {
        temp += `<a class="context-bar-link ${secilenDil == dil ? "active" : ""
          } ${enabled && enabled.includes(dil) ? "" : "disabled"
          }" data-keyword="${dil}">${getLang(dil)}</a>`;
      });
      $("#autoDilNav2").html(temp);
    }
  }
}

function setDefaultFilterOptions() {
  if (!sessionStorage.getItem("secilenDil")) {
    sessionStorage.setItem("secilenDil", "tumu");
  }
  if (!sessionStorage.getItem("sessionLanguages")) {
    setSessionLanguages();
  }
}



async function saveLangSessionStorage() {
  var dilSirasi = $(".dil-siralama").sortable("toArray");
  console.log('saveLangSessionStorage:', JSON.stringify(dilSirasi, null, 2))
  if (dilSirasi) {
    let tempAktif = []
    let tempPasif = []
    await Promise.all(dilSirasi.map(d => {
      const e = `#id${d}`
      if ($(e).is(':checked')) {
        tempAktif.push(d.replace(/_/g, ""))
      } else {
        tempPasif.push(d.replace(/_/g, ""))
      }
    }))
    let finalLangs = []
    if ((tempAktif && tempAktif.length) || (tempPasif && tempPasif.length)) {
      let sessionLanguages = sessionStorage.getItem("sessionLanguages");
      sessionLanguages  = JSON.parse(sessionLanguages)
      if (sessionLanguages && sessionLanguages.length) {
        const filterIndex = dilSirasi.reduce((acc, filterObj, index) => {
          acc[filterObj.replace(/_/g, "")] = index;
          return acc;
        }, {})
        finalLangs = sessionLanguages
          .map((lang) => {
            const $lang = lang
            if (tempAktif.includes(lang.value)) {
            $lang.isActive = true
            }
            if (tempPasif.includes(lang.value)) {
              $lang.isActive = false
            }
            return $lang
            })
          .sort((a, b) => {
            return filterIndex[a.value] - filterIndex[b.value]
          });
      }
    }
    // console.log('finalLangs', JSON.stringify(finalLangs, null, 2))
    sessionStorage.setItem("sessionLanguages", JSON.stringify(finalLangs));
    setTimeout(() => {
      setLangLayouts();
    }, 500);
  }
}

async function setLangLayouts() {
  await configInit()
  setLangFilterLayouts();
  setLangFrontLayouts();
  setLangTopLayouts();
  setLangSearcBarLayouts();
  setLangSonucCozumleyiciLayouts();
  autoNavMore();
}

function readMoreFormatter() {
  var maxLength = 300;
  $(".show-read-more").each(function () {
    if (!$(this).attr("data-formatted")) {
      $(this).attr("data-formatted", true);
      var myStr = $(this).text();

      if ($.trim(myStr).length > maxLength) {
        var newStr = myStr.substring(0, maxLength);
        var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
        $(this).empty().html(newStr);
        $(this).append(
          ' <a href="javascript:void(0);" class="read-more devami-link">...devamı</a>'
        );
        $(this).append('<span class="more-text">' + removedStr + "</span>");
      }
    }
  });
  $(".read-more").click(function () {
    $(this).siblings(".more-text").contents().unwrap();
    $(this).remove();
  });
}
function maddeDetaylari() {
  readMoreFormatter();
  const maddeDetaylar = $(".madde-detay");

  if (maddeDetaylar && maddeDetaylar.length) {
    maddeDetaylar.each(function (index) {
      const self = $(this);
      const maddeId = $(this).attr("data-id");
      let crossId = $(this).attr("data-crossid");
      const dictId = $(this).attr("data-dictid");
      let idxkarsi = false;
      if ((!crossId || crossId == "null") && maddeId) {
        crossId = maddeId;
        idxkarsi = true;
      }
      // && dictId && dictId != 'null'
      if (
        !$(this).attr("data-loaded") &&
        crossId &&
        crossId != "null" &&
        dictId &&
        dictId != "null"
      ) {
        $.ajax({
          url: getMyDomain() + "/detay/" + crossId + "/" + dictId,
          method: "get",
          timeout: 10000, // 10 saniye timeout
          success: function (data) {
            if (data && data.length) {
              if (idxkarsi) {
                data.map((it) => {
                  if (
                    it.karsiMaddeId &&
                    it.karsiMaddeId.id &&
                    it.karsiMaddeId.id === crossId
                  ) {
                    self.html(`(${it.madde})`);
                    self.attr("data-loaded", true);
                  }
                });
              } else {
                self.html(`(${data[0].karsiMaddeId.madde})`);
                self.attr("data-loaded", true);
              }
            }
          },
          error: function (error) {
            console.log("error:", error.message);
          },
        });
      }
    });
  }
}
function gununKelimesi() {
  const gununKelimesiBlock = $("#gununKelimesi");
  let seeDetail = 'Detayı Gör';
  if (siteLang === 'en') {
    seeDetail = 'Click for details';
  }
  if (gununKelimesiBlock.length) {
    $.ajax({
      url: "/randomMadde",
      method: "get",
      timeout: 10000, // 10 saniye timeout
      success: function ({ data }) {
        const temp = `
                <strong>${data[0].madde
          }</strong><span class="madde-detay text-muted ml-1"
                data-id="${data[0]._id ? data[0]._id : null}"
                data-crossid="${data[0].karsiMaddeId ? data[0].karsiMaddeId : null
          }"
                data-dictid="${data[0].dict ? data[0].dict._id : null}"
                ></span>

                <p class="body-text">
                    ${data[0].whichDict.anlam}
                </p>
                <a href="/kelime/${encodeURIComponent(data[0].madde)}/${data[0]._id
          }-${data[0].whichDict.id}/${data[0].dict.lang
          }" class="btn btn-outline-dark btn-block text-center mt-3">${seeDetail}</a>
                `;
        gununKelimesiBlock.html(temp);
      },
      error: function (error) {
        console.log("ERROR:", error.message);
      },
    });
  }
}

function cekimveturevFormatter({ aranan, data, isKisa, meta, error }) {
  let sonuckutusu = $("#cekim-benzerlerde-arama-sonucu");
  let cekimveturevBlock = $("#cekim-benzerlerde-arama");
  if (cekimveturevBlock && cekimveturevBlock.length > 0) {
    cekimveturevBlock.attr("data-total", Number(meta.total));
  }
  if (isKisa) {
    sonuckutusu = $("#cekim-benzerlerde-arama-sonucu-kisa");
    cekimveturevBlock = $("#cekim-benzerlerde-arama-kisa");
  }
  const dahafazlaButton = $("#cekim-benzerlerde-arama-dahafazla");
  const baslikContent = $("#cekim-benzerlerde-arama .ara-baslik");
  const isTitleOnly = cekimveturevBlock.attr("data-format");

  if (error === null) {
    if (isTitleOnly) {
      let tempFortitle = "";
      if (data && data.length) {
        data.forEach((item) => {
          tempFortitle += `<a href="/kelime/${encodeURIComponent(item.madde)}/${item._id}-${item.whichDict.id}/${item.dict.lang}">${item.madde}</a>`;
        });
      }
      if (data.length === 0) {
        $("#cekim-benzerlerde-arama-kisa").remove();
      }
      $("#skelotontemplate").remove();
      sonuckutusu.append(tempFortitle);
    } else {
      let metam = $("#metaHolder").attr("data-meta");
      let title = "Tüm Çekim ve Benzerlerde Arama";
      if(siteLang === "en") {
        title = "Search in all derivatives and similars";
      }
      let titlelang ='';
      if (metam) {
        metam = JSON.parse(metam);
        if (metam.sonucTitleDil) {
          titlelang = metam.sonucTitleDil;
        }
      }
      const baslik = `<span>${titlelang ? '(' +titlelang+ ') ': ''} ${title} <span class="text-gri">(${meta.total})</span></span>`;
      if (baslikContent) {
        baslikContent.empty().append(baslik);
      }

      let temp = "";
      if (data && data.length) {
        data.forEach((item) => {
          if (item.isLimited) {
            temp += `<div class="kx-card kx-card__simple">
            <div class="kx-card__header">
                <div class="d-flex">
                  <span class="kx-card-title ana-metin"><i class="fas fa-lock mr-1"></i>${item.madde}</span>`;
          } else {
            temp += `<div class="kx-card kx-card__simple">
            <div class="kx-card__header">
                <div class="d-flex">
                    <a href="/kelime/${encodeURIComponent(item.madde)}/${item._id
              }-${item.whichDict.id}/${item.dict.lang}/${metam && metam.sonucFiltreTip ? metam.sonucFiltreTip : 'tumu'
              }/${item.dict.code.toLowerCase()}" class="kx-card-title"><span class="ana-metin">${item.madde
              }</span></a>`;
          }

          if (
            item.whichDict &&
            item.whichDict.telaffuz &&
            item.whichDict.telaffuz.length
          ) {
            temp += `<span class="text-muted">(${item.whichDict.telaffuz.join(
              ", "
            )})</span>`;
          }
          temp += `<span class="madde-detay text-muted ml-1">${item.karsi && item.karsi.length
            ? "(" + item.karsi[0].madde + ")"
            : ""
            }</span>
                    </div>
                    <div class="icon-bag tip-filtre">`;
          if (
            item.whichDict &&
            item.whichDict.tip &&
            item.whichDict.tip.length
          ) {
            temp += `<a href="#" class="badge kx-badge ${item.whichDict.tip[0]
              } active">${item.whichDict.tip.join(", ")} </a>`;
          }

          temp += `<a href="javascript:void(0);" class="favorilereEkle icon ${item.isFavored ? 'active' : ''}" data-islimited="${item.isLimited}" data-maddeid="${item._id}" data-anlamid="${item.anlamId}" title="Favorilere Ekle"><i class="fas fa-star"></i></a>
          <a href="javascript:void(0);" class="begenenlereEkle icon ${item.isLiked ? 'active' : ''}" data-islimited="${item.isLimited}" data-maddeid="${item._id}" data-anlamid="${item.anlamId}" title="Beğen"><i class="fas fa-heart"></i></a>
          <a href="javascript:void(0);" class="copybutton icon" title="Bağlantı" data-text-copied="Kopyalandı"><i class="fas fa-link"></i></a>
          <span class="copyurl">https://kelime.com/arama/${item.madde}</span>
                    </div>
                </div>
                <div class="kx-card__body">

                <span class="wholecontent">
                    <div class="sonuc-origin">
                        <strong>${getLang(
            item.dict.lang
          ).toUpperCase()}</strong> /  ${item.dict.name}
                    </div>`;

          if (item.isLimited) {
            temp += `<span class="body-text">
            <div class="show-read-more">${item.whichDict.anlam}</div></span>`;
          } else {
            temp += `<a href="/kelime/${encodeURIComponent(item.madde)}/${item._id
              }-${item.whichDict.id}/${item.dict.lang}/${metam && metam.sonucFiltreTip ? metam.sonucFiltreTip : 'tumu'
              }/${item.dict.code.toLowerCase()}" class="body-text">
              <div class="show-read-more">${item.whichDict.anlam}</div></a>`;
          }

          temp += `</span></div></div>`;
        });
        $("#skelotontemplate").remove();
        sonuckutusu.append(temp);
        const perpage = meta.perpage || meta.limit || 10;
        if (
          (meta && meta.page * perpage >= meta.total) ||
          (metam && metam.isLimited)
        ) {
          dahafazlaButton.remove();
        }
        // maddeDetaylari();
        readMoreFormatter();
      } else {
        $("#skelotontemplate").remove();
        dahafazlaButton.remove();
      }
    }
  } else {
    $("#skelotontemplate").remove();
    dahafazlaButton.remove();
  }
}
function cekimveturevSearch(
  aranan,
  searchOptions,
  page = 1,
  perpage = 10,
  isKisa = false
) {
  let sonuckutusu = $("#cekim-benzerlerde-arama-sonucu");
  if (isKisa) sonuckutusu = $("#cekim-benzerlerde-arama-sonucu-kisa");
  const payload = {};
  payload.limit = perpage;
  payload.page = Number(page) || 1;
  payload.searchFilter = {};
  payload.searchTerm = aranan;
  payload.searchType = "exactwithdash";

  if (searchOptions) {
    if (searchOptions.secilenDil) {
      payload.searchFilter.dil = searchOptions.secilenDil;
    }
    if (searchOptions.secilenTip) {
      payload.searchFilter.tip = searchOptions.secilenTip;
    }
    if (searchOptions.secilenSozluk) {
      payload.searchFilter.sozluk = searchOptions.secilenSozluk;
    }
    if (searchOptions.aramaFormat) {
      payload.aramaFormat = searchOptions.aramaFormat;
    }
  }
  payload.searchFilter.filterOrders = siteDilleriComma;
  $.ajax({
    url: "/ajaxCall",
    accepts: "application/json; charset=utf-8",
    method: "post",
    data: payload,
    data: { json: JSON.stringify(payload) },
    dataType: "json",
    timeout: 30000, // 15 saniye timeout
    success: function ({ data, meta }) {
      if (page === 1) {
        sonuckutusu.empty();
      } else {
        $("#cekim-benzerlerde-arama").attr("data-page", page);
      }
      cekimveturevFormatter({ aranan, data, isKisa, meta, error: null });
    },
    error: function (error) {
      console.error('cekimveturevSearch ajax error:', error);
      cekimveturevFormatter({
        aranan,
        data: null,
        isKisa: null,
        meta: null,
        error,
      });
    },
  });
}
function likesFormatter({ data, meta, error }) {
  let sonuckutusu = $("#profile-likes-sonucu");
  let likesBlock = $("#profile-likes");
  likesBlock.attr("data-total", Number(meta.total));
  likesBlock.attr("data-page", Number(meta.page));
  likesBlock.attr("data-pages", Number(meta.pages));
  $("#profile-likes-stat").text(Number(meta.total));
  const ldahafazlaButton = $("#profile-likes-dahafazla");
  const baslikContent = $("#profile-likes-dahafazla .ara-baslik");

  if (error === null) {

    const baslik = `<span>Beğenilen Madde Başlıkları<span class="text-gri">(${meta.total})</span></span>`;
    if (baslikContent) {
      baslikContent.empty().append(baslik);
    }

    let temp = "";
    if (data && data.length) {
      data.forEach((item) => {
        temp += `<div class="kx-card kx-card__simple">
            <div class="kx-card__header">
                <div class="d-flex">
                    <a target="_blank" href="/kelime/${encodeURIComponent(item.madde)}/${item._id
          }-${item.whichDict.id}/${item.dict.lang}/tumu/${item.dict.code.toLowerCase()}" class="kx-card-title"><span class="ana-metin">${item.madde
          }</span></a>`;


        if (
          item.whichDict &&
          item.whichDict.telaffuz &&
          item.whichDict.telaffuz.length
        ) {
          temp += `<span class="text-muted">(${item.whichDict.telaffuz.join(
            ", "
          )})</span>`;
        }
        temp += `<span class="madde-detay text-muted ml-1">${item.karsi && item.karsi.length
          ? "(" + item.karsi[0].madde + ")"
          : ""
          }</span>
                    </div>
                    <div class="icon-bag tip-filtre">`;
        if (
          item.whichDict &&
          item.whichDict.tip &&
          item.whichDict.tip.length
        ) {
          temp += `<a href="#" class="badge kx-badge ${item.whichDict.tip[0]
            } active">${item.whichDict.tip.join(", ")} </a>`;
        }

        temp += `<a href="javascript:void(0);" class="favorilereEkle icon ${item.isFavored ? 'active' : ''}" data-maddeid="${item._id}" data-anlamid="${item.anlamId}" title="Favorilere Ekle"><i class="fas fa-star"></i></a>
          <a href="javascript:void(0);" class="begenenlereEkle icon ${item.isLiked ? 'active' : ''}" data-maddeid="${item._id}" data-anlamid="${item.anlamId}" title="Beğen"><i class="fas fa-heart"></i></a>
          <a href="javascript:void(0);" class="copybutton icon" title="Bağlantı" data-text-copied="Kopyalandı"><i class="fas fa-link"></i></a>
          <span class="copyurl">https://kelime.com/arama/${item.madde}</span>
                    </div>
                </div>
                <div class="kx-card__body">

                <span class="wholecontent">
                    <div class="sonuc-origin">
                        <strong>${getLang(
          item.dict.lang
        ).toUpperCase()}</strong> /  ${item.dict.name}
                    </div>`;

        temp += `<a target="_blank" href="/kelime/${encodeURIComponent(item.madde)}/${item._id
          }-${item.whichDict.id}/${item.dict.lang}/tumu/${item.dict.code.toLowerCase()}" class="body-text">
          <div class="show-read-more">${item.whichDict.anlam}</div></a>`;

        temp += `</span></div></div>`;
      });
      $("#skelotontemplate").remove();
      sonuckutusu.append(temp);
      if (
        (meta && meta.page * meta.perpage > meta.total)
      ) {
        ldahafazlaButton.remove();
      }
      // maddeDetaylari();
      readMoreFormatter();
    } else {
      $("#skelotontemplate").remove();
      ldahafazlaButton.remove();
    }

  } else {
    $("#skelotontemplate").remove();
    ldahafazlaButton.remove();
  }
}

function getLikes(
  page = 1,
  perpage = 10,
) {
  const lsonuckutusu = $("#profile-likes-sonucu");
  const payload = {};
  payload.limit = perpage;
  payload.page = Number(page) || 1;
  if (lsonuckutusu) {
    $.ajax({
      url: "/getLikes",
      accepts: "application/json; charset=utf-8",
      method: "post",
      data: payload,
      data: { json: JSON.stringify(payload) },
      dataType: "json",
      timeout: 10000, // 10 saniye timeout
      success: function ({ data, meta }) {
        if (meta.page === 1) {
          lsonuckutusu.empty();
        } else {
          $("#profile-likes").attr("data-page", meta.page);
          $("#profile-likes").attr("data-pages", meta.pages);
          $("#profile-likes").attr("data-total", meta.total);
        }
        likesFormatter({ data, meta, error: null });
      },
      error: function (error) {
        likesFormatter({
          data: null,
          meta: null,
          error,
        });
      },
    });
  }
}

function favoritesFormatter({ data, meta, error }) {
  let sonuckutusu = $("#profile-favorites-sonucu");
  let favoritesBlock = $("#profile-favorites");
  favoritesBlock.attr("data-total", Number(meta.total));
  favoritesBlock.attr("data-page", Number(meta.page));
  favoritesBlock.attr("data-pages", Number(meta.pages));
  $("#profile-favorites-stat").text(Number(meta.total));

  const dahafazlaButton = $("#profile-favorites-dahafazla");
  const baslikContent = $("#profile-favorites-dahafazla .ara-baslik");

  if (error === null) {

    const baslik = `<span>Favori Edilen Madde Başlıkları<span class="text-gri">(${meta.total})</span></span>`;
    if (baslikContent) {
      baslikContent.empty().append(baslik);
    }

    let temp = "";
    if (data && data.length) {
      data.forEach((item) => {
        temp += `<div class="kx-card kx-card__simple">
            <div class="kx-card__header">
                <div class="d-flex">
                    <a target="_blank" href="/kelime/${encodeURIComponent(item.madde)}/${item._id
          }-${item.whichDict.id}/${item.dict.lang}/tumu/${item.dict.code.toLowerCase()}" class="kx-card-title"><span class="ana-metin">${item.madde
          }</span></a>`;


        if (
          item.whichDict &&
          item.whichDict.telaffuz &&
          item.whichDict.telaffuz.length
        ) {
          temp += `<span class="text-muted">(${item.whichDict.telaffuz.join(
            ", "
          )})</span>`;
        }
        temp += `<span class="madde-detay text-muted ml-1">${item.karsi && item.karsi.length
          ? "(" + item.karsi[0].madde + ")"
          : ""
          }</span>
                    </div>
                    <div class="icon-bag tip-filtre">`;
        if (
          item.whichDict &&
          item.whichDict.tip &&
          item.whichDict.tip.length
        ) {
          temp += `<a href="#" class="badge kx-badge ${item.whichDict.tip[0]
            } active">${item.whichDict.tip.join(", ")} </a>`;
        }

        temp += `<a href="javascript:void(0);" class="favorilereEkle icon ${item.isFavored ? 'active' : ''}" data-maddeid="${item._id}" data-anlamid="${item.anlamId}" title="Favorilere Ekle"><i class="fas fa-star"></i></a>
          <a href="javascript:void(0);" class="begenenlereEkle icon ${item.isLiked ? 'active' : ''}" data-maddeid="${item._id}" data-anlamid="${item.anlamId}" title="Beğen"><i class="fas fa-heart"></i></a>
          <a href="javascript:void(0);" class="copybutton icon" title="Bağlantı" data-text-copied="Kopyalandı"><i class="fas fa-link"></i></a>
          <span class="copyurl">https://kelime.com/arama/${item.madde}</span>
                    </div>
                </div>
                <div class="kx-card__body">

                <span class="wholecontent">
                    <div class="sonuc-origin">
                        <strong>${getLang(
          item.dict.lang
        ).toUpperCase()}</strong> /  ${item.dict.name}
                    </div>`;

        temp += `<a target="_blank" href="/kelime/${encodeURIComponent(item.madde)}/${item._id
          }-${item.whichDict.id}/${item.dict.lang}/tumu/${item.dict.code.toLowerCase()}" class="body-text"><div class="show-read-more">${item.whichDict.anlam}</div></a>`;

        temp += `</span></div></div>`;
      });
      $("#skelotontemplate").remove();
      sonuckutusu.append(temp);
      if (
        (meta && meta.page * meta.perpage > meta.total)
      ) {
        dahafazlaButton.remove();
      }
      // maddeDetaylari();
      readMoreFormatter();
    } else {
      $("#skelotontemplate").remove();
      dahafazlaButton.remove();
    }

  } else {
    $("#skelotontemplate").remove();
    dahafazlaButton.remove();
  }
}

function getFavorites(
  page = 1,
  perpage = 10,
) {
  const fsonuckutusu = $("#profile-favorites-sonucu");
  const payload = {};
  payload.limit = perpage;
  payload.page = Number(page) || 1;
  if (fsonuckutusu) {
    $.ajax({
      url: "/getFavorites",
      accepts: "application/json; charset=utf-8",
      method: "post",
      data: payload,
      data: { json: JSON.stringify(payload) },
      dataType: "json",
      timeout: 10000, // 10 saniye timeout
      success: function ({ data, meta }) {
        if (meta.page === 1) {
          fsonuckutusu.empty();
        } else {
          $("#profile-favorites").attr("data-page", meta.page);
          $("#profile-favorites").attr("data-pages", meta.pages);
          $("#profile-favorites").attr("data-total", meta.total);
        }
        favoritesFormatter({ data, meta, error: null });
      },
      error: function (error) {
        favoritesFormatter({
          data: null,
          meta: null,
          error,
        });
      },
    });
  }
}

function maddeAnlamlariFormatter({ aranan, data, meta, error }) {
  const sonuckutusu = $("#madde-anlamlarinda-arama-sonucu");
  const dahafazlaButton = $("#madde-anlamlarinda-arama-dahafazla");
  const baslikContent = $("#madde-anlamlarinda-arama .ara-baslik");
  if (meta && meta.total !== undefined) {
    $("#madde-anlamlarinda-arama").attr("data-total", Number(meta.total));
  }
  if (error === null) {
    let metam = $("#metaHolder").attr("data-meta");
    let title = "Tüm Madde Anlamlarında Arama";
    if(siteLang === "en") {
      title = "Search in all definitions of the entries";
    }
    let titlelang ='';
    if (metam) {
      metam = JSON.parse(metam);
      if (metam.sonucTitleDil) {
        titlelang = metam.sonucTitleDil;
      }
    }
    const baslik = `<span>${titlelang ? '(' +titlelang+ ') ': ''} ${title}<span class="text-gri">(${meta.total})</span></span>`;
    if (baslikContent) {
      baslikContent.empty().append(baslik);
    }

    let temp = "";
    if (data && data.length) {
      data.forEach((item) => {
        if (item.isLimited) {
          temp += `<div class="kx-card kx-card__simple">
          <div class="kx-card__header">
              <div class="d-flex">
                <span class="kx-card-title ana-metin"><i class="fas fa-lock mr-1"></i>${item.madde}</span>`;
        } else {
          temp += `
        <div class="kx-card kx-card__simple">
            <div class="kx-card__header">
                <div class="d-flex">
                    <a href="/kelime/${encodeURIComponent(item.madde)}/${item._id
            }-${item.whichDict.id}/${item.dict.lang}/${metam.sonucFiltreTip
            }/${item.dict.code.toLowerCase()}" class="kx-card-title"><span class="ana-metin">${item.madde
            }</span></a>`;
        }

        if (
          item.whichDict &&
          item.whichDict.telaffuz &&
          item.whichDict.telaffuz.length
        ) {
          temp += `<span class="text-muted">(${item.whichDict.telaffuz.join(
            ", "
          )})</span>`;
        }
        temp += `
                <span class="madde-detay text-muted ml-1">${item.karsi && item.karsi.length
            ? "(" + item.karsi[0].madde + ")"
            : ""
          }</span>
                </div>
                <div class="icon-bag tip-filtre">`;
        if (item.whichDict && item.whichDict.tip && item.whichDict.tip.length) {
          temp += `<a href="#" class="badge kx-badge ${item.whichDict.tip[0]
            } active">${item.whichDict.tip.join(", ")} </a>`;
        }
        temp += `<a href="javascript:void(0);" class="favorilereEkle icon ${item.isFavored ? 'active' : ''}" data-islimited="${item.isLimited}" data-maddeid="${item._id}" data-anlamid="${item.anlamId}" title="Favorilere Ekle"><i class="fas fa-star"></i></a>
        <a href="javascript:void(0);" class="begenenlereEkle icon ${item.isLiked ? 'active' : ''}" data-islimited="${item.isLimited}" data-maddeid="${item._id}" data-anlamid="${item.anlamId}" title="Beğen"><i class="fas fa-heart"></i></a>
        <a href="javascript:void(0);" class="copybutton icon" title="Bağlantı" data-text-copied="Kopyalandı"><i class="fas fa-link"></i></a>
        <span class="copyurl">https://kelime.com/arama/${item.madde}</span>
                </div>
            </div>
            <div class="kx-card__body">
              <span class="wholecontent">
                <div class="sonuc-origin">
                    <strong>${getLang(
          item.dict.lang
        ).toUpperCase()}</strong> /  ${item.dict.name}
                </div>`;

        if (item.isLimited) {
          temp += `<span class="body-text"><div class="show-read-more">${item.whichDict.anlam}</div></span>`;
        } else {

          temp += `<a href="/kelime/${encodeURIComponent(item.madde)}/${item._id
            }-${item.whichDict.id}/${item.dict.lang}/${metam.sonucFiltreTip
            }/${item.dict.code.toLowerCase()}" class="madde-anlamlari-box body-text">
            <div class="show-read-more">${item.whichDict.anlam}</div>
                        </a>`;
        }

        temp += `
              </span>
            </div>
        </div>
        `;

      });
      $("#skelotontemplate").remove();
      sonuckutusu.append(temp);
      setTimeout(() => {
        var acontext = document.querySelectorAll(".madde-anlamlari-box");
        if (acontext) {
          var markinstance = new Mark(acontext);
          markinstance.mark(aranan);
        }
      }, 800);

      if ((meta && meta.page * meta.perpage > meta.total) || metam.isLimited) {
        dahafazlaButton.remove();
      }
      // maddeDetaylari();
      readMoreFormatter();
    } else {
      $("#skelotontemplate").remove();
      dahafazlaButton.remove();
    }
  } else {
    $("#skelotontemplate").remove();
    dahafazlaButton.remove();
  }
}

function maddAnlamlariSearch(aranan, searchOptions, page = 1, perpage = 10) {
  const sonuckutusu = $("#madde-anlamlarinda-arama-sonucu");
  const payload = {};
  payload.limit = perpage;
  payload.page = Number(page) || 1;
  payload.searchFilter = {};
  payload.searchTerm = aranan;
  payload.searchType = "maddeanlam";

  if (searchOptions) {
    if (searchOptions.secilenDil) {
      payload.searchFilter.dil = searchOptions.secilenDil;
    }
    if (searchOptions.secilenTip) {
      payload.searchFilter.tip = searchOptions.secilenTip;
    }
    if (searchOptions.secilenSozluk) {
      payload.searchFilter.sozluk = searchOptions.secilenSozluk;
    }
  }
  payload.searchFilter.filterOrders = siteDilleriComma;
  $.ajax({
    url: "/ajaxCall",
    accepts: "application/json; charset=utf-8",
    method: "post",
    data: payload,
    data: { json: JSON.stringify(payload) },
    dataType: "json",
    timeout: 30000, // 15 saniye timeout
    success: function ({ data, meta }) {
      if (page === 1) {
        sonuckutusu.empty();
      } else {
        $("#madde-anlamlarinda-arama").attr("data-page", page);
      }
      maddeAnlamlariFormatter({ aranan, data, meta, error: null });
    },
    error: function (error) {
      console.error('maddAnlamlariSearch ajax error:', error);
      maddeAnlamlariFormatter({ aranan, data: null, meta: null, error });
    },
  });
}

function findPermutations(string) {
  if (!string || typeof string !== "string") {
    return "Please enter a string";
  }

  if (!!string.length && string.length < 2) {
    return string;
  }

  let permutationsArray = [];

  for (let i = 0; i < string.length; i++) {
    let char = string[i];

    if (string.indexOf(char) != i) continue;

    let remainder = string.slice(0, i) + string.slice(i + 1, string.length);

    for (let permutation of findPermutations(remainder)) {
      permutationsArray.push(char + permutation);
    }
  }
  return permutationsArray;
}
function printAllKLength(set, k) {
  let n = set.length;
  permutationsA = [];
  const sonuc = printAllKLengthRec(set, "", n, k);
  return sonuc;
}

// The main recursive method
// to print all possible
// strings of length k
function printAllKLengthRec(set, prefix, n, k) {
  // Base case: k is 0,
  // print prefix
  if (k == 0) {
    permutationsA.push(prefix);
    return;
  }

  // One by one add all characters
  // from set and recursively
  // call for k equals to k-1
  for (let i = 0; i < n; ++i) {
    // Next character of input added
    let newPrefix = prefix + set[i];

    // k is decreased, because
    // we have added a new character
    printAllKLengthRec(set, newPrefix, n, k - 1);
  }
}

$(function () {
  $(".dil-siralama").sortable({
    update: function (event, ui) {
      console.log('dil siralama updating.....', event, ui)
      saveLangSessionStorage();
    },
  });

  $("#dilFiltreUygula").click(function () {
    saveLangSessionStorage();
    setLangLayouts();
    const payload = { filterOrders: siteDilleriComma };
    $.ajax({
      url: "/setfilterOrders",
      method: "post",
      data: payload,
      timeout: 10000, // 10 saniye timeout
      success: function (res) {
        $("#modalFilterClose").click();
        $(".modal-backdrop").remove();
      },
      error: function (error) {
        console.log("error..:", error.message);
      },
    });
  });

  $('#dilHepsiSec').click(function(){
    $('form.filtre-form input:checkbox').each(function(){
        $(this).prop('checked',true);
   })
   saveLangSessionStorage();
});
});



$(".popover_trigger")
  .popover({ trigger: "manual", html: true, animation: false })
  .on("mouseenter", function () {
    var _this = this;
    $(this).popover("show");
    $(".popover").on("mouseleave", function () {
      $(_this).popover("hide");
    });
  })
  .on("mouseleave", function () {
    var _this = this;
    setTimeout(function () {
      if (!$(".popover:hover").length) {
        $(_this).popover("hide");
      }
    }, 300);
  });

$(document).ready(async function () {
  $(document).on("change", ".dil-siralama input:checkbox", function() {
    saveLangSessionStorage();
  });
  const demokelime = await getUrlParameter("aranan");
  if (demokelime) {
    $("#cozumleyiciAramaKutusu").val(demokelime);
    setTimeout(() => {
      $("#cozumleyiciSearchIcon").click();
    }, 400);
  }

  if (demokelime && $("#kelimexAramaKutusu")) {
    $("#kelimexAramaKutusu").val(demokelime);
    $("#kelimexAramaKutusu").focus();
    setTimeout(() => {
      var e = jQuery.Event("keyup", { which: $.ui.keyCode.ENTER });
      $("#kelimexAramaKutusu").trigger(e);
    }, 200);
  }

  $("#cekim-benzerlerde-arama-dahafazla").click(function () {
    const sonuckutusu = $("#cekim-benzerlerde-arama-sonucu");
    const cekimveturevBlock = $("#cekim-benzerlerde-arama");
    const skelotontemplate = `<div class="kx-card kx-card__simple" id="skelotontemplate">
        <div class="skeleton-effect-wave p-4">
            <p style="width: 15%;" class="skeleton-block"></p>
            <p style="width: 25%;" class="skeleton-block"></p>
            <p style="width: 100%" class="skeleton-block"></p>
            <p style="width: 100%" class="skeleton-block"></p>
            <p style="width: 40%;" class="skeleton-block"></p>
        </div>
    </div>`;
    if (cekimveturevBlock) {
      sonuckutusu.append(skelotontemplate);
      const aranankelime = cekimveturevBlock.attr("data-madde");
      const aramaFormat = cekimveturevBlock.attr("data-format");
      const page = Number(cekimveturevBlock.attr("data-page")) + 1;
      const searchOptions = {
        secilenDil,
        secilenTip,
        secilenSozluk,
        aramaFormat,
      };
      if (aranankelime) {
        cekimveturevSearch(aranankelime, searchOptions, page, 10);
      }
    }
  });

  $(document).on("click", "#profile-likes-dahafazla", function () {
    const lsonuckutusu = $("#profile-likes-sonucu");
    const likesBlock = $("#profile-likes");
    const skelotontemplate = `<div class="kx-card kx-card__simple" id="skelotontemplate">
        <div class="skeleton-effect-wave p-4">
            <p style="width: 15%;" class="skeleton-block"></p>
            <p style="width: 25%;" class="skeleton-block"></p>
            <p style="width: 100%" class="skeleton-block"></p>
            <p style="width: 100%" class="skeleton-block"></p>
            <p style="width: 40%;" class="skeleton-block"></p>
        </div>
    </div>`;
    console.log('likesdahafazla', likesBlock, likesBlock.length);
    if (likesBlock.length > 0) {
      lsonuckutusu.append(skelotontemplate);
      const page = Number(likesBlock.attr("data-page")) + 1;
      const pages = Number(likesBlock.attr("data-pages"));
      if (page && page <= pages) {
        getLikes(page, 10);
      }
    }
  });

  $(document).on("click", "#profile-favorites-dahafazla", function () {
    const fsonuckutusu = $("#profile-favorites-sonucu");
    const favoritesBlock = $("#profile-favorites");
    const skelotontemplate = `<div class="kx-card kx-card__simple" id="skelotontemplate">
        <div class="skeleton-effect-wave p-4">
            <p style="width: 15%;" class="skeleton-block"></p>
            <p style="width: 25%;" class="skeleton-block"></p>
            <p style="width: 100%" class="skeleton-block"></p>
            <p style="width: 100%" class="skeleton-block"></p>
            <p style="width: 40%;" class="skeleton-block"></p>
        </div>
    </div>`;
    if (favoritesBlock.length > 0) {
      fsonuckutusu.append(skelotontemplate);
      const page = Number(favoritesBlock.attr("data-page")) + 1;
      const pages = Number(favoritesBlock.attr("data-pages"));
      if (page && page <= pages) {
        getFavorites(page, 10);
      }
    }
  });

  $("#madde-anlamlarinda-arama-dahafazla").click(function () {
    const sonuckutusu = $("#madde-anlamlarinda-arama-sonucu");
    const maddeAnlamlariBlock = $("#madde-anlamlarinda-arama");
    const skelotontemplate = `<div class="kx-card kx-card__simple" id="skelotontemplate">
        <div class="skeleton-effect-wave p-4">
            <p style="width: 15%;" class="skeleton-block"></p>
            <p style="width: 25%;" class="skeleton-block"></p>
            <p style="width: 100%" class="skeleton-block"></p>
            <p style="width: 100%" class="skeleton-block"></p>
            <p style="width: 40%;" class="skeleton-block"></p>
        </div>
    </div>`;
    if (maddeAnlamlariBlock) {
      sonuckutusu.append(skelotontemplate);
      const aranankelime = maddeAnlamlariBlock.attr("data-madde");
      const page = Number(maddeAnlamlariBlock.attr("data-page")) + 1;
      const searchOptions = { secilenDil, secilenTip, secilenSozluk };
      if (aranankelime) {
        maddAnlamlariSearch(aranankelime, searchOptions, page, 10);
      }
    }
  });

  $(document).on("click", "#cozumleyici-arama-dahafazla", function () {
    const sonuckutusu = $("#cozumleyici-arama-sonucu");
    const cozumleyiciBlock = $("#cozumleyici-arama");

    const skelotontemplate = `
    <a class="oneri-kelime cozumleyici-skelotontemplate skeleton-effect-wave">
    <div class="oneri-kelime__title"><p style="width: 50px;" class="skeleton-block"></p></div>
    <div class="oneri-kelime__okunusu"><p style="width: 70px;" class="skeleton-block"></p></div></a>
    <a class="oneri-kelime cozumleyici-skelotontemplate skeleton-effect-wave">
    <div class="oneri-kelime__title"><p style="width: 50px;" class="skeleton-block"></p></div>
    <div class="oneri-kelime__okunusu"><p style="width: 70px;" class="skeleton-block"></p></div></a>
    <a class="oneri-kelime cozumleyici-skelotontemplate skeleton-effect-wave">
    <div class="oneri-kelime__title"><p style="width: 50px;" class="skeleton-block"></p></div>
    <div class="oneri-kelime__okunusu"><p style="width: 70px;" class="skeleton-block"></p></div></a>
    `;

    if (cozumleyiciBlock) {
      sonuckutusu.append(skelotontemplate);
      const aranankelime = cozumleyiciBlock.attr("data-madde");
      const page =
        Number(cozumleyiciBlock.attr("data-page")) === 1
          ? 3
          : Number(cozumleyiciBlock.attr("data-page")) + 1;
      const secilenDil = sessionStorage.getItem("cozumleyiciSecilenDil");
      const searchOptions = { secilenDil };
      if (aranankelime) {
        cozumleyiciSearch(aranankelime, searchOptions, true, page, 50);
      }
    }
  });

  $(document).on("click", "#topDilSec", function () {
    $(this).dropdown("toggle");
  });

  $('[data-toggle="tooltip"]').tooltip({
    selector: true,
    title: function () {
      return $(this).attr("href");
    },
  });
  setDefaultFilterOptions();
  setLangLayouts();
  gununKelimesi();
  const cekimveturevBlock = $("#cekim-benzerlerde-arama");
  if (cekimveturevBlock.length > 0) {
    const aranankelime = cekimveturevBlock.attr("data-madde");
    const aramaFormat = cekimveturevBlock.attr("data-format");
    const aramadili = cekimveturevBlock.attr("data-lang");
    if (aramadili) secilenDil = aramadili;
    const searchOptions = {
      secilenDil,
      secilenTip,
      secilenSozluk,
      aramaFormat,
    };
    if (aranankelime) {
      cekimveturevSearch(aranankelime, searchOptions, 1, 10);
    }
  }

  const xlikesBlock = $("#profile-likes");
  if (xlikesBlock.length > 0) {
    getLikes(1, 10);
  }

  const xfavoritesBlock = $("#profile-favorites");
  if (xfavoritesBlock.length > 0) {
    getFavorites(1, 10);
  }

  const cekimveturevBlockKisa = $("#cekim-benzerlerde-arama-kisa");
  if (cekimveturevBlockKisa.length > 0) {
    const aranankelime = cekimveturevBlockKisa.attr("data-madde");
    const aramaFormat = cekimveturevBlockKisa.attr("data-format");
    const aramadili = cekimveturevBlockKisa.attr("data-lang");
    if (aramadili) secilenDil = aramadili;
    const searchOptions = {
      secilenDil,
      secilenTip,
      secilenSozluk,
      aramaFormat,
    };
    if (aranankelime) {
      cekimveturevSearch(aranankelime, searchOptions, 1, 10, true);
    }
  }

  const maddeAnlamlariBlock = $("#madde-anlamlarinda-arama");
  if (maddeAnlamlariBlock.length > 0) {
    const aranankelime = maddeAnlamlariBlock.attr("data-madde");
    const aramadili = cekimveturevBlock.attr("data-lang");
    if (aramadili) secilenDil = aramadili;
    const searchOptions = { secilenDil, secilenTip, secilenSozluk };
    if (aranankelime) {
      maddAnlamlariSearch(aranankelime, searchOptions, 1, 10);
    }
  }
});

$('[data-toggle="tooltip"]').tooltip({
  container: "body",
});

var permutationsA = [];

$("#logout-button").on("click", function () {
  const self = this;
  $(this).prop("disabled", true);
  $(this).html('<i class="fa fa-spinner fa-spin fa-lg fa-fw"></i>');
  setTimeout(() => {
    $(this).html("Çıkış");
  }, 1000);
  $.ajax({
    url: "/logout",
    method: "post",
    timeout: 10000, // 10 saniye timeout
    success: function (response) {
      if (response == "success") {
        window.location.replace('/');
      } else {
        Swal.fire({
          title: "Hata!",
          text: "Hatalı çıkış yaptınız!",
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
        text: err.responseJSON.message,
        icon: "error",
        confirmButtonText: "ok",
        heightAuto: false,
      });
      $(self).prop("disabled", false);
    },
  });
});

$(document).on('click', '.favorilereEkle', function (event) {
  event.stopPropagation();
  event.stopImmediatePropagation();
  const maddeId = $(this).attr('data-maddeid');
  const anlamId = $(this).attr('data-anlamid');
  const method = $(this).hasClass('active') ? 'delete' : 'insert';
  const itemIsLimited = $(this).attr('data-islimited');
  let isLoggedin = false;
  let meta = $("#metaHolder").attr("data-meta");
  const that = this;
  if (meta) {
    meta = JSON.parse(meta);
    if (meta.isLoggedin) {
      isLoggedin = meta.isLoggedin;
    }
  }
  if (!isLoggedin) {
    $('#uyeolModal').modal('toggle');
  } else if (itemIsLimited === 'true') {
    $('#limitedModal').modal('toggle');
  } else {
    $.ajax({
      url: "/userfav",
      method: "post",
      data: { maddeId: maddeId, anlamId: anlamId, method: method },
      timeout: 10000, // 10 saniye timeout
      success: function (result) {
        if (typeof result.errors == "undefined") {
          if (method === 'delete') {
            $(that).removeClass('active');
          } else {
            $(that).addClass('active');
          }
        } else {
          let err = "";
          result.errors.forEach(function (e) {
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

$(document).on('click', '.begenenlereEkle', function (event) {
  event.stopPropagation();
  event.stopImmediatePropagation();
  const maddeId = $(this).attr('data-maddeid');
  const anlamId = $(this).attr('data-anlamid');
  const method = $(this).hasClass('active') ? 'delete' : 'insert';
  const itemIsLimited = $(this).attr('data-islimited');
  let isLoggedin = false;
  let meta = $("#metaHolder").attr("data-meta");
  const that = this;
  if (meta) {
    meta = JSON.parse(meta);
    if (meta.isLoggedin) {
      isLoggedin = meta.isLoggedin;
    }
  }
  if (!isLoggedin) {
    $('#uyeolModal').modal('toggle');
  } else if (itemIsLimited === 'true') {
    $('#limitedModal').modal('toggle');
  } else {
    $.ajax({
      url: "/userlikes",
      method: "post",
      data: { maddeId: maddeId, anlamId: anlamId, method: method },
      timeout: 10000, // 10 saniye timeout
      success: function (result) {
        if (typeof result.errors == "undefined") {
          if (method === 'delete') {
            $(that).removeClass('active');
          } else {
            $(that).addClass('active');
          }
        } else {
          let err = "";
          result.errors.forEach(function (e) {
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
