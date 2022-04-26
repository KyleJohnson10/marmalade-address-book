import React, { FunctionComponent, useContext, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { Container, Row } from 'styled-bootstrap-grid';
import { AppContext } from '../../store/AppContext';
import { Indicator } from '../../components/indicator';
import { Card } from '../../components/card';
import { FormModal } from '../../components/modal';

export const FlexContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  max-width: 800px;

  h2 {
    text-align: center;
  }
`;

const AddContactButton = styled.button`
  padding: 16.5px 30px;
`;

export const Homepage: FunctionComponent<RouteComponentProps> = () => {
  const {
    state: { contacts },
  } = useContext(AppContext);

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <FlexContainer>
        <TextContainer style={{ marginTop: '30px' }}>
          <h2>
            {contacts && contacts.length > 0
              ? 'Here are all of your contacts, you can add, edit or delete your contacts at any time.'
              : 'You have no contacts currently, click the button below to add one.'}
          </h2>
          <Indicator />
        </TextContainer>
      </FlexContainer>
      <Container>
        <Row>
          {/*Here we sort the contacts in ID order, and then map each contact to a card*/}
          {contacts &&
            contacts
              ?.sort((a, b) => a.id - b.id)
              .map((contact, i) => <Card key={contact.id} contact={contact} />)}
        </Row>
      </Container>
      <FlexContainer style={{ marginTop: '30px' }}>
        <AddContactButton
          onClick={(): void => {
            setOpenModal(true);
          }}>
          Add Contact
        </AddContactButton>
      </FlexContainer>
      <FormModal setOpenModal={setOpenModal} openModal={openModal} />
      <FlexContainer style={{ marginTop: '100px' }}>
        <p>
          P.S: I had tempermental issues with the api, some postcodes weren't
          allowed in the free trial, please use LE15 7JN.
        </p>
      </FlexContainer>
    </>
  );
};
