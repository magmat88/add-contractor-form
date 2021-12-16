import './header.component.scss';

interface HeaderProps {
    appName: string;
    appDescription: string;
}

export const Header = ({appName, appDescription}: HeaderProps) => {
    
    return (
        <div className="header-container">
            <div className="name-container"><h1>{appName}</h1></div>
            <div className="description-container"><p>{appDescription}</p></div>
        </div>
    );
}