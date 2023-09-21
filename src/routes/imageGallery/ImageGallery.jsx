import { useState , useEffect} from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../utils/firebase.utils";
import "./ImageGallery.css";
import { data } from "../../data"; 
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {Container, Row, Col} from 'react-bootstrap';
import Navbar from '../../components/navbar/Navbar';

const SortableUser = ({ user }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: user.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="pet-col col-10 col-lg-3"
    >
     <p>{user.name}</p>
     <div> <img src={user.url} className="img-fluid pet-img" alt="" /></div>
    </div>
  );
};

const ImageGallery = () => {

  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    console.log(searchTerm);
    setUsers(filteredData);
  };

  const filteredData = data.filter((pet) =>
    pet.tag.includes(searchTerm)
  );

  useEffect(() => {
    // An observer to watch for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUser(user);
        console.log(user);
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  // use
  console.log(filteredData);
  const [users, setUsers] = useState(filteredData);
  console.log(filteredData);
  console.log(users);
  const [inputValue, setInputValue] = useState("");


  const addUser = () => {
    const newUser = {
      id: Date.now().toString(),
      name: inputValue,
    };
    setInputValue("");
    setUsers((users) => [...users, newUser]);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setUsers((users) => {
      const oldIndex = users.findIndex((user) => user.id === active.id);
      const newIndex = users.findIndex((user) => user.id === over.id);
      return arrayMove(users, oldIndex, newIndex);
    });
  };

  return (
    <div className="users">
      {/* <div>Total: {users.length}</div>
      <div className="users-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addUser}>Add user</button>
      </div> */}
      <Navbar user = {user} searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} handleSearchChange = {handleSearchChange}/>
      <div className="image_gallery">
       {/* <div className="search_results">
        <Container >
            <Row className="justify-content-center">
                <Col xs = '9' className="search_results_col">
                      <div className="row">
                {filteredData.map((pet) => (
                  <div className="col-3" key={pet.id}>
                  <div><p>{pet.name}</p></div>
                  <div> <img src={pet.url} alt={pet.name} className="img-fluid" /></div>
                  </div>
          ))}
        </div>
                </Col>
            </Row>
        </Container>
       </div> */}
        <Container className="mt-3 mb-1">
          <Row className="justify-content-center">
            <Col xs ='auto'>
                <h1>Welcome to our Pawsome Pet Gallery!</h1>
            </Col>
          </Row>
          <Row  className="justify-content-center">
            <Col xs ='auto'>
                <p>Drag and drop images to create a unique display of your favorite furry friends. Arrange them in any order that tugs at your heartstrings.</p>
            </Col>
          </Row>
        </Container>
        {user ? (
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext
              items={users}
              strategy={verticalListSortingStrategy}
            >
              <Container fluid>
                <Row className="justify-content-center">
                  <Col xs ='9'>
                    <div className="row justify-content-around">
                      {users.map((user) => (
                      <SortableUser
                        key={user.id}
                        user={user}
                        isAuthenticated={true}
                      />
                    ))}
                    </div>
                  </Col>
                </Row>
              </Container>
            </SortableContext>
          </DndContext>
        ) : (
          <div>
            {/* Render non-draggable content for unauthenticated users */}
            <Container>
              <Row className="justify-content-around">
              {users.map((user) => (
              <div key={user.id} className="user col-10 col-lg-3">
                {user.name}
                <img src={user.url} width="100" alt="" />
              </div>
            ))}
              </Row>
            </Container>
          </div>
        )}
      </div>
    </div>
  );
};
export default ImageGallery;
