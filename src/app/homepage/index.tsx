import React, { FunctionComponent, useContext, useState } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import styled from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import { AppContext } from '../../store/AppContext';
import { Indicator } from '../../components/indicator';
import { Card } from '../../components/card';
import { FormModal } from '../../components/modal';

export const FlexContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledRow = styled(Row)`
  margin-right: 0;
  margin-top: 32px;
  margin-left: 0;
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

  console.log(contacts);

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
          {contacts &&
            contacts?.map((contact, i) => <Card key={i} contact={contact} />)}
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
    </>
  );
};
