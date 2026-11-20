/* Chapter 6 — Verantwoord rijden, ADAS en milieu. WVW 1994 art. 8 (alcohol en drugs), RVV 1990 art. 61a (telefoon),
   CBR Rijprocedure B (rijhulpsystemen), EU-verordening 2019/2144 (verplichte systemen in nieuwe auto's). */
(function () {
  const { C, mc, yn, num, hot, ord, mul, anim, L, pic } = RW.h;
  const rd = o => Object.assign({ type: 'road' }, o), P = (t, o) => pic(t, o);
  const S = (s, c, x) => Object.assign({ s: s, c: c }, x || {}), I = (i, c, x) => Object.assign({ i: i, c: c }, x || {});
  const hw = o => rd(Object.assign({ side: 'hwy', L: [{ d: 'up' }, { d: 'up' }], marks: ['dash'] }, o));

  /* ---------------- 6.1 alcohol, drugs, medicijnen en vermoeidheid ---------------- */
  L({ id: 'alcohol', ch: 6, fa: 'الکل، دارو و خستگی', nl: 'Alcohol, drugs, medicijnen en vermoeidheid', en: 'Alcohol, drugs, medicines and fatigue',
    cards: [
      C('حد قانونی الکل', 'alcohollimiet 0,5 ‰', 'alcohol limit',
        'حد کلی: <b>0,5 پرومیل</b> در خون یا <b>220 میکروگرم</b> در هر لیتر هوای بازدم. بیشتر از آن رانندگی <b>جرم</b> است.', 'WVW 1994 ماده ۸ بند ۲',
        P([I('beer', '0,5 ‰'), I('txt:220 µg/l', 'adem')])),
      C('رانندهٔ تازه‌کار: 0,2', 'beginnend bestuurder 0,2 ‰', 'novice driver 0.2',
        'تا <b>۵ سال</b> بعد از گرفتن اولین گواهینامه (اگر AM یا T را قبل از ۱۸ سالگی گرفتی: ۷ سال)، حد تو <b>0,2 پرومیل</b> یا <b>88 µg/l</b> است. یعنی عملاً یک لیوان هم ممکن است زیاد باشد.', 'WVW 1994 ماده ۸ بند ۳',
        P([I('license', 'beginner'), I('txt:0,2 ‰', '88 µg/l')])),
      C('الکل بدنت را کند می‌کند', 'effect van alcohol', 'effect of alcohol',
        'الکل <b>واکنش</b> را کند می‌کند، <b>دید</b> را کم می‌کند و باعث می‌شود <b>ریسک بیشتری</b> کنی و خطر را کمتر ببینی. حتی زیر حد قانونی هم اثر دارد.', 'WVW 1994 ماده ۸ بند ۱',
        P([I('beer'), I('clock', 'reactie'), I('eye', 'zicht')], { cols: 3, h: 200 })),
      C('فقط زمان کمک می‌کند', 'alleen tijd helpt', 'only time helps',
        'بدن تقریباً هر <b>یک ساعت و نیم</b> حدود یک لیوان استاندارد را تجزیه می‌کند. <b>قهوه، دوش آب سرد یا غذا</b> الکل را کم نمی‌کنند. فردا صبح بعد از مهمانی هم ممکن است هنوز بالای حد باشی.', 'CBR: alcohol en verkeer',
        P([I('clock', '± 1,5 uur'), I('coffee', 'helpt niet')])),
      C('مواد مخدر', 'drugs', 'drugs',
        'رانندگی تحت اثر مواد مخدر ممنوع است. برای چند ماده (مثلاً حشیش، کوکائین، آمفتامین) <b>حد خونی</b> قانونی وجود دارد؛ ترکیب مواد با هم یا با الکل حد صفر دارد.', 'WVW 1994 ماده ۸ بند ۱ و ۵',
        P([I('drug'), I('beer'), I('cross')], { cols: 3, h: 200 })),
      C('داروها', 'medicijnen', 'medicines',
        'بعضی داروها (مثلاً قرص خواب، داروی آلرژی، مسکن قوی) <b>رانندگی را خطرناک</b> می‌کنند. روی بسته‌شان برچسب <b>زرد</b> هشدار هست. بروشور را بخوان یا از داروساز بپرس.', 'WVW 1994 ماده ۸ بند ۱',
        P([I('pill', 'geel etiket'), I('warn')])),
      C('خستگی', 'vermoeidheid', 'fatigue',
        'خستگی مثل الکل واکنش را کند می‌کند. هر <b>دو ساعت</b> یک استراحت کن. اگر چشم‌هایت سنگین شد، خمیازه کشیدی یا خط‌ها را گم کردی: <b>جای امن بایست</b> و کمی بخواب.', 'CBR: vermoeidheid',
        P([I('sleep'), I('coffee', 'pauze'), I('clock', 'elke 2 uur')], { cols: 3, h: 200 })),
      C('احساسات', 'emoties', 'emotions',
        'عصبانیت، استرس یا غم تمرکز را کم می‌کند. اگر کسی تو را عصبانی کرد، <b>واکنش نشان نده</b>، فاصله بگیر و آرام بمان.', 'RVV ماده ۵ (WVW ماده ۵: geen gevaar of hinder)',
        P([I('warn', 'boos'), I('dist2', 'afstand')]))
    ],
    qs: [
      mc('حد قانونی الکل برای راننده‌ای که بیش از ۵ سال گواهینامه دارد چقدر است؟', 'Alcohollimiet ervaren bestuurder?', [['0,5 ‰', '0,5 promille'], ['0,2 ‰', '0,2 promille'], ['0,8 ‰', '0,8 promille']], 0, 'حد کلی <b>0,5 ‰</b> (220 µg/l).', 'WVW 1994 ماده ۸ بند ۲', P([I('beer')]), 'promille|per mille'),
      mc('تو دو سال پیش گواهینامه گرفتی. حد الکل تو چقدر است؟', 'Twee jaar rijbewijs: welke limiet?', [['0,2 ‰', '0,2 promille'], ['0,5 ‰', '0,5 promille'], ['0,0 ‰', '0,0']], 0, 'رانندهٔ تازه‌کار: <b>0,2 ‰</b> (88 µg/l).', 'WVW 1994 ماده ۸ بند ۳', P([I('license'), I('beer')]), 'beginnend bestuurder|novice driver'),
      num('حد الکل در <b>هوای بازدم</b> برای رانندهٔ عادی چند میکروگرم در لیتر است؟', 'Ademalcohol-limiet (µg/l)?', 220, '<b>220 µg/l</b> برابر با 0,5 ‰ در خون.', 'WVW 1994 ماده ۸ بند ۲', P([I('txt:µg/l'), I('beer')]), 'ademanalyse|breath test'),
      num('حد الکل در هوای بازدم برای رانندهٔ تازه‌کار چند میکروگرم در لیتر است؟', 'Ademalcohol-limiet beginner?', 88, '<b>88 µg/l</b> برابر با 0,2 ‰.', 'WVW 1994 ماده ۸ بند ۳', P([I('txt:µg/l'), I('license')]), 'ademanalyse|breath test'),
      num('اولین گواهینامهٔ تو B است و در ۱۸ سالگی گرفتی. چند سال «رانندهٔ تازه‌کار» هستی؟', 'Hoeveel jaar beginnend bestuurder?', 5, '<b>۵ سال</b> بعد از اولین گواهینامه.', 'WVW 1994 ماده ۸ بند ۳', P([I('license'), I('clock')]), 'beginnend bestuurder|novice driver'),
      yn('یک فنجان قهوهٔ قوی الکل خونت را سریع‌تر پایین می‌آورد؟', 'Helpt koffie tegen alcohol?', false, 'نه. فقط <b>زمان</b> الکل را کم می‌کند.', 'CBR: alcohol en verkeer', P([I('coffee'), I('beer')]), 'alcohol afbreken|alcohol breakdown'),
      yn('صبح بعد از یک مهمانی که دیروقت مشروب زیادی خوردی ممکن است هنوز بالای حد باشی؟', 'Ochtend na een feest: nog te veel?', true, 'بله. تجزیهٔ الکل ساعت‌ها طول می‌کشد.', 'CBR: alcohol en verkeer', P([I('night'), I('sun'), I('beer')], { cols: 3, h: 200 }), 'restalcohol|residual alcohol'),
      mul('الکل چه اثری روی رانندگی دارد؟', 'Effecten van alcohol?', [['واکنش کندتر', 'tragere reactie'], ['ریسک بیشتر', 'meer risico'], ['دید بدتر', 'slechter zicht'], ['تمرکز بهتر', 'betere concentratie']], [0, 1, 2], 'الکل هیچ اثر مثبتی ندارد.', 'WVW 1994 ماده ۸', P([I('clock'), I('warn'), I('eye'), I('beer')]), 'alcohol|alcohol'),
      mc('روی بستهٔ داروی تو برچسب زرد هشدار رانندگی هست. چه می‌کنی؟', 'Geel etiket op je medicijn.', [['بروشور را می‌خوانم و از پزشک یا داروساز می‌پرسم؛ اگر لازم است رانندگی نمی‌کنم', 'bijsluiter lezen, vragen'], ['کمتر می‌خورم و رانندگی می‌کنم', 'minder nemen'], ['با قهوه جبران می‌کنم', 'koffie']], 0, 'داروی تأثیرگذار می‌تواند تو را «تحت اثر» کند؛ قانون همان است.', 'WVW 1994 ماده ۸ بند ۱', P([I('pill', 'geel'), I('car')]), 'medicijnen|medicines'),
      mc('بعد از دو ساعت رانندگی در بزرگراه خمیازه می‌کشی و چشم‌هایت سنگین است. بهترین کار؟', 'Moe op de snelweg. Beste keuze?', [['در اولین جای امن (parkeerplaats) می‌ایستم و استراحت می‌کنم', 'stoppen en rusten'], ['پنجره را باز می‌کنم و ادامه می‌دهم', 'raam open'], ['صدای رادیو را بلند می‌کنم', 'radio harder']], 0, 'پنجره و رادیو خستگی را درمان نمی‌کنند. <b>استراحت</b>.', 'CBR: vermoeidheid', P([I('sleep'), I('park')]), 'vermoeidheid|fatigue'),
      yn('ترکیب حشیش و الکل حتی با مقدار کم هم ممنوع است؟', 'Cannabis + alcohol, beetje: verboden?', true, 'برای ترکیب مواد، حد قانونی عملاً <b>صفر</b> است.', 'WVW 1994 ماده ۸ بند ۵ و Besluit alcohol, drugs en geneesmiddelen', P([I('drug'), I('beer')]), 'combinatiegebruik|combined use'),
      mc('یک راننده پشت سرت بوق می‌زند و نور بالا می‌دهد. تو عصبانی می‌شوی. چه می‌کنی؟', 'Agressieve bestuurder achter je.', [['آرام می‌مانم و اگر بشود می‌گذارم رد شود', 'rustig blijven, laten passeren'], ['ناگهان ترمز می‌کنم', 'remmen'], ['من هم بوق می‌زنم', 'toeteren']], 0, 'ترمز ناگهانی برای تنبیه خطرناک و ممنوع است.', 'RVV ماده ۵ و WVW ماده ۵', P([I('car2'), I('car')]), 'agressie|aggression')
    ]
  });

  /* ---------------- 6.2 afleiding ---------------- */
  L({ id: 'afleid', ch: 6, fa: 'حواس‌پرتی و موبایل', nl: 'Afleiding en telefoon', en: 'Distraction and phone',
    cards: [
      C('موبایل در دست ممنوع', 'handheld-verbod', 'handheld ban',
        'حین رانندگی <b>در دست گرفتن</b> موبایل، تبلت یا هر وسیلهٔ ارتباطی ممنوع است؛ حتی برای نگاه به نقشه یا عوض کردن آهنگ.', 'RVV ماده ۶۱a',
        P([I('phone'), I('cross')])),
      C('پشت چراغ قرمز هم ممنوع', 'ook bij stilstand voor rood', 'also at a red light',
        'پشت <b>چراغ قرمز</b> یا در <b>ترافیک</b> هنوز در حال رانندگی هستی؛ پس موبایل در دست باز هم ممنوع است. فقط وقتی <b>پارک</b> کرده‌ای و موتور خاموش است مجاز است.', 'RVV ماده ۶۱a (رویهٔ دادگاه‌ها)',
        P([I('tl_r'), I('phone'), I('cross')], { cols: 3, h: 200 })),
      C('هندزفری و نگهدارنده', 'handsfree en houder', 'hands-free and holder',
        'تماس با <b>هندزفری</b> و موبایل در <b>نگهدارنده</b> مجاز است، ولی آن هم حواست را پرت می‌کند. تماس را کوتاه کن، مسیر را قبل از حرکت تنظیم کن.', 'RVV ماده ۶۱a',
        P([I('holder'), I('phone')])),
      C('چشم، دست، ذهن', 'afleiding: ogen, handen, hoofd', 'eyes, hands, mind',
        'حواس‌پرتی سه نوع است: <b>چشم</b> از جاده (صفحه‌نمایش)، <b>دست</b> از فرمان (خوردن، تنظیم)، <b>ذهن</b> از رانندگی (بحث، فکر). با ۵۰ km/h در ۲ ثانیه نگاه به موبایل حدود ۲۸ متر کور می‌رانی.', 'CBR: afleiding',
        P([I('eye'), I('hands'), I('phone')], { cols: 3, h: 200 })),
      C('هدفون', 'koptelefoon', 'headphones',
        'برای راننده هدفون <b>ممنوع نیست</b> ولی باید صداهای ترافیک (آژیر، بوق) را بشنوی. هر دو گوش بسته خطرناک است.', 'RVV ماده ۵',
        P([I('siren'), I('car')])),
      C('صفحه‌های داخل خودرو', 'schermen in de auto', 'in-car screens',
        'ناوبری و صفحهٔ لمسی خودرو را <b>قبل از حرکت</b> تنظیم کن. حین رانندگی فقط با یک نگاه کوتاه.', 'RVV ماده ۵',
        P([I('wheel'), I('phone')])),
      C('بیرون ماشین هم حواس‌پرتی هست', 'afleiding buiten', 'outside distractions',
        'تابلوهای تبلیغاتی، تصادف آن طرف جاده (<b>kijkfile</b>) و منظره هم تمرکز را می‌گیرند. چشمت روی جاده جلویت بماند.', 'CBR: afleiding',
        P([I('first'), I('eye')]))
    ],
    qs: [
      yn('حین رانندگی موبایل را در دست می‌گیری تا فقط ساعت را ببینی. مجاز است؟', 'Telefoon vasthouden om de tijd te zien?', false, 'هر نوع <b>در دست گرفتن</b> ممنوع است.', 'RVV ماده ۶۱a', P([I('phone'), I('clock')]), 'handheld|handheld'),
      yn('پشت چراغ قرمز ایستاده‌ای. موبایل را در دست می‌گیری تا پیام بخوانی. مجاز است؟', 'Voor rood: bericht lezen in de hand?', false, 'پشت چراغ قرمز هنوز «در حال رانندگی» هستی.', 'RVV ماده ۶۱a', P([I('tl_r'), I('phone')]), 'handheld|handheld'),
      yn('با هندزفری تلفن می‌زنی. مجاز است؟', 'Handsfree bellen: toegestaan?', true, 'بله، مجاز است؛ ولی کوتاه و با احتیاط.', 'RVV ماده ۶۱a', P([I('holder')]), 'handsfree|hands-free'),
      mc('کجا اجازه داری موبایل را در دست بگیری؟', 'Waar mag je je telefoon vasthouden?', [['وقتی پارک کرده‌ای', 'geparkeerd'], ['در ترافیک ایستاده', 'in de file'], ['پشت چراغ قرمز', 'voor rood']], 0, 'فقط وقتی <b>دیگر رانندگی نمی‌کنی</b>.', 'RVV ماده ۶۱a', P([I('park'), I('phone')]), 'parkeren|parking'),
      num('با ۵۰ km/h تقریباً ۱۴ متر در ثانیه می‌روی. اگر ۲ ثانیه به موبایل نگاه کنی، چند متر کور رانده‌ای؟', 'Hoeveel meter blind in 2 s bij 50 km/h?', 28, '۱۴ × ۲ = <b>۲۸ متر</b>.', 'CBR: afleiding', P([I('sp:50'), I('phone')]), 'afleiding|distraction'),
      mul('کدام‌ها حواس‌پرتی هستند؟', 'Wat leidt af?', [['تنظیم ناوبری حین رانندگی', 'navigatie instellen'], ['خوردن ساندویچ', 'eten'], ['بحث تند با سرنشین', 'ruzie'], ['نگاه به آینه‌ها', 'spiegels']], [0, 1, 2], 'نگاه به آینه بخشی از رانندگی است.', 'CBR: afleiding', P([I('phone'), I('mirror'), I('hands')], { cols: 3, h: 200 }), 'afleiding|distraction'),
      mc('در بزرگراه طرف مقابل تصادف شده است. چه می‌کنی؟', 'Ongeluk aan de overkant.', [['به رانندگی خودم ادامه می‌دهم و نگاه نمی‌کنم', 'doorrijden, niet kijken'], ['سرعت کم می‌کنم تا ببینم', 'afremmen en kijken'], ['فیلم می‌گیرم', 'filmen']], 0, 'نگاه کردن باعث <b>kijkfile</b> و تصادف تازه می‌شود. فیلم گرفتن هم ممنوع است.', 'RVV ماده ۵ و ۶۱a', P([I('first'), I('eye'), I('cross')], { cols: 3, h: 200 }), 'kijkfile|rubbernecking'),
      yn('ناوبری را بهتر است قبل از حرکت تنظیم کنی؟', 'Navigatie instellen vóór vertrek?', true, 'بله. حین رانندگی حواست پرت می‌شود.', 'RVV ماده ۵', P([I('phone'), I('car')]), 'navigatie|navigation'),
      mc('در مسیر یک پیام فوری می‌آید. چه می‌کنی؟', 'Een dringend bericht.', [['جای امن پارک می‌کنم و بعد می‌خوانم', 'eerst parkeren'], ['کنار جاده در خط اضطراری می‌ایستم', 'op de vluchtstrook'], ['سریع نگاه می‌کنم', 'snel kijken']], 0, 'خط اضطراری فقط برای اضطرار است؛ پیام اضطرار نیست.', 'RVV ماده ۶۱a و ۴۳', P([I('park'), I('phone')]), 'vluchtstrook|hard shoulder')
    ]
  });

  /* ---------------- 6.3 rijhulpsystemen I ---------------- */
  L({ id: 'adas1', ch: 6, fa: 'سیستم‌های کمک‌راننده ۱', nl: 'Rijhulpsystemen (ADAS) 1', en: 'Driver assistance (ADAS) 1',
    cards: [
      C('تو همیشه مسئولی', 'jij blijft verantwoordelijk', 'you stay responsible',
        'سیستم‌های کمک‌راننده (ADAS) <b>کمک</b> می‌کنند ولی <b>رانندگی نمی‌کنند</b>. تو همیشه رانندهٔ مسئول هستی: دست روی فرمان، چشم روی جاده. سیستم ممکن است چیزی را نبیند.', 'CBR Rijprocedure B: rijhulpsystemen؛ RVV ماده ۵',
        P([I('hands'), I('eye'), I('wheel')], { cols: 3, h: 200 })),
      C('کروز کنترل', 'cruisecontrol', 'cruise control',
        '<b>cruise control</b> سرعتی را که انتخاب کردی نگه می‌دارد، ولی <b>فاصله را نگه نمی‌دارد</b>. با ترمز یا کلاچ خاموش می‌شود.', 'CBR Rijprocedure B',
        P([I('cruise'), I('sp:100')])),
      C('کروز کنترل تطبیقی', 'adaptieve cruisecontrol (ACC)', 'adaptive cruise control',
        '<b>ACC</b> با رادار سرعت و <b>فاصله</b> با ماشین جلو را نگه می‌دارد: اگر جلویی آهسته شود، تو هم آهسته می‌شوی. ولی ممکن است ماشین ایستاده، موتور یا ماشینی که ناگهان جلو می‌پیچد را دیر ببیند.', 'CBR Rijprocedure B',
        hw({ units: [{ id: 'you', ln: 1, y: 250 }, { id: 'a', ln: 1, y: 110, label: '' }], dist: [[250, 128, 226, '2 s']] })),
      C('ACC در باران و برف', 'ACC bij slecht weer', 'ACC in bad weather',
        'در باران شدید، برف، مه یا جادهٔ لغزنده، <b>رادار و دوربین</b> ممکن است بد کار کنند. ACC را خاموش کن و خودت فاصله را بیشتر کن.', 'CBR Rijprocedure B',
        P([I('acc'), I('rain'), I('snow')], { cols: 3, h: 200 })),
      C('کمک حفظ خط', 'lane assist (LKA / LDW)', 'lane assist',
        '<b>LDW</b> وقتی بدون راهنما از خط بیرون می‌روی هشدار می‌دهد. <b>LKA</b> فرمان را کمی می‌چرخاند تا در خط بمانی. وقتی خط‌کشی نیست یا کثیف است کار نمی‌کند.', 'CBR Rijprocedure B',
        hw({ units: [{ id: 'you', ln: 1, dx: -14, y: 200, rot: -6 }], note: 'LKA' })),
      C('ترمز اضطراری خودکار', 'noodremassistent (AEB)', 'automatic emergency braking',
        '<b>AEB</b> اگر خطر برخورد ببیند هشدار می‌دهد و اگر تو واکنش نشان ندهی <b>خودش ترمز</b> می‌کند. این برای وقتی است که دیر کرده‌ای؛ <b>به آن تکیه نکن</b>.', 'CBR Rijprocedure B؛ EU 2019/2144',
        P([I('aeb'), I('brake')])),
      C('هشدار نقطهٔ کور', 'dodehoekdetectie', 'blind-spot warning',
        'چراغ کوچک در آینه وقتی روشن می‌شود که ماشینی در <b>نقطهٔ کور</b> است. باز هم قبل از تغییر خط <b>سرت را بچرخان</b> و نگاه کن.', 'CBR Rijprocedure B؛ RVV ماده ۵۴',
        P([I('blindspot'), I('mirror')])),
      C('هشدار و دکمه‌ها را بشناس', 'ken je auto', 'know your car',
        'در امتحان عملی CBR ممکن است از تو بخواهند از سیستم‌ها استفاده کنی. قبل از رانندگی بدان هر سیستم چطور <b>روشن و خاموش</b> می‌شود و هشدارهایش چه شکلی است (کتاب راهنمای خودرو).', 'CBR Rijprocedure B',
        P([I('wheel'), I('info')]))
    ],
    qs: [
      mc('چه کسی مسئول رانندگی است وقتی ACC و lane assist روشن‌اند؟', 'Wie is verantwoordelijk met ACC en LKA aan?', [['من، راننده', 'ik'], ['سازندهٔ خودرو', 'de fabrikant'], ['سیستم', 'het systeem']], 0, 'راننده <b>همیشه</b> مسئول است.', 'CBR Rijprocedure B؛ RVV ماده ۵', P([I('acc'), I('lane'), I('hands')], { cols: 3, h: 200 }), 'verantwoordelijkheid|responsibility'),
      yn('cruise control معمولی فاصله با ماشین جلو را نگه می‌دارد؟', 'Houdt gewone cruisecontrol afstand?', false, 'نه؛ فقط <b>سرعت</b>. ACC فاصله را هم نگه می‌دارد.', 'CBR Rijprocedure B', P([I('cruise')]), 'cruisecontrol|cruise control'),
      mc('ACC روشن است. ماشینی از خط کناری ناگهان جلوی تو می‌آید. چه می‌کنی؟', 'ACC aan, invoeger snijdt je.', [['خودم آماده‌ام و اگر لازم باشد ترمز می‌کنم', 'zelf remmen indien nodig'], ['منتظر می‌مانم تا ACC ترمز کند', 'wachten op ACC'], ['گاز می‌دهم', 'gas geven']], 0, 'ACC ممکن است <b>دیر</b> واکنش نشان دهد.', 'CBR Rijprocedure B', hw({ units: [{ id: 'you', ln: 1, y: 250 }, { id: 'a', ln: 0, dx: 14, y: 160, rot: 12, blink: 'r', label: '۱' }] }), 'invoegen|cutting in'),
      mc('برف شدید می‌بارد و حسگر جلوی ماشین پوشیده از برف است. با ACC چه می‌کنی؟', 'Sneeuw op de sensor, ACC?', [['خاموشش می‌کنم و خودم می‌رانم', 'uitzetten'], ['روشن می‌گذارم', 'aan laten'], ['سرعت ACC را بالا می‌برم', 'sneller zetten']], 0, 'حسگر پوشیده درست کار نمی‌کند.', 'CBR Rijprocedure B', P([I('snow'), I('sensor')]), 'sensor|sensor'),
      mc('lane assist روشن است. می‌توانی دست‌هایت را از فرمان برداری؟', 'Lane assist aan: handen los?', [['نه، دست‌ها همیشه روی فرمان', 'nee, handen aan het stuur'], ['بله، در بزرگراه', 'ja, op de snelweg'], ['بله، چند ثانیه', 'ja, even']], 0, 'LKA کمک است، نه خلبان خودکار.', 'CBR Rijprocedure B', P([I('lane'), I('hands')]), 'handen aan het stuur|hands on wheel'),
      yn('lane assist در جاده‌ای بدون خط‌کشی هم خوب کار می‌کند؟', 'Werkt lane assist zonder belijning?', false, 'دوربین باید <b>خط‌ها</b> را ببیند.', 'CBR Rijprocedure B', P([I('lane'), I('cam')]), 'belijning|lane markings'),
      yn('ماشینت AEB دارد. پس می‌توانی فاصلهٔ کمتری نگه داری؟', 'AEB, dus kleinere afstand?', false, 'نه. AEB برای اضطرار است و همیشه کافی نیست.', 'CBR Rijprocedure B', P([I('aeb'), I('dist2')]), 'noodremassistent|AEB'),
      mc('چراغ نقطهٔ کور در آینهٔ چپ روشن نیست. می‌خواهی به چپ بروی. چه می‌کنی؟', 'Dodehoeklampje uit, naar links.', [['آینه، راهنما، و سر چرخاندن برای نگاه', 'spiegel, richting, over schouder'], ['مستقیم خط عوض می‌کنم', 'direct wisselen']], 0, 'سیستم ممکن است موتور یا ماشین سریع را نبیند. <b>خودت نگاه کن</b>.', 'CBR Rijprocedure B؛ RVV ماده ۵۴', P([I('blindspot'), I('mirror')]), 'dode hoek|blind spot'),
      ord('ترتیب درست تغییر خط را بچین.', 'Volgorde bij van rijstrook wisselen.', ['m', 'r', 's', 'g'], 'آینه، راهنما، نگاه از روی شانه (نقطهٔ کور)، رفتن.', 'RVV ماده ۵۴ و ۱۵', P([I('blindspot', 'over schouder', { hot: 's' }), I('mirror', 'spiegels', { hot: 'm' }), I('lane', 'wisselen', { hot: 'g' }), I('txt:richting', 'richting', { hot: 'r' })]), 'van rijstrook wisselen|changing lanes'),
      mul('ACC در کدام وضعیت‌ها ممکن است درست کار نکند؟', 'Wanneer werkt ACC minder goed?', [['باران شدید', 'zware regen'], ['حسگر کثیف', 'vuile sensor'], ['پیچ تند', 'scherpe bocht'], ['جادهٔ خشک و صاف در روز', 'droge weg overdag']], [0, 1, 2], 'در پیچ، رادار ممکن است ماشین جلو را گم کند.', 'CBR Rijprocedure B', P([I('rain'), I('sensor'), I('acc')], { cols: 3, h: 200 }), 'ACC|ACC')
    ]
  });

  /* ---------------- 6.4 rijhulpsystemen II ---------------- */
  L({ id: 'adas2', ch: 6, fa: 'سیستم‌های کمک‌راننده ۲', nl: 'Rijhulpsystemen (ADAS) 2', en: 'Driver assistance (ADAS) 2',
    cards: [
      C('کمک سرعت هوشمند', 'intelligente snelheidsassistent (ISA)', 'intelligent speed assistance',
        '<b>ISA</b> حداکثر سرعت را از تابلوها و نقشه می‌خواند و وقتی سریع‌تر می‌روی <b>هشدار</b> می‌دهد. در خودروهای نو از ژوئیهٔ ۲۰۲۴ اجباری است. هر بار با روشن شدن خودرو دوباره روشن می‌شود.', 'EU 2019/2144؛ CBR Rijprocedure B',
        P([I('isa'), S('A1-50')])),
      C('ISA ممکن است اشتباه کند', 'ISA kan zich vergissen', 'ISA can be wrong',
        'تابلو پشت درخت، تابلوی موقت کار جاده یا نقشهٔ قدیمی: ISA ممکن است سرعت <b>اشتباه</b> نشان دهد. <b>تابلوی واقعی</b> ملاک است.', 'RVV ماده ۶۳',
        P([I('isa', '80?'), S('A1-50', 'echt bord')])),
      C('محدودکنندهٔ سرعت', 'snelheidsbegrenzer', 'speed limiter',
        'با <b>limiter</b> خودت سقف سرعت را تعیین می‌کنی؛ ماشین از آن بیشتر نمی‌رود مگر پدال گاز را تا ته فشار دهی (kick-down).', 'CBR Rijprocedure B',
        P([I('cruise', 'limiter'), I('sp:50')])),
      C('حسگر پارک', 'parkeersensoren', 'parking sensors',
        'حسگرها با <b>بوق</b> نزدیک شدن به مانع را نشان می‌دهند. ولی چیزهای کوتاه یا باریک (تیر، بچهٔ کوچک، جدول کوتاه) را ممکن است نبینند. باز هم <b>اطراف را نگاه کن</b>.', 'CBR Rijprocedure B',
        P([I('sensor'), I('kid')])),
      C('دوربین عقب', 'achteruitrijcamera', 'reversing camera',
        'دوربین عقب کمک خوبی است ولی <b>همه چیز</b> را نشان نمی‌دهد (کنارها، بالا). در امتحان عملی هم باید از <b>آینه‌ها و نگاه مستقیم</b> استفاده کنی.', 'CBR Rijprocedure B',
        P([I('cam'), I('mirror')])),
      C('دستیار پارک خودکار', 'parkeerassistent', 'park assist',
        'دستیار پارک فرمان را می‌چرخاند؛ تو گاز، ترمز و <b>نگاه کردن</b> را انجام می‌دهی و هر لحظه آماده‌ای ترمز کنی.', 'CBR Rijprocedure B',
        P([I('park'), I('wheel')])),
      C('ترمز دستی برقی و Auto Hold', 'elektronische handrem', 'electronic parking brake',
        '<b>EPB</b> با یک دکمه فعال می‌شود. بعضی ماشین‌ها هنگام حرکت خودکار آزادش می‌کنند. <b>Auto Hold</b> ماشین را پشت چراغ نگه می‌دارد. بدان چراغ هشدارش چه شکلی است.', 'CBR Rijprocedure B',
        P([I('epb'), I('brake')])),
      C('هشدار خستگی', 'vermoeidheidsdetectie', 'driver drowsiness warning',
        'بعضی خودروها از فرمان و حرکت تو خستگی را تشخیص می‌دهند و فنجان قهوه نشان می‌دهند. این یعنی: <b>استراحت کن</b>.', 'EU 2019/2144',
        P([I('coffee'), I('sleep')]))
    ],
    qs: [
      mc('ISA نشان می‌دهد ۸۰، ولی تابلوی کنار جاده ۵۰ است. کدام معتبر است؟', 'ISA zegt 80, bord zegt 50.', [['تابلوی ۵۰', 'het bord: 50'], ['ISA: ۸۰', 'ISA: 80'], ['بیشترین عدد', 'de hoogste']], 0, '<b>تابلوی واقعی</b> ملاک قانون است.', 'RVV ماده ۶۳ و پیوست ۱ (A1)', P([I('isa', '80'), S('A1-50')]), 'snelheidsbord|speed sign'),
      yn('ISA در خودروهای نو اتحادیهٔ اروپا (از ژوئیهٔ ۲۰۲۴) اجباری است؟', 'Is ISA verplicht in nieuwe auto’s?', true, 'بله؛ طبق مقررات ایمنی عمومی اتحادیهٔ اروپا.', 'EU 2019/2144', P([I('isa')]), 'ISA|ISA'),
      yn('اگر ISA را خاموش کنی، بعد از روشن کردن دوبارهٔ ماشین هم خاموش می‌ماند؟', 'ISA uit: blijft het uit na herstarten?', false, 'ISA با هر بار روشن شدن خودرو <b>دوباره روشن</b> می‌شود.', 'EU 2019/2144', P([I('isa'), I('keys')]), 'ISA|ISA'),
      mc('حسگرهای پارک بوق نمی‌زنند. پس پشت سرت آزاد است؟', 'Sensoren piepen niet: vrij?', [['نه لزوماً؛ خودم نگاه می‌کنم', 'niet zeker; zelf kijken'], ['بله، کاملاً', 'ja']], 0, 'چیزهای کوتاه یا باریک ممکن است دیده نشوند.', 'CBR Rijprocedure B', P([I('sensor'), I('kid')]), 'parkeersensoren|parking sensors'),
      mc('هنگام دنده عقب با دوربین عقب، بهترین کار چیست؟', 'Achteruit met camera.', [['دوربین، آینه‌ها و نگاه مستقیم با هم', 'camera + spiegels + omkijken'], ['فقط دوربین', 'alleen camera'], ['فقط آینه‌ها', 'alleen spiegels']], 0, 'دوربین همهٔ زاویه‌ها را نشان نمی‌دهد.', 'CBR Rijprocedure B', P([I('cam'), I('mirror'), I('eye')], { cols: 3, h: 200 }), 'achteruitrijden|reversing'),
      mc('دستیار پارک خودکار روشن است. وظیفهٔ تو چیست؟', 'Parkeerassistent aan: jouw taak?', [['نگاه کردن و آماده بودن برای ترمز', 'opletten en klaar om te remmen'], ['هیچ', 'niets'], ['پیاده شدن', 'uitstappen']], 0, 'تو مسئولی.', 'CBR Rijprocedure B', P([I('park'), I('brake')]), 'parkeerassistent|park assist'),
      yn('با limiter روی ۵۰، اگر پدال گاز را تا ته فشار دهی ماشین می‌تواند سریع‌تر برود؟', 'Begrenzer 50, kick-down?', true, 'بله، در بیشتر خودروها kick-down limiter را موقتاً رد می‌کند.', 'CBR Rijprocedure B', P([I('cruise'), I('sp:50')]), 'snelheidsbegrenzer|speed limiter'),
      hot('کدام نماد یعنی «خستگی تشخیص داده شد، استراحت کن»؟', 'Welk symbool: pauze nemen?', 'b', 'فنجان قهوه = <b>استراحت</b>.', 'EU 2019/2144', P([I('abs', 'A', { hot: 'a' }), I('coffee', 'B', { hot: 'b' }), I('tpms', 'C', { hot: 'c' })], { cols: 3, h: 200 }), 'pauze|break'),
      mc('در امتحان عملی ممتحن از تو می‌خواهد cruise control را روشن کنی. چه می‌کنی؟', 'Examinator vraagt cruisecontrol aan te zetten.', [['وقتی ترافیک و سرعت مناسب است، روشنش می‌کنم و حواسم به ترافیک هست', 'aanzetten als het veilig is'], ['فوراً در هر شرایطی', 'meteen'], ['رد می‌کنم', 'weigeren']], 0, 'در CBR استفادهٔ <b>ایمن</b> و به‌موقع سیستم‌ها ارزیابی می‌شود.', 'CBR Rijprocedure B', P([I('cruise'), I('eye')]), 'rijhulpsystemen|ADAS'),
      mul('کدام سیستم‌ها کمک‌راننده (ADAS) هستند؟', 'Welke zijn rijhulpsystemen?', [['ACC', 'ACC'], ['lane assist', 'LKA'], ['حسگر پارک', 'parkeersensoren'], ['کمربند ایمنی', 'gordel']], [0, 1, 2], 'کمربند ایمنی «غیرفعال» است و کمک‌راننده نیست.', 'CBR Rijprocedure B', P([I('acc'), I('lane'), I('sensor'), I('belt')]), 'ADAS|ADAS')
    ]
  });

  /* ---------------- 6.5 milieu en zuinig rijden ---------------- */
  L({ id: 'milieu', ch: 6, fa: 'محیط زیست و رانندگی کم‌مصرف', nl: 'Milieu en zuinig rijden', en: 'Environment and eco-driving',
    cards: [
      C('زود دنده را بالا ببر', 'vroeg opschakelen', 'shift up early',
        'موتور در دور پایین کم‌مصرف‌تر است. <b>زود دنده عوض کن</b> (تقریباً بین ۲۰۰۰ تا ۲۵۰۰ دور) و با دندهٔ بالا آرام برو.', 'Het Nieuwe Rijden (CBR)',
        P([I('rpm'), I('gear')])),
      C('پیش‌بینی کن', 'vooruitzien', 'anticipate',
        'جلوتر را ببین. اگر چراغ قرمز است، <b>زود پا را از گاز بردار</b> و بگذار ماشین با دنده آهسته شود. ترمز و گاز ناگهانی سوخت هدر می‌دهد.', 'Het Nieuwe Rijden (CBR)',
        rd({ side: 'city', L: [{ d: 'dn' }, { d: 'up' }], marks: ['dash'], tl: [[90, 'red']], units: [{ id: 'you', ln: 1, y: 250 }] })),
      C('سرعت ثابت و کروز', 'constante snelheid', 'steady speed',
        'سرعت ثابت کم‌مصرف‌تر است. در بزرگراه <b>cruise control</b> کمک می‌کند. سرعت بالاتر = مصرف خیلی بیشتر (مقاومت هوا).', 'Het Nieuwe Rijden (CBR)',
        P([I('cruise'), I('eco')])),
      C('فشار باد لاستیک', 'bandenspanning', 'tyre pressure',
        'لاستیک کم‌باد <b>مصرف را بالا</b> می‌برد، ترمز را بدتر می‌کند و زودتر ساییده می‌شود. هر ماه فشار را چک کن (عدد در درِ راننده یا کتاب راهنما).', 'Het Nieuwe Rijden (CBR)',
        P([I('tyre'), I('tpms')])),
      C('بار و جعبهٔ سقفی', 'gewicht en dakkoffer', 'weight and roof box',
        'وزن اضافه و <b>جعبهٔ سقفی</b> یا باربند خالی مصرف را بیشتر می‌کنند. وقتی لازم نیست برشان دار.', 'Het Nieuwe Rijden (CBR)',
        P([I('roofbox'), I('load')])),
      C('موتور خاموش', 'motor uit bij stilstand', 'engine off',
        'در توقف طولانی (مثلاً پل متحرک باز است یا قطار رد می‌شود) <b>موتور را خاموش</b> کن. بسیاری از ماشین‌ها <b>start-stop</b> دارند.', 'Het Nieuwe Rijden (CBR)',
        P([I('keys'), I('bridge_r')])),
      C('کولر و برق', 'airco en stroomverbruik', 'air-con and power use',
        'کولر و گرم‌کن شیشهٔ عقب انرژی مصرف می‌کنند؛ وقتی لازم نیستند خاموششان کن. ولی برای <b>دید خوب</b> (شیشهٔ بخارگرفته) حتماً استفاده کن.', 'Het Nieuwe Rijden (CBR)',
        P([I('window'), I('eco')])),
      C('خودروی برقی', 'elektrische auto', 'electric car',
        'خودروی برقی تقریباً <b>بی‌صدا</b> است؛ پیاده‌ها و دوچرخه‌سوارها ممکن است تو را نشنوند. با پیش‌بینی، ترمز احیاکننده (regeneratief remmen) باتری را شارژ می‌کند.', 'RVV ماده ۵؛ Het Nieuwe Rijden',
        P([I('plug'), I('ped')]))
    ],
    qs: [
      mc('کدام روش کم‌مصرف‌تر است؟', 'Wat is zuiniger?', [['زود دنده بالا بردن و دور پایین', 'vroeg opschakelen'], ['دور بالا در دندهٔ پایین', 'hoge toeren'], ['گاز و ترمز زیاد', 'veel gas en remmen']], 0, 'دور پایین با دندهٔ بالا کم‌مصرف‌تر است.', 'Het Nieuwe Rijden (CBR)', P([I('rpm'), I('gear')]), 'opschakelen|shifting up'),
      mc('چراغ جلوتر قرمز است. کم‌مصرف‌ترین کار چیست؟', 'Rood licht verderop.', [['زود پا را از گاز برمی‌دارم و می‌گذارم ماشین با دنده آهسته شود', 'gas los, uitrollen in de versnelling'], ['تا چراغ گاز می‌دهم و بعد ترمز می‌کنم', 'doorrijden en hard remmen'], ['خلاص می‌کنم', 'in z’n vrij']], 0, 'در دنده، بدون گاز، موتورهای امروزی <b>سوخت مصرف نمی‌کنند</b>.', 'Het Nieuwe Rijden (CBR)', rd({ side: 'city', L: [{ d: 'dn' }, { d: 'up' }], marks: ['dash'], tl: [[90, 'red']], units: [{ id: 'you', ln: 1, y: 250 }] }), 'uitrollen|coasting'),
      yn('لاستیک کم‌باد مصرف سوخت را بیشتر می‌کند؟', 'Zachte banden: meer verbruik?', true, 'بله، و ترمز هم بدتر می‌شود.', 'Het Nieuwe Rijden (CBR)', P([I('tyre')]), 'bandenspanning|tyre pressure'),
      yn('جعبهٔ سقفی خالی روی ماشین مصرف را بیشتر می‌کند؟', 'Lege dakkoffer: meer verbruik?', true, 'بله؛ مقاومت هوا بیشتر می‌شود.', 'Het Nieuwe Rijden (CBR)', P([I('roofbox')]), 'dakkoffer|roof box'),
      mc('پل متحرک باز شده و چند دقیقه باید صبر کنی. چه می‌کنی؟', 'Brug open, minuten wachten.', [['موتور را خاموش می‌کنم', 'motor uit'], ['موتور روشن می‌ماند', 'motor aan'], ['گاز می‌دهم تا موتور گرم بماند', 'gas geven']], 0, 'در توقف طولانی موتور را خاموش کن.', 'Het Nieuwe Rijden (CBR)', P([I('bridge_r'), I('keys')]), 'motor uit|engine off'),
      mc('چرا در بزرگراه با ۱۳۰ مصرف خیلی بیشتر از ۱۰۰ است؟', 'Waarom meer verbruik bij 130?', [['مقاومت هوا با سرعت خیلی بیشتر می‌شود', 'luchtweerstand'], ['لاستیک‌ها سنگین‌تر می‌شوند', 'zwaardere banden'], ['موتور سرد می‌شود', 'koude motor']], 0, 'مقاومت هوا تقریباً با <b>مربع سرعت</b> بالا می‌رود.', 'Het Nieuwe Rijden (CBR)', P([I('sp:130'), I('wind')]), 'luchtweerstand|air resistance'),
      mc('با خودروی برقی آرام در erf می‌روی. به چه چیزی بیشتر توجه می‌کنی؟', 'Elektrische auto in een erf.', [['پیاده‌ها و بچه‌ها ممکن است مرا نشنوند', 'voetgangers horen je niet'], ['باتری', 'de accu'], ['رادیو', 'radio']], 0, 'خودروی برقی بی‌صداست؛ بیشتر <b>پیش‌بینی</b> کن.', 'RVV ماده ۵ و ۴۵', P([I('plug'), I('kid'), S('G5')], { cols: 3, h: 200 }), 'elektrische auto|electric car'),
      mul('کدام‌ها مصرف سوخت را کم می‌کنند؟', 'Wat bespaart brandstof?', [['پیش‌بینی ترافیک', 'vooruitzien'], ['فشار باد درست', 'juiste bandenspanning'], ['برداشتن بار اضافه', 'geen extra gewicht'], ['گرم کردن موتور با دور بالا در جا', 'stationair warm laten draaien']], [0, 1, 2], 'گرم کردن در جا فقط سوخت هدر می‌دهد؛ آرام حرکت کن.', 'Het Nieuwe Rijden (CBR)', P([I('eye'), I('tyre'), I('load'), I('rpm')]), 'zuinig rijden|eco-driving'),
      yn('برای اینکه شیشه بخار نگیرد استفاده از کولر قابل قبول است؟', 'Airco tegen beslagen ruiten?', true, 'بله. <b>دید خوب</b> مهم‌تر از چند قطره سوخت است.', 'RVV ماده ۵', P([I('window'), I('eye')]), 'beslagen ruiten|misted windows')
    ]
  });
})();
