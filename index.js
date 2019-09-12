module.exports = _ => {
	function nodeMatches(node) {
		const pattern = new RegExp(/^(.+?[\r\n]+)+?:/gm)

		return node.type === 'paragraph' &&
			node.children.length === 1 &&
			node.children[0].type === 'text' &&
			pattern.test(node.children[0].value)
	}

	function newNode(type, value) {
		return {
			type,
			value
		}
	}

	return root => {
		root.children = root.children.map(c => {
			if (nodeMatches(c) === true) {
				const children = []
				const lines = c.children.shift().value.split(/\r?\n/)

				children.push(newNode('html', '<dl>'))

				for (let l of lines) {
					let tag
					if (l[0] === ':') {
						tag = 'dd'
						l = l.slice(1)
					} else {
						tag = 'dt'
					}

					children.push(newNode('html', '<' + tag + '>'))
					children.push(newNode('text', l.trim()))
					children.push(newNode('html', '</' + tag + '>'))
				}

				children.push(newNode('html', '</dl>'))

				c.children = children
			}

			return c
		})

		return root
	}
}
