/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
// import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
// import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
// import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
// import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
// import Link from '@ckeditor/ckeditor5-link/src/link';
// import List from '@ckeditor/ckeditor5-list/src/list';
// import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
// import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
// import Table from '@ckeditor/ckeditor5-table/src/table';
// import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';

// add custom plugin
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
// import GFMDataProcessor from '@ckeditor/ckeditor5-markdown-gfm/src/gfmdataprocessor';

import './theme.css';

import MyPlugin from './custom-plugin/plugin'

// function Markdown( editor ) {
//     editor.data.processor = new GFMDataProcessor();
// }

export default class BalloonEditor extends BalloonEditorBase {}

// Plugins to include in the build.
BalloonEditor.builtinPlugins = [
	Essentials,  // 提供redo和undo功能
	// UploadAdapter,
	// Autoformat,
	BlockToolbar,
	// Markdown,   // 采用markdown输出
	// Bold,
	// Italic,
	// BlockQuote,
	MyPlugin,
	// CKFinder,
	// EasyImage,
	Heading,
	Image,
	ImageCaption,  //可以往图片里面添加caption
	// ImageStyle,
	// ImageToolbar,
	// ImageUpload,
	// Link,
	// List,
	// MediaEmbed,
	// Paragraph,
	// PasteFromOffice,
	// Table,
	// TableToolbar,
	Alignment //
];

// Editor configuration.
BalloonEditor.defaultConfig = {
	blockToolbar: [
		'heading',
		'|',
		'alignment:left',
		'alignment:center',
		// '|',
		// 'imageUpload',
		'|',
		'undo',
		'redo',
		// 'mediaEmbed',
		'|',
		'imgMarks'

	],
	// toolbar: {
	// 	// items: [
	// 	// 	'bold',
	// 	// 	'italic',
	// 	// 	'link'
	// 	// ]
	// },
	// image: {
		// toolbar: [
	// 		'imageStyle:full',
	// 		'imageStyle:side',
	// 		'|',
			// 'imageTextAlternative'
		// ],
	// 	// converters:{
	// 	// 	viewFigureToModel(){
	// 	// 		console.log('12345')
	// 	// 	}
	// 	// }
	// },
	// table: {
	// 	contentToolbar: [
	// 		'tableColumn',
	// 		'tableRow',
	// 		'mergeTableCells'
	// 	]
	// },
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
