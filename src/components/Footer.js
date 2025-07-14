const Footer = () => {
  return (
    <footer className="bg-white border-top mt-5">
      {/* Full-width footer content */}
      <div className="container-fluid pt-5 pb-4 px-4 px-md-5">
        <div className="row align-items-start gy-4">

          {/* NIC Logo & Description */}
          <div className="col-md-4">
            <img src="/nic.png" alt="NIC Logo" style={{ height: '45px' }} />
            <p className="mt-3" style={{ maxWidth: '300px', fontSize: '0.9rem' }}>
              NIC VAT Registration Portal. Powering digital governance through secure and scalable infrastructure.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="https://www.facebook.com/NICIndia/"><img src="/facebook_logo.svg" alt="facebook" style={{ width: '20px' }} /></a>
              <a href="https://www.instagram.com/nicmeity/"><img src="/instagram_logo.svg" alt="instagram" style={{ width: '20px' }} /></a>
              <a href="https://x.com/NICMeity?mx=2"><img src="/twitter_logo.svg" alt="twitter" style={{ width: '20px' }} /></a>
              <a href="https://www.nic.gov.in/contact-us/"><img src="/gmail_logo.svg" alt="gmail" style={{ width: '20px' }} /></a>
            </div>
          </div>

          {/* About */}
          <div className="col-6 col-md-2">
            <h6 className="text-dark fw-bold text-uppercase">About</h6>
            <ul className="list-unstyled mt-3">
              <li><a href="https://www.nic.gov.in/" className="text-decoration-none text-muted">Our website</a></li>
              <li><a href="https://www.nic.gov.in/" className="text-decoration-none text-muted">About us</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-6 col-md-2">
            <h6 className="text-dark fw-bold text-uppercase">Follow us</h6>
            <ul className="list-unstyled mt-3">
              <li><a href="https://www.instagram.com/nicmeity/" className="text-decoration-none text-muted">Instagram</a></li>
              <li><a href="https://x.com/NICMeity?mx=2" className="text-decoration-none text-muted">Twitter</a></li>
            </ul>
          </div>

          {/* Privacy Policy */}
          <div className="col-12 col-md-3">
            <h6 className="text-dark fw-bold text-uppercase">Privacy Policy</h6>
            <ul className="list-unstyled mt-3">
              <li><a href="/privacy-policy" className="text-decoration-none text-muted">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Row Full Width */}
      <div className="bg-light pt-3 pb-3 px-4 px-md-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} National Informatics Centre (NIC). All rights reserved.
          </p>
          <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
            <a href="https://www.nic.gov.in/terms-of-use/" className="text-decoration-none text-muted">Terms & Conditions</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
