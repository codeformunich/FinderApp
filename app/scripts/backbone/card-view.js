'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;


var CardView = Backbone.View.extend({

    initialize: function(){
        this.render();
    },

    render: function(){
        // Compile the template using underscore
        var template = _.template( '<section class="card textcard">' +
                          '<h1><strong>Ein Spielplatz</strong></h1>'+
                          '<h2>Entfernung: <%= Math.round(node.getDistance()) %> m</h2>' +
                          '</section>');
        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template({node: this.model}));
    }
});


module.exports = CardView;
