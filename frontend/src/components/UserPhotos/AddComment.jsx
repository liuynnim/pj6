import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function AddComment() {
  const navigate = useNavigate();
  const { userId, photoId } = useParams(); 
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const submitComment = async (data) => {    
    if (!data.comment.trim()) {
      console.log("Comment cannot be empty");
      return;
    }
    
    try {
      await axios.post(`http://localhost:8080/photos/${userId}/commentsOfPhoto/${photoId}`, { comment: data.comment }, { withCredentials: true });
      navigate(`/photos/${userId}`);
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitComment)} style={{ marginBottom: 10 }}>
        <input
          className="comment-input"
          type="text"
          placeholder="Write a comment..."
          {...register("comment", { required: "Comment is required" })}
        />
        <button className="comment-btn" type="submit">Send</button>
      </form>
      {errors.comment && <p>{errors.comment.message}</p>}
    </>
  );
}

export default AddComment;
