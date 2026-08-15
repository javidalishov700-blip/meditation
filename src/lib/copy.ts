import type { LocaleId } from './locales'
import type { BreathPattern, LibraryItem, ProgramDay } from './types'
import type { Door } from './treatments'

export function L(tr: string, en: string, es: string, fr: string, de: string, it: string): Record<LocaleId, string> {
  return { tr, en, es, fr, de, it }
}

export type Pack = {
  title?: Record<LocaleId, string>
  subtitle?: Record<LocaleId, string>
  body?: Record<LocaleId, string>
  sentence?: Record<LocaleId, string>
  nightSeed?: Record<LocaleId, string>
  summary?: Record<LocaleId, string>
  scene?: Record<LocaleId, string>
  release?: Record<LocaleId, string>
  gratitude?: Record<LocaleId, string>
  kicker?: Record<LocaleId, string>
  label?: Record<LocaleId, string>
  promise?: Record<LocaleId, string>
}

export function pickPack(map: Record<LocaleId, string> | undefined, locale: LocaleId, fallback: string): string {
  if (!map) return fallback
  return map[locale] || map.en || map.tr || fallback
}

export const PACK: Record<string, Pack> = {
  lighthouse: {
    title: L('Kıyı Feneri', 'Coastal lighthouse', 'Faro de costa', 'Phare du rivage', 'Küstenleuchtturm', 'Faro sulla costa'),
    subtitle: L('Ege’de bir gece nöbeti', 'A night watch on the coast', 'Una guardia nocturna en la costa', 'Une veille sur la côte', 'Nachtwache an der Küste', 'Una veglia sulla costa'),
    sentence: L('Bu kıyıda lamba yanıyor, ben duruyorum.', 'The lamp is on this shore, and I stay.', 'La lámpara está en esta orilla, y yo me quedo.', 'La lampe est sur cette rive, et je reste.', 'Die Lampe brennt an diesem Ufer, und ich bleibe.', 'La lampada è su questa riva, e io resto.'),
    nightSeed: L('Spiral merdiven, ılık cam, durgun deniz.', 'Spiral stairs, warm glass, still sea.', 'Escalera de caracol, cristal tibio, mar quieto.', 'Escalier en spirale, verre tiède, mer calme.', 'Wendeltreppe, warmes Glas, stilles Meer.', 'Scala a chiocciola, vetro tiepido, mare fermo.'),
    body: L(
      'Bu hikâye bir tedavi değildir. Sadece bir kıyı, bir lamba, bir nöbet. Kayalık bir çıkıntıda beyaz bir fener var. Rüzgâr yok. Deniz duruyor. Sen bekçisin. Spiral merdiven taş, el duvarda, serin ve tuzlu. Yukarıda lamba odası. Camlar temiz. Oturuyorsun. Koy boş. Lamba düzenli tarıyor. Sen sabit noktasın. Termosta ılık su. Göğsün sakin. Paltonun cebinde bir taş. Gece ilerliyor. Fener kendi işini bilir. Omuzlarını bırak. Tohum: spiral merdiven, ılık cam, durgun deniz. Bırak.',
      'This is not a treatment. A shore, a lamp, a watch. A white lighthouse on rock. No wind. The sea holds still. You are the keeper. Stone spiral stairs, hand on the wall, cool and salt. The lamp room. Clean glass. You sit. The cove is empty. The lamp sweeps on time. You are the still point. Warm water in a flask. The chest is quiet. A stone in a coat pocket. Night moves. The lighthouse knows its work. Drop the shoulders. Seed: spiral stairs, warm glass, still sea. Release.',
      'Esto no es un tratamiento. Una orilla, una lámpara, una guardia. Un faro blanco en la roca. Sin viento. El mar está quieto. Eres el farero. Escalera de piedra, mano en el muro, fresco y sal. Sala de la lámpara. Cristal limpio. Te sientas. La cala está vacía. La lámpara barre a tiempo. Eres el punto fijo. Agua tibia. El pecho está en calma. Una piedra en el bolsillo. La noche avanza. El faro sabe su trabajo. Baja los hombros. Semilla: escalera, cristal tibio, mar quieto. Suelta.',
      'Ce n’est pas un traitement. Une rive, une lampe, une veille. Un phare blanc sur la roche. Pas de vent. La mer est calme. Tu es le gardien. Escalier de pierre, main au mur, frais et salé. Salle de la lampe. Verre propre. Tu t’assieds. L’anse est vide. La lampe balaie à l’heure. Tu es le point fixe. Eau tiède. La poitrine est calme. Une pierre dans une poche. La nuit avance. Le phare sait son travail. Laisse descendre les épaules. Graine : spirale, verre tiède, mer calme. Lâche.',
      'Das ist keine Behandlung. Ein Ufer, eine Lampe, eine Wache. Ein weißes Feuer auf Fels. Kein Wind. Das Meer hält still. Du bist der Wärter. Steinerne Spirale, Hand an der Wand, kühl und salzig. Lampenraum. Sauberes Glas. Du sitzt. Die Bucht ist leer. Die Lampe streicht im Takt. Du bist der feste Punkt. Warmes Wasser. Die Brust ist ruhig. Ein Stein in der Tasche. Die Nacht geht. Der Turm kennt seine Arbeit. Schultern sinken. Samen: Spirale, warmes Glas, stilles Meer. Loslassen.',
      'Non è una cura. Una riva, una lampada, una veglia. Un faro bianco sulla roccia. Niente vento. Il mare è fermo. Sei il guardiano. Scala di pietra, mano al muro, fresco e sale. Stanza della lampada. Vetro pulito. Ti siedi. La cala è vuota. La lampada spazza a tempo. Sei il punto fermo. Acqua tiepida. Il petto è calmo. Un sasso in tasca. La notte avanza. Il faro sa il suo lavoro. Lascia scendere le spalle. Seme: scala, vetro tiepido, mare fermo. Rilascia.',
    ),
  },
  library: {
    title: L('Cam Dağ Kütüphanesi', 'Glass mountain library', 'Biblioteca del monte de cristal', 'Bibliothèque de la montagne de verre', 'Glasberg-Bibliothek', 'Biblioteca della montagna di vetro'),
    subtitle: L('Yüksek bir vadide sessiz raflar', 'Quiet shelves in a high valley', 'Estantes quietos en un valle alto', 'Rayons calmes dans une haute vallée', 'Stille Regale in einem hohen Tal', 'Scaffali quieti in una valle alta'),
    sentence: L('Bu rafta duruyorum, sayfalar sakin.', 'I stand at this shelf; the pages are quiet.', 'Estoy en este estante; las páginas están quietas.', 'Je suis à ce rayon ; les pages sont calmes.', 'Ich stehe an diesem Regal; die Seiten sind still.', 'Sto a questo scaffale; le pagine sono quiete.'),
    nightSeed: L('Cam dağ, toz motu, kapalı kitap.', 'Glass mountain, a dust mote, a closed book.', 'Monte de cristal, mota de polvo, libro cerrado.', 'Montagne de verre, grain de poussière, livre fermé.', 'Glasberg, Staubkorn, geschlossenes Buch.', 'Montagna di vetro, granello, libro chiuso.'),
    body: L(
      'Yüksek bir vadi. Taş bir kütüphane, kapı açık. Raflar tavanı aşıyor. Bir masa, kapalı bir kitap. Açmıyorsun. Eller masada, ahşap ılık. Uzaktan bir sayfa sesi, kimse yok. Oturuyorsun. Ayaklar yerde. Çeşme ince akar. Mot bir ışık çizgisinde. Tohum: cam dağ, toz motu, kapalı kitap. Bırak. Rafları saymayacaksın.',
      'A high valley. A stone library, door open. Shelves past the ceiling. A table, a closed book. You do not open it. Hands on wood, warm. A page turns somewhere; no one is there. You sit. Feet on the floor. A thin fountain. A mote in a line of light. Seed: glass mountain, dust mote, closed book. Release. You will not count the shelves.',
      'Un valle alto. Biblioteca de piedra, puerta abierta. Estantes hasta el techo. Una mesa, un libro cerrado. No lo abres. Manos en la madera, tibia. Una página en algún sitio; no hay nadie. Te sientas. Pies en el suelo. Una fuente fina. Una mota en un hilo de luz. Semilla: monte de cristal, mota, libro cerrado. Suelta. No contarás los estantes.',
      'Une haute vallée. Bibliothèque de pierre, porte ouverte. Rayons jusqu’au plafond. Une table, un livre fermé. Tu ne l’ouvres pas. Mains sur le bois, tiède. Une page quelque part ; personne. Tu t’assieds. Pieds au sol. Une fontaine mince. Un grain dans un fil de lumière. Graine : montagne de verre, poussière, livre fermé. Lâche. Tu ne compteras pas les rayons.',
      'Ein hohes Tal. Steinerne Bibliothek, Tür offen. Regale über die Decke. Ein Tisch, ein geschlossenes Buch. Du öffnest es nicht. Hände auf Holz, warm. Irgendwo ein Blatt; niemand da. Du sitzt. Füße am Boden. Ein dünner Brunnen. Ein Körnchen im Licht. Samen: Glasberg, Staub, geschlossenes Buch. Loslassen. Du zählst die Regale nicht.',
      'Una valle alta. Biblioteca di pietra, porta aperta. Scaffali oltre il soffitto. Un tavolo, un libro chiuso. Non lo apri. Mani sul legno, tiepido. Una pagina da qualche parte; nessuno. Ti siedi. Piedi a terra. Una fontana sottile. Un granello in un filo di luce. Seme: montagna di vetro, polvere, libro chiuso. Rilascia. Non conterai gli scaffali.',
    ),
  },
  wagon: {
    title: L('Sessiz Vagon', 'Quiet carriage', 'Vagón silencioso', 'Wagon silencieux', 'Stiller Wagen', 'Vagone silenzioso'),
    subtitle: L('Gece treni, durak yok', 'Night train, no stop', 'Tren nocturno, sin parada', 'Train de nuit, sans arrêt', 'Nachtzug, kein Halt', 'Treno notturno, nessuna fermata'),
    sentence: L('Bu vagonda oturuyorum, raylar düzenli.', 'I sit in this carriage; the rails are even.', 'Me siento en este vagón; los rieles son regulares.', 'Je suis dans ce wagon ; les rails sont réguliers.', 'Ich sitze in diesem Wagen; die Schienen sind gleichmäßig.', 'Siedo in questo vagone; i binari sono regolari.'),
    nightSeed: L('Koyu vagon, pencere buğusu, düzenli tıkırtı.', 'Dark carriage, window fog, even click.', 'Vagón oscuro, vaho, clic regular.', 'Wagon sombre, buée, clic régulier.', 'Dunkler Wagen, Scheibenbeschlag, gleichmäßiges Klicken.', 'Vagone scuro, foschia, clic regolare.'),
    body: L(
      'Gece treni. Pencere kenarı, orta vagon, kimse yok. Tıkırtı düzenli. Ova karanlık. Ayaklar yerde, titreşim seni koltukta tutar. Koridor boş. Buğu. Bir tünel, kısa, çıkış. Gözler kapanabilir. Tren nöbet tutar. Tohum: koyu vagon, buğu, tıkırtı. Bırak. Varışı planlamıyorsun.',
      'Night train. Window seat, middle car, no one. Even click. Dark fields. Feet on the floor; the tremor holds you in the seat. Empty aisle. Fog on glass. A tunnel, short, then out. Eyes may close. The train keeps watch. Seed: dark carriage, fog, click. Release. You are not planning the arrival.',
      'Tren de noche. Ventanilla, vagón del medio, nadie. Clic regular. Campo oscuro. Pies en el suelo; el temblor te sujeta. Pasillo vacío. Vaho. Un túnel, breve, salida. Los ojos pueden cerrarse. El tren vigila. Semilla: vagón oscuro, vaho, clic. Suelta. No planeas la llegada.',
      'Train de nuit. Place fenêtre, wagon du milieu, personne. Clic régulier. Plaine noire. Pieds au sol ; la vibration te tient. Couloir vide. Buée. Un tunnel, court, puis la sortie. Les yeux peuvent se fermer. Le train veille. Graine : wagon sombre, buée, clic. Lâche. Tu ne prépares pas l’arrivée.',
      'Nachtzug. Fensterplatz, mittlerer Wagen, niemand. Gleichmäßiges Klicken. Dunkles Feld. Füße am Boden; das Zittern hält dich. Leerer Gang. Beschlag. Ein Tunnel, kurz, Ausgang. Die Augen dürfen zu. Der Zug hält Wache. Samen: dunkler Wagen, Beschlag, Klick. Loslassen. Du planst die Ankunft nicht.',
      'Treno di notte. Finestrino, vagone di mezzo, nessuno. Clic regolare. Campagna scura. Piedi a terra; il tremore ti tiene. Corridoio vuoto. Foschia. Una galleria, breve, uscita. Gli occhi possono chiudersi. Il treno veglia. Seme: vagone scuro, foschia, clic. Rilascia. Non pianifichi l’arrivo.',
    ),
  },
  meadow: {
    title: L('Yıldız Çayırı', 'Star meadow', 'Pradera de estrellas', 'Prairie d’étoiles', 'Sternenwiese', 'Prato di stelle'),
    subtitle: L('Yüksek yayla, ateş yok, gökyüzü var', 'High meadow, no fire, open sky', 'Pradera alta, sin fuego, cielo abierto', 'Prairie haute, pas de feu, ciel ouvert', 'Hohe Wiese, kein Feuer, offener Himmel', 'Prato alto, niente fuoco, cielo aperto'),
    sentence: L('Bu çayırda sırtım yerde, gök açık.', 'My back is on this meadow; the sky is open.', 'La espalda está en este prado; el cielo está abierto.', 'Mon dos est sur cette prairie ; le ciel est ouvert.', 'Mein Rücken liegt auf dieser Wiese; der Himmel ist offen.', 'La schiena è su questo prato; il cielo è aperto.'),
    nightSeed: L('Serin çimen, açık gök, tek bir yıldız.', 'Cool grass, open sky, one star.', 'Hierba fresca, cielo abierto, una estrella.', 'Herbe fraîche, ciel ouvert, une étoile.', 'Kühles Gras, offener Himmel, ein Stern.', 'Erba fresca, cielo aperto, una stella.'),
    body: L(
      'Yayla. Rüzgâr yok. Sırtüstü, battaniye kalın. Ay yok, yıldızlar var, sayma. Uzak dere. Eller kenarda. Bir yıldız seç, ad verme, bak. Yer seni taşır. Çimen, gök, dere. Tohum: serin çimen, açık gök, tek yıldız. Bırak. Harita çizmeyeceksin.',
      'High meadow. No wind. On your back, thick blanket. No moon. Stars, do not count. A far stream. Hands at the edge. Pick one star, no name, look. The ground holds you. Grass, sky, stream. Seed: cool grass, open sky, one star. Release. You will not draw a map.',
      'Pradera alta. Sin viento. Boca arriba, manta gruesa. Sin luna. Estrellas, no cuentes. Un arroyo lejos. Manos al borde. Elige una estrella, sin nombre, mira. El suelo te sostiene. Hierba, cielo, arroyo. Semilla: hierba fresca, cielo abierto, una estrella. Suelta. No harás un mapa.',
      'Prairie haute. Pas de vent. Sur le dos, couverture épaisse. Pas de lune. Étoiles, ne compte pas. Un ruisseau loin. Mains au bord. Choisis une étoile, sans nom, regarde. Le sol te porte. Herbe, ciel, ruisseau. Graine : herbe fraîche, ciel ouvert, une étoile. Lâche. Tu ne feras pas de carte.',
      'Hohe Wiese. Kein Wind. Auf dem Rücken, dicke Decke. Kein Mond. Sterne, nicht zählen. Ein ferner Bach. Hände am Rand. Einen Stern wählen, keinen Namen, schauen. Der Boden trägt dich. Gras, Himmel, Bach. Samen: kühles Gras, offener Himmel, ein Stern. Loslassen. Du zeichnest keine Karte.',
      'Prato alto. Niente vento. Sulla schiena, coperta spessa. Niente luna. Stelle, non contare. Un ruscello lontano. Mani sul bordo. Scegli una stella, senza nome, guarda. Il suolo ti tiene. Erba, cielo, ruscello. Seme: erba fresca, cielo aperto, una stella. Rilascia. Non farai una mappa.',
    ),
  },
  coral: {
    title: L('Mercan Kapısı', 'Coral gate', 'Puerta de coral', 'Porte de corail', 'Korallentor', 'Porta di corallo'),
    subtitle: L('Sığ su, yavaş balık, gece', 'Shallow water, slow fish, night', 'Agua baja, peces lentos, noche', 'Eau peu profonde, poissons lents, nuit', 'Flaches Wasser, langsame Fische, Nacht', 'Acqua bassa, pesci lenti, notte'),
    sentence: L('Bu sığ suda yavaşım, kapı açık.', 'I am slow in this shallow water; the gate is open.', 'Voy despacio en esta agua baja; la puerta está abierta.', 'Je suis lent dans cette eau peu profonde ; la porte est ouverte.', 'Ich bin langsam in diesem flachen Wasser; das Tor ist offen.', 'Sono lento in quest’acqua bassa; la porta è aperta.'),
    nightSeed: L('Sığ su, mercan kemeri, yavaş gölge.', 'Shallow water, coral arch, slow shadow.', 'Agua baja, arco de coral, sombra lenta.', 'Eau peu profonde, arche de corail, ombre lente.', 'Flaches Wasser, Korallenbogen, langsamer Schatten.', 'Acqua bassa, arco di corallo, ombra lenta.'),
    body: L(
      'Gece denizi, fırtına yok. Sığ koy. Su dize, sonra bele. Mercan bir kemer, geçilir. Kum ince. Küçük balıklar, acele yok. Oturak. Tuz dudakta. Eller suda. Dalış yok. Tohum: sığ su, mercan kemeri, yavaş gölge. Bırak. Derine inmeyeceksin.',
      'Night sea, no storm. Shallow cove. Water to the knee, then the waist. A coral arch, passable. Fine sand. Small fish, no hurry. A seat of rock. Salt on the lip. Hands in water. No dive. Seed: shallow water, coral arch, slow shadow. Release. You will not go deep.',
      'Mar de noche, sin tormenta. Cala baja. Agua a la rodilla, luego a la cintura. Un arco de coral, se puede pasar. Arena fina. Peces pequeños, sin prisa. Un asiento de roca. Sal en el labio. Manos en el agua. Sin buceo. Semilla: agua baja, arco, sombra lenta. Suelta. No irás al fondo.',
      'Mer de nuit, pas de tempête. Anse peu profonde. Eau aux genoux, puis à la taille. Une arche de corail, praticable. Sable fin. Petits poissons, sans hâte. Un siège de roche. Sel sur la lèvre. Mains dans l’eau. Pas de plongée. Graine : eau peu profonde, arche, ombre lente. Lâche. Tu n’iras pas au fond.',
      'Nachtmeer, kein Sturm. Flache Bucht. Wasser bis zum Knie, dann zur Hüfte. Ein Korallenbogen, passierbar. Feiner Sand. Kleine Fische, keine Eile. Ein Felsensitz. Salz an der Lippe. Hände im Wasser. Kein Tauchgang. Samen: flaches Wasser, Bogen, langsamer Schatten. Loslassen. Du gehst nicht in die Tiefe.',
      'Mare di notte, niente tempesta. Cala bassa. Acqua alle ginocchia, poi alla vita. Un arco di corallo, percorribile. Sabbia fine. Pesci piccoli, senza fretta. Un sedile di roccia. Sale sul labbro. Mani in acqua. Niente tuffo. Seme: acqua bassa, arco, ombra lenta. Rilascia. Non andrai in profondità.',
    ),
  },
  harbor: {
    title: L('Yağmur limanı', 'Rain harbor', 'Puerto de lluvia', 'Port sous la pluie', 'Regen-Hafen', 'Porto sotto la pioggia'),
    subtitle: L('Kapalı güverte, damla, halat', 'Closed deck, drops, a rope', 'Cubierta cerrada, gotas, una cuerda', 'Pont fermé, gouttes, une corde', 'Geschlossenes Deck, Tropfen, ein Tau', 'Ponte chiuso, gocce, una cima'),
    sentence: L('Bu güvertede duruyorum, yağmur dışarıda.', 'I stay on this deck; the rain is outside.', 'Me quedo en esta cubierta; la lluvia está fuera.', 'Je reste sur ce pont ; la pluie est dehors.', 'Ich bleibe auf diesem Deck; der Regen ist draußen.', 'Resto su questo ponte; la pioggia è fuori.'),
    nightSeed: L('Halat, damla, kapalı cam.', 'Rope, drop, closed glass.', 'Cuerda, gota, cristal cerrado.', 'Corde, goutte, verre fermé.', 'Tau, Tropfen, geschlossenes Glas.', 'Cima, goccia, vetro chiuso.'),
    body: L(
      'Liman, gece, yağmur, fırtına yok. Kapalı güverte, cam buğu. Halat direğe vuruyor, yumuşak. Oturuyorsun. Yağmur camı tarıyor. Sarı bir lamba sabit. Kayıklar bağlı. Sen nöbetçi değilsin. Damla ve halat. Omuzlarını bırak. Tohum: halat, damla, kapalı cam. Bırak.',
      'Harbor, night, rain, no storm. Closed deck, fogged glass. A rope taps the post, soft. You sit. Rain sweeps the glass. A yellow lamp holds still. Boats tied. You are not on watch. Drops and rope. Drop the shoulders. Seed: rope, drop, closed glass. Release.',
      'Puerto, noche, lluvia, sin tormenta. Cubierta cerrada, cristal empañado. Una cuerda toca el poste, suave. Te sientas. La lluvia barre el cristal. Una lámpara amarilla fija. Barcas atadas. No estás de guardia. Gotas y cuerda. Baja los hombros. Semilla: cuerda, gota, cristal cerrado. Suelta.',
      'Port, nuit, pluie, pas de tempête. Pont fermé, verre embué. Une corde frappe le pieu, doucement. Tu t’assieds. La pluie balaie le verre. Une lampe jaune fixe. Bateaux amarrés. Tu n’es pas de garde. Gouttes et corde. Laisse descendre les épaules. Graine : corde, goutte, verre fermé. Lâche.',
      'Hafen, Nacht, Regen, kein Sturm. Geschlossenes Deck, beschlagenes Glas. Ein Tau trifft den Pfahl, weich. Du sitzt. Regen streicht über Glas. Eine gelbe Lampe hält. Boote fest. Du hast keine Wache. Tropfen und Tau. Schultern sinken. Samen: Tau, Tropfen, geschlossenes Glas. Loslassen.',
      'Porto, notte, pioggia, niente tempesta. Ponte chiuso, vetro appannato. Una cima tocca il palo, piano. Ti siedi. La pioggia spazza il vetro. Una lampada gialla ferma. Barche ormeggiate. Non sei di guardia. Gocce e cima. Lascia scendere le spalle. Seme: cima, goccia, vetro chiuso. Rilascia.',
    ),
  },
  bath: {
    title: L('Hamam taşı', 'Bath stone', 'Piedra del baño', 'Pierre du hammam', 'Badstein', 'Pietra del bagno'),
    subtitle: L('Ilık taş, buhar yok, sade ısı', 'Warm stone, little steam, plain heat', 'Piedra tibia, poco vapor, calor simple', 'Pierre tiède, peu de vapeur, chaleur simple', 'Warmer Stein, wenig Dampf, schlichte Wärme', 'Pietra tiepida, poco vapore, calore semplice'),
    sentence: L('Taş ılık, ben duruyorum.', 'The stone is warm, and I stay.', 'La piedra está tibia, y me quedo.', 'La pierre est tiède, et je reste.', 'Der Stein ist warm, und ich bleibe.', 'La pietra è tiepida, e io resto.'),
    nightSeed: L('Ilık taş, loş kurna, sessiz oda.', 'Warm stone, dim basin, quiet room.', 'Piedra tibia, pila tenue, sala quieta.', 'Pierre tiède, vasque sombre, pièce calme.', 'Warmer Stein, dunkles Becken, stiller Raum.', 'Pietra tiepida, vasca fioca, stanza quieta.'),
    body: L(
      'Küçük hamam. Taş kurna ılık. Sırt taşta. Su ince akar. Ayna yok. Tabanlar taşta. Bir süre hiçbir şey olmaz. İyi. Tohum: ılık taş, loş kurna, sessiz oda. Bırak. Suyu yönetmeyeceksin.',
      'A small bath room. Warm stone basin. Back against stone. Thin water. No mirror. Soles on stone. For a while nothing happens. Good. Seed: warm stone, dim basin, quiet room. Release. You will not manage the water.',
      'Un baño pequeño. Pila de piedra tibia. Espalda en la piedra. Agua fina. Sin espejo. Plantas en la piedra. Un rato no pasa nada. Bien. Semilla: piedra tibia, pila tenue, sala quieta. Suelta. No gestionarás el agua.',
      'Petite salle de bain. Vasque de pierre tiède. Dos contre la pierre. Eau fine. Pas de miroir. Plantes sur la pierre. Un moment, rien. Bien. Graine : pierre tiède, vasque sombre, pièce calme. Lâche. Tu ne géreras pas l’eau.',
      'Kleiner Badraum. Warmes Steinbecken. Rücken am Stein. Dünnes Wasser. Kein Spiegel. Sohlen auf Stein. Eine Weile geschieht nichts. Gut. Samen: warmer Stein, dunkles Becken, stiller Raum. Loslassen. Du steuerst das Wasser nicht.',
      'Piccola stanza da bagno. Vasca di pietra tiepida. Schiena sulla pietra. Acqua sottile. Niente specchio. Piante sulla pietra. Per un po’ non succede nulla. Bene. Seme: pietra tiepida, vasca fioca, stanza quieta. Rilascia. Non governerai l’acqua.',
    ),
  },
  attic: {
    title: L('Çatı katı yağmuru', 'Attic rain', 'Lluvia en el desván', 'Pluie sous les combles', 'Dachkammerregen', 'Pioggia in soffitta'),
    subtitle: L('Tahta, damla, dar pencere', 'Wood, drops, a narrow window', 'Madera, gotas, ventana estrecha', 'Bois, gouttes, fenêtre étroite', 'Holz, Tropfen, schmales Fenster', 'Legno, gocce, finestra stretta'),
    sentence: L('Çatıdaki yağmur düzenli, ben içerideyim.', 'Rain on the roof is even; I am inside.', 'La lluvia en el techo es regular; estoy dentro.', 'La pluie sur le toit est régulière ; je suis dedans.', 'Der Regen auf dem Dach ist gleichmäßig; ich bin innen.', 'La pioggia sul tetto è regolare; sono dentro.'),
    nightSeed: L('Tahta koku, damla, dar cam.', 'Wood smell, drop, narrow glass.', 'Olor a madera, gota, cristal estrecho.', 'Odeur de bois, goutte, verre étroit.', 'Holzgeruch, Tropfen, schmales Glas.', 'Odore di legno, goccia, vetro stretto.'),
    body: L(
      'Çatı katı. Tavan alçak, tahta kokusu. Yağmur yukarıda, damla düzenli. Dar pencere, buğu. Sandık, battaniye, sarı lamba. Sandığı açmıyorsun. Yağmur hikâye anlatmıyor. Güvenli bir darlık. Tohum: tahta, damla, dar cam. Bırak. Çatıyı tamir etmeyeceksin.',
      'Attic. Low ceiling, wood smell. Rain above, even drops. Narrow window, fog. A chest, a blanket, a yellow lamp. You do not open the chest. Rain tells no story. A safe narrowness. Seed: wood, drop, narrow glass. Release. You will not mend the roof.',
      'Desván. Techo bajo, olor a madera. Lluvia arriba, gotas regulares. Ventana estrecha, vaho. Un baúl, una manta, lámpara amarilla. No abres el baúl. La lluvia no cuenta. Una estrechez segura. Semilla: madera, gota, cristal estrecho. Suelta. No repararás el techo.',
      'Combles. Plafond bas, odeur de bois. Pluie au-dessus, gouttes régulières. Fenêtre étroite, buée. Un coffre, une couverture, lampe jaune. Tu n’ouvres pas le coffre. La pluie ne raconte rien. Un étroit sûr. Graine : bois, goutte, verre étroit. Lâche. Tu ne répareras pas le toit.',
      'Dachkammer. Niedrige Decke, Holzgeruch. Regen oben, gleichmäßige Tropfen. Schmales Fenster, Beschlag. Eine Truhe, eine Decke, gelbe Lampe. Du öffnest die Truhe nicht. Der Regen erzählt nichts. Eine sichere Enge. Samen: Holz, Tropfen, schmales Glas. Loslassen. Du flickst das Dach nicht.',
      'Soffitta. Soffitto basso, odore di legno. Pioggia sopra, gocce regolari. Finestra stretta, foschia. Un baule, una coperta, lampada gialla. Non apri il baule. La pioggia non racconta. Una strettezza sicura. Seme: legno, goccia, vetro stretto. Rilascia. Non riparerai il tetto.',
    ),
  },
}

function short(
  id: string,
  title: ReturnType<typeof L>,
  subtitle: ReturnType<typeof L>,
  sentence: ReturnType<typeof L>,
  body: ReturnType<typeof L>,
  nightSeed?: ReturnType<typeof L>,
) {
  PACK[id] = { title, subtitle, sentence, body, nightSeed }
}

short(
  'after-wave',
  L('Dalga indikten sonra', 'After the wave', 'Después de la ola', 'Après la vague', 'Nach der Welle', 'Dopo l’onda'),
  L('Üç satır, abartısız', 'Three lines, no extra', 'Tres líneas, sin extra', 'Trois lignes, sans extra', 'Drei Zeilen, ohne Extra', 'Tre righe, senza extra'),
  L('Dalga indi, ben satırdayım.', 'The wave dropped; I am on the line.', 'La ola bajó; estoy en la línea.', 'La vague est redescendue ; je suis sur la ligne.', 'Die Welle fiel; ich bin auf der Zeile.', 'L’onda è scesa; sono sulla riga.'),
  L(
    'Kalem. Üç başlık, her birine iki cümle. 1. Beden: nerede bir milim yumuşak. 2. Oda: bir nesne adı. 3. Şükran: küçük ve gerçek. Yorum yok. Defteri kapat. Bırakış: bunu rapor yapma.',
    'Pen. Three headings, two sentences each. 1. Body: where one millimeter is softer. 2. Room: one object name. 3. Thanks: small and real. No commentary. Close the notebook. Release: do not make this a report.',
    'Lápiz. Tres títulos, dos frases cada uno. 1. Cuerpo: dónde hay un milímetro más blando. 2. Habitación: un objeto. 3. Gracia: pequeña y real. Sin comentario. Cierra. Suelta: no lo conviertas en informe.',
    'Stylo. Trois titres, deux phrases chacun. 1. Corps : où un millimètre est plus doux. 2. Pièce : un objet. 3. Merci : petit et vrai. Pas de commentaire. Ferme. Lâche : n’en fais pas un rapport.',
    'Stift. Drei Überschriften, je zwei Sätze. 1. Körper: wo ein Millimeter weicher ist. 2. Raum: ein Gegenstand. 3. Dank: klein und wahr. Kein Kommentar. Zu. Loslassen: mach keinen Bericht daraus.',
    'Penna. Tre titoli, due frasi ciascuno. 1. Corpo: dove un millimetro è più morbido. 2. Stanza: un oggetto. 3. Grazie: piccolo e vero. Niente commento. Chiudi. Rilascia: non farne un verbale.',
  ),
)

short(
  'worry-window',
  L('Kaygı penceresi', 'Worry window', 'Ventana de preocupación', 'Fenêtre d’inquiétude', 'Sorgenfenster', 'Finestra di preoccupazione'),
  L('On dakika, sonra kapalı', 'Ten minutes, then shut', 'Diez minutos, luego cerrado', 'Dix minutes, puis fermé', 'Zehn Minuten, dann zu', 'Dieci minuti, poi chiuso'),
  L('Pencere kapandı, ben odadayım.', 'The window shut; I am in the room.', 'La ventana se cerró; estoy en la habitación.', 'La fenêtre s’est fermée ; je suis dans la pièce.', 'Das Fenster schloss; ich bin im Raum.', 'La finestra si è chiusa; sono nella stanza.'),
  L(
    'On dakika tut. Kaygıyı yok etme; süre ver. Yaz: ne korkutuyor, ne kontrol, hangisi bugün çözülmez. Bitince: “Pencere kapandı.” Defteri kapat.',
    'Hold ten minutes. Do not erase worry; give it a slot. Write: what scares you, what you try to control, what will not solve today. Then: “The window shut.” Close the notebook.',
    'Diez minutos. No borres la preocupación; dale un hueco. Escribe: qué asusta, qué controlas, qué no se resuelve hoy. Luego: “La ventana se cerró.” Cierra.',
    'Dix minutes. N’efface pas l’inquiétude ; donne-lui un créneau. Écris : ce qui fait peur, ce que tu contrôles, ce qui ne se règle pas aujourd’hui. Puis : « La fenêtre s’est fermée. » Ferme.',
    'Zehn Minuten. Lösche die Sorge nicht; gib ihr ein Fenster. Schreib: was Angst macht, was du steuerst, was heute nicht lösbar ist. Dann: „Das Fenster ist zu.“ Zu.',
    'Dieci minuti. Non cancellare la preoccupazione; dagli uno slot. Scrivi: cosa spaventa, cosa controlli, cosa oggi non si risolve. Poi: «La finestra si è chiusa.» Chiudi.',
  ),
)

short(
  'edges',
  L('Kenar envanteri', 'Edge inventory', 'Inventario de bordes', 'Inventaire des bords', 'Kanteninventar', 'Inventario dei bordi'),
  L('DR için nesne listesi', 'Object list for DR', 'Lista de objetos para DR', 'Liste d’objets pour la DR', 'Objektliste für DR', 'Lista di oggetti per la DR'),
  L('Kenarlar duruyor, ben sayıyorum.', 'The edges stay; I name them.', 'Los bordes siguen; los nombro.', 'Les bords restent ; je les nomme.', 'Die Kanten bleiben; ich nenne sie.', 'I bordi restano; li nomino.'),
  L(
    'Beş nesne, üç doku, bir ısı, bir ses. Yüksek sesle oku, sonra yaz. “Sanki” yok. İsim ve duyusal veri. Bırakış: sisle tartışma.',
    'Five objects, three textures, one heat, one sound. Read aloud, then write. No “as if”. Names and sense data. Release: do not argue with fog.',
    'Cinco objetos, tres texturas, un calor, un sonido. Lee en voz alta, luego escribe. Sin “como si”. Nombre y dato. Suelta: no discutas con la niebla.',
    'Cinq objets, trois textures, une chaleur, un son. Lis à voix haute, puis écris. Pas de « comme si ». Nom et donnée. Lâche : ne discute pas avec le brouillard.',
    'Fünf Dinge, drei Texturen, eine Wärme, ein Klang. Laut lesen, dann schreiben. Kein „als ob“. Name und Sinn. Loslassen: streite nicht mit dem Nebel.',
    'Cinque oggetti, tre trame, un calore, un suono. Leggi ad alta voce, poi scrivi. Niente «come se». Nome e dato. Rilascia: non discutere con la nebbia.',
  ),
)

short(
  'weight',
  L('Ağırlık notu', 'Weight note', 'Nota de peso', 'Note de poids', 'Gewichtsnotiz', 'Nota di peso'),
  L('DP için basınç', 'Pressure for DP', 'Presión para DP', 'Pression pour la DP', 'Druck für DP', 'Pressione per la DP'),
  L('Basınç var, ben içerdeyim.', 'There is pressure; I am inside.', 'Hay presión; estoy dentro.', 'Il y a une pression ; je suis dedans.', 'Es gibt Druck; ich bin innen.', 'C’è pressione; sono dentro.'),
  L(
    'Dört nokta: sol oturak, sağ oturak, sırt, ayaklar. “Var” veya “az”. Yok deme. Ad, tarih, şehir. Bırakış: ayna yok bu sayfada.',
    'Four points: left seat, right seat, back, feet. “There” or “less”. Do not write none. Name, date, city. Release: no mirror on this page.',
    'Cuatro puntos: asiento izquierdo, derecho, espalda, pies. “Hay” o “poco”. No escribas nada. Nombre, fecha, ciudad. Suelta: sin espejo.',
    'Quatre points : siège gauche, droit, dos, pieds. « Il y a » ou « peu ». N’écris pas néant. Nom, date, ville. Lâche : pas de miroir.',
    'Vier Punkte: Sitz links, rechts, Rücken, Füße. „Da“ oder „weniger“. Schreib nicht nichts. Name, Datum, Stadt. Loslassen: kein Spiegel.',
    'Quattro punti: sedile sinistro, destro, schiena, piedi. «C’è» o «poco». Non scrivere zero. Nome, data, città. Rilascia: niente specchio.',
  ),
)

short(
  'gratitude-small',
  L('Küçük şükran', 'Small thanks', 'Gracia pequeña', 'Petit merci', 'Kleiner Dank', 'Piccolo grazie'),
  L('Üç somut şey', 'Three concrete things', 'Tres cosas concretas', 'Trois choses concrètes', 'Drei konkrete Dinge', 'Tre cose concrete'),
  L('Üç küçük şey bugün yeter.', 'Three small things are enough today.', 'Tres cosas pequeñas bastan hoy.', 'Trois petites choses suffisent aujourd’hui.', 'Drei kleine Dinge reichen heute.', 'Tre piccole cose bastano oggi.'),
  L(
    'Üç satır. Nesne veya milim rahatlık. Abartı yok. Su, yer, nefes, bir kişi, bir kumaş. Kapat. Bırak.',
    'Three lines. An object or a millimeter of ease. No grandeur. Water, floor, breath, a person, a cloth. Close. Release.',
    'Tres líneas. Un objeto o un milímetro de alivio. Sin grandeza. Agua, suelo, aliento, una persona, una tela. Cierra. Suelta.',
    'Trois lignes. Un objet ou un millimètre de soulagement. Pas de grandeur. Eau, sol, souffle, une personne, un tissu. Ferme. Lâche.',
    'Drei Zeilen. Ein Ding oder ein Millimeter Erleichterung. Keine Größe. Wasser, Boden, Atem, ein Mensch, ein Stoff. Zu. Loslassen.',
    'Tre righe. Un oggetto o un millimetro di sollievo. Niente grandezza. Acqua, pavimento, respiro, una persona, un tessuto. Chiudi. Rilascia.',
  ),
)

short(
  'night-seed-note',
  L('Tohum kâğıdı', 'Seed paper', 'Papel semilla', 'Papier graine', 'Samenpapier', 'Carta seme'),
  L('Uykudan önce tek kare', 'One frame before sleep', 'Un fotograma antes de dormir', 'Un cadre avant le sommeil', 'Ein Bild vor dem Schlaf', 'Un fotogramma prima del sonno'),
  L('Tek kareyi geceye bırakıyorum.', 'I leave one frame to the night.', 'Dejo un fotograma a la noche.', 'Je laisse un cadre à la nuit.', 'Ich lasse der Nacht ein Bild.', 'Lascio un fotogramma alla notte.'),
  L(
    'Bir cümle, bir sahne. Film değil. “Kapalı bahçe, ılık taş, kandil.” Kağıdı katla, telefonu ters çevir. Bırakış zorunlu.',
    'One sentence, one scene. Not a film. “Closed garden, warm stone, lamp.” Fold the paper, turn the phone. Release is required.',
    'Una frase, una escena. No es cine. “Jardín cerrado, piedra tibia, lámpara.” Dobla el papel, gira el teléfono. Soltar es obligatorio.',
    'Une phrase, une scène. Pas un film. « Jardin fermé, pierre tiède, lampe. » Plie le papier, retourne le téléphone. Lâcher est obligatoire.',
    'Ein Satz, eine Szene. Kein Film. „Geschlossener Garten, warmer Stein, Lampe.“ Papier falten, Telefon umdrehen. Loslassen ist Pflicht.',
    'Una frase, una scena. Non un film. «Giardino chiuso, pietra tiepida, lampada.» Piega il foglio, gira il telefono. Rilasciare è obbligatorio.',
  ),
)

short(
  'unsend',
  L('Gönderilmeyen mektup', 'Unsent letter', 'Carta no enviada', 'Lettre non envoyée', 'Ungesendeter Brief', 'Lettera non inviata'),
  L('Zihindeki mahkemeyi kapat', 'Close the court in the mind', 'Cierra el tribunal de la mente', 'Ferme le tribunal de l’esprit', 'Schließ das Gericht im Kopf', 'Chiudi il tribunale nella mente'),
  L('Mektup yazıldı, gönderilmedi, ben buradayım.', 'The letter was written, not sent; I am here.', 'La carta se escribió, no se envió; estoy aquí.', 'La lettre a été écrite, pas envoyée ; je suis ici.', 'Der Brief wurde geschrieben, nicht gesendet; ich bin hier.', 'La lettera è stata scritta, non inviata; sono qui.'),
  L(
    'Birine veya kendine. Gönderilmeyecek. Son paragraf: “Bunu bu gece çözmeyeceğim.” Kapat. Bırakış: mahkeme yarın kurulmayabilir.',
    'To someone or yourself. It will not be sent. Last paragraph: “I will not solve this tonight.” Close. Release: court may not sit tomorrow.',
    'A alguien o a ti. No se enviará. Último párrafo: “Esto no lo resuelvo esta noche.” Cierra. Suelta: el tribunal puede no reunirse mañana.',
    'À quelqu’un ou à toi. Elle ne partira pas. Dernier paragraphe : « Je ne réglerai pas ça ce soir. » Ferme. Lâche : le tribunal peut ne pas siéger demain.',
    'An jemanden oder dich. Er geht nicht raus. Letzter Absatz: „Das löse ich diese Nacht nicht.“ Zu. Loslassen: das Gericht muss morgen nicht tagen.',
    'A qualcuno o a te. Non partirà. Ultimo paragrafo: «Non lo risolvo stanotte.» Chiudi. Rilascia: il tribunale potrebbe non riunirsi domani.',
  ),
)

short(
  'three-colors',
  L('Üç renk', 'Three colors', 'Tres colores', 'Trois couleurs', 'Drei Farben', 'Tre colori'),
  L('Odadan üç ad', 'Three names from the room', 'Tres nombres de la habitación', 'Trois noms dans la pièce', 'Drei Namen aus dem Raum', 'Tre nomi dalla stanza'),
  L('Üç renk odada, ben de odadayım.', 'Three colors in the room, and I am too.', 'Tres colores en la habitación, y yo también.', 'Trois couleurs dans la pièce, et moi aussi.', 'Drei Farben im Raum, und ich auch.', 'Tre colori nella stanza, e io pure.'),
  L(
    'Üç satır. Her satır bir renk ve nesnesi. “Mavi — kupa.” Sıfat yok. Bir kez sesli oku. Kapat. Bırakış: paleti tamamlamayacaksın.',
    'Three lines. Each line a color and its object. “Blue — cup.” No adjectives. Read once aloud. Close. Release: you will not finish a palette.',
    'Tres líneas. Cada una un color y su objeto. “Azul — taza.” Sin adjetivos. Lee una vez. Cierra. Suelta: no completarás una paleta.',
    'Trois lignes. Chacune une couleur et son objet. « Bleu — tasse. » Pas d’adjectifs. Lis une fois. Ferme. Lâche : tu ne finiras pas une palette.',
    'Drei Zeilen. Jede eine Farbe und ihr Ding. „Blau — Tasse.“ Keine Adjektive. Einmal laut. Zu. Loslassen: du machst keine Palette fertig.',
    'Tre righe. Ognuna un colore e il suo oggetto. «Blu — tazza.» Niente aggettivi. Leggi una volta. Chiudi. Rilascia: non completerai una tavolozza.',
  ),
)

short(
  'safe-list',
  L('Güvenli liste', 'Safe list', 'Lista segura', 'Liste sûre', 'Sichere Liste', 'Lista sicura'),
  L('Beş somut şey', 'Five concrete things', 'Cinco cosas concretas', 'Cinq choses concrètes', 'Fünf konkrete Dinge', 'Cinque cose concrete'),
  L('Liste duruyor, ben duruyorum.', 'The list stands, and I stand.', 'La lista está, y yo estoy.', 'La liste tient, et je tiens.', 'Die Liste steht, und ich stehe.', 'La lista sta, e io sto.'),
  L(
    'Beş satır: yer, su, bir kişi veya kumaş, bir ses, bir ısı. Bugün erişilir. Yarın değil. Kapat. Bırakış: listeyi dua etme.',
    'Five lines: ground, water, a person or a cloth, a sound, a heat. Reachable today. Not tomorrow. Close. Release: do not pray the list.',
    'Cinco líneas: suelo, agua, una persona o una tela, un sonido, un calor. Accesible hoy. No mañana. Cierra. Suelta: no reces la lista.',
    'Cinq lignes : sol, eau, une personne ou un tissu, un son, une chaleur. Accessible aujourd’hui. Pas demain. Ferme. Lâche : ne prie pas la liste.',
    'Fünf Zeilen: Boden, Wasser, ein Mensch oder ein Stoff, ein Klang, eine Wärme. Heute erreichbar. Nicht morgen. Zu. Loslassen: bete die Liste nicht.',
    'Cinque righe: suolo, acqua, una persona o un tessuto, un suono, un calore. Raggiungibile oggi. Non domani. Chiudi. Rilascia: non pregare la lista.',
  ),
)

const med = (
  id: string,
  title: ReturnType<typeof L>,
  subtitle: ReturnType<typeof L>,
  sentence: ReturnType<typeof L>,
  body: ReturnType<typeof L>,
  nightSeed?: ReturnType<typeof L>,
) => short(id, title, subtitle, sentence, body, nightSeed)

med(
  'body-drop',
  L('Beden bırakışı', 'Body release', 'Soltar el cuerpo', 'Lâcher le corps', 'Körper loslassen', 'Rilascio del corpo'),
  L('Tepeden tabana, zorlamadan', 'From crown to sole, no force', 'De la coronilla a la planta, sin fuerza', 'Du sommet à la plante, sans forcer', 'Vom Scheitel zur Sohle, ohne Zwang', 'Dalla testa alla pianta, senza forza'),
  L('Bedenim katman katman iniyor.', 'My body drops layer by layer.', 'Mi cuerpo baja capa a capa.', 'Mon corps descend couche par couche.', 'Mein Körper sinkt Schicht um Schicht.', 'Il corpo scende strato dopo strato.'),
  L(
    'Otur veya yat. Alın, kaş, kapak, yanak, çene, dil, boğaz, omuz, kol, avuç, göğüs, karın, bel, kalça, uyluk, diz, baldır, taban. Her bölgede bir nefes. “Rahatla” emri yok. Sadece ad ve bırakış.',
    'This is not a treatment. Sit or lie down. Notice the forehead. The eyelids may be heavy. Stay for three breaths. Soften the jaw. Shoulders can drop a millimetre. Palms rest. The chest moves on its own. The belly is allowed to be soft. Soles on the ground. Stay for three breaths. No command to relax. Name a place in the body and let it be. The sentence is: my body drops layer by layer.',
    'Esto no es un tratamiento. Siéntate o acuéstate. Frente, párpados, mandíbula, hombros, palmas, pecho, vientre, plantas. Quédate tres respiraciones. Sin orden de relajarte. Nombra y suelta.',
    'Ce n’est pas un traitement. Assieds-toi ou allonge-toi. Front, paupières, mâchoire, épaules, paumes, poitrine, ventre, plantes. Reste trois souffles. Pas d’ordre de te détendre. Nomme et lâche.',
    'Das ist keine Behandlung. Sitz oder lieg. Stirn, Lider, Kiefer, Schultern, Handflächen, Brust, Bauch, Sohlen. Bleib drei Atemzüge. Kein Befehl zum Entspannen. Nenne und lass los.',
    'Non è una cura. Siediti o sdraiati. Fronte, palpebre, mascella, spalle, palmi, petto, ventre, piante. Resta tre respiri. Niente ordine di rilassarti. Nomina e lascia.',
  ),
)

med(
  'known-room',
  L('Bilinen oda', 'Known room', 'Habitación conocida', 'Pièce connue', 'Bekannter Raum', 'Stanza nota'),
  L('İcat yok, hafıza var', 'No invention, memory only', 'Sin inventar, solo memoria', 'Pas d’invention, seulement la mémoire', 'Keine Erfindung, nur Erinnerung', 'Niente invenzione, solo memoria'),
  L('Bildiğim odadayım, kapı yerinde.', 'I am in a room I know; the door is in place.', 'Estoy en una habitación que conozco; la puerta está.', 'Je suis dans une pièce que je connais ; la porte est là.', 'Ich bin in einem Raum, den ich kenne; die Tür ist da.', 'Sono in una stanza che conosco; la porta c’è.'),
  L(
    'Gerçek bir oda. Kapı, pencere, yer, koku, ses. Üç nesne yeter. Bırakış: odayı dekore etme. Şükran: bu kapı.',
    'This is not a treatment. Choose a room you know. See the door. See the window. Name the floor. Stay for three breaths. Three objects are enough. You will not redecorate. Thanks for this door.',
    'Esto no es un tratamiento. Una habitación que conoces. Puerta, ventana, suelo. Quédate tres respiraciones. Tres objetos bastan. No redecorar.',
    'Ce n’est pas un traitement. Une pièce que tu connais. Porte, fenêtre, sol. Reste trois souffles. Trois objets suffisent. Ne redécore pas.',
    'Das ist keine Behandlung. Ein Raum, den du kennst. Tür, Fenster, Boden. Bleib drei Atemzüge. Drei Dinge reichen. Nicht umdekorieren.',
    'Non è una cura. Una stanza che conosci. Porta, finestra, pavimento. Resta tre respiri. Tre oggetti bastano. Non arredare di nuovo.',
  ),
)

med(
  'shore-sit',
  L('Kıyıda oturuş', 'Sitting on the shore', 'Sentado en la orilla', 'Assis sur le rivage', 'Am Ufer sitzen', 'Seduto sulla riva'),
  L('Dalga metaforu, deniz zorunlu değil', 'Wave image, sea not required', 'Imagen de ola, el mar no es obligatorio', 'Image de vague, mer non obligatoire', 'Wellenbild, Meer nicht nötig', 'Immagine d’onda, mare non obbligatorio'),
  L('Kıyıdayım, dalga bana ait değil.', 'I am on the shore; the wave is not mine.', 'Estoy en la orilla; la ola no es mía.', 'Je suis sur le rivage ; la vague n’est pas à moi.', 'Ich bin am Ufer; die Welle gehört mir nicht.', 'Sono sulla riva; l’onda non è mia.'),
  L(
    'İskele veya taş. Dalga gelir, iskele kalır. Sen iskelesin. Veriş uzun olabilir. Zorlama. Tohum: ıslak tahta, çekilmiş su. Bırak.',
    'This is not a treatment. A pier or a stone. The wave comes. The pier stays. You are the pier. Stay for three breaths. The exhale may be long. No force. Seed: wet wood, drawn water.',
    'Esto no es un tratamiento. Un muelle o una piedra. La ola llega; el muelle queda. Eres el muelle. Quédate tres respiraciones. Sin fuerza.',
    'Ce n’est pas un traitement. Un ponton ou une pierre. La vague vient ; le ponton reste. Tu es le ponton. Reste trois souffles. Sans forcer.',
    'Das ist keine Behandlung. Steg oder Stein. Die Welle kommt; der Steg bleibt. Du bist der Steg. Bleib drei Atemzüge. Kein Zwang.',
    'Non è una cura. Un molo o una pietra. L’onda arriva; il molo resta. Sei il molo. Resta tre respiri. Senza forza.',
  ),
)

med(
  'hands-pulse',
  L('El ve nabız', 'Hand and pulse', 'Mano y pulso', 'Main et pouls', 'Hand und Puls', 'Mano e polso'),
  L('DP yatağı, ayna yok', 'DP bed, no mirror', 'Cama DP, sin espejo', 'Lit DP, pas de miroir', 'DP-Bett, kein Spiegel', 'Letto DP, niente specchio'),
  L('Nabzım içeride, ellerim bende.', 'The pulse is inside; the hands are mine.', 'El pulso está dentro; las manos son mías.', 'Le pouls est dedans ; les mains sont à moi.', 'Der Puls ist innen; die Hände sind meine.', 'Il polso è dentro; le mani sono mie.'),
  L(
    'İki el, bir bilek. Nabız varsa sayma; varlığını fark et. Yoksa ısı yeter. Adını fısılda. Bırakış: nabzı kanıt yapma.',
    'Two hands, one wrist. If you find a pulse, do not count; notice it is there. If not, heat is enough. Whisper your name. Release: do not make the pulse a proof.',
    'Dos manos, una muñeca. Si hay pulso, no cuentes; nota que está. Si no, el calor basta. Susurra tu nombre. Suelta: no hagas del pulso una prueba.',
    'Deux mains, un poignet. S’il y a un pouls, ne compte pas ; note qu’il est là. Sinon la chaleur suffit. Chuchote ton nom. Lâche : n’en fais pas une preuve.',
    'Zwei Hände, ein Handgelenk. Wenn Puls da ist, nicht zählen; merke, dass er da ist. Wenn nicht, Wärme reicht. Flüstere deinen Namen. Loslassen: mach den Puls nicht zum Beweis.',
    'Due mani, un polso. Se c’è un battito, non contare; nota che c’è. Se no, il calore basta. Sussurra il tuo nome. Rilascia: non fare del polso una prova.',
  ),
)

med(
  'window-light',
  L('Pencere ışığı', 'Window light', 'Luz de la ventana', 'Lumière de fenêtre', 'Fensterlicht', 'Luce della finestra'),
  L('DR yatağı, yön sayımı', 'DR bed, name the direction', 'Cama DR, nombra la dirección', 'Lit DR, nomme la direction', 'DR-Bett, nenne die Richtung', 'Letto DR, nomina la direzione'),
  L('Işık bir yerden geliyor.', 'Light is coming from somewhere.', 'La luz viene de algún sitio.', 'La lumière vient de quelque part.', 'Licht kommt von irgendwo.', 'La luce arriva da qualche parte.'),
  L(
    'Gözler yumuşak. Işığın yönü. Gölgenin yönü. Perde ağır mı. Kenar çiz. Sis yorumu yok. Şükran: bu yön. Bırakış: netleştirme.',
    'Soft eyes. Direction of light. Direction of shadow. Is the curtain heavy. Draw an edge. No fog story. Thanks: this direction. Release: do not sharpen the image.',
    'Ojos suaves. Dirección de la luz. De la sombra. ¿La cortina es pesada? Dibuja un borde. Sin historia de niebla. Gracia: esta dirección. Suelta: no nitidez.',
    'Yeux doux. Direction de la lumière. De l’ombre. Le rideau est-il lourd. Trace un bord. Pas d’histoire de brouillard. Merci : cette direction. Lâche : ne nettoie pas l’image.',
    'Weiche Augen. Richtung des Lichts. Des Schattens. Ist der Vorhang schwer. Eine Kante ziehen. Keine Nebelgeschichte. Dank: diese Richtung. Loslassen: das Bild nicht schärfen.',
    'Occhi morbidi. Direzione della luce. Dell’ombra. La tenda è pesante? Traccia un bordo. Niente storia di nebbia. Grazie: questa direzione. Rilascia: non mettere a fuoco.',
  ),
)

med(
  'seed-only',
  L('Yalnız tohum', 'Seed only', 'Solo semilla', 'Graine seule', 'Nur Samen', 'Solo seme'),
  L('Tek kare, film yok', 'One frame, no film', 'Un fotograma, sin película', 'Un cadre, pas de film', 'Ein Bild, kein Film', 'Un fotogramma, niente film'),
  L('Tohumu geceye bırakıyorum.', 'I leave the seed to the night.', 'Dejo la semilla a la noche.', 'Je laisse la graine à la nuit.', 'Ich lasse den Samen der Nacht.', 'Lascio il seme alla notte.'),
  L(
    'Çene, omuz, karın. Bir cümle. Tek sahne: kapalı bahçe, ılık taş, kandil. Tekrar etme. Bırak. Uyu.',
    'Jaw, shoulder, belly. One sentence. One scene: closed garden, warm stone, lamp. Do not repeat. Release. Sleep.',
    'Mandíbula, hombro, vientre. Una frase. Una escena: jardín cerrado, piedra tibia, lámpara. No repitas. Suelta. Duerme.',
    'Mâchoire, épaule, ventre. Une phrase. Une scène : jardin fermé, pierre tiède, lampe. Ne répète pas. Lâche. Dors.',
    'Kiefer, Schulter, Bauch. Ein Satz. Eine Szene: geschlossener Garten, warmer Stein, Lampe. Nicht wiederholen. Loslassen. Schlafen.',
    'Mascella, spalla, ventre. Una frase. Una scena: giardino chiuso, pietra tiepida, lampada. Non ripetere. Rilascia. Dormi.',
  ),
  L('Kapalı bahçe, ılık taş, kandil.', 'Closed garden, warm stone, lamp.', 'Jardín cerrado, piedra tibia, lámpara.', 'Jardin fermé, pierre tiède, lampe.', 'Geschlossener Garten, warmer Stein, Lampe.', 'Giardino chiuso, pietra tiepida, lampada.'),
)

med(
  'warm-stone',
  L('Avuçta taş', 'Stone in the palm', 'Piedra en la palma', 'Pierre dans la paume', 'Stein in der Handfläche', 'Pietra nel palmo'),
  L('Ağırlık, ısı, kenar', 'Weight, heat, edge', 'Peso, calor, borde', 'Poids, chaleur, bord', 'Gewicht, Wärme, Kante', 'Peso, calore, bordo'),
  L('Taş avucumda, ben buradayım.', 'A stone in my palm; I am here.', 'Una piedra en la palma; estoy aquí.', 'Une pierre dans la paume ; je suis ici.', 'Ein Stein in der Handfläche; ich bin hier.', 'Una pietra nel palmo; sono qui.'),
  L(
    'Bir taş, anahtar veya kupa. Avuç. Ağırlık. Kenar. Isı. Zihin hikâye uydurursa nesneye dön. Bırakış: taşı kanıt yapma.',
    'A stone, a key, or a cup. Palm. Weight. Edge. Heat. If the mind makes a story, return to the object. Release: do not make the stone a proof.',
    'Una piedra, una llave o una taza. Palma. Peso. Borde. Calor. Si la mente inventa, vuelve al objeto. Suelta: no hagas de la piedra una prueba.',
    'Une pierre, une clé ou une tasse. Paume. Poids. Bord. Chaleur. Si l’esprit invente, reviens à l’objet. Lâche : n’en fais pas une preuve.',
    'Ein Stein, ein Schlüssel oder eine Tasse. Handfläche. Gewicht. Kante. Wärme. Wenn der Kopf eine Geschichte baut, zurück zum Ding. Loslassen: mach den Stein nicht zum Beweis.',
    'Una pietra, una chiave o una tazza. Palmo. Peso. Bordo. Calore. Se la mente inventa, torna all’oggetto. Rilascia: non fare della pietra una prova.',
  ),
)

med(
  'feet-press',
  L('Taban basışı', 'Sole press', 'Presión de la planta', 'Pression de la plante', 'Sohlendruck', 'Pressione della pianta'),
  L('İki ayak, yer, sayı yok', 'Two feet, ground, no count', 'Dos pies, suelo, sin cuenta', 'Deux pieds, sol, sans compte', 'Zwei Füße, Boden, keine Zahl', 'Due piedi, suolo, senza conto'),
  L('Tabanlarım yerde, yer beni tutuyor.', 'Soles on the ground; the ground holds me.', 'Plantas en el suelo; el suelo me sostiene.', 'Plantes au sol ; le sol me tient.', 'Sohlen am Boden; der Boden hält mich.', 'Piante a terra; il suolo mi tiene.'),
  L(
    'İki tabanı yere bas. Topuk, kemer, parmak. Sayı yok. On nefes. Her verişte milim daha ağırlık. Bırakış: yarış yok. Şükran: bu yer.',
    'Press both soles into the floor. Heel, arch, toes. No count. Ten breaths. On each exhale a millimeter more weight. Release: no race. Thanks: this ground.',
    'Presiona las dos plantas. Talón, arco, dedos. Sin cuenta. Diez alientos. En cada exhalación un milímetro más. Suelta: no hay carrera. Gracia: este suelo.',
    'Pose les deux plantes. Talon, voûte, orteils. Pas de compte. Dix souffles. À chaque expiration un millimètre de plus. Lâche : pas de course. Merci : ce sol.',
    'Beide Sohlen in den Boden. Ferse, Gewölbe, Zehen. Keine Zahl. Zehn Atem. Beim Ausatmen ein Millimeter mehr. Loslassen: kein Wettkampf. Dank: dieser Boden.',
    'Spingi entrambe le piante. Tallone, arco, dita. Niente conto. Dieci respiri. A ogni espirazione un millimetro in più. Rilascia: niente gara. Grazie: questo suolo.',
  ),
)

function lab(
  id: string,
  title: ReturnType<typeof L>,
  subtitle: ReturnType<typeof L>,
  sentence: ReturnType<typeof L>,
  body: ReturnType<typeof L>,
  nightSeed: ReturnType<typeof L>,
) {
  short(id, title, subtitle, sentence, body, nightSeed)
}

lab(
  'lab-1',
  L('1. gece — Yatak iş yeri değil', 'Night 1 — Bed is not a desk', 'Noche 1 — La cama no es un despacho', 'Nuit 1 — Le lit n’est pas un bureau', 'Nacht 1 — Das Bett ist kein Schreibtisch', 'Notte 1 — Il letto non è una scrivania'),
  L('Uyaran denetimi, sade kural', 'Stimulus control, a plain rule', 'Control de estímulos, regla simple', 'Contrôle des stimuli, règle simple', 'Reizkontrolle, schlichte Regel', 'Controllo degli stimoli, regola semplice'),
  L('Yatak uykuya, oda karanlık.', 'The bed is for sleep; the room is dark.', 'La cama es para dormir; la habitación está oscura.', 'Le lit est pour le sommeil ; la pièce est sombre.', 'Das Bett ist für Schlaf; der Raum ist dunkel.', 'Il letto è per il sonno; la stanza è buia.'),
  L(
    'Yatakta plan, tartışma, kaydırma yok. Uyku gelmezse kalk, loş başka köşede sıkıcı bir şey, uykuluk gelince dön. Bırakış: bu geceyi performans yapma.',
    'No plans, arguments, or scrolling in bed. If sleep does not come, get up, do something dull in a dim corner, return when sleepy. Release: do not make tonight a performance.',
    'En la cama no hay planes, discusiones ni pantalla. Si no llega el sueño, levántate, algo aburrido en un rincón tenue, vuelve con sueño. Suelta: no hagas de esta noche un acto.',
    'Pas de plans, de disputes ni de défilement au lit. Si le sommeil ne vient pas, lève-toi, quelque chose d’ennuyeux dans un coin sombre, reviens quand tu somnoles. Lâche : n’en fais pas un spectacle.',
    'Im Bett keine Pläne, Streit, kein Scrollen. Kommt der Schlaf nicht, aufstehen, etwas Langweiliges in einer dunklen Ecke, zurück wenn müde. Loslassen: mach keine Show aus der Nacht.',
    'A letto niente piani, litigi, scorrimento. Se il sonno non viene, alzati, qualcosa di noioso in un angolo fioco, torna quando viene sonno. Rilascia: non fare di stanotte uno spettacolo.',
  ),
  L('Kapalı kapı, sönük lamba, ağır yorgan.', 'Closed door, low lamp, heavy blanket.', 'Puerta cerrada, lámpara baja, manta pesada.', 'Porte fermée, lampe basse, couverture lourde.', 'Geschlossene Tür, schwache Lampe, schwere Decke.', 'Porta chiusa, lampada bassa, coperta pesante.'),
)

lab(
  'lab-2',
  L('2. gece — Kalkış saati', 'Night 2 — Wake time', 'Noche 2 — Hora de levantarse', 'Nuit 2 — Heure de lever', 'Nacht 2 — Aufstehzeit', 'Notte 2 — Ora del risveglio'),
  L('Sabah çipası', 'Morning anchor', 'Ancla de mañana', 'Ancre du matin', 'Morgenanker', 'Ancora del mattino'),
  L('Sabah saati sabit, gece ona yaslanır.', 'Morning hour is fixed; night leans on it.', 'La hora de la mañana es fija; la noche se apoya en ella.', 'L’heure du matin est fixe ; la nuit s’y appuie.', 'Die Morgenstunde steht; die Nacht lehnt sich daran.', 'L’ora del mattino è fissa; la notte si appoggia lì.'),
  L(
    'Yatış esner, kalkış mümkün olduğunca sabit. Ceza değil, kıyı. Bırakış: telafi uykusuyla şişirme.',
    'Bedtime can flex; wake time stays as steady as you can. Not a punishment, a shore. Release: do not inflate the night with catch-up sleep.',
    'La hora de acostarse puede ceder; la de levantarse se mantiene. No es un castigo, una orilla. Suelta: no hinches la noche con sueño de compensación.',
    'L’heure du coucher peut bouger ; celle du lever reste. Pas une punition, une rive. Lâche : ne gonfle pas la nuit avec du rattrapage.',
    'Schlafenszeit darf sich dehnen; Aufstehen bleibt. Keine Strafe, ein Ufer. Loslassen: die Nacht nicht mit Nachholschlaf aufblasen.',
    'L’ora di coricarsi può piegarsi; quella del risveglio resta. Non è una pena, una riva. Rilascia: non gonfiare la notte con il recupero.',
  ),
  L('Pencere, erken ışık, aynı saat.', 'Window, early light, the same hour.', 'Ventana, luz temprana, la misma hora.', 'Fenêtre, lumière tôt, la même heure.', 'Fenster, frühes Licht, dieselbe Stunde.', 'Finestra, luce presto, la stessa ora.'),
)

lab(
  'lab-3',
  L('3. gece — Zihin mahkemesi', 'Night 3 — Court of the mind', 'Noche 3 — Tribunal de la mente', 'Nuit 3 — Tribunal de l’esprit', 'Nacht 3 — Gericht im Kopf', 'Notte 3 — Tribunale della mente'),
  L('Bilişsel indirme', 'Cognitive unload', 'Descarga cognitiva', 'Décharge cognitive', 'Kognitives Entladen', 'Scarico cognitivo'),
  L('Bu gece mahkeme yok.', 'No court tonight.', 'Esta noche no hay tribunal.', 'Pas de tribunal ce soir.', 'Heute Nacht kein Gericht.', 'Stanotte niente tribunale.'),
  L(
    '“Uyuyamazsam yarın biter” cümlesini fark et, çürütme, rafa koy. Gündüz pencere açtıysan gece defter kapalı. Bırakış: savcı koltuğunu bırak.',
    'Notice “if I cannot sleep, tomorrow is ruined.” Do not debate it. Put it on a shelf. If you opened a worry window by day, the night notebook is closed. Release: leave the prosecutor chair.',
    'Nota “si no duermo, mañana se acaba”. No lo debates. Ponlo en un estante. Si abriste la ventana de día, el cuaderno de noche está cerrado. Suelta: deja la silla del fiscal.',
    'Repère « si je ne dors pas, demain est fini ». Ne le réfute pas. Mets-le sur une étagère. Si tu as ouvert la fenêtre le jour, le cahier de nuit est fermé. Lâche : quitte le siège du procureur.',
    'Merk „wenn ich nicht schlafe, ist morgen vorbei“. Nicht widerlegen. Auf ein Brett. War das Sorgenfenster am Tag offen, ist das Nachtbuch zu. Loslassen: verlass den Anklägerstuhl.',
    'Nota «se non dormo, domani è finito». Non confutarlo. Mettilo sullo scaffale. Se hai aperto la finestra di giorno, il quaderno di notte è chiuso. Rilascia: lascia la sedia del pubblico ministero.',
  ),
  L('Kapalı defter, sönük lamba.', 'Closed notebook, low lamp.', 'Cuaderno cerrado, lámpara baja.', 'Cahier fermé, lampe basse.', 'Geschlossenes Heft, schwache Lampe.', 'Quaderno chiuso, lampada bassa.'),
)

lab(
  'lab-4',
  L('4. gece — İniş ritüeli', 'Night 4 — Descent ritual', 'Noche 4 — Ritual de bajada', 'Nuit 4 — Rituel de descente', 'Nacht 4 — Abstiegsritual', 'Notte 4 — Rituale di discesa'),
  L('Aynı sıra, aynı loşluk', 'Same order, same dim', 'El mismo orden, la misma penumbra', 'Même ordre, même pénombre', 'Dieselbe Folge, dasselbe Dämmer', 'Lo stesso ordine, la stessa penombra'),
  L('Sıra aynı, beden anlıyor.', 'The order is the same; the body learns.', 'El orden es el mismo; el cuerpo entiende.', 'L’ordre est le même ; le corps comprend.', 'Die Folge ist dieselbe; der Körper versteht.', 'L’ordine è lo stesso; il corpo capisce.'),
  L(
    'Işık düşer, ekran kapanır, ılık su veya gerinme, yatak. Büyü değil, işaret. Bırakış: ritüeli mükemmelleştirme.',
    'Light drops, screen off, warm water or a slow stretch, then bed. Not magic, a cue. Release: do not perfect the ritual.',
    'La luz baja, pantalla apagada, agua tibia o un estiramiento, luego la cama. No es magia, una señal. Suelta: no perfecciones el rito.',
    'La lumière baisse, écran éteint, eau tiède ou un étirement, puis le lit. Pas de magie, un signal. Lâche : ne perfectionne pas le rituel.',
    'Licht sinkt, Bildschirm aus, warmes Wasser oder Dehnen, dann Bett. Kein Zauber, ein Zeichen. Loslassen: mach das Ritual nicht perfekt.',
    'La luce scende, schermo spento, acqua tiepida o uno stiramento, poi il letto. Non è magia, un segnale. Rilascia: non perfezionare il rito.',
  ),
  L('Su, loşluk, yorgan.', 'Water, dim, blanket.', 'Agua, penumbra, manta.', 'Eau, pénombre, couverture.', 'Wasser, Dämmer, Decke.', 'Acqua, penombra, coperta.'),
)

lab(
  'lab-5',
  L('5. gece — Tohum gecesi', 'Night 5 — Seed night', 'Noche 5 — Noche semilla', 'Nuit 5 — Nuit graine', 'Nacht 5 — Samennacht', 'Notte 5 — Notte seme'),
  L('Tek kare, film yok', 'One frame, no film', 'Un fotograma, sin cine', 'Un cadre, pas de film', 'Ein Bild, kein Film', 'Un fotogramma, niente film'),
  L('Tek kare yeter, gece işler.', 'One frame is enough; night will work.', 'Un fotograma basta; la noche trabaja.', 'Un cadre suffit ; la nuit travaille.', 'Ein Bild reicht; die Nacht arbeitet.', 'Un fotogramma basta; la notte lavora.'),
  L(
    'Kartpostal: kapalı bahçe, ılık taş, kandil. Tekrar etme. Rahat beden önce. Uyku görev değil.',
    'A postcard: closed garden, warm stone, lamp. Do not repeat. Soft body first. Sleep is not a task.',
    'Una postal: jardín cerrado, piedra tibia, lámpara. No repitas. Cuerpo suave primero. Dormir no es una tarea.',
    'Une carte : jardin fermé, pierre tiède, lampe. Ne répète pas. Corps doux d’abord. Le sommeil n’est pas une tâche.',
    'Eine Postkarte: geschlossener Garten, warmer Stein, Lampe. Nicht wiederholen. Weicher Körper zuerst. Schlaf ist keine Aufgabe.',
    'Una cartolina: giardino chiuso, pietra tiepida, lampada. Non ripetere. Corpo morbido prima. Il sonno non è un compito.',
  ),
  L('Kapalı bahçe, ılık taş, kandil.', 'Closed garden, warm stone, lamp.', 'Jardín cerrado, piedra tibia, lámpara.', 'Jardin fermé, pierre tiède, lampe.', 'Geschlossener Garten, warmer Stein, Lampe.', 'Giardino chiuso, pietra tiepida, lampada.'),
)

lab(
  'lab-6',
  L('6. gece — Kaygı dökümü erken', 'Night 6 — Worry dump early', 'Noche 6 — Descarga temprana', 'Nuit 6 — Décharge tôt', 'Nacht 6 — Sorgen früh abladen', 'Notte 6 — Scarico presto'),
  L('Gündüz penceresi, gece boş yatak', 'Day window, empty bed at night', 'Ventana de día, cama vacía de noche', 'Fenêtre le jour, lit vide la nuit', 'Fenster am Tag, leeres Bett nachts', 'Finestra di giorno, letto vuoto di notte'),
  L('Döküm gündüz bitti, yatak boş.', 'The dump ended by day; the bed is empty.', 'La descarga acabó de día; la cama está vacía.', 'La décharge s’est finie le jour ; le lit est vide.', 'Die Ladung endete am Tag; das Bett ist leer.', 'Lo scarico è finito di giorno; il letto è vuoto.'),
  L(
    'İkindi. On dakika yaz, bitir. Gece o kâğıda dönme. Bırakış: ek madde yok.',
    'Afternoon. Write ten minutes, stop. Do not return to that paper at night. Release: no extra clause.',
    'Por la tarde. Diez minutos, para. De noche no vuelvas a ese papel. Suelta: sin cláusula extra.',
    'L’après-midi. Dix minutes, stop. La nuit, ne reviens pas à cette feuille. Lâche : pas de clause en plus.',
    'Nachmittag. Zehn Minuten schreiben, Schluss. Nachts nicht zu dem Blatt zurück. Loslassen: keine Extra-Klausel.',
    'Pomeriggio. Dieci minuti, stop. Di notte non tornare a quel foglio. Rilascia: niente clausola in più.',
  ),
  L('Boş masa, kapalı defter, yatak.', 'Empty table, closed notebook, bed.', 'Mesa vacía, cuaderno cerrado, cama.', 'Table vide, cahier fermé, lit.', 'Leerer Tisch, geschlossenes Heft, Bett.', 'Tavolo vuoto, quaderno chiuso, letto.'),
)

lab(
  'lab-7',
  L('7. gece — Birleştirme', 'Night 7 — Join', 'Noche 7 — Unión', 'Nuit 7 — Assemblage', 'Nacht 7 — Zusammenfügen', 'Notte 7 — Unione'),
  L('Kıyı, sıra, tohum, bırakış', 'Shore, order, seed, release', 'Orilla, orden, semilla, soltar', 'Rive, ordre, graine, lâcher', 'Ufer, Folge, Samen, Loslassen', 'Riva, ordine, seme, rilascio'),
  L('İskelet duruyor, ben bırakıyorum.', 'The frame stands; I let go.', 'El armazón está; yo suelto.', 'Le cadre tient ; je lâche.', 'Das Gerüst steht; ich lasse los.', 'Lo scheletro sta; io rilascio.'),
  L(
    'Yatak iş değil, kalkış çipası, mahkeme yok, iniş, tek tohum, erken döküm. Hepsini mükemmel yapma. Birini seç. Bırakış: zafer konuşması yok.',
    'Bed is not work, wake anchor, no court, descent, one seed, early dump. Do not perfect all. Pick one. Release: no victory speech.',
    'La cama no es trabajo, ancla de mañana, sin tribunal, bajada, una semilla, descarga temprana. No lo hagas todo perfecto. Elige uno. Suelta: sin discurso de victoria.',
    'Le lit n’est pas le travail, ancre du matin, pas de tribunal, descente, une graine, décharge tôt. Ne perfectionne pas tout. Choisis-en un. Lâche : pas de discours de victoire.',
    'Bett ist keine Arbeit, Morgenanker, kein Gericht, Abstieg, ein Samen, frühe Ladung. Nicht alles perfekt. Eins wählen. Loslassen: keine Siegesrede.',
    'Il letto non è lavoro, ancora del mattino, niente tribunale, discesa, un seme, scarico presto. Non perfezionare tutto. Scegline uno. Rilascia: niente discorso di vittoria.',
  ),
  L('Aynı yatak, aynı tohum, aynı bırakış.', 'Same bed, same seed, same release.', 'Misma cama, misma semilla, mismo soltar.', 'Même lit, même graine, même lâcher.', 'Dasselbe Bett, derselbe Samen, dasselbe Loslassen.', 'Stesso letto, stesso seme, stesso rilascio.'),
)

const extraShort = short
extraShort(
  'ground54321',
  L('5-4-3-2-1', '5-4-3-2-1', '5-4-3-2-1', '5-4-3-2-1', '5-4-3-2-1', '5-4-3-2-1'),
  L('Gör, dokun, işit, kokla, tat', 'See, touch, hear, smell, taste', 'Ver, tocar, oír, oler, gustar', 'Voir, toucher, entendre, sentir, goûter', 'Sehen, tasten, hören, riechen, schmecken', 'Vedere, toccare, udire, odorare, gustare'),
  L('Oda geri geldi, ben buradayım.', 'The room came back; I am here.', 'La habitación volvió; estoy aquí.', 'La pièce est revenue ; je suis ici.', 'Der Raum kam zurück; ich bin hier.', 'La stanza è tornata; sono qui.'),
  L(
    'Beş görülen. Dört dokunulan. Üç işitilen. İki koklanan. Bir tadılan. Yüksek sesle, yavaş. Sis yok. Bırakış: listeyi mahkeme yapma.',
    'Five seen. Four touched. Three heard. Two smelled. One tasted. Aloud, slow. No fog. Release: do not make the list a court.',
    'Cinco vistos. Cuatro tocados. Tres oídos. Dos olores. Un sabor. En voz alta, despacio. Sin niebla. Suelta: no hagas de la lista un tribunal.',
    'Cinq vus. Quatre touchés. Trois entendus. Deux sentis. Un goût. À voix haute, lent. Pas de brouillard. Lâche : n’en fais pas un tribunal.',
    'Fünf gesehen. Vier berührt. Drei gehört. Zwei gerochen. Eins geschmeckt. Laut, langsam. Kein Nebel. Loslassen: mach keine Gerichtsliste.',
    'Cinque visti. Quattro toccati. Tre uditi. Due odori. Un gusto. Ad alta voce, piano. Niente nebbia. Rilascia: non fare della lista un tribunale.',
  ),
)
extraShort(
  'values',
  L('Değer pusulası', 'Value compass', 'Brújula de valores', 'Boussole de valeurs', 'Wertekompass', 'Bussola di valori'),
  L('Bir milim yön', 'One millimeter of direction', 'Un milímetro de dirección', 'Un millimètre de direction', 'Ein Millimeter Richtung', 'Un millimetro di direzione'),
  L('Bu saatte küçük bir yönüm var.', 'This hour I have a small direction.', 'A esta hora tengo una dirección pequeña.', 'À cette heure j’ai une petite direction.', 'In dieser Stunde habe ich eine kleine Richtung.', 'In quest’ora ho una piccola direzione.'),
  L(
    'Üç değer adı. Bugün hangisine bir milim. Bir davranış, abartısız. Bırakış: pusulayı mükemmel yapma.',
    'Three value names. Which one gets a millimeter today. One act, no drama. Release: do not perfect the compass.',
    'Tres nombres de valor. Cuál recibe un milímetro hoy. Un acto, sin drama. Suelta: no perfecciones la brújula.',
    'Trois noms de valeur. Lequel reçoit un millimètre aujourd’hui. Un acte, sans drame. Lâche : ne perfectionne pas la boussole.',
    'Drei Werte. Welcher bekommt heute einen Millimeter. Eine Tat, kein Drama. Loslassen: mach den Kompass nicht perfekt.',
    'Tre nomi di valore. Quale riceve un millimetro oggi. Un atto, senza dramma. Rilascia: non perfezionare la bussola.',
  ),
)
extraShort(
  'kind-friend',
  L('Nazik arkadaş', 'Kind friend', 'Amigo amable', 'Ami doux', 'Guter Freund', 'Amico gentile'),
  L('İç sesin tonu', 'Tone of the inner voice', 'Tono de la voz interior', 'Ton de la voix intérieure', 'Ton der inneren Stimme', 'Tono della voce interiore'),
  L('Kendime yorgun bir dosta konuşurum.', 'I speak to myself as to a tired friend.', 'Me hablo como a un amigo cansado.', 'Je me parle comme à un ami fatigué.', 'Ich spreche zu mir wie zu einem müden Freund.', 'Mi parlo come a un amico stanco.'),
  L(
    'Sert cümleyi duy. Yorgun bir arkadaşa söyler gibi yeniden yaz. Bir kez sesli. Bırakış: dava açma.',
    'Hear the hard line. Rewrite it as you would to a tired friend. Once aloud. Release: do not sue yourself.',
    'Oye la frase dura. Reescríbela como a un amigo cansado. Una vez en voz alta. Suelta: no te demandes.',
    'Entends la phrase dure. Réécris-la comme à un ami fatigué. Une fois à voix haute. Lâche : ne te poursuis pas.',
    'Hör den harten Satz. Schreib ihn neu, wie zu einem müden Freund. Einmal laut. Loslassen: verklag dich nicht.',
    'Senti la frase dura. Riscrivila come a un amico stanco. Una volta ad alta voce. Rilascia: non processarti.',
  ),
)
extraShort(
  'ten-steps',
  L('On adım', 'Ten steps', 'Diez pasos', 'Dix pas', 'Zehn Schritte', 'Dieci passi'),
  L('Taban, yer, sayı', 'Sole, ground, count', 'Planta, suelo, cuenta', 'Plante, sol, compte', 'Sohle, Boden, Zahl', 'Pianta, suolo, conto'),
  L('Adımlarımı içeriden atıyorum.', 'I take the steps from inside.', 'Doy los pasos desde dentro.', 'Je fais les pas depuis l’intérieur.', 'Ich gehe die Schritte von innen.', 'Faccio i passi da dentro.'),
  L(
    'On adım. Topuk-parmak. “Bir, yer.” Koşu yok. Bırakış: performans yok.',
    'Ten steps. Heel-toe. “One, ground.” No run. Release: no performance.',
    'Diez pasos. Talón-dedo. “Uno, suelo.” Sin correr. Suelta: sin actuación.',
    'Dix pas. Talon-orteil. « Un, sol. » Pas de course. Lâche : pas de spectacle.',
    'Zehn Schritte. Ferse-Zehe. „Eins, Boden.“ Kein Lauf. Loslassen: keine Show.',
    'Dieci passi. Tallone-punta. «Uno, suolo.» Niente corsa. Rilascia: niente spettacolo.',
  ),
)
extraShort(
  'tension-drop',
  L('Gerilim bırakışı', 'Tension drop', 'Soltar tensión', 'Lâcher la tension', 'Spannung abgeben', 'Lasciare la tensione'),
  L('Omuz, çene, el', 'Shoulder, jaw, hand', 'Hombro, mandíbula, mano', 'Épaule, mâchoire, main', 'Schulter, Kiefer, Hand', 'Spalla, mascella, mano'),
  L('Omuzlarım iniyor, ben iniyorum.', 'Shoulders drop, and I drop.', 'Los hombros bajan, y yo bajo.', 'Les épaules descendent, et je descends.', 'Die Schultern sinken, und ich sinke.', 'Le spalle scendono, e io scendo.'),
  L(
    'Omuzları kaldır, bırak. Çeneyi milim aç. Avuçları sık, aç. Üç tur. Bırakış asıl iş.',
    'Lift the shoulders, drop. Open the jaw a millimeter. Make fists, open. Three rounds. Release is the work.',
    'Sube los hombros, suelta. Abre la mandíbula un milímetro. Puños, abre. Tres vueltas. Soltar es el trabajo.',
    'Monte les épaules, lâche. Ouvre la mâchoire d’un millimètre. Poings, ouvre. Trois tours. Lâcher est le travail.',
    'Schultern heben, fallen lassen. Kiefer einen Millimeter. Fäuste, öffnen. Drei Runden. Loslassen ist die Arbeit.',
    'Alza le spalle, lascia. Apri la mascella di un millimetro. Pugni, apri. Tre giri. Rilasciare è il lavoro.',
  ),
)
extraShort(
  'morning-light',
  L('Sabah ışığı', 'Morning light', 'Luz de mañana', 'Lumière du matin', 'Morgenlicht', 'Luce del mattino'),
  L('Yön ve pencere', 'Direction and window', 'Dirección y ventana', 'Direction et fenêtre', 'Richtung und Fenster', 'Direzione e finestra'),
  L('Işık bir yerden geliyor.', 'Light is coming from somewhere.', 'La luz viene de algún sitio.', 'La lumière vient de quelque part.', 'Licht kommt von irgendwo.', 'La luce arriva da qualche parte.'),
  L(
    'Önce omuzları bırak. Sonra yönü söyle. Gölgeyi söyle. Ekran değil. Bırakış: ışığı düzeltme.',
    'Drop the shoulders first. Then name the direction. Name the shadow. Not the screen. Release: do not fix the light.',
    'Primero baja los hombros. Luego di la dirección. Di la sombra. No la pantalla. Suelta: no corrijas la luz.',
    'D’abord les épaules. Puis nomme la direction. L’ombre. Pas l’écran. Lâche : ne corrige pas la lumière.',
    'Zuerst die Schultern. Dann die Richtung. Den Schatten. Nicht den Bildschirm. Loslassen: das Licht nicht richten.',
    'Prima le spalle. Poi la direzione. L’ombra. Non lo schermo. Rilascia: non correggere la luce.',
  ),
)
extraShort(
  'three-objects',
  L('3 nesne', '3 objects', '3 objetos', '3 objets', '3 Dinge', '3 oggetti'),
  L('Bak, renk, dokun', 'Look, color, touch', 'Mira, color, toca', 'Regarde, couleur, touche', 'Schau, Farbe, berühre', 'Guarda, colore, tocca'),
  L('Üç nesne odada, ben odadayım.', 'Three objects in the room, and I am in the room.', 'Tres objetos en la habitación, y yo también.', 'Trois objets dans la pièce, et moi aussi.', 'Drei Dinge im Raum, und ich auch.', 'Tre oggetti nella stanza, e io pure.'),
  L(
    'Üç nesne. Bak, rengi söyle, dokun. Isı, ağırlık, pürüz. Sonra iki tabanı yere bas. Bırakış: envanteri mahkeme yapma.',
    'Three objects. Look, name the color, touch. Heat, weight, grain. Then press both feet. Release: do not make the inventory a court.',
    'Tres objetos. Mira, di el color, toca. Calor, peso, grano. Luego presiona los pies. Suelta: no hagas del inventario un tribunal.',
    'Trois objets. Regarde, dis la couleur, touche. Chaleur, poids, grain. Puis pose les pieds. Lâche : n’en fais pas un tribunal.',
    'Drei Dinge. Schau, sag die Farbe, berühre. Wärme, Gewicht, Struktur. Dann beide Füße. Loslassen: kein Gerichts-Inventar.',
    'Tre oggetti. Guarda, dì il colore, tocca. Calore, peso, trama. Poi i piedi a terra. Rilascia: non fare dell’inventario un tribunale.',
  ),
)
extraShort(
  'room-sound',
  L('Odadaki ses', 'Sound in the room', 'Sonido en la habitación', 'Son dans la pièce', 'Klang im Raum', 'Suono nella stanza'),
  L('Bir ses, adını söyle', 'One sound, name it', 'Un sonido, nómbralo', 'Un son, nomme-le', 'Ein Klang, nenne ihn', 'Un suono, nominalo'),
  L('Bu ses odada, ben de odadayım.', 'This sound is in the room, and I am too.', 'Este sonido está en la habitación, y yo también.', 'Ce son est dans la pièce, et moi aussi.', 'Dieser Klang ist im Raum, und ich auch.', 'Questo suono è nella stanza, e io pure.'),
  L(
    'Bir ses: buzdolabı, trafik, yağmur, nefes. Adını söyle. On nefes boyunca sadece o. Bırakış: sesi kapatmaya çalışma.',
    'One sound: fridge, traffic, rain, breath. Name it. For ten breaths only that. Release: do not try to shut the sound.',
    'Un sonido: nevera, tráfico, lluvia, aliento. Nómbralo. Diez alientos solo eso. Suelta: no intentes apagarlo.',
    'Un son : frigo, trafic, pluie, souffle. Nomme-le. Dix souffles, seulement ça. Lâche : n’essaie pas de l’éteindre.',
    'Ein Klang: Kühlschrank, Verkehr, Regen, Atem. Nenne ihn. Zehn Atem nur das. Loslassen: versuch nicht, ihn auszumachen.',
    'Un suono: frigo, traffico, pioggia, respiro. Nominalo. Dieci respiri solo quello. Rilascia: non provare a spegnerlo.',
  ),
)

const clarityIds: [string, ReturnType<typeof L>, ReturnType<typeof L>, ReturnType<typeof L>, ReturnType<typeof L>][] = [
  ['c1', L('Çene', 'Jaw', 'Mandíbula', 'Mâchoire', 'Kiefer', 'Mascella'), L('Bugünün milimi', 'Today’s millimeter', 'El milímetro de hoy', 'Le millimètre d’aujourd’hui', 'Der Millimeter von heute', 'Il millimetro di oggi'), L('Çenem şimdi yumuşak.', 'My jaw is soft now.', 'La mandíbula está suave ahora.', 'Ma mâchoire est douce maintenant.', 'Mein Kiefer ist jetzt weich.', 'La mascella è morbida ora.'), L('Azı dişlerini ayır. Dil alt damağa. Otuz saniye. Bırak.', 'Unclench the molars. Tongue to the palate. Thirty seconds. Release.', 'Separa las muelas. Lengua al paladar. Treinta segundos. Suelta.', 'Desserre les molaires. Langue au palais. Trente secondes. Lâche.', 'Backenzähne lösen. Zunge zum Gaumen. Dreißig Sekunden. Loslassen.', 'Separa i molari. Lingua al palato. Trenta secondi. Rilascia.')],
  ['c2', L('Taban', 'Sole', 'Planta', 'Plante', 'Sohle', 'Pianta'), L('Yer var', 'Ground is there', 'El suelo está', 'Le sol est là', 'Der Boden ist da', 'Il suolo c’è'), L('Tabanım yerde.', 'My soles are on the ground.', 'Mis plantas están en el suelo.', 'Mes plantes sont au sol.', 'Meine Sohlen sind am Boden.', 'Le piante sono a terra.'), L('İki taban. Serin veya ılık. Bırak.', 'Two soles. Cool or warm. Release.', 'Dos plantas. Fresco o tibio. Suelta.', 'Deux plantes. Frais ou tiède. Lâche.', 'Zwei Sohlen. Kühl oder warm. Loslassen.', 'Due piante. Fresco o tiepido. Rilascia.')],
  ['c3', L('Tek nesne', 'One object', 'Un objeto', 'Un objet', 'Ein Ding', 'Un oggetto'), L('Adı söyle', 'Name it', 'Nómbralo', 'Nomme-le', 'Nenne es', 'Nominalo'), L('Bu nesne odada.', 'This object is in the room.', 'Este objeto está en la habitación.', 'Cet objet est dans la pièce.', 'Dieses Ding ist im Raum.', 'Questo oggetto è nella stanza.'), L('Bir bardak veya düğme. Ad. Doku. Yorum yok.', 'A glass or a button. Name. Texture. No story.', 'Un vaso o un botón. Nombre. Textura. Sin historia.', 'Un verre ou un bouton. Nom. Texture. Pas d’histoire.', 'Ein Glas oder ein Knopf. Name. Textur. Keine Geschichte.', 'Un bicchiere o un bottone. Nome. Trama. Niente storia.')],
  ['c4', L('Omuz', 'Shoulder', 'Hombro', 'Épaule', 'Schulter', 'Spalla'), L('Kulaktan uzak', 'Away from the ear', 'Lejos de la oreja', 'Loin de l’oreille', 'Weg vom Ohr', 'Lontano dall’orecchio'), L('Omuzlarım iniyor.', 'My shoulders are dropping.', 'Mis hombros bajan.', 'Mes épaules descendent.', 'Meine Schultern sinken.', 'Le spalle scendono.'), L('Omuzları kaldır, bırak. İki kez.', 'Lift the shoulders, drop. Twice.', 'Sube los hombros, suelta. Dos veces.', 'Monte les épaules, lâche. Deux fois.', 'Schultern heben, fallen. Zweimal.', 'Alza le spalle, lascia. Due volte.')],
  ['c5', L('Pencere yönü', 'Window direction', 'Dirección de la ventana', 'Direction de la fenêtre', 'Fensterrichtung', 'Direzione della finestra'), L('Işık nereden', 'Where the light is from', 'De dónde viene la luz', 'D’où vient la lumière', 'Woher das Licht kommt', 'Da dove viene la luce'), L('Işık bir yerden geliyor.', 'Light is coming from somewhere.', 'La luz viene de algún sitio.', 'La lumière vient de quelque part.', 'Licht kommt von irgendwo.', 'La luce arriva da qualche parte.'), L('Yönü söyle. Gölgeyi söyle. Sis yok.', 'Name the direction. Name the shadow. No fog.', 'Di la dirección. Di la sombra. Sin niebla.', 'Nomme la direction. L’ombre. Pas de brouillard.', 'Nenne die Richtung. Den Schatten. Kein Nebel.', 'Dì la direzione. L’ombra. Niente nebbia.')],
  ['c6', L('Su', 'Water', 'Agua', 'Eau', 'Wasser', 'Acqua'), L('Bir yudum', 'One sip', 'Un sorbo', 'Une gorgée', 'Ein Schluck', 'Un sorso'), L('Su içeride, ben buradayım.', 'Water is inside; I am here.', 'El agua está dentro; estoy aquí.', 'L’eau est dedans ; je suis ici.', 'Wasser ist innen; ich bin hier.', 'L’acqua è dentro; sono qui.'), L('Yudum. Isı. Boğaz. Bırak.', 'Sip. Heat. Throat. Release.', 'Sorbo. Calor. Garganta. Suelta.', 'Gorgée. Chaleur. Gorge. Lâche.', 'Schluck. Wärme. Kehle. Loslassen.', 'Sorso. Calore. Gola. Rilascia.')],
  ['c7', L('Ad', 'Name', 'Nombre', 'Nom', 'Name', 'Nome'), L('Kulak için', 'For the ear', 'Para el oído', 'Pour l’oreille', 'Für das Ohr', 'Per l’orecchio'), L('Adım bu, ben buradayım.', 'This is my name; I am here.', 'Este es mi nombre; estoy aquí.', 'Voici mon nom ; je suis ici.', 'Das ist mein Name; ich bin hier.', 'Questo è il mio nome; sono qui.'), L('Adını fısılda. Tarihi fısılda. Ayna yok.', 'Whisper your name. Whisper the date. No mirror.', 'Susurra tu nombre. La fecha. Sin espejo.', 'Chuchote ton nom. La date. Pas de miroir.', 'Flüstere deinen Namen. Das Datum. Kein Spiegel.', 'Sussurra il nome. La data. Niente specchio.')],
  ['c8', L('Avuç ısısı', 'Palm heat', 'Calor de la palma', 'Chaleur de la paume', 'Handflächenwärme', 'Calore del palmo'), L('İki el', 'Two hands', 'Dos manos', 'Deux mains', 'Zwei Hände', 'Due mani'), L('Avuçlarımda ısı var.', 'There is heat in my palms.', 'Hay calor en mis palmas.', 'Il y a de la chaleur dans mes paumes.', 'In meinen Handflächen ist Wärme.', 'C’è calore nei palmi.'), L('Avuçları birleştir, ayır. Isıyı fark et.', 'Join the palms, part them. Notice the heat.', 'Junta las palmas, sepáralas. Nota el calor.', 'Joins les paumes, sépare. Note la chaleur.', 'Handflächen zusammen, auseinander. Wärme merken.', 'Unisci i palmi, separa. Nota il calore.')],
  ['c9', L('Veriş', 'Exhale', 'Exhalación', 'Expiration', 'Ausatmen', 'Espirazione'), L('Bir uzun nefes', 'One long breath', 'Un aliento largo', 'Un souffle long', 'Ein langer Atem', 'Un respiro lungo'), L('Verişim uzun, ben iniyorum.', 'The exhale is long; I am dropping.', 'La exhalación es larga; estoy bajando.', 'L’expiration est longue ; je descends.', 'Der Ausatem ist lang; ich sinke.', 'L’espirazione è lunga; sto scendendo.'), L('Burun al, ağızdan altıya ver. Üç tur. Zorlama.', 'In through the nose, out to six through the mouth. Three rounds. No force.', 'Nariz adentro, boca hasta seis. Tres vueltas. Sin fuerza.', 'Nez dedans, bouche jusqu’à six. Trois tours. Sans forcer.', 'Nase ein, Mund bis sechs. Drei Runden. Kein Zwang.', 'Naso dentro, bocca fino a sei. Tre giri. Senza forza.')],
  ['c10', L('Kapı', 'Door', 'Puerta', 'Porte', 'Tür', 'Porta'), L('Kenar', 'Edge', 'Borde', 'Bord', 'Kante', 'Bordo'), L('Kapı yerinde, oda yerinde.', 'The door is in place; the room is in place.', 'La puerta está; la habitación está.', 'La porte est là ; la pièce est là.', 'Die Tür ist da; der Raum ist da.', 'La porta c’è; la stanza c’è.'), L('Kapının dikdörtgenini içinden çiz.', 'Draw the door’s rectangle from the inside.', 'Dibuja el rectángulo de la puerta por dentro.', 'Trace le rectangle de la porte depuis l’intérieur.', 'Zeichne das Rechteck der Tür von innen.', 'Traccia il rettangolo della porta da dentro.')],
  ['c11', L('Sırt', 'Back', 'Espalda', 'Dos', 'Rücken', 'Schiena'), L('Yaslan', 'Lean', 'Apóyate', 'Appuie-toi', 'Anlehnen', 'Appoggiati'), L('Sırtım yaslanıyor.', 'My back is leaning.', 'Mi espalda se apoya.', 'Mon dos s’appuie.', 'Mein Rücken lehnt.', 'La schiena si appoggia.'), L('Sandalyenin seni taşımasına izin ver.', 'Let the chair carry you.', 'Deja que la silla te lleve.', 'Laisse la chaise te porter.', 'Lass den Stuhl dich tragen.', 'Lascia che la sedia ti porti.')],
  ['c12', L('Üç şükran', 'Three thanks', 'Tres gracias', 'Trois mercis', 'Drei Danke', 'Tre grazie'), L('Küçük', 'Small', 'Pequeño', 'Petit', 'Klein', 'Piccolo'), L('Üç küçük şey yeter.', 'Three small things are enough.', 'Tres cosas pequeñas bastan.', 'Trois petites choses suffisent.', 'Drei kleine Dinge reichen.', 'Tre piccole cose bastano.'), L('Üç somut şey. Abartma. Kapat.', 'Three concrete things. No grandeur. Close.', 'Tres cosas concretas. Sin grandeza. Cierra.', 'Trois choses concrètes. Pas de grandeur. Ferme.', 'Drei konkrete Dinge. Keine Größe. Zu.', 'Tre cose concrete. Niente grandezza. Chiudi.')],
  ['c13', L('Kaygı rafa', 'Worry on a shelf', 'Preocupación al estante', 'Inquiétude sur l’étagère', 'Sorge aufs Brett', 'Preoccupazione sullo scaffale'), L('Bir cümle', 'One sentence', 'Una frase', 'Une phrase', 'Ein Satz', 'Una frase'), L('Bunu bu saatte çözmüyorum.', 'I am not solving this at this hour.', 'Esto no lo resuelvo a esta hora.', 'Je ne règle pas ça à cette heure.', 'Das löse ich um diese Stunde nicht.', 'Non lo risolvo a quest’ora.'), L('Kaygıyı bir cümleye sıkıştır, rafa koy.', 'Squeeze worry into one sentence, put it on a shelf.', 'Aprieta la preocupación en una frase, ponla en un estante.', 'Serre l’inquiétude en une phrase, mets-la sur une étagère.', 'Sorge in einen Satz, aufs Brett.', 'Stringi la preoccupazione in una frase, mettila sullo scaffale.')],
  ['c14', L('Yorgan', 'Blanket', 'Manta', 'Couverture', 'Decke', 'Coperta'), L('Örtü', 'Cover', 'Cubierta', 'Couvre', 'Bezug', 'Copertura'), L('Örtü beni tutuyor.', 'The cover is holding me.', 'La cubierta me sostiene.', 'La couverture me tient.', 'Die Decke hält mich.', 'La coperta mi tiene.'), L('Bir kumaşın ağırlığı. Temas. Bırakış.', 'Weight of a cloth. Contact. Release.', 'Peso de una tela. Contacto. Suelta.', 'Poids d’un tissu. Contact. Lâche.', 'Gewicht eines Stoffs. Kontakt. Loslassen.', 'Peso di un tessuto. Contatto. Rilascia.')],
  ['c15', L('Üç renk', 'Three colors', 'Tres colores', 'Trois couleurs', 'Drei Farben', 'Tre colori'), L('Bak, ad', 'Look, name', 'Mira, nombra', 'Regarde, nomme', 'Schau, nenne', 'Guarda, nomina'), L('Üç renk odada.', 'Three colors in the room.', 'Tres colores en la habitación.', 'Trois couleurs dans la pièce.', 'Drei Farben im Raum.', 'Tre colori nella stanza.'), L('Üç nesne, üç renk. Yüksek sesle. Sis yok.', 'Three objects, three colors. Aloud. No fog.', 'Tres objetos, tres colores. En voz alta. Sin niebla.', 'Trois objets, trois couleurs. À voix haute. Pas de brouillard.', 'Drei Dinge, drei Farben. Laut. Kein Nebel.', 'Tre oggetti, tre colori. Ad alta voce. Niente nebbia.')],
  ['c16', L('Telefon ağırlığı', 'Phone weight', 'Peso del teléfono', 'Poids du téléphone', 'Gewicht des Telefons', 'Peso del telefono'), L('İki el', 'Two hands', 'Dos manos', 'Deux mains', 'Zwei Hände', 'Due mani'), L('Bu ağırlık avucumda.', 'This weight is in my palm.', 'Este peso está en mi palma.', 'Ce poids est dans ma paume.', 'Dieses Gewicht ist in meiner Handfläche.', 'Questo peso è nel palmo.'), L('Telefonu iki elle tut. On saniye. Bırakış.', 'Hold the phone in both hands. Ten seconds. Release.', 'Sostén el teléfono con las dos manos. Diez segundos. Suelta.', 'Tiens le téléphone à deux mains. Dix secondes. Lâche.', 'Telefon mit beiden Händen. Zehn Sekunden. Loslassen.', 'Tieni il telefono con due mani. Dieci secondi. Rilascia.')],
]
clarityIds.forEach(([id, title, subtitle, sentence, body]) => short(id, title, subtitle, sentence, body))

PACK.wave = {
  label: L('Dalga 4-2-6', 'Wave 4-2-6', 'Ola 4-2-6', 'Vague 4-2-6', 'Welle 4-2-6', 'Onda 4-2-6'),
  subtitle: L('Uzun veriş. SOS ile aynı iskelet.', 'Long exhale. Same frame as SOS.', 'Exhalación larga. El mismo armazón que SOS.', 'Expiration longue. Même cadre que SOS.', 'Langer Ausatem. Dasselbe Gerüst wie SOS.', 'Espirazione lunga. Lo stesso scheletro di SOS.'),
}
PACK.box = {
  label: L('Kutu 4-4-4-4', 'Box 4-4-4-4', 'Caja 4-4-4-4', 'Carré 4-4-4-4', 'Kasten 4-4-4-4', 'Scatola 4-4-4-4'),
  subtitle: L('Eşit kenarlar, eşit tempo.', 'Even sides, even tempo.', 'Lados iguales, tempo igual.', 'Côtés égaux, tempo égal.', 'Gleiche Seiten, gleiches Tempo.', 'Lati uguali, tempo uguale.'),
}
PACK['478'] = {
  label: L('4-7-8', '4-7-8', '4-7-8', '4-7-8', '4-7-8', '4-7-8'),
  subtitle: L('Al, uzun tut, uzun ver.', 'In, long hold, long out.', 'Entra, sujeta largo, suelta largo.', 'Entre, tiens long, sors long.', 'Ein, lang halten, lang aus.', 'Dentro, tieni lungo, fuori lungo.'),
}
PACK.sigh = {
  label: L('Fizyolojik iç çekiş', 'Physiological sigh', 'Suspiro fisiológico', 'Soupir physiologique', 'Physiologischer Seufzer', 'Sospiro fisiologico'),
  subtitle: L('Çift burun alış, uzun ağız veriş.', 'Double nose in, long mouth out.', 'Doble nariz adentro, boca larga.', 'Double nez, bouche longue.', 'Doppelte Nase ein, langer Mund aus.', 'Doppio naso, bocca lunga.'),
}
PACK.equal = {
  label: L('Eşit 5-5', 'Even 5-5', 'Igual 5-5', 'Égal 5-5', 'Gleich 5-5', 'Uguale 5-5'),
  subtitle: L('Aynı uzunluk, sakin tempo.', 'Same length, calm tempo.', 'Misma longitud, tempo calmo.', 'Même longueur, tempo calme.', 'Gleiche Länge, ruhiges Tempo.', 'Stessa lunghezza, tempo calmo.'),
}
PACK.count8 = {
  label: L('Sekize ver', 'Out to eight', 'Hasta ocho', 'Jusqu’à huit', 'Bis acht', 'Fino a otto'),
  subtitle: L('Al 4, ver 8. İniş.', 'In 4, out 8. Descent.', 'Entra 4, suelta 8. Bajada.', 'Entre 4, sors 8. Descente.', 'Ein 4, aus 8. Abstieg.', 'Dentro 4, fuori 8. Discesa.'),
}

const dayTitle: [string, ReturnType<typeof L>][] = [
  ['panic-1', L('Dalga haritası', 'Wave map', 'Mapa de la ola', 'Carte de la vague', 'Wellenkarte', 'Mappa dell’onda')],
  ['panic-2', L('Ayaklar yerde', 'Feet on the ground', 'Pies en el suelo', 'Pieds au sol', 'Füße am Boden', 'Piedi a terra')],
  ['panic-3', L('Nefes dalgası', 'Breath wave', 'Ola de aliento', 'Vague de souffle', 'Atemwelle', 'Onda di respiro')],
  ['panic-4', L('Cümle ve sahne', 'Line and scene', 'Frase y escena', 'Phrase et scène', 'Satz und Szene', 'Frase e scena')],
  ['panic-5', L('Isı ve temas', 'Heat and contact', 'Calor y contacto', 'Chaleur et contact', 'Wärme und Kontakt', 'Calore e contatto')],
  ['panic-6', L('Geçti ritüeli', 'It-passed ritual', 'Rito de pasó', 'Rituel c’est passé', 'Vorbei-Ritual', 'Rito è passato')],
  ['panic-7', L('Küçük şükran', 'Small thanks', 'Gracia pequeña', 'Petit merci', 'Kleiner Dank', 'Piccolo grazie')],
  ['anxiety-1', L('Prova yasağı', 'No rehearsal', 'Prohibido ensayar', 'Interdit de répéter', 'Probenverbot', 'Vietato provare')],
  ['anxiety-2', L('Omuzlardan indir', 'Drop the shoulders', 'Baja los hombros', 'Baisse les épaules', 'Schultern senken', 'Spalle giù')],
  ['anxiety-3', L('Kutu ritim', 'Box rhythm', 'Ritmo de caja', 'Rythme carré', 'Kastenrhythmus', 'Ritmo a scatola')],
  ['anxiety-4', L('İşe yarayan cümle', 'A line that works', 'Una frase que sirve', 'Une phrase qui tient', 'Ein Satz der trägt', 'Una frase che tiene')],
  ['anxiety-5', L('Sahne detayı', 'Scene detail', 'Detalle de escena', 'Détail de scène', 'Szenendetail', 'Dettaglio di scena')],
  ['anxiety-6', L('Bırakış denemesi', 'Release try', 'Prueba de soltar', 'Essai de lâcher', 'Loslass-Versuch', 'Prova di rilascio')],
  ['anxiety-7', L('Gece tohumu', 'Night seed', 'Semilla de noche', 'Graine de nuit', 'Nachtsamen', 'Seme di notte')],
  ['derealization-1', L('Kenar çiz', 'Draw an edge', 'Dibuja un borde', 'Trace un bord', 'Eine Kante ziehen', 'Traccia un bordo')],
  ['derealization-2', L('Renk ve ısı', 'Color and heat', 'Color y calor', 'Couleur et chaleur', 'Farbe und Wärme', 'Colore e calore')],
  ['derealization-3', L('Ses katmanı', 'Sound layer', 'Capa de sonido', 'Couche de son', 'Klangschicht', 'Strato di suono')],
  ['derealization-4', L('Doku yürüyüşü', 'Texture walk', 'Caminata de textura', 'Marche de texture', 'Texturgang', 'Cammino di trama')],
  ['derealization-5', L('Pencere ışığı', 'Window light', 'Luz de ventana', 'Lumière de fenêtre', 'Fensterlicht', 'Luce della finestra')],
  ['derealization-6', L('Adlandırma turu', 'Naming round', 'Ronda de nombres', 'Tour de noms', 'Nennrunde', 'Giro di nomi')],
  ['derealization-7', L('Koy tohumu', 'Cove seed', 'Semilla de cala', 'Graine d’anse', 'Bucht-Samen', 'Seme di cala')],
  ['depersonalization-1', L('Ağırlık', 'Weight', 'Peso', 'Poids', 'Gewicht', 'Peso')],
  ['depersonalization-2', L('Ad ve tarih', 'Name and date', 'Nombre y fecha', 'Nom et date', 'Name und Datum', 'Nome e data')],
  ['depersonalization-3', L('Eller', 'Hands', 'Manos', 'Mains', 'Hände', 'Mani')],
  ['depersonalization-4', L('İç çekiş', 'Sigh', 'Suspiro', 'Soupir', 'Seufzer', 'Sospiro')],
  ['depersonalization-5', L('Yürüme sayımı', 'Walk count', 'Cuenta al andar', 'Compte en marchant', 'Schrittzählung', 'Conto camminando')],
  ['depersonalization-6', L('Sıcaklık haritası', 'Heat map', 'Mapa de calor', 'Carte de chaleur', 'Wärmekarte', 'Mappa di calore')],
  ['depersonalization-7', L('Örtü tohumu', 'Cover seed', 'Semilla de cubierta', 'Graine de couverture', 'Decken-Samen', 'Seme di coperta')],
]
dayTitle.forEach(([id, title]) => {
  PACK[id] = { ...(PACK[id] ?? {}), title }
})

PACK['panic-1'] = {
  ...PACK['panic-1'],
  summary: L(
    'Alarmın bir kehanet olmadığını bedenle hatırla.',
    'Remember with the body that alarm is not a prophecy.',
    'Recuerda con el cuerpo que la alarma no es una profecía.',
    'Rappelle au corps que l’alarme n’est pas une prophétie.',
    'Erinnere den Körper: Alarm ist keine Prophezeiung.',
    'Ricorda col corpo che l’allarme non è una profezia.',
  ),
  sentence: L('Bu anda güvende oturuyorum.', 'Right now I sit in safety.', 'Ahora mismo me siento a salvo.', 'En cet instant je suis assis en sûreté.', 'In diesem Moment sitze ich in Sicherheit.', 'In questo momento sto seduto al sicuro.'),
  scene: L(
    'Bildığın bir oda. Kapı görünür. Bir lamba. Ayakların yerde.',
    'A room you know. The door is visible. A lamp. Feet on the floor.',
    'Una habitación que conoces. La puerta se ve. Una lámpara. Pies en el suelo.',
    'Une pièce que tu connais. La porte se voit. Une lampe. Pieds au sol.',
    'Ein Raum, den du kennst. Die Tür ist sichtbar. Eine Lampe. Füße am Boden.',
    'Una stanza che conosci. La porta si vede. Una lampada. Piedi a terra.',
  ),
  release: L('Zihne işi bırak diyorum. Ben zorlamıyorum.', 'I tell the mind to drop the job. I do not force.', 'Le digo a la mente que suelte el trabajo. No fuerzo.', 'Je dis à l’esprit de lâcher la tâche. Je ne force pas.', 'Ich sage dem Kopf, die Arbeit zu lassen. Ich zwinge nicht.', 'Dico alla mente di lasciare il lavoro. Non forzo.'),
  gratitude: L('Nefes alabildiğim için teşekkür ederim.', 'Thanks for being able to breathe.', 'Gracias por poder respirar.', 'Merci de pouvoir respirer.', 'Danke, dass Atmen möglich ist.', 'Grazie di poter respirare.'),
  nightSeed: L('Kapalı kapı, loş lamba, yorganın ağırlığı.', 'Closed door, dim lamp, weight of the blanket.', 'Puerta cerrada, lámpara tenue, peso de la manta.', 'Porte fermée, lampe basse, poids de la couverture.', 'Geschlossene Tür, schwache Lampe, Gewicht der Decke.', 'Porta chiusa, lampada fioca, peso della coperta.'),
}
PACK['panic-1-b0'] = {
  title: L('Otur, ağırlığı bırak', 'Sit, drop the weight', 'Siéntate, suelta el peso', 'Assieds-toi, lâche le poids', 'Sitz, lass das Gewicht', 'Siediti, lascia il peso'),
  body: L(
    'Sandalye seni taşıyor. Çeneyi milim bırak. Omuzları kulaklardan uzaklaştır. Eller yumuşak. Bu bir tedavi seansı değil; kısa bir mola.',
    'The chair carries you. Drop the jaw a millimeter. Shoulders away from the ears. Soft hands. This is not a treatment session; a short pause.',
    'La silla te lleva. Suelta la mandíbula un milímetro. Hombros lejos de las orejas. Manos suaves. No es una sesión de tratamiento; una pausa corta.',
    'La chaise te porte. Lâche la mâchoire d’un millimètre. Épaules loin des oreilles. Mains douces. Ce n’est pas une séance de traitement ; une courte pause.',
    'Der Stuhl trägt dich. Kiefer einen Millimeter. Schultern weg von den Ohren. Weiche Hände. Keine Behandlung; eine kurze Pause.',
    'La sedia ti porta. Lascia la mascella di un millimetro. Spalle lontane dalle orecchie. Mani morbide. Non è una seduta di cura; una pausa breve.',
  ),
  kicker: L('Rahat beden', 'Soft body', 'Cuerpo suave', 'Corps doux', 'Weicher Körper', 'Corpo morbido'),
}
PACK['panic-1-b1'] = {
  title: L('Tepe ve iniş', 'Peak and drop', 'Cima y bajada', 'Cime et descente', 'Gipfel und Fall', 'Cima e discesa'),
  body: L(
    'Panik bir dağ değil, bir dalgadır. Tırmanır, tepe yapar, iner. Sen kıyıda duran kişisin. Sadece “şimdi yoğun, sonra daha az” tut.',
    'Panic is not a mountain; it is a wave. It climbs, peaks, falls. You are the person on the shore. Hold only “intense now, then less.”',
    'El pánico no es una montaña; es una ola. Sube, hace cima, baja. Eres la persona en la orilla. Solo “ahora intenso, luego menos.”',
    'La panique n’est pas une montagne ; c’est une vague. Elle monte, culmine, redescend. Tu es la personne sur la rive. Seulement « intense maintenant, puis moins ».',
    'Panik ist kein Berg; eine Welle. Sie steigt, gipfelt, fällt. Du bist die Person am Ufer. Nur „jetzt heftig, dann weniger“.',
    'Il panico non è una montagna; è un’onda. Sale, culmina, scende. Sei la persona sulla riva. Solo «adesso intenso, poi meno».',
  ),
  kicker: L('Harita', 'Map', 'Mapa', 'Carte', 'Karte', 'Mappa'),
}

PACK.panic = {
  promise: L(
    'Tepe gelir, tepe iner. Sen odada kalırsın.',
    'The peak comes, the peak falls. You stay in the room.',
    'La cima llega, la cima baja. Te quedas en la habitación.',
    'La cime vient, la cime redescend. Tu restes dans la pièce.',
    'Der Gipfel kommt, der Gipfel fällt. Du bleibst im Raum.',
    'La cima arriva, la cima scende. Resti nella stanza.',
  ),
}
PACK.anxiety = {
  promise: L(
    'Endişe gelecekte yaşar. Sen şimdiye bir sandalye koyarsın.',
    'Worry lives in the future. You put a chair in the present.',
    'La preocupación vive en el futuro. Pones una silla en el presente.',
    'L’inquiétude vit dans le futur. Tu poses une chaise dans le présent.',
    'Sorge lebt in der Zukunft. Du stellst einen Stuhl in die Gegenwart.',
    'La preoccupazione vive nel futuro. Metti una sedia nel presente.',
  ),
}
PACK.derealization = {
  promise: L(
    'Cam buğulanır. Oda yine de odadır.',
    'The glass fogs. The room is still a room.',
    'El cristal se empaña. La habitación sigue siendo habitación.',
    'Le verre s’embue. La pièce reste une pièce.',
    'Das Glas beschlägt. Der Raum bleibt ein Raum.',
    'Il vetro si appanna. La stanza resta una stanza.',
  ),
}
PACK.depersonalization = {
  promise: L(
    'İzleyici koltuğundan koltuğun kumaşına dön.',
    'Come back from the spectator seat to the cloth of the chair.',
    'Vuelve del asiento de espectador a la tela de la silla.',
    'Reviens du siège de spectateur au tissu de la chaise.',
    'Komm vom Zuschauersitz zurück zum Stoff des Stuhls.',
    'Torna dal sedile dello spettatore al tessuto della sedia.',
  ),
}

export function locLibrary(item: LibraryItem, locale: LocaleId): LibraryItem {
  const p = PACK[item.id]
  if (!p) return item
  return {
    ...item,
    title: pickPack(p.title, locale, item.title),
    subtitle: pickPack(p.subtitle, locale, item.subtitle),
    body: locale === 'tr' ? item.body : pickPack(p.body, locale, item.body),
    sentence: item.sentence != null ? pickPack(p.sentence, locale, item.sentence) : item.sentence,
    nightSeed: item.nightSeed != null ? pickPack(p.nightSeed, locale, item.nightSeed) : item.nightSeed,
  }
}

export function locBreath<T extends BreathPattern & { subtitle: string; label: string }>(b: T, locale: LocaleId): T {
  const p = PACK[b.id]
  if (!p) return b
  return {
    ...b,
    label: pickPack(p.label, locale, b.label),
    subtitle: pickPack(p.subtitle, locale, b.subtitle),
  }
}

export function locDay(programId: string, d: ProgramDay, locale: LocaleId): ProgramDay {
  const p = PACK[`${programId}-${d.day}`]
  const blocks = d.blocks.map((b, i) => {
    const bp = PACK[`${programId}-${d.day}-b${i}`]
    if (!bp) return b
    return {
      ...b,
      kicker: pickPack(bp.kicker, locale, b.kicker),
      title: pickPack(bp.title, locale, b.title),
      body: pickPack(bp.body, locale, b.body),
    }
  })
  if (!p) return { ...d, blocks }
  return {
    ...d,
    title: pickPack(p.title, locale, d.title),
    summary: pickPack(p.summary, locale, d.summary),
    sentence: pickPack(p.sentence, locale, d.sentence),
    scene: pickPack(p.scene, locale, d.scene),
    release: pickPack(p.release, locale, d.release),
    gratitude: pickPack(p.gratitude, locale, d.gratitude),
    nightSeed: d.nightSeed != null ? pickPack(p.nightSeed, locale, d.nightSeed) : d.nightSeed,
    blocks,
  }
}

export function locDoor(d: Door, locale: LocaleId): Door {
  const p = PACK[d.id]
  if (!p?.promise) return d
  return { ...d, promise: pickPack(p.promise, locale, d.promise) }
}

export function packTitle(id: string, locale: LocaleId, fallback: string): string {
  return pickPack(PACK[id]?.title ?? PACK[id]?.label, locale, fallback)
}

export function packRecord(id: string, fallback: string): Record<LocaleId, string> {
  return {
    tr: packTitle(id, 'tr', fallback),
    en: packTitle(id, 'en', fallback),
    es: packTitle(id, 'es', fallback),
    fr: packTitle(id, 'fr', fallback),
    de: packTitle(id, 'de', fallback),
    it: packTitle(id, 'it', fallback),
  }
}

function fillDay(
  id: string,
  extra: {
    summary: Record<LocaleId, string>
    sentence: Record<LocaleId, string>
    scene: Record<LocaleId, string>
    release: Record<LocaleId, string>
    gratitude: Record<LocaleId, string>
    nightSeed: Record<LocaleId, string>
    b0: { kicker: Record<LocaleId, string>; title: Record<LocaleId, string>; body: Record<LocaleId, string> }
    b1: { kicker: Record<LocaleId, string>; title: Record<LocaleId, string>; body: Record<LocaleId, string> }
  },
) {
  const { b0, b1, ...rest } = extra
  PACK[id] = { ...(PACK[id] ?? {}), ...rest }
  PACK[`${id}-b0`] = b0
  PACK[`${id}-b1`] = b1
}

fillDay('panic-2', {
  summary: L(
    'Taban, topuk, yer. Alarm ayakta değil, yerde söner.',
    'Sole, heel, floor. The alarm fades on the ground, not in the air.',
    'Planta, talón, suelo. La alarma se apaga en el suelo, no en el aire.',
    'Plante, talon, sol. L’alarme s’éteint au sol, pas en l’air.',
    'Sohle, Ferse, Boden. Der Alarm klingt am Boden aus, nicht in der Luft.',
    'Pianta, tallone, suolo. L’allarme si spegne a terra, non in aria.',
  ),
  sentence: L('Ayaklarım yerde, ben buradayım.', 'My feet are on the floor; I am here.', 'Mis pies están en el suelo; estoy aquí.', 'Mes pieds sont au sol ; je suis ici.', 'Meine Füße sind am Boden; ich bin hier.', 'I piedi sono a terra; sono qui.'),
  scene: L('Taş bir eşik. Serin. Sabah ışığı eşikte duruyor. Sen eşikte duruyorsun.', 'A stone threshold. Cool. Morning light on the sill. You stand on the sill.', 'Un umbral de piedra. Fresco. Luz de mañana. Tú en el umbral.', 'Un seuil de pierre. Frais. Lumière du matin. Tu es sur le seuil.', 'Eine steinerne Schwelle. Kühl. Morgenlicht. Du stehst auf der Schwelle.', 'Una soglia di pietra. Fresca. Luce del mattino. Stai sulla soglia.'),
  release: L('Kontrolü bırakıyorum. Yer zaten beni taşıyor.', 'I drop control. The ground already carries me.', 'Suelto el control. El suelo ya me lleva.', 'Je lâche le contrôle. Le sol me porte déjà.', 'Ich lasse die Kontrolle. Der Boden trägt mich schon.', 'Lascio il controllo. Il suolo mi porta già.'),
  gratitude: L('Bu zemine teşekkür ederim.', 'Thanks for this floor.', 'Gracias por este suelo.', 'Merci pour ce sol.', 'Danke für diesen Boden.', 'Grazie per questo suolo.'),
  nightSeed: L('Eşik, serin taş, kapı tokmağı.', 'Threshold, cool stone, door handle.', 'Umbral, piedra fresca, pomo.', 'Seuil, pierre fraîche, poignée.', 'Schwelle, kühler Stein, Klinke.', 'Soglia, pietra fresca, maniglia.'),
  b0: {
    kicker: L('Rahat beden', 'Soft body', 'Cuerpo suave', 'Corps doux', 'Weicher Körper', 'Corpo morbido'),
    title: L('İki taban', 'Two soles', 'Dos plantas', 'Deux plantes', 'Zwei Sohlen', 'Due piante'),
    body: L(
      'Ayakkabı veya çorap fark etmez. Tabanın tamamını hisset. Sol topuk, sağ topuk. Ağırlığı eşit böl. Dizleri kilitleme.',
      'Shoes or socks do not matter. Feel the whole sole. Left heel, right heel. Split the weight. Do not lock the knees.',
      'Zapato o calcetín da igual. Siente toda la planta. Talón izquierdo, derecho. Parte el peso. No trances las rodillas.',
      'Chaussure ou chaussette, peu importe. Sens toute la plante. Talon gauche, droit. Partage le poids. Ne bloque pas les genoux.',
      'Schuh oder Socke egal. Spüre die ganze Sohle. Linke Ferse, rechte Ferse. Teile das Gewicht. Knie nicht sperren.',
      'Scarpa o calza non importa. Senti tutta la pianta. Tallone sinistro, destro. Dividi il peso. Non bloccare le ginocchia.',
    ),
  },
  b1: {
    kicker: L('Temas', 'Contact', 'Contacto', 'Contact', 'Kontakt', 'Contatto'),
    title: L('Yerin adı', 'Name of the ground', 'Nombre del suelo', 'Nom du sol', 'Name des Bodens', 'Nome del suolo'),
    body: L(
      'Yer sert mi, yumuşak mı, serin mi. Bir kelime seç ve içinden tekrarla. Zihin kaçarsa kelimeye dön. Kaçış yok, sadece dönüş.',
      'Is the ground hard, soft, cool. Pick one word and repeat it inside. If the mind leaves, return to the word. No escape, only return.',
      'El suelo es duro, blando, fresco. Elige una palabra y repítela. Si la mente se va, vuelve a la palabra. No hay huida, solo vuelta.',
      'Le sol est dur, mou, frais. Choisis un mot et répète-le. Si l’esprit part, reviens au mot. Pas de fuite, seulement un retour.',
      'Ist der Boden hart, weich, kühl. Ein Wort wählen und innen wiederholen. Wandert der Kopf, zurück zum Wort. Keine Flucht, nur Rückkehr.',
      'Il suolo è duro, morbido, fresco. Scegli una parola e ripetila. Se la mente scappa, torna alla parola. Niente fuga, solo ritorno.',
    ),
  },
})

fillDay('anxiety-1', {
  summary: L(
    'Zihin yarını çalıştırır. Sen şimdiye sandalye koyarsın.',
    'The mind rehearses tomorrow. You put a chair in now.',
    'La mente ensaya el mañana. Pones una silla en el ahora.',
    'L’esprit répète demain. Tu poses une chaise dans maintenant.',
    'Der Kopf probt morgen. Du stellst einen Stuhl ins Jetzt.',
    'La mente prova il domani. Metti una sedia nell’adesso.',
  ),
  sentence: L('Şimdi bu sandalyedeyim, yarın burada değil.', 'I am in this chair now; tomorrow is not here.', 'Estoy en esta silla ahora; mañana no está aquí.', 'Je suis dans cette chaise maintenant ; demain n’est pas ici.', 'Ich sitze jetzt auf diesem Stuhl; morgen ist nicht hier.', 'Sono su questa sedia adesso; il domani non è qui.'),
  scene: L('Bildiğin bir masa, kapalı bir defter, üstünde bir bardak. Defter işini bitirdi.', 'A table you know, a closed notebook, a glass on it. The notebook is done.', 'Una mesa que conoces, un cuaderno cerrado, un vaso. El cuaderno terminó.', 'Une table connue, un carnet fermé, un verre. Le carnet a fini.', 'Ein bekannter Tisch, ein geschlossenes Heft, ein Glas. Das Heft ist fertig.', 'Un tavolo che conosci, un quaderno chiuso, un bicchiere. Il quaderno ha finito.'),
  release: L('Yarını çözmeyi bırakıyorum.', 'I stop solving tomorrow.', 'Dejo de resolver el mañana.', 'J’arrête de résoudre demain.', 'Ich höre auf, morgen zu lösen.', 'Smetto di risolvere il domani.'),
  gratitude: L('Bu duruş için teşekkür ederim.', 'Thanks for this sitting.', 'Gracias por este estar sentado.', 'Merci pour cette assise.', 'Danke für dieses Sitzen.', 'Grazie per questo stare seduto.'),
  nightSeed: L('Kapalı defter, sönük lamba.', 'Closed notebook, dim lamp.', 'Cuaderno cerrado, lámpara baja.', 'Carnet fermé, lampe basse.', 'Geschlossenes Heft, schwache Lampe.', 'Quaderno chiuso, lampada fioca.'),
  b0: {
    kicker: L('Rahat beden', 'Soft body', 'Cuerpo suave', 'Corps doux', 'Weicher Körper', 'Corpo morbido'),
    title: L('Çene kilidi', 'Jaw lock', 'Cierre de mandíbula', 'Verrou de mâchoire', 'Kiefersperre', 'Blocco della mascella'),
    body: L(
      'Azı dişlerini ayır. Dil alt damağa. Anksiyete çoğu zaman çenede oturur.',
      'Unclench the molars. Tongue to the lower palate. Anxiety often sits in the jaw.',
      'Separa las muelas. Lengua al paladar bajo. La ansiedad suele sentarse en la mandíbula.',
      'Desserre les molaires. Langue au palais bas. L’anxiété s’assoit souvent dans la mâchoire.',
      'Backenzähne lösen. Zunge zum unteren Gaumen. Angst sitzt oft im Kiefer.',
      'Stacca i molari. Lingua al palato basso. L’ansia spesso siede nella mascella.',
    ),
  },
  b1: {
    kicker: L('Sınır', 'Boundary', 'Límite', 'Limite', 'Grenze', 'Limite'),
    title: L('Pencere', 'Window', 'Ventana', 'Fenêtre', 'Fenster', 'Finestra'),
    body: L(
      'Kaygıyı yok etmeyeceksin. Ona on dakikalık bir defter penceresi vereceksin. Pencere kapanınca prova yasak.',
      'You will not erase worry. You will give it a ten-minute notebook window. When the window shuts, rehearsal is forbidden.',
      'No borrarás la preocupación. Le darás una ventana de diez minutos. Al cerrar, ensayar está prohibido.',
      'Tu n’effaceras pas l’inquiétude. Tu lui donnes une fenêtre de dix minutes. Fermée, la répétition est interdite.',
      'Du löschst die Sorge nicht. Du gibst ihr ein zehnminütiges Heftfenster. Ist es zu, ist Proben verboten.',
      'Non cancellerai la preoccupazione. Le dai una finestra di dieci minuti. Chiusa, provare è vietato.',
    ),
  },
})

fillDay('derealization-1', {
  summary: L('Kenar çiz. Oda yine odadır.', 'Draw an edge. The room is still a room.', 'Dibuja un borde. La habitación sigue siendo habitación.', 'Trace un bord. La pièce reste une pièce.', 'Eine Kante ziehen. Der Raum bleibt ein Raum.', 'Traccia un bordo. La stanza resta una stanza.'),
  sentence: L('Kenarlar duruyor, ben odadayım.', 'The edges stay; I am in the room.', 'Los bordes siguen; estoy en la habitación.', 'Les bords restent ; je suis dans la pièce.', 'Die Kanten bleiben; ich bin im Raum.', 'I bordi restano; sono nella stanza.'),
  scene: L('Kapı dikdörtgeni. Pencere. Yerin cinsi. Bir lamba.', 'The door rectangle. A window. The kind of floor. A lamp.', 'El rectángulo de la puerta. Una ventana. El suelo. Una lámpara.', 'Le rectangle de la porte. Une fenêtre. Le sol. Une lampe.', 'Das Türrechteck. Ein Fenster. Der Boden. Eine Lampe.', 'Il rettangolo della porta. Una finestra. Il pavimento. Una lampada.'),
  release: L('Sisle tartışmayı bırakıyorum.', 'I stop arguing with fog.', 'Dejo de discutir con la niebla.', 'J’arrête de discuter avec le brouillard.', 'Ich höre auf, mit dem Nebel zu streiten.', 'Smetto di discutere con la nebbia.'),
  gratitude: L('Bu kenar için teşekkür ederim.', 'Thanks for this edge.', 'Gracias por este borde.', 'Merci pour ce bord.', 'Danke für diese Kante.', 'Grazie per questo bordo.'),
  nightSeed: L('Kapı, lamba, yer.', 'Door, lamp, floor.', 'Puerta, lámpara, suelo.', 'Porte, lampe, sol.', 'Tür, Lampe, Boden.', 'Porta, lampada, pavimento.'),
  b0: {
    kicker: L('Rahat beden', 'Soft body', 'Cuerpo suave', 'Corps doux', 'Weicher Körper', 'Corpo morbido'),
    title: L('Taban ve oturak', 'Sole and seat', 'Planta y asiento', 'Plante et siège', 'Sohle und Sitz', 'Pianta e sedile'),
    body: L(
      'İki taban. Oturak. Sırt. Üç temas. Sis bunları iptal etmez.',
      'Two soles. The seat. The back. Three contacts. Fog does not cancel them.',
      'Dos plantas. El asiento. La espalda. Tres contactos. La niebla no los anula.',
      'Deux plantes. Le siège. Le dos. Trois contacts. Le brouillard ne les annule pas.',
      'Zwei Sohlen. Der Sitz. Der Rücken. Drei Kontakte. Nebel streicht sie nicht.',
      'Due piante. Il sedile. La schiena. Tre contatti. La nebbia non li cancella.',
    ),
  },
  b1: {
    kicker: L('Kenar', 'Edge', 'Borde', 'Bord', 'Kante', 'Bordo'),
    title: L('Dikdörtgen', 'Rectangle', 'Rectángulo', 'Rectangle', 'Rechteck', 'Rettangolo'),
    body: L(
      'Kapının dikdörtgenini içinden çiz. Sonra pencerenin. İsim ver: “kapı”, “cam”. Sanki yok.',
      'Trace the door rectangle inside. Then the window. Name them: “door”, “glass”. No “as if”.',
      'Traza el rectángulo de la puerta. Luego la ventana. Nombra: “puerta”, “cristal”. Sin “como si”.',
      'Trace le rectangle de la porte. Puis la fenêtre. Nomme : « porte », « verre ». Pas de « comme si ».',
      'Zeichne das Türrechteck innen. Dann das Fenster. Nenne: „Tür“, „Glas“. Kein „als ob“.',
      'Traccia il rettangolo della porta. Poi la finestra. Nomina: «porta», «vetro». Niente «come se».',
    ),
  },
})

fillDay('depersonalization-1', {
  summary: L('Ağırlık. İzleyici koltuğundan kumaşa dön.', 'Weight. Come back from the spectator seat to the cloth.', 'Peso. Vuelve del asiento de espectador a la tela.', 'Poids. Reviens du siège de spectateur au tissu.', 'Gewicht. Vom Zuschauersitz zurück zum Stoff.', 'Peso. Torna dal sedile dello spettatore al tessuto.'),
  sentence: L('Bu ağırlık bende, ben bu bedendeyim.', 'This weight is in me; I am in this body.', 'Este peso está en mí; estoy en este cuerpo.', 'Ce poids est en moi ; je suis dans ce corps.', 'Dieses Gewicht ist in mir; ich bin in diesem Körper.', 'Questo peso è in me; sono in questo corpo.'),
  scene: L('Sandalye kumaşı. Avuç. Taban. Adın, bugünün tarihi.', 'Chair cloth. Palm. Sole. Your name, today’s date.', 'Tela de la silla. Palma. Planta. Tu nombre, la fecha de hoy.', 'Tissu de la chaise. Paume. Plante. Ton nom, la date d’aujourd’hui.', 'Stuhlstoff. Handfläche. Sohle. Dein Name, das heutige Datum.', 'Tessuto della sedia. Palmo. Pianta. Il tuo nome, la data di oggi.'),
  release: L('Kendime ayna tutmayı bırakıyorum.', 'I stop holding a mirror to myself.', 'Dejo de ponerme un espejo.', 'J’arrête de me tendre un miroir.', 'Ich höre auf, mir einen Spiegel hinzuhalten.', 'Smetto di mettermi uno specchio.'),
  gratitude: L('Bu basınç için teşekkür ederim.', 'Thanks for this pressure.', 'Gracias por esta presión.', 'Merci pour cette pression.', 'Danke für diesen Druck.', 'Grazie per questa pressione.'),
  nightSeed: L('Kumaş, avuç, taban.', 'Cloth, palm, sole.', 'Tela, palma, planta.', 'Tissu, paume, plante.', 'Stoff, Handfläche, Sohle.', 'Tessuto, palmo, pianta.'),
  b0: {
    kicker: L('Rahat beden', 'Soft body', 'Cuerpo suave', 'Corps doux', 'Weicher Körper', 'Corpo morbido'),
    title: L('Dört nokta', 'Four points', 'Cuatro puntos', 'Quatre points', 'Vier Punkte', 'Quattro punti'),
    body: L(
      'Sol oturak, sağ oturak, sırt, ayaklar. “Var” veya “az”. Yok deme.',
      'Left seat, right seat, back, feet. “There” or “less”. Do not say none.',
      'Asiento izquierdo, derecho, espalda, pies. “Hay” o “poco”. No digas nada.',
      'Siège gauche, droit, dos, pieds. « Il y a » ou « peu ». Ne dis pas néant.',
      'Sitz links, rechts, Rücken, Füße. „Da“ oder „weniger“. Sag nicht nichts.',
      'Sedile sinistro, destro, schiena, piedi. «C’è» o «poco». Non dire zero.',
    ),
  },
  b1: {
    kicker: L('Ad', 'Name', 'Nombre', 'Nom', 'Name', 'Nome'),
    title: L('Ad ve tarih', 'Name and date', 'Nombre y fecha', 'Nom et date', 'Name und Datum', 'Nome e data'),
    body: L(
      'Adını fısılda. Tarihi fısılda. Ayna yok. Kanıt mahkemesi yok.',
      'Whisper your name. Whisper the date. No mirror. No court of proof.',
      'Susurra tu nombre. Susurra la fecha. Sin espejo. Sin tribunal de pruebas.',
      'Chuchote ton nom. Chuchote la date. Pas de miroir. Pas de tribunal de preuve.',
      'Flüstere deinen Namen. Flüstere das Datum. Kein Spiegel. Kein Beweisgericht.',
      'Sussurra il tuo nome. Sussurra la data. Niente specchio. Niente tribunale di prove.',
    ),
  },
})

short(
  'paper-boat',
  L('Kâğıt tekne', 'Paper boat', 'Barco de papel', 'Bateau de papier', 'Papierboot', 'Barchetta di carta'),
  L('Sakin gölet, yavaş kıyı', 'Quiet pond, slow shore', 'Estanque quieto, orilla lenta', 'Étang calme, rive lente', 'Stiller Teich, langsames Ufer', 'Stagno quieto, riva lenta'),
  L('Tekne yavaş, kıyı yerinde, ben duruyorum.', 'The boat is slow, the shore stays, and I stay.', 'El barco va despacio, la orilla sigue, y yo me quedo.', 'Le bateau est lent, la rive reste, et je reste.', 'Das Boot ist langsam, das Ufer bleibt, und ich bleibe.', 'La barca è lenta, la riva resta, e io resto.'),
  L(
    'Küçük gölet, kâğıt tekne, kıyı. Su durgun. Tekne yarışmıyor. Sen toprakta oturuyorsun. Tohum: kâğıt tekne, durgun su, ılık kıyı. Bırak. Tekneyi yönetme.',
    'A small pond, a paper boat, a shore. Still water. The boat is not racing. You sit on the earth. Seed: paper boat, still water, warm shore. Release. Do not steer the boat.',
    'Un estanque pequeño, un barco de papel, una orilla. Agua quieta. El barco no corre. Te sientas en la tierra. Semilla: barco de papel, agua quieta, orilla tibia. Suelta. No gobiernes el barco.',
    'Un petit étang, un bateau de papier, une rive. Eau calme. Le bateau ne court pas. Tu es assis sur la terre. Graine : bateau de papier, eau calme, rive tiède. Lâche. Ne dirige pas le bateau.',
    'Ein kleiner Teich, ein Papierboot, ein Ufer. Stilles Wasser. Das Boot rennt nicht. Du sitzt auf der Erde. Samen: Papierboot, stilles Wasser, warmes Ufer. Loslassen. Steuere das Boot nicht.',
    'Un piccolo stagno, una barchetta di carta, una riva. Acqua ferma. La barca non corre. Siedi sulla terra. Seme: barchetta, acqua ferma, riva tiepida. Rilascia. Non guidare la barca.',
  ),
  L('Kâğıt tekne, durgun su, ılık kıyı.', 'Paper boat, still water, warm shore.', 'Barco de papel, agua quieta, orilla tibia.', 'Bateau de papier, eau calme, rive tiède.', 'Papierboot, stilles Wasser, warmes Ufer.', 'Barchetta, acqua ferma, riva tiepida.'),
)
short(
  'lamp-cat',
  L('Lamba ve kedi', 'Lamp and cat', 'Lámpara y gato', 'Lampe et chat', 'Lampe und Katze', 'Lampada e gatto'),
  L('Ilık oda, yavaş nefes', 'Warm room, slow breath', 'Habitación tibia, aliento lento', 'Pièce tiède, souffle lent', 'Warmer Raum, langsamer Atem', 'Stanza tiepida, respiro lento'),
  L('Lamba yanıyor, kedi uyuyor, oda duruyor.', 'The lamp is on, the cat sleeps, the room stays.', 'La lámpara está, el gato duerme, la habitación sigue.', 'La lampe est allumée, le chat dort, la pièce reste.', 'Die Lampe brennt, die Katze schläft, der Raum bleibt.', 'La lampada è accesa, il gatto dorme, la stanza resta.'),
  L(
    'Küçük oda, sarı lamba, halıda kıvrılmış kedi. Sen koltuktasın. Sayı yok. Tohum: sarı lamba, yün kedi, sessiz halı. Bırak.',
    'Small room, yellow lamp, a cat curled on the rug. You are in the chair. No counting. Seed: yellow lamp, wool cat, quiet rug. Release.',
    'Habitación pequeña, lámpara amarilla, gato en la alfombra. Estás en la silla. Sin contar. Semilla: lámpara, gato, alfombra quieta. Suelta.',
    'Petite pièce, lampe jaune, chat sur le tapis. Tu es dans le fauteuil. Pas de compte. Graine : lampe, chat, tapis calme. Lâche.',
    'Kleiner Raum, gelbe Lampe, Katze auf dem Teppich. Du sitzt. Nicht zählen. Samen: Lampe, Katze, stiller Teppich. Loslassen.',
    'Stanza piccola, lampada gialla, gatto sul tappeto. Sei in poltrona. Niente conto. Seme: lampada, gatto, tappeto quieto. Rilascia.',
  ),
  L('Sarı lamba, yün kedi, sessiz halı.', 'Yellow lamp, wool cat, quiet rug.', 'Lámpara amarilla, gato de lana, alfombra quieta.', 'Lampe jaune, chat de laine, tapis calme.', 'Gelbe Lampe, Wollkatze, stiller Teppich.', 'Lampada gialla, gatto di lana, tappeto quieto.'),
)
short(
  'olive-gate',
  L('Zeytin kapısı', 'Olive gate', 'Puerta de olivo', 'Porte d’olivier', 'Oliventor', 'Porta d’olivo'),
  L('Taş sütunlar, akşam ışığı', 'Stone columns, evening light', 'Columnas de piedra, luz de tarde', 'Colonnes de pierre, lumière du soir', 'Steinsäulen, Abendlicht', 'Colonne di pietra, luce serale'),
  L('Kapı açık, zeytin duruyor, ben geçmiyorum aceleyle.', 'The gate is open, the olive stays, I do not rush through.', 'La puerta está abierta, el olivo sigue, no paso de prisa.', 'La porte est ouverte, l’olivier reste, je ne traverse pas en hâte.', 'Das Tor ist offen, der Ölbaum bleibt, ich gehe nicht eilig durch.', 'La porta è aperta, l’olivo resta, non passo in fretta.'),
  L(
    'Tepe, taş sütunlar, zeytin. Bir açıklık, kapı gibi. Tanrı adı yok. Otur, sırt taşta. Tohum: zeytin yaprağı, taş sütun, akşam tozu. Bırak.',
    'A hill, stone columns, olives. An opening like a gate. No god’s name. Sit, back on stone. Seed: olive leaf, stone column, evening dust. Release.',
    'Una colina, columnas, olivos. Un hueco como puerta. Sin nombre de dios. Siéntate, espalda en la piedra. Semilla: hoja, columna, polvo de tarde. Suelta.',
    'Une colline, des colonnes, des oliviers. Une ouverture comme une porte. Pas de nom de dieu. Assieds-toi, dos à la pierre. Graine : feuille, colonne, poussière du soir. Lâche.',
    'Ein Hügel, Säulen, Oliven. Eine Öffnung wie ein Tor. Kein Göttername. Sitz, Rücken am Stein. Samen: Olivenblatt, Säule, Abendstaub. Loslassen.',
    'Una collina, colonne, ulivi. Un varco come una porta. Nessun nome di dio. Siedi, schiena sulla pietra. Seme: foglia, colonna, polvere serale. Rilascia.',
  ),
  L('Zeytin yaprağı, taş sütun, akşam tozu.', 'Olive leaf, stone column, evening dust.', 'Hoja de olivo, columna, polvo de tarde.', 'Feuille d’olivier, colonne, poussière du soir.', 'Olivenblatt, Steinsäule, Abendstaub.', 'Foglia d’olivo, colonna, polvere serale.'),
)
short(
  'quiet-well',
  L('Sessiz kuyu', 'Quiet well', 'Pozo quieto', 'Puits calme', 'Stiller Brunnen', 'Pozzo quieto'),
  L('Taş yalak, ince su', 'Stone rim, thin water', 'Borde de piedra, agua fina', 'Rebord de pierre, eau mince', 'Steinrand, dünnes Wasser', 'Orlo di pietra, acqua sottile'),
  L('Kuyu derin değil, su ince, ben kıyıda.', 'The well is not deep; the water is thin; I stay at the rim.', 'El pozo no es hondo; el agua es fina; me quedo al borde.', 'Le puits n’est pas profond ; l’eau est mince ; je reste au rebord.', 'Der Brunnen ist nicht tief; das Wasser dünn; ich bleibe am Rand.', 'Il pozzo non è fondo; l’acqua è sottile; resto all’orlo.'),
  L(
    'Avlu, taş kuyu, yakın su. Yüzünü arama. Kenara avuç koy. Tohum: taş kuyu, ince su, akşam gölgesi. Dibini yoklama.',
    'A courtyard, a stone well, near water. Do not hunt your face. Palm on the rim. Seed: stone well, thin water, evening shade. Do not sound the bottom.',
    'Un patio, un pozo de piedra, agua cerca. No busques tu cara. Palma en el borde. Semilla: pozo, agua fina, sombra. No sondes el fondo.',
    'Une cour, un puits de pierre, l’eau proche. Ne cherche pas ton visage. Paume sur le rebord. Graine : puits, eau mince, ombre. Ne sonde pas le fond.',
    'Ein Hof, ein Steinbrunnen, nahes Wasser. Suche nicht dein Gesicht. Handfläche am Rand. Samen: Brunnen, dünnes Wasser, Schatten. Lotet den Grund nicht.',
    'Un cortile, un pozzo di pietra, acqua vicina. Non cercare il viso. Palmo sull’orlo. Seme: pozzo, acqua sottile, ombra. Non scandagliare il fondo.',
  ),
  L('Taş kuyu, ince su, akşam gölgesi.', 'Stone well, thin water, evening shade.', 'Pozo de piedra, agua fina, sombra de tarde.', 'Puits de pierre, eau mince, ombre du soir.', 'Steinbrunnen, dünnes Wasser, Abendschatten.', 'Pozzo di pietra, acqua sottile, ombra serale.'),
)
extraShort(
  'slow-evening',
  L('Akşam yavaş', 'Slow evening', 'Tarde lenta', 'Soir lent', 'Langsamer Abend', 'Sera lenta'),
  L('Okunan bir parça, sohbet kaydı değil', 'A spoken piece, not a talk show', 'Un texto leído, no un programa', 'Un texte lu, pas une émission', 'Ein gelesener Text, keine Sendung', 'Un brano letto, non una trasmissione'),
  L('Akşam yavaş, masa yerinde, ben oturuyorum.', 'Evening is slow, the table stays, I sit.', 'La tarde es lenta, la mesa sigue, me siento.', 'Le soir est lent, la table reste, je m’assieds.', 'Der Abend ist langsam, der Tisch bleibt, ich sitze.', 'La sera è lenta, il tavolo resta, mi siedo.'),
  L(
    'Podcast sunucusu yok. Masa, su, ekran kenarda. Omuz inebilir. Yavaş kal. Tohum: masa, su, sönük lamba.',
    'No podcast host. A table, water, the screen aside. A shoulder may drop. Stay slow. Seed: table, water, dim lamp.',
    'No hay presentador. Mesa, agua, pantalla a un lado. Un hombro puede bajar. Quédate lento. Semilla: mesa, agua, lámpara tenue.',
    'Pas d’animateur. Table, eau, écran de côté. Une épaule peut descendre. Reste lent. Graine : table, eau, lampe basse.',
    'Kein Moderator. Tisch, Wasser, Bildschirm beiseite. Eine Schulter darf sinken. Bleib langsam. Samen: Tisch, Wasser, dunkle Lampe.',
    'Niente conduttore. Tavolo, acqua, schermo da parte. Una spalla può scendere. Resta lento. Seme: tavolo, acqua, lampada fioca.',
  ),
)
extraShort(
  'room-enough',
  L('Oda yeter', 'The room is enough', 'La habitación basta', 'La pièce suffit', 'Der Raum reicht', 'La stanza basta'),
  L('Kısa konuşma', 'A short talk', 'Una charla corta', 'Une courte parole', 'Ein kurzes Gespräch', 'Un breve discorso'),
  L('Bu oda yeter, ben buradayım.', 'This room is enough, and I am here.', 'Esta habitación basta, y estoy aquí.', 'Cette pièce suffit, et je suis ici.', 'Dieser Raum reicht, und ich bin hier.', 'Questa stanza basta, e sono qui.'),
  L(
    'Dört kenar, zemin, tavan. Bir nesne, bir ses, adını söyle. Odayı mükemmel yapma.',
    'Four edges, floor, ceiling. One object, one sound, name them. Do not perfect the room.',
    'Cuatro bordes, suelo, techo. Un objeto, un sonido, nómbralos. No perfecciones la habitación.',
    'Quatre bords, sol, plafond. Un objet, un son, nomme-les. Ne perfectionne pas la pièce.',
    'Vier Kanten, Boden, Decke. Ein Ding, ein Klang, nenne sie. Mach den Raum nicht perfekt.',
    'Quattro bordi, pavimento, soffitto. Un oggetto, un suono, nominali. Non perfezionare la stanza.',
  ),
)
extraShort(
  'desk-window',
  L('Masa ve pencere', 'Desk and window', 'Mesa y ventana', 'Bureau et fenêtre', 'Schreibtisch und Fenster', 'Scrivania e finestra'),
  L('İş arası, tek görev', 'A work pause, one task', 'Pausa de trabajo, una tarea', 'Pause de travail, une tâche', 'Arbeitspause, eine Aufgabe', 'Pausa di lavoro, un compito'),
  L('Bir iş, bir pencere, omuzlar inik.', 'One task, one window, shoulders down.', 'Una tarea, una ventana, hombros bajos.', 'Une tâche, une fenêtre, épaules basses.', 'Eine Aufgabe, ein Fenster, Schultern unten.', 'Un compito, una finestra, spalle giù.'),
  L(
    'Tek bir iş adı. Omuz, taban, pencere kenarı. Beş nefes. Verimliliği kanıtlama.',
    'One task name. Shoulders, soles, window edge. Five breaths. Do not prove productivity.',
    'Un nombre de tarea. Hombros, plantas, borde de ventana. Cinco alientos. No pruebes productividad.',
    'Un nom de tâche. Épaules, plantes, bord de fenêtre. Cinq souffles. Ne prouve pas la productivité.',
    'Ein Aufgabenname. Schultern, Sohlen, Fensterkante. Fünf Atem. Beweise keine Produktivität.',
    'Un nome di compito. Spalle, piante, bordo finestra. Cinque respiri. Non dimostrare produttività.',
  ),
)
extraShort(
  'one-task',
  L('Tek iş', 'One task', 'Una tarea', 'Une tâche', 'Eine Aufgabe', 'Un compito'),
  L('Listeyi daralt', 'Narrow the list', 'Estrecha la lista', 'Resserre la liste', 'Die Liste engen', 'Restringi la lista'),
  L('Bugün bir iş yeter.', 'One task is enough today.', 'Hoy basta una tarea.', 'Une tâche suffit aujourd’hui.', 'Heute reicht eine Aufgabe.', 'Oggi basta un compito.'),
  L(
    'Üç şey varsa ikisini rafa yaz. Birini masada bırak. Listen kahramanlık değil.',
    'If there are three, put two on a shelf. Leave one on the desk. The list is not a hero story.',
    'Si hay tres, pon dos en un estante. Deja una en la mesa. La lista no es una hazaña.',
    'S’il y en a trois, mets-en deux sur une étagère. Laisse-en une sur le bureau. La liste n’est pas un exploit.',
    'Wenn drei da sind, zwei aufs Brett. Eine auf dem Tisch. Die Liste ist keine Heldentat.',
    'Se sono tre, mettine due sullo scaffale. Lasciane uno sulla scrivania. La lista non è un’impresa.',
  ),
)
extraShort(
  'week-note',
  L('Bu haftanın notu', 'This week’s note', 'La nota de esta semana', 'La note de cette semaine', 'Die Notiz dieser Woche', 'La nota di questa settimana'),
  L('Uygulama içi bülten, e-posta yok', 'In-app note, no email', 'Nota en la app, sin correo', 'Note dans l’app, pas d’e-mail', 'Notiz in der App, keine E-Mail', 'Nota nell’app, nessuna e-mail'),
  L('Bu hafta yavaş, bir milim yeter.', 'This week is slow; one millimeter is enough.', 'Esta semana es lenta; basta un milímetro.', 'Cette semaine est lente ; un millimètre suffit.', 'Diese Woche ist langsam; ein Millimeter reicht.', 'Questa settimana è lenta; basta un millimetro.'),
  L(
    'E-posta yok. Haftanın cümlesi: acele etme. SOS durur. Bir nefes yeter. Haftayı skor yapma.',
    'No email. The week’s line: do not rush. SOS stays. One breath is enough. Do not make the week a scoreboard.',
    'Sin correo. La frase de la semana: no corras. SOS sigue. Un aliento basta. No hagas de la semana un marcador.',
    'Pas d’e-mail. La phrase de la semaine : ne te presse pas. SOS reste. Un souffle suffit. N’en fais pas un tableau de score.',
    'Keine E-Mail. Satz der Woche: keine Eile. SOS bleibt. Ein Atem reicht. Mach keine Punktetafel daraus.',
    'Niente e-mail. Frase della settimana: non affrettarti. SOS resta. Un respiro basta. Non farne un tabellone.',
  ),
)
extraShort(
  'first-hour',
  L('İlk saat', 'First hour', 'La primera hora', 'La première heure', 'Die erste Stunde', 'La prima ora'),
  L('Steady’ye yavaş giriş', 'A slow start with Steady', 'Un comienzo lento con Steady', 'Un début lent avec Steady', 'Ein langsamer Start mit Steady', 'Un inizio lento con Steady'),
  L('Bir şey seçtim, gerisini bırakıyorum.', 'I chose one thing, and I leave the rest.', 'Elegí una cosa, y dejo el resto.', 'J’en ai choisi une, et je laisse le reste.', 'Ich wählte eines, und lasse den Rest.', 'Ne ho scelto una, e lascio il resto.'),
  L(
    'Teşhis yok. Bir kapı seç: SOS, nefes, hikâye veya üç nesne. Dil ve koyu/açık görünüm ayarlarda. Kartı uzun bas, favori olur. Donma hakkı haftada bir. Uygulamayı bitirme.',
    'No diagnosis. Pick one door: SOS, breath, a story, or three objects. Language and dark/light live in settings. Long-press a card to save it. One freeze a week. Do not finish the app.',
    'Sin diagnóstico. Elige una puerta: SOS, aliento, un relato o tres objetos. Idioma y claro/oscuro en ajustes. Mantén una tarjeta para guardarla. Un freeze por semana. No termines la app.',
    'Pas de diagnostic. Choisis une porte : SOS, souffle, un récit ou trois objets. Langue et sombre/clair dans les réglages. Appui long pour enregistrer. Un gel par semaine. Ne termine pas l’app.',
    'Keine Diagnose. Eine Tür: SOS, Atem, Geschichte oder drei Dinge. Sprache und Hell/Dunkel in den Einstellungen. Karte lange drücken zum Speichern. Ein Freeze pro Woche. Beende die App nicht.',
    'Nessuna diagnosi. Scegli una porta: SOS, respiro, un racconto o tre oggetti. Lingua e chiaro/scuro nelle impostazioni. Tieni premuta una scheda per salvarla. Un blocco a settimana. Non finire l’app.',
  ),
)
extraShort(
  'about-sleep',
  L('Uyku hakkında', 'More about sleep', 'Más sobre el sueño', 'Plus sur le sommeil', 'Mehr über Schlaf', 'Di più sul sonno'),
  L('İskelet, kür değil', 'A frame, not a cure', 'Un armazón, no una cura', 'Un cadre, pas une cure', 'Ein Gerüst, keine Kur', 'Uno scheletro, non una cura'),
  L('Yatak uykuya, gece bir tohum.', 'The bed is for sleep; the night gets one seed.', 'La cama es para dormir; la noche, una semilla.', 'Le lit est pour le sommeil ; la nuit, une graine.', 'Das Bett ist für Schlaf; die Nacht bekommt einen Samen.', 'Il letto è per il sonno; la notte, un seme.'),
  L(
    'Yatak iş yeri değil. Kalkış mümkünse sabit. Gece mahkeme yok. Işık düşer, tek tohum. Uyumazsan loş köşe, sonra dön. Bu geceyi performans yapma.',
    'The bed is not a workplace. Wake time stays steady if it can. No night court. Light drops, one seed. If sleep misses you, a dim corner, then return. Do not make tonight a performance.',
    'La cama no es un despacho. La hora de despertar, si puedes, fija. Sin tribunal nocturno. Baja la luz, una semilla. Si no llega el sueño, un rincón tenue, luego vuelve. No hagas de esta noche un rendimiento.',
    'Le lit n’est pas un bureau. L’heure du lever, si possible, fixe. Pas de tribunal de nuit. La lumière baisse, une graine. Si le sommeil manque, un coin sombre, puis retour. N’en fais pas une performance.',
    'Das Bett ist kein Arbeitsplatz. Aufstehzeit möglichst fest. Kein Nachtgericht. Licht runter, ein Samen. Kommt der Schlaf nicht, eine dunkle Ecke, dann zurück. Mach keine Vorstellung daraus.',
    'Il letto non è un ufficio. L’ora del risveglio, se puoi, fissa. Niente tribunale notturno. Luce giù, un seme. Se il sonno manca, un angolo fioco, poi torna. Non farne una prova.',
  ),
)
extraShort(
  'night-table',
  L('Gece masası', 'Night table', 'Mesa de noche', 'Table de nuit', 'Nachttisch', 'Tavolo di notte'),
  L('Okunan parça, sunucu yok', 'A spoken piece, no host', 'Un texto leído, sin presentador', 'Un texte lu, sans animateur', 'Ein gelesener Text, kein Moderator', 'Un brano letto, niente conduttore'),
  L('Masa loş, ben bırakıyorum.', 'The table is dim, and I let go.', 'La mesa está tenue, y suelto.', 'La table est sombre, et je lâche.', 'Der Tisch ist dunkel, und ich lasse los.', 'Il tavolo è fioco, e rilascio.'),
  L(
    'Yayın değil. Su, kapalı kitap, telefon ters, omuzlar. Gece işini bilir. Tohum: loş lamba, kapalı kitap, ağır örtü.',
    'Not a broadcast. Water, a closed book, phone face down, shoulders. Night knows its work. Seed: dim lamp, closed book, heavy cover.',
    'No es una emisión. Agua, libro cerrado, teléfono boca abajo, hombros. La noche sabe su trabajo. Semilla: lámpara tenue, libro cerrado, cubierta pesada.',
    'Pas une émission. Eau, livre fermé, téléphone à l’envers, épaules. La nuit sait son travail. Graine : lampe basse, livre fermé, couverture lourde.',
    'Keine Sendung. Wasser, geschlossenes Buch, Telefon umgedreht, Schultern. Die Nacht kennt ihre Arbeit. Samen: dunkle Lampe, geschlossenes Buch, schwere Decke.',
    'Non è una trasmissione. Acqua, libro chiuso, telefono capovolto, spalle. La notte sa il suo lavoro. Seme: lampada fioca, libro chiuso, coperta pesante.',
  ),
)
