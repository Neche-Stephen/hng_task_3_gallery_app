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

const SortableUser = ({ pet }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: pet.id });
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
     <p>{pet.name}</p>
     <div> <img src={pet.url} className="img-fluid pet-img" alt="" /></div>
    </div>
  );
};

const ImageGallery = () => {
  const [user, setUser] = useState(null);
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    // Updating the 'users' state based on the current value of the search input
    setPets(
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
        console.log(user);
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  const [pets, setPets] = useState(data);
  const [inputValue, setInputValue] = useState("");

  const addUser = () => {
    const newPet = {
      id: Date.now().toString(),
      name: inputValue,
    };
    setInputValue("");
    setPets((pets) => [...pets, newPet]);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setPets((pets) => {
      const oldIndex = pets.findIndex((pet) => pet.id === active.id);
      const newIndex = pets.findIndex((pet) => pet.id === over.id);
      return arrayMove(pets, oldIndex, newIndex);
    });
  };

  return (
    <div className="gallery_component">
      <Navbar user = {user} handleSearchChange = {handleSearchChange}/>
      <div className="image_gallery">
        <Container className="mt-3 mb-1">
          <Row className="justify-content-center">
            <Col xs ='auto'>
                <h1>Welcome to our Pawsome Pet Gallery!</h1>
            </Col>
          </Row>
          <Row  className="justify-content-center">
            {user ?<Col xs ='auto'>
                <p>Drag and drop images to create a unique display of your favorite furry friends. Arrange them in any order that tugs at your heartstrings.</p>
            </Col>:
            <Col xs ='auto'>
                <p className="sign_unauth">Sign In to drag and drop pets</p>
            </Col>}
          </Row>
        </Container>
        {user ? (
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext
              items={pets}
              strategy={verticalListSortingStrategy}
            >
              <Container fluid>
                <Row className="justify-content-center">
                  <Col xs ='9'>
                    <div className="row justify-content-around">
                      {pets.map((pet) => (
                      <SortableUser
                        key={pet.id}
                        pet={pet}
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
                <Col xs = '9'>
                  <div className="row">
                  {pets.map((pet) => (
                <div key={pet.id} className="pet-col col-10 col-lg-3">
                      <p>{pet.name}</p>
                     <div> <img src={pet.url} className="img-fluid" alt="" /></div>
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
  );
};
export default ImageGallery;
