# remark-description-list
[**Remark**][remark]-plugin to generate description lists.

## Install

[npm][]:

```sh
npm i remark-description-list
```

## Use

Markdown-paragraphs consisting of a simple line, followed by lines beginning with colons (`:`) will be rendered as [HTML-Description-Lists][html-dl]:

```markdown
# Normal Header

Normal Paragraph.
Consisting of three lines,
as you can see.

Description Term
: First description detail
: Second description detail

```

will be rendered to the following HTML:

```html
<h1>Normal Header</h1>

<p>Normal Paragraph.</br>
Consisting of three lines,</br>
as you can see.</p>

<dl>
	<dt>Description Term</dt>
	<dd>First description detail</dd>
	<dd>Second description detail</dd>
</dl>
```

## Contribute

Any feedback is more than welcome.

## License

[MIT](/LICENSE) (c) [Florian Breisch](https://github.com/florianb)




[remark]: https://github.com/remarkjs/remark
[npm]: https://docs.npmjs.com/cli/install
[html-dl]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
