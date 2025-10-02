/*!
 * Turkish Translations for krajee-markdown-editor
 *
 * This file must be loaded after 'markdown-editor.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://plugins.krajee.com/markdown-editor
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'window', 'document'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        factory(require('jquery'), window, document);
    } else {
        factory(window.jQuery, window, document);
    }
}(function ($, window, document, undefined) {
    $.fn.markdownEditorLocales['tr-Tr'] = $.fn.markdownEditorLocales['tr'] = $.fn.markdownEditorLocales.en = {
        ajaxParserErrorMsg: 'Markdown metni ayrıştırılırken hata oluştu. Lütfen daha sonra tekrar deneyiniz.',
        ajaxParserProgressMsg: 'Metin ayrıştırılıyor...',
        noDataMsg: 'Geçerli kaynak veri bulunamadı!',
        exportFileName: 'dışa aktarma',
        buttonTitles: {
            undo: 'Geri al',
            redo: 'Yinele',
            bold: 'Kalın',
            italic: 'İtalik',
            ins: 'Altı Çizili / Eklenen Metin',
            del: 'Üzeri Çizgili',
            sup: 'Anlam Türü',
            sub: 'Alt simge',
            mark: 'Vurgulanan Metin',
            paragraph: 'Paragraf',
            newline: 'Satır sonu ekle',
            heading: 'Başlık',
            link: 'Bağlantı Adresi',
            image: 'Resim Bağlantı adresi',
            indent: 'Metni Girintile',
            outdent: 'Çıkıntılı Metin',
            ul: 'Sırasız Liste',
            ol: 'Sıralı Liste',
            dl: 'Tanım Listesi',
            footnote: 'Dipnot',
            blockquote: 'Örnek cümle',
            code: 'Blok Alıntı',
            codeblock: 'Blok Alıntı',
            hr: 'Yatay Çizgi',
            emoji: 'Emojiler / İfadeler',
            fullscreen: 'Tam ekran modu',
            hint: 'Kullanım İpuçları',
            modeEditor: 'Editör modu',
            modePreview: 'Önizleme modu',
            modeSplit: 'Bölünmüş mod',
            export: 'İçeriği dışa aktar',
            exportHtml: 'HTML olarak dışa aktar',
            exportText: 'Metin Olarak Dışa Aktar'
        },
        buttonLabels: {
            export: 'Dışa aktarma',
            exportHtml: 'HTML',
            exportText: 'Metin'
        },
        buttonPrompts: {
            link: {
                header: 'Bağlantı Adresi Ekle',
                hintInput: 'Bağlantı adresini giriniz...',
                hintTitle: 'Adresi tantıcı başlık metni...'
            },
            image: {
                header: 'Resim Bağlantı Adresi Ekle',
                hintInput: 'Bağlantı adresini giriniz...',
                hintTitle: 'Resmi kısaca ifade eden başlık...'
            },
            ol: {
                header: 'Sıralı Liste Başlangıç ​​Numarası',
                hintInput: '1\'den başlayan tamsayı'
            },
            bakiniz: {
                header: 'Bakınız bağlantısı ekleme',
                hintInput: 'Maddebaşı giriniz'
            },
            codeblock: {
                header: 'Kod dilini girin',
                hintInput: 'e.g. html, php, js'
            }
        },
        buttonActions: {
            bold: {markup: '**metin**'},
            italic: {markup: '_metin_'},
            ins: {markup: '_metin_'},
            del: {markup: '_metin_'},
            mark: {markup: '_metin_'},
            sup: {markup: '_metin_'},
            sub: {markup: '_metin_'},
            paragraph: {markup: '\nmetin\n'},
            heading1: {markup: '# Metin'},
            heading2: {markup: '## Metin'},
            heading3: {markup: '### Metin'},
            heading4: {markup: '#### Metin'},
            heading5: {markup: '##### Metin'},
            heading6: {markup: '###### Metin'}
        },
        templates: {
            exportHeader: '> - - -\n' +
                '> Markdown Dışa Aktarma\n' +
                '> ==============\n' +
                '> - - -\n\n',
            hint: '<ul>\n' +
                '  <li><p>Araç çubuğundaki biçimlendirme düğmelerini kullanmak için genellikle biçimlendirmenin uygulanacağı düzenleyici içine önce bir metin girmeniz ve sonra o metni seçmeniz gerekir ' +
                '  <li><p>Klavye erişim kısayolları:</p>' +
                '    {ACCESS_KEYS}' +
                '  </li>\n' +
                '</ul>'
        },
        dialogCancelText: 'İptal',
        dialogSubmitText: 'Gönder',
        previewErrorTitle: 'Önizleme Hatası',
        previewModeTitle: 'Önizleme Modu',
        noPreviewUrlMsg: 'Markdown önizleme işlemcisi kullanılamıyor. Lütfen sistem yöneticisiyle iletişime geçin.',
        previewProgressMsg: 'Önizleme oluşturuluyor ...',
        noExportUrlMsg: 'İşlemciyi dışa aktarma kullanılamıyor. Lütfen sistem yöneticisiyle iletişime geçin.',
        emojiSearchHint: 'Emojileri ara ...',
        loadingMsg: 'Yükleniyor ...'
    };
}));