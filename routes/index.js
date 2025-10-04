var express = require("express");
var axios = require("axios");
const passport = require("passport");
var router = express.Router();
var { ensureAuthenticated } = require("../services/auth");
const { token } = require("morgan");
const isIp = require("is-ip");
var redis = require("redis");
const { Address4, Address6 } = require("ip-address");
const { storeIP, inRange, isV4 } = require("range_check");
const { RateLimiterRedis } = require("rate-limiter-flexible");
const { v4: uuidv4 } = require("uuid");

// Rate limiting configuration
const rateLimiter = new RateLimiterRedis({
  storeClient: redis.createClient({
    host: "redisdb",
    port: 6379,
    password: process.env.REDIS_PASSWORD,
  }),
  keyPrefix: 'rl_',
  points: 10, // Number of requests
  duration: 60, // Per 60 seconds
});

// Genel arama rate limiting - sadece IP bazlı (misafir kullanıcılar için)
const ipBasedSearchLimiter = new RateLimiterRedis({
  storeClient: redis.createClient({
    host: "redisdb",
    port: 6379,
    password: process.env.REDIS_PASSWORD,
  }),
  keyPrefix: 'ip_search_',
  points: 10, // IP başına günde 10 arama
  duration: 60 * 60 * 24, // 24 saat
});
const remark = require("remarkable");
const fileUploadRoute = require('./fileUploadRoute');

var mdr = new remark.Remarkable('full', {
  html: true,
  breaks: true,
  typographer: true,
  quotes: '“”‘’',
});
require("dotenv").config();
const isJSON = (str) => {
  try {
      return (JSON.parse(str) && !!str);
  } catch (e) {
      return false;
  }
};
const getSiteLanguages = (headers) => new Promise((resolve, reject) => {
  axios
    .get("http://apiend:5001/v1/sitelanguage?perpage=1000&sortBy%5B%5D=order&sortDesc%5B%5D=false&isActive=true", {
      headers,
      timeout: 10000, // 10 saniye timeout
    })
    .then(({data}) => {
      resolve(data.data);
    })
    .catch((error) => {
      console.error('getSiteLanguages API error:', error.message);
      // API bağlantı hatası durumunda boş array döndür
      resolve([]);
    });
});
const getKuluckalar = (headers) => new Promise((resolve, reject) => {
  axios
    .get("http://apiend:5001/v1/kuluckadictionary?perpage=1000&sortBy%5B%5D=updatedAt&sortDesc%5B%5D=true&isActive=true", {
      headers,
      timeout: 10000, // 10 saniye timeout
    })
    .then(({data}) => {
      resolve(data);
    })
    .catch((error) => {
      console.error('getKuluckalar API error:', error.message);
      // API bağlantı hatası durumunda boş array döndür
      resolve([]);
    });
});
const getSetler = (headers,id) => new Promise((resolve, reject) => {
  axios
    .get("http://apiend:5001/v1/kuluckasection?perpage=1000&sortBy%5B%5D=order&sortDesc%5B%5D=false&isActive=true&searchField=dictId&searchTerm=" + id, {
      headers,
    })
    .then(({data}) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error);
    });
});
const getKuluckasozluk = (headers,id) => new Promise((resolve, reject) => {
  axios
    .get("http://apiend:5001/v1/kuluckadictionary?searchField=_id&searchTerm=" + id, {
      headers,
    })
    .then(({data}) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error);
    });
});
const getSet = (headers,id) => new Promise((resolve, reject) => {
  axios
    .get("http://apiend:5001/v1/kuluckasection?searchField=_id&searchTerm=" + id, {
      headers,
    })
    .then(({data}) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error);
    });
});
const getNextSet = (headers,id) => new Promise((resolve, reject) => {
  axios
    .get("http://apiend:5001/v1/kuluckasection/nextset/" + id, {
      headers,
    })
    .then(({data}) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error);
    });
});
const registerSet = (headers, setId, id, isModerater) => new Promise((resolve, reject) => {
  axios
    .post("http://apiend:5001/v1/kuluckasection/register/" + setId + "/" + id + "/" + isModerater, { }, {
      headers,
    })
    .then(({data}) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error);
    });
});

const setTeslimEt = (headers, sectionId) => new Promise((resolve, reject) => {
  axios
    .post("http://apiend:5001/v1/kuluckasection/teslimet/" + sectionId, { }, {
      headers,
    })
    .then(({data}) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error);
    });
});
const setKontrolEt = (headers, sectionId) => new Promise((resolve, reject) => {
  axios
    .post("http://apiend:5001/v1/kuluckasection/kontroledildi/" + sectionId, { }, {
      headers,
    })
    .then(({data}) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error);
    });
});

const getDictId = (dil) => {
  let id = '';
  switch (dil) {
    case 'tr':
      id = '615266bcbac4a96b1e465ef2';
      break;
    case 'en':
      id = '615266bcbac4a96b1e465efa';
      break;
    case 'os':
      id= '615266bcbac4a96b1e465efe';
      break;
    case 'fr':
      id = '615266bcbac4a96b1e465f08';
      break;
    case 'ar':
      id= '615266bcbac4a96b1e465f0c';
      break;
    default:
      id = '615266bcbac4a96b1e465ef2';
      break;
  }
return id;
};

const checkOrMakeArray = (val) => {
  if (Array.isArray(val)) {
    return val;
  } else {
    return [val];
  }
};
const makeArray = (val) => {
  if (val && Array.isArray(val)) {
    val = val.map((v)=> {
      let $v = v ;
      if (typeof $v === 'string' && $v.includes(',')) {
        $v = $v.split(',');
      }
      if (Array.isArray($v )) {
        return $v ;
      }
      return [$v];
    });
    console.log('map sonrası:', val)
  } else if (typeof val === 'string' && val.includes(',')) {
    val = val.split(',');
    val = [val];
    console.log('elifstring:', val)
  }
  console.log('Fİnal makeArray:', JSON.stringify(val));
  if (Array.isArray(val)) {
    return val;
  } else {
    return [val];
  }
};

const sozlukSort = (obj, bylang) => {
  return new Promise((resolve, reject) => {
    obj.sort(function (a, b) {
      if (a.lang === b.lang && a.lang === bylang) return 0;
      if (a.lang !== b.lang && a.lang === bylang) return -1;
      if (a.lang !== b.lang && b.lang === bylang) return 1;
      return 0;
    });
    resolve(obj);
  });
};

const getHeader = (req) => {
  return new Promise((resolve) => {
    let token = "";
    let headers = {
      "content-type": "application/json",
    };

    if (req.session && req.session.user) {
      const tokens = req.session.user.tokens;
      if (tokens && tokens.access && tokens.access.token) {
        token = `Bearer ${tokens.access.token}`;
      }
    }
    if (token) {
      headers = {
        "content-type": "application/json",
        Authorization: `${token}`,
        withCredentials: true,
      };
    }
    resolve(headers);
  });
};

const redisClient = redis.createClient({
  host: "redisdb",
  port: 6379,
  password: process.env.REDIS_PASSWORD,
  enable_offline_queue: false,
});

redisClient.on("error", (err) => {
  console.log(err);
});

const limiterInvitation = () =>
  new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: `invitation_email_limiter_by_ip`,
    points: 3,
    duration: 60 * 60 * 24, // 1 day limit
  });

const invitationLimiter = (req) => {
  return new Promise(async (resv, rej) => {
    let isLimited = false;
    try {
      const ipAddr = storeIP(req.clientIp);
      if (req.session && req.session.user) {
        usernameIPkey = getUsernameIPkey(req.session.user.user.email, ipAddr);
      } else {
        usernameIPkey = getUsernameIPkey(req.session.uniqueMacId, ipAddr);
      }
      const limiterInstance = limiterInvitation();
      const limitValue = await limiterInstance.get(usernameIPkey);
      if (limitValue != null && limitValue.remainingPoints === 0) {
        isLimited = true;
      }
      resv({
        limiterInstance,
        usernameIPkey,
        isLimited,
      });
    } catch (error) {
      rej(error);
    }
  });
};

const maxWrongAttemptsByIPperDay = 100;
const maxConsecutiveFailsByUsernameAndIP = 10;

const limiterSlowBruteByIP = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "login_fail_ip_per_day",
  points: maxWrongAttemptsByIPperDay,
  duration: 60 * 60 * 24,
  blockDuration: 60 * 60 * 24, // Block for 1 day, if 100 wrong attempts per day
});

const limiterConsecutiveFailsByUsernameAndIP = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "login_fail_consecutive_username_and_ip",
  points: maxConsecutiveFailsByUsernameAndIP,
  duration: 60 * 60 * 24 * 90, // Store number for 90 days since first fail
  blockDuration: 60 * 60, // Block for 1 hour
});
const getUsernameIPkey = (username, ip) => `${username}_${ip}`;

const limiterPacketByIP = (keyname, searchType, defaultpoint) => {
  return new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: `${keyname}_${searchType}_limiter_by_ip`,
      points: defaultpoint,
      duration: 60 * 60 * 24, // 1 day limit
    });
};


// IP bazlı arama rate limiting kontrolü (sadece misafir kullanıcılar için)
const checkIPSearchLimit = async (req) => {
  try {
    // Kayıtlı kullanıcılar için IP limiti yok, mevcut sistem kullanılsın
    if (req.session && req.session.user) {
      return { isLimited: false, remainingPoints: 999, userType: 'registered' };
    }
    
    const ipAddr = storeIP(req.clientIp);
    const key = `ip_${ipAddr}`;
    
    const limitValue = await ipBasedSearchLimiter.get(key);
    
    if (limitValue && limitValue.remainingPoints <= 0) {
      return {
        isLimited: true,
        remainingPoints: 0,
        resetTime: limitValue.msBeforeNext,
        userType: 'guest'
      };
    }
    
    return {
      isLimited: false,
      remainingPoints: limitValue ? limitValue.remainingPoints : 10,
      resetTime: limitValue ? limitValue.msBeforeNext : 0,
      userType: 'guest'
    };
  } catch (error) {
    console.error('IP rate limiting error:', error);
    return { isLimited: false, remainingPoints: 999, userType: 'unknown' };
  }
};

// IP bazlı arama rate limiting tüketimi
const consumeIPSearchLimit = async (req) => {
  try {
    // Kayıtlı kullanıcılar için IP limiti yok
    if (req.session && req.session.user) {
      return;
    }
    
    const ipAddr = storeIP(req.clientIp);
    const key = `ip_${ipAddr}`;
    
    await ipBasedSearchLimiter.consume(key);
  } catch (error) {
    console.error('IP rate limiting consume error:', error);
  }
};

const sorguRateLimiter = (req, searchType) => {
  // console.log('sorguRateLimiter:', searchType);
  return new Promise(async (resv, rej) => {
    try {
      let limit = null;
      let limiterInstance = null;
      let limitlessCount = null;
      let limitLater = null;
      let usernameIPkey = null;
      let isLimited = false;
      const paketler = await getOrSetPackets();
      const ipAddr = storeIP(req.clientIp);
      if (req.session && req.session.user) {
        usernameIPkey = getUsernameIPkey(req.session.user.user.email, ipAddr);
        const uyekul = paketler.find(
          (item) => item.role === req.session.user.user.packetId.role
        );
        limitlessCount = uyekul[searchType].limitlessCount;
        limitLater = uyekul[searchType].limitLater;
        limiterInstance = limiterPacketByIP(
          uyekul.role,
          searchType,
          limitlessCount
        );
      } else {
        usernameIPkey = getUsernameIPkey(req.session.uniqueMacId, ipAddr);
        const ziyaretci = paketler.find((item) => item.role === "ziyaretci");
        limitlessCount = ziyaretci[searchType].limitlessCount;
        limitLater = ziyaretci[searchType].limitLater;
        limiterInstance = limiterPacketByIP(
          ziyaretci.role,
          searchType,
          limitlessCount
        );
        // console.log(
        //   "dddd",
        //   ziyaretci.role,
        //   limitlessCount,
        //   req.session.uniqueMacId,
        //   usernameIPkey,
        //   limiterInstance
        // );
      }
      const limitValue = await limiterInstance.get(usernameIPkey);
      if (limitValue != null && limitValue.remainingPoints === 0) {
        limit = limitLater;
        isLimited = true;
      }
      resv({
        limiterInstance,
        limitlessCount,
        limitValue,
        limit,
        usernameIPkey,
        isLimited,
      });
    } catch (error) {
      rej(error);
    }
  });
};

const getTabLang = async (req, lang) => {
  const headers = await getHeader(req);
  const siteLanguages = await getSiteLanguages(headers);
  let languageFound = null;
  let language = 'Türkçe';
  if (siteLanguages.length > 0) {
    languageFound = siteLanguages.find((item) => item.value === lang);
    if (languageFound) {
      language = languageFound.title.tr;
    }
  }
  return language;
};

const getLang = async (req, lang, title = false) => {
  let sitelang = null;
  if (!req.cookies['lang']) {
    const splitedLanguage = req.language.split('-');
    sitelang = splitedLanguage[0];
  } else {
    sitelang = req.cookies['lang'];
  }
  let language = "";
  if (lang === 'tumu') {
    if (!sitelang || sitelang === 'tr') {
      if (title) {
        language = "Tüm";
      } else {
        language = "Tümü";
      }
    } else {
      if (title) {
        language = "All";
      } else {
        language = "All";
      }
    }
  } else {
    const headers = await getHeader(req);
    const siteLanguages = await getSiteLanguages(headers);

    let languageFound = null;
    if (siteLanguages.length > 0) {
      languageFound = siteLanguages.find((item) => item.value === lang);
    }
    if (!sitelang || sitelang === 'tr') {
      if (languageFound) {
        language = languageFound.title.tr;
      } else {
        if (title) {
          language = "Tüm";
        } else {
          language = "Tümü";
        }
      }
    } else {
      if (languageFound) {
        language = languageFound.title.en;
      } else {
        if (title) {
          language = "All";
        } else {
          language = "All";
        }
      }
    }
  }
  console.log('language:--->',language);
  return language;
};

const fixedEncodeURIComponent = (str) => {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
};

const getOrSetStats = (lang) => {
  return new Promise((resv, rej) => {
    redisClient.get("topstats", async (err, reply) => {
      if (err) rej(err);
      // console.log('REPLY:',reply);
      if (reply) {
        resv(JSON.parse(reply));
      } else {
        await axios
        .get(`http://apiend:5001/v1/getstats?lang=${lang}`)
        .then(({ data }) => {
          redisClient.setex("topstats", 3600, JSON.stringify(data));
          resv(data);
        })
          .catch((error) => {
            console.log("get topstats ERR:", JSON.stringify(error.message));
            rej(error);
          });
      }
    });
  });
};

const getOrSetPackets = () => {
  return new Promise((resv, rej) => {
    redisClient.get("paketler", async (err, reply) => {
      if (err) rej(err);
      // console.log('REPLY:',reply);
      if (reply) {
        resv(JSON.parse(reply));
      } else {
        await axios
          .get("http://apiend:5001/v1/packet?perpage=1000")
          .then(({ data }) => {
            redisClient.setex("paketler", 3600, JSON.stringify(data.data));
            resv(data.data);
          })
          .catch((error) => {
            console.log("get packets ERR:", JSON.stringify(error.message));
            rej(error);
          });
      }
    });
  });
};

const getOrSetKurumlar = () => {
  return new Promise((resv, rej) => {
    redisClient.get("kurumlar", async (err, reply) => {
      if (err) rej(err);
      if (reply) {
        resv(JSON.parse(reply));
      } else {
        await axios
          .get("http://apiend:5001/v1/kurumlar")
          .then(({ data }) => {
            redisClient.setex("kurumlar", 3600, JSON.stringify(data));
            resv(data);
          })
          .catch((error) => {
            console.log("get kurumlar ERR:", JSON.stringify(error.message));
            rej(error);
          });
      }
    });
  });
};
const getOrSetSozlukler = () => {
  return new Promise((resv, rej) => {
    redisClient.get("sozlukler", async (err, reply) => {
      if (err) rej(err);
      if (reply) {
        resv(JSON.parse(reply));
      } else {
        await axios
          .get("http://apiend:5001/v1/dictionary?perpage=1000&isActive=true")
          .then(({ data }) => {
            redisClient.setex("sozlukler", 3600, JSON.stringify(data.data));
            resv(data.data);
          })
          .catch((error) => {
            console.log("get sozlukler ERR:", JSON.stringify(error.message));
            rej(error);
          });
      }
    });
  });
};
const deleteRedisCacheByName = async (key) => {
  return new Promise((resv, rej) => {
    redisClient.del(key, (err, reply) => {
      console.log("delete redis cache:", key);
      resv(1);
    });
  })
};
const getStats = async (lang) => {
  return new Promise((resolve, reject) => {
    axios
    .get(`http://apiend:5001/v1/getstats?lang=${lang}`)
    .then(({ data }) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error.message);
    });
  })
};
const getCleanIpAddress = async (req) => {
  let ip = req.clientIp;
  const version = isIp.version(ip);
  if (version === 6) {
    const address = new Address6(ip);
    if (address.isTeredo()) {
      ip = address.inspectTeredo().server4;
    }
  }
  ip = storeIP(ip);
  return ip;
};
const setKurumsalAccess = async (req) => {
  const ip = await getCleanIpAddress(req);
  let abonekurum = null;
  console.log('---> ip: ' + ip);
  const kurumlar = await getOrSetKurumlar();
  const ipMatch = kurumlar.filter((kurum) => inRange(ip, kurum.cidr));
  console.log('ipMatch: ', JSON.stringify(ipMatch));
  if (ipMatch && ipMatch.length) {
    abonekurum = ipMatch[0];
  }
  if (abonekurum) {
    req.session.abonekurum = abonekurum;
    req.session.save();
  }
  console.log('---------> abonekurum: ', JSON.stringify(abonekurum));
  return abonekurum;
};

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.locals.meta = {
    menuId: "home",
    title: "Kelime.com",
    duyuruGosterildi: req.cookies.duyuruGosterildi,
    siteLang: req.cookies.lang,
  };
  // console.log("req.info:");
  if (!req.session.filterOrders) {
    req.session.filterOrders = "tr,en,os,ar,fr,de,ru,fa";
    req.session.save();
  }

  if (!req.session.uniqueMacId) {
    req.session.uniqueMacId = uuidv4();
    req.session.save();
  }
  const ip = await getCleanIpAddress(req);
  // let stats = {};
  // const {latest, most} = await getStats('tumu');
  // stats.latest = latest;
  // stats.most = most;
  const messages = await req.consumeFlash("info");
  // const xFF = req.headers['x-forwarded-for']
  // const ip = xFF ? xFF.split(',')[0] : req.socket.remoteAddress;

  getOrSetPackets();
  getOrSetSozlukler();
  let user = null;
  let abonekurum = null;
  abonekurum = await setKurumsalAccess(req);

  if (!req.cookies['duyuruGosterildi']) {
    res.cookie("duyuruGosterildi ", true, { maxAge: 6000000, httpOnly: false });
  }
  if (!req.cookies['lang']) {
    const splitedLanguage = req.language.split('-');
    res.cookie("lang", splitedLanguage[0], { maxAge: 6000000, httpOnly: false });
  }

  if (req.session && req.session.user && req.session.user.user) {
    user = req.session.user.user;
  }

  res.render("index", { page: "Home", title: "Kelime.com", user, ip, messages, abonekurum });
});


router.get("/getstats", async (req, res) => {
  const lang = req.query.lang;
  let stats = {};
  const {latest, most} = await getOrSetStats(lang);
  stats.latest = latest;
  stats.most = most;
  res.send(stats);
});

// Arama limiti bilgisi endpoint'i
router.get("/search-limit-info", async (req, res) => {
  try {
    const ipLimitCheck = await checkIPSearchLimit(req);
    res.json({
      isLimited: ipLimitCheck.isLimited,
      remainingPoints: ipLimitCheck.remainingPoints,
      resetTime: ipLimitCheck.resetTime,
      userType: ipLimitCheck.userType,
      maxPoints: ipLimitCheck.userType === 'registered' ? 999 : 10
    });
  } catch (error) {
    console.error('Search limit info error:', error);
    res.status(500).json({ error: 'Limit bilgisi alınamadı' });
  }
});

router.get("/switch/:lang", function (req, res, next) {
  var lang = req.params.lang;
  res.cookie("lang", lang, { maxAge: 900000, httpOnly: false });
  return res.redirect("/");
});

router.get("/Ara", function (req, res, next) {
  return res.redirect("/");
});

router.get("/login", function (req, res, next) {
  res.locals.meta = {
    menuId: "login",
    siteLang: req.cookies.lang,
  };
  if (req.session && req.session.user) {
    return res.redirect("/");
  } else {
    res.render("login", { page: "Login Sayfası", layout: "layout-nofooter" });
  }
});

router.post("/login", async function (req, res, next) {
  const ipAddr = req.clientIp;
  const usernameIPkey = getUsernameIPkey(req.body.email, ipAddr);

  const [resUsernameAndIP, resSlowByIP] = await Promise.all([
    limiterConsecutiveFailsByUsernameAndIP.get(usernameIPkey),
    limiterSlowBruteByIP.get(ipAddr),
  ]);

  let retrySecs = 0;

  // Check if IP or Username + IP is already blocked
  if (
    resSlowByIP !== null &&
    resSlowByIP.consumedPoints > maxWrongAttemptsByIPperDay
  ) {
    retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1;
  } else if (
    resUsernameAndIP !== null &&
    resUsernameAndIP.consumedPoints > maxConsecutiveFailsByUsernameAndIP
  ) {
    retrySecs = Math.round(resUsernameAndIP.msBeforeNext / 1000) || 1;
  }
  if (retrySecs > 0) {
    res.set("Retry-After", String(retrySecs));
    res
      .status(429)
      .send("Çok fazla istekte bulundunuz.Daha sonra tekrar deneyiniz.");
  } else {
    await axios
      .post("http://apiend:5001/v1/auth/login", req.body)
      .then(async ({ data }) => {
        if (resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > 0) {
          // Reset on successful authorisation
          await limiterConsecutiveFailsByUsernameAndIP.delete(usernameIPkey);
        }
        req.session.user = {};
        req.session.user = data;
        req.session.save();
        res.status(200).send("success");
      })
      .catch(async (error) => {
        try {
          const promises = [limiterSlowBruteByIP.consume(ipAddr)];
          // Count failed attempts by Username + IP only for registered users
          promises.push(
            limiterConsecutiveFailsByUsernameAndIP.consume(usernameIPkey)
          );
          await Promise.all(promises);
          res.status(400).end(error.response.message);
        } catch (rlRejected) {
          if (rlRejected instanceof Error) {
            throw rlRejected;
          } else {
            res.set(
              "Retry-After",
              String(Math.round(rlRejected.msBeforeNext / 1000)) || 1
            );
            res
              .status(429)
              .send(
                "Çok fazla istekte bulundunuz.Daha sonra tekrar deneyiniz."
              );
          }
        }
      });
  }
});

router.post("/logout", async (req, res, next) => {
  if (req.session && req.session.user) {
    const tokens = req.session.user?.tokens;
    const refreshToken = tokens?.refresh?.token;
    await axios
      .post(
        "http://apiend:5001/v1/auth/logout",
        {
          refreshToken,
        }
      )
      .then(({ data }) => {
        // console.log(data);
        req.session.destroy();
        res.status(200).send("success");
      })
      .catch((error) => {
        console.log("--------", error.message);
        res.status(401).send(error.message);
      });
  }
});

router.get("/register", async function (req, res, next) {
  res.locals.meta = {
    menuId: "register",
    siteLang: req.cookies.lang,
  };
  if (req.session && req.session.user) {
    return res.redirect("/");
  } else {
    // URL'den parametreleri al
    const inst_id = req.query.inst_id;
    const username = req.query.username;
    
    // Kurum bilgisini çek
    let institutionName = '';
    if (inst_id) {
      try {
        const headers = await getHeader(req);
        const response = await axios.get(`http://apiend:5001/v1/institutions/${inst_id}`, { headers });
        institutionName = response.data.name;
      } catch (error) {
        console.error('Kurum bilgisi alınamadı:', error);
      }
    }

    res.render("register", {
      page: "Register Sayfası",
      layout: "layout-nofooter",
      inst_id: inst_id,
      username: username,
      institutionName: institutionName
    });
  }
});

router.post("/register", async function (req, res, next) {
  const clientIp = req.clientIp;
  const payload = {
    ...req.body,
    clientIp: clientIp
  };
  
  await axios
    .post("http://apiend:5001/v1/auth/register", payload)
    .then(({ data }) => {
      req.session.user = {};
      req.session.user = data;
      req.session.save();
      res.status(200).send("success");
    })
    .catch((error) => {
      res.status(400).send(error.response.data);
    });
});
router.use('/file-upload', fileUploadRoute);


router.get("/forgot-password", function (req, res, next) {
  res.locals.meta = {
    menuId: "forgot",
    siteLang: req.cookies.lang,
  };
  if (req.session && req.session.user) {
    return res.redirect("/");
  } else {
    res.render("forgotpassword", {
      page: "Şifremi Unuttum",
      layout: "layout-nofooter",
    });
  }
});

router.post("/forgot-password", async function (req, res, next) {
  await axios
    .post("http://apiend:5001/v1/auth/forgot-password", req.body)
    .then(() => {
      res
        .status(200)
        .send(
          "Eposta adresinize şifre yenileme ile ilgili talimatlar gönderilmiştir."
        );
    })
    .catch((error) => {
      res.status(400).send(error.response.data);
    });
});

router.get("/reset-password", function (req, res, next) {
  res.locals.meta = {
    menuId: "forgot",
    siteLang: req.cookies.lang,
  };
  const token = req.query.token;
  if (req.session && req.session.user) {
    return res.redirect("/");
  } else {
    res.render("resetpassword", {
      page: "Şifre Yenileme",
      layout: "layout-nofooter",
      token: token,
    });
  }
});

router.post("/reset-password", async function (req, res, next) {
  await axios
    .post("http://apiend:5001/v1/auth/reset-password", req.body)
    .then(() => {
      res.status(200).send("Şifreniz başarılı bir şekilde yenilenmiştir.");
    })
    .catch((error) => {
      res.status(400).send(error.response.data);
    });
});

router.post("/edit-password", async function (req, res, next) {
  const headers = await getHeader(req);
  const tokens = req.session.user.tokens;
  const payload = { newpassword: req.body.newpassword, newpassword2: req.body.newpassword2, oldpassword: req.body.oldpassword, token: tokens.refresh.token};
  await axios
    .post("http://apiend:5001/v1/auth/edit-password", payload,
    {
      headers,
    }
    )
    .then(() => {
      res.status(200).send("Şifreniz başarılı bir şekilde yenilenmiştir.");
    })
    .catch((error) => {
      res.status(400).send(error.response.data);
    });
});

router.post("/setfilterOrders", async (req, res, next) => {
  const filterOrders = req.body.filterOrders;
  try {
    req.session.filterOrders = filterOrders;
    req.session.save();
    res.status(200).send("success");
  } catch (error) {
    res.status(401).send(error.response.data);
  }
});

router.get("/cozumleyici", async function (req, res, next) {
  res.locals.meta = {
    menuId: "cozumleyici",
    title: "Kelime.com",
    siteLang: req.cookies.lang,
  };
  // let stats = {};
  // const {latest, most} = await getStats('tumu');
  // stats.latest = latest;
  // stats.most = most;
  let user = null;
  if (req.session && req.session.user && req.session.user.user) {
    user = req.session.user.user;
  }
  let abonekurum = null;
  abonekurum = await setKurumsalAccess(req);

  res.render("cozumleyici", { page: "Home", title: "HELDLF", user, abonekurum });
});

router.get(
  "/kelime/:madde/:id/:dil?/:tip?/:sozluk?",
  async (req, res, next) => {
    let kelime = null;
    let metadata = {};
    const madde = decodeURIComponent(req.params.madde);
    const maddeId = req.params.id;
    const dil = req.params.dil;
    const tip = req.params.tip;
    const sozluk = req.params.sozluk;
    if (madde === 'Kelime' || madde === 'Ara') {
      return res.redirect('/');
    }
    let { isLimited } = await sorguRateLimiter(req, "maddebasi");

    let abonekurum = null;
    abonekurum = await setKurumsalAccess(req);
    if (abonekurum) {
      isLimited = false;
    }

    res.locals.meta = {
      menuId: "kelime",
      sonucPath: "kelime",
      sonucKelime: madde,
      sonucKelimeId: maddeId,
      sonucFiltreDil: dil ? dil : "tumu",
      sonucTitleDil: await getLang(req, dil ? dil : "tumu", true),
      sonucFiltreTip: tip ? tip : "tumu",
      sonucFiltreSozluk: sozluk ? sozluk : "tumu",
      isLimited,
      siteLang: req.cookies.lang,
      showTopSearchBar: true,
    };
    const clientIp = storeIP(req.clientIp);
    let sozluklerRedis = await getOrSetSozlukler();
    sozluklerRedis = await sozlukSort(sozluklerRedis, dil);
    const headers = await getHeader(req);
    let user = null;
    if (req.session && req.session.user) {
      user = req.session.user.user;
    }

    await axios
      .get(
        `http://apiend:5001/v1/generalsearch/kelime/${encodeURIComponent(madde)}/${maddeId}/${dil}/${tip}/${sozluk}/${clientIp}`,
        {
          headers,
        }
      )
      .then(({ data }) => {
        metadata = data.meta;
        if (data.data && data.data.length > 0) {
          const item = data.data[0];
          if (item) {
            const bulunansozlukler = sozluklerRedis.filter((sozl) =>
              item.sozlukler.includes(sozl.id)
            );
            // console.log(
            //   "DATA SONUC__bulunansozlukler:",
            //   JSON.stringify(bulunansozlukler)
            // );
            let isLiked = false;
            if (item.whichDict.likes && item.whichDict.likes.length > 0) {
              isLiked = item.whichDict.likes.map(l => l.userId)
              isLiked = user && user.id && isLiked.includes(user.id) ? true: false;
            }
            let isFavored = false;
            if (item.whichDict.favorites && item.whichDict.favorites.length > 0) {
              isFavored = item.whichDict.favorites.map(l => l.userId);
              isFavored = user && user.id && isFavored.includes(user.id) ? true: false;
            }
            kelime = {
              id: item._id,
              madde: item.madde,
              anlam: mdr.render(item.whichDict.anlam),
              anlamId: item.whichDict.id,
              sozluk: item.dict.name,
              isFavored: isFavored,
              isLiked: isLiked,
              isLimited: false,
              sozlukler: bulunansozlukler,
              dictId: item.dict._id,
              dict: item.dict,
              whichDict: item.whichDict,
              code: item.dict.code.toLowerCase(),
              karsiMadde:
                item.whichDict.karsi && item.whichDict.karsi.length ? item.whichDict.karsi : [],
              lang: item.dict.lang,
              dil: item.dict.lang,
            };
          }
        }
      })
      .catch((error) => {
        metadata = {};
        console.log(error.message);
      });
    let kelimekendiharic = [];

    await axios
      .get(
        `http://apiend:5001/v1/generalsearch/kelimekendiharic/${encodeURIComponent(madde)}/${maddeId}/${dil}/${tip}/${sozluk}`,
        {
          headers,
        }
      )
      .then(({ data }) => {
        console.log('kelimekendiharic:', JSON.stringify(data));
        if (data.data && data.data.length > 0) {
          data.data.forEach((item) => {
            // if (sozluk === item.dict.code.toLowerCase()) {
              kelimekendiharic.push({
                id: item._id,
                madde: item.madde,
                anlam: mdr.render(item.whichDict.anlam),
                isLimited: false,
                anlamId: item.whichDict.id,
                whichDict: item.whichDict,
                dictId: item.dict._id,
                karsiMadde: item.whichDict.karsi && item.whichDict.karsi.length ? item.whichDict.karsi : [],
                sozluk: item.dict.name,
                code: item.dict.code.toLowerCase(),
                lang: item.dict.lang,
                dil: item.dict.lang,
              });
            // }
          });
        }
      })
      .catch((error) => {
        metadata = {};
        // console.log("ERRRR:KENDIHARICSONUC_________", error);
        console.log(error)
      });

    res.render("kelime", {
      page: "Kelime Listeleme",
      user,
      kelime,
      abonekurum,
      metadata,
      sozlukler: sozluklerRedis,
      kelimekendiharic,
    });
  }
);

router.get("/api/arama", async (req, res, next) => {

  const {kelime, dil, tip, sozluk, limit } = req.query;

  const searchFilter = {};

  if (dil && dil != "tumu") {
    searchFilter.dil = dil;
  }

  if (tip && tip != "tumu") {
    searchFilter.tip = tip;
  }

  if (sozluk && sozluk != "tumu") {
    searchFilter.sozluk = sozluk;
  }

  const payload = {
    searchTerm: decodeURIComponent(kelime),
    searchType: "exact",
    searchFilter,
  };

  if (limit && limit != "undefimed") {
    payload.limit = limit;
  }

  await axios
    .post(`http://apiend:5001/v1/generalsearch`, payload)
    .then(({ data }) => {
      if (data) {
          res.status(200).send(data);
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(404).send({message:error.message});
    });
});

router.get("/arama/:kelime/:dil?/:tip?/:sozluk?", async (req, res, next) => {
  let kelime = [];
  let metadata = "";
  const searchFilter = {};

  if (req.params.dil && req.params.dil != "tumu") {
    searchFilter.dil = req.params.dil;
  }

  if (req.params.tip && req.params.tip != "tumu") {
    searchFilter.tip = req.params.tip;
  }

  if (req.params.sozluk && req.params.sozluk != "tumu") {
    searchFilter.sozluk = req.params.sozluk;
  }

  if (req.session.filterOrders) {
    searchFilter.filterOrders = req.session.filterOrders;
  }
  const aranankelime = req.params.kelime;
  const payload = {
    searchTerm: decodeURIComponent(aranankelime),
    searchType: "exact",
    searchFilter,
  };
  let {
    limiterInstance,
    limitlessCount,
    limitValue,
    limit,
    usernameIPkey,
    isLimited,
  } = await sorguRateLimiter(req, "maddebasi");

  let abonekurum = null;
  abonekurum = await setKurumsalAccess(req);
  if (abonekurum) {
    isLimited = false;
  }

  res.locals.meta = {
    menuId: "arama",
    sonucPath: "arama",
    sonucKelime: decodeURIComponent(aranankelime),
    sonucFiltreDil: searchFilter.dil ? searchFilter.dil : "tumu",
    sonucFiltreTip: searchFilter.tip ? searchFilter.tip : "tumu",
    sonucTitleDil: await getLang(req, searchFilter.dil ? searchFilter.dil : "tumu", true),
    sonucFiltreSozluk: searchFilter.sozluk ? searchFilter.sozluk : "tumu",
    showTopSearchBar: true,
    siteLang: req.cookies.lang,
    isLimited,
  };
  let misafir = 'Misafir kullanıcılar için sunduğumuz günlük 3 adet arama limitini aştığınız için bu maddenin detayını maalesef görüntüleyememektesiniz. Bu detayı görüntüleyebilmek için <a href="/register">bireysel</a> veya <a href="/abonelerimiz">kurumsal</a> abone olmanız gerekmektedir.';

  if (req.cookies.lang === "en") {
    misafir = 'Unfortunately, you cannot view the details of this entry because you have exceeded the daily limit of 3 searches for guests. To see the details you have to be an <a href="/register">individual</a> or <a href="/abonelerimiz">corporate</a> subscriber.';
  }
  const headers = await getHeader(req);
  // console.log('kelime', kelime);
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  // log("searchFilter:", searchFilter);
  await axios
    .post(`http://apiend:5001/v1/generalsearch`, payload, {
      headers,
    })
    .then(({ data }) => {
      if (abonekurum == null &&
        limitlessCount > 0 &&
        (limitValue == null || (limitValue && limitValue.remainingPoints > 0))
      ) {
        limiterInstance
          .consume(usernameIPkey)
          .catch((error) => console.log(error.message));
      }
      metadata = data.meta;
      // console.log(aranankelime, " nin arama sonucu:", data);
      if (data.data) {
        data.data.forEach((item, i) => {
          // log('SONUC_________:', item);
          let isLiked = false;
          if (item.whichDict.likes && item.whichDict.likes.length > 0) {
            isLiked = item.whichDict.likes.map(l => l.userId)
            isLiked = user && user.id && isLiked.includes(user.id) ? true: false;
          }
          let isFavored = false;
          if (item.whichDict.favorites && item.whichDict.favorites.length > 0) {
            isFavored = item.whichDict.favorites.map(l => l.userId);
            isFavored = user && user.id && isFavored.includes(user.id) ? true: false;
          }
          const anlam = mdr.render(item.whichDict.anlam)

          kelime.push({
            id: item._id,
            madde: item.madde,
            anlam: (isLimited && i > 0) ? misafir : anlam,
            isLimited: (isLimited && i > 0 ) ? true: false,
            whichDict: item.whichDict,
            anlamId: item.whichDict.id,
            isFavored: isFavored,
            isLiked: isLiked,
            dictId: item.dict._id,
            karsiMadde:
              item.whichDict.karsi && item.whichDict.karsi.length ? item.whichDict.karsi : [],
            sozluk: item.dict.name,
            code: item.dict.code.toLowerCase(),
            lang: item.dict.lang,
            dil: item.dict.lang,
          });
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
    });


  res.render("arama", {
    page: "Kelime Arama Listeleme",
    user,
    kelime,
    abonekurum,
    metadata,
  });
});

router.post("/ajaxCall", async (req, res, next) => {
  if (isJSON(req.body.json)) {
  const { limit, page, searchFilter, searchTerm, searchType, aramaFormat } = JSON.parse(req.body.json);
  const clientIp = storeIP(req.clientIp);
  const headers = await getHeader(req);
  console.log('ARA ILKSORGU:',searchTerm);
  const searchTermE = decodeURIComponent(searchTerm);
  console.log('ARA ILKSORGU:searchTermE',searchTermE);

  // IP bazlı arama rate limiting kontrolü (sadece misafir kullanıcılar için)
  const ipLimitCheck = await checkIPSearchLimit(req);
  
  // Eğer IP limiti aşılmışsa ve bu bir arama isteği ise
  if (ipLimitCheck.isLimited && (searchType === "ilksorgu" || searchType === "advanced")) {
    const errorMessage = 'Bu IP adresinden günlük 10 arama limitini aştınız. Daha fazla arama yapmak için lütfen kayıt olun.';
    
    return res.status(429).json({
      error: errorMessage,
      remainingPoints: ipLimitCheck.remainingPoints,
      resetTime: ipLimitCheck.resetTime,
      userType: ipLimitCheck.userType
    });
  }

  const payload = {
    limit,
    page,
    searchFilter,
    searchTerm: searchTermE,
    searchType,
    clientIp,
  };

  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }

  if ( page === 1 && (searchType === "exactwithdash" || searchType === "maddeanlam")) {
    let whichType = null;
    if (searchType === "exactwithdash") {
      whichType = "cekim";
    }

    if (searchType === "maddeanlam") {
      whichType = "anlam";
    }
    let {
      limiterInstance,
      limitlessCount,
      limitValue,
      limit,
      usernameIPkey,
      isLimited,
    } = await sorguRateLimiter(req, whichType);
    // console.log(aramaFormat, isLimited, limit, usernameIPkey, limitValue, limitlessCount, whichType, searchType);
    let abonekurum = null;
    if (req.session && req.session.abonekurum) {
      abonekurum = req.session.abonekurum;
    }
    if (abonekurum) {
      isLimited = false;
    }
    let misafir = 'Misafir kullanıcılar için sunduğumuz günlük 3 adet arama limitini aştığınız için bu maddenin detayını maalesef görüntüleyememektesiniz. Bu detayı görüntüleyebilmek için <a href="/register">bireysel</a> veya <a href="/abonelerimiz">kurumsal</a> abone olmanız gerekmektedir.';

    if (req.cookies.lang === "en") {
      misafir = 'Unfortunately, you cannot view the details of this entry because you have exceeded the daily limit of 3 searches for guests. To see the details you have to be an <a href="/register">individual</a> or <a href="/abonelerimiz">corporate</a> subscriber.';
    }
    if (aramaFormat && aramaFormat === "titleonly") {
      payload.limit = 40;
    }

    await axios.post(`http://apiend:5001/v1/generalsearch`, payload, {
        headers:headers,
        timeout: 30000, // 30 saniye timeout
      })
      .then(({ data }) => {
        // IP bazlı arama rate limiting tüketimi
        if (searchType === "ilksorgu" || searchType === "advanced") {
          consumeIPSearchLimit(req).catch(error => console.log('IP rate limiting consume error:', error));
        }
        
        if (aramaFormat === undefined && abonekurum == null) {
          if ( limitlessCount > 0 && (limitValue === null || (limitValue && limitValue.remainingPoints > 0))
          ) {
            limiterInstance
              .consume(usernameIPkey)
              .catch((error) => console.log(error.message));
          }
        }

          data.data.map((item, index) => {
            let isFavored = false;
            if (item.whichDict.favorites && item.whichDict.favorites.length > 0) {
              isFavored = item.whichDict.favorites.map(l => l.userId);
              isFavored = user && user.id && isFavored.includes(user.id) ? true: false;
            }
            let isLiked = false;
            if (item.whichDict.likes && item.whichDict.likes.length > 0) {
              isLiked = item.whichDict.likes.map(l => l.userId)
              isLiked = user && user.id && isLiked.includes(user.id) ? true: false;
            }
            const $item = item;
            $item.anlamId = item.whichDict.id;
            $item.isFavored = isFavored,
            $item.isLiked = isLiked,
            $item.isLimited = false;
            $item.whichDict.anlam = mdr.render(item.whichDict.anlam)
            if (index > 0 && isLimited) {
              $item.whichDict.anlam = misafir;
              $item.isLimited = true;
            }
            return $item;
          })

        // const response = await limitedData(data);
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json(error.message);
      });
  } else {
    // console.log("req:", req.body);
    await axios
      .post(`http://apiend:5001/v1/generalsearch`, payload, {
        headers,
      })
      .then(({ data }) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        // console.log("Error:", error);
        res.status(500).json(error.message);
      });
  }
} else {
  res.status(500).json({ message: 'Geçersiz arama'});
}
});

router.post("/getLikes", async (req, res, next) => {
  if (isJSON(req.body.json)) {
  const { limit, page } = JSON.parse(req.body.json);
  const headers = await getHeader(req);

  const payload = {
    limit,
    page,
  };

  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }

    // console.log("req:", req.body);
    await axios
      .post(`http://apiend:5001/v1/profile/getLikes`, payload, {
        headers,
      })
      .then(({ data }) => {
        console.log(JSON.stringify(data, null, 2));
        data.data.map((item, index) => {
          let isFavored = false;
          if (item.whichDict.favorites && item.whichDict.favorites.length > 0) {
            isFavored = item.whichDict.favorites.map(l => l.userId);
            isFavored = user && user.id && isFavored.includes(user.id) ? true: false;
          }
          let isLiked = false;
          if (item.whichDict.likes && item.whichDict.likes.length > 0) {
            isLiked = item.whichDict.likes.map(l => l.userId)
            isLiked = user && user.id && isLiked.includes(user.id) ? true: false;
          }
          const $item = item;
          $item.anlamId = item.whichDict.id;
          $item.isFavored = isFavored,
          $item.isLiked = isLiked,
          $item.isLimited = false;
          return $item;
        })

        res.status(200).json(data);
      })
      .catch((error) => {
        // console.log("Error:", error);
        res.status(500).json(error.message);
      });

} else {
  res.status(500).json({ message: 'Geçersiz arama'});
}
});
router.post("/getFavorites", async (req, res, next) => {
  if (isJSON(req.body.json)) {
  const { limit, page } = JSON.parse(req.body.json);
  const headers = await getHeader(req);

  const payload = {
    limit,
    page,
  };

  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }

    // console.log("req:", req.body);
    await axios
      .post(`http://apiend:5001/v1/profile/getFavorites`, payload, {
        headers,
      })
      .then(({ data }) => {
        console.log(JSON.stringify(data, null, 2));
        data.data.map((item, index) => {
          let isFavored = false;
          if (item.whichDict.favorites && item.whichDict.favorites.length > 0) {
            isFavored = item.whichDict.favorites.map(l => l.userId);
            isFavored = user && user.id && isFavored.includes(user.id) ? true: false;
          }
          let isLiked = false;
          if (item.whichDict.likes && item.whichDict.likes.length > 0) {
            isLiked = item.whichDict.likes.map(l => l.userId)
            isLiked = user && user.id && isLiked.includes(user.id) ? true: false;
          }
          const $item = item;
          $item.anlamId = item.whichDict.id;
          $item.isFavored = isFavored,
          $item.isLiked = isLiked,
          $item.isLimited = false;
          return $item;
        })

        res.status(200).json(data);
      })
      .catch((error) => {
        // console.log("Error:", error);
        res.status(500).json(error.message);
      });

} else {
  res.status(500).json({ message: 'Geçersiz arama'});
}
});
router.get("/Kelime", async (req, res) => {
    res.redirect('/');
});
router.get("/Ara", async (req, res) => {
  res.redirect('/');
});
router.get("/Kelime/:any", async (req, res) => {
  res.redirect('/');
});
router.get("/Ara/:any", async (req, res) => {
res.redirect('/');
});
router.get("/randomMadde", async (req, res, next) => {
  await axios
    .get(`http://apiend:5001/v1/generalsearch/randomone`)
    .then(({ data }) => {
      data.data.map((item) => item.whichDict.anlam = mdr.render(item.whichDict.anlam));
      res.status(200).json(data);
    })
    .catch((error) => {
      // console.log(error.message);
      res.status(500).json(error.message);
    });
});

router.get("/detay/:id/:dictId?", async (req, res, next) => {
  const maddeid = req.params.id;
  const dictId = req.params.dictId;
  let apiurl = `http://apiend:5001/v1/generalsearch/kelimedetay/${maddeid}`;
  if (dictId) {
    apiurl = `http://apiend:5001/v1/generalsearch/kelimedetay/${maddeid}/${dictId}`;
  }
  const headers = await getHeader(req);
  await axios
    .get(apiurl, {
      headers,
    })
    .then(({ data }) => {
      // console.log("kelimedetay DATAAA:", data);
      res.status(200).json(data);
    })
    .catch((error) => {
      // console.log(error.message);
      res.status(500).json(error.message);
    });
  res.status(200);
});

router.get("/gundem", async function (req, res, next) {
  res.locals.meta = {
    menuId: "gundem",
    siteLang: req.cookies.lang,
  };
  let user = null;
  let gundems = [];
  let getMaddeBugun = [];
  let getMaddeDun = [];

  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  await axios
  .get(`http://apiend:5001/v1/gundem/getall`)
  .then(({ data }) => {
    console.log(data);
    data.data.map((item) => item.whichDict.map((b) => b.anlam = mdr.render(b.anlam)));
    gundems = data;
  })
  .catch((error) => {
    console.log(error.message);
  });
  await axios
  .get(`http://apiend:5001/v1/gundem/getMaddeBugun`)
  .then(({ data }) => {
    console.log(data);
    getMaddeBugun = data;
  })
  .catch((error) => {
    console.log(error.message);
  });
  await axios
  .get(`http://apiend:5001/v1/gundem/getMaddeDun`)
  .then(({ data }) => {
    console.log(data);
    getMaddeDun = data;
  })
  .catch((error) => {
    console.log(error.message);
  });
  res.render("gundem", { page: "Gundem Sayfası", user, gundems, getMaddeDun, getMaddeBugun });
});

router.get("/projeler", function (req, res, next) {
  res.locals.meta = {
    menuId: "projeler",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  res.render("projeler", { page: "Projeler Sayfası", user });
});

router.get("/projeler/eosmanlica", function (req, res, next) {
  res.locals.meta = {
    menuId: "eosmanlica",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  res.render("eosmanlica", { page: "Eosmanlica Sayfası", user });
});

router.get("/projeler/dictatemy", function (req, res, next) {
  res.locals.meta = {
    menuId: "dictatemy",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  res.render("dictatemy", { page: "Dictatemy Sayfası", user });
});
router.get("/projeler/wikilala", function (req, res, next) {
  res.locals.meta = {
    menuId: "wikilala",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  res.render("wikilala", { page: "Wikilala Sayfası", user });
});
router.get("/projeler/oklavye", function (req, res, next) {
  res.locals.meta = {
    menuId: "oklavye",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  res.render("oklavye", { page: "Oklavye Sayfası", user });
});
router.get("/sartlar", function (req, res, next) {
  res.locals.meta = {
    menuId: "sartlar",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  res.render("sartlar", { page: "Şartlar Sayfası", user });
});
router.get("/sartlar/kullanimsartlar", function (req, res, next) {
  res.locals.meta = {
    menuId: "kullanimsartlar",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  res.render("kullanimsartlar", { page: "Kullanım Şartları Sayfası", user });
});
router.get("/sartlar/gizlilik", function (req, res, next) {
  res.locals.meta = {
    menuId: "gizlilik",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  res.render("gizlilik", { page: "Gizlilik Sayfası", user });
});
router.get("/sartlar/cerez", function (req, res, next) {
  res.locals.meta = {
    menuId: "cerez",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  res.render("cerez", { page: "Çerez Politikası Sayfası", user });
});
router.get("/mobil", function (req, res, next) {
  res.locals.meta = {
    menuId: "mobil",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  res.render("mobil", { page: "Mobil Sayfası", user });
});

router.get("/hakkimizda", function (req, res, next) {
  res.locals.meta = {
    menuId: "hakkimizda",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  res.render("hakkimizda", { page: "Hakkimizda Sayfası", user });
});

router.get("/abonelerimiz", async function (req, res, next) {
  res.locals.meta = {
    menuId: "abonelerimiz",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  const kurumlar = await getOrSetKurumlar();

  res.render("abonelerimiz", { page: "Abonelerimiz Sayfası", user, kurumlar });
});
router.get("/projetarihcesi", function (req, res, next) {
  res.locals.meta = {
    menuId: "projetarihcesi",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  res.render("projetarihcesi", { page: "Proje Tarihcesi Sayfası", user });
});
router.get("/iletisim", function (req, res, next) {
  res.locals.meta = {
    menuId: "iletisim",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  res.render("iletisim", { page: "İletisim Sayfası", user });
});
router.post("/iletisim", async function (req, res, next) {
  const { adisoyadi, email, baslik, konu, mesaj } = req.body;
  const payload = { adisoyadi, email, baslik, konu, mesaj };
  const headers = await getHeader(req);
  await axios
    .post("http://apiend:5001/v1/iletisim", payload, {
      headers,
    })
    .then(() => {
      res.status(200).json("ok");
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/userfav", async function (req, res, next) {

  const { maddeId, anlamId, method } = req.body;
  const payload = { maddeId, anlamId, method };
  const headers = await getHeader(req);
  await axios
    .post("http://apiend:5001/v1/madde/userfav", payload, {
      headers,
    })
    .then(() => {
      res.status(200).json("ok");
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/userlikes", async function (req, res, next) {
  const { maddeId, anlamId, method } = req.body;
  const payload = { maddeId, anlamId, method };
  const headers = await getHeader(req);
  await axios
    .post("http://apiend:5001/v1/madde/userlikes", payload, {
      headers,
    })
    .then(() => {
      res.status(200).json("ok");
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/kulucka", async function (req, res, next) {
  res.locals.meta = {
    menuId: "kulucka",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  const headers = await getHeader(req);
  const kuluckalar = await getKuluckalar(headers);
  const kuluckadiller = [];
  if (kuluckalar) {
    for await (let item of kuluckalar.data) {
      const v = await getTabLang(req, item.lang);
      kuluckadiller.push({title: v, value: item.lang});
    }
  }
  const unique = Array.from(new Set(kuluckadiller.map(JSON.stringify))).map(JSON.parse);
  res.render("kulucka", { page: "Kuluçka Sayfası", user, kuluckalar, kuluckadiller:unique });
});
router.get("/kulucka/:id", async function (req, res, next) {
  res.locals.meta = {
    menuId: "kulucka",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  } else {
    return res.redirect("/");
  }
  const id = req.params.id;
  const headers = await getHeader(req);
  const setler = await getSetler(headers, id);
  const dictionary = await getKuluckasozluk(headers, id);
console.log('user:', user);
  res.render("kulucka2", { page: "Kuluçka Sayfası", user, setler, dictionary: dictionary.data[0] });
});

router.get("/kulucka/:dictId/set/:setId", async function (req, res, next) {
  res.locals.meta = {
    menuId: "kulucka",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  } else {
    return res.redirect("/");
  }
  const setId = req.params.setId;
  const headers = await getHeader(req);
  const selectedSet = await getSet(headers, setId);
  const dictionary = await getKuluckasozluk(headers, selectedSet.data[0].dictId.id);
  const nextSet = await getNextSet(headers, setId);
  let isModerater = false;
  if (user && user.id && !user.assignedSet) {
    if (user.canDoKuluckaModerate) {
      isModerater = true;
    }
    const reg = await registerSet(headers, setId, user.id, isModerater);
    if (reg) {
      req.session.user.user = reg;
      req.session.save();
    }
    if (user.canDoKuluckaModerate) {
      res.redirect(`/kulucka-eklediklerim/${setId}`);
    }
  }
  res.render("kulucka3", { page: "Kuluçka Sayfası", user, selectedSet: selectedSet.data[0], nextSet: nextSet[0], dictionary: dictionary.data[0] });
});

router.post("/kulucka-ekle", async function (req, res, next) {
  if (req.session && req.session.user) {
    user = req.session.user.user;
  } else {
    return res.redirect("/");
  }
  const headers = await getHeader(req);
  const temppayload = {...req.body};
  delete temppayload.madde;
  temppayload.userSubmitted = user.id;
  temppayload.dictId = temppayload.dictId;
  temppayload.dili = temppayload.dil;
  delete temppayload.dil;
  delete temppayload.mdMode;

  if (temppayload.tur) temppayload.tur = checkOrMakeArray(temppayload.tur);
  if (temppayload.alttur) temppayload.alttur = checkOrMakeArray(temppayload.alttur);
  if (temppayload.koken) temppayload.koken = checkOrMakeArray(temppayload.koken);
  if (temppayload.cinsiyet) temppayload.cinsiyet = checkOrMakeArray(temppayload.cinsiyet);
  if (temppayload.bicim) temppayload.bicim = checkOrMakeArray(temppayload.bicim);
  if (temppayload.sinif) temppayload.sinif = checkOrMakeArray(temppayload.sinif);
  if (temppayload.transkripsiyon) temppayload.transkripsiyon = checkOrMakeArray(temppayload.transkripsiyon);
  if (temppayload.fonetik) temppayload.fonetik = checkOrMakeArray(temppayload.fonetik);
  if (temppayload.heceliyazim) temppayload.heceliyazim = checkOrMakeArray(temppayload.heceliyazim);
  if (temppayload.zitanlam) temppayload.zitanlam = checkOrMakeArray(temppayload.zitanlam);
  if (temppayload.esanlam) temppayload.esanlam = checkOrMakeArray(temppayload.esanlam);
  if (temppayload.telaffuz) temppayload.telaffuz = checkOrMakeArray(temppayload.telaffuz);

  if (temppayload.karsimadde) temppayload.karsimadde = checkOrMakeArray(temppayload.karsimadde);
  if (temppayload.karsidil) temppayload.karsidil = checkOrMakeArray(temppayload.karsidil);
  if (temppayload.karsisesDosyasi) temppayload.karsisesDosyasi = checkOrMakeArray(temppayload.karsisesDosyasi);
  if (temppayload.karsidigeryazim) temppayload.karsidigeryazim = await makeArray(temppayload.karsidigeryazim);
  if (temppayload.karsianlam) temppayload.karsianlam = checkOrMakeArray(temppayload.karsianlam);
  if (temppayload.sekilaciklama) temppayload.sekilaciklama = checkOrMakeArray(temppayload.sekilaciklama);
  if (temppayload.sekilresim) temppayload.sekilresim = checkOrMakeArray(temppayload.sekilresim);
  if (temppayload.tarihcesiadi) temppayload.tarihcesiadi = checkOrMakeArray(temppayload.tarihcesiadi);
  if (temppayload.tarihcesibaslangic ) temppayload.tarihcesibaslangic = checkOrMakeArray(temppayload.tarihcesibaslangic);
  if (temppayload.tarihcesibitis) temppayload.tarihcesibitis = checkOrMakeArray(temppayload.tarihcesibitis);
  if (temppayload.tarihcesihakimiyet) temppayload.tarihcesihakimiyet = checkOrMakeArray(temppayload.tarihcesihakimiyet);

  if (temppayload.karsimadde) {
    temppayload.karsi = [];
    temppayload.karsimadde.forEach((kar, i) => {
      if (temppayload.karsianlam) {
      temppayload.karsi.push({
        dili: temppayload.karsidil[i],
        madde: kar,
        anlam: temppayload.karsianlam[i],
        sesDosyasi: temppayload.karsisesDosyasi[i] ? temppayload.karsisesDosyasi[i] : '',
        digeryazim: temppayload.karsidigeryazim[i] ? checkOrMakeArray(temppayload.karsidigeryazim[i]) : [],
      });
      } else {
        temppayload.karsi.push({
          dili: temppayload.karsidil[i],
          madde: kar,
          sesDosyasi: temppayload.karsisesDosyasi[i] ? temppayload.karsisesDosyasi[i] : '',
          digeryazim: temppayload.karsidigeryazim[i] ? checkOrMakeArray(temppayload.karsidigeryazim[i]) : [],
        });
      }
    });

    delete temppayload.karsidil;
    delete temppayload.karsimadde;
    delete temppayload.karsianlam;
    delete temppayload.karsisesDosyasi;
    delete temppayload.karsidigeryazim;
  } else {
    if (temppayload.tip === 'söz' && temppayload.karsianlam) {
      temppayload.karsi = [];
      temppayload.karsi.push({
        dili: temppayload.karsidil,
        madde: temppayload.karsimadde,
        anlam: temppayload.karsianlam,
        sesDosyasi: temppayload.karsisesDosyasi,
        digeryazim: temppayload.karsidigeryazim,
      });
      delete temppayload.karsidil;
      delete temppayload.karsimadde;
      delete temppayload.karsianlam;
      delete temppayload.karsisesDosyasi;
      delete temppayload.karsidigeryazim;
    }
  }

  if (temppayload.sekilresim) {
    temppayload.sekil = [];
    temppayload.sekilresim.forEach((sek, i) => {
      temppayload.sekil.push({
        aciklama: temppayload.sekilaciklama[i],
        url: sek,
      });
    });
    delete temppayload.sekilresim;
    delete temppayload.sekilaciklama;
  }

  if (temppayload.tarihcesiadi) {
    temppayload.tarihcesi = [];
    temppayload.tarihcesiadi.forEach((tar, i) => {
      temppayload.tarihcesi.push({
        baslangic: temppayload.tarihcesibaslangic[i],
        bitis: temppayload.tarihcesibitis[i],
        adi: tar,
        hakimiyet: temppayload.tarihcesihakimiyet[i],
      });
    });
    delete temppayload.tarihcesibaslangic;
    delete temppayload.tarihcesihakimiyet;
    delete temppayload.tarihcesibitis;
    delete temppayload.tarihcesiadi;
  }
  if (temppayload.latitude) {
    if (temppayload.tip === 'yeradı' || temppayload.tip === 'yapı') {
      temppayload.location = [temppayload.latitude, temppayload.longitude];
    }

    delete temppayload.latitude;
    delete temppayload.longitude;
  }
  temppayload.tip = [temppayload.tip];
  Object.keys(temppayload).forEach(k => (!temppayload[k] && temppayload[k] !== undefined) && delete temppayload[k]);

  const payload = { madde: req.body.madde, whichDict: [temppayload] };
  if (temppayload.digeryazim) {
    payload.digeryazim = checkOrMakeArray(temppayload.digeryazim);
  }
  delete temppayload.digeryazim;
  console.log('PAYLOAD:', JSON.stringify(payload));
  await axios
    .post("http://apiend:5001/v1/kuluckamadde", payload, { headers })
    .then(() => {
      res
        .status(200)
        .send(
          "Başarılı ekleme yaptınız"
        );
    })
    .catch((error) => {
      res.status(400).send(error.response.data);
    });
});

router.post("/kulucka-sil/:id", async function (req, res, next) {
  if (req.session && req.session.user) {
    user = req.session.user.user;
  } else {
    return res.redirect("/");
  }
  const id = req.params.id;
  const headers = await getHeader(req);
  await axios
  .delete(`http://apiend:5001/v1/kuluckamadde/${id}`, { headers })
  .then(() => {
    res
      .status(200)
      .send(
        "Başarılı silme yaptınız"
      );
  })
  .catch((error) => {
    res.status(400).send(error.response.data);
  });

});

router.post("/kulucka-teslimet", async function (req, res, next) {
  if (req.session && req.session.user) {
    user = req.session.user.user;
  } else {
    return res.redirect("/");
  }
  const headers = await getHeader(req);
  const temppayload = {...req.body};
  const sectionId = temppayload.setId;
  const nuser = await setTeslimEt(headers, sectionId);
  console.log('nuser', JSON.stringify(nuser));
  if (nuser) {
    req.session.user.user = nuser;
    req.session.save();
    return res.status(200).send("Başarılı teslimat yaptınız");
  }
  res.status(400).send('Bir hata var!');
});

router.post("/kulucka-kontroledildi", async function (req, res, next) {
  if (req.session && req.session.user) {
    user = req.session.user.user;
  } else {
    return res.redirect("/");
  }
  const headers = await getHeader(req);
  const temppayload = {...req.body};
  const sectionId = temppayload.setId;
  const nuser = await setKontrolEt(headers, sectionId);
  if (nuser) {
    req.session.user.user = nuser;
    req.session.save();
    return res.status(200).send("Başarılı teslimat yaptınız");
  }
  res.status(400).send('Bir hata var');
});
router.post("/kulucka-guncelle", async function (req, res, next) {
  if (req.session && req.session.user) {
    user = req.session.user.user;
  } else {
    return res.redirect("/");
  }
  const headers = await getHeader(req);
  const temppayload = {...req.body};
  delete temppayload.madde;
  const id = temppayload.id;
  delete temppayload.id;
  delete temppayload.userSubmitted;
  temppayload.dictId = temppayload.dictId;
  temppayload.dili = temppayload.dil;
  delete temppayload.dil;
  delete temppayload.mdMode;
  if (user && user.canDoKuluckaModerate) {
    temppayload.isDelivered = true;
    temppayload.userSubmitted = req.body.userSubmitted;
  } else {
    temppayload.userSubmitted = user.id;
  }
  if (temppayload.tur) temppayload.tur = checkOrMakeArray(temppayload.tur);
  if (temppayload.alttur) temppayload.alttur = checkOrMakeArray(temppayload.alttur);
  if (temppayload.koken) temppayload.koken = checkOrMakeArray(temppayload.koken);
  if (temppayload.cinsiyet) temppayload.cinsiyet = checkOrMakeArray(temppayload.cinsiyet);
  if (temppayload.bicim) temppayload.bicim = checkOrMakeArray(temppayload.bicim);
  if (temppayload.sinif) temppayload.sinif = checkOrMakeArray(temppayload.sinif);
  if (temppayload.transkripsiyon) temppayload.transkripsiyon = checkOrMakeArray(temppayload.transkripsiyon);
  if (temppayload.fonetik) temppayload.fonetik = checkOrMakeArray(temppayload.fonetik);
  if (temppayload.heceliyazim) temppayload.heceliyazim = checkOrMakeArray(temppayload.heceliyazim);
  if (temppayload.zitanlam) temppayload.zitanlam = checkOrMakeArray(temppayload.zitanlam);
  if (temppayload.esanlam) temppayload.esanlam = checkOrMakeArray(temppayload.esanlam);
  if (temppayload.telaffuz) temppayload.telaffuz = checkOrMakeArray(temppayload.telaffuz);

  if (temppayload.karsimadde) temppayload.karsimadde = checkOrMakeArray(temppayload.karsimadde);
  if (temppayload.karsidil) temppayload.karsidil = checkOrMakeArray(temppayload.karsidil);
  if (temppayload.karsisesDosyasi) temppayload.karsisesDosyasi = checkOrMakeArray(temppayload.karsisesDosyasi);
  if (temppayload.karsidigeryazim) temppayload.karsidigeryazim = await makeArray(temppayload.karsidigeryazim);
  if (temppayload.karsianlam) temppayload.karsianlam = checkOrMakeArray(temppayload.karsianlam);
  if (temppayload.sekilaciklama) temppayload.sekilaciklama = checkOrMakeArray(temppayload.sekilaciklama);
  if (temppayload.sekilresim) temppayload.sekilresim = checkOrMakeArray(temppayload.sekilresim);
  if (temppayload.tarihcesiadi) temppayload.tarihcesiadi = checkOrMakeArray(temppayload.tarihcesiadi);
  if (temppayload.tarihcesibaslangic ) temppayload.tarihcesibaslangic = checkOrMakeArray(temppayload.tarihcesibaslangic);
  if (temppayload.tarihcesibitis) temppayload.tarihcesibitis = checkOrMakeArray(temppayload.tarihcesibitis);
  if (temppayload.tarihcesihakimiyet) temppayload.tarihcesihakimiyet = checkOrMakeArray(temppayload.tarihcesihakimiyet);

  if (temppayload.karsimadde) {
    temppayload.karsi = [];
    temppayload.karsimadde.forEach((kar, i) => {
      if (temppayload.karsianlam) {
      temppayload.karsi.push({
        dili: temppayload.karsidil[i],
        madde: kar,
        anlam: temppayload.karsianlam[i],
        sesDosyasi: temppayload.karsisesDosyasi[i] ? temppayload.karsisesDosyasi[i] : '',
        digeryazim: temppayload.karsidigeryazim[i] ? checkOrMakeArray(temppayload.karsidigeryazim[i]) : [],
      });
      } else {
        temppayload.karsi.push({
          dili: temppayload.karsidil[i],
          madde: kar,
          sesDosyasi: temppayload.karsisesDosyasi[i] ? temppayload.karsisesDosyasi[i] : '',
          digeryazim: temppayload.karsidigeryazim[i] ? checkOrMakeArray(temppayload.karsidigeryazim[i]) : [],
        });
      }
    });

    delete temppayload.karsidil;
    delete temppayload.karsimadde;
    delete temppayload.karsianlam;
    delete temppayload.karsisesDosyasi;
    delete temppayload.karsidigeryazim;
  } else {
    if (temppayload.tip === 'söz' && temppayload.karsianlam) {
      temppayload.karsi = [];
      temppayload.karsi.push({
        dili: temppayload.karsidil,
        madde: temppayload.karsimadde,
        anlam: temppayload.karsianlam,
        sesDosyasi: temppayload.karsisesDosyasi,
        digeryazim: temppayload.karsidigeryazim,
      });
      delete temppayload.karsidil;
      delete temppayload.karsimadde;
      delete temppayload.karsianlam;
      delete temppayload.karsisesDosyasi;
      delete temppayload.karsidigeryazim;
    }
  }

  if (temppayload.sekilresim) {
    temppayload.sekil = [];
    temppayload.sekilresim.forEach((sek, i) => {
      temppayload.sekil.push({
        aciklama: temppayload.sekilaciklama[i],
        url: sek,
      });
    });
    delete temppayload.sekilresim;
    delete temppayload.sekilaciklama;
  }

  if (temppayload.tarihcesiadi) {
    temppayload.tarihcesi = [];
    temppayload.tarihcesiadi.forEach((tar, i) => {
      temppayload.tarihcesi.push({
        baslangic: temppayload.tarihcesibaslangic[i],
        bitis: temppayload.tarihcesibitis[i],
        adi: tar,
        hakimiyet: temppayload.tarihcesihakimiyet[i],
      });
    });
    delete temppayload.tarihcesibaslangic;
    delete temppayload.tarihcesihakimiyet;
    delete temppayload.tarihcesibitis;
    delete temppayload.tarihcesiadi;
  }
  if (temppayload.latitude) {
    if (temppayload.tip === 'yeradı' || temppayload.tip === 'yapı') {
      temppayload.location = [temppayload.latitude, temppayload.longitude];
    }

    delete temppayload.latitude;
    delete temppayload.longitude;
  }
  temppayload.tip = [temppayload.tip];
  Object.keys(temppayload).forEach(k => (!temppayload[k] && temppayload[k] !== undefined) && delete temppayload[k]);

  const payload = { madde: req.body.madde, whichDict: [temppayload] };
  if (temppayload.digeryazim) {
    payload.digeryazim = checkOrMakeArray(temppayload.digeryazim);
  }
  delete temppayload.digeryazim;
  console.log('Fİnal paylaod guncelelme:', JSON.stringify(payload));
  await axios
    .patch(`http://apiend:5001/v1/kuluckamadde/${id}`, payload, { headers })
    .then(() => {
      res
        .status(200)
        .send(
          "Başarılı ekleme yaptınız"
        );
    })
    .catch((error) => {
      res.status(400).send(error.response.data);
    });
});

router.get("/kulucka-eklediklerim/:setId", async function (req, res, next) {
  res.locals.meta = {
    menuId: "kulucka",
    siteLang: req.cookies.lang,
  };
  let user = null;
  let myownentries = null;
  let selectedSet = null;
  let nextSet = null;
  let headers = null;
  const setId = req.params.setId;

  if (req.session && req.session.user) {
    user = req.session.user.user;
  } else {
    return res.redirect("/");
  }
    headers = await getHeader(req);
    selectedSet = await getSet(headers, setId);
    nextSet = await getNextSet(headers, setId);
    const dictionary = await getKuluckasozluk(headers, selectedSet.data[0].dictId.id);
    await axios
    .get(`http://apiend:5001/v1/kuluckamadde/getmyownentries/${setId}`, { headers })
    .then((response) => {
      myownentries = response.data;
    })
    .catch((error) => {
      console.log(error.message);
    });

    res.render("kulucka-eklediklerim", { page: "Kuluçka Eklediklerim Sayfası", user, myownentries, selectedSet: selectedSet.data[0], nextSet: nextSet[0], dictionary: dictionary.data[0] });
});

router.get("/sende-ekle", ensureAuthenticated, function (req, res, next) {
  res.locals.meta = {
    menuId: "sende-ekle",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  } else {
    return res.redirect("/");
  }
  res.render("sende-ekle", { page: "Sende Ekle Sayfası", user });
});

router.post("/sende-ekle", async function (req, res, next) {
  if (req.session && req.session.user) {
    user = req.session.user.user;
  } else {
    return res.redirect("/");
  }
  const temppayload = {...req.body};
  delete temppayload.madde;
  temppayload.userSubmitted = user.id;
  temppayload.dictId = getDictId(temppayload.dil);
  temppayload.dili = temppayload.dil;
  delete temppayload.dil;
  delete temppayload.mdMode;
  console.log('HAM gelen:', temppayload.karsidigeryazim);
  if (temppayload.tur) temppayload.tur = checkOrMakeArray(temppayload.tur);
  if (temppayload.alttur) temppayload.alttur = checkOrMakeArray(temppayload.alttur);
  if (temppayload.cinsiyet) temppayload.cinsiyet = checkOrMakeArray(temppayload.cinsiyet);
  if (temppayload.bicim) temppayload.bicim = checkOrMakeArray(temppayload.bicim);
  if (temppayload.sinif) temppayload.sinif = checkOrMakeArray(temppayload.sinif);
  if (temppayload.transkripsiyon) temppayload.transkripsiyon = checkOrMakeArray(temppayload.transkripsiyon);
  if (temppayload.fonetik) temppayload.fonetik = checkOrMakeArray(temppayload.fonetik);
  if (temppayload.heceliyazim) temppayload.heceliyazim = checkOrMakeArray(temppayload.heceliyazim);
  if (temppayload.zitanlam) temppayload.zitanlam = checkOrMakeArray(temppayload.zitanlam);
  if (temppayload.esanlam) temppayload.esanlam = checkOrMakeArray(temppayload.esanlam);
  if (temppayload.telaffuz) temppayload.telaffuz = checkOrMakeArray(temppayload.telaffuz);
  if (temppayload.karsimadde) temppayload.karsimadde = checkOrMakeArray(temppayload.karsimadde);
  if (temppayload.karsidil) temppayload.karsidil = checkOrMakeArray(temppayload.karsidil);
  if (temppayload.karsisesDosyasi) temppayload.karsisesDosyasi = checkOrMakeArray(temppayload.karsisesDosyasi);
  if (temppayload.karsidigeryazim) temppayload.karsidigeryazim = await makeArray(temppayload.karsidigeryazim);
  if (temppayload.karsianlam) temppayload.karsianlam = checkOrMakeArray(temppayload.karsianlam);
  if (temppayload.sekilaciklama) temppayload.sekilaciklama = checkOrMakeArray(temppayload.sekilaciklama);
  if (temppayload.sekilresim) temppayload.sekilresim = checkOrMakeArray(temppayload.sekilresim);
  if (temppayload.tarihcesiadi) temppayload.tarihcesiadi = checkOrMakeArray(temppayload.tarihcesiadi);
  if (temppayload.tarihcesibaslangic ) temppayload.tarihcesibaslangic = checkOrMakeArray(temppayload.tarihcesibaslangic);
  if (temppayload.tarihcesibitis) temppayload.tarihcesibitis = checkOrMakeArray(temppayload.tarihcesibitis);
  if (temppayload.tarihcesihakimiyet) temppayload.tarihcesihakimiyet = checkOrMakeArray(temppayload.tarihcesihakimiyet);

  if (temppayload.karsimadde) {
    temppayload.karsi = [];
    temppayload.karsimadde.forEach((kar, i) => {
      if (temppayload.karsianlam) {
      temppayload.karsi.push({
        dili: temppayload.karsidil[i],
        madde: kar,
        anlam: temppayload.karsianlam[i],
        sesDosyasi: temppayload.karsisesDosyasi[i] ? temppayload.karsisesDosyasi[i] : '',
        digeryazim: temppayload.karsidigeryazim[i] ? checkOrMakeArray(temppayload.karsidigeryazim[i]) : [],
      });
      } else {
        temppayload.karsi.push({
          dili: temppayload.karsidil[i],
          madde: kar,
          sesDosyasi: temppayload.karsisesDosyasi[i] ? temppayload.karsisesDosyasi[i] : '',
          digeryazim: temppayload.karsidigeryazim[i] ? checkOrMakeArray(temppayload.karsidigeryazim[i]) : [],
        });
      }
    });

    delete temppayload.karsidil;
    delete temppayload.karsimadde;
    delete temppayload.karsianlam;
    delete temppayload.karsisesDosyasi;
    delete temppayload.karsidigeryazim;
  } else {
    if (temppayload.tip === 'söz' && temppayload.karsianlam) {
      temppayload.karsi = [];
      temppayload.karsi.push({
        dili: temppayload.karsidil,
        madde: temppayload.karsimadde,
        anlam: temppayload.karsianlam,
        sesDosyasi: temppayload.karsisesDosyasi,
        digeryazim: temppayload.karsidigeryazim,
      });
      delete temppayload.karsidil;
      delete temppayload.karsimadde;
      delete temppayload.karsianlam;
      delete temppayload.karsisesDosyasi;
      delete temppayload.karsidigeryazim;
    }
  }

  if (temppayload.sekilresim) {
    temppayload.sekil = [];
    temppayload.sekilresim.forEach((sek, i) => {
      temppayload.sekil.push({
        aciklama: temppayload.sekilaciklama[i],
        url: sek,
      });
    });
    delete temppayload.sekilresim;
    delete temppayload.sekilaciklama;
  }

  if (temppayload.tarihcesiadi) {
    temppayload.tarihcesi = [];
    temppayload.tarihcesiadi.forEach((tar, i) => {
      temppayload.tarihcesi.push({
        baslangic: temppayload.tarihcesibaslangic[i],
        bitis: temppayload.tarihcesibitis[i],
        adi: tar,
        hakimiyet: temppayload.tarihcesihakimiyet[i],
      });
    });
    delete temppayload.tarihcesibaslangic;
    delete temppayload.tarihcesihakimiyet;
    delete temppayload.tarihcesibitis;
    delete temppayload.tarihcesiadi;
  }
  if (temppayload.latitude) {
    if (temppayload.tip === 'yeradı' || temppayload.tip === 'yapı') {
      temppayload.location = [temppayload.latitude, temppayload.longitude];
    }

    delete temppayload.latitude;
    delete temppayload.longitude;
  }
  temppayload.tip = [temppayload.tip];

  if (temppayload.digeryazim) {
    delete temppayload.digeryazim;
  }

  Object.keys(temppayload).forEach(k => (!temppayload[k] && temppayload[k] !== undefined) && delete temppayload[k]);

  const payload = { madde: req.body.madde, whichDict: [temppayload] };
  if (req.body.digeryazim) {
    payload.digeryazim = checkOrMakeArray(req.body.digeryazim);
  }

  await axios
    .post("http://apiend:5001/v1/gundem", payload)
    .then(() => {
      res
        .status(200)
        .send(
          "Başarılı ekleme yaptınız"
        );
    })
    .catch((error) => {
      res.status(400).send(error.response.data);
    });
});

router.get("/profil", function (req, res, next) {
  res.locals.meta = {
    menuId: "ayarlar",
    siteLang: req.cookies.lang,
  };
  let user = null;
  const stats = {};
  if (req.session && req.session.user) {
    user = req.session.user.user;
    res.render("profil", { page: "Profil Sayfası", user, stats });
  } else {
    res.status(301).redirect('/');
  }
});


router.get("/ayarlar", function (req, res, next) {
  res.locals.meta = {
    menuId: "ayarlar",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
    res.render("ayarlar", { page: "Ayarlar Sayfası", user });
  } else {
    res.status(301).redirect('/');
  }
});

router.post("/ayarlar", async function (req, res, next) {
  const { name, profileMessage, picture, facebook, instagram, twitter, linkedin, city, phoneNumber, publicProfile, saveHistory, gizlilik } = req.body;
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  let payload = {};
  console.log('saveHistory:', saveHistory, 'publicProfile:', publicProfile);

  if (gizlilik) {
    payload = {
      name,
      saveHistory: saveHistory ? true : false,
      publicProfile: publicProfile ? true : false,
    }
  } else {
    payload = { name, profileMessage, picture, facebook, instagram, twitter, linkedin, city, phoneNumber  };
  }
console.log('payload:', payload);
if (user && user.id) {
  const headers = await getHeader(req);
  await axios
    .patch(`http://apiend:5001/v1/users/${user.id}`, payload, {
      headers,
    })
    .then(({ data }) => {
      req.session.user.user = data;
      req.session.save();
      res.status(200).send("success");
    })
    .catch((error) => {
      res.status(500).json(error.response.data);
    });
  } else {
    res.status(500).json('Önce giriş yapmalısınız.');
  }

});

router.get("/sozlukler", function (req, res, next) {
  res.locals.meta = {
    menuId: "sozlukler",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  res.render("sozlukler", { page: "Sözlukler Sayfası", user });
});

router.post("/aktifDiller", async function (req, res) {
  const headers = await getHeader(req);
  const siteLanguages = await getSiteLanguages(headers);
  if (siteLanguages.length > 0) {
    res.status(200).json(siteLanguages);
  } else {
    res.status(200).json([]);
  }
});

router.get("/blog", async function (req, res, next) {
  res.locals.meta = {
    menuId: "blog",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }

  const headers = await getHeader(req);
  let blogs = [];

  await axios
    .get("http://apiend:5001/v1/blog?isActive=true",
    {
      headers,
    }
    )
    .then(({data}) => {
      console.log('data:', data);
      const a= data.data;
      a.map((item) => a.body = mdr.render(a.body));
      blogs = a;
    })
    .catch((error) => {
      console.log(error);
    });

  res.render("blog", { page: "Blog Sayfası", user, blogs });
});

router.get("/blog/:slug", async function (req, res, next) {
  const slug = req.params.slug;
  res.locals.meta = {
    menuId: "blog",
    rootPath: "../",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }

  const headers = await getHeader(req);
  let blog = '';

  await axios
    .get("http://apiend:5001/v1/blog/" + slug,
    {
      headers,
    }
    )
    .then(({data}) => {
      console.log('data:', data);
      const a= data;
      a.body = mdr.render(a.body);
      blog = a;
    })
    .catch((error) => {
      console.log(error);
    });

  res.render("blogdetay", { page: "Blog DetaySayfası", user, blog });
});

router.get("/blog/semseddin-sami", function (req, res, next) {
  res.locals.meta = {
    menuId: "blog",
    rootPath: "../",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  res.render("semseddin-sami", { page: "Blog DetaySayfası", user });
});

router.get("/odeme", function (req, res, next) {
  res.locals.meta = {
    menuId: "odeme",
    siteLang: req.cookies.lang,
  };
  let user = null;
  if (req.session && req.session.user) {
    user = req.session.user.user;
  }
  res.render("odeme", { page: "Ödemeler Sayfası", user });
});

router.get("/sanal-klavye", function (req, res, next) {
  res.locals.meta = {
    menuId: "sanal-klavye",
    siteLang: req.cookies.lang,
  };
  res.render("sanal-klavye", { page: "Sanal Klavye Sayfası" });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res, next) => {
    req.session.user = {};
    req.session.user = req.user;
    req.session.save();
    await req.flash("info", "Tekrar Hoş geldiniz!");
    return res.redirect("/");
    //  const payload = {};
    //  payload.googleId = req.user.user.googleId;
    //  await axios
    //  .post("http://apiend:5001/v1/auth/google-login", payload)
    //  .then(({ data }) => {
    //     req.session.user = {};
    //     req.session.user = data;
    //     req.session.save();
    //     res.redirect('/');
    //  })
    //  .catch((error) => {
    //    console.log(error.message);
    //   res.redirect('/');
    //  });
  }
);

router.get("/verify-email", async function (req, res, next) {
  const token = req.query.token;
  const payload = {};
  payload.token = token;
  await axios
    .post("http://apiend:5001/v1/auth/verify-email", payload)
    .then(async ({ data }) => {
      await req.flash("info", "E-postanız doğrulanmıştır!");
      return res.redirect("/");
    })
    .catch(async (error) => {
      await req.flash("info", error.response.message);
      return res.redirect("/");
    });
});

router.post("/davetet", async (req, res, next) => {
  const { invitedBy, email } = req.body;
  const { limiterInstance, usernameIPkey, isLimited } = await invitationLimiter(
    req
  );
  if (!isLimited) {
    const invitedByIp = storeIP(req.clientIp);
    const payload = { email, invitedBy, invitedByIp };
    const headers = await getHeader(req);
    await axios
      .post(`http://apiend:5001/v1/davet`, payload, {
        headers,
      })
      .then(({ data }) => {
        limiterInstance
          .consume(usernameIPkey)
          .catch((error) => console.log(error.message));
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json(error.response.message);
      });
  } else {
    res.status(500).json("Günlük en fazla 3 kişiye davet gönderebilirsiniz!");
  }
});

router.get("/redisClient/f0c8ffa4df03ef51ba9c63ec18b01f4a/:name", async function (req, res) {
  const name = req.params.name;
  if (name) {
    await deleteRedisCacheByName(name);
  }
  res.status(200).json({});
});
module.exports = router;
