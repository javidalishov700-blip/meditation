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
    `Hoş geldin, şimdi birkaç dakikayı yalnızca kendine ayırıyorsun. Hiçbir şeyi başarman gerekmiyor. Bu birkaç dakika boyunca sadece burada olman yeterli.

Rahatça otur ya da uzan, nasıl daha rahat ediyorsan öyle. Bir yerin rahatsız ediyorsa küçük bir hareketle düzelt; acele etme.

Ağırlığını altındaki yere bırak. Sandalye, yatak ya da zemin… seni taşıyor. Bir yere tutunmana gerek yok. Her nefes verişinde biraz daha ağırlaştığını hissedebilirsin.

İstersen gözlerini kapat, istemezsen bakışını önünde bir noktaya bırak ve gözlerin dinlensin. Göz kapakların yumuşasın.

Şimdi birkaç nefesi fark ederek alalım. Burnundan yavaşça nefes al… ve ağzından yavaşça bırak. Bir kez daha… al… ve bırak. Şimdi nefes kendi ritmine dönsün.

Yüzünden başlayalım. Alnındaki gerginlik yavaşça çözülsün. Kaşlarının arası açılsın. Gözlerinin çevresindeki küçük kaslar yumuşasın.

Çeneni gevşet, dişlerin birbirinden hafifçe ayrılsın. Dilin ağzının içinde rahatça dinlensin. Yanakların ve dudakların yumuşasın.

Dikkatini boynuna getir. Başının ağırlığını hisset ve boynunun bu ağırlığı biraz bırakmasına izin ver.

Şimdi omuzlarını kulaklarından uzaklaştır, aşağı doğru bırak. Çoğumuz omuzlarımızı farkında olmadan yukarıda tutarız. Şu an onları bırakabilirsin.

Kolların ağırlaşsın. Dirseklerin, bileklerin, ellerin… Ellerin olduğu yerde dinlensin. Parmakların hafifçe açılsın.

Göğsünü ve karnını fark et. Nefes alırken hafifçe yükseliyor, verirken iniyor. Onu değiştirmeye çalışma. Sadece izle.

Sırtının desteklendiğini hisset. Belinin ve kalçalarının ağırlığını… bacaklarını… ve en sonunda ayaklarını. Bütün bedenin şu anda dinleniyor.

Aklına başka şeyler gelebilir. Yapılacak işler, konuşmalar, kaygılar… Bu çok doğal. Fark ettiğinde kendine kızma. İçinden “düşünce” de ve yavaşça bedenine dön.

Şimdi bir süre bedeninin bütününü birlikte hisset. Başından ayaklarına kadar oturan, dinlenen, taşınan bir beden. Nefes kendiliğinden geliyor ve gidiyor.

Birkaç nefes böyle kal. Düzeltmen gereken bir şey yok. Şu an sadece buradasın, o kadar.

Yavaş yavaş dikkatini yeniden odaya getir. Etrafındaki sesleri fark et. Altındaki yeri bir kez daha hisset.

Hazır olduğunda biraz daha derin bir nefes al… ve yavaşça bırak. Parmaklarını hafifçe oynat. İstediğin zaman gözlerini aç. İyi ki buradasın.`,
    `Welcome. For the next few minutes, this time is just for you. There is nothing you need to achieve. Simply being here is enough.

Sit or lie down in whatever way feels most comfortable. If something is bothering you, adjust it with a small movement; there is no rush.

Let your weight sink into whatever is beneath you. The chair, the bed or the floor… is holding you. You do not need to hold on to anything. With every out-breath, you may feel a little heavier.

If you like, close your eyes. If not, let your gaze rest on one spot in front of you, and let your eyes rest. Let your eyelids soften.

Now let us take a few breaths with attention. Breathe in slowly through your nose… and let it go slowly through your mouth. Once more… in… and out. Now let the breath return to its own rhythm.

Let us begin with your face. Let the tension in your forehead slowly melt. Let the space between your eyebrows open. Let the small muscles around your eyes soften.

Loosen your jaw, so your teeth part a little. Let your tongue rest easily in your mouth. Let your cheeks and lips soften.

Bring your attention to your neck. Feel the weight of your head, and let your neck release some of that weight.

Now move your shoulders away from your ears and let them drop. Most of us hold our shoulders up without noticing. Right now, you can let them go.

Let your arms grow heavy. Your elbows, your wrists, your hands… Let your hands rest where they are. Let your fingers open a little.

Notice your chest and your belly. They rise gently as you breathe in, and fall as you breathe out. Do not try to change it. Simply watch.

Feel your back being supported. The weight of your lower back and hips… your legs… and finally your feet. Your whole body is resting right now.

Other things may come to mind. Things to do, conversations, worries… That is completely natural. When you notice it, do not be hard on yourself. Silently say “thinking”, and gently come back to your body.

Now, for a while, feel your whole body at once. From your head to your feet, a body that is sitting, resting, being held. The breath comes and goes by itself.

Stay like this for a few breaths. There is nothing to fix. Right now you are simply here, and that is all.

Slowly bring your attention back to the room. Notice the sounds around you. Feel the ground beneath you once more.

When you are ready, take a slightly deeper breath… and let it go slowly. Gently move your fingers. Open your eyes whenever you like. I am glad you are here.`,
    `Bienvenido. Durante los próximos minutos, este tiempo es solo para ti. No tienes que conseguir nada. Basta con estar aquí.

Siéntate o túmbate como te resulte más cómodo. Si algo te molesta, ajústalo con un pequeño movimiento; no hay prisa.

Deja que tu peso caiga sobre lo que tienes debajo. La silla, la cama o el suelo… te sostienen. No necesitas agarrarte a nada. Con cada exhalación puedes sentirte un poco más pesado.

Si quieres, cierra los ojos. Si no, deja la mirada en un punto delante de ti y que los ojos descansen. Deja que los párpados se suavicen.

Ahora hagamos unas cuantas respiraciones con atención. Inspira despacio por la nariz… y suelta el aire despacio por la boca. Una vez más… inspira… y suelta. Ahora deja que la respiración vuelva a su propio ritmo.

Empecemos por la cara. Deja que la tensión de la frente se deshaga despacio. Que se abra el espacio entre las cejas. Que se suavicen los pequeños músculos alrededor de los ojos.

Afloja la mandíbula, que los dientes se separen un poco. Deja que la lengua descanse tranquila en la boca. Que las mejillas y los labios se suavicen.

Lleva la atención al cuello. Siente el peso de la cabeza y deja que el cuello suelte un poco ese peso.

Ahora aleja los hombros de las orejas y déjalos caer. Muchos llevamos los hombros subidos sin darnos cuenta. Ahora puedes soltarlos.

Deja que los brazos se vuelvan pesados. Los codos, las muñecas, las manos… Que las manos descansen donde están. Que los dedos se abran un poco.

Fíjate en el pecho y en el vientre. Se elevan suavemente al inspirar y bajan al espirar. No intentes cambiarlo. Solo obsérvalo.

Siente cómo la espalda está apoyada. El peso de la zona lumbar y las caderas… las piernas… y, por último, los pies. Todo tu cuerpo está descansando ahora.

Pueden venirte otras cosas a la mente. Tareas, conversaciones, preocupaciones… Es completamente normal. Cuando lo notes, no te regañes. Di en silencio «pensamiento» y vuelve con suavidad al cuerpo.

Ahora, durante un rato, siente todo el cuerpo a la vez. De la cabeza a los pies, un cuerpo que está sentado, que descansa, que está sostenido. La respiración viene y va sola.

Quédate así unas cuantas respiraciones. No hay nada que arreglar. Ahora simplemente estás aquí, y eso es todo.

Poco a poco, devuelve la atención a la habitación. Fíjate en los sonidos a tu alrededor. Siente una vez más el apoyo debajo de ti.

Cuando estés listo, haz una respiración un poco más profunda… y suéltala despacio. Mueve suavemente los dedos. Abre los ojos cuando quieras. Me alegra que estés aquí.`,
    `Ti do il benvenuto. Per i prossimi minuti, questo tempo è solo per te. Non c’è niente da raggiungere. Essere qui è già abbastanza.

Siediti o sdraiati nel modo che ti sembra più comodo. Se qualcosa ti dà fastidio, sistemalo con un piccolo movimento; non c’è fretta.

Lascia che il tuo peso scenda verso ciò che hai sotto di te. La sedia, il letto o il pavimento… ti sostengono. Non devi aggrapparti a niente. A ogni espirazione puoi sentirti un po’ più pesante.

Se ti va, chiudi gli occhi. Altrimenti lascia che lo sguardo si posi su un punto davanti a te, e lascia riposare gli occhi. Le palpebre si fanno morbide.

Ora facciamo qualche respiro con attenzione. Inspira lentamente dal naso… e lascia uscire l’aria piano dalla bocca. Ancora una volta… inspira… ed espira. Ora lascia che il respiro torni al suo ritmo.

Cominciamo dal viso. Lascia che la tensione della fronte si sciolga piano. Lo spazio tra le sopracciglia si apre. I piccoli muscoli intorno agli occhi si ammorbidiscono.

Rilassa la mascella, così che i denti si separino appena. La lingua riposa tranquilla nella bocca. Le guance e le labbra si fanno morbide.

Porta l’attenzione al collo. Senti il peso della testa, e lascia che il collo si liberi di un po’ di quel peso.

Ora allontana le spalle dalle orecchie e lasciale scendere. Spesso teniamo le spalle alte senza accorgercene. Adesso puoi lasciarle andare.

Lascia che le braccia diventino pesanti. I gomiti, i polsi, le mani… Le mani riposano dove sono. Le dita si aprono un poco.

Nota il petto e la pancia. Si alzano piano quando inspiri, e scendono quando espiri. Non cercare di cambiare niente. Osserva soltanto.

Senti la schiena sostenuta. Il peso della parte bassa della schiena e dei fianchi… delle gambe… e infine dei piedi. Tutto il corpo, adesso, sta riposando.

Possono arrivare altri pensieri. Cose da fare, conversazioni, preoccupazioni… È del tutto naturale. Quando te ne accorgi, non giudicarti. Di’ dentro di te «pensiero», e torna con gentilezza al corpo.

Ora, per un po’, senti tutto il corpo insieme. Dalla testa ai piedi, un corpo che sta fermo, che riposa, che viene sostenuto. Il respiro va e viene da solo.

Resta così per qualche respiro. Non c’è niente da aggiustare. Adesso sei semplicemente qui, e questo è tutto.

Piano piano riporta l’attenzione nella stanza. Nota i suoni intorno a te. Senti ancora una volta il sostegno sotto di te.

Quando vuoi, fai un respiro un po’ più profondo… e lascialo andare piano. Muovi dolcemente le dita. Apri gli occhi quando ti va. È bello che tu sia qui.`,
    `Xoş gəldin, indi bir neçə dəqiqəni yalnız özünə ayırırsan. Heç nəyi bacarmağa məcbur deyilsən. Bu bir neçə dəqiqə ərzində sadəcə burada olmağın kifayətdir.

Rahat otur, ya da uzan; necə rahatsansa, elə. Harasa narahat edirsə, kiçik bir hərəkətlə düzəlt; tələsmə.

Ağırlığını altındakı yerə burax. Stul, yataq, ya da döşəmə… səni saxlayır. Heç nəyə bərk tutunmağa ehtiyac yoxdur. Hər nəfəs verəndə bir az da ağırlaşdığını hiss edə bilərsən.

İstəsən gözlərini yum. İstəmirsənsə, baxışını qarşında bir nöqtəyə burax, gözlərin dincəlsin. Göz qapaqların yumşalsın.

İndi bir neçə nəfəsi diqqətlə alaq. Burnundan yavaşca nəfəs al… və ağzından yavaşca burax. Bir dəfə də… al… və burax. İndi qoy nəfəs öz ritminə qayıtsın.

Üzündən başlayaq. Alnındakı gərginlik yavaş-yavaş açılsın. Qaşlarının arası rahatlasın. Gözlərinin ətrafındakı kiçik əzələlər yumşalsın.

Çənəni boşalt, dişlərin bir-birindən azca aralansın. Dilin ağzının içində rahatca dincəlsin. Yanaqların və dodaqların yumşalsın.

Diqqətini boynuna gətir. Başının ağırlığını hiss et və qoy boynun bu ağırlığı bir az buraxsın.

İndi çiyinlərini qulaqlarından uzaqlaşdır, aşağı burax. Çoxumuz çiyinlərimizi hiss etmədən yuxarıda saxlayırıq. İndi onları buraxa bilərsən.

Qolların ağırlaşsın. Dirsəklərin, biləklərin, əllərin… Əllərin olduğu yerdə dincəlsin. Barmaqların azca açılsın.

Sinənə və qarnına diqqət et. Nəfəs alanda yüngülcə qalxır, verəndə enir. Onu dəyişməyə çalışma. Sadəcə izlə.

Kürəyinin dayaq tapdığını hiss et. Belinin və ombalarının ağırlığını… ayaqlarını… və ən sonda pəncələrini. Bütün bədənin indi dincəlir.

Ağlına başqa şeylər gələ bilər. Görüləcək işlər, söhbətlər, narahatlıqlar… Bu çox təbiidir. Hiss edəndə özünə acıqlanma. İçində “fikir” de və yavaşca bədəninə qayıt.

İndi bir müddət bütün bədənini birlikdə hiss et. Başından ayaqlarına qədər oturan, dincələn, dayaq tapan bir bədən. Nəfəs öz-özünə gəlir və gedir.

Bir neçə nəfəs belə qal. Düzəltməli heç nə yoxdur. İndi sadəcə buradasan, bu qədər.

Yavaş-yavaş diqqətini yenidən otağa gətir. Ətrafındakı səsləri hiss et. Altındakı yeri bir dəfə də hiss et.

Hazır olanda bir az dərin nəfəs al… və yavaşca burax. Barmaqlarını yüngülcə tərpət. İstədiyin vaxt gözlərini aç. Yaxşı ki, buradasan.`,
    `Здравствуй. Следующие несколько минут — только для тебя. Ничего не нужно делать правильно. Достаточно просто быть здесь.

Сядь или ляг так, как тебе удобно. Если что-то мешает, поправь это небольшим движением; спешить некуда.

Отдай свой вес тому, что под тобой. Стул, кровать или пол… держат тебя. Можно ни за что не держаться. С каждым выдохом можно почувствовать, как тело становится чуть тяжелее.

Если хочется, закрой глаза. Или просто опусти взгляд на одну точку перед собой и дай глазам отдохнуть. Пусть веки станут мягкими.

Сделаем несколько внимательных вдохов. Медленно вдохни через нос… и медленно выдохни через рот. Ещё раз… вдох… и выдох. А теперь пусть дыхание вернётся к своему ритму.

Начнём с лица. Пусть напряжение во лбу медленно растает. Пусть разгладится место между бровями. Пусть расслабятся маленькие мышцы вокруг глаз.

Расслабь челюсть, пусть зубы чуть разомкнутся. Пусть язык спокойно лежит во рту. Пусть щёки и губы станут мягкими.

Перенеси внимание на шею. Почувствуй вес головы и позволь шее немного отпустить этот вес.

Теперь опусти плечи, подальше от ушей. Многие из нас незаметно держат плечи поднятыми. Сейчас их можно отпустить.

Пусть руки станут тяжёлыми. Локти, запястья, кисти… Пусть ладони отдыхают там, где они есть. Пусть пальцы слегка раскроются.

Обрати внимание на грудь и живот. На вдохе они мягко поднимаются, на выдохе опускаются. Не пытайся ничего менять. Просто наблюдай.

Почувствуй, как спина находит опору. Тяжесть поясницы и бёдер… ног… и, наконец, стоп. Всё тело сейчас отдыхает.

Могут приходить другие мысли. Дела, разговоры, тревоги… Это совершенно естественно. Когда замечаешь это, не ругай себя. Мысленно скажи: «мысль» — и мягко вернись к телу.

Теперь какое-то время почувствуй всё тело целиком. От головы до стоп — тело, которое сидит, отдыхает, опирается. Дыхание приходит и уходит само.

Побудь так несколько вдохов. Ничего не нужно исправлять. Сейчас ты просто здесь, и этого достаточно.

Постепенно верни внимание в комнату. Заметь звуки вокруг. Ещё раз почувствуй опору под собой.

Когда почувствуешь готовность, сделай вдох чуть глубже… и медленно выдохни. Слегка пошевели пальцами. Открой глаза, когда захочешь. Хорошо, что ты здесь.`,
  ),
  'first-breath': pack(
    `Şimdi birkaç dakika nefesinle birlikte olalım. Nefes her zaman yanında olan, bedenini sakinleştirebilen en basit araç. Bu birkaç dakika boyunca başka hiçbir şey yapmana gerek yok.

Rahatça yerleş; sırtın dik olsun ama gergin olmasın. Omuzlarını gevşet, ellerini kucağına ya da dizlerine bırak. Ayak tabanların yere bassın.

Önce nefesini olduğu gibi izle. Hızlı mı, yavaş mı? Derin mi, sığ mı? Yargılamadan, sadece bak. Nefesin nasıl olduğu, bedeninin şu an neye ihtiyaç duyduğunu anlatır.

Nefesi en çok nerede hissediyorsun? Burnunda serin bir hava mı, göğsünde bir yükselme mi, karnında bir genişleme mi? Dikkatini oraya bırak. Her nefeste o noktayı biraz daha net hisset.

İstersen bir elini karnına koy. Nefes alırken elinin hafifçe yükseldiğini, verirken alçaldığını hisset. Diğer elin göğsünde ya da kucağında dinlenebilir.

Şimdi nefesini biraz yavaşlatalım. Burnundan nefes al… bir, iki, üç, dört.

Ağzından yavaşça ver… bir, iki, üç, dört, beş, altı.

Bir kez daha. Dörde kadar al… bir, iki, üç, dört. Altıya kadar ver… bir, iki, üç, dört, beş, altı.

Nefesi uzun uzun vermek bedeni sakinleştirir. Kalp atışın da bu yavaş verişe yavaş yavaş eşlik eder. Uzun bir veriş, bedenine şu an güvende olduğunu hatırlatır.

Bu ritimle kendi başına devam et. Dörde kadar al, altıya kadar ver. Ben bir süre sessiz kalacağım.

Saymak seni zorluyorsa saymayı bırak. Nefes verişini, alışından biraz daha uzun tutman yeterli.

Nefes alırken karnın hafifçe şişsin, verirken yumuşasın. Omuzların aşağıda, çenen gevşek kalsın. Nefes almak için çaba göstermene gerek yok; hava kendiliğinden içeri dolar.

Kalbin hızlı atıyorsa onu durdurmaya çalışma. Sen sadece nefesini yavaş ve uzun vermeye devam et. Bedenin kendi zamanında sakinleşecek.

Şimdi nefes al… ve uzun uzun bırak.

Bir kez daha nefes al… ve uzun uzun bırak.

Birkaç nefes daha kendi hızında devam et. Her verişte biraz daha yumuşa. Bedeninin giderek ağırlaştığını, yumuşadığını fark et.

Şimdi nefesini serbest bırak, kendi ritmine dönsün. Biraz öncesine göre bedeninin nasıl olduğuna bak. Küçük bir rahatlama bile yeter. Hazır olduğunda gözlerini yavaşça aç.`,
    `Let us spend a few minutes with your breath. Your breath is always with you, and it is the simplest tool you have to calm your body. For these few minutes, there is nothing else you need to do.

Settle in comfortably, with your back upright but not stiff. Relax your shoulders and rest your hands in your lap or on your knees. Let the soles of your feet touch the floor.

First, simply watch your breath as it is. Is it fast or slow? Deep or shallow? Just look, without judging. The way you breathe tells you what your body needs right now.

Where do you feel the breath most clearly? Cool air at your nose, a rise in your chest, a widening in your belly? Let your attention rest there. With each breath, feel that spot a little more clearly.

If you like, place one hand on your belly. Feel your hand rise gently as you breathe in, and fall as you breathe out. Your other hand can rest on your chest or in your lap.

Now let us slow the breath down a little. Breathe in through your nose… one, two, three, four.

And breathe out slowly through your mouth… one, two, three, four, five, six.

Once more. In for four… one, two, three, four. Out for six… one, two, three, four, five, six.

A long out-breath helps the body calm down. Your heartbeat slowly follows this unhurried rhythm. A long out-breath reminds your body that it is safe right now.

Continue with this rhythm on your own. In for four, out for six. I will be quiet for a little while.

If counting feels like a strain, let the counting go. It is enough to make your out-breath a little longer than your in-breath.

As you breathe in, let your belly swell gently; as you breathe out, let it soften. Keep your shoulders low and your jaw loose. You do not need to make an effort to breathe in; the air fills you by itself.

If your heart is beating fast, do not try to stop it. Just keep breathing out slowly and fully. Your body will settle in its own time.

Breathe in… and let it out long and slow.

Breathe in… and let it out long and slow.

Continue for a few more breaths at your own pace. With each out-breath, soften a little more. Notice your body growing heavier and softer.

Now let your breath go free and return to its own rhythm. Notice how your body feels compared with a few minutes ago. Even a small sense of relief is enough. When you are ready, slowly open your eyes.`,
    `Pasemos unos minutos con tu respiración. La respiración siempre está contigo y es la herramienta más sencilla para calmar el cuerpo. Durante estos minutos no tienes que hacer nada más.

Acomódate: la espalda recta, pero sin rigidez. Relaja los hombros y deja las manos sobre el regazo o las rodillas. Que las plantas de los pies toquen el suelo.

Primero, observa tu respiración tal como es. ¿Rápida o lenta? ¿Profunda o superficial? Sin juzgar, solo mira. Tu forma de respirar te dice qué necesita tu cuerpo ahora.

¿Dónde notas más la respiración? ¿Aire fresco en la nariz, el pecho que se eleva, el vientre que se ensancha? Deja ahí tu atención. Con cada respiración, siente ese punto un poco más claro.

Si quieres, pon una mano sobre el vientre. Siente cómo la mano sube un poco al inspirar y baja al espirar. La otra mano puede descansar sobre el pecho o en el regazo.

Ahora vamos a hacer la respiración un poco más lenta. Inspira por la nariz… uno, dos, tres, cuatro.

Y espira despacio por la boca… uno, dos, tres, cuatro, cinco, seis.

Una vez más. Inspira en cuatro… uno, dos, tres, cuatro. Espira en seis… uno, dos, tres, cuatro, cinco, seis.

Una espiración larga ayuda a que el cuerpo se calme. Los latidos del corazón se acompasan poco a poco a este ritmo tranquilo. Una espiración larga le recuerda al cuerpo que ahora está a salvo.

Continúa con este ritmo por tu cuenta. Inspira en cuatro, espira en seis. Voy a quedarme en silencio un rato.

Si contar te cuesta, deja de contar. Basta con que la espiración sea un poco más larga que la inspiración.

Al inspirar, deja que el vientre se hinche un poco; al espirar, que se ablande. Los hombros abajo, la mandíbula suelta. No tienes que esforzarte para inspirar; el aire entra solo.

Si el corazón late deprisa, no intentes pararlo. Sigue espirando despacio y largo. El cuerpo se calmará a su ritmo.

Ahora inspira… y suelta el aire largo y despacio.

Una vez más, inspira… y suelta el aire largo y despacio.

Sigue unas cuantas respiraciones más a tu ritmo. Con cada espiración, ablándate un poco más. Nota cómo el cuerpo se vuelve más pesado y más suave.

Ahora deja la respiración libre, que vuelva a su propio ritmo. Fíjate en cómo está tu cuerpo comparado con hace unos minutos. Incluso un pequeño alivio es suficiente. Cuando estés listo, abre los ojos despacio.`,
    `Passiamo qualche minuto con il respiro. Il respiro è sempre con te, ed è lo strumento più semplice che hai per calmare il corpo. In questi minuti non devi fare nient’altro.

Sistemati comodamente, con la schiena dritta ma non rigida. Rilassa le spalle e appoggia le mani in grembo o sulle ginocchia. Le piante dei piedi toccano il pavimento.

Prima osserva il respiro così com’è. È veloce o lento? Profondo o leggero? Guarda soltanto, senza giudicare. Il modo in cui respiri ti dice di cosa ha bisogno il corpo in questo momento.

Dove senti il respiro più chiaramente? L’aria fresca al naso, il petto che si alza, la pancia che si allarga? Lascia che l’attenzione si posi lì. A ogni respiro, senti quel punto un po’ più chiaramente.

Se ti va, appoggia una mano sulla pancia. Senti la mano che si alza piano quando inspiri e scende quando espiri. L’altra mano può riposare sul petto o in grembo.

Ora rallentiamo un po’ il respiro. Inspira dal naso… uno, due, tre, quattro.

Ed espira lentamente dalla bocca… uno, due, tre, quattro, cinque, sei.

Ancora una volta. Inspira per quattro… uno, due, tre, quattro. Espira per sei… uno, due, tre, quattro, cinque, sei.

Un’espirazione lunga aiuta il corpo a calmarsi. Il battito del cuore segue piano questo ritmo senza fretta. Un’espirazione lunga ricorda al corpo che adesso è al sicuro.

Continua con questo ritmo per conto tuo. Inspira per quattro, espira per sei. Starò in silenzio per un po’.

Se contare ti pesa, lascia andare i numeri. Basta che l’espirazione sia un po’ più lunga dell’inspirazione.

Quando inspiri, lascia che la pancia si gonfi dolcemente; quando espiri, lascia che si ammorbidisca. Le spalle restano basse, la mascella morbida. Non devi sforzarti per inspirare; l’aria entra da sola.

Se il cuore batte veloce, non cercare di fermarlo. Continua solo a espirare piano e fino in fondo. Il corpo si calmerà con i suoi tempi.

Inspira… e lascia uscire l’aria, lenta e lunga.

Inspira… e lascia uscire l’aria, lenta e lunga.

Continua ancora per qualche respiro, al tuo ritmo. A ogni espirazione, ammorbidisciti un po’ di più. Nota il corpo che diventa più pesante e più morbido.

Ora lascia il respiro libero di tornare al suo ritmo. Nota come si sente il corpo rispetto a qualche minuto fa. Anche un piccolo sollievo basta. Quando vuoi, apri piano gli occhi.`,
    `İndi bir neçə dəqiqə nəfəsinlə birlikdə olaq. Nəfəs həmişə yanında olan, bədənini sakitləşdirə bilən ən sadə vasitədir. Bu bir neçə dəqiqədə başqa heç nə etməyə ehtiyac yoxdur.

Rahat yerləş; kürəyin düz olsun, amma gərgin olmasın. Çiyinlərini boşalt, əllərini dizlərinin üstünə burax. Ayaqlarının altı yerə bassın.

Əvvəlcə nəfəsini olduğu kimi izlə. Tezdir, yoxsa yavaş? Dərindir, yoxsa dayaz? Mühakimə etmədən, sadəcə bax. Nəfəsin necə olduğu bədəninin indi nəyə ehtiyacı olduğunu göstərir.

Nəfəsi ən çox harada hiss edirsən? Burnunda sərin hava, sinəndə qalxma, yoxsa qarnında genişlənmə? Diqqətini ora burax. Hər nəfəsdə o nöqtəni bir az da aydın hiss et.

İstəsən bir əlini qarnına qoy. Nəfəs alanda əlinin yüngülcə qalxdığını, verəndə endiyini hiss et. O biri əlin sinəndə, ya da dizinin üstündə dincələ bilər.

İndi nəfəsi bir az yavaşladaq. Burnundan nəfəs al… bir, iki, üç, dörd.

Ağzından yavaşca ver… bir, iki, üç, dörd, beş, altı.

Bir dəfə də. Dördə qədər al… bir, iki, üç, dörd. Altıya qədər ver… bir, iki, üç, dörd, beş, altı.

Nəfəsi uzun-uzun vermək bədəni sakitləşdirir. Ürək döyüntün də bu yavaş nəfəsə yavaş-yavaş uyğunlaşır. Uzun nəfəs vermək bədəninə indi təhlükəsiz olduğunu xatırladır.

Bu ritmlə özün davam et. Dördə qədər al, altıya qədər ver. Mən bir müddət susacağam.

Saymaq səni yorursa, saymağı burax. Nəfəs verməyi almaqdan bir az uzun tutmağın kifayətdir.

Nəfəs alanda qarnın yüngülcə qalxsın, verəndə yumşalsın. Çiyinlərin aşağıda, çənən boş qalsın. Nəfəs almaq üçün güc sərf etməyə ehtiyac yoxdur; hava öz-özünə içəri dolur.

Ürəyin tez döyünürsə, onu dayandırmağa çalışma. Sadəcə nəfəsini yavaş və uzun verməyə davam et. Bədənin öz vaxtında sakitləşəcək.

İndi nəfəs al… və uzun-uzun burax.

Bir dəfə də nəfəs al… və uzun-uzun burax.

Bir neçə nəfəs də öz sürətinlə davam et. Hər nəfəs verəndə bir az da yumşal. Bədəninin getdikcə ağırlaşdığını, yumşaldığını hiss et.

İndi nəfəsini sərbəst burax, öz ritminə qayıtsın. Bir az əvvələ nisbətən bədəninin necə olduğuna bax. Kiçik bir rahatlıq belə kifayətdir. Hazır olanda gözlərini yavaşca aç.`,
    `Давай проведём несколько минут вместе с дыханием. Дыхание всегда с тобой, и это самый простой способ успокоить тело. В эти несколько минут больше ничего не нужно делать.

Устройся удобно: спина прямая, но не напряжённая. Опусти плечи, положи руки на колени. Пусть стопы стоят на полу.

Сначала просто понаблюдай за дыханием, какое оно есть. Быстрое или медленное? Глубокое или поверхностное? Без оценок, просто смотри. Дыхание подсказывает, что сейчас нужно телу.

Где ты чувствуешь дыхание сильнее всего? Прохладный воздух у носа, подъём в груди или расширение в животе? Отдай туда своё внимание. С каждым вдохом чувствуй это место чуть яснее.

Если хочется, положи одну руку на живот. Почувствуй, как на вдохе рука слегка поднимается, а на выдохе опускается. Другая рука может лежать на груди или на коленях.

Теперь немного замедлим дыхание. Вдох через нос… раз, два, три, четыре.

И медленный выдох через рот… раз, два, три, четыре, пять, шесть.

Ещё раз. Вдох на четыре… раз, два, три, четыре. Выдох на шесть… раз, два, три, четыре, пять, шесть.

Долгий выдох помогает телу успокоиться. Сердцебиение постепенно подстраивается под этот неторопливый ритм. Долгий выдох напоминает телу, что сейчас ты в безопасности.

Продолжай в этом ритме дальше. Вдох на четыре, выдох на шесть. Я немного помолчу.

Если считать трудно, не считай. Достаточно делать выдох чуть длиннее вдоха.

На вдохе живот мягко поднимается, на выдохе становится мягче. Плечи внизу, челюсть расслаблена. Для вдоха не нужно прилагать усилий; воздух наполняет тебя сам.

Если сердце бьётся быстро, не пытайся его остановить. Просто продолжай медленно и долго выдыхать. Тело успокоится в своё время.

Теперь вдохни… и выдыхай долго и медленно.

Ещё раз вдохни… и выдыхай долго и медленно.

Ещё несколько вдохов в своём темпе. С каждым выдохом становись чуть мягче. Заметь, как тело постепенно тяжелеет и расслабляется.

Теперь отпусти дыхание, пусть оно вернётся к своему ритму. Заметь, как чувствует себя тело по сравнению с началом. Даже небольшого облегчения достаточно. Когда почувствуешь готовность, медленно открой глаза.`,
  ),
  'first-ground': pack(
    `Düşüncelerin hızlandığında bu çalışma seni yeniden şu ana getirir. Duyularını kullanarak, adım adım buraya döneceğiz. Telaş etme; her adım için zamanın var.

Önce rahat bir pozisyon bul ve bir nefes al. Nefesini verirken omuzlarını biraz indir. Sırtını dik ama rahat tut.

Ayaklarından başla. Onları yere hafifçe bastır. Topuklarını, tabanlarını, parmaklarını hisset. Yer sağlam… seni taşıyor.

Şimdi etrafına yavaşça bak ve gördüğün beş şeyi içinden say. Bir lamba, bir pencere, bir bardak… ne varsa. Gözlerin bir şeyden diğerine yavaşça geçsin.

Her birinin üzerinde bir an dur. Rengine, şekline, ışığın ona nasıl düştüğüne bak. Acele etme.

Sonra dokunduğun dört şeyi hisset. Üzerindeki kıyafet. Tenine değen hava. Ellerinin ağırlığı. Oturduğun yer. Her birinin sana nasıl hissettirdiğine bak.

Bir elinle yakınındaki bir yüzeye dokun. Sert mi, yumuşak mı? Serin mi, ılık mı? Sadece fark et.

Şimdi duyduğun üç sese kulak ver. Uzaktan geçen bir araba, odadaki hafif bir uğultu… ya da kendi nefesin. Seslerin bazıları sürekli, bazıları geçici olabilir.

Seslerin geldiği yönü fark et. Biri yakın, biri uzak olabilir. Onları değiştirmeye çalışma; sadece dinle.

Kokusunu alabildiğin iki şey bul. Hiçbir koku gelmiyorsa havanın kendisini kokla. Belki temiz bir hava, belki hafif bir kumaş kokusu. Burnundan yavaşça içine çek.

Ve ağzındaki tadı hisset. Tek bir tat, o kadar. İstersen bir yudum su da alabilirsin.

Şimdi hepsini birlikte fark et. Gördüklerin, dokundukların, duyduğun sesler… Hepsi şu anda, burada. Zihnin nereye giderse gitsin, duyuların seni hep bu ana bağlar.

Şu an buradasın. Bu odada, bu anda. Aklın yarına ya da düne gidebilir. Bedenin ise hep burada, şimdide.

Yavaşça nefes al… ve uzun uzun ver. Ayaklarını bir kez daha yerde hisset. Nefesinin bedenini yavaşça doldurduğunu ve boşalttığını hisset.

Birkaç nefes daha bu sakinlikte kal. Duyuların seni şimdiye bağlıyor.

Gün içinde düşüncelerin seni yeniden sürüklerse bunu hatırla: beş, dört, üç, iki, bir… ve ayakların yerde.

Hazır olduğunda ellerini ve ayaklarını hafifçe oynat, bir nefes al ve gününe sakince dön.`,
    `When your thoughts start racing, this practice brings you back to the present moment. Step by step, using your senses, we will come back to here. There is no hurry; you have time for each step.

First, find a comfortable position and take a breath. As you breathe out, let your shoulders drop a little. Keep your back upright but relaxed.

Start with your feet. Press them gently into the floor. Feel your heels, your soles, your toes. The ground is solid… it is holding you.

Now slowly look around and silently count five things you can see. A lamp, a window, a glass… whatever is there. Let your eyes move slowly from one to the next.

Pause on each one for a moment. Notice its color, its shape, the way the light falls on it. There is no rush.

Then feel four things you are touching. The clothes on your body. The air on your skin. The weight of your hands. The surface you are sitting on. Notice how each one feels.

With one hand, touch a surface near you. Is it hard or soft? Cool or warm? Simply notice.

Now listen for three sounds. A car passing in the distance, a soft hum in the room… or your own breathing. Some sounds may be constant, others may come and go.

Notice the direction each sound comes from. One may be near, another far away. Do not try to change them; simply listen.

Find two things you can smell. If nothing comes, simply smell the air itself. Perhaps fresh air, perhaps the faint scent of fabric. Breathe it in slowly through your nose.

And notice the taste in your mouth. Just one taste, that is all. If you like, you can take a sip of water.

Now notice everything together. What you see, what you touch, the sounds you hear… All of it is here, right now. Wherever your mind wanders, your senses always connect you to this moment.

Right now you are here. In this room, in this moment. Your mind may drift to tomorrow or to yesterday. But your body is always here, now.

Breathe in slowly… and breathe out long. Feel your feet on the floor once more. Feel your breath gently filling and emptying your body.

Stay in this calm for a few more breaths. Your senses are holding you in the present.

If your thoughts sweep you away again during the day, remember this: five, four, three, two, one… and your feet on the floor.

When you are ready, gently move your hands and feet, take a breath, and return calmly to your day.`,
    `Cuando los pensamientos se aceleran, esta práctica te devuelve al momento presente. Paso a paso, con tus sentidos, volveremos aquí. No hay prisa; tienes tiempo para cada paso.

Primero, busca una postura cómoda y respira. Al soltar el aire, baja un poco los hombros. Mantén la espalda recta pero relajada.

Empieza por los pies. Apóyalos con suavidad en el suelo. Siente los talones, las plantas, los dedos. El suelo es firme… te sostiene.

Ahora mira despacio a tu alrededor y cuenta en silencio cinco cosas que ves. Una lámpara, una ventana, un vaso… lo que haya. Deja que la mirada pase despacio de una a otra.

Detente un momento en cada una. Mira su color, su forma, cómo le cae la luz. Sin prisa.

Después, siente cuatro cosas que estás tocando. La ropa sobre tu cuerpo. El aire en la piel. El peso de las manos. La superficie donde estás sentado. Fíjate en cómo se siente cada una.

Con una mano, toca una superficie cercana. ¿Es dura o blanda? ¿Fresca o tibia? Solo obsérvalo.

Ahora escucha tres sonidos. Un coche que pasa a lo lejos, un zumbido suave en la habitación… o tu propia respiración. Algunos sonidos pueden ser constantes y otros ir y venir.

Fíjate de dónde viene cada sonido. Uno puede estar cerca y otro lejos. No intentes cambiarlos; solo escucha.

Encuentra dos cosas que puedas oler. Si no notas nada, huele simplemente el aire. Quizá aire fresco, quizá un leve olor a tela. Inspíralo despacio por la nariz.

Y fíjate en el sabor de tu boca. Un solo sabor, nada más. Si quieres, puedes beber un sorbo de agua.

Ahora nótalo todo a la vez. Lo que ves, lo que tocas, los sonidos que oyes… Todo está aquí, ahora mismo. Vaya donde vaya la mente, tus sentidos siempre te unen a este momento.

Ahora estás aquí. En esta habitación, en este momento. La mente puede irse a mañana o a ayer. Pero el cuerpo siempre está aquí, ahora.

Inspira despacio… y espira largo. Siente otra vez los pies en el suelo. Siente cómo la respiración llena y vacía el cuerpo con suavidad.

Quédate unas respiraciones más en esta calma. Tus sentidos te sostienen en el presente.

Si durante el día los pensamientos vuelven a arrastrarte, recuerda esto: cinco, cuatro, tres, dos, uno… y los pies en el suelo.

Cuando estés listo, mueve con suavidad las manos y los pies, respira y vuelve con calma a tu día.`,
    `Quando i pensieri cominciano a correre, questa pratica ti riporta al momento presente. Passo dopo passo, attraverso i sensi, torneremo qui. Non c’è fretta; hai tempo per ogni passo.

Prima trova una posizione comoda e fai un respiro. Mentre espiri, lascia scendere un po’ le spalle. Tieni la schiena dritta ma rilassata.

Comincia dai piedi. Premili piano contro il pavimento. Senti i talloni, le piante, le dita. Il terreno è solido… ti sostiene.

Ora guarda lentamente intorno a te e conta in silenzio cinque cose che puoi vedere. Una lampada, una finestra, un bicchiere… qualunque cosa ci sia. Lascia che gli occhi passino piano dall’una all’altra.

Fermati un momento su ognuna. Nota il suo colore, la sua forma, il modo in cui la luce la tocca. Non c’è fretta.

Poi senti quattro cose che stai toccando. I vestiti sul corpo. L’aria sulla pelle. Il peso delle mani. La superficie che ti sostiene. Nota che sensazione ti dà ognuna.

Con una mano tocca una superficie vicina. È dura o morbida? Fresca o tiepida? Osserva soltanto.

Ora ascolta tre suoni. Un’auto che passa lontano, un leggero ronzio nella stanza… o il tuo stesso respiro. Alcuni suoni possono essere costanti, altri vanno e vengono.

Nota da quale direzione arriva ogni suono. Uno può essere vicino, un altro lontano. Non cercare di cambiarli; ascolta soltanto.

Trova due odori. Se non arriva niente, annusa semplicemente l’aria. Forse aria fresca, forse il leggero profumo di un tessuto. Inspirala piano dal naso.

E nota il sapore che hai in bocca. Un solo sapore, tutto qui. Se ti va, puoi bere un sorso d’acqua.

Ora nota tutto insieme. Quello che vedi, quello che tocchi, i suoni che senti… Tutto è qui, adesso. Ovunque vada la mente, i sensi ti collegano sempre a questo momento.

Adesso sei qui. In questa stanza, in questo momento. La mente può scivolare verso domani o verso ieri. Ma il corpo è sempre qui, adesso.

Inspira piano… ed espira a lungo. Senti ancora una volta i piedi sul pavimento. Senti il respiro che riempie e svuota dolcemente il corpo.

Resta in questa calma ancora per qualche respiro. I sensi ti tengono nel presente.

Se durante la giornata i pensieri ti trascinano di nuovo via, ricorda questo: cinque, quattro, tre, due, uno… e i piedi sul pavimento.

Quando vuoi, muovi piano le mani e i piedi, fai un respiro, e torna con calma alla tua giornata.`,
    `Fikirlərin sürətlənəndə bu məşq səni yenidən bu ana qaytarır. Duyğularından istifadə edərək, addım-addım bura qayıdacağıq. Tələsmə; hər addım üçün vaxtın var.

Əvvəlcə rahat bir vəziyyət tap və bir nəfəs al. Nəfəs verəndə çiyinlərini bir az endir. Kürəyini düz, amma rahat saxla.

Ayaqlarından başla. Onları yüngülcə yerə bas. Dabanlarını, pəncələrini, barmaqlarını hiss et. Yer möhkəmdir… səni saxlayır.

İndi ətrafına yavaşca bax və gördüyün beş şeyi içində say. Bir lampa, bir pəncərə, bir stəkan… nə varsa. Qoy gözlərin bir şeydən o birinə yavaşca keçsin.

Hər birinin üstündə bir an dayan. Rənginə, formasına, işığın ona necə düşdüyünə bax. Tələsmə.

Sonra toxunduğun dörd şeyi hiss et. Əynindəki paltar. Dərinə dəyən hava. Əllərinin ağırlığı. Oturduğun yer. Hər birinin sənə necə hiss etdirdiyinə bax.

Bir əlinlə yaxınlıqdakı bir səthə toxun. Sərtdir, yoxsa yumşaq? Sərindir, yoxsa ilıq? Sadəcə hiss et.

İndi eşitdiyin üç səsə qulaq as. Uzaqdan keçən bir maşın, otaqdakı zəif bir uğultu… ya da öz nəfəsin. Səslərin bəziləri daimi, bəziləri keçici ola bilər.

Səslərin hansı tərəfdən gəldiyinə diqqət et. Biri yaxın, biri uzaq ola bilər. Onları dəyişməyə çalışma; sadəcə dinlə.

Qoxusunu duya bildiyin iki şey tap. Heç bir qoxu gəlmirsə, havanın özünü iylə. Bəlkə təmiz hava, bəlkə yüngül parça qoxusu. Burnundan yavaşca içinə çək.

Və ağzındakı dadı hiss et. Tək bir dad, bu qədər. İstəsən bir qurtum su da içə bilərsən.

İndi hamısını birlikdə hiss et. Gördüklərin, toxunduqların, eşitdiyin səslər… Hamısı indi, buradadır. Fikrin hara getsə də, duyğuların səni həmişə bu ana bağlayır.

İndi buradasan. Bu otaqda, bu anda. Fikrin sabaha, ya da dünənə qaça bilər. Bədənin isə həmişə burada, bu andadır.

Yavaşca nəfəs al… və uzun-uzun ver. Ayaqlarını bir dəfə də yerdə hiss et. Nəfəsinin bədənini yavaşca doldurub boşaltdığını hiss et.

Bir neçə nəfəs də bu sakitlikdə qal. Duyğuların səni bu ana bağlayır.

Gün ərzində fikirlər səni yenə aparsa, bunu xatırla: beş, dörd, üç, iki, bir… və ayaqların yerdədir.

Hazır olanda əllərini və ayaqlarını yüngülcə tərpət, bir nəfəs al və gününə sakitcə qayıt.`,
    `Когда мысли несутся слишком быстро, это упражнение возвращает тебя в настоящий момент. Шаг за шагом, с помощью органов чувств, мы вернёмся сюда. Не спеши; на каждый шаг есть время.

Сначала найди удобное положение и сделай вдох. На выдохе немного опусти плечи. Спина прямая, но свободная.

Начни со стоп. Слегка прижми их к полу. Почувствуй пятки, подошвы, пальцы. Пол твёрдый… он держит тебя.

Теперь медленно оглянись и про себя назови пять вещей, которые видишь. Лампа, окно, чашка… всё, что есть рядом. Пусть взгляд медленно переходит от одного к другому.

Задержись на каждой вещи на мгновение. Посмотри на её цвет, форму, на то, как на неё падает свет. Не спеши.

Потом почувствуй четыре прикосновения. Одежда на теле. Воздух на коже. Тяжесть рук. То, на чём ты сидишь. Заметь, какое ощущение даёт каждое из них.

Коснись рукой какой-нибудь поверхности рядом. Она твёрдая или мягкая? Прохладная или тёплая? Просто заметь.

Теперь прислушайся к трём звукам. Машина вдалеке, тихий гул в комнате… или твоё собственное дыхание. Одни звуки могут быть постоянными, другие — приходить и уходить.

Заметь, откуда идёт каждый звук. Один может быть близко, другой далеко. Не пытайся их изменить; просто слушай.

Найди два запаха. Если ничего не чувствуешь, просто вдохни запах воздуха. Может быть, свежий воздух, может быть, лёгкий запах ткани. Медленно вдохни его носом.

И заметь вкус во рту. Один вкус, этого достаточно. Если хочешь, можно сделать глоток воды.

Теперь заметь всё вместе. То, что видишь, чего касаешься, звуки, которые слышишь… Всё это здесь, прямо сейчас. Куда бы ни уходили мысли, чувства всегда связывают тебя с этим моментом.

Ты здесь. В этой комнате, в этом моменте. Мысли могут убегать в завтра или во вчера. А тело всегда здесь, сейчас.

Медленно вдохни… и долго выдохни. Ещё раз почувствуй стопы на полу. Почувствуй, как дыхание мягко наполняет и опустошает тело.

Побудь в этом спокойствии ещё несколько вдохов. Чувства держат тебя в настоящем.

Если днём мысли снова тебя унесут, вспомни: пять, четыре, три, два, один… и стопы на полу.

Когда почувствуешь готовность, слегка пошевели руками и ногами, сделай вдох и спокойно возвращайся к своему дню.`,
  ),
  'room-door': pack(
    `Bu meditasyonda kendini güvende hissettiğin bir odada dinleneceksin. Hayal ettiğin oda, ihtiyacın olduğunda dönebileceğin bir yer olacak.

İstersen gözlerini kapat ve yavaşça nefes al. Nefes verirken bedeninin biraz daha ağırlaşmasına izin ver.

Şimdi iyi tanıdığın bir odayı düşün. Kendi odan, büyükannenin evi ya da bir zamanlar huzur bulduğun herhangi bir yer olabilir. Gerçek ya da hayal, fark etmez. İçinde rahat edebildiğin, nefesinin kendiliğinden yavaşladığı bir yer.

Önce kapıyı gözünün önüne getir. Rengi nasıl? Kolu nerede? Ahşap mı, boyalı mı?

Kapıyı aç ve içeri gir. Arkandan kapıyı yavaşça kapat. Kapı kapalı ve sen içeride güvendesin. Şu an kimsenin içeri girmesi gerekmiyor.

Şimdi odaya şöyle bir bak. Pencere nerede? Işık nereden geliyor? Sabah ışığı mı, akşamın yumuşak ışığı mı? Işığın odaya nasıl düştüğünü, duvarlarda bıraktığı gölgeleri fark et.

Odadaki eşyaları fark et. Bir koltuk, bir yatak, yerde bir halı… Duvarların rengi. Her şey olduğu gibi, sakin.

Odanın kokusunu hatırla. Belki temiz çarşaf, belki ahşap, belki demlenmiş çay. Havanın sıcaklığını hisset.

Kendine rahat bir köşe seç ve oraya yerleş. Altındaki yumuşaklığı hisset. Nerede olduğunu bilmek bedenini gevşetiyor. Belki yumuşak bir yastık, belki sıcak bir battaniye var. Onu üzerine çek.

Bu odada her şey yerli yerinde. Bir şeyi düzeltmen ya da birini memnun etmen gerekmiyor.

Bazen bir düşünce kapıyı çalabilir. Bir kaygı, bir iş, bir anı… Kapıyı açmak zorunda değilsin. Çaldığını duy ve bırak. Kapı kapalı kalıyor.

Yavaşça nefes al… ve ver. Her nefes verişinde omuzların biraz daha aşağı insin.

Odadaki sessizliği dinle. Belki uzaktan hafif bir ses geliyor, ama içerisi sakin. Bu sakinliğin içinde dinlen. Burada konuşman ya da açıklama yapman gerekmiyor.

Bu oda hep burada, seni bekliyor. Dünya fazla gürültülü geldiğinde buraya gelebilir, kapıyı kapatıp dinlenebilirsin.

Biraz daha kal. Şu an güvendesin.

Şimdi bu odaya veda et. Kapıya doğru yürü, kapıyı aç ve yavaşça dışarı çık. Oda seni bekleyecek.

Hazır olduğunda derin bir nefes al. Bu sakinliği yanına alarak yavaşça geri dön ve gözlerini aç.`,
    `In this meditation you will rest in a room where you feel safe. The room you imagine will be a place you can come back to whenever you need it.

If you like, close your eyes and breathe slowly. As you breathe out, let your body grow a little heavier.

Now think of a room you know well. Your own room, your grandmother’s house, or any place where you once felt at peace. Real or imagined, it does not matter. A place where you feel at ease, where your breath slows by itself.

First, picture the door. What color is it? Where is the handle? Is it wooden, or painted?

Open the door and step inside. Close the door slowly behind you. The door is closed, and you are safe inside. Right now, no one needs to come in.

Now look around the room. Where is the window? Where is the light coming from? Is it morning light, or the soft light of evening? Notice how the light falls into the room and the shadows it leaves on the walls.

Notice the things in the room. A chair, a bed, a rug on the floor… The color of the walls. Everything just as it is, calm.

Remember how the room smells. Perhaps clean sheets, perhaps wood, perhaps freshly brewed tea. Feel the warmth of the air.

Choose a comfortable spot and settle into it. Feel the softness beneath you. Perhaps there is a soft cushion, or a warm blanket. Pull it over you. Knowing where you are helps your body relax.

In this room, everything is in its place. You do not have to fix anything or please anyone.

Sometimes a thought may knock at the door. A worry, a task, a memory… You do not have to open the door. Hear the knock, and let it be. The door stays closed.

Breathe in slowly… and out. With each out-breath, let your shoulders drop a little more.

Listen to the silence of the room. Perhaps there is a faint sound in the distance, but inside it is calm. Rest within this calm. Here you do not need to talk or explain anything.

This room is always here, waiting for you. When the world feels too loud, you can come here, close the door, and rest.

Stay a little longer. Right now, you are safe.

Now say goodbye to the room for today. Walk to the door, open it, and slowly step outside. The room will be waiting for you.

When you are ready, take a deep breath. Bring this calm with you as you slowly return, and open your eyes.`,
    `En esta meditación vas a descansar en una habitación donde te sientes seguro. La habitación que imagines será un lugar al que podrás volver cuando lo necesites.

Si quieres, cierra los ojos y respira despacio. Al soltar el aire, deja que el cuerpo se vuelva un poco más pesado.

Ahora piensa en una habitación que conozcas bien. Tu propio cuarto, la casa de tu abuela o cualquier lugar donde alguna vez encontraste paz. Real o imaginada, da igual. Un lugar donde estés a gusto y donde la respiración se calme sola.

Primero, imagina la puerta. ¿De qué color es? ¿Dónde está el pomo? ¿Es de madera o está pintada?

Abre la puerta y entra. Ciérrala despacio detrás de ti. La puerta está cerrada y tú estás a salvo dentro. Ahora mismo nadie necesita entrar.

Ahora mira la habitación. ¿Dónde está la ventana? ¿De dónde viene la luz? ¿Es la luz de la mañana o la luz suave de la tarde? Fíjate en cómo entra la luz y en las sombras que deja en las paredes.

Fíjate en las cosas de la habitación. Un sillón, una cama, una alfombra en el suelo… El color de las paredes. Todo tal como está, en calma.

Recuerda el olor de la habitación. Quizá sábanas limpias, quizá madera, quizá té recién hecho. Siente la tibieza del aire.

Elige un rincón cómodo y acomódate en él. Siente la suavidad debajo de ti. Quizá hay un cojín blando o una manta cálida. Tápate con ella. Saber dónde estás ayuda al cuerpo a relajarse.

En esta habitación todo está en su sitio. No tienes que arreglar nada ni contentar a nadie.

A veces un pensamiento puede llamar a la puerta. Una preocupación, una tarea, un recuerdo… No tienes por qué abrir. Escucha la llamada y déjala estar. La puerta sigue cerrada.

Inspira despacio… y espira. Con cada espiración, deja que los hombros bajen un poco más.

Escucha el silencio de la habitación. Quizá llega un sonido suave desde lejos, pero dentro hay calma. Descansa en esa calma. Aquí no tienes que hablar ni explicar nada.

Esta habitación siempre está aquí, esperándote. Cuando el mundo se vuelva demasiado ruidoso, puedes venir aquí, cerrar la puerta y descansar.

Quédate un poco más. Ahora estás a salvo.

Ahora despídete de la habitación por hoy. Camina hacia la puerta, ábrela y sal despacio. La habitación te estará esperando.

Cuando estés listo, respira hondo. Llévate esta calma contigo, vuelve despacio y abre los ojos.`,
    `In questa meditazione riposerai in una stanza in cui ti senti al sicuro. La stanza che immagini sarà un luogo dove potrai tornare ogni volta che ne avrai bisogno.

Se ti va, chiudi gli occhi e respira lentamente. Mentre espiri, lascia che il corpo diventi un po’ più pesante.

Ora pensa a una stanza che conosci bene. La tua camera, la casa della nonna, o un posto dove un tempo hai trovato pace. Reale o immaginata, non importa. Un luogo dove stai bene, dove il respiro rallenta da solo.

Prima immagina la porta. Di che colore è? Dov’è la maniglia? È di legno, o dipinta?

Apri la porta ed entra. Chiudi piano la porta dietro di te. La porta è chiusa, e dentro sei al sicuro. Adesso nessuno ha bisogno di entrare.

Ora guardati intorno. Dov’è la finestra? Da dove arriva la luce? È la luce del mattino, o quella morbida della sera? Nota come la luce entra nella stanza e le ombre che lascia sui muri.

Nota gli oggetti nella stanza. Una sedia, un letto, un tappeto sul pavimento… Il colore delle pareti. Ogni cosa così com’è, tranquilla.

Ricorda il profumo della stanza. Forse lenzuola pulite, forse legno, forse tè appena fatto. Senti il tepore dell’aria.

Scegli un angolo comodo e sistemati lì. Senti la morbidezza sotto di te. Forse c’è un cuscino morbido, o una coperta calda. Tirala su di te. Sapere dove sei aiuta il corpo a rilassarsi.

In questa stanza ogni cosa è al suo posto. Non devi aggiustare niente né accontentare nessuno.

A volte un pensiero può bussare alla porta. Una preoccupazione, un impegno, un ricordo… Non devi aprire. Senti il colpo, e lascialo stare. La porta resta chiusa.

Inspira lentamente… ed espira. A ogni espirazione, lascia scendere le spalle un po’ di più.

Ascolta il silenzio della stanza. Forse c’è un leggero rumore in lontananza, ma dentro è tutto calmo. Riposa in questa calma. Qui non devi parlare né spiegare niente.

Questa stanza è sempre qui, ti aspetta. Quando il mondo è troppo rumoroso, puoi venire qui, chiudere la porta e riposare.

Resta ancora un po’. Adesso sei al sicuro.

Ora saluta la stanza per oggi. Vai verso la porta, aprila, ed esci piano. La stanza ti aspetterà.

Quando vuoi, fai un respiro profondo. Porta con te questa calma mentre torni piano, e apri gli occhi.`,
    `Bu meditasiyada özünü təhlükəsiz hiss etdiyin bir otaqda dincələcəksən. Təsəvvür etdiyin otaq ehtiyac olanda qayıda biləcəyin bir yer olacaq.

İstəsən gözlərini yum və yavaşca nəfəs al. Nəfəs verəndə qoy bədənin bir az da ağırlaşsın.

İndi yaxşı tanıdığın bir otağı düşün. Öz otağın, nənənin evi, ya da nə vaxtsa rahatlıq tapdığın hər hansı bir yer ola bilər. Həqiqi, ya da xəyali, fərq etməz. İçində rahat olduğun, nəfəsinin öz-özünə yavaşladığı bir yer.

Əvvəlcə qapını gözünün önünə gətir. Rəngi necədir? Dəstəyi haradadır? Taxtadır, yoxsa rənglənib?

Qapını aç və içəri gir. Arxanca qapını yavaşca bağla. Qapı bağlıdır və sən içəridə təhlükəsizsən. İndi heç kimin içəri girməsinə ehtiyac yoxdur.

İndi otağa bir göz gəzdir. Pəncərə haradadır? İşıq haradan gəlir? Səhər işığıdır, yoxsa axşamın yumşaq işığı? İşığın otağa necə düşdüyünə, divarlarda buraxdığı kölgələrə bax.

Otaqdakı əşyalara diqqət et. Bir kreslo, bir çarpayı, yerdə bir xalça… Divarların rəngi. Hər şey olduğu kimi, sakit.

Otağın qoxusunu xatırla. Bəlkə təmiz mələfə, bəlkə taxta, bəlkə dəmlənmiş çay. Havanın istiliyini hiss et.

Özünə rahat bir künc seç və ora yerləş. Altındakı yumşaqlığı hiss et. Bəlkə yumşaq bir yastıq, bəlkə isti bir yorğan var. Onu üstünə çək. Harada olduğunu bilmək bədənini rahatladır.

Bu otaqda hər şey yerli-yerindədir. Nəyisə düzəltməyə, ya da kimisə razı salmağa ehtiyac yoxdur.

Bəzən bir fikir qapını döyə bilər. Bir narahatlıq, bir iş, bir xatirə… Qapını açmağa məcbur deyilsən. Döyüldüyünü eşit və burax. Qapı bağlı qalır.

Yavaşca nəfəs al… və ver. Hər nəfəs verəndə çiyinlərin bir az da aşağı ensin.

Otaqdakı sükutu dinlə. Bəlkə uzaqdan zəif bir səs gəlir, amma içəri sakitdir. Bu sakitliyin içində dincəl. Burada danışmağa, ya da nəyisə izah etməyə ehtiyac yoxdur.

Bu otaq həmişə buradadır, səni gözləyir. Dünya çox səs-küylü gələndə bura gələ, qapını bağlayıb dincələ bilərsən.

Bir az da qal. İndi təhlükəsizsən.

İndi bu otaqla vidalaş. Qapıya tərəf get, qapını aç və yavaşca çölə çıx. Otaq səni gözləyəcək.

Hazır olanda dərin nəfəs al. Bu sakitliyi özünlə götür, yavaşca geri qayıt və gözlərini aç.`,
    `В этой медитации ты отдохнёшь в комнате, где тебе спокойно и безопасно. Комната, которую ты представишь, станет местом, куда можно вернуться, когда это нужно.

Если хочется, закрой глаза и медленно вдохни. На выдохе позволь телу стать чуть тяжелее.

Теперь представь комнату, которую хорошо знаешь. Твоя спальня, бабушкин дом или любое место, где тебе когда-то было спокойно. Настоящая или придуманная — неважно. Место, где тебе легко и где дыхание замедляется само.

Сначала представь дверь. Какого она цвета? Где ручка? Она деревянная или покрашенная?

Открой дверь и войди. Медленно закрой её за собой. Дверь закрыта, и ты внутри, в безопасности. Сейчас никому не нужно входить.

Теперь оглядись. Где окно? Откуда идёт свет? Это утренний свет или мягкий вечерний? Заметь, как свет падает в комнату и какие тени оставляет на стенах.

Обрати внимание на вещи в комнате. Кресло, кровать, ковёр на полу… Цвет стен. Всё такое, как есть, спокойное.

Вспомни запах этой комнаты. Может быть, чистое бельё, может быть, дерево, может быть, только что заваренный чай. Почувствуй тепло воздуха.

Выбери уютное место и устройся там. Почувствуй мягкость под собой. Может быть, рядом мягкая подушка или тёплый плед. Укройся им. Когда знаешь, где находишься, телу легче расслабиться.

В этой комнате всё на своих местах. Не нужно ничего исправлять и никому угождать.

Иногда в дверь может постучать мысль. Тревога, дело, воспоминание… Открывать не обязательно. Просто услышь стук и отпусти. Дверь остаётся закрытой.

Медленно вдохни… и выдохни. С каждым выдохом плечи опускаются чуть ниже.

Послушай тишину комнаты. Может быть, издалека доносится тихий звук, но внутри спокойно. Отдыхай в этой тишине. Здесь не нужно ничего говорить или объяснять.

Эта комната всегда здесь и ждёт тебя. Когда мир покажется слишком шумным, можно прийти сюда, закрыть дверь и отдохнуть.

Побудь здесь ещё немного. Сейчас ты в безопасности.

Теперь попрощайся с комнатой. Подойди к двери, открой её и медленно выйди. Комната будет ждать тебя.

Когда почувствуешь готовность, глубоко вдохни. Возьми это спокойствие с собой, медленно возвращайся и открой глаза.`,
  ),
  'room-light': pack(
    `Sessiz odana yeniden dönelim. Bu kez ışığa bakacağız ve onun sıcaklığının bedenini nasıl yumuşattığını hissedeceğiz.

Rahatça yerleş ve gözlerini kapat. Yavaşça nefes al… ve ver. Bir kez daha… al… ve ver.

Odayı yeniden gözünün önüne getir. Kapı kapalı, her şey yerli yerinde. Odanın havası ılık ve sakin. Bir kez daha rahat köşene yerleş.

Işık nereden geliyor? Belki pencereden süzülen yumuşak bir güneş, belki sarı, sıcak bir lamba. Işığın rengine bak; altın sarısı mı, yumuşak bir turuncu mu?

Bu ışığın biraz daha ısındığını, biraz daha yumuşadığını hayal et. Yavaşça odaya, yere ve sana doğru yayılıyor.

Önce başının tepesine dokunuyor. Saçlarının dibi ısınıyor, başının derisi gevşiyor. Alnına doğru yavaşça yayılıyor.

Sonra yüzüne iniyor. Alnın gevşiyor. Gözlerin dinleniyor. Yanakların ve çenen yumuşuyor.

Işık boynuna ve omuzlarına iniyor. Dokunduğu her yerde gerginlik, güneşte eriyen kar gibi azalıyor.

Şimdi göğsüne ulaşıyor. Nefesin yavaşlıyor, rahatlıyor. Kalbinin çevresinde sıcak bir genişlik var. Her nefeste bu sıcaklık biraz daha derine iniyor.

Işık karnına iniyor. Karnın yumuşuyor, nefes orada rahatça hareket ediyor. Midendeki düğümler yavaş yavaş çözülüyor.

Kollarından ellerine doğru akıyor. Ellerin ısınıyor, ağırlaşıyor. Parmak uçların hafifçe karıncalanabilir.

Sırtından aşağı yayılıyor. Omurgan boyunca, belin ve kalçaların sıcaklıkla doluyor. Sırtını yasladığın yer de ılık ve güvenli.

Bacaklarından aşağı, dizlerine, baldırlarına ve ta ayak parmaklarına kadar iniyor. Bütün bedenin sıcak, yumuşak bir ışıkla sarılı.

Hâlâ gergin kalan bir yer varsa onunla uğraşma. Işık bir süre orada beklesin. Acelen yok. Belki omuzlarında, belki çenende… Sadece ışığı oraya gönder.

Nefes alırken bu sıcaklığı içine çek… verirken artık sana gerekmeyen ne varsa bırak. Birkaç nefes böyle devam et.

Bu ışığın içinde kal. Burada güvendesin, sıcacık ve rahat. Işık seni sarıyor, sen sadece dinleniyorsun.

Hazır olduğunda görüntü yavaşça solsun. Sıcaklık seninle kalsın. Bir nefes al ve gözlerini yavaşça aç.`,
    `Let us return to your quiet room. This time we will notice the light, and feel how its warmth softens your body.

Settle in comfortably and close your eyes. Breathe in slowly… and out. Once more… in… and out.

Picture the room again. The door is closed, and everything is in its place. The air is warm and calm. Settle into your comfortable corner once more.

Where is the light coming from? Perhaps soft sunlight through the window, perhaps a warm yellow lamp. Notice its color; golden, or a soft orange?

Imagine this light becoming a little warmer, a little softer. Slowly it spreads into the room, across the floor, and toward you.

First it touches the top of your head. The roots of your hair grow warm, your scalp relaxes. Slowly it spreads down over your forehead.

Then it moves down over your face. Your forehead relaxes. Your eyes rest. Your cheeks and jaw soften.

The light moves down to your neck and shoulders. Wherever it touches, tension fades, like snow melting in the sun.

Now it reaches your chest. Your breath slows down and eases. There is a warm spaciousness around your heart. With each breath, the warmth goes a little deeper.

The light moves down into your belly. Your belly softens, and the breath moves freely there. The knots in your stomach slowly loosen.

It flows down your arms into your hands. Your hands grow warm and heavy. Your fingertips may tingle a little.

It spreads down your back. Along your spine, your lower back and hips fill with warmth. Whatever you are leaning against is warm and safe too.

It moves down your legs, to your knees, your calves, all the way to your toes. Your whole body is wrapped in a warm, soft light.

If any place still feels tense, do not fight it. Let the light rest there for a while. There is no hurry. Perhaps in your shoulders, perhaps in your jaw… just send the light there.

As you breathe in, draw this warmth inside… as you breathe out, let go of anything you no longer need. Continue like this for a few breaths.

Stay in this light. Here you are safe, warm and at ease. The light surrounds you, and you simply rest.

When you are ready, let the image fade slowly. Let the warmth stay with you. Take a breath, and slowly open your eyes.`,
    `Volvamos a tu habitación tranquila. Esta vez nos fijaremos en la luz y sentiremos cómo su calor suaviza el cuerpo.

Acomódate y cierra los ojos. Inspira despacio… y espira. Una vez más… inspira… y espira.

Imagina de nuevo la habitación. La puerta está cerrada y todo está en su sitio. El aire es tibio y tranquilo. Acomódate otra vez en tu rincón.

¿De dónde viene la luz? Quizá un sol suave que entra por la ventana, quizá una lámpara amarilla y cálida. Mira su color: ¿dorado o un naranja suave?

Imagina que esa luz se vuelve un poco más cálida, un poco más suave. Poco a poco se extiende por la habitación, por el suelo y hacia ti.

Primero toca la coronilla. Las raíces del pelo se calientan y el cuero cabelludo se relaja. Después baja despacio hacia la frente.

Luego desciende por la cara. La frente se relaja. Los ojos descansan. Las mejillas y la mandíbula se ablandan.

La luz baja al cuello y a los hombros. Allí donde toca, la tensión se va, como la nieve que se derrite al sol.

Ahora llega al pecho. La respiración se hace más lenta y tranquila. Alrededor del corazón hay una amplitud cálida. Con cada respiración, el calor llega un poco más hondo.

La luz baja al vientre. El vientre se ablanda y la respiración se mueve allí con libertad. Los nudos del estómago se van deshaciendo.

Fluye por los brazos hasta las manos. Las manos se calientan y pesan. Puede que notes un leve cosquilleo en la punta de los dedos.

Se extiende por la espalda. A lo largo de la columna, la zona lumbar y las caderas se llenan de calor. Aquello en lo que te apoyas también es cálido y seguro.

Baja por las piernas, por las rodillas, por las pantorrillas, hasta la punta de los pies. Todo tu cuerpo está envuelto en una luz cálida y suave.

Si algún lugar sigue tenso, no luches con él. Deja que la luz se quede ahí un rato. No hay prisa. Quizá en los hombros, quizá en la mandíbula… solo envía la luz hacia allí.

Al inspirar, recoge ese calor… al espirar, suelta todo lo que ya no necesitas. Sigue así unas cuantas respiraciones.

Quédate en esta luz. Aquí estás a salvo, abrigado y tranquilo. La luz te envuelve y tú solo descansas.

Cuando estés listo, deja que la imagen se desvanezca despacio. Que el calor se quede contigo. Respira y abre los ojos despacio.`,
    `Torniamo nella tua stanza tranquilla. Questa volta noteremo la luce, e sentiremo come il suo calore ammorbidisce il corpo.

Sistemati comodamente e chiudi gli occhi. Inspira piano… ed espira. Ancora una volta… inspira… ed espira.

Immagina di nuovo la stanza. La porta è chiusa, e ogni cosa è al suo posto. L’aria è tiepida e calma. Sistemati ancora una volta nel tuo angolo comodo.

Da dove arriva la luce? Forse un sole morbido dalla finestra, forse una lampada di un giallo caldo. Nota il suo colore; dorato, o un arancione tenue?

Immagina che questa luce diventi un po’ più calda, un po’ più morbida. Piano piano si diffonde nella stanza, sul pavimento, e verso di te.

Prima tocca la sommità della testa. Le radici dei capelli si scaldano, il cuoio capelluto si rilassa. Piano piano scende sulla fronte.

Poi scende sul viso. La fronte si distende. Gli occhi riposano. Le guance e la mascella si ammorbidiscono.

La luce scende al collo e alle spalle. Dove tocca, la tensione svanisce, come neve che si scioglie al sole.

Ora raggiunge il petto. Il respiro rallenta e si fa più facile. Intorno al cuore c’è uno spazio caldo e ampio. A ogni respiro il calore va un po’ più in profondità.

La luce scende nella pancia. La pancia si ammorbidisce, e lì il respiro si muove libero. I nodi nello stomaco si sciolgono piano.

Scorre lungo le braccia fino alle mani. Le mani diventano calde e pesanti. Forse senti un leggero formicolio sulla punta delle dita.

Si diffonde lungo la schiena. Lungo la colonna, la parte bassa della schiena e i fianchi si riempiono di calore. Anche ciò a cui ti appoggi è caldo e sicuro.

Scende lungo le gambe, alle ginocchia, ai polpacci, fino alle dita dei piedi. Tutto il corpo è avvolto da una luce calda e morbida.

Se qualche punto è ancora teso, non combatterlo. Lascia che la luce si fermi lì per un po’. Non c’è fretta. Forse nelle spalle, forse nella mascella… manda semplicemente la luce lì.

Quando inspiri, porta dentro questo calore… quando espiri, lascia andare ciò che non ti serve più. Continua così per qualche respiro.

Resta in questa luce. Qui sei al sicuro, nel calore, in pace. La luce ti avvolge, e tu riposi soltanto.

Quando vuoi, lascia svanire piano l’immagine. Lascia che il calore resti con te. Fai un respiro, e apri piano gli occhi.`,
    `Sakit otağına yenidən qayıdaq. Bu dəfə işığa baxacağıq və onun istiliyinin bədənini necə yumşaltdığını hiss edəcəyik.

Rahat yerləş və gözlərini yum. Yavaşca nəfəs al… və ver. Bir dəfə də… al… və ver.

Otağı yenidən gözünün önünə gətir. Qapı bağlıdır, hər şey yerli-yerindədir. Otağın havası ilıq və sakitdir. Bir dəfə də rahat küncünə yerləş.

İşıq haradan gəlir? Bəlkə pəncərədən süzülən yumşaq günəş, bəlkə sarı, isti bir lampa. İşığın rənginə bax; qızılı, yoxsa yumşaq narıncı?

Təsəvvür et ki, bu işıq bir az da isinir, bir az da yumşalır. Yavaşca otağa, yerə və sənə tərəf yayılır.

Əvvəlcə başının təpəsinə toxunur. Saçlarının dibi isinir, başının dərisi boşalır. Sonra yavaşca alnına tərəf yayılır.

Sonra üzünə enir. Alnın boşalır. Gözlərin dincəlir. Yanaqların və çənən yumşalır.

İşıq boynuna və çiyinlərinə enir. Toxunduğu hər yerdə gərginlik, günəşdə əriyən qar kimi azalır.

İndi sinənə çatır. Nəfəsin yavaşlayır, rahatlaşır. Ürəyinin ətrafında isti bir genişlik var. Hər nəfəsdə bu istilik bir az da dərinə enir.

İşıq qarnına enir. Qarnın yumşalır, nəfəs orada rahatca hərəkət edir. Mədəndəki düyünlər yavaş-yavaş açılır.

Qollarından əllərinə doğru axır. Əllərin isinir, ağırlaşır. Barmaqlarının ucu yüngülcə gizildəyə bilər.

Kürəyindən aşağı yayılır. Onurğan boyunca belin və ombaların istiliklə dolur. Söykəndiyin yer də ilıq və təhlükəsizdir.

Ayaqlarından aşağı, dizlərinə, baldırlarına və lap barmaqlarının ucuna qədər enir. Bütün bədənin isti, yumşaq bir işığa bürünüb.

Hələ də gərgin qalan bir yer varsa, onunla əlləşmə. Qoy işıq bir az orada qalsın. Tələsməyə ehtiyac yoxdur. Bəlkə çiyinlərində, bəlkə çənəndə… sadəcə işığı ora göndər.

Nəfəs alanda bu istiliyi içinə çək… verəndə artıq sənə lazım olmayan nə varsa, burax. Bir neçə nəfəs belə davam et.

Bu işığın içində qal. Burada təhlükəsizsən, isti və rahatsan. İşıq səni bürüyür, sən isə sadəcə dincəlirsən.

Hazır olanda qoy görüntü yavaşca solsun. İstilik səninlə qalsın. Bir nəfəs al və gözlərini yavaşca aç.`,
    `Вернёмся в твою тихую комнату. На этот раз посмотрим на свет и почувствуем, как его тепло смягчает тело.

Устройся удобно и закрой глаза. Медленно вдохни… и выдохни. Ещё раз… вдох… и выдох.

Снова представь комнату. Дверь закрыта, всё на своих местах. Воздух тёплый и спокойный. Ещё раз устройся в своём уютном уголке.

Откуда идёт свет? Может быть, мягкое солнце из окна, а может, тёплая жёлтая лампа. Посмотри на его цвет: золотистый или мягкий оранжевый?

Представь, что свет становится чуть теплее и мягче. Он медленно разливается по комнате, по полу и по тебе.

Сначала он касается макушки. Корни волос теплеют, кожа головы расслабляется. Потом свет медленно спускается ко лбу.

Затем он опускается на лицо. Лоб разглаживается. Глаза отдыхают. Щёки и челюсть становятся мягкими.

Свет опускается на шею и плечи. Там, где он касается, напряжение тает, как снег на солнце.

Теперь он доходит до груди. Дыхание становится медленным и спокойным. Вокруг сердца — тёплый простор. С каждым вдохом тепло уходит чуть глубже.

Свет опускается в живот. Живот становится мягким, дыхание свободно движется там. Узелки в животе постепенно развязываются.

Он течёт по рукам до самых ладоней. Руки теплеют и тяжелеют. Кончики пальцев могут слегка покалывать.

Он разливается вниз по спине. Вдоль позвоночника поясница и бёдра наполняются теплом. То, на что ты опираешься, тоже тёплое и надёжное.

Свет спускается по ногам, к коленям, к икрам и до самых кончиков пальцев. Всё тело окутано тёплым мягким светом.

Если где-то ещё остаётся напряжение, не борись с ним. Пусть свет побудет там подольше. Спешить некуда. Может быть, в плечах, может быть, в челюсти… просто направь туда свет.

На вдохе впусти это тепло… на выдохе отпусти всё, что тебе сейчас не нужно. Продолжай так несколько вдохов.

Побудь в этом свете. Здесь безопасно, тепло и спокойно. Свет окутывает тебя, а ты просто отдыхаешь.

Когда почувствуешь готовность, пусть картинка медленно растает. А тепло останется с тобой. Сделай вдох и медленно открой глаза.`,
  ),
  'room-hands': pack(
    `Bu bölümde kendi ellerinle kendini rahatlatacaksın. Dokunuş, bedenin en eski sakinleşme yollarından biridir.

Odana yerleş ve yavaşça nefes al. İstersen gözlerini kapat. Omuzlarını gevşet, bedenini yerleştiğin yere bırak.

Dikkatini ellerine ver. Şu an nasıllar? Sıcak mı, serin mi? Hafif mi, ağır mı? Ellerinin bütün gün senin için ne kadar çok iş yaptığını düşün.

Avuçlarını birkaç saniye birbirine sürt. Oluşan sıcaklığı hisset. Sonra ellerini birbirinden biraz ayır ve aradaki sıcaklığı fark et.

Şimdi bir elini göğsüne, kalbinin üstüne koy. Elinin sıcaklığını göğsünde hisset. Kalbinin atışını avucunda hissedebilirsin; hissetmesen de sorun değil.

Diğer elini karnına koy. Nefes aldıkça ellerinin hafifçe kalkıp indiğini hisset.

Ellerinin altındaki hareketi izle. Göğsün ve karnın, nefesle birlikte yavaşça yükselip alçalıyor. Bu hareket, bedeninin seni her an taşıdığının küçük bir işareti.

Üzgün bir arkadaşına nasıl sarılırsan, kendine de öyle sarılabilirsin. Bu eller şu an sana şefkat gösteriyor. Kendine, sevdiğin birine davrandığın kadar nazik davranabilirsin.

İçinden kendine söyle: Buradayım. Şu an güvendeyim. Bu his geçecek.

Bu cümleleri istediğin kadar tekrarla. Kendi sözlerini de bulabilirsin: “Elimden geleni yapıyorum.” “Dinlenmeyi hak ediyorum.”

Nefes al… ellerin yükseliyor. Nefes ver… ellerin yerine dönüyor.

Bir duygu gelirse gelsin. Onu itmene gerek yok. Ellerin seni olduğun gibi tutuyor. Duygular da dalgalar gibi gelir ve geçer.

İstersen ellerini omuzlarına götürüp kendine hafifçe sarıl. Ya da yanaklarını avuçlarının arasına al. Sana iyi gelen dokunuşu bul.

Uzun zamandır çok şey taşıyorsun. Bu birkaç dakika boyunca hiçbir yük taşımana gerek yok. Sadece dinlen. Omuzlarını bırak, nefesin yumuşasın.

Birkaç nefes daha ellerinin sıcaklığında kal.

Bitirmeden önce kendine bu zamanı ayırdığın için teşekkür et. Kendine nazik davranmak da bir beceridir ve sen onu şu anda yapıyorsun.

Hazır olduğunda ellerini kucağına bırak, derin bir nefes al ve gözlerini yavaşça aç.`,
    `In this part, you will comfort yourself with your own hands. Touch is one of the oldest ways the body knows to calm down.

Settle into your room and breathe slowly. You can close your eyes if you like. Relax your shoulders, and let your body rest where it is.

Bring your attention to your hands. How are they right now? Warm or cool? Light or heavy? Think of how much work your hands have done for you all day.

Rub your palms together for a few seconds. Feel the warmth you create. Then move your hands slightly apart, and notice the warmth between them.

Now place one hand on your chest, over your heart. Feel the warmth of your hand on your chest. You may feel your heartbeat in your palm; if you do not, that is fine too.

Place your other hand on your belly. As you breathe, feel your hands rise and fall gently.

Watch the movement beneath your hands. Your chest and belly rise and fall slowly with each breath. This movement is a small sign that your body is carrying you every moment.

Just as you would hold a friend who is sad, you can hold yourself. These hands are offering you kindness right now. You can be as gentle with yourself as you are with someone you love.

Say to yourself, silently: I am here. Right now I am safe. This feeling will pass.

Repeat these words as often as you like. You can also find your own: “I am doing my best.” “I deserve to rest.”

Breathe in… your hands rise. Breathe out… your hands settle back.

If a feeling comes, let it come. You do not need to push it away. Your hands are holding you just as you are. Feelings, too, come and go like waves.

If you like, bring your hands to your shoulders and give yourself a gentle hug. Or cradle your cheeks in your palms. Find the touch that feels good to you.

You have been carrying a lot for a long time. For these few minutes, you do not need to carry anything. Just rest. Let your shoulders go, and let your breath soften.

Stay with the warmth of your hands for a few more breaths.

Before you finish, thank yourself for taking this time. Being kind to yourself is a skill too, and you are practising it right now.

When you are ready, let your hands rest in your lap, take a deep breath, and slowly open your eyes.`,
    `En esta parte vas a calmarte con tus propias manos. El tacto es una de las formas más antiguas que tiene el cuerpo de tranquilizarse.

Acomódate en tu habitación y respira despacio. Si quieres, cierra los ojos. Relaja los hombros y deja que el cuerpo descanse donde está.

Lleva la atención a las manos. ¿Cómo están ahora? ¿Calientes o frías? ¿Ligeras o pesadas? Piensa en todo lo que tus manos han hecho hoy por ti.

Frota las palmas unos segundos. Siente el calor que se forma. Luego separa un poco las manos y nota el calor entre ellas.

Ahora pon una mano sobre el pecho, encima del corazón. Siente el calor de la mano en el pecho. Quizá notes el latido en la palma; si no lo notas, también está bien.

Pon la otra mano sobre el vientre. Al respirar, siente cómo las manos suben y bajan suavemente.

Observa el movimiento bajo las manos. El pecho y el vientre suben y bajan despacio con cada respiración. Este movimiento es una pequeña señal de que tu cuerpo te sostiene a cada momento.

Igual que abrazarías a un amigo triste, puedes abrazarte a ti. Estas manos te están ofreciendo cariño ahora mismo. Puedes ser tan amable contigo como con alguien a quien quieres.

Dite en silencio: Estoy aquí. Ahora estoy a salvo. Esta sensación pasará.

Repite estas frases tantas veces como quieras. También puedes encontrar las tuyas: «Estoy haciendo lo que puedo». «Merezco descansar».

Inspira… las manos suben. Espira… las manos vuelven a su sitio.

Si llega una emoción, deja que llegue. No hace falta apartarla. Tus manos te sostienen tal como eres. Las emociones también vienen y van, como las olas.

Si quieres, lleva las manos a los hombros y date un abrazo suave. O sostén tus mejillas entre las palmas. Busca el contacto que te siente bien.

Llevas mucho tiempo cargando con muchas cosas. Durante estos minutos no tienes que cargar con nada. Solo descansa. Suelta los hombros y deja que la respiración se suavice.

Quédate unas respiraciones más con el calor de tus manos.

Antes de terminar, date las gracias por haberte regalado este tiempo. Ser amable contigo también es una habilidad, y la estás practicando ahora mismo.

Cuando estés listo, deja las manos en el regazo, respira hondo y abre los ojos despacio.`,
    `In questa parte ti darai conforto con le tue mani. Il contatto è uno dei modi più antichi che il corpo conosce per calmarsi.

Sistemati nella tua stanza e respira piano. Se ti va, puoi chiudere gli occhi. Rilassa le spalle, e lascia che il corpo riposi dove si trova.

Porta l’attenzione alle mani. Come sono in questo momento? Calde o fresche? Leggere o pesanti? Pensa a quanto lavoro hanno fatto per te durante tutta la giornata.

Strofina i palmi tra loro per qualche secondo. Senti il calore che crei. Poi allontana appena le mani, e nota il calore tra di loro.

Ora appoggia una mano sul petto, sopra il cuore. Senti il calore della mano sul petto. Forse senti il battito nel palmo; se non lo senti, va bene lo stesso.

Appoggia l’altra mano sulla pancia. Mentre respiri, senti le mani che si alzano e si abbassano dolcemente.

Osserva il movimento sotto le mani. Il petto e la pancia si alzano e si abbassano piano a ogni respiro. Questo movimento è un piccolo segno che il corpo ti porta in ogni momento.

Come abbracceresti una persona cara che è triste, puoi abbracciare anche te. Queste mani ti offrono gentilezza, adesso. Puoi trattarti con la stessa dolcezza che riservi a chi ami.

Di’ dentro di te, in silenzio: sono qui. Adesso sono al sicuro. Questa sensazione passerà.

Ripeti queste parole quante volte vuoi. Puoi anche trovarne di tue: «Sto facendo del mio meglio.» «Merito di riposare.»

Inspira… le mani si alzano. Espira… le mani tornano giù.

Se arriva un’emozione, lasciala arrivare. Non devi respingerla. Le tue mani ti tengono così come sei. Anche le emozioni vanno e vengono come onde.

Se ti va, porta le mani alle spalle e datti un abbraccio leggero. Oppure accogli le guance nei palmi. Trova il contatto che ti fa stare bene.

Da tanto tempo porti molto sulle spalle. Per questi pochi minuti non devi portare niente. Riposa soltanto. Lascia andare le spalle, e lascia che il respiro si ammorbidisca.

Resta con il calore delle mani ancora per qualche respiro.

Prima di finire, ringraziati per aver dedicato questo tempo a te. Essere gentili con sé stessi è un’abilità, e la stai praticando proprio adesso.

Quando vuoi, lascia riposare le mani in grembo, fai un respiro profondo, e apri piano gli occhi.`,
    `Bu hissədə öz əllərinlə özünə təskinlik verəcəksən. Toxunuş bədənin ən qədim sakitləşmə yollarından biridir.

Otağına yerləş və yavaşca nəfəs al. İstəsən gözlərini yum. Çiyinlərini boşalt, bədənini yerləşdiyin yerə burax.

Diqqətini əllərinə ver. İndi necədirlər? İsti, yoxsa sərin? Yüngül, yoxsa ağır? Əllərinin bütün gün sənin üçün nə qədər iş gördüyünü düşün.

Ovuclarını bir neçə saniyə bir-birinə sürt. Yaranan istiliyi hiss et. Sonra əllərini bir az arala və aradakı istiliyi hiss et.

İndi bir əlini sinənə, ürəyinin üstünə qoy. Əlinin istiliyini sinəndə hiss et. Ürək döyüntünü ovucunda hiss edə bilərsən; hiss etməsən də, eybi yoxdur.

O biri əlini qarnına qoy. Nəfəs aldıqca əllərinin yavaşca qalxıb endiyini hiss et.

Əllərinin altındakı hərəkəti izlə. Sinən və qarnın nəfəslə birlikdə yavaşca qalxıb enir. Bu hərəkət bədəninin səni hər an daşıdığının kiçik bir əlamətidir.

Kədərli bir dostunu necə qucaqlayırsansa, özünü də elə qucaqlaya bilərsən. Bu əllər indi sənə qayğı göstərir. Özünə sevdiyin birinə olduğun qədər mehriban ola bilərsən.

İçində özünə de: Buradayam. İndi təhlükəsizəm. Bu hiss keçib gedəcək.

Bu sözləri istədiyin qədər təkrarla. Öz sözlərini də tapa bilərsən: “Əlimdən gələni edirəm.” “Dincəlməyə haqqım var.”

Nəfəs al… əllərin qalxır. Nəfəs ver… əllərin yerinə qayıdır.

Bir hiss gəlsə, qoy gəlsin. Onu itələməyə ehtiyac yoxdur. Əllərin səni olduğun kimi tutur. Hisslər də dalğalar kimi gəlib keçir.

İstəsən əllərini çiyinlərinə aparıb özünü yüngülcə qucaqla. Ya da yanaqlarını ovuclarının arasına al. Sənə xoş gələn toxunuşu tap.

Çoxdandır çox şey daşıyırsan. Bu bir neçə dəqiqədə heç bir yük daşımağa ehtiyac yoxdur. Sadəcə dincəl. Çiyinlərini burax, nəfəsin yumşalsın.

Bir neçə nəfəs də əllərinin istiliyində qal.

Bitirməzdən əvvəl bu vaxtı özünə ayırdığın üçün özünə təşəkkür et. Özünə mehriban olmaq da bir bacarıqdır və sən onu indi edirsən.

Hazır olanda əllərini dizlərinin üstünə qoy, dərin nəfəs al və gözlərini yavaşca aç.`,
    `В этой части ты успокоишь себя собственными руками. Прикосновение — один из самых древних способов, которым тело умеет успокаиваться.

Устройся в своей комнате и медленно вдохни. Если хочется, закрой глаза. Опусти плечи и позволь телу отдыхать там, где оно есть.

Переведи внимание на руки. Какие они сейчас? Тёплые или прохладные? Лёгкие или тяжёлые? Подумай, как много работы руки сделали для тебя за день.

Потри ладони друг о друга несколько секунд. Почувствуй тепло. Потом немного разведи руки и заметь тепло между ними.

Теперь положи одну руку на грудь, на сердце. Почувствуй тепло ладони на груди. Может быть, ладонь почувствует биение сердца; если нет — это тоже нормально.

Другую руку положи на живот. Почувствуй, как с каждым вдохом руки чуть поднимаются и опускаются.

Понаблюдай за движением под ладонями. Грудь и живот медленно поднимаются и опускаются вместе с дыханием. Это движение — маленький знак того, что тело каждую минуту поддерживает тебя.

Так, как обнимают грустного друга, можно обнять и себя. Эти руки сейчас заботятся о тебе. К себе можно относиться так же бережно, как к тому, кого любишь.

Скажи себе мысленно: Я здесь. Сейчас я в безопасности. Это чувство пройдёт.

Повторяй эти слова столько, сколько хочется. Можно найти и свои: «Я делаю всё, что могу». «Я имею право отдохнуть».

Вдох… руки поднимаются. Выдох… руки опускаются.

Если приходит какое-то чувство, пусть приходит. Не нужно его прогонять. Твои руки бережно держат тебя. Чувства тоже приходят и уходят, как волны.

Если хочется, положи руки на плечи и мягко обними себя. Или возьми щёки в ладони. Найди прикосновение, которое тебе приятно.

Ты давно несёшь очень многое. В эти несколько минут ничего нести не нужно. Просто отдохни. Отпусти плечи, пусть дыхание станет мягче.

Побудь ещё несколько вдохов в тепле своих рук.

Прежде чем закончить, поблагодари себя за это время. Доброта к себе — тоже умение, и ты учишься ему прямо сейчас.

Когда почувствуешь готовность, опусти руки на колени, глубоко вдохни и медленно открой глаза.`,
  ),
  'shore-edge': pack(
    `Sessiz bir sahilde, denizin kıyısında oturduğunu hayal et. Hava ılık, gökyüzü açık. Ayaklarının altında yumuşak, ılık kum var.

Yavaşça nefes al. Altındaki kumu ya da düz bir kayayı hisset. Sağlam, sabit. Ellerini dizlerine bırak ve omuzlarını gevşet.

Önünde deniz ufka kadar uzanıyor. Suyun rengine bak. Işığın su üstündeki pırıltısını fark et. Uzakta, ufuk çizgisinde gökyüzü ve deniz birbirine karışıyor.

Dalgaları izle. Biri yavaşça yükseliyor, büyüyor, sonra kıyıya usulca vurup geri çekiliyor. Ardından yenisi geliyor.

Dalgaların sesini dinle. Gelirken bir hışırtı, çekilirken yumuşak bir fısıltı. Bu sesin içinde nefesin kendiliğinden yavaşlıyor.

Duygular da böyledir. Kaygı bir dalga gibi kabarabilir, güçlenebilir, en yükseğe çıkabilir… ama sonunda hep geri çekilir. Her dalga geri çekilir.

Dalgaları durdurman gerekmiyor. Sen kıyısın. Dalgalar gelir, gider. Kıyı yerinde kalır. Sen de kıyı gibi sabit ve sakinsin.

Şimdi nefesini dalgalarla birleştir. Dalga gelirken nefes al… çekilirken ver.

Dalga gelirken nefes al… dalga çekilirken yavaşça ver.

Dalgayla birlikte nefes al… ve yavaşça ver. Bu ritimle bir süre kendi başına devam et.

Suyun sesini dinle. Düzenli, sakin. Yüzüne değen serin havayı hisset. Havada hafif bir tuz kokusu var. Bir martı uzaklarda süzülüyor, sonra gözden kayboluyor.

Büyük bir dalga gelirse, güçlü bir duygu ya da hızlanan bir düşünce, sadece izle. Ne kadar büyüdüğünü gör… sonra küçülmeye başladığını. Zaten denize geri dönüyor.

Aklına bir şey takılırsa onu bir dalganın üstüne bırak. Dalga onu alıp götürsün.

Kıyıda güvendesin. Deniz hareket ediyor, sen yerindesin. Ne olursa olsun, kıyı her dalgadan sonra yine orada.

Bir süre daha dalgalarla birlikte nefes al.

Şimdi dikkatini yavaşça bedenine getir. Oturduğun yeri, ellerini, ayaklarını hisset. Kumun sıcaklığını ve havanın serinliğini son bir kez fark et.

Hazır olduğunda derin bir nefes al ve yavaşça buraya dön. Gözlerini açtığında denizin sakinliği seninle kalsın.`,
    `Imagine you are sitting on a quiet beach, at the edge of the sea. The air is warm, and the sky is clear. Beneath your feet is soft, warm sand.

Breathe in slowly. Feel the sand, or a flat rock, beneath you. Solid, steady. Rest your hands on your knees and let your shoulders relax.

In front of you the sea stretches all the way to the horizon. Look at the color of the water. Notice the light sparkling on its surface. Far away, the sky and the sea melt into each other.

Watch the waves. One rises slowly, grows, then breaks gently on the shore and draws back. Then another one comes.

Listen to the sound of the waves. A rustle as they arrive, a soft whisper as they withdraw. Within this sound, your breath slows down by itself.

Feelings are like this too. Anxiety can swell like a wave, grow stronger, reach its peak… but in the end it always draws back. Every wave draws back.

You do not need to stop the waves. You are the shore. Waves come and go. The shore stays where it is. Like the shore, you are steady and calm.

Now join your breath with the waves. As a wave comes in, breathe in… as it draws back, breathe out.

In… and out.

In… and out. Continue with this rhythm on your own for a while.

Listen to the sound of the water. Steady, calm. Feel the cool air on your face. There is a faint smell of salt in the air. A gull glides far away, then disappears from view.

If a big wave comes, a strong feeling or a racing thought, just watch it. See how big it grows… and then how it begins to shrink. It is already returning to the sea.

If something keeps pulling at your mind, place it on top of a wave. Let the wave carry it away.

On the shore, you are safe. The sea is moving, and you stay where you are. Whatever happens, the shore is still there after every wave.

Breathe with the waves a little longer.

Now slowly bring your attention back to your body. Feel where you are sitting, your hands, your feet. Notice the warmth of the sand and the coolness of the air one last time.

When you are ready, take a deep breath and slowly come back here. When you open your eyes, let the calm of the sea stay with you.`,
    `Imagina que estás sentado en una playa tranquila, a la orilla del mar. El aire es templado y el cielo está despejado. Bajo los pies hay arena suave y tibia.

Inspira despacio. Siente la arena, o una roca plana, debajo de ti. Firme, estable. Apoya las manos en las rodillas y relaja los hombros.

Delante de ti, el mar se extiende hasta el horizonte. Mira el color del agua. Fíjate en el brillo de la luz sobre la superficie. A lo lejos, el cielo y el mar se funden.

Observa las olas. Una se eleva despacio, crece, rompe suavemente en la orilla y se retira. Después llega otra.

Escucha el sonido de las olas. Un susurro al llegar, un murmullo suave al retirarse. Dentro de este sonido, la respiración se calma sola.

Las emociones también son así. La ansiedad puede crecer como una ola, hacerse más fuerte, llegar a su punto más alto… pero al final siempre se retira. Todas las olas se retiran.

No tienes que detener las olas. Tú eres la orilla. Las olas vienen y van. La orilla se queda donde está. Como la orilla, tú permaneces firme y en calma.

Ahora une la respiración a las olas. Cuando la ola llega, inspira… cuando se retira, espira.

La ola llega: inspira… la ola se retira: espira despacio.

Inspira con la ola… y espira despacio. Sigue con este ritmo por tu cuenta un rato.

Escucha el agua. Regular, tranquila. Siente el aire fresco en la cara. Hay un leve olor a sal. Una gaviota planea a lo lejos y luego desaparece.

Si llega una ola grande, una emoción fuerte o un pensamiento acelerado, solo obsérvala. Mira cuánto crece… y cómo empieza a hacerse más pequeña. Ya está volviendo al mar.

Si algo se te queda enganchado en la mente, déjalo sobre una ola. Que la ola se lo lleve.

En la orilla estás a salvo. El mar se mueve y tú te quedas en tu sitio. Pase lo que pase, después de cada ola la orilla sigue ahí.

Respira con las olas un poco más.

Ahora devuelve la atención al cuerpo poco a poco. Siente dónde estás sentado, tus manos, tus pies. Nota por última vez el calor de la arena y el frescor del aire.

Cuando estés listo, respira hondo y vuelve aquí despacio. Al abrir los ojos, que la calma del mar se quede contigo.`,
    `Immagina di essere su una spiaggia tranquilla, in riva al mare. L’aria è tiepida, e il cielo è limpido. Sotto i piedi c’è sabbia morbida e calda.

Inspira lentamente. Senti la sabbia, o una roccia piatta, sotto di te. Solida, stabile. Appoggia le mani sulle ginocchia e lascia che le spalle si rilassino.

Davanti a te il mare si estende fino all’orizzonte. Guarda il colore dell’acqua. Nota la luce che brilla sulla superficie. Lontano, il cielo e il mare si confondono.

Guarda le onde. Una si alza piano, cresce, poi si rompe dolcemente sulla riva e si ritira. Poi ne arriva un’altra.

Ascolta il suono delle onde. Un fruscio quando arrivano, un sussurro leggero quando si ritirano. Dentro questo suono, il respiro rallenta da solo.

Anche le emozioni sono così. L’ansia può gonfiarsi come un’onda, diventare più forte, arrivare al culmine… ma alla fine si ritira sempre. Ogni onda si ritira.

Non devi fermare le onde. Tu sei la riva. Le onde vanno e vengono. La riva resta dove si trova. Proprio come la riva, anche dentro di te c’è un luogo stabile e calmo.

Ora unisci il respiro alle onde. Quando un’onda arriva, inspira… quando si ritira, espira.

Inspira con l’onda che arriva… ed espira piano con l’onda che si ritira.

Inspira… ed espira. Continua con questo ritmo per conto tuo, per un po’.

Ascolta il suono dell’acqua. Costante, calmo. Senti l’aria fresca sul viso. Nell’aria c’è un leggero profumo di sale. Un gabbiano plana lontano, poi scompare alla vista.

Se arriva un’onda grande, un’emozione forte o un pensiero che corre, guardala soltanto. Guarda quanto diventa grande… e poi come comincia a rimpicciolirsi. Sta già tornando al mare.

Se qualcosa continua a tirarti la mente, appoggialo su un’onda. Lascia che l’onda lo porti via.

Sulla riva sei al sicuro. Il mare si muove, e tu resti dove sei. Qualunque cosa accada, dopo ogni onda la riva è ancora lì.

Respira con le onde ancora un po’.

Ora riporta piano l’attenzione al corpo. Senti dove sei, le mani, i piedi. Nota per un’ultima volta il calore della sabbia e la freschezza dell’aria.

Quando vuoi, fai un respiro profondo e torna piano qui. Quando apri gli occhi, lascia che la calma del mare resti con te.`,
    `Sakit bir sahildə, dənizin kənarında oturduğunu təsəvvür et. Hava ilıqdır, səma açıqdır. Ayaqlarının altında yumşaq, ilıq qum var.

Yavaşca nəfəs al. Altındakı qumu, ya da hamar bir qayanı hiss et. Möhkəm, sabit. Əllərini dizlərinin üstünə burax və çiyinlərini boşalt.

Qarşında dəniz üfüqə qədər uzanır. Suyun rənginə bax. İşığın suyun üstündəki parıltısına diqqət et. Uzaqda, üfüq xəttində səma və dəniz bir-birinə qarışır.

Dalğalara bax. Biri yavaşca qalxır, böyüyür, sonra sahilə yumşaqca dəyib geri çəkilir. Ardınca yenisi gəlir.

Dalğaların səsini dinlə. Gələndə bir xışıltı, çəkiləndə yumşaq bir pıçıltı. Bu səsin içində nəfəsin öz-özünə yavaşlayır.

Hisslər də belədir. Narahatlıq dalğa kimi qabara, güclənə, ən yüksək nöqtəyə çata bilər… amma sonunda həmişə geri çəkilir. Hər dalğa geri çəkilir.

Dalğaları dayandırmağa ehtiyac yoxdur. Sən sahilsən. Dalğalar gəlir, gedir. Sahil yerində qalır. Sən də sahil kimi sabit və sakitsən.

İndi nəfəsini dalğalarla birləşdir. Dalğa gələndə nəfəs al… çəkiləndə ver.

Dalğa gələndə nəfəs al… dalğa çəkiləndə yavaşca ver.

Dalğa ilə birlikdə nəfəs al… və yavaşca ver. Bu ritmlə bir müddət özün davam et.

Suyun səsini dinlə. Ahəngdar, sakit. Üzünə toxunan sərin havanı hiss et. Havada yüngül duz qoxusu var. Uzaqda bir qağayı süzülür, sonra gözdən itir.

Böyük bir dalğa gəlsə, güclü bir hiss, ya da sürətlənən bir fikir, sadəcə izlə. Necə böyüdüyünü gör… sonra necə kiçildiyini. O artıq dənizə qayıdır.

Ağlına nəsə ilişsə, onu bir dalğanın üstünə burax. Qoy dalğa onu alıb aparsın.

Sahildə təhlükəsizsən. Dəniz hərəkət edir, sən yerindəsən. Nə olursa olsun, sahil hər dalğadan sonra yenə oradadır.

Bir az da dalğalarla birlikdə nəfəs al.

İndi diqqətini yavaşca bədəninə gətir. Oturduğun yeri, əllərini, ayaqlarını hiss et. Qumun istiliyini və havanın sərinliyini son dəfə hiss et.

Hazır olanda dərin nəfəs al və yavaşca bura qayıt. Gözlərini açanda dənizin sakitliyi səninlə qalsın.`,
    `Представь, что ты сидишь на тихом берегу у самого моря. Воздух тёплый, небо ясное. Под ногами мягкий тёплый песок.

Медленно вдохни. Почувствуй под собой песок или гладкий камень. Твёрдый, надёжный. Положи руки на колени и расслабь плечи.

Перед тобой море до самого горизонта. Посмотри на цвет воды. Заметь, как свет сверкает на её поверхности. Вдали, на линии горизонта, небо и море сливаются.

Посмотри на волны. Одна медленно поднимается, растёт, мягко касается берега и отступает. За ней приходит следующая.

Послушай шум волн. Шорох, когда они набегают, и мягкий шёпот, когда отступают. В этом звуке дыхание само становится медленнее.

С чувствами бывает так же. Тревога может нарастать, как волна, усиливаться, подниматься до самого гребня… но потом всегда отступает. Каждая волна отступает.

Не нужно останавливать волны. Ты — берег. Волны приходят и уходят. Берег остаётся. Как берег, ты остаёшься на месте, в покое.

Теперь соедини дыхание с волнами. Волна набегает — вдох… отступает — выдох.

Волна набегает — вдыхай… волна отступает — медленно выдыхай.

Вдыхай вместе с волной… и медленно выдыхай. Продолжай в этом ритме какое-то время.

Послушай шум воды. Ровный, спокойный. Почувствуй прохладный воздух на лице. В воздухе лёгкий запах соли. Вдали скользит чайка и исчезает из виду.

Если придёт большая волна, сильное чувство или быстрая мысль, просто наблюдай. Посмотри, как она растёт… и как начинает спадать. Она уже возвращается в море.

Если что-то не отпускает, положи это на гребень волны. Пусть волна унесёт это.

На берегу ты в безопасности. Море движется, а ты на месте. Что бы ни происходило, берег после каждой волны остаётся на месте.

Подыши ещё немного вместе с волнами.

Теперь медленно верни внимание к телу. Почувствуй, на чём ты сидишь, свои руки, стопы. В последний раз заметь тепло песка и прохладу воздуха.

Когда почувствуешь готовность, глубоко вдохни и медленно возвращайся. Когда откроешь глаза, пусть спокойствие моря останется с тобой.`,
  ),
  'shore-stone': pack(
    `Sessiz sahilinde biraz daha kal ve yanındaki kuma bir bak. Dalgaların sesi seni yeniden karşılıyor.

Yavaşça nefes al. Güneş ılık, dalgalar uzaktan usulca geliyor. Omuzlarını bırak; bedenin kumun üstünde rahatça otursun.

Deniz kabuklarının arasında yuvarlak, pürüzsüz bir taş var. Onu al ve avucunun içine yerleştir.

Ağırlığını hisset. Göründüğünden ağır… sağlam ve sakin. Avucunun içine tam oturuyor, sanki senin için yapılmış gibi.

Parmaklarınla yüzeyini keşfet. Pürüzsüz; yıllarca dalgalar onu yavaş yavaş parlatmış. Belki bir yerinde küçük bir çizgi, küçük bir girinti var.

Bu taş sayısız fırtına görmüş. Dalgalar onu itmiş, çevirmiş… ama hâlâ burada, bütün ve sağlam. Fırtınalar onu sadece daha da yumuşatmış.

Yavaşça nefes al… verirken bedenin de bu taş gibi ağırlaşsın, sağlamlaşsın. Ayakların yerde, sırtın dik ama rahat.

Taşın sıcaklığını hisset. Belki hâlâ güneşten ılık. Bu sıcaklık avucundan koluna, oradan omzuna doğru yayılsın. Taş, sıcaklığını sana yavaşça veriyor.

Aklına düşünceler gelirse onları taşın üstünden akıp giden su gibi düşün. Su akar gider, taş yerinde kalır.

Sen de bazen bu taş gibisin. Zor günler seni şekillendirdi ama seni yok etmedi. Her zorluk seni biraz daha güçlü, biraz daha yumuşak yaptı.

Taşı avucunda tut ve kendine söyle: Ben de sağlamım. Daha önce de zor günler atlattım ve hâlâ buradayım.

Bu cümleyi bir kez daha, yavaşça söyle. Kelimelerin bedeninde yankılanmasına izin ver.

Yavaşça nefes al… ve yavaşça ver.

Birkaç nefes daha taşın ağırlığı ve sıcaklığıyla kal. Nefesin taşın ağırlığı gibi sakin ve düzenli.

Şimdi taşı ceketinin cebine koyduğunu hayal et. O artık seninle. Ne zaman ihtiyacın olsa elini cebine koyup onu hissedebilirsin.

Kendini sarsılmış hissettiğin her an bu taşı hatırlayabilirsin. Elindeki gerçek bir taş, bir anahtar, sıcak bir fincan bile sana bunu hatırlatır.

Hazır olduğunda derin bir nefes al. Buradasın ve sağlamsın. Gözlerini yavaşça aç.`,
    `Stay a little longer on your quiet beach, and look at the sand beside you. The sound of the waves welcomes you again.

Breathe in slowly. The sun is warm, and the waves arrive softly from far away. Let your shoulders go; let your body sit easily on the sand.

Among the seashells there is a round, smooth stone. Pick it up and place it in your palm.

Feel its weight. Heavier than it looks… solid and calm. It fits perfectly in your palm, as if it were made for you.

Explore its surface with your fingers. Smooth; for years the waves have slowly polished it. Perhaps there is a small line somewhere, a small hollow.

This stone has seen countless storms. The waves have pushed it and turned it over… yet here it is, whole and solid. The storms only made it smoother.

Breathe in slowly… and as you breathe out, let your body become heavy and steady, like this stone. Your feet are on the ground, your back upright but relaxed.

Feel the warmth of the stone. Perhaps it is still warm from the sun. Let that warmth spread from your palm into your arm, and from there toward your shoulder. The stone is slowly giving you its warmth.

If thoughts come, think of them as water flowing over the stone. The water flows away, and the stone stays where it is.

Sometimes you are like this stone too. Hard days have shaped you, but they have not broken you. Every difficulty has made you a little stronger, and a little softer.

Hold the stone in your palm and say to yourself: I am steady too. I have been through hard days before, and I am still here.

Say the sentence once more, slowly. Let the words echo through your body.

Breathe in… and out.

Stay with the weight and warmth of the stone for a few more breaths. Your breath is calm and steady, like the weight of the stone.

Now imagine putting the stone in your jacket pocket. It is with you now. Whenever you need it, you can put your hand in your pocket and feel it.

Whenever you feel shaken, you can remember this stone. A real stone in your hand, a key, even a warm cup can remind you of it.

When you are ready, take a deep breath. You are here, and you are steady. Slowly open your eyes.`,
    `Quédate un poco más en tu playa tranquila y mira la arena a tu lado. El sonido de las olas te recibe de nuevo.

Inspira despacio. El sol es tibio y las olas llegan suaves desde lejos. Suelta los hombros; deja que el cuerpo se asiente cómodo sobre la arena.

Entre las conchas hay una piedra redonda y lisa. Cógela y colócala en la palma de tu mano.

Siente su peso. Más pesada de lo que parece… firme y tranquila. Encaja perfectamente en tu mano, como si estuviera hecha para ti.

Explora su superficie con los dedos. Lisa; durante años las olas la han pulido poco a poco. Quizá tenga en algún sitio una pequeña línea, un pequeño hueco.

Esta piedra ha vivido innumerables tormentas. Las olas la empujaron y le dieron vueltas… y aun así sigue aquí, entera y firme. Las tormentas solo la hicieron más suave.

Inspira despacio… y al espirar deja que tu cuerpo se vuelva pesado y estable, como esta piedra. Los pies en el suelo, la espalda recta pero relajada.

Siente el calor de la piedra. Quizá todavía conserva el calor del sol. Deja que ese calor suba de la palma al brazo y de ahí al hombro. La piedra te va dando su calor poco a poco.

Si llegan pensamientos, imagina que son agua que corre sobre la piedra. El agua se va y la piedra se queda.

A veces tú también eres como esta piedra. Los días difíciles te han dado forma, pero no te han roto. Cada dificultad te ha hecho un poco más fuerte y un poco más suave.

Sostén la piedra en la mano y dite: Yo también soy firme. Ya he pasado días difíciles y sigo aquí.

Repite la frase una vez más, despacio. Deja que las palabras resuenen en tu cuerpo.

Inspira despacio… y espira despacio.

Quédate unas respiraciones más con el peso y el calor de la piedra. Tu respiración es tranquila y regular, como el peso de la piedra.

Ahora imagina que guardas la piedra en el bolsillo de la chaqueta. Ya está contigo. Cuando la necesites, puedes meter la mano en el bolsillo y sentirla.

Siempre que te sientas sacudido, puedes recordar esta piedra. Una piedra de verdad en la mano, una llave o incluso una taza caliente pueden recordártelo.

Cuando estés listo, respira hondo. Estás aquí y eres firme. Abre los ojos despacio.`,
    `Resta ancora un po’ sulla tua spiaggia tranquilla, e guarda la sabbia accanto a te. Il suono delle onde ti accoglie di nuovo.

Inspira lentamente. Il sole è tiepido, e le onde arrivano piano da lontano. Lascia andare le spalle; lascia che il corpo stia comodo sulla sabbia.

Tra le conchiglie c’è una pietra rotonda e liscia. Raccoglila e mettila nel palmo della mano.

Senti il suo peso. Più pesante di quanto sembri… solida e calma. Sta perfettamente nel palmo, come se fosse fatta per te.

Esplora la superficie con le dita. Liscia; per anni le onde l’hanno levigata piano. Forse c’è una piccola linea da qualche parte, una piccola cavità.

Questa pietra ha visto innumerevoli tempeste. Le onde l’hanno spinta e rigirata… eppure eccola qui, intera e solida. Le tempeste l’hanno solo resa più liscia.

Inspira piano… e mentre espiri, lascia che il corpo diventi pesante e stabile, come questa pietra. I piedi sono a terra, la schiena dritta ma rilassata.

Senti il calore della pietra. Forse è ancora calda di sole. Lascia che quel calore si diffonda dal palmo al braccio, e da lì verso la spalla. La pietra ti sta dando piano il suo calore.

Se arrivano pensieri, immaginali come acqua che scorre sopra la pietra. L’acqua scorre via, e la pietra resta dove si trova.

A volte anche tu sei come questa pietra. I giorni difficili ti hanno dato forma, ma non sono riusciti a spezzarti. Ogni difficoltà ti ha dato un po’ più di forza, e un po’ più di dolcezza.

Tieni la pietra nel palmo e di’ dentro di te: anch’io sono stabile. Ho già attraversato giorni difficili, e sono ancora qui.

Ripeti la frase ancora una volta, piano. Lascia che le parole risuonino nel corpo.

Inspira piano… ed espira piano.

Resta con il peso e il calore della pietra ancora per qualche respiro. Il respiro è calmo e regolare, come il peso della pietra.

Ora immagina di mettere la pietra nella tasca della giacca. Adesso è con te. Ogni volta che ne hai bisogno, puoi mettere la mano in tasca e sentirla.

Nei momenti in cui qualcosa ti scuote, puoi ricordare questa pietra. Una pietra vera in mano, una chiave, perfino una tazza calda possono ricordartela.

Quando vuoi, fai un respiro profondo. Sei qui, e sei stabile. Apri piano gli occhi.`,
    `Sakit sahilində bir az da qal və yanındakı quma bax. Dalğaların səsi səni yenidən qarşılayır.

Yavaşca nəfəs al. Günəş ilıqdır, dalğalar uzaqdan yavaşca gəlir. Çiyinlərini burax; qoy bədənin qumun üstündə rahat otursun.

Balıqqulaqlarının arasında yumru, hamar bir daş var. Onu götür və ovucunun içinə qoy.

Ağırlığını hiss et. Göründüyündən ağırdır… möhkəm və sakit. Ovucuna tam oturur, sanki sənin üçün düzəldilib.

Barmaqlarınla səthini kəşf et. Hamardır; illərlə dalğalar onu yavaş-yavaş cilalayıb. Bəlkə harasındasa kiçik bir cizgi, kiçik bir çuxur var.

Bu daş saysız fırtınalar görüb. Dalğalar onu itələyib, fırladıb… amma hələ də buradadır, bütöv və möhkəm. Fırtınalar onu sadəcə daha da hamarlayıb.

Yavaşca nəfəs al… verəndə qoy bədənin də bu daş kimi ağırlaşsın, möhkəmlənsin. Ayaqların yerdə, kürəyin düz, amma rahat.

Daşın istiliyini hiss et. Bəlkə hələ də günəşdən ilıqdır. Bu istilik ovucundan qoluna, oradan çiyninə doğru yayılsın. Daş istiliyini sənə yavaşca verir.

Ağlına fikirlər gəlsə, onları daşın üstündən axıb gedən su kimi düşün. Su axıb gedir, daş yerində qalır.

Sən də bəzən bu daş kimisən. Çətin günlər səni formalaşdırıb, amma səni yox etməyib. Hər çətinlik səni bir az daha güclü, bir az daha yumşaq edib.

Daşı ovucunda saxla və özünə de: Mən də möhkəməm. Əvvəl də çətin günlər keçirmişəm və hələ də buradayam.

Bu cümləni bir dəfə də, yavaşca de. Qoy sözlər bədənində əks-səda versin.

Yavaşca nəfəs al… və yavaşca ver.

Bir neçə nəfəs də daşın ağırlığı və istiliyi ilə qal. Nəfəsin daşın ağırlığı kimi sakit və ahəngdardır.

İndi daşı pencəyinin cibinə qoyduğunu təsəvvür et. O artıq səninlədir. Nə vaxt ehtiyacın olsa, əlini cibinə qoyub onu hiss edə bilərsən.

Özünü sarsılmış hiss etdiyin hər an bu daşı xatırlaya bilərsən. Əlindəki əsl bir daş, bir açar, isti bir fincan belə bunu sənə xatırladar.

Hazır olanda dərin nəfəs al. Buradasan və möhkəmsən. Gözlərini yavaşca aç.`,
    `Побудь ещё на своём тихом берегу и посмотри на песок рядом. Шум волн снова встречает тебя.

Медленно вдохни. Солнце тёплое, волны мягко приходят издалека. Отпусти плечи; пусть тело спокойно сидит на песке.

Среди ракушек лежит круглый гладкий камень. Возьми его и положи на ладонь.

Почувствуй его вес. Он тяжелее, чем кажется… надёжный и спокойный. Он идеально ложится в ладонь, будто сделан для тебя.

Исследуй его поверхность пальцами. Гладкая; волны годами медленно шлифовали её. Может быть, где-то есть маленькая линия, маленькая ямка.

Этот камень пережил множество штормов. Волны толкали его, переворачивали… но он здесь, целый и крепкий. Штормы только сделали его глаже.

Медленно вдохни… и на выдохе пусть тело тоже станет тяжёлым и устойчивым, как этот камень. Стопы на земле, спина прямая, но свободная.

Почувствуй тепло камня. Может быть, он ещё хранит солнце. Пусть это тепло растекается от ладони по руке и дальше к плечу. Камень медленно отдаёт тебе своё тепло.

Если приходят мысли, представь, что это вода, которая течёт по камню. Вода утекает, камень остаётся.

Иногда и ты похож на этот камень. Трудные дни сформировали тебя, но не сломали. Каждая трудность сделала тебя чуть сильнее и чуть мягче.

Держи камень и скажи себе: Во мне тоже есть опора. Трудные дни уже бывали, и я всё ещё здесь.

Скажи эту фразу ещё раз, медленно. Пусть слова отзовутся в теле.

Медленно вдохни… и медленно выдохни.

Побудь ещё несколько вдохов с тяжестью и теплом камня. Дыхание спокойное и ровное, как вес камня.

Теперь представь, что кладёшь камень в карман куртки. Теперь он с тобой. Когда понадобится, можно опустить руку в карман и почувствовать его.

Когда почувствуешь, что теряешь опору, вспомни этот камень. Настоящий камешек в руке, ключ или тёплая чашка тоже напомнят об этом.

Когда почувствуешь готовность, глубоко вдохни. Ты здесь, и у тебя есть опора. Медленно открой глаза.`,
  ),
  'shore-seed': pack(
    `Sessiz sahilinde gün bitiyor. Gökyüzü yavaş yavaş turuncuya, sonra mora dönüyor. Güneş denize doğru yavaşça iniyor ve suyun üstünde altın bir yol bırakıyor.

Yavaşça nefes al. Bedenin ağırlaşsın, gevşesin. Omuzlarını bırak, çeneni gevşet.

Dalgalar artık daha yavaş geliyor. Rüzgâr dinmiş. Kum hâlâ günün sıcaklığını taşıyor. Uzaktan gelen dalga sesleri bir ninni gibi.

Şimdi geceye yanında götüreceğin sakin bir görüntü seç. Gün batımında deniz, bir pencerede yanan sıcak bir lamba ya da avucundaki o pürüzsüz taş olabilir.

Tek bir görüntü, sade ve huzurlu. Ayrıntılarına bak: renklerine, ışığına, sessizliğine.

Onu zihninde usulca tut. Yumuşak toprağa bir tohum bırakır gibi. Bir şey yapmana gerek yok. Sadece orada dursun. Bu görüntü bu gece seninle olacak.

Nefes al… ve verirken bugünü bırak. Bugün ne olduysa oldu. Yarın, zamanı gelince gelecek.

Bugünden aklında kalanlar varsa onları da sahildeki kuma bırak. Dalgalar onları yavaşça alıp götürsün. Yapamadıkların, söyleyemediklerin… hepsi şimdilik bekleyebilir.

Bugün sana iyi gelen küçük bir şeyi düşün. Çok küçük olabilir. Sıcak bir çay, güzel bir söz… ya da şu an rahatça nefes alıyor olman.

Bu şükran göğsüne yerleşsin. Sıcak ve sessiz. Küçük şeyler bir günü taşımaya yeter.

Bedenini bir kez daha hisset. Ayakların ağır, bacakların ağır, kolların ağır. Yatağın ya da oturduğun yer seni bütünüyle taşıyor.

Dalgalar artık iyice yavaş. Işık soluyor. Her şey sessizleşiyor… sen de. İlk yıldızlar gökyüzünde belirmeye başlıyor.

Seçtiğin görüntüye bir kez daha bak. Hâlâ orada, sakin ve sıcak.

Uyumaya hazırlanıyorsan nefesin yavaş ve rahat kalsın. Seçtiğin görüntü uykuya dalarken seninle olsun.

Bugün yeterince yaptın. Artık dinlenebilirsin.

Gece seni yumuşak bir örtü gibi sarıyor. Bırak, gerisini o halletsin. Nefesin yavaş, bedenin ağır, zihnin sakin.

Huzurlu bir gece geçir, iyi geceler.`,
    `On your quiet beach, the day is ending. The sky slowly turns orange, then purple. The sun sinks slowly toward the sea and leaves a golden path on the water.

Breathe in slowly. Let your body grow heavy and relaxed. Let your shoulders go and loosen your jaw.

The waves come more slowly now. The wind has dropped. The sand still holds the warmth of the day. The distant sound of the waves is like a lullaby.

Now choose one calm image to take with you into the night. The sea at sunset, a warm lamp glowing in a window, or that smooth stone in your palm.

A single image, simple and peaceful. Look at its details: its colors, its light, its silence.

Hold it gently in your mind, like placing a seed in soft earth. You do not need to do anything with it. Just let it rest there. This image will be with you tonight.

Breathe in… and as you breathe out, let the day go. Whatever happened today has happened. Tomorrow will come in its own time.

If anything from today is still on your mind, leave it in the sand on the shore. Let the waves slowly carry it away. What you did not get done, what you did not say… all of it can wait for now.

Think of one small thing that did you good today. It can be very small. A warm cup of tea, a kind word… or simply that you are breathing easily right now.

Let this gratitude settle in your chest. Warm and quiet. Small things are enough to carry a day.

Feel your body once more. Your feet are heavy, your legs are heavy, your arms are heavy. Your bed, or wherever you are, is holding all of you.

The waves are very slow now. The light is fading. Everything is growing quiet… and so are you. The first stars begin to appear in the sky.

Look once more at the image you chose. It is still there, calm and warm.

If you are getting ready to sleep, let your breath stay slow and easy. Let the image you chose stay with you as you fall asleep.

You have done enough today. Now you can rest.

The night wraps around you like a soft blanket. Let it take care of the rest. Your breath is slow, your body heavy, your mind calm.

Have a peaceful night. Good night.`,
    `En tu playa tranquila termina el día. El cielo se vuelve poco a poco naranja y luego violeta. El sol baja despacio hacia el mar y deja un camino dorado sobre el agua.

Inspira despacio. Deja que el cuerpo se vuelva pesado y se relaje. Suelta los hombros y afloja la mandíbula.

Las olas llegan ahora más despacio. El viento ha amainado. La arena aún guarda el calor del día. El sonido lejano de las olas es como una nana.

Ahora elige una imagen tranquila para llevarte a la noche. El mar al atardecer, una lámpara cálida en una ventana o esa piedra lisa en tu mano.

Una sola imagen, sencilla y serena. Mira sus detalles: sus colores, su luz, su silencio.

Sostenla con suavidad en la mente, como quien deja una semilla en tierra blanda. No tienes que hacer nada con ella. Solo deja que descanse ahí. Esta imagen te acompañará esta noche.

Inspira… y al espirar suelta el día. Lo que pasó hoy ya pasó. Mañana llegará a su tiempo.

Si algo de hoy sigue en tu mente, déjalo en la arena de la orilla. Que las olas se lo lleven despacio. Lo que no hiciste, lo que no dijiste… todo puede esperar por ahora.

Piensa en una cosa pequeña que hoy te haya sentado bien. Puede ser muy pequeña. Un té caliente, una palabra amable… o simplemente que ahora respiras con tranquilidad.

Deja que esa gratitud se asiente en tu pecho. Cálida y silenciosa. Las cosas pequeñas bastan para sostener un día.

Siente el cuerpo una vez más. Los pies pesan, las piernas pesan, los brazos pesan. La cama, o donde estés, te sostiene por completo.

Las olas son ya muy lentas. La luz se apaga. Todo se vuelve más silencioso… y tú también. Las primeras estrellas empiezan a aparecer en el cielo.

Mira una vez más la imagen que elegiste. Sigue ahí, tranquila y cálida.

Si te estás preparando para dormir, deja que la respiración siga lenta y suave. Que la imagen que elegiste te acompañe mientras te duermes.

Hoy has hecho suficiente. Ahora puedes descansar.

La noche te envuelve como una manta suave. Deja que ella se ocupe del resto. La respiración lenta, el cuerpo pesado, la mente en calma.

Que tengas una noche tranquila. Buenas noches.`,
    `Sulla tua spiaggia tranquilla il giorno sta finendo. Il cielo diventa piano arancione, poi viola. Il sole scende lento verso il mare e lascia una strada dorata sull’acqua.

Inspira lentamente. Lascia che il corpo diventi pesante e rilassato. Lascia andare le spalle e rilassa la mascella.

Ora le onde arrivano più lente. Il vento si è calmato. La sabbia conserva ancora il calore del giorno. Il suono lontano delle onde è come una ninna nanna.

Ora scegli un’immagine calma da portare con te nella notte. Il mare al tramonto, una lampada calda accesa a una finestra, o quella pietra liscia nel palmo.

Una sola immagine, semplice e serena. Guarda i suoi dettagli: i colori, la luce, il silenzio.

Tienila piano nella mente, come si posa un seme nella terra morbida. Non devi farci niente. Lasciala solo riposare lì. Questa immagine sarà con te stanotte.

Inspira… e mentre espiri, lascia andare la giornata. Quello che è successo oggi è successo. Domani arriverà con i suoi tempi.

Se qualcosa di oggi è ancora nella mente, lascialo nella sabbia sulla riva. Lascia che le onde lo portino via piano. Quello che non hai fatto, quello che non hai detto… tutto può aspettare, per ora.

Pensa a una piccola cosa che oggi ti ha fatto bene. Può essere piccolissima. Una tazza di tè caldo, una parola gentile… o semplicemente il fatto che adesso respiri con facilità.

Lascia che questa gratitudine si posi nel petto. Calda e silenziosa. Le piccole cose bastano a portare una giornata.

Senti ancora una volta il corpo. I piedi sono pesanti, le gambe sono pesanti, le braccia sono pesanti. Il letto, o il posto dove sei, ti sostiene completamente.

Ora le onde sono lentissime. La luce si spegne. Tutto diventa silenzioso… e anche tu. Le prime stelle cominciano ad apparire nel cielo.

Guarda ancora una volta l’immagine che hai scelto. È ancora lì, calma e calda.

Se ti stai preparando a dormire, lascia che il respiro resti lento e facile. Lascia che l’immagine scelta ti accompagni nel sonno.

Oggi hai fatto abbastanza. Adesso puoi riposare.

La notte ti avvolge come una coperta morbida. Lascia che si prenda cura del resto. Il respiro è lento, il corpo pesante, la mente calma.

Ti auguro una notte serena. Buonanotte.`,
    `Sakit sahilində gün bitir. Səma yavaş-yavaş narıncı, sonra bənövşəyi rəngə çalır. Günəş dənizə doğru yavaşca enir və suyun üstündə qızılı bir yol buraxır.

Yavaşca nəfəs al. Qoy bədənin ağırlaşsın, boşalsın. Çiyinlərini burax, çənəni boşalt.

Dalğalar artıq daha yavaş gəlir. Külək kəsilib. Qum hələ də günün istiliyini saxlayır. Uzaqdan gələn dalğa səsi layla kimidir.

İndi gecəyə özünlə aparacağın sakit bir görüntü seç. Gün batanda dəniz, bir pəncərədə yanan isti lampa, ya da ovucundakı o hamar daş ola bilər.

Tək bir görüntü, sadə və dinc. Onun detallarına bax: rənglərinə, işığına, sükutuna.

Onu zehnində yumşaqca saxla. Yumşaq torpağa toxum əkən kimi. Heç nə etməyə ehtiyac yoxdur. Qoy sadəcə orada qalsın. Bu görüntü bu gecə səninlə olacaq.

Nəfəs al… və verəndə bu günü burax. Bu gün nə olubsa, olub. Sabah vaxtı çatanda gələcək.

Bu gündən ağlında qalan nəsə varsa, onu da sahildəki quma burax. Qoy dalğalar onu yavaşca alıb aparsın. Edə bilmədiklərin, deyə bilmədiklərin… hamısı hələlik gözləyə bilər.

Bu gün sənə xoş gələn kiçik bir şeyi düşün. Çox kiçik ola bilər. İsti bir çay, xoş bir söz… ya da indi rahat nəfəs alman.

Qoy bu minnətdarlıq sinənə yerləşsin. İsti və sakit. Kiçik şeylər bir günü daşımağa kifayət edir.

Bədənini bir dəfə də hiss et. Ayaqların ağırdır, dizlərin ağırdır, qolların ağırdır. Yatağın, ya da oturduğun yer səni bütünlüklə saxlayır.

Dalğalar artıq lap yavaşdır. İşıq solur. Hər şey sakitləşir… sən də. Səmada ilk ulduzlar görünməyə başlayır.

Seçdiyin görüntüyə bir dəfə də bax. Hələ də oradadır, sakit və isti.

Yatmağa hazırlaşırsansa, nəfəsin yavaş və rahat qalsın. Seçdiyin görüntü yuxuya gedərkən səninlə olsun.

Bu gün kifayət qədər etdin. İndi dincələ bilərsən.

Gecə səni yumşaq bir örtük kimi bürüyür. Burax, qalanını o həll etsin. Nəfəsin yavaş, bədənin ağır, zehnin sakitdir.

Rahat bir gecə keçir. Gecən xeyrə qalsın.`,
    `На твоём тихом берегу заканчивается день. Небо медленно становится оранжевым, а потом сиреневым. Солнце медленно опускается к морю и оставляет на воде золотую дорожку.

Медленно вдохни. Пусть тело тяжелеет и расслабляется. Отпусти плечи, расслабь челюсть.

Волны приходят всё медленнее. Ветер стих. Песок ещё хранит тепло дня. Далёкий шум волн похож на колыбельную.

Теперь выбери спокойную картинку, которую возьмёшь с собой в ночь. Море на закате, тёплая лампа в окне или тот гладкий камень на ладони.

Одна картинка, простая и тихая. Посмотри на её детали: цвета, свет, тишину.

Мягко держи её в мыслях. Как семечко, которое опускают в мягкую землю. Ничего не нужно с ней делать. Пусть просто будет. Эта картинка будет с тобой этой ночью.

Вдохни… и на выдохе отпусти этот день. Что было сегодня, то было. Завтра придёт в своё время.

Если что-то из сегодняшнего дня ещё в мыслях, оставь это на песке у воды. Пусть волны медленно унесут это. Несделанное, несказанное… всё это пока может подождать.

Вспомни одну маленькую хорошую вещь за сегодня. Совсем маленькую. Тёплый чай, доброе слово… или то, что сейчас ты спокойно дышишь.

Пусть эта благодарность поселится в груди. Тёплая и тихая. Маленьких вещей достаточно, чтобы прожить день.

Ещё раз почувствуй тело. Стопы тяжёлые, ноги тяжёлые, руки тяжёлые. Кровать или то, на чём ты сидишь, держит тебя целиком.

Волны теперь совсем медленные. Свет гаснет. Всё затихает… и ты тоже. На небе появляются первые звёзды.

Ещё раз посмотри на выбранную картинку. Она всё ещё здесь, спокойная и тёплая.

Если ты ложишься спать, пусть дыхание остаётся медленным и мягким. Пусть выбранная картинка будет с тобой, пока ты засыпаешь.

На сегодня сделано достаточно. Теперь можно отдыхать.

Ночь укрывает тебя, как мягкое одеяло. Отпусти; остальное она сделает сама. Дыхание медленное, тело тяжёлое, ум спокоен.

Спокойной тебе ночи.`,
  ),
}

/**
 * Where the quiet practice goes in each meditation, by paragraph: after
 * paragraph `i` the narration falls silent for a share of the session that
 * is proportional to the weight. The voice then spans the whole step instead
 * of finishing in two minutes and leaving the rest to the music, and the
 * closing words land at the end. Paragraphs line up across languages.
 */
export const MED_REST: Record<string, Record<number, number>> = {
  'first-settle': { 4: 0.5, 9: 0.5, 10: 1, 11: 1, 12: 1, 13: 1.5, 14: 2 },
  'first-breath': { 4: 0.5, 7: 0.5, 9: 2, 11: 0.5, 12: 0.5, 13: 0.3, 14: 0.3, 15: 1.5 },
  'first-ground': { 2: 0.5, 4: 0.5, 6: 0.5, 8: 0.5, 10: 0.5, 11: 1, 13: 0.5, 14: 1.5 },
  'room-door': { 1: 0.5, 4: 0.5, 6: 0.5, 8: 1, 9: 0.5, 11: 0.5, 12: 1, 14: 1.5 },
  'room-light': { 1: 0.5, 4: 0.5, 6: 0.5, 7: 0.5, 8: 0.5, 9: 0.5, 10: 0.5, 11: 0.5, 12: 0.5, 13: 0.5, 14: 1, 15: 1.5 },
  'room-hands': { 3: 0.5, 5: 0.5, 6: 0.5, 8: 1, 9: 0.5, 10: 0.5, 11: 0.5, 12: 0.5, 13: 0.5, 14: 1.5 },
  'shore-edge': { 2: 0.5, 3: 0.5, 4: 0.5, 6: 0.5, 8: 0.3, 9: 1.5, 10: 0.5, 11: 0.5, 12: 0.5, 13: 0.5, 14: 1.5 },
  'shore-stone': { 1: 0.5, 3: 0.5, 4: 0.5, 5: 0.5, 6: 0.5, 7: 0.5, 8: 0.5, 9: 0.5, 11: 0.5, 12: 0.3, 13: 1.5 },
  'shore-seed': { 1: 0.5, 2: 0.5, 4: 0.5, 5: 0.5, 6: 0.5, 7: 0.5, 9: 0.5, 10: 0.5, 11: 0.5, 12: 0.5, 13: 1.5, 14: 0.5, 15: 1.5 },
}

export function medBody(id: string) {
  return MED_SCRIPTS[id]?.tr ?? ''
}
