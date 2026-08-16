import { pickLocale, R, type LocaleId } from './locales'

export function sosSentences(locale: LocaleId): string[] {
  const rows = [
    R('Bu anda bedenim güvenli bir yerde.|Right now my body is in a safe place.|Bu anda bədənim təhlükəsiz yerdədir.|Сейчас моё тело в безопасном месте.|Ahora mismo mi cuerpo está en un lugar seguro.|In questo momento il mio corpo è in un posto sicuro.'),
    R('Dalga geçiyor, ben burada kalıyorum.|The wave is passing; I stay here.|Dalğa keçir, mən burada qalıram.|Волна проходит, я остаюсь здесь.|La ola pasa; yo me quedo aquí.|L’onda passa; io resto qui.'),
    R('Nefesim şu an bana yeter.|This breath is enough for me now.|Nəfəsim indilik mənə bəsdir.|Этого дыхания мне сейчас довольно.|Esta respiración me basta ahora.|Questo respiro mi basta ora.'),
    R('Ayaklarım yerde, odam gerçek.|My feet are on the ground; the room is real.|Ayaqlarım yerdədir, otağım gerçəkdir.|Ноги на земле, комната настоящая.|Mis pies están en el suelo; la habitación es real.|I piedi sono a terra; la stanza è reale.'),
    R('Bu his yoğun, ve geçici.|This feeling is intense, and temporary.|Bu hiss güclüdür və keçicidir.|Это чувство сильно — и временно.|Esta sensación es intensa, y temporal.|Questa sensazione è intensa, e temporanea.'),
    R('Göğsüm açılıyor, omuzlarım iniyor.|My chest opens; my shoulders drop.|Sinəm açılır, çiyinlərim enir.|Грудь раскрывается, плечи опускаются.|El pecho se abre; los hombros bajan.|Il petto si apre; le spalle scendono.'),
    R('Şimdi sadece bu nefes var.|Right now there is only this breath.|İndi yalnız bu nəfəs var.|Сейчас есть только это дыхание.|Ahora solo está este aliento.|Adesso c’è solo questo respiro.'),
    R('Kendi adımı, bu odayı biliyorum.|I know my name, and this room.|Öz adımı, bu otağı bilirəm.|Я знаю своё имя и эту комнату.|Sé mi nombre y esta habitación.|Conosco il mio nome e questa stanza.'),
  ]
  return rows.map((row) => pickLocale(row, locale, row.en))
}

export function tapSentences(locale: LocaleId): string[] {
  const rows = [
    R('Dalga geçti, ben buradayım.|The wave passed; I am here.|Dalğa keçdi, mən buradayam.|Волна прошла; я здесь.|La ola pasó; estoy aquí.|L’onda è passata; sono qui.'),
    R('Bedenim şimdi yavaşlıyor.|My body is slowing now.|Bədənim indi yavaşlayır.|Тело сейчас замедляется.|Mi cuerpo ahora se ralentiza.|Il mio corpo ora rallenta.'),
    R('Bu oda, bu gece, bu nefes.|This room, this night, this breath.|Bu otaq, bu gecə, bu nəfəs.|Эта комната, эта ночь, это дыхание.|Esta habitación, esta noche, este aliento.|Questa stanza, questa notte, questo respiro.'),
    R('Güvenliyim ve duruyorum.|I am safe, and I am staying.|Təhlükəsizəm və dururam.|Я в безопасности и остаюсь.|Estoy a salvo y me quedo.|Sono al sicuro e resto.'),
  ]
  return rows.map((row) => pickLocale(row, locale, row.en))
}
