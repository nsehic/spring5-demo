import {
  Table,
  Button,
  message
} from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import "./App.css";
import { getAllStudents, deleteStudentById } from "./client";
import { useEffect, useState } from "react";
import { ApplicationLayout } from "./components/layout";
import { SideDrawer } from "./components/SideDrawer";

const CRUMBS = [
  {
    id: 1,
    text: "Users",
  },
  {
    id: 2,
    text: "All",
  },
];

function App() {
  const [students, setStudents] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [newStudents, setNewStudents] = useState([])
  

  useEffect(() => {
    async function fetchData() {
      let studentsResponse;
      try {
        studentsResponse = await getAllStudents();
      } catch(err) {
        const errorResponse = await err.response.json();
        message.error(errorResponse.message);
      }
      
      const formattedResponse = studentsResponse.map((student) => ({
        key: student.id,
        ...student,
      }));
      setStudents(formattedResponse);
    }

    fetchData();
  }, [newStudents]);

  const onSuccessHandler = (response) => {
    setNewStudents(response);
  }

  const onDeleteStudent = async (id) => {
    const response = await deleteStudentById(id);
    setNewStudents(response);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="dashed" onClick={() => onDeleteStudent(record.id)}>Delete</Button>
      )
    }
  ]

  return (
    <div>
      <ApplicationLayout breadcrumbs={CRUMBS}>
        <SideDrawer visible={showDrawer} hideDraw={() => setShowDrawer(false)} onSuccess={onSuccessHandler} />
        <Table
          dataSource={students}
          columns={columns}
          title={() => (
            <Button
              type="primary"
              shape="round"
              icon={<PlusCircleFilled />}
              size="medium"
              onClick={() => setShowDrawer(true)}
            >
              Add Student
            </Button>
          )}
        >
          <Table.Column title="Name" dataIndex="name" key="name" />
          <Table.Column title="Email" dataIndex="email" key="email" />
          <Table.Column title="Gender" dataIndex="gender" key="gender" />
        </Table>
      </ApplicationLayout>
    </div>
  );
}

export default App;
