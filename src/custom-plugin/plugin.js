import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
// import HtmlDataProcessor from '@ckeditor/ckeditor5-engine/src'
// import * as converters from '@ckeditor/ckeditor5-image/src/image/converters'
export default class extends Plugin {
    init() {

        const editor = this.editor
        const t = editor.t

        // editor.model.schema.register('imgT', {
        //     inheritAllFrom: '$text',
        //     allowAttributes: ['alt', 'src']
        // });
        // editor.data.upcastDispatcher.on('element:img', (evt, data, conversionApi) => {
        //     console.log('hello!')
        //     const { modelRange } = conversionApi.convertChildren(data.viewItem, data.modelCursor);

        //     for (let item of modelRange.getItems()) {
        //         if (conversionApi.schema.checkAttribute(item, 'src')) {
        //             conversionApi.writer.setAttribute('src', data.viewItem.getAttribute('src'), item);
        //         }
        //     }

        // }, { priority: 'low' });
        // editor.conversion.elementToElement({ model: 'imgT', view: 'img' })
        // editor.conversion.attributeToAttribute({
        //     view: 'alt', model: 'alt'
        // })
        // editor.conversion.attributeToAttribute({
        //     view: 'src', model: 'src'
        // });



        editor.ui.componentFactory.add('imgMarks', locale => {
            const dropdownView = createDropdown(locale);
            dropdownView.buttonView.set({
                label: t('imgMarks'),
                icon: imageIcon,
                tooltip: true
            });

            const itemDefinitions = new Collection();
            const conf = editor.config.get('imgMarks');
            for (const option of conf.options) {
                const def = {
                    type: 'button',
                    model: new Model({
                        label: option.sizeStr,
                        withText: true,
                        val: option.sizeStr
                    })
                };
                itemDefinitions.add(def)
            }
            this.listenTo(dropdownView, 'execute', evt => {
                if (typeof conf.resovleFn === 'function') {
                    conf.resovleFn(evt.source.val).then(info => {
                        let txt = `![${info.no}#${info.description}](size:${info.size})`
                        writeTxt(txt)
                    })
                } else {
                    let txt = evt.source.val;
                    writeTxt(txt)
                }
            });

            function writeTxt(txt) {
                editor.model.change(writer => {
                    editor.model.insertContent(writer.createText(txt));
                })
            }

            addListToDropdown(dropdownView, itemDefinitions);
            // view.on('execute', () => {
            //     // console.log('=1=')
            //     // 三种方式插入图片：
            //     // editor.model.change(writer => {
            //     //     const imageElement = writer.createElement('image', {
            //     //         src: "https://pic.qqtn.com/up/2018-5/15257448141370755.jpg"
            //     //     });
            //     //     console.log(imageElement)
            //     //     editor.model.insertContent(imageElement, editor.model.document.selection);
            //     // })


            //     const viewFragment = editor.data.processor.toView(`<img src="https://pic.qqtn.com/up/2018-5/15257448141370755.jpg">`)
            //     console.log(JSON.stringify(viewFragment))
            //     const modelFragment = editor.data.toModel(viewFragment);
            //     console.log(JSON.stringify(modelFragment))
            //     editor.model.insertContent(modelFragment);

            //     // editor.execute('imageInsert',{source:'https://pic.qqtn.com/up/2018-5/15257448141370755.jpg'})

            // })
            return dropdownView;
        })
    }
}
















import first from '@ckeditor/ckeditor5-utils/src/first';

// converters.viewFigureToModel=function() {
//     console.log('===viewFigureToModel')
// 	return dispatcher => {
// 		dispatcher.on( 'element:figure', converter );
// 	};

// 	function converter( evt, data, conversionApi ) {
// 		// Do not convert if this is not an "image figure".
// 		if ( !conversionApi.consumable.test( data.viewItem, { name: true, classes: 'image' } ) ) {
// 			return;
// 		}

// 		// Find an image element inside the figure element.
// 		const viewImage = Array.from( data.viewItem.getChildren() ).find( viewChild => viewChild.is( 'img' ) );

// 		// Do not convert if image element is absent, is missing src attribute or was already converted.
// 		if ( !viewImage || !viewImage.hasAttribute( 'src' ) || !conversionApi.consumable.test( viewImage, { name: true } ) ) {
// 			return;
// 		}

// 		// Convert view image to model image.
// 		const conversionResult = conversionApi.convertItem( viewImage, data.modelCursor );

// 		// Get image element from conversion result.
// 		const modelImage = first( conversionResult.modelRange.getItems() );

// 		// When image wasn't successfully converted then finish conversion.
// 		if ( !modelImage ) {
// 			return;
// 		}

// 		// Convert rest of the figure element's children as an image children.
// 		conversionApi.convertChildren( data.viewItem, conversionApi.writer.createPositionAt( modelImage, 0 ) );

// 		// Set image range as conversion result.
// 		data.modelRange = conversionResult.modelRange;

// 		// Continue conversion where image conversion ends.
// 		data.modelCursor = conversionResult.modelCursor;
// 	}
// }

// converters.srcsetAttributeConverter=function() {
//     console.log('===srcsetAttributeConverter')
// 	return dispatcher => {
// 		dispatcher.on( 'attribute:srcset:image', converter );
// 	};

// 	function converter( evt, data, conversionApi ) {
// 		if ( !conversionApi.consumable.consume( data.item, evt.name ) ) {
// 			return;
// 		}

// 		const writer = conversionApi.writer;
// 		const figure = conversionApi.mapper.toViewElement( data.item );
// 		const img = figure.getChild( 0 );

// 		if ( data.attributeNewValue === null ) {
// 			const srcset = data.attributeOldValue;

// 			if ( srcset.data ) {
// 				writer.removeAttribute( 'srcset', img );
// 				writer.removeAttribute( 'sizes', img );

// 				if ( srcset.width ) {
// 					writer.removeAttribute( 'width', img );
// 				}
// 			}
// 		} else {
// 			const srcset = data.attributeNewValue;

// 			if ( srcset.data ) {
// 				writer.setAttribute( 'srcset', srcset.data, img );
// 				// Always outputting `100vw`. See https://github.com/ckeditor/ckeditor5-image/issues/2.
// 				writer.setAttribute( 'sizes', '100vw', img );

// 				if ( srcset.width ) {
// 					writer.setAttribute( 'width', srcset.width, img );
// 				}
// 			}
// 		}
// 	}
// }

// converters.modelToViewAttributeConverter=function( attributeKey ) {
//     console.log('===modelToViewAttributeConverter')
// 	return dispatcher => {
// 		dispatcher.on( `attribute:${ attributeKey }:image`, converter );
// 	};

// 	function converter( evt, data, conversionApi ) {
// 		if ( !conversionApi.consumable.consume( data.item, evt.name ) ) {
// 			return;
// 		}

// 		const viewWriter = conversionApi.writer;
// 		const figure = conversionApi.mapper.toViewElement( data.item );
// 		const img = figure.getChild( 0 );

// 		if ( data.attributeNewValue !== null ) {
// 			viewWriter.setAttribute( data.attributeKey, data.attributeNewValue, img );
// 		} else {
// 			viewWriter.removeAttribute( data.attributeKey, img );
// 		}
// 	}
// }