/* Chapter 5 — Verkeerstekens en aanwijzingen. RVV 1990 art. 62–84, Bijlage 1 (borden) en Bijlage 2 (aanwijzingen).
   Sign questions marked «generated» are built from the sign dictionary (RW.h.signQs): what-does-it-mean and tap-the-sign. */
(function () {
  const { C, mc, yn, num, hot, ord, mul, anim, L, pic, signQs } = RW.h;
  const rd = o => Object.assign({ type: 'road' }, o), P = (t, o) => pic(t, o);
  const S = (s, c, x) => Object.assign({ s: s, c: c }, x || {}), I = (i, c, x) => Object.assign({ i: i, c: c }, x || {});
  const codes = re => (window.RW_SIGNS || []).map(s => s[0]).filter(c => re.test(c));

  /* ---------------- 5.1 waarschuwingsborden ---------------- */
  L({ id: 'waarsch', ch: 5, fa: 'تابلوهای هشدار', nl: 'Waarschuwingsborden', en: 'Warning signs',
    cards: [
      C('مثلث با حاشیهٔ قرمز = هشدار', 'waarschuwingsborden (J)', 'warning signs (J)',
        'تابلوهای <b>مثلثی با حاشیهٔ قرمز</b> (گروه J) هشدار می‌دهند که جلوتر چیزی خطرناک است. خودشان چیزی را ممنوع یا اجباری نمی‌کنند؛ ولی باید <b>سرعت و توجهت</b> را با آن تنظیم کنی.', 'RVV پیوست ۱ (J)',
        P([S('J8'), S('J16'), S('J21'), S('J20')])),
      C('پیچ و شیب', 'bochten · hellingen', 'bends · slopes',
        '<b>J2/J3</b> پیچ به راست/چپ، <b>J4/J5</b> پیچ‌های پشت سر هم، <b>J6</b> سربالایی تند، <b>J7</b> سرازیری خطرناک. قبل از پیچ سرعت کم کن، نه داخل آن.', 'RVV پیوست ۱ (J2–J7)',
        P([S('J2', 'J2'), S('J4', 'J4'), S('J6', 'J6'), S('J7', 'J7')])),
      C('جاده و سطح آن', 'wegdek', 'road surface',
        '<b>J1</b> جادهٔ ناهموار، <b>J20</b> لغزنده، <b>J25</b> سنگ‌ریزهٔ شل، <b>J38</b> سرعت‌گیر، <b>J36</b> یخ یا برف.', 'RVV پیوست ۱ (J1، J20، J25، J36، J38)',
        P([S('J1', 'J1'), S('J20', 'J20'), S('J25', 'J25'), S('J38', 'J38')])),
      C('باریک شدن جاده', 'rijbaanversmalling', 'road narrows',
        '<b>J17</b> جاده از دو طرف باریک می‌شود، <b>J18</b> از راست، <b>J19</b> از چپ. <b>J29</b>: ترافیک دوطرفه (بعد از یک‌طرفه). به‌موقع جا بده.', 'RVV پیوست ۱ (J17–J19، J29)',
        P([S('J17', 'J17'), S('J18', 'J18'), S('J19', 'J19'), S('J29', 'J29')])),
      C('آدم‌ها و حیوانات', 'weggebruikers en dieren', 'people and animals',
        '<b>J21</b> بچه‌ها، <b>J22</b> گذرگاه عابر، <b>J23</b> پیاده‌ها، <b>J24</b> دوچرخه و موتورگازی، <b>J27</b> حیوان وحشی، <b>J28</b> دام.', 'RVV پیوست ۱ (J21–J28)',
        P([S('J21', 'J21'), S('J23', 'J23'), S('J24', 'J24'), S('J27', 'J27')])),
      C('تقاطع‌ها و ترافیک', 'kruispunten en verkeer', 'junctions and traffic',
        '<b>J8</b> تقاطع خطرناک، <b>J9</b> میدان، <b>J32</b> چراغ راهنمایی، <b>J33</b> صف (file)، <b>J34</b> تصادف، <b>J16</b> کار در جاده.', 'RVV پیوست ۱ (J8، J9، J16، J32–J34)',
        P([S('J8', 'J8'), S('J32', 'J32'), S('J33', 'J33'), S('J16', 'J16')])),
      C('ریل، پل، آب', 'spoor · brug · water', 'rail · bridge · water',
        '<b>J10–J13</b> گذرگاه راه‌آهن، <b>J14</b> تراموا، <b>J15</b> پل متحرک، <b>J26</b> لبهٔ اسکله یا رودخانه، <b>J30</b> هواپیما در ارتفاع کم.', 'RVV پیوست ۱ (J10–J15، J26، J30)',
        P([S('J10', 'J10'), S('J14', 'J14'), S('J15', 'J15'), S('J26', 'J26')])),
      C('هوا و خطرهای دیگر', 'weer en overige', 'weather and other',
        '<b>J31</b> باد جانبی، <b>J35</b> دید بد، <b>J37</b> خطر (نوع خطر روی زیرتابلو نوشته می‌شود)، <b>J39</b> ستون برقی بالا و پایین‌رونده در جاده (poller).', 'RVV پیوست ۱ (J31، J35، J37، J39)',
        P([S('J31', 'J31'), S('J35', 'J35'), S('J37', 'J37'), S('J39', 'J39')]))
    ],
    gen: () => signQs(codes(/^J/), null, { seed: 'w' }),
    qs: [
      mc('تابلوهای مثلثی با حاشیهٔ قرمز چه کاری می‌کنند؟', 'Wat doen driehoekige borden met rode rand?', [['هشدار برای خطر جلوتر', 'waarschuwen'], ['چیزی را ممنوع می‌کنند', 'verbieden'], ['راه را نشان می‌دهند', 'de weg wijzen']], 0, 'مثلث قرمز = <b>هشدار</b>.', 'RVV پیوست ۱ (J)', P([S('J8')]), 'waarschuwingsbord|warning sign'),
      mc('تابلوی J2 (پیچ به راست) را می‌بینی. کی سرعت کم می‌کنی؟', 'Wanneer rem je bij een bocht?', [['قبل از پیچ', 'vóór de bocht'], ['وسط پیچ', 'in de bocht'], ['بعد از پیچ', 'na de bocht']], 0, 'ترمز وسط پیچ ماشین را ناپایدار می‌کند. <b>قبل از پیچ</b> سرعت کم کن.', 'RVV ماده ۱۹', P([S('J2')]), 'bocht|bend'),
      mc('زیر تابلوی J37 نوشته شده «<b>sneeuw</b>». یعنی چه؟', 'J37 met onderbord “sneeuw”?', [['خطر برف جلوتر', 'gevaar: sneeuw'], ['برف‌روبی ممنوع', 'verboden'], ['جادهٔ زمستانی', 'winterweg']], 0, 'J37 = خطر؛ <b>نوع خطر روی زیرتابلو</b> نوشته می‌شود.', 'RVV پیوست ۱ (J37)', P([S('J37', 'sneeuw')]), 'gevaar|danger'),
      yn('تابلوی J33 (صف ترافیک) در بزرگراه دیدی. باید آمادهٔ ترمز باشی؟', 'Bord J33: voorbereid zijn op remmen?', true, 'بله. J33 یعنی جلوتر صف است؛ گاز را رها کن و فاصله بگیر.', 'RVV پیوست ۱ (J33)', P([S('J33')]), 'file|traffic jam'),
      mc('J17 (جاده از دو طرف باریک می‌شود). ماشینی از روبه‌رو می‌آید. چه می‌کنی؟', 'J17 en tegenligger. Wat doe je?', [['سرعت کم می‌کنم و جا می‌دهم', 'snelheid minderen, ruimte geven'], ['سرعت می‌گیرم تا اول رد شوم', 'snel erdoor'], ['بوق می‌زنم', 'toeteren']], 0, 'J17 قانون حق تقدم نمی‌دهد. <b>همکاری</b> و سرعت کم.', 'RVV پیوست ۱ (J17)', P([S('J17')]), 'versmalling|narrowing')
    ]
  });

  /* ---------------- 5.2 verbods- en gebodsborden ---------------- */
  const VB = codes(/^(C|F)/).filter(c => !/^C22e\d|^F10$/.test(c)).concat(['E1', 'E2', 'E3', 'E10', 'E11']);
  L({ id: 'verbod', ch: 5, fa: 'تابلوهای ممنوعیت', nl: 'Verbodsborden', en: 'Prohibition signs',
    cards: [
      C('دایرهٔ قرمز = ممنوع', 'verbodsborden', 'prohibition signs',
        'تابلوی <b>گرد با حاشیهٔ قرمز</b> چیزی را <b>ممنوع</b> می‌کند (گروه C، E و F). این تابلوها <b>اجباری</b> هستند و از قانون‌های کلی مهم‌ترند.', 'RVV ماده ۶۲ و ۶۳',
        P([S('C1'), S('C2'), S('E1'), S('F1')])),
      C('ورود ممنوع از دو طرف و از یک طرف', 'C1 · C2', 'closed in both directions · no entry',
        '<b>C1</b> (دایرهٔ سفید با حاشیهٔ قرمز): راه برای همهٔ وسایل، سوار و دام <b>از هر دو طرف</b> بسته است. <b>C2</b> (دایرهٔ قرمز با خط سفید): ورود از این طرفِ یک راه یک‌طرفه ممنوع.', 'RVV پیوست ۱ (C1، C2)',
        P([S('C1', 'C1'), S('C2', 'C2')])),
      C('ممنوع برای گروهی از وسایل', 'geslotenverklaring', 'closed for certain vehicles',
        'تابلو با تصویر وسیله: ورود فقط برای <b>همان گروه</b> ممنوع است. <b>C6</b> motorvoertuig با بیش از دو چرخ (مثلاً خودروی تو)، <b>C7</b> کامیون، <b>C10</b> با تریلر، <b>C12</b> همهٔ motorvoertuigها، <b>C14</b> دوچرخه.', 'RVV پیوست ۱ (C6–C16)',
        P([S('C6', 'C6'), S('C7', 'C7'), S('C10', 'C10'), S('C12', 'C12')])),
      C('اندازه و وزن', 'maten en gewichten', 'size and weight',
        '<b>C17</b> طول، <b>C18</b> عرض، <b>C19</b> ارتفاع، <b>C20</b> بار هر محور، <b>C21</b> وزن کل. وسیلهٔ بزرگ‌تر از عدد تابلو (با بار) حق ورود ندارد.', 'RVV پیوست ۱ (C17–C21)',
        P([S('C17', 'C17'), S('C18', 'C18'), S('C19', 'C19'), S('C21', 'C21')])),
      C('زیرتابلو استثنا می‌سازد', 'onderbord: uitgezonderd', 'additional plate: except',
        'زیرتابلو می‌تواند محدودیت را <b>کم کند</b>: مثلاً «uitgezonderd bestemmingsverkeer» یعنی فقط کسی که مقصدش همین خیابان است (و اتوبوس خطی) می‌تواند وارد شود. روز و ساعت روی زیرتابلو هم زمان اعتبار را می‌گوید.', 'RVV ماده ۱ (bestemmingsverkeer) و BABW',
        P([S('C12', 'uitgezonderd bestemmingsverkeer')])),
      C('منطقهٔ محیط‌زیستی', 'milieuzone C22e', 'low-emission zone',
        'تابلوی <b>C22e</b> با زیرتابلو: <b>milieuzone</b>. خودروهایی (مثلاً دیزل قدیمی) که شرط آلایندگی روی زیرتابلو را ندارند حق ورود ندارند. <b>C22f</b> پایان آن است.', 'RVV پیوست ۱ (C22e، C22f)',
        P([S('C22e', 'C22e'), S('C22f', 'C22f')])),
      C('تابلوهای F: ممنوعیت‌های دیگر', 'F-borden', 'other prohibitions',
        '<b>F1</b> سبقت motorvoertuigها ممنوع، <b>F3</b> سبقت کامیون ممنوع، <b>F5</b> اگر از روبه‌رو ترافیک می‌آید صبر کن، <b>F6</b> ترافیک روبه‌رو صبر می‌کند، <b>F7</b> دور زدن ممنوع.', 'RVV پیوست ۱ (F1–F7)',
        P([S('F1', 'F1'), S('F5', 'F5'), S('F6', 'F6'), S('F7', 'F7')])),
      C('پایان ممنوعیت‌ها', 'einde verbod F8 · F9', 'end of restrictions',
        'تابلوهای خط‌خورده پایان یک ممنوعیت‌اند. <b>F8</b>: پایان همهٔ ممنوعیت‌های تابلویی. <b>F9</b>: پایان همهٔ ممنوعیت‌های matrixborden.', 'RVV پیوست ۱ (F8، F9)',
        P([S('F2', 'F2'), S('F8', 'F8'), S('F9', 'F9')], { cols: 3, h: 200 })),
      C('خط‌های ویژه', 'F13–F22', 'reserved lanes',
        'تابلوهای آبی مستطیلی F: خط یا راه <b>ویژه</b>. <b>F13</b> lijnbus، <b>F15</b> تراموا، <b>F17</b> اتوبوس و تراموا، <b>F19</b> کامیون و lijnbus، <b>F21</b> کامیون. با خودروی سواری وارد این خط‌ها نشو.', 'RVV پیوست ۱ (F13–F22)',
        P([S('F13', 'F13'), S('F15', 'F15'), S('F19', 'F19'), S('F21', 'F21')]))
    ],
    gen: () => signQs(VB, null, { seed: 'v', same: [['C3', 'C4'], ['C23-01', 'C23-02'], ['F8', 'F9']] }),
    qs: [
      mc('تفاوت C1 و C2 چیست؟', 'Verschil tussen C1 en C2?', [['C1 از هر دو طرف بسته است؛ C2 فقط ورود از این طرف یک‌طرفه', 'C1 beide richtingen, C2 eenrichting'], ['هیچ تفاوتی ندارند', 'geen verschil'], ['C1 فقط برای کامیون است', 'C1 alleen vrachtauto']], 0, 'C1: بسته برای همه از دو طرف. C2: یک‌طرفه، ورود از این سمت ممنوع.', 'RVV پیوست ۱ (C1، C2)', P([S('C1', 'C1'), S('C2', 'C2')]), 'geslotenverklaring|closed'),
      yn('با خودروی سواری از تابلوی <b>C6</b> رد می‌شوی؟', 'Mag je met de auto langs bord C6?', false, 'C6 ورود را برای motorvoertuig با <b>بیش از دو چرخ</b> ممنوع می‌کند؛ یعنی ماشین تو.', 'RVV پیوست ۱ (C6)', P([S('C6')]), 'gesloten voor auto’s|closed to cars'),
      yn('با موتورسیکلت از تابلوی <b>C6</b> رد می‌شوی؟', 'Mag een motorfiets langs bord C6?', true, 'بله؛ موتورسیکلت دو چرخ دارد. C6 فقط برای بیش از دو چرخ است.', 'RVV پیوست ۱ (C6)', P([S('C6'), I('moto')]), 'motorfiets|motorcycle'),
      yn('زیر تابلوی C12 نوشته «uitgezonderd bestemmingsverkeer». تو به خانهٔ دوستت در همین خیابان می‌روی. اجازه داری وارد شوی؟', 'C12 uitgezonderd bestemmingsverkeer: mag je naar je vriend?', true, 'بله. مقصد تو در همین خیابان است، پس <b>bestemmingsverkeer</b> هستی.', 'RVV ماده ۱ (bestemmingsverkeer)', P([S('C12', 'uitgezonderd bestemmingsverkeer')]), 'bestemmingsverkeer|access only'),
      yn('همان تابلو؛ تو فقط می‌خواهی از این خیابان میان‌بر بزنی. اجازه داری؟', 'Mag je er doorheen als sluiproute?', false, 'نه. عبور بدون مقصد در آن خیابان bestemmingsverkeer نیست.', 'RVV ماده ۱ (bestemmingsverkeer)', P([S('C12', 'uitgezonderd bestemmingsverkeer')]), 'bestemmingsverkeer|access only'),
      yn('تابلوی C19 عدد <b>3,1 m</b> را نشان می‌دهد. ماشین تو با جعبهٔ سقفی ۲٫۱ متر ارتفاع دارد. اجازه داری رد شوی؟', 'C19 3,1 m, jouw auto met dakkoffer 2,1 m. Mag je erdoor?', true, 'بله؛ ۲٫۱ کمتر از ۳٫۱ است. ارتفاع همیشه <b>با بار</b> حساب می‌شود.', 'RVV پیوست ۱ (C19)', P([S('C19', '3,1 m'), I('roofbox', '2,1 m')]), 'hoogte|height'),
      mc('تابلوی <b>F5</b>: ماشینی از روبه‌رو وارد قسمت باریک شده. چه می‌کنی؟', 'Bord F5, tegenligger in de versmalling.', [['صبر می‌کنم تا رد شود', 'wachten'], ['من مقدمم', 'ik heb voorrang'], ['بوق می‌زنم', 'toeteren']], 0, 'F5 یعنی <b>تو</b> باید به ترافیک روبه‌رو اجازه بدهی.', 'RVV پیوست ۱ (F5)', P([S('F5')]), 'tegemoetkomend verkeer|oncoming traffic'),
      mc('تابلوی <b>F6</b> یعنی چه برای تو؟', 'Bord F6: wat betekent het voor jou?', [['ترافیک روبه‌رو باید صبر کند و تو اول می‌روی', 'jij gaat voor'], ['تو صبر می‌کنی', 'jij wacht'], ['ورود ممنوع', 'verboden in te rijden']], 0, 'F6: تو اول؛ ولی اگر کسی اشتباه آمد، تصادف نکن.', 'RVV پیوست ۱ (F6)', P([S('F6')]), 'voorrang|priority'),
      mc('دیزل قدیمی داری و به تابلوی <b>C22e</b> با زیرتابلوی «diesel, klasse 4 t/m 6» می‌رسی. ماشینت کلاس ۳ است. چه می‌کنی؟', 'Milieuzone, jouw diesel is klasse 3.', [['وارد نمی‌شوم', 'niet inrijden'], ['وارد می‌شوم ولی پارک نمی‌کنم', 'wel rijden, niet parkeren'], ['فقط شب‌ها وارد می‌شوم', 'alleen ’s nachts']], 0, 'ماشین‌هایی که شرط زیرتابلو را ندارند <b>حق ورود</b> به milieuzone را ندارند.', 'RVV پیوست ۱ (C22e)', P([S('C22e', 'diesel 4–6')]), 'milieuzone|low-emission zone'),
      yn('با خودروی سواری حق داری روی خطی با تابلوی <b>F19</b> (کامیون و lijnbus) بروی؟', 'Mag je met een personenauto op een F19-strook?', false, 'نه. فقط کامیون و lijnbus.', 'RVV پیوست ۱ (F19)', P([S('F19')]), 'vrachtautostrook|lorry lane')
    ]
  });

  /* ---------------- 5.3 gebods-, voorrangs- en informatieborden ---------------- */
  const AW = codes(/^(B|D|G|H|L)/).concat(['E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E12', 'E13']);
  L({ id: 'aanwijs', ch: 5, fa: 'تابلوهای دستوری، حق تقدم و راهنما', nl: 'Gebods-, voorrangs- en informatieborden', en: 'Mandatory, priority and information signs',
    cards: [
      C('دایرهٔ آبی = اجباری', 'gebodsborden (D)', 'mandatory signs',
        'تابلوی <b>گرد آبی</b> با پیکان سفید (گروه D) جهتی را <b>اجباری</b> می‌کند: <b>D1</b> میدان، <b>D2</b> از سمت پیکان رد شو، <b>D3</b> از هر دو طرف، <b>D4–D7</b> جهت‌های اجباری.', 'RVV پیوست ۱ (D)',
        P([S('D1', 'D1'), S('D2', 'D2'), S('D4', 'D4'), S('D7', 'D7')])),
      C('تابلوهای حق تقدم', 'voorrangsborden (B)', 'priority signs',
        '<b>B1</b> لوزی زرد: voorrangsweg. <b>B2</b> پایان آن. <b>B3/B4/B5</b>: در تقاطع بعدی تو مقدمی. <b>B6</b> مثلث وارونه: حق تقدم بده. <b>B7</b> STOP: بایست و حق تقدم بده.', 'RVV پیوست ۱ (B1–B7)',
        P([S('B1', 'B1'), S('B3', 'B3'), S('B6', 'B6'), S('B7', 'B7')])),
      C('نوع راه (G)', 'G-borden', 'road type signs',
        'تابلوهای مستطیلی آبی G نوع راه را می‌گویند: autosnelweg، autoweg، erf، voetpad، ruiterpad و انواع fietspad. تابلوی خط‌خورده = پایان.', 'RVV پیوست ۱ (G1–G14)',
        P([S('G1', 'G1'), S('G5', 'G5'), S('G7', 'G7'), S('G12a', 'G12a')])),
      C('مسیر دوچرخه سه نوع', 'G11 · G12a · G13', 'three cycle path types',
        '<b>G11</b> گرد آبی: مسیر دوچرخهٔ <b>اجباری</b>. <b>G12a</b> گرد آبی با دوچرخه و موتور: مسیر دوچرخه و bromfiets (اجباری برای هر دو). <b>G13</b> مستطیلی «fietspad»: <b>غیراجباری</b> (snorfiets فقط با موتور خاموش).', 'RVV ماده ۵ و ۶ و پیوست ۱ (G11–G14)',
        P([S('G11', 'G11'), S('G12a', 'G12a'), S('G13', 'G13')], { cols: 3, h: 200 })),
      C('تابلوهای اطلاعاتی (L)', 'informatieborden (L)', 'information signs',
        '<b>L2</b> گذرگاه عابر، <b>L3</b> ایستگاه اتوبوس، <b>L4</b> voorsorteren، <b>L5</b> پایان یک خط، <b>L8</b> بن‌بست، <b>L13</b> تونل، <b>L14</b> vluchthaven. این‌ها اطلاع می‌دهند، ولی معنی‌شان مهم است.', 'RVV پیوست ۱ (L)',
        P([S('L2', 'L2'), S('L4', 'L4'), S('L5', 'L5'), S('L8', 'L8')])),
      C('تابلوهای راهنمای مسیر (K)', 'bewegwijzering (K)', 'direction signs',
        'تابلوهای <b>آبی</b> در autosnelweg، <b>سفید</b> در راه‌های دیگر، <b>زرد</b> برای مسیر انحرافی (<b>K9</b> omleiding) و قرمز-سفید برای دوچرخه (<b>K7/K8</b>). شمارهٔ A روی زمینهٔ قرمز = autosnelweg، N روی زرد = راه دیگر.', 'RVV پیوست ۱ (K1–K14)',
        P([S('K2', 'K2'), S('K6', 'K6'), S('K9', 'K9'), S('K7', 'K7')])),
      C('شهر و جای پارک', 'H1 · H2 · E-borden', 'town and parking signs',
        '<b>H1</b> شروع bebouwde kom (۵۰)، <b>H2</b> پایان. تابلوهای مربعی آبی E جای پارک‌اند: <b>E4</b> P، <b>E6</b> معلولان، <b>E8</b> فقط برای گروه روی تابلو، <b>E12</b> P+R، <b>E13</b> carpool.', 'RVV پیوست ۱ (H، E)',
        P([S('H1', 'H1'), S('E4', 'E4'), S('E8', 'E8'), S('E12', 'E12')])),
      C('ترتیب اهمیت', 'rangorde', 'order of precedence',
        '<b>۱</b> دستور پلیس یا راهنمای ترافیک، <b>۲</b> چراغ راهنمایی، <b>۳</b> تابلو و خط‌کشی، <b>۴</b> قانون‌های کلی. تابلوها از قانون‌ها مهم‌ترند و چراغ از تابلوهای حق تقدم.', 'RVV ماده ۶۳، ۶۴ و ۸۴',
        P([I('cop_up', '۱ پلیس'), I('tl_g', '۲ چراغ'), S('B6', '۳ تابلو'), I('info', '۴ قانون')]))
    ],
    gen: () => signQs(AW, null, { seed: 'a', same: [['C3', 'C4'], ['L14', 'L15'], ['G11', 'G12a'], ['D6', 'D7'], ['D4', 'D5'], ['B4', 'B5', 'B3']] }),
    qs: [
      mc('تابلوی گرد آبی با پیکان سفید چه نوع تابلویی است؟', 'Wat voor bord is rond en blauw met een witte pijl?', [['اجباری (gebod)', 'gebodsbord'], ['ممنوعیت', 'verbodsbord'], ['هشدار', 'waarschuwingsbord']], 0, 'گرد آبی = <b>اجباری</b>.', 'RVV پیوست ۱ (D)', P([S('D4')]), 'gebodsbord|mandatory sign'),
      ord('ترتیب اهمیت را از مهم‌ترین بچین.', 'Rangorde: zet in volgorde.', ['p', 'l', 's', 'r'], '۱ دستور پلیس، ۲ چراغ، ۳ تابلو، ۴ قانون.', 'RVV ماده ۶۳، ۶۴ و ۸۴', P([I('tl_g', 'چراغ', { hot: 'l' }), I('cop_up', 'پلیس', { hot: 'p' }), S('B6', 'تابلو', { hot: 's' }), I('info', 'قانون', { hot: 'r' })]), 'rangorde|order of precedence'),
      yn('روی voorrangsweg (B1) هستی. در تقاطع بعدی چراغ راهنمایی قرمز است. اجازه داری رد شوی چون جادهٔ اصلی هستی؟', 'Voorrangsweg, maar rood licht. Mag je door?', false, 'چراغ <b>مهم‌تر</b> از تابلوی حق تقدم است.', 'RVV ماده ۶۴', P([S('B1'), I('tl_r')]), 'verkeerslicht|traffic light'),
      mc('شمارهٔ <b>A</b> روی زمینهٔ قرمز روی تابلوی راهنما یعنی چه؟', 'Wat betekent een rood A-nummer?', [['autosnelweg', 'autosnelweg'], ['جادهٔ روستایی', 'landweg'], ['منطقهٔ صنعتی', 'industrieterrein']], 0, 'A روی قرمز = <b>autosnelweg</b>؛ N روی زرد = راه‌های دیگر؛ E روی سبز = مسیر اروپایی.', 'RVV پیوست ۱ (K)', P([I('txt:A2', 'rood'), I('txt:N201', 'geel')]), 'wegnummer|road number'),
      mc('تابلوی راهنمای <b>زرد</b> با نوشتهٔ omleiding یعنی چه؟', 'Geel bord met “omleiding”?', [['مسیر انحرافی', 'omleiding'], ['جادهٔ خطرناک', 'gevaar'], ['مسیر کامیون‌ها', 'vrachtroute']], 0, 'زرد = مسیر <b>انحرافی</b> موقت (K9).', 'RVV پیوست ۱ (K9)', P([S('K9')]), 'omleiding|diversion'),
      mc('snorfiets روی fietspad با تابلوی <b>G13</b> (غیراجباری). کدام درست است؟', 'Snorfiets op een onverplicht fietspad (G13)?', [['فقط با موتور خاموش', 'alleen met motor uit'], ['با موتور روشن مجاز', 'met motor aan'], ['ممنوع', 'verboden']], 0, 'snorfiets با موتور احتراقی روی fietspad غیراجباری فقط با <b>موتور خاموش</b>.', 'RVV ماده ۵ بند ۳', P([S('G13'), I('moped')]), 'onverplicht fietspad|optional cycle path'),
      mc('تابلوی <b>L5</b>: خط سمت چپ تو تمام می‌شود. چه می‌کنی؟', 'Bord L5: je rijstrook houdt op.', [['به‌موقع با راهنما به خط دیگر می‌روم و به آن خط حق تقدم می‌دهم', 'tijdig wisselen en voorrang geven'], ['تا آخر خط می‌روم و فشار می‌آورم', 'doorduwen'], ['می‌ایستم', 'stoppen']], 0, 'عوض کردن خط حرکت ویژه است: تو صبر می‌کنی. ritsen (یکی‌درمیان) مؤدبانه است.', 'RVV ماده ۵۴ و پیوست ۱ (L5)', P([S('L5')]), 'einde rijstrook|lane ends'),
      mc('تابلوی <b>L8</b> یعنی چه؟', 'Wat betekent L8?', [['بن‌بست', 'doodlopende weg'], ['ورود ممنوع', 'inrijverbod'], ['پارکینگ', 'parkeren']], 0, 'L8: doodlopende weg (بن‌بست).', 'RVV پیوست ۱ (L8)', P([S('L8')]), 'doodlopende weg|dead end')
    ]
  });

  /* ---------------- 5.4 verkeerslichten, markeringen en aanwijzingen ---------------- */
  L({ id: 'lichten', ch: 5, fa: 'چراغ‌ها، خط‌کشی و دستورها', nl: 'Verkeerslichten, markeringen en aanwijzingen', en: 'Traffic lights, road markings and instructions',
    cards: [
      C('سبز، زرد، قرمز', 'driekleurig verkeerslicht', 'three-colour traffic light',
        '<b>سبز</b>: برو (اگر آن طرف جا هست). <b>زرد</b>: بایست؛ فقط اگر آن‌قدر نزدیکی که نمی‌توانی به‌طور معقول بایستی، ادامه بده. <b>قرمز</b>: بایست، پشت خط توقف.', 'RVV ماده ۶۸ بند ۱ و ماده ۷۹',
        P([I('tl_g', 'groen'), I('tl_y', 'geel'), I('tl_r', 'rood')], { cols: 3, h: 200 })),
      C('چراغ با پیکان', 'pijllicht', 'arrow signal',
        'اگر در چراغ <b>پیکان</b> روشن است، آن چراغ فقط برای <b>همان جهت</b> است. چراغ با <b>تصویر دوچرخه</b> برای دوچرخه و موتورگازی روی fietspad است.', 'RVV ماده ۶۸ بند ۲ و ۳',
        P([I('tl_ga', 'groene pijl'), I('tl_ra', 'rode pijl'), I('tl_f', 'fietslicht')], { cols: 3, h: 200 })),
      C('سبز یعنی بدون خطر؟ نه!', 'groen = niet altijd veilig', 'green is not always safe',
        'با چراغ سبز هم ممکن است کسی (مثلاً دوچرخه یا پیاده یا ماشینِ روبه‌رو) <b>همزمان سبز</b> داشته باشد. هنگام پیچیدن، قانون‌های پیچیدن برقرارند.', 'RVV ماده ۱۸',
        { lights: [['S', 'green'], ['N', 'green']], units: [{ id: 'you', from: 'S', go: 'left' }, { id: 'a', label: '۱', from: 'N', go: 'straight' }] }),
      C('چراغ عابر پیاده', 'voetgangerslicht', 'pedestrian light',
        '<b>سبز</b>: پیاده رد می‌شود. <b>سبز چشمک‌زن</b>: به‌زودی قرمز می‌شود. <b>قرمز</b>: پیاده نباید شروع کند؛ کسی که وسط راه است سریع تمامش کند. پس صبر کن تا رد شوند.', 'RVV ماده ۷۴',
        P([I('ped_g', 'groen'), I('ped_r', 'rood')])),
      C('چراغ خاموش یا زرد چشمک‌زن', 'verkeerslicht uit / geel knipperlicht', 'lights off or flashing amber',
        'وقتی چراغ <b>خاموش</b> است یا <b>زرد چشمک</b> می‌زند، <b>تابلوها</b> و اگر تابلو نیست <b>قانون‌های کلی</b> (راست مقدم) اعمال می‌شوند. با احتیاط برو.', 'RVV ماده ۶۴ و ۷۵',
        { lights: [['S', 'yellow']], signsAt: [['S', 'B6', 1]], teeth: ['S'], units: [{ id: 'you', from: 'S', d: 6 }] }),
      C('خط‌کشی‌ها', 'markeringen', 'road markings',
        'خط <b>ممتد</b> را رد نکن. خط <b>بریده</b> را می‌شود رد کرد. <b>verdrijvingsvlak</b> را استفاده نکن. <b>haaientanden</b> = حق تقدم بده. <b>stopstreep</b> = جای ایستادن. پیکان روی voorsorteerstrook را دنبال کن.', 'RVV ماده ۷۶–۸۰',
        rd({ side: 'city', L: [{ d: 'dn' }, { d: 'up', arrow: 'l' }, { d: 'up', arrow: 's' }], marks: ['solid', 'dash'], teeth: [[1, 40], [2, 40]], units: [{ id: 'you', ln: 2, y: 240 }] })),
      C('دستور پلیس: ایست برای همه', 'algemeen stopteken', 'general stop',
        'پلیس یا راهنمای ترافیک <b>یک دست را بالا</b> می‌برد: <b>ایست برای همه</b> (به جز کسانی که آن‌قدر نزدیک‌اند که نمی‌توانند بایستند). دستور او از چراغ و تابلو مهم‌تر است.', 'RVV ماده ۸۲ و ۸۴ و پیوست ۲ (۱)',
        P([I('cop_up', 'algemeen stopteken')])),
      C('دست‌ها به طرفین', 'stopteken voor en achter', 'arms outstretched',
        'یک دست افقی رو به جلو: ایست برای ترافیکی که <b>از روبه‌روی</b> او می‌آید. <b>هر دو دست</b> افقی: ایست برای ترافیکی که از <b>جلو و پشت</b> او می‌آید. از کنارها (پهلوی او) می‌توانی بروی.', 'RVV پیوست ۲ (۲–۴)',
        P([I('cop_side', 'één arm'), I('cop_both', 'beide armen')])),
      C('آهسته کن و راهنمای مدرسه', 'snelheid verminderen · verkeersbrigadier', 'slow down · school patrol',
        'دست افقی که <b>بالا و پایین</b> می‌رود: <b>سرعتت را کم کن</b>. <b>verkeersbrigadier</b> با تابلوی دستی <b>F10</b>: باید بایستی.', 'RVV پیوست ۲ (۷، ۸) و ماده ۸۲ بند ۳',
        P([I('cop_slow', 'langzamer'), I('brig', 'F10')])),
      C('ماشین پلیس: STOP POLITIE', 'stop politie', 'police stop',
        'اگر روی تابلوی روشن ماشین پلیس <b>STOP</b> یا <b>STOP POLITIE</b> (حروف قرمز) یا یک <b>چراغ قرمز</b> دیدی، باید بایستی. «Volg mij» یعنی دنبالش برو.', 'RVV ماده ۸۲a و ۸۳',
        P([I('police', 'STOP POLITIE')]))
    ],
    qs: [
      mc('چراغ زرد شد و تو خیلی نزدیک خط هستی؛ ترمز شدید فقط خطرناک است. چه می‌کنی؟', 'Geel licht, je bent er heel dicht bij.', [['ادامه می‌دهم', 'doorrijden'], ['ترمز شدید می‌کنم', 'hard remmen'], ['دنده عقب', 'achteruit']], 0, 'زرد یعنی بایست، <b>مگر</b> آن‌قدر نزدیک باشی که توقف معقول ممکن نیست.', 'RVV ماده ۶۸ بند ۱ ب', { lights: [['S', 'yellow']], units: [{ id: 'you', from: 'S', d: -8 }] }, 'geel licht|amber light'),
      mc('چراغ زرد شد و تو ۵۰ متر فاصله داری با ۵۰ km/h. چه می‌کنی؟', 'Geel licht, nog 50 meter.', [['می‌ایستم', 'stoppen'], ['گاز می‌دهم تا برسم', 'gas geven']], 0, 'در ۵۰ متر با ۵۰ km/h به راحتی می‌ایستی. زرد = <b>بایست</b>.', 'RVV ماده ۶۸ بند ۱ ب', { lights: [['S', 'yellow']], units: [{ id: 'you', from: 'S', d: 60 }] }, 'geel licht|amber light'),
      mc('چراغ تو سبز است ولی تقاطع پر است و آن طرف جا نیست. چه می‌کنی؟', 'Groen, maar geen ruimte achter het kruispunt.', [['پشت خط صبر می‌کنم', 'wachten voor de streep'], ['وارد تقاطع می‌شوم', 'het kruispunt op']], 0, 'تقاطع را <b>مسدود نکن</b>.', 'RVV ماده ۱۴', { lights: [['S', 'green']], units: [{ id: 'you', from: 'S', d: 8 }, { id: 'a', from: 'S', at: [167, 60], label: '' }, { id: 'b', from: 'S', at: [167, 110], label: '' }] }, 'kruispunt blokkeren|blocking'),
      mc('چراغ پیکان سبز به راست روشن است و چراغ گرد قرمز. تو مستقیم می‌روی. چه می‌کنی؟', 'Groene pijl rechts, rood rond. Jij rechtdoor.', [['می‌ایستم', 'stoppen'], ['حرکت می‌کنم', 'rijden']], 0, 'پیکان فقط برای <b>همان جهت</b> است. برای مستقیم، چراغ گرد قرمز است.', 'RVV ماده ۶۸ بند ۲', P([I('tl_ga', 'pijl groen'), I('tl_r', 'rond rood')]), 'pijllicht|arrow signal'),
      yn('چراغ با تصویر دوچرخه سبز است. با خودرو اجازه داری بروی؟', 'Fietslicht groen: mag je met de auto?', false, 'چراغ با دوچرخه فقط برای دوچرخه و bromfiets روی fietspad است. به چراغ خودت نگاه کن.', 'RVV ماده ۶۸ بند ۳', P([I('tl_f')]), 'fietslicht|cycle signal'),
      mc('چراغ راهنمایی خاموش است و روی جادهٔ تو تابلوی B6 و haaientanden هست. چه می‌کنی؟', 'Verkeerslicht uit, bord B6.', [['به جادهٔ اصلی حق تقدم می‌دهم', 'voorrang verlenen'], ['راست مقدم', 'rechts voor'], ['من مقدمم', 'ik heb voorrang']], 0, 'وقتی چراغ کار نمی‌کند، <b>تابلو</b> اعمال می‌شود.', 'RVV ماده ۶۴', { teeth: ['S'], signsAt: [['S', 'B6', 1]], units: [{ id: 'you', from: 'S', d: 6 }, { id: 'a', label: '۱', from: 'W' }] }, 'verkeerslicht uit|lights off'),
      mc('پلیس <b>یک دست را بالا</b> برده است. یعنی چه؟', 'Agent steekt één arm omhoog.', [['ایست برای همه', 'algemeen stopteken'], ['برو', 'doorrijden'], ['آهسته کن', 'langzamer']], 0, 'دست بالا = <b>ایست عمومی</b>.', 'RVV پیوست ۲ (۱)', P([I('cop_up')]), 'stopteken|stop signal'),
      mc('پلیس روبه‌روی توست و <b>هر دو دستش</b> افقی به طرفین است. تو از روبه‌روی او می‌آیی. چه می‌کنی؟', 'Agent met beide armen gestrekt, jij komt van voren.', [['می‌ایستم', 'stoppen'], ['حرکت می‌کنم', 'doorrijden']], 0, 'هر دو دست افقی: ایست برای ترافیکی که از <b>جلو و پشت</b> او می‌آید.', 'RVV پیوست ۲ (۴)', P([I('cop_both')]), 'stopteken|stop signal'),
      mc('پلیس دستش را افقی بالا و پایین می‌برد. یعنی چه؟', 'Arm op en neer?', [['سرعتت را کم کن', 'snelheid verminderen'], ['برو', 'doorrijden'], ['به راست بپیچ', 'rechtsaf']], 0, 'علامت ۷ پیوست ۲: <b>سرعت کم کن</b>.', 'RVV پیوست ۲ (۷)', P([I('cop_slow')]), 'snelheid verminderen|slow down'),
      mc('پلیس با دست به تو می‌گوید برو، ولی چراغ قرمز است. چه می‌کنی؟', 'Agent wenkt, licht rood.', [['دستور پلیس را دنبال می‌کنم', 'aanwijzing volgen'], ['منتظر سبز می‌مانم', 'wachten op groen']], 0, '<b>aanwijzingen</b> از همه چیز مهم‌ترند.', 'RVV ماده ۸۴', P([I('cop_side'), I('tl_r')]), 'aanwijzing|instruction'),
      yn('پشت ماشین پلیس، تابلوی روشن «STOP POLITIE» با حروف قرمز روشن می‌شود. باید بایستی؟', 'Stop politie: moet je stoppen?', true, 'بله، باید بایستی.', 'RVV ماده ۸۳', P([I('police')]), 'stop politie|police stop'),
      hot('کدام چراغ یعنی «پیاده‌ها به‌زودی قرمز دارند»؟', 'Welk licht betekent: rood komt eraan?', 'b', 'سبز چشمک‌زن پیاده = به‌زودی قرمز. (این‌جا با B نشان داده شده.)', 'RVV ماده ۷۴ ب', P([I('ped_r', 'A', { hot: 'a' }), I('ped_g', 'B (knippert)', { hot: 'b' }), I('tl_y', 'C', { hot: 'c' })], { cols: 3, h: 200 }), 'voetgangerslicht|pedestrian light'),
      mc('تو با چراغ سبز به چپ می‌پیچی. ماشین روبه‌رو هم سبز دارد و مستقیم می‌رود. چه کسی اول؟', 'Beiden groen, jij linksaf.', [['ماشین روبه‌رو', 'de tegenligger'], ['من', 'ik']], 0, 'هر دو سبز؛ قانون پیچیدن: ترافیک مستقیم روبه‌رو مقدم است.', 'RVV ماده ۱۸', { lights: [['S', 'green'], ['N', 'green']], units: [{ id: 'you', from: 'S', go: 'left' }, { id: 'a', label: '۱', from: 'N', go: 'straight' }] }, 'groen licht|green light'),
      mc('کجا پشت چراغ قرمز می‌ایستی؟', 'Waar stop je bij rood?', [['پشت stopstreep', 'voor de stopstreep'], ['روی خط عابر', 'op het zebrapad'], ['کنار چراغ', 'naast het licht']], 0, 'پشت <b>stopstreep</b>.', 'RVV ماده ۷۹', { stopline: ['S'], lights: [['S', 'red']], units: [{ id: 'you', from: 'S', d: 10 }] }, 'stopstreep|stop line'),
      mc('haaientanden روی جاده یعنی چه؟', 'Wat betekenen haaientanden?', [['به رانندگان جادهٔ متقاطع حق تقدم بده', 'voorrang verlenen'], ['سرعت‌گیر', 'drempel'], ['پارک ممنوع', 'parkeerverbod']], 0, 'haaientanden = <b>حق تقدم بده</b>.', 'RVV ماده ۸۰', { teeth: ['S'], units: [{ id: 'you', from: 'S', d: 8 }] }, 'haaientanden|shark teeth'),
      anim('فیلم را ببین. چراغ تو سبز است و به راست می‌پیچی. چه می‌کنی؟', 'Wat doe je?', [['صبر می‌کنم تا پیاده رد شود', 'voetganger voor laten gaan'], ['می‌پیچم، چراغم سبز است', 'doorrijden'], ['بوق می‌زنم', 'toeteren']], 0, 'پیاده‌ای که در امتداد راه تو مستقیم می‌رود همزمان سبز دارد؛ هنگام پیچیدن او را اول بگذار.', 'RVV ماده ۱۸ بند ۱', { lights: [['S', 'green']], noArrows: true, units: [{ id: 'you', from: 'S', d: -4, blink: 'r', anim: [60, 0, 2.4] }, { id: 'c', kind: 'ped', label: 'P', from: 'S', at: [192, 205], anim: [90, 0.2, 2.6] }] }, 'afslaan|turning')
    ]
  });
})();
