import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import ZoomIn from 'material-ui/svg-icons/action/zoom-in'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import css from './ImageResults.css';

class ImageResults extends Component {
    static propTypes = {
      images: PropTypes.array.isRequired
    }

    state = {
        open: false,
        currentImg: ''
    }

    handleOpen = img => {
        this.setState({
            currentImg: img,
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    

  render() {

    let imageListContent;
    const {images} = this.props;

    if(images) {
        imageListContent = (
            <GridList cols={3}>
                {images.map(img =>
                    <GridTile
                        title={img.tags}
                        key={img.id}
                        subtitle={
                            <span>
                                by <strong>{img.user}</strong>
                            </span>
                        }
                        actionIcon={
                            <IconButton onClick={() => this.handleOpen(img.largeImageURL)}>
                                <ZoomIn color="white" />
                            </IconButton>
                        }
                        >
                        <img src={img.largeImageURL} alt=""/>
                        </GridTile>

                )}
            </GridList>
        )
    } else {
        imageListContent = null;
    }

    const actions = [
        <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ]

    return (
      <div>
        {imageListContent}
        <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClos={this.handleClose}
        >
            <img src={this.state.currentImg} alt="" className="responsiveImg"/>
        </Dialog>
      </div>
    )
  }
}

export default  ImageResults;