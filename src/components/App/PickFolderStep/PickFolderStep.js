import React from 'react';
import { Segment, Container, Header, List } from 'semantic-ui-react';
import FolderPicker from './FolderPicker';

import s from './PickFolderStep.css';

export default function PickFolderStep() {
  return (
    <div className={s.root}>
      <Container>
        <Header as="h1" textAlign="center">
          Hướng dẫn
        </Header>

        <Segment size="large" padded="very">
          <List as="ul">
            <List.Item as="li">
              Click nút "Choose Files", chọn folder chứa tất cả các ảnh cần đánh dấu
            </List.Item>

            <List.Item as="li">
              Lưu ý luôn chọn cùng 1 folder, vì đường dẫn từ folder được chọn tới file ảnh sẽ được dùng làm ID cho kết quả đánh dấu của từng ảnh.<br/>
              Ví dụ: trong folder A có chứa folder B, trong folder B có chứa file image.jpg. Nếu chọn folder A để đánh dấu ảnh, kết quả sẽ được lưu gắn với ID là "A/B/image.jpg". Nếu lần sau dùng app mà lại chọn folder B thì đường dẫn của ảnh đã trở thành "B/image.jpg" và không sử đụng được kết quả của lần đánh dấu trước. Vì vậy, luôn luôn chọn cùng 1 folder trong các lần sử dụng app.
            </List.Item>
          </List>

          <FolderPicker />
        </Segment>
      </Container>
    </div>
  );
};
