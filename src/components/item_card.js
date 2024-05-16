import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText, CardBody, CardImg } from 'reactstrap';
import img from '../assets/images/broken-placeholder-image.png';
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function ItemCard({ id, title, category, location, date, isFound }) {
  return (
    <Link to={`/found-items`} className="text-decoration-none">
      <Card className="pl-3 pr-3 pt-2 pb-2">
        {/* Tag for found or lost */}
        <div className={`badge ${isFound ? 'bg-success' : 'bg-danger'}`}>{isFound ? 'Found' : 'Lost'}</div>
        <CardImg src={img} />
        <CardBody className='pl-0 pr-0'>
          <CardText className='fs-22'>{title}</CardText>
          <div>
            <div className='d-flex justify-content-between'>
              <div className="d-flex align-items-center">
                <CategoryIcon sx={{ marginRight: '4px' }} />
                <span className="badge bg-primary">{category}</span>
              </div>
              <div className="d-flex align-items-center">
                <LocationOnIcon sx={{ marginRight: '4px' }} />
                <span className="badge bg-secondary">{location}</span>
              </div>
            </div>
          </div>
          <div className='mt-2'>
            <strong>Date:</strong> {date}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}

export default ItemCard;
