import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, doc, setDoc, getDocs, query, deleteDoc } from "firebase/firestore";
import { firestore } from '../config/firebase';
import { Button, Modal } from 'antd';

function Home() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    userName: '',
    phone: '',
    website: ''
  });
  const [productForEdit, setProductForEdit] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data from Firebase when the component mounts
  useEffect(() => {
    gettingDataFromFirebase();
  }, []);

  // Open and close modal functions
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Function to handle input changes
  const handleEveryInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to generate a random ID
  function getRandomId() {
    return Math.random().toString(36).slice(2);
  }

  // Function to handle form submission
  const handleProductsFormSubmit = async (e) => {
    e.preventDefault();

    const { productName, userName, phone, website } = newProduct;
    if (!productName || !userName || !phone || !website) {
      alert('Please fill in all fields.');
      return;
    }

    const randomId = getRandomId();
    try {
      const newDocRef = doc(collection(firestore, "products"), randomId);
      await setDoc(newDocRef, { id: randomId, productName, userName, phone, website });
      alert("Added Successfully");

      setProducts((prev) => [
        ...prev,
        { id: randomId, productName, userName, phone, website }
      ]);
      setNewProduct({ productName: '', userName: '', phone: '', website: '' });
      setShowModal(false);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  // Function to fetch data from Firebase
  const gettingDataFromFirebase = async () => {
    try {
      const q = query(collection(firestore, "products"));
      const querySnapshot = await getDocs(q);
      const array = querySnapshot.docs.map((doc) => doc.data());
      setProducts(array);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle delete
  const handleDelete = async (product) => {
    if (!product.id) {
      console.error("Document ID is undefined.");
      return;
    }
    try {
      await deleteDoc(doc(firestore, "products", product.id));
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      console.log("Deleted Successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  // Function to handle update (simplified for future implementation)
  const handleUpdate = (product) => {
    setProductForEdit(product);
    setIsModalOpen(true);
  };

  const handleModalOk = () => setIsModalOpen(false);
  const handleModalCancel = () => setIsModalOpen(false);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        {/* Navbar content */}
      </nav>

      {/* Button to Open Modal */}
      <div>
        <button className="btn btn-primary" onClick={handleOpenModal}>
          Want to add a product?
        </button>
      </div>

      {/* Modal for Adding Product */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter Product Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleProductsFormSubmit}>
                  {/* Form Fields */}
                  <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      name="productName"
                      onChange={handleEveryInputChange}
                      value={newProduct.productName}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      name="userName"
                      onChange={handleEveryInputChange}
                      value={newProduct.userName}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      onChange={handleEveryInputChange}
                      value={newProduct.phone}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="website" className="form-label">Website</label>
                    <input
                      type="text"
                      className="form-control"
                      id="website"
                      name="website"
                      onChange={handleEveryInputChange}
                      value={newProduct.website}
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.productName}</td>
              <td>{product.userName}</td>
              <td>{product.phone}</td>
              <td>{product.website}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={()=>handleUpdate(product)}>Update</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Ant Design Modal for Update */}
      <Modal title="Update Product" open={isModalOpen} onOk={handleUpdate} onCancel={handleModalCancel}>
        <input type="text" id='productName' name='productName' placeholder='productName....' onChange={handleEveryInputChange}/>
        <input type="text" id='userName' name='userName' placeholder='userName...' onChange={handleEveryInputChange}/>
        <input type="text" id='phone' name='phone' placeholder='phone....'  onChange={handleEveryInputChange}/>
        <input type="text" id='website' name='website' placeholder='website....' onChange={handleEveryInputChange}/>
      </Modal>
    </>
  );
}

export default Home;
