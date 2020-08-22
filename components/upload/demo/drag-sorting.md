---
order: 13
title:
  zh-CN: 上传列表拖拽排序
  en-US: Drag sorting of uploadList
---

## zh-CN

使用 `itemRender` ，我们可以集成 react-dnd 来实现对上传列表拖拽排序。

## en-US

By using `itemRender`, we can integrate upload with react-dnd to implement drag sorting of uploadList.

```jsx
import React, { useState, useCallback, useRef } from 'react';
import { Upload } from 'antd';
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { FileTwoTone, PlusOutlined } from '@ant-design/icons';

const RNDContext = createDndContext(HTML5Backend);

const type = 'DragableUploadList';

const DragableUploadListItem = ({ moveRow, file, fileList }) => {
  const ref = React.useRef();
  const index = fileList.indexOf(file);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <div
      ref={ref}
      className={`ant-upload-list-item ant-upload-list-item-${
        file.status
      } ant-upload-list-item-list-type-picture-card ${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move' }}
    >
      <div className="ant-upload-list-item-info">
        <span>
          <span className="ant-upload-list-item-thumbnail ant-upload-list-item-file">
            <FileTwoTone />
          </span>
          <span className="ant-upload-list-item-name ant-upload-list-item-name-icon-count-1">
            {file.name}
          </span>
        </span>
      </div>
    </div>
  );
};

const DragSortingUpload: React.FC = () => {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image1.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image2.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image3.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image4.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ]);

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = fileList[dragIndex];
      setFileList(
        update(fileList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [fileList],
  );

  const manager = useRef(RNDContext);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <DndProvider manager={manager.current.dragDropManager}>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        itemRender={(file, currFileList) => {
          return <DragableUploadListItem file={file} fileList={currFileList} moveRow={moveRow} />;
        }}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
    </DndProvider>
  );
};

ReactDOM.render(<DragSortingUpload />, mountNode);
```

```css
#components-upload-demo-drag-sorting .ant-upload-list-item.drop-over-downward {
  border-right: 2px dashed #1890ff;
}

#components-upload-demo-drag-sorting .ant-upload-list-item.drop-over-upward {
  border-left: 2px dashed #1890ff;
}
#components-upload-demo-drag-sorting
  .ant-upload-list-picture-card
  .ant-upload-list-item-info::before {
  display: none;
}
```
