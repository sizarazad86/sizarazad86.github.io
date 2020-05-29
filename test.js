/* SOURCE CODE */

class TerminalEffect {
	constructor(params) {
		this.lines = params.lines
		this.speedText = params.speedText
		this.$wrapper = params.wrapper
		this.turn = 0
		this.indexLine = 0
	}
	start() {
		this.animateLine()
	}
	animateLine() {
		const getText = this.getLine()

		let $line
		if (!getText || !getText.animated) return

		if (getText.isLink) {
			$line = document.createElement("a")
			$line.href = getText.url
			$line.target = "_blank"
		} else {
			$line = document.createElement("p")
		}
		if (getText.beginLine) {
			$line.innerText = getText.beginLine
		}

		$line.classList.add("line")
		const animated = getText.animated.split("")
		this.$wrapper.appendChild($line)

		this.sto = setInterval(() => {
			if (animated[this.turn - 1] == " ") {
				$line.innerText += ` ${animated[this.turn]}`
			} else {
				$line.innerText += animated[this.turn]
			}
			this.turn++
			if (this.turn == animated.length) this.handleNewLine(getText.clear)
		}, this.speedText)
	}
	getLine() {
		const actualLine = this.lines[this.indexLine]
		if (typeof actualLine === "undefined") {
			return false
		} else if (typeof actualLine === "string" || typeof actualLine.animated === "string") {
			return actualLine.animated ? actualLine : {
				animated: actualLine
			}
		}
	}
	handleNewLine(isClear) {
		clearInterval(this.sto)
		setTimeout(() => {
			if (isClear) this.$wrapper.innerText = ""
			this.turn = 0
			this.indexLine++
			this.animateLine()
		}, 1)
	}
	stop() {
		clearInterval(this.sto)
	}
}

/* INITIALIZATION */

// SELECTORS
const $wrapper = document.getElementById("terminal")

// LINES TO ANIMATE
const terminalLines = [
	{
		beginLine: "terminal-name:~",
		animated: " clear",
		clear: true
  },
	{
		beginLine: "terminal-name:~",
		animated: " terminal_effect v1.0",
  },
	{
		animated: "by cristianpache.co",
		isLink: true,
		url: "https://cristianpache.co"
  },
  " ",
  "Can you control all of css and effect configuration",
	{
		animated: "Effect with vanilla.js",
		isLink: true,
		url: "http://vanilla-js.com/"
  },
  " ",
  "Enjoy!"
]

// OBJECT CONFIG
const config = {
	lines: terminalLines, // array
	speedText: 70, // number
	wrapper: $wrapper // selector
}

// INITIALIZATION
let AnotherTerminal = new TerminalEffect(config)
AnotherTerminal.start()