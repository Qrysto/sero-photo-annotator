import React from 'react';
import Annotator from './Annotator';
import Result from './Result';
import FolderTree from './FolderTree';

import s from './AnnotateStep.css';

export default function AnnotateStep() {
  return (
    <div className={s.root}>
      <div className={s.sidebar}>
        <div className={s.folderTree}>
          <FolderTree />
        </div>

        <div className={s.polygons}>
          <Result />
        </div>
      </div>

      <div className={s.photoView}>
        <Annotator />
      </div>
    </div>
  );
};
