# Markling

Markling transforms the **markling** markup language into React components.

## Installation

`npm install markling --save`

## Usage and Example

After installation, there are 2 main steps to using Markling:

**1.** Import Markling into your app at the top of each component you want to use it with:

```javascript
import Markling from 'markling';
```

If you use Webpack, you could instead include Markling in Webpack's `providePlugin()`, and avoid having to write the above `import` statement over and over:

```javascript
plugins: [
  new webpack.ProvidePlugin({
    // You can alias `Markling.render()` to anything you want.
    // Here, we've aliased it to `R` for convenience.
    R: ['markling', 'render'],
  }),
],
```

**2.** Use `Markling.render` inside any text React component to transform markling language into formatted React text components:

```javascript
function MyComponent(props) {

  // The second <p> element uses the alias shown in the Webpack example config above.
  return (
    <div>
      <p>{Markling.render('This string will render with _(italics).')}</p>
      <p>{R('This one will have *(bold) text.')}</p>
    </div>
  );

}
```

---

## Documentation

### `Markling.render(string, props)`

Transforms markling into formatted React text components, interpolating with a props object.

#### Parameters

##### `string` **String** *required*

A markling string (see "Markling syntax" below for details).

##### `props` **Object** *optional*

An object containing key/value pairs to interpolate into the markling string. Note that only certain markling fragments are able to accept such values.

#### Returns

An array of React components.

---

## Markling syntax

Formatted snippets of text in markling are called `fragment`s. Each `fragment` is wrapped in a pair of parentheses, and then preceded by a `signifier`:

```javascript
Markling.render(`_(This) is a fragment, and so is *(this).`);
```

There are 6 signifiers, each corresponding to a different HTML tag:

| Signifier | HTML tag |
| ---       | ---      |
| `_`       | `em`     |
| `*`       | `strong` |
| `^`       | `sup`    |
| `~`       | `sub`    |
| `@`       | `a`      |
| ```       | `code`   |

The above example would thus be transformed by `Markling.render()` to:

```javascript
<em>{'This'}</em>{' is a fragment, and so is '}<strong>{'this'}</strong>{'.'}
```

### The `@` fragment

The `@` signifier has additional syntax. To set the `href` of the resultant `<a>` element, follow the fragment with an `href` parameter in square brackets:

```javascript
Markling.render('@(This)[https://www.google.com] is a link to Google.');
```

To set `target="_blank"` on a `@` fragment, follow the fragment with a greater-than sign:

```javascript
Markling.render('@(This)[https://www.google.com]> link will open in a new tab or window.');
```

If a `props` parameter is given to `Markling.render()`, the `@` fragment will first search in `props` for a key matching its literal `href` parameter.
- If such a key exists, it will use that key's value as its `href`.
- If no such key exists, it will use the literal `href` parameter provided.

```javascript
Markling.render('@(This)[my_href] is also a link to Google', {
  my_href: 'https://www.google.com',
});
```
