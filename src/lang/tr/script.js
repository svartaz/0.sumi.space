document.addEventListener("DOMContentLoaded", () => {
	const tas = [
		document.getElementById("0"),
		document.getElementById("1"),
	];
	const check = document.getElementsByTagName("input")[0];

	const onInput = [
		() =>
			tas[1].value = convert[0](tas[0].value, check.checked)
	];

	for (const e of [tas[0], check])
		e.addEventListener("input", onInput[0]);

	onInput[0]();
})

const xss = [
	["ç", "ṭ", true],
	["c", "ḍ", true],
	["ş", "ṣ", true],
	["j", "ẓ", true],

	["y", "j", true],

	["i", "ǐ"],
	["ı", "î"],
	["a", "â"],
	["e", "ǎ"],
	["o", "ô"],
	["ö", "ǒ"],
	["u", "û"],
	["ü", "ǔ"],
];

const replaceLowerAndUpperWithTable = (s, xss) =>
	xss.reduce((acc, [x, y]) =>
		acc
			.replace(new RegExp(x, "g"), y)
			.replace(new RegExp(x.toUpperCase(), "g"), y.toUpperCase()),
		s)


const convert = [
	(s, checked) =>
		(checked ? xss : xss.filter(xs => !(2 in xs)))
			.reduce((acc, [x, y]) =>
				acc
					.replace(new RegExp(x, "g"), y)
					.replace(new RegExp(x.toLocaleUpperCase("TR"), "g"), y.toUpperCase()),
				s.normalize("NFC"))
			.replace(/[a-zçşğṭḍṣẓâôîûǎǒǐǔ']+/gi, word => {
				let r = "";
				let state = 0;
				for (const c of word) {
					const stateNew =
						/[âôîû]/i.test(c) ? 0 :
							/[ǎǒǐǔ]/i.test(c) ? 1 :
								state;

					if (state == stateNew)
						r += replaceLowerAndUpperWithTable(c, [
							["[âǎ]", "a"],
							["[ôǒ]", "o"],
							["[îǐ]", "i"],
							["[ûǔ]", "u"],
						]);
					else {
						r += c;
						state = stateNew;
					}
				}
				return r;
			})
];