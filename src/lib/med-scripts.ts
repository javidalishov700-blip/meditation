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
 * Spoken meditations. One scene each, told as a short story in the present.
 * Not a treatment. No “relax now” orders. No diagnosis. No numbered drills.
 */
export const MED_SCRIPTS: Record<string, Record<LocaleId, string>> = {
  'first-settle': pack(
    `Bu birkaç dakika bir tedavi değil. Sadece bildiğin bir odada duruyorsun; sandalye ya da yatak seni zaten tutuyor ve omurganın bir sütun gibi doğrulmasına gerek yok. Kumaşın dokunuşu var, ısı ya da serinlik var, ve bu duyumlar seni bir yere götürmek zorunda değil — burada kalıyorlar.

Gözlerin kapanabilir ya da yarı açık kalabilir. Odadaki ışık aynı ışık, pencere aynı pencere. Dışarıda bir motor, bir adım, bir boru varsa onlar da bu odanın parçası; onları kapatmana gerek yok, oda onları da tutuyor.

Alnını fark ediyorsun. Kaşların gerilmek zorunda değil. Kapaklar ağırsa ağır kalabilirler. Çene yumuşak durabilir, dişler birbirine kenetlenmek zorunda değil, dil üst dişlerin arkasında küçük bir yerde durabilir. Orası güvenli bir yer, bir görev değil.

Hava burundan giriyor, biraz serin olabilir, çıkarken biraz daha ılık. Bunu bir teknik haline getirmiyorsun. Sadece bu nefesin geldiğini ve gittiğini izliyorsun, hakem gibi değil, odada oturan biri gibi.

Boynun iki yanı ve kulaklar orada. Omuzlar kulaklara yapışmak zorunda değil; aralarında bir milim boşluk olsa da o boşluk yeter. Avuçlar uylukta ya da yanlarda duruyor, parmaklar kıvrılmak zorunda değil. Karın nefesle hafifçe hareket edebilir ve bunu büyütmene gerek yok.

Ayakların yerdeyse yer seni tutuyor: topuk, kemer, parmak uçları aynı anda, bir liste gibi değil, tek bir basınç gibi. Yatıyorsan yatak aynı işi yapıyor. Ağırlık aşağıda durabilir. Yarış yok.

Zihin bir listeye dönerse bu bir hata değil; listeler böyle yapar. Listeyi kovalamıyorsun. Çeneye, bir avuca ya da tabana dönüyorsun, sonra yine bu nefese. İçinden, yavaşça, buradayım diyebilirsin. Kanıt arama. Cümle duyumun yanında duruyor. Oda senin için çalışmıyor; sen odadasın.

Omuzların ağırlığı ve göğsün önü orada. Nefes göğüste daha netse orada kal, burunda daha netse orada. Birkaç nefes daha geçiyor, acele etmeden, sayıyı bir skora çevirmeden. Sesler varsa sesler. Uzak bir kuş, bir kapı, bir adım. Oda onları da tutuyor ve sen de tutuluyorsun.

Zihin yine giderse bir avuca dön: ısı, kenar, kumaş. Sonra alın, çene, avuçlar, tabanlar — hepsi aynı odada, aynı anda. Bunu bir performans haline getirmeyeceksin. Oturduğun yer duruyor. Sen de duruyorsun. Bu birkaç dakika yeter.`,

    `These few minutes are not a treatment. You are simply in a room you know. The chair or the bed is already holding you, and the spine does not have to stand like a column. There is cloth against the skin, heat or cool, and none of this has to take you anywhere. It stays here.

The eyes may close, or stay half open. The light in the room is the same light. The window is the same window. If a motor, a footstep, or a pipe sounds outside, that sound belongs to the room as well. You do not have to shut it out. The room holds it.

You notice the forehead. The brows do not have to tighten. If the lids are heavy, they can stay heavy. The jaw can stay soft. The teeth do not have to lock. The tongue can rest behind the upper teeth, in a small place that does not ask for work.

Air comes in at the nose, a little cool perhaps, and leaves a little warmer. You are not turning this into a technique. You are only watching this breath arrive and leave, not as a referee, but as someone sitting in the room.

The sides of the neck and the ears are there. The shoulders do not have to climb toward the ears; a millimetre of space between them is already enough. The palms rest on the thighs or at the sides, and the fingers do not have to curl. The belly may move a little with the breath. You do not have to make that movement larger.

If the feet are on the floor, the floor is holding you — heel, arch, and toes as one pressure, not as a list. If you are lying down, the bed is doing the same work. Weight can rest low. There is no race.

If the mind returns to a list, that is not a mistake. Lists do that. You do not chase the list. You come back to the jaw, or to one palm, or to the sole, and then to this breath again. Quietly, inside, you may say I am here. Do not look for proof. The sentence stands next to the sensation. The room is not working for you. You are in the room.

The weight of the shoulders and the front of the chest are there. If the breath is clearer in the chest, stay there. If it is clearer at the nose, stay there. A few more breaths pass, without hurry, without turning a count into a score. If there are sounds, there are sounds. A distant bird, a door, a step. The room holds them too, and you are being held as well.

If the mind leaves again, return to one palm: heat, edge, cloth. Then the forehead, the jaw, the palms, the soles — all in the same room, at the same time. You will not turn this into a performance. The place you sit stays. You stay. These few minutes are enough.`,

    `Estos minutos no son un tratamiento. Estás simplemente en una habitación que conoces. La silla o la cama ya te sostiene, y la espalda no tiene que erguirse como una columna. Hay tela contra la piel, calor o fresco, y nada de esto tiene que llevarte a ningún sitio. Se queda aquí.

Los ojos pueden cerrarse o quedar entornados. La luz de la habitación es la misma. La ventana es la misma. Si afuera suena un motor, un paso o una tubería, ese sonido también pertenece a la habitación. No tienes que apagarlo. La habitación lo sostiene.

Notas la frente. Las cejas no tienen que tensarse. Si los párpados están pesados, pueden quedarse pesados. La mandíbula puede quedar suave. Los dientes no tienen que cerrarse con fuerza. La lengua puede descansar detrás de los dientes de arriba, en un sitio pequeño que no pide trabajo.

El aire entra por la nariz, quizá un poco fresco, y sale un poco más tibio. No conviertes esto en una técnica. Solo miras cómo este aliento llega y se va, no como un árbitro, sino como alguien sentado en la habitación.

Los lados del cuello y las orejas están ahí. Los hombros no tienen que subir hacia las orejas; un milímetro de espacio entre ellos ya basta. Las palmas descansan en los muslos o a los lados, y los dedos no tienen que cerrarse. El vientre puede moverse un poco con el aliento. No tienes que agrandar ese movimiento.

Si los pies están en el suelo, el suelo te sostiene: talón, arco y dedos como una sola presión, no como una lista. Si estás tumbada, la cama hace el mismo trabajo. El peso puede quedar abajo. No hay carrera.

Si la mente vuelve a una lista, no es un error. Las listas hacen eso. No persigues la lista. Vuelves a la mandíbula, o a una palma, o a la planta, y luego otra vez a este aliento. Por dentro, despacio, puedes decir estoy aquí. No busques una prueba. La frase está junto a la sensación. La habitación no trabaja para ti. Tú estás en la habitación.

El peso de los hombros y el pecho por delante están ahí. Si el aliento se nota más en el pecho, quédate ahí. Si se nota más en la nariz, quédate ahí. Pasan unos alientos más, sin prisa, sin convertir una cuenta en un marcador. Si hay sonidos, hay sonidos. Un pájaro lejano, una puerta, un paso. La habitación también los sostiene, y a ti también te sostienen.

Si la mente se va otra vez, vuelve a una palma: calor, borde, tela. Luego la frente, la mandíbula, las palmas, las plantas — todo en la misma habitación, al mismo tiempo. No vas a convertir esto en una actuación. El sitio donde estás sigue. Tú sigues. Estos minutos bastan.`,

    `Questi minuti non sono una cura. Sei semplicemente in una stanza che conosci. La sedia o il letto ti tiene già, e la schiena non deve raddrizzarsi come una colonna. C’è stoffa sulla pelle, caldo o fresco, e niente di questo deve portarti da qualche parte. Resta qui.

Gli occhi possono chiudersi o restare socchiusi. La luce della stanza è la stessa. La finestra è la stessa. Se fuori c’è un motore, un passo, un tubo, quel suono appartiene anche alla stanza. Non devi spegnerlo. La stanza lo tiene.

Noti la fronte. Le sopracciglia non devono stringersi. Se le palpebre sono pesanti, possono restare pesanti. La mascella può restare morbida. I denti non devono chiudersi a forza. La lingua può stare dietro i denti di sopra, in un posto piccolo che non chiede lavoro.

L’aria entra dal naso, forse un poco fresca, e esce un poco più tiepida. Non fai di questo una tecnica. Guardi soltanto questo respiro che arriva e se ne va, non come un arbitro, ma come qualcuno seduto nella stanza.

I lati del collo e le orecchie sono lì. Le spalle non devono salire verso le orecchie; un millimetro di spazio tra loro basta già. I palmi restano sulle cosce o ai lati, e le dita non devono chiudersi. La pancia può muoversi un poco con il respiro. Non devi ingrandire quel movimento.

Se i piedi sono a terra, la terra ti tiene: tallone, arco e dita come una sola pressione, non come una lista. Se sei sdraiata, il letto fa lo stesso lavoro. Il peso può stare in basso. Non c’è una gara.

Se la mente torna a una lista, non è un errore. Le liste fanno così. Non insegui la lista. Torni alla mascella, o a un palmo, o alla pianta, e poi di nuovo a questo respiro. Dentro, piano, puoi dire sono qui. Non cercare una prova. La frase sta accanto alla sensazione. La stanza non lavora per te. Tu sei nella stanza.

Il peso delle spalle e il petto davanti sono lì. Se il respiro è più chiaro nel petto, resta lì. Se è più chiaro al naso, resta lì. Passano ancora alcuni respiri, senza fretta, senza fare del conto un punteggio. Se ci sono suoni, ci sono suoni. Un uccello lontano, una porta, un passo. La stanza li tiene anche, e anche tu sei tenuta.

Se la mente parte di nuovo, torna a un palmo: calore, bordo, stoffa. Poi la fronte, la mascella, i palmi, le piante — tutti nella stessa stanza, nello stesso momento. Non farai di questo una recita. Il posto dove sei resta. Tu resti. Questi minuti bastano.`,

    `Bu bir neçə dəqiqə müalicə deyil. Sadəcə tanıdığın bir otaqdasan; stul və ya çarpayı səni artıq tutur və onurğanın sütun kimi dik durmasına ehtiyac yoxdur. Dərinin üzərində parça var, istilik və ya sərinlik var, və bunların heç biri səni bir yerə aparmaq məcburiyyətində deyil — burada qalırlar.

Gözlər bağlana bilər, yarıaçıq da qala bilər. Otaqdakı işıq eyni işıqdır, pəncərə eyni pəncərədir. Çöldə motor, addım, boru varsa o səs də bu otağın parçasıdır; onları bağlamağa ehtiyac yoxdur, otaq onları da tutur.

Alnını duyursan. Qaşlar gərilmək məcburiyyətində deyil. Qapaqlar ağırdırsa ağır qala bilər. Çənə yumşaq dura bilər, dişlər sıxılmaq məcburiyyətində deyil, dil üst dişlərin arxasında kiçik bir yerdə dura bilər. Orası təhlükəsiz bir yerdir, vəzifə deyil.

Hava burundan girir, bir az sərin ola bilər, çıxanda bir az ilıq. Bunu texnikaya çevirmirsən. Yalnız bu nəfəsin gəldiyini və getdiyini izləyirsən, hakim kimi yox, otaqda oturan biri kimi.

Boyunun iki yanı və qulaqlar oradadır. Çiyinlər qulaqlara yapışmaq məcburiyyətində deyil; aralarında bir milim boşluq olsa da o boşluq bəsdir. Ovuc budda və ya yanlarda durur, barmaqlar bükülmək məcburiyyətində deyil. Qarın nəfəslə bir az hərəkət edə bilər və bunu böyütməyə ehtiyac yoxdur.

Ayaqlar yerdədirsə yer səni tutur: daban, tağ, barmaq ucları bir siyahı kimi yox, tək bir təzyiq kimi. Uzanırsansa çarpayı eyni işi görür. Ağırlıq aşağıda dura bilər. Yarış yoxdur.

Ağıl siyahıya qayıdarsa bu səhv deyil; siyahılar belə edir. Siyahını qovmursan. Çənəyə, bir ovuca və ya ayaq altına qayıdırsan, sonra yenə bu nəfəsə. İçindən, yavaşca, buradayam deyə bilərsən. Sübut axtarma. Cümlə duyumun yanında durur. Otaq sənin üçün işləmir; sən otaqdasan.

Çiyinlərin ağırlığı və sinənin önü oradadır. Nəfəs sinədə daha aydındırsa orada qal, burunda daha aydındırsa orada. Daha bir neçə nəfəs keçir, tələsmədən, sayımı xala çevirmədən. Səs varsa səs. Uzaq quş, qapı, addım. Otaq onları da tutur və sən də tutulursan.

Ağıl yenə getsə bir ovuca qayıt: istilik, kənar, parça. Sonra alın, çənə, ovuc, ayaq altı — hamısı eyni otaqda, eyni anda. Bunu tamaşa etməyəcəksən. Oturduğun yer durur. Sən də durursan. Bu dəqiqələr bəsdir.`,

    `Эти несколько минут — не лечение. Ты просто в комнате, которую знаешь. Стул или кровать уже держит тебя, и позвоночнику не нужно выпрямляться колонной. Есть ткань на коже, тепло или прохлада, и ничто из этого не должно уводить тебя куда-то. Оно остаётся здесь.

Глаза могут закрыться или остаться полуоткрытыми. Свет в комнате тот же. Окно то же. Если снаружи мотор, шаг или труба — этот звук тоже принадлежит комнате. Тебе не нужно его выключать. Комната его держит.

Ты замечаешь лоб. Бровям не нужно напрягаться. Если веки тяжёлые, они могут остаться тяжёлыми. Челюсть может оставаться мягкой. Зубам не нужно сжиматься. Язык может лежать за верхними зубами, в маленьком месте, которое не просит работы.

Воздух входит через нос, возможно чуть прохладный, и выходит чуть теплее. Ты не делаешь из этого технику. Ты только смотришь, как это дыхание приходит и уходит — не как судья, а как человек, который сидит в комнате.

Стороны шеи и уши на месте. Плечам не нужно подниматься к ушам; миллиметра пространства между ними уже достаточно. Ладони лежат на бёдрах или по бокам, и пальцам не нужно сжиматься. Живот может чуть двигаться с дыханием. Увеличивать это движение не нужно.

Если стопы на полу — пол держит тебя: пятка, свод и пальцы как одно давление, не как список. Если ты лежишь — кровать делает ту же работу. Вес может оставаться внизу. Гонки нет.

Если ум возвращается к списку — это не ошибка. Списки так делают. Ты не гонишься за списком. Ты возвращаешься к челюсти, или к одной ладони, или к стопе, а потом снова к этому дыханию. Внутри, тихо, можно сказать: я здесь. Не ищи доказательства. Предложение стоит рядом с ощущением. Комната не работает на тебя. Ты в комнате.

Вес плеч и перед груди на месте. Если дыхание яснее в груди — останься там. Если яснее в носу — там. Проходят ещё несколько дыханий, без спешки, без превращения счёта в очки. Если есть звуки — есть звуки. Далёкая птица, дверь, шаг. Комната держит и их, и тебя тоже держат.

Если ум снова ушёл — вернись к одной ладони: тепло, край, ткань. Потом лоб, челюсть, ладони, стопы — всё в одной комнате, в одно время. Ты не сделаешь из этого представление. Место, где ты сидишь, остаётся. Ты остаёшься. Этих минут достаточно.`,
  ),

  'first-breath': pack(
    `Bu birkaç dakika bir tedavi değil ve nefesi bir projeye çevirmeyeceksin. Hava zaten geliyor, hava zaten gidiyor. Sen hakem değilsin. Odada oturan, yumuşak bir seyirci gibisin.

Nefesin daha net olduğu bir yer var: burun delikleri, üst dudak, göğsün önü, kaburgaların yanları ya da karın. Doğru bir yer yok; net olan yer var. Orada kalıyorsun.

Alışta göğüs hafifçe genişleyebilir, verişte kendi kendine iner. Uzun yapmak zorunda değilsin, kısa yapmak zorunda değilsin. Ritmi düzeltmiyorsun. Bu nefes bu nefes, bir sonrakine yetişmeden.

Zihin bir cümleye giderse, o cümle de nefes gibi gelir ve gider. Onu kovalamıyorsun. Bir verişe dönüyorsun, havanın bittiği yere. Omuzlar o verişte bir şey kanıtlamak zorunda değil; inebilirler, inmezlerse de olur.

Veriş kendiliğinden biraz uzunsa uzun, değilse değil. Çekerek uzatmıyorsun. İki nefes boyunca sadece izliyorsun. İçinden izliyorum, yönetmiyorum diyebilirsin. Bu bir slogan değil. Avuçlar duruyor, tabanlar duruyor, nefes geçiyor.

Burun ucunda alışta bir serinlik, verişte biraz daha ılık bir fark olabilir. Küçük bir fark. Yeter. Zihin plan yaparsa planı izlemiyorsun; plan sonra da durur. Şimdi bir veriş yeter. Boyun ve çene orada, nefes onları düzeltmek zorunda değil. Onlar duruyor, nefes geçiyor.

Alıştan sonra küçük bir boşluk olabilir, verişten sonra da. Boşluk varsa boşluk. Doldurmuyorsun. Hava bitmesin diye yarışmıyorsun. Akciğerler işini biliyor.

Omuzlar, karın, burun — hepsi aynı odada. Son nefesleri bir skora çevirmeden izliyorsun, bitene kadar. Oda duruyor. Sen duruyorsun. Nefes durmuyor, geçiyor. Bu izlemek yeter.`,

    `These few minutes are not a treatment, and you will not turn the breath into a project. Air is already arriving. Air is already leaving. You are not the referee. You are a watcher in the room, a soft one.

There is a place where the breath is clearer: the nostrils, the upper lip, the front of the chest, the sides of the ribs, or the belly. There is no correct place. There is the place that is clear. You stay there.

On the in-breath the chest may widen a little. On the out-breath it falls on its own. You do not have to make it long. You do not have to make it short. You are not correcting the rhythm. This breath is this breath, without catching up to the next one.

If the mind goes to a sentence, that sentence also arrives and leaves, like breath. You do not chase it. You return to one exhale, to the place where the air ends. The shoulders do not have to prove anything on that exhale. They may drop. If they do not, that is all right.

If the exhale is a little longer by itself, it is longer. If not, not. You do not pull it to make it long. For a couple of breaths you only watch. Inside you may say I am watching, I am not managing. This is not a slogan. The palms stay. The soles stay. The breath passes.

At the tip of the nose there may be cool on the way in and a little more warmth on the way out. A small difference. Enough. If the mind makes a plan, you do not follow the plan. The plan can wait. Right now one exhale is enough. The neck and the jaw are there. The breath does not have to fix them. They stay. The breath passes.

After the in-breath there may be a small gap, and after the out-breath as well. If there is a gap, there is a gap. You do not fill it. You do not race so the air will not run out. The lungs know the work.

Shoulders, belly, nose — all in the same room. You watch the last breaths without turning a count into a score, until they finish. The room stays. You stay. The breath does not stay. It passes. Watching is enough.`,

    `Estos minutos no son un tratamiento, y no vas a convertir el aliento en un proyecto. El aire ya llega. El aire ya se va. No eres árbitro. Eres quien mira en la habitación, con suavidad.

Hay un sitio donde el aliento se nota más: las fosas, el labio de arriba, el pecho por delante, los lados de las costillas o el vientre. No hay un sitio correcto. Hay el sitio claro. Te quedas ahí.

Al entrar, el pecho puede ensancharse un poco. Al salir, baja solo. No tienes que alargarlo. No tienes que acortarlo. No corriges el ritmo. Este aliento es este aliento, sin alcanzar el siguiente.

Si la mente se va a una frase, esa frase también llega y se va, como el aliento. No la persigues. Vuelves a una exhalación, al sitio donde el aire termina. Los hombros no tienen que demostrar nada en esa exhalación. Pueden bajar. Si no bajan, está bien.

Si la exhalación es un poco más larga sola, es más larga. Si no, no. No la estiras. Durante un par de alientos solo miras. Por dentro puedes decir miro, no gestiono. Esto no es un lema. Las palmas están. Las plantas están. El aliento pasa.

En la punta de la nariz puede haber fresco al entrar y un poco más de calor al salir. Una diferencia pequeña. Basta. Si la mente hace un plan, no sigues el plan. El plan puede esperar. Ahora una exhalación basta. El cuello y la mandíbula están ahí. El aliento no tiene que arreglarlos. Ellos están. El aliento pasa.

Después de entrar puede haber un hueco pequeño, y después de salir también. Si hay un hueco, hay un hueco. No lo llenas. No corres para que no se acabe el aire. Los pulmones saben el trabajo.

Hombros, vientre, nariz: todo en la misma habitación. Miras los últimos alientos sin convertir una cuenta en un marcador, hasta que terminen. La habitación sigue. Tú sigues. El aliento no se queda: pasa. Mirar basta.`,

    `Questi minuti non sono una cura, e non farai del respiro un progetto. L’aria sta già arrivando. L’aria sta già andando. Non sei l’arbitro. Sei chi guarda nella stanza, con dolcezza.

C’è un punto in cui il respiro è più chiaro: le narici, il labbro di sopra, il petto davanti, i lati delle costole o la pancia. Non c’è un punto giusto. C’è il punto chiaro. Restici.

All’ingresso il petto può allargarsi un poco. All’uscita scende da solo. Non devi allungarlo. Non devi accorciarlo. Non correggi il ritmo. Questo respiro è questo respiro, senza rincorrere il prossimo.

Se la mente va a una frase, anche quella frase arriva e se ne va, come il respiro. Non la insegui. Torni a un’espirazione, al punto in cui l’aria finisce. Le spalle non devono dimostrare niente in quell’espirazione. Possono scendere. Se non scendono, va bene.

Se l’espirazione è un poco più lunga da sola, è più lunga. Se no, no. Non la tiri. Per un paio di respiri guardi soltanto. Dentro puoi dire guardo, non gestisco. Non è uno slogan. I palmi restano. Le piante restano. Il respiro passa.

Sulla punta del naso può esserci fresco all’ingresso e un poco più di caldo all’uscita. Una piccola differenza. Basta. Se la mente fa un piano, non segui il piano. Il piano può aspettare. Adesso un’espirazione basta. Il collo e la mascella sono lì. Il respiro non deve aggiustarli. Restano. Il respiro passa.

Dopo l’ingresso può esserci un piccolo spazio, e dopo l’uscita anche. Se c’è uno spazio, c’è uno spazio. Non lo riempi. Non corri perché l’aria non finisca. I polmoni sanno il lavoro.

Spalle, pancia, naso: tutto nella stessa stanza. Guardi gli ultimi respiri senza fare del conto un punteggio, finché finiscono. La stanza resta. Tu resti. Il respiro non resta: passa. Guardare basta.`,

    `Bu bir neçə dəqiqə müalicə deyil və nəfəsi layihəyə çevirməyəcəksən. Hava artıq gəlir, hava artıq çıxır. Sən hakim deyilsən. Otaqda oturan, yumşaq bir tamaşaçısan.

Nəfəsin daha aydın olduğu bir yer var: burun dəlikləri, üst dodaq, sinənin önü, qabırğaların yanı və ya qarın. Düzgün yer yoxdur; aydın olan yer var. Orada qalırsan.

Alışda sinə bir az açıla bilər, verişdə öz-özünə enir. Uzun etmək məcburiyyətində deyilsən, qısa etmək məcburiyyətində deyilsən. Ritmi düzəltmirsən. Bu nəfəs bu nəfəsdir, növbətiyə çatmadan.

Ağıl bir cümləyə getsə, o cümlə də nəfəs kimi gəlir və gedir. Onu qovmursan. Bir verişə qayıdırsan, havanın bitdiyi yerə. Çiyinlər o verişdə bir şey sübut etmək məcburiyyətində deyil; enə bilər, enməsə də olar.

Veriş öz-özünə bir az uzundursa uzundur, deyilsə deyil. Çəkərək uzatmırsan. İki nəfəs boyu yalnız izləyirsən. İçindən izləyirəm, idarə etmirəm deyə bilərsən. Bu şüar deyil. Ovuc durur, ayaq altı durur, nəfəs keçir.

Burun ucunda alışda sərinlik, verişdə bir az ilıq fərq ola bilər. Kiçik fərq. Bəsdir. Ağıl plan qurarsa planı izləmirsən; plan sonra da durar. İndi bir veriş bəsdir. Boyun və çənə oradadır, nəfəs onları düzəltmək məcburiyyətində deyil. Onlar durur, nəfəs keçir.

Alışdan sonra kiçik bir boşluq ola bilər, verişdən sonra da. Boşluq varsa boşluq. Doldurmursan. Hava bitməsin deyə yarışmırsan. Ağciyərlər işini bilir.

Çiyinlər, qarın, burun — hamısı eyni otaqda. Son nəfəsləri xala çevirmədən izləyirsən, bitənə qədər. Otaq durur. Sən durursan. Nəfəs durmur, keçir. İzləmək bəsdir.`,

    `Эти несколько минут — не лечение, и ты не сделаешь из дыхания проект. Воздух уже приходит. Воздух уже уходит. Ты не судья. Ты зритель в комнате, мягкий зритель.

Есть место, где дыхание яснее: ноздри, верхняя губа, перед груди, бока рёбер или живот. Правильного места нет. Есть ясное место. Ты остаёшься там.

На вдохе грудь может чуть расшириться. На выдохе она опускается сама. Не нужно делать его длинным. Не нужно делать его коротким. Ты не правишь ритм. Это дыхание — это дыхание, без погони за следующим.

Если ум уходит в фразу, эта фраза тоже приходит и уходит, как дыхание. Ты не гонишься за ней. Ты возвращаешься к одному выдоху, к месту, где воздух кончается. Плечам не нужно ничего доказывать на этом выдохе. Они могут опуститься. Если нет — тоже хорошо.

Если выдох чуть длиннее сам по себе — он длиннее. Если нет — нет. Ты не тянешь его. Пару дыханий ты только смотришь. Внутри можно сказать: я смотрю, я не управляю. Это не лозунг. Ладони остаются. Стопы остаются. Дыхание проходит.

На кончике носа на вдохе может быть прохлада, на выдохе — чуть теплее. Маленькая разница. Достаточно. Если ум строит план — ты не идёшь за планом. План может подождать. Сейчас одного выдоха достаточно. Шея и челюсть на месте. Дыханию не нужно их чинить. Они остаются. Дыхание проходит.

После вдоха может быть маленький промежуток, и после выдоха тоже. Если есть промежуток — есть промежуток. Ты его не заполняешь. Ты не гонишься, чтобы воздух не кончился. Лёгкие знают работу.

Плечи, живот, нос — всё в одной комнате. Ты смотришь последние дыхания, не превращая счёт в очки, пока они не закончатся. Комната остаётся. Ты остаёшься. Дыхание не остаётся — проходит. Смотреть достаточно.`,
  ),

  'first-ground': pack(
    `Bu birkaç dakika bir tedavi değil. İki taban ve yer — bu kadar basit ve bu kadar gerçek. Ayakların yerdeyse topuk, kemer ve parmaklar aynı anda basıyor. Çorap varsa çorap, çıplaksa çıplak. Daha sert basmıyorsun, sayı tutmuyorsun. Sadece basınç var. Yer seni tutuyor. Sen yeri tutmak zorunda değilsin.

Yatıyorsan topuklar yatakta, baldırlar, kalça, kürek kemikleri yatakla konuşuyor. Yatak da bir yer. O da tutuyor.

Her verişte ağırlık milim aşağı inebilir. İnmezse inmez. Yarış yok. İçinden tabanlarım yerde diyebilirsin. Kanıt arama. Cümle duyumun yanında duruyor.

Sol taban ve sağ taban aynı olmak zorunda değil. Biri daha net olabilir ve o yeter. Dizlerin ağırlığı aşağıda, kalçalar sandalyede ya da yatakta, pelvis duruyor. Zorunlu bir imge yok. Sadece ağırlık.

Eller de bir yer: avuçlar uylukta ya da yanlarda, parmak uçları kumaşa değiyor. Zihin gerçek gibi değil derse tartışmıyorsun. Tabanlara dönüyorsun. Basınç, kumaş, ısı. Birkaç nefes orada kalıyor.

Ayak bileklerinde ince kemikler var. Çorabın lastiği varsa lastik, ayakkabı varsa ayakkabının içi. Detay küçük ve detay gerçek. Omurga dik durmak zorunda değil. Bir milim kambur olsa da yer duruyor. İçinden yine: yer tutuyor, ben duruyorum.

Başın ağırlığı boyunda, boyun omuzlarda, omuzlar gövdede, gövde kalçada, kalça yerde. Bunu bir zinciri kırmak için değil, fark etmek için izliyorsun. Zihin geleceğe, geçmişe ya da bir listeye giderse dönüş hep aynı: sol taban, sağ taban, ikisi birden, bir formül gibi değil, yerin seni tuttuğu haber gibi.

Ayaklar duruyor, yer duruyor, oda duruyor, sen duruyorsun. Yeri bir sınav haline getirmeyeceksin. Tabanlar duruyor. Yer duruyor. Sen de.`,

    `These few minutes are not a treatment. Two soles and the ground — this simple, and this actual. If the feet are on the floor, heel, arch, and toes press at once. If there are socks, socks. If bare, bare. You are not pressing harder. You are not counting. There is only pressure. The ground holds you. You do not have to hold the ground.

If you are lying down, the heels, the calves, the hips, and the shoulder blades are speaking with the bed. A bed is also ground. It holds too.

On each exhale the weight may drop a millimetre. If it does not, it does not. No race. Inside you may say my soles are on the floor. Do not look for proof. The sentence stands next to the sensation.

The left sole and the right sole do not have to match. One may be clearer, and that is enough. The weight of the knees is downward. The hips are in the chair or the bed. The pelvis stays. There is no required image. Only weight.

The hands are also a place: palms on the thighs or at the sides, fingertips against cloth. If the mind says this does not feel real, you do not argue. You return to the soles. Pressure, cloth, heat. A few breaths stay there.

There are thin bones at the ankles. If there is the elastic of a sock, there is the elastic. If there are shoes, there is the inside of the shoe. The detail is small, and the detail is actual. The spine does not have to sit upright. A millimetre of curve, and the ground still stays. Inside again: the ground holds, I stay.

The weight of the head rests in the neck, the neck in the shoulders, the shoulders in the torso, the torso in the hips, the hips on the ground. You watch this not to break a chain, only to notice it. If the mind goes to the future, the past, or a list, the way back is the same: left sole, right sole, both at once — not like a formula, like the news that the ground is holding you.

The feet stay. The ground stays. The room stays. You stay. You will not turn the ground into an exam. The soles stay. The ground stays. So do you.`,

    `Estos minutos no son un tratamiento. Dos plantas y el suelo: así de simple y así de real. Si los pies están en el suelo, el talón, el arco y los dedos apoyan a la vez. Si hay calcetines, calcetines. Si estás descalza, descalza. No aprietas más. No cuentas. Solo hay presión. El suelo te sostiene. Tú no tienes que sostener el suelo.

Si estás tumbada, los talones, las pantorrillas, las caderas y los omóplatos hablan con la cama. Una cama también es suelo. También sostiene.

En cada exhalación el peso puede bajar un milímetro. Si no baja, no baja. Sin carrera. Por dentro puedes decir mis plantas están en el suelo. No busques una prueba. La frase está junto a la sensación.

La planta izquierda y la derecha no tienen que ser iguales. Una puede ser más clara, y basta. El peso de las rodillas va hacia abajo. Las caderas están en la silla o en la cama. La pelvis está. No hay una imagen obligatoria. Solo peso.

Las manos también son un sitio: palmas en los muslos o a los lados, yemas contra la tela. Si la mente dice que no se siente real, no discutas. Vuelves a las plantas. Presión, tela, calor. Unos alientos se quedan ahí.

En los tobillos hay huesos finos. Si hay el elástico de un calcetín, está el elástico. Si hay zapatos, está el interior. El detalle es pequeño y el detalle es real. La columna no tiene que estar erguida. Un milímetro de curva, y el suelo sigue. Por dentro otra vez: el suelo sostiene, yo me quedo.

El peso de la cabeza está en el cuello, el cuello en los hombros, los hombros en el tronco, el tronco en las caderas, las caderas en el suelo. No miras esto para romper una cadena, solo para notarla. Si la mente se va al futuro, al pasado o a una lista, el regreso es el mismo: planta izquierda, planta derecha, las dos a la vez — no como una fórmula, como la noticia de que el suelo te sostiene.

Los pies siguen. El suelo sigue. La habitación sigue. Tú sigues. No vas a convertir el suelo en un examen. Las plantas siguen. El suelo sigue. Tú también.`,

    `Questi minuti non sono una cura. Due piante e la terra: così semplice e così vero. Se i piedi sono a terra, tallone, arco e dita premono insieme. Se ci sono calzini, calzini. Se sei scalza, scalza. Non premi più forte. Non conti. C’è solo pressione. La terra ti tiene. Tu non devi tenere la terra.

Se sei sdraiata, i talloni, i polpacci, i fianchi e le scapole parlano con il letto. Un letto è anche terra. Tiene anche lui.

A ogni espirazione il peso può scendere di un millimetro. Se non scende, non scende. Niente gara. Dentro puoi dire le piante sono a terra. Non cercare una prova. La frase sta accanto alla sensazione.

La pianta sinistra e la destra non devono essere uguali. Una può essere più chiara, e basta. Il peso delle ginocchia va in basso. I fianchi sono sulla sedia o sul letto. Il bacino resta. Nessuna immagine obbligatoria. Solo peso.

Anche le mani sono un luogo: palmi sulle cosce o ai lati, punte contro la stoffa. Se la mente dice che non sembra reale, non discuti. Torni alle piante. Pressione, stoffa, calore. Qualche respiro resta lì.

Alle caviglie ci sono ossa sottili. Se c’è l’elastico del calzino, c’è l’elastico. Se ci sono scarpe, c’è l’interno. Il dettaglio è piccolo e il dettaglio è vero. La schiena non deve stare dritta. Un millimetro di curva, e la terra resta. Dentro di nuovo: la terra tiene, io resto.

Il peso della testa sta nel collo, il collo nelle spalle, le spalle nel busto, il busto nei fianchi, i fianchi a terra. Non guardi questo per spezzare una catena, solo per notarla. Se la mente va al futuro, al passato o a una lista, il ritorno è lo stesso: pianta sinistra, pianta destra, tutte e due insieme — non come una formula, come la notizia che la terra ti tiene.

I piedi restano. La terra resta. La stanza resta. Tu resti. Non farai della terra un esame. Le piante restano. La terra resta. Anche tu.`,

    `Bu bir neçə dəqiqə müalicə deyil. İki ayaq altı və yer — bu qədər sadə və bu qədər gerçək. Ayaqlar yerdədirsə daban, tağ və barmaqlar eyni anda basır. Corab varsa corab, çılpaqdırsa çılpaq. Daha bərk basmırsan, say tutmursan. Yalnız təzyiq var. Yer səni tutur. Sən yeri tutmaq məcburiyyətində deyilsən.

Uzanırsansa dabanlar, baldırlar, omba, kürək sümükləri çarpayı ilə danışır. Çarpayı da bir yerdir. O da tutur.

Hər verişdə ağırlıq milim aşağı enə bilər. Enməsə enməz. Yarış yoxdur. İçindən ayaq altım yerdədir deyə bilərsən. Sübut axtarma. Cümlə duyumun yanında durur.

Sol ayaq altı və sağ ayaq altı eyni olmaq məcburiyyətində deyil. Biri daha aydın ola bilər və o bəsdir. Dizlərin ağırlığı aşağıdadır, omba stulda və ya çarpayıda, çanaq durur. Məcburi şəkil yoxdur. Yalnız ağırlıq.

Əllər də bir yerdir: ovuc budda və ya yanlarda, barmaq ucları parçaya dəyir. Ağıl real kimi deyil desə mübahisə etmirsən. Ayaq altına qayıdırsan. Təzyiq, parça, istilik. Bir neçə nəfəs orada qalır.

Biləklərdə incə sümüklər var. Corabın rezinı varsa rezin, ayaqqabı varsa içi. Detal kiçikdir və detal gerçəkdir. Onurğa dik durmaq məcburiyyətində deyil. Bir milim əyri olsa da yer durur. İçindən yenə: yer tutur, mən dururam.

Başın ağırlığı boyunda, boyun çiyində, çiyin gövdədə, gövdə ombada, omba yerdə. Bunu zənciri qırmaq üçün yox, duymaq üçün izləyirsən. Ağıl gələcəyə, keçmişə və ya siyahıya getsə dönüş eynidir: sol ayaq altı, sağ ayaq altı, ikisi birlikdə — formula kimi yox, yerin səni tutduğu xəbər kimi.

Ayaqlar durur, yer durur, otaq durur, sən durursan. Yeri imtahan etməyəcəksən. Ayaq altı durur. Yer durur. Sən də.`,

    `Эти несколько минут — не лечение. Две стопы и земля — так просто и так по-настоящему. Если стопы на полу, пятка, свод и пальцы давят сразу. Если есть носки — носки. Если босиком — босиком. Ты не давишь сильнее. Ты не считаешь. Есть только давление. Земля держит тебя. Тебе не нужно держать землю.

Если ты лежишь, пятки, икры, бёдра и лопатки говорят с кроватью. Кровать тоже земля. Она тоже держит.

На каждом выдохе вес может опуститься на миллиметр. Если не опускается — не опускается. Без гонки. Внутри можно сказать: стопы на полу. Не ищи доказательства. Предложение стоит рядом с ощущением.

Левая стопа и правая не должны быть одинаковыми. Одна может быть яснее — и этого достаточно. Вес коленей вниз. Бёдра в стуле или в постели. Таз остаётся. Нет обязательного образа. Только вес.

Руки тоже место: ладони на бёдрах или по бокам, кончики пальцев на ткани. Если ум говорит, что это не как настоящее — ты не споришь. Ты возвращаешься к стопам. Давление, ткань, тепло. Несколько дыханий остаются там.

В лодыжках тонкие кости. Если есть резинка носка — есть резинка. Если есть обувь — есть внутренняя сторона. Деталь маленькая, и деталь настоящая. Позвоночнику не нужно сидеть прямо. Миллиметр изгиба — и земля всё равно остаётся. Внутри снова: земля держит, я остаюсь.

Вес головы в шее, шея в плечах, плечи в туловище, туловище в бёдрах, бёдра на земле. Ты смотришь на это не чтобы порвать цепь, а чтобы заметить её. Если ум уходит в будущее, в прошлое или в список, возвращение одно: левая стопа, правая, обе сразу — не как формула, как новость о том, что земля тебя держит.

Стопы остаются. Земля остаётся. Комната остаётся. Ты остаёшься. Ты не сделаешь из земли экзамен. Стопы остаются. Земля остаётся. И ты тоже.`,
  ),

  'room-door': pack(
    `Bu birkaç dakika bir tedavi değil. Bildiğin bir oda ve bir kapı. Kapıyı açmak zorunda değilsin, kapamak zorunda da değilsin. Sadece kapının olduğu odada duruyorsun.

Sırt yaslanabilir, ayaklar yerde. Kapı odanın öteki ucunda da olabilir, hemen yanında da. Mesafe önemli değil. Sen buradasın, kapı orada.

Hava giriyor ve çıkıyor, nefes kapıya gitmiyor, sende kalıyor. Zihin tokmağa uzanabilir: açılsın, kapalı kalsın, içeride ne var. Bu cümleler gelebilir. Onları kovalamıyorsun. Tokmağa dokunmuyorsun. Eşiğe dönüyorsun: ayak, avuç, bu nefes.

Kapı bir resim olabilir, gerçek bir eşik de olabilir. İkisi de aynı daveti taşır: zorlamak yok. Beklemek boşluk değil. Beklemek burada olmak.

Omuzlar, çene, dil — her biri kendi ağırlığına bırakılabilir. Kapı kımıldamasa oturum bozulmaz. Sen kımıldamasan kapı bozulmaz. İçinden eşikteyim diyebilirsin. Kanıt arama. Cümle duyumun yanında.

İçeride bir şey hazır değilse hazır değil. Bu bir teşhis değil, sadece şu an. Eşikte kalmak, içeri girmemek de bir seçim. Çıkmamak da. Koridorda bir adım, uzak bir kapı varsa oda onları da tutuyor ve sen de tutuluyorsun. Avuçlar uylukta, ısı ve kenar duruyor.

Kapı hâlâ orada, sen hâlâ buradasın. İkisi de doğru olabilir. Kapıyı bir sınav haline getirmeyeceksin. Eşik duruyor, oda duruyor, sen de. Gözler yavaşça odaya dönüyor, ışık ve eller orada. Kapıya gitmek zorunda değilsin. Kalmak yeter.`,

    `These few minutes are not a treatment. A room you know, and a door. You do not have to open it. You do not have to close it. You are only staying in the room where the door is.

The back can rest. The feet are on the floor. The door may be at the other end of the room, or close beside you. Distance does not matter. You are here. The door is there.

Air arrives and leaves. The breath does not go to the door. It stays with you. The mind can reach for the handle: let it open, let it stay shut, what is inside. Those sentences can arrive. You do not chase them. You do not touch the handle. You return to the threshold: the foot, the palm, this breath.

The door can be a picture. It can be a real doorway. Both carry the same invitation: no forcing. Waiting is not emptiness. Waiting is being here.

The shoulders, the jaw, the tongue — each can drop into its own weight. If the door does not move, the session is not broken. If you do not move, the door is not broken. Inside you may say I am at the threshold. Do not look for proof. The sentence stands next to the sensation.

If something inside is not ready, it is not ready. This is not a diagnosis. It is only this moment. Staying at the threshold, not going in, is also a choice. Not leaving is also a choice. If there is a step in the hall, or a far door, the room holds those sounds too, and you are being held as well. Palms on the thighs. Heat and edge stay.

The door is still there. You are still here. Both can be true. You will not turn the door into an exam. The threshold stays. The room stays. So do you. The eyes come back slowly to the room, to the light and the hands. You do not have to go to the door. Staying is enough.`,

    `Estos minutos no son un tratamiento. Una habitación que conoces y una puerta. No tienes que abrirla. Tampoco cerrarla. Solo estás en la habitación donde está la puerta.

La espalda puede apoyarse. Los pies están en el suelo. La puerta puede estar al otro lado o cerca. La distancia no importa. Tú estás aquí. La puerta está ahí.

El aire llega y se va. El aliento no va a la puerta. Se queda contigo. La mente puede ir al picaporte: que se abra, que se quede cerrada, qué hay dentro. Esas frases pueden llegar. No las persigues. No tocas el picaporte. Vuelves al umbral: el pie, la palma, este aliento.

La puerta puede ser una imagen. Puede ser un umbral real. Las dos traen la misma invitación: no forzar. Esperar no es vacío. Esperar es estar aquí.

Los hombros, la mandíbula, la lengua: cada uno puede caer en su peso. Si la puerta no se mueve, la sesión no se rompe. Si tú no te mueves, la puerta no se rompe. Por dentro puedes decir estoy en el umbral. No busques una prueba. La frase está junto a la sensación.

Si algo dentro no está listo, no está listo. Esto no es un diagnóstico. Es solo este momento. Quedarte en el umbral, no entrar, también es una elección. No salir también. Si hay un paso en el pasillo o una puerta lejana, la habitación también sostiene esos sonidos, y a ti también. Palmas en los muslos. El calor y el borde siguen.

La puerta sigue ahí. Tú sigues aquí. Las dos cosas pueden ser ciertas. No vas a convertir la puerta en un examen. El umbral sigue. La habitación sigue. Tú también. Los ojos vuelven despacio a la habitación, a la luz y a las manos. No tienes que ir a la puerta. Quedarte basta.`,

    `Questi minuti non sono una cura. Una stanza che conosci e una porta. Non devi aprirla. Non devi chiuderla. Resti solo nella stanza dove c’è la porta.

La schiena può appoggiarsi. I piedi sono a terra. La porta può essere in fondo o accanto. La distanza non conta. Tu sei qui. La porta è lì.

L’aria arriva e se ne va. Il respiro non va alla porta. Resta con te. La mente può andare alla maniglia: che si apra, che resti chiusa, cosa c’è dentro. Quelle frasi possono arrivare. Non le insegui. Non tocchi la maniglia. Torni alla soglia: il piede, il palmo, questo respiro.

La porta può essere un’immagine. Può essere una soglia vera. Entrambe portano lo stesso invito: non forzare. Aspettare non è vuoto. Aspettare è essere qui.

Le spalle, la mascella, la lingua: ognuna può cadere nel proprio peso. Se la porta non si muove, la sessione non si rompe. Se tu non ti muovi, la porta non si rompe. Dentro puoi dire sono sulla soglia. Non cercare una prova. La frase sta accanto alla sensazione.

Se qualcosa dentro non è pronto, non è pronto. Questo non è una diagnosi. È solo questo momento. Restare sulla soglia, non entrare, è anche una scelta. Non uscire è anche una scelta. Se c’è un passo nel corridoio o una porta lontana, la stanza tiene anche quei suoni, e tieni anche tu. Palmi sulle cosce. Il calore e il bordo restano.

La porta è ancora lì. Tu sei ancora qui. Entrambe le cose possono essere vere. Non farai della porta un esame. La soglia resta. La stanza resta. Anche tu. Gli occhi tornano piano alla stanza, alla luce e alle mani. Non devi andare alla porta. Restare basta.`,

    `Bu bir neçə dəqiqə müalicə deyil. Tanıdığın bir otaq və bir qapı. Açmaq məcburiyyətində deyilsən, bağlamaq da. Yalnız qapının olduğu otaqdasan.

Bel söykənə bilər, ayaqlar yerdədir. Qapı otağın o biri ucunda da ola bilər, yanında da. Məsafə fərq etməz. Sən buradasan, qapı oradadır.

Hava girir və çıxır, nəfəs qapıya getmir, səndə qalır. Ağıl dəstəyə uzana bilər: açılsın, bağlı qalsın, içində nə var. Bu cümlələr gələ bilər. Onları qovmursan. Dəstəyə toxunmursan. Eşiyə qayıdırsan: ayaq, ovuc, bu nəfəs.

Qapı bir şəkil ola bilər, gerçək eşik də. Hər ikisi eyni dəvəti daşıyır: məcbur yoxdur. Gözləmək boşluq deyil. Gözləmək burada olmaqdır.

Çiyinlər, çənə, dil — hər biri öz ağırlığına buraxıla bilər. Qapı tərpənməsə oturum pozulmur. Sən tərpənməsən qapı pozulmur. İçindən eşikdəyəm deyə bilərsən. Sübut axtarma. Cümlə duyumun yanında durur.

İçəridə bir şey hazır deyilsə hazır deyil. Bu diaqnoz deyil, yalnız bu an. Eşikdə qalmaq, içəri girməmək də seçimdir. Çıxmamaq da. Dəhlizdə addım, uzaq qapı varsa otaq onları da tutur və sən də tutulursan. Ovuc budda, istilik və kənar durur.

Qapı hələ oradadır, sən hələ buradasan. Hər ikisi doğru ola bilər. Qapını imtahan etməyəcəksən. Eşik durur, otaq durur, sən də. Gözlər yavaşca otağa qayıdır, işıq və əllər oradadır. Qapıya getmək məcburiyyətində deyilsən. Qalmaq bəsdir.`,

    `Эти несколько минут — не лечение. Комната, которую ты знаешь, и дверь. Её не нужно открывать. Не нужно и закрывать. Ты просто в комнате, где есть дверь.

Спина может опереться. Стопы на полу. Дверь может быть в другом конце или рядом. Расстояние не важно. Ты здесь. Дверь там.

Воздух входит и выходит. Дыхание не идёт к двери. Оно остаётся с тобой. Ум может потянуться к ручке: пусть откроется, пусть останется закрытой, что внутри. Эти фразы могут прийти. Ты их не гонишь. Ручку не трогаешь. Ты возвращаешься к порогу: стопа, ладонь, это дыхание.

Дверь может быть картинкой. Может быть настоящим порогом. Оба несут одно приглашение: не торопить. Ожидание — не пустота. Ожидание — быть здесь.

Плечи, челюсть, язык — каждое может упасть в свой вес. Если дверь не двинется, сессия не сломана. Если не двинешься ты, дверь не сломана. Внутри можно сказать: я на пороге. Не ищи доказательства. Предложение стоит рядом с ощущением.

Если что-то внутри не готово — оно не готово. Это не диагноз. Только этот момент. Остаться на пороге, не входить — тоже выбор. Не уходить — тоже. Если в коридоре шаг или далёкая дверь, комната держит и эти звуки, и тебя. Ладони на бёдрах. Тепло и край остаются.

Дверь всё ещё там. Ты всё ещё здесь. Оба могут быть правдой. Ты не сделаешь из двери экзамен. Порог остаётся. Комната остаётся. И ты. Глаза медленно возвращаются в комнату, к свету и к рукам. К двери идти не нужно. Остаться достаточно.`,
  ),

  'room-light': pack(
    `Bu birkaç dakika bir tedavi değil. Odadaki ışık. Perde yarı açık olabilir, öğleden sonra, ya da bir lamba. Hangisi olursa ışık bir yere düşüyor ve sen o yere oturuyorsun. Işığı kovalamıyorsun. Sadece ona yer veriyorsun.

Gözler kapanabilir; ışık yine orada, kapakların arkasında pembe bir iz. İzi kovalamıyorsun, sadece fark ediyorsun. Hava burundan giriyor, göğüste bir an duruyor, çıkıyor. Işık değişmese nefes değişebilir, nefes değişmese ışık değişebilir. İkisi de senin işin değil. İkisi de oluyor.

Zihin karanlığı ölçebilir: yetmez, fazla. Bu cümleler gelebilir. Onları düzeltmiyorsun. Avuçlara dönüyorsun. Avuçlar birbirine değebilir, ılık, basit. Işık bir teşhis değil, karanlık da değil. Odaların halleri var. Sen odanın hali değilsin. Sen buradasın, ışığın düştüğü yerde.

Omuzlar, boyun, çene, dil — her biri kendi gölgesine bırakılabilir. Gölge korkutucu olmak zorunda değil; sadece ışığın öteki yüzü. İçinden ışık düşüyor, ben buradayım diyebilirsin. Kanıt arama. Işığa gitmeden, karanlığa gitmeden, ortada, göğüste birkaç nefes geçiyor.

Pencere varsa dışarıdaki ses içeri sızabilir, kapı varsa koridor duruyor. Bırakıyorsun. Sen ışığın düştüğü yerdesin. Alın duruyor, kaşlar gerilmek zorunda değil. Işık kalsa da solsa da ayaklar yerde. Bu yeterli bir haber. Avuç, taban, bu nefes.

Gözler yavaşça odaya dönüyor. Işığın düştüğü yer duruyor, eller duruyor. Işığı bir sınav haline getirmeyeceksin. Düştüğü yer duruyor. Sen duruyorsun. Kalkmak zorunda değilsin hemen. Işık sönmez. Sen de sönmezsin.`,

    `These few minutes are not a treatment. The light in the room. The curtain may be half open, afternoon, or there may be a lamp. Either way, light falls somewhere, and you sit in that place. You are not chasing the light. You are only making room for it.

The eyes can close. The light is still there, a pink trace behind the lids. You do not chase the trace. You only notice it. Air comes in through the nose, stays a moment in the chest, and leaves. The light can stay the same while the breath changes. The breath can stay the same while the light changes. Neither is your job. Both are happening.

The mind can measure the dark: not enough, too much. Those sentences can arrive. You do not correct them. You return to the palms. The palms can touch, warm, simple. Light is not a diagnosis. Dark is not either. Rooms have states. You are not a state of the room. You are here, where the light falls.

The shoulders, the neck, the jaw, the tongue — each can rest in its own shade. Shade does not have to be frightening. It is only the other face of light. Inside you may say light is falling, I am here. Do not look for proof. Without going toward the light, without going toward the dark, a few breaths pass in the middle, in the chest.

If there is a window, sound from outside can leak in. If there is a door, the hall is still there. You let that be. You are where the light falls. The forehead stays. The brows do not have to tighten. If the light stays, if it fades, the feet are on the floor. That is enough news. Palm, sole, this breath.

The eyes come back slowly to the room. The place the light falls stays. The hands stay. You will not turn the light into an exam. The place it falls stays. You stay. You do not have to stand up yet. The light does not go out. Neither do you.`,

    `Estos minutos no son un tratamiento. La luz de la habitación. La cortina puede estar a medio abrir, tarde, o puede haber una lámpara. En cualquier caso la luz cae en algún sitio y tú te sientas ahí. No persigues la luz. Solo le das sitio.

Los ojos pueden cerrarse. La luz sigue, un rastro rosa detrás de los párpados. No persigues el rastro. Solo lo notas. El aire entra por la nariz, se queda un momento en el pecho y sale. La luz puede quedarse igual mientras el aire cambia. El aire puede quedarse igual mientras la luz cambia. Ninguna es tu trabajo. Las dos ocurren.

La mente puede medir la oscuridad: no basta, demasiado. Esas frases pueden llegar. No las corriges. Vuelves a las palmas. Pueden tocarse, tibias, simples. La luz no es un diagnóstico. La oscuridad tampoco. Las habitaciones tienen estados. Tú no eres un estado de la habitación. Estás aquí, donde cae la luz.

Los hombros, el cuello, la mandíbula, la lengua: cada uno puede descansar en su sombra. La sombra no tiene que asustar. Es solo la otra cara de la luz. Por dentro puedes decir la luz cae, estoy aquí. No busques una prueba. Sin ir hacia la luz, sin ir hacia la oscuridad, pasan unos alientos en el medio, en el pecho.

Si hay ventana, el sonido de fuera puede colarse. Si hay puerta, el pasillo sigue. Lo dejas. Tú estás donde cae la luz. La frente está. Las cejas no tienen que tensarse. Si la luz se queda, si se apaga, los pies están en el suelo. Eso basta como noticia. Palma, planta, este aliento.

Los ojos vuelven despacio a la habitación. El sitio donde cae la luz sigue. Las manos siguen. No vas a convertir la luz en un examen. El sitio donde cae sigue. Tú sigues. No tienes que levantarte aún. La luz no se apaga. Tú tampoco.`,

    `Questi minuti non sono una cura. La luce nella stanza. La tenda può essere socchiusa, pomeriggio, o c’è una lampada. In ogni caso la luce cade da qualche parte e tu ti siedi lì. Non insegui la luce. Le fai solo spazio.

Gli occhi possono chiudersi. La luce resta, una traccia rosa dietro le palpebre. Non insegui la traccia. La noti soltanto. L’aria entra dal naso, resta un momento nel petto ed esce. La luce può restare uguale mentre il respiro cambia. Il respiro può restare uguale mentre la luce cambia. Nessuno dei due è il tuo compito. Entrambi accadono.

La mente può misurare il buio: non basta, troppo. Quelle frasi possono arrivare. Non le correggi. Torni ai palmi. Possono toccarsi, caldi, semplici. La luce non è una diagnosi. Il buio nemmeno. Le stanze hanno stati. Tu non sei uno stato della stanza. Sei qui, dove cade la luce.

Le spalle, il collo, la mascella, la lingua: ognuno può restare nella propria ombra. L’ombra non deve spaventare. È solo l’altra faccia della luce. Dentro puoi dire la luce cade, io sono qui. Non cercare una prova. Senza andare verso la luce, senza andare verso il buio, passano alcuni respiri in mezzo, nel petto.

Se c’è una finestra, il suono di fuori può entrare. Se c’è una porta, il corridoio resta. Lo lasci. Tu sei dove cade la luce. La fronte resta. Le sopracciglia non devono stringersi. Se la luce resta, se svanisce, i piedi sono a terra. Questa è notizia abbastanza. Palmo, pianta, questo respiro.

Gli occhi tornano piano alla stanza. Il punto dove cade la luce resta. Le mani restano. Non farai della luce un esame. Il punto dove cade resta. Tu resti. Non devi alzarti ancora. La luce non si spegne. Nemmeno tu.`,

    `Bu bir neçə dəqiqə müalicə deyil. Otaqdakı işıq. Pərdə yarı açıq ola bilər, günorta, və ya lampa. Hansı olsa işıq bir yerə düşür və sən o yerdə oturursan. Işığı qovmursan. Yalnız ona yer verirsən.

Gözlər bağlana bilər; işıq yenə oradadır, qapaqların arxasında çəhrayı iz. İzi qovmursan, yalnız görürsən. Hava burundan girir, sinədə bir an qalır, çıxır. Işıq dəyişməsə nəfəs dəyişə bilər, nəfəs dəyişməsə işıq dəyişə bilər. Heç biri sənin işin deyil. Hər ikisi olur.

Ağıl qaranlığı ölçə bilər: çatmır, çoxdur. Bu cümlələr gələ bilər. Onları düzəltmirsən. Ovucalara qayıdırsan. Ovucalar toxuna bilər, isti, sadə. Işıq diaqnoz deyil, qaranlıq da deyil. Otaqların halları var. Sən otağın halı deyilsən. Sən buradasan, işığın düşdüyü yerdə.

Çiyinlər, boyun, çənə, dil — hər biri öz kölgəsinə buraxıla bilər. Kölgə qorxutmaq məcburiyyətində deyil; yalnız işığın o biri üzüdür. İçindən işıq düşür, mən buradayam deyə bilərsən. Sübut axtarma. Işığa getmədən, qaranlığa getmədən, ortada, sinədə bir neçə nəfəs keçir.

Pəncərə varsa çöldən səs sızabilir, qapı varsa dəhliz durur. Buraxırsan. Sən işığın düşdüyü yerdəsən. Alın durur, qaşlar gərilmək məcburiyyətində deyil. Işıq qalsa da getsə də ayaqlar yerdədir. Bu kifayət qədər xəbərdir. Ovuc, ayaq altı, bu nəfəs.

Gözlər yavaşca otağa qayıdır. Işığın düşdüyü yer durur, əllər durur. Işığı imtahan etməyəcəksən. Düşdüyü yer durur. Sən durursan. İndi durmaq məcburiyyətində deyilsən. Işıq sönmür. Sən də sönmürsən.`,

    `Эти несколько минут — не лечение. Свет в комнате. Штора может быть полуоткрыта, после полудня, или горит лампа. В любом случае свет падает куда-то, и ты садишься туда. Ты не гонишься за светом. Ты только даёшь ему место.

Глаза могут закрыться. Свет всё ещё там, розовый след за веками. Ты не гонишься за следом. Ты только замечаешь его. Воздух входит через нос, на миг остаётся в груди и выходит. Свет может остаться прежним, пока дыхание меняется. Дыхание может остаться прежним, пока меняется свет. Ни то ни другое — не твоя работа. Оба происходят.

Ум может мерить темноту: мало, много. Эти фразы могут прийти. Ты их не правишь. Ты возвращаешься к ладоням. Ладони могут коснуться, тёплые, простые. Свет — не диагноз. Темнота тоже. У комнат есть состояния. Ты не состояние комнаты. Ты здесь, там, куда падает свет.

Плечи, шея, челюсть, язык — каждое может остаться в своей тени. Тень не обязана пугать. Это только другая сторона света. Внутри можно сказать: свет падает, я здесь. Не ищи доказательства. Не к свету, не к темноте — несколько дыханий проходят посередине, в груди.

Если есть окно, звук с улицы может войти. Если есть дверь, коридор на месте. Ты это оставляешь. Ты там, куда падает свет. Лоб на месте. Бровям не нужно напрягаться. Если свет останется, если потускнеет — стопы на полу. Этого достаточно как новости. Ладонь, стопа, это дыхание.

Глаза медленно возвращаются в комнату. Место, куда падает свет, остаётся. Руки остаются. Ты не сделаешь из света экзамен. Место, куда он падает, остаётся. Ты остаёшься. Вставать ещё не нужно. Свет не гаснет. И ты не гаснешь.`,
  ),

  'room-hands': pack(
    `Bu birkaç dakika bir tedavi değil. Eller bir iş yapmak zorunda değiller. Kucakta durabilirler, dizlerde, birbirine değerek. Sadece durmak.

Ayaklar yerde, sırt yaslı, eller kendi ağırlıklarında. Bu ağırlık bir haber: buradasın. Nefes avuçlara gitmiyor, avuçlar nefesi tutmuyor. İkisi yan yana. Hava burundan giriyor ve çıkıyor, avuçlar ılık kalıyor.

Parmaklar kendi yerinde. Sıkmak yok, açmak yok, sadece durmak. Tırnağın kenarı, avuç içindeki bir çizgi — küçük ve gerçek. Zihin elleri bir göreve çağırabilir: yaz, tut, düzelt. Bu çağrı gelebilir. Eller göreve gitmek zorunda değil. Kucakta kalabilirler.

İçinden ellerim burada diyebilirsin. Kanıt arama. Avuçların ısısını fark ediyorsun. Isı bir teşhis değil, sadece ten. Nabız varsa nabız; hızlı ya da yavaş, ikisi de haber. Nabzı düzeltmek yok, sadece duymak.

Bilekler, önkol, dirseklerin ağırlığı orada. Omuzlar kulaklara gitmek zorunda değil; aralarında bir milim boşluk olsa da yine avuçlara dönüyorsun. Oturum kısa diye acele yok. Eller hâlâ orada, sen hâlâ buradasın. Çene, dil, avuç aynı odada.

Gözler yavaşça odaya dönüyor, eller duruyor. Elleri bir sınav haline getirmeyeceksin. Avuçlar açık kalabilir. Kaldırmak zorunda değilsin hemen. Bu da yeter.`,

    `These few minutes are not a treatment. The hands do not have to do a job. They can rest in the lap, on the knees, touching each other. Only staying.

Feet on the floor, back supported, hands in their own weight. That weight is news: you are here. Breath does not go to the palms. The palms do not hold the breath. They sit side by side. Air comes in through the nose and leaves. The palms stay warm.

The fingers stay in their places. No clenching, no spreading, only staying. The edge of a nail, a line in the palm — small and actual. The mind can call the hands to a task: write, hold, fix. That call can arrive. The hands do not have to go. They can stay in the lap.

Inside you may say my hands are here. Do not look for proof. You notice the warmth of the palms. Warmth is not a diagnosis. It is only skin. If there is a pulse, there is a pulse. Fast or slow, both are news. You do not have to fix the pulse. Only hear it.

The wrists, the forearms, the weight of the elbows are there. The shoulders do not have to climb toward the ears. A millimetre of space is enough, and then you return to the palms again. The session is short. Short does not mean hurry. The hands are still there. You are still here. Jaw, tongue, palm, in the same room.

The eyes come back slowly to the room. The hands stay. You will not turn the hands into an exam. Palms can stay open. You do not have to lift them yet. That is enough.`,

    `Estos minutos no son un tratamiento. Las manos no tienen que hacer un trabajo. Pueden quedarse en el regazo, en las rodillas, tocándose. Solo quedarse.

Los pies en el suelo, la espalda apoyada, las manos en su propio peso. Ese peso es una noticia: estás aquí. El aire no va a las palmas. Las palmas no sujetan el aire. Van juntas. El aire entra por la nariz y sale. Las palmas siguen tibias.

Los dedos están en su sitio. Sin apretar, sin abrir, solo quedarse. El borde de una uña, una línea en la palma: pequeño y real. La mente puede llamar a las manos a una tarea: escribe, sujeta, arregla. Esa llamada puede llegar. Las manos no tienen que ir. Pueden quedarse en el regazo.

Por dentro puedes decir mis manos están aquí. No busques una prueba. Notas el calor de las palmas. El calor no es un diagnóstico. Es solo piel. Si hay pulso, hay pulso. Rápido o lento, los dos son noticia. No tienes que arreglar el pulso. Solo oírlo.

Las muñecas, los antebrazos, el peso de los codos están ahí. Los hombros no tienen que subir hacia las orejas. Un milímetro de espacio basta, y luego vuelves a las palmas. La sesión es corta. Corta no significa prisa. Las manos siguen ahí. Tú sigues aquí. Mandíbula, lengua, palma, en la misma habitación.

Los ojos vuelven despacio a la habitación. Las manos siguen. No vas a convertir las manos en un examen. Las palmas pueden quedar abiertas. No tienes que levantarlas aún. Eso basta.`,

    `Questi minuti non sono una cura. Le mani non devono fare un lavoro. Possono restare in grembo, sulle ginocchia, toccandosi. Solo restare.

Piedi a terra, schiena appoggiata, mani nel proprio peso. Quel peso è una notizia: sei qui. Il respiro non va ai palmi. I palmi non tengono il respiro. Stanno accanto. L’aria entra dal naso ed esce. I palmi restano caldi.

Le dita restano al loro posto. Senza stringere, senza aprire, solo restare. Il bordo di un’unghia, una linea nel palmo: piccolo e vero. La mente può chiamare le mani a un compito: scrivi, tieni, sistema. Quella chiamata può arrivare. Le mani non devono andare. Possono restare in grembo.

Dentro puoi dire le mie mani sono qui. Non cercare una prova. Noti il calore dei palmi. Il calore non è una diagnosi. È solo pelle. Se c’è un polso, c’è un polso. Veloce o lento, tutti e due sono notizia. Non devi sistemare il polso. Solo ascoltarlo.

I polsi, gli avambracci, il peso dei gomiti sono lì. Le spalle non devono salire verso le orecchie. Un millimetro di spazio basta, e poi torni ai palmi. La sessione è breve. Breve non significa fretta. Le mani sono ancora lì. Tu sei ancora qui. Mascella, lingua, palmo, nella stessa stanza.

Gli occhi tornano piano alla stanza. Le mani restano. Non farai delle mani un esame. I palmi possono restare aperti. Non devi alzarle ancora. Questo basta.`,

    `Bu bir neçə dəqiqə müalicə deyil. Əllər iş görmək məcburiyyətində deyil. Qucaqda dura bilər, dizlərdə, bir-birinə dəyərək. Yalnız durmaq.

Ayaqlar yerdə, bel dayaqlı, əllər öz ağırlığında. Bu ağırlıq bir xəbərdir: buradasan. Nəfəs ovucalara getmir, ovucalar nəfəsi tutmur. Yan-yana dururlar. Hava burundan girir və çıxır, ovucalar isti qalır.

Barmaqlar öz yerindədir. Sıxmaq yoxdur, açmaq yoxdur, yalnız durmaq. Dırnağın kənarı, ovucun içindəki xətt — kiçik və gerçək. Ağıl əlləri bir işə çağıra bilər: yaz, tut, düzəlt. Bu çağırış gələ bilər. Əllər getmək məcburiyyətində deyil. Qucağda qala bilər.

İçindən əllərim buradadır deyə bilərsən. Sübut axtarma. Ovucaların istiliyini görürsən. İstilik diaqnoz deyil, yalnız dəri. Nəbz varsa nəbz; tez və ya yavaş, hər ikisi xəbərdir. Nəbzi düzəltmək yoxdur, yalnız eşitmək.

Biləklər, ön qol, dirsəklərin ağırlığı oradadır. Çiyinlər qulaqlara getmək məcburiyyətində deyil; bir milim boşluq olsa da yenə ovucalara qayıdırsan. Oturum qısa deyə tələsmək yoxdur. Əllər hələ oradadır, sən hələ buradasan. Çənə, dil, ovuc eyni otaqda.

Gözlər yavaşca otağa qayıdır, əllər durur. Əlləri imtahan etməyəcəksən. Ovucalar açıq qala bilər. İndi qaldırmaq məcburiyyətində deyilsən. Bu da bəsdir.`,

    `Эти несколько минут — не лечение. Рукам не нужно делать работу. Они могут лежать на коленях, в лоне, касаясь друг друга. Только оставаться.

Стопы на полу, спина с опорой, руки в своём весе. Этот вес — новость: ты здесь. Дыхание не идёт к ладоням. Ладони не держат дыхание. Они рядом. Воздух входит через нос и выходит. Ладони остаются тёплыми.

Пальцы на своих местах. Не сжимать, не раскрывать, только оставаться. Край ногтя, линия на ладони — маленькое и настоящее. Ум может позвать руки к делу: пиши, держи, исправь. Этот зов может прийти. Рукам не нужно идти. Они могут остаться в лоне.

Внутри можно сказать: мои руки здесь. Не ищи доказательства. Ты замечаешь тепло ладоней. Тепло — не диагноз. Только кожа. Если есть пульс — есть пульс. Быстрый или медленный, оба — новость. Пульс не нужно чинить. Только слышать.

Запястья, предплечья, вес локтей на месте. Плечам не нужно подниматься к ушам. Миллиметра пространства достаточно, и ты снова возвращаешься к ладоням. Сессия короткая. Короткое не значит спешить. Руки всё ещё там. Ты всё ещё здесь. Челюсть, язык, ладонь — в одной комнате.

Глаза медленно возвращаются в комнату. Руки остаются. Ты не сделаешь из рук экзамен. Ладони могут остаться открытыми. Поднимать их ещё не нужно. Этого достаточно.`,
  ),

  'shore-edge': pack(
    `Bu birkaç dakika bir tedavi değil. Bir kıyı. Su gelir, su gider, sen kenarda oturuyorsun. Dalgayı yönetmiyorsun, dalgayı durdurmuyorsun. Sadece kenardasın.

Sırt yaslanabilir, ayaklar yerde ya da uzanmış. Kum, taş, tahta — hangisi varsa o. Soğuk ya da ılık, ikisi de kıyı. Nefes dalgaya benzemez zorunda değil. Giriyor, çıkıyor. Su kendi işini bilir, sen kendi yerini.

Zihin dalgayı sayabilir: yetmez, fazla, yakın, uzak. Bu cümleler gelebilir. Saymayı bırakıyorsun. Kenara dönüyorsun: avuç, taban, bu nefes. İçinden kenardayım diyebilirsin. Kanıt arama. Su geliyorsa geliyor, gidiyorsa gidiyor. İkisi de senin görevin değil.

Omuzlar, çene, dil kendi ağırlıklarında. Rüzgâr varsa rüzgâr, yoksa yok. Kıyı ikisini de tutar ve sen de tutuluyorsun. Alış bir geliş gibi gelebilir, veriş bir gidiş gibi; benzetmek zorunda değilsin. Sadece sıra, sonra yine ayaklar.

Cam gibi bir anlatı gelebilir. Camı kırmıyorsun. Kenar duruyor, basınç duruyor. Bu da bir haber. Su sesi, uzak bir kuş, bir motor — onları kapatmıyorsun. Kenar onları da alır. Sen kenardasın; suyun içinde olmak zorunda değilsin.

Gözler yavaşça odaya dönüyor, eller duruyor. Kıyı bir resimse resim, gerçekse gerçek. Sen buradasın. Kıyıyı bir sınav haline getirmeyeceksin. Kenar duruyor. Su durmuyor — geliyor, gidiyor. Sen duruyorsun. Bu yeter.`,

    `These few minutes are not a treatment. A shore. Water arrives, water leaves, and you sit at the edge. You are not managing the wave. You are not stopping the wave. You are only at the edge.

The back can rest. The feet are on the floor or stretched out. Sand, stone, wood — whichever is there, that. Cool or warm, both are shore. The breath does not have to resemble a wave. It comes in and it leaves. The water knows its work. You know your place.

The mind can count the waves: not enough, too many, near, far. Those sentences can arrive. You leave the counting. You return to the edge: the palm, the sole, this breath. Inside you may say I am at the edge. Do not look for proof. If water comes, it comes. If it leaves, it leaves. Neither is your task.

The shoulders, the jaw, the tongue rest in their own weight. If there is wind, there is wind. If not, not. The shore holds both, and you are being held as well. An in-breath may feel like an arrival, an out-breath like a leaving. You do not have to force the likeness. Only the sequence, then the feet again.

A story about glass can arrive. You do not break the glass. The edge stays. Pressure stays. That is also news. Water, a far bird, an engine — you do not shut them out. The edge takes them too. You are at the edge. You do not have to be inside the water.

The eyes come back slowly to the room. The hands stay. If the shore is a picture, a picture. If it is actual, actual. You are here. You will not turn the shore into an exam. The edge stays. The water does not stay — it comes, it goes. You stay. That is enough.`,

    `Estos minutos no son un tratamiento. Una orilla. El agua llega, el agua se va, y te sientas al borde. No gestionas la ola. No la detienes. Solo estás al borde.

La espalda puede apoyarse. Los pies están en el suelo o estirados. Arena, piedra, madera: lo que haya. Frío o calor, los dos son orilla. El aliento no tiene que parecerse a una ola. Entra y sale. El agua sabe su trabajo. Tú sabes tu sitio.

La mente puede contar las olas: no basta, demasiadas, cerca, lejos. Esas frases pueden llegar. Dejas la cuenta. Vuelves al borde: la palma, la planta, este aliento. Por dentro puedes decir estoy al borde. No busques una prueba. Si el agua llega, llega. Si se va, se va. Ninguna es tu tarea.

Los hombros, la mandíbula, la lengua están en su peso. Si hay viento, hay viento. Si no, no. La orilla sostiene las dos cosas, y a ti también. Una entrada puede sentirse como una llegada, una salida como una ida. No tienes que forzar el parecido. Solo la secuencia, luego los pies otra vez.

Puede llegar un relato de cristal. No rompes el cristal. El borde sigue. La presión sigue. Eso también es noticia. Agua, un pájaro lejano, un motor: no los apagas. El borde también los toma. Estás al borde. No tienes que estar dentro del agua.

Los ojos vuelven despacio a la habitación. Las manos siguen. Si la orilla es una imagen, una imagen. Si es real, real. Estás aquí. No vas a convertir la orilla en un examen. El borde sigue. El agua no se queda: llega, se va. Tú te quedas. Eso basta.`,

    `Questi minuti non sono una cura. Una riva. L’acqua arriva, l’acqua se ne va, e siedi sul bordo. Non gestisci l’onda. Non la fermi. Sei solo sul bordo.

La schiena può appoggiarsi. I piedi sono a terra o distesi. Sabbia, pietra, legno: quello che c’è. Freddo o caldo, tutti e due sono riva. Il respiro non deve assomigliare a un’onda. Entra ed esce. L’acqua sa il suo lavoro. Tu sai il tuo posto.

La mente può contare le onde: non basta, troppe, vicine, lontane. Quelle frasi possono arrivare. Lasci il conto. Torni al bordo: il palmo, la pianta, questo respiro. Dentro puoi dire sono sul bordo. Non cercare una prova. Se l’acqua arriva, arriva. Se se ne va, se ne va. Nessuna è il tuo compito.

Le spalle, la mascella, la lingua restano nel proprio peso. Se c’è vento, c’è vento. Se no, no. La riva tiene entrambi, e tieni anche tu. Un’inspirazione può sembrare un arrivo, un’espirazione una partenza. Non devi forzare la somiglianza. Solo la sequenza, poi di nuovo i piedi.

Può arrivare un racconto di vetro. Non rompi il vetro. Il bordo resta. La pressione resta. Anche questa è notizia. Acqua, un uccello lontano, un motore: non li chiudi fuori. Il bordo li prende anche. Sei sul bordo. Non devi essere dentro l’acqua.

Gli occhi tornano piano alla stanza. Le mani restano. Se la riva è un’immagine, un’immagine. Se è vera, vera. Tu sei qui. Non farai della riva un esame. Il bordo resta. L’acqua non resta: arriva, se ne va. Tu resti. Questo basta.`,

    `Bu bir neçə dəqiqə müalicə deyil. Bir sahil. Su gəlir, su gedir, sən kənarda oturursan. Dalğanı idarə etmirsən, dalğanı dayandırmırsan. Yalnız kənardasan.

Bel söykənə bilər, ayaqlar yerdə və ya uzanıb. Qum, daş, taxta — hansı varsa, o. Soyuq ya isti, hər ikisi sahildir. Nəfəs dalğaya bənzəmək məcburiyyətində deyil. Girir, çıxır. Su öz işini bilir, sən öz yerini.

Ağıl dalğanı saya bilər: çatmır, çoxdur, yaxın, uzaq. Bu cümlələr gələ bilər. Sayımı buraxırsan. Kənara qayıdırsan: ovuc, ayaq altı, bu nəfəs. İçindən kənardayam deyə bilərsən. Sübut axtarma. Su gəlirsə gəlir, gedirsə gedir. Heç biri sənin vəzifən deyil.

Çiyinlər, çənə, dil öz ağırlığındadır. Külək varsa külək, yoxdursa yox. Sahil ikisini də tutur və sən də tutulursan. Alış bir gəliş kimi gələ bilər, veriş bir gediş kimi; bənzətmək məcburiyyətində deyilsən. Yalnız sıra, sonra yenə ayaqlar.

Şüşə kimi bir danışıq gələ bilər. Şüşəni qırmırsan. Kənar durur, təzyiq durur. Bu da bir xəbər. Su səsi, uzaq quş, bir motor — onları bağlamırsan. Kənar onları da alır. Sən kənardasan; suyun içində olmaq məcburiyyətində deyilsən.

Gözlər yavaşca otağa qayıdır, əllər durur. Sahil şəkilədirsə şəkil, gerçəkdirsə gerçək. Sən buradasan. Sahili imtahan etməyəcəksən. Kənar durur. Su durmur — gəlir, gedir. Sən durursan. Bu bəsdir.`,

    `Эти несколько минут — не лечение. Берег. Вода приходит, вода уходит, и ты сидишь на краю. Ты не управляешь волной. Ты её не останавливаешь. Ты просто на краю.

Спина может опереться. Стопы на полу или вытянуты. Песок, камень, дерево — что есть, то и есть. Холод или тепло — оба берег. Дыханию не нужно быть похожим на волну. Оно входит и выходит. Вода знает свою работу. Ты знаешь своё место.

Ум может считать волны: мало, много, близко, далеко. Эти фразы могут прийти. Ты оставляешь счёт. Ты возвращаешься к краю: ладонь, стопа, это дыхание. Внутри можно сказать: я на краю. Не ищи доказательства. Если вода приходит — приходит. Если уходит — уходит. Ни то ни другое не твоя задача.

Плечи, челюсть, язык в своём весе. Если есть ветер — есть ветер. Если нет — нет. Берег держит оба, и тебя. Вдох может быть как приход, выдох как уход. Не нужно насильно делать сходство. Только последовательность, потом снова стопы.

Может прийти рассказ про стекло. Ты стекло не бьёшь. Край остаётся. Давление остаётся. Это тоже новость. Вода, далёкая птица, мотор — ты их не закрываешь. Край берёт и их. Ты на краю. Тебе не нужно быть внутри воды.

Глаза медленно возвращаются в комнату. Руки остаются. Если берег — картинка, картинка. Если настоящий — настоящий. Ты здесь. Ты не сделаешь из берега экзамен. Край остаётся. Вода не остаётся — приходит, уходит. Ты остаёшься. Этого достаточно.`,
  ),

  'shore-stone': pack(
    `Bu birkaç dakika bir tedavi değil. Avuçta bir ağırlık. Taş olabilir, anahtar, telefon, ya da sadece avucun kendi ağırlığı. Hangisi varsa o. Sıkmak yok. Sadece tutmak, sonra bırakmak.

Ayaklar yerde, sırt yaslı, avuç açık ya da yarı kapalı. Ağırlık aşağıda. Aşağı bir emir değil, yerçekimi. Nefes taşı taşımıyor, taş nefesi tutmuyor. İkisi yan yana. Hava giriyor ve çıkıyor, ağırlık duruyor.

Zihin taşı bir anlama çevirebilir: suç, görev, dert. Bu cümleler gelebilir. Taşa anlam yüklemiyorsun. Sadece ağırlık, ısı, kenar. İçinden avucumda ağırlık var diyebilirsin. Kanıt arama. Her verişte milim bırakılabilir; bırakılmazsa bırakılmaz. Yarış yok.

Parmaklar taşı ezmek zorunda değil. Taş soğuksa soğuk, ılıksa ılık, ikisi de haber. Omuzlar, çene, dil bırakılabilir; ağırlık avuçta kalabilir. Zihin atayım diyebilir, sonsuza kadar tutayım da diyebilir. İkisini de şimdi yapmak zorunda değilsin. Şimdi sadece ağırlığı fark etmek.

İstersen taşı yavaşça bir masaya ya da dize bırakırsın. Bırakmazsan da avuç duruyor. Gözler yavaşça odaya dönüyor, eller duruyor. Taşı bir sınav haline getirmeyeceksin. Ağırlık durabilir. Sen duruyorsun. Atmak zorunda değilsin, sonsuza kadar tutmak da değil. Bu birkaç dakika yeter.`,

    `These few minutes are not a treatment. A weight in the palm. It can be a stone, a key, a phone, or only the weight of the palm itself. Whichever is there, that. No squeezing. Only holding, then setting down.

Feet on the floor, back supported, palm open or half closed. Weight down. Down is not an order. It is gravity. The breath does not carry the stone. The stone does not hold the breath. They sit side by side. Air arrives and leaves. The weight stays.

The mind can turn the stone into a meaning: blame, duty, trouble. Those sentences can arrive. You do not load the stone with meaning. Only weight, heat, edge. Inside you may say there is weight in my palm. Do not look for proof. On each exhale a millimetre can be released. If it is not, it is not. No race.

The fingers do not have to crush the stone. If the stone is cold, cold. If warm, warm. Both are news. The shoulders, the jaw, the tongue can drop. The weight can stay in the palm. The mind can say throw it. It can also say hold it forever. You do not have to do either now. Now you only notice the weight.

If you want, you set the stone down slowly on a table or a knee. If you do not, the palm still stays. The eyes come back slowly to the room. The hands stay. You will not turn the stone into an exam. The weight can stay. You stay. You do not have to throw it. You do not have to keep it forever. These few minutes are enough.`,

    `Estos minutos no son un tratamiento. Un peso en la palma. Puede ser una piedra, una llave, un teléfono, o solo el peso de la palma. Lo que haya. Sin apretar. Solo sostener, luego dejar.

Los pies en el suelo, la espalda apoyada, la palma abierta o a medio cerrar. El peso hacia abajo. Abajo no es una orden. Es gravedad. El aire no carga la piedra. La piedra no sujeta el aire. Van juntas. El aire llega y se va. El peso sigue.

La mente puede convertir la piedra en un significado: culpa, deber, problema. Esas frases pueden llegar. No cargas la piedra de sentido. Solo peso, calor, borde. Por dentro puedes decir hay peso en mi palma. No busques una prueba. En cada exhalación se puede soltar un milímetro. Si no, no. Sin carrera.

Los dedos no tienen que aplastar la piedra. Si la piedra está fría, fría. Si tibia, tibia. Las dos son noticia. Los hombros, la mandíbula, la lengua pueden caer. El peso puede quedarse en la palma. La mente puede decir tírala. También puede decir reténla para siempre. No tienes que hacer ninguna de las dos ahora. Ahora solo notas el peso.

Si quieres, dejas la piedra despacio en una mesa o en una rodilla. Si no, la palma sigue. Los ojos vuelven despacio a la habitación. Las manos siguen. No vas a convertir la piedra en un examen. El peso puede quedarse. Tú te quedas. No tienes que tirarla. Tampoco guardarla para siempre. Estos minutos bastan.`,

    `Questi minuti non sono una cura. Un peso nel palmo. Può essere una pietra, una chiave, un telefono, o solo il peso del palmo. Quello che c’è. Senza stringere. Solo tenere, poi posare.

Piedi a terra, schiena appoggiata, palmo aperto o mezzo chiuso. Peso in basso. Basso non è un ordine. È gravità. Il respiro non porta la pietra. La pietra non tiene il respiro. Stanno accanto. L’aria arriva e se ne va. Il peso resta.

La mente può trasformare la pietra in un significato: colpa, dovere, problema. Quelle frasi possono arrivare. Non carichi la pietra di senso. Solo peso, calore, bordo. Dentro puoi dire c’è peso nel palmo. Non cercare una prova. A ogni espirazione si può lasciare un millimetro. Se no, no. Niente gara.

Le dita non devono schiacciare la pietra. Se la pietra è fredda, fredda. Se tiepida, tiepida. Tutte e due sono notizia. Le spalle, la mascella, la lingua possono cadere. Il peso può restare nel palmo. La mente può dire buttala. Può anche dire tienila per sempre. Non devi fare nessuna delle due ora. Ora noti solo il peso.

Se vuoi, posi la pietra piano su un tavolo o su un ginocchio. Se non lo fai, il palmo resta. Gli occhi tornano piano alla stanza. Le mani restano. Non farai della pietra un esame. Il peso può restare. Tu resti. Non devi buttarla. Non devi tenerla per sempre. Questi minuti bastano.`,

    `Bu bir neçə dəqiqə müalicə deyil. Ovucda bir ağırlıq. Daş ola bilər, açar, telefon, və ya yalnız ovucun öz ağırlığı. Hansı varsa, o. Sıxmaq yoxdur. Yalnız tutmaq, sonra buraxmaq.

Ayaqlar yerdə, bel dayaqlı, ovuc açıq və ya yarı bağlı. Ağırlıq aşağıdadır. Aşağı əmr deyil, cazibə. Nəfəs daşı daşımır, daş nəfəsi tutmur. Yan-yana dururlar. Hava girir və çıxır, ağırlıq durur.

Ağıl daşı bir mənaya çevirə bilər: günah, vəzifə, dərd. Bu cümlələr gələ bilər. Daşa məna yükləmirsən. Yalnız ağırlıq, istilik, kənar. İçindən ovucumda ağırlıq var deyə bilərsən. Sübut axtarma. Hər verişdə milim buraxıla bilər; buraxılmazsa buraxılmaz. Yarış yoxdur.

Barmaqlar daşı əzmək məcburiyyətində deyil. Daş soyuqsa soyuq, istidirsə isti, hər ikisi xəbərdir. Çiyinlər, çənə, dil buraxıla bilər; ağırlıq ovucda qala bilər. Ağıl atım deyə bilər, sonsuza qədər tutum da. İkisini də indi etmək məcburiyyətində deyilsən. İndi yalnız ağırlığı görmək.

İstəsən daşı yavaşca masaya və ya dizə qoyursan. Qoymasan da ovuc durur. Gözlər yavaşca otağa qayıdır, əllər durur. Daşı imtahan etməyəcəksən. Ağırlıq qala bilər. Sən durursan. Atmaq məcburiyyətində deyilsən, sonsuza qədər tutmaq da deyil. Bu bir neçə dəqiqə bəsdir.`,

    `Эти несколько минут — не лечение. Вес на ладони. Это может быть камень, ключ, телефон, или только вес самой ладони. Что есть — то и есть. Не сжимать. Только держать, потом положить.

Стопы на полу, спина с опорой, ладонь открыта или полузакрыта. Вес вниз. Вниз — не приказ. Это сила тяжести. Дыхание не несёт камень. Камень не держит дыхание. Они рядом. Воздух входит и выходит. Вес остаётся.

Ум может превратить камень в смысл: вина, долг, беда. Эти фразы могут прийти. Ты не нагружаешь камень смыслом. Только вес, тепло, край. Внутри можно сказать: на ладони есть вес. Не ищи доказательства. На каждом выдохе можно отпустить миллиметр. Если нет — нет. Без гонки.

Пальцам не нужно давить камень. Если камень холодный — холодный. Если тёплый — тёплый. Оба — новость. Плечи, челюсть, язык могут опуститься. Вес может остаться на ладони. Ум может сказать брось. Может сказать держи навсегда. Сейчас не нужно делать ни то ни другое. Сейчас ты только замечаешь вес.

Если хочешь, медленно кладёшь камень на стол или на колено. Если нет — ладонь всё равно остаётся. Глаза медленно возвращаются в комнату. Руки остаются. Ты не сделаешь из камня экзамен. Вес может остаться. Ты остаёшься. Бросать не нужно. Держать навсегда тоже нет. Этих нескольких минут достаточно.`,
  ),

  'shore-seed': pack(
    `Bu birkaç dakika bir tedavi değil. Tek bir kare, tek bir tohum. Bütün geceyi, bütün hayatı planlamak yok. Sadece bir şey. Küçük. Tutulabilir.

Gözler kapanabilir. Bir sahne seçiyorsun. Büyük olmak zorunda değil: bir fincan, bir pencere, bir kumaş, bir isim. Hangisi gelirse o. Değiştirmiyorsun, zenginleştirmiyorsun. Tek kare.

Tohum nefesi yönetmez, nefes tohumu büyütmez. İkisi yan yana. Hava giriyor ve çıkıyor, kare duruyor. Zihin kareyi bir plana çevirebilir: yarın, liste, düzeltme. Bu cümleler gelebilir. Planı kovalamıyorsun. Kareye dönüyorsun: avuç, taban, bu nefes.

İçinden bir karem var diyebilirsin. Kanıt arama. Tohumu zorla büyütmüyorsun. Bu gece filizlenmek zorunda değil. Sadece durmak. Omuzlar, çene, dil kendi ağırlıklarında. Kare zihinde solabilir; solursa avuca dönüyorsun, ısıya ve kenara, sonra isterse aynı kare yine.

Küçük bir şükran, bağırış değil: bu kumaş, bu nefes, bu oda. Fazlası yok. Gözler yavaşça odaya dönüyor, eller duruyor. Tohum sende kalabilir. Götürmek zorunda değilsin, bırakmak da zorunda değilsin. Tohumu bir sınav haline getirmeyeceksin. Tek kare yeter. Oda duruyor. Sen duruyorsun. Bu birkaç dakika yeter.`,

    `These few minutes are not a treatment. One frame, one seed. No plan for the whole night, or the whole life. Only one thing. Small. Holdable.

The eyes can close. You choose one scene. It does not have to be large: a cup, a window, a cloth, a name. Whichever arrives, that. You do not swap it. You do not enrich it. One frame.

The seed does not manage the breath. The breath does not grow the seed. They sit side by side. Air arrives and leaves. The frame stays. The mind can turn the frame into a plan: tomorrow, a list, a fix. Those sentences can arrive. You do not chase the plan. You return to the frame: the palm, the sole, this breath.

Inside you may say I have one frame. Do not look for proof. You do not force the seed to grow. It does not have to sprout tonight. Only stay. The shoulders, the jaw, the tongue rest in their own weight. The frame can fade in the mind. If it fades, you return to the palm, to heat and edge, and then, if it wants, the same frame again.

A small thanks, not a shout: this cloth, this breath, this room. Nothing extra. The eyes come back slowly to the room. The hands stay. The seed can stay with you. You do not have to carry it away. You do not have to leave it. You will not turn the seed into an exam. One frame is enough. The room stays. You stay. These few minutes are enough.`,

    `Estos minutos no son un tratamiento. Un solo fotograma, una semilla. No hay un plan para toda la noche ni para toda la vida. Solo una cosa. Pequeña. Que se puede sostener.

Los ojos pueden cerrarse. Eliges una escena. No tiene que ser grande: una taza, una ventana, una tela, un nombre. Lo que llegue, eso. No la cambias. No la enriquezcas. Un fotograma.

La semilla no gestiona el aire. El aire no hace crecer la semilla. Van juntas. El aire llega y se va. El fotograma sigue. La mente puede convertir el fotograma en un plan: mañana, una lista, un arreglo. Esas frases pueden llegar. No persigues el plan. Vuelves al fotograma: la palma, la planta, este aliento.

Por dentro puedes decir tengo un fotograma. No busques una prueba. No fuerzas la semilla a crecer. No tiene que brotar esta noche. Solo quedarse. Los hombros, la mandíbula, la lengua están en su peso. El fotograma puede desvanecerse. Si se desvanece, vuelves a la palma, al calor y al borde, y luego, si quiere, el mismo fotograma otra vez.

Una pequeña gracia, no un grito: esta tela, este aliento, esta habitación. Nada de más. Los ojos vuelven despacio a la habitación. Las manos siguen. La semilla puede quedarse contigo. No tienes que llevártela. Tampoco dejarla. No vas a convertir la semilla en un examen. Un fotograma basta. La habitación sigue. Tú sigues. Estos minutos bastan.`,

    `Questi minuti non sono una cura. Un solo fotogramma, un seme. Niente piano per tutta la notte, né per tutta la vita. Solo una cosa. Piccola. Che si può tenere.

Gli occhi possono chiudersi. Scegli una scena. Non deve essere grande: una tazza, una finestra, una stoffa, un nome. Quella che arriva, quella. Non la cambi. Non la arricchisci. Un fotogramma.

Il seme non gestisce il respiro. Il respiro non fa crescere il seme. Stanno accanto. L’aria arriva e se ne va. Il fotogramma resta. La mente può trasformare il fotogramma in un piano: domani, una lista, una correzione. Quelle frasi possono arrivare. Non insegui il piano. Torni al fotogramma: il palmo, la pianta, questo respiro.

Dentro puoi dire ho un fotogramma. Non cercare una prova. Non forzi il seme a crescere. Non deve germogliare stanotte. Solo restare. Le spalle, la mascella, la lingua restano nel proprio peso. Il fotogramma può sbiadire. Se sbiadisce, torni al palmo, al calore e al bordo, e poi, se vuole, lo stesso fotogramma di nuovo.

Un piccolo grazie, non un grido: questa stoffa, questo respiro, questa stanza. Niente in più. Gli occhi tornano piano alla stanza. Le mani restano. Il seme può restare con te. Non devi portarlo via. Non devi lasciarlo. Non farai del seme un esame. Un fotogramma basta. La stanza resta. Tu resti. Questi minuti bastano.`,

    `Bu bir neçə dəqiqə müalicə deyil. Tək bir kadr, tək bir toxum. Bütün gecəni, bütün həyatı planlamaq yoxdur. Yalnız bir şey. Kiçik. Tutula bilər.

Gözlər bağlana bilər. Bir səhnə seçirsən. Böyük olmaq məcburiyyətində deyil: bir fincan, bir pəncərə, bir parça, bir ad. Hansı gəlirsə, o. Dəyişdirmirsən, zənginləşdirmirsən. Tək kadr.

Toxum nəfəsi idarə etmir, nəfəs toxumu böyütmür. Yan-yana dururlar. Hava girir və çıxır, kadr durur. Ağıl kadri bir plana çevirə bilər: sabah, siyahı, düzəliş. Bu cümlələr gələ bilər. Planı qovmursan. Kadrə qayıdırsan: ovuc, ayaq altı, bu nəfəs.

İçindən bir kadrım var deyə bilərsən. Sübut axtarma. Toxumu zorla böyütmürsən. Bu gecə cücərmək məcburiyyətində deyil. Yalnız durmaq. Çiyinlər, çənə, dil öz ağırlığındadır. Kadr ağılda sönə bilər; sönərsə ovuca qayıdırsan, istiliyə və kənara, sonra istəsə eyni kadr yenə.

Kiçik bir minnətdarlıq, qışqırıq deyil: bu parça, bu nəfəs, bu otaq. Artığı yoxdur. Gözlər yavaşca otağa qayıdır, əllər durur. Toxum səndə qala bilər. Aparmaq məcburiyyətində deyilsən, buraxmaq da. Toxumu imtahan etməyəcəksən. Tək kadr bəsdir. Otaq durur. Sən durursan. Bu bir neçə dəqiqə bəsdir.`,

    `Эти несколько минут — не лечение. Один кадр, одно семя. Нет плана на всю ночь и на всю жизнь. Только одна вещь. Маленькая. Её можно удержать.

Глаза могут закрыться. Ты выбираешь одну сцену. Ей не нужно быть большой: чашка, окно, ткань, имя. Что пришло — то. Ты не меняешь. Не украшаешь. Один кадр.

Семя не управляет дыханием. Дыхание не растит семя. Они рядом. Воздух входит и выходит. Кадр остаётся. Ум может превратить кадр в план: завтра, список, исправление. Эти фразы могут прийти. Ты не гонишься за планом. Ты возвращаешься к кадру: ладонь, стопа, это дыхание.

Внутри можно сказать: у меня есть один кадр. Не ищи доказательства. Ты не заставляешь семя расти. Ему не нужно взойти этой ночью. Только оставаться. Плечи, челюсть, язык в своём весе. Кадр может растаять в уме. Если растаял — ты возвращаешься к ладони, к теплу и краю, и потом, если захочет, тот же кадр снова.

Маленькая благодарность, не крик: эта ткань, этот вдох, эта комната. Ничего лишнего. Глаза медленно возвращаются в комнату. Руки остаются. Семя может остаться с тобой. Уносить его не нужно. Оставлять тоже не нужно. Ты не сделаешь из семени экзамен. Одного кадра достаточно. Комната остаётся. Ты остаёшься. Этих нескольких минут достаточно.`,
  ),
}

export function medBody(id: string) {
  return MED_SCRIPTS[id]?.tr ?? ''
}
