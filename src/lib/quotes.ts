import { R, type LocaleId } from './locales'

export type QuoteKind = 'pd' | 'essence'

export type Quote = {
  id: string
  kind: QuoteKind
  author: string
  work: string
  free?: boolean
  text: Record<LocaleId, string>
}

export const quotes: Quote[] = [
  {
    id: 'epictetus-views',
    kind: 'pd',
    author: 'Epictetus',
    work: 'Enchiridion',
    free: true,
    text: R('İnsanları rahatsız eden şeyler değil, şeyler hakkındaki yargılarıdır.|People are disturbed not by things, but by the views they take of them.|İnsanları narahat edən şeylər yox, onlar haqqındakı hökmərləridir.|Людей тревожат не вещи, а суждения о вещах.|No inquietan las cosas, sino los juicios sobre ellas.|Ce ne sont pas les choses qui troublent, mais les jugements portés sur elles.|Nicht die Dinge beunruhigen, sondern die Urteile über sie.|Non le cose turbano, ma i giudizi su di esse.|Não são as coisas que perturbam, mas os juízos sobre elas.|لا تزعجنا الأشياء بل أحكامنا عليها.|Niet de dingen storen, maar de oordelen erover.|Nie rzeczy niepokoją, lecz sądy o nich.|Тривожать не речі, а судження про них.|人を乱すのは物事ではなく、それに対する見解である。|چیزها آزار نمی‌دهند؛ داوری ما دربارهٔ آن‌ها می‌آزارد.|扰乱人的不是事物，而是对事物的看法。'),
  },
  {
    id: 'seneca-imagination',
    kind: 'pd',
    author: 'Seneca',
    work: 'Letters',
    free: true,
    text: R('Çoğu kez gerçekten değil, hayalde daha çok acı çekeriz.|We suffer more often in imagination than in reality.|Çox vaxt gerçəkdən yox, xəyalda daha çox əziyyət çəkirik.|Чаще страдаем в воображении, чем на деле.|Sufrimos más a menudo en la imaginación que en la realidad.|Nous souffrons plus souvent en imagination qu’en réalité.|Wir leiden öfter in der Vorstellung als in der Wirklichkeit.|Soffriamo più spesso nell’immaginazione che nella realtà.|Sofremos mais vezes na imaginação do que na realidade.|نتألم في الخيال أكثر مما نتألم في الواقع.|We lijden vaker in verbeelding dan in werkelijkheid.|Cierpimy częściej w wyobraźni niż w rzeczywistości.|Частіше страждаємо в уяві, ніж насправді.|現実より想像のなかで苦しむことのほうが多い。|بیشتر در خیال رنج می‌بریم تا در واقعیت.|我们更多是在想象里受苦，而不是在事实里。'),
  },
  {
    id: 'aurelius-mind',
    kind: 'pd',
    author: 'Marcus Aurelius',
    work: 'Meditations',
    text: R('Dış olaylar üzerinde değil, kendi zihnin üzerinde gücün vardır.|You have power over your mind, not over outward events.|Zahiri olaylar üzərində yox, öz zehnin üzərində gücün var.|Власть у тебя над умом, не над внешними событиями.|Tienes poder sobre tu mente, no sobre los sucesos de fuera.|Tu as pouvoir sur ton esprit, non sur les événements du dehors.|Du hast Macht über deinen Geist, nicht über äußere Ereignisse.|Hai potere sulla mente, non sugli eventi esterni.|Tens poder sobre a mente, não sobre os eventos de fora.|سلطانك على عقلك لا على الأحداث الخارجية.|Je hebt macht over je geest, niet over uiterlijke gebeurtenissen.|Masz władzę nad umysłem, nie nad zdarzeniami zewnątrz.|Маєш владу над розумом, не над зовнішніми подіями.|外の出来事ではなく、自分の心に力がある。|نیرویت بر ذهن توست، نه بر رویدادهای بیرونی.|你能主宰的是心，不是外在事件。'),
  },
  {
    id: 'aurelius-future',
    kind: 'pd',
    author: 'Marcus Aurelius',
    work: 'Meditations',
    text: R('Gelecek seni rahatsız etmesin. Ona, bugün kullandığın akıl ile rastlayacaksın.|Do not let the future disturb you. You will meet it with the same reason you use today.|Gələcək səni narahat etməsin. Ona bu günkü ağıl ilə rast gələcəksən.|Пусть будущее не тревожит. Встретишь его тем же разумом, что сегодня.|No dejes que el futuro te inquiete. Lo encontrarás con la misma razón de hoy.|Que l’avenir ne te trouble pas. Tu l’aborderas avec la même raison qu’aujourd’hui.|Lass die Zukunft dich nicht stören. Du triffst sie mit derselben Vernunft wie heute.|Non lasciare che il futuro ti turbi. Lo incontrerai con la stessa ragione di oggi.|Não deixes o futuro perturbar-te. Encontrá-lo-ás com a mesma razão de hoje.|لا يزعجك الغد. ستلقاه بالعقل نفسه الذي تستخدمه اليوم.|Laat de toekomst je niet storen. Je ontmoet haar met dezelfde rede als vandaag.|Niech przyszłość cię nie niepokoi. Spotkasz ją tym samym rozumem co dziś.|Нехай майбутнє не тривожить. Зустрінеш його тим самим розумом, що й сьогодні.|未来に乱されるな。今日使う理性でそれに会う。|آینده آزارت ندهد. با همان خردی که امروز به کار می‌بری با آن روبه‌رو می‌شوی.|别让未来搅扰你。你会用今天这份理性去遇见它。'),
  },
  {
    id: 'james-attend',
    kind: 'pd',
    author: 'William James',
    work: 'The Principles of Psychology',
    text: R('Deneyimim, dikkat etmeye razı olduğum şeydir.|My experience is what I agree to attend to.|Təcrübəm, diqqət yetirməyə razı olduğum şeydir.|Мой опыт — то, на что я согласен обратить внимание.|Mi experiencia es aquello a lo que acepto atender.|Mon expérience est ce à quoi j’accepte de prêter attention.|Meine Erfahrung ist das, dem ich Aufmerksamkeit gewähre.|La mia esperienza è ciò a cui accetto di attendere.|A minha experiência é aquilo a que aceito atender.|تجربتي هي ما أوافق على الانتباه إليه.|Mijn ervaring is datgene waarop ik wil letten.|Moje doświadczenie to to, na co zgadzam się zwracać uwagę.|Мій досвід — те, на що погоджуюсь звертати увагу.|私の経験とは、注意を向けることに同意したものだ。|تجربهٔ من همان است که می‌پذیرم به آن توجه کنم.|我的经验，就是我同意去注意的东西。'),
  },
  {
    id: 'james-overlook',
    kind: 'pd',
    author: 'William James',
    work: 'The Principles of Psychology',
    text: R('Bilgelik sanatı, neyi görmezden geleceğini bilme sanatıdır.|The art of being wise is the art of knowing what to overlook.|Müdriklik sənəti, nəyə göz yumacağını bilmək sənətidir.|Искусство мудрости — знать, что можно обойти вниманием.|El arte de ser sabio es saber qué pasar por alto.|L’art d’être sage est de savoir ce qu’il faut négliger.|Die Kunst klug zu sein ist die Kunst zu wissen, was man übergeht.|L’arte di essere saggi è sapere che cosa tralasciare.|A arte de ser sábio é saber o que ignorar.|فن الحكمة أن تعرف ما الذي تتجاوزه.|De kunst van wijsheid is weten wat je kunt laten liggen.|Sztuka mądrości to wiedzieć, co pominąć.|Мистецтво мудрості — знати, що обійти увагою.|賢明である技は、何を見過ごすかを知ることだ。|هنر خردمند بودن دانستن این است که از چه چشم بپوشی.|智慧的技艺，是知道该忽略什么。'),
  },
  {
    id: 'epictetus-power',
    kind: 'pd',
    author: 'Epictetus',
    work: 'Enchiridion',
    text: R('Elinden geleni en iyi kullan; gerisini olduğu gibi al.|Make the best use of what is in your power, and take the rest as it happens.|Əlinin çatdığını ən yaxşı işlət; qalanını olduğu kimi götür.|Лучше используй то, что в твоей власти, остальное принимай как есть.|Usa lo mejor de lo que está en tu poder y toma el resto como venga.|Fais le meilleur usage de ce qui est en ton pouvoir, et prends le reste comme il vient.|Nutze das in deiner Macht Liegende am besten und nimm das Übrige, wie es kommt.|Usa al meglio ciò che è in tuo potere e prendi il resto come avviene.|Usa o melhor do que está no teu poder e aceita o resto como vier.|أحسن استخدام ما في طاقتك وخذ الباقي كما يأتي.|Gebruik het beste wat in je macht is en neem de rest zoals het komt.|Użyj najlepiej tego, co w twojej mocy, a resztę przyjmij jak przychodzi.|Найкраще використай те, що в твоїй владі, решту бери як є.|自分の力の内を最善に用い、残りはそのまま受けよ。|آنچه در توان توست نیک به کار ببر و بقیه را همان‌گونه که می‌آید بگیر.|把你能力所及用到最好，其余的照它来时接受。'),
  },
  {
    id: 'seneca-peace',
    kind: 'pd',
    author: 'Seneca',
    work: 'Letters',
    text: R('Zihin, kendi içinde sakin olmadıkça doğru durmaz.|The mind is never right unless it is at peace within itself.|Zihin öz içində sakit olmayınca düz durmur.|Ум не бывает в порядке, пока не спокоен внутри.|La mente no está bien si no está en paz consigo.|L’esprit n’est jamais juste s’il n’est en paix en lui-même.|Der Geist ist nie in Ordnung, wenn er nicht in sich ruhig ist.|La mente non è a posto se non è in pace con sé.|A mente não está certa se não está em paz consigo.|لا يستقيم العقل ما لم يطمئن في داخله.|De geest is nooit in orde tenzij hij in zichzelf rust.|Umysł nie jest w porządku, dopóki nie ma w sobie spokoju.|Розум не буває в ладі, доки не спокійний у собі.|心は内に穏やかでなければ整わない。|ذهن تا در درون آرام نباشد راست نمی‌ایستد.|心若不能内在安宁，便不能端正。'),
  },
  {
    id: 'cbt-thought',
    kind: 'essence',
    author: 'CBT',
    work: '',
    free: true,
    text: R('Bir düşünce yüksek sesli olabilir ve yine de doğru olmayabilir.|A thought can be loud and still be untrue.|Bir fikir ucadan ola bilər və yenə də doğru olmaya bilər.|Мысль может быть громкой и всё же неверной.|Un pensamiento puede ser alto y aun así no ser cierto.|Une pensée peut être forte et rester fausse.|Ein Gedanke kann laut sein und trotzdem unwahr.|Un pensiero può essere forte e restare falso.|Um pensamento pode ser alto e ainda assim não ser verdadeiro.|قد يكون الخاطر عالي الصوت ومع ذلك غير صادق.|Een gedachte kan luid zijn en toch onwaar.|Myśl może być głośna i mimo to nieprawdziwa.|Думка може бути гучною і все ж неправдивою.|思考は大きくても、真実でなくてよい。|یک فکر می‌تواند بلند باشد و باز هم درست نباشد.|念头可以很响，却仍然不真。'),
  },
  {
    id: 'act-carry',
    kind: 'essence',
    author: 'ACT',
    work: '',
    text: R('Duyguyu taşıyabilir ve yine de bir sonraki küçük adımı atabilirsin.|You can carry the feeling and still take the next small step.|Hissi daşıya və yenə də növbəti kiçik addımı ata bilərsən.|Чувство можно нести и всё же сделать следующий малый шаг.|Puedes llevar el sentir y aun así dar el siguiente paso pequeño.|Tu peux porter le senti et faire quand même le petit pas suivant.|Du kannst das Gefühl tragen und trotzdem den nächsten kleinen Schritt tun.|Puoi portare la sensazione e fare comunque il passo piccolo dopo.|Podes carregar o sentir e ainda dar o próximo passo pequeno.|يمكنك حمل الشعور ومع ذلك تأخذ الخطوة الصغيرة التالية.|Je kunt het gevoel dragen en toch de volgende kleine stap zetten.|Możesz nieść uczucie i mimo to zrobić następny mały krok.|Можеш нести відчуття і все ж зробити наступний малий крок.|感覚を抱えたまま、次の小さな一歩は踏める。|می‌توانی حس را حمل کنی و باز گام کوچک بعدی را برداری.|你可以带着感觉，仍然迈出下一小步。'),
  },
  {
    id: 'ground-five',
    kind: 'essence',
    author: 'Grounding',
    work: '',
    free: true,
    text: R('Gördüğün beş şeyi adlandır; oda geri gelir.|Name five things you see; the room comes back.|Gördüyün beş şeyi adlandır; otaq geri gəlir.|Назови пять видимых вещей — комната вернётся.|Nombra cinco cosas que ves; la habitación vuelve.|Nomme cinq choses que tu vois ; la pièce revient.|Nenne fünf Dinge, die du siehst; der Raum kehrt zurück.|Nomina cinque cose che vedi; la stanza torna.|Nomeia cinco coisas que vês; o quarto regressa.|سَمِّ خمسة أشياء تراها؛ الغرفة تعود.|Noem vijf dingen die je ziet; de kamer komt terug.|Nazwij pięć rzeczy, które widzisz; pokój wraca.|Назви п’ять речей, які бачиш; кімната повертається.|見えるものを五つ名指せ。部屋が戻ってくる。|پنج چیز را که می‌بینی نام ببر؛ اتاق برمی‌گردد.|说出你看见的五样东西；房间会回来。'),
  },
  {
    id: 'wave-peak',
    kind: 'essence',
    author: 'Panic wave',
    work: '',
    text: R('Alarm tırmanır, tepe yapar, iner. Sen kalırsın.|Alarm rises, peaks, falls. You remain.|Siqnal qalxır, zirvə edir, enir. Sən qalırsan.|Сигнал поднимается, пик, спад. Ты остаёшься.|La alarma sube, hace cima, baja. Tú quedas.|L’alarme monte, culmine, redescend. Tu restes.|Der Alarm steigt, gipfelt, fällt. Du bleibst.|L’allarme sale, culmina, scende. Tu resti.|O alarme sobe, faz cume, desce. Tu ficas.|الإنذار يصعد ويبلغ الذروة ويهبط. أنت تبقى.|Het alarm stijgt, piekt, daalt. Jij blijft.|Alarm wznosi się, szczyt, spada. Ty zostajesz.|Сигнал підіймається, пік, спад. Ти лишаєшся.|警報は上がり、頂点、そして下りる。あなたは残る。|هشدار بالا می‌رود، اوج می‌گیرد، فرو می‌نشیند. تو می‌مانی.|警报升起、见顶、落下。你还在。'),
  },
  {
    id: 'sleep-bed',
    kind: 'essence',
    author: 'Sleep',
    work: '',
    text: R('Yatak uykuya aittir, mahkemeye değil.|The bed belongs to sleep, not to court.|Yataq yuxuyadır, məhkəməyə yox.|Кровать — для сна, не для суда.|La cama es del sueño, no del tribunal.|Le lit est au sommeil, non au tribunal.|Das Bett gehört dem Schlaf, nicht dem Gericht.|Il letto è del sonno, non del tribunale.|A cama é do sono, não do tribunal.|السرير للنوم لا للمحكمة.|Het bed hoort bij slaap, niet bij de rechtbank.|Łóżko jest do snu, nie do sądu.|Ліжко для сну, не для суду.|ベッドは睡眠のものであり、法廷のものではない。|تخت از آنِ خواب است، نه دادگاه.|床属于睡眠，不属于法庭。'),
  },
  {
    id: 'breath-exhale',
    kind: 'essence',
    author: 'Breath',
    work: '',
    text: R('Daha uzun bir veriş, bedene inebileceğini söyler.|A longer exhale tells the body it can stand down.|Daha uzun bir veriş, bədənə enə biləcəyini deyir.|Более длинный выдох говорит телу, что можно снижаться.|Una exhalación más larga dice al cuerpo que puede bajar.|Une expiration plus longue dit au corps qu’il peut redescendre.|Ein längeres Ausatmen sagt dem Körper, er darf nachgeben.|Un’espirazione più lunga dice al corpo che può scendere.|Uma expiração mais longa diz ao corpo que pode baixar.|زفير أطول يخبر الجسد أنه يستطيع أن يهدأ.|Een langere uitadem vertelt het lijf dat het mag zakken.|Dłuższy wydech mówi ciału, że może opaść.|Довший видих каже тілу, що можна спадати.|長い吐息は、体に降りてよいと伝える。|بازدم بلندتر به بدن می‌گوید می‌تواند فرو بنشیند.|更长的呼气告诉身体：可以降下。'),
  },
  {
    id: 'kind-friend',
    kind: 'essence',
    author: 'Self-talk',
    work: '',
    text: R('Kendine, yorgun bir arkadaşa konuşur gibi konuş.|Speak to yourself as you would to a tired friend.|Özünə yorğun bir dosta danışırmış kimi danış.|Говори с собой так, как с усталым другом.|Háblate como hablarías a un amigo cansado.|Parle-toi comme tu parlerais à un ami fatigué.|Sprich mit dir wie mit einem müden Freund.|Parlati come parleresti a un amico stanco.|Fala contigo como falarias a um amigo cansado.|كلّم نفسك كما تكلم صديقًا متعبًا.|Spreek tot jezelf zoals tot een vermoeide vriend.|Mów do siebie jak do zmęczonego przyjaciela.|Говори до себе, як до стомленого друга.|疲れた友に話すように、自分に話せ。|با خود چنان حرف بزن که با دوستی خسته.|对自己说话，要像对一个疲倦的朋友。'),
  },
  {
    id: 'attention-return',
    kind: 'essence',
    author: 'Attention',
    work: '',
    free: true,
    text: R('Bu nefese bir kez daha dön. Dönmek, pratiktir.|Return once more to this breath. Returning is the practice.|Bu nəfəsə bir daha dön. Dönmək, təcrübədir.|Вернись ещё раз к этому дыханию. Возвращение и есть практика.|Vuelve otra vez a este aliento. Volver es la práctica.|Reviens encore à ce souffle. Revenir est la pratique.|Kehre noch einmal zu diesem Atem. Das Zurückkehren ist die Übung.|Ritorna ancora a questo respiro. Il tornare è la pratica.|Volta mais uma vez a este fôlego. Voltar é a prática.|عد مرة أخرى إلى هذا النفس. العودة هي التمرين.|Keer nog eens terug naar deze adem. Terugkeren is de oefening.|Wróć jeszcze raz do tego oddechu. Powracanie jest praktyką.|Повернись ще раз до цього подиху. Повернення і є практика.|この息にもう一度戻る。戻ることが実践だ。|بار دیگر به این نفس بازگرد. بازگشت همان تمرین است.|再回到这一口气。回来，就是练习。'),
  },
  {
    id: 'dp-weight',
    kind: 'essence',
    author: 'Depersonalization',
    work: '',
    text: R('Sandalyedeki ağırlık bir olgudur; izleyici hikâyesi bekleyebilir.|Weight in the chair is a fact; the spectator story can wait.|Oturacaqdakı ağırlıq bir faktdır; izləyici hekayəsi gözləyə bilər.|Вес в стуле — факт; история зрителя может подождать.|El peso en la silla es un hecho; la historia del espectador puede esperar.|Le poids dans la chaise est un fait ; l’histoire du spectateur peut attendre.|Das Gewicht im Stuhl ist eine Tatsache; die Zuschauer-Geschichte kann warten.|Il peso sulla sedia è un fatto; la storia dello spettatore può aspettare.|O peso na cadeira é um facto; a história do espectador pode esperar.|الثقل على الكرسي حقيقة؛ حكاية المتفرج يمكن أن تنتظر.|Gewicht in de stoel is een feit; het toeschouwersverhaal kan wachten.|Ciężar na krześle jest faktem; historia widza może poczekać.|Вага в стільці — факт; історія глядача може зачекати.|椅子の重さは事実だ。見物人の物語は待てる。|وزن روی صندلی یک واقعیت است؛ داستان تماشاگر می‌تواند صبر کند.|椅上的重量是事实；旁观者的故事可以等。'),
  },
  {
    id: 'dr-edges',
    kind: 'essence',
    author: 'Derealization',
    work: '',
    text: R('Kenar, renk, ısı. Dünya cam gibi dursa da pervaz durur.|Edges, color, heat. The world can feel like glass and still have a sill.|Kənar, rəng, istilik. Dünya şüşə kimi dursa da pəncərə eşiyi durur.|Край, цвет, тепло. Мир может быть как стекло — подоконник всё равно есть.|Borde, color, calor. El mundo puede ser vidrio y aun así tener alféizar.|Bord, couleur, chaleur. Le monde peut être verre et garder un rebord.|Kante, Farbe, Wärme. Die Welt kann Glas sein — das Sims bleibt.|Bordo, colore, calore. Il mondo può essere vetro e avere comunque il davanzale.|Borda, cor, calor. O mundo pode ser vidro e ainda ter peitoril.|حافة، لون، حرارة. قد يكون العالم زجاجًا ويبقى العتبة.|Rand, kleur, warmte. De wereld kan glas zijn en toch een vensterbank hebben.|Krawędź, kolor, ciepło. Świat może być szkłem, a parapet zostaje.|Край, колір, тепло. Світ може бути склом — підвіконня лишається.|縁、色、熱。世界がガラスのようでも、窓枠はある。|لبه، رنگ، گرما. جهان می‌تواند شیشه باشد و باز آستانه بماند.|边缘、颜色、温度。世界可以像玻璃，窗台仍在。'),
  },
]

export function quoteById(id: string) {
  return quotes.find((q) => q.id === id)
}

export function todaysQuote(now = Date.now()): Quote {
  const i = Math.floor(now / 86_400_000) % quotes.length
  return quotes[i]!
}
