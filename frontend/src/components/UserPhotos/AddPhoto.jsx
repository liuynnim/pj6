import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function AddPhoto() {
    const {userId} = useParams();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm()

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("photo", data.file[0]);  
        formData.append("file_name", data.file[0].name);
        formData.append("user_id", userId);
        
        try{
            const response = await axios.post(`http://localhost:8080/photos/${userId}/new`, formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              },
              withCredentials:true  
            });

            if(response.status === 200)
                navigate(`/photos/${userId}`);
        } catch (error) {
            console.log("Error uploading photo:", error);
        }
    }
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} >
            <input
                type="file"
                placeholder="add file here!"
                {...register("file", { required: "Please select a file" })} 
            />
            <button type="submit">Upload</button>
        </form>
        {errors.file && <p>{errors.file.message}</p>}
      </>  
    );
}
export default AddPhoto;