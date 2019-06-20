import React  from 'react';
import { connect } from 'react-redux';
import classes from './TmdbActions.module.css';

import icons from '../assets/icons';

import actions from '../store/actions';

const TmdbActions = props => {
    const {
        mediaItem,
        userDetails: {
            favorite,
            watchlist,
            id
        },
        initiateToggleItemInMediaList
    } = props;

    const mediaType = mediaItem.media_type;
    const mediaId = mediaItem.id;

    console.log('individual media type', mediaType);
    const media = mediaType === 'movie' ? 'movies' : 'tv';

    const favouritesItems = favorite[media];
    const watchlistItems = watchlist[media];

    const isFavourite = !!favouritesItems.find(favouriteItem => favouriteItem.id === mediaId);
    const isInWatchList = !!watchlistItems.find(watchlistItem => watchlistItem.id === mediaId);

    const toggleItemInList = listType => {
        const isInList = listType === 'favorite' ? !isFavourite : !isInWatchList;
        initiateToggleItemInMediaList(listType, mediaItem, id, isInList);
    };

    const favouriteClass = `${classes.TmdbAction} ${classes.TmdbActionAddToFavourite} ${isFavourite ? classes.isFavourite : ''}`;
    const watchlistClass = `${classes.TmdbAction} ${classes.TmdbActionAddToWatchlist} ${isInWatchList ? classes.isInWatchlist : ''}`;

    return (
        <div data-preventclick className={classes.TmdbActionsContainer}>
            <div
                className={favouriteClass}
                data-preventclick
                onClick={() => toggleItemInList('favorite')}>
                {icons.star}
            </div>
            <div
                className={watchlistClass}
                data-preventclick
                onClick={() => toggleItemInList('watchlist')}>
                {icons.watch}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initiateToggleItemInMediaList: (listType, mediaItem, userId, isInList) => dispatch(actions.initiateToggleItemInMediaList(listType, mediaItem, userId, isInList)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TmdbActions);
