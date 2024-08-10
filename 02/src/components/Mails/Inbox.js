// src/components/Inbox.js
import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';

const Inbox = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('https://mailboxclient-e0122-default-rtdb.firebaseio.com/emails.json');
        const data = await response.json();
        const emailList = Object.values(data || {}).filter(email => email.to === 'loggedInUserEmail'); // Replace with actual logged-in user email
        setEmails(emailList);
      } catch (error) {
        console.error('Error fetching emails: ', error);
      }
    };

    fetchEmails();
  }, []);

  return (
    <Container className="my-4">
      <h2>Inbox</h2>
      <ListGroup>
        {emails.map((email, index) => (
          <ListGroup.Item key={index}>
            <Card>
              <Card.Body>
                <Card.Title>{email.subject}</Card.Title>
                <Card.Text>
                  {email.content.blocks.map(block => block.text).join('\n')}
                </Card.Text>
                <Card.Footer className="text-muted">
                  {new Date(email.timestamp).toLocaleString()}
                </Card.Footer>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Inbox;
