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

/** Full spoken scripts. Present tense, body, no “relax” commands, not a treatment. */
const RAW_SCRIPTS: Record<string, Record<LocaleId, string>> = {
  'first-settle': pack(
    `Bu bir tedavi değildir. Sadece birkaç dakika. Oturuyorsun veya yatıyorsun. Oda aynı oda. Pencere aynı pencere. Doğru bir pozisyon yok. Omurga bir sütun olmak zorunda değil.

Ağırlığın sandalyede veya yatakta nasıl dağıldığını fark et. Kalça. Sırt. Topuklar. Kumaşın dokunuşu. Isı veya serinlik. İsim yeter.

Alın. Kaşlar gerilmek zorunda değil. Göz kapakları ağır olabilir, açık da kalabilir. Çene. Dişler birbirine kenetlenmek zorunda değil. Dil, üst damağın arkasında durabilir.

Burada üç nefes. Alış. Veriş. Değiştirme. Sadece izle.

Boynun iki yanı. Kulaklar. Omuzlar kulaklara yapışmak zorunda değil. Bir milim boşluk olsa da olur, olmasa da. Avuçlar. Parmaklar. Karın, nefesle hafifçe hareket edebilir. Zorlama.

Tabanlar yerdeyse yer seni tutuyor. Topuk. Kemer. Parmak uçları. Yatıyorsan yatak tutuyor. Burada iki nefes.

Zihin bir listeye dönerse, bu bir hata değil. Bir bölgeye dön. Çene, veya avuç, veya taban. Sonra yine nefes.

Omuzların ağırlığı. Göğsün önü. Nefes orada da olabilir, burunda da. Hangisi daha netse orada kal. Üç nefes daha.

“Rahatla” emri yok. Sadece yerleş. Oda çalışmıyor senin için. Sen odadasın.

Ayak bilekleri. Dizler. Kalçalar. Ağırlık aşağıda durabilir. Yarış yok. Süre bir yarış değil.

İçinden, yavaş: buradayım. Kanıt arama. Cümle yeter.

Alın bir kez daha. Çene. Avuçlar. Tabanlar. Üç nefes.

Sesler varsa sesler. Uzak bir motor, bir kuş, bir boru. Onları kapatmak zorunda değilsin. Oda onları da tutuyor.

Bir veriş. Sonra bir tane daha. Zihin giderse bir avuca dön.

Omuzlar. Karın. Yer.

Son üç nefes. Alış. Veriş. Alış. Veriş. Alış. Veriş.

Bırakış: bunu bir performans haline getirmeyeceksin. Oturduğun yer duruyor. Sen de.`,
    `This is not a treatment. Only a few minutes. You sit or you lie down. The room stays the room. The window stays the window. There is no correct pose. The spine does not have to be a column.

Notice how the weight sits in the chair or the bed. Hips. Back. Heels. The cloth. Heat or cool. A name is enough.

The forehead. The brows do not have to tighten. The eyelids may be heavy, or they may stay open. The jaw. The teeth do not have to lock. The tongue can rest behind the upper teeth.

Stay for three breaths. In. Out. Do not change them. Only watch.

The sides of the neck. The ears. The shoulders do not have to climb toward the ears. A millimetre of space is enough, and so is none. The palms. The fingers. The belly may move a little with the breath. No force.

If the soles are on the floor, the floor is holding you. Heel. Arch. Toes. If you are lying down, the bed is holding you. Two breaths here.

If the mind returns to a list, that is not a mistake. Come back to one place. Jaw, or palm, or sole. Then the breath again.

The weight of the shoulders. The front of the chest. The breath may be there, or at the nose. Stay where it is clearer. Three more breaths.

There is no command to relax. Only arrive. The room is not working for you. You are in the room.

Ankles. Knees. Hips. Weight can rest low. There is no race. Time is not a contest.

Quietly, inside: I am here. Do not look for proof. The sentence is enough.

Forehead once more. Jaw. Palms. Soles. Three breaths.

If there are sounds, there are sounds. A distant engine, a bird, a pipe. You do not have to shut them out. The room holds them too.

One out-breath. Then another. If the mind leaves, return to one palm.

Shoulders. Belly. Ground.

Last three breaths. In. Out. In. Out. In. Out.

Release: you will not turn this into a performance. The place you sit stays. So do you.`,
    `Esto no es un tratamiento. Solo unos minutos. Estás sentada o tumbada. La habitación sigue siendo la habitación. La ventana sigue. No hay una pose correcta. La columna no tiene que ser una columna de mármol.

Nota cómo se reparte el peso en la silla o en la cama. Cadera. Espalda. Talones. La tela. Calor o fresco. Un nombre basta.

La frente. Las cejas no tienen que tensarse. Los párpados pueden estar pesados, o abiertos. La mandíbula. Los dientes no tienen que cerrarse con fuerza. La lengua puede quedar detrás de los dientes de arriba.

Quédate tres respiraciones. Entra. Sale. No las cambies. Solo mira.

Los lados del cuello. Las orejas. Los hombros no tienen que subir hacia las orejas. Un milímetro de espacio basta, y también ninguno. Las palmas. Los dedos. El vientre puede moverse un poco con el aliento. Sin fuerza.

Si las plantas están en el suelo, el suelo te sostiene. Talón. Arco. Dedos. Si estás tumbada, la cama te sostiene. Aquí dos respiraciones.

Si la mente vuelve a una lista, no es un error. Vuelve a una zona. Mandíbula, o palma, o planta. Luego otra vez el aliento.

El peso de los hombros. El pecho por delante. El aliento puede estar ahí, o en la nariz. Quédate donde se note más. Tres respiraciones más.

No hay una orden de relajarte. Solo llegar. La habitación no trabaja para ti. Tú estás en la habitación.

Tobillos. Rodillas. Caderas. El peso puede quedar abajo. No hay carrera. El tiempo no es un concurso.

Por dentro, despacio: estoy aquí. No busques una prueba. La frase basta.

La frente otra vez. Mandíbula. Palmas. Plantas. Tres respiraciones.

Si hay sonidos, hay sonidos. Un motor lejano, un pájaro, una tubería. No tienes que apagarlos. La habitación también los sostiene.

Una exhalación. Luego otra. Si la mente se va, vuelve a una palma.

Hombros. Vientre. Suelo.

Las últimas tres respiraciones. Entra. Sale. Entra. Sale. Entra. Sale.

Suelta: no vas a convertir esto en una actuación. El sitio donde estás sigue. Tú también.`,
    `Non è una cura. Solo pochi minuti. Sei seduta o sdraiata. La stanza resta la stanza. La finestra resta. Non c’è una posa giusta. La schiena non deve essere una colonna.

Nota come il peso si distribuisce sulla sedia o sul letto. Fianchi. Schiena. Talloni. La stoffa. Caldo o fresco. Un nome basta.

La fronte. Le sopracciglia non devono stringersi. Le palpebre possono essere pesanti, o restare aperte. La mascella. I denti non devono chiudersi a forza. La lingua può stare dietro i denti di sopra.

Resta tre respiri. Entra. Esce. Non cambiarli. Guarda soltanto.

I lati del collo. Le orecchie. Le spalle non devono salire verso le orecchie. Un millimetro di spazio basta, e anche nessuno. I palmi. Le dita. La pancia può muoversi un poco con il respiro. Senza forza.

Se le piante sono a terra, la terra ti tiene. Tallone. Arco. Dita. Se sei sdraiata, il letto ti tiene. Qui due respiri.

Se la mente torna a una lista, non è un errore. Torna a una zona. Mascella, o palmo, o pianta. Poi di nuovo il respiro.

Il peso delle spalle. Il petto davanti. Il respiro può essere lì, o al naso. Resta dove è più chiaro. Altri tre respiri.

Non c’è un ordine di rilassarti. Solo arrivare. La stanza non lavora per te. Tu sei nella stanza.

Caviglie. Ginocchia. Fianchi. Il peso può stare in basso. Non c’è una gara. Il tempo non è una prova.

Dentro, piano: sono qui. Non cercare una prova. La frase basta.

La fronte ancora. Mascella. Palmi. Piante. Tre respiri.

Se ci sono suoni, ci sono suoni. Un motore lontano, un uccello, un tubo. Non devi spegnerli. La stanza li tiene anche loro.

Un’espirazione. Poi un’altra. Se la mente parte, torna a un palmo.

Spalle. Pancia. Terra.

Ultimi tre respiri. Entra. Esce. Entra. Esce. Entra. Esce.

Rilascio: non farai di questo una recita. Il posto dove sei resta. Anche tu.`,
    `Bu müalicə deyil. Yalnız bir neçə dəqiqə. Oturursan və ya uzanırsan. Otaq eyni otaqdır. Pəncərə eyni pəncərədir. Düzgün bir poza yoxdur. Onurğa sütun olmaq məcburiyyətində deyil.

Ağırlığın stulda və ya çarpayıda necə paylandığını duy. Omba. Bel. Dabanlar. Parçanın toxunuşu. İstilik və ya sərinlik. Ad bəsdir.

Alın. Qaşlar gərilmək məcburiyyətində deyil. Göz qapaqları ağır ola bilər, açıq da qala bilər. Çənə. Dişlər bir-birinə sıxılmaq məcburiyyətində deyil. Dil üst dişlərin arxasında dura bilər.

Burada üç nəfəs. Alış. Veriş. Dəyişdirmə. Yalnız izlə.

Boyunun iki yanı. Qulaqlar. Çiyinlər qulaqlara yapışmaq məcburiyyətində deyil. Bir milim boşluq olsa da olar, olmasa da. Ovuc. Barmaqlar. Qarın nəfəslə bir az hərəkət edə bilər. Məcbur etmə.

Ayaq altı yerdədirsə yer səni tutur. Daban. Tağ. Barmaq ucları. Uzanırsansa çarpayı tutur. Burada iki nəfəs.

Ağıl siyahıya qayıdarsa bu səhv deyil. Bir yerə qayıt. Çənə, ya ovuc, ya ayaq altı. Sonra yenə nəfəs.

Çiyinlərin ağırlığı. Sinənin önü. Nəfəs orada da ola bilər, burunda da. Hansı daha aydındırsa orada qal. Daha üç nəfəs.

“Rahatla” əmri yoxdur. Yalnız yerləş. Otaq sənin üçün işləmir. Sən otaqdasan.

Bilək. Diz. Omba. Ağırlıq aşağıda dura bilər. Yarış yoxdur. Vaxt yarış deyil.

İçindən, yavaş: buradayam. Sübut axtarma. Cümlə bəsdir.

Alın bir də. Çənə. Ovuc. Ayaq altı. Üç nəfəs.

Səslər varsa səslər. Uzaq bir mühərrik, bir quş, bir boru. Onları bağlamaq məcburiyyətində deyilsən. Otaq onları da tutur.

Bir veriş. Sonra bir də. Ağıl getsə bir ovuca qayıt.

Çiyinlər. Qarın. Yer.

Son üç nəfəs. Alış. Veriş. Alış. Veriş. Alış. Veriş.

Buraxılış: bunu tamaşa etməyəcəksən. Oturduğun yer durur. Sən də.`,
    `Это не лечение. Только несколько минут. Ты сидишь или лежишь. Комната остаётся комнатой. Окно остаётся окном. Правильной позы нет. Позвоночник не обязан быть колонной.

Заметь, как вес распределяется в стуле или в постели. Бёдра. Спина. Пятки. Ткань. Тепло или прохлада. Имени достаточно.

Лоб. Бровям не нужно напрягаться. Веки могут быть тяжёлыми или оставаться открытыми. Челюсть. Зубам не нужно сжиматься. Язык может лежать за верхними зубами.

Здесь три дыхания. Вдох. Выдох. Не меняй их. Только смотри.

Стороны шеи. Уши. Плечам не нужно подниматься к ушам. Миллиметр пространства достаточен, и его отсутствие тоже. Ладони. Пальцы. Живот может чуть двигаться с дыханием. Без силы.

Если стопы на полу — пол держит тебя. Пятка. Свод. Пальцы. Если ты лежишь — кровать держит. Здесь два дыхания.

Если ум возвращается к списку — это не ошибка. Вернись к одному месту. Челюсть, или ладонь, или стопа. Потом снова дыхание.

Вес плеч. Передняя сторона груди. Дыхание может быть там или в носу. Останься там, где яснее. Ещё три дыхания.

Нет команды расслабиться. Только прибыть. Комната не работает на тебя. Ты в комнате.

Лодыжки. Колени. Бёдра. Вес может оставаться внизу. Гонки нет. Время — не состязание.

Внутри, тихо: я здесь. Не ищи доказательства. Предложения достаточно.

Лоб ещё раз. Челюсть. Ладони. Стопы. Три дыхания.

Если есть звуки — есть звуки. Далёкий мотор, птица, труба. Тебе не нужно их выключать. Комната держит и их.

Один выдох. Потом ещё. Если ум ушёл — вернись к одной ладони.

Плечи. Живот. Земля.

Последние три дыхания. Вдох. Выдох. Вдох. Выдох. Вдох. Выдох.

Отпускание: ты не сделаешь из этого представление. Место, где ты сидишь, остаётся. И ты тоже.`,
  ),

  'first-breath': pack(
    `Bu bir tedavi değildir. Nefesi değiştirme. Yönetme. Sadece izle.

Hava nerede daha net. Burun delikleri. Üst dudak. Göğsün önü. Kaburgaların yanları. Karın. Bir yer seç. Orada kal.

Alış. Hava giriyor. Veriş. Hava çıkıyor. Uzun yapmak zorunda değilsin. Kısa yapmak zorunda değilsin. Ritmi düzeltme.

Burada üç nefes. Alış. Veriş. Alış. Veriş. Alış. Veriş.

Zihin bir cümleye giderse, bu da nefes gibi gelir ve gider. Bir verişe dön. Havanın bittiği yer. Omuzlar o verişte bir şey kanıtlamak zorunda değil.

Göğüs yükseliyor olabilir. Karın da. İkisini yarıştırma. Hangisi varsa o.

İki nefes. Sadece iz.

Veriş biraz uzun olabilir. Zorlama. Uzun olsun diye çekme. Kendiliğinden uzunsa uzun. Değilse değil.

İçinden: izliyorum. Yönetmiyorum.

Burun ucu. Serinlik alışta, biraz daha ılık verişte. Bu bir teknik değil. Bir duyum.

Üç nefes daha. Zihin plan yaparsa planı izleme. Bir veriş yeter.

Boyun. Çene. Nefes onları düzeltmek zorunda değil. Onlar duruyor. Nefes geçiyor.

Ayaklar yerdeyse yer. Avuçlar. Nefesle birlikte onları da fark edebilirsin. Zorunlu değil.

Alış. Bekleme. Veriş. Bekleme. Boşluk varsa boşluk. Doldurma.

İki nefes.

Hava bitmesin diye yarışma. Sen havayı yönetmiyorsun. Akciğerler işini biliyor. Sen seyircisin, hakem değilsin.

Bir veriş. Sonra bir tane daha.

Omuzlar. Karın. Burun.

Son dört nefes. Sayma. Sadece bitene kadar izle. Alış. Veriş. Alış. Veriş. Alış. Veriş. Alış. Veriş.

Bırakış: nefesi bir proje haline getirmeyeceksin. Hava giriyor. Hava çıkıyor. Oda duruyor.`,
    `This is not a treatment. Do not change the breath. Do not manage it. Only watch.

Where the air is clearer. The nostrils. The upper lip. The front of the chest. The sides of the ribs. The belly. Pick one place. Stay there.

In. Air arrives. Out. Air leaves. You do not have to make it long. You do not have to make it short. Do not correct the rhythm.

Stay for three breaths. In. Out. In. Out. In. Out.

If the mind goes to a sentence, that sentence also arrives and leaves, like breath. Return to one exhale. The place where the air ends. The shoulders do not have to prove anything on that exhale.

The chest may be rising. The belly may be too. Do not race them. Whatever is there is there.

Two breaths. Only watch.

The exhale may be a little longer. Do not force it. Do not pull it to make it long. If it is long by itself, it is long. If not, not.

Inside: I am watching. I am not managing.

The tip of the nose. Cool on the in-breath, a little warmer on the out. This is not a technique. A sensation.

Three more breaths. If the mind makes a plan, do not follow the plan. One exhale is enough.

Neck. Jaw. The breath does not have to fix them. They stay. The breath passes.

If the feet are on the floor, the floor. The palms. You can notice them with the breath. You do not have to.

In. A pause. Out. A pause. If there is a gap, there is a gap. Do not fill it.

Two breaths.

Do not race so the air will not run out. You are not managing the air. The lungs know the work. You are a watcher, not a referee.

One out-breath. Then another.

Shoulders. Belly. Nose.

Last four breaths. Do not count them as a score. Watch until they finish. In. Out. In. Out. In. Out. In. Out.

Release: you will not turn the breath into a project. Air arrives. Air leaves. The room stays.`,
    `Esto no es un tratamiento. No cambies el aliento. No lo gestiones. Solo mira.

Dónde el aire se nota más. Las fosas. El labio de arriba. El pecho por delante. Los lados de las costillas. El vientre. Elige un sitio. Quédate ahí.

Entra. El aire llega. Sale. El aire se va. No tienes que alargarlo. No tienes que acortarlo. No corrijas el ritmo.

Quédate tres respiraciones. Entra. Sale. Entra. Sale. Entra. Sale.

Si la mente se va a una frase, esa frase también llega y se va, como el aliento. Vuelve a una exhalación. El sitio donde el aire termina. Los hombros no tienen que demostrar nada en esa exhalación.

El pecho puede estar subiendo. El vientre también. No los hagas competir. Lo que hay, hay.

Dos respiraciones. Solo mira.

La exhalación puede ser un poco más larga. No fuerces. No la estires para que sea larga. Si es larga sola, es larga. Si no, no.

Por dentro: miro. No gestiono.

La punta de la nariz. Fresco al entrar, un poco más tibio al salir. Esto no es una técnica. Una sensación.

Tres respiraciones más. Si la mente hace un plan, no sigas el plan. Una exhalación basta.

Cuello. Mandíbula. El aliento no tiene que arreglarlos. Ellos están. El aliento pasa.

Si los pies están en el suelo, el suelo. Las palmas. Puedes notarlos con el aliento. No es obligatorio.

Entra. Una pausa. Sale. Una pausa. Si hay un hueco, hay un hueco. No lo llenes.

Dos respiraciones.

No corras para que no se acabe el aire. No gestionas el aire. Los pulmones saben el trabajo. Eres quien mira, no un árbitro.

Una exhalación. Luego otra.

Hombros. Vientre. Nariz.

Las últimas cuatro respiraciones. No las cuentes como un marcador. Mira hasta que terminen. Entra. Sale. Entra. Sale. Entra. Sale. Entra. Sale.

Suelta: no vas a convertir el aliento en un proyecto. El aire llega. El aire se va. La habitación sigue.`,
    `Non è una cura. Non cambiare il respiro. Non gestirlo. Guarda soltanto.

Dove l’aria è più chiara. Le narici. Il labbro di sopra. Il petto davanti. I lati delle costole. La pancia. Scegli un punto. Resta lì.

Entra. L’aria arriva. Esce. L’aria se ne va. Non devi allungarlo. Non devi accorciarlo. Non correggere il ritmo.

Resta tre respiri. Entra. Esce. Entra. Esce. Entra. Esce.

Se la mente va a una frase, anche quella frase arriva e se ne va, come il respiro. Torna a un’espirazione. Il punto in cui l’aria finisce. Le spalle non devono dimostrare niente in quell’espirazione.

Il petto può alzarsi. Anche la pancia. Non farli gareggiare. Quello che c’è, c’è.

Due respiri. Guarda soltanto.

L’espirazione può essere un poco più lunga. Non forzare. Non tirarla per farla lunga. Se è lunga da sola, è lunga. Se no, no.

Dentro: guardo. Non gestisco.

La punta del naso. Fresco all’ingresso, un poco più tiepido all’uscita. Non è una tecnica. Una sensazione.

Altri tre respiri. Se la mente fa un piano, non seguire il piano. Un’espirazione basta.

Collo. Mascella. Il respiro non deve aggiustarli. Restano. Il respiro passa.

Se i piedi sono a terra, la terra. I palmi. Puoi notarli con il respiro. Non è obbligatorio.

Entra. Una pausa. Esce. Una pausa. Se c’è uno spazio, c’è uno spazio. Non riempirlo.

Due respiri.

Non correre perché l’aria non finisca. Non gestisci l’aria. I polmoni sanno il lavoro. Sei chi guarda, non un arbitro.

Un’espirazione. Poi un’altra.

Spalle. Pancia. Naso.

Ultimi quattro respiri. Non contarli come un punteggio. Guarda finché finiscono. Entra. Esce. Entra. Esce. Entra. Esce. Entra. Esce.

Rilascio: non farai del respiro un progetto. L’aria arriva. L’aria se ne va. La stanza resta.`,
    `Bu müalicə deyil. Nəfəsi dəyişdirmə. İdarə etmə. Yalnız izlə.

Hava harada daha aydındır. Burun dəlikləri. Üst dodaq. Sinənin önü. Qabırğaların yanı. Qarın. Bir yer seç. Orada qal.

Alış. Hava gəlir. Veriş. Hava çıxır. Uzun etmək məcburiyyətində deyilsən. Qısa etmək məcburiyyətində deyilsən. Ritmi düzəltmə.

Burada üç nəfəs. Alış. Veriş. Alış. Veriş. Alış. Veriş.

Ağıl bir cümləyə getsə, o cümlə də nəfəs kimi gəlir və gedir. Bir verişə qayıt. Havanın bitdiyi yer. Çiyinlər o verişdə bir şey sübut etmək məcburiyyətində deyil.

Sinə qalxa bilər. Qarın da. Onları yarışdırma. Nə varsa odur.

İki nəfəs. Yalnız izlə.

Veriş bir az uzun ola bilər. Məcbur etmə. Uzun olsun deyə çəkmə. Öz-özünə uzundursa uzundur. Deyilsə deyil.

İçindən: izləyirəm. İdarə etmirəm.

Burun ucu. Alışda sərin, verişdə bir az ilıq. Bu texnika deyil. Bir duyum.

Daha üç nəfəs. Ağıl plan qurarsa planı izləmə. Bir veriş bəsdir.

Boyun. Çənə. Nəfəs onları düzəltmək məcburiyyətində deyil. Onlar durur. Nəfəs keçir.

Ayaqlar yerdədirsə yer. Ovuc. Nəfəslə onları da duya bilərsən. Məcburi deyil.

Alış. Gözləmə. Veriş. Gözləmə. Boşluq varsa boşluq. Doldurma.

İki nəfəs.

Hava bitməsin deyə yarışma. Havanı idarə etmirsən. Ağciyərlər işini bilir. Sən tamaşaçısan, hakim deyilsən.

Bir veriş. Sonra bir də.

Çiyinlər. Qarın. Burun.

Son dörd nəfəs. Xal sayma. Bitənə qədər izlə. Alış. Veriş. Alış. Veriş. Alış. Veriş. Alış. Veriş.

Buraxılış: nəfəsi layihə etməyəcəksən. Hava gəlir. Hava çıxır. Otaq durur.`,
    `Это не лечение. Не меняй дыхание. Не управляй им. Только смотри.

Где воздух яснее. Ноздри. Верхняя губа. Перед груди. Бока рёбер. Живот. Выбери одно место. Останься там.

Вдох. Воздух приходит. Выдох. Воздух уходит. Не нужно делать его длинным. Не нужно делать его коротким. Не правь ритм.

Здесь три дыхания. Вдох. Выдох. Вдох. Выдох. Вдох. Выдох.

Если ум уходит в фразу, эта фраза тоже приходит и уходит, как дыхание. Вернись к одному выдоху. Место, где воздух кончается. Плечам не нужно ничего доказывать на этом выдохе.

Грудь может подниматься. Живот тоже. Не заставляй их соревноваться. Что есть — то есть.

Два дыхания. Только смотри.

Выдох может быть чуть длиннее. Не принуждай. Не тяни, чтобы он стал длинным. Если он длинный сам — длинный. Если нет — нет.

Внутри: я смотрю. Я не управляю.

Кончик носа. Прохлада на вдохе, чуть теплее на выдохе. Это не техника. Ощущение.

Ещё три дыхания. Если ум строит план — не иди за планом. Одного выдоха достаточно.

Шея. Челюсть. Дыханию не нужно их чинить. Они остаются. Дыхание проходит.

Если стопы на полу — пол. Ладони. Ты можешь заметить их вместе с дыханием. Это не обязательно.

Вдох. Пауза. Выдох. Пауза. Если есть промежуток — есть промежуток. Не заполняй его.

Два дыхания.

Не гонись, чтобы воздух не кончился. Ты не управляешь воздухом. Лёгкие знают работу. Ты зритель, не судья.

Один выдох. Потом ещё.

Плечи. Живот. Нос.

Последние четыре дыхания. Не считай их как очки. Смотри, пока они не закончатся. Вдох. Выдох. Вдох. Выдох. Вдох. Выдох. Вдох. Выдох.

Отпускание: ты не сделаешь из дыхания проект. Воздух приходит. Воздух уходит. Комната остаётся.`,
  ),

  'first-ground': pack(
    `Bu bir tedavi değildir. İki taban. Yer. Bu kadar.

Ayaklar yerdeyse: topuk, kemer, parmak. Çorap varsa çorap. Çıplaksa çıplak. Daha sert basmak yok. Sayı yok. Sadece basınç.

Yatıyorsan: topuklar yatakta, baldırlar, kalça, kürek kemikleri. Yer yine tutuyor. Yatak da bir yer.

Burada üç nefes. Her verişte ağırlık milim aşağı inebilir. İnmezse inmez. Yarış yok.

İçinden: tabanlarım yerde. Kanıt arama. Cümle, duyumun yanında duruyor.

Sol taban. Sağ taban. İkisini eşitlemek zorunda değilsin. Biri daha net olabilir. O yeter.

Dizler. Dizlerin ağırlığı aşağı. Kalçalar sandalyede veya yatakta. Pelvis bir kase gibi durabilir. Zorunlu bir imge değil. Sadece ağırlık.

İki nefes.

Eller. Avuçlar uylukta veya yanlarda veya göğüste. Onlar da bir yer. Parmak uçları.

Zihin “gerçek gibi değil” derse, tartışma. Tabanlara dön. Basınç. Kumaş. Isı.

Üç nefes.

Ayak bilekleri. İnce kemikler. Çorabın lastiği varsa lastik. Ayakkabı varsa ayakkabının içi. Detay küçük. Detay gerçek.

Yer seni tutuyor. Sen yeri tutmak zorunda değilsin.

Omurga dik durmak zorunda değil. Bir milim kambur olsa da yer duruyor.

İki nefes.

İçinden yine: yer tutuyor. Ben duruyorum.

Başın ağırlığı boyunda. Boyun omuzlarda. Omuzlar gövdede. Gövde kalçada. Kalça yerde. Zincir. Koparmak yok. Sadece fark.

Üç nefes. Verişte milim.

Zihin geleceğe giderse, taban. Geçmişe giderse, taban. Listeye giderse, taban.

Sol. Sağ. İkisi.

Son nefesler. Dört tane. Saymayı skora çevirme. Alış veriş, alış veriş, alış veriş, alış veriş.

Ayaklar. Yer. Oda.

Bırakış: yeri bir sınav haline getirmeyeceksin. Tabanlar duruyor. Yer duruyor. Sen de.`,
    `This is not a treatment. Two soles. The ground. That is all.

If the feet are on the floor: heel, arch, toes. If there are socks, socks. If bare, bare. No pressing harder. No counting. Only pressure.

If you are lying down: heels in the bed, calves, hips, shoulder blades. The ground is still holding. A bed is also ground.

Stay for three breaths. On each exhale the weight may drop a millimetre. If it does not, it does not. No race.

Inside: my soles are on the floor. Do not look for proof. The sentence stands next to the sensation.

Left sole. Right sole. You do not have to make them equal. One may be clearer. That is enough.

Knees. The weight of the knees downward. Hips in the chair or the bed. The pelvis may sit like a bowl. Not a required image. Only weight.

Two breaths.

Hands. Palms on the thighs or at the sides or on the chest. They are also a place. Fingertips.

If the mind says it does not feel real, do not argue. Return to the soles. Pressure. Cloth. Heat.

Three breaths.

Ankles. Thin bones. If there is an elastic of a sock, the elastic. If there are shoes, the inside of the shoe. The detail is small. The detail is actual.

The ground holds you. You do not have to hold the ground.

The spine does not have to sit upright. A millimetre of curve, and the ground still stays.

Two breaths.

Inside again: the ground holds. I stay.

The weight of the head in the neck. The neck in the shoulders. The shoulders in the torso. The torso in the hips. The hips on the ground. A chain. Do not break it. Only notice.

Three breaths. A millimetre on the exhale.

If the mind goes to the future, the soles. If it goes to the past, the soles. If it goes to a list, the soles.

Left. Right. Both.

Last breaths. Four. Do not turn the count into a score. In out, in out, in out, in out.

Feet. Ground. Room.

Release: you will not turn the ground into an exam. The soles stay. The ground stays. So do you.`,
    `Esto no es un tratamiento. Dos plantas. El suelo. Eso es todo.

Si los pies están en el suelo: talón, arco, dedos. Si hay calcetines, calcetines. Si estás descalza, descalza. No aprietes más. No cuentes. Solo la presión.

Si estás tumbada: talones en la cama, pantorrillas, caderas, omóplatos. El suelo sigue sosteniendo. Una cama también es suelo.

Quédate tres respiraciones. En cada exhalación el peso puede bajar un milímetro. Si no baja, no baja. Sin carrera.

Por dentro: mis plantas están en el suelo. No busques una prueba. La frase está junto a la sensación.

Planta izquierda. Planta derecha. No tienes que igualarlas. Una puede ser más clara. Basta.

Rodillas. El peso de las rodillas hacia abajo. Caderas en la silla o en la cama. La pelvis puede quedar como un cuenco. No es una imagen obligatoria. Solo peso.

Dos respiraciones.

Manos. Palmas en los muslos o a los lados o en el pecho. También son un sitio. Yemas.

Si la mente dice que no se siente real, no discutas. Vuelve a las plantas. Presión. Tela. Calor.

Tres respiraciones.

Tobillos. Huesos finos. Si hay el elástico de un calcetín, el elástico. Si hay zapatos, el interior del zapato. El detalle es pequeño. El detalle es real.

El suelo te sostiene. Tú no tienes que sostener el suelo.

La columna no tiene que estar erguida. Un milímetro de curva, y el suelo sigue.

Dos respiraciones.

Por dentro otra vez: el suelo sostiene. Yo me quedo.

El peso de la cabeza en el cuello. El cuello en los hombros. Los hombros en el tronco. El tronco en las caderas. Las caderas en el suelo. Una cadena. No la rompas. Solo nota.

Tres respiraciones. Un milímetro en la exhalación.

Si la mente se va al futuro, las plantas. Si se va al pasado, las plantas. Si se va a una lista, las plantas.

Izquierda. Derecha. Las dos.

Últimas respiraciones. Cuatro. No conviertas la cuenta en un marcador. Entra sale, entra sale, entra sale, entra sale.

Pies. Suelo. Habitación.

Suelta: no vas a convertir el suelo en un examen. Las plantas siguen. El suelo sigue. Tú también.`,
    `Non è una cura. Due piante. La terra. Tutto qui.

Se i piedi sono a terra: tallone, arco, dita. Se ci sono calzini, calzini. Se sei scalza, scalza. Non premere più forte. Non contare. Solo la pressione.

Se sei sdraiata: talloni nel letto, polpacci, fianchi, scapole. La terra tiene ancora. Un letto è anche terra.

Resta tre respiri. A ogni espirazione il peso può scendere di un millimetro. Se non scende, non scende. Niente gara.

Dentro: le piante sono a terra. Non cercare una prova. La frase sta accanto alla sensazione.

Pianta sinistra. Pianta destra. Non devi renderle uguali. Una può essere più chiara. Basta.

Ginocchia. Il peso delle ginocchia verso il basso. Fianchi sulla sedia o sul letto. Il bacino può stare come una ciotola. Non è un’immagine obbligatoria. Solo peso.

Due respiri.

Mani. Palmi sulle cosce o ai lati o sul petto. Anche loro sono un luogo. Punte delle dita.

Se la mente dice che non sembra reale, non discutere. Torna alle piante. Pressione. Stoffa. Calore.

Tre respiri.

Caviglie. Ossa sottili. Se c’è l’elastico del calzino, l’elastico. Se ci sono scarpe, l’interno della scarpa. Il dettaglio è piccolo. Il dettaglio è vero.

La terra ti tiene. Tu non devi tenere la terra.

La schiena non deve stare dritta. Un millimetro di curva, e la terra resta.

Due respiri.

Dentro di nuovo: la terra tiene. Io resto.

Il peso della testa nel collo. Il collo nelle spalle. Le spalle nel busto. Il busto nei fianchi. I fianchi a terra. Una catena. Non spezzarla. Nota soltanto.

Tre respiri. Un millimetro sull’espirazione.

Se la mente va al futuro, le piante. Se va al passato, le piante. Se va a una lista, le piante.

Sinistra. Destra. Tutte e due.

Ultimi respiri. Quattro. Non fare del conto un punteggio. Entra esce, entra esce, entra esce, entra esce.

Piedi. Terra. Stanza.

Rilascio: non farai della terra un esame. Le piante restano. La terra resta. Anche tu.`,
    `Bu müalicə deyil. İki ayaq altı. Yer. Bu qədər.

Ayaqlar yerdədirsə: daban, tağ, barmaq. Corab varsa corab. Çılpaqdırsa çılpaq. Daha bərk basmaq yoxdur. Say yoxdur. Yalnız təzyiq.

Uzanırsansa: dabanlar çarpayıda, baldırlar, omba, kürək sümükləri. Yer yenə tutur. Çarpayı da bir yerdir.

Burada üç nəfəs. Hər verişdə ağırlıq milim aşağı enə bilər. Enməsə enməz. Yarış yoxdur.

İçindən: ayaq altım yerdədir. Sübut axtarma. Cümlə duyumun yanında durur.

Sol ayaq altı. Sağ ayaq altı. Onları bərabər etmək məcburiyyətində deyilsən. Biri daha aydın ola bilər. O bəsdir.

Dizlər. Dizlərin ağırlığı aşağı. Omba stulda və ya çarpayıda. Çanaq bir kasa kimi dura bilər. Məcburi bir şəkil deyil. Yalnız ağırlıq.

İki nəfəs.

Əllər. Ovuc budda və ya yanlarda və ya sinədə. Onlar da bir yerdir. Barmaq ucları.

Ağıl “real kimi deyil” desə, mübahisə etmə. Ayaq altına qayıt. Təzyiq. Parça. İstilik.

Üç nəfəs.

Biləklər. İncə sümüklər. Corabın rezinı varsa rezin. Ayaqqabı varsa ayaqqabının içi. Detal kiçikdir. Detal gerçəkdir.

Yer səni tutur. Sən yeri tutmaq məcburiyyətində deyilsən.

Onurğa dik durmaq məcburiyyətində deyil. Bir milim əyri olsa da yer durur.

İki nəfəs.

İçindən yenə: yer tutur. Mən dururam.

Başın ağırlığı boyunda. Boyun çiyində. Çiyin gövdədə. Gövdə ombada. Omba yerdə. Zəncir. Qırma. Yalnız duy.

Üç nəfəs. Verişdə milim.

Ağıl gələcəyə getsə, ayaq altı. Keçmişə getsə, ayaq altı. Siyahıya getsə, ayaq altı.

Sol. Sağ. İkisi.

Son nəfəslər. Dörd. Sayımı xala çevirmə. Alış veriş, alış veriş, alış veriş, alış veriş.

Ayaqlar. Yer. Otaq.

Buraxılış: yeri imtahan etməyəcəksən. Ayaq altı durur. Yer durur. Sən də.`,
    `Это не лечение. Две стопы. Земля. Вот и всё.

Если стопы на полу: пятка, свод, пальцы. Если есть носки — носки. Если босиком — босиком. Не дави сильнее. Не считай. Только давление.

Если ты лежишь: пятки в постели, икры, бёдра, лопатки. Земля всё равно держит. Кровать тоже земля.

Здесь три дыхания. На каждом выдохе вес может опуститься на миллиметр. Если не опускается — не опускается. Без гонки.

Внутри: стопы на полу. Не ищи доказательства. Предложение стоит рядом с ощущением.

Левая стопа. Правая стопа. Не нужно их уравнивать. Одна может быть яснее. Этого достаточно.

Колени. Вес коленей вниз. Бёдра в стуле или в постели. Таз может сидеть как чаша. Не обязательный образ. Только вес.

Два дыхания.

Руки. Ладони на бёдрах, или по бокам, или на груди. Они тоже место. Кончики пальцев.

Если ум говорит, что это не как настоящее — не спорь. Вернись к стопам. Давление. Ткань. Тепло.

Три дыхания.

Лодыжки. Тонкие кости. Если есть резинка носка — резинка. Если есть обувь — внутренняя сторона обуви. Деталь маленькая. Деталь настоящая.

Земля держит тебя. Тебе не нужно держать землю.

Позвоночнику не нужно сидеть прямо. Миллиметр изгиба — и земля всё равно остаётся.

Два дыхания.

Внутри снова: земля держит. Я остаюсь.

Вес головы в шее. Шея в плечах. Плечи в туловище. Туловище в бёдрах. Бёдра на земле. Цепь. Не рви её. Только заметь.

Три дыхания. Миллиметр на выдохе.

Если ум уходит в будущее — стопы. В прошлое — стопы. В список — стопы.

Левая. Правая. Обе.

Последние дыхания. Четыре. Не превращай счёт в очки. Вдох выдох, вдох выдох, вдох выдох, вдох выдох.

Стопы. Земля. Комната.

Отпускание: ты не сделаешь из земли экзамен. Стопы остаются. Земля остаётся. И ты тоже.`,
  ),

  'room-door': pack(
    `Bu bir tedavi değildir. Bildiğin bir oda. İcat yok. Film seti yok.

Kapıyı içinden gör. Dört kenar. Üst eşik. Alt eşik. Menteşe tarafı. Kol tarafı. Renk varsa renk. Yoksa sadece dikdörtgen yeter.

Burada üç nefes.

Pencere. Cam. Perde varsa perde. Işık içeri giriyorsa giriyor. Girmiyorsa oda yine oda.

Yerin cinsi. Parke, halı, fayans, beton. Çıplak ayak veya çorap. Bir isim.

Üç nesne. Birincisi. Adını içinden söyle. İkincisi. Üçüncüsü. Sıfat gerekmez. “Güzel” yok. Sadece ad.

İki nefes.

Kapı yerinde. Sen yerindesin. Odayı dekore etmeyeceksin. Nesneleri düzeltmeyeceksin.

Zihin başka bir oda uydurursa, bu odaya dön. Bu kapı. Bu kenar.

Tavan. Dört köşe. Lamba varsa lamba. Kapalıysa kapalı.

Üç nefes.

Kulak. Odadaki bir ses. Buzdolabı, sokak, kendi nefesin. Ses bir kenar da olabilir.

İçinden: bu oda. Bu kapı.

Eller. Avuç. Sonra yine kapının dikdörtgeni.

İki nefes.

Eşik. Geçmek zorunda değilsin. Kapı açık olsa da, kapalı olsa da, sen odadasın.

Son dört nefes. Kapı. Pencere. Yer. Sen.

Bırakış: odayı bir kanıt haline getirmeyeceksin. Kapı duruyor. Sen duruyorsun.`,
    `This is not a treatment. A room you know. No invention. No film set.

See the door from the inside. Four edges. The top of the frame. The sill. The hinge side. The handle side. If there is a colour, the colour. If not, the rectangle is enough.

Stay for three breaths.

The window. Glass. If there is a curtain, the curtain. If light is coming in, it is coming in. If not, the room is still the room.

The kind of floor. Wood, rug, tile, concrete. Bare feet or socks. One name.

Three objects. The first. Say the name inside. The second. The third. No adjective needed. No “nice”. Only the name.

Two breaths.

The door is in place. You are in place. You will not redecorate. You will not tidy the objects.

If the mind invents another room, return to this one. This door. This edge.

The ceiling. Four corners. If there is a lamp, the lamp. If it is off, it is off.

Three breaths.

The ear. One sound in the room. A fridge, a street, your own breath. A sound can also be an edge.

Inside: this room. This door.

Hands. Palms. Then the rectangle of the door again.

Two breaths.

The threshold. You do not have to cross it. Whether the door is open or closed, you are in the room.

Last four breaths. Door. Window. Floor. You.

Release: you will not turn the room into a proof. The door stays. You stay.`,
    `Esto no es un tratamiento. Una habitación que conoces. Sin inventar. Sin plató.

Mira la puerta desde dentro. Cuatro bordes. El dintel. El umbral. El lado de los goznes. El lado del pomo. Si hay un color, el color. Si no, el rectángulo basta.

Quédate tres respiraciones.

La ventana. El cristal. Si hay cortina, la cortina. Si entra luz, entra. Si no, la habitación sigue.

El tipo de suelo. Madera, alfombra, baldosa, cemento. Pies descalzos o calcetines. Un nombre.

Tres objetos. El primero. Di el nombre por dentro. El segundo. El tercero. No hace falta un adjetivo. Nada de “bonito”. Solo el nombre.

Dos respiraciones.

La puerta está. Tú estás. No vas a redecorar. No vas a ordenar los objetos.

Si la mente inventa otra habitación, vuelve a esta. Esta puerta. Este borde.

El techo. Cuatro esquinas. Si hay lámpara, la lámpara. Si está apagada, está apagada.

Tres respiraciones.

El oído. Un sonido en la habitación. La nevera, la calle, tu propio aliento. Un sonido también puede ser un borde.

Por dentro: esta habitación. Esta puerta.

Manos. Palmas. Luego otra vez el rectángulo de la puerta.

Dos respiraciones.

El umbral. No tienes que cruzarlo. La puerta esté abierta o cerrada, estás en la habitación.

Últimas cuatro respiraciones. Puerta. Ventana. Suelo. Tú.

Suelta: no vas a convertir la habitación en una prueba. La puerta sigue. Tú sigues.`,
    `Non è una cura. Una stanza che conosci. Niente invenzione. Niente set.

Vedi la porta da dentro. Quattro bordi. L’architrave. La soglia. Il lato dei cardini. Il lato della maniglia. Se c’è un colore, il colore. Se no, il rettangolo basta.

Resta tre respiri.

La finestra. Il vetro. Se c’è una tenda, la tenda. Se entra luce, entra. Se no, la stanza resta.

Il tipo di pavimento. Legno, tappeto, piastrella, cemento. Piedi nudi o calzini. Un nome.

Tre oggetti. Il primo. Dì il nome dentro. Il secondo. Il terzo. Non serve un aggettivo. Niente “bello”. Solo il nome.

Due respiri.

La porta c’è. Tu ci sei. Non arredi di nuovo. Non riordini gli oggetti.

Se la mente inventa un’altra stanza, torna a questa. Questa porta. Questo bordo.

Il soffitto. Quattro angoli. Se c’è una lampada, la lampada. Se è spenta, è spenta.

Tre respiri.

L’orecchio. Un suono nella stanza. Il frigo, la strada, il tuo respiro. Un suono può essere anche un bordo.

Dentro: questa stanza. Questa porta.

Mani. Palmi. Poi di nuovo il rettangolo della porta.

Due respiri.

La soglia. Non devi attraversarla. La porta sia aperta o chiusa, sei nella stanza.

Ultimi quattro respiri. Porta. Finestra. Pavimento. Tu.

Rilascio: non farai della stanza una prova. La porta resta. Tu resti.`,
    `Bu müalicə deyil. Bildiyin otaq. Uydurma yox. Film meydançası yox.

Qapını içindən gör. Dörd kənar. Üst eşik. Alt eşik. Mentə şərəfi. Dəstək tərəfi. Rəng varsa rəng. Yoxdursa düzbucaqlı bəsdir.

Burada üç nəfəs.

Pəncərə. Şüşə. Pərdə varsa pərdə. İşıq girirsə girir. Girmirsə otaq yenə otaqdır.

Döşəmənin cinsi. Parket, xalça, kafel, beton. Çılpaq ayaq və ya corab. Bir ad.

Üç əşya. Birincisi. Adını içindən de. İkincisi. Üçüncüsü. Sifət lazım deyil. “Gözəl” yox. Yalnız ad.

İki nəfəs.

Qapı yerindədir. Sən yerindəsən. Otağı yenidən bəzəməyəcəksən. Əşyaları düzəltməyəcəksən.

Ağıl başqa otaq uydurarsa bu otağa qayıt. Bu qapı. Bu kənar.

Tavan. Dörd künc. Lampa varsa lampa. Sönüdürsə sönüdür.

Üç nəfəs.

Qulaq. Otaqdakı bir səs. Soyuducu, küçə, öz nəfəsin. Səs də bir kənar ola bilər.

İçindən: bu otaq. Bu qapı.

Əllər. Ovuc. Sonra yenə qapının düzbucaqlısı.

İki nəfəs.

Eşik. Keçmək məcburiyyətində deyilsən. Qapı açıq olsa da, bağlı olsa da, sən otaqdasan.

Son dörd nəfəs. Qapı. Pəncərə. Yer. Sən.

Buraxılış: otağı sübut etməyəcəksən. Qapı durur. Sən durursan.`,
    `Это не лечение. Комната, которую ты знаешь. Без выдумки. Без съёмочной площадки.

Увидь дверь изнутри. Четыре края. Верхняя перекладина. Порог. Сторона петель. Сторона ручки. Если есть цвет — цвет. Если нет — прямоугольника достаточно.

Здесь три дыхания.

Окно. Стекло. Если есть занавеска — занавеска. Если свет входит — входит. Если нет — комната всё равно комната.

Род пола. Паркет, ковёр, плитка, бетон. Босые ноги или носки. Одно имя.

Три предмета. Первый. Скажи имя внутри. Второй. Третий. Прилагательное не нужно. Никакого «красиво». Только имя.

Два дыхания.

Дверь на месте. Ты на месте. Ты не будешь заново обставлять. Ты не будешь поправлять вещи.

Если ум выдумывает другую комнату — вернись в эту. Эта дверь. Этот край.

Потолок. Четыре угла. Если есть лампа — лампа. Если она выключена — выключена.

Три дыхания.

Ухо. Один звук в комнате. Холодильник, улица, твоё дыхание. Звук тоже может быть краем.

Внутри: эта комната. Эта дверь.

Руки. Ладони. Потом снова прямоугольник двери.

Два дыхания.

Порог. Тебе не нужно его переступать. Открыта дверь или закрыта — ты в комнате.

Последние четыре дыхания. Дверь. Окно. Пол. Ты.

Отпускание: ты не сделаешь из комнаты доказательство. Дверь остаётся. Ты остаёшься.`,
  ),

  'room-light': pack(
    `Bu bir tedavi değildir. Gözler yumuşak. Kısık veya kapalı. Işığı keskinleştirme.

Işık nereden geliyor. Pencere. Lamba. Koridor. Telefonun kenarı. Bir kaynak yeter.

Gölge nereye düşüyor. Yere. Duvara. Elinin sırtına. Bir kenar yeter.

Burada üç nefes.

Sis yorumunu büyütme. “Gerçek değil gibi” cümlesini uzatma. Işık bir yerden geliyor. Netleşmezse de ışık duruyor.

Bir nesnenin kenarı. Masa. Kapı pervazı. Perde kıvrımı. Çiz. İçinden. Cetvel yok. Yaklaşık yeter.

İki nefes.

Göz kapaklarının içindeki ışık. Kırmızımsı veya koyu. Zorunlu bir renk yok. Sadece parlaklık farkı.

Alın. Kaşlar. Işık onları düzeltmek zorunda değil.

Üç nefes.

Pencere camı. Toz varsa toz. Damla varsa damla. Temizlemek yok. Görmek var.

İçinden: ışık duruyor.

Gölge hareket ediyorsa hareket. Etmiyorsa duruyor. İkisini yönetmeyeceksin.

İki nefes.

Odanın en koyu köşesi. En açık yeri. İkisini de adlandır. Yarış yok.

Eller. Işık avuçta nasıl. Serin cam gibi değilse değil. Isı varsa ısı.

Üç nefes.

Zihin sahneyi keskinleştirirse, yumuşak göze dön. Kenar yeter. Fotoğraf değil.

Son dört nefes. Kaynak. Gölge. Kenar. Sen.

Bırakış: ışığı bir test haline getirmeyeceksin. Işık duruyor. Gölge duruyor.`,
    `This is not a treatment. Soft eyes. Half-closed or closed. Do not sharpen the light.

Where the light is coming from. Window. Lamp. Hallway. The edge of a phone. One source is enough.

Where the shadow falls. On the floor. On the wall. On the back of a hand. One edge is enough.

Stay for three breaths.

Do not grow the fog commentary. Do not stretch the sentence “it does not feel real”. Light is coming from somewhere. Even if it does not snap into focus, the light stays.

The edge of one object. A table. A door frame. A fold of curtain. Draw it. Inside. No ruler. Approximate is enough.

Two breaths.

The light inside the eyelids. Reddish or dark. No required colour. Only a difference in brightness.

Forehead. Brows. The light does not have to fix them.

Three breaths.

The window glass. If there is dust, dust. If there is a drop, a drop. No cleaning. Only seeing.

Inside: the light stays.

If the shadow moves, it moves. If it does not, it stays. You will not manage either.

Two breaths.

The darkest corner of the room. The brightest place. Name both. No race.

Hands. How the light is in the palm. If it is not like cool glass, it is not. If there is heat, heat.

Three breaths.

If the mind sharpens the scene into a photograph, return to soft eyes. An edge is enough. Not a photo.

Last four breaths. Source. Shadow. Edge. You.

Release: you will not turn the light into a test. The light stays. The shadow stays.`,
    `Esto no es un tratamiento. Ojos suaves. Entornados o cerrados. No nítidez en la luz.

De dónde viene la luz. Ventana. Lámpara. Pasillo. El borde de un teléfono. Una fuente basta.

Dónde cae la sombra. En el suelo. En la pared. En el dorso de una mano. Un borde basta.

Quédate tres respiraciones.

No agrandes el comentario de la niebla. No alargues la frase “no se siente real”. La luz viene de algún sitio. Aunque no enfoque, la luz sigue.

El borde de un objeto. Una mesa. El marco de una puerta. Un pliegue de cortina. Dibuja. Por dentro. Sin regla. Lo aproximado basta.

Dos respiraciones.

La luz dentro de los párpados. Rojiza o oscura. No hay un color obligatorio. Solo una diferencia de brillo.

Frente. Cejas. La luz no tiene que arreglarlas.

Tres respiraciones.

El cristal de la ventana. Si hay polvo, polvo. Si hay una gota, una gota. No limpiar. Solo ver.

Por dentro: la luz sigue.

Si la sombra se mueve, se mueve. Si no, está. No vas a gestionar ninguna de las dos.

Dos respiraciones.

El rincón más oscuro de la habitación. El sitio más claro. Nombra los dos. Sin carrera.

Manos. Cómo está la luz en la palma. Si no es como cristal fresco, no lo es. Si hay calor, calor.

Tres respiraciones.

Si la mente convierte la escena en una foto nítida, vuelve a los ojos suaves. Un borde basta. No es una foto.

Últimas cuatro respiraciones. Fuente. Sombra. Borde. Tú.

Suelta: no vas a convertir la luz en un examen. La luz sigue. La sombra sigue.`,
    `Non è una cura. Occhi morbidi. Socchiusi o chiusi. Non mettere a fuoco la luce.

Da dove arriva la luce. Finestra. Lampada. Corridoio. Il bordo di un telefono. Una fonte basta.

Dove cade l’ombra. Sul pavimento. Sul muro. Sul dorso di una mano. Un bordo basta.

Resta tre respiri.

Non ingrandire il commento della nebbia. Non allungare la frase “non sembra reale”. La luce arriva da qualche parte. Anche se non mette a fuoco, la luce resta.

Il bordo di un oggetto. Un tavolo. Lo stipite. Una piega di tenda. Traccia. Dentro. Senza riga. L’approssimato basta.

Due respiri.

La luce dentro le palpebre. Rossastra o scura. Nessun colore obbligatorio. Solo una differenza di luminosità.

Fronte. Sopracciglia. La luce non deve aggiustarle.

Tre respiri.

Il vetro della finestra. Se c’è polvere, polvere. Se c’è una goccia, una goccia. Non pulire. Solo vedere.

Dentro: la luce resta.

Se l’ombra si muove, si muove. Se no, resta. Non gestirai né l’una né l’altra.

Due respiri.

L’angolo più scuro della stanza. Il punto più chiaro. Nomina entrambi. Niente gara.

Mani. Com’è la luce nel palmo. Se non è come vetro fresco, non lo è. Se c’è calore, calore.

Tre respiri.

Se la mente affila la scena in una fotografia, torna agli occhi morbidi. Un bordo basta. Non è una foto.

Ultimi quattro respiri. Fonte. Ombra. Bordo. Tu.

Rilascio: non farai della luce un esame. La luce resta. L’ombra resta.`,
    `Bu müalicə deyil. Gözlər yumşaq. Yarıbağlı və ya bağlı. İşığı itiləmə.

İşıq haradandır. Pəncərə. Lampa. Dəhliz. Telefonun kənarı. Bir mənbə bəsdir.

Kölgə hara düşür. Yerə. Divara. Əlin üstünə. Bir kənar bəsdir.

Burada üç nəfəs.

Sis şərhini böyütmə. “Real kimi deyil” cümləsini uzatma. İşıq bir yerdən gəlir. Netləşməsə də işıq durur.

Bir əşyanın kənarı. Masa. Qapı çərçivəsi. Pərdə qatı. Çək. İçindən. Xətkeş yox. Təxmini bəsdir.

İki nəfəs.

Göz qapaqlarının içindəki işıq. Qırmızımtıl və ya tünd. Məcburi rəng yoxdur. Yalnız parlaqlıq fərqi.

Alın. Qaşlar. İşıq onları düzəltmək məcburiyyətində deyil.

Üç nəfəs.

Pəncərə şüşəsi. Toz varsa toz. Damcı varsa damcı. Təmizləmək yox. Görmək var.

İçindən: işıq durur.

Kölgə hərəkət edirsə hərəkət. Etmirsə durur. İkisini idarə etməyəcəksən.

İki nəfəs.

Otağın ən tünd küncü. Ən açıq yeri. İkisini də adlandır. Yarış yoxdur.

Əllər. İşıq ovucda necə. Sərin şüşə kimi deyilsə deyil. İstilik varsa istilik.

Üç nəfəs.

Ağıl səhnəni fotoşəkil kimi itiləsə, yumşaq gözə qayıt. Kənar bəsdir. Foto deyil.

Son dörd nəfəs. Mənbə. Kölgə. Kənar. Sən.

Buraxılış: işığı imtahan etməyəcəksən. İşıq durur. Kölgə durur.`,
    `Это не лечение. Мягкие глаза. Полузакрытые или закрытые. Не заостряй свет.

Откуда свет. Окно. Лампа. Коридор. Край телефона. Одного источника достаточно.

Куда падает тень. На пол. На стену. На тыльную сторону руки. Одного края достаточно.

Здесь три дыхания.

Не раздувай комментарий про туман. Не растягивай фразу «как будто не настоящее». Свет идёт откуда-то. Даже если не становится резким — свет остаётся.

Край одного предмета. Стол. Косяк двери. Складка шторы. Нарисуй. Внутри. Без линейки. Приблизительно достаточно.

Два дыхания.

Свет внутри век. Красноватый или тёмный. Нужного цвета нет. Только разница в яркости.

Лоб. Брови. Свету не нужно их чинить.

Три дыхания.

Стекло окна. Если есть пыль — пыль. Если есть капля — капля. Не чистить. Только видеть.

Внутри: свет остаётся.

Если тень движется — движется. Если нет — стоит. Ты не будешь управлять ни тем ни другим.

Два дыхания.

Самый тёмный угол комнаты. Самое светлое место. Назови оба. Без гонки.

Руки. Каков свет на ладони. Если это не как прохладное стекло — не как. Если есть тепло — тепло.

Три дыхания.

Если ум заостряет сцену в фотографию — вернись к мягким глазам. Края достаточно. Это не фото.

Последние четыре дыхания. Источник. Тень. Край. Ты.

Отпускание: ты не сделаешь из света экзамен. Свет остаётся. Тень остаётся.`,
  ),

  'room-hands': pack(
    `Bu bir tedavi değildir. Ayna yok. İki el. Bir bilek.

Elleri gör veya içinden çiz. On parmak. Tırnaklar. Çizgiler. Yüzük varsa yüzük. Saat varsa saat.

Burada üç nefes.

Bir bileği diğer elin parmaklarıyla tut. Sıkma. Sadece temas. Nabız varsa nabız. Yoksa ısı yeter. Sayma. Kanıt yapma.

İçinden adını fısılda. Bir kez. Sahne değil.

İki nefes.

Avuç içleri. Birbirine bakıyor olabilir, uylukta olabilir. Isı. Ter varsa ter. Kuruysa kuru.

Parmak uçları. Birbirine değdir, ayır. Değme gerçek. Ayırma gerçek.

Üç nefes.

Nabzı hikâye etme. Hızlıysa hızlı. Yavaşsa yavaş. Yorum yok.

Eller sende. Bu bir slogan değil. Avuç, parmak, bilek.

İki nefes.

Başparmak. İşaret. Orta. Yüzük. Serçe. İsimler. Sıra bir performans değil.

Zihin “ben değilmişim gibi” derse, tartışma. Avuca dön. Isı.

Üç nefes.

Bilekteki kumaş veya deri. Saat kayışı. Kolun kıvrımı. Küçük veri.

Son dört nefes. El. Bilek. Isı. Ad.

Bırakış: nabzı bir kanıt haline getirmeyeceksin. Eller duruyor. Sen duruyorsun.`,
    `This is not a treatment. No mirror. Two hands. One wrist.

See the hands, or draw them inside. Ten fingers. Nails. Lines. If there is a ring, the ring. If there is a watch, the watch.

Stay for three breaths.

Hold one wrist with the fingers of the other hand. Do not squeeze. Only contact. If there is a pulse, a pulse. If not, heat is enough. Do not count. Do not make it a proof.

Whisper your name inside. Once. Not a scene.

Two breaths.

The palms. They may face each other, or rest on the thighs. Heat. If there is sweat, sweat. If dry, dry.

Fingertips. Touch them together, part them. The touch is actual. The parting is actual.

Three breaths.

Do not make a story of the pulse. If it is fast, it is fast. If slow, slow. No commentary.

The hands are yours. This is not a slogan. Palm, finger, wrist.

Two breaths.

Thumb. Index. Middle. Ring. Little. Names. The order is not a performance.

If the mind says “as if these were not mine”, do not argue. Return to the palm. Heat.

Three breaths.

Cloth or skin at the wrist. A watch strap. The crease of the arm. Small data.

Last four breaths. Hand. Wrist. Heat. Name.

Release: you will not turn the pulse into a proof. The hands stay. You stay.`,
    `Esto no es un tratamiento. Sin espejo. Dos manos. Una muñeca.

Mira las manos, o dibújalas por dentro. Diez dedos. Uñas. Líneas. Si hay un anillo, el anillo. Si hay un reloj, el reloj.

Quédate tres respiraciones.

Sostén una muñeca con los dedos de la otra mano. No aprietes. Solo contacto. Si hay pulso, pulso. Si no, el calor basta. No cuentes. No lo hagas prueba.

Susurra tu nombre por dentro. Una vez. No es una escena.

Dos respiraciones.

Las palmas. Pueden mirarse, o estar en los muslos. Calor. Si hay sudor, sudor. Si están secas, secas.

Yemas. Júntalas, sepáralas. El contacto es real. La separación es real.

Tres respiraciones.

No hagas una historia del pulso. Si es rápido, es rápido. Si lento, lento. Sin comentario.

Las manos son tuyas. Esto no es un lema. Palma, dedo, muñeca.

Dos respiraciones.

Pulgar. Índice. Medio. Anular. Meñique. Nombres. El orden no es una actuación.

Si la mente dice “como si no fueran mías”, no discutas. Vuelve a la palma. Calor.

Tres respiraciones.

Tela o piel en la muñeca. La correa. El pliegue del brazo. Dato pequeño.

Últimas cuatro respiraciones. Mano. Muñeca. Calor. Nombre.

Suelta: no vas a convertir el pulso en una prueba. Las manos siguen. Tú sigues.`,
    `Non è una cura. Niente specchio. Due mani. Un polso.

Vedi le mani, o tracciale dentro. Dieci dita. Unghie. Linee. Se c’è un anello, l’anello. Se c’è un orologio, l’orologio.

Resta tre respiri.

Tieni un polso con le dita dell’altra mano. Non stringere. Solo contatto. Se c’è un battito, un battito. Se no, il calore basta. Non contare. Non farne una prova.

Sussurra il tuo nome dentro. Una volta. Non è una scena.

Due respiri.

I palmi. Possono guardarsi, o stare sulle cosce. Calore. Se c’è sudore, sudore. Se sono asciutti, asciutti.

Punte. Uniscile, separale. Il contatto è vero. La separazione è vera.

Tre respiri.

Non fare una storia del polso. Se è veloce, è veloce. Se lento, lento. Niente commento.

Le mani sono tue. Non è uno slogan. Palmo, dito, polso.

Due respiri.

Pollice. Indice. Medio. Anulare. Mignolo. Nomi. L’ordine non è una recita.

Se la mente dice “come se non fossero mie”, non discutere. Torna al palmo. Calore.

Tre respiri.

Stoffa o pelle al polso. Il cinturino. La piega del braccio. Dato piccolo.

Ultimi quattro respiri. Mano. Polso. Calore. Nome.

Rilascio: non farai del polso una prova. Le mani restano. Tu resti.`,
    `Bu müalicə deyil. Güzgü yox. İki əl. Bir bilək.

Əlləri gör və ya içindən çək. On barmaq. Dırnaqlar. Xətlər. Üzük varsa üzük. Saat varsa saat.

Burada üç nəfəs.

Bir biləyi o biri əlin barmaqları ilə tut. Sıxma. Yalnız toxunuş. Nəbz varsa nəbz. Yoxdursa istilik bəsdir. Sayma. Sübut etmə.

Adını içindən pıçılda. Bir dəfə. Səhnə deyil.

İki nəfəs.

Ovuc içi. Bir-birinə baxa bilər, budda ola bilər. İstilik. Tər varsa tər. Qurudursa quru.

Barmaq ucları. Dəydir, ayır. Dəymə gerçəkdir. Ayırma gerçəkdir.

Üç nəfəs.

Nəbzi hekayə etmə. Tezdirsə tezdir. Yavaşdırsa yavaş. Şərh yox.

Əllər səndədir. Bu şüar deyil. Ovuc, barmaq, bilək.

İki nəfəs.

Baş barmaq. Şəhadət. Orta. Adsız. Çeçələ. Adlar. Sıra tamaşa deyil.

Ağıl “mənimki deyilmiş kimi” desə, mübahisə etmə. Ovuca qayıt. İstilik.

Üç nəfəs.

Biləkdə parça və ya dəri. Saat qayışı. Qolun qatı. Kiçik verilən.

Son dörd nəfəs. Əl. Bilək. İstilik. Ad.

Buraxılış: nəbzi sübut etməyəcəksən. Əllər durur. Sən durursan.`,
    `Это не лечение. Без зеркала. Две руки. Одно запястье.

Увидь руки или нарисуй их внутри. Десять пальцев. Ногти. Линии. Если есть кольцо — кольцо. Если есть часы — часы.

Здесь три дыхания.

Возьми одно запястье пальцами другой руки. Не сжимай. Только касание. Если есть пульс — пульс. Если нет — тепла достаточно. Не считай. Не делай доказательством.

Шепни своё имя внутри. Один раз. Не сцена.

Два дыхания.

Ладони. Могут смотреть друг на друга или лежать на бёдрах. Тепло. Если есть пот — пот. Если сухо — сухо.

Кончики пальцев. Соедини, разведи. Касание настоящее. Разведение настоящее.

Три дыхания.

Не делай из пульса историю. Если быстрый — быстрый. Если медленный — медленный. Без комментария.

Руки твои. Это не лозунг. Ладонь, палец, запястье.

Два дыхания.

Большой. Указательный. Средний. Безымянный. Мизинец. Имена. Порядок не представление.

Если ум говорит «как будто не мои» — не спорь. Вернись к ладони. Тепло.

Три дыхания.

Ткань или кожа на запястье. Ремешок. Складка руки. Маленькие данные.

Последние четыре дыхания. Рука. Запястье. Тепло. Имя.

Отпускание: ты не сделаешь из пульса доказательство. Руки остаются. Ты остаёшься.`,
  ),

  'shore-edge': pack(
    `Bu bir tedavi değildir. İskele veya taş. Su varsa su. Yoksa ritmik bir ses yeter. Bir radyatör, bir fan, uzak bir yol.

Kenarda oturuyorsun. Dalga gelir. Kenar kalır. Sen kenardasın. Dalgayı yönetmeyeceksin.

Burada üç nefes.

Veriş uzun olabilir. Zorlama. Su çekiliyorsa çekiliyor. Sen çekilmek zorunda değilsin.

Ayaklar. Taşın soğuğu veya tahtanın oyu. Avuç, eğer bir kenara dayanıyorsa.

İki nefes.

İçinden: kenardayım. İçeri düşmek yok. Kahramanlık yok. Sadece oturuş.

Uzakta bir kuş veya motor. Onu sahnenin parçası yap. Kapatma.

Üç nefes.

Su varsa renk. Gri, yeşil, koyu. İsim yeter. Şiir yok.

Göğüs. Nefes. Dalga ile yarıştırma. İki ritim durabilir.

İki nefes.

Zihin açık denize giderse, kenara dön. Taş. Tahta. Oturduğun yer.

Son dört nefes. Gelir. Kalır. Sen kalırsın.

Bırakış: dalgayı bir metafor haline getirmeyeceksin. Kenar duruyor.`,
    `This is not a treatment. A pier or a stone. If there is water, water. If not, a rhythmic sound is enough. A radiator, a fan, a distant road.

You sit at the edge. The wave comes. The edge stays. You are at the edge. You will not manage the wave.

Stay for three breaths.

The exhale may be long. No force. If the water pulls back, it pulls back. You do not have to pull back.

Feet. The cool of stone or the grain of wood. A palm, if it rests on an edge.

Two breaths.

Inside: I am at the edge. No falling in. No heroics. Only sitting.

A bird or an engine far away. Let it be part of the scene. Do not shut it out.

Three breaths.

If there is water, a colour. Grey, green, dark. A name is enough. No poem.

Chest. Breath. Do not race it with the wave. Two rhythms can stay.

Two breaths.

If the mind goes out to open sea, return to the edge. Stone. Wood. The place you sit.

Last four breaths. It comes. It stays. You stay.

Release: you will not turn the wave into a metaphor. The edge stays.`,
    `Esto no es un tratamiento. Un muelle o una piedra. Si hay agua, agua. Si no, basta un sonido rítmico. Un radiador, un ventilador, una carretera lejana.

Estás sentada al borde. La ola llega. El borde queda. Tú estás al borde. No vas a gestionar la ola.

Quédate tres respiraciones.

La exhalación puede ser larga. Sin fuerza. Si el agua se retira, se retira. Tú no tienes que retirarte.

Pies. El frío de la piedra o la veta de la madera. Una palma, si apoya en un borde.

Dos respiraciones.

Por dentro: estoy al borde. Sin caer. Sin heroicidad. Solo estar sentada.

Un pájaro o un motor a lo lejos. Que sea parte de la escena. No lo apagues.

Tres respiraciones.

Si hay agua, un color. Gris, verde, oscuro. Un nombre basta. Sin poema.

Pecho. Aliento. No lo hagas competir con la ola. Dos ritmos pueden quedar.

Dos respiraciones.

Si la mente se va a mar abierto, vuelve al borde. Piedra. Madera. El sitio donde estás.

Últimas cuatro respiraciones. Llega. Queda. Tú quedas.

Suelta: no vas a convertir la ola en una metáfora. El borde sigue.`,
    `Non è una cura. Un molo o una pietra. Se c’è acqua, acqua. Se no, basta un suono ritmico. Un termosifone, un ventilatore, una strada lontana.

Sei seduta sul bordo. L’onda arriva. Il bordo resta. Tu sei sul bordo. Non gestirai l’onda.

Resta tre respiri.

L’espirazione può essere lunga. Senza forza. Se l’acqua si ritira, si ritira. Tu non devi ritirarti.

Piedi. Il freddo della pietra o la vena del legno. Un palmo, se poggia su un bordo.

Due respiri.

Dentro: sono sul bordo. Niente caduta. Niente eroismo. Solo stare seduta.

Un uccello o un motore lontano. Che sia parte della scena. Non spegnerlo.

Tre respiri.

Se c’è acqua, un colore. Grigio, verde, scuro. Un nome basta. Niente poesia.

Petto. Respiro. Non farlo gareggiare con l’onda. Due ritmi possono restare.

Due respiri.

Se la mente va al mare aperto, torna al bordo. Pietra. Legno. Il posto dove sei.

Ultimi quattro respiri. Arriva. Resta. Tu resti.

Rilascio: non farai dell’onda una metafora. Il bordo resta.`,
    `Bu müalicə deyil. İskələ və ya daş. Su varsa su. Yoxdursa ritmik bir səs bəsdir. Radiator, fan, uzaq bir yol.

Kənarda oturursan. Dalğa gəlir. Kənar qalır. Sən kənardasan. Dalğanı idarə etməyəcəksən.

Burada üç nəfəs.

Veriş uzun ola bilər. Məcbur etmə. Su çəkilirsə çəkilir. Sən çəkilmək məcburiyyətində deyilsən.

Ayaqlar. Daşın soyuğu və ya taxtanın damarı. Ovuc, əgər bir kənara söykənirsə.

İki nəfəs.

İçindən: kənardayam. İçəri düşmək yox. Qəhrəmanlıq yox. Yalnız oturuş.

Uzaqda bir quş və ya mühərrik. Onu səhnənin parçası et. Bağlama.

Üç nəfəs.

Su varsa rəng. Boz, yaşıl, tünd. Ad bəsdir. Şeir yox.

Sinə. Nəfəs. Dalğa ilə yarışdırma. İki ritm dura bilər.

İki nəfəs.

Ağıl açıq dənizə getsə, kənara qayıt. Daş. Taxta. Oturduğun yer.

Son dörd nəfəs. Gəlir. Qalır. Sən qalırsan.

Buraxılış: dalğanı məcaza çevirməyəcəksən. Kənar durur.`,
    `Это не лечение. Пирс или камень. Если есть вода — вода. Если нет — хватит ритмичного звука. Радиатор, вентилятор, далёкая дорога.

Ты сидишь на краю. Волна приходит. Край остаётся. Ты на краю. Ты не будешь управлять волной.

Здесь три дыхания.

Выдох может быть длинным. Без силы. Если вода отступает — отступает. Тебе не нужно отступать.

Стопы. Холод камня или волокно дерева. Ладонь, если она лежит на краю.

Два дыхания.

Внутри: я на краю. Без падения внутрь. Без героизма. Только сидение.

Птица или мотор вдали. Пусть будет частью сцены. Не выключай.

Три дыхания.

Если есть вода — цвет. Серый, зелёный, тёмный. Имени достаточно. Без поэмы.

Грудь. Дыхание. Не соревнуй его с волной. Два ритма могут оставаться.

Два дыхания.

Если ум уходит в открытое море — вернись к краю. Камень. Дерево. Место, где ты сидишь.

Последние четыре дыхания. Приходит. Остаётся. Ты остаёшься.

Отпускание: ты не сделаешь из волны метафору. Край остаётся.`,
  ),

  'shore-stone': pack(
    `Bu bir tedavi değildir. Bir taş, bir anahtar, bir kupa. Avuçta bir nesne. Yoksa iki eli birleştir. Ağırlık yine ağırlık.

Kenar. Isı veya serinlik. Pürüz veya düz. Bir tane duyum seç. Orada kal.

Burada üç nefes.

Zihin hikâye uydurursa nesneye dön. Nereden geldiğini anlatma. Ne anlama geldiğini arama. Ağırlık.

İki nefes.

Parmaklar nesnenin etrafında. Sıkma. Tutma yeter.

İçinden: bu ağırlık.

Nesneyi hafifçe çevir. Yeni bir kenar. Yeni bir ısı. Aynı nesne.

Üç nefes.

Taşı kanıt yapma. “Gerçek dünya” sınavı yok. Sadece avuç.

Masanın sesi, eğer koyarsan. Koymuyorsan avuçta kalsın.

İki nefes.

Omuzlar. Nesne onları indirmiyor. Onlar duruyor. Nesne duruyor.

Alın. Çene. Sonra yine avuç.

Üç nefes.

Adını içinden söyle, nesnenin adını. Taş. Anahtar. Kupa. El.

Son dört nefes. Ağırlık. Kenar. Avuç. Sen.

Bırakış: nesneyi bir tılsım haline getirmeyeceksin. Avuç duruyor.`,
    `This is not a treatment. A stone, a key, a cup. An object in the palm. If there is none, join the two hands. Weight is still weight.

Edge. Heat or cool. Rough or smooth. Pick one sensation. Stay there.

Stay for three breaths.

If the mind makes a story, return to the object. Do not tell where it came from. Do not hunt what it means. Weight.

Two breaths.

Fingers around the object. Do not squeeze. Holding is enough.

Inside: this weight.

Turn it a little. A new edge. A new heat. The same object.

Three breaths.

Do not make the stone a proof. There is no exam called “the real world”. Only the palm.

The sound of the table, if you set it down. If you do not, it stays in the palm.

Two breaths.

Shoulders. The object is not lowering them. They stay. The object stays.

Forehead. Jaw. Then the palm again.

Three breaths.

Say the name inside, the name of the object. Stone. Key. Cup. Hand.

Last four breaths. Weight. Edge. Palm. You.

Release: you will not turn the object into a charm. The palm stays.`,
    `Esto no es un tratamiento. Una piedra, una llave, una taza. Un objeto en la palma. Si no hay, junta las dos manos. El peso sigue siendo peso.

Borde. Calor o fresco. Áspero o liso. Elige una sensación. Quédate ahí.

Quédate tres respiraciones.

Si la mente inventa una historia, vuelve al objeto. No cuentes de dónde vino. No busques qué significa. Peso.

Dos respiraciones.

Los dedos alrededor del objeto. No aprietes. Sostener basta.

Por dentro: este peso.

Gíralo un poco. Un borde nuevo. Un calor nuevo. El mismo objeto.

Tres respiraciones.

No hagas de la piedra una prueba. No hay un examen llamado “el mundo real”. Solo la palma.

El sonido de la mesa, si lo dejas. Si no, se queda en la palma.

Dos respiraciones.

Hombros. El objeto no los baja. Ellos están. El objeto está.

Frente. Mandíbula. Luego otra vez la palma.

Tres respiraciones.

Di el nombre por dentro, el nombre del objeto. Piedra. Llave. Taza. Mano.

Últimas cuatro respiraciones. Peso. Borde. Palma. Tú.

Suelta: no vas a convertir el objeto en un amuleto. La palma sigue.`,
    `Non è una cura. Una pietra, una chiave, una tazza. Un oggetto nel palmo. Se non c’è, unisci le due mani. Il peso resta peso.

Bordo. Caldo o fresco. Ruvido o liscio. Scegli una sensazione. Resta lì.

Resta tre respiri.

Se la mente inventa una storia, torna all’oggetto. Non raccontare da dove viene. Non cercare che cosa significa. Peso.

Due respiri.

Dita intorno all’oggetto. Non stringere. Tenere basta.

Dentro: questo peso.

Giralo un poco. Un bordo nuovo. Un calore nuovo. Lo stesso oggetto.

Tre respiri.

Non fare della pietra una prova. Non c’è un esame chiamato “il mondo reale”. Solo il palmo.

Il suono del tavolo, se lo posi. Se no, resta nel palmo.

Due respiri.

Spalle. L’oggetto non le abbassa. Restano. L’oggetto resta.

Fronte. Mascella. Poi di nuovo il palmo.

Tre respiri.

Dì il nome dentro, il nome dell’oggetto. Pietra. Chiave. Tazza. Mano.

Ultimi quattro respiri. Peso. Bordo. Palmo. Tu.

Rilascio: non farai dell’oggetto un talismano. Il palmo resta.`,
    `Bu müalicə deyil. Bir daş, bir açar, bir fincan. Ovucda bir əşya. Yoxdursa iki əli birləşdir. Ağırlıq yenə ağırlıqdır.

Kənar. İstilik və ya sərinlik. Kələkötür və ya hamar. Bir duyum seç. Orada qal.

Burada üç nəfəs.

Ağıl hekayə uydurarsa əşyaya qayıt. Haradan gəldiyini danışma. Nə demək olduğunu axtarma. Ağırlıq.

İki nəfəs.

Barmaqlar əşyanın ətrafında. Sıxma. Tutmaq bəsdir.

İçindən: bu ağırlıq.

Bir az çevir. Yeni kənar. Yeni istilik. Eyni əşya.

Üç nəfəs.

Daşı sübut etmə. “Real dünya” imtahanı yoxdur. Yalnız ovuc.

Masanın səsi, qoyarsan. Qoymursansa ovucda qalsın.

İki nəfəs.

Çiyinlər. Əşya onları endirmir. Onlar durur. Əşya durur.

Alın. Çənə. Sonra yenə ovuc.

Üç nəfəs.

Adını içindən de, əşyanın adını. Daş. Açar. Fincan. Əl.

Son dörd nəfəs. Ağırlıq. Kənar. Ovuc. Sən.

Buraxılış: əşyanı tilsim etməyəcəksən. Ovuc durur.`,
    `Это не лечение. Камень, ключ, чашка. Предмет на ладони. Если нет — соедини две руки. Вес всё равно вес.

Край. Тепло или прохлада. Шершавое или гладкое. Выбери одно ощущение. Останься там.

Здесь три дыхания.

Если ум плетёт историю — вернись к предмету. Не рассказывай, откуда он. Не ищи, что он значит. Вес.

Два дыхания.

Пальцы вокруг предмета. Не сжимай. Держать достаточно.

Внутри: этот вес.

Поверни чуть. Новый край. Новое тепло. Тот же предмет.

Три дыхания.

Не делай камень доказательством. Нет экзамена под названием «настоящий мир». Только ладонь.

Звук стола, если положишь. Если нет — пусть остаётся на ладони.

Два дыхания.

Плечи. Предмет их не опускает. Они остаются. Предмет остаётся.

Лоб. Челюсть. Потом снова ладонь.

Три дыхания.

Скажи имя внутри, имя предмета. Камень. Ключ. Чашка. Рука.

Последние четыре дыхания. Вес. Край. Ладонь. Ты.

Отпускание: ты не сделаешь из предмета талисман. Ладонь остаётся.`,
  ),

  'shore-seed': pack(
    `Bu bir tedavi değildir. Tek sahne. Kapalı bahçe. Ilık taş. Küçük kandil. Film yok. Devam yok. Tek kare.

Kenarları çiz. Duvar veya çit. Taşın ısısı avuçta gibi. Kandilin camı.

Burada üç nefes.

Kartpostal yeter. Kamerayı gezdirme. Bir kare. Dur.

İçinden: bu kare.

Rüzgâr yoksa rüzgâr yok. Varsa yaprak. Yorum yok.

İki nefes.

Tohumu geceye bırak. Uyku görev değil. Sahne bir ninninin yerini tutmak zorunda değil.

Üç nefes.

Alın. Çene. Avuç. Sonra yine kandil.

Zihin filmi uzatırsa, kareye dön. Bahçe. Taş. Kandil.

İki nefes.

Işık küçük. Oda büyük olmak zorunda değil.

Son dört nefes. Kare. Tohum. Gece. Bırak.

Bırakış: bunu bir dizi haline getirmeyeceksin. Tek kare yeter.`,
    `This is not a treatment. One scene. A closed garden. A warm stone. A small lamp. No film. No sequel. One frame.

Draw the edges. A wall or a hedge. The heat of the stone as if in the palm. The glass of the lamp.

Stay for three breaths.

A postcard is enough. Do not pan the camera. One frame. Stay.

Inside: this frame.

If there is no wind, there is no wind. If there is, a leaf. No commentary.

Two breaths.

Leave the seed to the night. Sleep is not a task. The scene does not have to replace a lullaby.

Three breaths.

Forehead. Jaw. Palm. Then the lamp again.

If the mind stretches it into a film, return to the frame. Garden. Stone. Lamp.

Two breaths.

The light is small. The room does not have to be large.

Last four breaths. Frame. Seed. Night. Leave it.

Release: you will not turn this into a series. One frame is enough.`,
    `Esto no es un tratamiento. Una escena. Jardín cerrado. Piedra tibia. Lámpara pequeña. Sin cine. Sin continuación. Un fotograma.

Dibuja los bordes. Un muro o un seto. El calor de la piedra como en la palma. El cristal de la lámpara.

Quédate tres respiraciones.

Una postal basta. No muevas la cámara. Un fotograma. Quédate.

Por dentro: este fotograma.

Si no hay viento, no hay viento. Si hay, una hoja. Sin comentario.

Dos respiraciones.

Deja la semilla a la noche. Dormir no es una tarea. La escena no tiene que sustituir una nana.

Tres respiraciones.

Frente. Mandíbula. Palma. Luego otra vez la lámpara.

Si la mente lo alarga en una película, vuelve al fotograma. Jardín. Piedra. Lámpara.

Dos respiraciones.

La luz es pequeña. La habitación no tiene que ser grande.

Últimas cuatro respiraciones. Fotograma. Semilla. Noche. Déjalo.

Suelta: no vas a convertir esto en una serie. Un fotograma basta.`,
    `Non è una cura. Una scena. Giardino chiuso. Pietra tiepida. Piccola lampada. Niente film. Niente seguito. Un fotogramma.

Traccia i bordi. Un muro o una siepe. Il calore della pietra come nel palmo. Il vetro della lampada.

Resta tre respiri.

Una cartolina basta. Non muovere la camera. Un fotogramma. Resta.

Dentro: questo fotogramma.

Se non c’è vento, non c’è vento. Se c’è, una foglia. Niente commento.

Due respiri.

Lascia il seme alla notte. Il sonno non è un compito. La scena non deve sostituire una ninnananna.

Tre respiri.

Fronte. Mascella. Palmo. Poi di nuovo la lampada.

Se la mente la allunga in un film, torna al fotogramma. Giardino. Pietra. Lampada.

Due respiri.

La luce è piccola. La stanza non deve essere grande.

Ultimi quattro respiri. Fotogramma. Seme. Notte. Lascia.

Rilascio: non farai di questo una serie. Un fotogramma basta.`,
    `Bu müalicə deyil. Tək səhnə. Bağlı bağ. İlıq daş. Kiçik çıraq. Film yox. Davam yox. Tək kadr.

Kənarları çək. Divar və ya çəpər. Daşın istiliyi ovucda kimi. Çırağın şüşəsi.

Burada üç nəfəs.

Açıqca bəsdir. Kameranı gəzdirmə. Bir kadr. Dur.

İçindən: bu kadr.

Külək yoxdursa külək yoxdur. Varsa yarpaq. Şərh yox.

İki nəfəs.

Toxumu gecəyə burax. Yuxu tapşırıq deyil. Səhnə ninni yerini tutmaq məcburiyyətində deyil.

Üç nəfəs.

Alın. Çənə. Ovuc. Sonra yenə çıraq.

Ağıl filmi uzadarsa, kadrə qayıt. Bağ. Daş. Çıraq.

İki nəfəs.

İşıq kiçikdir. Otaq böyük olmaq məcburiyyətində deyil.

Son dörd nəfəs. Kadr. Toxum. Gecə. Burax.

Buraxılış: bunu serial etməyəcəksən. Tək kadr bəsdir.`,
    `Это не лечение. Одна сцена. Закрытый сад. Тёплый камень. Маленький светильник. Не фильм. Не продолжение. Один кадр.

Нарисуй края. Стена или изгородь. Тепло камня как на ладони. Стекло светильника.

Здесь три дыхания.

Открытки достаточно. Не води камеру. Один кадр. Оставайся.

Внутри: этот кадр.

Если ветра нет — ветра нет. Если есть — лист. Без комментария.

Два дыхания.

Оставь семя ночи. Сон не задание. Сцена не обязана заменить колыбельную.

Три дыхания.

Лоб. Челюсть. Ладонь. Потом снова светильник.

Если ум растягивает это в фильм — вернись к кадру. Сад. Камень. Светильник.

Два дыхания.

Свет маленький. Комнате не нужно быть большой.

Последние четыре дыхания. Кадр. Семя. Ночь. Оставь.

Отпускание: ты не сделаешь из этого сериал. Одного кадра достаточно.`,
  ),
}

const MED_MINUTES: Record<string, number> = {
  'first-settle': 5,
  'first-breath': 6,
  'first-ground': 7,
  'room-door': 6,
  'room-light': 7,
  'room-hands': 5,
  'shore-edge': 6,
  'shore-stone': 7,
  'shore-seed': 5,
}

const RETURNS: Record<LocaleId, string[]> = {
  tr: [
    'Alış.',
    'Veriş.',
    'Alış. Hava giriyor.',
    'Veriş. Hava çıkıyor.',
    'Çene duruyor.',
    'Avuçlar duruyor.',
    'Omuzlar. Karın. Yer.',
    'Zihin giderse bir verişe dön.',
    'Burada bir nefes daha.',
    'İçinden: buradayım.',
    'Alın. Çene. Avuç.',
    'İki taban. Yer tutuyor.',
    'Sayma. Sadece izle.',
    'Bir milim yeter.',
  ],
  en: [
    'In.',
    'Out.',
    'In. Air arrives.',
    'Out. Air leaves.',
    'The jaw stays.',
    'The palms stay.',
    'Shoulders. Belly. Ground.',
    'If the mind leaves, return to one exhale.',
    'One more breath here.',
    'Inside: I am here.',
    'Forehead. Jaw. Palm.',
    'Two soles. The ground holds.',
    'Do not count. Only watch.',
    'A millimetre is enough.',
  ],
  es: [
    'Entra.',
    'Sale.',
    'Entra. El aire llega.',
    'Sale. El aire se va.',
    'La mandíbula está.',
    'Las palmas están.',
    'Hombros. Vientre. Suelo.',
    'Si la mente se va, vuelve a una exhalación.',
    'Una respiración más aquí.',
    'Por dentro: estoy aquí.',
    'Frente. Mandíbula. Palma.',
    'Dos plantas. El suelo sostiene.',
    'No cuentes. Solo mira.',
    'Un milímetro basta.',
  ],
  it: [
    'Entra.',
    'Esce.',
    'Entra. L’aria arriva.',
    'Esce. L’aria se ne va.',
    'La mascella resta.',
    'I palmi restano.',
    'Spalle. Pancia. Terra.',
    'Se la mente parte, torna a un’espirazione.',
    'Un altro respiro qui.',
    'Dentro: sono qui.',
    'Fronte. Mascella. Palmo.',
    'Due piante. La terra tiene.',
    'Non contare. Guarda soltanto.',
    'Un millimetro basta.',
  ],
  az: [
    'Alış.',
    'Veriş.',
    'Alış. Hava gəlir.',
    'Veriş. Hava çıxır.',
    'Çənə durur.',
    'Ovuc durur.',
    'Çiyinlər. Qarın. Yer.',
    'Ağıl getsə bir verişə qayıt.',
    'Burada bir nəfəs daha.',
    'İçindən: buradayam.',
    'Alın. Çənə. Ovuc.',
    'İki ayaq altı. Yer tutur.',
    'Sayma. Yalnız izlə.',
    'Bir milim bəsdir.',
  ],
  ru: [
    'Вдох.',
    'Выдох.',
    'Вдох. Воздух приходит.',
    'Выдох. Воздух уходит.',
    'Челюсть остаётся.',
    'Ладони остаются.',
    'Плечи. Живот. Земля.',
    'Если ум ушёл — вернись к одному выдоху.',
    'Ещё одно дыхание здесь.',
    'Внутри: я здесь.',
    'Лоб. Челюсть. Ладонь.',
    'Две стопы. Земля держит.',
    'Не считай. Только смотри.',
    'Миллиметра достаточно.',
  ],
}

function estimateSec(text: string) {
  const paras = text.split(/\n{2,}/).length
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return (words / 88) * 60 + paras * 2.3
}

function padScript(id: string, locale: LocaleId, text: string) {
  const minutes = MED_MINUTES[id] ?? 5
  const target = minutes * 60 * 0.94
  if (estimateSec(text) >= target) return text
  const lines = RETURNS[locale]
  const extra: string[] = []
  let i = 0
  while (estimateSec(`${text}\n\n${extra.join('\n\n')}`) < target) {
    extra.push(lines[i % lines.length]!)
    i += 1
    if (i > 220) break
  }
  const parts = text.split(/\n\n/)
  const tail = parts.slice(-3)
  const head = parts.slice(0, -3)
  const mid = Math.max(1, Math.ceil(head.length / 2))
  const a = extra.slice(0, Math.ceil(extra.length / 2))
  const b = extra.slice(Math.ceil(extra.length / 2))
  return [...head.slice(0, mid), ...a, ...head.slice(mid), ...b, ...tail].join('\n\n')
}

export const MED_SCRIPTS: Record<string, Record<LocaleId, string>> = Object.fromEntries(
  Object.entries(RAW_SCRIPTS).map(([id, rec]) => [
    id,
    {
      tr: padScript(id, 'tr', rec.tr),
      en: padScript(id, 'en', rec.en),
      es: padScript(id, 'es', rec.es),
      it: padScript(id, 'it', rec.it),
      az: padScript(id, 'az', rec.az),
      ru: padScript(id, 'ru', rec.ru),
    },
  ]),
)

export function medBody(id: string) {
  return MED_SCRIPTS[id]?.tr ?? ''
}
