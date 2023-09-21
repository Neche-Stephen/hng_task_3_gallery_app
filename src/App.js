import { BrowserRouter, Routes, Route} from 'react-router-dom';

import SignIn from './routes/signin/SignIn';
import SignUp from './routes/signup/SignUp';
import ImageGallery from './routes/imageGallery/ImageGallery';

const App = () => {
  return (
   <BrowserRouter>
      <Routes>
        <Route path = '/login' element = {<SignIn />} />
        <Route path = '/signup' element = {<SignUp />} />
        <Route path = '/' element = {<ImageGallery />} />
      </Routes>
   </BrowserRouter>
  );
};

export default App;
