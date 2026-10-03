import type { LocaleId } from './locales'

function pack(
  tr: string,
  en: string,
  es: string,
  it: string,
  az: string,
  ru: string,
): Record<LocaleId, string> {
  return { tr, en, es, it, az, ru }
}

/**
 * Spoken meditations: plain, warm guidance a listener can follow with eyes
 * closed — one clear instruction per paragraph, a pause between paragraphs.
 * Not a treatment and no diagnosis. Each paragraph break is a pause in the
 * baked audio, so keep them.
 */
export const MED_SCRIPTS: Record<string, Record<LocaleId, string>> = {
  'first-settle': pack(
    `Hoş geldin. Önümüzdeki birkaç dakika boyunca hiçbir şeyi iyi yapmak zorunda değilsin. Sadece gel ve otur.

Oturarak ya da uzanarak rahat bir pozisyon bul. Altındaki şey — sandalye, yatak ya da zemin — ağırlığını taşısın. Zaten başından beri seni taşıyordu. Buna izin verebilirsin.

İstersen gözlerini kapat ya da bakışını önündeki bir noktaya yumuşakça bırak.

Alnını fark et. Biraz yumuşayabilir mi, bir bak. Kaşların gevşesin. Çenen hafifçe gevşesin, dişlerin birbirinden biraz ayrılsın. Dilin de dinlenebilir.

Şimdi omuzların. Çoğumuz onları fark etmeden yukarıda taşırız. Kulaklarından uzaklaşacak şekilde aşağı bırak. Kolların ağırlaşsın, ellerin olduğu yerde dinlensin.

Nefesini fark et, değiştirmeye çalışmadan. Hava giriyor, hava çıkıyor. Şu an doğru bir nefes alma şekli yok. Sadece olmasına izin ver.

Zihnin planlara ya da endişelere kayarsa bu tamamen normal. Zihin böyle çalışır. Her fark ettiğinde, nazikçe bedeninin taşındığı hissine geri dön.

Sırtını hisset. Bacaklarını hisset. Ayaklarını hisset. Bütün bedenin dinleniyor, taşınıyor.

Birkaç nefes boyunca burada kal. Düzeltecek bir şey yok. Çözecek bir şey yok. Sadece bu an ve içindeki sen.

Hazır olduğunda biraz daha derin bir nefes al ve yavaşça bırak. Geldin.`,
    `Welcome. For the next few minutes there is nothing you need to do well. Just arrive.

Find a comfortable position, sitting or lying down. Let whatever is under you — a chair, a bed, the floor — take your weight. It has been holding you all along. You can let it.

If it feels right, close your eyes, or let your gaze rest softly on one spot in front of you.

Notice your forehead. See if it can soften, just a little. Let your eyebrows relax. Let your jaw loosen, so your teeth part slightly. Your tongue can rest.

Now your shoulders. Many of us carry them high without noticing. Let them drop, away from your ears. Let your arms feel heavy, and your hands rest wherever they are.

Notice your breath, without changing it. The air comes in, the air goes out. There is no right way to breathe right now. Simply let it happen.

If your mind wanders to plans or worries, that is completely normal. That is what minds do. Each time you notice it, gently come back to the feeling of your body being supported.

Feel your back. Feel your legs. Feel your feet. Your whole body, resting, held.

Stay with this for a few breaths. Nothing to fix. Nothing to solve. Just this moment, and you in it.

When you are ready, take one slightly deeper breath, and let it go slowly. You have arrived.`,
    `Te doy la bienvenida. Durante los próximos minutos no tienes que hacer nada bien. Solo llegar.

Busca una postura cómoda para sentarte o tumbarte. Deja que lo que tienes debajo —una silla, la cama, el suelo— sostenga tu peso. Te ha estado sosteniendo todo este tiempo. Puedes permitírselo.

Si te apetece, cierra los ojos o deja que la mirada descanse suavemente en un punto frente a ti.

Nota tu frente. Mira si puede suavizarse un poco. Deja que se relajen las cejas. Afloja la mandíbula, de modo que los dientes se separen ligeramente. La lengua también puede descansar.

Ahora los hombros. Muchas veces los llevamos altos sin darnos cuenta. Déjalos caer, lejos de las orejas. Deja que los brazos pesen y que las manos descansen donde están.

Observa tu respiración, sin cambiarla. El aire entra, el aire sale. Ahora no hay una forma correcta de respirar. Simplemente deja que suceda.

Si la mente se va a planes o preocupaciones, es completamente normal. Así funciona la mente. Cada vez que lo notes, vuelve con suavidad a la sensación de tu cuerpo sostenido.

Siente la espalda. Siente las piernas. Siente los pies. Todo tu cuerpo descansa, sostenido.

Quédate así unas cuantas respiraciones. Nada que arreglar. Nada que resolver. Solo este momento, y tú en él.

Cuando quieras, toma una respiración un poco más profunda y suéltala despacio. Ya estás aquí.`,
    `Ti do il benvenuto. Per i prossimi minuti non devi fare niente di speciale. Solo arrivare.

Trova una posizione comoda, su una sedia o sdraiandoti. Lascia che ciò che hai sotto di te — una sedia, il letto, il pavimento — sostenga il tuo peso. Ti ha sostenuto per tutto questo tempo. Puoi permetterglielo.

Se ti va, chiudi gli occhi o lascia che lo sguardo si posi morbido su un punto davanti a te.

Nota la fronte. Guarda se può ammorbidirsi un po’. Lascia andare le sopracciglia. Rilassa la mascella, così che i denti si separino appena. Anche la lingua può riposare.

Ora le spalle. Spesso le portiamo alte senza accorgercene. Lasciale scendere, lontano dalle orecchie. Lascia che le braccia diventino pesanti e che le mani riposino dove sono.

Osserva il respiro, senza cambiarlo. L’aria entra, l’aria esce. Adesso non c’è un modo giusto di respirare. Lascia semplicemente che accada.

Se la mente scivola verso piani o preoccupazioni, è del tutto normale. La mente funziona così. Ogni volta che te ne accorgi, torna con gentilezza alla sensazione del corpo sostenuto.

Senti la schiena. Senti le gambe. Senti i piedi. Tutto il corpo riposa, sostenuto.

Resta così per qualche respiro. Niente da aggiustare. Niente da risolvere. Solo questo momento, e tu dentro.

Quando vuoi, fai un respiro un po’ più profondo e lascialo andare piano. Sei qui.`,
    `Xoş gəldin. Növbəti bir neçə dəqiqə ərzində heç nəyi yaxşı etmək məcburiyyətində deyilsən. Sadəcə gəl və otur.

Oturaraq və ya uzanaraq rahat bir vəziyyət tap. Altındakı şey — stul, yataq və ya döşəmə — ağırlığını daşısın. O, əvvəldən bəri səni onsuz da daşıyırdı. Buna icazə verə bilərsən.

İstəsən gözlərini yum, ya da baxışını qarşındakı bir nöqtəyə yumşaqca burax.

Alnını hiss et. Bir az yumşala bilərmi, bax. Qaşların boşalsın. Çənən yüngülcə boşalsın, dişlərin bir-birindən bir az aralansın. Dilin də dincələ bilər.

İndi çiyinlərin. Çoxumuz onları fərqinə varmadan yuxarıda saxlayırıq. Qulaqlarından uzaqlaşsın deyə onları aşağı burax. Qolların ağırlaşsın, əllərin olduğu yerdə dincəlsin.

Nəfəsini hiss et, onu dəyişməyə çalışmadan. Hava daxil olur, hava çıxır. İndi nəfəs almağın düzgün bir yolu yoxdur. Sadəcə olmasına icazə ver.

Zehnin planlara və ya narahatlıqlara keçərsə, bu tamamilə normaldır. Zehin belə işləyir. Hər dəfə fərqinə varanda, yumşaqca bədəninin daşındığı hissə qayıt.

Kürəyini hiss et. Ayaqlarını hiss et — dizlərdən barmaqların ucuna qədər. Bütün bədənin dincəlir, daşınır.

Bir neçə nəfəs burada qal. Düzəltməli heç nə yoxdur. Həll etməli heç nə yoxdur. Sadəcə bu an və onun içində sən.

Hazır olanda bir az daha dərin nəfəs al və yavaşca burax. Gəlib çatdın.`,
    `Добро пожаловать. Следующие несколько минут тебе не нужно ничего делать хорошо. Просто побудь здесь.

Найди удобное положение — сидя или лёжа. Пусть то, что под тобой, — стул, кровать или пол — примет твой вес. Оно и так держало тебя всё это время. Ты можешь ему это позволить.

Если хочется, закрой глаза или мягко останови взгляд на одной точке перед собой.

Заметь свой лоб. Посмотри, может ли он немного смягчиться. Пусть расслабятся брови. Пусть разожмётся челюсть, и зубы чуть разомкнутся. Язык тоже может отдохнуть.

Теперь плечи. Многие из нас носят их приподнятыми и не замечают этого. Опусти их, подальше от ушей. Пусть руки станут тяжёлыми, а ладони отдыхают там, где они есть.

Заметь дыхание, не меняя его. Воздух входит, воздух выходит. Сейчас нет правильного способа дышать. Просто позволь этому происходить.

Если мысли уходят к планам или тревогам, это совершенно нормально. Так устроен ум. Каждый раз, когда ты это замечаешь, мягко возвращайся к ощущению опоры под телом.

Почувствуй спину. Почувствуй ноги. Почувствуй стопы. Всё твоё тело отдыхает, его держат.

Побудь так несколько вдохов. Нечего исправлять. Нечего решать. Только этот момент и ты в нём.

Когда почувствуешь готовность, сделай чуть более глубокий вдох и медленно выдохни. Ты здесь.`,
  ),
  'first-breath': pack(
    `Birkaç dakikayı nefesle geçirelim.

Yerine yerleş, omuzlarını aşağı bırak. Henüz özel bir şekilde nefes almana gerek yok. Sadece nefesi en net nerede hissettiğini fark et: burnunda mı, göğsünde mi, karnında mı?

Şimdi nefesi nazikçe yavaşlatalım. Burnundan dörde kadar sayarak nefes al… bir, iki, üç, dört.

Ve ağzından altıya kadar sayarak yavaşça ver… bir, iki, üç, dört, beş, altı.

Uzun bir nefes veriş, bedenine yavaşlamanın güvenli olduğunu söyler. Bir kez daha: dörde kadar al… altıya kadar ver.

Saymak sana zor geliyorsa bırak. Sadece her nefes verişini, alışından biraz daha uzun tut.

Nefes alırken karnının yükseldiğini, verirken yumuşadığını hisset. Omuzların aşağıda kalsın. Çenen gevşek kalsın.

Kalbin hızlı atıyorsa sorun değil. Onu durdurmak zorunda değilsin. Sadece nefes verişini uzun ve rahat tut; bedenin kendi zamanında sana uyacak.

Nefes al… ve bırak.

Nefes al… ve bırak.

Birkaç nefes daha kendi hızında burada kal.

Şimdi nefesin doğal ritmine dönsün. Bedeninin birkaç dakika öncesine göre nasıl hissettiğini fark et. Küçük bir değişiklik bile yeterli.`,
    `Let us spend a few minutes with the breath.

Settle into your seat and let your shoulders drop. You do not need to breathe in any special way yet. Just notice where you feel the breath most clearly: at the nose, in the chest, or in the belly.

Now let us slow it down gently. Breathe in through your nose for a count of four… one, two, three, four.

And breathe out slowly through your mouth for a count of six… one, two, three, four, five, six.

A longer out-breath tells your body that it is safe to slow down. Again: in for four… and out for six.

If counting feels like work, let it go. Simply make each out-breath a little longer than the in-breath.

Feel your belly rise as you breathe in, and soften as you breathe out. Let the shoulders stay low. Let the jaw stay loose.

If your heart is beating fast, that is okay. You do not have to make it stop. Just keep the out-breath long and easy, and your body will follow in its own time.

Breathe in… and let go.

Breathe in… and let go.

Stay here for a few more breaths, at your own pace.

Now let your breath return to its natural rhythm. Notice how your body feels now, compared to a few minutes ago. Even a small change is enough.`,
    `Vamos a pasar unos minutos con la respiración.

Acomódate y deja caer los hombros. Todavía no hace falta respirar de ninguna manera especial. Solo nota dónde sientes la respiración con más claridad: en la nariz, en el pecho o en el vientre.

Ahora vamos a hacerla más lenta, con suavidad. Inhala por la nariz contando hasta cuatro… uno, dos, tres, cuatro.

Y exhala despacio por la boca contando hasta seis… uno, dos, tres, cuatro, cinco, seis.

Una exhalación larga le dice a tu cuerpo que es seguro ir más despacio. Otra vez: inhala en cuatro… exhala en seis.

Si contar te cuesta, déjalo. Simplemente haz que cada exhalación sea un poco más larga que la inhalación.

Siente cómo el vientre sube al inhalar y se suaviza al exhalar. Los hombros siguen abajo. La mandíbula sigue suelta.

Si el corazón late deprisa, no pasa nada. No tienes que detenerlo. Solo mantén la exhalación larga y tranquila, y tu cuerpo te seguirá a su ritmo.

Inhala… y suelta.

Inhala… y suelta.

Quédate aquí unas respiraciones más, a tu ritmo.

Ahora deja que la respiración vuelva a su ritmo natural. Nota cómo se siente tu cuerpo comparado con hace unos minutos. Incluso un pequeño cambio es suficiente.`,
    `Passiamo qualche minuto con il respiro.

Sistemati e lascia scendere le spalle. Per ora non serve respirare in un modo particolare. Nota solo dove senti il respiro più chiaramente: nel naso, nel petto o nella pancia.

Ora rallentiamolo con dolcezza. Inspira dal naso contando fino a quattro… uno, due, tre, quattro.

Ed espira lentamente dalla bocca contando fino a sei… uno, due, tre, quattro, cinque, sei.

Un’espirazione lunga dice al corpo che è sicuro rallentare. Ancora: inspira per quattro… espira per sei.

Se contare ti pesa, lascia stare. Fai solo in modo che ogni espirazione sia un po’ più lunga dell’inspirazione.

Senti la pancia che si alza quando inspiri e si ammorbidisce quando espiri. Le spalle restano basse. La mascella resta morbida.

Se il cuore batte veloce, va bene. Non devi fermarlo. Mantieni solo l’espirazione lunga e facile, e il corpo ti seguirà con i suoi tempi.

Inspira… e lascia andare.

Inspira… e lascia andare.

Resta qui ancora qualche respiro, al tuo ritmo.

Ora lascia che il respiro torni al suo ritmo naturale. Nota come si sente il corpo rispetto a qualche minuto fa. Anche un piccolo cambiamento basta.`,
    `Bir neçə dəqiqəni nəfəslə keçirək.

Yerinə rahat otur, çiyinlərini aşağı burax. Hələ xüsusi bir şəkildə nəfəs almağa ehtiyac yoxdur. Sadəcə nəfəsi ən aydın harada hiss etdiyinə diqqət et: burnunda, sinəndə, yoxsa qarnında?

İndi nəfəsi yumşaqca yavaşladaq. Burnundan dördə qədər sayaraq nəfəs al… bir, iki, üç, dörd.

Və ağzından altıya qədər sayaraq yavaşca ver… bir, iki, üç, dörd, beş, altı.

Uzun nəfəs vermək bədəninə yavaşlamağın təhlükəsiz olduğunu deyir. Bir daha: dördə qədər al… altıya qədər ver.

Saymaq sənə çətin gəlirsə, burax. Sadəcə hər nəfəs verməni nəfəs almadan bir az uzun et.

Nəfəs alanda qarnının qalxdığını, verəndə yumşaldığını hiss et. Çiyinlərin aşağıda qalsın. Çənən boş qalsın.

Ürəyin sürətlə döyünürsə, problem deyil. Onu dayandırmalı deyilsən. Sadəcə nəfəs verməni uzun və rahat saxla; bədənin öz vaxtında sənə uyğunlaşacaq.

Nəfəs al… və burax.

Nəfəs al… və burax.

Öz tempində bir neçə nəfəs daha burada qal.

İndi nəfəsin təbii ritminə qayıtsın. Bədəninin bir neçə dəqiqə əvvəlkinə nisbətən necə hiss etdiyinə diqqət et. Kiçik bir dəyişiklik belə kifayətdir.`,
    `Давай проведём несколько минут с дыханием.

Устройся поудобнее и опусти плечи. Пока не нужно дышать как-то особенно. Просто заметь, где ты яснее всего чувствуешь дыхание: в носу, в груди или в животе.

Теперь мягко замедлим его. Вдохни через нос на четыре счёта… раз, два, три, четыре.

И медленно выдохни через рот на шесть счётов… раз, два, три, четыре, пять, шесть.

Долгий выдох говорит телу, что замедлиться безопасно. Ещё раз: вдох на четыре… выдох на шесть.

Если считать тяжело, не считай. Просто делай каждый выдох чуть длиннее вдоха.

Почувствуй, как живот поднимается на вдохе и мягко опускается на выдохе. Плечи остаются внизу. Челюсть остаётся свободной.

Если сердце бьётся быстро, ничего страшного. Не нужно его останавливать. Просто держи выдох долгим и лёгким, и тело в своё время последует за ним.

Вдох… и отпусти.

Вдох… и отпусти.

Побудь так ещё несколько вдохов, в своём темпе.

Теперь пусть дыхание вернётся к естественному ритму. Заметь, как чувствует себя тело по сравнению с тем, что было несколько минут назад. Даже небольшой перемены достаточно.`,
  ),
  'first-ground': pack(
    `Bu çalışma, düşüncelerin hızlandığında seni şimdiye geri getirir.

Ayaklarınla başla. Onları nazikçe yere bastır. Topuklarını, tabanlarını, parmaklarını hisset. Altındaki zemin sağlam ve seni taşıyor.

Şimdi etrafına bak ve görebildiğin beş şeyin adını söyle. İçinden sessizce söyleyebilirsin: bir lamba, bir pencere, bir bardak… orada ne varsa.

Sonra hissedebildiğin dört şeyi fark et. Kıyafetinin kumaşı. Tenindeki hava. Ellerinin ağırlığı. Oturduğun yüzey.

Şimdi üç sese kulak ver. Belki uzaktan bir trafik sesi, odadaki bir uğultu, kendi nefesin.

Koklayabildiğin iki şeyi fark et, ya da sadece havanın kokusunu.

Ve tadabildiğin bir şeyi, ağzındaki tat bile olsa.

Buradasın, bu odada, bu anda. Zihnin yarına atlayabilir ya da geçmişe dönebilir. Sorun değil. Bedenin her zaman burada, şimdide.

Yavaşça nefes al… ve uzun uzun ver. Ayaklarını bir kez daha yerde hisset.

Bugün ne zaman düşüncelerin içinde kaybolsan, buna geri dönebilirsin: beş, dört, üç, iki, bir. Ve ayakların yerde.`,
    `This practice brings you back to the present when your thoughts are racing.

Start with your feet. Press them gently into the floor. Feel your heels, the soles, your toes. The ground is solid beneath you, and it is holding you up.

Now look around and name five things you can see. Say them quietly to yourself: a lamp, a window, a cup… whatever is there.

Next, notice four things you can feel. The fabric of your clothes. The air on your skin. The weight of your hands. The surface you are sitting on.

Now listen for three sounds. Perhaps traffic far away, a hum in the room, your own breathing.

Notice two things you can smell, or simply the smell of the air.

And one thing you can taste, even if it is just the taste in your mouth.

You are here, in this room, at this moment. Your mind may jump ahead to tomorrow or back to earlier. That is okay. Your body is always here, now.

Take a slow breath in… and a long breath out. Feel your feet on the ground once more.

Whenever you feel lost in thoughts today, you can come back to this: five, four, three, two, one. And your feet on the ground.`,
    `Esta práctica te trae de vuelta al presente cuando los pensamientos se aceleran.

Empieza por los pies. Apóyalos con suavidad en el suelo. Siente los talones, las plantas, los dedos. El suelo es firme y te sostiene.

Ahora mira a tu alrededor y nombra cinco cosas que puedas ver. Puedes decirlas en silencio: una lámpara, una ventana, una taza… lo que haya.

Después, nota cuatro cosas que puedas sentir. La tela de tu ropa. El aire en la piel. El peso de tus manos. La superficie sobre la que estás.

Ahora escucha tres sonidos. Quizá tráfico a lo lejos, un zumbido en la habitación, tu propia respiración.

Nota dos cosas que puedas oler, o simplemente el olor del aire.

Y una cosa que puedas saborear, aunque solo sea el sabor de tu boca.

Estás aquí, en esta habitación, en este momento. La mente puede saltar a mañana o volver al pasado. Está bien. Tu cuerpo siempre está aquí, ahora.

Inhala despacio… y exhala largo. Siente una vez más los pies en el suelo.

Hoy, cada vez que los pensamientos te arrastren, puedes volver a esto: cinco, cuatro, tres, dos, uno. Y los pies en el suelo.`,
    `Questa pratica ti riporta al presente quando i pensieri corrono.

Comincia dai piedi. Premili con delicatezza sul pavimento. Senti i talloni, le piante, le dita. Il pavimento è solido sotto di te e ti sostiene.

Ora guardati intorno e nomina cinque cose che puoi vedere. Puoi dirle in silenzio: una lampada, una finestra, una tazza… quello che c’è.

Poi nota quattro cose che senti sul corpo. Il tessuto dei vestiti. L’aria sulla pelle. Il peso delle mani. La superficie su cui sei.

Ora ascolta tre suoni. Forse il traffico lontano, un ronzio nella stanza, il tuo stesso respiro.

Nota due odori, o semplicemente l’odore dell’aria.

E un sapore, anche solo il sapore che hai in bocca.

Sei qui, in questa stanza, in questo momento. La mente può saltare a domani o tornare indietro. Va bene. Il corpo è sempre qui, adesso.

Inspira piano… ed espira a lungo. Senti ancora una volta i piedi sul pavimento.

Oggi, ogni volta che i pensieri ti portano via, puoi tornare qui: cinque, quattro, tre, due, uno. E i piedi a terra.`,
    `Bu məşq fikirlərin sürətlənəndə səni indiki ana qaytarır.

Ayaqlarından başla. Onları yumşaqca yerə bas. Dabanlarını, ayaqaltını, barmaqlarını hiss et. Altındakı yer möhkəmdir və səni saxlayır.

İndi ətrafına bax və gördüyün beş şeyin adını çək. İçində səssizcə deyə bilərsən: lampa, pəncərə, stəkan… orada nə varsa.

Sonra hiss etdiyin dörd şeyə diqqət et. Paltarının parçası. Dərindəki hava. Əllərinin ağırlığı. Oturduğun səth.

İndi üç səsə qulaq as. Bəlkə uzaqdan maşın səsi, otaqda bir uğultu, öz nəfəsin.

İyini hiss etdiyin iki şeyə diqqət et, ya da sadəcə havanın iyinə.

Və dadını hiss etdiyin bir şeyə, ağzındakı dad olsa belə.

Buradasan, bu otaqda, bu anda. Zehnin sabaha tullana və ya keçmişə qayıda bilər. Problem deyil. Bədənin həmişə buradadır, indidədir.

Yavaşca nəfəs al… və uzun-uzun ver. Ayaqlarını bir daha yerdə hiss et.

Bu gün nə vaxt fikirlərin içində itsən, buna qayıda bilərsən: beş, dörd, üç, iki, bir. Və ayaqların yerdə.`,
    `Эта практика возвращает тебя в настоящее, когда мысли несутся вперёд.

Начни со стоп. Мягко прижми их к полу. Почувствуй пятки, ступни, пальцы. Пол под тобой твёрдый, и он тебя держит.

Теперь оглянись и назови пять вещей, которые видишь. Можно про себя: лампа, окно, чашка… всё, что есть вокруг.

Затем заметь четыре вещи, которые ощущаешь телом. Ткань одежды. Воздух на коже. Тяжесть рук. Поверхность, на которой сидишь.

Теперь прислушайся к трём звукам. Может быть, далёкий шум машин, гул в комнате, твоё собственное дыхание.

Заметь два запаха — или просто запах воздуха.

И один вкус, пусть даже это просто вкус во рту.

Ты здесь, в этой комнате, в этот момент. Ум может прыгнуть в завтра или вернуться в прошлое. Это нормально. Тело всегда здесь, сейчас.

Медленно вдохни… и долго выдохни. Ещё раз почувствуй стопы на полу.

Сегодня, когда бы мысли ни унесли тебя, ты можешь вернуться к этому: пять, четыре, три, два, один. И стопы на полу.`,
  ),
  'room-door': pack(
    `Bu meditasyonda kendini güvende hissettiğin bir odada dinleneceksin.

İstersen gözlerini kapat ve yavaş bir nefes al. Şimdi çok iyi bildiğin bir odayı aklına getir. Kendi yatak odan, büyükannenin oturma odası ya da bir zamanlar huzur bulduğun herhangi bir yer olabilir.

O odanın kapısını gözünün önüne getir. Rengini, kolunu fark et. Kapı kapalı ve bu tarafında güvendesin. Şu an içeri hiçbir şeyin girmesi gerekmiyor.

Zihninde odanın etrafına bak. Pencere nerede? Işık nasıl? Bir sandalye, bir yatak, bir halı var mı?

Odada rahat bir yer bul ve oraya yerleş. Bedeninin, nerede olduğunu bildiğinde nasıl gevşediğini hisset.

Bazen bir düşünce kapıyı çalabilir: bir endişe, bir iş, bir anı. Kapıyı açmak zorunda değilsin. Sadece çalındığını fark edip öylece bırakabilirsin. Kapı yerinde duruyor.

Yavaşça nefes al… ve ver. Her nefes verişte omuzların biraz daha aşağı insin.

Bu oda her zaman senin için burada. Dünya fazla gürültülü geldiğinde buraya dönebilir, kapıyı kapatıp dinlenebilirsin.

Biraz daha kal. Sessizliği fark et. Şu anda güvende olduğunu fark et.

Hazır olduğunda daha derin bir nefes al ve bu sakinliğin bir kısmını yanına alarak yavaşça geri dön.`,
    `In this meditation you will rest in a room where you feel safe.

Close your eyes if you like, and take a slow breath. Now bring to mind a room you know well. It could be your bedroom, a grandparent’s living room, any place where you once felt at ease.

Picture the door of that room. Notice its colour, its handle. The door is closed, and on this side of it you are safe. Nothing needs to come in right now.

Look around the room in your mind. Where is the window? What is the light like? Is there a chair, a bed, a rug?

Find a comfortable place in the room and let yourself settle there. Feel how your body relaxes when it knows where it is.

Sometimes a thought may knock on the door: a worry, a task, a memory. You do not have to open it. You can simply notice the knock and let it be. The door holds.

Breathe in slowly… and breathe out. With every out-breath, let your shoulders sink a little deeper.

This room is always here for you. Whenever the world feels too loud, you can come back, close the door, and rest.

Stay a little longer. Notice the quiet. Notice that you are safe in this moment.

When you are ready, take a deeper breath, and slowly come back, bringing a little of this calm with you.`,
    `En esta meditación vas a descansar en una habitación donde te sientes a salvo.

Si quieres, cierra los ojos y respira despacio. Ahora trae a la mente una habitación que conozcas bien. Puede ser tu dormitorio, el salón de tu abuela, cualquier lugar donde alguna vez sentiste calma.

Imagina la puerta de esa habitación. Fíjate en su color, en su manilla. La puerta está cerrada, y de este lado estás a salvo. Ahora mismo no tiene que entrar nada.

Mira la habitación en tu mente. ¿Dónde está la ventana? ¿Cómo es la luz? ¿Hay una silla, una cama, una alfombra?

Busca un lugar cómodo en la habitación y acomódate allí. Siente cómo tu cuerpo se relaja cuando sabe dónde está.

A veces un pensamiento puede llamar a la puerta: una preocupación, una tarea, un recuerdo. No tienes que abrir. Puedes simplemente notar la llamada y dejarla estar. La puerta aguanta.

Inhala despacio… y exhala. Con cada exhalación, deja que los hombros bajen un poco más.

Esta habitación siempre está aquí para ti. Cuando el mundo se sienta demasiado ruidoso, puedes volver, cerrar la puerta y descansar.

Quédate un poco más. Nota el silencio. Nota que, en este momento, estás a salvo.

Cuando quieras, respira un poco más hondo y vuelve despacio, llevando contigo algo de esta calma.`,
    `In questa meditazione riposerai in una stanza dove ti senti al sicuro.

Se vuoi, chiudi gli occhi e fai un respiro lento. Ora porta alla mente una stanza che conosci bene. Può essere la tua camera, il soggiorno dei nonni, qualsiasi posto che un tempo ti ha dato pace.

Immagina la porta di quella stanza. Nota il suo colore, la maniglia. La porta è chiusa, e da questa parte sei al sicuro. Adesso non deve entrare niente.

Guarda la stanza con la mente. Dov’è la finestra? Com’è la luce? C’è una sedia, un letto, un tappeto?

Trova un posto comodo nella stanza e sistemati lì. Senti come il corpo si rilassa quando sa dove si trova.

A volte un pensiero può bussare alla porta: una preoccupazione, un impegno, un ricordo. Non devi aprire. Puoi solo notare il bussare e lasciarlo stare. La porta regge.

Inspira piano… ed espira. A ogni espirazione lascia che le spalle scendano un po’ di più.

Questa stanza è sempre qui per te. Quando il mondo sembra troppo rumoroso, puoi tornare, chiudere la porta e riposare.

Resta ancora un po’. Nota il silenzio. Nota che, in questo momento, sei al sicuro.

Quando vuoi, fai un respiro più profondo e torna piano, portando con te un po’ di questa calma.`,
    `Bu meditasiyada özünü təhlükəsiz hiss etdiyin bir otaqda dincələcəksən.

İstəsən gözlərini yum və yavaş bir nəfəs al. İndi çox yaxşı tanıdığın bir otağı xatırla. Öz yataq otağın, nənənin qonaq otağı və ya bir vaxtlar rahatlıq tapdığın hər hansı bir yer ola bilər.

O otağın qapısını gözünün önünə gətir. Rənginə, dəstəyinə diqqət et. Qapı bağlıdır və onun bu tərəfində təhlükəsizsən. İndi içəri heç nəyin girməsinə ehtiyac yoxdur.

Zehnində otağın ətrafına bax. Pəncərə haradadır? İşıq necədir? Stul, yataq, xalça varmı?

Otaqda rahat bir yer tap və ora yerləş. Bədəninin harada olduğunu bildikdə necə rahatlaşdığını hiss et.

Bəzən bir fikir qapını döyə bilər: bir narahatlıq, bir iş, bir xatirə. Qapını açmalı deyilsən. Sadəcə döyüldüyünü hiss edib olduğu kimi buraxa bilərsən. Qapı yerindədir.

Yavaşca nəfəs al… və ver. Hər nəfəs verəndə çiyinlərin bir az da aşağı ensin.

Bu otaq həmişə sənin üçün buradadır. Dünya çox səs-küylü gələndə bura qayıda, qapını bağlayıb dincələ bilərsən.

Bir az da qal. Sükutu hiss et. Bu anda təhlükəsiz olduğunu hiss et.

Hazır olanda daha dərin bir nəfəs al və bu sakitliyin bir hissəsini özünlə götürərək yavaşca geri qayıt.`,
    `В этой медитации ты отдохнёшь в комнате, где чувствуешь себя в безопасности.

Если хочешь, закрой глаза и сделай медленный вдох. Теперь вспомни комнату, которую хорошо знаешь. Это может быть твоя спальня, гостиная у бабушки — любое место, где тебе когда-то было спокойно.

Представь дверь этой комнаты. Заметь её цвет, её ручку. Дверь закрыта, и по эту сторону ты в безопасности. Сейчас ничему не нужно входить.

Мысленно оглядись. Где окно? Какой свет? Есть ли кресло, кровать, ковёр?

Найди в комнате удобное место и устройся там. Почувствуй, как расслабляется тело, когда знает, где оно.

Иногда в дверь может постучать мысль: тревога, дело, воспоминание. Открывать не обязательно. Можно просто заметить стук и оставить всё как есть. Дверь держит.

Медленно вдохни… и выдохни. С каждым выдохом плечи опускаются чуть ниже.

Эта комната всегда доступна тебе. Когда мир кажется слишком громким, можно вернуться сюда, закрыть дверь и отдохнуть.

Побудь здесь ещё немного. Заметь тишину. Заметь, что в этот момент ты в безопасности.

Когда почувствуешь готовность, сделай вдох поглубже и медленно возвращайся, взяв с собой немного этого покоя.`,
  ),
  'room-light': pack(
    `Sessiz odana geri dönelim ve ışığı fark edelim.

Yavaşça nefes alıp ver ve odayı yeniden gözünün önüne getir. Şimdi ışığın nereden geldiğine bak. Belki yumuşak gün ışığı süzülen bir pencere, belki sıcak, altın renkli bir lamba.

O ışığın biraz daha sıcak, biraz daha yumuşak olduğunu hayal et. Odanın üzerine, yere ve senin üzerine nazikçe düşsün.

Önce yüzünde hisset. Alnın yumuşuyor. Gözlerin dinleniyor. Çenen gevşiyor.

Sıcak ışık boynuna ve omuzlarına insin. Dokunduğu her yerde gerginlik biraz eriyor, güneşteki kar gibi.

Şimdi göğsüne ulaşıyor. Nefesin yavaş ve rahat oluyor. Sonra karnına, yumuşak ve sakin.

Işık kollarından ellerine iniyor. Ellerin ısınıyor ve ağırlaşıyor.

Bacaklarından aşağı, ta ayaklarına kadar akıyor. Bütün bedenin sıcak, yumuşak bir ışığın içinde dinleniyor.

Bir yerin hâlâ gergin hissediyorsa onunla savaşma. Işığın bir süre orada durmasına izin ver. Acele yok.

Sıcaklığı içine çek… ve şu an ihtiyacın olmayan her şeyi nefesle dışarı bırak.

Birkaç nefes boyunca bu ışıkta kal. Güvendesin, sıcaktasın ve buradasın.

Hazır olduğunda görüntünün yavaşça solmasına izin ver ve sıcaklığı yanında tut.`,
    `Let us return to your quiet room, and notice the light.

Breathe in and out slowly, and picture the room again. Now notice where the light is coming from. Perhaps a window with soft daylight, or a lamp with a warm, golden glow.

Imagine that light becoming a little warmer, a little softer. Let it fall gently across the room, across the floor, and across you.

Feel it first on your face. Your forehead softens. Your eyes rest. Your jaw lets go.

Let the warm light move down to your neck and shoulders. Wherever it touches, tension melts a little, like snow in the sun.

Now it reaches your chest. Your breath becomes slow and easy. Then your belly, soft and calm.

The light moves down your arms to your hands. Your hands grow warm and heavy.

It flows down your legs, all the way to your feet. Your whole body is resting in warm, gentle light.

If a part of you still feels tight, do not fight it. Just let the light rest there for a moment. There is no hurry.

Breathe in the warmth… and breathe out anything you do not need right now.

Stay in this light for a few breaths. You are safe, you are warm, and you are here.

When you are ready, let the image fade slowly, and keep the warmth with you.`,
    `Volvamos a tu habitación tranquila y fijémonos en la luz.

Inhala y exhala despacio, e imagina de nuevo la habitación. Ahora fíjate de dónde viene la luz. Quizá una ventana con luz suave de día, o una lámpara con un brillo cálido y dorado.

Imagina que esa luz se vuelve un poco más cálida, un poco más suave. Deja que caiga con delicadeza sobre la habitación, sobre el suelo y sobre ti.

Siéntela primero en la cara. La frente se suaviza. Los ojos descansan. La mandíbula se suelta.

Deja que la luz cálida baje al cuello y a los hombros. Allí donde toca, la tensión se derrite un poco, como la nieve al sol.

Ahora llega al pecho. La respiración se vuelve lenta y fácil. Luego al vientre, blando y tranquilo.

La luz baja por los brazos hasta las manos. Las manos se calientan y pesan.

Fluye por las piernas, hasta los pies. Todo tu cuerpo descansa en una luz cálida y suave.

Si alguna parte sigue tensa, no luches con ella. Deja que la luz se quede allí un momento. No hay prisa.

Inspira la calidez… y suelta con el aire todo lo que ahora no necesitas.

Quédate en esta luz unas respiraciones. Estás a salvo, sientes calor y estás aquí.

Cuando quieras, deja que la imagen se desvanezca despacio y quédate con la calidez.`,
    `Torniamo nella tua stanza tranquilla e notiamo la luce.

Inspira ed espira piano, e immagina di nuovo la stanza. Ora nota da dove arriva la luce. Forse una finestra con una luce morbida, o una lampada con un bagliore caldo e dorato.

Immagina che quella luce diventi un po’ più calda, un po’ più morbida. Lascia che si posi con delicatezza sulla stanza, sul pavimento e su di te.

Sentila prima sul viso. La fronte si ammorbidisce. Gli occhi riposano. La mascella si scioglie.

Lascia che la luce calda scenda sul collo e sulle spalle. Dove tocca, la tensione si scioglie un po’, come neve al sole.

Ora arriva al petto. Il respiro diventa lento e facile. Poi alla pancia, morbida e calma.

La luce scende lungo le braccia fino alle mani. Le mani si scaldano e diventano pesanti.

Scorre giù per le gambe, fino ai piedi. Tutto il corpo riposa in una luce calda e gentile.

Se una parte è ancora tesa, non combatterla. Lascia che la luce resti lì per un momento. Non c’è fretta.

Inspira il calore… ed espira tutto ciò che adesso non ti serve.

Resta in questa luce per qualche respiro. Sei al sicuro, sei al caldo, e sei qui.

Quando vuoi, lascia che l’immagine sfumi piano e tieni con te il calore.`,
    `Sakit otağına qayıdaq və işığa diqqət edək.

Yavaşca nəfəs al və ver, otağı yenidən gözünün önünə gətir. İndi işığın haradan gəldiyinə bax. Bəlkə yumşaq gün işığı süzülən bir pəncərə, bəlkə isti, qızılı rəngli bir lampa.

O işığın bir az daha isti, bir az daha yumşaq olduğunu təsəvvür et. Qoy otağın üstünə, döşəməyə və sənin üstünə yumşaqca düşsün.

Əvvəlcə üzündə hiss et. Alnın yumşalır. Gözlərin dincəlir. Çənən boşalır.

İsti işıq boynuna və çiyinlərinə ensin. Toxunduğu hər yerdə gərginlik bir az əriyir, günəşdəki qar kimi.

İndi sinənə çatır. Nəfəsin yavaş və rahat olur. Sonra qarnına, yumşaq və sakit.

İşıq qollarından əllərinə enir. Əllərin istiləşir və ağırlaşır.

Ayaqlarından aşağı, ta barmaqlarının ucuna qədər axır. Bütün bədənin isti, yumşaq bir işığın içində dincəlir.

Bir yerin hələ gərgin hiss edirsə, onunla mübarizə aparma. Qoy işıq bir müddət orada qalsın. Tələsməyə ehtiyac yoxdur.

İstiliyi içinə çək… və indi ehtiyacın olmayan hər şeyi nəfəslə çölə burax.

Bir neçə nəfəs bu işıqda qal. Təhlükəsizsən, isti bir yerdəsən və buradasan.

Hazır olanda təsvirin yavaşca solmasına icazə ver və istiliyi özünlə saxla.`,
    `Давай вернёмся в твою тихую комнату и заметим свет.

Медленно вдохни и выдохни, снова представь комнату. Теперь заметь, откуда идёт свет. Может быть, это окно с мягким дневным светом или лампа с тёплым золотистым сиянием.

Представь, что этот свет становится чуть теплее, чуть мягче. Пусть он мягко ложится на комнату, на пол и на тебя.

Сначала почувствуй его на лице. Лоб смягчается. Глаза отдыхают. Челюсть отпускает.

Пусть тёплый свет опустится на шею и плечи. Где он касается, напряжение немного тает, как снег на солнце.

Теперь он доходит до груди. Дыхание становится медленным и лёгким. Потом живот — мягкий и спокойный.

Свет спускается по рукам к ладоням. Ладони теплеют и тяжелеют.

Он течёт вниз по ногам, до самых стоп. Всё твоё тело отдыхает в тёплом мягком свете.

Если какая-то часть ещё напряжена, не борись с ней. Просто позволь свету побыть там немного. Спешить некуда.

Вдохни тепло… и выдохни всё, что сейчас не нужно.

Побудь в этом свете несколько вдохов. Тебе безопасно, тебе тепло, и ты здесь.

Когда почувствуешь готовность, позволь образу медленно растаять, а тепло оставь с собой.`,
  ),
  'room-hands': pack(
    `Bu son bölümde kendine teselli vermek için kendi ellerini kullanacaksın.

Odana yerleş ve yavaşça nefes al. Dikkatini ellerine getir. Şu an nasıl hissettiklerini fark et: sıcak mı serin mi, hareketsiz mi, karıncalanıyor mu?

Avuçlarını birkaç saniye nazikçe birbirine sürt ve oluşturduğun sıcaklığı hisset.

Şimdi bir elini göğsüne, kalbinin üstüne, diğerini karnına koy. Nefes alıp verirken ellerinin altındaki yükselip alçalmayı hisset.

İçeriden şefkat böyle hissettirir. Bir arkadaşını nasıl teselli edersen, kendini de öyle teselli edebilirsin.

İçinden kendine söyle: Buradayım. Şu an güvendeyim. Bu his geçecek.

Yavaşça nefes al… ve ellerinin yükseldiğini hisset. Nefes ver… ve yerine oturduklarını hisset.

Duygular gelirse gelsinler. Ellerin seni olduğun gibi tutuyor.

Uzun zamandır çok şey taşıyorsun. Bu birkaç an boyunca hiçbir şey taşımak zorunda değilsin. Sadece tutulabilirsin.

Birkaç nefes daha ellerinin sıcaklığıyla kal.

Bitirmeden önce bu zamanı kendine ayırdığın için kendine teşekkür et. Hazır olduğunda ellerini kucağına bırak, derin bir nefes al ve gözlerini yavaşça aç.`,
    `In this last part, you will use your own hands to bring comfort.

Settle into your room, and breathe slowly. Bring your attention to your hands. Notice how they feel right now: warm or cool, still or tingling.

Gently rub your palms together for a few seconds, and feel the warmth that you create.

Now place one hand on your chest, over your heart, and the other on your belly. Feel the rise and fall beneath your hands as you breathe.

This is what kindness feels like from the inside. The same way you might comfort a friend, you can comfort yourself.

Silently say to yourself: I am here. I am safe right now. This feeling will pass.

Breathe in slowly… and feel your hands rise. Breathe out… and feel them settle.

If emotions come up, let them. Your hands are holding you, just as you are.

You have been carrying a lot. For these few moments, you do not have to carry anything. You can simply be held.

Stay with the warmth of your hands for a few more breaths.

Before you finish, thank yourself for taking this time. When you are ready, rest your hands in your lap, take a deep breath, and gently open your eyes.`,
    `En esta última parte, vas a usar tus propias manos para darte consuelo.

Acomódate en tu habitación y respira despacio. Lleva la atención a las manos. Nota cómo están ahora: cálidas o frescas, quietas o con un leve hormigueo.

Frota suavemente las palmas durante unos segundos y siente el calor que creas.

Ahora pon una mano sobre el pecho, sobre el corazón, y la otra sobre el vientre. Siente cómo suben y bajan bajo tus manos al respirar.

Así se siente la amabilidad desde dentro. Igual que consolarías a alguien que quieres, puedes consolarte a ti.

Di en silencio: Estoy aquí. Ahora mismo estoy a salvo. Esta sensación pasará.

Inhala despacio… y siente cómo suben tus manos. Exhala… y siente cómo se asientan.

Si aparecen emociones, déjalas estar. Tus manos te sostienen tal como estás.

Has cargado con mucho. Durante estos momentos no tienes que cargar con nada. Solo dejarte sostener.

Quédate unas respiraciones más con el calor de tus manos.

Antes de terminar, agradécete este tiempo. Cuando quieras, deja las manos en el regazo, respira hondo y abre los ojos despacio.`,
    `In quest’ultima parte userai le tue mani per darti conforto.

Sistemati nella tua stanza e respira piano. Porta l’attenzione alle mani. Nota come sono adesso: calde o fresche, ferme o con un leggero formicolio.

Strofina dolcemente i palmi per qualche secondo e senti il calore che crei.

Ora metti una mano sul petto, sul cuore, e l’altra sulla pancia. Senti il respiro che sale e scende sotto le mani.

Ecco come si sente la gentilezza da dentro. Come consoleresti una persona cara, puoi consolare te.

Ripeti in silenzio: Sono qui. In questo momento sono al sicuro. Questa sensazione passerà.

Inspira piano… e senti le mani che si alzano. Espira… e senti che si posano.

Se arrivano emozioni, lasciale stare. Le tue mani ti tengono così come sei.

Hai portato tanto. In questi momenti non devi portare niente. Puoi solo lasciarti sostenere.

Resta ancora qualche respiro con il calore delle mani.

Prima di finire, ringraziati per questo tempo. Quando vuoi, appoggia le mani in grembo, fai un respiro profondo e apri piano gli occhi.`,
    `Bu son hissədə özünə təsəlli vermək üçün öz əllərindən istifadə edəcəksən.

Otağına yerləş və yavaşca nəfəs al. Diqqətini əllərinə gətir. İndi necə hiss etdiklərinə bax: istidirlər, yoxsa sərin, hərəkətsizdirlər, yoxsa göynəyirlər?

Ovuclarını bir neçə saniyə yumşaqca bir-birinə sürt və yaratdığın istiliyi hiss et.

İndi bir əlini sinənə, ürəyinin üstünə, digərini qarnına qoy. Nəfəs aldıqca əllərinin altında qalxıb enməni hiss et.

İçəridən şəfqət belə hiss olunur. Bir dostuna necə təsəlli verirsənsə, özünə də elə təsəlli verə bilərsən.

İçində özünə de: Buradayam. Bu an təhlükəsizəm. Bu hiss keçib gedəcək.

Yavaşca nəfəs al… və əllərinin qalxdığını hiss et. Nəfəs ver… və yerinə oturduqlarını hiss et.

Hisslər gəlsə, qoy gəlsinlər. Əllərin səni olduğun kimi saxlayır.

Uzun müddətdir çox şey daşıyırsan. Bu bir neçə an ərzində heç nə daşımalı deyilsən. Sadəcə özünü əllərinə tapşıra bilərsən.

Bir neçə nəfəs də əllərinin istiliyi ilə qal.

Bitirməzdən əvvəl bu vaxtı özünə ayırdığın üçün özünə təşəkkür et. Hazır olanda əllərini dizlərinin üstünə qoy, dərin nəfəs al və gözlərini yavaşca aç.`,
    `В этой последней части ты используешь собственные руки, чтобы утешить себя.

Устройся в своей комнате и дыши медленно. Перенеси внимание на руки. Заметь, какие они сейчас: тёплые или прохладные, спокойные или покалывают.

Мягко потри ладони друг о друга несколько секунд и почувствуй тепло, которое ты создаёшь.

Теперь положи одну руку на грудь, на сердце, а другую — на живот. Почувствуй, как под ладонями поднимается и опускается дыхание.

Так ощущается доброта изнутри. Так же, как утешают друга, можно утешить и себя.

Мысленно скажи себе: Я здесь. Сейчас я в безопасности. Это чувство пройдёт.

Медленно вдохни… и почувствуй, как руки поднимаются. Выдохни… и почувствуй, как они опускаются.

Если поднимаются эмоции, позволь им быть. Твои руки рядом и держат тебя.

На тебе было так много. В эти несколько мгновений ничего не нужно нести. Можно просто позволить себя поддержать.

Побудь ещё несколько вдохов с теплом своих рук.

Прежде чем закончить, поблагодари себя за это время. Когда почувствуешь готовность, опусти руки на колени, сделай глубокий вдох и мягко открой глаза.`,
  ),
  'shore-edge': pack(
    `Kendini sessiz bir kıyıda, denizin kenarında otururken hayal et.

Yavaş bir nefes al. Altındaki kumu ya da düz bir kayayı hisset; sağlam ve sabit. Önünde su ufka kadar uzanıyor.

Dalgaları izle. Biri yükseliyor, büyüyor, sonra kıyıya yumuşakça vuruyor ve geri çekiliyor. Sonra bir başkası geliyor.

Duyguların da böyle hareket edebilir. Kaygı bir dalga gibi yükselebilir, güçlenebilir, zirveye ulaşabilir — ve sonra her zaman geri çekilir. Her dalga çekilir.

Dalgaları durdurmak zorunda değilsin. Sen kıyısın. Dalgalar gelir ve gider, kıyı kalır.

Bir dalga gelirken nefes al… çekilirken nefes ver.

Al… ve ver.

Suyun sesini fark et, düzenli ve ritmik. Yüzündeki temiz havayı hisset.

Büyük bir dalga gelirse — güçlü bir duygu, hızlanan bir düşünce — sadece izle. Ne kadar büyük olduğunu fark et, sonra küçülmeye başlayışını izle. Zaten denize geri dönüyor.

Kıyıda güvendesin. Deniz hareket ediyor, sen kalıyorsun.

Dalgalarla birlikte nefes alarak biraz daha kal.

Hazır olduğunda daha derin bir nefes al, oturduğun yerde bedenini hisset ve yavaşça geri dön.`,
    `Imagine yourself sitting by the sea, on a quiet shore.

Take a slow breath. Feel the sand or a smooth rock beneath you, solid and steady. In front of you, the water stretches out to the horizon.

Watch the waves. One rises, grows, and then rolls gently onto the shore before sliding back. Then another one comes.

Your feelings can move like this. Anxiety may rise like a wave, grow stronger, reach its peak — and then it always falls back. Every wave does.

You do not have to stop the waves. You are the shore. The waves come and go, and the shore stays.

Breathe in as a wave rolls in… and breathe out as it slides away.

In… and out.

Notice the sound of the water, steady and rhythmic. Feel the fresh air on your face.

If a big wave comes — a strong feeling, a racing thought — just watch it. Notice how big it is, and then watch it begin to shrink. It is already on its way back to the sea.

You are safe on the shore. The sea moves, and you stay.

Stay a while longer, breathing with the waves.

When you are ready, take a deeper breath, feel your body where you are sitting, and slowly come back.`,
    `Imagina que estás junto al mar, en una orilla tranquila.

Respira despacio. Siente la arena o una roca lisa debajo de ti, firme y estable. Frente a ti, el agua se extiende hasta el horizonte.

Mira las olas. Una se eleva, crece y luego rompe suavemente en la orilla antes de retirarse. Después llega otra.

Tus emociones pueden moverse así. La ansiedad puede subir como una ola, hacerse más fuerte, llegar a su punto más alto… y después siempre baja. Todas las olas bajan.

No tienes que detener las olas. Tú eres la orilla. Las olas vienen y van, y la orilla se queda.

Inhala cuando llega una ola… y exhala cuando se retira.

Dentro… y fuera.

Escucha el sonido del agua, constante y rítmico. Siente el aire fresco en la cara.

Si llega una ola grande —una emoción fuerte, un pensamiento acelerado—, solo obsérvala. Nota lo grande que es y luego mira cómo empieza a hacerse pequeña. Ya está volviendo al mar.

En la orilla estás a salvo. El mar se mueve, y tú te quedas.

Quédate un rato más, respirando con las olas.

Cuando quieras, respira más hondo, siente tu cuerpo donde estás y vuelve despacio.`,
    `Immagina di trovarti in riva al mare, su una spiaggia tranquilla.

Fai un respiro lento. Senti la sabbia o una roccia liscia sotto di te, solida e stabile. Davanti a te l’acqua si stende fino all’orizzonte.

Guarda le onde. Una sale, cresce, poi si stende dolcemente sulla riva e si ritira. Poi ne arriva un’altra.

Le emozioni possono muoversi così. L’ansia può salire come un’onda, farsi più forte, raggiungere il picco… e poi ricade sempre. Ogni onda ricade.

Non devi fermare le onde. Tu sei la riva. Le onde vanno e vengono, la riva resta.

Inspira quando un’onda arriva… espira quando si ritira.

Dentro… e fuori.

Ascolta il suono dell’acqua, costante e ritmico. Senti l’aria fresca sul viso.

Se arriva un’onda grande — un’emozione forte, un pensiero che corre — osservala soltanto. Nota quanto è grande, poi guardala mentre comincia a rimpicciolire. Sta già tornando al mare.

Sulla riva sei al sicuro. Il mare si muove, e tu resti.

Resta ancora un po’, respirando con le onde.

Quando vuoi, fai un respiro più profondo, senti il corpo dove sei e torna piano.`,
    `Özünü sakit bir sahildə, dənizin kənarında oturmuş təsəvvür et.

Yavaş bir nəfəs al. Altındakı qumu və ya hamar bir qayanı hiss et; möhkəm və sabit. Qarşında su üfüqə qədər uzanır.

Dalğalara bax. Biri qalxır, böyüyür, sonra sahilə yumşaqca çırpılır və geri çəkilir. Sonra başqası gəlir.

Hisslərin də belə hərəkət edə bilər. Narahatlıq dalğa kimi qalxa, güclənə, zirvəyə çata bilər — və sonra həmişə geri çəkilir. Hər dalğa çəkilir.

Dalğaları dayandırmalı deyilsən. Sən sahilsən. Dalğalar gəlir və gedir, sahil qalır.

Dalğa gələndə nəfəs al… çəkiləndə nəfəs ver.

Al… və ver.

Suyun səsinə diqqət et, ahəngdar və ritmik. Üzündə təmiz havanı hiss et.

Böyük bir dalğa gəlsə — güclü bir hiss, sürətlənən bir fikir — sadəcə bax. Nə qədər böyük olduğunu gör, sonra kiçilməyə başladığını izlə. O artıq dənizə qayıdır.

Sahildə təhlükəsizsən. Dəniz hərəkət edir, sən qalırsan.

Dalğalarla birlikdə nəfəs alaraq bir az da qal.

Hazır olanda daha dərin nəfəs al, oturduğun yerdə bədənini hiss et və yavaşca geri qayıt.`,
    `Представь, что сидишь у моря, на тихом берегу.

Сделай медленный вдох. Почувствуй под собой песок или гладкий камень — твёрдый и надёжный. Перед тобой вода тянется до самого горизонта.

Смотри на волны. Одна поднимается, растёт, мягко накатывает на берег и отступает. Потом приходит следующая.

Чувства могут двигаться так же. Тревога может подняться, как волна, стать сильнее, достичь пика — и потом она всегда отступает. Каждая волна отступает.

Тебе не нужно останавливать волны. Ты — берег. Волны приходят и уходят, а берег остаётся.

Вдыхай, когда волна накатывает… выдыхай, когда она отступает.

Вдох… и выдох.

Заметь шум воды, ровный и ритмичный. Почувствуй свежий воздух на лице.

Если приходит большая волна — сильное чувство, бегущая мысль, — просто наблюдай. Заметь, какая она большая, а потом смотри, как она начинает уменьшаться. Она уже возвращается в море.

На берегу ты в безопасности. Море движется, а ты остаёшься.

Побудь ещё немного, дыша вместе с волнами.

Когда почувствуешь готовность, сделай вдох поглубже, почувствуй тело там, где сидишь, и медленно возвращайся.`,
  ),
  'shore-stone': pack(
    `Sessiz kıyında kal ve yanındaki kuma bak.

Deniz kabuklarının arasında pürüzsüz, yuvarlak bir taş görüyorsun. Onu al ve avucunda tut.

Ağırlığını hisset. Göründüğünden daha ağır, sağlam ve sakin. Yüzeyini hisset: yıllarca dalgaların cilaladığı pürüzsüz bir yüzey.

Bu taş binlerce fırtına atlattı. Dalgalar onu itti, çevirdi, ama işte burada; bütün ve sağlam. Fırtınalar onu sadece daha pürüzsüz yaptı.

Yavaşça nefes al… ve verirken bedeninin bu taş kadar sağlam hissetmesine izin ver.

Taşın sıcaklığını fark et. Belki hâlâ güneşten ılık. Bu sıcaklık avucuna, sonra koluna yayılsın.

Düşünceler gelirse onları taşın üzerinden akıp giden su gibi düşün. Geçip giderler, taş olduğu gibi kalır.

Taşı tut ve kendine söyle: Ben de sağlam olabilirim. Daha önce de zor günler atlattım ve hâlâ buradayım.

Nefes al… ve ver.

Birkaç nefes boyunca taşın ağırlığı ve sıcaklığıyla kal.

Kendini sağlam bir zeminde hissetmeye ihtiyaç duyduğunda bu taşa geri dönebilirsin. Elindeki gerçek bir taş, bir anahtar ya da bir fincan bile sana hatırlatabilir: buradasın ve sağlamsın.`,
    `Stay on your quiet shore, and look down at the sand beside you.

Among the shells you see a smooth, round stone. Pick it up and hold it in your palm.

Feel its weight. It is heavier than it looks, solid and calm. Feel its surface: smooth, polished by years of waves.

This stone has been through thousands of storms. The waves pushed it and turned it, and yet here it is, whole and steady. The storms only made it smoother.

Breathe in slowly… and as you breathe out, let your body feel as steady as the stone.

Notice the temperature of the stone. Perhaps it is still warm from the sun. Let that warmth spread into your hand, then up your arm.

If thoughts come, imagine them like water washing over the stone. They pass, and the stone stays as it is.

Hold the stone and say to yourself: I can be steady too. I have been through difficult days before, and I am still here.

Breathe in… and breathe out.

Stay with the weight and warmth of the stone for a few breaths.

You can come back to this stone whenever you need to feel grounded. Even a real stone, a key, or a cup in your hand can remind you: you are here, and you are steady.`,
    `Sigue en tu orilla tranquila y mira la arena a tu lado.

Entre las conchas ves una piedra lisa y redonda. Tómala y sostenla en la palma.

Siente su peso. Pesa más de lo que parece, firme y tranquila. Siente su superficie: lisa, pulida por años de olas.

Esta piedra ha pasado por miles de tormentas. Las olas la empujaron y la hicieron girar, y aun así aquí está, entera y firme. Las tormentas solo la hicieron más suave.

Inhala despacio… y al exhalar deja que tu cuerpo se sienta tan firme como la piedra.

Nota la temperatura de la piedra. Quizá todavía esté templada por el sol. Deja que ese calor se extienda por la mano y luego por el brazo.

Si llegan pensamientos, imagínalos como agua que pasa sobre la piedra. Pasan, y la piedra sigue igual.

Sostén la piedra y dite: Yo también tengo firmeza. Ya he pasado días difíciles, y sigo aquí.

Inhala… y exhala.

Quédate unas respiraciones con el peso y el calor de la piedra.

Puedes volver a esta piedra siempre que necesites sentir los pies en la tierra. Incluso una piedra de verdad, una llave o una taza en la mano pueden recordarte: estás aquí, y tienes firmeza.`,
    `Resta sulla tua riva tranquilla e guarda la sabbia accanto a te.

Tra le conchiglie vedi un sasso liscio e rotondo. Prendilo e tienilo nel palmo.

Senti il suo peso. È più pesante di quanto sembri, solido e calmo. Senti la superficie: liscia, levigata da anni di onde.

Questo sasso ha attraversato migliaia di tempeste. Le onde lo hanno spinto e rigirato, eppure eccolo qui, intero e saldo. Le tempeste lo hanno solo reso più liscio.

Inspira piano… ed espirando lascia che il corpo si senta saldo come il sasso.

Nota la temperatura del sasso. Forse è ancora tiepido di sole. Lascia che quel calore si diffonda nella mano, poi lungo il braccio.

Se arrivano pensieri, immaginali come acqua che scorre sul sasso. Passano, e il sasso resta com’è.

Tieni il sasso e ripeti: Anch’io ho una mia solidità. Ho già attraversato giorni difficili, e sono ancora qui.

Inspira… ed espira.

Resta qualche respiro con il peso e il calore del sasso.

Puoi tornare a questo sasso ogni volta che hai bisogno di sentirti con i piedi per terra. Anche un sasso vero, una chiave o una tazza in mano possono ricordarti: sei qui, e hai una base solida.`,
    `Sakit sahilində qal və yanındakı quma bax.

Balıqqulaqlarının arasında hamar, yumru bir daş görürsən. Onu götür və ovucunda saxla.

Ağırlığını hiss et. Göründüyündən ağırdır, möhkəm və sakit. Səthini hiss et: illərlə dalğaların cilaladığı hamar bir səth.

Bu daş minlərlə fırtınadan keçib. Dalğalar onu itələyib, fırladıb, amma budur, buradadır; bütöv və möhkəm. Fırtınalar onu sadəcə daha da hamarlaşdırıb.

Yavaşca nəfəs al… və verəndə bədəninin bu daş kimi möhkəm hiss etməsinə icazə ver.

Daşın istiliyinə diqqət et. Bəlkə hələ günəşdən ılıqdır. Qoy bu istilik ovucuna, sonra qoluna yayılsın.

Fikirlər gəlsə, onları daşın üstündən axıb gedən su kimi düşün. Keçib gedirlər, daş isə olduğu kimi qalır.

Daşı tut və özünə de: Mən də möhkəm ola bilərəm. Əvvəl də çətin günlərdən keçmişəm və hələ də buradayam.

Nəfəs al… və ver.

Bir neçə nəfəs daşın ağırlığı və istiliyi ilə qal.

Özünü möhkəm bir zəmində hiss etməyə ehtiyacın olanda bu daşa qayıda bilərsən. Əlindəki əsl daş, açar və ya fincan belə sənə xatırlada bilər: buradasan və möhkəmsən.`,
    `Оставайся на своём тихом берегу и посмотри на песок рядом.

Среди ракушек ты видишь гладкий круглый камень. Возьми его и положи на ладонь.

Почувствуй его вес. Он тяжелее, чем кажется, — плотный и спокойный. Почувствуй поверхность: гладкую, отполированную годами волн.

Этот камень пережил тысячи штормов. Волны толкали и переворачивали его, но вот он здесь — целый и устойчивый. Штормы сделали его только глаже.

Медленно вдохни… и на выдохе позволь телу почувствовать себя таким же устойчивым, как камень.

Заметь, какой камень на ощупь. Может быть, он ещё тёплый от солнца. Пусть это тепло растечётся по ладони, а потом по руке.

Если приходят мысли, представь их водой, которая омывает камень. Они проходят, а камень остаётся прежним.

Держи камень и скажи себе: во мне тоже есть устойчивость. Трудные дни уже бывали, и я всё ещё здесь.

Вдох… и выдох.

Побудь несколько вдохов с весом и теплом камня.

Ты можешь вернуться к этому камню, когда нужно почувствовать опору. Даже настоящий камень, ключ или чашка в руке могут напомнить: ты здесь, и у тебя есть опора.`,
  ),
  'shore-seed': pack(
    `Sessiz kıyında gün bitiyor. Gökyüzü yumuşak turuncu ve mor tonlara dönüyor.

Yavaş bir nefes al ve bedeninin ağırlaşıp rahatlamasına izin ver.

Şimdi geceye yanında götüreceğin sakin bir görüntü seç. Gün batımında deniz, bir penceredeki sıcak bir lamba ya da avucundaki pürüzsüz taş olabilir. Sadece bir görüntü, sade ve huzurlu.

Onu zihninde nazikçe tut; yumuşak toprağa bir tohum eker gibi. Onunla bir şey yapmana gerek yok. Sadece orada dinlensin.

Nefes al… ve verirken günü bırak. Bugün ne olduysa oldu. Yarın kendi zamanında gelecek.

Bugün minnettar olduğun küçük bir şeyi düşün. Çok küçük olabilir: sıcak bir içecek, nazik bir söz, ya da sadece şu an nefes alıyor olman.

Bu minnettarlık göğsüne yerleşsin, sıcak ve sessiz.

Dalgalar artık yavaş. Işık soluyor. Her şey sessizleşiyor, sen de.

Uyumaya gidiyorsan nefesin yavaş ve rahat kalsın, seçtiğin görüntü uykuya dalarken seninle olsun.

Bugün yeterince yaptın. Artık dinlenebilirsin.

İyi geceler.`,
    `The day is ending on your quiet shore. The sky turns soft shades of orange and violet.

Take a slow breath, and let your body grow heavy and comfortable.

Now choose one calm image to take with you into the night. It could be the sea at sunset, a warm lamp in a window, or the smooth stone in your hand. Just one image, simple and peaceful.

Hold it gently in your mind, like planting a seed in soft ground. You do not need to do anything with it. Just let it rest there.

Breathe in… and as you breathe out, let the day go. Whatever happened today is done. Tomorrow will come in its own time.

Think of one small thing you are grateful for today. It can be very small: a warm drink, a kind word, simply that you are breathing now.

Let that gratitude settle in your chest, warm and quiet.

The waves are slow now. The light is fading. Everything is getting quieter, and so are you.

If you are going to sleep, let your breathing stay slow and easy, and let the image you chose stay with you as you drift off.

You have done enough today. You can rest now.

Good night.`,
    `En tu orilla tranquila el día termina. El cielo se tiñe de suaves tonos naranjas y violetas.

Respira despacio y deja que el cuerpo se vuelva pesado y cómodo.

Ahora elige una imagen tranquila para llevarte a la noche. Puede ser el mar al atardecer, una lámpara cálida en una ventana o la piedra lisa en tu mano. Solo una imagen, sencilla y serena.

Sostenla con suavidad en la mente, como quien planta una semilla en tierra blanda. No tienes que hacer nada con ella. Solo deja que repose ahí.

Inhala… y al exhalar suelta el día. Lo que haya pasado hoy ya pasó. Mañana llegará a su tiempo.

Piensa en algo pequeño por lo que hoy sientas gratitud. Puede ser muy pequeño: una bebida caliente, una palabra amable o simplemente que ahora estás respirando.

Deja que esa gratitud se asiente en el pecho, cálida y tranquila.

Las olas ya van despacio. La luz se apaga. Todo se vuelve más silencioso, y tú también.

Si vas a dormir, deja que la respiración siga lenta y suave, y que la imagen que elegiste te acompañe mientras te duermes.

Hoy has hecho suficiente. Ahora puedes descansar.

Buenas noches.`,
    `Sulla tua riva tranquilla il giorno finisce. Il cielo si tinge di morbidi toni arancio e viola.

Fai un respiro lento e lascia che il corpo diventi pesante e comodo.

Ora scegli un’immagine calma da portare con te nella notte. Può essere il mare al tramonto, una lampada calda in una finestra o il sasso liscio nella tua mano. Una sola immagine, semplice e serena.

Tienila con dolcezza nella mente, come chi pianta un seme nella terra morbida. Non devi farci niente. Lascia solo che riposi lì.

Inspira… ed espirando lascia andare la giornata. Quello che è successo oggi è passato. Domani arriverà a suo tempo.

Pensa a una piccola cosa per cui oggi provi gratitudine. Può essere piccolissima: una bevanda calda, una parola gentile, o semplicemente il fatto che ora stai respirando.

Lascia che questa gratitudine si posi nel petto, calda e quieta.

Le onde ora sono lente. La luce si spegne. Tutto si fa più silenzioso, e anche tu.

Se stai andando a dormire, lascia che il respiro resti lento e morbido, e che l’immagine che hai scelto ti accompagni mentre ti addormenti.

Oggi hai fatto abbastanza. Ora puoi riposare.

Buonanotte.`,
    `Sakit sahilində gün bitir. Səma yumşaq narıncı və bənövşəyi rənglərə boyanır.

Yavaş bir nəfəs al və bədəninin ağırlaşıb rahatlamasına icazə ver.

İndi gecəyə özünlə aparacağın sakit bir təsvir seç. Gün batımında dəniz, pəncərədə isti bir lampa və ya ovucundakı hamar daş ola bilər. Sadəcə bir təsvir, sadə və dinc.

Onu zehnində yumşaqca saxla; yumşaq torpağa toxum əkən kimi. Onunla nəsə etməyə ehtiyac yoxdur. Qoy sadəcə orada dincəlsin.

Nəfəs al… və verəndə günü burax. Bu gün nə olubsa, olub. Sabah öz vaxtında gələcək.

Bu gün minnətdar olduğun kiçik bir şeyi düşün. Çox kiçik ola bilər: isti bir içki, xoş bir söz, ya da sadəcə indi nəfəs alman.

Qoy bu minnətdarlıq sinənə yerləşsin, isti və sakit.

Dalğalar artıq yavaşdır. İşıq solur. Hər şey sakitləşir, sən də.

Yatmağa gedirsənsə, nəfəsin yavaş və rahat qalsın, seçdiyin təsvir yuxuya gedəndə səninlə olsun.

Bu gün kifayət qədər etdin. İndi dincələ bilərsən.

Gecən xeyrə qalsın.`,
    `На твоём тихом берегу заканчивается день. Небо окрашивается в мягкие оранжевые и лиловые тона.

Сделай медленный вдох и позволь телу стать тяжёлым и удобным.

Теперь выбери один спокойный образ, который возьмёшь с собой в ночь. Это может быть море на закате, тёплая лампа в окне или гладкий камень в ладони. Только один образ, простой и мирный.

Мягко удерживай его в уме, словно сажаешь семя в мягкую землю. С ним ничего не нужно делать. Пусть он просто отдыхает там.

Вдохни… и на выдохе отпусти день. Что бы ни случилось сегодня, это уже позади. Завтра придёт в своё время.

Вспомни одну маленькую вещь, за которую сегодня хочется сказать спасибо. Она может быть совсем маленькой: тёплый напиток, доброе слово или просто то, что ты сейчас дышишь.

Пусть эта благодарность устроится в груди — тёплая и тихая.

Волны теперь медленные. Свет гаснет. Всё становится тише, и ты тоже.

Если ты ложишься спать, пусть дыхание остаётся медленным и лёгким, а выбранный образ будет с тобой, пока ты засыпаешь.

На сегодня сделано достаточно. Теперь можно отдохнуть.

Спокойной ночи.`,
  ),
}

export function medBody(id: string) {
  return MED_SCRIPTS[id]?.tr ?? ''
}
