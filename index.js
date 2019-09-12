module.exports = _ => {
	function nodeMatches(node) {
		const pattern = new RegExp(/^.*?[\r\n]+(:.*?[\r\n]*)+$/gm)

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
				children.push(newNode('html', '<dt>'))
				children.push(newNode('text', lines.shift().trim()))
				children.push(newNode('html', '</dt>'))

				for (const l of lines) {
					children.push(newNode('html', '<dd>'))
					children.push(newNode('text', l.slice(1).trim()))
					children.push(newNode('html', '</dd>'))
				}

				children.push(newNode('html', '</dl>'))

				c.children = children
			}

			return c
		})

		return root
	}
}
