# 算法导论

## 前端页面导入md文档

用到的模块
- bootstrap
- jquery
- highlight

### 安装

```
    bower install marked
```

#### 最简单的用法：
```js
    var rendererMD = new marked.Renderer();
    marked.setOptions({
      renderer: rendererMD,
      gfm: true,          // 启动Github样式的Markdown
      tables: true,       // 支持Github表格，必须打开gfm选项
      breaks: false,      // 支持Github换行符，必须打开gfm选项
      pedantic: false,    // 只解析符合markdown.pl定义的，不修正markdown的错误
      sanitize: false,    // 原始输出，忽略HTML标签
      smartLists: true,   // 优化列表输出
      smartypants: false  // 
    });//基本设置
    console.log(marked('I am using __markdown__.'));
    // Outputs: <p>I am using <strong>markdown</strong>.</p>
```

#### marked方法

```js
marked(markdownString [,options] [,callback])
```

`markdownString`  渲染的内容，必须是字符串
`options`  渲染的设置——它是一个对象
`callback`  回调函数，如果`options`参数没有定义，它就是第二个参数

#### Option

##### heighlight

一个函数，实现文本代码块语法高亮。代码高亮基于`highlight.js`。

引入`highlight.js`:

```html
<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

```js
    var rendererMD = new marked.Renderer();
    marked.setOptions({
      renderer: rendererMD,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });
    var markdownString = '```js\n console.log("hello"); \n```';
    marked.setOptions({
        highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });

    document.getElementById('content').innerHTML = marked(markdownString);
```


参数 `code`,`lang`,`callback`

`code`--代码内容，是一个字符串
`lang`--编程语言的种类，也是字符串
`callback`--回调函数

##### renderer（渲染）

render存放的是一个对象，不声明时默认为 `new Renderer()`。

自定义渲染方式

渲染选项允许你以自定义的方式渲染内容，并把之前的规则设置覆盖掉。
比如，我想渲染`# heading+`，但是默认的规则是：`<h1></h1>`，我想改为更为复杂的结构——

```js
        var rendererMD = new marked.Renderer();
            rendererMD.heading = function (text, level) {
                var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
                return '<h' + level + '><a name="' +
                        escapedText +
                         '" class="anchor" href="#' +
                         escapedText +
                         '"><span class="header-link"></span></a>' +
                          text + '</h' + level + '>';
            }


        console.log(marked('# heading+', { renderer: rendererMD }));
        document.getElementById('content').innerHTML = marked('# heading+', { renderer: rendererMD });
```

渲染结果是:
```html
h1>
  <a name="heading-" class="anchor" href="#heading-">
    <span class="header-link"></span>
  </a>
  heading+
</h1>
```

##### 其他渲染参数

- gfm 
    + 它是一个布尔值，默认为`true`。允许 Git Hub标准的markdown.
- tables
    + 它是一个布尔值，默认为`true`。允许支持表格语法。该选项要求 `gfm `为`true`
- breaks
    + 它是一个布尔值，默认为`false`。允许回车换行。该选项要求 `gfm` 为`true`。
- pedantic
    + 它是一个布尔值，默认为`false`。尽可能地兼容 `markdown.pl`的晦涩部分。不纠正原始模型任何的不良行为和错误。
- sanitize
    + 它是一个布尔值，默认为false。对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
- smartLists
    + 它是一个布尔值，默认为false。使用比原生markdown更时髦的列表。 旧的列表将可能被作为`pedantic`的处理内容过滤掉.
- smartypants
    + 它是一个布尔值，默认为false。使用更为时髦的标点，比如在引用语法中加入破折号。

##### lexer和parser

还可以使用词法分析器。通过它可以追加规则：

```js
    var tokens = marked.lexer('text');//把text解析为一个marked.js的内部对象
        console.log(marked.parser(tokens));//又把这个对象转化为html字符串。（<p>text</p>）

        var lexer = new marked.Lexer({sanitize: true});//放option信息
        var tokens = lexer.lex('<h1>hello</h1>');//<p>&lt;h1&gt;hello&lt;/h1&gt;</p>
        console.log(marked.parser(tokens));
        console.log(lexer.rules);//打出正则信息
```


## 导入MathJax.js

引入：
```html
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default"></script>
```

手动渲染:
```js
MathJax.Hub.Config({
  tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}//配置$作为行内公式的标记
});
MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
```
