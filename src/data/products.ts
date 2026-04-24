import catBrooms from "@/assets/cat-brooms.png";
import catCloths from "@/assets/cat-cloths.png";
import catBucket from "@/assets/cat-bucket.png";
import catMops from "@/assets/cat-mops.png";
import catBags from "@/assets/cat-bags.png";
import catBulbs from "@/assets/cat-bulbs.png";
import catGloves from "@/assets/cat-gloves.png";
import catSponges from "@/assets/cat-sponges.png";
import decoGloves from "@/assets/deco-gloves.png";
import decoMop from "@/assets/deco-mop.png";
import decoSponge from "@/assets/deco-sponge.png";
import decoBulb from "@/assets/deco-bulb.png";
import productCloth from "@/assets/product-cloth.png";
import productMop from "@/assets/product-mop.png";
import productSponge from "@/assets/product-sponge.png";
import floatBrush from "@/assets/float-brush.png";
import floatBucket from "@/assets/float-bucket.png";
import floatGlove from "@/assets/float-glove.png";
import floatMop from "@/assets/float-mop.png";
import floatSponge from "@/assets/float-sponge.png";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  story: string;
  image: string;
  gallery: string[];
  heroImages: string[];
  features: string[];
  useCases: string[];
  materials: string;
  specs: { label: string; value: string }[];
  benefits: { title: string; desc: string }[];
}

export const products: Product[] = [
  {
    slug: "doreza",
    name: "Doreza",
    tagline: "Mbrojtje maksimale për duart tuaja",
    description:
      "Doreza profesionale prej gome dhe lateksi, të dizajnuara për pastrim të sigurt dhe efikas. Rezistente ndaj kimikateve, me kontroll të shkëlqyer dhe komoditet gjatë përdorimit të përditshëm.",
    story:
      "Çdo detajë e dorezave tona është menduar me kujdes — nga trashësia e materialit deri te tekstura anti-rrëshqitje. Krijuara për profesionistë që nuk bëjnë kompromis me sigurinë dhe cilësinë.",
    image: catGloves,
    gallery: [catGloves, decoGloves, floatGlove, catBags, catCloths],
    heroImages: [catGloves, decoGloves, floatGlove],
    features: [
      "Rezistente ndaj kimikateve",
      "Gripp anti-rrëshqitje",
      "Komode për përdorim të gjatë",
      "Madhësi të ndryshme (S–XL)",
    ],
    useCases: [
      "Pastrim shtëpie",
      "Pastrim industrial",
      "Përdorim në kuzhina profesionale",
    ],
    materials: "Gome natyrale, lateks, nitrile",
    specs: [
      { label: "Madhësia", value: "S, M, L, XL" },
      { label: "Trashësia", value: "0.4mm – 0.8mm" },
      { label: "Gjatësia", value: "30cm – 45cm" },
      { label: "Ngjyra", value: "E verdhë, rozë, blu" },
    ],
    benefits: [
      { title: "Mbrojtje e plotë", desc: "Mbrojnë duart nga kimikate agresive dhe temperatura të larta." },
      { title: "Kontroll preciz", desc: "Tekstura e veçantë ofron gripp të shkëlqyer edhe në sipërfaqe të lagura." },
      { title: "Komoditet gjatë orësh", desc: "Dizajni ergonomik parandalon lodhjen edhe pas përdorimit të gjatë." },
    ],
  },
  {
    slug: "peshqire-mikrofiber",
    name: "Peshqirë Mikrofiber",
    tagline: "Absorbim superior për çdo sipërfaqe",
    description:
      "Peshqirë mikrofiber me cilësi të lartë që pastrojnë pa lënë gjurmë. Ideale për xham, mobilje, dhe sipërfaqe delikate. Thithin lagështirën 7x më shumë se materialet konvencionale.",
    story:
      "Mikrofiber-i ynë nuk është thjesht një leckë — është teknologji pastrimi. Çdo fije është 100x më e hollë se floku i njeriut, duke kapur papastërtinë që sytë nuk e shohin.",
    image: catCloths,
    gallery: [catCloths, productCloth, floatSponge, catSponges, catBucket],
    heroImages: [catCloths, productCloth, floatSponge],
    features: [
      "Absorbim 7x më i lartë",
      "Pa gjurmë & pa vija",
      "I ripërdorshëm dhjetëra herë",
      "Ngjyra të ndryshme për zona të ndryshme",
    ],
    useCases: [
      "Pastrim xhamash",
      "Fshirje mobiljesh",
      "Pastrim automjetesh",
    ],
    materials: "80% polyester, 20% polyamide",
    specs: [
      { label: "Përbërja", value: "80% polyester, 20% polyamide" },
      { label: "Madhësia", value: "30x30cm, 40x40cm, 60x40cm" },
      { label: "Pesha", value: "300gsm – 400gsm" },
      { label: "Larje", value: "Deri në 90°C" },
    ],
    benefits: [
      { title: "Pastrim pa kimikate", desc: "Vetëm me ujë, largon 99% të baktereve nga sipërfaqet." },
      { title: "Kursim afatgjatë", desc: "Zgjat deri në 500 larje pa humbur cilësinë." },
      { title: "I gjithanshëm", desc: "Funksionon në çdo sipërfaqe — xham, inox, dru, plastikë." },
    ],
  },
  {
    slug: "kova",
    name: "Kova",
    tagline: "Qëndrueshmëri që nuk kompromentohet",
    description:
      "Kova profesionale të dizajnuara për pastrim të përditshëm dhe industrial. Me kapacitete të ndryshme dhe dizajn ergonomik, ofrojnë funksionalitet dhe jetëgjatësi.",
    story:
      "Një kovë e mirë bën diferencën mes pastrimit efikas dhe humbjes së kohës. Kovat tona janë inxhinieruar për balancë, qëndrueshmëri, dhe lehtësi përdorimi — çdo ditë, çdo herë.",
    image: catBucket,
    gallery: [catBucket, floatBucket, catMops, decoMop, catCloths],
    heroImages: [catBucket, floatBucket, catMops],
    features: [
      "Plastikë e trashë, e qëndrueshme",
      "Dorezë ergonomike",
      "Kapacitete 5L, 10L, 15L",
      "Shtrydhëse e integruar",
    ],
    useCases: [
      "Pastrim dyshemesh",
      "Pastrim industrial",
      "Përdorim i përgjithshëm",
    ],
    materials: "Polipropilen i ricikluar, çelik inox",
    specs: [
      { label: "Kapaciteti", value: "5L, 10L, 15L" },
      { label: "Materiali", value: "PP i ricikluar" },
      { label: "Dorezë", value: "Çelik inox + gomë" },
      { label: "Ngjyra", value: "Blu, gri, e kuqe" },
    ],
    benefits: [
      { title: "E papërkulshme", desc: "Plastika e trashë nuk deformohet edhe pas vitesh përdorimi." },
      { title: "Lehtë për tu mbajtur", desc: "Doreza ergonomike shpërndan peshën në mënyrë të barabartë." },
      { title: "Shtrydhëse praktike", desc: "Sistemi i integruar kursen kohë dhe mund gjatë pastrimit." },
    ],
  },
  {
    slug: "shtupa",
    name: "Shtupa",
    tagline: "Pastrim i thellë, rezultat profesional",
    description:
      "Shtupa pambuku dhe mikrofiber për pastrim të thellë të dyshemeve. Nga modelet klasike deri tek ato me sistem shtrydhëse, çdo shtupë ofron performancë të nivelit profesional.",
    story:
      "Shtupa e duhur transformon pastrimin nga detyrë e lodhshme në proces efikas. Me fije që kapin çdo grimcë papastërtie dhe sisteme shtrydhëse intuitive, shtupat tona janë aleati yt i përditshëm.",
    image: catMops,
    gallery: [catMops, productMop, decoMop, floatMop, catBucket],
    heroImages: [catMops, productMop, floatMop],
    features: [
      "Fije pambuku ose mikrofiber",
      "Sistem shtrydhëse praktik",
      "Bisht alumini i lehtë",
      "Koka të ndërrueshme",
    ],
    useCases: [
      "Pastrim dyshemesh të mëdha",
      "Restorante & hotele",
      "Shtëpi & zyra",
    ],
    materials: "Pambuk 100%, mikrofiber, alumin",
    specs: [
      { label: "Gjatësia bishtit", value: "120cm – 150cm" },
      { label: "Materiali i kokës", value: "Pambuk / mikrofiber" },
      { label: "Gjerësia", value: "30cm – 50cm" },
      { label: "Pesha", value: "400g – 600g" },
    ],
    benefits: [
      { title: "Pastrim i thellë", desc: "Fijet e gjata arrijnë çdo çarje dhe qoshe të dyshemesë." },
      { title: "Kursim kohe", desc: "Sistemi i shtrydhëses redukton kohën e pastrimit me 40%." },
      { title: "Jetëgjatësi", desc: "Kokat e ndërrueshme zgjatin jetën e produktit pa limit." },
    ],
  },
  {
    slug: "qese",
    name: "Qese",
    tagline: "Zgjidhje e besueshme për mbeturina",
    description:
      "Qese mbeturinash në ngjyra dhe madhësi të ndryshme. Të forta, rezistente ndaj grisjes, dhe me aroma të këndshme. Ideale për shtëpi, zyra, dhe biznese.",
    story:
      "Çdo qese e jona kalon testime rigoroze për forcë dhe qëndrueshmëri. Sepse një qese që griset nuk është thjesht bezdi — është problem higjienik që ne e zgjidhim para se të ndodhë.",
    image: catBags,
    gallery: [catBags, catGloves, floatGlove, catSponges, decoSponge],
    heroImages: [catBags, catGloves, floatGlove],
    features: [
      "Rezistente ndaj grisjes",
      "Me lidhëse praktike",
      "Ngjyra të koduara sipas madhësisë",
      "Opsione me aromë",
    ],
    useCases: [
      "Mbeturina shtëpiake",
      "Mbeturina biznesi",
      "Riciklim i organizuar",
    ],
    materials: "HDPE, LDPE (me opsion biodegradable)",
    specs: [
      { label: "Madhësia", value: "35L, 60L, 100L, 120L" },
      { label: "Trashësia", value: "20μ – 60μ" },
      { label: "Materiali", value: "HDPE / LDPE" },
      { label: "Copë/Rrotull", value: "10, 20, 30 copë" },
    ],
    benefits: [
      { title: "Nuk grisen", desc: "Materiali i përforcuar mban peshë deri në 25kg pa problem." },
      { title: "Aromë e freskët", desc: "Opsionet me aromë neutralizojnë erërat e pakëndshme." },
      { title: "Eko-miqësore", desc: "Varianti biodegradable zbërthehet brenda 24 muajsh." },
    ],
  },
  {
    slug: "llamba",
    name: "Llamba",
    tagline: "Ndriçim efikas, jetëgjatësi e lartë",
    description:
      "Llamba LED me konsum të ulët energjie dhe ndriçim cilësor. Zgjatojnë deri në 25,000 orë dhe ofrojnë dritë natyrale për çdo ambient.",
    story:
      "Ndriçimi i duhur ndryshon ambientin. Llambat tona LED kombinojnë teknologjinë më të re me dizajn elegant, duke ofruar dritë natyrale që kujdeset për sytë dhe për planetin.",
    image: catBulbs,
    gallery: [catBulbs, decoBulb, catBrooms, floatBrush, catMops],
    heroImages: [catBulbs, decoBulb, floatBrush],
    features: [
      "Konsum i ulët energjie",
      "Jetëgjatësi 25,000+ orë",
      "Dritë e ngrohtë ose e ftohtë",
      "Baza E27, E14, GU10",
    ],
    useCases: [
      "Ndriçim shtëpie",
      "Ndriçim zyre",
      "Ndriçim industrial",
    ],
    materials: "LED, alumin, polikarbonat",
    specs: [
      { label: "Fuqia", value: "5W, 9W, 12W, 15W" },
      { label: "Lumens", value: "400 – 1500 lm" },
      { label: "Temperatura", value: "2700K – 6500K" },
      { label: "Jetëgjatësia", value: "25,000 orë" },
    ],
    benefits: [
      { title: "Kursim energjie", desc: "Konsumojnë 80% më pak energji se llambat tradicionale." },
      { title: "Dritë e natyrshme", desc: "CRI >80 ofron riprodhim natyral të ngjyrave." },
      { title: "Zero mirëmbajtje", desc: "25,000 orë funksionim pa nevojë për ndërrim." },
    ],
  },
  {
    slug: "fshesa",
    name: "Fshesa",
    tagline: "Fshirje e plotë në çdo kënd",
    description:
      "Fshesa profesionale me fije sintetike dhe natyrale. Dizajne ergonomike që arrijnë çdo kënd, me bisht të fortë alumini dhe koka të ndërrueshme.",
    story:
      "Fshesa e përsosur nuk ekziston rastësisht. Çdo fije, çdo kënd, çdo detaj e bishtit është projektuar për të ofruar fshirje efikase pa mundim — nga dyshemetë e mëdha deri te qoshet e vështira.",
    image: catBrooms,
    gallery: [catBrooms, floatBrush, catMops, productMop, decoMop],
    heroImages: [catBrooms, floatBrush, productMop],
    features: [
      "Fije sintetike ose natyrale",
      "Bisht alumini i lehtë",
      "Koka të ndërrueshme",
      "Dizajn me kënd për qoshe",
    ],
    useCases: [
      "Fshirje brendshme",
      "Fshirje oborresh",
      "Pastrim industrial",
    ],
    materials: "PET, fije natyrale, alumin",
    specs: [
      { label: "Gjatësia bishtit", value: "120cm – 150cm" },
      { label: "Gjerësia e kokës", value: "25cm – 40cm" },
      { label: "Materiali i fijeve", value: "PET / fije natyrale" },
      { label: "Pesha", value: "350g – 550g" },
    ],
    benefits: [
      { title: "Arrin kudo", desc: "Dizajni me kënd pastron edhe nën mobilje dhe qoshe të ngushta." },
      { title: "E lehtë por e fortë", desc: "Bishti i aluminit ofron forcë pa shtuar peshë." },
      { title: "Ripërdorim i zgjuar", desc: "Kokat ndërrohen lehtë — bishti zgjat me vite." },
    ],
  },
  {
    slug: "sfungjere",
    name: "Sfungjerë",
    tagline: "Fuqi pastrimi në çdo formë",
    description:
      "Sfungjerë profesionale për çdo nevojë pastrimi — nga sfungjerët klasike kuzhine deri tek ato abrazive për sipërfaqe të vështira. Cilësi e testuar dhe rezistencë e lartë.",
    story:
      "Sfungjerë e mirë nuk bën vetëm pastrim — ajo kujdeset për sipërfaqen. Produktet tona kombinojnë anën e butë për pastrim delikat me anën abrazive për papastërti kokëforta, pa dëmtuar asgjë.",
    image: catSponges,
    gallery: [catSponges, productSponge, decoSponge, floatSponge, catCloths],
    heroImages: [catSponges, productSponge, decoSponge],
    features: [
      "Sipërfaqe dyfishe (e butë + abrazive)",
      "Anti-bakteriale",
      "Formë ergonomike",
      "Zgjasin 3x më shumë",
    ],
    useCases: [
      "Pastrim kuzhinash",
      "Pastrim banjosh",
      "Pastrim industrial",
    ],
    materials: "Poliuretanë, fibra abrazive, celulozë",
    specs: [
      { label: "Madhësia", value: "10x7cm, 14x9cm" },
      { label: "Trashësia", value: "3cm – 5cm" },
      { label: "Materiali", value: "Poliuretanë + fibra" },
      { label: "Copë/Paketë", value: "2, 4, 6, 10 copë" },
    ],
    benefits: [
      { title: "Dyfishe funksionale", desc: "Ana e butë pastron, ana abrazive largon yndyrnat pa gërvishje." },
      { title: "Higjienë e lartë", desc: "Trajtimi anti-bakterial parandalon rritjen e mikroorganizmave." },
      { title: "Zgjat më shumë", desc: "Materiali premium nuk zbërthehet edhe pas javësh përdorimi." },
    ],
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);
