import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
} from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { IContact } from '../../store/interfaces';
import { AppContext } from '../../store/AppContext';
import { Indicator } from '../indicator';
import { getAddressFromPostcode } from '../../store/actions';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

interface IFormModal {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  contact?: IContact;
}

export const FormModal: FunctionComponent<IFormModal> = (props: IFormModal) => {
  const { openModal, setOpenModal, contact } = props;

  const {
    updateState,
    state: { contacts },
  } = useContext(AppContext);

  // This is the default data for each card
  const contactData = {
    id: contact ? contact.id : contacts ? contacts.length + 1 : 1,
    name: contact ? contact.name : '',
    email: contact ? contact.email : '',
    houseNumber: contact ? contact.houseNumber : '',
    postcode: contact ? contact.postcode : '',
    telephone: contact ? contact.telephone : '',
    addressLine1: contact ? contact.addressLine1 : '',
    addressLine2: contact ? contact.addressLine2 : '',
    town: contact ? contact.town : '',
    county: contact ? contact.county : '',
  };

  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string>('');

  const [formValues, setFormValues] = useState<IContact>(contactData);

  useEffect(() => {
    setFormValues(contactData);
  }, [contact]);

  // This function checks if the postcode field is empty, and then manages the api call and lastly sets the data from the api call into the fields 
  const handleSubmitSubForm = () => {
    if (formValues.postcode !== '') {
      setPage(2);
      getAddressFromPostcode(formValues.postcode, formValues.houseNumber).then(
        res => {
          setFormValues({
            ...formValues,
            addressLine1: res.data.addresses[0].line_1,
            addressLine2: res.data.addresses[0].locality,
            town: res.data.addresses[0].town_or_city,
            county: res.data.addresses[0].county,
          });
        },
      );
    } else {
      setError("The postcode feel can't be empty.");
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  // This is the function that submits the event 
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let newContacts = contacts;

    if (contact && contacts) {
      // If the contact already exists (e.g when we're editing a contact) this removes the contact from the state before we add the new contact.
      newContacts = contacts?.filter(contact => contact.id !== formValues.id);
    }

    if (newContacts) {
      // Here we add the contact to the global state
      updateState({
        contacts: [...newContacts, formValues],
      });
    }

    closeModal();
    setFormValues({
      id: 1,
      name: '',
      email: '',
      telephone: '',
      postcode: '',
      houseNumber: '',
      addressLine1: '',
      addressLine2: '',
      town: '',
      county: '',
    });
  };

  // The form is setup to use State, so the values are always stored and we can use these in any function in this component.
  const handleInputChange = (e: any): void => {
    e.preventDefault();
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // When we close the modal, we set the page back to 1, close the modal, and reset the state form values
  const closeModal = () => {
    setOpenModal(false);
    setPage(1);
    setFormValues(contactData);
  }

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={{
        content: {
          width: '50%',
          position: 'relative',
          inset: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        },
        overlay: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      <h1 style={{ marginBottom: '5px' }}>
        {contact ? 'Edit' : 'Add'} a contact
      </h1>
      <Indicator />
      <Form onSubmit={handleSubmitForm}>
        <input
          value={formValues.name}
          placeholder="Name"
          name="name"
          onChange={handleInputChange}
        />
        <input
          value={formValues.email}
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
        />
        <input
          value={formValues.telephone}
          placeholder="Telephone"
          name="telephone"
          onChange={handleInputChange}
        />
        <input
          value={formValues.houseNumber}
          placeholder="House Number"
          name="houseNumber"
          onChange={handleInputChange}
        />
        <input
          value={formValues.postcode}
          placeholder="Postcode"
          name="postcode"
          onChange={handleInputChange}
        />
        {error && (
          <p style={{ marginBottom: '16px' }} className="errorText p--sm">
            {error}
          </p>
        )}
        {page === 1 ? (
          <button
            type="button"
            style={{ marginTop: '10px' }}
            onClick={handleSubmitSubForm}>
            Find Address
          </button>
        ) : (
          <>
            <input
              value={formValues.addressLine1}
              placeholder="Address Line 1"
              name="addressLine1"
              onChange={handleInputChange}
            />
            <input
              value={formValues.addressLine2}
              placeholder="Address Line 2"
              name="addressLine2"
              onChange={handleInputChange}
            />
            <input
              value={formValues.town}
              placeholder="Town"
              name="town"
              onChange={handleInputChange}
            />
            <input
              value={formValues.county}
              placeholder="County"
              name="county"
              onChange={handleInputChange}
            />
            <button style={{ marginTop: '10px' }} type="submit">
              {contact ? 'Edit' : 'Add'} Contact
            </button>
          </>
        )}
        <button
          className="button-alt"
          onClick={closeModal}>
          Cancel
        </button>
      </Form>
    </Modal>
  );
};
