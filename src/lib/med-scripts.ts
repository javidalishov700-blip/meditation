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
    `Hoş geldin, şimdi birkaç dakikayı yalnızca kendine ayırıyorsun. Hiçbir şeyi başarman gerekmiyor.

Rahatça otur ya da uzan. Ağırlığını altındaki yere bırak. Sandalye, yatak ya da zemin… seni taşıyor. Bir yere tutunmana gerek yok.

İstersen gözlerini kapat, istemezsen bakışını önünde bir noktaya bırak ve gözlerin dinlensin.

Yüzünden başlayalım. Alnındaki gerginlik yavaşça çözülsün. Kaşlarının arası açılsın. Çeneni gevşet, dişlerin birbirinden hafifçe ayrılsın.

Şimdi omuzlarını kulaklarından uzaklaştır, aşağı doğru bırak. Kolların ağırlaşsın. Ellerin olduğu yerde dinlensin.

Dikkatini nefesine ver. Onu değiştirmeye çalışma. Nefes kendiliğinden geliyor… ve kendiliğinden gidiyor.

Aklına başka şeyler gelebilir. Yapılacak işler, kaygılar… Bu çok doğal. Fark ettiğinde kendine kızma. Sadece yavaşça yeniden bedenine dön.

Sırtının desteklendiğini hisset. Bacaklarının ağırlığını… ayaklarını. Bütün bedenin şu anda dinleniyor.

Birkaç nefes böyle kal. Düzeltmen gereken bir şey yok. Şu an sadece buradasın, o kadar.

Hazır olduğunda biraz daha derin bir nefes al… ve yavaşça bırak. İyi ki buradasın.`,
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
    `Xoş gəldin. İndi bir neçə dəqiqəni yalnız özünə ayırırsan. Heç nəyi bacarmağa məcbur deyilsən.

Rahat otur, ya da uzan. Ağırlığını altındakı yerə burax. Stul, yataq, ya da döşəmə… səni saxlayır. Heç nəyə bərk tutunmağa ehtiyac yoxdur.

İstəsən gözlərini yum. İstəmirsənsə, baxışını qarşında bir nöqtəyə burax, gözlərin dincəlsin.

Üzündən başlayaq. Alnındakı gərginlik yavaş-yavaş açılsın. Qaşlarının arası rahatlasın. Çənəni boşalt, dişlərin bir-birindən azca aralansın.

İndi çiyinlərini qulaqlarından uzaqlaşdır, aşağı burax. Qolların ağırlaşsın. Əllərin olduğu yerdə dincəlsin.

Diqqətini nəfəsinə ver. Onu dəyişməyə çalışma. Nəfəs öz-özünə gəlir… və öz-özünə gedir.

Ağlına başqa şeylər gələ bilər. Görüləcək işlər, narahatlıqlar… Bu çox təbiidir. Fikrin dağılanda özünə acıqlanma. Sadəcə yavaşca yenidən bədəninə qayıt.

Kürəyinin dayaq tapdığını hiss et. Ayaqlarının ağırlığını… dabanlarını. Bütün bədənin indi dincəlir.

Bir neçə nəfəs belə qal. Düzəltməli heç nə yoxdur. İndi sadəcə buradasan, bu qədər.

Hazır olanda bir az dərin nəfəs al… və yavaşca burax. Yaxşı ki, buradasan.`,
    `Здравствуй. Следующие несколько минут — только для тебя. Ничего не нужно делать правильно.

Сядь или ляг так, как тебе удобно. Отдай свой вес тому, что под тобой: стулу, кровати или полу. Оно держит тебя. Можно ни за что не держаться.

Если хочется, закрой глаза. Или просто опусти взгляд и дай глазам отдохнуть.

Начнём с лица. Пусть разгладится лоб. Расслабится место между бровями. Разожми челюсть, пусть зубы чуть разомкнутся.

Теперь опусти плечи, подальше от ушей. Руки становятся тяжёлыми. Ладони спокойно лежат там, где лежат.

Обрати внимание на дыхание. Не меняй его. Вдох приходит сам… и сам уходит.

Могут приходить мысли: дела, тревоги… Это нормально. Когда замечаешь, что мысли унесли тебя, не ругай себя. Просто мягко вернись к телу.

Почувствуй, как спина находит опору. Тяжесть ног… стопы. Всё тело сейчас отдыхает.

Побудь так несколько вдохов. Ничего не нужно исправлять. Ты просто здесь, и этого достаточно.

Когда почувствуешь готовность, сделай вдох чуть глубже… и медленно выдохни. Хорошо, что ты здесь.`,
  ),
  'first-breath': pack(
    `Şimdi birkaç dakika nefesinle birlikte olalım.

Rahatça yerleş, omuzlarını gevşet. Bir süre nefesini olduğu gibi izle. En çok nerede hissediyorsun? Burnunda mı, göğsünde mi, karnında mı?

Şimdi nefesini biraz yavaşlatalım. Burnundan nefes al… bir, iki, üç, dört.

Ağzından yavaşça ver… bir, iki, üç, dört, beş, altı.

Nefesi uzun uzun vermek bedeni sakinleştirir. Bir kez daha… dörde kadar al… altıya kadar ver.

Saymak seni zorluyorsa saymayı bırak. Nefes verişini, alışından biraz daha uzun tutman yeterli.

Nefes alırken karnın hafifçe şişsin, verirken yumuşasın. Omuzların aşağıda, çenen gevşek kalsın.

Kalbin hızlı atıyorsa onu durdurmaya çalışma. Sen sadece nefesini yavaş ve uzun vermeye devam et. Bedenin kendi zamanında sakinleşecek.

Nefes al… ve bırak.

Nefes al… ve bırak.

Birkaç nefes daha kendi hızında devam et.

Şimdi nefesini serbest bırak, kendi ritmine dönsün. Biraz öncesine göre bedeninin nasıl olduğuna bak. Küçük bir rahatlama bile yeter.`,
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
    `İndi bir neçə dəqiqə nəfəsinlə birlikdə olaq.

Rahat yerləş, çiyinlərini boşalt. Bir az nəfəsini olduğu kimi izlə. Onu ən çox harada hiss edirsən? Burnunda, sinəndə, yoxsa qarnında?

İndi nəfəsi bir az yavaşladaq. Burnundan nəfəs al… bir, iki, üç, dörd.

Ağzından yavaşca ver… bir, iki, üç, dörd, beş, altı.

Nəfəsi uzun-uzun vermək bədəni sakitləşdirir. Bir dəfə də… dördə qədər al… altıya qədər ver.

Saymaq səni yorursa, saymağı burax. Nəfəs verməyi almaqdan bir az uzun tutmağın kifayətdir.

Nəfəs alanda qarnın yüngülcə qalxsın, verəndə yumşalsın. Çiyinlərin aşağıda, çənən boş qalsın.

Ürəyin tez döyünürsə, onu dayandırmağa çalışma. Sadəcə nəfəsini yavaş və uzun verməyə davam et. Bədənin öz vaxtında sakitləşəcək.

Nəfəs al… və burax.

Nəfəs al… və burax.

Bir neçə nəfəs də öz sürətinlə davam et.

İndi nəfəsini sərbəst burax, öz ritminə qayıtsın. Bir az əvvələ nisbətən bədəninin necə olduğuna bax. Kiçik bir rahatlıq belə kifayətdir.`,
    `Давай проведём несколько минут вместе с дыханием.

Устройся поудобнее, опусти плечи. Понаблюдай за дыханием, какое оно есть. Где ты чувствуешь его сильнее всего? В носу, в груди или в животе?

Теперь немного замедлим дыхание. Вдох через нос… раз, два, три, четыре.

И медленный выдох через рот… раз, два, три, четыре, пять, шесть.

Долгий выдох помогает телу успокоиться. Ещё раз… вдох на четыре… выдох на шесть.

Если считать трудно, не считай. Просто делай выдох чуть длиннее вдоха.

На вдохе живот мягко поднимается, на выдохе опускается. Плечи внизу, челюсть расслаблена.

Если сердце бьётся быстро, не пытайся его остановить. Просто продолжай медленно и долго выдыхать. Тело успокоится в своё время.

Вдох… и выдох.

Вдох… и выдох.

Ещё несколько вдохов в своём темпе.

Теперь отпусти дыхание, пусть оно вернётся к своему ритму. Заметь, как чувствует себя тело сейчас, по сравнению с началом. Даже небольшого облегчения достаточно.`,
  ),
  'first-ground': pack(
    `Düşüncelerin hızlandığında bu çalışma seni yeniden şu ana getirir.

Ayaklarından başla. Onları yere hafifçe bastır. Topuklarını, tabanlarını, parmaklarını hisset. Yer sağlam… seni taşıyor.

Şimdi etrafına bak ve gördüğün beş şeyi içinden say. Bir lamba, bir pencere, bir bardak… ne varsa.

Sonra dokunduğun dört şeyi hisset. Üzerindeki kıyafet. Tenine değen hava. Ellerinin ağırlığı. Oturduğun yer.

Şimdi duyduğun üç sese kulak ver. Uzaktan geçen bir araba, odadaki hafif bir uğultu… ya da kendi nefesin.

Kokusunu alabildiğin iki şey bul. Hiçbir koku gelmiyorsa havanın kendisini kokla.

Ve ağzındaki tadı hisset. Tek bir tat, o kadar.

Şu an buradasın. Bu odada, bu anda. Aklın yarına ya da düne gidebilir. Bedenin ise hep burada, şimdide.

Yavaşça nefes al… ve uzun uzun ver. Ayaklarını bir kez daha yerde hisset.

Gün içinde düşüncelerin seni yeniden sürüklerse bunu hatırla: beş, dört, üç, iki, bir… ve ayakların yerde.`,
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
    `Fikirlərin sürətlənəndə bu məşq səni yenidən bu ana qaytarır.

Ayaqlarından başla. Onları yüngülcə yerə bas. Dabanlarını, pəncələrini, barmaqlarını hiss et. Yer möhkəmdir… səni saxlayır.

İndi ətrafına bax və gördüyün beş şeyi içində say. Bir lampa, bir pəncərə, bir stəkan… nə varsa.

Sonra toxunduğun dörd şeyi hiss et. Əynindəki paltar. Dərinə dəyən hava. Əllərinin ağırlığı. Oturduğun yer.

İndi eşitdiyin üç səsə qulaq as. Uzaqdan keçən bir maşın, otaqdakı zəif bir uğultu… ya da öz nəfəsin.

Qoxusunu duya bildiyin iki şey tap. Heç bir qoxu gəlmirsə, havanın özünü içinə çək.

Və ağzındakı dadı hiss et. Tək bir dad, bu qədər.

İndi buradasan. Bu otaqda, bu anda. Fikrin sabaha, ya da dünənə qaça bilər. Bədənin isə həmişə burada, bu andadır.

Yavaşca nəfəs al… və uzun-uzun ver. Ayaqlarını bir dəfə də yerdə hiss et.

Gün ərzində fikirlər səni yenə aparsa, bunu xatırla: beş, dörd, üç, iki, bir… və ayaqların yerdədir.`,
    `Это упражнение помогает вернуться в настоящий момент, когда мысли несутся слишком быстро.

Начни со стоп. Слегка прижми их к полу. Почувствуй пятки, подошвы, пальцы. Пол твёрдый… он держит тебя.

Теперь оглянись и про себя назови пять вещей, которые видишь. Лампа, окно, чашка… всё, что есть рядом.

Потом почувствуй четыре прикосновения. Одежда на теле. Воздух на коже. Тяжесть рук. То, на чём ты сидишь.

Прислушайся к трём звукам. Машина вдалеке, тихий гул в комнате… или твоё собственное дыхание.

Найди два запаха. Если ничего не чувствуешь, просто вдохни запах воздуха.

И заметь вкус во рту. Один вкус, этого достаточно.

Ты здесь. В этой комнате, в этом моменте. Мысли могут убегать в завтра или во вчера. А тело всегда здесь, сейчас.

Медленно вдохни… и долго выдохни. Ещё раз почувствуй стопы на полу.

Если днём мысли снова тебя унесут, вспомни: пять, четыре, три, два, один… и стопы на полу.`,
  ),
  'room-door': pack(
    `Bu meditasyonda kendini güvende hissettiğin bir odada dinleneceksin.

İstersen gözlerini kapat ve yavaşça nefes al. Şimdi iyi tanıdığın bir odayı düşün. Kendi odan, büyükannenin evi ya da bir zamanlar huzur bulduğun herhangi bir yer olabilir.

Önce kapıyı gözünün önüne getir. Rengi nasıl? Kolu nerede? Kapı kapalı ve sen içeride güvendesin. Şu an kimsenin içeri girmesi gerekmiyor.

Şimdi odaya şöyle bir bak. Pencere nerede? Işık nereden geliyor? Bir koltuk, bir yatak, yerde bir halı var mı?

Kendine rahat bir köşe seç ve oraya yerleş. Nerede olduğunu bilmek bedenini gevşetiyor.

Bazen bir düşünce kapıyı çalabilir. Bir kaygı, bir iş, bir anı… Kapıyı açmak zorunda değilsin. Çaldığını duy ve bırak. Kapı kapalı kalıyor.

Yavaşça nefes al… ve ver. Her nefes verişinde omuzların biraz daha aşağı insin.

Bu oda hep burada, seni bekliyor. Dünya fazla gürültülü geldiğinde buraya gelebilir, kapıyı kapatıp dinlenebilirsin.

Biraz daha kal. Odadaki sessizliği dinle. Şu an güvendesin.

Hazır olduğunda derin bir nefes al. Bu sakinliği yanına alarak yavaşça geri dön.`,
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

İstəsən gözlərini yum və yavaşca nəfəs al. İndi yaxşı tanıdığın bir otağı düşün. Öz otağın, nənənin evi, ya da nə vaxtsa rahatlıq tapdığın hər hansı bir yer ola bilər.

Əvvəlcə qapını gözünün önünə gətir. Rəngi necədir? Dəstəyi haradadır? Qapı bağlıdır və sən içəridə təhlükəsizsən. İndi heç kimin içəri girməsinə ehtiyac yoxdur.

İndi otağa bir göz gəzdir. Pəncərə haradadır? İşıq haradan gəlir? Bir kreslo, bir çarpayı, yerdə bir xalça varmı?

Özünə rahat bir künc seç və ora yerləş. Harada olduğunu bilmək bədənini rahatladır.

Bəzən bir fikir qapını döyə bilər. Bir narahatlıq, bir iş, bir xatirə… Qapını açmağa məcbur deyilsən. Döyüldüyünü eşit və burax. Qapı bağlı qalır.

Yavaşca nəfəs al… və ver. Hər nəfəs verəndə çiyinlərin bir az da aşağı ensin.

Bu otaq həmişə buradadır, səni gözləyir. Dünya çox səs-küylü gələndə bura gələ, qapını bağlayıb dincələ bilərsən.

Bir az da qal. Otaqdakı sükutu dinlə. İndi təhlükəsizsən.

Hazır olanda dərin nəfəs al. Bu sakitliyi özünlə götür və yavaşca geri qayıt.`,
    `В этой медитации ты отдохнёшь в комнате, где тебе спокойно и безопасно.

Если хочется, закрой глаза и медленно вдохни. Представь комнату, которую хорошо знаешь. Твоя спальня, бабушкин дом или любое место, где тебе когда-то было спокойно.

Сначала представь дверь. Какого она цвета? Где ручка? Дверь закрыта, и ты внутри, в безопасности. Сейчас никому не нужно входить.

Теперь оглядись. Где окно? Откуда идёт свет? Есть ли кресло, кровать, ковёр на полу?

Выбери уютное место и устройся там. Когда знаешь, где находишься, телу легче расслабиться.

Иногда в дверь может постучать мысль. Тревога, дело, воспоминание… Открывать не обязательно. Просто услышь стук и отпусти. Дверь остаётся закрытой.

Медленно вдохни… и выдохни. С каждым выдохом плечи опускаются чуть ниже.

Эта комната всегда здесь и ждёт тебя. Когда мир покажется слишком шумным, можно прийти сюда, закрыть дверь и отдохнуть.

Побудь здесь ещё немного. Послушай тишину. Сейчас ты в безопасности.

Когда почувствуешь готовность, глубоко вдохни. Возьми это спокойствие с собой и медленно возвращайся.`,
  ),
  'room-light': pack(
    `Sessiz odana yeniden dönelim. Bu kez ışığa bakacağız.

Yavaşça nefes al, ver ve odayı yeniden gözünün önüne getir. Işık nereden geliyor? Belki pencereden süzülen yumuşak bir güneş, belki sarı, sıcak bir lamba.

Bu ışığın biraz daha ısındığını, biraz daha yumuşadığını hayal et. Yavaşça odaya, yere ve sana doğru yayılıyor.

Önce yüzünü ısıtıyor. Alnın gevşiyor. Gözlerin dinleniyor. Çenen yumuşuyor.

Işık boynuna ve omuzlarına iniyor. Dokunduğu her yerde gerginlik, güneşte eriyen kar gibi azalıyor.

Şimdi göğsüne ulaşıyor. Nefesin yavaşlıyor, rahatlıyor. Sonra karnına… yumuşak ve sakin.

Işık kollarından ellerine doğru akıyor. Ellerin ısınıyor, ağırlaşıyor.

Bacaklarından aşağı, ta ayak parmaklarına kadar iniyor. Bütün bedenin sıcak, yumuşak bir ışıkla sarılı.

Hâlâ gergin kalan bir yer varsa onunla uğraşma. Işık bir süre orada beklesin. Acelen yok.

Nefes alırken bu sıcaklığı içine çek… verirken artık sana gerekmeyen ne varsa bırak.

Birkaç nefes bu ışığın içinde kal. Burada güvendesin, sıcacık ve rahat.

Hazır olduğunda görüntü yavaşça solsun. Sıcaklık seninle kalsın.`,
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
    `Sakit otağına yenidən qayıdaq. Bu dəfə işığa baxacağıq.

Yavaşca nəfəs al, ver və otağı yenidən gözünün önünə gətir. İşıq haradan gəlir? Bəlkə pəncərədən süzülən yumşaq günəş, bəlkə sarı, isti bir lampa.

Təsəvvür et ki, bu işıq bir az da isinir, bir az da yumşalır. Yavaşca otağa, yerə və sənə tərəf yayılır.

Əvvəlcə üzünü isidir. Alnın boşalır. Gözlərin dincəlir. Çənən yumşalır.

İşıq boynuna və çiyinlərinə enir. Toxunduğu hər yerdə gərginlik, günəşdə əriyən qar kimi azalır.

İndi sinənə çatır. Nəfəsin yavaşlayır, rahatlaşır. Sonra qarnına… yumşaq və sakit.

İşıq qollarından əllərinə doğru axır. Əllərin isinir, ağırlaşır.

Ayaqlarından aşağı, lap barmaqlarının ucuna qədər enir. Bütün bədənin isti, yumşaq bir işığa bürünüb.

Hələ də gərgin qalan bir yer varsa, onunla əlləşmə. Qoy işıq bir az orada qalsın. Tələsməyə ehtiyac yoxdur.

Nəfəs alanda bu istiliyi içinə çək… verəndə artıq sənə lazım olmayan nə varsa, burax.

Bir neçə nəfəs bu işığın içində qal. Burada təhlükəsizsən, isti və rahatsan.

Hazır olanda qoy görüntü yavaşca solsun. İstilik isə səninlə qalsın.`,
    `Вернёмся в твою тихую комнату. На этот раз посмотрим на свет.

Медленно вдохни, выдохни и снова представь комнату. Откуда идёт свет? Может быть, мягкое солнце из окна, а может, тёплая жёлтая лампа.

Представь, что свет становится чуть теплее и мягче. Он медленно разливается по комнате, по полу и по тебе.

Сначала он согревает лицо. Лоб разглаживается. Глаза отдыхают. Челюсть становится мягкой.

Свет опускается на шею и плечи. Там, где он касается, напряжение тает, как снег на солнце.

Теперь он доходит до груди. Дыхание становится медленным и спокойным. Потом до живота… мягко и тихо.

Свет течёт по рукам до самых ладоней. Руки теплеют и тяжелеют.

Он спускается по ногам до кончиков пальцев. Всё тело окутано тёплым мягким светом.

Если где-то ещё остаётся напряжение, не борись с ним. Пусть свет побудет там подольше. Спешить некуда.

На вдохе впусти это тепло… на выдохе отпусти всё, что тебе сейчас не нужно.

Побудь в этом свете несколько вдохов. Здесь безопасно, тепло и спокойно.

Когда почувствуешь готовность, пусть картинка медленно растает. А тепло останется с тобой.`,
  ),
  'room-hands': pack(
    `Bu bölümde kendi ellerinle kendini rahatlatacaksın.

Odana yerleş ve yavaşça nefes al. Dikkatini ellerine ver. Şu an nasıllar? Sıcak mı, serin mi? Hafif mi, ağır mı?

Avuçlarını birkaç saniye birbirine sürt. Oluşan sıcaklığı hisset.

Şimdi bir elini göğsüne, kalbinin üstüne koy. Diğerini karnına. Nefes aldıkça ellerinin hafifçe kalkıp indiğini hisset.

Üzgün bir arkadaşına nasıl sarılırsan, kendine de öyle sarılabilirsin. Bu eller şu an sana şefkat gösteriyor.

İçinden kendine söyle: Buradayım. Şu an güvendeyim. Bu his geçecek.

Nefes al… ellerin yükseliyor. Nefes ver… ellerin yerine dönüyor.

Bir duygu gelirse gelsin. Onu itmene gerek yok. Ellerin seni olduğun gibi tutuyor.

Uzun zamandır çok şey taşıyorsun. Bu birkaç dakika boyunca hiçbir yük taşımana gerek yok. Sadece dinlen.

Birkaç nefes daha ellerinin sıcaklığında kal.

Bitirmeden önce kendine bu zamanı ayırdığın için teşekkür et. Hazır olduğunda ellerini kucağına bırak, derin bir nefes al ve gözlerini yavaşça aç.`,
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
    `Bu hissədə öz əllərinlə özünə təskinlik verəcəksən.

Otağına yerləş və yavaşca nəfəs al. Diqqətini əllərinə ver. İndi necədirlər? İsti, yoxsa sərin? Yüngül, yoxsa ağır?

Ovuclarını bir neçə saniyə bir-birinə sürt. Yaranan istiliyi hiss et.

İndi bir əlini sinənə, ürəyinin üstünə qoy. O biri əlini qarnına. Nəfəs aldıqca əllərinin yavaşca qalxıb endiyini hiss et.

Kədərli bir dostunu necə qucaqlayırsansa, özünü də elə qucaqlaya bilərsən. Bu əllər indi sənə qayğı göstərir.

İçində özünə de: Buradayam. İndi təhlükəsizəm. Bu hiss keçib gedəcək.

Nəfəs al… əllərin qalxır. Nəfəs ver… əllərin yerinə qayıdır.

Bir hiss gəlsə, qoy gəlsin. Onu itələməyə ehtiyac yoxdur. Əllərin səni olduğun kimi tutur.

Çoxdandır çox şey daşıyırsan. Bu bir neçə dəqiqədə heç bir yük daşımağa ehtiyac yoxdur. Sadəcə dincəl.

Bir neçə nəfəs də əllərinin istiliyində qal.

Bitirməzdən əvvəl bu vaxtı özünə ayırdığın üçün özünə təşəkkür et. Hazır olanda əllərini dizlərinin üstünə qoy, dərin nəfəs al və gözlərini yavaşca aç.`,
    `В этой части ты успокоишь себя собственными руками.

Устройся в своей комнате и медленно вдохни. Переведи внимание на руки. Какие они сейчас? Тёплые или прохладные? Лёгкие или тяжёлые?

Потри ладони друг о друга несколько секунд. Почувствуй тепло.

Теперь положи одну руку на грудь, на сердце. Другую на живот. Почувствуй, как с каждым вдохом руки чуть поднимаются и опускаются.

Так, как обнимают грустного друга, можно обнять и себя. Эти руки сейчас заботятся о тебе.

Скажи себе мысленно: Я здесь. Сейчас я в безопасности. Это чувство пройдёт.

Вдох… руки поднимаются. Выдох… руки опускаются.

Если приходит какое-то чувство, пусть приходит. Не нужно его прогонять. Твои руки бережно держат тебя.

Ты давно несёшь очень многое. В эти несколько минут ничего нести не нужно. Просто отдохни.

Побудь ещё несколько вдохов в тепле своих рук.

Прежде чем закончить, поблагодари себя за это время. Когда почувствуешь готовность, опусти руки на колени, глубоко вдохни и медленно открой глаза.`,
  ),
  'shore-edge': pack(
    `Sessiz bir sahilde, denizin kıyısında oturduğunu hayal et.

Yavaşça nefes al. Altındaki kumu ya da düz bir kayayı hisset. Sağlam, sabit. Önünde deniz ufka kadar uzanıyor.

Dalgaları izle. Biri yavaşça yükseliyor, büyüyor, sonra kıyıya usulca vurup geri çekiliyor. Ardından yenisi geliyor.

Duygular da böyledir. Kaygı bir dalga gibi kabarabilir, güçlenebilir, en yükseğe çıkabilir… ama sonunda hep geri çekilir. Her dalga geri çekilir.

Dalgaları durdurman gerekmiyor. Sen kıyısın. Dalgalar gelir, gider. Kıyı yerinde kalır.

Dalga gelirken nefes al… çekilirken ver.

Al… ve ver.

Suyun sesini dinle. Düzenli, sakin. Yüzüne değen serin havayı hisset.

Büyük bir dalga gelirse, güçlü bir duygu ya da hızlanan bir düşünce, sadece izle. Ne kadar büyüdüğünü gör… sonra küçülmeye başladığını. Zaten denize geri dönüyor.

Kıyıda güvendesin. Deniz hareket ediyor, sen yerindesin.

Bir süre daha dalgalarla birlikte nefes al.

Hazır olduğunda derin bir nefes al. Oturduğun yeri hisset ve yavaşça buraya dön.`,
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
    `Sakit bir sahildə, dənizin kənarında oturduğunu təsəvvür et.

Yavaşca nəfəs al. Altındakı qumu, ya da hamar bir qayanı hiss et. Möhkəm, sabit. Qarşında dəniz üfüqə qədər uzanır.

Dalğalara bax. Biri yavaşca qalxır, böyüyür, sonra sahilə yumşaqca dəyib geri çəkilir. Ardınca yenisi gəlir.

Hisslər də belədir. Narahatlıq dalğa kimi qabara, güclənə, ən yüksək nöqtəyə çata bilər… amma sonunda həmişə geri çəkilir. Hər dalğa geri çəkilir.

Dalğaları dayandırmağa ehtiyac yoxdur. Sən sahilsən. Dalğalar gəlir, gedir. Sahil yerində qalır.

Dalğa gələndə nəfəs al… çəkiləndə ver.

Al… və ver.

Suyun səsini dinlə. Ahəngdar, sakit. Üzünə toxunan sərin havanı hiss et.

Böyük bir dalğa gəlsə, güclü bir hiss, ya da sürətlənən bir fikir, sadəcə izlə. Necə böyüdüyünü gör… sonra necə kiçildiyini. O artıq dənizə qayıdır.

Sahildə təhlükəsizsən. Dəniz hərəkət edir, sən yerindəsən.

Bir az da dalğalarla birlikdə nəfəs al.

Hazır olanda dərin nəfəs al. Oturduğun yeri hiss et və yavaşca bura qayıt.`,
    `Представь, что ты сидишь на тихом берегу у самого моря.

Медленно вдохни. Почувствуй под собой песок или гладкий камень. Твёрдый, надёжный. Перед тобой море до самого горизонта.

Посмотри на волны. Одна медленно поднимается, растёт, мягко касается берега и отступает. За ней приходит следующая.

С чувствами бывает так же. Тревога может нарастать, как волна, усиливаться, подниматься до самого гребня… но потом всегда отступает. Каждая волна отступает.

Не нужно останавливать волны. Ты берег. Волны приходят и уходят. Берег остаётся.

Волна набегает — вдох… отступает — выдох.

Вдох… и выдох.

Послушай шум воды. Ровный, спокойный. Почувствуй свежий воздух на лице.

Если придёт большая волна, сильное чувство или быстрая мысль, просто наблюдай. Посмотри, как она растёт… и как начинает спадать. Она уже возвращается в море.

На берегу ты в безопасности. Море движется, а ты на месте.

Подыши ещё немного вместе с волнами.

Когда почувствуешь готовность, глубоко вдохни. Почувствуй, на чём ты сидишь, и медленно возвращайся.`,
  ),
  'shore-stone': pack(
    `Sessiz sahilinde biraz daha kal ve yanındaki kuma bir bak.

Deniz kabuklarının arasında yuvarlak, pürüzsüz bir taş var. Onu al ve avucunun içine yerleştir.

Ağırlığını hisset. Göründüğünden ağır… sağlam ve sakin. Yüzeyi pürüzsüz; yıllarca dalgalar onu yavaş yavaş parlatmış.

Bu taş sayısız fırtına görmüş. Dalgalar onu itmiş, çevirmiş… ama hâlâ burada, bütün ve sağlam. Fırtınalar onu sadece daha da yumuşatmış.

Yavaşça nefes al… verirken bedenin de bu taş gibi ağırlaşsın, sağlamlaşsın.

Taşın sıcaklığını hisset. Belki hâlâ güneşten ılık. Bu sıcaklık avucundan koluna doğru yayılsın.

Aklına düşünceler gelirse onları taşın üstünden akıp giden su gibi düşün. Su akar gider, taş yerinde kalır.

Taşı avucunda tut ve kendine söyle: Ben de sağlamım. Daha önce de zor günler atlattım ve hâlâ buradayım.

Nefes al… ve ver.

Birkaç nefes daha taşın ağırlığı ve sıcaklığıyla kal.

Kendini sarsılmış hissettiğin her an bu taşı hatırlayabilirsin. Elindeki gerçek bir taş, bir anahtar, sıcak bir fincan bile sana bunu hatırlatır: Buradasın ve sağlamsın.`,
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
    `Sakit sahilində qal. Yanındakı quma bir bax.

Balıqqulaqlarının arasında yumru, hamar bir daş var. Onu götür və ovucunun içinə qoy.

Ağırlığını hiss et. Göründüyündən ağırdır… möhkəm və sakit. Səthi hamardır; illərlə dalğalar onu yavaş-yavaş cilalayıb.

Bu daş saysız fırtınalar görüb. Dalğalar onu itələyib, fırladıb… amma hələ də buradadır, bütöv və möhkəm. Fırtınalar onu sadəcə daha da hamarlayıb.

Yavaşca nəfəs al… verəndə qoy bədənin də bu daş kimi ağırlaşsın, möhkəmlənsin.

Daşın istiliyini hiss et. Bəlkə hələ də günəşdən ilıqdır. Bu istilik ovucundan qoluna doğru yayılsın.

Ağlına fikirlər gəlsə, onları daşın üstündən axıb gedən su kimi düşün. Su axıb gedir, daş yerində qalır.

Daşı ovucunda saxla və özünə de: Mən də möhkəməm. Əvvəl də çətin günlər keçirmişəm və hələ də buradayam.

Nəfəs al… və ver.

Bir neçə nəfəs də daşın ağırlığı və istiliyi ilə qal.

Özünü sarsılmış hiss etdiyin hər an bu daşı xatırlaya bilərsən. Əlindəki əsl bir daş, bir açar, isti bir fincan belə bunu sənə xatırladar: Buradasan və möhkəmsən.`,
    `Побудь ещё на своём тихом берегу. Посмотри на песок рядом.

Среди ракушек лежит круглый гладкий камень. Возьми его и положи на ладонь.

Почувствуй его вес. Он тяжелее, чем кажется… надёжный и спокойный. Поверхность гладкая: волны годами медленно шлифовали его.

Этот камень пережил множество штормов. Волны толкали его, переворачивали… но он здесь, целый и крепкий. Штормы только сделали его глаже.

Медленно вдохни… и на выдохе пусть тело тоже станет тяжёлым и устойчивым, как этот камень.

Почувствуй тепло камня. Может быть, он ещё хранит солнце. Пусть это тепло растекается от ладони по руке.

Если приходят мысли, представь, что это вода, которая течёт по камню. Вода утекает, камень остаётся.

Держи камень и скажи себе: Во мне тоже есть опора. Трудные дни уже бывали, и я всё ещё здесь.

Вдох… и выдох.

Побудь ещё несколько вдохов с тяжестью и теплом камня.

Когда почувствуешь, что теряешь опору, вспомни этот камень. Настоящий камешек в руке, ключ или тёплая чашка тоже напомнят: ты здесь, и у тебя есть опора.`,
  ),
  'shore-seed': pack(
    `Sessiz sahilinde gün bitiyor. Gökyüzü yavaş yavaş turuncuya, sonra mora dönüyor.

Yavaşça nefes al. Bedenin ağırlaşsın, gevşesin.

Şimdi geceye yanında götüreceğin sakin bir görüntü seç. Gün batımında deniz, bir pencerede yanan sıcak bir lamba ya da avucundaki o pürüzsüz taş olabilir. Tek bir görüntü, sade ve huzurlu.

Onu zihninde usulca tut. Yumuşak toprağa bir tohum bırakır gibi. Bir şey yapmana gerek yok. Sadece orada dursun.

Nefes al… ve verirken bugünü bırak. Bugün ne olduysa oldu. Yarın, zamanı gelince gelecek.

Bugün sana iyi gelen küçük bir şeyi düşün. Çok küçük olabilir. Sıcak bir çay, güzel bir söz… ya da şu an rahatça nefes alıyor olman.

Bu şükran göğsüne yerleşsin. Sıcak ve sessiz.

Dalgalar artık yavaş. Işık soluyor. Her şey sessizleşiyor… sen de.

Uyumaya hazırlanıyorsan nefesin yavaş ve rahat kalsın. Seçtiğin görüntü uykuya dalarken seninle olsun.

Bugün yeterince yaptın. Artık dinlenebilirsin.

Huzurlu bir gece geçir, iyi geceler.`,
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
    `Sakit sahilində gün bitir. Səma yavaş-yavaş narıncı, sonra bənövşəyi rəngə çalır.

Yavaşca nəfəs al. Qoy bədənin ağırlaşsın, boşalsın.

İndi gecəyə özünlə aparacağın sakit bir görüntü seç. Gün batanda dəniz, bir pəncərədə yanan isti lampa, ya da ovucundakı o hamar daş ola bilər. Tək bir görüntü, sadə və dinc.

Onu zehnində yumşaqca saxla. Yumşaq torpağa toxum əkən kimi. Heç nə etməyə ehtiyac yoxdur. Qoy sadəcə orada qalsın.

Nəfəs al… və verəndə bu günü burax. Bu gün nə olubsa, olub. Sabah vaxtı çatanda gələcək.

Bu gün sənə xoş gələn kiçik bir şeyi düşün. Çox kiçik ola bilər. İsti bir çay, xoş bir söz… ya da indi rahat nəfəs alman.

Qoy bu minnətdarlıq sinənə yerləşsin. İsti və sakit.

Dalğalar artıq yavaşdır. İşıq solur. Hər şey sakitləşir… sən də.

Yatmağa hazırlaşırsansa, nəfəsin yavaş və rahat qalsın. Seçdiyin görüntü yuxuya gedərkən səninlə olsun.

Bu gün kifayət qədər etdin. İndi dincələ bilərsən.

Gecən xeyrə qalsın.`,
    `На твоём тихом берегу заканчивается день. Небо медленно становится оранжевым, а потом сиреневым.

Медленно вдохни. Пусть тело тяжелеет и расслабляется.

Теперь выбери спокойную картинку, которую возьмёшь с собой в ночь. Море на закате, тёплая лампа в окне или тот гладкий камень на ладони. Одна картинка, простая и тихая.

Мягко держи её в мыслях. Как семечко, которое опускают в мягкую землю. Ничего не нужно с ней делать. Пусть просто будет.

Вдохни… и на выдохе отпусти этот день. Что было сегодня, то было. Завтра придёт в своё время.

Вспомни одну маленькую хорошую вещь за сегодня. Совсем маленькую. Тёплый чай, доброе слово… или то, что сейчас ты спокойно дышишь.

Пусть эта благодарность поселится в груди. Тёплая и тихая.

Волны теперь медленные. Свет гаснет. Всё затихает… и ты тоже.

Если ты ложишься спать, пусть дыхание остаётся медленным и мягким. Пусть выбранная картинка будет с тобой, пока ты засыпаешь.

На сегодня сделано достаточно. Теперь можно отдыхать.

Спокойной ночи.`,
  ),
}

export function medBody(id: string) {
  return MED_SCRIPTS[id]?.tr ?? ''
}
