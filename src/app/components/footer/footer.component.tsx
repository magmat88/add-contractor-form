import './footer.component.scss';

interface FooterProps {
    aboutPage: string;
    author: string;
}

export const Footer = ({aboutPage, author}: FooterProps) => {
    return (
        <div className="footer-container">
            <div className="about-container">{aboutPage}</div>
            <div className="author-container"><p>&copy; {author}</p></div>
        </div>
    );
};
