/**
 * @overview <i>ccm</i> component for rendering a component list
 * @author André Kless <andre.kless@web.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

  var ccm_version = '9.0.0';
  var ccm_url     = 'https://akless.github.io/ccm/ccm.min.js';

  var component_name = 'comp_list';
  var component_obj  = {

    name: component_name,

    config: {

      html_templates: {

        "main": {
          "tag": "main",
          "inner": [
            {
              "tag": "nav",
              "class": "navbar navbar-default navbar-static-top",
              "inner": {
                "class": "container",
                "inner": [
                  {
                    "class": "navbar-header",
                    "inner": [
                      {
                        "tag": "button",
                        "type": "button",
                        "class": "navbar-toggle collapsed",
                        "data-toggle": "collapse",
                        "data-target": "#navbar",
                        "aria-expanded": "false",
                        "aria-controls": "navbar",
                        "inner": [
                          {
                            "tag": "span",
                            "class": "sr-only",
                            "inner": "Navigation ein-/ausblenden"
                          },
                          {
                            "tag": "span",
                            "class": "icon-bar"
                          },
                          {
                            "tag": "span",
                            "class": "icon-bar"
                          },
                          {
                            "tag": "span",
                            "class": "icon-bar"
                          }
                        ]
                      },
                      {
                        "tag": "a",
                        "class": "navbar-brand",
                        "href": "#",
                        "inner": "W2C"
                      }
                    ]
                  },
                  {
                    "id": "navbar",
                    "class": "navbar-collapse collapse",
                    "inner": {
                      "tag": "ul",
                      "class": "nav navbar-nav",
                      "inner": [
                        {
                          "tag": "li",
                          "inner": {
                            "tag": "a",
                            "href":"#all",
                            "inner": "All Components",
                            "onclick": "%all%"
                          }
                        },
                        {
                          "tag": "li",
                          "inner": {
                            "tag": "a",
                            "href":"# ",
                            "inner": "Home"
                          }
                        },
                        {
                          "tag": "li",
                          "inner": {
                            "tag": "a",
                            "href":"#ueber",
                            "inner": "About"
                          }
                        },
                        {
                          "tag": "li",
                          "inner": {
                            "tag": "a",
                            "href":"#kontakt",
                            "inner": "Contact",
                            "onclick": "%contact%"
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              "class": "container",
              "inner": [
                {
                  "id": "all",
                  "class": "components row",
                  "inner": {
                    "id": "components_list"
                  }
                },
                {
                  "id": "address"
                }
              ]
            }
          ]
        },

        "list_item": {
          "inner": {
            "class":"col-lg-3 col-md-3 col-sm-3 col-xs-3",
            "inner": {
              "class": "thumbnail",
              "style": "height: 400px",
              "inner": [
                {
                  "tag": "img",
                  "src": "%preview%"
                },
                {
                  "class": "caption",
                  "inner": [
                    {
                      "tag": "h3",
                      "inner": "%comp_title%"
                    },
                    {
                      "tag": "p",
                      "inner": "%abstract%"
                    },
                    {
                      "tag": "p",
                      "inner": {
                        "tag": "a",
                        "href": "#",
                        "class": "btn btn-primary",
                        "role":"button",
                        "inner": "Detail",
                        "onclick": "%detail%"
                      }
                    }

                  ]
                }
              ]

            }
          }
        },

        "contact": {
          "inner": [
            {
              "tag":"address",
              "class": "contact",
              "inner": [
                {
                  "tag": "strong",
                  "inner": "André Kless"
                },
                "<br>Hochschule Bonn-Rhein-Sieg<br>University of Applied Sciences<br>Grantham-Allee 20<br>53757 Sankt Augustin<br>Germany<br>"
              ]
            },
            {
              "tag":"address",
              "class": "email",
              "inner": {
                "tag": "a",
                "href": "mailto:#",
                "inner": "andre.kless@h-brs.de"
              }
            }
          ]
        }

      },
      comp_info: [ 'ccm.component', 'https://akless.github.io/ccm-components/comp_info/ccm.comp_info.min.js' ],
      comp_info_configs: [],
      bootstrap: [ 'ccm.load', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', { context: 'head', url: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' } ],
      bootstrap_js: [ 'ccm.load',
        [ 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'] ]
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

        var main_elem = self.ccm.helper.html( my.html_templates.main, {
          all: function () {
            renderList();
          },
          contact: function () {

            main_elem.querySelector( '#components_list' ).innerHTML = '';

            var contact_elem = main_elem.querySelector( '#address' );
            contact_elem.innerHTML = '';
            contact_elem.appendChild( self.ccm.helper.html( my.html_templates.contact ) );
          }
        } );
        renderList();
        self.ccm.helper.setContent( self.element, main_elem );

        if ( callback ) callback();

        function renderList() {
          var list_elem = main_elem.querySelector( '#components_list' );
          list_elem.innerHTML = '';
          my.comp_info_configs.map( render );

          function render( config ) {

            var div = document.createElement( 'div' );
            list_elem.appendChild( div );
            my.comp_info.instance( config, function ( instance ) {
              self.ccm.helper.dataset( instance.data, function ( dataset ) {
                list_elem.replaceChild( self.ccm.helper.html( my.html_templates.list_item, {
                  comp_title: dataset.title,
                  abstract: dataset.abstract,
                  preview: Array.isArray( dataset.previews ) && dataset.previews[ 0 ] ? dataset.previews[ 0 ] : 'https://akless.github.io/ccm-components/component.png',
                  detail: function () {
                    instance.start( function () {
                      self.ccm.helper.setContent( list_elem, instance.root );
                    } );
                  }
                } ), div );
              } );
            } );
          }
        }

      };

    }

  };

  var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
  if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
  function register() { ccm[ ccm_version ].component( component_obj ); }
}() );