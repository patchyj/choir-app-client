import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './Site.scss';
import genKey from '../../utils/genKey';
import config from '../../utils/config';

const fetchData = async (url, cb, err) => {
  try {
    const response = await axios.get(url);
    if (response.data) {
      cb(response.data);
    }
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      err();
    }
  }
};

const Landing = props => {
  const [files, setFiles] = useState();

  useEffect(() => {
    fetchData(`${config.API_URL}/files/all`, setFiles, props.logout);
  }, []);

  return (
    <div className="container">
      <h1>All Saints Choir</h1>
      {files && files.length && (
        <React.Fragment>
          <div className="row">
            <div className="col-xs-4">
              <h3>Tracks</h3>
              {files &&
                files.map((f, i) => {
                  return (
                    <div className="player-container" key={genKey(f.filename, i)}>
                      <label>{f.filename}</label>
                      <ReactPlayer
                        url={`http://localhost:4000/files/download/${f._id}`}
                        controls
                        height="30px"
                        width="100%"
                        style={{ marginBottom: '10px' }}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Landing;
