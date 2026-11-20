/* Chapter 7 — Wetgeving. WVW 1994 (art. 7 ongeval, art. 30 WAM-verzekering via WAM art. 2, art. 107 rijbewijs),
   Reglement rijbewijzen, RVV 1990 art. 59 (gordels en kinderen), CBR-informatie over examens en beginnersregeling. */
(function () {
  const { C, mc, yn, num, hot, ord, mul, anim, L, pic } = RW.h;
  const rd = o => Object.assign({ type: 'road' }, o), P = (t, o) => pic(t, o);
  const S = (s, c, x) => Object.assign({ s: s, c: c }, x || {}), I = (i, c, x) => Object.assign({ i: i, c: c }, x || {});

  /* ---------------- 7.1 rijbewijs B ---------------- */
  L({ id: 'rijbew', ch: 7, fa: 'گواهینامهٔ B', nl: 'Rijbewijs B', en: 'Driving licence B',
    cards: [
      C('با B چه می‌توانی برانی؟', 'rijbewijs B', 'licence B',
        'خودرویی با <b>حداکثر جرم مجاز ۳۵۰۰ کیلوگرم</b> و حداکثر <b>۸ سرنشین</b> به‌جز راننده. با B می‌توانی موتور گازی (AM) هم برانی.', 'Reglement rijbewijzen؛ WVW 1994 ماده ۱۰۷',
        P([I('car'), I('txt:3500 kg'), I('txt:8 + 1')], { cols: 3, h: 200 })),
      C('سن', 'leeftijd', 'age',
        'گواهینامهٔ B از <b>۱۸ سالگی</b>. با <b>2toDrive</b> از ۱۷ سالگی می‌توانی امتحان بدهی و تا ۱۸ سالگی فقط با <b>همراه (coach)</b> ثبت‌شده رانندگی کنی.', 'WVW 1994 ماده ۱۱۱؛ CBR 2toDrive',
        P([I('license', '18'), I('txt:17 + coach')])),
      C('امتحان تئوری', 'theorie-examen', 'theory exam',
        'امتحان تئوری CBR سه بخش دارد: <b>خطرشناسی</b>، <b>دانش قوانین</b>، <b>درک ترافیک</b>. نتیجهٔ قبولی <b>۱٫۵ سال</b> معتبر است؛ در این مدت باید امتحان عملی را قبول شوی.', 'CBR: theorie-examen auto',
        P([I('check'), I('clock', '1,5 jaar')])),
      C('امتحان عملی', 'praktijkexamen', 'practical exam',
        'در امتحان عملی ممتحن رانندگی ایمن، رعایت قانون، <b>نگاه کردن</b>، مانورها (مثلاً پارک) و استفاده از <b>سیستم‌های کمک‌راننده</b> را می‌بیند. بخشی را هم خودت با ناوبری یا تابلوها پیدا می‌کنی (zelfstandig rijden).', 'CBR Rijprocedure B',
        P([I('wheel'), I('eye'), I('park')], { cols: 3, h: 200 })),
      C('رانندهٔ تازه‌کار', 'beginnersrijbewijs', 'novice licence',
        '۵ سال اول (۷ سال اگر AM/T را قبل از ۱۸ گرفتی) گواهینامهٔ تازه‌کار داری: حد الکل <b>0,2 ‰</b> و <b>سیستم امتیاز</b>. برای تخلف‌های جدی (مثلاً چسبیدن به ماشین جلو، سرعت خیلی زیاد، ایجاد خطر) یک <b>امتیاز منفی</b> ثبت می‌شود. با <b>دو امتیاز</b> باید گواهینامه را تحویل بدهی؛ CBR مهارت رانندگی‌ات را آزمایش می‌کند و اگر رد شوی گواهینامه باطل می‌شود.', 'WVW 1994 ماده ۸ و ۱۲۳b (puntenstelsel)',
        P([I('license'), I('warn', '2 punten')])),
      C('اعتبار و تمدید', 'geldigheid', 'validity',
        'گواهینامهٔ B معمولاً <b>۱۰ سال</b> معتبر است. در سن بالا (حدود ۷۵ سال) برای تمدید باید <b>اظهارنامهٔ سلامتی</b> (Gezondheidsverklaring) بدهی. با گواهینامهٔ منقضی رانندگی نکن.', 'Reglement rijbewijzen',
        P([I('license'), I('clock', '10 jaar')])),
      C('سلامتی و دید', 'rijgeschiktheid', 'fitness to drive',
        'اگر به عینک نیاز داری، روی گواهینامه <b>کد ۰۱</b> می‌آید و باید هنگام رانندگی عینک یا لنز بزنی. بیماری‌ای که روی رانندگی اثر دارد را باید جدی بگیری (CBR).', 'Reglement rijbewijzen (code 01)',
        P([I('glasses', 'code 01'), I('license')])),
      C('ضبط و تعلیق گواهینامه', 'invordering', 'licence seizure',
        'پلیس می‌تواند در تخلف خیلی جدی (مثلاً الکل زیاد یا سرعت خیلی بالا) گواهینامه را <b>همان‌جا ضبط</b> کند (invorderen). بدون گواهینامهٔ معتبر رانندگی نکن.', 'WVW 1994 ماده ۱۶۴',
        P([I('police'), I('license')]))
    ],
    qs: [
      num('با گواهینامهٔ B حداکثر جرم مجاز خودرو چند کیلوگرم است؟', 'Max. toegestane massa rijbewijs B (kg)?', 3500, '<b>۳۵۰۰ کیلوگرم</b>.', 'Reglement rijbewijzen', P([I('car'), I('txt:? kg')]), 'toegestane maximummassa|maximum mass'),
      num('با گواهینامهٔ B حداکثر چند سرنشین (به‌جز راننده) می‌توانی ببری؟', 'Max. passagiers rijbewijs B?', 8, '<b>۸ سرنشین</b> به‌جز راننده.', 'Reglement rijbewijzen', P([I('van'), I('txt:? + 1')]), 'passagiers|passengers'),
      yn('با 2toDrive و ۱۷ سالگی تنها رانندگی کنی؟', '2toDrive, 17 jaar: alleen rijden?', false, 'تا ۱۸ سالگی فقط با <b>coach</b> ثبت‌شده.', 'WVW 1994 ماده ۱۱۱ و CBR 2toDrive', P([I('license', '17'), I('cross')]), '2toDrive|2toDrive'),
      mc('نتیجهٔ امتحان تئوری چقدر معتبر است؟', 'Hoe lang is je theoriecertificaat geldig?', [['۱٫۵ سال', '1,5 jaar'], ['۶ ماه', '6 maanden'], ['۵ سال', '5 jaar']], 0, '<b>۱٫۵ سال</b>.', 'CBR: theorie-examen auto', P([I('check'), I('clock')]), 'theoriecertificaat|theory certificate'),
      num('رانندهٔ تازه‌کار با چند امتیاز منفی باید گواهینامه‌اش را تحویل بدهد؟', 'Bij hoeveel strafpunten lever je je beginnersrijbewijs in?', 2, 'با <b>دو امتیاز</b>؛ بعد CBR مهارت رانندگی را آزمایش می‌کند.', 'WVW 1994 ماده ۱۲۳b', P([I('warn'), I('license')]), 'puntenstelsel|points system'),
      yn('روی گواهینامه‌ات کد ۰۱ هست. می‌توانی بدون عینک یا لنز برانی؟', 'Code 01: zonder bril rijden?', false, 'کد ۰۱ یعنی باید <b>عینک یا لنز</b> بزنی.', 'Reglement rijbewijzen', P([I('glasses', '01')]), 'code 01|code 01'),
      mc('کدام بخش جزو امتحان تئوری CBR <b>نیست</b>؟', 'Wat hoort niet bij het theorie-examen?', [['امتحان پارک کردن', 'parkeren'], ['خطرشناسی', 'gevaarherkenning'], ['دانش قوانین', 'kennis'], ['درک ترافیک', 'inzicht']], 0, 'پارک کردن در <b>امتحان عملی</b> است.', 'CBR: theorie-examen auto', P([I('check'), I('park')]), 'theorie-examen|theory exam'),
      yn('با گواهینامهٔ B می‌توانی موتور گازی (bromfiets) برانی؟', 'Met B op een bromfiets?', true, 'بله؛ B شامل <b>AM</b> هم هست (در هلند).', 'Reglement rijbewijzen', P([I('moped'), I('license')]), 'bromfiets|moped'),
      mc('گواهینامهٔ تو دیروز منقضی شده. امروز چه می‌کنی؟', 'Rijbewijs gisteren verlopen.', [['رانندگی نمی‌کنم و تمدیدش می‌کنم', 'niet rijden, verlengen'], ['یک هفته فرصت دارم', 'nog een week'], ['فقط در شهر می‌رانم', 'alleen in de stad']], 0, 'گواهینامهٔ منقضی <b>معتبر نیست</b>.', 'WVW 1994 ماده ۱۰۷', P([I('license'), I('clock')]), 'verlopen rijbewijs|expired licence'),
      mul('در امتحان عملی چه چیزهایی ارزیابی می‌شوند؟', 'Wat wordt beoordeeld bij het praktijkexamen?', [['نگاه کردن و توجه', 'kijken'], ['مانورها', 'bijzondere verrichtingen'], ['استفاده از سیستم‌های کمک‌راننده', 'rijhulpsystemen'], ['دانش موتور خودرو با جزئیات فنی', 'motortechniek']], [0, 1, 2], 'تمرکز امتحان عملی روی رانندگی ایمن است.', 'CBR Rijprocedure B', P([I('eye'), I('park'), I('acc')], { cols: 3, h: 200 }), 'praktijkexamen|practical exam')
    ]
  });

  /* ---------------- 7.2 papieren en verzekering ---------------- */
  L({ id: 'papier', ch: 7, fa: 'مدارک و بیمه', nl: 'Papieren en verzekering', en: 'Documents and insurance',
    cards: [
      C('گواهینامه همراهت باشد', 'rijbewijs bij je', 'carry your licence',
        'هنگام رانندگی باید <b>گواهینامه</b> همراهت باشد و اگر پلیس خواست نشان بدهی.', 'WVW 1994 ماده ۱۰۷ بند ۲',
        P([I('license'), I('police')])),
      C('کارت پلاک', 'kentekencard', 'registration card',
        'مدرک ثبت خودرو در هلند <b>kentekencard</b> است (دو بخش: کارت و کد). داشتنش در ماشین <b>اجباری نیست</b>، ولی برای سفر خارج یا فروش لازم است.', 'RDW: kentekencard',
        P([I('kcard'), I('plate')])),
      C('بیمهٔ شخص ثالث اجباری', 'WA-verzekering', 'third-party insurance',
        'هر خودرویی که پلاک دارد باید <b>بیمهٔ WA</b> (مسئولیت در برابر دیگران) داشته باشد؛ حتی وقتی پارک است و استفاده نمی‌شود (مگر پلاک را تعلیق کنی).', 'WAM ماده ۲ و ۳۰',
        P([I('shield', 'WA'), I('car')])),
      C('انواع بیمه', 'WA, beperkt casco, allrisk', 'insurance types',
        '<b>WA</b>: خسارتی که تو به دیگران می‌زنی. <b>beperkt casco</b>: به‌علاوه دزدی، شکستن شیشه، طوفان. <b>allrisk</b>: به‌علاوه خسارت ماشین خودت حتی اگر مقصر باشی.', 'WAM ماده ۳',
        P([I('shield', 'WA'), I('shield', 'casco'), I('shield', 'allrisk')], { cols: 3, h: 200 })),
      C('APK', 'APK', 'periodic inspection',
        'خودروهای چند ساله باید هر مدت <b>بازرسی فنی APK</b> بشوند. بدون APK معتبر رانندگی در جاده ممنوع است. تاریخ آن را در سایت RDW ببین.', 'WVW 1994 ماده ۷۲',
        P([I('apk'), I('wrench')])),
      C('پلاک', 'kenteken', 'number plate',
        'پلاک باید <b>تمیز و خوانا</b> باشد و جلو و عقب نصب شود. پلاک زرد = خودروی هلندی عادی.', 'WVW 1994 ماده ۴۱ و Regeling voertuigen',
        P([I('plate'), I('check')])),
      C('مالیات خودرو', 'motorrijtuigenbelasting', 'road tax',
        'صاحب پلاک باید <b>مالیات خودرو</b> (wegenbelasting) بپردازد؛ مقدارش به وزن، سوخت و استان بستگی دارد.', 'Wet op de motorrijtuigenbelasting 1994',
        P([I('euro'), I('car')])),
      C('در خارج از کشور', 'naar het buitenland', 'abroad',
        'برای سفر به خارج: گواهینامه، <b>kentekencard</b>، کارت بیمهٔ سبز (groene kaart) و قانون‌های همان کشور (مثلاً جلیقه یا مثلث اجباری).', 'WAM؛ قوانین کشور مقصد',
        P([I('kcard'), I('vest'), I('triangle')], { cols: 3, h: 200 }))
    ],
    qs: [
      yn('هنگام رانندگی باید گواهینامه همراهت باشد؟', 'Rijbewijs verplicht bij je?', true, 'بله، و نشان دادنش به پلیس.', 'WVW 1994 ماده ۱۰۷ بند ۲', P([I('license')]), 'rijbewijs|licence'),
      yn('kentekencard باید همیشه داخل ماشین باشد؟', 'Kentekencard verplicht in de auto?', false, 'اجباری نیست؛ ولی در خارج و هنگام فروش لازم است.', 'RDW: kentekencard', P([I('kcard')]), 'kentekencard|registration card'),
      mc('کدام بیمه <b>قانوناً اجباری</b> است؟', 'Welke verzekering is verplicht?', [['WA', 'WA'], ['allrisk', 'allrisk'], ['beperkt casco', 'beperkt casco']], 0, 'فقط <b>WA</b> اجباری است.', 'WAM ماده ۲', P([I('shield', 'WA')]), 'WA-verzekering|third-party insurance'),
      mc('ماشین تو فقط WA دارد. خودت به یک دیوار زدی. خسارت ماشین خودت را چه کسی می‌دهد؟', 'Alleen WA, zelf tegen een muur.', [['خودم', 'ik zelf'], ['بیمهٔ WA', 'de WA-verzekering'], ['شهرداری', 'gemeente']], 0, 'WA فقط خسارت <b>دیگران</b> را می‌دهد (این‌جا دیوار).', 'WAM ماده ۳', P([I('shield', 'WA'), I('car')]), 'WA-verzekering|third-party insurance'),
      yn('ماشینی که پلاک دارد ولی چند ماه پارک است، باید بیمهٔ WA داشته باشد؟', 'Geparkeerde auto met kenteken: WA verplicht?', true, 'بله، مگر پلاک را <b>تعلیق</b> (schorsen) کنی.', 'WAM ماده ۲ و ۳۰', P([I('park'), I('shield')]), 'WA-verzekering|third-party insurance'),
      yn('APK ماشین تو دیروز تمام شده. اجازه داری امروز در جاده برانی؟', 'APK gisteren verlopen: mag je rijden?', false, 'بدون APK معتبر رانندگی در جادهٔ عمومی <b>ممنوع</b> است.', 'WVW 1994 ماده ۷۲', P([I('apk'), I('clock')]), 'APK|MOT'),
      mc('پلاک عقب ماشین تو زیر گل پوشیده شده است. چه می‌کنی؟', 'Kenteken vol modder.', [['تمیزش می‌کنم', 'schoonmaken'], ['مهم نیست', 'maakt niet uit']], 0, 'پلاک باید <b>خوانا</b> باشد.', 'Regeling voertuigen', P([I('plate'), I('water')]), 'kenteken|number plate'),
      mul('برای سفر با ماشین به خارج چه چیزهایی همراه می‌بری؟', 'Wat neem je mee naar het buitenland?', [['گواهینامه', 'rijbewijs'], ['kentekencard', 'kentekencard'], ['کارت سبز بیمه', 'groene kaart'], ['APK برگه کاغذی', 'APK-papier']], [0, 1, 2], 'APK به‌صورت آنلاین ثبت است و برگه لازم نیست.', 'WAM؛ RDW', P([I('license'), I('kcard'), I('shield')], { cols: 3, h: 200 }), 'buitenland|abroad'),
      mc('کدام بیمه شکستن شیشه و دزدی را پوشش می‌دهد ولی نه خسارت تصادفی که خودت مقصری؟', 'Welke dekt ruitschade en diefstal?', [['beperkt casco', 'beperkt casco'], ['WA', 'WA'], ['هیچ‌کدام', 'geen']], 0, 'beperkt casco = WA + دزدی، شیشه، طوفان.', 'شرایط بیمه (عمومی)', P([I('shield', 'casco'), I('window')]), 'beperkt casco|limited cover')
    ]
  });

  /* ---------------- 7.3 gordels en kinderen ---------------- */
  L({ id: 'gordel', ch: 7, fa: 'کمربند و کودکان', nl: 'Gordels en kinderen', en: 'Seat belts and children',
    cards: [
      C('همه کمربند می‌بندند', 'gordelplicht', 'belts for everyone',
        'راننده و همهٔ سرنشین‌ها، جلو و <b>عقب</b>، باید کمربند موجود را ببندند.', 'RVV ماده ۵۹ بند ۱',
        P([I('belt'), I('rearseat')])),
      C('کودک کوتاه‌تر از ۱٫۳۵ متر', 'kinderzitje onder 1,35 m', 'child seat under 1.35 m',
        'کودک زیر ۱۸ سال و <b>کوتاه‌تر از ۱٫۳۵ متر</b> باید در <b>صندلی کودک تأییدشده</b> (برچسب ECE/R129) و مناسب قد و وزنش بنشیند.', 'RVV ماده ۵۹ بند ۱',
        P([I('childseat'), I('ruler', '1,35 m')])),
      C('صندلی رو به عقب و ایربگ', 'achterwaarts zitje en airbag', 'rear-facing seat and airbag',
        'صندلی کودک <b>رو به عقب</b> روی صندلی جلو فقط وقتی مجاز است که <b>ایربگ جلو خاموش</b> باشد. باز شدن ایربگ می‌تواند کودک را به‌شدت مجروح کند.', 'RVV ماده ۵۹ بند ۳',
        P([I('childseat', 'achterwaarts'), I('airbag', 'UIT')])),
      C('هر نفر یک کمربند', 'niet meer personen dan gordels', 'one belt per person',
        'روی صندلی‌هایی که کمربند دارند، <b>بیشتر از تعداد کمربندها</b> سرنشین نبر. دو بچه با یک کمربند ممنوع است.', 'RVV ماده ۵۹ بند ۱',
        P([I('belt', '1'), I('kid', '1')])),
      C('مسئولیت راننده', 'verantwoordelijkheid bestuurder', 'driver’s responsibility',
        'راننده مسئول است که سرنشین‌های <b>زیر ۱۲ سال</b> درست بسته شده باشند. سرنشین ۱۲ سال و بالاتر خودش مسئول کمربند خودش است.', 'RVV ماده ۵۹ بند ۸',
        P([I('kid', '< 12'), I('wheel')])),
      C('ماشین قدیمی بدون کمربند', 'auto zonder gordels', 'old car without belts',
        'در ماشینی که کمربند یا صندلی کودک ندارد: کودک <b>زیر ۳ سال</b> را اصلاً نبر؛ کودک ۳ سال به بالا و کوتاه‌تر از ۱٫۳۵ متر فقط روی <b>صندلی عقب</b>.', 'RVV ماده ۵۹ بند ۲',
        P([I('car'), I('kid', '3+'), I('rearseat')], { cols: 3, h: 200 })),
      C('تاکسی', 'taxi', 'taxi',
        'در تاکسی بدون صندلی کودک، کودک کوتاه‌تر از ۱٫۳۵ متر باید <b>عقب</b> بنشیند (با کمربند).', 'RVV ماده ۵۹ بند ۵',
        P([I('car', 'taxi'), I('rearseat')])),
      C('کمربند درست', 'gordel goed dragen', 'wear it correctly',
        'کمربند <b>روی شانه</b> (نه زیر بغل یا پشت) و <b>پایین روی لگن</b>، بدون شل بودن. پشتی صندلی را خیلی خوابیده نکن.', 'RVV ماده ۵۹ بند ۷',
        P([I('belt'), I('check')]))
    ],
    qs: [
      yn('سرنشین بزرگسال صندلی عقب باید کمربند ببندد؟', 'Moet een volwassene achterin de gordel dragen?', true, 'بله؛ <b>همه</b>، جلو و عقب.', 'RVV ماده ۵۹ بند ۱', P([I('rearseat'), I('belt')]), 'gordelplicht|seat belt duty'),
      num('کودک کوتاه‌تر از چند سانتی‌متر باید در صندلی کودک بنشیند؟', 'Kinderzitje tot welke lengte (cm)?', 135, '<b>۱۳۵ سانتی‌متر</b> (۱٫۳۵ متر).', 'RVV ماده ۵۹ بند ۱', P([I('childseat'), I('ruler')]), 'kinderzitje|child seat'),
      mc('صندلی کودک رو به عقب را جلو می‌گذاری. چه کار باید بکنی؟', 'Achterwaarts zitje voorin.', [['ایربگ جلو را خاموش می‌کنم', 'airbag uitzetten'], ['صندلی را جلوتر می‌کشم', 'stoel naar voren'], ['هیچ کار', 'niets']], 0, 'با ایربگ روشن <b>ممنوع</b> است.', 'RVV ماده ۵۹ بند ۳', P([I('childseat'), I('airbag')]), 'airbag|airbag'),
      mc('دخترت ۹ ساله است و قدش ۱٫۳۰ متر. کدام درست است؟', 'Kind 9 jaar, 1,30 m.', [['باید صندلی یا بوستر مناسب داشته باشد', 'kinderzitje/zittingverhoger'], ['فقط کمربند کافی است چون بالای ۸ سال است', 'alleen gordel'], ['می‌تواند بدون کمربند عقب بنشیند', 'zonder gordel']], 0, 'ملاک <b>قد</b> است: زیر ۱٫۳۵ متر.', 'RVV ماده ۵۹ بند ۱', P([I('kid', '1,30 m'), I('childseat')]), 'kinderzitje|child seat'),
      yn('پسر ۱۵ ساله‌ات کمربند نبسته است. تو به‌عنوان راننده جریمه می‌شوی؟', '15-jarige zonder gordel: is de bestuurder verantwoordelijk?', false, 'از ۱۲ سالگی سرنشین <b>خودش</b> مسئول است. ولی همیشه بگو ببندد!', 'RVV ماده ۵۹ بند ۸', P([I('belt'), I('kid', '15')]), 'gordelplicht|seat belt duty'),
      yn('عقب ماشین سه کمربند دارد. اجازه داری چهار بچه را عقب ببری؟', 'Drie gordels, vier kinderen achterin?', false, 'نه بیشتر از <b>تعداد کمربندها</b>.', 'RVV ماده ۵۹ بند ۱', P([I('rearseat', '3'), I('kid', '4')]), 'gordels|belts'),
      mc('با یک ماشین کلاسیک بدون کمربند عقب، می‌خواهی بچهٔ ۲ ساله را ببری. کدام درست است؟', 'Oldtimer zonder gordels, kind van 2.', [['اجازه نداری او را ببری', 'niet vervoeren'], ['جلو روی پای مادر', 'voorin op schoot'], ['عقب بدون صندلی', 'achterin los']], 0, 'زیر ۳ سال در ماشین بدون کمربند یا صندلی کودک <b>ممنوع</b> است.', 'RVV ماده ۵۹ بند ۲', P([I('car'), I('kid', '2')]), 'vervoer kinderen|carrying children'),
      hot('روی تصویری بزن که کمربند <b>درست</b> بسته شده است.', 'Waar zit de gordel goed?', 'a', 'روی شانه و پایین روی لگن.', 'RVV ماده ۵۹ بند ۷', P([I('belt', 'schouder + heup', { hot: 'a' }), I('cross', 'onder de arm', { hot: 'b' })]), 'gordel|seat belt'),
      mc('یک بچهٔ ۶ ساله (۱٫۱۵ متر) با تاکسی بدون صندلی کودک سفر می‌کند. کجا بنشیند؟', 'Kind in taxi zonder zitje.', [['عقب با کمربند', 'achterin met gordel'], ['جلو', 'voorin'], ['هر جا', 'maakt niet uit']], 0, 'در تاکسی بدون صندلی کودک: <b>عقب</b>.', 'RVV ماده ۵۹ بند ۵', P([I('car', 'taxi'), I('rearseat')]), 'taxi|taxi')
    ]
  });

  /* ---------------- 7.4 ongevallen ---------------- */
  L({ id: 'ongeval', ch: 7, fa: 'تصادف و کمک‌های اولیه', nl: 'Ongevallen en eerste hulp', en: 'Accidents and first aid',
    cards: [
      C('فرار ممنوع', 'doorrijden na ongeval verboden', 'no hit-and-run',
        'اگر در تصادفی <b>درگیر</b> بودی که کسی زخمی شده یا خسارتی وارد شده، <b>حق نداری بروی</b> تا هویت تو مشخص شود (یا اگر کسی زخمی است، کمک برسد).', 'WVW 1994 ماده ۷',
        P([I('first'), I('cross')])),
      C('اول امنیت', 'eerst veiligheid', 'safety first',
        '<b>چراغ‌های خطر</b> را روشن کن، <b>جلیقهٔ شب‌رنگ</b> بپوش، در بزرگراه پشت گاردریل برو. مثلث هشدار را اگر داری فاصلهٔ کافی پشت ماشین بگذار (در بزرگراه نه).', 'RVV ماده ۵ و ۴۳؛ ANWB',
        P([I('hazard'), I('vest'), I('triangle')], { cols: 3, h: 200 })),
      C('۱۱۲', 'alarmnummer 112', 'emergency 112',
        'وقتی کسی <b>زخمی</b> است یا خطر فوری هست (آتش، مسدود شدن جاده)، با <b>۱۱۲</b> تماس بگیر. بگو کجا هستی (شمارهٔ جاده، hectometerpaaltje)، چند نفر زخمی‌اند.', 'هلند: 112',
        P([I('phone112'), I('amb')])),
      C('کمک‌های اولیه', 'eerste hulp', 'first aid',
        'زخمی را <b>جابه‌جا نکن</b> مگر خطر فوری باشد (آتش، ترافیک). او را <b>گرم</b> نگه دار، با او حرف بزن، و اگر نفس نمی‌کشد CPR را شروع کن و به 112 بگو.', 'Rode Kruis: eerste hulp',
        P([I('first'), I('amb')])),
      C('فرم تصادف', 'Europees schadeformulier', 'accident report form',
        'در تصادف فقط با خسارت مالی: <b>فرم اروپایی خسارت</b> را با طرف مقابل پر کن، عکس بگیر، اطلاعات شاهدها را بنویس. اگر توافق ندارید، چیزی را که درست نیست امضا نکن.', 'WVW 1994 ماده ۷؛ بیمه',
        P([I('info', 'formulier'), I('cam')])),
      C('پلیس کی؟', 'politie bellen', 'when to call the police',
        'وقتی زخمی هست، طرف مقابل فرار کرده یا مشکوک به الکل است، یا ماشین جاده را بسته است، پلیس را خبر کن (فوری: 112، غیرفوری: 0900-8844).', 'WVW 1994 ماده ۷',
        P([I('police'), I('phone112')])),
      C('خسارت به ماشین پارک‌شده', 'schade aan geparkeerde auto', 'damage to a parked car',
        'اگر به ماشین پارک‌شده‌ای زدی و صاحبش نیست: <b>نامت و اطلاعاتت</b> را بگذار و به پلیس خبر بده. رفتن بدون این کار <b>فرار</b> است.', 'WVW 1994 ماده ۷',
        P([I('car'), I('info')])),
      C('امداد در بزرگراه', 'hulpdiensten op de snelweg', 'emergency services on the motorway',
        'وقتی آمبولانس یا آتش‌نشانی با <b>آژیر و چراغ آبی</b> می‌آید، فوراً راه باز کن. در صف ترافیک بزرگراه بین خط‌ها راه <b>امداد</b> (reddingsstrook) باز بگذار.', 'RVV ماده ۵۰ و ۹۱',
        P([I('amb'), I('siren')]))
    ],
    qs: [
      yn('در یک تصادف کوچک فقط سپر ماشین دیگر خراشیده شد. می‌توانی بدون دادن اطلاعات بروی؟', 'Kleine schade: mag je zonder gegevens weg?', false, 'بدون مشخص کردن هویت رفتن <b>ممنوع</b> است.', 'WVW 1994 ماده ۷', P([I('car2'), I('info')]), 'doorrijden na ongeval|hit-and-run'),
      ord('بعد از تصادف در جاده، ترتیب درست را بچین.', 'Volgorde na een ongeval.', ['s', 'c', 'h'], '۱ ایمن کردن محل، ۲ تماس با 112، ۳ کمک به زخمی.', 'WVW 1994 ماده ۷؛ Rode Kruis', P([I('first', 'helpen', { hot: 'h' }), I('hazard', 'veilig maken', { hot: 's' }), I('phone112', '112', { hot: 'c' })], { cols: 3, h: 200 }), 'ongeval|accident'),
      num('شمارهٔ اضطراری در هلند و اروپا چیست؟', 'Alarmnummer?', 112, '<b>112</b>.', 'هلند: 112', P([I('phone112')]), 'alarmnummer|emergency number'),
      mc('زخمی‌ای در ماشین نشسته، هوشیار است و آتشی نیست. چه می‌کنی؟', 'Gewonde in de auto, geen gevaar.', [['او را جابه‌جا نمی‌کنم، گرمش نگه می‌دارم و 112 می‌زنم', 'niet verplaatsen, 112'], ['فوراً از ماشین بیرونش می‌کشم', 'eruit trekken'], ['به او آب می‌دهم', 'water geven']], 0, 'جابه‌جا کردن ممکن است آسیب ستون فقرات را بدتر کند.', 'Rode Kruis: eerste hulp', P([I('first'), I('phone112')]), 'eerste hulp|first aid'),
      mc('در بزرگراه تصادف کردی و ماشین‌ها هنوز حرکت می‌کنند. کجا منتظر می‌مانی؟', 'Waar wacht je op de snelweg?', [['پشت گاردریل', 'achter de vangrail'], ['داخل ماشین', 'in de auto'], ['کنار ماشین در خط اضطراری', 'naast de auto']], 0, 'بیرون از جاده، <b>پشت گاردریل</b>.', 'RVV ماده ۴۳؛ Rijkswaterstaat', rd({ side: 'hwy', L: [{ d: 'up' }, { d: 'up' }, { d: 'up', t: 'shoulder' }], marks: ['dash', 'solid'], barrier: true, units: [{ id: 'you', ln: 2, y: 150, blink: 'both' }] }), 'vangrail|crash barrier'),
      yn('به آینهٔ یک ماشین پارک‌شده زدی و صاحبش نیست. کافی است یادداشتی با اطلاعاتت بگذاری و به پلیس خبر بدهی؟', 'Spiegel van geparkeerde auto geraakt.', true, 'بله؛ <b>هویتت</b> باید قابل پیدا کردن باشد.', 'WVW 1994 ماده ۷', P([I('car'), I('info')]), 'schade|damage'),
      mc('در صف ترافیک بزرگراه با سه خط، آمبولانس از پشت می‌آید. کجا جا باز می‌کنی؟', 'File, drie stroken, ambulance.', [['بین خط چپ و بقیه؛ خط چپ به چپ، بقیه به راست', 'links naar links, rest naar rechts'], ['همه به راست', 'iedereen rechts'], ['حرکت نمی‌کنم', 'niets']], 0, 'reddingsstrook: بین <b>چپ‌ترین خط</b> و خط بعدی.', 'RVV ماده ۵۰ و ۹۱ (praktijk Rijkswaterstaat)', rd({ side: 'hwy', L: [{ d: 'up' }, { d: 'up' }, { d: 'up' }], marks: ['dash', 'dash'], units: [{ id: 'you', ln: 1, y: 160 }, { kind: 'amb', ln: 0, y: 260, dx: 14 }, { ln: 0, y: 120, dx: -10, label: '' }, { ln: 2, y: 140, label: '' }] }), 'reddingsstrook|emergency corridor'),
      mul('در فرم اروپایی خسارت چه چیزهایی می‌آید؟', 'Wat staat op het schadeformulier?', [['اطلاعات راننده‌ها و بیمه', 'gegevens en verzekering'], ['نقشهٔ تصادف', 'schets'], ['امضای هر دو', 'handtekeningen'], ['مقدار جریمه', 'boete']], [0, 1, 2], 'جریمه را پلیس تعیین می‌کند، نه فرم.', 'بیمه: Europees schadeformulier', P([I('info'), I('cam'), I('license')], { cols: 3, h: 200 }), 'schadeformulier|accident report'),
      yn('مثلث هشدار در هلند قانوناً اجباری است که در ماشین داشته باشی؟', 'Gevarendriehoek verplicht in NL?', false, 'در هلند داشتنش اجباری نیست (برای ماشین سواری) ولی <b>توصیه</b> می‌شود؛ در بعضی کشورها اجباری است.', 'Regeling voertuigen؛ ANWB', P([I('triangle')]), 'gevarendriehoek|warning triangle')
    ]
  });
})();
