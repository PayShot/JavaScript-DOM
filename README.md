JavaScript-DOM
==============

A complete data structure of the HTML Document Object Model in JavaScript.

```javascript
var html = new DOM();

html.doctype = '<!doctype html>';

var p1 = html.createElement('p');
var p2 = html.createElement('p');
var p3 = html.createElement('p');

p2.innerHTML = 'Wadih';
p3.innerHTML = 'Darin';

p1.appendChild(p2);
p1.appendChild(p3);

var comment1 = html.createElement(NodeType.COMMENT_NODE);
comment1.text = "Paragraphs";
html.appendChild(comment1);

html.appendChild(p1);

var div1 = html.createElement('div');
var div2 = html.createElement('div');
var div3 = html.createElement('div');

div2.innerHTML = 'Ramzi';
div3.innerHTML = 'Nanci';

div1.appendChild(div2);
div1.appendChild(div3);

var comment2 = html.createElement(NodeType.COMMENT_NODE);
comment2.text = "Divs";
html.appendChild(comment2);

html.appendChild(div1);

var img = html.createElement('img', NodeType.ATTRIBUTE_NODE);
img.setAttribute('src', 'http://www.github.com/ramzikomati');

html.appendChild(img);
html.toString()
```
