import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    if (target.name === 'name') setName(target.value);
    else setNumber(target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isAlreadyExist = contacts.find(el => el.name === name);
    if (isAlreadyExist) return alert(`${name} is already in contacts`);
    dispatch(addContact(name, number));
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nameId" className="formLabel">
        Name
      </label>
      <input
        className="form-input"
        type="text"
        name="name"
        id="nameId"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
        value={name}
        placeholder="Jacob Mercer"
      />
      <div />
      <label htmlFor="numberId" className="formLabel">
        Number
      </label>
      <input
        className="form-input"
        type="tel"
        name="number"
        id="numberId"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
        value={number}
        placeholder="111-22-33"
      />
      <div>
        <button type="submit" className="btn btn-primary">
          Add contact
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
