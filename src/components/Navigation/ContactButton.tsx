import { Link } from 'react-router-dom'

const ContactButton = () => {
  return (
    <Link
      to="/contact"
      className="px-6 py-2 text-white bg-primary rounded-full hover:bg-primary-dark transition-colors"
    >
      Contact Us
    </Link>
  )
}

export default ContactButton
