function gmod(n, m) {
  return ((n % m) + m) % m;
}

function kuwaiticalendar(adjust) {
  var today = new Date();
  if (adjust) {
    adjustmili = 1000 * 60 * 60 * 24 * adjust;
    todaymili = today.getTime() + adjustmili;
    today = new Date(todaymili);
  }
  day = today.getDate();
  month = today.getMonth();
  year = today.getFullYear();
  m = month + 1;
  y = year;
  if (m < 3) {
    y -= 1;
    m += 12;
  }

  a = Math.floor(y / 100);
  b = 2 - a + Math.floor(a / 4);
  if (y < 1583) b = 0;
  if (y == 1582) {
    if (m > 10) b = -10;
    if (m == 10) {
      b = 0;
      if (day > 4) b = -10;
    }
  }

  jd =
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    b -
    1524;

  b = 0;
  if (jd > 2299160) {
    a = Math.floor((jd - 1867216.25) / 36524.25);
    b = 1 + a - Math.floor(a / 4);
  }
  bb = jd + b + 1524;
  cc = Math.floor((bb - 122.1) / 365.25);
  dd = Math.floor(365.25 * cc);
  ee = Math.floor((bb - dd) / 30.6001);
  day = bb - dd - Math.floor(30.6001 * ee);
  month = ee - 1;
  if (ee > 13) {
    cc += 1;
    month = ee - 13;
  }
  year = cc - 4716;

  if (adjust) {
    wd = gmod(jd + 1 - adjust, 7) + 1;
  } else {
    wd = gmod(jd + 1, 7) + 1;
  }

  iyear = 10631 / 30;
  epochastro = 1948084;
  epochcivil = 1948085;

  shift1 = 8.01 / 60;

  z = jd - epochastro;
  cyc = Math.floor(z / 10631);
  z = z - 10631 * cyc;
  j = Math.floor((z - shift1) / iyear);
  iy = 30 * cyc + j;
  z = z - Math.floor(j * iyear + shift1);
  im = Math.floor((z + 28.5001) / 29.5);
  if (im == 13) im = 12;
  id = z - Math.floor(29.5001 * im - 29);

  var myRes = new Array(8);

  myRes[0] = day;
  myRes[1] = month - 1;
  myRes[2] = year;
  myRes[3] = jd - 1; //julian day
  myRes[4] = wd - 1; //weekday
  myRes[5] = id; //hijri date
  myRes[6] = im - 1; //hijri month
  myRes[7] = iy; //hijri year

  return myRes;
}
function writeIslamicDate(adjustment) {
  var now = new Date();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var today = day + "-" + month + "-" + now.getFullYear();
  var wdNames = new Array(
    "الأحَد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت"
  );
  var iMonthNames = new Array(
    "مُحَرَّم",
    "صَفَر",
    "رَبِيع ٱلْأَوَّل",
    "ربيع الثاني",
    "جُمَادَىٰ ٱلْأُولَىٰ",
    "جُمَادَىٰ ٱلْآخِرَة",
    "رَجَب",
    "شَعْبَان",
    "رَمَضَان",
    "شَوَّال",
    "ذُو ٱلْقَعْدَة",
    "ذُو ٱلْحِجَّة"
  );
  var iDate = kuwaiticalendar(adjustment);
  var outputIslamicDate =
    wdNames[iDate[4]] +
    ", " +
    iDate[5] +
    " " +
    iMonthNames[iDate[6]] +
    " " +
    iDate[7] +
    " الموافق ل " +
    today;

  return outputIslamicDate;
}

// Principle API ----------------------------

$.getJSON(
  "http://muslimsalat.com/doha/daily.json?key=API_KEY&jsoncallback=?",
  function (times) {
    $(".table-row1")
      .append(
        '<div class="col col-1" data-label="Id">' +
          times.items[0].fajr +
          "</div>"
      )
      .append('<div class="col col-21" data-label="Id"> الفجر </div>');
    $(".table-row2")
      .append(
        '<div class="col col-1" data-label="Id">' +
          times.items[0].dhuhr +
          "</div>"
      )
      .append('<div class="col col-21" data-label="Id"> الظهر </div>');
    $(".table-row3")
      .append(
        '<div class="col col-1" data-label="Id">' +
          times.items[0].asr +
          "</div>"
      )
      .append('<div class="col col-21" data-label="Id"> العصر </div>');
    $(".table-row4")
      .append(
        '<div class="col col-1" data-label="Id">' +
          times.items[0].maghrib +
          "</div>"
      )
      .append('<div class="col col-21" data-label="Id"> المغرب </div>');
    $(".table-row5")
      .append(
        '<div class="col col-1" data-label="Id">' +
          times.items[0].isha +
          "</div>"
      )
      .append('<div class="col col-21" data-label="Id"> العشاء </div>');

    // First Redandency API ---------------------
  }
).fail(function () {
  $.getJSON(
    "https://cors.io/?https://muezzin-staging.herokuapp.com/prayerTimes/country/94/city/740/district/14879",
    function (times) {
      var now = new Date();
      if (month < 10) month = "0" + month;
      var today = now.getFullYear() + "-" + month + "-" + day;
      $(".table-row1")
        .append(
          '<div class="col col-1" data-label="Id">' +
            times["prayerTimes"][today]["fajr"] +
            "</div>"
        )
        .append('<div class="col col-21" data-label="Id"> الفجر </div>');
      $(".table-row2")
        .append(
          '<div class="col col-1" data-label="Id">' +
            times["prayerTimes"][today]["dhuhr"] +
            "</div>"
        )
        .append('<div class="col col-21" data-label="Id"> الظهر </div>');
      $(".table-row3")
        .append(
          '<div class="col col-1" data-label="Id">' +
            times["prayerTimes"][today]["asr"] +
            "</div>"
        )
        .append('<div class="col col-21" data-label="Id"> العصر </div>');
      $(".table-row4")
        .append(
          '<div class="col col-1" data-label="Id">' +
            times["prayerTimes"][today]["maghrib"] +
            "</div>"
        )
        .append('<div class="col col-21" data-label="Id"> المغرب </div>');
      $(".table-row5")
        .append(
          '<div class="col col-1" data-label="Id">' +
            times["prayerTimes"][today]["isha"] +
            "</div>"
        )
        .append('<div class="col col-21" data-label="Id"> العشاء </div>');

      // 2nd redandency API  ---------------------
    }
  ).fail(function () {
    $.getJSON(
      "https://api.aladhan.com/v1/timingsByCity?city=Doha&country=Qatar&method=8",
      function (times) {
        $(".table-row1")
          .append(
            '<div class="col col-1" data-label="Id">' +
              times["data"]["timings"]["Fajr"] +
              "</div>"
          )
          .append('<div class="col col-21" data-label="Id"> الفجر </div>');
        $(".table-row2")
          .append(
            '<div class="col col-1" data-label="Id">' +
              times["data"]["timings"]["Dhuhr"] +
              "</div>"
          )
          .append('<div class="col col-21" data-label="Id"> الظهر </div>');
        $(".table-row3")
          .append(
            '<div class="col col-1" data-label="Id">' +
              times["data"]["timings"]["Asr"] +
              "</div>"
          )
          .append('<div class="col col-21" data-label="Id"> العصر </div>');
        $(".table-row4")
          .append(
            '<div class="col col-1" data-label="Id">' +
              times["data"]["timings"]["Maghrib"] +
              "</div>"
          )
          .append('<div class="col col-21" data-label="Id"> المغرب </div>');
        $(".table-row5")
          .append(
            '<div class="col col-1" data-label="Id">' +
              times["data"]["timings"]["Isha"] +
              "</div>"
          )
          .append('<div class="col col-21" data-label="Id"> العشاء </div>');
      }
    );
  });
});

$("h3").text(writeIslamicDate());
