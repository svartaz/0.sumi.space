const log = x => {
  console.log(x);
  return x;
};

document.addEventListener("DOMContentLoaded", () => {
  const [t0, t1, t2] = document.getElementsByTagName("textarea");
  const input = document.getElementsByTagName("input")[0];

  const f0 = x => replacePolishWordsKeepCase(x, convert0);
  const f1 = x => replaceNewPolishWordsKeepCase(x, x => convert1(x, input.checked));

  const onInput = () => {
    t1.value = f0(t0.value);
    t2.value = f1(t1.value);

    for (const e of document.querySelectorAll("[data-pl]"))
      e.innerHTML = f0(e.getAttribute("data-pl"));

  };

  for (const e of [input, t0])
    e.addEventListener("input", onInput);

  onInput();

  for (const e of document.querySelectorAll(".pl, .pl-table td"))
    e.innerHTML = f0(e.innerHTML);
});

const convert0 = s => s
  .toLowerCase()
  .replace(/ó/g, "u")
  .replace(/ch/g, "h")
  .replace(/w/g, "v")
  .replace(/sz/g, "ȟ")
  .replace(/cz/g, "ǩ")
  .replace(/ż/g, "ǧ")

  .replace(/(?<=[tdr])(?=i)/g, "'")

  .replace(/l/g, "lj")
  .replace(/lji/g, "li")
  .replace(/ł/g, "l")
  .replace(/ł/g, "l")
  .replace(/rzy/g, "ri")
  .replace(/(?<!zama|mie)rz/g, "rj")

  .replace(/(?<=[sz])j/g, "'j")


  .replace(/ć|ci(?=[eaouęąō])/g, "tj")
  .replace(/ci/g, "ti")
  .replace(/dź|dzi(?=[eaouęąō])/g, "dj")
  .replace(/dzi/g, "di")

  .replace(/ś/g, "sj")
  .replace(/ź/g, "zj")
  .replace(/ń/g, "nj")

  .replace(/cji/g, "ci")

  .replace(/i(?=[eaouęąō])/g, "j")
  .replace(/i/g, "jy")

  .replace(/(?<=[sz])jr/g, "rj")
  .replace(/sjtj/g, "stj")
  .replace(/zjdj/g, "zdj")
  //.replace(/(?![yeaouęą])j([^yeaouęą])j/g, "$1j")

  .replace(/dz/g, "ʒ")

  .replace(/^j(?=[ie])/g, "")
  //.replace(/(?<=[ieaouęąō])j(?![ieaouęąō])/g, "i")
  //.replace(/(?<=^|[ieaouęąō])j(?=[ieę])/g, "")

  .replace(/jy/g, "i")
  .replace(/je/g, "ě")

  //.replace(/lj/g, "ľ")
  //.replace(/rj/g, "ř")
  //.replace(/nj/g, "ň")
  //.replace(/tj/g, "ť")
  //.replace(/dj/g, "ď")
  //.replace(/sj/g, "š")
  //.replace(/zj/g, "ž")

  .normalize("NFC");

const convert1 = (s, iotate) => s
  .toLowerCase()

  .replace(/ľ/g, "lj")
  .replace(/ř/g, "rj")
  .replace(/ň/g, "nj")
  .replace(/ť/g, "tj")
  .replace(/ď/g, "dj")
  .replace(/š/g, "sj")
  .replace(/ž/g, "zj")
  .replace(/i/g, "jy")
  .replace(/ě/g, "je")

  .replace(/ō/g, "ѡ")

  .replace(/jy/g, x => iotate ? "і" : x)
  .replace(/je/g, x => iotate ? "ѥ" : x)
  .replace(/ja/g, x => iotate ? "ꙗ" : x)
  .replace(/jo/g, x => iotate ? "ю" : x)
  .replace(/ju/g, x => iotate ? "ѵ" : x)
  .replace(/ję/g, x => iotate ? "ѩ" : x)
  .replace(/ją/g, x => iotate ? "ѭ" : x)

  .replace(/y/g, x => iotate ? "ꙑ" : "и")
  .replace(/e/g, x => iotate ? "є" : "е")
  .replace(/a/g, "а")
  .replace(/o/g, "о")
  .replace(/u/g, "у")
  .replace(/ę/g, "ѧ")
  .replace(/ą/g, "ѫ")

  .replace(/p/g, "п")
  .replace(/b/g, "б")
  .replace(/f/g, "ф")
  .replace(/v/g, "в")
  .replace(/m/g, "м")

  .replace(/k/g, "к")
  .replace(/g/g, "г")
  .replace(/h/g, "х")

  .replace(/t/g, "т")
  .replace(/d/g, "д")
  .replace(/s/g, "с")
  .replace(/z/g, "з")
  .replace(/n/g, "н")
  .replace(/l/g, "л")
  .replace(/r/g, "р")

  .replace(/ǯ/g, "џ")
  .replace(/ǩ/g, "ч")
  .replace(/ȟ/g, "ш")
  .replace(/ǧ/g, "ж")
  .replace(/c/g, "ц")
  .replace(/ʒ/g, "ѕ")

  .replace(/j/g, "ь")
  .replace(/'/g, "ъ")

  .normalize("NFC");

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

const kase = s =>
  s == s.toUpperCase() ? "up" :
    s == capitalize(s) ? "cap" :
      "low";

const applyKeepCase = (s, f) =>
  ({
    up: x => x.toUpperCase(),
    low: x => x.toLowerCase(),
    cap: capitalize,
  })[kase(s)](f(s));

const replacePolishWordsKeepCase = (s, f) =>
  s.replace(/[a-pr-uwyzóęąćśźńłż]+/gi, word =>
    applyKeepCase(word, f)
  );

const replaceNewPolishWordsKeepCase = (s, f) =>
  s.replace(/[a-pr-vyzōęąʒěǯǩǧȟčšžż'\u030C]+/gi, word =>
    applyKeepCase(word, f)
  );
