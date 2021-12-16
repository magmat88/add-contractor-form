import React from 'react';
import { Header } from './components/header/header.component';
import { Footer } from './components/footer/footer.component';
import { Form } from './components/form/form.component';
import './app.scss';

function App() {
    return (
        <div>
            <Header appName={'Add New Contractor Form'} appDescription={'Form with data validation and photo preview. Method on submit: POST.'} />
            <Form formName={'Form'} />
            <Footer aboutPage={'This page is made with React and TypeScript. Styled with SASS.'} author={'Magdalena Matusiak'} />
        </div>
    );
}

export default App;
