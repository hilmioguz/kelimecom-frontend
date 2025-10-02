/*
  Project Name: Kelime Keyboard
  Author: Mert Donmezyurek
  Author URL: https://mertdy.com
  Date: 11 Jan 2021
*/

class KelimeKeyboard {
  keyboardSelectorOptions = [
    {
      label: 'Türkçe Q Klavye',
      value: 'tr',
      layout: {
        default: [
          '{tab} q w e r t y u ı o p ğ ü [ ]',
          '{lock} a s d f g h j k l ş i , {enter}',
          '{shift} < z x c v b n m ö ç . | $ € {shift}',
        ],
        shift: [
          '{tab} Q W E R T Y U I O P Ğ Ü { }',
          '{lock} A S D F G H J K L Ş İ ; {enter}',
          '{shift} > Z X C V B N M Ö Ç : \\ ` ´ {shift}',
        ],
      },
    },
    {
      label: 'İngilizce Klavye',
      value: 'en',
      layout: {
        default: [
          '{tab} q w e r t y u i o p [ ] \\',
          "{lock} a s d f g h j k l ; ' {enter}",
          '{shift} z x c v b n m , . / {shift}',
        ],
        shift: [
          '{tab} Q W E R T Y U I O P { } |',
          '{lock} A S D F G H J K L : " {enter}',
          '{shift} Z X C V B N M < > ? {shift}',
        ],
      },
    },
	{
      label: 'Osmanlıca Klavye',
      value: 'osk',
      layout: {
        default: [
          '\u062B \u062A \u067E \u0628 \u0680 \u067F \uFBE9 \uFE8C \u0621 \u0671 \u0625 \u0623 \u0622 \u0627',
          '\u075C \u0634 \u0633 \u0699 \u0698 \u0632 \u0631 \u0690 \u0630 \u062F \u0687 \u062E \u062D \u0686 \u062C {enter}',
		  '\u06AE \u06AD \u06AF \u0643 \u06A4 \u0642 \u0641 \u06A0 \u063A \u0639 \u069F \u0638 \u0637 \u069E \u0636 \u0635',
          '\u0626 \u06CC \u06C2 \u06C0 \u0629 \u06D5 \u06BE \u06CB \u0624 \u0648 \u0646 \u0645 \u0644 {shift}',
        ],
        shift: [
          '{tab} \u0661 \u0662 \u0663 \u0664 \u0665 \u0666 \u0667 \u0668 \u0669 \u0660',
          '{lock} \u0670 \u0656 \u064E \u0650 \u064F \u064B \u064D \u064C \u0653 \u0652 \u0651 \u2018 {enter}',
          '{shift} \u0622 \u0623 \u0625 \u0621 \u0626 \u0624 \u06C0 \u0629 \u064A \u06C9 \u06CF \u06CA \u0644 \u0627 \u06AD \uFBD9',
        ],
      },
    },
    {
      label: 'Osmanlıca Q Klavye',
      value: 'os',
      layout: {
        default: [
          '{tab} \u0642 \u0630 \u06D5 \u0631 \u062A \u06CC \u0635 \u0639 \u0637 \u067E \u063A \u062D',
          '{lock} \u0627 \u0633 \u062F \u0641 \u06AF \u0647 \u0698 \u0643 \u0644 \u0634 \u0636 \u0638 {enter}',
          '{shift} \u0632 \u062E \u062C \u0648 \u0628 \u0646 \u0645 \u062B \u0686 {shift}',
        ],
        shift: [
          '{tab} \u0661 \u0662 \u0663 \u0664 \u0665 \u0666 \u0667 \u0668 \u0669 \u0660',
          '{lock} \u0670 \u0656 \u064E \u0650 \u064F \u064B \u064D \u064C \u0653 \u0652 \u0651 \u2018 {enter}',
          '{shift} \u0622 \u0623 \u0625 \u0621 \u0626 \u0624 \u06C0 \u0629 \u064A \u06C9 \u06CF \u06CA \u0644 \u0627 \u06AD \uFBD9',
        ],
      },
    },
    {
      label: 'Fransızca Klavye',
      value: 'fr',
      layout: {
        default: [
          '{tab} a z e r t y u i o p ^ $',
          '{lock} q s d f g h j k l m \u00F9 * {enter}',
          '{shift} < w x c v b n , ; : ! {shift}',
        ],
        shift: [
          '{tab} A Z E R T Y U I O P \u00A8 \u00A3',
          '{lock} Q S D F G H J K L M % \u00B5 {enter}',
          '{shift} > W X C V B N ? . / \u00A7 {shift}',
        ],
      },
    },
    {
      label: 'Arapça Klavye',
      value: 'ar',
      layout: {
        default: [
          '{tab} \u0636 \u0635 \u062B \u0642 \u0641 \u063A \u0639 \u0647 \u062E \u062D \u062C \u062F \\',
          '{lock} \u0634 \u0633 \u064A \u0628 \u0644 \u0627 \u062A \u0646 \u0645 \u0643 \u0637 {enter}',
          '{shift} \u0626 \u0621 \u0624 \u0631 \u0644\u0627 \u0649 \u0629 \u0648 \u0632 \u0638 {shift}',
        ],
        shift: [
          '{tab} \u064E \u064B \u064F \u064C \u0644\u0625 \u0625 \u2018 \u00F7 \u00D7 \u061B < > |',
          '{lock} \u0650 \u064D ] [ \u0644\u0623 \u0623 \u0640 \u060C / : " {enter}',
          '{shift} ~ \u0652 } { \u0644\u0622 \u0622 \u2019 , . \u061F {shift}',
        ],
      },
    },
    {
      label: 'Almanca Klavye',
      value: 'de',
      layout: {
        default: [
          '{tab} q w e r t z u i o p \u00FC \u00DF +',
          '{lock} a s d f g h j k l \u00F6 \u00E4 # {enter}',
          '{shift} < y x c v b n m , . - {shift}',
        ],
        shift: [
          '{tab} Q W E R T Z U I O P \u00DC *',
          "{lock} A S D F G H J K L \u00D6 \u00C4 ' {enter}",
          '{shift} > Y X C V B N M ; : _ {shift}',
        ],
      },
    },
    {
      label: 'Rusça Klavye',
      value: 'ru',
      layout: {
        default: [
          '{tab} \u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a \\',
          '{lock} \u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d {enter}',
          '{shift} \\ \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e / {shift}',
        ],
        shift: [
          '{tab} \u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a /',
          '{lock} \u0424 \u042b \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u042d {enter}',
          '{shift} / \u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e / {shift}',
        ],
      },
    },
    {
      label: 'Farsça Klavye',
      value: 'fa',
      layout: {
        default: [
          '{tab} \u0636 \u0635 \u062b \u0642 \u0641 \u063a \u0639 \u0647 \u062e \u062d \u062c \u0686 \\',
          '{lock} \u0634 \u0633 \u06cc \u0628 \u0644 \u0627 \u062a \u0646 \u0645 \u06a9 \u06af {enter}',
          '{shift} \u0638 \u0637 \u0632 \u0631 \u0630 \u062f \u067e \u0648 \u002e \u002f {shift}',
        ],
        shift: [
          '{tab} \u0652 \u064c \u064d \u064b \u064f \u0650 \u064e \u0651 \u005d \u005b \u007d \u007b',
          '{lock} \u0624 \u0626 \u064a \u0625 \u0623 \u0622 \u0629 \u00bb \u00ab \u003a \u061b {enter}',
          '{shift} \u0643 \u0653 \u0698 \u0670 \u200c \u0654 \u0621 \u003c \u003e \u061f {shift}',
        ],
      },
    },
    {
      label: 'Çince Klavye',
      value: 'zh',
      layout: {
        default: [
          '{tab} \u3106 \u310A \u310D \u3110 \u3114 \u3117 \u3127 \u311B \u311F \u3123 [ ] \\',
          "{lock} \u3107 \u310B \u310E \u3111 \u3115 \u3118 \u3128 \u311C \u3120 \u3124 ' {enter}",
          '{shift} \u3108 \u310C \u310F \u3112 \u3116 \u3119 \u3129 \u311D \u3121 \u3125',
        ],
        shift: [
          '{tab} q w e r t y u i o p { } |',
          '{lock} a s d f g h j k l : " {enter}',
          '{shift} z x c v b n m , < > ? {shift}',
        ],
      },
    },
    {
      label: 'İspanyolca Klavye',
      value: 'es',
      layout: {
        default: [
          '{tab} q w e r t y u i o p \u0301 +',
          '{lock} a s d f g h j k l \u00f1 \u007b \u007d {enter}',
          '{shift} < z x c v b n m , . - {shift}',
        ],
        shift: [
          '{tab} Q W E R T Y U I O P \u0308 *',
          '{lock} A S D F G H J K L \u00d1 \u005b \u005d {enter}',
          '{shift} > Z X C V B N M ; : _ {shift}',
        ],
      },
    },
  ];

  currentKeyboardLayout = 'tr';
  simpleKeyboard;
  inputElement;

  constructor() {}

  async importDependencies() {
    const getKelimeKeyboardCSSLocation = () => {
      let scripts = document.getElementsByTagName('script');
      let src = scripts[scripts.length - 1].src;
      let baseStr = src.split('.');
      baseStr.pop();
      let cssLocation = baseStr.join('.') + '.css';
      return cssLocation;
    };

    const CSS_LISt = [
      'https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/css/index.css',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css',
      '/assets/js/inner-keyboard/index.css',
    ];

    CSS_LISt.forEach((href) => this.importCSS(href));

    return await this.importJS(
      'https://cdn.jsdelivr.net/npm/simple-keyboard@2.32.75/build/index.js'
    );
  }

  importCSS(href) {
    if (href) {
      const fileref = document.createElement('link');
      fileref.setAttribute('rel', 'stylesheet');
      fileref.setAttribute('type', 'text/css');
      fileref.setAttribute('href', href);
      document.head.appendChild(fileref);
    }
  }

  importJS(href) {
    return new Promise((resolve, reject) => {
      var script = document.createElement('script'); // create a script DOM node
      script.src = href; // set its src to the provided URL
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject(
          'Connection error! ' +
            href +
            ' could not load! Please refresh the page or check your internet connection!'
        );
      };
      document.body.appendChild(script); // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    });
  }

  appendHTMLTags(elm) {
    elm.innerHTML = `
      <div class="kelime-keyboard-container">
        <div class="kelime-keyboard-toolbar" id="kelime-keyboard-toolbar">
            <select class="kelime-keyboard-selector"></select>
            <span class="kelime-keyboard-detail-text">(Klavye dilini değiştirmek için ok işaretine tıklayınız)</span>
            <span class="kelime-keyboard-close-button">x</span>
        </div>
        <div class="simple-keyboard"></div>
      </div>`;
  }

  addFixedButtonsToLayout() {
    this.keyboardSelectorOptions.forEach((option) => {
      option.layout.default.unshift(
        '{questionMark} {asterisk} {equal} {addChar} {removeChar} {moveLeft} {moveRight} {bksp}'
      );
      option.layout.shift.unshift(
        '{questionMark} {asterisk} {equal} {addChar} {removeChar} {moveLeft} {moveRight} {bksp}'
      );
      // option.layout.default.unshift(
      //   '{questionMark} {asterisk} {squareBrackets} {bksp}'
      // );
      // option.layout.shift.unshift(
      //   '{questionMark} {asterisk} {squareBrackets} {bksp}'
      // );
      // option.layout.default[4] =
      //   '{share} {outLink} {space} {download}' + ' ' + option.layout.default[4];
      // option.layout.shift[4] =
      //   '{share} {outLink} {space} {download}' + ' ' + option.layout.shift[4];

      option.layout.default.push('{share} {outLink} {space} {download}');
      option.layout.shift.push('{share} {outLink} {space} {download}');
    });
  }

  initSimpleKeyboard() {
    const Keyboard = window.SimpleKeyboard.default;
    this.currentKeyboardLayout = 'osk';

    this.simpleKeyboard = new Keyboard({
      onChange: (input) => this.onChange(input),
      onKeyPress: (button) => this.onKeyPress(button),
      theme: 'hg-theme-default hg-layout-default customTheme hg-lang-tr shadow',
      mergeDisplay: true,
      layout: this.keyboardSelectorOptions[0].layout,
      display: {
        '{questionMark}': '<b>?</b>',
        '{asterisk}': '<b>*</b>',
        '{equal}': '<b>=</b>',
        // '{squareBrackets}': '<b>[ ]</b>',
        '{addChar}': '<b>[+]</b>',
        '{removeChar}': '<b>[-]</b>',
        '{moveLeft}': '<b><</b>',
        '{moveRight}': '<b>></b>',
        '{bksp}': '<i class="fas fa-backspace"></i>',
        '{space}': 'space',
        '{share}': '<i class="fas fa-link"></i>',
        '{shift}': 'shift',
        '{download}': '<i class="fas fa-download"></i>',
        '{outLink}': '<i class="fas fa-globe-americas"></i>',
        '{move}': '<i class="fas fa-arrows-alt"></i>',
      },
      buttonTheme: [
        {
          class: 'hg-icon',
          buttons: '{move} {share} {download} {outLink}',
        },
        {
          class: 'hg-question-mark hg-top-buttons',
          buttons: '{questionMark}',
        },
        {
          class: 'hg-question-mark hg-top-buttons',
          buttons: '{questionMark}',
        },
        {
          class: 'hg-asterisk hg-top-buttons',
          buttons: '{asterisk}',
        },
        {
          class: 'hg-equal hg-top-buttons',
          buttons: '{equal}',
        },
        {
          class: 'hg-addChar hg-top-buttons',
          buttons: '{addChar}',
        },
        {
          class: 'hg-removeChar hg-top-buttons',
          buttons: '{removeChar}',
        },
        {
          class: 'hg-moveLeft hg-top-buttons',
          buttons: '{moveLeft}',
        },
        {
          class: 'hg-moveRight hg-top-buttons',
          buttons: '{moveRight}',
        },
        // {
        //   class: 'hg-square-brackets hg-top-buttons',
        //   buttons: '{squareBrackets}',
        // },
      ],
    });
  }

  prepareKeyboardSelectorOptions() {
    const keyboardSelector = document.querySelector(
      '.kelime-keyboard-selector'
    );

    this.keyboardSelectorOptions.forEach((data) => {
      const option = document.createElement('option');
      option.text = data.label;
      option.value = data.value;
      keyboardSelector.add(option);
    });

    keyboardSelector.addEventListener('change', (event) => {
      for (const option of this.keyboardSelectorOptions) {
        if (option.value === event.target.value) {
          this.currentKeyboardLayout = event.target.value;
          this.simpleKeyboard.setOptions({
            layout: option.layout,
            theme: this.isArabicKeyboard()
              ? 'hg-theme-default hg-layout-default arabicTheme hg-lang-' + option.value
              : 'hg-theme-default hg-layout-default customTheme hg-lang-' + option.value,
          });

          window?.kelimeKeyboardOptions?.onLayoutChange?.(
            this.currentKeyboardLayout
          );
        }
      }
    });
  }

  prepareKeyboardCloseButton() {
    document
      .querySelector('.kelime-keyboard-close-button')
      .addEventListener('click', (ev) => {
        window?.kelimeKeyboardOptions?.onClose?.();
      });
  }

  async init(inputElm) {
    let kelimeKeyboardElm =
      document.querySelector('kelime-keyboard') ||
      document.querySelector('.kelime-keyboard');
    if (!kelimeKeyboardElm) {
      console.error(
        'Kelime keyboard başlatılamadı! HTML içinde <kelime-keyboard /> veya <div class="kelime-keyboard"></div> bulunamadı! '
      );
      return;
    }

    await this.importDependencies();
    this.appendHTMLTags(kelimeKeyboardElm);
    this.addFixedButtonsToLayout();
    this.initSimpleKeyboard();

    /**
     * Update simple-keyboard when input is changed directly
     */
    this.inputElement = inputElm;
    this.inputElement.addEventListener('input', (event) => {
      this.simpleKeyboard.setInput(event.target.value);
    });

    this.prepareKeyboardSelectorOptions();
    this.prepareKeyboardCloseButton();
  }

  onChange(input) {
    this.inputElement.value = input;
    window?.kelimeKeyboardOptions?.onChange?.(input)
  }

  isArabicKeyboard() {
    return (
      this.currentKeyboardLayout === 'ar' ||
      this.currentKeyboardLayout === 'os' ||
      this.currentKeyboardLayout === 'osk' ||
      this.currentKeyboardLayout === 'fa'
    );
  }

  onKeyPress(button) {
    var input = this.inputElement;
    var inputFocus = function() {
      setTimeout(function() { input.focus(); }, 100)
    };
    var cursorStart = input.selectionStart;
    var cursorEnd = input.selectionEnd;

    switch (button) {
      case '{share}':
        window.open('https://eosmanlica.com/', '_blank');
        break;

      case '{outLink}':
        window.open('http://www.wikilala.com/Home', '_blank');
        break;

      case '{download}':
        window.open('https://oklavye.com/', '_blank');
        break;

      case '{questionMark}':
        if (this.isArabicKeyboard()) {
          this.addValue('\u061F');
        } else {
          this.addValue('?');
        }
        break;

      case '{asterisk}':
        if (this.isArabicKeyboard()) {
          this.addValue('\u066D');
        } else {
          this.addValue('*');
        }
        break;

      case '{equal}':
        if (this.isArabicKeyboard()) {
          this.addValue('\u066D');
        } else {
          this.addValue('=');
        }
        break;

      // case '{squareBrackets}':
      //   this.addValue('[]');
      //   break;
      case '{addChar}':
        var newCursor = cursorEnd + 1;
        var beforeCursor = input.value.slice(0, cursorStart);
        var afterCursor = input.value.slice(cursorEnd);

        input.value = beforeCursor + " " + afterCursor;
        input.setSelectionRange(newCursor, newCursor);
        inputFocus();
        break;
      case '{removeChar}':
        var newCursor = cursorEnd - 1;
        var beforeCursor = input.value.slice(0, cursorStart - 1);
        var afterCursor = input.value.slice(cursorEnd);

        input.value = beforeCursor + afterCursor;
        input.setSelectionRange(newCursor, newCursor);
        inputFocus();
        break;
      case '{moveLeft}':
        var newCursor = cursorEnd - 1;

        input.setSelectionRange(newCursor, newCursor);
        inputFocus();
        break;
      case '{moveRight}':
        var newCursor = cursorEnd + 1;

        input.setSelectionRange(newCursor, newCursor);
        inputFocus();
        break;
      case '{enter}':
        var sOptions = { secilenDil, secilenTip };
        if  (active_page != 'cozumleyici') {
          var stext = $("#kelimexAramaKutusu").val();
          let newurl = getMyDomain() + '/arama/' + stext ;
          if (secilenDil) {
            newurl += '/' + secilenDil;
          }
          if (secilenTip) {
            newurl += '/' + secilenTip;
          }
          window.location = newurl;
        } else {
          var stext = $("#cozumleyiciAramaKutusu").val();
          cozumleyiciSearch(stext, sOptions, true, 1, 100);
        }
        break;

      default:
        break;
    }

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === '{shift}' || button === '{lock}') this.handleShift();
  }

  addValue(input) {
    let value = '';
    if (this.simpleKeyboard.getCaretPosition() === null) {
      value = this.simpleKeyboard.getInput() + input;
    } else {
      value =
        this.simpleKeyboard
          .getInput()
          .substring(0, this.simpleKeyboard.getCaretPosition()) +
        input +
        this.simpleKeyboard
          .getInput()
          .substring(this.simpleKeyboard.getCaretPositionEnd());

      this.simpleKeyboard.setCaretPosition(
        this.simpleKeyboard.getCaretPosition() + input.length
      );
    }

    this.simpleKeyboard.setInput(value);
    this.inputElement.value = value;

    window?.kelimeKeyboardOptions?.onChange?.(value);
  }

  handleShift() {
    let currentLayout = this.simpleKeyboard.options.layoutName;
    let shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

    this.simpleKeyboard.setOptions({
      layoutName: shiftToggle,
    });
  }
}

const kelimeKeyboard = new KelimeKeyboard();
if (window.kelimeKeyboardOptions && window.kelimeKeyboardOptions.inputElement) {
  kelimeKeyboard.init(window.kelimeKeyboardOptions.inputElement);
}
