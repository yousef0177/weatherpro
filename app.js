/* =========================================================
   WeatherPro — app.js
   Static bilingual (FA/EN) weather app — no frameworks.
   ---------------------------------------------------------
   SETUP (one time):
   1) Sign up free at https://openweathermap.org and copy your API key
   2) Either paste it below in API_KEY  …or…  click the gear button
      on the site and save it there (stored in your browser only).
   ---------------------------------------------------------
   © Built by Yousef — t.me/NeuroCodeX_1
   ========================================================= */
"use strict";

/* ------------------------- config ------------------------- */
var API_KEY = "7ea0187b6bd068ec3a7706f711793eac"; // ← کلید خودت را اینجا بگذار | put your key here

var KEY_STORAGE = "wp_api_key";
var LANG_STORAGE = "wp_lang";
var LAST_PLACE_STORAGE = "wp_lastPlace";
var RECENT_STORAGE = "wp_recent";

var DEFAULT_PLACE = { name: "Tehran", state: "Tehran", country: "IR", lat: 35.6892, lon: 51.389 };
var TTL_WEATHER = 10 * 60 * 1000;
var TTL_GEO = 60 * 60 * 1000;
var MAX_RECENT = 6;

/* ------------------------- i18n ------------------------- */
var I18N = {
  fa: {
    dir: "rtl",
    appName: "آب‌وهوا پرو",
    appTagline: "پیش‌بینی دقیق، همه‌جا، همیشه",
    searchPlaceholder: "نام شهر، روستا یا منطقه… مثلاً: تهران",
    myLocation: "موقعیت من",
    locating: "در حال دریافت موقعیت…",
    recentSearches: "جستجوهای اخیر",
    clearRecent: "پاک کردن",
    noPlace: "مکانی با این نام پیدا نشد.",
    minQuery: "حداقل ۲ حرف وارد کن.",
    currentConditions: "وضعیت فعلی",
    feelsLike: "احساس‌شود",
    humidity: "رطوبت",
    wind: "باد",
    pressure: "فشار هوا",
    visibility: "دید افقی",
    clouds: "پوشش ابری",
    sunrise: "طلوع آفتاب",
    sunset: "غروب آفتاب",
    hourlyTitle: "پیش‌بینی ساعتی",
    hourlyHint: "۲۴ ساعت آینده",
    dailyTitle: "پیش‌بینی ۵ روزه",
    today: "امروز",
    pop: "بارش",
    windSpeedUnit: "m/s",
    pressureUnit: "hPa",
    visibilityUnit: "km",
    localTime: "ساعت محلی",
    weatherNow: "همین حالا",
    tempMin: "کمینه",
    tempMax: "بیشینه",
    loadingWeather: "در حال دریافت اطلاعات…",
    errorWeather: "دریافت اطلاعات هواشناسی ناموفق بود. دوباره تلاش کن.",
    errorGeolocation: "دسترسی به موقعیت مکانی ممکن نشد.",
    errorNetwork: "خطای شبکه؛ اتصال اینترنت را بررسی کن.",
    errorCityNotFound: "چنین شهری پیدا نشد.",
    retry: "تلاش دوباره",
    madeBy: "ساخته شده توسط یوسف",
    dataBy: "داده‌ها از OpenWeather",
    joinChannel: "کانال تلگرام ما",
    switchTo: "English",
    themeToggle: "تغییر حالت شب و روز",
    settings: "تنظیمات کلید API",
    keyTitle: "کلید API هواشناسی",
    keyDesc: "برای نمایش آب‌وهوا، کلید رایگان OpenWeather لازم است. ثبت‌نام در openweathermap.org و کپی کلید از بخش API keys.",
    keyPlaceholder: "کلید OpenWeather…",
    keySave: "ذخیره",
    keyCancel: "انصراف",
    keyHint: "کلید فقط در مرورگر خودت (localStorage) ذخیره می‌شود و جایی ارسال نمی‌گردد.",
    keyMissing: "ابتدا کلید API را وارد کن.",
    keySaved: "کلید ذخیره شد.",
    keyInvalid: "کلید واردشده معتبر به نظر نمی‌رسد.",
    compass: ["شمال", "شمال‌شرق", "شرق", "جنوب‌شرق", "جنوب", "جنوب‌غربی", "غرب", "شمال‌غربی"],
    descriptions: {
      t2xx: "رعد و برق", t3xx: "نم‌نم باران",
      r500: "باران سبک", r501: "باران", r502: "باران شدید", r511: "باران یخ‌زده", r5xx: "رگبار باران",
      s600: "برف سبک", s601: "برف", s602: "برف سنگین", s611: "تگرگ", s615: "باران و برف", s6xx: "رگبار برف",
      m701: "مه آبی", m711: "دود", m721: "غبار آلود", m731: "گرد و خاک", m741: "مه", m751: "شن‌باد", m761: "غبار", m762: "خاکستر آتشفشانی", m771: "تندباد", m781: "گردباد",
      c800d: "آفتابی", c800n: "صاف", c801: "کمی ابری", c802: "پراکنده ابری", c803: "اکثراً ابری", c804: "پوشیده از ابر"
    }
  },
  en: {
    dir: "ltr",
    appName: "WeatherPro",
    appTagline: "Accurate forecast, anywhere, anytime",
    searchPlaceholder: "City, village or region… e.g. Tehran",
    myLocation: "My location",
    locating: "Getting location…",
    recentSearches: "Recent searches",
    clearRecent: "Clear",
    noPlace: "No place found with this name.",
    minQuery: "Type at least 2 characters.",
    currentConditions: "Current conditions",
    feelsLike: "Feels like",
    humidity: "Humidity",
    wind: "Wind",
    pressure: "Pressure",
    visibility: "Visibility",
    clouds: "Cloudiness",
    sunrise: "Sunrise",
    sunset: "Sunset",
    hourlyTitle: "Hourly forecast",
    hourlyHint: "Next 24 hours",
    dailyTitle: "5-day forecast",
    today: "Today",
    pop: "Rain",
    windSpeedUnit: "m/s",
    pressureUnit: "hPa",
    visibilityUnit: "km",
    localTime: "Local time",
    weatherNow: "Right now",
    tempMin: "Min",
    tempMax: "Max",
    loadingWeather: "Fetching data…",
    errorWeather: "Failed to fetch weather data. Please try again.",
    errorGeolocation: "Could not access your location.",
    errorNetwork: "Network error; check your connection.",
    errorCityNotFound: "No such city found.",
    retry: "Retry",
    madeBy: "Built by Yousef",
    dataBy: "Data from OpenWeather",
    joinChannel: "Our Telegram channel",
    switchTo: "فارسی",
    themeToggle: "Toggle dark / light mode",
    settings: "API key settings",
    keyTitle: "Weather API key",
    keyDesc: "A free OpenWeather key is required. Sign up at openweathermap.org and copy the key from the API keys section.",
    keyPlaceholder: "OpenWeather key…",
    keySave: "Save",
    keyCancel: "Cancel",
    keyHint: "The key is stored only in your browser (localStorage) and is never sent anywhere else.",
    keyMissing: "Please enter your API key first.",
    keySaved: "Key saved.",
    keyInvalid: "The entered key does not look valid.",
    compass: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"],
    descriptions: {
      t2xx: "Thunderstorm", t3xx: "Drizzle",
      r500: "Light rain", r501: "Rain", r502: "Heavy rain", r511: "Freezing rain", r5xx: "Rain showers",
      s600: "Light snow", s601: "Snow", s602: "Heavy snow", s611: "Sleet", s615: "Rain and snow", s6xx: "Snow showers",
      m701: "Mist", m711: "Smoke", m721: "Haze", m731: "Dust", m741: "Fog", m751: "Sand", m761: "Dust", m762: "Volcanic ash", m771: "Squall", m781: "Tornado",
      c800d: "Sunny", c800n: "Clear sky", c801: "Few clouds", c802: "Scattered clouds", c803: "Broken clouds", c804: "Overcast"
    }
  }
};

/** Map OpenWeather condition id -> description key */
function describeKey(id, isDay) {
  var pick = function (k) { return k; };
  if (id >= 200 && id < 300) return pick("t2xx");
  if (id >= 300 && id < 400) return pick("t3xx");
  if (id === 500) return pick("r500");
  if (id === 501) return pick("r501");
  if (id >= 502 && id <= 504) return pick("r502");
  if (id === 511) return pick("r511");
  if (id >= 520 && id < 600) return pick("r5xx");
  if (id === 600) return pick("s600");
  if (id === 601) return pick("s601");
  if (id === 602) return pick("s602");
  if (id === 611 || id === 612) return pick("s611");
  if (id === 615 || id === 616) return pick("s615");
  if (id >= 620 && id < 700) return pick("s6xx");
  if (id === 701) return pick("m701");
  if (id === 711) return pick("m711");
  if (id === 721) return pick("m721");
  if (id === 731) return pick("m731");
  if (id === 741) return pick("m741");
  if (id === 751) return pick("m751");
  if (id === 761) return pick("m761");
  if (id === 762) return pick("m762");
  if (id === 771) return pick("m771");
  if (id === 781) return pick("m781");
  if (id === 800) return isDay ? "c800d" : "c800n";
  if (id === 801) return pick("c801");
  if (id === 802) return pick("c802");
  if (id === 803) return pick("c803");
  return pick("c804");
}

/* ------------------------- helpers ------------------------- */
function $(id) { return document.getElementById(id); }

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function lsGet(k, fallback) {
  try {
    var raw = localStorage.getItem(k);
    return raw == null ? fallback : JSON.parse(raw);
  } catch (e) { return fallback; }
}
function lsSet(k, v) {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
}

function t() { return I18N[state.lang]; }

function nf(n, digits) {
  if (digits == null) digits = 0;
  return new Intl.NumberFormat(state.lang === "fa" ? "fa-IR" : "en-US", {
    maximumFractionDigits: digits, minimumFractionDigits: digits
  }).format(n);
}
function fmtTemp(n) { return nf(Math.round(n)) + "°"; }
function fmtPercent(p) { return nf(Math.round(p * 100)) + (state.lang === "fa" ? "٪" : "%"); }

function cityLocalDate(unixSec, offsetSec) { return new Date((unixSec + offsetSec) * 1000); }
function dtf(opts) {
  return new Intl.DateTimeFormat(state.lang === "fa" ? "fa-IR" : "en-US",
    Object.assign({ timeZone: "UTC" }, opts));
}
function fmtTime(unixSec, offsetSec) {
  return dtf({ hour: "2-digit", minute: "2-digit", hour12: state.lang === "en" }).format(cityLocalDate(unixSec, offsetSec));
}
function fmtHourShort(unixSec, offsetSec) {
  return dtf({ hour: "2-digit", hour12: state.lang === "en" }).format(cityLocalDate(unixSec, offsetSec));
}
function fmtFullDate(unixSec, offsetSec) {
  return dtf({ weekday: "long", day: "numeric", month: "long" }).format(cityLocalDate(unixSec, offsetSec));
}
function dayObj(dateStr) { return new Date(dateStr + "T12:00:00Z"); }
function fmtDayName(dateStr) { return dtf({ weekday: "long" }).format(dayObj(dateStr)); }
function fmtDayMonth(dateStr) { return dtf({ day: "numeric", month: "short" }).format(dayObj(dateStr)); }

/** UTC offset as ±H or ±H:MM (handles fractional zones like Tehran +3:30) */
function fmtOffset(sec) {
  var abs = Math.abs(sec);
  var h = Math.floor(abs / 3600);
  var m = Math.round((abs % 3600) / 60);
  var pad = function (v) { return nf(v).padStart ? nf(v).padStart(2, state.lang === "fa" ? "۰" : "0") : nf(v); };
  return "UTC" + (sec < 0 ? "-" : "+") + pad(h) + (m ? ":" + pad(m) : "");
}

function compassDir(deg) {
  var idx = Math.round((deg % 360) / 45) % 8;
  return t().compass[idx] || "";
}

function countryFlag(cc) {
  if (!cc || cc.length !== 2) return "\uD83C\uDF0D";
  return String.fromCodePoint.apply(null, cc.toUpperCase().split("")
    .map(function (c) { return 0x1f1e6 + c.charCodeAt(0) - 65; }));
}

function placeLabel(p) {
  var sep = state.lang === "fa" ? "، " : ", ";
  return [p.name, p.state, p.country].filter(Boolean).join(sep);
}

/** condition id -> { group, color, svg } */
function bgGroup(id) {
  if (id >= 200 && id < 300) return "storm";
  if (id >= 300 && id < 600) return "rain";
  if (id >= 600 && id < 700) return "snow";
  if (id >= 700 && id < 800) return "fog";
  if (id === 800) return "clear";
  return "cloud";
}

var SVG = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
  cloudSun: '<g transform="translate(9.5 -1.5) scale(0.58)"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></g><path d="M13 21H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>',
  cloudMoon: '<g transform="translate(8 0) scale(0.6)"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></g><path d="M13 21H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>',
  drizzle: '<path d="M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24"/><path d="M8 15v2M8 19v2M12 17v2M12 21v2M16 15v2M16 19v2"/>',
  rain: '<path d="M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24"/><path d="M16 14v6M8 14v6M12 16v6"/>',
  snow: '<path d="M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24"/><path d="M8 15h.01M8 19h.01M12 17h.01M12 21h.01M16 15h.01M16 19h.01"/>',
  thunder: '<path d="M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24"/><path d="m13 12-3 5h4l-3 5"/>',
  fog: '<path d="M4 13.9A7 7 0 1 1 15.71 7h1.79a4.5 4.5 0 0 1 2.5 8.24"/><path d="M16 17H7M17 21H9"/>',
  wind: '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',
  tornado: '<path d="M21 4H3M18 8H6M19 12H9M16 16h-6M13 20h-2"/>'
};

function weatherIconSpec(id, isDay) {
  if (id >= 200 && id < 300) return { p: SVG.thunder, c: "wx-amber" };
  if (id >= 300 && id < 400) return { p: SVG.drizzle, c: "wx-teal" };
  if (id >= 500 && id < 600) return { p: SVG.rain, c: "wx-sky" };
  if (id >= 600 && id < 700) return { p: SVG.snow, c: "wx-cyan" };
  if (id >= 700 && id < 800) return { p: SVG.fog, c: "wx-stone" };
  if (id === 781) return { p: SVG.tornado, c: "wx-stone" };
  if (id === 771) return { p: SVG.wind, c: "wx-teal" };
  if (id === 800) return isDay ? { p: SVG.sun, c: "wx-amber" } : { p: SVG.moon, c: "wx-night" };
  if (id === 801) return isDay ? { p: SVG.cloudSun, c: "wx-amber" } : { p: SVG.cloudMoon, c: "wx-night" };
  if (id === 802) return isDay ? { p: SVG.cloudSun, c: "wx-teal" } : { p: SVG.cloudMoon, c: "wx-night" };
  return { p: SVG.cloud, c: "wx-slate" };
}

function iconHTML(id, isDay, cls) {
  var s = weatherIconSpec(id, isDay);
  return '<span class="wx-ic ' + (cls || "") + " " + s.c + '">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + s.p + "</svg></span>";
}

function descOf(id, isDay) {
  var key = describeKey(id, isDay);
  return t().descriptions[key] || t().descriptions.c802;
}

/* ------------------------- state ------------------------- */
var state = {
  lang: "fa",
  place: DEFAULT_PLACE,
  data: null,          // normalized weather payload
  recent: [],
  reqSeq: 0,           // weather request guard
  searchSeq: 0,        // search request guard
  suggestTimer: null,
  suggestAbort: null,
  activeIdx: -1,       // keyboard-highlighted suggestion
  lastQuery: "",
  clockTimer: null,
  pendingAfterKey: null // retry action after saving API key
};

function getKey() {
  var k = "";
  try { k = localStorage.getItem(KEY_STORAGE) || ""; } catch (e) {}
  if (!k && API_KEY && API_KEY.indexOf("PUT_YOUR") !== 0) k = API_KEY;
  return k.trim() || null;
}

/* ------------------------- API layer ------------------------- */
var cache = new Map();
function cached(key, ttl, fn) {
  var hit = cache.get(key);
  var now = Date.now();
  if (hit && now - hit.t < ttl) return Promise.resolve(hit.v);
  return fn().then(function (v) {
    if (cache.size > 300) cache.clear();
    cache.set(key, { t: now, v: v });
    return v;
  });
}

function APIError(message, status) {
  this.name = "APIError";
  this.message = message;
  this.status = status || 0;
}
APIError.prototype = Object.create(Error.prototype);

function owJSON(path, params) {
  var key = getKey();
  if (!key) {
    openKeyModal();
    return Promise.reject(new APIError("missing key", 0));
  }
  var url = "https://api.openweathermap.org" + path + "?appid=" + encodeURIComponent(key);
  Object.keys(params).forEach(function (k) {
    url += "&" + encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
  });
  return fetch(url).then(function (res) {
    if (!res.ok) {
      if (res.status === 404) throw new APIError("not found", 404);
      if (res.status === 401) throw new APIError("invalid key", 401);
      throw new APIError("openweather " + res.status, res.status);
    }
    return res.json();
  });
}

function geocodeDirect(q, limit) {
  return cached("geo:" + q + ":" + state.lang, TTL_GEO, function () {
    return owJSON("/geo/1.0/direct", { q: q, limit: limit || 5, lang: state.lang });
  });
}
function geocodeReverse(lat, lon, limit) {
  return cached("rev:" + lat.toFixed(2) + "," + lon.toFixed(2) + ":" + state.lang, TTL_GEO, function () {
    return owJSON("/geo/1.0/reverse", { lat: lat, lon: lon, limit: limit || 1, lang: state.lang });
  });
}
function getCurrent(lat, lon) {
  return cached("cur:" + lat.toFixed(2) + "," + lon.toFixed(2) + ":" + state.lang, TTL_WEATHER, function () {
    return owJSON("/data/2.5/weather", { lat: lat, lon: lon, units: "metric", lang: state.lang });
  });
}
function getForecast(lat, lon) {
  return cached("fc:" + lat.toFixed(2) + "," + lon.toFixed(2) + ":" + state.lang, TTL_WEATHER, function () {
    return owJSON("/data/2.5/forecast", { lat: lat, lon: lon, units: "metric", lang: state.lang });
  });
}

/** Aggregate 3-hour forecast points into city-local daily summaries */
function aggregateDaily(list, offset) {
  var groups = {};
  var keys = [];
  list.forEach(function (item) {
    var key = new Date((item.dt + offset) * 1000).toISOString().slice(0, 10);
    if (!groups[key]) { groups[key] = []; keys.push(key); }
    groups[key].push(item);
  });
  keys.sort();
  return keys.map(function (date) {
    var items = groups[date];
    var chosen = items.reduce(function (best, x) {
      var h = new Date((x.dt + offset) * 1000).getUTCHours();
      var bh = new Date((best.dt + offset) * 1000).getUTCHours();
      return Math.abs(h - 12) < Math.abs(bh - 12) ? x : best;
    });
    var temps = items.map(function (x) { return x.main.temp; });
    return {
      date: date,
      min: Math.min.apply(null, temps),
      max: Math.max.apply(null, temps),
      conditionId: (chosen.weather && chosen.weather[0] && chosen.weather[0].id) || 800,
      humidity: chosen.main.humidity,
      rain: items.reduce(function (s, x) { return s + ((x.rain && x.rain["3h"]) || 0); }, 0),
      wind: Math.max.apply(null, items.map(function (x) { return x.wind.speed; })),
      pop: Math.max.apply(null, items.map(function (x) { return x.pop || 0; }))
    };
  });
}

/** current + hourly(24h) + daily(5d) in one normalized payload */
function getWeatherBundle(lat, lon) {
  return Promise.all([getCurrent(lat, lon), getForecast(lat, lon)]).then(function (r) {
    var cur = r[0], fc = r[1];
    var offset = typeof cur.timezone === "number" ? cur.timezone : (fc.city && fc.city.timezone) || 0;
    return {
      place: {
        name: cur.name || "",
        country: (cur.sys && cur.sys.country) || "",
        state: "",
        lat: lat, lon: lon
      },
      offset: offset,
      current: {
        dt: cur.dt,
        temp: cur.main.temp,
        feelsLike: cur.main.feels_like,
        tempMin: cur.main.temp_min,
        tempMax: cur.main.temp_max,
        humidity: cur.main.humidity,
        pressure: cur.main.pressure,
        windSpeed: cur.wind.speed,
        windDeg: (cur.wind && cur.wind.deg) || 0,
        visibility: cur.visibility == null ? null : cur.visibility,
        clouds: (cur.clouds && cur.clouds.all) || 0,
        conditionId: (cur.weather && cur.weather[0] && cur.weather[0].id) || 800,
        isDay: String((cur.weather && cur.weather[0] && cur.weather[0].icon) || "01d").slice(-1) === "d",
        sunrise: (cur.sys && cur.sys.sunrise) || 0,
        sunset: (cur.sys && cur.sys.sunset) || 0
      },
      hourly: fc.list.slice(0, 8).map(function (h) {
        return {
          dt: h.dt,
          temp: h.main.temp,
          conditionId: (h.weather && h.weather[0] && h.weather[0].id) || 800,
          isDay: String((h.weather && h.weather[0] && h.weather[0].icon) || "01d").slice(-1) === "d",
          pop: h.pop || 0
        };
      }),
      daily: aggregateDaily(fc.list, offset).slice(0, 5)
    };
  });
}

/* ------------------------- static i18n ------------------------- */
function renderStatic() {
  var tr = t();
  document.title = tr.appName + " | WeatherPro";
  document.documentElement.lang = state.lang;
  document.documentElement.dir = tr.dir;

  var nodes = document.querySelectorAll("[data-i18n]");
  for (var i = 0; i < nodes.length; i++) nodes[i].textContent = tr[nodes[i].getAttribute("data-i18n")];

  var phs = document.querySelectorAll("[data-i18n-ph]");
  for (var j = 0; j < phs.length; j++) phs[j].setAttribute("placeholder", tr[phs[j].getAttribute("data-i18n-ph")]);

  var ars = document.querySelectorAll("[data-i18n-aria]");
  for (var k = 0; k < ars.length; k++) {
    ars[k].setAttribute("aria-label", tr[ars[k].getAttribute("data-i18n-aria")]);
    ars[k].setAttribute("title", tr[ars[k].getAttribute("data-i18n-aria")]);
  }
  $("year").textContent = new Date().getFullYear();
}

/* ------------------------- message bar ------------------------- */
function showMsg(textKeyOrText, opts) {
  opts = opts || {};
  var tr = t();
  var isKey = Object.prototype.hasOwnProperty.call(tr, textKeyOrText);
  $("msgText").textContent = isKey ? tr[textKeyOrText] : textKeyOrText;
  $("msgRetry").hidden = !opts.retry;
  $("msgBar").hidden = false;
}
function hideMsg() { $("msgBar").hidden = true; }

/* ------------------------- loading ------------------------- */
function setLoading(on) {
  var hasData = !!state.data;
  $("loader").hidden = !(on && !hasData);
  ["currentCard", "detailsGrid", "hourlyCard", "dailyCard"].forEach(function (id) {
    if (hasData) $(id).classList.toggle("dimmed", on);
  });
}

/* ------------------------- render: current ------------------------- */
function renderCurrent() {
  var tr = t();
  var d = state.data.current;
  var liveSec = Math.floor(Date.now() / 1000) + state.data.offset;
  var html =
    '<div class="current-head">' +
      "<div>" +
        '<h1 class="place-line">' +
          '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>' +
          '<span class="place-name">' + esc(state.data.place.name || state.place.name || "…") + "</span>" +
          '<span class="place-flag">' + countryFlag(state.data.place.country || state.place.country) + "</span>" +
        "</h1>" +
        '<p class="datetime-line">' +
          '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
          '<span class="tnum">' + esc(fmtFullDate(liveSec, 0)) + "</span>" +
          "<span aria-hidden=\"true\">·</span>" +
          '<span class="tnum" dir="ltr">' + esc(fmtTime(liveSec, 0)) + "</span>" +
        "</p>" +
      "</div>" +
      '<span class="badge">' + esc(tr.currentConditions) + "</span>" +
    "</div>" +
    '<div class="current-body">' +
      '<div class="wx-main">' + iconHTML(d.conditionId, d.isDay, "wx-icon") +
        "<div>" +
          '<p class="temp tnum" aria-label="' + esc(fmtTemp(d.temp)) + '">' + esc(fmtTemp(d.temp)) + "</p>" +
          '<p class="desc">' + esc(descOf(d.conditionId, d.isDay)) + "</p>" +
          '<p class="feels">' +
            '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>' +
            esc(tr.feelsLike) + ": <b class=\"tnum\">" + esc(fmtTemp(d.feelsLike)) + "</b>" +
          "</p>" +
        "</div>" +
      "</div>" +
      '<div class="wx-extra">' +
        '<p class="row tnum"><span class="muted">&#8595; ' + esc(tr.tempMin) + ":</span> <b>" + esc(fmtTemp(d.tempMin)) + "</b>" +
        '<span class="muted">&nbsp;/&nbsp;&#8593; ' + esc(tr.tempMax) + ":</span> <b>" + esc(fmtTemp(d.tempMax)) + "</b></p>" +
        '<p class="row tnum"><svg class="ic sr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v8M4.93 10.93l1.41 1.41M2 18h2M20 18h2M19.07 10.93l-1.41 1.41M22 22H2M8 6l4-4 4 4M16 18a4 4 0 0 0-8 0"/></svg>' +
        esc(tr.sunrise) + ": <b>" + esc(fmtTime(d.sunrise, state.data.offset)) + "</b></p>" +
        '<p class="row tnum"><svg class="ic ss" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 10V2M4.93 10.93l1.41 1.41M2 18h2M20 18h2M19.07 10.93l-1.41 1.41M22 22H2M16 6l-4 4-4-4M16 18a4 4 0 0 0-8 0"/></svg>' +
        esc(tr.sunset) + ": <b>" + esc(fmtTime(d.sunset, state.data.offset)) + "</b></p>" +
      "</div>" +
    "</div>" +
    '<p class="utc-line tnum">' + esc(tr.localTime) + ': <span dir="ltr">' + esc(fmtOffset(state.data.offset)) + "</span></p>";
  var el = $("currentCard");
  el.innerHTML = html;
  el.hidden = false;
}

/* ------------------------- render: details ------------------------- */
function renderDetails() {
  var tr = t();
  var d = state.data.current;
  var items = [
    { ic: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>', label: tr.humidity, value: nf(d.humidity) + (state.lang === "fa" ? "٪" : "%") },
    { ic: '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>', label: tr.wind, value: nf(d.windSpeed, 1) + " " + tr.windSpeedUnit + " · " + compassDir(d.windDeg) },
    { ic: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>', label: tr.pressure, value: nf(d.pressure) + " " + tr.pressureUnit }
  ];
  if (d.visibility != null) {
    items.push({ ic: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>', label: tr.visibility, value: nf(d.visibility / 1000, 1) + " " + tr.visibilityUnit });
  }
  items.push({ ic: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>', label: tr.clouds, value: nf(d.clouds) + (state.lang === "fa" ? "٪" : "%") });

  var html = "";
  items.forEach(function (it) {
    html += '<div class="glass detail">' +
      '<span class="detail-label"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + it.ic + "</svg>" + esc(it.label) + "</span>" +
      '<span class="detail-value tnum" dir="ltr" style="text-align:start">' + esc(it.value) + "</span></div>";
  });
  var el = $("detailsGrid");
  el.innerHTML = html;
  el.hidden = false;
}

/* ------------------------- render: hourly ------------------------- */
function renderHourly() {
  var tr = t();
  var html = "";
  state.data.hourly.forEach(function (h, i) {
    html += '<div class="hour-item" role="listitem" title="' + esc(descOf(h.conditionId, h.isDay)) + '">' +
      '<span class="hour-time tnum" dir="ltr">' + esc(i === 0 ? tr.weatherNow : fmtHourShort(h.dt, state.data.offset)) + "</span>" +
      iconHTML(h.conditionId, h.isDay, "wx-ic-sm") +
      '<span class="hour-temp tnum">' + esc(fmtTemp(h.temp)) + "</span>" +
      '<span class="hour-pop tnum' + (h.pop >= 0.2 ? " wet" : "") + '">' +
        '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>' +
        esc(fmtPercent(h.pop)) + "</span></div>";
  });
  $("hourlyStrip").innerHTML = html;
  $("hourlyCard").hidden = false;
}

/* ------------------------- render: daily ------------------------- */
function renderDaily() {
  var tr = t();
  var days = state.data.daily;
  var weekMin = Math.min.apply(null, days.map(function (d) { return d.min; }));
  var weekMax = Math.max.apply(null, days.map(function (d) { return d.max; }));
  var span = Math.max(weekMax - weekMin, 1);

  var html = "";
  days.forEach(function (d, i) {
    var startPct = ((d.min - weekMin) / span) * 100;
    var widthPct = Math.max(((d.max - d.min) / span) * 100, 6);
    html += '<li class="day-row">' +
      '<div class="day-name"><p class="d1">' + esc(i === 0 ? tr.today : fmtDayName(d.date)) + '</p><p class="d2 tnum">' + esc(fmtDayMonth(d.date)) + "</p></div>" +
      '<div class="day-mid">' + iconHTML(d.conditionId, true, "wx-ic-sm") +
        "<div><p class=\"day-desc\">" + esc(descOf(d.conditionId, true)) + "</p>" +
        '<p class="day-meta tnum">' +
          '<span class="m"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>' + nf(d.rain, 1) + "mm</span>" +
          '<span class="m"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>' + nf(d.wind, 1) + "</span>" +
          '<span class="m">' + esc(tr.pop) + " " + esc(fmtPercent(d.pop)) + "</span>" +
        "</p></div>" +
      "</div>" +
      '<div class="day-range tnum">' +
        '<span class="tmin">' + esc(fmtTemp(d.min)) + '</span>' +
        '<span class="range-track"><span class="range-bar" style="inset-inline-start:' + startPct.toFixed(1) + "%;width:" + widthPct.toFixed(1) + '%"></span></span>' +
        '<span class="tmax">' + esc(fmtTemp(d.max)) + "</span>" +
      "</div></li>";
  });
  $("dailyList").innerHTML = html;
  $("dailyCard").hidden = false;
}

/* ------------------------- ambient ------------------------- */
function updateAmbient() {
  var d = state.data.current;
  var group = bgGroup(d.conditionId);
  $("ambientOverlay").className = "ambient-overlay on ov-" + group;
  document.body.dataset.cond = group;
  $("rainFx").classList.toggle("on", group === "storm");
  $("starsFx").classList.toggle("on", group === "clear" && !d.isDay);
}

/* ------------------------- render all ------------------------- */
function renderAll() {
  if (!state.data) return;
  hideMsg();
  renderCurrent();
  renderDetails();
  renderHourly();
  renderDaily();
  updateAmbient();
  setLoading(false);
}

/* ------------------------- recent searches ------------------------- */
function renderRecent() {
  var row = $("recentRow");
  if (!state.recent.length || !$("suggest").hidden) { row.hidden = true; return; }
  var html = "";
  state.recent.forEach(function (p, i) {
    html += '<span class="chip">' +
      '<button type="button" class="pick" data-idx="' + i + '" title="' + esc(placeLabel(p)) + '">' +
      countryFlag(p.country) + " " + esc(p.name || placeLabel(p)) + "</button>" +
      '<button type="button" class="chip-x" data-del="' + i + '" aria-label="remove">' +
      '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button></span>';
  });
  $("recentChips").innerHTML = html;
  row.hidden = false;
}
function pushRecent(p) {
  if (!p || typeof p.lat !== "number") return;
  state.recent = [p].concat(state.recent.filter(function (x) {
    return Math.abs(x.lat - p.lat) > 0.01 || Math.abs(x.lon - p.lon) > 0.01;
  })).slice(0, MAX_RECENT);
  lsSet(RECENT_STORAGE, state.recent);
  renderRecent();
}

/* ------------------------- weather fetch ------------------------- */
function setPlace(p, opts) {
  opts = opts || {};
  state.place = { name: p.disp || p.name || "", state: p.state || "", country: p.country || "", lat: p.lat, lon: p.lon };
  lsSet(LAST_PLACE_STORAGE, state.place);
  if (opts.remember && state.place.name) pushRecent(state.place);
  closeSuggest();
  fetchWeather(state.place);
}

function fetchWeather(p) {
  var seq = ++state.reqSeq;
  setLoading(true);
  hideMsg();
  getWeatherBundle(p.lat, p.lon).then(function (bundle) {
    if (seq !== state.reqSeq) return;
    state.data = bundle;
    if (!bundle.place.name && p.name) bundle.place.name = p.name;
    if (!bundle.place.country && p.country) bundle.place.country = p.country;
    if (!p.name && bundle.place.name) {
      var merged = { name: bundle.place.name, state: "", country: bundle.place.country, lat: p.lat, lon: p.lon };
      state.place = merged;
      lsSet(LAST_PLACE_STORAGE, merged);
      pushRecent(merged);
    }
    renderAll();
  }).catch(function (err) {
    if (seq !== state.reqSeq) return;
    setLoading(false);
    handleApiError(err);
    if (!state.data) {
      $("loader").hidden = true;
    }
  });
}

function handleApiError(err) {
  if (err instanceof APIError) {
    if (err.status === 0) return;                     /* missing key → modal already open */
    if (err.status === 401) { openKeyModal(); showMsg("keyInvalid"); return; }
    if (err.status === 404) { showMsg("errorCityNotFound", { retry: false }); return; }
    showMsg("errorWeather", { retry: true });
  } else {
    showMsg("errorNetwork", { retry: true });          /* fetch TypeError / offline */
  }
}

/* ------------------------- city search ------------------------- */
var suggestItems = [];

/* Built-in city index — instant results + fixes OpenWeather's weak prefix matching
   (e.g. its API does NOT return London for "lon", ours does). [fa, en, cc, lat, lon, state] */
var CITY_DB = [
  ["تهران","Tehran","IR",35.6892,51.3890,"Tehran"],["مشهد","Mashhad","IR",36.2605,59.6168,"Razavi Khorasan"],
  ["اصفهان","Isfahan","IR",32.6539,51.6660,"Isfahan"],["کرج","Karaj","IR",35.8355,50.9915,"Alborz"],
  ["شیراز","Shiraz","IR",29.5918,52.5837,"Fars"],["تبریز","Tabriz","IR",38.0962,46.2738,"East Azerbaijan"],
  ["قم","Qom","IR",34.6416,50.8746,"Qom"],["اهواز","Ahvaz","IR",31.3183,48.6706,"Khuzestan"],
  ["کرمانشاه","Kermanshah","IR",34.3142,47.0650,"Kermanshah"],["ارومیه","Urmia","IR",37.5527,45.0761,"West Azerbaijan"],
  ["رشت","Rasht","IR",37.2808,49.5832,"Gilan"],["زاهدان","Zahedan","IR",29.4963,60.8629,"Sistan and Baluchestan"],
  ["همدان","Hamadan","IR",34.7992,48.5146,"Hamadan"],["کرمان","Kerman","IR",30.2839,57.0834,"Kerman"],
  ["یزد","Yazd","IR",31.8974,54.3569,"Yazd"],["اردبیل","Ardabil","IR",38.2516,48.2973,"Ardabil"],
  ["بندرعباس","Bandar Abbas","IR",27.1865,56.2808,"Hormozgan"],["اراک","Arak","IR",34.0917,48.4606,"Markazi"],
  ["زنجان","Zanjan","IR",36.6736,48.4787,"Zanjan"],["سنندج","Sanandaj","IR",35.3219,46.9862,"Kurdistan"],
  ["قزوین","Qazvin","IR",36.2688,50.0041,"Qazvin"],["خرم‌آباد","Khorramabad","IR",33.4878,48.3558,"Lorestan"],
  ["گرگان","Gorgan","IR",36.8427,54.4441,"Golestan"],["ساری","Sari","IR",36.5633,53.0600,"Mazandaran"],
  ["بوشهر","Bushehr","IR",28.9234,50.8200,"Bushehr"],["بیرجند","Birjand","IR",32.8663,59.2211,"South Khorasan"],
  ["ایلام","Ilam","IR",33.6374,46.4227,"Ilam"],["یاسوج","Yasuj","IR",30.6682,51.5879,"Kohgiluyeh and Boyer-Ahmad"],
  ["شهرکرد","Shahrekord","IR",32.3256,50.8644,"Chaharmahal and Bakhtiari"],["سمنان","Semnan","IR",35.5769,53.3921,"Semnan"],
  ["کیش","Kish","IR",26.5578,54.0289,"Hormozgan"],["آبادان","Abadan","IR",30.3392,48.3043,"Khuzestan"],
  ["لندن","London","GB",51.5074,-0.1278,"England"],["پاریس","Paris","FR",48.8566,2.3522,"Île-de-France"],
  ["نیویورک","New York","US",40.7128,-74.0060,"New York"],["لس‌آنجلس","Los Angeles","US",34.0522,-118.2437,"California"],
  ["شیکاگو","Chicago","US",41.8781,-87.6298,"Illinois"],["میامی","Miami","US",25.7617,-80.1918,"Florida"],
  ["سان‌فرانسیسکو","San Francisco","US",37.7749,-122.4194,"California"],["سیاتل","Seattle","US",47.6062,-122.3321,"Washington"],
  ["واشینگتن","Washington","US",38.9072,-77.0369,"District of Columbia"],["بوستون","Boston","US",42.3601,-71.0589,"Massachusetts"],
  ["هیوستون","Houston","US",29.7604,-95.3698,"Texas"],["لاس‌وگاس","Las Vegas","US",36.1699,-115.1398,"Nevada"],
  ["تورنتو","Toronto","CA",43.6532,-79.3832,"Ontario"],["ونکوور","Vancouver","CA",49.2827,-123.1207,"British Columbia"],
  ["برلین","Berlin","DE",52.5200,13.4050,"Berlin"],["مونیخ","Munich","DE",48.1351,11.5820,"Bavaria"],
  ["فرانکفورت","Frankfurt","DE",50.1109,8.6821,"Hesse"],["هامبورگ","Hamburg","DE",53.5511,9.9937,"Hamburg"],
  ["وین","Vienna","AT",48.2082,16.3738,"Vienna"],["زوریخ","Zurich","CH",47.3769,8.5417,"Zurich"],
  ["ژنو","Geneva","CH",46.2044,6.1432,"Geneva"],["آمستردام","Amsterdam","NL",52.3676,4.9041,"North Holland"],
  ["بروکسل","Brussels","BE",50.8503,4.3517,"Brussels"],["مادرید","Madrid","ES",40.4168,-3.7038,"Madrid"],
  ["بارسلونا","Barcelona","ES",41.3874,2.1686,"Catalonia"],["رم","Rome","IT",41.9028,12.4964,"Lazio"],
  ["میلان","Milan","IT",45.4642,9.1900,"Lombardy"],["ونیز","Venice","IT",45.4408,12.3155,"Veneto"],
  ["فلورانس","Florence","IT",43.7696,11.2558,"Tuscany"],["آتن","Athens","GR",37.9838,23.7275,"Attica"],
  ["استانبول","Istanbul","TR",41.0082,28.9784,"Istanbul"],["آنکارا","Ankara","TR",39.9334,32.8597,"Ankara"],
  ["آنتالیا","Antalya","TR",36.8969,30.7133,"Antalya"],["مسکو","Moscow","RU",55.7558,37.6173,"Moscow"],
  ["سن‌پترزبورگ","Saint Petersburg","RU",59.9311,30.3609,"Saint Petersburg"],["دبی","Dubai","AE",25.2048,55.2708,"Dubai"],
  ["ابوظبی","Abu Dhabi","AE",24.4539,54.3773,"Abu Dhabi"],["دوحه","Doha","QA",25.2854,51.5310,"Doha"],
  ["ریاض","Riyadh","SA",24.7136,46.6753,"Riyadh"],["جده","Jeddah","SA",21.4858,39.1925,"Makkah"],
  ["مکه","Mecca","SA",21.3891,39.8579,"Makkah"],["مدینه","Medina","SA",24.5247,39.5692,"Madinah"],
  ["کویت","Kuwait City","KW",29.3759,47.9774,"Al Asimah"],["بغداد","Baghdad","IQ",33.3152,44.3661,"Baghdad"],
  ["دمشق","Damascus","SY",33.5138,36.2765,"Damascus"],["بیروت","Beirut","LB",33.8938,35.5018,"Beirut"],
  ["امان","Amman","JO",31.9454,35.9284,"Amman"],["قاهره","Cairo","EG",30.0444,31.2357,"Cairo"],
  ["اسکندریه","Alexandria","EG",31.2001,29.9187,"Alexandria"],["کازابلانکا","Casablanca","MA",33.5731,-7.5898,"Casablanca-Settat"],
  ["مسقط","Muscat","OM",23.5880,58.3829,"Muscat"],["باکو","Baku","AZ",40.4093,49.8671,"Baku"],
  ["تفلیس","Tbilisi","GE",41.7151,44.8271,"Tbilisi"],["ایروان","Yerevan","AM",40.1792,44.4991,"Yerevan"],
  ["کابل","Kabul","AF",34.5553,69.2075,"Kabul"],["اسلام‌آباد","Islamabad","PK",33.6844,73.0479,"Islamabad"],
  ["کراچی","Karachi","PK",24.8607,67.0011,"Sindh"],["لاهور","Lahore","PK",31.5204,74.3587,"Punjab"],
  ["دهلی جدید","New Delhi","IN",28.6139,77.2090,"Delhi"],["بمبئی","Mumbai","IN",19.0760,72.8777,"Maharashtra"],
  ["پکن","Beijing","CN",39.9042,116.4074,"Beijing"],["شانگهای","Shanghai","CN",31.2304,121.4737,"Shanghai"],
  ["هنگ‌کنگ","Hong Kong","HK",22.3193,114.1694,"Hong Kong"],["توکیو","Tokyo","JP",35.6762,139.6503,"Tokyo"],
  ["اوساکا","Osaka","JP",34.6937,135.5023,"Osaka"],["کیوتو","Kyoto","JP",35.0116,135.7681,"Kyoto"],
  ["سئول","Seoul","KR",37.5665,126.9780,"Seoul"],["بانکوک","Bangkok","TH",13.7563,100.5018,"Bangkok"],
  ["سنگاپور","Singapore","SG",1.3521,103.8198,""],["جاکارتا","Jakarta","ID",-6.2088,106.8456,"Jakarta"],
  ["بالی","Bali","ID",-8.4095,115.1889,"Bali"],["کوالالامپور","Kuala Lumpur","MY",3.1390,101.6869,"Kuala Lumpur"],
  ["سیدنی","Sydney","AU",-33.8688,151.2093,"New South Wales"],["ملبورن","Melbourne","AU",-37.8136,144.9631,"Victoria"],
  ["اوکلند","Auckland","NZ",-36.8485,174.7633,"Auckland"],["سائوپائولو","São Paulo","BR",-23.5505,-46.6333,"São Paulo"],
  ["ریو دو ژانیرو","Rio de Janeiro","BR",-22.9068,-43.1729,"Rio de Janeiro"],["بوئنوس‌آیرس","Buenos Aires","AR",-34.6037,-58.3816,"Buenos Aires"],
  ["مکزیکوسیتی","Mexico City","MX",19.4326,-99.1332,"Mexico City"],["کانکون","Cancún","MX",21.1619,-86.8515,"Quintana Roo"],
  ["ادینبرو","Edinburgh","GB",55.9533,-3.1883,"Scotland"],["منچستر","Manchester","GB",53.4808,-2.2426,"England"],
  ["دوبلین","Dublin","IE",53.3498,-6.2603,"Leinster"],["لیسبون","Lisbon","PT",38.7223,-9.1393,"Lisbon"],
  ["پراگ","Prague","CZ",50.0755,14.4378,"Prague"],["بوداپست","Budapest","HU",47.4979,19.0402,"Budapest"],
  ["ورشو","Warsaw","PL",52.2297,21.0122,"Masovian"],["استکهلم","Stockholm","SE",59.3293,18.0686,"Stockholm"],
  ["اسلو","Oslo","NO",59.9139,10.7522,"Oslo"],["کپنهاگ","Copenhagen","DK",55.6761,12.5683,"Capital Region"],
  ["هلسینکی","Helsinki","FI",60.1699,24.9384,"Uusimaa"],["دوشنبه","Dushanbe","TJ",38.5598,68.7870,"Dushanbe"],
  ["تاشکند","Tashkent","UZ",41.2995,69.2401,"Tashkent"],["آلماتی","Almaty","KZ",43.2220,76.8512,"Almaty"]
];

function normFa(s) {
  return String(s || "")
    .replace(/\u064A/g, "\u06CC").replace(/\u0643/g, "\u06A9")
    .replace(/\u200c/g, " ").toLowerCase().trim();
}

/** instant local search: exact(0) > prefix(1) > contains(2) */
function searchLocal(q) {
  var qn = normFa(q), out = [];
  for (var i = 0; i < CITY_DB.length; i++) {
    var c = CITY_DB[i];
    var fa = normFa(c[0]), en = normFa(c[1]);
    var score = -1;
    if (en === qn || fa === qn) score = 0;
    else if (en.indexOf(qn) === 0 || fa.indexOf(qn) === 0) score = 1;
    else if (en.indexOf(qn) > -1 || fa.indexOf(qn) > -1) score = 2;
    if (score >= 0) {
      out.push({
        score: score,
        place: {
          name: state.lang === "fa" ? c[0] : c[1],
          disp: state.lang === "fa" ? c[0] : c[1],
          state: c[5] || "", country: c[2], lat: c[3], lon: c[4]
        }
      });
    }
  }
  out.sort(function (a, b) { return a.score - b.score; });
  return out.slice(0, 6).map(function (x) { return x.place; });
}

/** normalize an OpenWeather geocoding result for display in the UI language */
function normalizeApiPlace(p) {
  var loc = p.local_names || {};
  var disp = state.lang === "fa" ? (loc.fa || p.name) : (loc.en || p.name);
  return {
    name: p.name, disp: disp,
    state: p.state || "", country: p.country || "",
    lat: p.lat, lon: p.lon
  };
}

function placeKey(p) {
  return (p.country || "").toUpperCase() + ":" + p.lat.toFixed(2) + "," + p.lon.toFixed(2);
}

function dedupePlaces(list) {
  var seen = {}, out = [];
  list.forEach(function (p) {
    var k = placeKey(p);
    if (!seen[k]) { seen[k] = 1; out.push(p); }
  });
  return out;
}

/** rank API results: exact name match first, then prefix — fixes "Enter picks wrong city" */
function rankPlaces(list, q) {
  var qn = normFa(q);
  return list.map(function (p) {
    var n = normFa(p.disp), e = normFa(p.name);
    p._score = (n === qn || e === qn) ? 0 : (n.indexOf(qn) === 0 || e.indexOf(qn) === 0) ? 1 : 2;
    return p;
  }).sort(function (a, b) { return a._score - b._score; });
}

function openSuggest() { $("suggest").hidden = false; $("recentRow").hidden = true; }
function closeSuggest() {
  if (state.suggestTimer) { clearTimeout(state.suggestTimer); state.suggestTimer = null; }
  state.searchSeq++;   /* invalidate any in-flight suggestion response */
  if (state.suggestAbort) { try { state.suggestAbort.abort(); } catch (e) {} }
  $("suggest").hidden = true;
  suggestItems = [];
  state.activeIdx = -1;
  renderRecent();
}
function setSpin(on) { $("searchSpin").hidden = !on; }

function doSuggest(q) {
  var seq = ++state.searchSeq;
  if (state.suggestAbort) { try { state.suggestAbort.abort(); } catch (e) {} }
  var ac = new AbortController();
  state.suggestAbort = ac;
  setSpin(true);
  geocodeDirect(q, 6).then(function (places) {
    if (seq !== state.searchSeq || ac.signal.aborted) return;
    setSpin(false);
    var api = (Array.isArray(places) ? places : []).map(normalizeApiPlace);
    var merged = dedupePlaces(searchLocal(q).concat(api)).slice(0, 8);
    suggestItems = merged;
    renderSuggest(merged);
    openSuggest();
  }).catch(function (err) {
    if (seq !== state.searchSeq || ac.signal.aborted) return;
    setSpin(false);
    if (err instanceof TypeError) { showMsg("errorNetwork"); return; }
    handleApiError(err);
  });
}

function renderSuggest(places) {
  var box = $("suggest");
  if (!places.length) {
    box.innerHTML = '<p class="suggest-empty">' + esc(t().noPlace) + "</p>";
    state.activeIdx = -1;
    return;
  }
  var html = "";
  places.forEach(function (p, i) {
    html += '<button type="button" class="suggest-item" role="option" aria-selected="false" data-idx="' + i + '">' +
      '<span class="suggest-flag">' + countryFlag(p.country) + "</span>" +
      '<span class="suggest-txt"><span class="suggest-name">' + esc(p.disp || p.name) + "</span>" +
      '<span class="suggest-sub">' + esc([p.state, p.country].filter(Boolean).join(" · ")) + "</span></span>" +
      '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>' +
      "</button>";
  });
  box.innerHTML = html;
  state.activeIdx = -1;
}

function highlightActive() {
  var items = $("suggest").querySelectorAll(".suggest-item");
  for (var i = 0; i < items.length; i++) {
    items[i].classList.toggle("active", i === state.activeIdx);
    items[i].setAttribute("aria-selected", i === state.activeIdx ? "true" : "false");
  }
  if (state.activeIdx >= 0 && items[state.activeIdx]) {
    items[state.activeIdx].scrollIntoView({ block: "nearest" });
  }
}

function clearSearchBox() {
  $("searchInput").value = "";
  $("clearBtn").hidden = true;
}

/** Enter/submit → best match: local index first (exact/prefix), then ranked API results */
function doSearchPick(q) {
  if (!getKey()) { openKeyModal(); return; }
  var local = searchLocal(q);
  if (local.length && localScore(local[0], q) <= 1) {
    hideMsg();
    clearSearchBox();
    setPlace(local[0], { remember: true });
    return;
  }
  var seq = ++state.searchSeq;
  setSpin(true);
  geocodeDirect(q, 6).then(function (places) {
    if (seq !== state.searchSeq) return;
    setSpin(false);
    var api = (Array.isArray(places) ? places : []).map(normalizeApiPlace);
    var ranked = rankPlaces(api, q);
    var merged = dedupePlaces(local.concat(ranked));
    if (merged.length) {
      hideMsg();
      clearSearchBox();
      setPlace(merged[0], { remember: true });
    } else {
      suggestItems = [];
      renderSuggest([]);
      openSuggest();
      showMsg("noPlace");
    }
  }).catch(function (err) {
    if (seq !== state.searchSeq) return;
    setSpin(false);
    if (err instanceof TypeError) { showMsg("errorNetwork", { retry: true }); return; }
    handleApiError(err);
  });
}

function localScore(p, q) {
  var qn = normFa(q);
  var n = normFa(p.disp || p.name);
  return (n === qn) ? 0 : (n.indexOf(qn) === 0) ? 1 : 2;
}

function onSearchInput() {
  var q = $("searchInput").value.trim();
  $("clearBtn").hidden = !$("searchInput").value;
  if (state.suggestTimer) { clearTimeout(state.suggestTimer); state.suggestTimer = null; }
  if (q.length < 2) { closeSuggest(); setSpin(false); return; }
  /* instant local matches while typing (zero latency) */
  var local = dedupePlaces(searchLocal(q)).slice(0, 8);
  if (local.length) {
    suggestItems = local;
    renderSuggest(suggestItems);
    openSuggest();
  }
  state.suggestTimer = setTimeout(function () { doSuggest(q); }, 400);
}

function onSearchKeydown(e) {
  var open = !$("suggest").hidden && suggestItems.length > 0;
  if (e.key === "ArrowDown" && open) {
    e.preventDefault();
    state.activeIdx = (state.activeIdx + 1) % suggestItems.length;
    highlightActive();
  } else if (e.key === "ArrowUp" && open) {
    e.preventDefault();
    state.activeIdx = state.activeIdx <= 0 ? suggestItems.length - 1 : state.activeIdx - 1;
    highlightActive();
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (open && state.activeIdx >= 0) {
      setPlace(suggestItems[state.activeIdx], { remember: true });
      $("searchInput").value = "";
      $("clearBtn").hidden = true;
      closeSuggest();
    } else {
      var q = $("searchInput").value.trim();
      if (!q) return;
      if (q.length < 2) { showMsg("minQuery"); return; }
      closeSuggest();
      doSearchPick(q);
    }
  } else if (e.key === "Escape") {
    closeSuggest();
  }
}

/* ------------------------- geolocation ------------------------- */
function locate() {
  if (!navigator.geolocation) { showMsg("errorGeolocation"); return; }
  var btn = $("locateBtn");
  btn.disabled = true;
  navigator.geolocation.getCurrentPosition(function (pos) {
    var lat = pos.coords.latitude, lon = pos.coords.longitude;
    var seq = ++state.searchSeq;
    geocodeReverse(lat, lon, 1).then(function (places) {
      if (seq !== state.searchSeq) return;
      btn.disabled = false;
      var list = Array.isArray(places) ? places : [];
      var p = list.length
        ? { name: list[0].name, state: list[0].state || "", country: list[0].country || "", lat: lat, lon: lon }
        : { name: "", state: "", country: "", lat: lat, lon: lon };   /* name filled after fetch */
      hideMsg();
      setPlace(p, { remember: !!p.name });
      $("searchInput").value = "";
      $("clearBtn").hidden = true;
    }).catch(function (err) {
      if (seq !== state.searchSeq) return;
      btn.disabled = false;
      if (err instanceof TypeError) { showMsg("errorNetwork", { retry: false }); return; }
      handleApiError(err);
    });
  }, function () {
    btn.disabled = false;
    showMsg("errorGeolocation");
  }, { timeout: 10000, maximumAge: 300000 });
}

/* ------------------------- language & theme ------------------------- */
function applyLang(lang) {
  state.lang = lang === "en" ? "en" : "fa";
  try { localStorage.setItem(LANG_STORAGE, state.lang); } catch (e) {}
  renderStatic();
  closeSuggest();
  renderRecent();
  cache.clear();                 /* cached names are language-specific */
  if (state.data) fetchWeather(state.place);   /* re-fetch localized data */
}
function toggleLang() { applyLang(state.lang === "fa" ? "en" : "fa"); }

function toggleTheme() {
  var el = document.documentElement;
  var next = el.dataset.theme === "dark" ? "light" : "dark";
  el.dataset.theme = next;
  try { localStorage.setItem("wp_theme", next); } catch (e) {}
}

/* ------------------------- API key modal ------------------------- */
function openKeyModal() {
  var k = "";
  try { k = localStorage.getItem(KEY_STORAGE) || ""; } catch (e) {}
  $("keyInput").value = k;
  $("keyModal").hidden = false;
  setTimeout(function () { $("keyInput").focus(); }, 50);
}
function closeKeyModal() { $("keyModal").hidden = true; }

function saveKey() {
  var k = $("keyInput").value.trim();
  if (k.length < 20) { showMsg("keyInvalid"); return; }
  try { localStorage.setItem(KEY_STORAGE, k); } catch (e) {}
  closeKeyModal();
  hideMsg();
  cache.clear();
  var retry = state.pendingAfterKey;
  state.pendingAfterKey = null;
  if (retry === "search") {
    var q = $("searchInput").value.trim();
    if (q.length >= 2) doSearchPick(q);
  } else {
    fetchWeather(state.place);
  }
}

/* ------------------------- events ------------------------- */
function bindEvents() {
  $("langBtn").addEventListener("click", toggleLang);
  $("themeBtn").addEventListener("click", toggleTheme);
  $("keyBtn").addEventListener("click", openKeyModal);

  $("searchForm").addEventListener("submit", function (e) { e.preventDefault(); });
  $("searchInput").addEventListener("input", onSearchInput);
  $("searchInput").addEventListener("keydown", onSearchKeydown);
  $("searchInput").addEventListener("focus", function () {
    if ($("searchInput").value.trim().length >= 2 && suggestItems.length) openSuggest();
  });
  $("clearBtn").addEventListener("click", function () {
    $("searchInput").value = "";
    $("clearBtn").hidden = true;
    closeSuggest();
    setSpin(false);
    $("searchInput").focus();
    renderRecent();
  });

  /* suggestion clicks (event delegation) */
  $("suggest").addEventListener("mousedown", function (e) {
    var btn = e.target.closest(".suggest-item");
    if (!btn) return;
    e.preventDefault(); /* keep input focus */
    var idx = parseInt(btn.getAttribute("data-idx"), 10);
    if (suggestItems[idx]) {
      setPlace(suggestItems[idx], { remember: true });
      $("searchInput").value = "";
      $("clearBtn").hidden = true;
      closeSuggest();
    }
  });

  /* recent chips (event delegation) */
  $("recentChips").addEventListener("click", function (e) {
    var del = e.target.closest("[data-del]");
    if (del) {
      state.recent.splice(parseInt(del.getAttribute("data-del"), 10), 1);
      lsSet(RECENT_STORAGE, state.recent);
      renderRecent();
      return;
    }
    var pick = e.target.closest("[data-idx]");
    if (pick) {
      var p = state.recent[parseInt(pick.getAttribute("data-idx"), 10)];
      if (p) { hideMsg(); setPlace(p, { remember: false }); }
    }
  });
  $("clearRecent").addEventListener("click", function () {
    state.recent = [];
    lsSet(RECENT_STORAGE, state.recent);
    renderRecent();
  });

  $("locateBtn").addEventListener("click", locate);
  $("msgRetry").addEventListener("click", function () { hideMsg(); fetchWeather(state.place); });
  $("msgClose").addEventListener("click", hideMsg);

  /* close dropdown on outside click */
  document.addEventListener("mousedown", function (e) {
    var area = document.querySelector(".search-area");
    if (area && !area.contains(e.target)) closeSuggest();
  });

  /* modal */
  $("keySave").addEventListener("click", saveKey);
  $("keyInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); saveKey(); }
    if (e.key === "Escape") closeKeyModal();
  });
  document.querySelectorAll("[data-close-modal]").forEach(function (el) {
    el.addEventListener("click", closeKeyModal);
  });

  /* live clock — refresh current card every 30 s */
  state.clockTimer = setInterval(function () { if (state.data) renderCurrent(); }, 30000);
}

/* ------------------------- init ------------------------- */
function init() {
  var storedLang = "fa";
  try { storedLang = localStorage.getItem(LANG_STORAGE) || "fa"; } catch (e) {}
  state.lang = storedLang === "en" ? "en" : "fa";

  state.recent = lsGet(RECENT_STORAGE, []);
  if (!Array.isArray(state.recent)) state.recent = [];

  var saved = lsGet(LAST_PLACE_STORAGE, null);
  if (saved && typeof saved.lat === "number" && typeof saved.lon === "number") state.place = saved;

  bindEvents();
  renderStatic();
  renderRecent();
  fetchWeather(state.place);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}


