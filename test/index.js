import fs from 'fs'
import path from 'path'
import test from 'ava'

import remark from 'remark'

const descriptionList = require('..')

function loadFixtures() {
	const fixture = fs.readFileSync(path.join(__dirname, 'fixture.md'))
	const fixtureTreeJson = fs.readFileSync(path.join(__dirname, 'fixtureTree.json'))
	const fixtureTree = JSON.parse(fixtureTreeJson)

	return [fixture, fixtureTree]
}

test('remark should parse a regular document', t => {
	const [fixture, fixtureTree] = loadFixtures()
	const tree = JSON.parse(JSON.stringify(remark().parse(fixture)))

	t.deepEqual(tree, fixtureTree, 'Remark on its own parses a regular markdown tree.')
})

test('plugin should create one description-list', t => {
	t.snapshot(remark().use(descriptionList).processSync('d\n: L1\n: L2'),
		'Remark generate description-list with plugin.'
	)
})

test('plugin should modify ast', t => {
	const fixture = {
		children: [
			{
				type: 'paragraph',
				children: [
					{
						type: 'text',
						value: 'd\n: L1\n: L2'
					}
				]
			}
		]
	}

	const tree = {
		children: [
			{
				type: 'paragraph',
				children: [
					{type: 'html', value: '<dl>'},
					{type: 'html', value: '<dt>'},
					{type: 'text', value: 'd'},
					{type: 'html', value: '</dt>'},
					{type: 'html', value: '<dd>'},
					{type: 'text', value: 'L1'},
					{type: 'html', value: '</dd>'},
					{type: 'html', value: '<dd>'},
					{type: 'text', value: 'L2'},
					{type: 'html', value: '</dd>'},
					{type: 'html', value: '</dl>'}
				]
			}
		]
	}

	t.deepEqual(tree, descriptionList()(fixture), 'Plugin modifies tree as expected')
})

