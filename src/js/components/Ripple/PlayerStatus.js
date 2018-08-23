
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import injectSheet from 'react-jss';

import classes from './classes';

@inject(stores => ({
    playing: stores.controller.playing,
}))
@observer
class PlayerStatus extends Component {
    componentWillUpdate() {
        this.animationDone();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.playing !== this.props.playing) {
            // Force show the animation
            this.animationDone();
        }
    }

    componentDidUpdate() {
        this.refs.container.classList.add(this.props.classes.animated);
    }

    animationDone() {
        this.refs.container.classList.remove(this.props.classes.animated);
    }

    render() {
        var { classes, playing } = this.props;

        return (
            <div
                className={classes.container}
                onAnimationEnd={() => this.animationDone()}
                ref="container">
                {
                    playing
                        ? <i className="ion-ios-pause" />
                        : <i className="ion-ios-play" />
                }
            </div>
        );
    }
}

export default injectSheet(classes)(PlayerStatus);
