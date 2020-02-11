import React, { Component } from 'react';
import axios from 'axios';
import './FileViewer.scss';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
import genKey from '../../../utils/genKey';
import config from '../../../utils/config';

class FileViewer extends Component {
  state = {
    files: []
  };

  sortBySize() {
    let tempFiles = [...this.state.files];
    tempFiles.sort((a, b) => a - b);
    this.setState({ files: tempFiles });
  }

  fetchData() {
    let headers = {
      Authorization: this.props.tokenProp
    };

    axios
      .get('/files/all', { headers: headers })
      .then(response => {
        let newFiles = response.data;
        this.setState({ files: newFiles }, () => {});
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.props.logout();
        }
      });
  }

  /**@param fileId string representing the file id */
  /**Handles click on a "copy-download-link-to-clipboard" button */
  onCopy(fileId) {
    let tempEle = document.createElement('input');
    tempEle.value = window.location.host + '/files/download/' + fileId;
    document.body.appendChild(tempEle);
    tempEle.select();
    document.execCommand('copy');
    document.body.removeChild(tempEle);
  }

  /**@param fileId string representing the file id */
  /**Handles click on a "delete file" button */
  onDeleteHandler(fileId) {
    let headers = {
      Authorization: this.props.tokenProp
    };
    axios
      .delete('/files/' + fileId, { headers: headers })
      .then(() => {
        this.fetchData();
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.props.logout();
        }
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { files } = this.state;
    return (
      <div className="container">
        <h1>Your files</h1>
        {files && files.length && (
          <React.Fragment>
            <div className="row">
              <div className="col-xs-6">
                <h3>Tracks</h3>
                {files.map((f, i) => {
                  return (
                    <div className="player-container" key={genKey(f.filename, i)}>
                      <label>{f.filename}</label>
                      <ReactPlayer
                        url={`${config.API_URL}/files/download/${f._id}`}
                        controls
                        height="30px"
                        width="100%"
                        style={{ marginBottom: '10px' }}
                      />
                      <div className="btn-container">
                        <button onClick={this.onCopy.bind(this, f._id)}>
                          <FontAwesomeIcon icon={faCopy} />
                          Copy URL
                        </button>
                        <button onClick={this.onDeleteHandler.bind(this, f._id)}>
                          <FontAwesomeIcon icon={faTrash} />
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default FileViewer;
