// src/components/EmailItem.js
import React from 'react';
import { Card } from 'react-bootstrap';

const EmailItem = ({ email }) => {
  return (
    <Card className="my-3">
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
  );
};

export default EmailItem;
