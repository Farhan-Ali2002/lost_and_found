import React from 'react';
import { Button } from 'reactstrap';
import lostAndFoundImage from '../assets/images/lost-bg.png';
import { useState } from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import imgUpload from '../assets/images/gallery-upload.png'
import ItemCard from '../components/item_card';
import ItemsListScreen from './items_list_screen';
import axios from 'axios'
function HomeScreen() {
    const [postModal, setPostModal] = useState(false)


    const [errors, setErrors] = useState({ itemtitle: "", description: "", location: "", category: "", image: "" });
    const setDefaultValues = () => {
        setTitle('')
        setItemDate('')
        setDescription('')
        setLocationId(-1000)
        setCategoryId(-1001)
        setImage([])
        setPrevImage('')
        setLostOrFound('')
    }
    const [loading, setLoading] = useState(true)

    const [lostOrFound, setLostOrFound] = useState('')
    const [title, setTitle] = useState('')
    const [itemDate, setItemDate] = useState('')
    const [description, setDescription] = useState('')
    const [locationId, setLocationId] = useState(-1000)
    const [categoryId, setCategoryId] = useState(-1001)
    const [image, setImage] = useState([]);
    const [prevImage, setPrevImage] = useState("");
    const itemCategories = [
        { id: 1, name: "Electronics" },
        { id: 2, name: "Card", },
        { id: 3, name: "Wallet" }
    ]
    const itemLocation = [
        { id: 1, name: "Gulbahar" },
        { id: 2, name: "Hashtnagri", },
        { id: 3, name: "Qissa Khwani" }
    ]

    const createPostItem = async (e) => {
    //ss
    let flag = false;
    const error = { itemTitle: false, description: false, categoryId: false, locationId:false, image: false, commission: false , lostorfound: false }
    // if(!title || title.length < 3 ){
    //   flag = true;
    //   error.itemTitle = true;
    // }
    // if(!description || description.length < 3 ){
    //   flag = true;
    //   error.description = true;
    // }
     
    // if ((!prevImage && !image)) {
    //   flag = true;
    //   error.image = true;
    // } 
    // if (!categoryId || categoryId.length<1) {
    //   flag = true;
    //   error.categoryId = true;
    // } 
    // if (!locationId || locationId.length<1) {
    //   flag = true;
    //   error.locationId = true;
    // } 
    // if (!lostOrFound || lostOrFound.length<1) {
    //     flag = true;
    //     error.lostorfound = true;
    //   } 
    
    setErrors(error)
    if(!flag){
        try {
          // Prepare the image file
          const formData = new FormData();
          formData.append('item_image', image[0]);
          console.log("getttt",image[0] instanceof Blob)
          // Assuming imageFile is the File object representing the selected image
      
          // Prepare other data to be sent to the server
          const newItem = {
            item_id: '1',
            item_name: title,
            date: "2022-dec-22",
            item_description: description,
            found: false,
            category: categoryId,
            location: locationId,
            title: title
            // Add other fields as needed
          };
          console.log(newItem)
      
          // Append other form data to the FormData object
          for (const key in newItem) {
            formData.append(key, newItem[key]);
          }
      
          // Make a POST request to the server
          const response = await axios.post('http://localhost:4000/api/items_insert', formData, {
            headers: {
              'Content-Type': 'multipart/form-data' 
            }
          });
      
          // Check if the request was successful
          if (response.status === 201) {
            // Reset form values and close the modal
            setPostModal(false);
            setDefaultValues();
            // Optionally, you can show a success message or perform any other actions
          } else {
            // Handle other status codes if needed
          }
        } catch (error) {
          // Handle errors
          console.error('Error adding item:', error);
          // Optionally, you can show an error message or perform any other actions
        }
    }
    
      };

    const handleAcceptedFiles = (e) => {
        const files = e.target.files
        console.log("e.target.file=", e.target.files)
        let allowed_extensions = ["jpeg", "jpg", "png", "gif"];
        let fileExt = files[0].name.split('.').pop();
        if (allowed_extensions.includes(fileExt)) {
            setErrors({ ...errors, eventLogo: false })
            setImage(files)
            //  setChange(true)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(files)
                setPrevImage(reader.result);
            };
            if (files) {
                reader.readAsDataURL(files[0]);
                setPrevImage(files)
            } else {
                setPrevImage(null);
            }
        }
        else {
            setErrors({ ...errors, image: true })
            setImage(null)
            document.getElementById("").value = "";
        }
    }

    return (
        <div>
            <Row className='p-5'>
                {/* Title and Button */}
                <Col>
                    <Row>
                        <Col>
                            <h2 style={{ marginBottom: "20px" }}>Lost or Found Something?</h2>
                            <h3>Post It!?</h3>
                            <div style={{ marginTop: "190px" }}>
                                <Button onClick={() => { setPostModal(true) }} color="secondary" style={{ width: "300px", height: "50px" }}>Post an Item</Button>
                            </div>
                        </Col>

                        {/* Image */}
                        <Col>
                            <img src={lostAndFoundImage} alt="Lost and Found Box" style={{ maxWidth: "400px", maxHeight: "400px" }} />
                        </Col>
                    </Row>
                    <Col md={12} className="mb-2"><hr /></Col>
                    <Row>
                        <Col>
                        <ItemsListScreen/>
                        </Col>
                    </Row>



                    {/* Additional content for HomeScreen */}
                    {/* Add additional content here if needed */}
                </Col>

            </Row>
            <Modal size='lg' isOpen={postModal} toggle={() => { setPostModal(false); setDefaultValues() }} centered={true}>
                <ModalHeader toggle={() => { setPostModal(false); setDefaultValues() }}>
                    <small>Post a Lost/Found Item</small>
                    <p className="text-secondary fw-light mb-0 font-size-12">Fill the following fields to Post the item</p>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={12} className="mb-2"><hr /></Col>
                        <Col md={6} className="mb-2">
                            <label htmlFor="Title" >Title</label>
                            <input type="text" id="title" className={`form-control`} placeholder="Enter the Title." value={title} onChange={(e) => { setTitle(e.target.value) }} />
                            {errors.title ? <div className="text-danger fs-12">Please provide a suitable title </div> : <></>}
                        </Col>
                        <Col md={6} className="mb-4">
                            <label htmlFor="itemDate" > Date <span className="text-danger">*</span></label>
                            <input type="date" id="eventStartDate" className={`form-control`} min={Date.now()} value={itemDate} onChange={(e) => { setItemDate(e.target.value) }} />
                            {errors.itemDate ? <div className="text-danger fs-12">Please provide date for the item</div> : <></>}
                        </Col>
                        <Col md={12} className="mb-2">
                            <label htmlFor="itemDescription" >Description</label>
                            <textarea id="itemDescription" rows={5} className={`form-control`} placeholder="item Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                            {errors.description ? <div className="text-danger fs-12">Please provide Description for the item </div> : <></>}
                        </Col>
                        <Col md={12} className="mb-2"><hr /></Col>
                        <Col md={12}>
                            <Row>
                                <Col md={6}>
                                    <Col md={12}>
                                        <label htmlFor="image" >Image:</label>
                                    </Col>
                                    <Row className='align-items-center'>
                                        <Col md={2} className='w-auto'>
                                            <label htmlFor="image" className='mb-0' >
                                                <img src={prevImage ? prevImage : imgUpload} className="" height={40} width={40} onError={(e) => { e.target.onerror = null; e.target.src = imgUpload }} alt='Store' />
                                            </label>
                                        </Col>
                                        <Col md={6}>
                                            <label htmlFor="image" className='mb-0 d-flex justify-content-between' >
                                                <span className='btn btn-secondary align-self-center w-100'>Browse image</span>
                                            </label>
                                        </Col>
                                        <Col md={4} className=''>
                                            <span className='btn btn-outline-secondary align-self-center w-100' onClick={() => { setPrevImage('') }}>Clear</span>
                                            <input type="file" id="image" accept="image/png, image/gif, image/jpeg, image/jpg" style={{ opacity: 0, visibility: "hidden", height: "0px !important", width: "0px !important", margin: 0, padding: 0, position: "absolute" }} className={`form-control`} placeholder="Enter Store's image" onChange={handleAcceptedFiles} />
                                        </Col>
                                        {errors.image ? <div className="text-danger fs-12">Please provide a valid format image </div> : <></>}
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={12} className="mb-2"><hr /></Col>
                        <Col md={2} className="mb-4">
                            <label>Item Status:</label>
                            <span className="form-check">
                                <input
                                    type="radio"
                                    id="lost"
                                    className="form-check-input"
                                    value="lost"
                                    checked={lostOrFound === 'lost'}
                                    onChange={() => setLostOrFound('lost')}
                                />
                                <label htmlFor="lost" className="form-check-label">Lost</label>
                            </span>
                            <span className="form-check">
                                <input
                                    type="radio"
                                    id="found"
                                    className="form-check-input"
                                    value="found"
                                    checked={lostOrFound === 'found'}
                                    onChange={() => setLostOrFound('found')}
                                />
                                <label htmlFor="found" className="form-check-label">Found</label>
                            </span>
                        </Col>
                        <Col md={12} className="mb-2"><hr /></Col>

                        <Col md={6} className="mb-4">
                            <label htmlFor="category" >Item Category<span className="text-danger ml-1">*</span></label>
                            <select className='form-control' id='category' value={categoryId} onChange={(e) => { setCategoryId(e.target.value) }}>
                                <option value={-1001} disabled={true}>Select Item's Category</option>
                                {
                                    itemCategories && itemCategories.map((category, index) => {
                                        return <option key={index} value={category.name}>{category.name}</option>
                                    })
                                }
                            </select>
                            {errors.category ? <div className="text-danger fs-12">Please select a category</div> : <></>}
                        </Col>
                        <Col md={6} className="mb-4">
                            <label htmlFor="location" >Item Location<span className="text-danger ml-1">*</span></label>
                            <select className='form-control' id='location' value={locationId} onChange={(e) => { setLocationId(e.target.value) }}>
                                <option value={-1001} disabled={true}>Select Item's location</option>
                                {
                                    itemLocation && itemLocation.map((location, index) => {
                                        return <option key={index} value={location.name}>{location.name}</option>
                                    })
                                }
                            </select>
                            {errors.location ? <div className="text-danger fs-12">Please select a Location</div> : <></>}
                        </Col>




                    </Row>


                    <Row>
                        <Col md={12} className="mb-2"><hr /></Col>
                    </Row>
                    <Row>
                        <Col md={12} className="text-right">
                            <div onClick={() => { setPostModal(false); setDefaultValues(); }} className="btn btn-outline-primary me-2">Close</div>
                            <button className="btn btn-primary" onClick={()=>{createPostItem()}}>Post</button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default HomeScreen;
