/* Chapter 8 — Voertuigkennis. Regeling voertuigen (profieldiepte, verlichting, spiegels), WVW 1994 art. 72 (APK),
   RVV 1990 art. 22 (snelheid met aanhangwagen), art. 34 (mistlichten), art. 43 lid 4, Reglement rijbewijzen (B, B96, BE). */
(function () {
  const { C, mc, yn, num, hot, ord, mul, anim, L, pic } = RW.h;
  const rd = o => Object.assign({ type: 'road' }, o), P = (t, o) => pic(t, o);
  const S = (s, c, x) => Object.assign({ s: s, c: c }, x || {}), I = (i, c, x) => Object.assign({ i: i, c: c }, x || {});

  /* ---------------- 8.1 waarschuwingslampjes ---------------- */
  L({ id: 'lamp', ch: 8, fa: 'چراغ‌های هشدار داشبورد', nl: 'Waarschuwingslampjes', en: 'Dashboard warning lights',
    cards: [
      C('رنگ‌ها را بشناس', 'kleuren van lampjes', 'colours of the lights',
        '<b>قرمز</b>: مشکل جدی؛ هرچه زودتر جای امن بایست. <b>نارنجی/زرد</b>: ایراد یا هشدار؛ زود بررسی کن. <b>سبز/آبی</b>: فقط اطلاع (مثلاً چراغ روشن است).', 'کتاب راهنمای خودرو؛ CBR voertuigkennis',
        P([I('oil', 'rood'), I('engine', 'oranje'), I('high', 'blauw')], { cols: 3, h: 200 })),
      C('روغن موتور', 'oliedruklampje', 'oil pressure',
        'چراغ قرمز <b>روغن</b> یعنی فشار روغن کم است. <b>فوراً جای امن بایست و موتور را خاموش کن</b>؛ ادامه دادن موتور را خراب می‌کند.', 'CBR voertuigkennis',
        P([I('oil'), I('keys', 'motor uit')])),
      C('دمای موتور', 'koelvloeistoftemperatuur', 'engine temperature',
        'چراغ قرمز <b>دما</b>: موتور خیلی داغ است. بایست، موتور را خاموش کن. <b>درِ مخزن آب را روی موتور داغ باز نکن</b> (آب جوش).', 'CBR voertuigkennis',
        P([I('temp'), I('warn')])),
      C('باتری و ترمز', 'acculampje en remlampje', 'battery and brake',
        'چراغ قرمز <b>باتری</b>: باتری شارژ نمی‌شود (دینام یا تسمه). چراغ قرمز <b>ترمز</b> (!): ترمز دستی کشیده است یا روغن ترمز کم است؛ اگر ترمز دستی آزاد است، بایست.', 'CBR voertuigkennis',
        P([I('battery'), I('brake')])),
      C('موتور و ABS', 'motorstoringslampje en ABS', 'engine and ABS',
        'چراغ نارنجی <b>موتور</b>: ایراد موتور یا آلایندگی؛ به تعمیرگاه برو. چراغ <b>ABS</b>: ترمز کار می‌کند ولی بدون ABS؛ با احتیاط به تعمیرگاه.', 'CBR voertuigkennis',
        P([I('engine'), I('abs')])),
      C('فشار باد لاستیک', 'bandenspanningslampje (TPMS)', 'tyre pressure warning',
        'چراغ <b>TPMS</b> (لاستیک با علامت تعجب): فشار یک لاستیک کم است. آهسته برو و در اولین فرصت فشار را چک کن.', 'Regeling voertuigen (TPMS)',
        P([I('tpms'), I('tyre')])),
      C('کمربند و سوخت', 'gordel- en brandstoflampje', 'belt and fuel',
        'چراغ <b>کمربند</b>: کسی کمربند نبسته است. چراغ <b>سوخت</b>: باک تقریباً خالی است. در بزرگراه با باک خالی نمان: خطرناک و ممنوع است اگر بی‌دلیل بایستی.', 'RVV ماده ۵۹ و ۴۳',
        P([I('beltlamp'), I('fuel')])),
      C('چراغ‌های سبز و آبی', 'groene en blauwe lampjes', 'green and blue lights',
        '<b>آبی</b>: نور بالا (grootlicht) روشن است. <b>سبز</b>: نور پایین، راهنما، مه‌شکن جلو. <b>نارنجی</b> با پرتو موازی: مه‌شکن عقب.', 'RVV ماده ۳۲–۳۴',
        P([I('high'), I('dim'), I('fogf'), I('fogr')]))
    ],
    qs: [
      mc('حین رانندگی چراغ قرمز <b>روغن موتور</b> روشن می‌شود. چه می‌کنی؟', 'Oliedruklampje gaat branden.', [['فوراً جای امن می‌ایستم و موتور را خاموش می‌کنم', 'veilig stoppen, motor uit'], ['تا خانه ادامه می‌دهم', 'doorrijden naar huis'], ['سریع‌تر می‌رانم', 'sneller']], 0, 'بدون فشار روغن موتور در چند دقیقه خراب می‌شود.', 'CBR voertuigkennis', P([I('oil')]), 'oliedruk|oil pressure'),
      mc('چراغ‌های <b>قرمز</b> داشبورد معمولاً یعنی چه؟', 'Wat betekent een rood lampje?', [['مشکل جدی؛ زود بایست', 'ernstig: stoppen'], ['فقط اطلاع', 'informatie'], ['سرویس سالانه', 'onderhoud']], 0, 'قرمز = <b>جدی</b>.', 'CBR voertuigkennis', P([I('oil'), I('temp'), I('battery')], { cols: 3, h: 200 }), 'waarschuwingslampje|warning light'),
      hot('کدام چراغ یعنی <b>نور بالا</b> روشن است؟', 'Welk lampje: groot licht aan?', 'a', 'آبی = grootlicht.', 'RVV ماده ۳۲', P([I('high', 'A', { hot: 'a' }), I('dim', 'B', { hot: 'b' }), I('fogr', 'C', { hot: 'c' })], { cols: 3, h: 200 }), 'groot licht|main beam'),
      hot('کدام چراغ یعنی <b>فشار باد لاستیک</b> کم است؟', 'Welk lampje: bandenspanning?', 'c', 'لاستیک با علامت تعجب = TPMS.', 'Regeling voertuigen', P([I('abs', 'A', { hot: 'a' }), I('engine', 'B', { hot: 'b' }), I('tpms', 'C', { hot: 'c' })], { cols: 3, h: 200 }), 'bandenspanning|tyre pressure'),
      mc('چراغ قرمز دمای موتور روشن شده و بخار از زیر کاپوت بیرون می‌آید. چه می‌کنی؟', 'Temperatuurlampje en stoom.', [['می‌ایستم، موتور را خاموش می‌کنم و صبر می‌کنم خنک شود', 'stoppen, motor uit, laten afkoelen'], ['فوراً درِ مخزن آب را باز می‌کنم', 'dop eraf'], ['ادامه می‌دهم', 'doorrijden']], 0, 'در مخزن داغ = <b>آب جوش</b> و سوختگی.', 'CBR voertuigkennis', P([I('temp'), I('water')]), 'oververhitting|overheating'),
      yn('چراغ ABS روشن است. ترمز معمولی هنوز کار می‌کند؟', 'ABS-lampje: werken de remmen nog?', true, 'بله، ولی <b>بدون ABS</b>؛ چرخ‌ها ممکن است قفل شوند.', 'CBR voertuigkennis', P([I('abs'), I('brake')]), 'ABS|ABS'),
      mc('چراغ نارنجی <b>موتور</b> روشن است و ماشین عادی کار می‌کند. چه می‌کنی؟', 'Motorstoringslampje, auto rijdt normaal.', [['هرچه زودتر به تعمیرگاه می‌روم', 'snel naar de garage'], ['همان لحظه وسط جاده می‌ایستم', 'direct stoppen op de weg'], ['نادیده می‌گیرم', 'negeren']], 0, 'نارنجی = هشدار؛ زود بررسی کن.', 'CBR voertuigkennis', P([I('engine'), I('wrench')]), 'motorstoring|engine fault'),
      mc('چراغ قرمز ترمز (!) روشن است ولی ترمز دستی آزاد است. یعنی چه ممکن است باشد؟', 'Remlampje, handrem los.', [['روغن ترمز کم یا ایراد ترمز؛ بایست و بررسی کن', 'remvloeistof/storing'], ['لامپ سوخته', 'kapotte lamp'], ['کمربند', 'gordel']], 0, 'ترمز = ایمنی. <b>جدی</b> بگیر.', 'CBR voertuigkennis', P([I('brake'), I('epb')]), 'remvloeistof|brake fluid'),
      mul('کدام چراغ‌ها یعنی «زود بایست»؟', 'Welke lampjes: snel stoppen?', [['روغن', 'olie'], ['دمای موتور', 'temperatuur'], ['ترمز', 'remmen'], ['نور پایین', 'dimlicht']], [0, 1, 2], 'نور پایین فقط اطلاع است.', 'CBR voertuigkennis', P([I('oil'), I('temp'), I('brake'), I('dim')]), 'waarschuwingslampje|warning light')
    ]
  });

  /* ---------------- 8.2 onderhoud, banden en APK ---------------- */
  L({ id: 'onderh', ch: 8, fa: 'نگهداری، لاستیک و APK', nl: 'Onderhoud, banden en APK', en: 'Maintenance, tyres and MOT',
    cards: [
      C('عمق آج لاستیک', 'profieldiepte', 'tread depth',
        'حداقل قانونی عمق آج: <b>۱٫۶ میلی‌متر</b>. توصیه: تابستانی از ۲ تا ۳ میلی‌متر و زمستانی از ۴ میلی‌متر عوض شود. آج کم = <b>آب‌سواری</b> (aquaplaning) و ترمز طولانی.', 'Regeling voertuigen (profieldiepte 1,6 mm)',
        P([I('tread', '1,6 mm'), I('rain')])),
      C('فشار باد', 'bandenspanning', 'tyre pressure',
        'فشار را با لاستیک <b>سرد</b> چک کن؛ عدد درست در درِ راننده، درِ باک یا کتاب راهنماست. با بار سنگین فشار بیشتر لازم است.', 'کتاب راهنمای خودرو',
        P([I('tyre'), I('tpms')])),
      C('آسیب لاستیک', 'bandschade', 'tyre damage',
        '<b>برآمدگی</b> (bult)، ترک یا بریدگی در دیوارهٔ لاستیک خطرناک است و لاستیک ممکن است بترکد؛ فوراً عوضش کن. لاستیک‌های یک محور باید هم‌نوع و هم‌اندازه باشند.', 'Regeling voertuigen',
        P([I('tyre'), I('warn')])),
      C('APK چیست؟', 'APK (Algemene Periodieke Keuring)', 'periodic inspection',
        'APK بازرسی فنی دوره‌ای است (ترمز، چراغ، لاستیک، آلایندگی...). خودروی <b>بنزینی</b> یا برقی: اولین بار بعد از ۴ سال، بعد هر ۲ سال، و بعد از ۸ سال هر سال. <b>دیزلی</b> و گازی: اولین بار بعد از ۳ سال، بعد هر سال.', 'WVW 1994 ماده ۷۲؛ RDW',
        P([I('apk'), I('clock')])),
      C('APK یعنی همیشه سالم نیست', 'APK ≠ altijd in orde', 'MOT ≠ always roadworthy',
        'APK فقط وضعیت <b>همان روز</b> را نشان می‌دهد. تو مسئولی که ماشین <b>همیشه</b> سالم باشد: چراغ سوخته را عوض کن، ترمز ضعیف را درست کن.', 'WVW 1994 ماده ۵ و ۷۱',
        P([I('apk'), I('check'), I('wrench')], { cols: 3, h: 200 })),
      C('مایع‌ها', 'vloeistoffen', 'fluids',
        'گاه‌به‌گاه (مثلاً هر ماه یا قبل از سفر طولانی) <b>روغن موتور</b>، <b>آب رادیاتور</b> (koelvloeistof)، <b>روغن ترمز</b> و <b>آب شیشه‌شور</b> را چک کن. روغن را با موتور خاموش روی زمین صاف چک کن.', 'کتاب راهنمای خودرو',
        P([I('oil'), I('temp'), I('wiper')], { cols: 3, h: 200 })),
      C('ترمز', 'remmen', 'brakes',
        'اگر پدال ترمز <b>نرم</b> شد، ماشین هنگام ترمز به یک طرف کشید یا صدای جیغ داد، فوراً به تعمیرگاه برو.', 'WVW 1994 ماده ۷۱',
        P([I('brake'), I('wrench')])),
      C('فرمان و کمک‌فنر', 'stuur en schokdempers', 'steering and shocks',
        'فرمان <b>لق</b> یا ماشینی که بعد از دست‌انداز زیاد بالا و پایین می‌رود (کمک‌فنر خراب) کنترل را کم می‌کند. عیب را زود درست کن.', 'WVW 1994 ماده ۷۱',
        P([I('wheel'), I('wrench')]))
    ],
    qs: [
      num('حداقل قانونی عمق آج لاستیک ماشین سواری چند دهم میلی‌متر است؟ (۱٫۶ = ۱۶)', 'Minimale profieldiepte in tienden mm?', 16, '<b>۱٫۶ میلی‌متر</b>.', 'Regeling voertuigen', P([I('tread')]), 'profieldiepte|tread depth'),
      mc('آج کم در جادهٔ خیس چه خطری دارد؟', 'Weinig profiel op natte weg?', [['aquaplaning و ترمز طولانی‌تر', 'aquaplaning, langere remweg'], ['مصرف کمتر', 'minder verbruik'], ['هیچ', 'niets']], 0, 'آج آب را بیرون می‌راند؛ بدون آن لاستیک روی آب «سُر» می‌خورد.', 'Regeling voertuigen', P([I('tread'), I('rain')]), 'aquaplaning|aquaplaning'),
      yn('روی دیوارهٔ لاستیک یک برآمدگی (bult) می‌بینی. می‌توانی با آن تا سفر بعدی برانی؟', 'Bult in de band: doorrijden?', false, 'لاستیک ممکن است <b>بترکد</b>؛ عوضش کن.', 'Regeling voertuigen', P([I('tyre'), I('warn')]), 'bandschade|tyre damage'),
      num('خودروی بنزینی نو: اولین APK بعد از چند سال؟', 'Eerste APK benzineauto na hoeveel jaar?', 4, 'بنزینی و برقی: <b>۴ سال</b>.', 'WVW 1994 ماده ۷۲؛ RDW', P([I('apk'), I('fuel')]), 'APK|MOT'),
      num('خودروی دیزلی نو: اولین APK بعد از چند سال؟', 'Eerste APK dieselauto na hoeveel jaar?', 3, 'دیزلی و گازی: <b>۳ سال</b>، بعد هر سال.', 'WVW 1994 ماده ۷۲؛ RDW', P([I('apk'), I('fuel', 'diesel')]), 'APK|MOT'),
      yn('ماشین تو دو ماه پیش APK گرفت. حالا یک چراغ ترمز سوخته است. چون APK داری، مجاز است؟', 'APK, maar kapot remlicht?', false, 'تو مسئول سالم بودن <b>همیشگی</b> خودرو هستی.', 'WVW 1994 ماده ۷۱', P([I('apk'), I('brake')]), 'verlichting|lights'),
      mc('فشار باد لاستیک را کی چک می‌کنی؟', 'Wanneer bandenspanning meten?', [['با لاستیک سرد', 'koude banden'], ['بعد از رانندگی طولانی در بزرگراه', 'na een lange rit'], ['فرقی ندارد', 'maakt niet uit']], 0, 'لاستیک گرم فشار بیشتری نشان می‌دهد.', 'کتاب راهنمای خودرو', P([I('tyre'), I('snow')]), 'bandenspanning|tyre pressure'),
      mc('پدال ترمز ناگهان نرم شده و پایین‌تر می‌رود. چه می‌کنی؟', 'Rempedaal zakt weg.', [['آهسته و با احتیاط به جای امن و تعمیرگاه', 'voorzichtig naar garage'], ['با سرعت به مقصد', 'snel doorrijden'], ['ترمز دستی را حین رانندگی می‌کشم', 'handrem']], 0, 'مشکل <b>ترمز</b> را جدی بگیر.', 'WVW 1994 ماده ۷۱', P([I('brake'), I('wrench')]), 'remmen|brakes'),
      yn('لاستیک زمستانی در هلند اجباری است؟', 'Winterbanden verplicht in NL?', false, 'در هلند اجباری نیست؛ در بعضی کشورها (مثلاً آلمان در شرایط زمستانی) هست.', 'Regeling voertuigen', P([I('snow'), I('tyre')]), 'winterbanden|winter tyres'),
      mul('کدام‌ها را قبل از سفر طولانی چک می‌کنی؟', 'Wat controleer je voor een lange rit?', [['روغن موتور', 'olie'], ['فشار باد و آج', 'banden'], ['چراغ‌ها', 'verlichting'], ['رنگ صندلی‌ها', 'kleur stoelen']], [0, 1, 2], 'روغن، لاستیک و چراغ.', 'کتاب راهنمای خودرو', P([I('oil'), I('tyre'), I('dim')], { cols: 3, h: 200 }), 'controle|check')
    ]
  });

  /* ---------------- 8.3 zicht, spiegels en verlichting ---------------- */
  L({ id: 'zichtauto', ch: 8, fa: 'دید، آینه و چراغ‌های خودرو', nl: 'Zicht, spiegels en verlichting', en: 'Visibility, mirrors and lights',
    cards: [
      C('شیشه‌ها تمیز و بی‌یخ', 'ruiten schoon en ijsvrij', 'clear windows',
        'قبل از حرکت <b>همهٔ شیشه‌ها</b> را کامل از یخ، برف و بخار پاک کن، نه فقط یک سوراخ کوچک. برف روی سقف را هم بردار.', 'RVV ماده ۵؛ Regeling voertuigen',
        P([I('ice'), I('window')])),
      C('برف‌پاک‌کن و شیشه‌شور', 'ruitenwissers', 'wipers',
        'تیغهٔ برف‌پاک‌کن ساییده خط می‌اندازد و دید را بد می‌کند؛ عوضش کن. <b>آب شیشه‌شور</b> با ضدیخ در زمستان.', 'Regeling voertuigen',
        P([I('wiper'), I('rain')])),
      C('آینه‌ها را تنظیم کن', 'spiegels afstellen', 'adjust mirrors',
        'قبل از حرکت صندلی و بعد <b>آینه‌ها</b> را تنظیم کن: آینهٔ وسط کل شیشهٔ عقب را نشان دهد؛ آینه‌های کنار کمی از بدنهٔ ماشین خودت را.', 'CBR Rijprocedure B',
        P([I('mirror'), I('car')])),
      C('نقطهٔ کور', 'dode hoek', 'blind spot',
        'آینه‌ها همه جا را نشان نمی‌دهند. قبل از تغییر خط یا حرکت از کنار جاده، <b>از روی شانه</b> نگاه کن.', 'RVV ماده ۵۴؛ CBR Rijprocedure B',
        P([I('blindspot'), I('bike')])),
      C('چراغ‌ها سالم', 'verlichting werkt', 'lights work',
        'همهٔ چراغ‌ها (نور پایین، عقب، ترمز، راهنما، پلاک) باید کار کنند. هر چند وقت یک دور دور ماشین بزن و چک کن؛ چراغ ترمز را در انعکاس شیشه یا با کمک کسی.', 'Regeling voertuigen؛ WVW ماده ۷۱',
        P([I('dim'), I('brake'), I('check')], { cols: 3, h: 200 })),
      C('تنظیم ارتفاع نور', 'koplampverstelling', 'headlight levelling',
        'با بار سنگین در صندوق، جلوی ماشین بالا می‌رود و نور پایین <b>دیگران را کور</b> می‌کند. با پیچ تنظیم نور، آن را پایین‌تر بیاور.', 'RVV ماده ۳۲؛ Regeling voertuigen',
        P([I('dim'), I('load')])),
      C('مه‌شکن عقب', 'mistachterlicht', 'rear fog light',
        'مه‌شکن عقب فقط وقتی <b>دید کمتر از ۵۰ متر</b> است در مه یا بارش برف. در باران نه؛ رانندهٔ پشتی را کور می‌کند و چراغ ترمز را پنهان می‌کند.', 'RVV ماده ۳۴ بند ۲',
        P([I('fogr'), I('fog', '< 50 m')])),
      C('عینک آفتابی و شب', 'zonnebril en nacht', 'sunglasses and night',
        'آفتاب پایین را با <b>آفتاب‌گیر</b> و عینک آفتابی کم کن، ولی در تونل و شب عینک آفتابی برندار. شیشهٔ تمیز داخل هم تابش را کم می‌کند.', 'RVV ماده ۵',
        P([I('sun'), I('glasses')]))
    ],
    qs: [
      mc('صبح شیشه‌ها یخ زده‌اند و دیرت شده. چه می‌کنی؟', 'Bevroren ruiten, haast.', [['همهٔ شیشه‌ها را کامل پاک می‌کنم', 'alle ruiten krabben'], ['یک سوراخ کوچک جلو باز می‌کنم', 'klein gaatje'], ['با برف‌پاک‌کن راه می‌افتم', 'met ruitenwissers']], 0, 'با دید ناقص پیاده و دوچرخه را نمی‌بینی.', 'RVV ماده ۵', P([I('ice'), I('window')]), 'ijsvrij|ice-free'),
      ord('قبل از حرکت چه را به چه ترتیبی تنظیم می‌کنی؟', 'Volgorde instellen voor vertrek.', ['s', 'm', 'b'], '۱ صندلی، ۲ آینه‌ها، ۳ کمربند.', 'CBR Rijprocedure B', P([I('mirror', 'spiegels', { hot: 'm' }), I('belt', 'gordel', { hot: 'b' }), I('rearseat', 'stoel', { hot: 's' })], { cols: 3, h: 200 }), 'zithouding|seating position'),
      yn('باران شدید است ولی دید ۲۰۰ متر است. مه‌شکن عقب روشن می‌کنی؟', 'Zware regen, 200 m zicht: mistachterlicht?', false, 'فقط در مه یا برف با دید <b>کمتر از ۵۰ متر</b>.', 'RVV ماده ۳۴ بند ۲', P([I('rain'), I('fogr')]), 'mistachterlicht|rear fog light'),
      num('مه‌شکن عقب وقتی مجاز است که دید کمتر از چند متر باشد؟', 'Mistachterlicht bij zicht minder dan … m?', 50, '<b>۵۰ متر</b>.', 'RVV ماده ۳۴ بند ۲', P([I('fogr'), I('fog')]), 'mistachterlicht|rear fog light'),
      mc('صندوق عقب را پر از بار سنگین کردی. شب می‌رانی. چه چیزی را تنظیم می‌کنی؟', 'Zware bagage, ’s nachts.', [['ارتفاع نور جلو را پایین می‌آورم', 'koplampen lager'], ['آینهٔ وسط را برمی‌دارم', 'spiegel weg'], ['نور بالا روشن', 'groot licht']], 0, 'جلوی بالا رفته = نور در چشم دیگران.', 'RVV ماده ۳۲', P([I('load'), I('dim')]), 'koplampverstelling|headlight levelling'),
      mc('آینهٔ وسط باید چه چیزی را نشان دهد؟', 'Wat moet de binnenspiegel laten zien?', [['کل شیشهٔ عقب', 'de hele achterruit'], ['صورت خودت', 'jezelf'], ['سقف', 'het dak']], 0, 'کل <b>شیشهٔ عقب</b>.', 'CBR Rijprocedure B', P([I('mirror')]), 'binnenspiegel|interior mirror'),
      yn('آینه‌ها را درست تنظیم کرده‌ای. پس قبل از تغییر خط نیازی به نگاه از روی شانه نیست؟', 'Spiegels goed: geen schoudercontrole nodig?', false, '<b>نقطهٔ کور</b> همیشه هست.', 'RVV ماده ۵۴', P([I('blindspot'), I('mirror')]), 'dode hoek|blind spot'),
      hot('کدام چراغ <b>مه‌شکن عقب</b> است؟', 'Welk lampje is het mistachterlicht?', 'b', 'نماد با پرتوهای افقی و خط موج‌دار، رو به عقب = مه‌شکن عقب (نارنجی).', 'RVV ماده ۳۴', P([I('fogf', 'A', { hot: 'a' }), I('fogr', 'B', { hot: 'b' }), I('dim', 'C', { hot: 'c' })], { cols: 3, h: 200 }), 'mistachterlicht|rear fog light'),
      mul('کدام چراغ‌ها را باید مرتب چک کنی؟', 'Welke lichten controleer je?', [['چراغ ترمز', 'remlichten'], ['راهنماها', 'richtingaanwijzers'], ['چراغ پلاک', 'kentekenverlichting'], ['چراغ داخل صندوق', 'kofferbaklampje']], [0, 1, 2], 'چراغ صندوق برای ایمنی جاده مهم نیست.', 'Regeling voertuigen', P([I('brake'), I('dim'), I('plate')], { cols: 3, h: 200 }), 'verlichting|lights')
    ]
  });

  /* ---------------- 8.4 aanhangwagen en lading ---------------- */
  L({ id: 'aanh', ch: 8, fa: 'تریلر و بار', nl: 'Aanhangwagen en lading', en: 'Trailer and load',
    cards: [
      C('تریلر با گواهینامهٔ B', 'aanhangwagen met rijbewijs B', 'trailer on licence B',
        'با B می‌توانی تریلر با <b>حداکثر جرم مجاز ۷۵۰ کیلوگرم</b> بکشی، یا تریلر سنگین‌تر اگر جمع حداکثر جرم مجاز ماشین و تریلر از <b>۳۵۰۰ کیلوگرم</b> بیشتر نشود.', 'Reglement rijbewijzen (categorie B)',
        P([I('trailer', '≤ 750 kg'), I('txt:≤ 3500 kg', 'auto + aanhanger')])),
      C('B با کد ۹۶ و BE', 'B96 en BE', 'B96 and BE',
        'با <b>کد ۹۶</b> (یک آموزش و آزمون کوتاه) جمع ترکیب تا <b>۴۲۵۰ کیلوگرم</b>. برای تریلرهای سنگین‌تر (تا ۳۵۰۰ کیلوگرم برای خود تریلر) گواهینامهٔ <b>BE</b> لازم است.', 'Reglement rijbewijzen (code 96، BE)',
        P([I('txt:B96', '≤ 4250 kg'), I('txt:BE')])),
      C('وزن کشش مجاز ماشین', 'maximaal trekgewicht', 'towing capacity',
        'هر ماشین یک <b>حداکثر وزن قابل کشش</b> دارد (روی kentekencard و سایت RDW). تریلر با بار نباید از آن بیشتر باشد.', 'Regeling voertuigen؛ RDW',
        P([I('kcard'), I('trailer')])),
      C('سرعت با تریلر', 'snelheid met aanhangwagen', 'speed with trailer',
        'ماشین سواری با تریلر: حداکثر <b>۹۰ km/h</b> (در autosnelweg و autoweg). خارج شهر روی راه‌های دیگر ۸۰ و داخل شهر ۵۰ (قانون عمومی جاده).', 'RVV ماده ۲۲ ه و ماده ۲۰–۲۱',
        P([I('trailer'), I('sp:90')])),
      C('خط‌های مجاز در بزرگراه', 'rijstroken op de snelweg', 'lanes on the motorway',
        'ترکیب <b>بلندتر از ۷ متر</b> (مثلاً ماشین با کاروان) در بزرگراهی با <b>سه خط یا بیشتر</b> فقط از <b>دو خط سمت راست</b> استفاده می‌کند (مگر برای voorsorteren).', 'RVV ماده ۴۳ بند ۴',
        rd({ side: 'hwy', L: [{ d: 'up' }, { d: 'up' }, { d: 'up' }], marks: ['dash', 'dash'], units: [{ id: 'you', ln: 1, y: 170 }, { kind: 'truck', ln: 1, y: 250, label: '' }] })),
      C('اتصال و چراغ‌ها', 'koppeling en verlichting', 'coupling and lights',
        'قبل از حرکت: قلاب درست قفل شده، <b>کابل اضطراری</b> (breekkabel) وصل است، فیش برق وصل و <b>همهٔ چراغ‌های تریلر</b> (عقب، ترمز، راهنما، پلاک) کار می‌کنند.', 'Regeling voertuigen',
        P([I('trailer'), I('plug'), I('check')], { cols: 3, h: 200 })),
      C('پلاک تریلر', 'kenteken aanhangwagen', 'trailer plate',
        'تریلر سبک (تا ۷۵۰ کیلوگرم) پلاکی با <b>همان شمارهٔ ماشین</b> می‌گیرد. تریلر <b>سنگین‌تر از ۷۵۰ کیلوگرم</b> پلاک <b>خودش</b> را دارد (و APK لازم دارد اگر از ۳۵۰۰ بیشتر باشد).', 'WVW 1994 ماده ۳۶؛ RDW',
        P([I('plate'), I('trailer')])),
      C('آینه‌های بلند', 'extra spiegels', 'towing mirrors',
        'اگر تریلر یا کاروان <b>پهن‌تر</b> از ماشین است و با آینه‌های عادی پشت سر را نمی‌بینی، <b>آینه‌های اضافی</b> (caravanspiegels) لازم است.', 'Regeling voertuigen',
        P([I('mirror'), I('trailer')])),
      C('بار را محکم کن', 'lading vastzetten', 'secure the load',
        'بار باید <b>محکم</b> بسته شود تا نریزد و جابه‌جا نشود. بار سنگین را <b>پایین و روی محور</b> بگذار. باری که بیرون می‌زند باید علامت‌گذاری شود.', 'RVV ماده ۵ و ۵۸؛ Regeling voertuigen',
        P([I('load'), I('roofbox')])),
      C('رانندگی با تریلر', 'rijden met aanhanger', 'driving with a trailer',
        'با تریلر <b>مسافت ترمز</b> بیشتر است، پیچ‌ها را <b>بازتر</b> بگیر و فاصلهٔ بیشتری نگه دار. در باد جانبی و سبقت کامیون، ترکیب ممکن است تاب بخورد؛ آرام گاز را رها کن.', 'CBR voertuigkennis',
        P([I('trailer'), I('wind'), I('dist2')], { cols: 3, h: 200 }))
    ],
    qs: [
      num('با گواهینامهٔ B همیشه می‌توانی تریلری با حداکثر جرم مجاز تا چند کیلوگرم بکشی؟', 'Aanhangwagen tot … kg altijd met B?', 750, '<b>۷۵۰ کیلوگرم</b>.', 'Reglement rijbewijzen', P([I('trailer'), I('license')]), 'aanhangwagen|trailer'),
      yn('حداکثر جرم مجاز ماشینت ۲۰۰۰ کیلوگرم است و تریلر ۱۲۰۰ کیلوگرم. با گواهینامهٔ B مجاز است؟', '2000 kg auto + 1200 kg aanhanger met B?', true, '۲۰۰۰ + ۱۲۰۰ = ۳۲۰۰، کمتر از <b>۳۵۰۰</b> است (اگر وزن کشش ماشین هم اجازه دهد).', 'Reglement rijbewijzen', P([I('txt:2000 kg'), I('txt:1200 kg')]), 'aanhangwagen|trailer'),
      yn('ماشین ۲۵۰۰ کیلوگرم و تریلر ۱۵۰۰ کیلوگرم (حداکثر جرم مجاز). با B معمولی مجاز است؟', '2500 + 1500 kg met gewoon B?', false, '۴۰۰۰ بیشتر از ۳۵۰۰ است. به <b>کد ۹۶</b> (تا ۴۲۵۰) یا BE نیاز داری.', 'Reglement rijbewijzen (code 96)', P([I('txt:2500 kg'), I('txt:1500 kg')]), 'B96|B96'),
      num('حداکثر سرعت ماشین سواری با تریلر در autosnelweg چند km/h است؟', 'Max. snelheid met aanhanger op de snelweg?', 90, '<b>۹۰ km/h</b>.', 'RVV ماده ۲۲ ه', P([I('trailer'), S('G1')]), 'snelheid aanhanger|trailer speed'),
      mc('با ماشین و کاروان (۱۰ متر) در بزرگراه چهارخطه هستی. کدام خط‌ها مجازند؟', 'Auto + caravan 10 m, vier stroken.', [['فقط دو خط سمت راست', 'alleen de twee rechter'], ['همه', 'alle'], ['فقط خط چپ', 'alleen links']], 0, 'ترکیب بالای ۷ متر: فقط <b>دو خط راست</b>.', 'RVV ماده ۴۳ بند ۴', rd({ side: 'hwy', L: [{ d: 'up' }, { d: 'up' }, { d: 'up' }, { d: 'up' }], marks: ['dash', 'dash', 'dash'], units: [{ id: 'you', ln: 2, y: 200 }] }), 'rijstrookgebruik|lane use'),
      mul('قبل از حرکت با تریلر چه چیزهایی را چک می‌کنی؟', 'Wat controleer je bij de aanhanger?', [['قفل قلاب', 'koppeling'], ['کابل اضطراری', 'breekkabel'], ['چراغ‌های تریلر', 'verlichting'], ['رادیو', 'radio']], [0, 1, 2], 'اتصال، کابل، چراغ.', 'Regeling voertuigen', P([I('trailer'), I('plug'), I('dim')], { cols: 3, h: 200 }), 'aanhanger|trailer'),
      mc('کاروان در باد جانبی شروع به تاب خوردن کرده. چه می‌کنی؟', 'Caravan slingert.', [['آرام گاز را رها می‌کنم و فرمان را صاف نگه می‌دارم', 'gas los, stuur recht'], ['محکم گاز می‌دهم', 'gas geven'], ['فرمان را تند به چپ و راست می‌چرخانم', 'tegensturen']], 0, 'سرعت کم شود؛ حرکت‌های تند تاب را بدتر می‌کند.', 'CBR voertuigkennis', P([I('trailer'), I('wind')]), 'slingeren|snaking'),
      yn('تریلر ۱۰۰۰ کیلوگرمی پلاک خودش را لازم دارد؟', 'Aanhanger 1000 kg: eigen kenteken?', true, 'بیشتر از ۷۵۰ کیلوگرم: <b>پلاک خودش</b>.', 'WVW 1994 ماده ۳۶؛ RDW', P([I('trailer'), I('plate')]), 'kenteken|registration'),
      mc('کاروان پهن‌تر از ماشینت است و پشت سر را در آینه نمی‌بینی. چه لازم است؟', 'Caravan breder dan auto.', [['آینه‌های اضافی', 'extra spiegels'], ['دوربین داشبورد', 'dashcam'], ['هیچ', 'niets']], 0, 'دید عقب باید کافی باشد.', 'Regeling voertuigen', P([I('mirror'), I('trailer')]), 'caravanspiegels|towing mirrors'),
      mc('بار سنگین را در تریلر کجا می‌گذاری؟', 'Waar zware lading in de aanhanger?', [['پایین و روی محور', 'laag en boven de as'], ['بالا و عقب', 'hoog en achteraan'], ['هر جا', 'maakt niet uit']], 0, 'مرکز ثقل پایین و روی محور = پایداری بیشتر.', 'CBR voertuigkennis', P([I('load'), I('trailer')]), 'lading|load'),
      mc('با تریلر به چپ می‌پیچی. چه فرقی با بدون تریلر دارد؟', 'Afslaan met aanhanger.', [['پیچ را بازتر می‌گیرم چون تریلر میان‌بر می‌زند', 'ruimer draaien'], ['تندتر می‌پیچم', 'scherper'], ['فرقی ندارد', 'geen verschil']], 0, 'تریلر به داخل پیچ می‌آید؛ مواظب جدول و دوچرخه باش.', 'CBR voertuigkennis', P([I('trailer'), I('bike')]), 'afslaan met aanhanger|turning with trailer')
    ]
  });
})();
