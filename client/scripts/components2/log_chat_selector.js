define(['lib/react', 'components2/chat', 'components2/games_log', 'components2/strategy_editor', '../strategy-controller'], function(React, Chat, GamesLog, StrategyEditor, StrategyController) {
    var D = React.DOM;

    return React.createClass({
        displayName: 'logChatSelector',

        propTypes: {
            engine: React.PropTypes.object.isRequired
        },

        componentWillMount: function() {
            //Instantiate the strategy controller
            this.strategyController = new StrategyController(this.props.engine);
        },

        getInitialState: function() {
            return {
                widget: 'gamesLog' //Widgets: chat, gamesLog(default), strategyEditor
            }
        },

        selectWidget: function(widget) {
            var self = this;
            return function() {
                self.setState({ widget: widget });
            }
        },

        render: function() {
            var widget, contClass = '';
            switch(this.state.widget) {
                case 'gamesLog':
                    widget = GamesLog({ engine: this.props.engine });
                    contClass = 'gamesLog';
                break;
                case 'chat':
                    widget = Chat({ engine: this.props.engine });
                break;
                case 'strategyEditor':
                    widget = StrategyEditor({ engine: this.props.engine, strategyController: this.strategyController });
                break;
            }

            return D.div({ className: 'log-chat-tabs-container' },
                D.ul({ className: 'chat-log-tabs unselect' },
                    D.li({
                            className: 'chat-log-tab ' + ((this.state.widget === 'gamesLog') ? 'tab-active' : ''),
                            onClick: this.selectWidget('gamesLog')
                        },
                        D.a(null, 'History')
                    ),
                    D.li({
                            className: 'chat-log-tab ' + ((this.state.widget === 'chat') ? 'tab-active' : ''),
                            onClick: this.selectWidget('chat')
                        },
                        D.a(null, 'Chat')
                    ),
                    D.li({
                            className: 'chat-log-tab ' + ((this.state.widget === 'strategyEditor') ? 'tab-active' : ''),
                            onClick: this.selectWidget('strategyEditor')
                        },
                        D.a(null, 'Strategy')
                    )
                ),
                D.div({ className: 'log-chat-container ' + contClass },
                   widget
                )
            );

        }
    });
});