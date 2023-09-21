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
import Spinner from 'react-bootstrap/Spinner';
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
      className="pet-col col-6 col-md-4 col-lg-3"
    >
     <p>{user.name}</p>
     <div> <img src={user.url} className="img-fluid pet-img" alt="" /></div>
    </div>
  );
};

const ImageGallery = () => {
  const [user, setUser] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    // Updating the 'users' state based on the current value of the search input
    setUsers(
      searchTerm
        ? data.filter((pet) => pet.tag.includes(searchTerm))
        : data
    );
  };

  useEffect(() => {
    // An observer to watch for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUser(user);
        setLoadingPage(false);
      } else {
        // User is signed out.
        setUser(null);
        setLoadingPage(false);
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);


  const [users, setUsers] = useState(data);
  // console.log(filteredData);
  // console.log(users);
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
    <>
      {
      loadingPage ?
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs = 'auto'>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
      :
      <div className="gallery_component">
      <Navbar user = {user} handleSearchChange = {handleSearchChange}/>
      <div className="image_gallery">
        <Container className="mt-3 mb-1">
          <Row className="justify-content-center">
            <Col xs ='auto'>
                <h1 className="animate__animated animate__bounce">Welcome to our Pawsome Pet Gallery!</h1>
            </Col>
          </Row>
          <Row  className="justify-content-center">
          {user ?<Col xs ='auto'>
                <p className=""><span className="sign_auth">Drag and drop images </span>to create a unique display of your favorite furry friends. <span className="d-none d-md-inline-block">Arrange them in any order that tugs at your heartstrings.</span><span className="d-md-none"><br/>Use the space around the images,to scroll down and discover more adorable pet images</span></p>
            </Col>:
            <Col xs ='auto'>
                <p className="sign_unauth">Sign In to drag and drop pets</p>
            </Col>}
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
                      {users.length > 0 ? users.map((user) => (
                      <SortableUser
                        key={user.id}
                        user={user}
                        isAuthenticated={true}
                      />
                    ))
                  :
                  <p className="no_search">Oops! No Pet Matches Found, Try searching "dog" or "cat"</p>
                  }
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
                <Col xs = '9'>
                  <div className="row">
                  {users.map((user) => (
                <div key={user.id} className="pet-col_unauth col-6 col-md-4 col-lg-3">
                      <p className="">{user.name}</p>
                     <div> <img src={user.url} className="img-fluid pet-img" alt="" /></div>
                    </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </div>
    </div>
    }
    </>
  );
};
export default ImageGallery;
