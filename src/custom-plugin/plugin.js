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
            const conf = editor.config.get('imgMarks');
            const itemDefinitions = new Collection();
            dropdownView.buttonView.set({
                label: t(conf.label || 'imgMarks'),
                icon: imageIcon,
                tooltip: true
            });
            for (const option of conf.options) {
                const def = {
                    type: 'button',
                    model: new Model({
                        label: option.sizeStr,
                        withText: true
                    })
                };
                itemDefinitions.add(def)
            }
            this.listenTo(dropdownView, 'execute', evt => {
                let sizeStr = evt.source.label;
                if (typeof conf.resolveFn === 'function') {
                    let resolveFn = conf.resolveFn
                    resolveFn(sizeStr).then(html => {
                        const viewFragment = editor.data.processor.toView(html)
                        const modelFragment = editor.data.toModel(viewFragment);
                        editor.model.insertContent(modelFragment);
                    })
                } else {
                    console.error('imgMarks config must provide a "resolveFn" and promise a html string')
                }
            });
            addListToDropdown(dropdownView, itemDefinitions);
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