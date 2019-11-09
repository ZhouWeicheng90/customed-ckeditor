## 1、概念

需要配置toolbar，建议性下载定制版

前期可下full版，后续根据配置替换。



git clone -b stable https://github.com/ckeditor/ckeditor5-build-balloon-block.git

下载源码，可以自由的项目定制了

定制打包后，复制build中的代码就可以了。在node项目中引用，一定要注意：需要再webpack打包脚本中 exclude掉



注意官方文档 ：builds  -》 framwork  ->  features  ->  api  他们之间的关系	



```javascript
// api:
editor.setData( '<p>Some text.</p>' );
const data = editor.getData();

editor.destroy().catch( error => {console.log( error );} );
editor.model.document.on( 'change:data', () => {
    console.log( 'The data has changed!' );
} );
// 列出所有的plugins:
ClassicEditor.builtinPlugins.map( plugin => plugin.pluginName );
// 可以直接用的toolbar（ui）
Array.from( editor.ui.componentFactory.names() );
```



plugins、removePlugins、extraPlugins三种插件配置

三种toolbar：blocktoolbar、balloontoolbar、toolbar

疑问：源码构建通常都是引用xxx/src/xxx.js，  如果是build构建（不会引用core和engine）是不是直接引用xxx就行了？



理解model和两个view（editing view 一般是dom、data view不一定是dom，还可能是md等其他语言）数据通常都是通过model流向view。在向编辑器里复制一段html，会先通过converter改变model，再通过converter改变两个view。



downcast 就是由model改变两个view的过程，分为editing downcasting和data downcasting
upcast是相反的过程，由view到model的改变。

## 2、自定义toolbar按钮

```js
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';
/**	
 * 请理解上述import中的关系
 */
export default class extends Plugin {
	init() {
        const editor = this.editor
        const t = editor.t
        editor.ui.componentFactory.add('imgMarks', locale => {
            // ...  create a ui
             return dropdownView; // 或者buttonView
        })
    }
}
// 配置dropdown的view：
const dropdownView = createDropdown(locale);
dropdownView.buttonView.set({
	label: t('imgMarks'),
	icon: imageIcon,
	tooltip: true
});
addListToDropdown(dropdownView, itemDefinitions);
//配置dropdown的下拉列表：
const itemDefinitions = new Collection();
const conf = editor.config.get('imgMarks');   // 注意！
for (const option of conf.options) {
    const def = {
		type: 'button',
		model: new Model({
			label: option.sizeStr,
            withText: true,            
		})
	};
	itemDefinitions.add(def)
}
//为dropdown列表的每个按钮添加操作：
this.listenTo(dropdownView, 'execute', evt => {
	//handle: evt.source.
});

//配置普通view
let view = new ButtonView(locale)
view.set({
	label: 'inset imgMarks',
	tooltip: true
});
view.on('execute', () => {
})

```



## 3、往model里插入内容

```js
editor.model.change(writer => {
    // 就这样 使用writer 生成可以往model里写入的内容了
    // 如果不需要，也可以直接像下面那样操作！！
})
//插入格式
editor.model.insertContent(modelFragment);

// 例：插入文本：
editor.model.insertContent(writer.createText(txt),editor.model.document.selection);
//插入图片：
editor.model.insertContent(writer.createElement('image', { src: url }));
// 根据html片段插入内容:
const viewFragment = editor.data.processor.toView(htmlStr);
const modelFragment = editor.data.toModel(viewFragment);
editor.model.insertContent(modelFragment);
```

```js
// 还可以像这样 运行封装好的command 插入内容：
editor.execute('imageInsert', { source: url })
```



## 9、猜想：

```js
 schema.register( 'myElement', {    allowIn: '$root' } ); 
 就可以这样写了：
<$root>
    <myElement></myElement>
</$root>
```

三种属性：

```js
schema.register( '$root', {
    isLimit: true
} );
schema.register( '$block', {
    allowIn: '$root',
    isBlock: true
} );
schema.register( '$text', {
    allowIn: '$block',
    isInline: true
} );
```

```js
// Add a converter to editing downcast and data downcast.
editor.conversion.for( 'downcast' ).elementToElement( config ) );

// Add a converter to the data pipepline only:
editor.conversion.for( 'dataDowncast' ).elementToElement( dataConversionConfig ) );

// And a slightly different one for the editing pipeline:
editor.conversion.for( 'editingDowncast' ).elementToElement( editingConversionConfig ) );
```







原文：

Because builds are distributed as [UMD modules](https://github.com/umdjs/umd), editor classes can be retrieved in various ways:

- by a [CommonJS](http://wiki.commonjs.org/wiki/CommonJS)-compatible loader (e.g. [webpack](https://webpack.js.org/) or [Browserify](http://browserify.org/)),
- by [RequireJS](http://requirejs.org/) (or any other AMD library),
- from the global namespace if none of the above loaders is available.



```javascript
ClassicEditor
    .create( document.querySelector( '#editor' ), {
        removePlugins: [ 'Heading', 'Link' ],
```

 Be careful when removing plugins from CKEditor builds using `config.removePlugins`. If removed plugins were providing toolbar buttons, the default toolbar configuration included in a build will become invalid. In such case you need to provide the updated toolbar configuration as in the example above. 



 Although it is impossible to add plugins that have dependencies to [`@ckeditor/ckeditor5-core`](https://ckeditor.com/docs/ckeditor5/latest/api/core.html) or [`@ckeditor/ckeditor5-engine`](https://ckeditor.com/docs/ckeditor5/latest/api/engine.html) (that includes nearly all existing official plugins) without rebuilding the build, it is still possible to add simple, **dependency-free** plugins. 



 Removing a toolbar item does not remove the feature from the editor internals. If your goal with the toolbar configuration is to remove features, the right solution is to also remove their respective plugins. Check [Removing features](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/configuration.html#removing-features) above for more information. 



 npm 4+ (**note:** some npm 5+ versions were known to cause [problems](https://github.com/npm/npm/issues/16991), especially with deduplicating packages; upgrade npm when in doubt)   目前都是6+了。



 Features in CKEditor are introduced by plugins. In fact, without plugins CKEditor is an empty API with no use.  

// 从下面原文，可以看出plugin的无所不能

Common use cases for plugins are:

- **Editing features**, like bold, heading, linking or any other feature that the user can use to manipulate the content.
- **Adding semantic value** to the content, like annotations or accessibility features.
- **Third-party services integration**, for injecting external resources into the content, like videos or social network posts.
- **Handling image upload** and image manipulation features.
- **Providing widgets** for easy integration with application structured data.
- **Injecting analysis tools** that help enhance the quality of the content.
- And other infinite possibilities…


