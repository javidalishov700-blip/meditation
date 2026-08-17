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
    text: R('İnsanları rahatsız eden şeyler değil, şeyler hakkındaki yargılarıdır.|People are disturbed not by things, but by the views they take of them.|İnsanları narahat edən şeylər yox, onlar haqqındakı hökmərləridir.|Людей тревожат не вещи, а суждения о вещах.|No inquietan las cosas, sino los juicios sobre ellas.|Non le cose turbano, ma i giudizi su di esse.'),
  },
  {
    id: 'seneca-imagination',
    kind: 'pd',
    author: 'Seneca',
    work: 'Letters',
    text: R('Çoğu kez gerçekten değil, hayalde daha çok acı çekeriz.|We suffer more often in imagination than in reality.|Çox vaxt gerçəkdən yox, xəyalda daha çox əziyyət çəkirik.|Чаще страдаем в воображении, чем на деле.|Sufrimos más a menudo en la imaginación que en la realidad.|Soffriamo più spesso nell’immaginazione che nella realtà.'),
  },
  {
    id: 'aurelius-mind',
    kind: 'pd',
    author: 'Marcus Aurelius',
    work: 'Meditations',
    text: R('Dış olaylar üzerinde değil, kendi zihnin üzerinde gücün vardır.|You have power over your mind, not over outward events.|Zahiri olaylar üzərində yox, öz zehnin üzərində gücün var.|Власть у тебя над умом, не над внешними событиями.|Tienes poder sobre tu mente, no sobre los sucesos de fuera.|Hai potere sulla mente, non sugli eventi esterni.'),
  },
  {
    id: 'aurelius-future',
    kind: 'pd',
    author: 'Marcus Aurelius',
    work: 'Meditations',
    text: R('Gelecek seni rahatsız etmesin. Ona, bugün kullandığın akıl ile rastlayacaksın.|Do not let the future disturb you. You will meet it with the same reason you use today.|Gələcək səni narahat etməsin. Ona bu günkü ağıl ilə rast gələcəksən.|Пусть будущее не тревожит. Встретишь его тем же разумом, что сегодня.|No dejes que el futuro te inquiete. Lo encontrarás con la misma razón de hoy.|Non lasciare che il futuro ti turbi. Lo incontrerai con la stessa ragione di oggi.'),
  },
  {
    id: 'james-attend',
    kind: 'pd',
    author: 'William James',
    work: 'The Principles of Psychology',
    text: R('Deneyimim, dikkat etmeye razı olduğum şeydir.|My experience is what I agree to attend to.|Təcrübəm, diqqət yetirməyə razı olduğum şeydir.|Мой опыт — то, на что я согласен обратить внимание.|Mi experiencia es aquello a lo que acepto atender.|La mia esperienza è ciò a cui accetto di attendere.'),
  },
  {
    id: 'james-overlook',
    kind: 'pd',
    author: 'William James',
    work: 'The Principles of Psychology',
    text: R('Bilgelik sanatı, neyi görmezden geleceğini bilme sanatıdır.|The art of being wise is the art of knowing what to overlook.|Müdriklik sənəti, nəyə göz yumacağını bilmək sənətidir.|Искусство мудрости — знать, что можно обойти вниманием.|El arte de ser sabio es saber qué pasar por alto.|L’arte di essere saggi è sapere che cosa tralasciare.'),
  },
  {
    id: 'epictetus-power',
    kind: 'pd',
    author: 'Epictetus',
    work: 'Enchiridion',
    text: R('Elinden geleni en iyi kullan; gerisini olduğu gibi al.|Make the best use of what is in your power, and take the rest as it happens.|Əlinin çatdığını ən yaxşı işlət; qalanını olduğu kimi götür.|Лучше используй то, что в твоей власти, остальное принимай как есть.|Usa lo mejor de lo que está en tu poder y toma el resto como venga.|Usa al meglio ciò che è in tuo potere e prendi il resto come avviene.'),
  },
  {
    id: 'seneca-peace',
    kind: 'pd',
    author: 'Seneca',
    work: 'Letters',
    text: R('Zihin, kendi içinde sakin olmadıkça doğru durmaz.|The mind is never right unless it is at peace within itself.|Zihin öz içində sakit olmayınca düz durmur.|Ум не бывает в порядке, пока не спокоен внутри.|La mente no está bien si no está en paz consigo.|La mente non è a posto se non è in pace con sé.'),
  },
  {
    id: 'cbt-thought',
    kind: 'essence',
    author: 'CBT',
    work: '',
    text: R('Bir düşünce yüksek sesli olabilir ve yine de doğru olmayabilir.|A thought can be loud and still be untrue.|Bir fikir ucadan ola bilər və yenə də doğru olmaya bilər.|Мысль может быть громкой и всё же неверной.|Un pensamiento puede ser alto y aun así no ser cierto.|Un pensiero può essere forte e restare falso.'),
  },
  {
    id: 'act-carry',
    kind: 'essence',
    author: 'ACT',
    work: '',
    text: R('Duyguyu taşıyabilir ve yine de bir sonraki küçük adımı atabilirsin.|You can carry the feeling and still take the next small step.|Hissi daşıya və yenə də növbəti kiçik addımı ata bilərsən.|Чувство можно нести и всё же сделать следующий малый шаг.|Puedes llevar el sentir y aun así dar el siguiente paso pequeño.|Puoi portare la sensazione e fare comunque il passo piccolo dopo.'),
  },
  {
    id: 'ground-five',
    kind: 'essence',
    author: 'Grounding',
    work: '',
    free: true,
    text: R('Gördüğün beş şeyi adlandır; oda geri gelir.|Name five things you see; the room comes back.|Gördüyün beş şeyi adlandır; otaq geri gəlir.|Назови пять видимых вещей — комната вернётся.|Nombra cinco cosas que ves; la habitación vuelve.|Nomina cinque cose che vedi; la stanza torna.'),
  },
  {
    id: 'wave-peak',
    kind: 'essence',
    author: 'Panic wave',
    work: '',
    text: R('Alarm tırmanır, tepe yapar, iner. Sen kalırsın.|Alarm rises, peaks, falls. You remain.|Siqnal qalxır, zirvə edir, enir. Sən qalırsan.|Сигнал поднимается, пик, спад. Ты остаёшься.|La alarma sube, hace cima, baja. Tú quedas.|L’allarme sale, culmina, scende. Tu resti.'),
  },
  {
    id: 'sleep-bed',
    kind: 'essence',
    author: 'Sleep',
    work: '',
    text: R('Yatak uykuya aittir, mahkemeye değil.|The bed belongs to sleep, not to court.|Yataq yuxuyadır, məhkəməyə yox.|Кровать — для сна, не для суда.|La cama es del sueño, no del tribunal.|Il letto è del sonno, non del tribunale.'),
  },
  {
    id: 'breath-exhale',
    kind: 'essence',
    author: 'Breath',
    work: '',
    text: R('Daha uzun bir veriş, bedene inebileceğini söyler.|A longer exhale tells the body it can stand down.|Daha uzun bir veriş, bədənə enə biləcəyini deyir.|Более длинный выдох говорит телу, что можно снижаться.|Una exhalación más larga dice al cuerpo que puede bajar.|Un’espirazione più lunga dice al corpo che può scendere.'),
  },
  {
    id: 'kind-friend',
    kind: 'essence',
    author: 'Self-talk',
    work: '',
    text: R('Kendine, yorgun bir arkadaşa konuşur gibi konuş.|Speak to yourself as you would to a tired friend.|Özünə yorğun bir dosta danışırmış kimi danış.|Говори с собой так, как с усталым другом.|Háblate como hablarías a un amigo cansado.|Parlati come parleresti a un amico stanco.'),
  },
  {
    id: 'attention-return',
    kind: 'essence',
    author: 'Attention',
    work: '',
    text: R('Bu nefese bir kez daha dön. Dönmek, pratiktir.|Return once more to this breath. Returning is the practice.|Bu nəfəsə bir daha dön. Dönmək, təcrübədir.|Вернись ещё раз к этому дыханию. Возвращение и есть практика.|Vuelve otra vez a este aliento. Volver es la práctica.|Ritorna ancora a questo respiro. Il tornare è la pratica.'),
  },
  {
    id: 'dp-weight',
    kind: 'essence',
    author: 'Depersonalization',
    work: '',
    text: R('Sandalyedeki ağırlık bir olgudur; izleyici hikâyesi bekleyebilir.|Weight in the chair is a fact; the spectator story can wait.|Oturacaqdakı ağırlıq bir faktdır; izləyici hekayəsi gözləyə bilər.|Вес в стуле — факт; история зрителя может подождать.|El peso en la silla es un hecho; la historia del espectador puede esperar.|Il peso sulla sedia è un fatto; la storia dello spettatore può aspettare.'),
  },
  {
    id: 'dr-edges',
    kind: 'essence',
    author: 'Derealization',
    work: '',
    text: R('Kenar, renk, ısı. Dünya cam gibi dursa da pervaz durur.|Edges, color, heat. The world can feel like glass and still have a sill.|Kənar, rəng, istilik. Dünya şüşə kimi dursa da pəncərə eşiyi durur.|Край, цвет, тепло. Мир может быть как стекло — подоконник всё равно есть.|Borde, color, calor. El mundo puede ser vidrio y aun así tener alféizar.|Bordo, colore, calore. Il mondo può essere vetro e avere comunque il davanzale.'),
  },
]

export function quoteById(id: string) {
  return quotes.find((q) => q.id === id)
}

export function todaysQuote(now = Date.now()): Quote {
  const i = Math.floor(now / 86_400_000) % quotes.length
  return quotes[i]!
}
