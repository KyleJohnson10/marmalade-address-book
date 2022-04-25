import { FunctionComponent, useContext, useState } from 'react';
import styled from 'styled-components';
import { Col } from 'styled-bootstrap-grid';
import { IContact } from '../../store/interfaces';
import { AppContext } from '../../store/AppContext';
import { FormModal } from '../modal';

const CardContainer = styled.div`
  padding: 15px 35px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 5px;
  margin: 0 10px 15px 0;
`;

const StyledColumn = styled(Col)`
  padding-left: 0;
  padding-right: 0;
`;

const Tag = styled.div`
  font-size: 14px;
  padding: 5px 20px;
  color: #ffffff;
  line-height: 15px;
  border-radius: 12.5px;
  background-color: #3aa4ad;
  width: fit-content;
  margin-bottom: 15px;
  margin-top: 10px;
`;

interface ICard {
  contact: IContact;
}

export const Card: FunctionComponent<ICard> = (props: ICard) => {
  const {
    id,
    name,
    email,
    telephone,
    addressLine1,
    addressLine2,
    town,
    county,
    postcode,
  } = props.contact;

  const {
    updateState,
    state: { contacts },
  } = useContext(AppContext);

  const [openModal, setOpenModal ] = useState(false);

  const removeContact = (id: number | string) => {
    updateState({
      contacts: contacts?.filter(contact => contact.id !== id),
    });
  };

  return (
    <StyledColumn md={4}>
      <CardContainer>
        <h2>{name}</h2>
        <Tag>{email}</Tag>
        <p className="p--alt">Telephone: {telephone}</p>
        <p className="p--alt">Address Line 1: {addressLine1}</p>
        <p className="p--alt">Address Line 2: {addressLine2}</p>
        <p className="p--alt">Town: {town}</p>
        <p className="p--alt">County: {county}</p>
        <p style={{ marginBottom: '15px' }} className="p--alt">
          Postcode: {postcode}
        </p>
        <button onClick={() => {
          setOpenModal(true);
        }}>Edit</button>
        <button
          className="button-alt"
          onClick={() => {
            removeContact(id);
          }}>
          Remove
        </button>
      </CardContainer>
      <FormModal contact={props.contact} setOpenModal={setOpenModal} openModal={openModal} />
    </StyledColumn>
  );
};
