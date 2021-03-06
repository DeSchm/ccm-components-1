/**
 * @overview <i>ccm</i> component for rendering a kanban board
 * @author André Kless <andre.kless@web.de> 2016-2017
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * TODO: moving cards
 * TODO: restoring card positions
 * TODO: add and delete of a kanban card
 * TODO: declarative
 * TODO: user
 * TODO: logging
 * TODO: docu comments
 * TODO: unit tests
 * TODO: version file/folder
 * TODO: factory
 * TODO: multilingualism
 */

( function () {

  var filename = 'ccm.kanban_board.min.js';

  var ccm_version = '9.2.0';
  var ccm_url     = 'https://akless.github.io/ccm/version/ccm-9.2.0.min.js';

  var component_name = 'kanban_board';
  var component_obj  = {

    name: component_name,

    config: {

      html: {
        lane: {
          tag: 'section',
          inner: [
            {
              tag: 'header',
              inner: '%%'
            },
            { tag: 'article' }
          ]
        }
      },
      css: [ 'ccm.load', 'https://akless.github.io/ccm-components/kanban_board/resources/default.css' ],
      kanban_card: [ 'ccm.component', 'https://akless.github.io/ccm-components/kanban_card/versions/ccm.kanban_card-1.0.0.min.js' ],
      data: {
        store: [ 'ccm.store', 'https://akless.github.io/ccm-components/kanban_board/resources/kanban_board_datasets.min.js' ],
        key: 'demo'
      },
      lanes: [ 'ToDo', 'Doing', 'Done' ]

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

        self.ccm.helper.dataset( my.data, function ( dataset ) {

          if ( !dataset.lanes ) dataset.lanes = [];
          my.lanes.map( function ( lane, i ) {
            if ( !dataset.lanes[ i ] ) dataset.lanes[ i ] = { cards: [] };
          } );

          var element = document.createDocumentFragment();
          var counter = 1;
          dataset.lanes.map( renderLane );
          check();

          function renderLane( lane, i ) {

            var lane_elem = self.ccm.helper.html( my.html.lane, my.lanes[ i ] );
            var cards_elem = lane_elem.querySelector( 'article' );

            lane.cards.map( renderCard );
            element.appendChild( lane_elem );

            function renderCard( card_cfg ) {

              counter++;
              var card_elem = document.createElement( 'div' );
              cards_elem.appendChild( card_elem );
              my.kanban_card.start( self.ccm.helper.clone( card_cfg ), function ( card_inst ) {
                card_inst.root.classList.add( 'card' );
                cards_elem.replaceChild( card_inst.root, card_elem );
                check();
              } );

            }

          }

          function check() {

            counter--;
            if ( counter !== 0 ) return;

            self.ccm.helper.setContent( self.element, element );

            if ( callback ) callback();

          }

        } );

      };

    }

  };

  if ( window.ccm && window.ccm.files ) window.ccm.files[ filename ] = component_obj;
  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
}() );