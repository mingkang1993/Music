
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router';
import injectSheet from 'react-jss';
import moment from 'moment';
import clazz from 'classname';

import classes from './classes';
import helper from 'utils/helper';
import ProgressImage from 'ui/ProgressImage';

@inject(stores => ({
    loading: stores.search.loading,
    show: stores.search.show,
    close: () => stores.search.toggle(false),
    follow: stores.artist.follow,
    playlists: stores.search.playlists,
    getPlaylists: stores.search.getPlaylists,
    loadmorePlaylists: stores.search.loadmorePlaylists,
    albums: stores.search.albums,
    getAlbums: stores.search.getAlbums,
    loadmoreAlbums: stores.search.loadmoreAlbums,
    artists: stores.search.artists,
    getArtists: stores.search.getArtists,
    loadmoreArtists: stores.search.loadmoreArtists,
    users: stores.search.users,
    getUsers: stores.search.getUsers,
    loadmoreUsers: stores.search.loadmoreUsers,
}))
@observer
class Search extends Component {
    state = {
        renderContent: this.renderPlaylist.bind(this),
        search: this.props.getPlaylists,
        loadmore: this.props.loadmorePlaylists,
    };

    reset() {
        this.props.close();
        this.setState({
            renderContent: this.renderPlaylist.bind(this),
            search: this.props.getPlaylists,
            loadmore: this.props.loadmorePlaylists,
        });
    }

    search(e) {
        if (e.keyCode !== 13) {
            return;
        }
        var keyword = e.target.value.trim();

        this.state.search(keyword);
    }

    renderPlaylist() {
        var { classes, playlists } = this.props;

        if (playlists.length === 0) {
            return (
                <div className={classes.placeholder}>
                    <span>Nothing ...</span>
                </div>
            );
        }

        return playlists.map((e, index) => {
            return (
                <Link
                    className={classes.row}
                    key={index}
                    onClick={() => this.reset()}
                    to={e.link}>
                    <ProgressImage {...{
                        src: e.cover,
                        height: 40,
                        width: 40,
                    }} />

                    <aside>
                        <span>
                            {e.name}
                        </span>

                        <div>
                            <span className={classes.star}>
                                {helper.humanNumber(e.star)}

                                <i className="ion-ios-star" />
                            </span>

                            <span className={classes.played}>
                                {helper.humanNumber(e.played)} Played
                            </span>
                        </div>

                        <span className={classes.tracks}>
                            {e.size} Tracks
                        </span>
                    </aside>
                </Link>
            );
        });
    }

    renderAlbums() {
        var { classes, albums } = this.props;

        if (albums.length === 0) {
            return (
                <div className={classes.placeholder}>
                    <span>Nothing ...</span>
                </div>
            );
        }

        return albums.map((e, index) => {
            return (
                <Link
                    className={classes.row}
                    key={index}
                    onClick={() => this.reset()}
                    to={e.link}>
                    <ProgressImage {...{
                        src: e.cover,
                        height: 40,
                        width: 40,
                    }} />

                    <aside>
                        <span>
                            {e.name}
                        </span>

                        <span>
                            {e.artist.name}
                        </span>

                        <span className={classes.publish}>
                            {moment(e.publishTime).format('L')}
                        </span>
                    </aside>
                </Link>
            );
        });
    }

    renderArtists() {
        var { classes, artists, follow } = this.props;

        if (artists.length === 0) {
            return (
                <div className={classes.placeholder}>
                    <span>Nothing ...</span>
                </div>
            );
        }

        return artists.map((e, index) => {
            return (
                <div
                    className={classes.artist}
                    key={index}>
                    <Link
                        onClick={() => this.reset()}
                        to={e.link}>
                        <ProgressImage {...{
                            src: e.avatar,
                            height: 40,
                            width: 40,
                        }} />
                    </Link>

                    <aside>
                        <div>
                            <p>
                                <Link to={e.link}>{e.name}</Link>
                            </p>

                            <span>
                                {e.size} ALBUMS
                            </span>
                        </div>

                        <i
                            className={clazz('ion-ios-heart', {
                                liked: e.followed,
                            })}
                            onClick={async ev => {
                                var target = ev.target;
                                var followed = target.classList.contains(classes.liked);

                                if (await follow(followed, e.id)) {
                                    followed
                                        ? target.classList.remove(classes.liked)
                                        : target.classList.add(classes.liked)
                                    ;
                                }
                            }} />
                    </aside>
                </div>
            );
        });
    }

    renderUsers() {
        var { classes, users } = this.props;

        if (users.length === 0) {
            return (
                <div className={classes.placeholder}>
                    <span>Nothing ...</span>
                </div>
            );
        }

        return users.map((e, index) => {
            return (
                <div
                    className={classes.user}
                    key={index}>
                    <Link
                        onClick={() => this.reset()}
                        to={e.link}>
                        <ProgressImage {...{
                            src: e.avatar,
                            height: 64,
                            width: 64,
                        }} />
                    </Link>

                    <span className={classes.username}>{e.name}</span>
                </div>
            );
        });
    }

    loadmore(e) {
        var container = this.refs.list;

        if (this.props.loading) {
            return;
        }

        if (container.scrollTop + container.offsetHeight + 50 > container.scrollHeight) {
            this.state.loadmore();
        }
    }

    highlight(ele) {
        var classes = this.props.classes;
        var eles = ele.parentElement.children;

        Array.from(eles).map(e => {
            e.classList.remove(classes.selected);
        });

        ele.classList.add(classes.selected);
    }

    selected(ele, state) {
        var keywords = this.refs.search.value.trim();

        if (ele.classList.contains(classes.selected)) {
            return;
        }

        this.highlight(ele);
        this.setState(state);

        if (keywords) {
            setTimeout(() => state.search(keywords));
        }
    }

    render() {
        var { classes, loading, show } = this.props;

        if (!show) {
            return false;
        }

        return (
            <div
                className={classes.container}
                // Press ESC close
                onKeyUp={e => e.keyCode === 27 && this.reset()}>
                <img
                    alt="Close"
                    className={classes.close}
                    onClick={() => this.reset()}
                    src="assets/close-white.png" />

                <div className={classes.inner}>
                    <header>
                        <input
                            autoFocus={true}
                            onKeyUp={e => this.search(e)}
                            placeholder="Search ..."
                            ref="search"
                            type="text" />
                    </header>

                    <nav>
                        <span
                            className={classes.selected}
                            onClick={e => this.selected(e.target, {
                                search: this.props.getAlbums,
                                loadmore: this.props.loadmoreAlbums,
                                renderContent: () => this.renderAlbums(),
                            })}>
                            Album/专辑
                        </span>
                        <span
                            onClick={e => this.selected(e.target, {
                                search: this.props.getArtists,
                                loadmore: this.props.loadmoreArtists,
                                renderContent: () => this.renderArtists(),
                            })}>
                            Singer/歌手
                        </span>
                        <span
                            onClick={e => this.selected(e.target, {
                                search: this.props.getPlaylists,
                                loadmore: this.props.loadmorePlaylists,
                                renderContent: () => this.renderPlaylist(),
                            })}>
                            Playlist/歌单
                        </span>
                        <span
                            onClick={e => this.selected(e.target, {
                                search: this.props.getUsers,
                                loadmore: this.props.loadmoreUsers,
                                renderContent: () => this.renderUsers(),
                            })}>
                            User/用户
                        </span>
                    </nav>

                    <section
                        className={classes.list}
                        onScroll={e => this.loadmore(e)}
                        ref="list">
                        {
                            loading
                                ? (
                                    <div className={classes.placeholder}>
                                        <span>Loading ...</span>
                                    </div>
                                )
                                : this.state.renderContent()
                        }
                    </section>
                </div>
            </div>
        );
    }
}

export default injectSheet(classes)(Search);
