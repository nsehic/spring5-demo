import {
    Button,
    Drawer,
    Form,
    Input,
    Select,
    Space,
    message
  } from "antd";
  import { useState } from 'react';
  import { createNewStudent } from "../../client";

  const { Option } = Select;

export const SideDrawer = ({hideDraw, visible, onSuccess}) => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');


    const onSubmitHandler = async (e) => {
        let response;
        try {
          response = await createNewStudent(name, email, gender);
        } catch(err) {
          const error = await err.response.json();
          message.error(error.message);
        }
        hideDraw();
        onSuccess(response);
    }

    return (
        <Drawer
          title="Create new student"
          width={520}
          onClose={hideDraw}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={hideDraw}>Cancel</Button>
              <Button onClick={onSubmitHandler} type="primary">
                Submit
              </Button>
            </Space>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input placeholder="Please enter name" value={name} onChange={e => setName(e.target.value)}/>
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Please enter email address" },
              ]}
            >
              <Input placeholder="Please enter email address" value={email} onChange={e => setEmail(e.target.value)}/>
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please choose the gender" }]}
            >
              <Select placeholder="Please choose the gender" value={gender} onChange={val => setGender(val)}>
                <Option value="MALE">Male</Option>
                <Option value="FEMALE">Female</Option>
              </Select>
            </Form.Item>
          </Form>
        </Drawer>
    )
}