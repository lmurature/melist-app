import './styles/Footer.scss';

const Footer = (props) => {
  return (
    <div className="footer">
      <p className="info">
        Made with 💛 by{' '}
        <a className="portfolio" href="https://lmurature-portfolio.netlify.app/" target="_blank">
          Lucio Murature
        </a>
      </p>
    </div>
  );
};

export default Footer;
