import { useEffect, useState } from "react";
import {
  Button,
    Confirm,
  Container,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Segment,
  Table,
} from "semantic-ui-react";
import firebase from "./FirebaseConfig";

const Crud = () => {
  const [aFirstName, setAFirstName] = useState("");
  const [aLastname, setaLastName] = useState("");
  const [uFirstName, setUFirstName] = useState("");
  const [uLastName, setULastName] = useState("");
  const [userid, setUserId] = useState("");
  const [openc,setOpenc]=useState(false);
  const [userData, setUserData] = useState([]);


  useEffect(() => {
    const firestore = firebase.database().ref("/UserInfo");
    firestore.on("value", (response) => {
      const data = response.val();
      let userInfo = [];
      for (let id in data) {
        userInfo.push({
          id: id,
          FirstName: data[id].FirstName,
          LastName: data[id].LastName,
        });
      }
      setUserData(userInfo);
    });
  }, []);

  const handleAddUser = () => {
    const firestore = firebase.database().ref("/UserInfo");
    let data = {
      FirstName: aFirstName,
      LastName: aLastname,
    };
    firestore.push(data);
    setAFirstName("");
    setaLastName("");
  };

  const handleUpdateUser = () => {
      
    const firestore = firebase.database().ref("/UserInfo").child(userid);
    firestore.update({
      FirstName: uFirstName,
      LastName: uLastName,
    });
    setUFirstName("");
    setULastName("");
  };

  const handleUpdate = (data) => {
    setUFirstName(data.FirstName);
    setULastName(data.LastName);
    setUserId(data.id);
  };

  const handleClick = (id) => {
    const firestore = firebase.database().ref("/UserInfo").child(id);
    firestore.remove();
  };

  return (
    <div className="ui hidden divider">
            <h1 style={{textAlign:"center"}} >User's data</h1>
      <Container>
        <Grid>
          <Grid.Row columns="2">
            <Grid.Column>
              <Segment padded="very">
                <Form>
                  <Form.Field>
                    <label>FirstName</label>
                    <Input
                      placeholder="FirstName"
                      focus
                      value={aFirstName}
                      onChange={(e) => setAFirstName(e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>LastName</label>
                    <Input
                      placeholder="LastName"
                      value={aLastname}
                      onChange={(e) => setaLastName(e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Button
                      onClick={() => handleAddUser()}
                      positive
                      disabled={!aFirstName}
                    >
                        <Icon name="add circle" ></Icon>
                      Add User
                    </Button>
                  </Form.Field>
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment padded="very">
                <Form>
                  <Form.Field>
                    <label>FirstName</label>
                    <Input
                      placeholder="FirstName"
                      focus
                      value={uFirstName}
                      onChange={(e) => setUFirstName(e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>LastName</label>
                    <Input
                      placeholder="LastName"
                      value={uLastName}
                      onChange={(e) => setULastName(e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Button onClick={()=>handleUpdateUser()} positive>
                        <Icon name="edit outline" ></Icon>
                      Edit User
                    </Button>
                  </Form.Field>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="1">
            <Grid.Column>
              {userData.length === 0 ? (
                <Segment padded="very">
                  <Header textAlign="center">
                    Oops! There is no data available. Please Enter some data.
                  </Header>
                </Segment>
              ) : (
                <Segment padded="very">
                  <Table celled fixed singleLine>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>FirstName</Table.HeaderCell>
                        <Table.HeaderCell>LastName</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    {userData.map((data, index) => {
                      return (
                        <Table.Body>
                          <Table.Cell>{data.FirstName}</Table.Cell>
                          <Table.Cell>{data.LastName}</Table.Cell>
                          <Table.Cell>
                            <Button primary onClick={() => handleUpdate(data)}>
                              <Icon name="edit"></Icon>
                              Update
                            </Button>
                            <Button
                              color="red"
                              onClick={() => handleClick(data.id)}
                            >
                              <Icon name="delete"></Icon>
                              Delete
                            </Button>
                          </Table.Cell>
                        </Table.Body>
                      );
                    })}
                  </Table>
                </Segment>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};
export default Crud;
