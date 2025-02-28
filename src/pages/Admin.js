import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { generateClient } from "aws-amplify/api";
import { uploadData, getUrl } from "aws-amplify/storage";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { createBook } from '../api/mutations';
import config from '../aws-exports';
import { signOut } from "aws-amplify/auth";
import '@aws-amplify/ui-react/styles.css';

// Extract S3 bucket details from Amplify config
const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;
const client = generateClient();

const Admin = () => {
    const [image, setImage] = useState(null);
    const [bookDetails, setBookDetails] = useState({ title: "", description: "", image: "", author: "", price: "" });

    // Handle book submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!bookDetails.title || !bookDetails.price) return;
            await client.graphql({
                query: createBook,
                variables: { input: bookDetails }
            });
            setBookDetails({ title: "", description: "", image: "", author: "", price: "" });
        } catch (err) {
            console.log('Error creating book:', err);
        }
    };

    // Handle image upload to S3
    const handleImageUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const extension = file.name.split(".")[1];
        const name = file.name.split(".")[0];
        const key = `images/${uuidv4()}${name}.${extension}`;
        
        try {
            await uploadData({
                key: key,
                data: file,
                options: {
                    contentType: file.type
                }
            });
            const imageUrl = await getUrl({ key });
            console.log("Image URL:", imageUrl.url);
            setImage(imageUrl.url);
            setBookDetails({ ...bookDetails, image: imageUrl.url });
        } catch (err) {
            console.log('Error uploading image:', err);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.log('Error signing out: ', error);
        }
    };

    return (
        <section className="admin-wrapper">
            
                <section>
                    <header className="form-header">
                        <h3>Add New Book</h3>
                        <button onClick={handleSignOut}>Sign Out</button>
                    </header>
                    <form className="form-wrapper" onSubmit={handleSubmit}>
                        <div className="form-image">
                            {image ? <img className="image-preview" src={image} alt="Uploaded preview" /> : 
                            <input type="file" accept="image/jpg" onChange={handleImageUpload} />}
                        </div>
                        <div className="form-fields">
                            <label htmlFor="title">Title</label>
                            <input type="text" placeholder="Enter title" onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} required />
                            
                            <label htmlFor="description">Description</label>
                            <textarea rows="8" placeholder="Enter description" onChange={(e) => setBookDetails({ ...bookDetails, description: e.target.value })} required />
                            <label htmlFor="author">Author</label>
                            <input type="text" placeholder="Enter author's name" onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} required />
                            
                            <label htmlFor="price">Price ($)</label>
                            <input type="text" placeholder="Enter book price" onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} required />
                            
                            <label>Featured?</label>
                            <input type="checkbox" className='featured-checkbox' checked={bookDetails.featured} onChange={() => setBookDetails({ ...bookDetails, featured: !bookDetails.featured })} />
                        </div>
                        <div className='submit-form'>
                            <button className="btn" type="submit">Submit</button>
                        </div>
                    </form>
                </section>
            
        </section>
    );
};

const styles = {
    container: {
      width: 400,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 20
    },
    todo: { marginBottom: 15 },
    input: {
      border: 'none',
      backgroundColor: '#ddd',
      marginBottom: 10,
      padding: 8,
      fontSize: 18
    },
    todoName: { fontSize: 20, fontWeight: 'bold' },
    todoDescription: { marginBottom: 0 },
    button: {
      backgroundColor: 'black',
      color: 'white',
      outline: 'none',
      fontSize: 18,
      padding: '12px 0px'
    }
  };

export default withAuthenticator (Admin) ;