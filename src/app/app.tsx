import React from 'react';
import { Header } from './components/header/header.component';
import { Footer } from './components/footer/footer.component';
import { Form } from './components/form/form.component';
import './app.scss';

function App() {
    return (
        <div>
            <Header appName={'Formularz dodawania kontrahenta'} appDescription={'Formularz z walidacją danych oraz podglądem zdjęcia.'} />
            <Form formName={'Nowy kontrahent'} />
            <Footer aboutPage={'Aplikacja stworzona z wykorzystaniem ReactJS oraz TypeScript. Style z wykorzystaniem SASS.'} author={'Magdalena Matusiak'} />
        </div>
    );
}

export default App;
