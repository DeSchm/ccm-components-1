/**
 * @overview ccm component for interpreting JavaScript expressions
 * @author André Kless <andre.kless@web.de> 2016-2017
 * @license The MIT License (MIT)
 */

( function () {

  var ccm_version = '8.0.0';
  var ccm_url     = '../../ccm-developer/ccm/ccm.js';

  var component_name = 'eval';
  var component_obj  = {

    name: component_name,

    config: {

      html_templates: {
        main: {
          id: 'main',
          inner: [
            { id: 'expression' },
            {
              id: 'button',
              inner: {
                tag: 'button',
                inner: '%caption%',
                onclick: '%onclick%'
              }
            }
          ]
        }
      },
      css_layout: [ 'ccm.load', '../../ccm-components/eval/layouts/default.css' ],
      expression: '"Hello, World!"',
      button_caption: 'Evaluate expression'

  //  user: [ 'ccm.instance', '../../ccm-components/user/ccm.user.js' ],
  //  logger: [ 'ccm.instance', '../../ccm-components/log/ccm.log.js', [ 'ccm.get', '../../ccm-components/log/configs.json', 'greedy' ] ],
  //  json_parse: true,
  //  oninput: function ( instance, expression ) { console.log( expression ); },
  //  onchange: function ( instance, expression ) { console.log( expression ); },
  //  onfinish: function ( instance, results ) { console.log( results ); }

    },

    Instance: function () {

      var self = this;
      var my;           // contains privatized instance members

      this.ready = function ( callback ) {

        // privatize all possible instance members
        my = self.ccm.helper.privatize( self );

        callback();
      };

      this.start = function ( callback ) {

        // prepare main HTML structure
        var main_elem = self.ccm.helper.html( my.html_templates.main, { caption: my.button_caption, onclick: onClick } );

        // add text area for Javascript expression
        var textarea_elem = self.ccm.helper.html( { tag: 'textarea', inner: my.expression, oninput: onInput, onchange: onChange } );
        main_elem.querySelector( '#expression' ).appendChild( textarea_elem );

        // set content of own website area
        self.ccm.helper.setContent( self.element, self.ccm.helper.protect( main_elem ) );

        // has logger instance? => log start event
        if ( self.logger ) self.logger.log( 'start', my );

        if ( callback ) callback();

        /** oninput callback for text area */
        function onInput() {

          /**
           * text area value
           * @type {string}
           */
          var value = this.value;

          // has logger instance? => log input event
          if ( self.logger ) self.logger.log( 'input', value );

          // has individual input callback? => perform it
          if ( self.oninput ) self.oninput( self, value );

        }

        /** onchange callback for text area */
        function onChange() {

          /**
           * text area value
           * @type {string}
           */
          var value = this.value;

          // has logger instance? => log change event
          if ( self.logger ) self.logger.log( 'change', value );

          // has individual change callback? => perform it
          if ( self.onchange ) self.onchange( self, value );

        }

        /** onclick callback of the button */
        function onClick() {

          /**
           * text area value
           * @type {string}
           */
          var value = textarea_elem.value;

          // has user instance? => login user
          if ( self.user ) self.user.login( proceed ); else proceed();

          function proceed() {

            // prepare result data
            var results = { expression: value };
            if ( my.json_parse )
              try { results.value = JSON.parse( value ); } catch ( err ) {}
            else
              try { results.value = eval( '(' + value + ')' ); } catch ( err ) {}

            // has logger instance? => log finish event
            if ( self.logger ) self.logger.log( 'finish', results );

            // provide result data
            self.ccm.helper.onFinish( self, results );

          }

        }

      }

    }

  };

  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
}() );