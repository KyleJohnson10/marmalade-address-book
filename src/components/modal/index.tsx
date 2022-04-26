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

  const contactData = {
    id: contact ? contact.id : contacts ? contacts.length + 1 : 1,
    name: contact ? contact.name : '',
    email: contact ? contact.email : '',
    telephone: contact ? contact.telephone : '',
    addressLine1: contact ? contact.addressLine1 : '',
    addressLine2: contact ? contact.addressLine2 : '',
    town: contact ? contact.town : '',
    county: contact ? contact.county : '',
    postcode: contact ? contact.postcode : '',
  }

  const [formValues, setFormValues] = useState<IContact>(contactData);

  useEffect(() => {
    setFormValues(contactData);
  }, [contact]);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let newContacts = contacts;

    if (contact && contacts) {
      newContacts = contacts?.filter(contact => contact.id !== formValues.id);
    }

    if (newContacts) {
      updateState({
        contacts: [...newContacts, formValues],
      });
    }
    console.log(contacts);
    setOpenModal(false);
    setFormValues({
      id: 1,
      name: '',
      email: '',
      telephone: '',
      addressLine1: '',
      addressLine2: '',
      town: '',
      county: '',
      postcode: '',
    });
  };

  const handleInputChange = (e: any): void => {
    e.preventDefault();
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={() => {
        setOpenModal(false);
      }}
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
      }}
      contentLabel="Example Modal">
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
        <input
          value={formValues.postcode}
          placeholder="Postcode"
          name="postcode"
          onChange={handleInputChange}
        />
        <button style={{ marginTop: '10px' }} type="submit">
          {contact ? 'Edit' : 'Add'} Contact
        </button>
        <button
          className="button-alt"
          onClick={() => {
            setOpenModal(false);
          }}>
          Cancel
        </button>
      </Form>
    </Modal>
  );
};
