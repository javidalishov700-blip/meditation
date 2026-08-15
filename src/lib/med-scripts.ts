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
 * Spoken meditations. One thread each. Present tense, body, calming.
 * Not a treatment. No “relax now” orders. No diagnosis.
 */
export const MED_SCRIPTS: Record<string, Record<LocaleId, string>> = {
  'first-settle': pack(
    `Bu bir tedavi değildir. Birkaç dakika, sadece yerleşmek için. Oturuyorsun veya yatıyorsun. Doğru bir pozisyon yok. Omurga bir sütun olmak zorunda değil. Sandalye veya yatak seni tutuyor. Kumaşın dokunuşu var. Isı veya serinlik var. Bu yeter.

Gözler kapanabilir, yarı açık da kalabilir. Odadaki ışık aynı ışık. Pencere aynı pencere. Dışarıdaki sesler de odanın parçası. Onları kapatmana gerek yok.

Alnını fark et. Kaşların gerilmesine gerek yok. Göz kapakları ağırsa ağır. Çene yumuşak durabilir. Dişler birbirine kenetlenmek zorunda değil. Dil, üst dişlerin arkasında durabilir. Küçük bir yer. Güvenli bir yer.

Şimdi üç nefes. Değiştirmiyorsun. Yönetmiyorsun. Hava giriyor. Hava çıkıyor. Alışta burunda biraz serinlik olabilir. Verişte biraz daha ılık. Bu bir teknik değil. Sadece duyum.

Boynun iki yanı. Kulaklar. Omuzlar kulaklara yapışmak zorunda değil. Bir milim boşluk olsa da olur. Avuçlar uylukta veya yanlarda. Parmaklar kıvrılmak zorunda değil. Karın, nefesle hafifçe hareket edebilir. Zorlama yok.

Ayaklar yerdeyse yer seni tutuyor. Topuk. Kemer. Parmak uçları. Yatıyorsan yatak tutuyor. Ağırlık aşağıda durabilir. Yarış yok.

Zihin bir listeye dönerse, bu bir hata değil. Listeler böyle yapar. Bir bölgeye dön. Çene, veya avuç, veya taban. Sonra yine bu nefese.

İçinden, yavaş: buradayım. Kanıt arama. Cümle, duyumun yanında duruyor. Oda çalışmıyor senin için. Sen odadasın.

Omuzların ağırlığı. Göğsün önü. Nefes orada da olabilir, burunda da. Hangisi daha netse orada kal. Üç nefes daha. Alış. Veriş. Alış. Veriş. Alış. Veriş.

Sesler varsa sesler. Uzak bir motor, bir kuş, bir boru, bir adım. Oda onları da tutuyor. Sen de tutuluyorsun.

Bir veriş. Sonra bir tane daha. Zihin giderse bir avuca dön. Isı. Kenar. Gerçek.

Alın bir kez daha. Çene. Avuçlar. Tabanlar. Son üç nefes. Acele yok.

Bırakış: bunu bir performans haline getirmeyeceksin. Oturduğun yer duruyor. Sen de duruyorsun. Bu birkaç dakika yeter.`,
    `This is not a treatment. A few minutes, only to arrive. You sit or you lie down. There is no correct pose. The spine does not have to be a column. The chair or the bed is holding you. There is cloth. Heat or cool. That is enough.

The eyes may close, or stay half-open. The light in the room is the same light. The window is the same window. Sounds outside are part of the room. You do not have to shut them out.

Notice the forehead. The brows do not have to tighten. If the eyelids are heavy, they are heavy. The jaw can stay soft. The teeth do not have to lock. The tongue can rest behind the upper teeth. A small place. A safe place.

Three breaths now. You are not changing them. You are not managing them. Air arrives. Air leaves. On the in-breath there may be a little cool at the nose. On the out-breath, a little warmer. This is not a technique. Only a sensation.

The sides of the neck. The ears. The shoulders do not have to climb toward the ears. A millimetre of space is enough. Palms on the thighs or at the sides. The fingers do not have to curl. The belly may move a little with the breath. No force.

If the feet are on the floor, the floor is holding you. Heel. Arch. Toes. If you are lying down, the bed is holding you. Weight can rest low. There is no race.

If the mind returns to a list, that is not a mistake. Lists do that. Come back to one place. Jaw, or palm, or sole. Then this breath again.

Quietly, inside: I am here. Do not look for proof. The sentence stands next to the sensation. The room is not working for you. You are in the room.

The weight of the shoulders. The front of the chest. The breath may be there, or at the nose. Stay where it is clearer. Three more breaths. In. Out. In. Out. In. Out.

If there are sounds, there are sounds. A distant engine, a bird, a pipe, a footstep. The room holds them too. You are being held as well.

One out-breath. Then another. If the mind leaves, return to one palm. Heat. Edge. Actual.

Forehead once more. Jaw. Palms. Soles. Last three breaths. No hurry.

Release: you will not turn this into a performance. The place you sit stays. You stay. These few minutes are enough.`,
    `Esto no es un tratamiento. Unos minutos, solo para llegar. Estás sentada o tumbada. No hay una pose correcta. La columna no tiene que ser una columna de mármol. La silla o la cama te sostiene. Hay tela. Calor o fresco. Basta.

Los ojos pueden cerrarse o quedar entornados. La luz de la habitación es la misma. La ventana es la misma. Los sonidos de fuera son parte de la habitación. No tienes que apagarlos.

Nota la frente. Las cejas no tienen que tensarse. Si los párpados están pesados, están pesados. La mandíbula puede quedar suave. Los dientes no tienen que cerrarse con fuerza. La lengua puede descansar detrás de los dientes de arriba. Un sitio pequeño. Un sitio seguro.

Tres respiraciones ahora. No las cambias. No las gestionas. El aire llega. El aire se va. Al entrar puede haber un poco de fresco en la nariz. Al salir, un poco más tibio. Esto no es una técnica. Solo una sensación.

Los lados del cuello. Las orejas. Los hombros no tienen que subir hacia las orejas. Un milímetro de espacio basta. Palmas en los muslos o a los lados. Los dedos no tienen que cerrarse. El vientre puede moverse un poco con el aliento. Sin fuerza.

Si los pies están en el suelo, el suelo te sostiene. Talón. Arco. Dedos. Si estás tumbada, la cama te sostiene. El peso puede quedar abajo. No hay carrera.

Si la mente vuelve a una lista, no es un error. Las listas hacen eso. Vuelve a un sitio. Mandíbula, o palma, o planta. Luego otra vez este aliento.

Por dentro, despacio: estoy aquí. No busques una prueba. La frase está junto a la sensación. La habitación no trabaja para ti. Tú estás en la habitación.

El peso de los hombros. El pecho por delante. El aliento puede estar ahí, o en la nariz. Quédate donde se note más. Tres respiraciones más. Entra. Sale. Entra. Sale. Entra. Sale.

Si hay sonidos, hay sonidos. Un motor lejano, un pájaro, una tubería, un paso. La habitación también los sostiene. A ti también te sostienen.

Una exhalación. Luego otra. Si la mente se va, vuelve a una palma. Calor. Borde. Real.

La frente otra vez. Mandíbula. Palmas. Plantas. Las últimas tres respiraciones. Sin prisa.

Suelta: no vas a convertir esto en una actuación. El sitio donde estás sigue. Tú sigues. Estos minutos bastan.`,
    `Non è una cura. Pochi minuti, solo per arrivare. Sei seduta o sdraiata. Non c’è una posa giusta. La schiena non deve essere una colonna. La sedia o il letto ti tiene. C’è stoffa. Caldo o fresco. Basta.

Gli occhi possono chiudersi o restare socchiusi. La luce della stanza è la stessa. La finestra è la stessa. I suoni fuori fanno parte della stanza. Non devi spegnerli.

Nota la fronte. Le sopracciglia non devono stringersi. Se le palpebre sono pesanti, sono pesanti. La mascella può restare morbida. I denti non devono chiudersi a forza. La lingua può stare dietro i denti di sopra. Un posto piccolo. Un posto sicuro.

Tre respiri ora. Non li cambi. Non li gestisci. L’aria arriva. L’aria se ne va. All’ingresso può esserci un poco di fresco al naso. All’uscita, un poco più tiepido. Non è una tecnica. Solo una sensazione.

I lati del collo. Le orecchie. Le spalle non devono salire verso le orecchie. Un millimetro di spazio basta. Palmi sulle cosce o ai lati. Le dita non devono chiudersi. La pancia può muoversi un poco con il respiro. Senza forza.

Se i piedi sono a terra, la terra ti tiene. Tallone. Arco. Dita. Se sei sdraiata, il letto ti tiene. Il peso può stare in basso. Non c’è una gara.

Se la mente torna a una lista, non è un errore. Le liste fanno così. Torna a un punto. Mascella, o palmo, o pianta. Poi di nuovo questo respiro.

Dentro, piano: sono qui. Non cercare una prova. La frase sta accanto alla sensazione. La stanza non lavora per te. Tu sei nella stanza.

Il peso delle spalle. Il petto davanti. Il respiro può essere lì, o al naso. Resta dove è più chiaro. Altri tre respiri. Entra. Esce. Entra. Esce. Entra. Esce.

Se ci sono suoni, ci sono suoni. Un motore lontano, un uccello, un tubo, un passo. La stanza li tiene anche loro. Anche tu sei tenuta.

Un’espirazione. Poi un’altra. Se la mente parte, torna a un palmo. Calore. Bordo. Vero.

La fronte ancora. Mascella. Palmi. Piante. Ultimi tre respiri. Senza fretta.

Rilascio: non farai di questo una recita. Il posto dove sei resta. Tu resti. Questi minuti bastano.`,
    `Bu müalicə deyil. Bir neçə dəqiqə, yalnız yerləşmək üçün. Oturursan və ya uzanırsan. Düzgün poza yoxdur. Onurğa sütun olmaq məcburiyyətində deyil. Stul və ya çarpayı səni tutur. Parça var. İstilik və ya sərinlik var. Bu bəsdir.

Gözlər bağlana bilər, yarıaçıq da qala bilər. Otaqdakı işıq eyni işıqdır. Pəncərə eyni pəncərədir. Çöl səsləri də otağın parçasıdır. Onları bağlamağa ehtiyac yoxdur.

Alnını duy. Qaşlar gərilmək məcburiyyətində deyil. Göz qapaqları ağırdırsa ağırdır. Çənə yumşaq dura bilər. Dişlər sıxılmaq məcburiyyətində deyil. Dil üst dişlərin arxasında dura bilər. Kiçik bir yer. Təhlükəsiz bir yer.

İndi üç nəfəs. Dəyişdirmirsən. İdarə etmirsən. Hava gəlir. Hava çıxır. Alışda burunda bir az sərinlik ola bilər. Verişdə bir az ilıq. Bu texnika deyil. Yalnız duyum.

Boyunun iki yanı. Qulaqlar. Çiyinlər qulaqlara yapışmaq məcburiyyətində deyil. Bir milim boşluq olsa da olar. Ovuc budda və ya yanlarda. Barmaqlar bükülmək məcburiyyətində deyil. Qarın nəfəslə bir az hərəkət edə bilər. Məcburiyyət yoxdur.

Ayaqlar yerdədirsə yer səni tutur. Daban. Tağ. Barmaq ucları. Uzanırsansa çarpayı tutur. Ağırlıq aşağıda dura bilər. Yarış yoxdur.

Ağıl siyahıya qayıdarsa bu səhv deyil. Siyahılar belə edir. Bir yerə qayıt. Çənə, ya ovuc, ya ayaq altı. Sonra yenə bu nəfəsə.

İçindən, yavaş: buradayam. Sübut axtarma. Cümlə duyumun yanında durur. Otaq sənin üçün işləmir. Sən otaqdasan.

Çiyinlərin ağırlığı. Sinənin önü. Nəfəs orada da ola bilər, burunda da. Hansı daha aydındırsa orada qal. Daha üç nəfəs. Alış. Veriş. Alış. Veriş. Alış. Veriş.

Səslər varsa səslər. Uzaq mühərrik, quş, boru, addım. Otaq onları da tutur. Sən də tutulursan.

Bir veriş. Sonra bir də. Ağıl getsə bir ovuca qayıt. İstilik. Kənar. Gerçək.

Alın bir də. Çənə. Ovuc. Ayaq altı. Son üç nəfəs. Tələsmə.

Buraxılış: bunu tamaşa etməyəcəksən. Oturduğun yer durur. Sən də durursan. Bu dəqiqələr bəsdir.`,
    `Это не лечение. Несколько минут — только чтобы прибыть. Ты сидишь или лежишь. Правильной позы нет. Позвоночник не обязан быть колонной. Стул или кровать держит тебя. Есть ткань. Тепло или прохлада. Этого достаточно.

Глаза могут закрыться или остаться полуоткрытыми. Свет в комнате тот же. Окно то же. Звуки снаружи — часть комнаты. Тебе не нужно их выключать.

Заметь лоб. Бровям не нужно напрягаться. Если веки тяжёлые — тяжёлые. Челюсть может оставаться мягкой. Зубам не нужно сжиматься. Язык может лежать за верхними зубами. Маленькое место. Безопасное место.

Сейчас три дыхания. Ты их не меняешь. Не управляешь. Воздух приходит. Воздух уходит. На вдохе у носа может быть чуть прохладнее. На выдохе — чуть теплее. Это не техника. Только ощущение.

Стороны шеи. Уши. Плечам не нужно подниматься к ушам. Миллиметра пространства достаточно. Ладони на бёдрах или по бокам. Пальцам не нужно сжиматься. Живот может чуть двигаться с дыханием. Без силы.

Если стопы на полу — пол держит тебя. Пятка. Свод. Пальцы. Если ты лежишь — кровать держит. Вес может оставаться внизу. Гонки нет.

Если ум возвращается к списку — это не ошибка. Списки так делают. Вернись к одному месту. Челюсть, или ладонь, или стопа. Потом снова к этому дыханию.

Внутри, тихо: я здесь. Не ищи доказательства. Предложение стоит рядом с ощущением. Комната не работает на тебя. Ты в комнате.

Вес плеч. Перед груди. Дыхание может быть там или в носу. Останься там, где яснее. Ещё три дыхания. Вдох. Выдох. Вдох. Выдох. Вдох. Выдох.

Если есть звуки — есть звуки. Далёкий мотор, птица, труба, шаг. Комната держит и их. Тебя тоже держат.

Один выдох. Потом ещё. Если ум ушёл — вернись к одной ладони. Тепло. Край. Настоящее.

Лоб ещё раз. Челюсть. Ладони. Стопы. Последние три дыхания. Без спешки.

Отпускание: ты не сделаешь из этого представление. Место, где ты сидишь, остаётся. Ты остаёшься. Этих минут достаточно.`,
  ),

  'first-breath': pack(
    `Bu bir tedavi değildir. Nefesi bir proje haline getirmeyeceksin. Sadece izliyorsun. Hava zaten geliyor. Hava zaten gidiyor. Sen hakem değilsin. Seyirci gibisin, yumuşak bir seyirci.

Nerede daha net. Burun delikleri. Üst dudak. Göğsün önü. Kaburgaların yanları. Karın. Bir yer seç. Orada kal. Doğru yer yok. Net olan yer var.

Alış. Göğüs hafifçe genişleyebilir. Veriş. Göğüs kendi kendine iner. Uzun yapmak zorunda değilsin. Kısa yapmak zorunda değilsin. Ritmi düzeltme. Bu nefes, bu nefes.

Üç nefes burada. Alış. Veriş. Alış. Veriş. Alış. Veriş.

Zihin bir cümleye giderse, cümle de nefes gibi gelir ve gider. Onu kovalama. Bir verişe dön. Havanın bittiği yer. Omuzlar o verişte bir şey kanıtlamak zorunda değil. İnebilirler. İnmezlerse de olur.

Veriş biraz uzun olabilir. Zorlama. Uzun olsun diye çekme. Kendiliğinden uzunsa uzun. Değilse değil. İki nefes. Sadece iz.

İçinden: izliyorum. Yönetmiyorum. Bu bir slogan değil. Avuçlar duruyor. Tabanlar duruyor. Nefes geçiyor.

Burun ucu. Serinlik alışta. Biraz daha ılık verişte. Küçük bir fark. Yeter.

Zihin plan yaparsa planı izleme. Plan sonra da durur. Şimdi bir veriş yeter. Boyun. Çene. Nefes onları düzeltmek zorunda değil. Onlar duruyor. Nefes geçiyor.

Alış. Küçük bir bekleme. Veriş. Küçük bir bekleme. Boşluk varsa boşluk. Doldurma. Hava bitmesin diye yarışma. Akciğerler işini biliyor.

Omuzlar. Karın. Burun. Son dört nefes. Saymayı skora çevirme. Bitene kadar izle. Alış. Veriş. Alış. Veriş. Alış. Veriş. Alış. Veriş.

Oda duruyor. Sen duruyorsun. Nefes de durmuyor, geçiyor. Bu izlemek yeter.`,
    `This is not a treatment. You will not turn the breath into a project. You are only watching. Air is already arriving. Air is already leaving. You are not the referee. You are a watcher, a soft one.

Where it is clearer. The nostrils. The upper lip. The front of the chest. The sides of the ribs. The belly. Pick one place. Stay there. There is no correct place. There is the place that is clear.

In. The chest may widen a little. Out. The chest falls on its own. You do not have to make it long. You do not have to make it short. Do not correct the rhythm. This breath, this breath.

Three breaths here. In. Out. In. Out. In. Out.

If the mind goes to a sentence, the sentence also arrives and leaves, like breath. Do not chase it. Return to one exhale. The place where the air ends. The shoulders do not have to prove anything on that exhale. They may drop. If they do not, that is all right.

The exhale may be a little longer. Do not force it. Do not pull it to make it long. If it is long by itself, it is long. If not, not. Two breaths. Only watch.

Inside: I am watching. I am not managing. This is not a slogan. The palms stay. The soles stay. The breath passes.

The tip of the nose. Cool on the in-breath. A little warmer on the out. A small difference. Enough.

If the mind makes a plan, do not follow the plan. The plan can wait. Right now one exhale is enough. Neck. Jaw. The breath does not have to fix them. They stay. The breath passes.

In. A small pause. Out. A small pause. If there is a gap, there is a gap. Do not fill it. Do not race so the air will not run out. The lungs know the work.

Shoulders. Belly. Nose. Last four breaths. Do not turn the count into a score. Watch until they finish. In. Out. In. Out. In. Out. In. Out.

The room stays. You stay. The breath does not stay — it passes. Watching is enough.`,
    `Esto no es un tratamiento. No vas a convertir el aliento en un proyecto. Solo miras. El aire ya llega. El aire ya se va. No eres árbitro. Eres quien mira, con suavidad.

Dónde se nota más. Las fosas. El labio de arriba. El pecho por delante. Los lados de las costillas. El vientre. Elige un sitio. Quédate ahí. No hay un sitio correcto. Hay el sitio claro.

Entra. El pecho puede ensancharse un poco. Sale. El pecho baja solo. No tienes que alargarlo. No tienes que acortarlo. No corrijas el ritmo. Este aliento, este aliento.

Tres respiraciones aquí. Entra. Sale. Entra. Sale. Entra. Sale.

Si la mente se va a una frase, la frase también llega y se va, como el aliento. No la persigas. Vuelve a una exhalación. El sitio donde el aire termina. Los hombros no tienen que demostrar nada en esa exhalación. Pueden bajar. Si no bajan, está bien.

La exhalación puede ser un poco más larga. No fuerces. No la estires. Si es larga sola, es larga. Si no, no. Dos respiraciones. Solo mira.

Por dentro: miro. No gestiono. Esto no es un lema. Las palmas están. Las plantas están. El aliento pasa.

La punta de la nariz. Fresco al entrar. Un poco más tibio al salir. Una diferencia pequeña. Basta.

Si la mente hace un plan, no sigas el plan. El plan puede esperar. Ahora una exhalación basta. Cuello. Mandíbula. El aliento no tiene que arreglarlos. Ellos están. El aliento pasa.

Entra. Una pausa pequeña. Sale. Una pausa pequeña. Si hay un hueco, hay un hueco. No lo llenes. No corras para que no se acabe el aire. Los pulmones saben el trabajo.

Hombros. Vientre. Nariz. Las últimas cuatro respiraciones. No conviertas la cuenta en un marcador. Mira hasta que terminen. Entra. Sale. Entra. Sale. Entra. Sale. Entra. Sale.

La habitación sigue. Tú sigues. El aliento no se queda: pasa. Mirar basta.`,
    `Non è una cura. Non farai del respiro un progetto. Guardi soltanto. L’aria sta già arrivando. L’aria sta già andando. Non sei l’arbitro. Sei chi guarda, con dolcezza.

Dove è più chiaro. Le narici. Il labbro di sopra. Il petto davanti. I lati delle costole. La pancia. Scegli un punto. Resta lì. Non c’è un punto giusto. C’è il punto chiaro.

Entra. Il petto può allargarsi un poco. Esce. Il petto scende da solo. Non devi allungarlo. Non devi accorciarlo. Non correggere il ritmo. Questo respiro, questo respiro.

Tre respiri qui. Entra. Esce. Entra. Esce. Entra. Esce.

Se la mente va a una frase, anche la frase arriva e se ne va, come il respiro. Non inseguirla. Torna a un’espirazione. Il punto in cui l’aria finisce. Le spalle non devono dimostrare niente in quell’espirazione. Possono scendere. Se non scendono, va bene.

L’espirazione può essere un poco più lunga. Non forzare. Non tirarla. Se è lunga da sola, è lunga. Se no, no. Due respiri. Guarda soltanto.

Dentro: guardo. Non gestisco. Non è uno slogan. I palmi restano. Le piante restano. Il respiro passa.

La punta del naso. Fresco all’ingresso. Un poco più tiepido all’uscita. Una piccola differenza. Basta.

Se la mente fa un piano, non seguire il piano. Il piano può aspettare. Adesso un’espirazione basta. Collo. Mascella. Il respiro non deve aggiustarli. Restano. Il respiro passa.

Entra. Una piccola pausa. Esce. Una piccola pausa. Se c’è uno spazio, c’è uno spazio. Non riempirlo. Non correre perché l’aria non finisca. I polmoni sanno il lavoro.

Spalle. Pancia. Naso. Ultimi quattro respiri. Non fare del conto un punteggio. Guarda finché finiscono. Entra. Esce. Entra. Esce. Entra. Esce. Entra. Esce.

La stanza resta. Tu resti. Il respiro non resta: passa. Guardare basta.`,
    `Bu müalicə deyil. Nəfəsi layihə etməyəcəksən. Yalnız izləyirsən. Hava artıq gəlir. Hava artıq çıxır. Sən hakim deyilsən. Tamaşaçısan, yumşaq bir tamaşaçı.

Harada daha aydındır. Burun dəlikləri. Üst dodaq. Sinənin önü. Qabırğaların yanı. Qarın. Bir yer seç. Orada qal. Düzgün yer yoxdur. Aydın olan yer var.

Alış. Sinə bir az açıla bilər. Veriş. Sinə öz-özünə enir. Uzun etmək məcburiyyətində deyilsən. Qısa etmək məcburiyyətində deyilsən. Ritmi düzəltmə. Bu nəfəs, bu nəfəs.

Burada üç nəfəs. Alış. Veriş. Alış. Veriş. Alış. Veriş.

Ağıl bir cümləyə getsə, cümlə də nəfəs kimi gəlir və gedir. Qovma. Bir verişə qayıt. Havanın bitdiyi yer. Çiyinlər o verişdə bir şey sübut etmək məcburiyyətində deyil. Enə bilər. Enməsə də olar.

Veriş bir az uzun ola bilər. Məcbur etmə. Uzun olsun deyə çəkmə. Öz-özünə uzundursa uzundur. Deyilsə deyil. İki nəfəs. Yalnız izlə.

İçindən: izləyirəm. İdarə etmirəm. Bu şüar deyil. Ovuc durur. Ayaq altı durur. Nəfəs keçir.

Burun ucu. Alışda sərin. Verişdə bir az ilıq. Kiçik fərq. Bəsdir.

Ağıl plan qurarsa planı izləmə. Plan sonra da durar. İndi bir veriş bəsdir. Boyun. Çənə. Nəfəs onları düzəltmək məcburiyyətində deyil. Onlar durur. Nəfəs keçir.

Alış. Kiçik gözləmə. Veriş. Kiçik gözləmə. Boşluq varsa boşluq. Doldurma. Hava bitməsin deyə yarışma. Ağciyərlər işini bilir.

Çiyinlər. Qarın. Burun. Son dörd nəfəs. Sayımı xala çevirmə. Bitənə qədər izlə. Alış. Veriş. Alış. Veriş. Alış. Veriş. Alış. Veriş.

Otaq durur. Sən durursan. Nəfəs durmur, keçir. İzləmək bəsdir.`,
    `Это не лечение. Ты не сделаешь из дыхания проект. Ты только смотришь. Воздух уже приходит. Воздух уже уходит. Ты не судья. Ты зритель, мягкий зритель.

Где яснее. Ноздри. Верхняя губа. Перед груди. Бока рёбер. Живот. Выбери одно место. Останься там. Правильного места нет. Есть ясное место.

Вдох. Грудь может чуть расшириться. Выдох. Грудь опускается сама. Не нужно делать его длинным. Не нужно делать его коротким. Не правь ритм. Это дыхание, это дыхание.

Здесь три дыхания. Вдох. Выдох. Вдох. Выдох. Вдох. Выдох.

Если ум уходит в фразу, фраза тоже приходит и уходит, как дыхание. Не гонись за ней. Вернись к одному выдоху. Место, где воздух кончается. Плечам не нужно ничего доказывать на этом выдохе. Они могут опуститься. Если нет — тоже хорошо.

Выдох может быть чуть длиннее. Не принуждай. Не тяни. Если он длинный сам — длинный. Если нет — нет. Два дыхания. Только смотри.

Внутри: я смотрю. Я не управляю. Это не лозунг. Ладони остаются. Стопы остаются. Дыхание проходит.

Кончик носа. Прохлада на вдохе. Чуть теплее на выдохе. Маленькая разница. Достаточно.

Если ум строит план — не иди за планом. План может подождать. Сейчас одного выдоха достаточно. Шея. Челюсть. Дыханию не нужно их чинить. Они остаются. Дыхание проходит.

Вдох. Маленькая пауза. Выдох. Маленькая пауза. Если есть промежуток — есть промежуток. Не заполняй. Не гонись, чтобы воздух не кончился. Лёгкие знают работу.

Плечи. Живот. Нос. Последние четыре дыхания. Не превращай счёт в очки. Смотри, пока они не закончатся. Вдох. Выдох. Вдох. Выдох. Вдох. Выдох. Вдох. Выдох.

Комната остаётся. Ты остаёшься. Дыхание не остаётся — проходит. Смотреть достаточно.`,
  ),

  'first-ground': pack(
    `Bu bir tedavi değildir. İki taban. Yer. Bu kadar basit ve bu kadar gerçek.

Ayaklar yerdeyse: topuk, kemer, parmak. Çorap varsa çorap. Çıplaksa çıplak. Daha sert basmak yok. Sayı yok. Sadece basınç. Yer seni tutuyor. Sen yeri tutmak zorunda değilsin.

Yatıyorsan topuklar yatakta, baldırlar, kalça, kürek kemikleri. Yatak da bir yer. O da tutuyor.

Üç nefes. Her verişte ağırlık milim aşağı inebilir. İnmezse inmez. Yarış yok.

İçinden: tabanlarım yerde. Kanıt arama. Cümle, duyumun yanında.

Sol taban. Sağ taban. İkisini eşitlemek zorunda değilsin. Biri daha net olabilir. O yeter. Dizler. Dizlerin ağırlığı aşağı. Kalçalar sandalyede veya yatakta. Pelvis duruyor. Zorunlu bir imge yok. Sadece ağırlık.

Eller. Avuçlar uylukta veya yanlarda. Onlar da bir yer. Parmak uçları. Zihin “gerçek gibi değil” derse, tartışma. Tabanlara dön. Basınç. Kumaş. Isı. Üç nefes.

Ayak bilekleri. İnce kemikler. Çorabın lastiği varsa lastik. Ayakkabı varsa ayakkabının içi. Detay küçük. Detay gerçek.

Omurga dik durmak zorunda değil. Bir milim kambur olsa da yer duruyor. İki nefes. İçinden yine: yer tutuyor. Ben duruyorum.

Başın ağırlığı boyunda. Boyun omuzlarda. Omuzlar gövdede. Gövde kalçada. Kalça yerde. Bir zincir. Koparmak yok. Sadece fark.

Zihin geleceğe giderse, taban. Geçmişe giderse, taban. Listeye giderse, taban. Sol. Sağ. İkisi.

Son dört nefes. Saymayı skora çevirme. Ayaklar. Yer. Oda. Sen.

Bırakış: yeri bir sınav haline getirmeyeceksin. Tabanlar duruyor. Yer duruyor. Sen de.`,
    `This is not a treatment. Two soles. The ground. This simple, and this actual.

If the feet are on the floor: heel, arch, toes. If there are socks, socks. If bare, bare. No pressing harder. No counting. Only pressure. The ground holds you. You do not have to hold the ground.

If you are lying down: heels in the bed, calves, hips, shoulder blades. A bed is also ground. It holds too.

Three breaths. On each exhale the weight may drop a millimetre. If it does not, it does not. No race.

Inside: my soles are on the floor. Do not look for proof. The sentence stands next to the sensation.

Left sole. Right sole. You do not have to make them equal. One may be clearer. That is enough. Knees. The weight of the knees downward. Hips in the chair or the bed. The pelvis stays. No required image. Only weight.

Hands. Palms on the thighs or at the sides. They are also a place. Fingertips. If the mind says it does not feel real, do not argue. Return to the soles. Pressure. Cloth. Heat. Three breaths.

Ankles. Thin bones. If there is an elastic of a sock, the elastic. If there are shoes, the inside of the shoe. The detail is small. The detail is actual.

The spine does not have to sit upright. A millimetre of curve, and the ground still stays. Two breaths. Inside again: the ground holds. I stay.

The weight of the head in the neck. The neck in the shoulders. The shoulders in the torso. The torso in the hips. The hips on the ground. A chain. Do not break it. Only notice.

If the mind goes to the future, the soles. If it goes to the past, the soles. If it goes to a list, the soles. Left. Right. Both.

Last four breaths. Do not turn the count into a score. Feet. Ground. Room. You.

Release: you will not turn the ground into an exam. The soles stay. The ground stays. So do you.`,
    `Esto no es un tratamiento. Dos plantas. El suelo. Así de simple y así de real.

Si los pies están en el suelo: talón, arco, dedos. Si hay calcetines, calcetines. Si estás descalza, descalza. No aprietes más. No cuentes. Solo la presión. El suelo te sostiene. Tú no tienes que sostener el suelo.

Si estás tumbada: talones en la cama, pantorrillas, caderas, omóplatos. Una cama también es suelo. También sostiene.

Tres respiraciones. En cada exhalación el peso puede bajar un milímetro. Si no baja, no baja. Sin carrera.

Por dentro: mis plantas están en el suelo. No busques una prueba. La frase está junto a la sensación.

Planta izquierda. Planta derecha. No tienes que igualarlas. Una puede ser más clara. Basta. Rodillas. El peso de las rodillas hacia abajo. Caderas en la silla o en la cama. La pelvis está. No hay una imagen obligatoria. Solo peso.

Manos. Palmas en los muslos o a los lados. También son un sitio. Yemas. Si la mente dice que no se siente real, no discutas. Vuelve a las plantas. Presión. Tela. Calor. Tres respiraciones.

Tobillos. Huesos finos. Si hay el elástico de un calcetín, el elástico. Si hay zapatos, el interior. El detalle es pequeño. El detalle es real.

La columna no tiene que estar erguida. Un milímetro de curva, y el suelo sigue. Dos respiraciones. Por dentro otra vez: el suelo sostiene. Yo me quedo.

El peso de la cabeza en el cuello. El cuello en los hombros. Los hombros en el tronco. El tronco en las caderas. Las caderas en el suelo. Una cadena. No la rompas. Solo nota.

Si la mente se va al futuro, las plantas. Al pasado, las plantas. A una lista, las plantas. Izquierda. Derecha. Las dos.

Últimas cuatro respiraciones. No conviertas la cuenta en un marcador. Pies. Suelo. Habitación. Tú.

Suelta: no vas a convertir el suelo en un examen. Las plantas siguen. El suelo sigue. Tú también.`,
    `Non è una cura. Due piante. La terra. Così semplice e così vero.

Se i piedi sono a terra: tallone, arco, dita. Se ci sono calzini, calzini. Se sei scalza, scalza. Non premere più forte. Non contare. Solo la pressione. La terra ti tiene. Tu non devi tenere la terra.

Se sei sdraiata: talloni nel letto, polpacci, fianchi, scapole. Un letto è anche terra. Tiene anche lui.

Tre respiri. A ogni espirazione il peso può scendere di un millimetro. Se non scende, non scende. Niente gara.

Dentro: le piante sono a terra. Non cercare una prova. La frase sta accanto alla sensazione.

Pianta sinistra. Pianta destra. Non devi renderle uguali. Una può essere più chiara. Basta. Ginocchia. Il peso delle ginocchia verso il basso. Fianchi sulla sedia o sul letto. Il bacino resta. Nessuna immagine obbligatoria. Solo peso.

Mani. Palmi sulle cosce o ai lati. Anche loro sono un luogo. Punte. Se la mente dice che non sembra reale, non discutere. Torna alle piante. Pressione. Stoffa. Calore. Tre respiri.

Caviglie. Ossa sottili. Se c’è l’elastico del calzino, l’elastico. Se ci sono scarpe, l’interno. Il dettaglio è piccolo. Il dettaglio è vero.

La schiena non deve stare dritta. Un millimetro di curva, e la terra resta. Due respiri. Dentro di nuovo: la terra tiene. Io resto.

Il peso della testa nel collo. Il collo nelle spalle. Le spalle nel busto. Il busto nei fianchi. I fianchi a terra. Una catena. Non spezzarla. Nota soltanto.

Se la mente va al futuro, le piante. Al passato, le piante. A una lista, le piante. Sinistra. Destra. Tutte e due.

Ultimi quattro respiri. Non fare del conto un punteggio. Piedi. Terra. Stanza. Tu.

Rilascio: non farai della terra un esame. Le piante restano. La terra resta. Anche tu.`,
    `Bu müalicə deyil. İki ayaq altı. Yer. Bu qədər sadə və bu qədər gerçək.

Ayaqlar yerdədirsə: daban, tağ, barmaq. Corab varsa corab. Çılpaqdırsa çılpaq. Daha bərk basmaq yoxdur. Say yoxdur. Yalnız təzyiq. Yer səni tutur. Sən yeri tutmaq məcburiyyətində deyilsən.

Uzanırsansa dabanlar çarpayıda, baldırlar, omba, kürək sümükləri. Çarpayı da bir yerdir. O da tutur.

Üç nəfəs. Hər verişdə ağırlıq milim aşağı enə bilər. Enməsə enməz. Yarış yoxdur.

İçindən: ayaq altım yerdədir. Sübut axtarma. Cümlə duyumun yanında durur.

Sol ayaq altı. Sağ ayaq altı. Onları bərabər etmək məcburiyyətində deyilsən. Biri daha aydın ola bilər. O bəsdir. Dizlər. Dizlərin ağırlığı aşağı. Omba stulda və ya çarpayıda. Çanaq durur. Məcburi şəkil yoxdur. Yalnız ağırlıq.

Əllər. Ovuc budda və ya yanlarda. Onlar da bir yerdir. Barmaq ucları. Ağıl “real kimi deyil” desə, mübahisə etmə. Ayaq altına qayıt. Təzyiq. Parça. İstilik. Üç nəfəs.

Biləklər. İncə sümüklər. Corabın rezinı varsa rezin. Ayaqqabı varsa içi. Detal kiçikdir. Detal gerçəkdir.

Onurğa dik durmaq məcburiyyətində deyil. Bir milim əyri olsa da yer durur. İki nəfəs. İçindən yenə: yer tutur. Mən dururam.

Başın ağırlığı boyunda. Boyun çiyində. Çiyin gövdədə. Gövdə ombada. Omba yerdə. Zəncir. Qırma. Yalnız duy.

Ağıl gələcəyə getsə, ayaq altı. Keçmişə getsə, ayaq altı. Siyahıya getsə, ayaq altı. Sol. Sağ. İkisi.

Son dörd nəfəs. Sayımı xala çevirmə. Ayaqlar. Yer. Otaq. Sən.

Buraxılış: yeri imtahan etməyəcəksən. Ayaq altı durur. Yer durur. Sən də.`,
    `Это не лечение. Две стопы. Земля. Так просто и так по-настоящему.

Если стопы на полу: пятка, свод, пальцы. Если есть носки — носки. Если босиком — босиком. Не дави сильнее. Не считай. Только давление. Земля держит тебя. Тебе не нужно держать землю.

Если ты лежишь: пятки в постели, икры, бёдра, лопатки. Кровать тоже земля. Она тоже держит.

Три дыхания. На каждом выдохе вес может опуститься на миллиметр. Если не опускается — не опускается. Без гонки.

Внутри: стопы на полу. Не ищи доказательства. Предложение стоит рядом с ощущением.

Левая стопа. Правая стопа. Не нужно их уравнивать. Одна может быть яснее. Этого достаточно. Колени. Вес коленей вниз. Бёдра в стуле или в постели. Таз остаётся. Нет обязательного образа. Только вес.

Руки. Ладони на бёдрах или по бокам. Они тоже место. Кончики пальцев. Если ум говорит, что это не как настоящее — не спорь. Вернись к стопам. Давление. Ткань. Тепло. Три дыхания.

Лодыжки. Тонкие кости. Если есть резинка носка — резинка. Если есть обувь — внутренняя сторона. Деталь маленькая. Деталь настоящая.

Позвоночнику не нужно сидеть прямо. Миллиметр изгиба — и земля всё равно остаётся. Два дыхания. Внутри снова: земля держит. Я остаюсь.

Вес головы в шее. Шея в плечах. Плечи в туловище. Туловище в бёдрах. Бёдра на земле. Цепь. Не рви её. Только заметь.

Если ум уходит в будущее — стопы. В прошлое — стопы. В список — стопы. Левая. Правая. Обе.

Последние четыре дыхания. Не превращай счёт в очки. Стопы. Земля. Комната. Ты.

Отпускание: ты не сделаешь из земли экзамен. Стопы остаются. Земля остаётся. И ты тоже.`,
  ),

  'room-door': pack(
    `Bu bir tedavi değildir. Bildiğin bir oda. Bir kapı. Kapıyı açmak zorunda değilsin. Kapamak zorunda da değilsin. Sadece kapının olduğu odada duruyorsun.

Sırt yaslanabilir. Ayaklar yerde. Kapı odanın öteki ucunda veya hemen yanında. Mesafe önemli değil. Sen buradasın. Kapı orada.

Üç nefes. Değiştirme. Yönetme. Hava giriyor. Hava çıkıyor. Nefes kapıya gitmiyor. Sende kalıyor.

Zihin tokmağa uzanabilir. Açılsa. Kapanmasa. İçerde ne var. Bu cümleler gelebilir. Onları kovalama. Tokmağa dokunma. Eşiğe dön. Ayak. Avuç. Bu nefes.

Kapı bir resim olabilir. Gerçek bir eşik de olabilir. İkisi de aynı daveti taşır: zorlamak yok. Beklemek boşluk değil. Beklemek burada olmak.

Omuzlar. Çene. Dil. Herbiri kendi ağırlığına bırakılabilir. Kapı kımıldamasa oturum bozulmaz. Sen kımıldamasan kapı bozulmaz.

İçinden: eşikteyim. Kanıt arama. Cümle, duyumun yanında. Dört nefes. Bir: burun. İki: göğüs. Üç: çıkış. Dört: duruş. Sonra yine ayaklar.

İçeride bir şey hazır değilse, hazır değil. Bu bir teşhis değil. Sadece şu an. Eşikte kalmak, içeri girmemek de bir seçim. Çıkmamak da.

Sesler varsa sesler. Koridor, bir adım, uzak bir kapı. Oda onları da tutuyor. Sen de tutuluyorsun. Avuçlar uylukta. Isı. Kenar. Gerçek.

Son üç nefes. Acele yok. Kapı hâlâ orada. Sen hâlâ buradasın. İkisi de doğru olabilir.

Bırakış: kapıyı bir sınav haline getirmeyeceksin. Eşik duruyor. Oda duruyor. Sen de. Gözler yavaşça. Işık. Eller. Kapıya gitmek zorunda değilsin. Kalmak yeter.`,
    `This is not a treatment. A room you know. A door. You do not have to open it. You do not have to close it. You are only staying in the room where the door is.

The back can rest. Feet on the floor. The door is at the other end of the room, or close beside you. Distance does not matter. You are here. The door is there.

Three breaths. Do not change them. Do not manage them. Air arrives. Air leaves. The breath does not go to the door. It stays with you.

The mind can reach for the handle. Let it open. Let it stay shut. What is inside. Those sentences can arrive. Do not chase them. Do not touch the handle. Return to the threshold. Foot. Palm. This breath.

The door can be a picture. It can be a real doorway. Both carry the same invitation: no forcing. Waiting is not emptiness. Waiting is being here.

Shoulders. Jaw. Tongue. Each can drop into its own weight. If the door does not move, the session is not broken. If you do not move, the door is not broken.

Inside: I am at the threshold. Do not look for proof. The sentence stands next to the sensation. Four breaths. One: the nose. Two: the chest. Three: leaving. Four: stillness. Then the feet again.

If something inside is not ready, it is not ready. This is not a diagnosis. It is only this moment. Staying at the threshold, not going in, is also a choice. Not leaving is also a choice.

If there are sounds, there are sounds. A hall, a step, a far door. The room holds them too. You are being held as well. Palms on the thighs. Heat. Edge. Actual.

Last three breaths. No hurry. The door is still there. You are still here. Both can be true.

Release: you will not turn the door into an exam. The threshold stays. The room stays. So do you. Eyes slowly. Light. Hands. You do not have to go to the door. Staying is enough.`,
    `Esto no es un tratamiento. Una habitación que conoces. Una puerta. No tienes que abrirla. Tampoco cerrarla. Solo estás en la habitación donde está la puerta.

La espalda puede apoyarse. Los pies en el suelo. La puerta está al otro lado, o cerca. La distancia no importa. Tú estás aquí. La puerta está ahí.

Tres respiraciones. No las cambies. No las gestiones. El aire llega. El aire se va. El aliento no va a la puerta. Se queda contigo.

La mente puede ir al picaporte. Que se abra. Que se quede cerrada. Qué hay dentro. Esas frases pueden llegar. No las persigas. No toques el picaporte. Vuelve al umbral. Pie. Palma. Este aliento.

La puerta puede ser una imagen. Puede ser un umbral real. Las dos traen la misma invitación: no forzar. Esperar no es vacío. Esperar es estar aquí.

Hombros. Mandíbula. Lengua. Cada uno puede caer en su peso. Si la puerta no se mueve, la sesión no se rompe. Si tú no te mueves, la puerta no se rompe.

Por dentro: estoy en el umbral. No busques una prueba. La frase está junto a la sensación. Cuatro respiraciones. Una: la nariz. Dos: el pecho. Tres: la salida. Cuatro: la quietud. Luego los pies otra vez.

Si algo dentro no está listo, no está listo. Esto no es un diagnóstico. Es solo este momento. Quedarte en el umbral, no entrar, también es una elección. No salir también.

Si hay sonidos, hay sonidos. Un pasillo, un paso, una puerta lejana. La habitación también los sostiene. A ti también. Palmas en los muslos. Calor. Borde. Real.

Últimas tres respiraciones. Sin prisa. La puerta sigue ahí. Tú sigues aquí. Las dos cosas pueden ser ciertas.

Suelta: no vas a convertir la puerta en un examen. El umbral sigue. La habitación sigue. Tú también. Los ojos despacio. Luz. Manos. No tienes que ir a la puerta. Quedarte basta.`,
    `Non è una cura. Una stanza che conosci. Una porta. Non devi aprirla. Non devi chiuderla. Resti solo nella stanza dove c’è la porta.

La schiena può appoggiarsi. I piedi a terra. La porta è in fondo, o accanto. La distanza non conta. Tu sei qui. La porta è lì.

Tre respiri. Non cambiarli. Non gestirli. L’aria arriva. L’aria se ne va. Il respiro non va alla porta. Resta con te.

La mente può andare alla maniglia. Che si apra. Che resti chiusa. Cosa c’è dentro. Quelle frasi possono arrivare. Non inseguirle. Non toccare la maniglia. Torna alla soglia. Piede. Palmo. Questo respiro.

La porta può essere un’immagine. Può essere una soglia vera. Entrambe portano lo stesso invito: non forzare. Aspettare non è vuoto. Aspettare è essere qui.

Spalle. Mascella. Lingua. Ognuna può cadere nel proprio peso. Se la porta non si muove, la sessione non si rompe. Se tu non ti muovi, la porta non si rompe.

Dentro: sono sulla soglia. Non cercare una prova. La frase sta accanto alla sensazione. Quattro respiri. Uno: il naso. Due: il petto. Tre: l’uscita. Quattro: la quiete. Poi di nuovo i piedi.

Se qualcosa dentro non è pronto, non è pronto. Questo non è una diagnosi. È solo questo momento. Restare sulla soglia, non entrare, è anche una scelta. Non uscire è anche una scelta.

Se ci sono suoni, ci sono suoni. Un corridoio, un passo, una porta lontana. La stanza li tiene anche. Tieni anche tu. Palmi sulle cosce. Calore. Bordo. Vero.

Ultimi tre respiri. Niente fretta. La porta è ancora lì. Tu sei ancora qui. Entrambe le cose possono essere vere.

Rilascio: non farai della porta un esame. La soglia resta. La stanza resta. Anche tu. Occhi piano. Luce. Mani. Non devi andare alla porta. Restare basta.`,
    `Bu müalicə deyil. Tanıdığın bir otaq. Bir qapı. Açmaq məcburiyyətində deyilsən. Bağlamaq da. Yalnız qapının olduğu otaqdasan.

Bel söykənə bilər. Ayaqlar yerdə. Qapı otağın o biri ucunda, ya da yanında. Məsafə fərq etməz. Sən buradasan. Qapı oradadır.

Üç nəfəs. Dəyişdirmə. İdarə etmə. Hava girir. Hava çıxır. Nəfəs qapıya getmir. Səndə qalır.

Ağıl dəstəyə uzana bilər. Açılsın. Bağlı qalsın. İçində nə var. Bu cümlələr gələ bilər. Qovma. Dəstəyə toxunma. Eşiyə qayıt. Ayaq. Ovuc. Bu nəfəs.

Qapı bir şəkil ola bilər. Gerçək eşik də. Hər ikisi eyni dəvəti daşıyır: məcbur yoxdur. Gözləmək boşluq deyil. Gözləmək burada olmaqdır.

Çiyinlər. Çənə. Dil. Hər biri öz ağırlığına buraxıla bilər. Qapı tərpənməsə oturum pozulmur. Sən tərpənməsən qapı pozulmur.

İçindən: eşikdəyəm. Sübut axtarma. Cümlə duyumun yanında. Dörd nəfəs. Bir: burun. İki: sinə. Üç: çıxış. Dörd: duruş. Sonra yenə ayaqlar.

İçəridə bir şey hazır deyilsə, hazır deyil. Bu diaqnoz deyil. Yalnız bu an. Eşikdə qalmaq, içəri girməmək də seçimdir. Çıxmamaq da.

Səs varsa səs. Dəhliz, bir addım, uzaq qapı. Otaq onları da tutur. Sən də tutulursan. Ovuc budda. İstilik. Kənar. Gerçək.

Son üç nəfəs. Tələsmə. Qapı hələ oradadır. Sən hələ buradasan. Hər ikisi doğru ola bilər.

Buraxılış: qapını imtahan etməyəcəksən. Eşik durur. Otaq durur. Sən də. Gözlər yavaş. Işıq. Əllər. Qapıya getmək məcburiyyətində deyilsən. Qalmaq bəsdir.`,
    `Это не лечение. Комната, которую ты знаешь. Дверь. Её не нужно открывать. Не нужно и закрывать. Ты просто в комнате, где есть дверь.

Спина может опереться. Стопы на полу. Дверь в другом конце или рядом. Расстояние не важно. Ты здесь. Дверь там.

Три дыхания. Не меняй их. Не управляй. Воздух входит. Воздух выходит. Дыхание не идёт к двери. Оно остаётся с тобой.

Ум может потянуться к ручке. Пусть откроется. Пусть останется закрытой. Что внутри. Эти фразы могут прийти. Не гони их. Ручку не трогай. Вернись к порогу. Стопа. Ладонь. Этот вдох.

Дверь может быть картинкой. Может быть настоящим порогом. Оба несут одно приглашение: не торопить. Ожидание — не пустота. Ожидание — быть здесь.

Плечи. Челюсть. Язык. Каждое может упасть в свой вес. Если дверь не двинется, сессия не сломана. Если не двинешься ты, дверь не сломана.

Внутри: я на пороге. Не ищи доказательства. Предложение стоит рядом с ощущением. Четыре дыхания. Один: нос. Два: грудь. Три: выход. Четыре: покой. Потом снова стопы.

Если что-то внутри не готово — оно не готово. Это не диагноз. Только этот момент. Остаться на пороге, не входить — тоже выбор. Не уходить — тоже.

Если есть звуки — есть звуки. Коридор, шаг, далёкая дверь. Комната держит и их. И тебя. Ладони на бёдрах. Тепло. Край. Настоящее.

Последние три дыхания. Без спешки. Дверь всё ещё там. Ты всё ещё здесь. Оба могут быть правдой.

Отпускание: ты не сделаешь из двери экзамен. Порог остаётся. Комната остаётся. И ты. Глаза медленно. Свет. Руки. К двери идти не нужно. Остаться достаточно.`,
  ),

  'room-light': pack(
    `Bu bir tedavi değildir. Odadaki ışık. Perde yarı açık olabilir. Öğleden sonra. Ya da bir lamba. Hangisi olursa, ışık bir yere düşüyor. Sen o yere oturuyorsun. Işığı kovalamıyorsun. Sadece yer veriyorsun.

Gözler kapanabilir. Işık yine orada. Kapakların arkasında pembe bir iz. Kovalama. Sadece fark et.

Üç nefes. İzle yarışma. Burnundan giriyor. Göğüste duruyor. Çıkıyor. Işık değişmese nefes değişebilir. Nefes değişmese ışık değişebilir. İkisi de senin işin değil. İkisi de oluyor.

Zihin karanlığı ölçebilir. Yetmez. Fazla. Bu cümleler gelebilir. Düzeltme. Avuçlara dön. Avuçlar birbirine değebilir. Ilık. Basit.

Işık bir teşhis değil. Karanlık da değil. Odaların halleri var. Sen odanın hali değilsin. Sen buradasın, ışığın düştüğü yerde.

Omuzlar. Boyun. Çene. Dil. Herbiri kendi gölgesine bırakılabilir. Gölge korkutucu olmak zorunda değil. Sadece ışığın öteki yüzü.

İçinden: ışık düşüyor. Ben buradayım. Kanıt arama. Beş nefes. Yavaş. Işığa gitmeden. Karanlığa gitmeden. Ortada, göğüste.

Pencere varsa dışarıdaki ses içeri sızabilir. Bırak. Kapı varsa koridor duruyor. Bırak. Sen ışığın düştüğü yerdesin. Alın. Kaşlar gerilmek zorunda değil. Bir milim boşluk.

Acele yok. Işık kalsa da solsa da ayaklar yerde. Bu yeterli bir haber. Avuç. Taban. Bu nefes.

Son üç nefes. Gözler yavaşça. Oda. Işığın düştüğü yer. Eller.

Bırakış: ışığı bir sınav haline getirmeyeceksin. Düştüğü yer duruyor. Sen duruyorsun. Kalkmak zorunda değilsin hemen. Işık sönmez. Sen de sönmezsin.`,
    `This is not a treatment. The light in the room. The curtain may be half open. Afternoon. Or a lamp. Either way, light falls somewhere. You sit in that place. You are not chasing the light. You are only making room for it.

Eyes can close. The light is still there. A pink trace behind the lids. Do not chase it. Only notice.

Three breaths. Do not race the trace. In through the nose. A stay in the chest. Out. The light can stay the same while the breath changes. The breath can stay the same while the light changes. Neither is your job. Both are happening.

The mind can measure the dark. Not enough. Too much. Those sentences can arrive. Do not correct them. Return to the palms. Palms can touch. Warm. Simple.

Light is not a diagnosis. Dark is not either. Rooms have states. You are not a state of the room. You are here, where the light falls.

Shoulders. Neck. Jaw. Tongue. Each can rest in its own shade. Shade does not have to be frightening. It is only the other face of light.

Inside: light is falling. I am here. Do not look for proof. Five breaths. Slow. Without going toward the light. Without going toward the dark. In the middle, in the chest.

If there is a window, sound from outside can leak in. Let it. If there is a door, the hall is still there. Let it. You are where the light falls. Forehead. The brows do not have to tighten. A millimetre of space.

No hurry. If the light stays, if it fades, the feet are on the floor. That is enough news. Palm. Sole. This breath.

Last three breaths. Eyes slowly. Room. The place the light falls. Hands.

Release: you will not turn the light into an exam. The place it falls stays. You stay. You do not have to stand up yet. The light does not go out. Neither do you.`,
    `Esto no es un tratamiento. La luz de la habitación. La cortina puede estar a medio abrir. Tarde. O una lámpara. En cualquier caso, la luz cae en algún sitio. Tú te sientas ahí. No persigues la luz. Solo le das sitio.

Los ojos pueden cerrarse. La luz sigue. Un rastro rosa detrás de los párpados. No lo persigas. Solo nótalo.

Tres respiraciones. No compitas con el rastro. Entra por la nariz. Se queda en el pecho. Sale. La luz puede quedarse igual mientras el aire cambia. El aire puede quedarse igual mientras la luz cambia. Ninguna es tu trabajo. Las dos ocurren.

La mente puede medir la oscuridad. No basta. Demasiado. Esas frases pueden llegar. No las corrijas. Vuelve a las palmas. Pueden tocarse. Tibias. Simples.

La luz no es un diagnóstico. La oscuridad tampoco. Las habitaciones tienen estados. Tú no eres un estado de la habitación. Estás aquí, donde cae la luz.

Hombros. Cuello. Mandíbula. Lengua. Cada uno puede descansar en su sombra. La sombra no tiene que asustar. Es solo la otra cara de la luz.

Por dentro: la luz cae. Estoy aquí. No busques una prueba. Cinco respiraciones. Despacio. Sin ir hacia la luz. Sin ir hacia la oscuridad. En el medio, en el pecho.

Si hay ventana, el sonido de fuera puede colarse. Déjalo. Si hay puerta, el pasillo sigue. Déjalo. Tú estás donde cae la luz. Frente. Las cejas no tienen que tensarse. Un milímetro de espacio.

Sin prisa. Si la luz se queda, si se apaga, los pies están en el suelo. Eso basta como noticia. Palma. Planta. Este aliento.

Últimas tres respiraciones. Los ojos despacio. La habitación. El sitio donde cae la luz. Las manos.

Suelta: no vas a convertir la luz en un examen. El sitio donde cae sigue. Tú sigues. No tienes que levantarte aún. La luz no se apaga. Tú tampoco.`,
    `Non è una cura. La luce nella stanza. La tenda può essere socchiusa. Pomeriggio. O una lampada. In ogni caso la luce cade da qualche parte. Tu ti siedi lì. Non insegui la luce. Le fai solo spazio.

Gli occhi possono chiudersi. La luce resta. Una traccia rosa dietro le palpebre. Non inseguirla. Notala soltanto.

Tre respiri. Non gareggiare con la traccia. Entra dal naso. Resta nel petto. Esce. La luce può restare uguale mentre il respiro cambia. Il respiro può restare uguale mentre la luce cambia. Nessuno dei due è il tuo compito. Entrambi accadono.

La mente può misurare il buio. Non basta. Troppo. Quelle frasi possono arrivare. Non correggerle. Torna ai palmi. Possono toccarsi. Caldi. Semplici.

La luce non è una diagnosi. Il buio nemmeno. Le stanze hanno stati. Tu non sei uno stato della stanza. Sei qui, dove cade la luce.

Spalle. Collo. Mascella. Lingua. Ognuno può restare nella propria ombra. L’ombra non deve spaventare. È solo l’altra faccia della luce.

Dentro: la luce cade. Io sono qui. Non cercare una prova. Cinque respiri. Lenti. Senza andare verso la luce. Senza andare verso il buio. In mezzo, nel petto.

Se c’è una finestra, il suono di fuori può entrare. Lascialo. Se c’è una porta, il corridoio resta. Lascialo. Tu sei dove cade la luce. Fronte. Le sopracciglia non devono stringersi. Un millimetro di spazio.

Niente fretta. Se la luce resta, se svanisce, i piedi sono a terra. Questa è notizia abbastanza. Palmo. Pianta. Questo respiro.

Ultimi tre respiri. Occhi piano. Stanza. Il punto dove cade la luce. Mani.

Rilascio: non farai della luce un esame. Il punto dove cade resta. Tu resti. Non devi alzarti ancora. La luce non si spegne. Nemmeno tu.`,
    `Bu müalicə deyil. Otaqdakı işıq. Pərdə yarı açıq ola bilər. Günorta. Və ya lampa. Hansı olsa, işıq bir yerə düşür. Sən o yerdə oturursan. Işığı qovmursan. Yalnız yer verirsən.

Gözlər bağlana bilər. Işıq yenə oradadır. Qapaqların arxasında çəhrayı iz. Qovma. Yalnız gör.

Üç nəfəs. İzlə yarışma. Burundan girir. Sinədə qalır. Çıxır. Işıq dəyişməsə nəfəs dəyişə bilər. Nəfəs dəyişməsə işıq dəyişə bilər. Heç biri sənin işin deyil. Hər ikisi olur.

Ağıl qaranlığı ölçə bilər. Çatmır. Çoxdur. Bu cümlələr gələ bilər. Düzəltmə. Ovucalara qayıt. Ovucalar toxuna bilər. İsti. Sadə.

Işıq diaqnoz deyil. Qaranlıq da deyil. Otaqların halları var. Sən otağın halı deyilsən. Sən buradasan, işığın düşdüyü yerdə.

Çiyinlər. Boyun. Çənə. Dil. Hər biri öz kölgəsinə buraxıla bilər. Kölgə qorxutmaq məcburiyyətində deyil. Yalnız işığın o biri üzüdür.

İçindən: işıq düşür. Mən buradayam. Sübut axtarma. Beş nəfəs. Yavaş. Işığa getmədən. Qaranlığa getmədən. Ortada, sinədə.

Pəncərə varsa çöldən səs sızabilir. Burax. Qapı varsa dəhliz durur. Burax. Sən işığın düşdüyü yerdəsən. Alın. Qaşlar gərilmək məcburiyyətində deyil. Bir milim boşluq.

Tələsmə. Işıq qalsa da getsə də ayaqlar yerdədir. Bu kifayət qədər xəbərdir. Ovuc. Ayaq altı. Bu nəfəs.

Son üç nəfəs. Gözlər yavaş. Otaq. Işığın düşdüyü yer. Əllər.

Buraxılış: işığı imtahan etməyəcəksən. Düşdüyü yer durur. Sən durursan. İndi durmaq məcburiyyətində deyilsən. Işıq sönmür. Sən də sönmürsən.`,
    `Это не лечение. Свет в комнате. Штора может быть полуоткрыта. После полудня. Или лампа. В любом случае свет падает куда-то. Ты садишься туда. Ты не гонишься за светом. Ты только даёшь ему место.

Глаза могут закрыться. Свет всё ещё там. Розовый след за веками. Не гони его. Только заметь.

Три дыхания. Не соревнуйся со следом. Вдох через нос. Пауза в груди. Выдох. Свет может остаться прежним, пока дыхание меняется. Дыхание может остаться прежним, пока меняется свет. Ни то ни другое — не твоя работа. Оба происходят.

Ум может мерить темноту. Мало. Много. Эти фразы могут прийти. Не правь их. Вернись к ладоням. Ладони могут коснуться. Тёплые. Простые.

Свет — не диагноз. Темнота тоже. У комнат есть состояния. Ты не состояние комнаты. Ты здесь, там, куда падает свет.

Плечи. Шея. Челюсть. Язык. Каждое может остаться в своей тени. Тень не обязана пугать. Это только другая сторона света.

Внутри: свет падает. Я здесь. Не ищи доказательства. Пять дыханий. Медленно. Не к свету. Не к темноте. Посередине, в груди.

Если есть окно, звук с улицы может войти. Пусть. Если есть дверь, коридор на месте. Пусть. Ты там, куда падает свет. Лоб. Бровям не нужно напрягаться. Миллиметр пространства.

Без спешки. Если свет останется, если потускнеет — стопы на полу. Этого достаточно как новости. Ладонь. Стопа. Этот вдох.

Последние три дыхания. Глаза медленно. Комната. Место, куда падает свет. Руки.

Отпускание: ты не сделаешь из света экзамен. Место, куда он падает, остаётся. Ты остаёшься. Вставать ещё не нужно. Свет не гаснет. И ты не гаснешь.`,
  ),

  'room-hands': pack(
    `Bu bir tedavi değildir. Eller. Bir iş yapmak zorunda değiller. Kucakta durabilirler. Dizlerde. Birbirine değerek. Sadece durmak.

Ayaklar yerde. Sırt yaslı. Eller kendi ağırlıklarında. Bu ağırlık bir haber. Buradasın.

Üç nefes. Nefes avuçlara gitmiyor. Avuçlar nefesi tutmuyor. İkisi yan yana. Burnundan giriyor. Çıkıyor. Avuçlar ılık kalıyor.

Parmaklar. Başparmak. İşaret. Hepsi kendi yerinde. Sıkmak yok. Açmak yok. Sadece durmak. Tırnakların kenarı. Avuç içinin çizgisi. Küçük. Gerçek.

Zihin elleri bir göreve çağırabilir. Yaz. Tut. Düzelt. Bu çağrı gelebilir. Eller göreve gitmek zorunda değil. Kucakta kalabilirler.

İçinden: ellerim burada. Kanıt arama. Beş nefes. Avuçların ısısını fark et. Isı bir teşhis değil. Sadece ten. Nabız varsa nabız. Hızlı veya yavaş, ikisi de haber. Nabzı düzeltmek yok. Sadece duymak.

Bilekler. Önkol. Dirseklerin ağırlığı. Omuzlar kulaklara gitmek zorunda değil. Bir milim boşluk. Sonra yine avuçlar.

Oturum kısa. Kısa olduğu için acele yok. Eller hâlâ orada. Sen hâlâ buradasın. Çene. Dil. Avuç.

Son üç nefes. Gözler yavaşça. Oda. Eller.

Bırakış: elleri bir sınav haline getirmeyeceksin. Avuçlar açık kalabilir. Kaldırmak zorunda değilsin hemen. Bu da yeter.`,
    `This is not a treatment. The hands. They do not have to do a job. They can rest in the lap. On the knees. Touching each other. Only staying.

Feet on the floor. Back supported. Hands in their own weight. That weight is news. You are here.

Three breaths. Breath does not go to the palms. The palms do not hold the breath. They sit side by side. In through the nose. Out. The palms stay warm.

Fingers. Thumb. Index. Each in its place. No clenching. No spreading. Only staying. The edge of a nail. A line in the palm. Small. Actual.

The mind can call the hands to a task. Write. Hold. Fix. That call can arrive. The hands do not have to go. They can stay in the lap.

Inside: my hands are here. Do not look for proof. Five breaths. Notice the warmth of the palms. Warmth is not a diagnosis. It is only skin. If there is a pulse, there is a pulse. Fast or slow, both are news. You do not have to fix the pulse. Only hear it.

Wrists. Forearms. The weight of the elbows. The shoulders do not have to climb toward the ears. A millimetre of space. Then the palms again.

The session is short. Short does not mean hurry. The hands are still there. You are still here. Jaw. Tongue. Palm.

Last three breaths. Eyes slowly. Room. Hands.

Release: you will not turn the hands into an exam. Palms can stay open. You do not have to lift them yet. That is enough.`,
    `Esto no es un tratamiento. Las manos. No tienen que hacer un trabajo. Pueden quedarse en el regazo. En las rodillas. Tocándose. Solo quedarse.

Los pies en el suelo. La espalda apoyada. Las manos en su propio peso. Ese peso es una noticia. Estás aquí.

Tres respiraciones. El aire no va a las palmas. Las palmas no sujetan el aire. Van juntas. Entra por la nariz. Sale. Las palmas siguen tibias.

Dedos. Pulgar. Índice. Cada uno en su sitio. Sin apretar. Sin abrir. Solo quedarse. El borde de una uña. Una línea en la palma. Pequeño. Real.

La mente puede llamar a las manos a una tarea. Escribe. Sujeta. Arregla. Esa llamada puede llegar. Las manos no tienen que ir. Pueden quedarse en el regazo.

Por dentro: mis manos están aquí. No busques una prueba. Cinco respiraciones. Nota el calor de las palmas. El calor no es un diagnóstico. Es solo piel. Si hay pulso, hay pulso. Rápido o lento, los dos son noticia. No tienes que arreglar el pulso. Solo oírlo.

Muñecas. Antebrazos. El peso de los codos. Los hombros no tienen que subir hacia las orejas. Un milímetro de espacio. Luego las palmas otra vez.

La sesión es corta. Corta no significa prisa. Las manos siguen ahí. Tú sigues aquí. Mandíbula. Lengua. Palma.

Últimas tres respiraciones. Los ojos despacio. La habitación. Las manos.

Suelta: no vas a convertir las manos en un examen. Las palmas pueden quedar abiertas. No tienes que levantarlas aún. Eso basta.`,
    `Non è una cura. Le mani. Non devono fare un lavoro. Possono restare in grembo. Sulle ginocchia. Toccandosi. Solo restare.

Piedi a terra. Schiena appoggiata. Mani nel proprio peso. Quel peso è una notizia. Sei qui.

Tre respiri. Il respiro non va ai palmi. I palmi non tengono il respiro. Stanno accanto. Entra dal naso. Esce. I palmi restano caldi.

Dita. Pollice. Indice. Ognuna al suo posto. Senza stringere. Senza aprire. Solo restare. Il bordo di un’unghia. Una linea nel palmo. Piccolo. Vero.

La mente può chiamare le mani a un compito. Scrivi. Tieni. Sistema. Quella chiamata può arrivare. Le mani non devono andare. Possono restare in grembo.

Dentro: le mie mani sono qui. Non cercare una prova. Cinque respiri. Nota il calore dei palmi. Il calore non è una diagnosi. È solo pelle. Se c’è un polso, c’è un polso. Veloce o lento, tutti e due sono notizia. Non devi sistemare il polso. Solo ascoltarlo.

Polsi. Avambracci. Il peso dei gomiti. Le spalle non devono salire verso le orecchie. Un millimetro di spazio. Poi di nuovo i palmi.

La sessione è breve. Breve non significa fretta. Le mani sono ancora lì. Tu sei ancora qui. Mascella. Lingua. Palmo.

Ultimi tre respiri. Occhi piano. Stanza. Mani.

Rilascio: non farai delle mani un esame. I palmi possono restare aperti. Non devi alzarle ancora. Questo basta.`,
    `Bu müalicə deyil. Əllər. İş görmək məcburiyyətində deyillər. Qucaqda dura bilər. Dizlərdə. Bir-birinə dəyərək. Yalnız durmaq.

Ayaqlar yerdə. Bel dayaqlı. Əllər öz ağırlığında. Bu ağırlıq bir xəbərdir. Buradasan.

Üç nəfəs. Nəfəs ovucalara getmir. Ovucalar nəfəsi tutmur. Yan-yana dururlar. Burundan girir. Çıxır. Ovucalar isti qalır.

Barmaqlar. Baş barmaq. İşarə. Hər biri öz yerində. Sıxmaq yoxdur. Açmaq yoxdur. Yalnız durmaq. Dırnağın kənarı. Ovucun xətti. Kiçik. Gerçək.

Ağıl əlləri bir işə çağıra bilər. Yaz. Tut. Düzəlt. Bu çağırış gələ bilər. Əllər getmək məcburiyyətində deyil. Qucağda qala bilər.

İçindən: əllərim buradadır. Sübut axtarma. Beş nəfəs. Ovucaların istiliyini gör. İstilik diaqnoz deyil. Yalnız dəri. Nəbz varsa nəbz. Tez və ya yavaş, hər ikisi xəbərdir. Nəbzi düzəltmək yoxdur. Yalnız eşitmək.

Biləklər. Ön qol. Dirsəklərin ağırlığı. Çiyinlər qulaqlara getmək məcburiyyətində deyil. Bir milim boşluq. Sonra yenə ovucalar.

Oturum qısadır. Qısa olduğu üçün tələsmək yoxdur. Əllər hələ oradadır. Sən hələ buradasan. Çənə. Dil. Ovuc.

Son üç nəfəs. Gözlər yavaş. Otaq. Əllər.

Buraxılış: əlləri imtahan etməyəcəksən. Ovucalar açıq qala bilər. İndi qaldırmaq məcburiyyətində deyilsən. Bu da bəsdir.`,
    `Это не лечение. Руки. Им не нужно делать работу. Они могут лежать на коленях. В лоне. Касаясь друг друга. Только оставаться.

Стопы на полу. Спина с опорой. Руки в своём весе. Этот вес — новость. Ты здесь.

Три дыхания. Дыхание не идёт к ладоням. Ладони не держат дыхание. Они рядом. Вдох через нос. Выдох. Ладони остаются тёплыми.

Пальцы. Большой. Указательный. Каждый на своём месте. Не сжимать. Не раскрывать. Только оставаться. Край ногтя. Линия на ладони. Маленькое. Настоящее.

Ум может позвать руки к делу. Пиши. Держи. Исправь. Этот зов может прийти. Рукам не нужно идти. Они могут остаться в лоне.

Внутри: мои руки здесь. Не ищи доказательства. Пять дыханий. Заметь тепло ладоней. Тепло — не диагноз. Только кожа. Если есть пульс — есть пульс. Быстрый или медленный, оба — новость. Пульс не нужно чинить. Только слышать.

Запястья. Предплечья. Вес локтей. Плечам не нужно подниматься к ушам. Миллиметр пространства. Потом снова ладони.

Сессия короткая. Короткое не значит спешить. Руки всё ещё там. Ты всё ещё здесь. Челюсть. Язык. Ладонь.

Последние три дыхания. Глаза медленно. Комната. Руки.

Отпускание: ты не сделаешь из рук экзамен. Ладони могут остаться открытыми. Поднимать их ещё не нужно. Этого достаточно.`,
  ),

  'shore-edge': pack(
    `Bu bir tedavi değildir. Bir kıyı. Su gelir, su gider. Sen kenarda oturuyorsun. Dalgayı yönetmiyorsun. Dalgayı durdurmuyorsun. Sadece kenardasın.

Sırt yaslanabilir. Ayaklar yerde veya uzanmış. Kum, taş, tahta — hangisi varsa, o. Soğuk veya ılık, ikisi de kıyı.

Üç nefes. Nefes dalgaya benzemez zorunda değil. Giriyor. Çıkıyor. Su kendi işini bilir. Sen kendi yerini.

Zihin dalgayı sayabilir. Yetmez. Fazla. Yakın. Uzak. Bu cümleler gelebilir. Saymayı bırak. Kenara dön. Avuç. Taban. Bu nefes.

İçinden: kenardayım. Kanıt arama. Su geliyorsa geliyor. Gidiyorsa gidiyor. İkisi de senin görevin değil.

Omuzlar. Çene. Dil. Herbiri kendi ağırlığına. Rüzgâr varsa rüzgâr. Yoksa yok. Kıyı ikisini de tutar. Sen de tutuluyorsun.

Dört nefes. Bir geliş gibi alış. Bir gidiş gibi veriş. Benzetmek zorunda değilsin. Sadece sıra. Sonra yine ayaklar.

Derealizasyon cam anlatabilir. Camı kırmıyorsun. Kenar duruyor. Basınç duruyor. Bu da bir haber.

Sesler: su, uzak bir kuş, bir motor. Onları kapatma. Kenar onları da alır. Sen kenardasın, suyun içinde olmak zorunda değilsin.

Son üç nefes. Gözler yavaşça. Oda. Eller. Kıyı bir resimse resim. Gerçekse gerçek. Sen buradasın.

Bırakış: kıyıyı bir sınav haline getirmeyeceksin. Kenar duruyor. Su durmuyor — geliyor, gidiyor. Sen duruyorsun. Bu yeter.`,
    `This is not a treatment. A shore. Water arrives, water leaves. You sit at the edge. You are not managing the wave. You are not stopping the wave. You are only at the edge.

The back can rest. Feet on the floor or stretched out. Sand, stone, wood — whichever is there, that. Cool or warm, both are shore.

Three breaths. The breath does not have to resemble a wave. In. Out. The water knows its work. You know your place.

The mind can count the waves. Not enough. Too many. Near. Far. Those sentences can arrive. Leave the counting. Return to the edge. Palm. Sole. This breath.

Inside: I am at the edge. Do not look for proof. If water comes, it comes. If it leaves, it leaves. Neither is your task.

Shoulders. Jaw. Tongue. Each in its own weight. If there is wind, there is wind. If not, not. The shore holds both. You are being held as well.

Four breaths. An in-breath like an arrival. An out-breath like a leaving. You do not have to force the likeness. Only the sequence. Then the feet again.

Derealization can describe a pane of glass. You do not break the glass. The edge stays. Pressure stays. That is also news.

Sounds: water, a far bird, an engine. Do not shut them out. The edge takes them too. You are at the edge. You do not have to be inside the water.

Last three breaths. Eyes slowly. Room. Hands. If the shore is a picture, a picture. If it is actual, actual. You are here.

Release: you will not turn the shore into an exam. The edge stays. The water does not stay — it comes, it goes. You stay. That is enough.`,
    `Esto no es un tratamiento. Una orilla. El agua llega, el agua se va. Te sientas al borde. No gestionas la ola. No la detienes. Solo estás al borde.

La espalda puede apoyarse. Los pies en el suelo o estirados. Arena, piedra, madera: lo que haya. Frío o calor, los dos son orilla.

Tres respiraciones. El aliento no tiene que parecerse a una ola. Entra. Sale. El agua sabe su trabajo. Tú sabes tu sitio.

La mente puede contar las olas. No basta. Demasiadas. Cerca. Lejos. Esas frases pueden llegar. Deja la cuenta. Vuelve al borde. Palma. Planta. Este aliento.

Por dentro: estoy al borde. No busques una prueba. Si el agua llega, llega. Si se va, se va. Ninguna es tu tarea.

Hombros. Mandíbula. Lengua. Cada uno en su peso. Si hay viento, hay viento. Si no, no. La orilla sostiene las dos cosas. A ti también.

Cuatro respiraciones. Una entrada como una llegada. Una salida como una ida. No tienes que forzar el parecido. Solo la secuencia. Luego los pies otra vez.

La desrealización puede describir un cristal. No rompes el cristal. El borde sigue. La presión sigue. Eso también es noticia.

Sonidos: agua, un pájaro lejano, un motor. No los apagues. El borde también los toma. Estás al borde. No tienes que estar dentro del agua.

Últimas tres respiraciones. Los ojos despacio. La habitación. Las manos. Si la orilla es una imagen, una imagen. Si es real, real. Estás aquí.

Suelta: no vas a convertir la orilla en un examen. El borde sigue. El agua no se queda: llega, se va. Tú te quedas. Eso basta.`,
    `Non è una cura. Una riva. L’acqua arriva, l’acqua se ne va. Siedi sul bordo. Non gestisci l’onda. Non la fermi. Sei solo sul bordo.

La schiena può appoggiarsi. I piedi a terra o distesi. Sabbia, pietra, legno: quello che c’è. Freddo o caldo, tutti e due sono riva.

Tre respiri. Il respiro non deve assomigliare a un’onda. Entra. Esce. L’acqua sa il suo lavoro. Tu sai il tuo posto.

La mente può contare le onde. Non basta. Troppe. Vicine. Lontane. Quelle frasi possono arrivare. Lascia il conto. Torna al bordo. Palmo. Pianta. Questo respiro.

Dentro: sono sul bordo. Non cercare una prova. Se l’acqua arriva, arriva. Se se ne va, se ne va. Nessuna è il tuo compito.

Spalle. Mascella. Lingua. Ognuna nel proprio peso. Se c’è vento, c’è vento. Se no, no. La riva tiene entrambi. Tieni anche tu.

Quattro respiri. Un’inspirazione come un arrivo. Un’espirazione come una partenza. Non devi forzare la somiglianza. Solo la sequenza. Poi di nuovo i piedi.

La derealizzazione può descrivere un vetro. Non rompi il vetro. Il bordo resta. La pressione resta. Anche questa è notizia.

Suoni: acqua, un uccello lontano, un motore. Non chiuderli fuori. Il bordo li prende anche. Sei sul bordo. Non devi essere dentro l’acqua.

Ultimi tre respiri. Occhi piano. Stanza. Mani. Se la riva è un’immagine, un’immagine. Se è vera, vera. Tu sei qui.

Rilascio: non farai della riva un esame. Il bordo resta. L’acqua non resta: arriva, se ne va. Tu resti. Questo basta.`,
    `Bu müalicə deyil. Bir sahil. Su gəlir, su gedir. Sən kənarda oturursan. Dalğanı idarə etmirsən. Dalğanı dayandırmırsan. Yalnız kənardasan.

Bel söykənə bilər. Ayaqlar yerdə və ya uzanıb. Qum, daş, taxta — hansı varsa, o. Soyuq ya isti, hər ikisi sahildir.

Üç nəfəs. Nəfəs dalğaya bənzəmək məcburiyyətində deyil. Girir. Çıxır. Su öz işini bilir. Sən öz yerini.

Ağıl dalğanı saya bilər. Çatmır. Çoxdur. Yaxın. Uzaq. Bu cümlələr gələ bilər. Sayımı burax. Kənara qayıt. Ovuc. Ayaq altı. Bu nəfəs.

İçindən: kənardayam. Sübut axtarma. Su gəlirsə gəlir. Gedirsə gedir. Heç biri sənin vəzifən deyil.

Çiyinlər. Çənə. Dil. Hər biri öz ağırlığında. Külək varsa külək. Yoxdursa yox. Sahil ikisini də tutur. Sən də tutulursan.

Dörd nəfəs. Gəliş kimi giriş. Gediş kimi çıxış. Bənzətmək məcburiyyətində deyilsən. Yalnız sıra. Sonra yenə ayaqlar.

Derealizasiya şüşə danışa bilər. Şüşəni qırmırsan. Kənar durur. Təzyiq durur. Bu da bir xəbər.

Səslər: su, uzaq quş, bir motor. Onları bağlama. Kənar onları da alır. Sən kənardasan, suyun içində olmaq məcburiyyətində deyilsən.

Son üç nəfəs. Gözlər yavaş. Otaq. Əllər. Sahil şəkilədirsə şəkil. Gerçəkdirsə gerçək. Sən buradasan.

Buraxılış: sahili imtahan etməyəcəksən. Kənar durur. Su durmur — gəlir, gedir. Sən durursan. Bu bəsdir.`,
    `Это не лечение. Берег. Вода приходит, вода уходит. Ты сидишь на краю. Ты не управляешь волной. Ты её не останавливаешь. Ты просто на краю.

Спина может опереться. Стопы на полу или вытянуты. Песок, камень, дерево — что есть, то и есть. Холод или тепло — оба берег.

Три дыхания. Дыханию не нужно быть похожим на волну. Вдох. Выдох. Вода знает свою работу. Ты знаешь своё место.

Ум может считать волны. Мало. Много. Близко. Далеко. Эти фразы могут прийти. Оставь счёт. Вернись к краю. Ладонь. Стопа. Этот вдох.

Внутри: я на краю. Не ищи доказательства. Если вода приходит — приходит. Если уходит — уходит. Ни то ни другое не твоя задача.

Плечи. Челюсть. Язык. Каждое в своём весе. Если есть ветер — есть ветер. Если нет — нет. Берег держит оба. И тебя.

Четыре дыхания. Вдох как приход. Выдох как уход. Не нужно насильно делать сходство. Только последовательность. Потом снова стопы.

Дереализация может описать стекло. Ты стекло не бьёшь. Край остаётся. Давление остаётся. Это тоже новость.

Звуки: вода, далёкая птица, мотор. Не закрывай их. Край берёт и их. Ты на краю. Тебе не нужно быть внутри воды.

Последние три дыхания. Глаза медленно. Комната. Руки. Если берег — картинка, картинка. Если настоящий — настоящий. Ты здесь.

Отпускание: ты не сделаешь из берега экзамен. Край остаётся. Вода не остаётся — приходит, уходит. Ты остаёшься. Этого достаточно.`,
  ),

  'shore-stone': pack(
    `Bu bir tedavi değildir. Avuçta bir ağırlık. Taş olabilir. Anahtar. Telefon. Veya sadece avucun kendi ağırlığı. Hangisi varsa, o. Sıkmak yok. Sadece tutmak, sonra bırakmak.

Ayaklar yerde. Sırt yaslı. Avuç açık veya yarı kapalı. Ağırlık aşağı. Aşağı bir emir değil. Yerçekimi.

Üç nefes. Nefes taşı taşımaz. Taş nefesi tutmaz. İkisi yan yana. Giriş. Çıkış. Ağırlık duruyor.

Zihin taşı bir anlama çevirebilir. Suç. Görev. Dert. Bu cümleler gelebilir. Taşa anlam yükleme. Sadece ağırlık. Isı. Kenar. Gerçek.

İçinden: avucumda ağırlık var. Kanıt arama. Beş nefes. Her verişte milim bırakılabilir. Bırakılmazsa bırakılmaz. Yarış yok.

Parmaklar taşı ezmek zorunda değil. Başparmak. Kenar. Taş soğuksa soğuk. Ilıksa ılık. İkisi de haber. Omuzlar. Çene. Dil. Ağırlık avuçta kalabilir, vücudun geri kalanı bırakılabilir.

Zihin “atayım” diyebilir. “Sonsuza kadar tutayım” da diyebilir. İkisini de şimdi yapmak zorunda değilsin. Şimdi sadece ağırlığı fark etmek.

Son üç nefes. İstersen taşı yavaşça bir masaya veya dize bırak. Bırakmazsan da avuç duruyor. Gözler yavaşça. Oda. Eller.

Bırakış: taşı bir sınav haline getirmeyeceksin. Ağırlık durabilir. Sen duruyorsun. Atmak zorunda değilsin. Sonsuza kadar tutmak da değil. Bu birkaç dakika yeter.`,
    `This is not a treatment. A weight in the palm. It can be a stone. A key. A phone. Or only the weight of the palm itself. Whichever is there, that. No squeezing. Only holding, then setting down.

Feet on the floor. Back supported. Palm open or half closed. Weight down. Down is not an order. It is gravity.

Three breaths. The breath does not carry the stone. The stone does not hold the breath. They sit side by side. In. Out. The weight stays.

The mind can turn the stone into a meaning. Blame. Duty. Trouble. Those sentences can arrive. Do not load the stone with meaning. Only weight. Heat. Edge. Actual.

Inside: there is weight in my palm. Do not look for proof. Five breaths. On each exhale a millimetre can be released. If it is not, it is not. No race.

The fingers do not have to crush the stone. Thumb. Edge. If the stone is cold, cold. If warm, warm. Both are news. Shoulders. Jaw. Tongue. The weight can stay in the palm; the rest of the body can drop.

The mind can say throw it. It can also say hold it forever. You do not have to do either now. Now you only notice the weight.

Last three breaths. If you want, set the stone down slowly on a table or a knee. If you do not, the palm still stays. Eyes slowly. Room. Hands.

Release: you will not turn the stone into an exam. The weight can stay. You stay. You do not have to throw it. You do not have to keep it forever. These few minutes are enough.`,
    `Esto no es un tratamiento. Un peso en la palma. Puede ser una piedra. Una llave. Un teléfono. O solo el peso de la palma. Lo que haya. Sin apretar. Solo sostener, luego dejar.

Los pies en el suelo. La espalda apoyada. Palma abierta o a medio cerrar. El peso hacia abajo. Abajo no es una orden. Es gravedad.

Tres respiraciones. El aire no carga la piedra. La piedra no sujeta el aire. Van juntas. Entra. Sale. El peso sigue.

La mente puede convertir la piedra en un significado. Culpa. Deber. Problema. Esas frases pueden llegar. No cargues la piedra de sentido. Solo peso. Calor. Borde. Real.

Por dentro: hay peso en mi palma. No busques una prueba. Cinco respiraciones. En cada exhalación se puede soltar un milímetro. Si no, no. Sin carrera.

Los dedos no tienen que aplastar la piedra. Pulgar. Borde. Si la piedra está fría, fría. Si tibia, tibia. Las dos son noticia. Hombros. Mandíbula. Lengua. El peso puede quedarse en la palma; el resto del cuerpo puede caer.

La mente puede decir tírala. También puede decir reténla para siempre. No tienes que hacer ninguna de las dos ahora. Ahora solo notas el peso.

Últimas tres respiraciones. Si quieres, deja la piedra despacio en una mesa o en una rodilla. Si no, la palma sigue. Los ojos despacio. La habitación. Las manos.

Suelta: no vas a convertir la piedra en un examen. El peso puede quedarse. Tú te quedas. No tienes que tirarla. Tampoco guardarla para siempre. Estos minutos bastan.`,
    `Non è una cura. Un peso nel palmo. Può essere una pietra. Una chiave. Un telefono. O solo il peso del palmo. Quello che c’è. Senza stringere. Solo tenere, poi posare.

Piedi a terra. Schiena appoggiata. Palmo aperto o mezzo chiuso. Peso in basso. Basso non è un ordine. È gravità.

Tre respiri. Il respiro non porta la pietra. La pietra non tiene il respiro. Stanno accanto. Entra. Esce. Il peso resta.

La mente può trasformare la pietra in un significato. Colpa. Dovere. Problema. Quelle frasi possono arrivare. Non caricare la pietra di senso. Solo peso. Calore. Bordo. Vero.

Dentro: c’è peso nel palmo. Non cercare una prova. Cinque respiri. A ogni espirazione si può lasciare un millimetro. Se no, no. Niente gara.

Le dita non devono schiacciare la pietra. Pollice. Bordo. Se la pietra è fredda, fredda. Se tiepida, tiepida. Tutte e due sono notizia. Spalle. Mascella. Lingua. Il peso può restare nel palmo; il resto del corpo può cadere.

La mente può dire buttala. Può anche dire tienila per sempre. Non devi fare nessuna delle due ora. Ora noti solo il peso.

Ultimi tre respiri. Se vuoi, posa la pietra piano su un tavolo o su un ginocchio. Se non lo fai, il palmo resta. Occhi piano. Stanza. Mani.

Rilascio: non farai della pietra un esame. Il peso può restare. Tu resti. Non devi buttarla. Non devi tenerla per sempre. Questi minuti bastano.`,
    `Bu müalicə deyil. Ovucda bir ağırlıq. Daş ola bilər. Açar. Telefon. Və ya yalnız ovucun öz ağırlığı. Hansı varsa, o. Sıxmaq yoxdur. Yalnız tutmaq, sonra buraxmaq.

Ayaqlar yerdə. Bel dayaqlı. Ovuc açıq və ya yarı bağlı. Ağırlıq aşağı. Aşağı əmr deyil. Cazibə.

Üç nəfəs. Nəfəs daşı daşımır. Daş nəfəsi tutmur. Yan-yana dururlar. Giriş. Çıxış. Ağırlıq durur.

Ağıl daşı bir mənaya çevirə bilər. Günah. Vəzifə. Dərd. Bu cümlələr gələ bilər. Daşa məna yükləmə. Yalnız ağırlıq. İstilik. Kənar. Gerçək.

İçindən: ovucumda ağırlıq var. Sübut axtarma. Beş nəfəs. Hər verişdə milim buraxıla bilər. Buraxılmazsa buraxılmaz. Yarış yoxdur.

Barmaqlar daşı əzmək məcburiyyətində deyil. Baş barmaq. Kənar. Daş soyuqsa soyuq. İstidirsə isti. Hər ikisi xəbərdir. Çiyinlər. Çənə. Dil. Ağırlıq ovucda qala bilər, bədənin qalanı buraxıla bilər.

Ağıl “atım” deyə bilər. “Sonsuza qədər tutum” da. İkisini də indi etmək məcburiyyətində deyilsən. İndi yalnız ağırlığı görmək.

Son üç nəfəs. İstəsən daşı yavaşca masaya və ya dizə qoy. Qoymasan da ovuc durur. Gözlər yavaş. Otaq. Əllər.

Buraxılış: daşı imtahan etməyəcəksən. Ağırlıq qala bilər. Sən durursan. Atmaq məcburiyyətində deyilsən. Sonsuza qədər tutmaq da deyil. Bu bir neçə dəqiqə bəsdir.`,
    `Это не лечение. Вес на ладони. Это может быть камень. Ключ. Телефон. Или только вес самой ладони. Что есть — то и есть. Не сжимать. Только держать, потом положить.

Стопы на полу. Спина с опорой. Ладонь открыта или полузакрыта. Вес вниз. Вниз — не приказ. Это сила тяжести.

Три дыхания. Дыхание не несёт камень. Камень не держит дыхание. Они рядом. Вдох. Выдох. Вес остаётся.

Ум может превратить камень в смысл. Вина. Долг. Беда. Эти фразы могут прийти. Не нагружай камень смыслом. Только вес. Тепло. Край. Настоящее.

Внутри: на ладони есть вес. Не ищи доказательства. Пять дыханий. На каждом выдохе можно отпустить миллиметр. Если нет — нет. Без гонки.

Пальцам не нужно давить камень. Большой палец. Край. Если камень холодный — холодный. Если тёплый — тёплый. Оба — новость. Плечи. Челюсть. Язык. Вес может остаться на ладони; остальное тело может опуститься.

Ум может сказать брось. Может сказать держи навсегда. Сейчас не нужно делать ни то ни другое. Сейчас ты только замечаешь вес.

Последние три дыхания. Если хочешь, медленно положи камень на стол или на колено. Если нет — ладонь всё равно остаётся. Глаза медленно. Комната. Руки.

Отпускание: ты не сделаешь из камня экзамен. Вес может остаться. Ты остаёшься. Бросать не нужно. Держать навсегда тоже нет. Этих нескольких минут достаточно.`,
  ),

  'shore-seed': pack(
    `Bu bir tedavi değildir. Tek bir kare. Tek bir tohum. Bütün geceyi, bütün hayatı planlamak yok. Sadece bir şey. Küçük. Tutulabilir.

Gözler kapanabilir. Bir sahne seç. Büyük olmak zorunda değil. Bir fincan. Bir pencere. Bir kumaş. Bir isim. Hangisi gelirse, o. Değiştirmek yok. Zenginleştirmek yok. Tek kare.

Üç nefes. Tohum nefesi yönetmez. Nefes tohumu büyütmez. İkisi yan yana. Giriş. Çıkış. Kare duruyor.

Zihin kareyi bir plana çevirebilir. Yarın. Liste. Düzeltme. Bu cümleler gelebilir. Planı kovalama. Kareye dön. Avuç. Taban. Bu nefes.

İçinden: bir karem var. Kanıt arama. Beş nefes. Tohumu zorla büyütme. Bu gece filizlenmek zorunda değil. Sadece durmak.

Omuzlar. Çene. Dil. Herbiri kendi ağırlığına. Kare zihinde solabilir. Solursa avuca dön. Isı. Kenar. Sonra, isterse, aynı kare yine.

Küçük bir şükran, bağırış değil. Bu kumaş. Bu nefes. Bu oda. Fazlası yok.

Son üç nefes. Gözler yavaşça. Oda. Eller. Tohum sende kalabilir. Götürmek zorunda değilsin. Bırakmak da zorunda değilsin.

Bırakış: tohumu bir sınav haline getirmeyeceksin. Tek kare yeter. Oda duruyor. Sen duruyorsun. Bu birkaç dakika yeter.`,
    `This is not a treatment. One frame. One seed. No plan for the whole night, or the whole life. Only one thing. Small. Holdable.

Eyes can close. Choose one scene. It does not have to be large. A cup. A window. A cloth. A name. Whichever arrives, that. Do not swap it. Do not enrich it. One frame.

Three breaths. The seed does not manage the breath. The breath does not grow the seed. They sit side by side. In. Out. The frame stays.

The mind can turn the frame into a plan. Tomorrow. A list. A fix. Those sentences can arrive. Do not chase the plan. Return to the frame. Palm. Sole. This breath.

Inside: I have one frame. Do not look for proof. Five breaths. Do not force the seed to grow. It does not have to sprout tonight. Only stay.

Shoulders. Jaw. Tongue. Each in its own weight. The frame can fade in the mind. If it fades, return to the palm. Heat. Edge. Then, if it wants, the same frame again.

A small thanks, not a shout. This cloth. This breath. This room. Nothing extra.

Last three breaths. Eyes slowly. Room. Hands. The seed can stay with you. You do not have to carry it away. You do not have to leave it.

Release: you will not turn the seed into an exam. One frame is enough. The room stays. You stay. These few minutes are enough.`,
    `Esto no es un tratamiento. Un solo fotograma. Una semilla. No hay un plan para toda la noche ni para toda la vida. Solo una cosa. Pequeña. Que se puede sostener.

Los ojos pueden cerrarse. Elige una escena. No tiene que ser grande. Una taza. Una ventana. Una tela. Un nombre. Lo que llegue, eso. No la cambies. No la enriquezcas. Un fotograma.

Tres respiraciones. La semilla no gestiona el aire. El aire no hace crecer la semilla. Van juntas. Entra. Sale. El fotograma sigue.

La mente puede convertir el fotograma en un plan. Mañana. Una lista. Un arreglo. Esas frases pueden llegar. No persigas el plan. Vuelve al fotograma. Palma. Planta. Este aliento.

Por dentro: tengo un fotograma. No busques una prueba. Cinco respiraciones. No fuerces la semilla a crecer. No tiene que brotar esta noche. Solo quedarse.

Hombros. Mandíbula. Lengua. Cada uno en su peso. El fotograma puede desvanecerse. Si se desvanece, vuelve a la palma. Calor. Borde. Luego, si quiere, el mismo fotograma otra vez.

Una pequeña gracia, no un grito. Esta tela. Este aliento. Esta habitación. Nada de más.

Últimas tres respiraciones. Los ojos despacio. La habitación. Las manos. La semilla puede quedarse contigo. No tienes que llevártela. Tampoco dejarla.

Suelta: no vas a convertir la semilla en un examen. Un fotograma basta. La habitación sigue. Tú sigues. Estos minutos bastan.`,
    `Non è una cura. Un solo fotogramma. Un seme. Niente piano per tutta la notte, né per tutta la vita. Solo una cosa. Piccola. Che si può tenere.

Gli occhi possono chiudersi. Scegli una scena. Non deve essere grande. Una tazza. Una finestra. Una stoffa. Un nome. Quella che arriva, quella. Non cambiarla. Non arricchirla. Un fotogramma.

Tre respiri. Il seme non gestisce il respiro. Il respiro non fa crescere il seme. Stanno accanto. Entra. Esce. Il fotogramma resta.

La mente può trasformare il fotogramma in un piano. Domani. Una lista. Una correzione. Quelle frasi possono arrivare. Non inseguire il piano. Torna al fotogramma. Palmo. Pianta. Questo respiro.

Dentro: ho un fotogramma. Non cercare una prova. Cinque respiri. Non forzare il seme a crescere. Non deve germogliare stanotte. Solo restare.

Spalle. Mascella. Lingua. Ognuna nel proprio peso. Il fotogramma può sbiadire. Se sbiadisce, torna al palmo. Calore. Bordo. Poi, se vuole, lo stesso fotogramma di nuovo.

Un piccolo grazie, non un grido. Questa stoffa. Questo respiro. Questa stanza. Niente in più.

Ultimi tre respiri. Occhi piano. Stanza. Mani. Il seme può restare con te. Non devi portarlo via. Non devi lasciarlo.

Rilascio: non farai del seme un esame. Un fotogramma basta. La stanza resta. Tu resti. Questi minuti bastano.`,
    `Bu müalicə deyil. Tək bir kadr. Tək bir toxum. Bütün gecəni, bütün həyatı planlamaq yoxdur. Yalnız bir şey. Kiçik. Tutula bilər.

Gözlər bağlana bilər. Bir səhnə seç. Böyük olmaq məcburiyyətində deyil. Bir fincan. Bir pəncərə. Bir parça. Bir ad. Hansı gəlirsə, o. Dəyişdirmə. Zənginləşdirmə. Tək kadr.

Üç nəfəs. Toxum nəfəsi idarə etmir. Nəfəs toxumu böyütmür. Yan-yana dururlar. Giriş. Çıxış. Kadr durur.

Ağıl kadri bir plana çevirə bilər. Sabah. Siyahı. Düzəliş. Bu cümlələr gələ bilər. Planı qovma. Kadrə qayıt. Ovuc. Ayaq altı. Bu nəfəs.

İçindən: bir kadrım var. Sübut axtarma. Beş nəfəs. Toxumu zorla böyütmə. Bu gecə cücərmək məcburiyyətində deyil. Yalnız durmaq.

Çiyinlər. Çənə. Dil. Hər biri öz ağırlığında. Kadr ağılda sönə bilər. Sönərsə ovuca qayıt. İstilik. Kənar. Sonra, istəsə, eyni kadr yenə.

Kiçik bir minnətdarlıq, qışqırıq deyil. Bu parça. Bu nəfəs. Bu otaq. Artığı yoxdur.

Son üç nəfəs. Gözlər yavaş. Otaq. Əllər. Toxum səndə qala bilər. Aparmaq məcburiyyətində deyilsən. Buraxmaq da.

Buraxılış: toxumu imtahan etməyəcəksən. Tək kadr bəsdir. Otaq durur. Sən durursan. Bu bir neçə dəqiqə bəsdir.`,
    `Это не лечение. Один кадр. Одно семя. Нет плана на всю ночь и на всю жизнь. Только одна вещь. Маленькая. Её можно удержать.

Глаза могут закрыться. Выбери одну сцену. Ей не нужно быть большой. Чашка. Окно. Ткань. Имя. Что пришло — то. Не меняй. Не украшай. Один кадр.

Три дыхания. Семя не управляет дыханием. Дыхание не растит семя. Они рядом. Вдох. Выдох. Кадр остаётся.

Ум может превратить кадр в план. Завтра. Список. Исправление. Эти фразы могут прийти. Не гонись за планом. Вернись к кадру. Ладонь. Стопа. Этот вдох.

Внутри: у меня есть один кадр. Не ищи доказательства. Пять дыханий. Не заставляй семя расти. Ему не нужно взойти этой ночью. Только оставаться.

Плечи. Челюсть. Язык. Каждое в своём весе. Кадр может растаять в уме. Если растаял — вернись к ладони. Тепло. Край. Потом, если захочет, тот же кадр снова.

Маленькая благодарность, не крик. Эта ткань. Этот вдох. Эта комната. Ничего лишнего.

Последние три дыхания. Глаза медленно. Комната. Руки. Семя может остаться с тобой. Уносить его не нужно. Оставлять тоже не нужно.

Отпускание: ты не сделаешь из семени экзамен. Одного кадра достаточно. Комната остаётся. Ты остаёшься. Этих нескольких минут достаточно.`,
  ),
}

export function medBody(id: string) {
  return MED_SCRIPTS[id]?.tr ?? ''
}
