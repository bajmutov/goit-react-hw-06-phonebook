import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { getContacts, getFilter } from 'redux/selectors';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  console.log('contacts', contacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const getVisibleContact = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    if (contacts) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  };

  const filteredContacts = getVisibleContact();

  return (
    <ul>
      {filteredContacts &&
        filteredContacts.map(({ id, name, number }) => (
          <li key={id} className="contactItem">
            {name}: {number}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
};

export default ContactList;
