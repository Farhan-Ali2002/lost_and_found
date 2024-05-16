import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ItemCard from '../components/item_card'; // Assuming the file path is correct
function ItemsListScreen(params) {
    const items = [
        { id: 1, title: 'Lost my CNIC', category: 'Id Document', location: 'City Center', date: '2024-05-14' },
        { id: 2, title: 'Lost my keys', category: 'Keys', location: 'Park', date: '2024-05-10' },
        { id: 3, title: 'Found a phone', category: 'Electronics', location: 'Coffee Shop', date: '2024-05-12' },
        { id: 4, title: 'Found a phone', category: 'Electronics', location: 'Coffee Shop', date: '2024-05-12' },
        { id: 5, title: 'Found a phone', category: 'Electronics', location: 'Coffee Shop', date: '2024-05-12' },
        // Add more items as needed
      ];
    return (
        <Container className='p-5'>
      <Row>
        {/* Map through the list of items */}
        {items.map(item => (
          <Col key={item.id} md={3} sm={6} xs={12} >
            <ItemCard
              title={item.title}
              category={item.category}
              location={item.location}
              date={item.date}
            />
          </Col>
        ))}
      </Row>
    </Container>
    );

}

export default ItemsListScreen