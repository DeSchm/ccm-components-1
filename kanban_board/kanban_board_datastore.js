/**
 * @overview <i>ccm</i> datasets of ccm component for rendering a kanban board
 * @author André Kless <andre.kless@web.de> 2017
 * @license The MIT License (MIT)
 */

ccm.files[ "kanban_board_datastore.min.js" ] = {
  "demo": {
    "lanes": [
      {
        "title": "ToDo",
        "cards": {
          "comp": [ "ccm.component", "https://akless.github.io/ccm-components/kanban_card/ccm.kanban_card.min.js" ],
          "store": [ "ccm.store", "https://akless.github.io/ccm-components/kanban_card/kanban_card_datastore.min.js" ],
          "keys": [ "homework", "presentation" ]
        }
      },
      {
        "title": "Doing",
        "cards": [
          [ "ccm.instance", "https://akless.github.io/ccm-components/kanban_card/ccm.kanban_card.min.js" ],
          [ "ccm.instance", "https://akless.github.io/ccm-components/kanban_card/ccm.kanban_card.min.js", { "data.key": "presentation" } ]
        ]
      },
      { "title": "Done" }
    ]
  }
};